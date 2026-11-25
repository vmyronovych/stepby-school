import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { access, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, extname, sep, dirname, basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import { captureWiring } from './capture-wiring.mjs';
import {
  captureBlockSvgs,
  captureBlockPng,
  openBlockDefinition,
} from './capture-blocks.mjs';

export { captureBlockSvgs, captureBlockPng } from './capture-blocks.mjs';

const contentTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.wasm': 'application/wasm',
};

// The caller owns project selection and output paths; this session only drives Mcar.
export async function createCaptureSession({
  mcarPath,
  deviceScaleFactor = 2,
}) {
  const mcar = resolve(mcarPath);
  const root = resolve(mcar, 'web/dist');
  await access(resolve(root, 'index.html'));
  const [{ physicalLayout }, { BREADBOARD_PINS }] = await Promise.all([
    import(pathToFileURL(resolve(mcar, 'web/src/wiring-physical.js')).href),
    import(pathToFileURL(resolve(mcar, 'web/src/breadboard.js')).href),
  ]);
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(
        new URL(request.url, 'http://localhost').pathname,
      );
      const file = resolve(
        root,
        '.' + (pathname === '/' ? '/index.html' : pathname),
      );
      if (!file.startsWith(root + sep)) throw new Error('Outside Mcar build');
      const data = await readFile(file);
      response.setHeader(
        'Content-Type',
        contentTypes[extname(file)] || 'application/octet-stream',
      );
      response.end(data);
    } catch {
      response.writeHead(404);
      response.end();
    }
  });
  let browser;
  async function close() {
    try {
      await browser?.close();
    } finally {
      if (server.listening)
        await new Promise((done, reject) =>
          server.close((error) => (error ? reject(error) : done())),
        );
    }
  }
  try {
    await new Promise((done, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', done);
    });
    browser = await chromium.launch({
      args: [
        '--use-gl=angle',
        '--use-angle=swiftshader',
        '--enable-unsafe-swiftshader',
      ],
    });
    const page = await browser.newPage({
      viewport: { width: 1800, height: 1400 },
      deviceScaleFactor,
    });
    page.setDefaultTimeout(30000);
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const origin = `http://127.0.0.1:${server.address().port}`;
    await page.route('**/*', (route) =>
      new URL(route.request().url()).origin === origin
        ? route.continue()
        : route.abort(),
    );
    await page.goto(origin);
    await page.getByRole('button', { name: 'Продовжити без плати' }).click();
    function assertHealthy() {
      if (errors.length) throw new Error(errors.join('\n'));
    }
    async function loadProject(input) {
      const project =
        typeof input === 'string'
          ? JSON.parse(await readFile(input, 'utf8'))
          : input;
      if (
        project?.format !== 'mandrivnyk-usb' ||
        project.version !== 1 ||
        typeof project.name !== 'string' ||
        !project.workspace
      )
        throw new Error('Expected an Mcar USB project');
      // A new import may have the same name as the previous project.
      await page.locator('#projectName').evaluate((node, name) => {
        node.value = name + ' (loading)';
      }, project.name);
      await page.locator('#projectFile').setInputFiles({
        name: 'capture.mcar',
        mimeType: 'application/json',
        buffer: Buffer.from(JSON.stringify(project)),
      });
      await page.waitForFunction(
        (name) =>
          document.querySelector('#projectName').value === name &&
          !document.querySelector('#projectFile').value,
        project.name,
      );
      await page.locator('#fitProgram').click();
      await page.evaluate(() => document.fonts.ready);
      assertHealthy();
      return project;
    }
    return {
      page,
      loadProject,
      close,
      assertHealthy,
      captureWiring: (state, output) =>
        captureWiring(page, state, output, { physicalLayout, BREADBOARD_PINS }),
      openDefinition: (project, id) =>
        openBlockDefinition(page, project, id, loadProject),
    };
  } catch (error) {
    await close();
    throw error;
  }
}

async function main() {
  const { values } = parseArgs({
    options: {
      mcar: { type: 'string' },
      input: { type: 'string' },
      kind: { type: 'string' },
      output: { type: 'string' },
      definition: { type: 'string' },
      help: { type: 'boolean' },
    },
  });
  if (values.help) {
    console.log(
      'Usage: node capture.mjs --mcar <repository> --input <project.mcar> --kind wiring|blocks --output <image.png|image.svg> [--definition <block-id>]',
    );
    return;
  }
  for (const key of ['mcar', 'input', 'kind', 'output'])
    if (!values[key]) throw new Error(`Missing --${key}`);
  if (!['wiring', 'blocks'].includes(values.kind))
    throw new Error('--kind must be wiring or blocks');
  const output = resolve(values.output),
    extension = extname(output).toLowerCase();
  if (values.kind === 'wiring' && (extension !== '.png' || values.definition))
    throw new Error(
      'Wiring requires PNG output and does not accept --definition',
    );
  if (!['.png', '.svg'].includes(extension))
    throw new Error('Output must be PNG or SVG');
  const input = resolve(values.input);
  if (input === output)
    throw new Error('Output must not replace the source project');
  await access(input);
  const session = await createCaptureSession({ mcarPath: values.mcar });
  try {
    const project = await session.loadProject(input);
    const selector = values.definition
      ? await session.openDefinition(project, values.definition)
      : undefined;
    await mkdir(dirname(output), { recursive: true });
    const files = [];
    if (values.kind === 'wiring') {
      await session.captureWiring(project.workspace.wiring, output);
      files.push(output);
    } else if (extension === '.png') {
      await captureBlockPng(session.page, output, selector);
      files.push(output);
    } else {
      const pieces = await captureBlockSvgs(session.page, selector);
      for (const [i, piece] of pieces.entries()) {
        const filename =
          pieces.length === 1
            ? output
            : resolve(
                dirname(output),
                `${basename(output, extname(output))}-${i + 1}.svg`,
              );
        await writeFile(filename, piece.svg);
        files.push(filename);
      }
    }
    session.assertHealthy();
    console.log(JSON.stringify({ source: input, files }, null, 2));
  } finally {
    await session.close();
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
