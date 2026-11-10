import { htmlDocument, type WebTask } from './tasks';

export const imageLinksTasks: WebTask[] = [
  {
    id: 'image-links-fieldbook',
    title: 'Ілюстрований зміст',
    brief:
      'Створи h1 «Мій польовий блокнот». Додай три посилання, які містять тільки зображення квітки, листка та птаха. Вони ведуть до розділів flower, leaf і bird. Для кожного розділу додай h2 та короткий опис. Наприкінці зроби посилання на навчальну зовнішню сторінку в новій вкладці.',
    text: 'Мій польовий блокнот\nНатисни на ілюстрацію, щоб перейти до опису.\nКвітка\nУ блокноті я порівнюю кольори квітів.\nЛисток\nУ блокноті я замальовую форму листків.\nПтах\nУ блокноті я вигадую історії про птахів.\nНавчальна зовнішня сторінка — нова вкладка',
    checklist: [
      'Є h1, три h2 з унікальними id та три абзаци описів.',
      'Кожен img вкладено всередину a. Посилання ведуть на #flower, #leaf і #bird.',
      'alt пояснює перехід: «Читати про квітку», «Читати про листок», «Читати про птаха».',
      'body: фон #f8fafc, текст #0f172a, Arial/sans-serif; h1 30px, h2 22px.',
      'img: width 150px, max-width 100%, height auto, рамка 3px solid #0f766e, border-radius 12px.',
      'a: color #075985. a:focus має outline: 3px solid #1d4ed8; outline-offset: 3px.',
      'Останнє посилання: https://example.com, target="_blank", rel="noopener noreferrer".',
      'Перехід через картинку перевірено мишею та клавішами Tab і Enter.',
    ],
    hint: 'Закрий a лише після img. Якщо посилання містить тільки картинку, її alt має пояснювати призначення посилання, а не лише називати колір зображення.',
    referenceHeight: 540,
    reference: htmlDocument(
      'Ілюстрований блокнот',
      `<h1>Мій польовий блокнот</h1>
<p>Натисни на ілюстрацію, щоб перейти до опису.</p>
<p><a href="#flower"><img src="flower.svg" alt="Читати про квітку"></a> <a href="#leaf"><img src="leaf.svg" alt="Читати про листок"></a> <a href="#bird"><img src="bird.svg" alt="Читати про птаха"></a></p>
<h2 id="flower">Квітка</h2>
<p>У блокноті я порівнюю кольори квітів.</p>
<h2 id="leaf">Листок</h2>
<p>У блокноті я замальовую форму листків.</p>
<h2 id="bird">Птах</h2>
<p>У блокноті я вигадую історії про птахів.</p>
<p><a href="https://example.com" target="_blank" rel="noopener noreferrer">Навчальна зовнішня сторінка — нова вкладка</a></p>`,
      `    body { background-color: #f8fafc; color: #0f172a; font-family: Arial, sans-serif; }
    h1 { font-size: 30px; }
    h2 { font-size: 22px; }
    img { width: 150px; max-width: 100%; height: auto; border: 3px solid #0f766e; border-radius: 12px; }
    a { color: #075985; }
    a:focus { outline: 3px solid #1d4ed8; outline-offset: 3px; }`,
    ),
  },
  {
    id: 'image-links-states',
    title: 'Три стани посилання',
    brief:
      'Створи сторінку «Обери символ майстерні». Додай два посилання з класом choice: квітку й листок із підписами. Обидва ведуть на #result. Оформи наведення, клавіатурний фокус і момент натискання. Не змінюй розмір картинок між станами.',
    text: 'Обери символ майстерні\nКвітка\nЛисток\nРезультат переходу\nТи перейшов до пояснення. Це посилання, а не форма вибору.',
    checklist: [
      'Є h1, два a.choice з img і видимими підписами, h2 id="result" та абзац пояснення.',
      'choice: display block, width 210px, max-width 100%, box-sizing border-box, margin 16px auto, padding 10px, рамка 3px solid #0f766e, text-align center.',
      'Звичайний стан: фон white, текст #134e4a, без підкреслення. img: width 160px, max-width 100%, height auto.',
      'choice:hover: background-color #fef3c7; border-color #b45309.',
      'choice:focus: outline 3px solid #1d4ed8; outline-offset 3px.',
      'choice:active: background-color #dbeafe; border-color #1d4ed8.',
      'body має фон #f0fdfa, колір #0f172a й Arial/sans-serif. Товщина рамки лишається 3px в усіх станах.',
      'Перевірено hover мишею, focus через Tab та active під час утримання кнопки миші.',
    ],
    hint: 'Запиши звичайне правило першим. Потім додай :hover, :focus та :active. Стан :active триває лише під час активації; він не зберігає вибір.',
    referenceHeight: 580,
    reference: htmlDocument(
      'Стани посилання',
      `<h1>Обери символ майстерні</h1>
<a class="choice" href="#result"><img src="flower.svg" alt=""><br>Квітка</a>
<a class="choice" href="#result"><img src="leaf.svg" alt=""><br>Листок</a>
<h2 id="result">Результат переходу</h2>
<p>Ти перейшов до пояснення. Це посилання, а не форма вибору.</p>`,
      `    body { background-color: #f0fdfa; color: #0f172a; font-family: Arial, sans-serif; }
    .choice { display: block; width: 210px; max-width: 100%; box-sizing: border-box; margin: 16px auto; padding: 10px; border: 3px solid #0f766e; text-align: center; background-color: white; color: #134e4a; text-decoration: none; }
    img { width: 160px; max-width: 100%; height: auto; }
    .choice:hover { background-color: #fef3c7; border-color: #b45309; }
    .choice:focus { outline: 3px solid #1d4ed8; outline-offset: 3px; }
    .choice:active { background-color: #dbeafe; border-color: #1d4ed8; }`,
    ),
  },
  {
    id: 'image-links-homework',
    title: 'Домашня робота: картинка-запрошення',
    brief:
      'Створи h1 «Запрошення до майстерні» та посилання invitation з картинкою кролика й підписом «Дізнатися про зустріч». Посилання веде на #meeting. Додай розділ із двома реченнями та окреме завантаження rabbit.svg. Оформи hover, focus та active.',
    text: 'Запрошення до майстерні\nДізнатися про зустріч\nПро зустріч\nМи створюємо ілюстровані історії та вебсторінки. Принось власні ідеї для малюнків.\nЗавантажити ілюстрацію',
    checklist: [
      'Є посилання invitation з href="#meeting", img і видимим підписом. Порожній alt не дублює цей підпис.',
      'Заголовок h2 має id="meeting". Текст і картинка належать одному посиланню.',
      'invitation: display block, width 240px, max-width 100%, box-sizing border-box, padding 12px, margin 20px auto, рамка 3px solid #7c3aed.',
      'body: фон #faf5ff, Arial/sans-serif, текст #3b0764. Звичайний фон invitation — white, text-align center, text-decoration none.',
      'hover задає фон #ede9fe; focus — outline 3px solid #0369a1 з outline-offset 3px; active — border-color #0369a1.',
      'Картинка: width 180px, max-width 100%, height auto. Download-посилання має href="rabbit.svg" download="rabbit.svg".',
      'Tab і Enter працюють. Розміри посилання не стрибають між станами. Готовий HTML збережено.',
    ],
    hint: 'Усередині a може бути і картинка, і текст. Якщо підпис уже пояснює дію, alt="" допомагає уникнути подвійного озвучення.',
    referenceHeight: 480,
    reference: htmlDocument(
      'Запрошення до майстерні',
      `<h1>Запрошення до майстерні</h1>
<a class="invitation" href="#meeting"><img src="rabbit.svg" alt=""><br>Дізнатися про зустріч</a>
<h2 id="meeting">Про зустріч</h2>
<p>Ми створюємо ілюстровані історії та вебсторінки. Принось власні ідеї для малюнків.</p>
<p><a href="rabbit.svg" download="rabbit.svg">Завантажити ілюстрацію</a></p>`,
      `    body { background-color: #faf5ff; color: #3b0764; font-family: Arial, sans-serif; }
    .invitation { display: block; width: 240px; max-width: 100%; box-sizing: border-box; padding: 12px; margin: 20px auto; border: 3px solid #7c3aed; background-color: white; text-align: center; text-decoration: none; color: #3b0764; }
    img { width: 180px; max-width: 100%; height: auto; }
    .invitation:hover { background-color: #ede9fe; }
    .invitation:focus { outline: 3px solid #0369a1; outline-offset: 3px; }
    .invitation:active { border-color: #0369a1; }`,
    ),
  },
];

export const imageLinksStarter = htmlDocument(
  'Посилання та зображення',
  '  <!-- Додай зображення всередині посилань. -->',
  '    /* Оформи звичайний стан, hover, focus та active. */',
);
