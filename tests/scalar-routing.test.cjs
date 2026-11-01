const { test } = require('node:test');
const assert = require('node:assert/strict');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const { catalog } = loadTypeScript('src/data/catalog.ts');
const { parseRoute, resolveRoute, hrefTopic, hrefTool } = loadTypeScript(
  'src/navigation/routes.ts',
);
const resolve = (hash) => resolveRoute(parseRoute(hash), catalog);

test('задачі документа відкривають інструмент, розділи лишаються документом', () => {
  const topic = catalog.topics.find((t) => t.id === 'scalar-product');
  assert.equal(topic.tasks.length, 11);
  for (const task of topic.tasks) {
    const result = resolve('#/9a/geometry/scalar-product/' + task.id);
    assert.equal(result.state.tool, 'scalar-product');
    assert.equal(result.state.toolTaskId, task.id);
    assert.deepEqual(result.state.toolCfg, task.cfg);
  }
  for (const sub of ['', '/sp-theory-title', '/sp-practice-title']) {
    const result = resolve('#/9a/geometry/scalar-product' + sub);
    assert.equal(result.state.tool, undefined);
    assert.equal(result.state.topic, 'scalar-product');
  }
});

test('попередні документи й задачі алгебри зберігають маршрути', () => {
  assert.equal(resolve('#/9a/geometry/vector-scaling').state.tool, undefined);
  assert.equal(
    resolve('#/9a/geometry/vector-scaling/section').state.sub,
    'section',
  );
  const task = catalog.topics.find((t) => t.id === 'rational-power').tasks[0];
  assert.equal(
    resolve('#/10a/math/rational-power/' + task.id).state.tool,
    'rational-power',
  );
});

test('кожний приклад множення вектора відкривається за своєю адресою', () => {
  const topic = catalog.topics.find((t) => t.id === 'vector-scaling');
  assert.equal(topic.tasks.length, 6);
  for (let i = 0; i < topic.tasks.length; i++) {
    const task = topic.tasks[i],
      result = resolve('#/9a/geometry/vector-scaling/' + task.id);
    assert.equal(result.state.tool, 'vector-scaling');
    assert.equal(result.state.toolTaskId, 'scaling-' + (i + 1));
    assert.equal(result.state.toolCfg.example, i);
  }
});

test('invalid paths redirect to the nearest known route', () => {
  assert.equal(resolve('#/unknown').redirect, '#/');
  assert.equal(resolve('#/5a/unknown').redirect, '#/5a');
  assert.equal(resolve('#/5a/ukr').redirect, '#/5a');
  assert.equal(resolve('#/5a/math/unknown').redirect, '#/5a/math');
  assert.equal(resolve('#/5a/math/t1/unknown').redirect, '#/5a/math/t1');
  assert.equal(resolve('#/tool/unknown').redirect, '#/');
  assert.deepEqual(parseRoute('#/%E0%A4%A'), {});
});

test('custom conditions round trip and malformed conditions fall back to the task', () => {
  const topic = catalog.topics.find((t) => t.id === 'rational-power');
  const task = topic.tasks[0];
  const custom = { example: '6.3', note: '√ & ? українська' };
  const hash =
    hrefTopic(topic, task.id) +
    '?c=' +
    encodeURIComponent(JSON.stringify(custom));
  assert.deepEqual(resolve(hash).state.toolCfg, custom);
  for (const value of ['bad', 'null', '42', '[]']) {
    assert.deepEqual(
      resolve(hrefTopic(topic, task.id) + '?c=' + value).state.toolCfg,
      task.cfg,
    );
  }
  assert.deepEqual(parseRoute(hrefTool('add', { a: 7, b: 5 })), {
    tool: 'add',
    cfg: { a: 7, b: 5 },
  });
});

test('legacy document links preserve deep anchors', () => {
  const topic = catalog.topics.find((t) => t.doc === 'mod1');
  assert.ok(topic);
  assert.equal(resolve('#mod1').redirect, hrefTopic(topic));
  assert.equal(resolve('#mod1-3').redirect, hrefTopic(topic, 'mod1-3'));
  assert.equal(resolve('#missing-anchor').redirect, '#/');
});
