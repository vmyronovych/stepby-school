import { htmlDocument, type WebTask } from './tasks';

export const externalCssTasks: WebTask[] = [
  {
    id: 'external-css-meadow',
    title: 'Мапа природничої гри',
    brief:
      'Створи власну сцену «Мапа знахідок» із шістьма нерухомими мітками. HTML містить link на style.css у head; усі правила пиши в окремому полі CSS. Фон meadow.svg задається для body. Кожна мітка має зображення та текстову назву.',
    text: 'Мапа знахідок\nПрокрути сторінку: мітки залишаться на місці.\nКвітка\nЛисток\nПтах\nКролик\nКомети\nХвилі\nКінець маршруту',
    checklist: [
      'У head є <link rel="stylesheet" href="style.css">; у полі CSS немає тегів style.',
      'body має margin: 0, padding: 12px, box-sizing: border-box, шрифт Arial, фон #ecfdf5 і url("meadow.svg") із background-size: cover.',
      'h1 і вступ мають світлий фон #ffffff; h1 має margin: 0.',
      'Шість .marker мають position: fixed, width: 76px, text-align: center, фон #ffffff, рамку 2px solid #0f766e, padding: 4px, box-sizing: border-box.',
      'Мітки .flower/.leaf/.bird мають top: 30% і left: 5%/37%/69%; .rabbit/.comets/.waves — top: 65% і ті самі left.',
      'Кожна мітка містить img з відповідним flower.svg, leaf.svg, bird.svg, rabbit.svg, comets.svg або waves.svg; width: 44px, height: auto, alt=""; назва є сусіднім текстом.',
      'Кінцевий p має margin-top: 480px. При прокручуванні мітки стоять біля тих самих точок вікна.',
      'Завантажено HTML і style.css поруч. Зміна ширини вікна не ховає праві мітки.',
    ],
    hint: 'Відсотки top у fixed відраховуються від висоти вікна, left — від ширини. Фон і текст прокручуються, мітки — ні. Така сцена демонструє fixed; для міток, прив’язаних до самої мапи, використовуй absolute у relative-контейнері.',
    referenceHeight: 650,
    reference: htmlDocument(
      'Мапа знахідок',
      `<h1>Мапа знахідок</h1><p class="intro">Прокрути сторінку: мітки залишаться на місці.</p>
<div class="marker flower"><img src="flower.svg" alt=""><br>Квітка</div>
<div class="marker leaf"><img src="leaf.svg" alt=""><br>Листок</div>
<div class="marker bird"><img src="bird.svg" alt=""><br>Птах</div>
<div class="marker rabbit"><img src="rabbit.svg" alt=""><br>Кролик</div>
<div class="marker comets"><img src="comets.svg" alt=""><br>Комети</div>
<div class="marker waves"><img src="waves.svg" alt=""><br>Хвилі</div>
<p class="ending">Кінець маршруту</p>`,
      `    body { margin: 0; padding: 12px; box-sizing: border-box; font-family: Arial, sans-serif; color: #134e4a; background-color: #ecfdf5; background-image: url("meadow.svg"); background-size: cover; }
    h1, .intro { background-color: #fff; }
    h1 { margin: 0; }
    .marker { position: fixed; width: 76px; text-align: center; background-color: #fff; border: 2px solid #0f766e; padding: 4px; box-sizing: border-box; }
    img { width: 44px; height: auto; }
    .flower, .leaf, .bird { top: 30%; }
    .rabbit, .comets, .waves { top: 65%; }
    .flower, .rabbit { left: 5%; }
    .leaf, .comets { left: 37%; }
    .bird, .waves { left: 69%; }
    .ending { margin-top: 480px; }`,
    ),
  },
  {
    id: 'external-css-notebook',
    title: 'Картка польового щоденника',
    brief:
      'Створи картку «Польовий щоденник». Підключи style.css, а CSS пиши в окремому полі. Зображення leaf.svg обтікається текстом зліва. Підкресли службові назви класом .label на span, а важливе попередження познач strong.',
    text: 'Польовий щоденник\nЗбираємо спостереження, а не рослини.\nМісце: міський парк\nІнструменти: олівець і блокнот\nНе зривай незнайомі рослини.\nДо списку\nСписок спостережень\nФорма листка\nКолір і прожилки',
    checklist: [
      '.note має width: 620px, max-width: 100%, box-sizing: border-box, margin: 20px auto, padding: 18px, фон #fff, рамку 2px solid #0f766e, border-radius: 12px.',
      '.note має display: flow-root; leaf.svg із alt має float: left, width: 140px, max-width: 40%, height: auto, margin: 0 16px 10px 0.',
      'h1 має margin: 0 0 12px і колір #115e59; p мають margin: 8px 0.',
      'Слова «Місце:» та «Інструменти:» обгорнуто span class="label"; .label має font-weight: bold і color: #9a3412.',
      'Попередження позначено strong за змістом; посилання «До списку» веде на #observations.',
      'Посилання має display: inline-block, padding: 6px 10px, border: 2px solid #0f766e, color: #134e4a. :hover та :focus-visible дають фон #ccfbf1.',
      'Після картки є h2 id="observations" і список із двох пунктів. Обтікання не виходить за межі .note.',
      'HTML та CSS завантажено в одну папку й перевірено без мережі.',
    ],
    hint: 'span оформлює частину речення без нового абзацу. display: flow-root на картці утримує float усередині неї. Для центрування картки задай margin-inline: auto або margin: 20px auto.',
    referenceHeight: 480,
    reference: htmlDocument(
      'Польовий щоденник',
      `<div class="note"><img src="leaf.svg" alt="Зелений листок із прожилками"><h1>Польовий щоденник</h1><p>Збираємо спостереження, а не рослини.</p><p><span class="label">Місце:</span> міський парк</p><p><span class="label">Інструменти:</span> олівець і блокнот</p><p><strong>Не зривай незнайомі рослини.</strong></p><a href="#observations">До списку</a></div>
<h2 id="observations">Список спостережень</h2><ul><li>Форма листка</li><li>Колір і прожилки</li></ul>`,
      `    body { background-color: #f1f5f9; color: #134e4a; font-family: Arial, sans-serif; }
    .note { display: flow-root; width: 620px; max-width: 100%; box-sizing: border-box; margin: 20px auto; padding: 18px; background-color: #fff; border: 2px solid #0f766e; border-radius: 12px; }
    img { float: left; width: 140px; max-width: 40%; height: auto; margin: 0 16px 10px 0; }
    h1 { margin: 0 0 12px; color: #115e59; }
    p { margin: 8px 0; }
    .label { font-weight: bold; color: #9a3412; }
    a { display: inline-block; padding: 6px 10px; border: 2px solid #0f766e; color: #134e4a; }
    a:hover, a:focus-visible { background-color: #ccfbf1; }`,
    ),
  },
  {
    id: 'external-css-gallery',
    title: 'Домашня робота: колекція наліпок',
    brief:
      'Створи галерею шести власних наліпок із матеріалів. Два div class="row" містять по три div class="sticker". Кожна картка містить зображення й підпис. CSS зберігай окремо у style.css. На вузькому екрані дозволяй карткам переходити на новий рядок.',
    text: 'Колекція наліпок\nКвітка — сад\nЛисток — стежка\nПтах — небо\nКролик — луки\nКомети — рух\nХвилі — вода',
    checklist: [
      'Є один h1, два .row і шість .sticker; HTML підключає style.css.',
      'body має шрифт Arial, text-align: center, фон #eff6ff, колір #172554.',
      '.row має margin-bottom: 20px; .sticker має display: inline-block, vertical-align: top, width: 190px, max-width: 100%, box-sizing: border-box, margin: 8px.',
      'Картки мають фон #fff, border: 3px solid #1e3a8a, border-radius: 12px; :hover змінює border-color на #9a3412.',
      'Шість img мають відповідні SVG, width: 100%, height: auto; alt="", бо підписи вже називають кожну ілюстрацію.',
      'Підписи p мають margin: 0, padding: 10px 5px, фон #1e3a8a, колір #ffffff, font-weight: bold.',
      'Картка з листком додатково має клас special і рамку #9a3412. При наведенні її фон стає #ffedd5.',
      'Немає фіксованої висоти карток; текст і рамки видно при ширині 390px. HTML, CSS та локальні зображення перевірено офлайн.',
    ],
    hint: 'У .sticker ширина 190px уже включає рамку через border-box. У img width: 100% відраховується від області вмісту картки. Правила :hover можна доповнити :focus-visible для посилань, але ці картки не є посиланнями.',
    referenceHeight: 650,
    reference: htmlDocument(
      'Колекція наліпок',
      `<h1>Колекція наліпок</h1>
<div class="row"><div class="sticker"><img src="flower.svg" alt=""><p>Квітка — сад</p></div> <div class="sticker special"><img src="leaf.svg" alt=""><p>Листок — стежка</p></div> <div class="sticker"><img src="bird.svg" alt=""><p>Птах — небо</p></div></div>
<div class="row"><div class="sticker"><img src="rabbit.svg" alt=""><p>Кролик — луки</p></div> <div class="sticker"><img src="comets.svg" alt=""><p>Комети — рух</p></div> <div class="sticker"><img src="waves.svg" alt=""><p>Хвилі — вода</p></div></div>`,
      `    body { font-family: Arial, sans-serif; text-align: center; background-color: #eff6ff; color: #172554; }
    .row { margin-bottom: 20px; }
    .sticker { display: inline-block; vertical-align: top; width: 190px; max-width: 100%; box-sizing: border-box; margin: 8px; background-color: #fff; border: 3px solid #1e3a8a; border-radius: 12px; }
    .sticker:hover { border-color: #9a3412; }
    img { width: 100%; height: auto; }
    p { margin: 0; padding: 10px 5px; background-color: #1e3a8a; color: #fff; font-weight: bold; }
    .special { border-color: #9a3412; }
    .special:hover { background-color: #ffedd5; }`,
    ),
  },
];

export const externalCssStarter = htmlDocument(
  'Зовнішній CSS',
  '  <!-- Додай вміст. Стилі пиши в окремому полі CSS. -->',
).replace('</head>', '  <link rel="stylesheet" href="style.css">\n</head>');
