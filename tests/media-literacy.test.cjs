const { test } = require('node:test');
const assert = require('node:assert/strict');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const { catalog } = loadTypeScript('src/data/catalog.ts');
const { parseRoute, resolveRoute } = loadTypeScript('src/navigation/routes.ts');
const { mediaDocuments } = loadTypeScript('src/features/media-literacy/content.ts');
const { robuxSteps, isRobuxAnswerCorrect, robuxPlan } = loadTypeScript('src/features/media-literacy/robux.ts');

test('media course opens its four themes directly, independently of school subjects', () => {
  assert.deepEqual(resolveRoute(parseRoute('#/media'), catalog), { redirect: '#/media/literacy' });
  const topics = catalog.topics.filter(topic => topic.cls === 'media');
  assert.equal(topics.length, 4);
  for (const topic of topics) {
    assert(mediaDocuments[topic.doc], 'course document exists');
    assert.deepEqual(resolveRoute(parseRoute(`#/media/literacy/${topic.id}`), catalog).state, { cls: 'media', subject: 'literacy', topic: topic.id, sub: null });
  }
  assert(!catalog.subjects.find(subject => subject.id === 'info').cls.includes('media'));
  assert.deepEqual(resolveRoute(parseRoute('#/4a'), catalog), { state: { cls: '4a' } });
});

test('deep-linked Robux lesson and invalid course routes resolve safely', () => {
  assert.deepEqual(resolveRoute(parseRoute('#/media/literacy/safety/robux'), catalog).state, { cls: 'media', subject: 'literacy', topic: 'safety', sub: 'robux' });
  assert.deepEqual(resolveRoute(parseRoute('#/media/info'), catalog), { redirect: '#/media' });
  assert.deepEqual(resolveRoute(parseRoute('#/media/literacy/missing'), catalog), { redirect: '#/media/literacy' });
});

test('partial, repeated and extra answers cannot complete a Robux step', () => {
  assert.equal(isRobuxAnswerCorrect(robuxSteps[0], ['gift', 'password']), false);
  assert.equal(isRobuxAnswerCorrect(robuxSteps[0], ['gift', 'password', 'hurry', 'hurry']), false);
  assert.equal(isRobuxAnswerCorrect(robuxSteps[0], ['hurry', 'password', 'gift']), true);
  assert.equal(isRobuxAnswerCorrect(robuxSteps[1], ['support', 'likes']), false);
  for (const step of robuxSteps) {
    assert.equal(isRobuxAnswerCorrect(step, []), false);
    assert.equal(isRobuxAnswerCorrect(step, step.correct), true);
  }
});

test('teacher timeline accounts for the complete lesson and a bounded computer practice', () => {
  assert.equal(robuxPlan[0].from, 0);
  assert.equal(robuxPlan.at(-1).to, 45);
  robuxPlan.slice(1).forEach((stage, i) => assert.equal(stage.from, robuxPlan[i].to));
  const practice = robuxPlan.findIndex(stage => stage.mode.includes('за комп’ютером'));
  assert.equal(robuxPlan[practice].to - robuxPlan[practice].from, 12);
  assert.equal(robuxPlan[practice - 1].title, 'Гімнастика для очей');
});

test('every course theme has a complete journey and real local illustration files', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const { journeys } = loadTypeScript('src/features/media-literacy/stories.ts');
  const { mediaTopics } = loadTypeScript('src/features/media-literacy/content.ts');
  for (const topic of mediaTopics) {
    const journey = journeys[topic.id];
    assert(journey, 'topic opens an authored journey');
    assert.equal(journey.scenes.length, 4);
    assert(journey.finalTask && journey.success);
    const image = fs.readFileSync(path.resolve(__dirname, '..', topic.cover));
    let width;
    if (topic.cover.endsWith('.jpg')) {
      assert.equal(image.subarray(0, 2).toString('hex'), 'ffd8');
      assert.equal(image.subarray(-2).toString('hex'), 'ffd9');
      for (let offset = 2; offset + 9 < image.length;) {
        assert.equal(image[offset], 0xff);
        const marker = image[offset + 1];
        if (marker === 0xc0 || marker === 0xc2) { width = image.readUInt16BE(offset + 7); break; }
        const length = image.readUInt16BE(offset + 2);
        assert(length >= 2);
        offset += length + 2;
      }
    } else {
      assert.equal(image.subarray(1, 4).toString(), 'PNG');
      width = image.readUInt32BE(16);
    }
    assert(width >= 1024, 'illustration has usable resolution');
    for (const scene of journey.scenes) {
      assert(scene.chat.messages.length >= 2, 'story includes conversation context');
      assert.equal(scene.choices.filter(choice => choice.safe).length, 1);
      assert(scene.activity && scene.discuss.length >= 2);
    }
  }
});

