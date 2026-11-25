const { test } = require('node:test');
const assert = require('node:assert/strict');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const { digest } = require('./helpers/parity.cjs');
const before = require('./fixtures/mathematical-lessons-before.json');
const { catalog } = loadTypeScript('tests/entries/application.ts');
const routes = loadTypeScript('src/navigation/routes.ts');
function follow(hash) {
  for (let n = 0; n < 5; n++) {
    const result = routes.resolveRoute(routes.parseRoute(hash), catalog);
    if (result.state) return result.state;
    hash = result.redirect;
  }
  throw new Error('Redirect cycle: ' + hash);
}
test('all original mathematical lessons, task IDs, conditions and explanations survive the migration', () => {
  const current = catalog.topics.filter((t) =>
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
        { ...task, done: false },
      );
      const state = follow(
        `#/${original.cls}/${original.subject}/${original.id}/${task.id}`,
      );
      assert.equal(state.toolTaskId, task.id);
      assert.equal(state.tool, task.tool);
      assert.deepEqual(state.toolCfg, task.cfg);
      assert(catalog.tools[task.tool].build(task.cfg).steps.length);
    }
  }
  const ids = current.flatMap((t) => t.tasks ?? []).map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length);
});
test('merged fractions have one source and all tasks; course groups contain no empty subjects', () => {
  const fractions = catalog.topics.find((t) => t.id === 't3');
  assert.deepEqual(fractions.grades, [5, 6]);
  assert.deepEqual(
    fractions.tasks.map((t) => t.id),
    before
      .filter((t) => ['t3', 't5'].includes(t.id))
      .flatMap((t) => t.tasks.map((t) => t.id)),
  );
  assert(!catalog.topics.some((t) => t.id === 't5'));
  assert.deepEqual(
    new Set(catalog.subjects.map((s) => s.id)),
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
  for (const subject of catalog.subjects)
    assert(catalog.topics.some((t) => t.subject === subject.id));
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

test('informatics tools have their own course section without changing document or preset routes', () => {
  assert.equal(routes.hrefCourse('info', 'tools'), '#/courses/info/tools');
  assert.deepEqual(follow('#/courses/info/tools'), {
    subject: 'info',
    sub: 'tools',
  });
  assert.deepEqual(follow('#/courses/info'), { subject: 'info' });
  assert.equal(follow('#/courses/math/tools').subject, 'math');
  assert.equal(follow('#/courses/math/tools').sub, undefined);
  for (const [hash, topic, sub] of [
    ['#/3a/info/kb3/caps', 'kb3', 'caps'],
    ['#/4a/info/win4/11', 'win4', '11'],
  ]) {
    const state = follow(hash);
    assert.equal(state.topic, topic);
    assert.equal(state.sub, sub);
    assert.equal(state.subject, 'info');
  }
});

test('course routing preserves published links and retired robotics document anchors', () => {
  for (const prefix of ['ktp', 'start', 'frame', 'mod2', 'later', 'risks']) {
    for (const suffix of ['', '-section']) {
      assert.deepEqual(follow('#' + prefix + suffix), {
        cls: 'robo', subject: 'robot', topic: 'lessons',
      });
    }
  }
  for (const hash of ['#/courses/robot', '#/robo/robot']) {
    assert.equal(follow(hash).topic, 'lessons');
  }
  assert.equal(routes.hrefCourse('robot', 'tools'), '#/robo/robot/tools');
  assert.equal(follow(routes.hrefCourse('robot', 'tools')).topic, 'tools');
  assert.deepEqual(follow('#/media/literacy'), { subject: 'literacy' });
  for (const [subject, cls, id, expected] of [
    ['math', '5a', 't3', '#/courses/math/t3'],
    ['algebra', '10a', 'irrational', '#/courses/algebra/irrational'],
    ['geometry', '9a', 'scalar-product', '#/courses/geometry/scalar-product'],
    ['info', '3a', 'kb3', '#/3a/info/kb3'],
    ['literacy', 'media', 'truth', '#/media/literacy/truth'],
    ['html-css', 'web', 'w1', '#/web/html-css/w1'],
  ]) {
    assert.equal(routes.hrefTopic({ subject, cls, id }), expected);
    assert.equal(routes.hrefTopic({ subject, cls, id }, 'a b'), expected + '/a%20b');
  }
  assert.deepEqual(follow('#unknown-document'), {});
});
