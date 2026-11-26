const { test } = require('node:test');
const assert = require('node:assert/strict');
const { renderToStaticMarkup } = require('react-dom/server');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const { catalog } = loadTypeScript('src/app/catalog/catalog.ts');
const { documentNavigationFor } = loadTypeScript(
  'src/app/documents/navigation.ts',
  { external: ['react', 'react-dom'] },
);
const { parseRoute, resolveRoute } = loadTypeScript(
  'src/app/navigation/routes.ts',
);

for (const [subjectId, topicId, section, href] of [
  ['robot', 'r8', 'Інструменти', '#/robo/robot/tools'],
  ['robot', 'r9', 'Інструменти', '#/robo/robot/tools'],
  ['robot', 'r5', 'Заняття', '#/robo/robot/lessons'],
  ['info', 'kb3', 'Інструменти', '#/courses/info/tools'],
  ['info', 'win4', 'Інструменти', '#/courses/info/tools'],
  ['info', 'i3k', 'Заняття', '#/courses/info'],
  ['info', 'i4a', 'Заняття', '#/courses/info'],
]) {
  test(`${subjectId}/${topicId}: course navigation preserves its section, links and current tab`, () => {
    const topic = catalog.topics.find(
      (t) => t.subject === subjectId && t.id === topicId,
    );
    const subject = catalog.subjects.find((s) => s.id === subjectId);
    const { breadcrumbs, navigation } = documentNavigationFor(topic, subject);
    assert.deepEqual(
      breadcrumbs.map((p) => p.text),
      ['Головна', subject.name, section, topic.title],
    );
    assert.equal(breadcrumbs[2].href, href);
    assert.equal(breadcrumbs.at(-1).href, undefined);
    for (const crumb of breadcrumbs.filter((p) => p.href)) {
      const route = resolveRoute(parseRoute(crumb.href), catalog);
      assert.notEqual(route.state, undefined, crumb.href);
    }
    const html = renderToStaticMarkup(navigation);
    assert.match(
      html,
      new RegExp(
        `<a[^>]*href="${href}"[^>]*aria-current="page"[^>]*>${section}</a>`,
      ),
    );
  });
}

test('documents without course-specific navigation use the common breadcrumb layout', () => {
  const topic = catalog.topics.find(
    (t) => t.subject === 'geometry' && t.id === 'scalar-product',
  );
  const subject = catalog.subjects.find((s) => s.id === topic.subject);
  assert.deepEqual(documentNavigationFor(topic, subject), {
    breadcrumbs: [
      { text: 'Головна', href: '#/' },
      { text: subject.name, href: '#/courses/geometry' },
      { text: topic.title },
    ],
  });
});
