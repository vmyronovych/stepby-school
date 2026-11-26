const { test } = require('node:test');
const assert = require('node:assert/strict');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
// Definitions are used directly: no application startup or link configuration.
const { tools } = loadTypeScript('src/app/tools/registry.ts');
const linksFor = (prefix) =>
  Object.freeze({
    lessonForTool: (id) => ({ title: id, href: `${prefix}/lesson/${id}` }),
    hrefTopic: (topic, sub) => `${prefix}/topic/${topic.id}/${sub || ''}`,
    hrefTool: (id) => `${prefix}/tool/${id}`,
  });
const hrefs = (html) =>
  [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
for (const [id, config] of [
  ['nsk', { a: 24, b: 36 }],
  ['nsd', { a: 24, b: 36 }],
  ['irrational', { text: 'sqrt(x-2)=3' }],
  ['radian', { example: 0 }],
  ['scalar-product', { group: 0, part: 0 }],
  ['vector-scaling', { example: 0 }],
]) {
  test(`${id}: the same model can render with independent host links without initialization`, () => {
    const definition = tools.find((tool) => tool.id === id);
    const model = definition.build(config);
    const index = model.steps.length - 1;
    const context = { step: model.steps[index], index, anim: null };
    const first = linksFor('#/host-a'),
      second = linksFor('#/host-b');
    const render = (links) => hrefs(definition.view(model, context, links));
    const firstLinks = render(first),
      secondLinks = render(second);
    assert(
      firstLinks.length > 0,
      'the example must contain a lesson or next-task link',
    );
    assert(firstLinks.every((href) => href.startsWith('#/host-a/')));
    assert(secondLinks.every((href) => href.startsWith('#/host-b/')));
    assert.deepEqual(
      render(first),
      firstLinks,
      'another render must not replace the first host links',
    );
  });
}
