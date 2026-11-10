import { htmlDocument, type WebTask } from './tasks';

export const project2Tasks: WebTask[] = [
  {
    id: 'project2-school-cup',
    title: 'Сайт «Кубок шкільного двору»',
    brief:
      'Створи сторінку вигаданого футбольного кубка. Додай меню-якорі, турнірну таблицю, результати трьох матчів, описи команд і завантаження емблем. Таблиця має об’єднані клітинки; посилання — видимі стани hover, focus та active. Використай comets.svg, waves.svg і sparks.svg з матеріалів. Виконуй етапи над редактором.',
    text: 'Кубок шкільного двору\nЦе навчальний футбольний кубок. Команди, емблеми й результати вигадані.\nТаблиця\nМатчі\nКоманди\nМатеріали\nТурнірна таблиця\nПідсумки групи А — назва команди веде до її опису\nГрупа | Команда | Ігри | Перемоги | Очки | Емблема\nА | Комети | 2 | 2 | 6 | comets.svg\nА | Хвилі | 2 | 1 | 3 | waves.svg\nА | Іскри | 2 | 0 | 0 | sparks.svg\nУ цьому навчальному кубку перемога дає 3 очки, поразка — 0.\nРезультати матчів\nКомети — Хвилі: 2:0\nХвилі — Іскри: 1:0\nІскри — Комети: 0:1\nКоманди кубка\nКомети\nКомети виграли два матчі. Їхня синя емблема нагадує про швидкі командні рішення.\nЗавантажити емблему Комет\nХвилі\nХвилі здобули одну перемогу. Бірюзова емблема символізує спільний рух команди.\nЗавантажити емблему Хвиль\nІскри\nІскри завершили кубок без перемог. Вони зберігають настрій і готуються до нової зустрічі.\nЗавантажити емблему Іскор\nМатеріали команди\nНатисни на емблему або її підпис, щоб завантажити SVG.\nПовернутися до меню\nСайт підготувала команда шкільного кубка.',
    checklist: [
      'Є повний HTML: lang="uk", UTF-8, viewport, title «Кубок шкільного двору», style у head.',
      'Є один h1, чотири h2 та три h3. Вступ прямо повідомляє, що команди й результати вигадані.',
      'Меню має id="menu" та href="#standings", "#matches", "#teams", "#materials". Чотири h2 мають відповідні унікальні id.',
      'Таблиця має caption, thead, tbody, tfoot і шість колонок. Усі шість th у thead мають scope="col".',
      'Спільна група «А» — th зі scope="rowgroup" і rowspan="3" в одному tbody. Назви команд — th зі scope="row" та посиланнями #comets, #waves, #sparks.',
      'Кожна команда має 2 гри. Перемоги: 2, 1, 0; очки: 6, 3, 0. Рядок tfoot пояснює правило очок через td colspan="6".',
      'Результати записані через ol: 2:0, 1:0, 0:1. Вони узгоджуються з перемогами й очками в таблиці.',
      'Три div.team мають h3 з відповідними id, посилання a.badge з емблемою й підписом та абзац опису.',
      'Кожне a.badge має href на відповідний SVG і download з тією самою назвою. Підпис пояснює завантаження; у картинки всередині такого посилання alt="".',
      'У таблиці емблеми мають alt, width: 48px і height: auto. Для .badge img задано width: 100%, height: auto.',
      'body: Arial/sans-serif, 16px, текст #0f172a, фон #f0fdf4. h1: 30px, по центру; h2: 22px; h3: 18px. Заголовки — #14532d.',
      'Обгортка .table-scroll має overflow-x: auto. table: width: 100%, min-width: 560px, border-collapse: collapse. th і td: рамка 1px solid #64748b, padding: 8px, text-align: center.',
      'Шапка таблиці має фон #14532d і білий текст; tbody th — фон #dcfce7; tfoot td — фон #fef3c7.',
      '.team: display: flow-root, padding: 12px, фон white, рамка 1px solid #cbd5e1. .badge: float: left, width: 140px, max-width: 45%, box-sizing: border-box, margin-right: 12px, padding: 6px, рамка 3px solid #15803d.',
      'a: колір #166534 і підкреслення. a:hover: фон #dcfce7; a:focus: outline 3px solid #1d4ed8; a:active: фон #fef3c7. Розміри посилань між станами не змінюються.',
      'Перед матеріалами є hr: border: 0, height: 3px, width: 80%, фон #15803d. Підпис автора — p.author з text-align: right.',
      'Перевірено Tab/Enter, якорі з меню й таблиці, завантаження SVG, вузьке вікно та збережений офлайн HTML.',
    ],
    hint: 'Спочатку побудуй таблицю без CSS. Після rowspan не додавай зайву клітинку групи в другому й третьому рядках. colspan="6" займає весь рядок примітки. Для стрибка до команди потрібні href="#comets" і h3 id="comets"; для завантаження — href="comets.svg" та download.',
    referenceHeight: 1500,
    reference: htmlDocument(
      'Кубок шкільного двору',
      `<h1>Кубок шкільного двору</h1>
<p>Це навчальний футбольний кубок. Команди, емблеми й результати вигадані.</p>
<p id="menu"><a href="#standings">Таблиця</a> | <a href="#matches">Матчі</a> | <a href="#teams">Команди</a> | <a href="#materials">Матеріали</a></p>
<h2 id="standings">Турнірна таблиця</h2>
<div class="table-scroll">
<table>
  <caption>Підсумки групи А — назва команди веде до її опису</caption>
  <thead><tr><th scope="col">Група</th><th scope="col">Команда</th><th scope="col">Ігри</th><th scope="col">Перемоги</th><th scope="col">Очки</th><th scope="col">Емблема</th></tr></thead>
  <tbody>
    <tr><th scope="rowgroup" rowspan="3">А</th><th scope="row"><a href="#comets">Комети</a></th><td>2</td><td>2</td><td>6</td><td><img src="comets.svg" alt="Емблема Комет"></td></tr>
    <tr><th scope="row"><a href="#waves">Хвилі</a></th><td>2</td><td>1</td><td>3</td><td><img src="waves.svg" alt="Емблема Хвиль"></td></tr>
    <tr><th scope="row"><a href="#sparks">Іскри</a></th><td>2</td><td>0</td><td>0</td><td><img src="sparks.svg" alt="Емблема Іскор"></td></tr>
  </tbody>
  <tfoot><tr><td colspan="6">У цьому навчальному кубку перемога дає 3 очки, поразка — 0.</td></tr></tfoot>
</table>
</div>
<h2 id="matches">Результати матчів</h2>
<ol>
  <li>Комети — Хвилі: 2:0</li>
  <li>Хвилі — Іскри: 1:0</li>
  <li>Іскри — Комети: 0:1</li>
</ol>
<h2 id="teams">Команди кубка</h2>
<div class="team">
  <h3 id="comets">Комети</h3>
  <a class="badge" href="comets.svg" download="comets.svg"><img src="comets.svg" alt=""><br>Завантажити емблему Комет</a>
  <p>Комети виграли два матчі. Їхня синя емблема нагадує про швидкі командні рішення.</p>
</div>
<div class="team">
  <h3 id="waves">Хвилі</h3>
  <a class="badge" href="waves.svg" download="waves.svg"><img src="waves.svg" alt=""><br>Завантажити емблему Хвиль</a>
  <p>Хвилі здобули одну перемогу. Бірюзова емблема символізує спільний рух команди.</p>
</div>
<div class="team">
  <h3 id="sparks">Іскри</h3>
  <a class="badge" href="sparks.svg" download="sparks.svg"><img src="sparks.svg" alt=""><br>Завантажити емблему Іскор</a>
  <p>Іскри завершили кубок без перемог. Вони зберігають настрій і готуються до нової зустрічі.</p>
</div>
<hr>
<h2 id="materials">Матеріали команди</h2>
<p>Натисни на емблему або її підпис, щоб завантажити SVG.</p>
<p><a href="#menu">Повернутися до меню</a></p>
<p class="author">Сайт підготувала команда шкільного кубка.</p>`,
      `    body { background-color: #f0fdf4; color: #0f172a; font-family: Arial, sans-serif; font-size: 16px; }
    h1 { font-size: 30px; text-align: center; color: #14532d; }
    h2 { font-size: 22px; color: #14532d; }
    h3 { font-size: 18px; color: #14532d; }
    a { color: #166534; }
    a:hover { background-color: #dcfce7; }
    a:focus { outline: 3px solid #1d4ed8; }
    a:active { background-color: #fef3c7; }
    .table-scroll { overflow-x: auto; }
    table { width: 100%; min-width: 560px; border-collapse: collapse; }
    caption { font-weight: bold; padding: 8px; }
    th, td { border: 1px solid #64748b; padding: 8px; text-align: center; }
    thead th { background-color: #14532d; color: white; }
    tbody th { background-color: #dcfce7; }
    tfoot td { background-color: #fef3c7; }
    img { width: 48px; height: auto; }
    .team { display: flow-root; padding: 12px; background-color: white; border: 1px solid #cbd5e1; }
    .badge { float: left; width: 140px; max-width: 45%; box-sizing: border-box; margin-right: 12px; padding: 6px; border: 3px solid #15803d; text-align: center; }
    .badge img { width: 100%; height: auto; }
    hr { border: 0; height: 3px; width: 80%; background-color: #15803d; }
    .author { text-align: right; }`,
    ),
  },
];

export const project2Starter = htmlDocument(
  'Мій футбольний кубок',
  '  <!-- Побудуй сторінку кубка за етапами проєкту. -->',
  '    /* Додай правила для таблиці, команд і станів посилань. */',
);
