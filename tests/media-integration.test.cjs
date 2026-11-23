const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createElement } = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const { catalog } = loadTypeScript('src/data/catalog.ts');
const { mediaContent } = loadTypeScript('src/features/media-literacy/content.ts');
const { MediaTopicPage } = loadTypeScript('src/features/media-literacy/MediaTopicPage.tsx', { external: ['react', 'react-dom'] });
const { composeDocuments } = loadTypeScript('src/features/documents/content/index.ts');
const { resolveRoute, parseRoute } = loadTypeScript('src/navigation/routes.ts');

test('media integration preserves all 27 web lessons and their registered documents', () => {
  const topics = catalog.topics.filter(topic => topic.cls === 'web');
  assert.equal(topics.length, 27);
  const docs = composeDocuments();
  for (const topic of topics) {
    assert(docs[topic.doc], topic.doc);
    assert.equal(resolveRoute(parseRoute(`#/web/html-css/${topic.id}`), catalog).state.topic, topic.id);
  }
});

test('all teacher plans credit sources without placing the source section in student or classroom modes', () => {
  const topics = catalog.topics.filter(topic => topic.cls === 'media');
  for (const topic of topics) {
    for (const robux of topic.id === 'safety' ? [false, true] : [false]) {
      for (const mode of ['teacher', 'student', 'classroom']) {
        const sub = robux ? mode === 'classroom' ? 'robux' : `robux-${mode}` : mode === 'classroom' ? null : mode;
        const html = renderToStaticMarkup(createElement(MediaTopicPage, {
          topic, content: mediaContent[topic.doc], sub,
          pageUrl: 'file:///tmp/stepby-school/index.html#/media/literacy/safety',
        }));
        assert.equal(html.includes('aria-label="Джерела курсу"'), mode === 'teacher');
        if (mode === 'teacher') {
          assert(html.includes('#КодПравди'));
          assert(html.includes('drive.google.com/drive/folders/'));
        }
      }
    }
  }
});
