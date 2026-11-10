import { htmlDocument, type WebTask } from './tasks';

export const review2Tasks: WebTask[] = [
  {
    id: 'review2-gallery',
    title: 'Матеріали для творчої команди',
    brief:
      'Створи галерею трьох ілюстрацій. Картинка й текстовий підпис мають окремі посилання на завантаження того самого SVG. Додай демонстраційні посилання на пошту й телефон. Не використовуй особисті контакти.',
    text: 'Матеріали творчої команди\nЗавантаж ілюстрацію для своєї історії\nКролик — завантажити SVG\nПтах — завантажити SVG\nКвітка — завантажити SVG\nДемонстраційні контакти\nПошта команди\nТелефон команди\nКонтакти вигадані. У майстерні вони не відкривають програми.',
    checklist: [
      'Є один h1 і два h2; кожна ілюстрація з підписом належить окремому p.',
      'Використано rabbit.svg, bird.svg і flower.svg. У кожного img є alt, який пояснює дію посилання.',
      'Є шість посилань із download: три з картинками й три з текстом. Кожна пара має однаковий href.',
      'Контакти: mailto:club@example.com і tel:+380000000000. Поруч зазначено, що вони вигадані.',
      'body: фон #e0f2fe, Arial/sans-serif, колір #0f172a, вирівнювання по центру.',
      'img: width: 150px, max-width: 100%, height: auto, box-sizing: border-box, рамка 3px dashed #075985.',
      'a: колір #9a3412; видимий фокус має outline: 3px solid #1d4ed8.',
      'Збережено HTML; завантаження картинок перевірено у майстерні, а адреси контактів — у коді.',
    ],
    hint: 'Обгорни img у a з href і download. Для підпису створи ще одне a з тими самими атрибутами. Демонстраційні контакти не потрібно викликати.',
    referenceHeight: 780,
    reference: htmlDocument(
      'Матеріали творчої команди',
      `<h1>Матеріали творчої команди</h1>
<h2>Завантаж ілюстрацію для своєї історії</h2>
<p><a href="rabbit.svg" download><img src="rabbit.svg" alt="Завантажити ілюстрацію кролика"></a><br><a href="rabbit.svg" download>Кролик — завантажити SVG</a></p>
<p><a href="bird.svg" download><img src="bird.svg" alt="Завантажити ілюстрацію птаха"></a><br><a href="bird.svg" download>Птах — завантажити SVG</a></p>
<p><a href="flower.svg" download><img src="flower.svg" alt="Завантажити ілюстрацію квітки"></a><br><a href="flower.svg" download>Квітка — завантажити SVG</a></p>
<h2>Демонстраційні контакти</h2>
<p><a href="mailto:club@example.com">Пошта команди</a><br><a href="tel:+380000000000">Телефон команди</a></p>
<p>Контакти вигадані. У майстерні вони не відкривають програми.</p>`,
      `    body { background-color: #e0f2fe; font-family: Arial, sans-serif; color: #0f172a; text-align: center; }
    h1 { color: #075985; font-size: 32px; }
    h2 { font-size: 22px; }
    p { font-size: 18px; }
    img { width: 150px; max-width: 100%; height: auto; box-sizing: border-box; border: 3px dashed #075985; }
    a { color: #9a3412; }
    a:focus { outline: 3px solid #1d4ed8; }`,
    ),
  },
  {
    id: 'review2-states',
    title: 'Навігація для миші й клавіатури',
    brief:
      'Створи меню з трьома внутрішніми посиланнями: «Малюємо», «Досліджуємо», «Створюємо». Додай відповідні h2 з унікальними id та короткими описами. Оформи різні стани hover, focus і active. Перевір переходи мишею та клавішею Enter.',
    text: 'Майстерні після уроків\nМалюємо\nДосліджуємо\nСтворюємо\nМалюємо\nДобираємо кольори й створюємо власні ілюстрації.\nДосліджуємо\nСтавимо запитання та записуємо спостереження.\nСтворюємо\nПоєднуємо текст і зображення у вебсторінці.\nПовернутися до меню',
    checklist: [
      'Меню — p з id="menu". Три посилання мають href="#draw", href="#explore" та href="#create".',
      'Заголовки h2 мають відповідні унікальні id. Останнє посилання веде до #menu.',
      'body: фон #fff7ed, Arial/sans-serif, текст #0f172a. h1 і меню вирівняні по центру.',
      'Посилання: display: block, width: 240px, max-width: 100%, box-sizing: border-box, margin: 12px auto, padding: 6px; 20px, колір #0f172a, білий фон, рамка 3px solid #64748b, без підкреслення.',
      'hover: фон #fef3c7 і колір рамки #92400e. focus: outline: 3px solid #1d4ed8.',
      'active: фон #92400e, білий текст, border-color: #92400e. Товщина рамки не змінюється між станами.',
      'Текст описів читається у вузькому вікні. Клавіша Tab показує фокус, Enter виконує перехід.',
    ],
    hint: 'Запиши правила в порядку a, a:hover, a:focus, a:active. Фокус має бути видимим навіть під час наведення. Не прибирай outline без заміни.',
    referenceHeight: 740,
    reference: htmlDocument(
      'Майстерні після уроків',
      `<h1>Майстерні після уроків</h1>
<p id="menu"><a href="#draw">Малюємо</a> <a href="#explore">Досліджуємо</a> <a href="#create">Створюємо</a></p>
<h2 id="draw">Малюємо</h2>
<p>Добираємо кольори й створюємо власні ілюстрації.</p>
<h2 id="explore">Досліджуємо</h2>
<p>Ставимо запитання та записуємо спостереження.</p>
<h2 id="create">Створюємо</h2>
<p>Поєднуємо текст і зображення у вебсторінці.</p>
<p><a href="#menu">Повернутися до меню</a></p>`,
      `    body { background-color: #fff7ed; font-family: Arial, sans-serif; color: #0f172a; }
    h1, #menu { text-align: center; }
    a { display: block; width: 240px; max-width: 100%; box-sizing: border-box; margin: 12px auto; font-size: 20px; color: #0f172a; background-color: white; border: 3px solid #64748b; padding: 6px; text-decoration: none; }
    a:hover { background-color: #fef3c7; border-color: #92400e; }
    a:focus { outline: 3px solid #1d4ed8; }
    a:active { background-color: #92400e; color: white; border-color: #92400e; }`,
    ),
  },
  {
    id: 'review2-dossier',
    title: 'Досьє вигаданого помічника',
    brief:
      'Створи таблицю «Досьє помічника Листика». Це вигаданий персонаж, знаком якого є зелений листок. Таблиця має три логічні колонки. Картинка займає три рядки через rowspan, а фінальна примітка — три колонки через colspan.',
    text: 'Досьє творчої команди\nДосьє помічника Листика\nІлюстрація\nПараметр\nЗначення\nІм’я\nЛистик\nРоль\nПомічник творчої команди\nУміння\nПомічає деталі й зберігає нотатки\nУсі дані описують вигаданого персонажа.',
    checklist: [
      'caption містить назву таблиці. Перший рядок має три th зі scope="col".',
      'Після заголовків є три рядки даних. Клітинка з leaf.svg має rowspan="3".',
      'Ім’я, роль та уміння записано через th зі scope="row", значення — через td.',
      'Останній рядок містить одну td з colspan="3" та приміткою про вигаданого персонажа.',
      'Кожен рядок займає три логічні колонки; зайвих порожніх td під картинкою немає.',
      'table: width: 100%, border-collapse: collapse, фон #f0fdf4. caption: фон #166534, білий текст, 24px.',
      'th і td: рамка 2px solid #166534, padding: 10px, text-align: left. th: фон #dcfce7.',
      'img: width: 120px, max-width: 100%, height: auto; alt пояснює, що листок є знаком персонажа.',
      'Таблиця міститься в div.table-scroll з overflow-x: auto. Немає align, cellpadding чи cellspacing.',
    ],
    hint: 'У другому й третьому рядках даних запиши лише дві клітинки: першу колонку вже займає rowspan. Примітка з colspan="3" починається після завершення всіх трьох рядків.',
    referenceHeight: 480,
    reference: htmlDocument(
      'Досьє помічника Листика',
      `<h1>Досьє творчої команди</h1>
<div class="table-scroll">
<table>
  <caption>Досьє помічника Листика</caption>
  <thead><tr><th scope="col">Ілюстрація</th><th scope="col">Параметр</th><th scope="col">Значення</th></tr></thead>
  <tbody>
    <tr><td rowspan="3"><img src="leaf.svg" alt="Зелений листок — знак вигаданого помічника Листика"></td><th scope="row">Ім’я</th><td>Листик</td></tr>
    <tr><th scope="row">Роль</th><td>Помічник творчої команди</td></tr>
    <tr><th scope="row">Уміння</th><td>Помічає деталі й зберігає нотатки</td></tr>
    <tr><td colspan="3">Усі дані описують вигаданого персонажа.</td></tr>
  </tbody>
</table>
</div>`,
      `    body { font-family: Arial, sans-serif; color: #0f172a; background-color: white; }
    h1 { font-size: 28px; }
    .table-scroll { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; background-color: #f0fdf4; }
    caption { background-color: #166534; color: white; font-size: 24px; padding: 10px; }
    th, td { border: 2px solid #166534; padding: 10px; text-align: left; }
    th { background-color: #dcfce7; }
    img { width: 120px; max-width: 100%; height: auto; }`,
    ),
  },
];

export const review2Starter = htmlDocument(
  'Повторення посилань і таблиць',
  '  <!-- Побудуй сторінку за умовою вибраного завдання. -->',
  '    /* Додай знайомі правила CSS. */',
);
