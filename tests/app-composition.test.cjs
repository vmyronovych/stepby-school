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

test('startup connects notebook lesson links without exposing the application catalog', () => {
  const {
    initializeApplication,
    notebookLinks,
    lessonNote,
    engineState,
    catalog,
  } = loadTypeScript('tests/entries/composition.ts');
  assert.equal(lessonNote('mult', 'Множення'), '');
  initializeApplication();
  const lookup = notebookLinks.lessonForTool;
  assert.equal(notebookLinks.lessonForTool, lookup);
  for (const cls of ['5a', '6a', null]) {
    engineState.cls = cls;
    const topic = lookup('mult');
    assert.deepEqual(topic, {
      title: catalog.topics.find((t) => t.id === 't1' && t.subject === 'math')
        .title,
      href: '#/courses/math/t1',
    });
    assert.match(lessonNote('mult', 'Множення'), /href="#\/courses\/math\/t1"/);
  }
  assert.equal(lookup('unknown-tool'), null);
});
