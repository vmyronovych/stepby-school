import { htmlDocument, type WebTask } from './tasks';

const formBody = `<h1>Мапа шкільних відкриттів</h1>
<p class="intro">Плануємо вигадану експедицію. Цей макет не зберігає заявки.</p>
<form>
  <h2>Картка експедиції</h2>
  <fieldset><legend>Команда</legend>
    <label for="alias">Псевдонім капітана</label>
    <input id="alias" name="alias" type="text" placeholder="Наприклад, Сова" required>
    <label for="team">Назва команди</label>
    <input id="team" name="team" type="text" required>
    <label for="code">Навчальний пароль</label>
    <input id="code" name="code" type="password" required>
  </fieldset>
  <fieldset><legend>Стартова станція</legend>
    <label for="start">Звідки почнемо?</label>
    <select id="start" name="start"><option value="garden" selected>Сад</option><option value="tower">Вежа</option><option value="harbor" disabled>Гавань — готується</option></select>
  </fieldset>
  <fieldset><legend>Формат експедиції</legend>
    <label class="choice"><input type="radio" name="format" value="team" checked> Разом із командою</label>
    <label class="choice"><input type="radio" name="format" value="pair"> Удвох</label>
  </fieldset>
  <fieldset><legend>Матеріали</legend>
    <label class="choice"><input type="checkbox" name="materials" value="notebook" checked> Блокнот</label>
    <label class="choice"><input type="checkbox" name="materials" value="pencils"> Олівці</label>
    <label class="choice"><input type="checkbox" name="materials" value="stickers"> Наліпки</label>
    <label class="choice"><input type="checkbox" name="materials" value="telescope" disabled> Телескоп — недоступний</label>
  </fieldset>
  <label for="wishes">Ідея для маршруту</label>
  <textarea id="wishes" name="wishes" rows="3" placeholder="Яку станцію дослідимо?"></textarea>
  <button type="submit">Перевірити поля</button>
  <button type="reset">Відновити початкове</button>
</form>
<p class="next"><a href="world.html">Відкрити мапу</a></p>
<p class="intro">Посилання відкриває мапу незалежно від полів. Воно не надсилає заявку.</p>`;

const formCss = `body { margin: 0; padding: 16px; font-family: Arial, sans-serif; color: #134e4a; background-color: #f0fdfa; }
h1 { font-size: 28px; text-align: center; }
h2 { font-size: 22px; margin-top: 0; }
.intro { max-width: 600px; margin: 12px auto; text-align: center; }
form { display: flex; flex-direction: column; box-sizing: border-box; width: 360px; max-width: 100%; margin: 20px auto; padding: 20px; border: 2px solid #0f766e; border-radius: 14px; background-color: white; }
fieldset { min-width: 0; margin: 0 0 14px; padding: 12px; border: 1px solid #0f766e; border-radius: 8px; }
legend { font-weight: bold; }
label { display: block; margin: 6px 0; }
input[type="text"], input[type="password"], select, textarea { box-sizing: border-box; width: 100%; padding: 8px; border: 1px solid #64748b; border-radius: 5px; font: inherit; }
.choice input { width: auto; }
textarea { resize: vertical; min-height: 80px; }
button, .next a { padding: 10px; border: 2px solid #0f766e; border-radius: 8px; font: inherit; color: #134e4a; background-color: #ccfbf1; }
button { margin-top: 10px; }
button:hover, .next a:hover { background-color: #99f6e4; }
input:focus, select:focus, textarea:focus, button:focus, a:focus { outline: 3px solid #d97706; outline-offset: 2px; }
.next { text-align: center; }
.next a { display: inline-block; }`;

