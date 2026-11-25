const {
  coursePath,
  projectPath,
  projectRelative,
  assetPath,
} = require('../scripts/paths.cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { createHash } = require('node:crypto');
const {
  loadTypeScript,
} = require('../../../../tests/helpers/load-typescript.cjs');
const { catalog } = loadTypeScript('src/app/catalog/catalog.ts');
const { parseRoute, resolveRoute } = loadTypeScript('src/navigation/routes.ts');
const resolve = (hash) => resolveRoute(parseRoute(hash), catalog);

test('robotics has 32 sequential lessons and exposes every authored lesson as ready', () => {
  const { roboticsLessons } = loadTypeScript('src/courses/robotics/course.ts');
  assert.deepEqual(
    roboticsLessons.map((item) => item.number),
    Array.from({ length: 32 }, (_, i) => i + 1),
  );
  assert.deepEqual(
    roboticsLessons.filter((item) => item.ready).map((item) => item.id),
    roboticsLessons.map((item) => item.id),
  );
  assert.equal(
    catalog.topics.filter(
      (item) => item.cls === 'robo' && item.kind === 'robotics-lesson',
    ).length,
    32,
  );
  assert.equal(
    catalog.topics.some(
      (item) =>
        item.cls === 'robo' && ['ktp', 'mod2', 'later'].includes(item.doc),
    ),
    false,
  );
});

test('robotics course shortcuts, lesson modes and removed routes resolve deliberately', () => {
  assert.equal(resolve('#/robo').redirect, '#/robo/robot/lessons');
  assert.equal(resolve('#/robo/robot').redirect, '#/robo/robot/lessons');
  for (const view of ['practice', 'teacher', 'student', 'classroom']) {
    const state = resolve('#/robo/robot/lesson-08/' + view).state;
    assert.equal(state.topic, 'lesson-08');
    assert.equal(state.sub, view);
    assert.equal(state.tool, undefined);
  }
  assert.equal(
    resolve('#/robo/robot/lesson-08/unknown').redirect,
    '#/robo/robot/lesson-08',
  );
  assert.equal(
    resolve('#/robo/robot/lesson-09/practice').state.sub,
    'practice',
  );
  for (const route of ['#ktp', '#mod2-6', '#/robo/robot/r2', '#/robo/robot/r6'])
    assert.equal(resolve(route).redirect, '#/robo/robot/lessons');
  assert.equal(resolve('#/robo/robot/tools').state.topic, 'tools');
  assert.equal(resolve('#sim').redirect, '#/robo/robot/r9');
  assert.equal(resolve('#morse').redirect, '#/robo/robot/r8');
  assert.equal(resolve('#mod1-5').redirect, '#/robo/robot/r5/mod1-5');
});

test('published motor resources match the verified teaching files', () => {
  for (const name of ['start', 'demo', 'solution']) {
    const filename = `lesson-08-${name}.mcar`;
    assert.deepEqual(
      fs.readFileSync(`dist/assets/robotics/${filename}`),
      fs.readFileSync(projectPath(filename)),
    );
  }
  const { captures } = JSON.parse(
    fs.readFileSync('src/courses/robotics/lessons/lesson-08/captures.json'),
  );
  for (const { filename, source, sha256 } of captures) {
    assert.deepEqual(
      fs.readFileSync(`dist/assets/robotics/${filename}`),
      fs.readFileSync(assetPath(filename)),
    );
    assert.equal(
      createHash('sha256')
        .update(fs.readFileSync(coursePath(source)))
        .digest('hex'),
      sha256,
      `Recapture ${filename} after changing its Mcar project`,
    );
  }
});
