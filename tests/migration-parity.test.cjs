const { test } = require('node:test');
const assert = require('node:assert/strict');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const { digest } = require('./helpers/parity.cjs');
const baseline = require('./fixtures/migration-parity.json');
// This import also proves the complete runtime can be composed without a DOM.
const { engine } = loadTypeScript('src/runtime/index.ts');

test('all 77 task models and all 656 step views match the original engines', () => {
 let steps = 0;
 for (const task of baseline.tasks) {
  const definition = engine.DB.tools[task.tool];
  const model = definition.build(task.config);
  assert.equal(digest(model), task.model, `${task.id}: model`);
  const views = model.steps.map((step,index) => definition.view(model,{step,index,anim:null}));
  assert.equal(digest(views), task.steps, `${task.id}: rendered steps`);
  steps += views.length;
 }
 assert.equal(baseline.tasks.length,77);
 assert.equal(steps,656);
});

test('the 23 documents and pre-existing lesson catalog match the original content', () => {
 const documents = Object.fromEntries(Object.entries(engine.DOCS).filter(([id]) => !['web-page', 'text-formatting', 'css-intro', 'lists-lines'].includes(id)).map(([id,doc]) => [id,{title:doc.title,html:doc.html,app:doc.app}]));
 assert.equal(Object.keys(documents).length,23);
 assert.equal(digest(documents),baseline.documents);
 assert.equal(digest(engine.DB.topics.filter(topic => !['radian', 'web-page', 'text-formatting', 'css-intro', 'lists-lines'].includes(topic.id))),baseline.topics);
});
