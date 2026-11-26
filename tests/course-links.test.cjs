const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createElement } = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const {
  CourseLinksProvider,
  roboticsDocumentNavigation,
  mediaPage,
  roboticsHref,
  mediaLessonHref,
} = loadTypeScript('tests/entries/course-links.ts', {
  external: ['react', 'react-dom'],
});
const { catalog } = loadTypeScript('src/app/catalog/catalog.ts');
const linksFor = (prefix) => ({
  hrefHome: () => prefix,
  hrefCourse: (id, section = 'lessons') => `${prefix}/course/${id}/${section}`,
  hrefTopic: (topic, sub) =>
    `${prefix}/lesson/${topic.id}${sub ? '/' + sub : ''}`,
});

test('course navigation uses the supplied host links, including nested tabs', () => {
  const topic = catalog.topics.find(
    (topic) => topic.subject === 'robot' && topic.id === 'r8',
  );
  const first = linksFor('/first'),
    second = linksFor('/second');
  const navigation = (links) => {
    const result = roboticsDocumentNavigation(topic, links);
    assert.equal(result.breadcrumbs[0].href, links.hrefHome());
    return createElement(CourseLinksProvider, { links }, result.navigation);
  };
  const html = renderToStaticMarkup(
    createElement('div', null, navigation(first), navigation(second)),
  );
  for (const prefix of ['/first', '/second']) {
    assert(html.includes(`href="${prefix}/lesson/lessons"`));
    assert(html.includes(`href="${prefix}/lesson/tools"`));
  }
  assert.equal(
    roboticsHref(first, 'lesson-08', 'practice'),
    '/first/lesson/lesson-08/practice',
  );
});

test('media modes and page breadcrumbs use host links without importing the app router', () => {
  const links = linksFor('/host');
  const topic = catalog.topics.find(
    (topic) => topic.subject === 'literacy' && topic.id === 'safety',
  );
  assert.equal(
    mediaLessonHref(links, topic, true, 'teacher'),
    '/host/lesson/safety/robux-teacher',
  );
  const page = mediaPage({
    topic,
    sub: null,
    pageUrl: 'file:///tmp/index.html',
    links,
  });
  assert.equal(page.breadcrumbs[0].href, '/host');
  assert.equal(page.breadcrumbs[1].href, '/host/course/literacy/lessons');
  const html = renderToStaticMarkup(
    createElement(CourseLinksProvider, { links }, page.content),
  );
  assert(html.includes('href="/host/lesson/safety/practice"'));
});
