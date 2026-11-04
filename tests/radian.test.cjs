const { test } = require('node:test');
const assert = require('node:assert/strict');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const { radianTool: tool, radianLesson } = loadTypeScript('src/features/tools/engines/radian.ts');
function numeric(node) {
  switch (node.t) {
    case 'num': return node.q.n / node.q.d;
    case 'paren': return numeric(node.a);
    case 'neg': return -numeric(node.a);
    case 'add': return numeric(node.a) + numeric(node.b);
    case 'sub': return numeric(node.a) - numeric(node.b);
    case 'mul': return numeric(node.a) * numeric(node.b);
    case 'div': return numeric(node.a) / numeric(node.b);
    case 'root': return numeric(node.a) ** (1 / node.n);
    case 'pow': return numeric(node.a) ** numeric(node.e);
    default: throw new Error('Expected numeric expression');
  }
}
test('all requested calculations retain exact fractions and equivalent substitutions', () => {
  [5, 3 / 2, 1, 7 / 4].forEach((expected, example) => {
    const model = tool.build({ example });
    assert.equal(model.answer, expected);
    for (const step of model.steps.slice(1)) {
      const right = step.tokens.at(-1);
      assert.equal(right.kind, 'ast');
      assert(Math.abs(numeric(right.value) - expected) < 1e-12);
    }
    assert.equal(model.steps.at(-1).appendTo, 1);
    if (example === 1 || example === 3) assert.equal(model.steps.at(-1).tokens.at(-1).value.t, 'div');
  });
});
test('impossible equalities and extrema include the required bounds and attainment', () => {
  for (const example of [4, 5]) {
    const model = tool.build({ example });
    assert.equal(model.answer, 'неможливо');
    assert.match(model.steps[1].text, / > 1/);
  }
  [[-3, 3], [2, 6], [1, 3], [0, 1]].forEach((bounds, i) => {
    const model = tool.build({ example: i + 6 });
    assert.deepEqual(model.answer, bounds);
    assert.match(model.steps[2].text, /Мінімум.*максимум/);
    assert.match(model.steps.at(-1).text, /досягаються/);
  });
  for (const example of [-1, 10, 0.5, 'invalid']) assert.throws(() => tool.build({ example }));
});
test('sequential writing accumulates expressions and offers next task only after completion', () => {
  for (let example = 0; example < 10; example++) {
    const model = tool.build({ example });
    const last = model.steps.length - 1;
    const html = tool.view(model, { index: last, step: model.steps[last], anim: null });
    assert.doesNotMatch(html, /9\.[135]|підпункт/);
    assert.equal(html.includes('Наступна задача'), example < 9);
    assert.equal((html.match(/<section class="rp-row/g) || []).length, example < 4 ? 2 : model.steps.length);
  }
  const model = tool.build({ example: 1 });
  assert.equal(tool.prepare(model, 0, 2), null);
  assert.deepEqual(tool.prepare(model, 1, 2), { writing: true });
  const html = tool.view(model, { index: 2, step: model.steps[2], anim: { writing: true } });
  assert(!html.split('data-step="2"')[0].includes('animation:hwdraw'));
  assert(html.split('data-step="2"')[1].includes('animation:hwdraw'));
  assert(!html.includes('Наступна задача'));
});
test('theory explains radian units before trigonometry and uses shared fractions', () => {
  const html = radianLesson();
  assert(html.indexOf('Один радіан') < html.indexOf('Що потрібно для задач'));
  assert.match(html, /довжина якої дорівнює радіусу/);
  assert.match(html, /57,3/);
  assert.match(html, /cos α ≠ 0/);
  assert.match(html, /ffrac/);
});
