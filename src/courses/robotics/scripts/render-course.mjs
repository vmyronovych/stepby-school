import paths from './paths.cjs';
const { coursePath, projectPath, projectRelative, assetPath } = paths;
import {
  createCaptureSession,
  captureBlockSvgs,
} from '../.agents/skills/capture-mcar/scripts/capture.mjs';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const selectedArg = process.argv.find((a) => a.startsWith('--lessons='));
const selected = selectedArg
  ? selectedArg.slice(10).split(',').map(Number)
  : null;
const captures = selected
  ? JSON.parse(
      await readFile('src/courses/robotics/shared/content/captures.json'),
    ).filter(
      (c) =>
        !selected.some((n) =>
          c.source.startsWith(
            'lessons/lesson-' + String(n).padStart(2, '0') + '/',
          ),
        ),
    )
  : [];
const session = await createCaptureSession({
  mcarPath: '../mcar',
  deviceScaleFactor: 1,
});
const { page } = session;
async function svgCapture(selector, stem, source, caption) {
  const pieces = await captureBlockSvgs(page, selector);
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
  const projects = JSON.parse(
    await readFile('src/courses/robotics/scripts/data/projects.json'),
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
    await session.loadProject(data);
    if (!wiringOnly)
      await svgCapture(
        undefined,
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
      const box = await session.captureWiring(
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
        const selector = await session.openDefinition(data, def.id);
        await svgCapture(
          selector,
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
      'src/courses/robotics/shared/content/captures.json',
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
      'src/courses/robotics/shared/content/captures.json',
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
  session.assertHealthy();
} finally {
  await session.close();
}
