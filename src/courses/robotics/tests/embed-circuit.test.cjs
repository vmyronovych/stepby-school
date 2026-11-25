const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const {
  loadTypeScript,
} = require('../../../../tests/helpers/load-typescript.cjs');
const script = path.resolve(
  'src/courses/robotics/.agents/skills/embed-circuit/scripts/embed.mjs',
);
const tool = import('../.agents/skills/embed-circuit/scripts/embed.mjs');

async function fixture(t, lessonSource) {
  const directory = await fs.mkdtemp(
    path.join(os.tmpdir(), 'embed-circuit-test-'),
  );
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  const lessonPath = path.join(directory, 'lesson.ts');
  const presetPath = path.join(directory, 'experiment.ts');
  const discussionPath = path.join(directory, 'discussion.json');
  const discussion = {
    title: 'Дослід',
    prompt: 'Замкніть вимикач.',
    text: 'Струм проходить замкненим колом.',
    question: 'Що змінилося?',
    answer: 'Лампа засвітилася.',
  };
  await fs.writeFile(
    lessonPath,
    lessonSource ??
      `
    // Keep this author's note.
    const embeddedCircuit = 'unrelated binding';
    export const content = {
      number: 99,
      classroomMaterials: [{kind: 'program', title: 'Програма'}],
      slides: [{material: 'program', title: 'Початковий матеріал', text: 'Зберегти цей текст', question: 'Питання', answer: 'Відповідь'}],
      practice: ['Unchanged practice'],
    };
  `,
  );
  await fs.writeFile(
    presetPath,
    `export const preset = { id: 'test-circuit', title: 'Коло', description: 'Опис', board: { parts: [], wires: [] } };`,
  );
  await fs.writeFile(discussionPath, JSON.stringify(discussion));
  return {
    lessonPath,
    presetPath,
    presetExport: 'preset',
    discussionPath,
    discussion,
    directory,
  };
}

test('embed script connects a preset, preserves unrelated content and is idempotent', async (t) => {
  const input = await fixture(t),
    { embedCircuit } = await tool;
  const presetBefore = await fs.readFile(input.presetPath, 'utf8');
  const original = loadTypeScript(input.lessonPath).content;
  const result = await embedCircuit(input);
  assert.equal(result.changed, true);
  const updated = loadTypeScript(input.lessonPath).content;
  assert.equal(updated.experiment.id, 'test-circuit');
  assert.deepEqual(updated.classroomMaterials, [
    { kind: 'experiment', title: 'Дослід' },
    ...original.classroomMaterials,
  ]);
  assert.deepEqual(updated.slides, [
    { material: 'experiment', ...input.discussion },
    ...original.slides,
  ]);
  assert.deepEqual(updated.practice, original.practice);
  assert.match(result.source, /Keep this author's note/);
  assert.match(result.source, /embeddedCircuit2/);
  assert.equal(await fs.readFile(input.presetPath, 'utf8'), presetBefore);
  assert.equal((await embedCircuit(input)).changed, false);
  assert.equal(await fs.readFile(input.lessonPath, 'utf8'), result.source);
});

test('embed script updates its discussion without duplicating the material or import', async (t) => {
  const input = await fixture(t),
    { embedCircuit } = await tool;
  await embedCircuit(input);
  const discussion = {
    ...input.discussion,
    title: 'Зміна стану',
    question: 'Що станеться після розмикання?',
    followup: { question: 'Чому?', answer: 'Шлях розімкнений.' },
  };
  await fs.writeFile(input.discussionPath, JSON.stringify(discussion));
  await embedCircuit(input);
  const result = loadTypeScript(input.lessonPath).content;
  assert.equal(
    result.classroomMaterials.filter((item) => item.kind === 'experiment')
      .length,
    1,
  );
  assert.equal(result.classroomMaterials[0].title, discussion.title);
  assert.deepEqual(result.slides[0], { material: 'experiment', ...discussion });
  assert.equal(result.slides.length, 2);
  assert.equal((await embedCircuit(input)).changed, false);
});

test('embed CLI dry run produces valid source without writing any file', async (t) => {
  const input = await fixture(t);
  const before = await fs.readFile(input.lessonPath, 'utf8');
  const preview = execFileSync(
    process.execPath,
    [
      script,
      '--lesson',
      input.lessonPath,
      '--preset',
      input.presetPath,
      '--export',
      input.presetExport,
      '--discussion',
      input.discussionPath,
      '--dry-run',
    ],
    { encoding: 'utf8' },
  );
  assert.match(preview, /experiment: embeddedCircuit2/);
  assert.equal(await fs.readFile(input.lessonPath, 'utf8'), before);
});

test('embed script refuses to overwrite a different existing experiment', async (t) => {
  const input = await fixture(
    t,
    `export const content = { experiment: { id: 'original' }, classroomMaterials: [], slides: [] };`,
  );
  const before = await fs.readFile(input.lessonPath, 'utf8');
  await assert.rejects(
    (await tool).embedCircuit(input),
    /different experiment/,
  );
  assert.equal(await fs.readFile(input.lessonPath, 'utf8'), before);
});

test('embed script rejects missing exports, incomplete discussion and opaque arrays before writing', async (t) => {
  const input = await fixture(t),
    { embedCircuit } = await tool;
  const before = await fs.readFile(input.lessonPath, 'utf8');
  await assert.rejects(
    embedCircuit({ ...input, presetExport: 'missing' }),
    /export const missing/,
  );
  await fs.writeFile(input.discussionPath, JSON.stringify({ title: 'Дослід' }));
  await assert.rejects(embedCircuit(input), /requires prompt/);
  assert.equal(await fs.readFile(input.lessonPath, 'utf8'), before);
  await fs.writeFile(input.discussionPath, JSON.stringify(input.discussion));
  const opaque = `export const content = { classroomMaterials: getMaterials(), slides: [] };`;
  await fs.writeFile(input.lessonPath, opaque);
  await assert.rejects(embedCircuit(input), /explicit array/);
  assert.equal(await fs.readFile(input.lessonPath, 'utf8'), opaque);
});

test('embed script keeps preset ownership within the selected lesson', async (t) => {
  const input = await fixture(t),
    { embedCircuit } = await tool;
  const child = path.join(input.directory, 'another-lesson');
  await fs.mkdir(child);
  const childLesson = path.join(child, 'lesson.ts');
  await fs.copyFile(input.lessonPath, childLesson);
  const before = await fs.readFile(childLesson, 'utf8');
  await assert.rejects(
    embedCircuit({ ...input, lessonPath: childLesson }),
    /inside the lesson folder/,
  );
  assert.equal(await fs.readFile(childLesson, 'utf8'), before);
});
