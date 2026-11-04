import { radianExamples } from '../data/radian';
import {
  F,
  formulaHtml,
  fmlText,
  type FormulaNode,
} from '../../../engines/core/formula';
import { defineTool } from '../../../engines/core/registry';
import { esc } from '../../../engines/core/util';
import { catalog } from '../../../data/catalog';
import { runtimeServices } from '../../../runtime/services';
import { VectorNotebook } from '../../geometry/engines/vector-notebook';
import type {
  NotebookStep,
  NotebookToken,
} from '../../geometry/engines/notebook-types';
import type { ToolConfig } from '../../../types';

const { num: N, x: X, add, sub, mul, div, pow, root, paren } = F;
const pi = X('π');
const trig = (fn: string, angle: FormulaNode, square = false): FormulaNode => ({
  t: 'mul',
  a: square ? pow(X(fn), 2) : X(fn),
  b: angle,
  imp: true,
  functionCall: true,
});
const deg = (angle: number) => X(`${angle}°`);
const ast = (value: FormulaNode): NotebookToken => ({ kind: 'ast', value });
const text = (value: string): NotebookToken => ({ kind: 'text', value });
const row = (
  label: string,
  explanation: string,
  ...tokens: NotebookToken[]
): NotebookStep => ({ label, text: explanation, tokens });
const equation = (
  label: string,
  explanation: string,
  left: FormulaNode,
  right: FormulaNode,
) => row(label, explanation, ast(left), text('='), ast(right));

const expressions = [
  add(mul(N(2), trig('cos', deg(0))), mul(N(3), trig('sin', deg(90)))),
  add(trig('sin', deg(60), true), trig('cos', deg(30), true)),
  sub(
    add(trig('sin', deg(0)), trig('tg', pi)),
    trig('sin', div(mul(N(3), pi, true), N(2))),
  ),
  add(
    mul(N(2), trig('sin', div(pi, N(4)), true)),
    trig('cos', div(pi, N(6)), true),
  ),
];

