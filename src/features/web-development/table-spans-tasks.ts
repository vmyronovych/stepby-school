import { htmlDocument, type WebTask } from './tasks';

const baseCss = `    body { background-color: #f8fafc; color: #0f172a; font-family: Arial, sans-serif; }
    .table-scroll { max-width: 100%; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    caption { font-size: 24px; font-weight: bold; color: #9a3412; padding: 12px; }
    th, td { border: 2px solid #64748b; padding: 10px; text-align: center; }
    th { background-color: #ffedd5; }
    img { width: 90px; height: auto; border-radius: 10px; }`;

export const tableSpansTasks: WebTask[] = [
  {
    id: 'table-spans-budget',
    title: 'Кошторис майстерні',
    brief:
      'Створи таблицю з трьома стовпцями: Матеріал, Кількість, Вартість, грн. Додай три рядки даних і підсумок у tfoot. У підсумковому рядку th «Разом» має займати перші два стовпці через colspan="2". Третя клітинка показує 180 грн.',
    text: 'Кошторис майстерні\nМатеріал | Кількість | Вартість, грн\nБлокноти | 3 | 90\nОлівці | 6 | 60\nНаліпки | 10 | 30\nРазом | 180 грн',
    checklist: [
      'Є caption, thead, tbody з трьома рядками й tfoot із підсумком.',
      'Перший рядок має три th scope="col"; назви матеріалів — th scope="row".',
      'th «Разом» має colspan="2" і scope="row". Поруч стоїть один td із 180 грн.',
      'Підсумковий рядок займає три позиції: дві для th, одну для td. Додаткової порожньої клітинки немає.',
      'table має width: 100% і border-collapse: collapse. th, td: рамка 2px solid #64748b, padding: 10px, текст по центру.',
      'caption: 24px, bold, #9a3412; заголовки мають фон #ffedd5. tfoot має font-weight: bold.',
    ],
    hint: 'Об’єднана клітинка замінює дві звичайні. У tfoot запиши лише th colspan="2" та один td. Сума: 90 + 60 + 30 = 180.',
    reference: htmlDocument(
      'Кошторис майстерні',
      `<div class="table-scroll"><table>
  <caption>Кошторис майстерні</caption>
  <thead><tr><th scope="col">Матеріал</th><th scope="col">Кількість</th><th scope="col">Вартість, грн</th></tr></thead>
  <tbody>
    <tr><th scope="row">Блокноти</th><td>3</td><td>90</td></tr>
    <tr><th scope="row">Олівці</th><td>6</td><td>60</td></tr>
    <tr><th scope="row">Наліпки</th><td>10</td><td>30</td></tr>
  </tbody>
  <tfoot><tr><th colspan="2" scope="row">Разом</th><td>180 грн</td></tr></tfoot>
</table></div>`,
      baseCss + '\n    tfoot { font-weight: bold; }',
    ),
  },
  {
    id: 'table-spans-collection',
    title: 'Згрупована колекція',
    brief:
      'Створи таблицю «Малюнки для колекції» з трьома стовпцями: Група, Назва, Малюнок. Рослини й тварини мають по два рядки. Назва кожної групи — th із rowspan="2" і scope="rowgroup". Для кожної групи використай окремий tbody. Залиш проміжки між клітинками через CSS.',
    text: 'Малюнки для колекції\nГрупа | Назва | Малюнок\nРослини | Квітка | flower.svg\nРослини | Листок | leaf.svg\nТварини | Кролик | rabbit.svg\nТварини | Птах | bird.svg',
    checklist: [
      'Є caption, три заголовки scope="col" і два окремі tbody по два рядки.',
      'th «Рослини» і «Тварини» мають rowspan="2" та scope="rowgroup".',
      'У першому рядку групи три клітинки. У другому — лише дві, бо перша позиція вже зайнята rowspan.',
      'Назви малюнків мають th scope="row", клас item-name і background-color: transparent. Кожен img має власний alt, width: 90px, height: auto, border-radius: 10px.',
      'table: border-collapse: separate, border-spacing: 8px; th, td: padding: 10px і рамка 2px solid #64748b.',
      'Рослини мають фон #ecfdf5, тварини — #eff6ff. Заголовки груп зберігають фон #ffedd5.',
    ],
    hint: 'scope="rowgroup" пов’язує назву групи з її tbody. Не повторюй клітинку назви у другому рядку. border-spacing працює при border-collapse: separate.',
    referenceHeight: 540,
    reference: htmlDocument(
      'Малюнки для колекції',
      `<div class="table-scroll"><table>
  <caption>Малюнки для колекції</caption>
  <thead><tr><th scope="col">Група</th><th scope="col">Назва</th><th scope="col">Малюнок</th></tr></thead>
  <tbody class="plants">
    <tr><th rowspan="2" scope="rowgroup">Рослини</th><th class="item-name" scope="row">Квітка</th><td><img src="flower.svg" alt="Малюнок квітки"></td></tr>
    <tr><th class="item-name" scope="row">Листок</th><td><img src="leaf.svg" alt="Малюнок зеленого листка"></td></tr>
  </tbody>
  <tbody class="animals">
    <tr><th rowspan="2" scope="rowgroup">Тварини</th><th class="item-name" scope="row">Кролик</th><td><img src="rabbit.svg" alt="Малюнок кролика"></td></tr>
    <tr><th class="item-name" scope="row">Птах</th><td><img src="bird.svg" alt="Малюнок птаха"></td></tr>
  </tbody>
</table></div>`,
      baseCss +
        '\n    table { border-collapse: separate; border-spacing: 8px; }\n    .plants { background-color: #ecfdf5; }\n    .animals { background-color: #eff6ff; }\n    .item-name { background-color: transparent; }',
    ),
  },
  {
    id: 'table-spans-team-plan',
    title: 'Домашня робота: розклад команди',
    brief:
      'Поєднай rowspan і colspan у таблиці «Розклад творчої команди». У ній чотири стовпці: День, Справа, Тривалість, хв, Знак дня. Для кожного дня створи tbody з двома справами. Назва дня й ілюстрація займають по два рядки. У tfoot об’єднай перші два стовпці для слова «Разом».',
    text: 'Розклад творчої команди\nДень | Справа | Тривалість, хв | Знак дня\nВівторок | Малюємо карту | 20 | leaf.svg\nВівторок | Готуємо підказки | 30 | leaf.svg\nЧетвер | Створюємо наліпки | 25 | flower.svg\nЧетвер | Перевіряємо маршрут | 35 | flower.svg\nРазом | 110 | 4 справи',
    checklist: [
      'Є caption та чотири th scope="col" у thead. Два tbody відповідають двом дням.',
      'Назва кожного дня — th rowspan="2" scope="rowgroup"; назви справ — th scope="row".',
      'Клітинка з малюнком у першому рядку кожного дня має rowspan="2". Другий рядок має лише справу й тривалість.',
      'tfoot містить th colspan="2" scope="row" з текстом «Разом», td із 110 і td із «4 справи».',
      '20 + 30 + 25 + 35 = 110 хв. У кожному рядку враховано чотири позиції без накладань.',
      'table має min-width: 600px, width: 100%, border-collapse: collapse; контейнер table-scroll — max-width: 100% і overflow-x: auto.',
      'Рамки клітинок: 2px solid #64748b; padding: 10px. Ілюстрації: width: 90px, height: auto, доречний alt.',
      'Готовий HTML збережено й перевірено офлайн. У вузькому вікні прокручується лише контейнер таблиці.',
    ],
    hint: 'Порахуй позиції в кожному рядку. У другому рядку дня перший і четвертий стовпці вже зайняті клітинками зверху. Підсумок не входить до rowspan: він стоїть в окремому tfoot.',
    referenceHeight: 420,
    reference: htmlDocument(
      'Розклад творчої команди',
      `<div class="table-scroll"><table>
  <caption>Розклад творчої команди</caption>
  <thead><tr><th scope="col">День</th><th scope="col">Справа</th><th scope="col">Тривалість, хв</th><th scope="col">Знак дня</th></tr></thead>
  <tbody>
    <tr><th rowspan="2" scope="rowgroup">Вівторок</th><th scope="row">Малюємо карту</th><td>20</td><td rowspan="2"><img src="leaf.svg" alt="Листок — знак вівторка"></td></tr>
    <tr><th scope="row">Готуємо підказки</th><td>30</td></tr>
  </tbody>
  <tbody>
    <tr><th rowspan="2" scope="rowgroup">Четвер</th><th scope="row">Створюємо наліпки</th><td>25</td><td rowspan="2"><img src="flower.svg" alt="Квітка — знак четверга"></td></tr>
    <tr><th scope="row">Перевіряємо маршрут</th><td>35</td></tr>
  </tbody>
  <tfoot><tr><th colspan="2" scope="row">Разом</th><td>110</td><td>4 справи</td></tr></tfoot>
</table></div>`,
      baseCss +
        '\n    table { min-width: 600px; }\n    tfoot { font-weight: bold; background-color: #ecfdf5; }',
    ),
  },
];

export const tableSpansStarter = htmlDocument(
  'Об’єднання клітинок',
  '  <!-- Спочатку сплануй сітку, потім додай таблицю. -->',
  '    /* Додай рамки, проміжки й фони. */',
);
