import { htmlDocument, type WebTask } from './tasks';

export const reviewTasks: WebTask[] = [
  {
    id: 'review-interests',
    title: 'Сторінка про захоплення',
    brief:
      'Створи h1 «Моя майстерня ігор» і три абзаци. Задай body фон #e6ffe6, шрифт Verdana із sans-serif. h1 має darkblue і 34px, p — 18px. Познач важливу пораду через strong, наголос через em, неактуальний план через s. Підкресли назву гри через клас title-mark і CSS.',
    text: 'Моя майстерня ігор\nУ грі «Острів ідей» я будую маршрути й вигадую загадки.\nСтарий план: грати самому. Новий план: досліджувати разом.\nВажливо: поважай домовленості команди.',
    checklist: [
      'Є h1 і три p з потрібними кольорами, сімейством і розмірами шрифтів.',
      'Назва гри має span із класом title-mark та text-decoration: underline.',
      'Слово «разом» має em, а слово «Важливо» — strong.',
      'Лише старий план позначено через s.',
      'Усі стилі записано в head, текст — у body.',
    ],
    hint: 'Пригадай: strong передає важливість, em — наголос. Для декоративного підкреслення використовуй CSS, а не семантичну анотацію u.',
    reference: htmlDocument(
      'Моя майстерня ігор',
      '<h1>Моя майстерня ігор</h1>\n<p>У грі <span class="title-mark">«Острів ідей»</span> я будую маршрути й вигадую загадки.</p>\n<p><s>Старий план: грати самому.</s> Новий план: досліджувати <em>разом</em>.</p>\n<p><strong>Важливо:</strong> поважай домовленості команди.</p>',
      '    body { background-color: #e6ffe6; font-family: Verdana, sans-serif; color: black; }\n    h1 { color: darkblue; font-size: 34px; }\n    p { font-size: 18px; }\n    .title-mark { text-decoration: underline; }',
    ),
  },
  {
    id: 'review-formulas',
    title: 'Формули та новий рядок',
    brief:
      'Створи h1 «Формули та рядки» і три абзаци. body: фон #fff3e0, Tahoma із sans-serif. h1: darkred, 32px. p: 18px. Запиши формулу води через sub, степені в теоремі Піфагора — через sup. В останньому абзаці покажи текст «<br>» і справжнє перенесення рядка.',
    text: 'Формули та рядки\nВода: H2O.\nУ прямокутному трикутнику: x2 + y2 = z2, де z — гіпотенуза.\nТег <br> переносить текст на новий рядок.\nЦе продовження того самого абзацу.',
    checklist: [
      'Цифра у формулі води належить елементу sub.',
      'Усі три показники степеня належать елементам sup.',
      'Рівність пояснено саме для прямокутного трикутника.',
      'Напис «<br>» задано як &lt;br&gt;, а перенесення — як br.',
      'Останні два рядки належать одному p.',
    ],
    hint: 'Кутові дужки в тексті записують як &lt; та &gt;. Так браузер покаже назву тега, а не виконає його.',
    reference: htmlDocument(
      'Формули та рядки',
      '<h1>Формули та рядки</h1>\n<p>Вода: H<sub>2</sub>O.</p>\n<p>У прямокутному трикутнику: x<sup>2</sup> + y<sup>2</sup> = z<sup>2</sup>, де z — гіпотенуза.</p>\n<p>Тег &lt;br&gt; переносить текст на новий рядок.<br>Це продовження того самого абзацу.</p>',
      '    body { background-color: #fff3e0; font-family: Tahoma, sans-serif; color: black; }\n    h1 { color: darkred; font-size: 32px; }\n    p { font-size: 18px; }',
    ),
  },
  {
    id: 'review-lists',
    title: 'Три списки вподобань',
    brief:
      'Створи сторінку з h1 «Мої вподобання», трьома h2 та трьома списками по п’ять пунктів. Для їжі використай ul з маркерами circle, для занять — ul з disc, для шкільних предметів — ol з upper-roman. Маркери задай через класи CSS. Усі li зроби жирними.',
    text: 'Мої вподобання\nСтрави: піца, вареники, суп, яблука, морозиво.\nЗаняття: малювання, прогулянки, настільні ігри, музика, веброзробка.\nПредмети: математика, мистецтво, інформатика, англійська мова, фізична культура.',
    checklist: [
      'body має фон #e0e7ff і шрифт Arial, sans-serif.',
      'h1: blue, 36px і text-align: center; h2: Georgia, serif, 28px і darkblue.',
      'Кожен список містить рівно п’ять прямих дочірніх li.',
      'Класи food-list, activity-list і subject-list задають потрібні list-style-type.',
      'li має font-weight: bold; назви розділів розміщено перед списками.',
    ],
    hint: 'Заголовок розділу не є пунктом списку. Запиши його окремо перед ul або ol. Вигляд маркерів задавай правилом класу.',
    referenceHeight: 720,
    reference: htmlDocument(
      'Мої вподобання',
      '<h1>Мої вподобання</h1>\n<h2>Страви</h2>\n<ul class="food-list"><li>Піца</li><li>Вареники</li><li>Суп</li><li>Яблука</li><li>Морозиво</li></ul>\n<h2>Заняття</h2>\n<ul class="activity-list"><li>Малювання</li><li>Прогулянки</li><li>Настільні ігри</li><li>Музика</li><li>Веброзробка</li></ul>\n<h2>Предмети</h2>\n<ol class="subject-list"><li>Математика</li><li>Мистецтво</li><li>Інформатика</li><li>Англійська мова</li><li>Фізична культура</li></ol>',
      '    body { background-color: #e0e7ff; font-family: Arial, sans-serif; }\n    h1 { color: blue; font-size: 36px; text-align: center; }\n    h2 { color: darkblue; font-family: Georgia, serif; font-size: 28px; }\n    li { font-weight: bold; }\n    .food-list { list-style-type: circle; }\n    .activity-list { list-style-type: disc; }\n    .subject-list { list-style-type: upper-roman; }',
    ),
  },
  {
    id: 'review-gallery',
    title: 'Домашня робота: галерея природи',
    brief:
      'Створи h1 «Мала галерея природи» і три абзаци з малюнками та підписами. Використай rabbit.svg, bird.svg і flower.svg. Додай описові alt, рамку 3px solid #14532d, заокруглення 24px та однаковий розмір зображень 170 × 120px із object-fit: cover. Фоном сторінки зроби meadow.svg.',
    text: 'Мала галерея природи\nКролик\nПтах\nКвітка',
    checklist: [
      'Фон body має background-image: url("meadow.svg") і шрифт Arial, sans-serif.',
      'h1 має колір #14532d, фон #f0fdf4 та вирівнювання по центру.',
      'Є три img з різними файлами та змістовними alt.',
      'Кожен малюнок і підпис належать одному p з класом photo.',
      'photo має width: 240px, max-width: 100%, margin-inline: auto, background-color: white та text-align: center.',
      'img має потрібні розміри, рамку, border-radius та object-fit; box-sizing: border-box ураховує рамку в ширині.',
      'Готовий HTML завантажено й відкрито без підключення до мережі.',
    ],
    hint: 'Підпис перенеси на новий рядок через br після img. Розмісти кожен малюнок із підписом в окремому абзаці. Клас photo центрує ці абзаци через margin-inline: auto. Кнопки з малюнками допоможуть вставити src.',
    referenceHeight: 640,
    reference: htmlDocument(
      'Галерея природи',
      '<h1>Мала галерея природи</h1>\n<p class="photo"><img src="rabbit.svg" alt="Малюнок кролика на галявині"><br>Кролик</p>\n<p class="photo"><img src="bird.svg" alt="Малюнок птаха на гілці"><br>Птах</p>\n<p class="photo"><img src="flower.svg" alt="Малюнок квітки"><br>Квітка</p>',
      '    body { background-color: #f0fdf4; background-image: url("meadow.svg"); font-family: Arial, sans-serif; }\n    h1 { color: #14532d; background-color: #f0fdf4; text-align: center; }\n    .photo { width: 240px; max-width: 100%; margin-inline: auto; background-color: white; text-align: center; }\n    img { width: 170px; height: 120px; box-sizing: border-box; max-width: 100%; object-fit: cover; border: 3px solid #14532d; border-radius: 24px; }',
    ),
  },
];

export const reviewStarter = htmlDocument(
  'Повторення HTML і CSS',
  '  <!-- Побудуй сторінку за умовою завдання. -->',
  '    /* Додай потрібні правила CSS. */',
);