export function buildRadian(config: ToolConfig = {}) {
  const index = Number(config.example ?? 0);
  if (!Number.isInteger(index) || !radianExamples[index])
    throw 'Вибери задачу зі списку.';
  const steps: NotebookStep[] = [];
  let condition: string;
  let answer: number | string | number[];
  if (index < 4) {
    const expression = expressions[index];
    condition = `Обчисли значення виразу: ${formulaHtml(expression)}`;
    const equalTokens = (
      left: FormulaNode,
      right: FormulaNode,
    ): NotebookToken[] => [ast(left), text('='), ast(right)];
    const sqrtHalf = (n: number) => div(root(2, N(n)), N(2));
    const known: NotebookToken[][] = [
      [
        ...equalTokens(trig('cos', deg(0)), N(1)),
        text('; '),
        ...equalTokens(trig('sin', deg(90)), N(1)),
      ],
      [
        ...equalTokens(trig('sin', deg(60)), sqrtHalf(3)),
        text('; '),
        ...equalTokens(trig('cos', deg(30)), sqrtHalf(3)),
      ],
      [
        ...equalTokens(trig('sin', deg(0)), N(0)),
        text('; '),
        ...equalTokens(trig('tg', pi), N(0)),
        text('; '),
        ...equalTokens(trig('sin', div(mul(N(3), pi, true), N(2))), N(-1)),
      ],
      [
        ...equalTokens(trig('sin', div(pi, N(4))), sqrtHalf(2)),
        text('; '),
        ...equalTokens(trig('cos', div(pi, N(6))), sqrtHalf(3)),
      ],
    ];
    steps.push(
      row(
        'Значення функцій',
        'Знаходимо значення за одиничним колом або таблицею.',
        ...known[index],
      ),
    );
    const substitutions = [
      add(mul(N(2), N(1)), mul(N(3), N(1))),
      add(
        pow(paren(div(root(2, N(3)), N(2))), 2),
        pow(paren(div(root(2, N(3)), N(2))), 2),
      ),
      sub(add(N(0), N(0)), paren(N(-1))),
      add(
        mul(N(2), pow(paren(div(root(2, N(2)), N(2))), 2)),
        pow(paren(div(root(2, N(3)), N(2))), 2),
      ),
    ];
    const simplified = [
      add(N(2), N(3)),
      add(div(N(3), N(4)), div(N(3), N(4))),
      N(1),
      add(N(1), div(N(3), N(4))),
    ];
    const results = [N(5), div(N(3), N(2)), N(1), div(N(7), N(4))];
    steps.push(
      equation(
        'Обчислення',
        'Підставляємо точні значення функцій.',
        expression,
        substitutions[index],
      ),
    );
    if (index !== 2) {
      steps.push({
        ...equation(
          'Спрощення',
          'Обчислюємо добутки та квадрати.',
          expression,
          simplified[index],
        ),
        appendTo: 1,
      });
    }
    steps.push({
      ...equation(
        'Відповідь',
        index === 2
          ? 'Віднімання від’ємного числа замінюємо додаванням.'
          : 'Виконуємо додавання та скорочуємо дріб.',
        expression,
        results[index],
      ),
      appendTo: 1,
    });
    answer = [5, 1.5, 1, 1.75][index];
  } else if (index < 6) {
    const fn = index === 4 ? 'cos' : 'sin';
    const right = index === 4 ? div(pi, N(3)) : div(N(9), N(8));
    condition = `Чи можлива рівність <span class="sp-condition-equation">${formulaHtml(trig(fn, X('α')))}<span class="sp-condition-equals">=</span>${formulaHtml(right)}</span>?`;
    steps.push(
      row(
        'Область значень',
        'Синус і косинус набувають лише значень від −1 до 1.',
        text(`−1 ≤ ${fn} α ≤ 1`),
      ),
    );
    steps.push(
      row(
        'Порівняння',
        index === 4
          ? 'Оскільки π > 3, то π/3 > 1.'
          : 'Чисельник більший за знаменник, тому 9/8 > 1.',
        ast(right),
        text('>'),
        ast(N(1)),
      ),
    );
    steps.push(
      row(
        'Висновок',
        'Права частина перевищує найбільше можливе значення функції.',
        text('Рівність неможлива'),
      ),
    );
    answer = 'неможливо';
  } else {
    const names = ['3 sin α', '4 + 2 cos α', '2 − sin α', 'sin² α'];
    condition = `Знайди найменше й найбільше значення виразу ${esc(names[index - 6])}.`;
    const bounds = [
      [-3, 3],
      [2, 6],
      [1, 3],
      [0, 1],
    ][index - 6];
    steps.push(
      row(
        'Початкові межі',
        'Використовуємо область значень синуса або косинуса.',
        text(index === 7 ? '−1 ≤ cos α ≤ 1' : '−1 ≤ sin α ≤ 1'),
      ),
    );
    const transforms = [
      [
        'Множимо всі частини нерівності на додатне число 3.',
        '−3 ≤ 3 sin α ≤ 3',
      ],
      [
        'Множимо на 2 та додаємо 4 до всіх частин нерівності.',
        '2 ≤ 4 + 2 cos α ≤ 6',
      ],
      [
        'Множимо на −1 і змінюємо знаки нерівності. Потім додаємо 2.',
        '1 ≤ 2 − sin α ≤ 3',
      ],
      [
        'Квадрат невід’ємний. Найбільший квадрат числа з проміжку [−1; 1] дорівнює 1.',
        '0 ≤ sin² α ≤ 1',
      ],
    ][index - 6];
    steps.push(row('Межі виразу', transforms[0], text(transforms[1])));
    const attainment = [
      'Мінімум при sin α = −1 (α = −π/2); максимум при sin α = 1 (α = π/2).',
      'Мінімум при cos α = −1 (α = π); максимум при cos α = 1 (α = 0).',
      'Мінімум при sin α = 1 (α = π/2); максимум при sin α = −1 (α = −π/2).',
      'Мінімум при sin α = 0 (α = 0); максимум при sin α = ±1 (наприклад, α = π/2).',
    ][index - 6];
    steps.push(
      row(
        'Досяжність меж',
        attainment,
        text(
          [
            'α = −π/2; α = π/2',
            'α = π; α = 0',
            'α = π/2; α = −π/2',
            'α = 0; α = π/2',
          ][index - 6],
        ),
      ),
    );
    steps.push(
      row(
        'Відповідь',
        'Обидві межі досягаються, тому це найменше й найбільше значення.',
        text(`Найменше: ${bounds[0]}; найбільше: ${bounds[1]}`),
      ),
    );
    answer = bounds;
  }
  return { index, condition, answer, steps };
}

export const radianTool = defineTool<ReturnType<typeof buildRadian>>('radian', {
  name: 'Радіанна міра та тригонометричні вирази',
  icon: '📐',
  color: 'var(--primary)',
  bg: 'var(--primary-l)',
  inputHint:
    'Вибери задачу та натискай «Далі», щоб дописувати розв’язання в зошиті.',
  freeHint: 'Обчислюй вирази, перевіряй рівності та знаходь межі значень.',
  build: buildRadian,
  read: (read) => ({ example: Number(read('i_radexample')) }),
  prepare: (_model, from, to) => (to === from + 1 ? { writing: true } : null),
  animate: VectorNotebook.scrollCurrent,
  view(model, context) {
    const topic = catalog.topics.find((t) => t.id === 'radian');
    const next = topic?.tasks?.[model.index + 1];
    return `<div class="rp-sheet sp-tool-sheet"><div class="rp-condition sp-tool-condition">${model.condition}</div>${VectorNotebook.renderRows(model, context)}${context.index === model.steps.length - 1 ? `<div class="sp-tool-next">${next && topic ? `<a class="btn sm" href="${runtimeServices.hrefTopic(topic, next.id)}">Наступна задача →</a>` : '<p>Усі задачі теми розглянуто.</p>'}</div>` : ''}</div>`;
  },
});

