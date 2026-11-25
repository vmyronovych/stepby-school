const { test } = require('node:test');
const assert = require('node:assert/strict');
const { renderToStaticMarkup } = require('react-dom/server');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const { catalog, createCatalog } = loadTypeScript('src/app/catalog/catalog.ts');
const { courses } = loadTypeScript('src/app/catalog/registry.ts');
const { CourseTopics } = loadTypeScript('src/app/catalog/screens/CourseTopics.tsx');
const { pageTitle, getSnapshot } = loadTypeScript('src/app/controller.ts');

test('each course supplies all its catalog entries without cross-course or duplicate topics', () => {
  const ids = new Set();
  for (const course of courses) {
    assert(course.topics.length, course.subject.id);
    assert(!ids.has(course.subject.id));
    ids.add(course.subject.id);
    const topics = new Set();
    for (const topic of course.topics) {
      assert.equal(topic.subject, course.subject.id);
      const key = `${topic.cls}/${topic.id}`;
      assert(!topics.has(key), key);
      topics.add(key);
    }
  }
});

test('changing the course list automatically selects and orders its subjects and topics', () => {
  const selected = [courses.at(-1), courses[0]];
  const result = createCatalog(selected);
  assert.deepEqual(result.subjects, selected.map(c => c.subject));
  assert.deepEqual(result.topics, selected.flatMap(c => c.topics));
  assert.equal(result.subjects[0], selected[0].subject);
  assert.equal(result.topics[0], selected[0].topics[0]);
  assert.equal(result.topics.at(-1), selected[1].topics.at(-1));
  assert.deepEqual(createCatalog([]), { subjects: [], topics: [], tools: {} });
});

test('all course and lesson titles work without a school-class directory', () => {
  const base = getSnapshot();
  assert.equal(pageTitle(base), 'StepBy School — шкільні предмети крок за кроком');
  for (const subject of catalog.subjects) {
    assert.equal(pageTitle({ ...base, subject: subject.id }), `${subject.name} — StepBy School`);
    for (const topic of catalog.topics.filter(t => t.subject === subject.id)) {
      assert.equal(pageTitle({ ...base, subject: subject.id, cls: topic.cls, topic: topic.id }),
        `${topic.title} · ${subject.name} — StepBy School`);
    }
  }
  assert.equal(pageTitle({ ...base, subject: 'info', sub: 'tools' }),
    'Інструменти · Інформатика — StepBy School');
});

test('lesson groups follow explicit grades independently of address namespaces', () => {
  const subject = catalog.subjects.find(s => s.id === 'info');
  const original = catalog.topics.find(t => t.id === 'i3k' && t.subject === subject.id);
  const topics = [
    { ...original, id: 'multi', cls: 'unrelated-address', grades: [4, 3] },
    { ...original, id: 'ungrouped', cls: '10a', grades: undefined },
  ];
  const html = renderToStaticMarkup(CourseTopics({ subject, catalog: { ...catalog, topics } }))
    .replace(/<!--.*?-->/g, '');
  assert.deepEqual([...html.matchAll(/<h2[^>]*>(\d+) клас<\/h2>/g)].map(m => m[1]), ['3', '4']);
  assert.equal(html.split('href="#/unrelated-address/info/multi"').length - 1, 2);
  assert.equal(html.split('href="#/10a/info/ungrouped"').length - 1, 1);
});


test('informatics retains the original grade groups after removing the class directory', () => {
  for (const topic of catalog.topics.filter(t => t.subject === 'info')) {
    assert.deepEqual(topic.grades, [topic.cls === '3a' ? 3 : 4], topic.id);
  }
});


test('a new session has no pre-completed tasks', () => {
  for (const topic of catalog.topics)
    for (const task of topic.tasks ?? []) assert.equal(task.done, false, task.id);
});
