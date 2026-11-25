import paths from './paths.cjs';
const { coursePath, projectPath, projectRelative, assetPath } = paths;
// Course-specific batch; capture operations belong to the skill.
// Usage: node src/courses/robotics/scripts/render-mcar.mjs ../mcar
import {
  createCaptureSession,
  captureBlockPng,
} from '../.agents/skills/capture-mcar/scripts/capture.mjs';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const session = await createCaptureSession({
  mcarPath: process.argv[2] || '../mcar',
});
const { page } = session;
try {
  const captures = [];
  for (const id of ['start', 'demo', 'solution']) {
    const projectFile = projectPath(`lesson-08-${id}.mcar`);
    const data = await readFile(projectFile);
    const project = await session.loadProject(projectFile);
    const filename = `lesson-08-${id}-blocks.png`;
    await captureBlockPng(page, assetPath(filename));
    captures.push({
      filename,
      source: projectRelative(`lesson-08-${id}.mcar`),
      sha256: createHash('sha256').update(data).digest('hex'),
    });
    if (id === 'start') {
      await session.captureWiring(
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
  session.assertHealthy();
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
  await session.close();
}
