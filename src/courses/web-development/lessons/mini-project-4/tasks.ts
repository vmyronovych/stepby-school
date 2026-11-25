import { moonArt } from '../../shared/content/moon-art';
import { htmlDocument, type WebTask } from '../../shared/content/tasks';

const facts = [
  [
    'Звідки береться світло',
    'Місяць видно завдяки сонячному світлу, яке відбивається від його поверхні. Іноді Місяць видно навіть удень.',
  ],
  [
    'Фази Місяця',
    'Під час руху Місяця навколо Землі ми бачимо різну частку його освітленої половини. Повний цикл фаз триває близько 29,5 доби.',
  ],
  [
    'Чому видно знайомий бік',
    'Місяць обертається навколо своєї осі приблизно за той самий час, що й навколо Землі. Тому до нас повернена майже та сама половина його поверхні.',
  ],
  [
    'Відстань до Землі',
    'У середньому між центрами Землі та Місяця близько 384 400 кілометрів. Відстань змінюється, тому що орбіта Місяця трохи витягнута.',
  ],
  [
    'Вага на Місяці',
    'Тяжіння на поверхні Місяця приблизно в шість разів слабше, ніж на Землі. Сила, з якою рюкзак тисне на опору, зменшиться, а його маса залишиться тією самою.',
  ],
  [
    'Сліди зіткнень',
    'Круглі западини на поверхні — це кратери. Багато з них утворилися, коли космічні тіла вдарилися об місячну поверхню.',
  ],
  [
    'Місячні моря',
    'Темні рівнини на Місяці називають морями. Вони складаються з застиглої лави, що колись заповнила великі западини.',
  ],
  [
    'Частинки навколо Місяця',
    'Місяць оточує екзосфера. Частинок у ній так мало, що людина не зможе дихати без системи подачі повітря.',
  ],
  [
    'Лід у тіні',
    'Біля місячних полюсів є кратери, куди ніколи не потрапляє пряме сонячне світло. У таких холодних місцях виявлено водяний лід.',
  ],
  [
    'Місячне затемнення',
    'Під час місячного затемнення Земля опиняється між Сонцем і Місяцем. Земна тінь падає на Місяць, коли ці три тіла стають майже на одну лінію.',
  ],
] as const;

const title = 'Десять фактів про Місяць';
const introduction = 'Від місячного серпа до льоду в полярних кратерах.';
const footer =
  'Ілюстрації умовні. Розміри й відстані на них подано без масштабу.';

const articles = facts.map(([heading, paragraph], index) => {
  const image = moonArt[index];
  const side = index % 2 === 0 ? 'left' : 'right';
  return `  <article class="item ${side}">
    <img src="${image.filename}" alt="${image.label}" width="300" height="180">
    <div class="fact-text"><h2>${heading}</h2><p>${paragraph}</p></div>
  </article>`;
});

const body = `<header>
  <h1>${title}</h1>
  <p>${introduction}</p>
</header>
<input id="pause" class="pause" type="checkbox">
<label for="pause">Призупинити рух ілюстрацій</label>
<main class="articles">
${articles.join('\n')}
</main>
<footer><p>${footer}</p></footer>`;

export const project4ReferenceCss = `body {
  margin: 0;
  background: #0b1226;
  color: #e0e7ff;
  font: 16px/1.5 system-ui, sans-serif;
}
header, footer { padding: 20px 16px; text-align: center; }
header p, footer p { margin: 0; }
h1 { margin: 0 0 10px; font-size: 2rem; color: #fff; }
h2 { margin: 0 0 6px; font-size: 1.25rem; color: #fff; }
.pause { margin: 0 8px 18px 16px; }
.pause:focus-visible { outline: 3px solid #fde68a; outline-offset: 3px; }
.articles { max-width: 900px; margin: 0 auto; padding: 0 16px; }
.item {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
  padding: 16px;
  background: #162240;
  border: 1px solid #475569;
  border-radius: 14px;
}
.left { flex-direction: row; }
.right { flex-direction: row-reverse; }
.item img {
  display: block;
  width: 38%;
  height: auto;
  animation: drift 5s ease-in-out infinite;
}
.fact-text { flex: 1; min-width: 0; }
.fact-text p { margin: 0; }
@keyframes drift {
  0%, 100% { transform: scale(.96) rotate(2deg); }
  50% { transform: scale(.89) rotate(-2deg); }
}
.pause:checked ~ .articles img { animation-play-state: paused; }
@media (max-width: 560px) {
  .articles .item { flex-direction: column; gap: 12px; }
  .item img { width: 100%; max-width: 300px; }
}
@media (prefers-reduced-motion: reduce) {
  .item img { animation: none; }
}`;

function withStylesheet(source: string) {
  return source.replace(
    '</head>',
    '  <link rel="stylesheet" href="style.css">\n</head>',
  );
}

export const project4ReferenceHtml = withStylesheet(htmlDocument(title, body));

export const project4Starter = withStylesheet(
  htmlDocument(
    title,
    '<!-- Створи header, прапорець паузи, main з десятьма article та footer. -->',
  ),
);

export const project4Tasks: WebTask[] = [
  {
    id: 'moon-illustrated-articles',
    title: 'Місяць у десяти ілюстраціях',
    brief:
      'Створи сторінку з десятьма короткими статтями про Місяць. Винеси стилі у style.css. Чергуй зображення ліворуч і праворуч на широкому екрані. На вузькому екрані розташуй його над текстом. Додай легку анімацію, прапорець паузи та підтримку зменшеного руху.',
    text: [
      title,
      introduction,
      'Призупинити рух ілюстрацій',
      ...facts.map(
        ([heading, paragraph], index) =>
          `${heading}\n${paragraph}\n${moonArt[index].filename} — ${moonArt[index].label}`,
      ),
      footer,
    ].join('\n\n'),
    checklist: [
      'Збережено index.html та style.css. У head є link rel="stylesheet" href="style.css".',
      'Header містить один h1. Main містить рівно десять article. У кожній статті є img, h2 і p. Footer пояснює умовність ілюстрацій.',
      'Кожен img завантажується й має alt, який коротко описує схему. Використано всі ілюстрації від moon-01.svg до moon-10.svg.',
      'На ширині понад 560 px зображення непарних статей ліворуч, парних — праворуч. Порядок статей у HTML збережено.',
      'На ширині 560 px і менше зображення стоять над текстом. При ширині 320 px сторінка поміщається без горизонтальної прокрутки.',
      'Анімація drift має початок, середину й кінець. Поворот і масштаб записані через пробіл в одному transform.',
      'Tab переводить фокус на прапорець. Пробіл ставить усі ілюстрації на паузу. За системного налаштування зменшеного руху сторінка статична.',
      'Обидва файли відкриваються локально. У локальному редакторі файли ілюстрацій лежать поруч з index.html і style.css.',
    ],
    hint: 'Спочатку доведи до ладу одну статтю. Створи другу з класами item right і перевір row-reverse. Прапорець паузи та main мають бути сусідами в body, причому прапорець стоїть раніше.',
    reference: htmlDocument(title, body, project4ReferenceCss),
    referenceHeight: 2240,
    referenceTimeMs: 2500,
  },
];