const { mediaLessonRoute, mediaLessonHref, studentLessonUrl } = loadTypeScript('src/features/media-literacy/lesson-routes.ts');
const { qrMatrix } = loadTypeScript('src/features/media-literacy/qr.ts');
const safetyTopic = catalog.topics.find(topic => topic.cls === 'media' && topic.id === 'safety');

test('lesson modes have direct routes; default is classroom and QR entry is student-only', () => {
  assert.deepEqual(mediaLessonRoute(null), { robux: false, view: 'classroom' });
  assert.deepEqual(mediaLessonRoute('robux'), { robux: true, view: 'classroom' });
  for (const robux of [false, true]) {
    for (const view of ['classroom', 'practice', 'teacher', 'student']) {
      const href = mediaLessonHref(safetyTopic, robux, view);
      const result = resolveRoute(parseRoute(href), catalog);
      assert(result.state);
      assert.deepEqual(mediaLessonRoute(result.state.sub), { robux, view });
    }
  }
});

test('student QR links use the agreed public base while preserving local test URLs', () => {
  const file = 'file:///Users/teacher/Documents/медіа урок/index.html#/media/literacy/safety/robux';
  const local = new URL(studentLessonUrl(file, safetyTopic, true));
  assert.equal(local.protocol, 'file:');
  assert.equal(decodeURIComponent(local.pathname), '/Users/teacher/Documents/медіа урок/index.html');
  assert.equal(local.hash, '#/media/literacy/safety/robux-student');
  const deployed = studentLessonUrl('https://vmyronovych.github.io/stepby-school/?preview=1#/media/literacy/safety', safetyTopic, false);
  assert.equal(deployed, 'https://vmyronovych.github.io/stepby-school/#/media/literacy/safety/student');
  assert.equal(new URL(studentLessonUrl('http://localhost:4173/index.html#/media', safetyTopic, true)).origin, 'http://localhost:4173');
  for (const pageUrl of [
    'https://vmyronovych.github.io/stepby-school/index.html?preview=1#/media',
    'https://preview.example.org/temporary/index.html#/media',
  ]) {
    for (const topic of catalog.topics.filter(item => item.cls === 'media')) {
      assert.equal(studentLessonUrl(pageUrl, topic, false), `https://vmyronovych.github.io/stepby-school/#/media/literacy/${topic.id}/student`);
    }
    assert.equal(studentLessonUrl(pageUrl, safetyTopic, true), 'https://vmyronovych.github.io/stepby-school/#/media/literacy/safety/robux-student');
  }
  for (const url of [local.href, deployed]) {
    const matrix = qrMatrix(url);
    assert(matrix.length >= 21 && matrix.length <= 177);
    assert(matrix.every(row => row.length === matrix.length && row.every(value => typeof value === 'boolean')));
  }
});

const { practiceTasks, practiceSources, practiceSolved, practiceFeedback, freshPracticeAttempt } = loadTypeScript('src/features/media-literacy/practice-content.ts');
const { classroomScenes } = loadTypeScript('src/features/media-literacy/classroom.ts');

