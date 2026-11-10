import { htmlDocument, type WebTask } from './tasks';

const base = `    body { font-family: Arial, sans-serif; background-color: #f0fdfa; color: #134e4a; }
    h1 { text-align: center; }
    div { box-sizing: border-box; }`;
const cabinCss = `    .cabin { position: relative; width: 240px; height: 280px; margin-inline: auto; }
    .roof { position: absolute; top: 0; left: 0; width: 0; height: 0; border-left: 120px solid transparent; border-right: 120px solid transparent; border-bottom: 90px solid #9a3412; }
    .wall { position: absolute; top: 90px; left: 0; width: 240px; height: 190px; background-color: #fef3c7; border: 2px solid #92400e; }
    .door { position: absolute; bottom: 0; left: 150px; width: 56px; height: 100px; background-color: #92400e; border: 2px solid #451a03; }
    .window { position: absolute; top: 110px; left: 34px; width: 64px; height: 64px; background-color: #bae6fd; border: 4px solid #0369a1; }`;
const cabinBody = `<h1>Хатинка біля стежки</h1>
<div class="cabin"><div class="roof"></div><div class="wall"></div><div class="door"></div><div class="window"></div></div>
<p>Стіни, дах, двері й вікно прив’язані до одного контейнера.</p>`;

export const blockElementsTasks: WebTask[] = [
  {
    id: 'blocks-cabin',
    title: 'Хатинка біля стежки',
    brief:
      'Намалюй хатинку чотирма порожніми div усередині .cabin. Задай контейнеру position: relative, ширину 240px і висоту 280px. Усі деталі розмісти абсолютно відносно нього. Після малюнка додай абзац.',
    text: 'Хатинка біля стежки\nСтіни, дах, двері й вікно прив’язані до одного контейнера.',
    checklist: [
      'Є h1 та .cabin з чотирма прямими дочірніми div: .roof, .wall, .door, .window.',
      'Контейнер має margin-inline: auto; усі div — box-sizing: border-box.',
      'Дах має width: 0, height: 0; бічні рамки 120px solid transparent, нижня — 90px solid #9a3412; top: 0, left: 0.',
      'Стіна: top: 90px, left: 0, width: 240px, height: 190px, фон #fef3c7, рамка 2px solid #92400e.',
      'Двері: bottom: 0, left: 150px, width: 56px, height: 100px, фон #92400e, рамка 2px solid #451a03.',
      'Вікно: top: 110px, left: 34px, width і height: 64px, фон #bae6fd, рамка 4px solid #0369a1.',
      'Абзац починається після контейнера. Переміщення контейнера переносить усі деталі разом.',
    ],
    hint: 'Запиши деталі в порядку дах → стіна → двері → вікно. Пізніші деталі закривають попередні в місцях перетину. Висота контейнера потрібна, бо абсолютні деталі не створюють йому висоту.',
    referenceHeight: 450,
    reference: htmlDocument(
      'Хатинка біля стежки',
      cabinBody,
      base + '\n' + cabinCss,
    ),
  },
  {
    id: 'blocks-nature-cards',
    title: 'Три знахідки',
    brief:
      'Створи три картки в контейнері .collection. Використай display: inline-block і vertical-align: top. У кожній картці розмісти h2, зображення та опис. У широкому вікні картки стоять поруч, у вузькому переходять на наступний рядок.',
    text: 'Три знахідки\nЛисток\nПомічаємо форму й прожилки.\nКвітка\nРахуємо пелюстки та порівнюємо кольори.\nПтах\nСпостерігаємо здалеку й не турбуємо птаха.',
    checklist: [
      '.collection має text-align: center; три .card є сусідами.',
      '.card має display: inline-block, vertical-align: top, width: 200px, max-width: 100%, margin: 8px, padding: 12px.',
      'Картки мають фон #ffffff, рамку 2px solid #0f766e, border-radius: 12px та box-sizing: border-box.',
      'Використано leaf.svg, flower.svg, bird.svg зі змістовними alt; ширина img — 150px, max-width: 100%, height: auto.',
      'Кожна картка має h2 й окремий p. Різна довжина описів не зміщує верхню межу.',
      'Немає застарілого align; заголовок і картки центровані CSS.',
    ],
    hint: 'Пробіли між inline-block залишають невеликі проміжки. Не забороняй перенесення рядка: воно потрібне для вузького екрана.',
    referenceHeight: 480,
    reference: htmlDocument(
      'Три знахідки',
      `<h1>Три знахідки</h1>
<div class="collection">
<div class="card"><h2>Листок</h2><img src="leaf.svg" alt="Зелений листок"><p>Помічаємо форму й прожилки.</p></div>
<div class="card"><h2>Квітка</h2><img src="flower.svg" alt="Квітка"><p>Рахуємо пелюстки та порівнюємо кольори.</p></div>
<div class="card"><h2>Птах</h2><img src="bird.svg" alt="Птах на гілці"><p>Спостерігаємо здалеку й не турбуємо птаха.</p></div>
</div>`,
      base +
        `
    .collection { text-align: center; }
    .card { display: inline-block; vertical-align: top; width: 200px; max-width: 100%; margin: 8px; padding: 12px; background-color: #fff; border: 2px solid #0f766e; border-radius: 12px; }
    img { width: 150px; max-width: 100%; height: auto; }`,
    ),
  },
  {
    id: 'blocks-cabin-homework',
    title: 'Домашня робота: друге вікно',
    brief:
      'Доповни хатинку другим вікном і сонцем. Для другого вікна використай класи window second-window. Сонце розмісти через position: fixed у правому верхньому куті вікна. Додай приховану чернетку з display: none. Перевір сонце під час прокручування.',
    text: 'Хатинка біля стежки\nДва вікна дивляться на стежку.\nКінець прогулянки\nЦе чернетка підпису.',
    checklist: [
      'Хатинка зберігає будову й розміри попереднього завдання.',
      'Друге вікно має top: 110px, left: 120px, width: 64px, height: 64px; обидва вікна містяться в стіні.',
      '.sun має position: fixed, top: 12px, right: 12px, width і height: 40px, border-radius: 50%, фон #fbbf24.',
      '.draft із текстом «Це чернетка підпису.» має display: none і не залишає порожнього місця.',
      'Кінцевий абзац має margin-top: 260px. Зменш висоту вікна для перевірки прокручування.',
      'h1 має padding-right: 50px, щоб сонце не закривало заголовок у вузькому вікні.',
      'Під час прокручування хатинка рухається зі сторінкою, а сонце залишається біля краю вікна.',
      'Готовий HTML завантажено; його можна знову відкрити в редакторі для продовження.',
    ],
    hint: 'Селектор .second-window записуй після .window: він замінить left для другого вікна. У вбудованому перегляді fixed прив’язаний до вікна перегляду, а в окремому HTML — до вікна браузера.',
    referenceHeight: 820,
    reference: htmlDocument(
      'Два вікна',
      `<h1>Хатинка біля стежки</h1>
<div class="sun"></div>
<div class="cabin"><div class="roof"></div><div class="wall"></div><div class="door"></div><div class="window"></div><div class="window second-window"></div></div>
<p>Два вікна дивляться на стежку.</p><p class="draft">Це чернетка підпису.</p><p class="ending">Кінець прогулянки</p>`,
      base +
        '\n' +
        cabinCss +
        `
    h1 { padding-right: 50px; }
    .second-window { left: 120px; }
    .sun { position: fixed; top: 12px; right: 12px; width: 40px; height: 40px; border-radius: 50%; background-color: #fbbf24; }
    .draft { display: none; }
    .ending { margin-top: 260px; }`,
    ),
  },
];

export const blockElementsStarter = htmlDocument(
  'Блоки та розташування',
  '  <!-- Додай контейнери й вміст. -->',
  '    /* Спочатку створи будову, потім розмісти деталі. */',
);
