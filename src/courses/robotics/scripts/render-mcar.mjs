import paths from './paths.cjs';
const { coursePath, projectPath, projectRelative, assetPath, publicPath } =
  paths;
// Capture the actual Mcar editor, using its built app and the lesson project files.
// Usage: node src/courses/robotics/scripts/render-mcar.mjs ../mcar
import { captureWiring } from './capture-wiring.mjs';
import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] || '../mcar', 'web/dist');

const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.wasm': 'application/wasm',
};
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, 'http://localhost').pathname,
    );
    const file = resolve(
      root,
      '.' + (pathname === '/' ? '/index.html' : pathname),
    );
    if (!file.startsWith(root + sep)) throw new Error('Outside build');
    response.setHeader(
      'Content-Type',
      types[extname(file)] || 'application/octet-stream',
    );
    response.end(await readFile(file));
  } catch {
    response.writeHead(404);
    response.end();
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1800, height: 1400 },
    deviceScaleFactor: 2,
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('**/*', (route) =>
    new URL(route.request().url()).hostname === '127.0.0.1'
      ? route.continue()
      : route.abort(),
  );
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  await page.getByRole('button', { name: 'Продовжити без плати' }).click();
  const captures = [];
  for (const id of ['start', 'demo', 'solution']) {
    const projectFile = projectPath(`lesson-08-${id}.mcar`);
    const data = await readFile(projectFile);
    const project = JSON.parse(data);
    await page.locator('#projectFile').setInputFiles(projectFile);
    await page.waitForFunction(
      (name) => document.getElementById('projectName').value === name,
      project.name,
    );
    await page.locator('#fitProgram').click();
    await page.evaluate(() => document.fonts.ready);
    const stack = page
      .locator(
        '#blocklyDiv .blocklyWorkspace > .blocklyBlockCanvas > .blocklyDraggable',
      )
      .first();
    await stack.waitFor({ state: 'visible' });
    const filename = `lesson-08-${id}-blocks.png`;
    await stack.screenshot({
      path: assetPath(filename),
      animations: 'disabled',
    });
    captures.push({
      filename,
      source: projectRelative(`lesson-08-${id}.mcar`),
      sha256: createHash('sha256').update(data).digest('hex'),
    });
    if (id === 'start') {
      await captureWiring(
        page,
        project.workspace.wiring,
        assetPath('lesson-08-wiring.png'),
      );
      captures.push({
        filename: 'lesson-08-wiring.png',
        source: projectRelative('lesson-08-start.mcar'),
        sha256: createHash('sha256').update(data).digest('hex'),
      });
    }
  }
  if (errors.length) throw new Error(errors.join('\n'));
  await writeFile(
    coursePath('lessons/lesson-08/captures.json'),
    JSON.stringify(
      { renderer: 'Mcar web/dist; Chromium, deviceScaleFactor 2', captures },
      null,
      2,
    ) + '\n',
  );
  console.log('Captured actual Mcar wiring and three Blockly programs.');
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
