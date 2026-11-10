import { htmlDocument, type WebTask } from './tasks';

const baseCss = `    body { margin: 16px; font-family: Arial, sans-serif; color: #134e4a; background-color: #f0fdfa; }
    h1 { font-size: 28px; text-align: center; }
    h2 { font-size: 20px; margin-bottom: 6px; }
    p { margin: 8px 0 16px; }
    .stage { display: flex; justify-content: center; align-items: flex-start; min-height: 230px; padding-top: 20px; }
    .menu, .submenu { list-style: none; margin: 0; padding: 0; }
    .menu { background-color: #134e4a; border-radius: 10px; }
    .menu > li { position: relative; }
    .menu a, .menu button { display: block; box-sizing: border-box; width: 100%; padding: 12px; border: 0; background-color: transparent; color: white; font: inherit; text-align: left; text-decoration: none; }
    .menu a:hover, .menu button:hover { background-color: #0f766e; }
    .menu a:focus, .menu button:focus { outline: 3px solid #fbbf24; outline-offset: -3px; }
    .submenu { display: none; position: absolute; width: 180px; background-color: #115e59; border: 2px solid #5eead4; box-sizing: border-box; z-index: 1; }
    .menu > li:hover > .submenu, .menu > li:focus-within > .submenu { display: block; }
    .destinations { padding: 12px; border: 2px solid #0f766e; background-color: white; }
    .destinations a { color: #075985; }
    .destinations a:focus { outline: 3px solid #d97706; outline-offset: 2px; }`;
const horizontalCss = `
    .menu { display: flex; flex-wrap: wrap; }
    .submenu { top: 100%; left: 0; }
    @media (max-width: 600px) {
      .menu { width: 100%; flex-direction: column; }
      .submenu { position: static; width: auto; }
    }`;
const routeItems = `<li><a href="#start">Початок</a></li>
    <li class="route-item"><button type="button">Стежки ▾</button>
      <ul class="submenu"><li><a href="#garden">Сад</a></li><li><a href="#tower">Вежа</a></li><li><a href="#meadow">Галявина</a></li></ul>
    </li>`;
const routeSections = `<h2 id="start">Початок</h2><p>Обери станцію для вигаданої експедиції.</p>
<h2 id="garden">Сад</h2><p>Намалюй три форми листків.</p>
<h2 id="tower">Вежа</h2><p>Придумай знак для спостерігачів.</p>
<h2 id="meadow">Галявина</h2><p>Запиши два речення про пригоду.</p>`;
const allRoutes = `<a href="#start">Початок</a> · <a href="#garden">Сад</a> · <a href="#tower">Вежа</a> · <a href="#meadow">Галявина</a>`;