test('every media lesson uses separate transfer tasks with ordinary and risky situations', () => {
  const ids = new Set();
  for (const [topic, tasks] of Object.entries(practiceTasks)) {
    assert.equal(tasks.length, topic === 'robux' ? 5 : 4);
    assert(tasks.some(task => task.kind === 'ordinary'));
    assert(tasks.some(task => task.kind === 'risk'));
    const shown = classroomScenes(topic === 'robux' ? 'safety' : topic, topic === 'robux');
    const dialogs = new Set(shown.map(scene => scene.chat.messages.map(m => m.text).join('\n')));
    for (const task of tasks) {
      assert(!ids.has(task.id)); ids.add(task.id);
      assert(!dialogs.has(task.chat.messages.map(m => m.text).join('\n')), 'practice does not reuse a demonstrated conversation');
      assert(task.skill && task.transfer && task.consequence && task.rule);
      assert(task.actions[task.correctAction] && task.reasons[task.correctReason]);
      assert(task.actions.every(option => option.text && option.feedback));
      assert(task.reasons.every(option => option.text && option.feedback));
      assert(task.sourceIds.length && task.sourceIds.every(id => practiceSources[id]?.url.startsWith('https://')));
    }
    assert(new Set(tasks.map(task => task.correctAction)).size > 1, 'correct action is not always in one position');
    assert(new Set(tasks.map(task => task.correctReason)).size > 1, 'correct reason is not always in one position');
  }
  assert.equal(ids.size, 21);
});

test('a checked correct action alone cannot complete a practice task', () => {
  for (const task of Object.values(practiceTasks).flat()) {
    assert.equal(practiceSolved(task, freshPracticeAttempt()), false);
    assert.equal(practiceSolved(task, {action:task.correctAction,reason:task.correctReason,checked:false}), false);
    assert.equal(practiceSolved(task, {action:task.correctAction,reason:null,checked:true}), false);
    assert.equal(practiceSolved(task, {action:task.correctAction,reason:(task.correctReason+1)%task.reasons.length,checked:true}), false);
    assert.equal(practiceSolved(task, {action:(task.correctAction+1)%task.actions.length,reason:task.correctReason,checked:true}), false);
    assert.equal(practiceSolved(task, {action:task.correctAction,reason:task.correctReason,checked:true}), true);
  }
});


test('every choice has a matching reason, including mistaken choices, in every lesson', () => {
  for (const task of Object.values(practiceTasks).flat()) {
    assert.deepEqual([...new Set(task.reasons.map(r => r.action))].sort(), task.actions.map((_, i) => i), task.id);
    assert.equal(task.reasons[task.correctReason].action, task.correctAction, task.id);
    for (const reason of task.reasons) assert(task.actions[reason.action], task.id);
  }
});


test('feedback addresses the selected reasoning for every combination of choices', () => {
  for (const task of Object.values(practiceTasks).flat()) {
    for (let action = 0; action < task.actions.length; action++) {
      for (let reason = 0; reason < task.reasons.length; reason++) {
        const attempt = { action, reason, checked: true };
        const feedback = practiceFeedback(task, attempt);
        const actionCorrect = action === task.correctAction;
        const reasonCorrect = reason === task.correctReason;
        assert.equal(feedback.text, task.reasons[reason].feedback, task.id + ": respond to the child’s selected reasoning");
        if (actionCorrect && reasonCorrect) assert.equal(feedback.title, 'Так, правильно!');
        else if (reasonCorrect) assert.equal(feedback.title, 'Ти правильно пояснюєш. А як тоді вчинити?');
        else if (actionCorrect) assert.equal(feedback.title, 'Дія підходить. Розберімо твоє пояснення.');
        else assert(!feedback.title.includes('правильн'));
        assert.equal(practiceSolved(task, attempt), actionCorrect && reasonCorrect);
        assert.equal(practiceFeedback(task, { ...attempt, checked: false }), null);
        assert.equal(practiceFeedback(task, { ...attempt, action: null }), null);
        assert.equal(practiceFeedback(task, { ...attempt, reason: null }), null);
      }
    }
  }
});


