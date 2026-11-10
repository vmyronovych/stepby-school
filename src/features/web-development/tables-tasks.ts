import { htmlDocument, type WebTask } from './tasks';

const baseCss = `    body { font-family: Arial, sans-serif; color: #0f172a; background-color: #f8fafc; }
    .table-scroll { max-width: 100%; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; margin-inline: auto; }
    caption { font-size: 24px; font-weight: bold; color: #0f766e; padding: 12px; }
    th, td { border: 2px solid #64748b; padding: 10px; text-align: center; }
    th { background-color: #e0f2fe; }
    img { width: 64px; height: auto; }`;

export const tablesTasks: WebTask[] = [
  {
    id: 'tables-challenges',
    title: 'Матриця завдань',
    brief:
      'Створи таблицю «Складність наших завдань» із чотирма стовпцями: Завдання, Легке, Середнє, Складне. Додай три рядки з даними. Познач вибрану складність словом «Так» і класом choice. У решті клітинок напиши тире. Додай caption, заголовки стовпців і рядків.',
    text: 'Складність наших завдань\nЗавдання | Легке | Середнє | Складне\nЛабіринт | Так | — | —\nШифр | — | Так | —\nМаршрут | — | — | Так',
    checklist: [
      'caption має текст «Складність наших завдань». Є thead і tbody; у кожному рядку чотири клітинки.',
      'Заголовки стовпців — th із scope="col"; назви завдань — th із scope="row".',
      'Три клітинки з текстом «Так» мають клас choice та фон #fde68a. Значення зрозуміле без кольору.',
      'table має width: 100% і border-collapse: collapse; th та td — border: 2px solid #64748b, padding: 10px і text-align: center.',
      'caption: 24px, bold, #0f766e; заголовки мають фон #e0f2fe. body використовує Arial/sans-serif і темний текст.',
    ],
    hint: 'Рядок tr містить клітинки th або td. Текст назви завдання не записуй прямо всередині tr. Один заголовок рядка й три значення утворюють чотири стовпці.',
    reference: htmlDocument(
      'Складність завдань',
      `<div class="table-scroll"><table>
  <caption>Складність наших завдань</caption>
  <thead><tr><th scope="col">Завдання</th><th scope="col">Легке</th><th scope="col">Середнє</th><th scope="col">Складне</th></tr></thead>
  <tbody>
    <tr><th scope="row">Лабіринт</th><td class="choice">Так</td><td>—</td><td>—</td></tr>
    <tr><th scope="row">Шифр</th><td>—</td><td class="choice">Так</td><td>—</td></tr>
    <tr><th scope="row">Маршрут</th><td>—</td><td>—</td><td class="choice">Так</td></tr>
  </tbody>
</table></div>`,
      baseCss + '\n    .choice { background-color: #fde68a; }',
    ),
  },
  {
    id: 'tables-stickers',
    title: 'Каталог наліпок',
    brief:
      'Створи таблицю «Наліпки для блокнота» з п’ятьма стовпцями та трьома рядками даних. Додай малюнки flower.svg, leaf.svg і bird.svg. Задай кожному рядку змістовний клас і власний світлий фон. У клітинці «Назва» зроби назву наліпки заголовком рядка.',
    text: 'Наліпки для блокнота\n№ | Назва | Серія | Ціна, жетонів | Малюнок\n1 | Квітка | Рослини | 2 | flower.svg\n2 | Листок | Рослини | 3 | leaf.svg\n3 | Птах | Тварини | 4 | bird.svg',
    checklist: [
      'Є caption, п’ять заголовків стовпців у thead та три рядки в tbody.',
      'Назви наліпок — th scope="row"; решта значень — td. Картинки мають описові alt.',
      'Класи flower-row, leaf-row, bird-row задають фони #fff1f2, #ecfdf5, #eff6ff відповідно.',
      'th має фон #e0f2fe. Клітинки рядків отримують колір рядка; для tbody th задай background-color: transparent.',
      'img: width: 64px, height: auto. Клітинки: рамка 2px solid #64748b, padding: 10px, текст по центру.',
      'Таблиця має width: 100%, border-collapse: collapse і контейнер table-scroll з overflow-x: auto.',
    ],
    hint: 'Клас рядка записуй у tr, щоб його фон охоплював усі клітинки. Не вставляй img прямо в tr: він має бути всередині td.',
    reference: htmlDocument(
      'Каталог наліпок',
      `<div class="table-scroll"><table>
  <caption>Наліпки для блокнота</caption>
  <thead><tr><th scope="col">№</th><th scope="col">Назва</th><th scope="col">Серія</th><th scope="col">Ціна, жетонів</th><th scope="col">Малюнок</th></tr></thead>
  <tbody>
    <tr class="flower-row"><td>1</td><th scope="row">Квітка</th><td>Рослини</td><td>2</td><td><img src="flower.svg" alt="Наліпка з квіткою"></td></tr>
    <tr class="leaf-row"><td>2</td><th scope="row">Листок</th><td>Рослини</td><td>3</td><td><img src="leaf.svg" alt="Наліпка із зеленим листком"></td></tr>
    <tr class="bird-row"><td>3</td><th scope="row">Птах</th><td>Тварини</td><td>4</td><td><img src="bird.svg" alt="Наліпка з птахом на гілці"></td></tr>
  </tbody>
</table></div>`,
      baseCss +
        '\n    tbody th { background-color: transparent; }\n    .flower-row { background-color: #fff1f2; }\n    .leaf-row { background-color: #ecfdf5; }\n    .bird-row { background-color: #eff6ff; }',
    ),
  },
  {
    id: 'tables-island-atlas',
    title: 'Домашня робота: атлас вигаданого острова',
    brief:
      'Створи атлас із шістьма стовпцями та сімома рядками даних. Усі місця вигадані. Додай місце, район, тип, ілюстрацію та короткий опис. Розташуй широку таблицю всередині контейнера з горизонтальною прокруткою. Чергуй два світлі фони через класи рядків.',
    text: 'Атлас острова Ідей\n№ | Місце | Район | Тип | Ілюстрація | Опис\n1 | Сад кольорів | Схід | Сад | flower.svg | Тут команда вигадує палітри.\n2 | Листяна стежка | Захід | Стежка | leaf.svg | Стежка веде до майстерні.\n3 | Пташина вежа | Північ | Вежа | bird.svg | На вежі зберігають карти.\n4 | Кроляча галявина | Південь | Галявина | rabbit.svg | Тут малюють плани пригод.\n5 | Квітковий міст | Схід | Міст | flower.svg | Міст сполучає два береги.\n6 | Зелена брама | Захід | Брама | leaf.svg | Звідси починається маршрут.\n7 | Пташиний причал | Північ | Причал | bird.svg | Тут зустрічається команда.',
    checklist: [
      'Є caption «Атлас острова Ідей», шість заголовків стовпців та сім рядків із шістьма клітинками.',
      'Назви місць записано в th scope="row"; заголовки стовпців мають scope="col".',
      'Непарні рядки мають клас warm-row і фон #fef3c7; парні — cool-row і фон #e0f2fe.',
      'table: width: 100%, min-width: 660px, border-collapse: collapse. th та td: рамка 1px solid #64748b і padding: 8px.',
      'table-scroll: max-width: 100%, overflow-x: auto. Прокручується контейнер, а не вся сторінка.',
      'Ілюстрації: width: 64px, height: auto, доречні alt. Готовий HTML збережено та перевірено офлайн.',
    ],
    hint: 'min-width зберігає читабельну ширину таблиці. overflow-x: auto на зовнішньому div дає доступ до правих стовпців у вузькому вікні.',
    referenceHeight: 600,
    reference: htmlDocument(
      'Атлас острова Ідей',
      `<div class="table-scroll"><table>
  <caption>Атлас острова Ідей</caption>
  <thead><tr><th scope="col">№</th><th scope="col">Місце</th><th scope="col">Район</th><th scope="col">Тип</th><th scope="col">Ілюстрація</th><th scope="col">Опис</th></tr></thead>
  <tbody>
    <tr class="warm-row"><td>1</td><th scope="row">Сад кольорів</th><td>Схід</td><td>Сад</td><td><img src="flower.svg" alt="Квітка — знак саду"></td><td>Тут команда вигадує палітри.</td></tr>
    <tr class="cool-row"><td>2</td><th scope="row">Листяна стежка</th><td>Захід</td><td>Стежка</td><td><img src="leaf.svg" alt="Листок — знак стежки"></td><td>Стежка веде до майстерні.</td></tr>
    <tr class="warm-row"><td>3</td><th scope="row">Пташина вежа</th><td>Північ</td><td>Вежа</td><td><img src="bird.svg" alt="Птах — знак вежі"></td><td>На вежі зберігають карти.</td></tr>
    <tr class="cool-row"><td>4</td><th scope="row">Кроляча галявина</th><td>Південь</td><td>Галявина</td><td><img src="rabbit.svg" alt="Кролик — знак галявини"></td><td>Тут малюють плани пригод.</td></tr>
    <tr class="warm-row"><td>5</td><th scope="row">Квітковий міст</th><td>Схід</td><td>Міст</td><td><img src="flower.svg" alt="Квітка — знак мосту"></td><td>Міст сполучає два береги.</td></tr>
    <tr class="cool-row"><td>6</td><th scope="row">Зелена брама</th><td>Захід</td><td>Брама</td><td><img src="leaf.svg" alt="Листок — знак брами"></td><td>Звідси починається маршрут.</td></tr>
    <tr class="warm-row"><td>7</td><th scope="row">Пташиний причал</th><td>Північ</td><td>Причал</td><td><img src="bird.svg" alt="Птах — знак причалу"></td><td>Тут зустрічається команда.</td></tr>
  </tbody>
</table></div>`,
      baseCss +
        '\n    table { min-width: 660px; font-size: 14px; }\n    th, td { border-width: 1px; padding: 8px; }\n    tbody th { background-color: transparent; }\n    .warm-row { background-color: #fef3c7; }\n    .cool-row { background-color: #e0f2fe; }',
    ),
  },
];

export const tablesStarter = htmlDocument(
  'Моя таблиця',
  '  <!-- Додай caption, заголовки та рядки таблиці. -->',
  '    /* Додай рамки, фони й відступи. */',
);