export const dropdownMenuTasks: WebTask[] = [
  {
    id: 'dropdown-trail-menu',
    title: 'Вертикальне меню експедиції',
    brief:
      'Створи навігацію «Стежки експедиції» з чотирма головними пунктами: Початок, Стежки, Матеріали, Усі розділи. Стежки — кнопка з вкладеним списком Сад, Вежа, Галявина. На широкому екрані підменю відкривається праворуч, на вузькому — всередині списку. Усі посилання ведуть до видимих розділів цієї сторінки.',
    text: 'Стежки експедиції\nПочаток\nОбери станцію для вигаданої експедиції.\nСтежки\nСад\nНамалюй три форми листків.\nВежа\nПридумай знак для спостерігачів.\nГалявина\nЗапиши два речення про пригоду.\nМатеріали\nПриготуй папір і олівці.\nУсі розділи',
    checklist: [
      'Є h1, nav з aria-label="Експедиція" та ul.menu. Вкладений ul.submenu міститься всередині того самого li, що й кнопка Стежки.',
      'Три звичайні пункти — посилання, Стежки — button type="button". Немає role="menu" і вигаданих дій на кшталт виходу з гри.',
      '.menu має display: flex, flex-direction: column і width: 190px; головні li мають position: relative.',
      '.submenu спочатку display: none, має position: absolute, top: 0, left: 100%, width: 180px, z-index: 1.',
      'Правила .menu > li:hover > .submenu та .menu > li:focus-within > .submenu показують вкладений список через display: block.',
      'У media-запиті max-width: 600px підменю має position: static, width: auto. Воно не виходить за правий край вузького вікна.',
      'Усі шість href в основній навігації ведуть до наявних унікальних id. У видимому розділі Усі розділи повторено посилання для доступу без розкриття.',
      'Tab переводить фокус на кнопку й посилання підменю, Enter відкриває якір. Перехід фокуса за межі пункту закриває підменю, якщо вказівник теж поза ним.',
    ],
    hint: 'Знак > вибирає безпосередню дитину. Кнопка та ul.submenu повинні мати спільного батька li. Між головним пунктом і підменю не залишай проміжку, через який вказівник втрачатиме наведення.',
    referenceHeight: 920,
    referenceHover: '.route-item',
    reference: htmlDocument(
      'Стежки експедиції',
      `<h1>Стежки експедиції</h1>
<div class="stage"><nav aria-label="Експедиція"><ul class="menu">
    ${routeItems}
    <li><a href="#supplies">Матеріали</a></li><li><a href="#all">Усі розділи</a></li>
</ul></nav></div>
${routeSections}
<h2 id="supplies">Матеріали</h2><p>Приготуй папір і олівці.</p>
<div class="destinations" id="all"><h2>Усі розділи</h2><p>${allRoutes} · <a href="#supplies">Матеріали</a></p></div>`,
      baseCss +
        `
    .menu { display: flex; flex-direction: column; width: 190px; }
    .submenu { top: 0; left: 100%; }
    @media (max-width: 600px) {
      .submenu { position: static; width: auto; }
    }`,
    ),
  },
  {
    id: 'dropdown-club-menu',
    title: 'Горизонтальне меню клубу',
    brief:
      'Перебудуй меню в горизонтальний ряд із чотирма головними пунктами: Початок, Стежки, Матеріали, Усі розділи. Стежки містять Сад, Вежу й Галявину; Матеріали містять Папір та Олівці. На широкому екрані підменю з’являються під батьківським пунктом. При ширині до 600px головні пункти утворюють стовпець, а підменю займають місце в потоці.',
    text: 'Клуб мандрівників\nПочаток\nОбери станцію для вигаданої експедиції.\nСтежки\nСад\nНамалюй три форми листків.\nВежа\nПридумай знак для спостерігачів.\nГалявина\nЗапиши два речення про пригоду.\nМатеріали\nПапір\nНа папері створимо карту.\nОлівці\nОлівці допоможуть позначити маршрут.\nУсі розділи',
    checklist: [
      'Nav має aria-label="Клуб". Ul.menu містить чотири головні li; два з них містять button type="button" і власний ul.submenu.',
      '.menu: display: flex, flex-wrap: wrap. Обидва submenu: position: absolute, top: 100%, left: 0, width: 180px.',
      'Кожне підменю приховане спочатку. Hover або focus-within відкриває тільки підменю відповідного головного li.',
      'Посилання й кнопки мають display: block, width: 100%, box-sizing: border-box, padding: 12px; outline фокуса видно.',
      'У media-запиті max-width: 600px menu має width: 100%, flex-direction: column; submenu — position: static, width: auto.',
      'Є цілі start/garden/tower/meadow/paper/pencils/all без повторів id. Видимий список усіх розділів дублює всі адреси призначення.',
      'Можна перевести вказівник із кнопки до її підменю без закриття. Tab відкриває підменю та дає перейти до його посилань.',
      'HTML збережено, повторно відкрито в редакторі та перевірено офлайн.',
    ],
    hint: 'Top: 100% починає підменю від нижнього краю головного li. Focus-within залишається активним, доки фокус перебуває на кнопці або будь-якому посиланні всередині її li.',
    referenceHeight: 920,
    referenceHover: '.route-item',
    reference: htmlDocument(
      'Клуб мандрівників',
      `<h1>Клуб мандрівників</h1>
<div class="stage"><nav aria-label="Клуб"><ul class="menu">
    ${routeItems}
    <li class="materials-item"><button type="button">Матеріали ▾</button><ul class="submenu"><li><a href="#paper">Папір</a></li><li><a href="#pencils">Олівці</a></li></ul></li>
    <li><a href="#all">Усі розділи</a></li>
</ul></nav></div>
${routeSections}
<h2 id="paper">Папір</h2><p>На папері створимо карту.</p>
<h2 id="pencils">Олівці</h2><p>Олівці допоможуть позначити маршрут.</p>
<div class="destinations" id="all"><h2>Усі розділи</h2><p>${allRoutes} · <a href="#paper">Папір</a> · <a href="#pencils">Олівці</a></p></div>`,
      baseCss + horizontalCss,
    ),
  },
  {
    id: 'dropdown-workshop-menu',
    title: 'Домашня робота: меню майстерні',
    brief:
      'Створи горизонтальне меню майстерні з п’ятьма головними пунктами: Початок, Стежки, Матеріали, Майстерні, Усі розділи. Додай підменю до Стежок і Майстерень. До посилання Початок додай маленький декоративний leaf.svg. Майстерні містять Малюємо карту й Пишемо історію. Створи всі розділи та видимий список посилань для доступу без підменю.',
    text: 'Майстерня пригод\nПочаток\nВітаємо в майстерні власних історій.\nСтежки\nСад\nТут збираємо ідеї форм.\nВежа\nТут помічаємо деталі.\nМатеріали\nПриготуй папір і олівці.\nМайстерні\nМалюємо карту\nПознач дві станції та з’єднай їх стежкою.\nПишемо історію\nПридумай пригоду між двома станціями.\nУсі розділи',
    checklist: [
      'Є nav aria-label="Майстерня" і п’ять головних li. Стежки й Майстерні мають button type="button" та вкладений ul.submenu.',
      'Початок містить leaf.svg з alt="", width: 18px, height: auto, vertical-align: middle. Видимий текст уже називає призначення посилання.',
      'menu має display: flex, flex-wrap: wrap. Головні li мають position: relative, submenu — display: none, top: 100%, left: 0, width: 180px.',
      'Hover та focus-within розкривають власне підменю. Hover посилання змінює фон, focus дає видимий контур без зміни розмірів.',
      'Для головного пункту Майстерні задай background-color: #1e3a8a. Його підменю має два посилання на map-workshop та story-workshop.',
      'Усі start/garden/tower/supplies/map-workshop/story-workshop/all існують. У видимому блоці Усі розділи повторено всі адреси призначення.',
      'Media-запит max-width: 600px перетворює меню на стовпець і повертає submenu у звичайний потік.',
      'Перевірено мишу, Tab, Shift+Tab і Enter. На телефоні доступний видимий список усіх розділів, навіть якщо кнопка не утримує фокус.',
      'SVG можна завантажити окремо або ZIP. HTML збережено й перевірено офлайн; для локального редактора leaf.svg лежить поруч.',
    ],
    hint: 'Не змінюй текст кнопки на «обрано» лише через фокус. CSS тут показує вкладені посилання, але не зберігає вибір і не виконує дію майстерні. Збережи всі адреси доступними у видимому списку.',
    referenceHeight: 940,
    referenceHover: '.workshop-item',
    reference: htmlDocument(
      'Майстерня пригод',
      `<h1>Майстерня пригод</h1>
<div class="stage"><nav aria-label="Майстерня"><ul class="menu">
    <li><a href="#start"><img class="icon" src="leaf.svg" alt=""> Початок</a></li>
    <li class="route-item"><button type="button">Стежки ▾</button><ul class="submenu"><li><a href="#garden">Сад</a></li><li><a href="#tower">Вежа</a></li></ul></li>
    <li><a href="#supplies">Матеріали</a></li>
    <li class="workshop-item"><button type="button">Майстерні ▾</button><ul class="submenu"><li><a href="#map-workshop">Малюємо карту</a></li><li><a href="#story-workshop">Пишемо історію</a></li></ul></li>
    <li><a href="#all">Усі розділи</a></li>
</ul></nav></div>
<h2 id="start">Початок</h2><p>Вітаємо в майстерні власних історій.</p>
<h2 id="garden">Сад</h2><p>Тут збираємо ідеї форм.</p>
<h2 id="tower">Вежа</h2><p>Тут помічаємо деталі.</p>
<h2 id="supplies">Матеріали</h2><p>Приготуй папір і олівці.</p>
<h2 id="map-workshop">Малюємо карту</h2><p>Познач дві станції та з’єднай їх стежкою.</p>
<h2 id="story-workshop">Пишемо історію</h2><p>Придумай пригоду між двома станціями.</p>
<div class="destinations" id="all"><h2>Усі розділи</h2><p><a href="#start">Початок</a> · <a href="#garden">Сад</a> · <a href="#tower">Вежа</a> · <a href="#supplies">Матеріали</a> · <a href="#map-workshop">Малюємо карту</a> · <a href="#story-workshop">Пишемо історію</a></p></div>`,
      baseCss +
        horizontalCss +
        `
    .icon { width: 18px; height: auto; vertical-align: middle; }
    .workshop-item { background-color: #1e3a8a; }`,
    ),
  },
];

export const dropdownMenuStarter = htmlDocument(
  'Моя навігація',
  '  <!-- Додай nav, вкладені списки, кнопки та розділи призначення. -->',
  '    /* Спочатку перевір посилання, потім додай показ підменю. */',
);
