import { htmlDocument, type WebTask } from './tasks';

export const listsTasks: WebTask[] = [
  {
    id: 'lists-island',
    title: 'Мешканці острова',
    brief:
      'Створи довідник із h1 та двома розділами h2. Під «Мирні мешканці» додай ul із трьома пунктами та різними маркерами через класи. Під «Маршрут знайомства» додай ol із п’ятьма послідовними кроками.',
    text: 'Мешканці острова\nМирні мешканці\nЛісовий олень\nРічкова видра\nГірська коза\nМаршрут знайомства\nВідвідай ліс\nЗнайди річку\nПіднімися до стежки\nСпостерігай здалеку\nЗапиши враження',
    checklist: [
      'Є один h1, два h2, один ul та один ol.',
      'Три пункти ul мають класи round, hollow, square.',
      'Класи задають list-style-type: disc, circle, square відповідно.',
      'П’ять пунктів ol мають звичайну нумерацію через list-style-type: decimal.',
      'Заголовки стоять перед списками; усі пункти записано через li.',
    ],
    hint: 'Селектор .hollow може діяти безпосередньо на li. Не додавай назву розділу всередину ul перед першим li.',
    reference: htmlDocument(
      'Мешканці острова',
      '<h1>Мешканці острова</h1>\n<h2>Мирні мешканці</h2>\n<ul>\n  <li class="round">Лісовий олень</li>\n  <li class="hollow">Річкова видра</li>\n  <li class="square">Гірська коза</li>\n</ul>\n<h2>Маршрут знайомства</h2>\n<ol>\n  <li>Відвідай ліс</li>\n  <li>Знайди річку</li>\n  <li>Піднімися до стежки</li>\n  <li>Спостерігай здалеку</li>\n  <li>Запиши враження</li>\n</ol>',
      '    .round { list-style-type: disc; }\n    .hollow { list-style-type: circle; }\n    .square { list-style-type: square; }\n    ol { list-style-type: decimal; }',
    ),
  },
  {
    id: 'lists-regions',
    title: 'Теплі й холодні краї',
    brief:
      'Створи два розділи з різними фонами та списками. Розділи їх тематичною лінією hr. Використай класи warm і cold для заголовків та відповідних списків.',
    text: 'Краї вигаданого світу\nТеплі краї\nПіщана затока\nСонячна долина\nБурштинові пагорби\nКактусовий гай\nХолодні краї\nСніжний перевал\nКрижане озеро\nПівнічний ліс\nТуманний берег',
    checklist: [
      'body має background-color: #ecfdf5.',
      'h1: darkgreen, фон #dcfce7, Verdana/sans-serif, 32px, text-align: center.',
      'h2: Georgia/serif, 28px.',
      'warm: color: #9a3412 та background-color: #fff0d9; cold: color: #1d4ed8 та background-color: #e0f0ff.',
      'Теплий ol: upper-alpha; холодний ul: circle. Обидва списки мають font-size: 22px.',
      'Між розділами є hr: border: 0, height: 4px, width: 70%, background-color: green.',
    ],
    hint: 'Додай class="warm" і до першого h2, і до ol. Для другого розділу застосуй cold. Властивість border: 0 прибирає стандартну рамку hr.',
    referenceHeight: 600,
    reference: htmlDocument(
      'Краї вигаданого світу',
      '<h1>Краї вигаданого світу</h1>\n<h2 class="warm">Теплі краї</h2>\n<ol class="warm">\n  <li>Піщана затока</li>\n  <li>Сонячна долина</li>\n  <li>Бурштинові пагорби</li>\n  <li>Кактусовий гай</li>\n</ol>\n<hr>\n<h2 class="cold">Холодні краї</h2>\n<ul class="cold">\n  <li>Сніжний перевал</li>\n  <li>Крижане озеро</li>\n  <li>Північний ліс</li>\n  <li>Туманний берег</li>\n</ul>',
      '    body { background-color: #ecfdf5; }\n    h1 { color: darkgreen; background-color: #dcfce7; font-family: Verdana, sans-serif; font-size: 32px; text-align: center; }\n    h2 { font-family: Georgia, serif; font-size: 28px; }\n    .warm { color: #9a3412; background-color: #fff0d9; }\n    .cold { color: #1d4ed8; background-color: #e0f0ff; }\n    ol { list-style-type: upper-alpha; font-size: 22px; }\n    ul { list-style-type: circle; font-size: 22px; }\n    hr { border: 0; height: 4px; width: 70%; background-color: green; }',
    ),
  },
  {
    id: 'lists-nested',
    title: 'Каталог пригод',
    brief:
      'Створи зовнішній ul із трьома пунктами-категоріями. Усередині кожного li додай назву через b та вкладений ul із трьома іграми. Оформи категорії різними світлими фонами й маркерами.',
    text: 'Каталог пригод\nКомандні ігри\nОстрів маяків\nМісто винахідників\nРятувальники лісу\nЛогічні ігри\nТаємниця карти\nМайстер шифрів\nЛабіринт ідей\nТворчі ігри\nАрхітектор хмар\nМайстерня історій\nСад кольорів',
    checklist: [
      'Зовнішній ul має клас catalog і три li. Для списку без маркерів додано role="list".',
      'catalog: list-style-type: none, width: 400px, max-width: 100%, box-sizing: border-box, padding: 16px, фон #e2e8f0.',
      'Кожен вкладений ul стоїть усередині свого li, після назви категорії.',
      'Вкладені списки: width: 300px, max-width: 100%, box-sizing: border-box, padding: 8px 8px 8px 28px.',
      'Класи team, puzzle, creative задають відповідно disc/#dbeafe, circle/#dcfce7, square/#fef3c7.',
      'body: фон #f0fdfa, колір тексту #0f172a. Списки ростуть за вмістом без фіксованої height.',
    ],
    hint: 'Зовнішній список об’єднує категорії. Не закривай його li до завершення вкладеного ul. role="list" допомагає зберегти оголошення списку без маркерів у допоміжних програмах.',
    reference: htmlDocument(
      'Каталог пригод',
      '<h1>Каталог пригод</h1>\n<ul class="catalog" role="list">\n  <li><b>Командні ігри</b>\n    <ul class="team">\n      <li>Острів маяків</li>\n      <li>Місто винахідників</li>\n      <li>Рятувальники лісу</li>\n    </ul>\n  </li>\n  <li><b>Логічні ігри</b>\n    <ul class="puzzle">\n      <li>Таємниця карти</li>\n      <li>Майстер шифрів</li>\n      <li>Лабіринт ідей</li>\n    </ul>\n  </li>\n  <li><b>Творчі ігри</b>\n    <ul class="creative">\n      <li>Архітектор хмар</li>\n      <li>Майстерня історій</li>\n      <li>Сад кольорів</li>\n    </ul>\n  </li>\n</ul>',
      '    body { background-color: #f0fdfa; color: #0f172a; }\n    .catalog { list-style-type: none; width: 400px; max-width: 100%; box-sizing: border-box; padding: 16px; background-color: #e2e8f0; }\n    .team, .puzzle, .creative { width: 300px; max-width: 100%; box-sizing: border-box; padding: 8px 8px 8px 28px; }\n    .team { list-style-type: disc; background-color: #dbeafe; }\n    .puzzle { list-style-type: circle; background-color: #dcfce7; }\n    .creative { list-style-type: square; background-color: #fef3c7; }',
    ),
  },
  {
    id: 'lists-homework',
    title: 'Домашня робота: план експедиції',
    brief:
      'Створи сторінку експедиції з h1, двома h2 та двома списками. Покажи три послідовні кроки через ol і три потрібні речі через ul. Розділи теми лінією hr. Можеш придумати власний маршрут.',
    text: 'Експедиція до маяка\nПлан подорожі\nПеревір карту\nДійди до оглядового майданчика\nЗапиши спостереження\nЩо взяти\nКарта\nВода\nБлокнот',
    checklist: [
      'Є h1, два h2, ol із трьома li та ul із трьома li.',
      'Клас route задає list-style-type: upper-roman.',
      'Клас supplies задає list-style-type: square і фон rgb(224, 242, 254).',
      'supplies має width: 320px, max-width: 100%, box-sizing: border-box і padding: 12px 12px 12px 32px.',
      'hr: border: 0, height: 3px, width: 80%, background-color: #0369a1.',
      'Основний текст темний, фони світлі; height не обмежує текст списків.',
      'Готовий index.html збережено й перевірено у браузері.',
    ],
    hint: 'rgb(224, 242, 254) і #e0f2fe задають один колір. Перевір вузьке вікно: max-width: 100% обмежує ширину списку.',
    reference: htmlDocument(
      'План експедиції',
      '<h1>Експедиція до маяка</h1>\n<h2>План подорожі</h2>\n<ol class="route">\n  <li>Перевір карту</li>\n  <li>Дійди до оглядового майданчика</li>\n  <li>Запиши спостереження</li>\n</ol>\n<hr>\n<h2>Що взяти</h2>\n<ul class="supplies">\n  <li>Карта</li>\n  <li>Вода</li>\n  <li>Блокнот</li>\n</ul>',
      '    body { color: #0f172a; background-color: white; }\n    .route { list-style-type: upper-roman; }\n    .supplies { list-style-type: square; background-color: rgb(224, 242, 254); width: 320px; max-width: 100%; box-sizing: border-box; padding: 12px 12px 12px 32px; }\n    hr { border: 0; height: 3px; width: 80%; background-color: #0369a1; }',
    ),
  },
];

export const listsStarter = htmlDocument(
  'Списки та лінії',
  '  <!-- Додай заголовки, списки та тематичну лінію. -->',
  '    /* Додай оформлення списків і фонів. */',
);
