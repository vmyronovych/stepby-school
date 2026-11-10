import { htmlDocument, type WebTask } from './tasks';

export const linksTasks: WebTask[] = [
  {
    id: 'links-garden-guide',
    title: 'Путівник шкільним садом',
    brief:
      'Створи путівник із h1, меню та трьома розділами h2: «Квітка», «Листок», «Птах». Меню має три посилання на flower, leaf і bird. Додай однойменні унікальні id до заголовків. Після розділів додай повернення до menu. Використай три зображення з матеріалів.',
    text: 'Путівник шкільним садом\nКвітка\nЛисток\nПтах\nКвітка додає кольору нашому малюнку саду.\nЛисток допомагає помітити форму й відтінки зеленого.\nПтах завершує нашу ілюстровану прогулянку.\nПовернутися до меню',
    checklist: [
      'Є один h1, три h2, три img з alt та абзацами описів.',
      'Меню — p з id="menu". Посилання мають href="#flower", "#leaf" і "#bird".',
      'Кожний h2 має відповідний унікальний id. Після описів є href="#menu".',
      'body: Arial/sans-serif, текст #0f172a, фон #f0fdf4. h1: 30px, #14532d; h2: 22px.',
      'a: color #075985, font-size 18px, margin-right 12px. Підкреслення збережено.',
      'img: width 120px, max-width 100%, height auto, рамка 2px solid #166534, border-radius 10px.',
      'Усі три переходи та повернення перевірено; адреса самої сторінки курсу не змінюється.',
    ],
    hint: 'У href перед назвою id потрібен #. У самому атрибуті id символ # не записують. Мета посилання має бути зрозуміла з його тексту.',
    referenceHeight: 720,
    reference: htmlDocument(
      'Путівник садом',
      `<h1>Путівник шкільним садом</h1>
<p id="menu"><a href="#flower">Квітка</a> <a href="#leaf">Листок</a> <a href="#bird">Птах</a></p>
<h2 id="flower">Квітка</h2>
<img src="flower.svg" alt="Ілюстрація квітки">
<p>Квітка додає кольору нашому малюнку саду.</p>
<h2 id="leaf">Листок</h2>
<img src="leaf.svg" alt="Зелений листок">
<p>Листок допомагає помітити форму й відтінки зеленого.</p>
<h2 id="bird">Птах</h2>
<img src="bird.svg" alt="Птах на гілці">
<p>Птах завершує нашу ілюстровану прогулянку.</p>
<p><a href="#menu">Повернутися до меню</a></p>`,
      `    body { font-family: Arial, sans-serif; color: #0f172a; background-color: #f0fdf4; }
    h1 { font-size: 30px; color: #14532d; }
    h2 { font-size: 22px; }
    a { color: #075985; font-size: 18px; margin-right: 12px; }
    img { width: 120px; max-width: 100%; height: auto; border: 2px solid #166534; border-radius: 10px; }`,
    ),
  },
  {
    id: 'links-art-kit',
    title: 'Матеріали для майстерні',
    brief:
      'Створи h1 «Матеріали для майстерні» та два розділи h2. У першому покажи flower.svg і leaf.svg та додай текстові посилання на їх завантаження. У другому додай навчальні mailto й tel. Наприкінці розмісти зовнішнє посилання з title, target="_blank" і rel="noopener noreferrer".',
    text: 'Матеріали для майстерні\nІлюстрації\nЗавантажити квітку\nЗавантажити листок\nНавчальні контакти\nНаписати організатору\nТелефон майстерні\nНавчальна зовнішня сторінка',
    checklist: [
      'Є h1, два h2, дві ілюстрації з alt та окремі текстові посилання завантаження.',
      'Посилання мають href="flower.svg" download="flower.svg" і відповідні значення для leaf.svg.',
      'Контакти: mailto:club@example.com і tel:+380000000000. Це вигадані навчальні адреси.',
      'Зовнішній href — https://example.com; title — «Відкриється у новій вкладці»; target="_blank"; rel="noopener noreferrer".',
      'body: фон #fff7ed, Arial/sans-serif, текст #431407. a: #9a3412, 18px. img: width 120px, height auto, max-width 100%.',
      'Завантаження картинок перевірено в редакторі. Пошту, телефон і зовнішній сайт перевіряй у збереженому HTML за потреби.',
    ],
    hint: 'download є окремим атрибутом a, а mailto: та tel: — частинами адреси href. У безпечному перегляді зовнішні переходи й контакти вимкнено.',
    referenceHeight: 500,
    reference: htmlDocument(
      'Матеріали майстерні',
      `<h1>Матеріали для майстерні</h1>
<h2>Ілюстрації</h2>
<p><img src="flower.svg" alt="Квітка"> <a href="flower.svg" download="flower.svg">Завантажити квітку</a></p>
<p><img src="leaf.svg" alt="Листок"> <a href="leaf.svg" download="leaf.svg">Завантажити листок</a></p>
<h2>Навчальні контакти</h2>
<p><a href="mailto:club@example.com">Написати організатору</a></p>
<p><a href="tel:+380000000000">Телефон майстерні</a></p>
<p><a href="https://example.com" title="Відкриється у новій вкладці" target="_blank" rel="noopener noreferrer">Навчальна зовнішня сторінка</a></p>`,
      `    body { background-color: #fff7ed; font-family: Arial, sans-serif; color: #431407; }
    a { color: #9a3412; font-size: 18px; }
    img { width: 120px; max-width: 100%; height: auto; }`,
    ),
  },
  {
    id: 'links-homework',
    title: 'Домашня робота: моя сторінка посилань',
    brief:
      'Створи сторінку «Мої творчі матеріали» з двома розділами h2, меню-якорями й поверненням нагору. Додай зовнішню навчальну адресу з підказкою та новою вкладкою, посилання на пошту, телефон і завантаження rabbit.svg. Задай власні читабельні кольори.',
    text: 'Мої творчі матеріали\nПро майстерню\nМатеріали\nУ майстерні я малюю й створюю прості вебсторінки.\nНавчальна зовнішня сторінка\nНаписати в майстерню\nНавчальний телефон\nЗавантажити кролика\nПовернутися нагору',
    checklist: [
      'Є h1, два h2 з id="about" та id="materials", меню з id="top" і робочі внутрішні переходи.',
      'Зовнішнє посилання веде на https://example.com та має title, target="_blank", rel="noopener noreferrer".',
      'Є mailto:studio@example.com і tel:+380000000000 з доречними текстами посилань.',
      'Є href="rabbit.svg" download="rabbit.svg". Імена файлів не містять випадкових пробілів.',
      'Текст читається на тлі, посилання відрізняються не лише кольором, для шрифту є sans-serif.',
      'Завантажений index.html зберігає структуру, адреси й картинку для завантаження без окремих файлів.',
    ],
    hint: 'Спочатку перевір #about, #materials і #top. Для роботи у локальному редакторі збережи rabbit.svg поруч із index.html. Під час експорту з майстерні матеріал вбудовується.',
    reference: htmlDocument(
      'Мої творчі матеріали',
      `<h1>Мої творчі матеріали</h1>
<p id="top"><a href="#about">Про майстерню</a> | <a href="#materials">Матеріали</a></p>
<h2 id="about">Про майстерню</h2>
<p>У майстерні я малюю й створюю прості вебсторінки.</p>
<p><a href="https://example.com" title="Навчальна сторінка у новій вкладці" target="_blank" rel="noopener noreferrer">Навчальна зовнішня сторінка</a></p>
<h2 id="materials">Матеріали</h2>
<p><a href="mailto:studio@example.com">Написати в майстерню</a> | <a href="tel:+380000000000">Навчальний телефон</a></p>
<p><a href="rabbit.svg" download="rabbit.svg">Завантажити кролика</a></p>
<p><a href="#top">Повернутися нагору</a></p>`,
      `    body { background-color: #eff6ff; color: #172554; font-family: Arial, sans-serif; }
    a { color: #1d4ed8; }
    h1 { font-size: 30px; }
    h2 { font-size: 22px; }`,
    ),
  },
];

export const linksStarter = htmlDocument(
  'Гіперпосилання',
  '  <!-- Додай текст, посилання та їхні цілі. -->',
  '    /* Оформи посилання й розділи. */',
);
