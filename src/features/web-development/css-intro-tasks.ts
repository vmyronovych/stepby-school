import { htmlDocument, type WebTask } from './tasks';

export const cssIntroTasks: WebTask[] = [
  {
    id: 'css-first-class',
    title: 'Стиль для одного абзацу',
    brief:
      'Створи два абзаци. Другому додай class="welcome". У head запиши правило .welcome: колір blue, шрифт Arial із запасним sans-serif, розмір 20px. Перший абзац залиш без класу.',
    text: 'Привіт, вебмайстерню!\nЦей абзац має власний стиль.',
    checklist: [
      'Є два p; лише другий має class="welcome".',
      'У CSS селектор .welcome починається з крапки.',
      'Стиль задає color: blue, font-family: Arial, sans-serif та font-size: 20px.',
      'Перший абзац не отримав стиль welcome.',
    ],
    hint: 'В HTML пишемо class="welcome", а в CSS — .welcome { ... }. Крапка потрібна лише в селекторі.',
    reference: htmlDocument(
      'Перший клас CSS',
      '<p>Привіт, вебмайстерню!</p>\n<p class="welcome">Цей абзац має власний стиль.</p>',
      '    .welcome { color: blue; font-family: Arial, sans-serif; font-size: 20px; }',
    ),
  },
  {
    id: 'css-shared-classes',
    title: 'Один клас — кілька елементів',
    brief:
      'Створи п’ять абзаців. Перший і третій отримують клас fact: darkgreen, Verdana із sans-serif, 28px, bold. П’ятий отримує клас notice: red, Georgia із serif, 18px, bold. Решту залиш без класів.',
    text: 'Майстерня ідей\nУ нашій вигаданій грі можна створювати власні світи.\nЩе одна можливість\nГравці будують маршрути й випробовують їх разом.\nВажливо: домовтеся про правила перед початком гри.',
    checklist: [
      'Є п’ять p.',
      'Клас fact повторно використано на першому й третьому абзацах.',
      'Два абзаци fact мають однакові шрифт, розмір, колір і насиченість.',
      'Останній абзац має клас notice.',
      'Другий і четвертий абзаци залишилися звичайними.',
    ],
    hint: 'Одне правило .fact діє на всі елементи з class="fact". Не потрібно дублювати його для кожного абзацу.',
    reference: htmlDocument(
      'Майстерня ідей',
      '<p class="fact">Майстерня ідей</p>\n<p>У нашій вигаданій грі можна створювати власні світи.</p>\n<p class="fact">Ще одна можливість</p>\n<p>Гравці будують маршрути й випробовують їх разом.</p>\n<p class="notice">Важливо: домовтеся про правила перед початком гри.</p>',
      '    .fact { color: darkgreen; font-family: Verdana, sans-serif; font-size: 28px; font-weight: bold; }\n    .notice { color: red; font-family: Georgia, serif; font-size: 18px; font-weight: bold; }',
    ),
  },
  {
    id: 'css-rainbow',
    title: 'Палітра із семи класів',
    brief:
      'Додай h1 «Сім барв» і сім абзаців. Для кожного абзацу створи окремий клас кольору. Правило h1 вирівнює заголовок по центру. Правило p вирівнює всі абзаци по центру та робить їх жирними, розміром 18px.',
    text: 'Сім барв\nЧервоний — red-tone, #b91c1c\nПомаранчевий — orange-tone, #9a3412\nЖовтий — yellow-tone, #854d0e\nЗелений — green-tone, #166534\nБлакитний — sky-tone, #0369a1\nСиній — blue-tone, #1d4ed8\nФіолетовий — purple-tone, #7e22ce',
    checklist: [
      'Є один h1 та сім p.',
      'Кожен абзац має власний клас кольору.',
      'Спільне правило p задає font-weight: bold, font-size: 18px і text-align: center.',
      'Кольори задано правилами класів, а не атрибутами HTML.',
      'Усі написи читабельні на білому тлі.',
    ],
    hint: 'Використай наведені темніші відтінки для читабельності. Назва кольору лишається текстом, а код після # задає його вигляд.',
    reference: htmlDocument(
      'Сім барв',
      '<h1>Сім барв</h1>\n<p class="red-tone">Червоний</p>\n<p class="orange-tone">Помаранчевий</p>\n<p class="yellow-tone">Жовтий</p>\n<p class="green-tone">Зелений</p>\n<p class="sky-tone">Блакитний</p>\n<p class="blue-tone">Синій</p>\n<p class="purple-tone">Фіолетовий</p>',
      '    h1 { text-align: center; }\n    p { text-align: center; font-weight: bold; font-size: 18px; }\n    .red-tone { color: #b91c1c; }\n    .orange-tone { color: #9a3412; }\n    .yellow-tone { color: #854d0e; }\n    .green-tone { color: #166534; }\n    .sky-tone { color: #0369a1; }\n    .blue-tone { color: #1d4ed8; }\n    .purple-tone { color: #7e22ce; }',
    ),
  },
  {
    id: 'css-world-guide',
    title: 'Довідник вигаданого світу',
    brief:
      'Створи довідник за текстом. h1: green, Verdana/sans-serif, 40px, bold. h2: darkblue, Georgia/serif, 32px. Усі p: Tahoma/sans-serif, 18px, black. Заголовкам h3 за порядком додай класи question, advice, discovery, reminder. Вирівняй заголовки й абзаци по центру через CSS.',
    text: 'Світ кубічних пригод\nТут мандрівники будують міста й шукають приховані стежки.\nКам’яний вартовий\nХто це?\nЦе вигаданий охоронець гірської брами. Він любить загадки.\nЯк пройти далі?\nЗнайди три символи та поясни їхнє значення.\nЦікава знахідка\nБіля брами заховано карту підземного озера.\nДля запам’ятовування\nУважно читай підказки й перевіряй кожне припущення.',
    checklist: [
      'h1 і h2 мають задані колір, сімейство та розмір шрифту.',
      'question: brown, "Courier New"/monospace, 26px, bold.',
      'advice: darkred, Arial/sans-serif.',
      'discovery: teal, "Comic Sans MS"/cursive, bold.',
      'reminder: #4b5563, "Trebuchet MS"/sans-serif.',
      'Класи застосовано до чотирьох h3; загальні стилі — до h1, h2, h3 та p.',
      'Абзаци розділяють думки; br не використано для порожніх відступів.',
    ],
    hint: 'Можна перерахувати селектори через кому: h1, h2, h3, p { text-align: center; }. Якщо потрібного шрифту немає, браузер використає запасний. Зразок показано у вікні 720 × 640 px.',
    referenceHeight: 640,
    reference: htmlDocument(
      'Довідник пригод',
      '<h1>Світ кубічних пригод</h1>\n<p>Тут мандрівники будують міста й шукають приховані стежки.</p>\n<h2>Кам’яний вартовий</h2>\n<h3 class="question">Хто це?</h3>\n<p>Це вигаданий охоронець гірської брами. Він любить загадки.</p>\n<h3 class="advice">Як пройти далі?</h3>\n<p>Знайди три символи та поясни їхнє значення.</p>\n<h3 class="discovery">Цікава знахідка</h3>\n<p>Біля брами заховано карту підземного озера.</p>\n<h3 class="reminder">Для запам’ятовування</h3>\n<p>Уважно читай підказки й перевіряй кожне припущення.</p>',
      '    h1, h2, h3, p { text-align: center; }\n    h1 { color: green; font-family: Verdana, sans-serif; font-size: 40px; font-weight: bold; }\n    h2 { color: darkblue; font-family: Georgia, serif; font-size: 32px; }\n    p { font-family: Tahoma, sans-serif; font-size: 18px; color: black; }\n    .question { color: brown; font-family: "Courier New", monospace; font-size: 26px; font-weight: bold; }\n    .advice { color: darkred; font-family: Arial, sans-serif; }\n    .discovery { color: teal; font-family: "Comic Sans MS", cursive; font-weight: bold; }\n    .reminder { color: #4b5563; font-family: "Trebuchet MS", sans-serif; }',
    ),
  },
  {
    id: 'css-homework',
    title: 'Домашня робота: моя гра',
    brief:
      'Напиши про вигадану або улюблену гру: назва, що подобається, складність і думка про навчання. Додай h1 і чотири p. Використай класи game, description, challenge, feedback та окремий клас centered. Першому абзацу задай два класи: game centered.',
    text: 'Моя ігрова майстерня\nМоя гра — «Острів ідей».\nМені подобається будувати маршрути й шукати скарби.\nНайскладніше — розгадувати загадки маяка.\nЯ вже вмію поєднувати класи CSS.',
    checklist: [
      'game: darkgreen, Verdana/sans-serif, 20px.',
      'description: Georgia/serif, 18px.',
      'challenge: font-size: 24px.',
      'feedback: font-weight: bold.',
      'centered: text-align: center.',
      'Перший p має class="game centered" та обидва стилі одночасно.',
      'Файл збережено та перевірено у браузері.',
    ],
    hint: 'Між назвами класів в HTML постав пробіл. У CSS запиши два окремі правила .game і .centered. Порядок назв у class не задає перевагу стилів.',
    reference: htmlDocument(
      'Моя гра',
      '<h1>Моя ігрова майстерня</h1>\n<p class="game centered">Моя гра — «Острів ідей».</p>\n<p class="description">Мені подобається будувати маршрути й шукати скарби.</p>\n<p class="challenge">Найскладніше — розгадувати загадки маяка.</p>\n<p class="feedback">Я вже вмію поєднувати класи CSS.</p>',
      '    .game { color: darkgreen; font-family: Verdana, sans-serif; font-size: 20px; }\n    .description { font-family: Georgia, serif; font-size: 18px; }\n    .challenge { font-size: 24px; }\n    .feedback { font-weight: bold; }\n    .centered { text-align: center; }',
    ),
  },
];

export const cssIntroStarter = htmlDocument(
  'Вступ до CSS',
  '  <!-- Додай елементи та атрибути class. -->',
  '    /* Додай правила класів тут. */',
);
