import { htmlDocument, type WebTask } from './tasks';

const baseCss = `    body { margin: 0; padding: 16px; font-family: Arial, sans-serif; color: #164e63; background-color: #f0fdfa; }
    h1 { text-align: center; }
    img { width: 72px; max-width: 100%; height: auto; }`;

export const flexWrapTasks: WebTask[] = [
  {
    id: 'flex-wrap-garden',
    title: 'Сад із двома рядами',
    brief:
      'Створи шість ділянок саду в контейнері garden. Дозволь перенос на новий рядок. Притисни всю групу рядків до верху через align-content, а окремі ділянки — до низу свого рядка через align-items. Додай під садом текстове пояснення спостереження.',
    text: 'Сад команди\nКвітник | Стежка | Гніздо | Галявина | Паросток | Луг\nМалюнки: flower.svg, leaf.svg, bird.svg, rabbit.svg, leaf.svg, flower.svg\nРядки починаються зверху. Нижні краї ділянок збігаються в межах кожного рядка.',
    checklist: [
      'Є h1 та garden із шістьма div.plot. Кожна ділянка має картинку, h2 і p з текстом «Ділянка саду».',
      'garden: display: flex, flex-wrap: wrap, justify-content: center, align-items: flex-end, align-content: flex-start, gap: 12px.',
      'garden має width: 100%, max-width: 600px, min-height: 560px, margin-inline: auto та рамку 2px solid #0f766e.',
      'plot: width: 150px, padding: 10px, рамка 2px solid #0f766e, text-align: center, фон #ccfbf1. h2 має 18px.',
      'Друга й п’ята ділянки мають клас tall і padding-top: 30px. Решта отримують звичайний padding.',
      'При ширині 720px є два ряди по три ділянки. На вузькому екрані рядів більше; після саду є пояснення.',
    ],
    hint: 'align-content керує всіма рядками, align-items — картками всередині кожного рядка. Якщо на вузькому екрані рядки вищі за контейнер, збільш його висоту: простір для вирівнювання має залишатися.',
    referenceHeight: 760,
    reference: htmlDocument(
      'Сад команди',
      `<h1>Сад команди</h1>
<div class="garden">
  <div class="plot"><img src="flower.svg" alt="Знак квітника"><h2>Квітник</h2><p>Ділянка саду</p></div>
  <div class="plot tall"><img src="leaf.svg" alt="Знак стежки"><h2>Стежка</h2><p>Ділянка саду</p></div>
  <div class="plot"><img src="bird.svg" alt="Знак гнізда"><h2>Гніздо</h2><p>Ділянка саду</p></div>
  <div class="plot"><img src="rabbit.svg" alt="Знак галявини"><h2>Галявина</h2><p>Ділянка саду</p></div>
  <div class="plot tall"><img src="leaf.svg" alt="Знак паростка"><h2>Паросток</h2><p>Ділянка саду</p></div>
  <div class="plot"><img src="flower.svg" alt="Знак лугу"><h2>Луг</h2><p>Ділянка саду</p></div>
</div>
<p>Рядки починаються зверху. Нижні краї ділянок збігаються в межах кожного рядка.</p>`,
      baseCss +
        `
    .garden { display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-end; align-content: flex-start; gap: 12px; width: 100%; max-width: 600px; min-height: 560px; margin-inline: auto; border: 2px solid #0f766e; }
    .plot { width: 150px; padding: 10px; border: 2px solid #0f766e; text-align: center; background-color: #ccfbf1; }
    .plot h2 { font-size: 18px; }
    .tall { padding-top: 30px; }`,
    ),
  },
  {
    id: 'flex-wrap-order',
    title: 'Вітрина знаків',
    brief:
      'Створи чотири незалежні картки знаків у порядку Листок, Птах, Кролик, Квітка в HTML. Постав Квітку першою на екрані через order: -1. Усередині кожної картки розташуй картинку, назву та опис вертикально через flex-direction: column.',
    text: 'Вітрина знаків\nЛисток — Знак зеленої стежки.\nПтах — Знак високої вежі.\nКролик — Знак тихої галявини.\nКвітка — Знак кольорового саду.\nМалюнки: leaf.svg, bird.svg, rabbit.svg, flower.svg',
    checklist: [
      'vitrine містить чотири div.card у вихідному порядку Листок, Птах, Кролик, Квітка.',
      'vitrine: display: flex, flex-wrap: wrap, gap: 12px, justify-content: center.',
      'card: flex: 1, min-width: 140px, display: flex, flex-direction: column, align-items: center, justify-content: center.',
      'Картки мають padding: 12px, рамку 2px solid #0f766e, фон #ccfbf1, text-align: center. h2 має 20px.',
      'Квітка має додатковий клас featured та order: -1. Інші картки залишають order: 0.',
      'Візуально порядок Квітка, Листок, Птах, Кролик. У HTML Квітка досі остання; картки не містять послідовних інструкцій чи кнопок.',
    ],
    hint: 'order задавай картці, а не її заголовку. Браузер сортує спочатку за числом order, а за однакових чисел зберігає порядок HTML.',
    referenceHeight: 520,
    reference: htmlDocument(
      'Вітрина знаків',
      `<h1>Вітрина знаків</h1>
<div class="vitrine">
  <div class="card"><img src="leaf.svg" alt="Листок"><h2>Листок</h2><p>Знак зеленої стежки.</p></div>
  <div class="card"><img src="bird.svg" alt="Птах"><h2>Птах</h2><p>Знак високої вежі.</p></div>
  <div class="card"><img src="rabbit.svg" alt="Кролик"><h2>Кролик</h2><p>Знак тихої галявини.</p></div>
  <div class="card featured"><img src="flower.svg" alt="Квітка"><h2>Квітка</h2><p>Знак кольорового саду.</p></div>
</div>`,
      baseCss +
        `
    .vitrine { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
    .card { flex: 1; min-width: 140px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 12px; border: 2px solid #0f766e; background-color: #ccfbf1; text-align: center; }
    .card h2 { font-size: 20px; }
    .featured { order: -1; }`,
    ),
  },
  {
    id: 'flex-wrap-laboratory',
    title: 'Домашня робота: лабораторія рядків',
    brief:
      'Створи три підписані приклади з п’ятьма однаковими блоками A–E. Перший показує перенос і центрування рядків, другий — вертикальний напрямок, третій — візуальний порядок. Кожен блок має фіксований розмір 70 × 50px разом із рамкою.',
    text: 'Лабораторія Flexbox\nПеренос і центр рядків\nВертикальний напрямок\nВізуальний порядок\nУ кожному прикладі HTML містить A, B, C, D, E. У третьому результат: E, D, A, B, C.',
    checklist: [
      'Є h1, три h2 та три div.lab. Кожен lab містить п’ять div.box із літерами A–E в HTML.',
      'lab: display: flex, gap: 8px, width: 260px, max-width: 100%, padding: 8px, рамка 2px solid #64748b.',
      'box: box-sizing: border-box, width: 70px, height: 50px, flex: none, рамка 2px solid #0f766e, фон #ccfbf1.',
      'Перший lab має клас wrapped: flex-wrap: wrap, height: 220px, align-content: center. Рядки групуються в центрі висоти.',
      'Другий має клас column: flex-direction: column. Блоки стоять згори вниз у порядку HTML.',
      'Третій має клас ordered: flex-wrap: wrap. Для його E задай order: -2, для D — order: -1. Решта мають order: 0.',
      'Тимчасово зміни wrapped на nowrap і порівняй результат. Потім поверни wrap. Збережи HTML і перевір офлайн.',
    ],
    hint: 'flex: none вимикає ріст і стискання блоків. Тоді nowrap справді покаже нестачу місця. Не використовуй order для зміни логічних кроків інструкції.',
    referenceHeight: 1050,
    reference: htmlDocument(
      'Лабораторія Flexbox',
      `<h1>Лабораторія Flexbox</h1>
<h2>Перенос і центр рядків</h2>
<div class="lab wrapped"><div class="box">A</div><div class="box">B</div><div class="box">C</div><div class="box">D</div><div class="box">E</div></div>
<h2>Вертикальний напрямок</h2>
<div class="lab column"><div class="box">A</div><div class="box">B</div><div class="box">C</div><div class="box">D</div><div class="box">E</div></div>
<h2>Візуальний порядок</h2>
<div class="lab ordered"><div class="box">A</div><div class="box">B</div><div class="box">C</div><div class="box fourth">D</div><div class="box fifth">E</div></div>`,
      baseCss +
        `
    .lab { display: flex; gap: 8px; width: 260px; max-width: 100%; padding: 8px; border: 2px solid #64748b; }
    .box { box-sizing: border-box; width: 70px; height: 50px; flex: none; border: 2px solid #0f766e; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; }
    .wrapped { flex-wrap: wrap; height: 220px; align-content: center; }
    .column { flex-direction: column; }
    .ordered { flex-wrap: wrap; }
    .fourth { order: -1; }
    .fifth { order: -2; }`,
    ),
  },
];

export const flexWrapStarter = htmlDocument(
  'Напрямок і перенесення',
  '  <!-- Додай flex-контейнер і кілька карток. -->',
  '    /* Задай напрямок, перенесення й вирівнювання рядків. */',
);
