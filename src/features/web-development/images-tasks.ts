import { htmlDocument, type WebTask } from './tasks';

export const imagesTasks: WebTask[] = [
  {
    id: 'images-flower-shop',
    title: 'Квіткова майстерня',
    brief:
      'Створи сторінку «Квіткова майстерня». Додай h1, hr, три зображення та h2 «Наші рослини». Використай flower.svg двічі та leaf.svg один раз. Для img задай ширину 180px, висоту 120px, object-fit: cover, рамку 3px solid #7e22ce та border-radius: 20px. Вирівняй заголовки й рядок зображень по центру.',
    text: 'Квіткова майстерня\nНаші рослини\nКвіти й листя додають кольору нашій майстерні.',
    checklist: [
      'Є один h1, один h2 і тематична межа hr.',
      'Три img мають src і змістовні alt.',
      'Зображення мають однаковий розмір, рамку й округлені кути; box-sizing: border-box ураховує рамку в ширині.',
      'Фон body — url("meadow.svg"), no-repeat, cover та запасний колір #ecfdf5.',
      'Заголовки й абзаци мають CSS text-align: center.',
      'Заголовки мають темний колір і світле тло для читабельності.',
    ],
    hint: 'Кнопки матеріалів вставляють зображення з короткими назвами файлів. Для фону запиши url("meadow.svg") у style. Статичні ілюстрації не потребують анімації.',
    reference: htmlDocument(
      'Квіткова майстерня',
      '<h1>Квіткова майстерня</h1>\n<hr>\n<p><img src="flower.svg" alt="Ілюстрація квітки"> <img src="leaf.svg" alt="Ілюстрація листка"> <img src="flower.svg" alt="Ще одна квітка"></p>\n<h2>Наші рослини</h2>\n<p>Квіти й листя додають кольору нашій майстерні.</p>',
      '    body { background-color: #ecfdf5; background-image: url("meadow.svg"); background-repeat: no-repeat; background-size: cover; font-family: Arial, sans-serif; color: #14532d; }\n    h1, h2, p { text-align: center; }\n    h1, h2 { background-color: #f0fdf4; }\n    img { width: 180px; max-width: 100%; box-sizing: border-box; height: 120px; object-fit: cover; border: 3px solid #7e22ce; border-radius: 20px; }\n    hr { border: 0; height: 4px; background-color: #0f766e; }',
    ),
  },
  {
    id: 'images-animal-notes',
    title: 'Ілюстрації поруч із текстом',
    brief:
      'Створи дві нотатки з h2: «Кролик» і «Птах». У кожній використай контейнер div з класом animal-note. Усередині додай зображення та абзац. Кролика розмісти ліворуч, птаха — праворуч через float. Контейнерам задай display: flow-root.',
    text: 'Наші спостереження\nКролик\nНа малюнку кролик. У нього довгі вуха. Роздивись, як текст розміщується біля ілюстрації.\nПтах\nНа малюнку птах. Його крила додають композиції руху. Друга нотатка починається після першої.',
    checklist: [
      'Є h1 і два h2 із текстом нотаток.',
      'Два img використовують rabbit.svg і bird.svg та мають alt.',
      'Ширина img — 180px, max-width — 45%, висота — auto.',
      'Для img задано рамку 3px solid #92400e та border-radius: 12px.',
      'Класи left і right задають float: left та float: right.',
      'animal-note має display: flow-root; другий розділ не обтікає перше зображення.',
    ],
    hint: 'Зображення має стояти перед абзацом у своєму div. Для класу left додай margin-right: 12px, для right — margin-left: 12px. Не додавай порожні рядки для завершення обтікання.',
    reference: htmlDocument(
      'Наші спостереження',
      '<h1>Наші спостереження</h1>\n<h2>Кролик</h2>\n<div class="animal-note"><img class="left" src="rabbit.svg" alt="Ілюстрація кролика з довгими вухами"><p>На малюнку кролик. У нього довгі вуха. Роздивись, як текст розміщується біля ілюстрації.</p></div>\n<h2>Птах</h2>\n<div class="animal-note"><img class="right" src="bird.svg" alt="Ілюстрація птаха з крилами"><p>На малюнку птах. Його крила додають композиції руху. Друга нотатка починається після першої.</p></div>',
      '    body { background-color: #fffbeb; font-family: Arial, sans-serif; color: #1f2937; }\n    h1 { color: #14532d; text-align: center; }\n    h2 { color: #92400e; }\n    p { font-size: 18px; }\n    .animal-note { display: flow-root; }\n    img { width: 180px; max-width: 45%; height: auto; border: 3px solid #92400e; border-radius: 12px; }\n    .left { float: left; margin-right: 12px; }\n    .right { float: right; margin-left: 12px; }',
    ),
    referenceHeight: 540,
  },
  {
    id: 'images-homework',
    title: 'Домашня робота: улюблений урок',
    brief:
      'Створи сторінку про вигадану природничу майстерню або свій улюблений урок. Додай h1, два абзаци й одну ілюстрацію з матеріалів. Відцентруй зображення через display: block і margin-inline: auto. Додай рамку й округлення кутів.',
    text: 'Моя природнича майстерня\nНа цьому уроці я розглядаю рослини й малюю їхні деталі.\nМені подобається помічати нове у звичних речах.',
    checklist: [
      'Є повний HTML-документ із власною назвою вкладки.',
      'Зображення має змістовний alt і відображається по центру.',
      'Ширина img — 260px, max-width — 100%, висота — auto; box-sizing: border-box ураховує рамку.',
      'Рамка — 4px solid #166534, border-radius — 24px.',
      'Для фону використано meadow.svg із repeat-x та запасним кольором #f0fdf4.',
      'Готовий HTML завантажено й перевірено без доступу до мережі.',
    ],
    hint: 'У зразку використано leaf.svg. Можеш вибрати інший матеріал та власні речення. Зображення в завантаженому HTML зберігаються разом із документом.',
    reference: htmlDocument(
      'Мій улюблений урок',
      '<h1>Моя природнича майстерня</h1>\n<p>На цьому уроці я розглядаю рослини й малюю їхні деталі.</p>\n<img src="leaf.svg" alt="Ілюстрація зеленого листка">\n<p>Мені подобається помічати нове у звичних речах.</p>',
      '    body { background-color: #f0fdf4; background-image: url("meadow.svg"); background-repeat: repeat-x; font-family: Arial, sans-serif; color: #14532d; }\n    h1, p { text-align: center; background-color: #f0fdf4; }\n    img { display: block; margin-inline: auto; width: 260px; max-width: 100%; box-sizing: border-box; height: auto; border: 4px solid #166534; border-radius: 24px; }',
    ),
  },
];

export const imagesStarter = htmlDocument(
  'Зображення на сторінці',
  '  <!-- Додай текст та ілюстрації з матеріалів. -->',
  '    /* Налаштуй розміри, рамки та фон. */',
);