test('a mistaken forwarding choice with a hearts explanation receives the hearts lesson', () => {
  const task = practiceTasks.truth.find(task => task.id === 'truth-library');
  const feedback = practiceFeedback(task, {action: 0, reason: 2, checked: true});
  assert.equal(feedback.title, 'Не зовсім так. Розберімося.');
  assert.equal(feedback.text, task.reasons[2].feedback);
  assert.notEqual(feedback.text, task.actions[0].feedback);
  assert(feedback.text.includes('Сердечко — це реакція, а не перевірка.'));
  assert(feedback.text.includes('не знаємо'));
  assert(feedback.text.includes('бібліотекаря'));
  assert.equal(practiceSolved(task, {action: 0, reason: 2, checked: true}), false);
});

test('reaction clues are visible on the referenced messages throughout classroom and practice', () => {
  const { createElement } = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const { ChatScene } = loadTypeScript('src/features/media-literacy/ChatScene.tsx', { external: ['react', 'react-dom'] });
  const demonstrated = ['truth', 'publishing', 'games', 'safety'].flatMap(topic => classroomScenes(topic, false));
  const robux = classroomScenes('safety', true);
  const stories = [...demonstrated, ...robux, ...Object.values(practiceTasks).flat()].map(scene => scene.chat);
  assert.equal(stories.length, 42);
  let messageCount = 0;
  for (const story of stories) {
    const html = renderToStaticMarkup(createElement(ChatScene, {story}));
    const withReactions = story.messages.filter(message => message.reactions?.length);
    if (story.medium === 'in-person') {
      assert.equal(withReactions.length, 0);
      assert(!html.includes('media-chat-reactions'));
      continue;
    }
    const bubbles = html.split('<div class="media-chat-bubble">').slice(1);
    assert.equal(bubbles.length, story.messages.length);
    story.messages.forEach((message, i) => {
      if (!message.reactions?.length) {
        assert(!bubbles[i].includes('media-chat-reactions'));
        return;
      }
      messageCount++;
      for (const reaction of message.reactions) {
        assert(Number.isInteger(reaction.count) && reaction.count > 0);
        const kind = reaction.kind === 'heart' ? 'сердечко' : 'подобається';
        assert(bubbles[i].includes(`aria-label="Реакції «${kind}»: ${reaction.count}"`));
        assert(bubbles[i].includes(reaction.count.toLocaleString('uk-UA')));
        assert(!bubbles[i].includes('<button'), 'reaction is illustrative, not a voting control');
      }
    });
  }
  assert.equal(messageCount, 2);
  const library = practiceTasks.truth.find(task => task.id === 'truth-library');
  assert.deepEqual(library.chat.messages[0].reactions, [{kind: 'heart', count: 24}]);
  assert(library.chat.messages[1].text.includes('сердечок'));
  assert.deepEqual(robux[1].chat.messages.find(message => message.author === 'Lucky_Player').reactions, [{kind: 'like', count: 2400}]);
  assert(robux[1].context.includes('2400'));
  assert(robux[1].options.some(option => option.includes('2400')));
});

test('all live conversations use storybook artwork matching their speakers', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const { journeys } = loadTypeScript('src/features/media-literacy/stories.ts');
  const { robuxStories } = loadTypeScript('src/features/media-literacy/robux-stories.ts');
  const stories = [
    ...Object.values(journeys).flatMap(journey => journey.scenes.map(scene => scene.chat)),
    ...robuxStories.map(scene => scene.chat),
    ...Object.values(practiceTasks).flatMap(tasks => tasks.map(task => task.chat)),
  ];
  let live = 0;
  for (const story of stories) {
    if (story.medium !== 'in-person') continue;
    live++;
    const authors = [...new Set(story.messages.map(message => message.author))];
    for (const message of story.messages) {
      assert(message.comicArt, `${story.name}: illustration for ${message.author}`);
      const image = fs.readFileSync(path.resolve(__dirname, '..', message.comicArt.src));
      assert.equal(image.subarray(1, 4).toString(), 'PNG');
      const width = image.readUInt32BE(16), height = image.readUInt32BE(20);
      if (message.comicArt.panel !== undefined) {
        assert.equal(message.comicArt.panel, authors.indexOf(message.author));
        assert(width / height > 2.8 && width / height < 3.2, 'strip contains two landscape panels');
      }
      assert(width >= 1024);
    }
  }
  assert.equal(live, 11);
});
