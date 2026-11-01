import type { PracticeProblem } from '../types';
/* Самостійні задачі § 6: рисунок не розкриває відповіді до перевірки. */
export const VectorPractice = (() => {
  const vec = (name: string) =>
    `<span class="vec-symbol" aria-label="вектор ${name}">${name}</span>`;
  const ab = vec('AB'),
    cd = vec('CD');
  const problems: PracticeProblem[] = [
    {
      id: 'length-straight',
      title: 'Довжина на сітці',
      kind: 'number',
      answer: '6',
      points: [
        [3, 7],
        [9, 7],
      ],
      question: `Одна сторона клітинки — 1 одиниця. Знайди модуль ${ab}.`,
      hint: 'Порахуй проміжки між A і B, а не точки сітки.',
      solution: `Від A до B — 6 клітинок. Отже, |${ab}| = AB = 6.`,
    },
    {
      id: 'length-diagonal',
      title: 'Довжина похилого вектора',
      kind: 'number',
      answer: '5',
      points: [
        [3, 8],
        [7, 5],
      ],
      question: `Одна сторона клітинки — 1 одиниця. Знайди модуль ${ab}.`,
      hint: 'Побудуй подумки прямокутний трикутник. Його катети мають довжини 4 і 3. Використай теорему Піфагора.',
      solution: `Від A до B — 4 клітинки вправо й 3 вгору. За теоремою Піфагора AB² = 4² + 3² = 25. Тому |${ab}| = 5.`,
    },
    {
      id: 'direction',
      title: 'Прочитай напрям',
      kind: 'choice',
      answer: 'opposite',
      points: [
        [3, 8],
        [7, 5],
        [14, 5],
        [10, 8],
      ],
      question: `Як напрямлені ненульові вектори ${ab} і ${cd}?`,
      options: [
        ['same', 'Співнапрямлені'],
        ['opposite', 'Протилежно напрямлені'],
        ['neither', 'Не співнапрямлені й не протилежно напрямлені'],
      ],
      hint: 'Почни рух від A до B, а потім від C до D. Зверни увагу на вістря стрілок.',
      solution: `Вектори лежать на паралельних прямих. Рух від A до B спрямований вправо й угору, а від C до D — вліво й униз. Вектори протилежно напрямлені.`,
    },
    {
      id: 'collinear',
      title: 'Колінеарність і довжина',
      kind: 'choice',
      answer: 'collinear-unequal',
      points: [
        [3, 8],
        [7, 6],
        [9, 7],
        [15, 4],
      ],
      question: `Обери правильне твердження про ${ab} і ${cd}.`,
      options: [
        ['equal', 'Вектори колінеарні та рівні'],
        ['collinear-unequal', 'Вектори колінеарні, але не рівні'],
        ['not-collinear', 'Вектори неколінеарні'],
      ],
      hint: 'Порівняй прямі, на яких лежать вектори, а потім довжини стрілок.',
      solution:
        'Вектори співнапрямлені та лежать на паралельних прямих, тому вони колінеарні. Стрілка CD довша за AB. Різні модулі означають, що ці вектори не рівні.',
    },
    {
      id: 'equality',
      title: 'Вектори в різних місцях',
      kind: 'choice',
      answer: 'equal',
      points: [
        [3, 8],
        [7, 5],
        [10, 9],
        [14, 6],
      ],
      question: `Чи рівні вектори ${ab} і ${cd}?`,
      options: [
        ['equal', 'Так, вони співнапрямлені й мають однакові модулі'],
        ['different-start', 'Ні, бо вони мають різні початки'],
        ['different-line', 'Ні, бо вони лежать на різних прямих'],
      ],
      hint: 'Для рівності потрібні дві умови. Місце розташування вектора не є однією з них.',
      solution: `Обидві стрілки ведуть на 4 клітинки вправо й на 3 вгору. Вектори співнапрямлені та мають однаковий модуль 5. Отже, ${ab} = ${cd}.`,
    },
    {
      id: 'same-length',
      title: 'Чи достатньо однакової довжини',
      kind: 'choice',
      answer: 'unequal',
      points: [
        [3, 8],
        [7, 5],
        [11, 4],
        [14, 8],
      ],
      question: `Відомо, що |${ab}| = |${cd}| = 5. Чи рівні ці вектори?`,
      options: [
        ['equal', 'Так, бо модулі однакові'],
        ['unequal', 'Ні, бо вектори не співнапрямлені'],
        ['position', 'Неможливо визначити без спільного початку'],
      ],
      hint: 'Крім модулів, порівняй напрями. Однакової довжини недостатньо.',
      solution: `Вектори мають однакові модулі, але вони неколінеарні, тому не є співнапрямленими. Отже, ${ab} ≠ ${cd}.`,
    },
    {
      id: 'zero',
      title: 'Коли початок збігається з кінцем',
      kind: 'choice',
      answer: 'zero',
      points: [
        [4, 7],
        [4, 7],
        [10, 8],
        [14, 5],
      ],
      question: `Точки A і B збігаються. Вектор ${cd} ненульовий. Обери правильне твердження.`,
      options: [
        ['undefined', `Модуль ${ab} не визначений`],
        ['zero', `Модуль ${ab} дорівнює 0; вектори колінеарні, але не рівні`],
        ['equal', 'Вектори рівні, бо нульовий вектор колінеарний із будь-яким'],
      ],
      hint: 'Згадай модуль нульового вектора. Чи може він дорівнювати ненульовому вектору?',
      solution: `Якщо A = B, то ${ab} — нульовий вектор і його модуль дорівнює 0. Він колінеарний із будь-яким вектором. Але ${cd} має додатний модуль, тому вектори не рівні. Напрям нульового вектора не визначають.`,
    },
  ];
  function checkAnswer(problem: PracticeProblem, value: string) {
    const answer = String(value).trim();
    if (problem.kind === 'number') {
      if (!/^\d+(?:[.,]\d+)?$/.test(answer))
        return { valid: false, correct: false };
      return {
        valid: true,
        correct: Number(answer.replace(',', '.')) === Number(problem.answer),
      };
    }
    return {
      valid: !!problem.options?.some(([key]) => key === answer),
      correct: answer === problem.answer,
    };
  }
  function diagram(problem: PracticeProblem) {
    const arrows = [];
    const descriptions = [];
    for (let i = 0; i < problem.points.length; i += 2) {
      const [a, b] = problem.points.slice(i, i + 2),
        color = i === 0 ? '#6450c8' : '#087f8c';
      const x = a[0] * 40,
        y = a[1] * 40,
        tx = b[0] * 40,
        ty = b[1] * 40,
        dist = Math.hypot(tx - x, ty - y);
      const name = i === 0 ? 'AB' : 'CD',
        dx = b[0] - a[0],
        dy = b[1] - a[1];
      const movement = [
        dx ? `${Math.abs(dx)} клітинок ${dx > 0 ? 'вправо' : 'вліво'}` : '',
        dy ? `${Math.abs(dy)} клітинок ${dy > 0 ? 'вниз' : 'вгору'}` : '',
      ]
        .filter(Boolean)
        .join(' і ');
      descriptions.push(
        movement
          ? `Вектор ${name}: від початку до кінця ${movement}.`
          : `Початок і кінець вектора ${name} збігаються.`,
      );
      if (dist === 0) {
        arrows.push(
          `<circle cx="${x}" cy="${y}" r="12" fill="none" stroke="${color}" stroke-width="3"/><text x="${x}" y="${y + 32}" fill="${color}">A = B</text>`,
        );
      } else {
        const ux = (tx - x) / dist,
          uy = (ty - y) / dist;
        arrows.push(`<g stroke="${color}" fill="${color}"><line x1="${x}" y1="${y}" x2="${tx - ux * 7}" y2="${ty - uy * 7}" stroke-width="5"/>
          <path d="M ${tx} ${ty} L ${tx - ux * 20 + uy * 8} ${ty - uy * 20 - ux * 8} L ${tx - ux * 20 - uy * 8} ${ty - uy * 20 + ux * 8} Z"/>
          <circle cx="${x}" cy="${y}" r="5"/>
          <text x="${x}" y="${y - 20}" stroke="none">${i === 0 ? 'A' : 'C'}</text><text x="${tx}" y="${ty + 30}" stroke="none">${i === 0 ? 'B' : 'D'}</text></g>`);
      }
    }
    return `<svg viewBox="0 0 720 480" role="img" aria-label="Рисунок до задачі: ${problem.title}" aria-describedby="vec-practice-description">
      <desc id="vec-practice-description">${descriptions.join(' ')} Сторона клітинки — 1 одиниця.</desc>
      <defs><pattern id="vec-practice-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 H 0 V 40" fill="none" stroke="#dddff0" stroke-width="1"/></pattern></defs>
      <rect width="720" height="480" fill="#fafaff"/><rect width="720" height="480" fill="url(#vec-practice-grid)"/>${arrows.join('')}</svg>`;
  }
  return { problems, checkAnswer, diagram };
})();
