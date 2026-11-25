const { test } = require('node:test');
const assert = require('node:assert/strict');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const { digest } = require('./helpers/parity.cjs');
const before = require('./fixtures/mathematical-lessons-before.json');
const { engine } = loadTypeScript('src/runtime/index.ts');
const routes = loadTypeScript('src/navigation/routes.ts');
function follow(hash) {
  for (let n = 0; n < 5; n++) {
    const result = routes.resolveRoute(routes.parseRoute(hash), engine.DB);
    if (result.state) return result.state;
    hash = result.redirect;
  }
  throw new Error('Redirect cycle: ' + hash);
}
test('all original mathematical lessons, task IDs, conditions and explanations survive the migration', () => {
  const current = engine.DB.topics.filter((t) =>
    ['math', 'algebra', 'geometry'].includes(t.subject),
  );
  assert.equal(current.length, before.length - 1);
  for (const original of before) {
    const topic = current.find(
      (t) =>
        t.id === original.id || t.aliases?.some((a) => a.id === original.id),
    );
    assert(topic, original.id);
    assert(topic.grades.includes(Number.parseInt(original.cls)), original.id);
    if (!['t3', 't5'].includes(original.id)) {
      assert.equal(topic.title, original.title);
      assert.equal(topic.desc, original.desc);
    }
    assert.equal(topic.doc, original.doc);
    assert.equal(
      digest(topic.lesson ?? null),
      digest(original.lesson ?? null),
      original.id + ' teaching text',
    );
    assert.equal(topic.materials, undefined);
    const state = follow(
      `#/${original.cls}/${original.subject}/${original.id}`,
    );
    assert.equal(state.topic, topic.id);
    assert.equal(state.subject, topic.subject);
    for (const task of original.tasks ?? []) {
      assert.deepEqual(
        topic.tasks.find((t) => t.id === task.id),
        task,
      );
      const state = follow(
        `#/${original.cls}/${original.subject}/${original.id}/${task.id}`,
      );
      assert.equal(state.toolTaskId, task.id);
      assert.equal(state.tool, task.tool);
      assert.deepEqual(state.toolCfg, task.cfg);
      assert(engine.DB.tools[task.tool].build(task.cfg).steps.length);
    }
  }
  const ids = current.flatMap((t) => t.tasks ?? []).map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length);
});
test('merged fractions have one source and all tasks; course groups contain no empty subjects', () => {
  const fractions = engine.DB.topics.find((t) => t.id === 't3');
  assert.deepEqual(fractions.grades, [5, 6]);
  assert.deepEqual(
    fractions.tasks.map((t) => t.id),
    before
      .filter((t) => ['t3', 't5'].includes(t.id))
      .flatMap((t) => t.tasks.map((t) => t.id)),
  );
  assert(!engine.DB.topics.some((t) => t.id === 't5'));
  assert.deepEqual(
    new Set(engine.DB.subjects.map((s) => s.id)),
    new Set([
      'math',
      'algebra',
      'geometry',
      'info',
      'robot',
      'literacy',
      'html-css',
    ]),
  );
  for (const subject of engine.DB.subjects)
    assert(engine.DB.topics.some((t) => t.subject === subject.id));
  for (const id of ['math', 'algebra', 'geometry']) {
    assert.deepEqual(follow(routes.hrefCourse(id)), { subject: id });
    assert.equal(follow(routes.hrefCourse(id) + '/missing').subject, id);
  }
});
test('legacy merged and moved tasks retain custom conditions and document anchors', () => {
  for (const [url, task, tool] of [
    ['#/6a/math/t5/k9', 'k9', 'frac'],
    ['#/10a/math/irrational/ir1', 'ir1', 'irrational'],
  ]) {
    const custom = { text: 'sqrt(x) = 4', note: 'умова & ?' };
    const state = follow(url + routes.cfgQuery(custom));
    assert.equal(state.toolTaskId, task);
    assert.equal(state.tool, tool);
    assert.deepEqual(state.toolCfg, custom);
  }
  assert.equal(follow('#/10a/math').subject, 'algebra');
  assert.equal(
    follow('#/9a/geometry/scalar-product/sp-theory-title').sub,
    'sp-theory-title',
  );
  assert.equal(
    follow('#/courses/geometry/scalar-product/sp-theory-title').sub,
    'sp-theory-title',
  );
});