const mapBody = `<h1>Мапа шкільних відкриттів</h1>
<p>Це вигаданий простір для навчальної гри. Натисни знак, щоб прочитати опис станції.</p>
<div class="map">
  <a class="pin garden" href="#garden"><img src="leaf.svg" alt=""><br>Сад</a>
  <a class="pin flower" href="#flower"><img src="flower.svg" alt=""><br>Квітник</a>
  <a class="pin tower" href="#tower"><img src="bird.svg" alt=""><br>Вежа</a>
  <a class="pin meadow" href="#meadow"><img src="rabbit.svg" alt=""><br>Галявина</a>
  <a class="pin stadium" href="#stadium"><img src="comets.svg" alt=""><br>Стадіон</a>
  <a class="pin harbor" href="#harbor"><img src="waves.svg" alt=""><br>Гавань</a>
</div>
<h2>Станції експедиції</h2>
<div class="station" id="garden"><h3>Сад</h3><p>Намалюй три різні форми листків.</p></div>
<div class="station" id="flower"><h3>Квітник</h3><p>Склади власну палітру кольорів.</p></div>
<div class="station" id="tower"><h3>Вежа</h3><p>Придумай знак для команди спостерігачів.</p></div>
<div class="station" id="meadow"><h3>Галявина</h3><p>Напиши два речення про вигадану пригоду.</p></div>
<div class="station" id="stadium"><h3>Стадіон</h3><p>Створи назву нової командної гри.</p></div>
<div class="station" id="harbor"><h3>Гавань</h3><p>Запропонуй наступний маршрут експедиції.</p></div>
<p><a href="index.html">Повернутися до картки експедиції</a></p>`;

const mapCss = `body { box-sizing: border-box; max-width: 720px; margin: 0 auto; padding: 16px; color: #164e63; background-color: #ecfeff; font-family: Arial, sans-serif; }
h1 { font-size: 28px; text-align: center; }
h2 { font-size: 22px; }
h3 { font-size: 18px; margin: 0 0 6px; }
a { color: #155e75; }
.map { position: relative; box-sizing: border-box; width: 100%; height: 360px; border: 4px double #0f766e; border-radius: 16px; background-color: #dcfce7; background-image: url("meadow.svg"); }
.pin { position: absolute; box-sizing: border-box; width: 28%; padding: 10px 2px; border: 2px solid #0f766e; border-radius: 10px; background-color: white; text-align: center; }
.pin img { width: 64px; max-width: 100%; height: auto; }
.garden, .flower, .tower { top: 12%; }
.meadow, .stadium, .harbor { top: 58%; }
.garden, .meadow { left: 4%; }
.flower, .stadium { left: 36%; }
.tower, .harbor { left: 68%; }
.pin:hover { background-color: #ccfbf1; }
a:focus { outline: 3px solid #d97706; outline-offset: 2px; }
.station { margin: 10px 0; padding: 10px; border-left: 3px solid #0f766e; background-color: white; }
.station p { margin: 0; }`;

function page(title: string, body: string, cssFile: string) {
  return htmlDocument(title, body).replace(
    '</head>',
    `  <link rel="stylesheet" href="${cssFile}">\n</head>`,
  );
}

export const project3FilesReference = {
  'index.html': page('Картка експедиції', formBody, 'style.css'),
  'style.css': formCss,
  'world.html': page('Мапа відкриттів', mapBody, 'world.css'),
  'world.css': mapCss,
};

export const project3FilesStarter = {
  'index.html': page(
    'Моя експедиція',
    '  <!-- Побудуй форму. Додай посилання на world.html. -->',
    'style.css',
  ),
  'style.css': '/* Оформи картку експедиції. */',
  'world.html': page(
    'Моя мапа',
    '  <!-- Побудуй мапу. Додай посилання на index.html. -->',
    'world.css',
  ),
  'world.css': '/* Оформи мапу та її позначки. */',
};

export const project3MapReference = htmlDocument(
  'Мапа відкриттів',
  mapBody,
  mapCss,
);
export const project3MapReferenceHeight = 1160;

