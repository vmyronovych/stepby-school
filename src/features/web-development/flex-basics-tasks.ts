import { htmlDocument, type WebTask } from './tasks';

const baseCss = `    body { margin: 0; padding: 16px; font-family: Arial, sans-serif; color: #17324d; background-color: #eff6ff; }
    h1 { text-align: center; color: #155e75; }
    img { max-width: 100%; height: auto; }`;

export const flexBasicsTasks: WebTask[] = [
  {
    id: 'flex-basics-gallery',
    title: 'Чотири знаки природи',
    brief:
      'Створи галерею з чотирма рівними частинами. У кожній розмісти малюнок і підпис. Зовнішній контейнер scene центрує галерею по двох осях. Кожен sign теж є flex-контейнером і центрує свою картинку. Підписи розмісти під окремим рядом малюнків.',
    text: 'Знаки природи\nКвітка | Листок | Птах | Кролик\nМалюнки: flower.svg, leaf.svg, bird.svg, rabbit.svg',
    checklist: [
      'Є h1 «Знаки природи», контейнер scene та gallery із чотирма безпосередніми div.sign.',
      'scene: display: flex, justify-content: center, align-items: center, min-height: 260px.',
      'gallery: display: flex, width: 100%, gap: 8px. sign: flex: 1, min-width: 0, display: flex, justify-content: center, align-items: center.',
      'Кожна картинка має width: 100px, max-width: 100%, height: auto та змістовний alt.',
      'Під галереєю є ряд labels із display: flex і gap: 8px; кожен p має flex: 1, min-width: 0 та text-align: center.',
      'Чотири частини залишаються рівними при зміні ширини. Сторінка не виходить за межі вузького вікна.',
    ],
    hint: 'flex: 1 застосуй до sign, а display: flex — до його батьківського gallery. Вкладений flex у sign керує вже картинкою.',
    referenceHeight: 440,
    reference: htmlDocument(
      'Знаки природи',
      `<h1>Знаки природи</h1>
<div class="scene"><div class="gallery">
  <div class="sign"><img src="flower.svg" alt="Рожева квітка"></div>
  <div class="sign"><img src="leaf.svg" alt="Зелений листок"></div>
  <div class="sign"><img src="bird.svg" alt="Птах на гілці"></div>
  <div class="sign"><img src="rabbit.svg" alt="Білий кролик"></div>
</div></div>
<div class="labels"><p>Квітка</p><p>Листок</p><p>Птах</p><p>Кролик</p></div>`,
      baseCss +
        `
    .scene { display: flex; justify-content: center; align-items: center; min-height: 260px; background-color: #dbeafe; }
    .gallery { display: flex; width: 100%; gap: 8px; }
    .sign { flex: 1; min-width: 0; display: flex; justify-content: center; align-items: center; }
    img { width: 100px; }
    .labels { display: flex; gap: 8px; }
    .labels p { flex: 1; min-width: 0; text-align: center; }`,
    ),
  },
  {
    id: 'flex-basics-team',
    title: 'Команда експедиції',
    brief:
      'Побудуй ряд із трьох карток вигаданої команди. Використай align-items: center, щоб центри карток різної висоти збігалися. Задай проміжки через gap. При наведенні змінюй фон картки. На вузькому екрані дозволь прокрутку лише контейнера.',
    text: 'Команда експедиції\nЛисток — Зберігає карту стежок.\nПтах — Помічає знаки на маршруті та передає команді новини.\nКролик — Збирає ідеї для наступної пригоди.\nМалюнки: leaf.svg, bird.svg, rabbit.svg',
    checklist: [
      'Є h1 і div.team із трьома div.member. Кожна картка містить h2, img і p.',
      'team: display: flex, align-items: center, gap: 16px, max-width: 100%, overflow-x: auto, padding: 12px.',
      'member: flex: 1, min-width: 160px, padding: 12px, border: 2px solid #0e7490, border-radius: 12px, text-align: center, білий фон.',
      'img має width: 80px, height: auto й доречний alt. member:hover задає фон #cffafe.',
      'Картки мають різну висоту через довжину тексту; їхні вертикальні центри збігаються.',
      'При ширині 390px доступні всі картки через прокрутку контейнера, без прокрутки всього документа.',
    ],
    hint: 'align-items: center вирівнює картки всередині team. text-align: center вирівнює текст усередині member. Ці властивості мають різне призначення.',
    referenceHeight: 470,
    reference: htmlDocument(
      'Команда експедиції',
      `<h1>Команда експедиції</h1>
<div class="team">
  <div class="member"><h2>Листок</h2><img src="leaf.svg" alt="Знак Листка"><p>Зберігає карту стежок.</p></div>
  <div class="member"><h2>Птах</h2><img src="bird.svg" alt="Знак Птаха"><p>Помічає знаки на маршруті та передає команді новини.</p></div>
  <div class="member"><h2>Кролик</h2><img src="rabbit.svg" alt="Знак Кролика"><p>Збирає ідеї для наступної пригоди.</p></div>
</div>`,
      baseCss +
        `
    .team { display: flex; align-items: center; gap: 16px; max-width: 100%; overflow-x: auto; padding: 12px; }
    .member { flex: 1; min-width: 160px; padding: 12px; border: 2px solid #0e7490; border-radius: 12px; text-align: center; background-color: white; }
    .member:hover { background-color: #cffafe; }
    img { width: 80px; }`,
    ),
  },
  {
    id: 'flex-basics-workshop',
    title: 'Домашня робота: три майстерні',
    brief:
      'Створи афішу трьох вигаданих майстерень із рівними картками. Центруй увесь блок у робочій області заввишки щонайменше 70vh. Усередині картки використай звичайний потік. У кінці додай посилання на спільний опис матеріалів.',
    text: 'Майстерні вихідного дня\nКолір — Створюємо палітру.\nФорма — Малюємо знаки.\nІсторія — Пишемо пригоду.\nМатеріали: папір, олівці та блокнот.\nТекст кожного посилання: До матеріалів',
    checklist: [
      'Є h1 та div.stage із div.workshops усередині. Три div.workshop мають h2, p та a href="#materials".',
      'stage: min-height: 70vh, display: flex, justify-content: center, align-items: center.',
      'workshops: display: flex, gap: 12px, width: 100%, max-width: 660px, overflow-x: auto, padding: 8px.',
      'workshop: flex: 1, min-width: 150px, padding: 12px, border: 2px solid #0e7490, білий фон. Заголовки мають 22px.',
      'Посилання мають видиму рамку, padding: 8px і display: inline-block. :hover та :focus-visible змінюють фон на #cffafe.',
      'Після stage є h2 id="materials" і текст матеріалів. Якір працює; HTML збережено й відкрито офлайн.',
    ],
    hint: '70vh — це 70% висоти області перегляду. min-height залишає блоку право вирости, якщо вмісту стане більше.',
    referenceHeight: 900,
    reference: htmlDocument(
      'Майстерні вихідного дня',
      `<h1>Майстерні вихідного дня</h1>
<div class="stage"><div class="workshops">
  <div class="workshop"><h2>Колір</h2><p>Створюємо палітру.</p><a href="#materials">До матеріалів</a></div>
  <div class="workshop"><h2>Форма</h2><p>Малюємо знаки.</p><a href="#materials">До матеріалів</a></div>
  <div class="workshop"><h2>Історія</h2><p>Пишемо пригоду.</p><a href="#materials">До матеріалів</a></div>
</div></div>
<h2 id="materials">Матеріали</h2><p>Папір, олівці та блокнот.</p>`,
      baseCss +
        `
    .stage { min-height: 70vh; display: flex; justify-content: center; align-items: center; }
    .workshops { display: flex; gap: 12px; width: 100%; max-width: 660px; overflow-x: auto; padding: 8px; }
    .workshop { flex: 1; min-width: 150px; padding: 12px; border: 2px solid #0e7490; background-color: white; }
    .workshop h2 { font-size: 22px; }
    a { display: inline-block; padding: 8px; border: 1px solid #0e7490; color: #155e75; }
    a:hover, a:focus-visible { background-color: #cffafe; }`,
    ),
  },
];

export const flexBasicsStarter = htmlDocument(
  'Вивчаємо Flexbox',
  '  <!-- Створи контейнер і його безпосередні дочірні елементи. -->',
  '    /* Увімкни Flexbox на батьківському контейнері. */',
);