export function radianLesson(): string {
  const formula = (...nodes: FormulaNode[]) =>
    `<div class="rp-formula" role="img" aria-label="${esc(nodes.map(fmlText).join(' = '))}">${nodes.map((node) => formulaHtml(node)).join('<span class="rp-equals">=</span>')}</div>`;
  return `<h2>Що таке радіанна міра кута?</h2>
    <p>Кути можна вимірювати в градусах і радіанах. Радіанна міра пов’язує кут із довжиною дуги кола.</p>
    <p><b>Один радіан</b> — це центральний кут, який спирається на дугу, довжина якої дорівнює радіусу кола.</p>
    <svg viewBox="0 0 360 230" role="img" aria-label="Кут один радіан: довжина виділеної дуги l дорівнює радіусу R" style="display:block;width:100%;max-width:420px;margin:16px auto">
      <circle cx="135" cy="130" r="85" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <path d="M135 130 L220 130 M135 130 L180.93 58.48" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M220 130 A85 85 0 0 0 180.93 58.48" fill="none" stroke="var(--primary)" stroke-width="4"/>
      <path d="M162 130 A27 27 0 0 0 149.59 107.28" fill="none" stroke="currentColor"/>
      <g fill="currentColor" font-size="17"><text x="116" y="150">O</text><text x="175" y="151">R</text><text x="174" y="108">1 рад</text><text x="230" y="83">l = R</text></g>
    </svg>
    <p>Радіанна міра α дорівнює відношенню довжини дуги l до радіуса R. Довжини l і R вимірюємо в однакових одиницях.</p>
    ${formula(X('α'), div(X('l'), X('R')))}
    ${formula(X('l'), mul(X('α'), X('R'), true))}
    <p>Це відношення не залежить від розміру кола. Якщо l = 2R, кут дорівнює 2 рад.</p>
    <h2>Як перейти від градусів до радіанів?</h2>
    <p>Довжина кола дорівнює 2πR. Повний оберт містить 2π рад, а пів оберту — π рад.</p>
    ${formula(X('360° = 2π рад; 180° = π рад'))}
    <p>Щоб перевести градуси в радіани, помнож число градусів на π/180.</p>
    <p>Тут a — число градусів, α — радіанна міра кута.</p>
    ${formula(X('α'), mul(X('a'), div(pi, N(180))))}
    ${formula(deg(60), div(pi, N(3)))}
    ${formula(deg(90), div(pi, N(2)))}
    ${formula(deg(270), div(mul(N(3), pi, true), N(2)))}
    <p>Щоб перевести радіани в градуси, помнож радіанну міру на 180/π. Один радіан приблизно дорівнює 57,3°.</p>
    ${formula(div(pi, N(4)), deg(45))}
    ${formula(div(pi, N(6)), deg(30))}
    <h2>Кут повороту та одиничне коло</h2>
    <p>Одиничне коло має радіус 1 і центр у початку координат. Початкова точка — P₀(1; 0).</p>
    <p>Поворот проти годинникової стрілки має додатний кут. Поворот за годинниковою стрілкою має від’ємний кут.</p>
    <p>Кути α і α + 2πk, де k — ціле число, приводять у ту саму точку кола.</p>
    <h2>Що потрібно для задач?</h2>
    <p>Після повороту на кут α точка має координати P(cos α; sin α). Косинус — це її абсциса, синус — ордината.</p>
    ${formula(X('−1 ≤ sin α ≤ 1; −1 ≤ cos α ≤ 1'))}
    <p>Тангенс дорівнює sin α / cos α. Він визначений, коли cos α ≠ 0.</p>
    <p>Якщо біля аргументу немає знака градуса, кут задано в радіанах. Наприклад, sin π — це синус кута 180°.</p>
    <p>Запис sin² α означає (sin α)². Спочатку знаходимо синус, потім підносимо його до квадрата.</p>
    <h3>Точні значення для обчислень</h3>
    ${formula(trig('sin', N(0)), N(0))}
    ${formula(trig('cos', N(0)), N(1))}
    ${formula(trig('sin', div(pi, N(2))), N(1))}
    ${formula(trig('sin', div(mul(N(3), pi, true), N(2))), N(-1))}
    ${formula(trig('tg', pi), N(0))}
    ${formula(trig('sin', deg(60)), trig('cos', deg(30)), div(root(2, N(3)), N(2)))}
    ${formula(trig('sin', div(pi, N(4))), div(root(2, N(2)), N(2)))}
    ${formula(trig('cos', div(pi, N(6))), div(root(2, N(3)), N(2)))}
    <p>У задачах використовуй точні значення з π, коренями та дробами. Округлення тут не потрібне.</p>`;
}