export const project3Tasks: WebTask[] = [
  {
    id: 'project3-discovery',
    title: 'Сайт «Мапа шкільних відкриттів»',
    brief:
      'Створи сайт із двох сторінок і двох файлів CSS. index.html містить навчальну картку експедиції; world.html — мапу шести вигаданих станцій із переходами до описів. Форма має групи, перемикачі, прапорці та список. На мапу веде окреме посилання. Дотримуйся етапів над редактором.',
    text: 'Мапа шкільних відкриттів\nПлануємо вигадану експедицію. Цей макет не зберігає заявки.\nКартка експедиції\nКоманда\nПсевдонім капітана\nНазва команди\nНавчальний пароль\nСтартова станція\nЗвідки почнемо?\nСад | Вежа | Гавань — готується\nФормат експедиції\nРазом із командою | Удвох\nМатеріали\nБлокнот | Олівці | Наліпки | Телескоп — недоступний\nІдея для маршруту\nПеревірити поля\nВідновити початкове\nВідкрити мапу\nПосилання відкриває мапу незалежно від полів. Воно не надсилає заявку.\nЦе вигаданий простір для навчальної гри. Натисни знак, щоб прочитати опис станції.\nСтанції експедиції\nСад — Намалюй три різні форми листків.\nКвітник — Склади власну палітру кольорів.\nВежа — Придумай знак для команди спостерігачів.\nГалявина — Напиши два речення про вигадану пригоду.\nСтадіон — Створи назву нової командної гри.\nГавань — Запропонуй наступний маршрут експедиції.\nПовернутися до картки експедиції',
    checklist: [
      'Створено index.html, style.css, world.html і world.css. Кожна HTML-сторінка має lang="uk", UTF-8, viewport, title та link на свій CSS-файл.',
      'На першій сторінці є h1, пояснення навчального макета та form із h2 і чотирма fieldset/legend.',
      'Псевдонім, команда й навчальний пароль мають label, унікальні id, name і required. Пароль має type="password"; значення вигадані.',
      'Стартова станція — select із label. Сад обраний через selected, Гавань недоступна через disabled.',
      'Два radio мають однаковий name="format" і різні value; перший має checked. Прапорці матеріалів незалежні, Блокнот має checked, Телескоп — disabled.',
      'Є підписана textarea з resize: vertical. Кнопки мають type="submit" та type="reset". Reset повертає початкові вибори, а submit перевіряє required.',
      'Окреме a href="world.html" відкриває мапу. Воно працює незалежно від форми й нічого не зберігає. На мапі є зворотне посилання на index.html.',
      'Форма: display flex, flex-direction column, width 360px, max-width 100%, border-box, padding 20px, margin 20px auto, білий фон, рамка 2px solid #0f766e.',
      'fieldset: min-width 0, margin-bottom 14px, padding 12px, рамка 1px solid #0f766e. Текстові поля, select і textarea: width 100%, border-box, padding 8px, font inherit.',
      'Мапа: position relative, width 100%, height 360px, border-box, рамка 4px double #0f766e, border-radius 16px, фон meadow.svg.',
      'Шість a.pin позиціоновано абсолютно. width 28%, padding 10px 2px, білий фон, рамка 2px solid #0f766e. Колонки left: 4%, 36%, 68%; ряди top: 12%, 58%.',
      'Знаки станцій: leaf.svg, flower.svg, bird.svg, rabbit.svg, comets.svg, waves.svg. img має width 64px, max-width 100%, height auto, alt="": назва вже є в посиланні.',
      'Кожен знак має href на відповідний унікальний id опису. Шість описів містять h3 та абзац. CSS не приховує їх.',
      'Hover змінює фон посилання, focus має outline 3px solid #d97706. Рамки не змінюють товщину між станами.',
      'Перевірено Tab/Enter, radio/checkbox/select, required, reset, шість якорів, переходи між сторінками та ширину 390px.',
      'Усі чотири файли збережено в одну папку. HTML/CSS і потрібні SVG відкриваються без мережі. Для продовження кожен збережений файл відкрито у відповідному полі редактора.',
    ],
    hint: 'Спочатку створи чотири файли й перевір link та переходи. Потім побудуй форму без CSS. На мапі relative належить контейнеру, а absolute — посиланням. На відміну від fixed, знаки рухаються разом із мапою. Submit не є переходом на другу сторінку: для переходу використай a.',
    referenceHeight: 1280,
    reference: htmlDocument('Картка експедиції', formBody, formCss),
  },
];

export const project3Starter = project3FilesStarter['index.html'];
