import paths from './paths.cjs';
const { coursePath, projectPath, projectRelative, assetPath, publicPath } =
  paths;
import { captureWiring } from './capture-wiring.mjs';
import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { createHash } from 'node:crypto';
const root = resolve('../mcar/web/dist');
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.wasm': 'application/wasm',
};
const server = createServer(async (req, res) => {
  try {
    const file = resolve(
      root,
      '.' +
        (new URL(req.url, 'http://local').pathname === '/'
          ? '/index.html'
          : decodeURIComponent(new URL(req.url, 'http://local').pathname)),
    );
    if (!file.startsWith(root + sep)) throw Error();
    res.setHeader(
      'Content-Type',
      types[extname(file)] || 'application/octet-stream',
    );
    res.end(await readFile(file));
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const browser = await chromium.launch({
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
});
const page = await browser.newPage({
  viewport: { width: 1800, height: 1400 },
  deviceScaleFactor: 1,
});
const selectedArg = process.argv.find((a) => a.startsWith('--lessons='));
const selected = selectedArg
  ? selectedArg.slice(10).split(',').map(Number)
  : null;
const captures = selected
  ? JSON.parse(
      await readFile('src/courses/robotics/docs/course-captures.json'),
    ).filter(
      (c) =>
        !selected.some((n) =>
          c.source.startsWith(
            'lessons/lesson-' + String(n).padStart(2, '0') + '/',
          ),
        ),
    )
  : [];
page.on('pageerror', (error) => console.error('PAGEERROR', error.message));
async function svgCapture(selector, stem, source, caption) {
  const pieces = await page.locator(selector).evaluateAll((nodes) =>
    nodes.map((node) => {
      const box = node.getBBox(),
        clone = node.cloneNode(true);
      clone.removeAttribute('transform');
      const originals = [node, ...node.querySelectorAll('*')],
        copies = [clone, ...clone.querySelectorAll('*')];
      originals.forEach((el, i) => {
        const css = getComputedStyle(el);
        for (const prop of [
          'fill',
          'stroke',
          'stroke-width',
          'font-family',
          'font-size',
          'font-weight',
          'font-style',
          'text-anchor',
          'display',
          'visibility',
          'opacity',
        ])
          copies[i].style.setProperty(prop, css.getPropertyValue(prop));
      });
      const defs = new XMLSerializer().serializeToString(
        node.closest('svg').querySelector('defs') ||
          document.createElementNS('http://www.w3.org/2000/svg', 'defs'),
      );
      const w = Math.ceil(box.width + 32),
        h = Math.ceil(box.height + 32);
      return {
        width: w,
        height: h,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="${box.x - 16} ${box.y - 16} ${w} ${h}"><rect x="${box.x - 16}" y="${box.y - 16}" width="${w}" height="${h}" fill="#fff"/>${defs}${new XMLSerializer().serializeToString(clone)}</svg>`,
      };
    }),
  );
  for (const [i, piece] of pieces.entries()) {
    const filename = `${stem}-${i + 1}.svg`;
    await writeFile(assetPath(filename), piece.svg);
    captures.push({
      filename,
      source,
      sha256: createHash('sha256')
        .update(await readFile(coursePath(source)))
        .digest('hex'),
      width: piece.width,
      height: piece.height,
      caption: caption + (pieces.length > 1 ? ` · ${i + 1}` : ''),
    });
  }
}
try {
  await page.route('**/*', (r) =>
    new URL(r.request().url()).hostname === '127.0.0.1'
      ? r.continue()
      : r.abort(),
  );
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  await page.getByRole('button', { name: 'Продовжити без плати' }).click();
  const projects = JSON.parse(
    await readFile('src/courses/robotics/docs/projects.json'),
  );
  const wiringOnly = process.argv.includes('--wiring-only');
  for (const entry of projects) {
    if (selected && !selected.includes(entry.number)) continue;
    if (
      wiringOnly &&
      !(entry.variant === 'start' && [6, 11].includes(entry.number))
    )
      continue;
    const data = JSON.parse(await readFile(projectPath(entry.filename)));
    await page
      .locator('#projectFile')
      .setInputFiles(resolve(projectPath(entry.filename)));
    await page
      .waitForFunction(
        (n) => document.querySelector('#projectName').value === n,
        data.name,
      )
      .catch(async (error) => {
        console.error((await page.locator('body').innerText()).slice(-4000));
        throw error;
      });
    await page.locator('#fitProgram').click();
    if (!wiringOnly)
      await svgCapture(
        '#blocklyDiv .blocklyWorkspace > .blocklyBlockCanvas > .blocklyDraggable',
        entry.filename.replace('.mcar', '-blocks'),
        projectRelative(entry.filename),
        entry.variant === 'start'
          ? 'Початок для власної роботи'
          : entry.variant === 'demo'
            ? 'Показ учителя'
            : 'Приклад учителя',
      );
    if (entry.variant === 'start' && [6, 11].includes(entry.number)) {
      const filename = `lesson-${String(entry.number).padStart(2, '0')}-wiring.png`;
      const box = await captureWiring(
        page,
        data.workspace.wiring,
        assetPath(filename),
      );
      captures.push({
        filename,
        source: projectRelative(entry.filename),
        sha256: createHash('sha256')
          .update(await readFile(projectPath(entry.filename)))
          .digest('hex'),
        width: Math.round(box.width),
        height: Math.round(box.height),
        caption:
          entry.number === 6
            ? 'Резистор 330 Ом і LED встановлені в mini breadboard. ESP32 — у платі розширення. Схема з Mcar.'
            : 'Кожен драйвер встановлений в окрему mini breadboard. Чотири мотори та ESP32 у платі розширення; схема з Mcar.',
      });
    }

    // Capture definitions in their real Mcar editor, once for each new library.
    if (entry.variant === 'solution' && [12, 13, 14, 15].includes(entry.number))
      for (const def of data.workspace.myBlocks) {
        const temporary = structuredClone(data);
        temporary.workspace.blocks.blocks = [
          {
            type: 'usb_start',
            next: {
              block: {
                type: 'my_block_call',
                extraState: { definitionId: def.id },
              },
            },
            x: 40,
            y: 40,
          },
        ];
        temporary.name = 'Складові — ' + def.name;
        await page.locator('#projectFile').setInputFiles({
          name: 'definition.mcar',
          mimeType: 'application/json',
          buffer: Buffer.from(JSON.stringify(temporary)),
        });
        await page.waitForFunction(
          (n) => document.querySelector('#projectName').value === n,
          temporary.name,
        );
        await page
          .locator('#blocklyDiv .blocklyBlockCanvas .blocklyText')
          .filter({ hasText: new RegExp('^' + def.name + '$') })
          .first()
          .dblclick();
        await page.locator('#myBlockDialog').waitFor({ state: 'visible' });
        await svgCapture(
          '#myBlockCanvas .blocklyWorkspace > .blocklyBlockCanvas > .blocklyDraggable',
          `lesson-${entry.number}-definition-${def.id}`,
          projectRelative(entry.filename),
          'Складові команди «' + def.name + '»',
        );
        await page.locator('#myBlockDialog [data-cancel]').first().click();
      }
    console.log(entry.filename);
  }
  if (wiringOnly) process.exitCode = 0;
  if (!wiringOnly) {
    await writeFile(
      'src/courses/robotics/docs/course-captures.json',
      JSON.stringify(captures, null, 2) + '\n',
    );
    if (!selected) {
      await page.locator('#assemblyButton').click();
      await page.locator('#guideCanvas').waitFor({ state: 'visible' });
      console.log(
        'Guide steps:',
        await page.locator('#guideStepList button').allTextContents(),
      );
      for (const [name, step] of [
        ['chassis', 5],
        ['wheels', 4],
        ['robot', 22],
        ['sensor', 8],
      ]) {
        await page.locator('#guideStepList button').nth(step).click();
        if (name === 'sensor') await page.locator('#guideBottom').click();
        else await page.locator('#guideIso').click();
        await page.waitForTimeout(1200);
        const filename = `mcar-${name}.png`;
        await page
          .locator('#guideCanvas')
          .screenshot({ path: assetPath(filename) });
        const box = await page.locator('#guideCanvas').boundingBox();
        captures.push({
          filename,
          source: 'Mcar assembly guide',
          width: Math.round(box.width),
          height: Math.round(box.height),
          caption: 'Модель складання з Mcar',
        });
      }
    }
    await writeFile(
      'src/courses/robotics/docs/course-captures.json',
      JSON.stringify(captures, null, 2) + '\n',
    );
    await writeFile(
      'src/courses/robotics/shared/content/resources.ts',
      'export interface CourseImage { filename:string; width:number; height:number; caption:string; source:string }\nexport const courseImages: CourseImage[] = ' +
        JSON.stringify(
          captures.map(({ sha256, ...rest }) => rest),
          null,
          2,
        ) +
        ';\n',
    );
  }
} finally {
  await browser.close();
  server.close();
}
