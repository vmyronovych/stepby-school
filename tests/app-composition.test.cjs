const { test } = require('node:test');
const assert = require('node:assert/strict');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');

test('course imports do not register tools or documents; application startup is explicit and idempotent', () => {
  const { initializeApplication, catalog, documents, tools } = loadTypeScript(
    'tests/entries/composition.ts',
  );
  assert.deepEqual(Object.keys(catalog.tools), []);
  assert.deepEqual(Object.keys(documents), []);
  initializeApplication();
  assert.equal(Object.keys(catalog.tools).length, 17);
  assert.equal(Object.keys(documents).length, 54);
  const definitions = Object.values(catalog.tools);
  const sections = Object.values(documents);
  initializeApplication();
  assert.deepEqual(Object.values(catalog.tools), definitions);
  assert.deepEqual(Object.values(documents), sections);
  for (const tool of tools) assert.equal(catalog.tools[tool.id], tool);
});

test('every registered course tool has exactly one course-owned input form', () => {
  const { tools, toolInputs } = loadTypeScript('tests/entries/composition.ts');
  const ids = tools.map((tool) => tool.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(Object.keys(toolInputs).sort(), ids.sort());
  for (const input of Object.values(toolInputs))
    assert.equal(typeof input, 'function');
});

test('tool link lookup uses its supplied class without application startup or copied state', () => {
  const { createToolLinks, catalog, lessonNote } = loadTypeScript(
    'tests/entries/composition.ts',
  );
  assert.deepEqual(Object.keys(catalog.tools), []);
  const alternatives = ['5a', '6a'].map((cls) => ({
    id: 'test-' + cls,
    cls,
    subject: 'math',
    title: cls,
    desc: '',
    tasks: [{ id: cls, tool: 'test-tool', title: '', cfg: {}, done: false }],
  }));
  catalog.topics.push(...alternatives);
  const first = createToolLinks('5a'),
    second = createToolLinks('6a');
  assert.equal(first.lessonForTool('test-tool').title, '5a');
  assert.equal(second.lessonForTool('test-tool').title, '6a');
  assert.equal(first.lessonForTool('test-tool').title, '5a');
  assert.equal(createToolLinks(null).lessonForTool('test-tool').title, '5a');
  assert.equal(first.lessonForTool('unknown-tool'), null);
  assert.equal(lessonNote(null, 'Пояснення'), '');
  assert.match(
    lessonNote(first.lessonForTool('mult'), 'Множення'),
    /href="#\/courses\/math\/t1"/,
  );
});
