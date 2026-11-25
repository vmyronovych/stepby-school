import { htmlDocument, type WebTask } from '../../shared/content/tasks';

const baseCss = `
  * { box-sizing: border-box; }
  body { margin: 0; padding: 16px; background: #eff6ff; color: #172554; font: 16px/1.5 system-ui, sans-serif; }
  header, main, footer { max-width: 760px; margin-inline: auto; }
  h1 { margin: 0 0 8px; font-size: 27px; line-height: 1.2; }
  h2 { font-size: 19px; }
  a { color: #1e40af; }
  :focus-visible { outline: 3px solid #b45309; outline-offset: 2px; }
`;

const storageCss = `
  .status { margin: 16px 0; padding: 8px 12px; border-left: 4px solid #1e40af; background: #dbeafe; }
  .bags { display: flex; align-items: flex-start; gap: 12px; }
  .bag { flex: 1; min-width: 0; border: 2px solid #93c5fd; border-radius: 12px; background: white; }
  .bag button { width: 100%; padding: 12px 8px; border: 0; border-radius: 10px; background: #1e3a8a; color: white; font: inherit; cursor: pointer; }
  .items { display: none; margin: 12px 8px; padding: 0; list-style: none; }
  .bag:hover > .items, .bag:focus-within > .items { display: flex; flex-wrap: wrap; gap: 8px; }
  .items li { flex: 1 1 75px; min-width: 0; }
  .items a { display: block; padding: 6px; border: 1px solid #bfdbfe; border-radius: 8px; }
  .items img { display: block; width: 42px; max-width: 100%; height: auto; }
  @media (max-width: 480px) { .bags { flex-direction: column; } .bag { width: 100%; } }
`;

const flightCss = `
  .scene { position: relative; height: 220px; border: 2px solid #93c5fd; border-radius: 16px; background: #172554; }
  .stop { position: absolute; padding: 4px 8px; border-radius: 8px; background: white; color: #172554; }
  .start { left: 8%; bottom: 8px; }
  .finish { right: 8%; bottom: 8px; }
  .probe { position: absolute; width: 54px; height: auto; left: 8%; top: 60%; animation: fly 6s ease-in-out infinite alternate; }
  @keyframes fly {
    0% { left: 8%; top: 60%; transform: rotate(-15deg); }
    50% { left: 40%; top: 15%; transform: rotate(12deg); }
    100% { left: 72%; top: 48%; transform: rotate(0deg); }
  }
  .pause { margin-bottom: 12px; }
  .pause:checked ~ .scene .probe { animation-play-state: paused; }
  @media (prefers-reduced-motion: reduce) { .scene .probe { animation: none; } }
`;

const flight = `
  <input class="pause" id="pause" type="checkbox">
  <label for="pause">Призупинити політ</label>
  <div class="scene">
    <span class="stop start">Старт</span>
    <span class="stop finish">Фініш</span>
    <img class="probe" src="comets.svg" alt="Позначка зонда">
  </div>
`;

export const review4Tasks: WebTask[] = [
  {
    id: 'review4-inventory',
    title: 'Спорядження експедиції',
    brief:
      'Створи три сумки з вкладеними списками спорядження. Під час наведення на сумку або фокуса всередині неї покажи її список. Додай видиме посилання до повного переліку. Вузьке вікно має показувати сумки стовпчиком.',
    text: 'Спорядження експедиції\nСтан підготовки: 6 предметів у 3 сумках.\nПольова — Листок, Квітка\nСигнальна — Комети, Хвилі\nАрхівна — Іскри, Пташка\nПовний перелік\nУсі позначки належать вигаданій експедиції.',
    hint: 'Кнопка та ul.items мають бути прямими дітьми .bag. Після Tab на кнопку наступний Tab переходить до першого посилання. Поруч із сумками залиш постійно видиме посилання на #all-items.',
    checklist: [
      'Є header з h1, main і footer.',
      'Кожна сумка містить підписану кнопку та власний ul.items із двома посиланнями.',
      'Картинка всередині посилання має порожній alt, бо поруч є назва предмета.',
      'Hover і focus-within відкривають список. Після виходу вказівника й фокуса список закривається.',
      'Tab переводить фокус на посилання у відкритому списку. Enter веде до відповідного предмета в повному переліку.',
      'При ширині до 480 px сумки розміщено стовпчиком. Повний перелік доступний при закритих списках.',
    ],
    referenceHeight: 580,
    referenceHover: '.bag:first-child > button',
    reference: htmlDocument(
      'Спорядження експедиції',
      `<header><h1>Спорядження експедиції</h1></header>
<main>
  <p class="status">Стан підготовки: 6 предметів у 3 сумках.</p>
  <nav aria-label="Сумки експедиції" class="bags">
    <div class="bag"><button type="button">Польова</button>
      <ul class="items">
        <li><a href="#leaf"><img src="leaf.svg" alt="">Листок</a></li>
        <li><a href="#flower"><img src="flower.svg" alt="">Квітка</a></li>
      </ul>
    </div>
    <div class="bag"><button type="button">Сигнальна</button>
      <ul class="items">
        <li><a href="#comets"><img src="comets.svg" alt="">Комети</a></li>
        <li><a href="#waves"><img src="waves.svg" alt="">Хвилі</a></li>
      </ul>
    </div>
    <div class="bag"><button type="button">Архівна</button>
      <ul class="items">
        <li><a href="#sparks"><img src="sparks.svg" alt="">Іскри</a></li>
        <li><a href="#bird"><img src="bird.svg" alt="">Пташка</a></li>
      </ul>
    </div>
  </nav>
  <p><a href="#all-items">Повний перелік</a></p>
  <section id="all-items"><h2>Повний перелік</h2>
    <ul><li id="leaf">Листок</li><li id="flower">Квітка</li><li id="comets">Комети</li><li id="waves">Хвилі</li><li id="sparks">Іскри</li><li id="bird">Пташка</li></ul>
  </section>
</main>
<footer><p>Усі позначки належать вигаданій експедиції.</p></footer>`,
      baseCss + storageCss,
    ),
  },
  {
    id: 'review4-flight',
    title: 'Політ зонда',
    brief:
      'Побудуй сцену з двома підписами та рухомою позначкою. Зонд має пройти три ключові точки за 6 секунд і повернутися тією самою траєкторією. Додай прапорець паузи. Збережи всю сцену у вузькому вікні.',
    text: 'Політ зонда\nПризупинити політ\nСтарт\nФініш\nЗонд піднімається, змінює нахил і повертається після фінішу.\nМаршрут навчальний.',
    hint: 'Задай сцені position: relative, зонду — position: absolute. У кожному кадрі вкажи left і top у відсотках. Прапорець має бути перед сценою і мати з нею спільного батька.',
    checklist: [
      'Є сцена заввишки 220 px. Її ширина підлаштовується під доступний простір.',
      'Зонд використовує comets.svg, має змістовний alt і ширину 54 px.',
      'Кадри 0%, 50%, 100% задають left 8%, 40%, 72% і top 60%, 15%, 48%.',
      'Зонд нахиляється на −15°, 12° і 0°. Рух триває 6 секунд і чергує напрямок.',
      'Клавішею Пробіл можна поставити позначку в прапорці, коли він у фокусі. Позначка ставить політ на паузу.',
      'Налаштування зменшеного руху вимикає політ. Зонд і підписи залишаються видимими.',
    ],
    referenceHeight: 430,
    referenceTimeMs: 3000,
    reference: htmlDocument(
      'Політ зонда',
      `<header><h1>Політ зонда</h1></header>
<main>
  ${flight}
  <p>Зонд піднімається, змінює нахил і повертається після фінішу.</p>
</main>
<footer><p>Маршрут навчальний.</p></footer>`,
      baseCss + flightCss,
    ),
  },
  {
    id: 'review4-station',
    title: 'Домашня робота: бортовий журнал',
    brief:
      'Створи сторінку спостережної станції. Додай навігацію до журналу й сигналу. Покажи журнал у фокусованій області прокрутки. Поруч розмісти аудіоплеєр і видимий опис сигналу. На вузькому екрані покажи розділи один під одним.',
    text: 'Бортовий журнал\nДо записів\nДо сигналу\nЗаписи експедиції\nПеред стартом команда перевірила карту.\nЗонд дістався першої позначки маршруту.\nПісля сигналу команда відкрила журнал.\nУсі матеріали збережено для наступного заняття.\nСигнал станції\nКороткий тональний сигнал без мовлення.\nНавчальна станція експедиції.',
    hint: 'Установи max-height та overflow: auto саме для журналу. Назви область через aria-label і додай tabindex="0". Для звуку використай audio controls, а текстовий опис залиш у видимому абзаці.',
    checklist: [
      'Є header з h1 і nav, один main з двома section та footer.',
      'Обидва посилання навігації ведуть до наявних id.',
      'Область записів має role="region", назву «Записи експедиції», tabindex="0", max-height: 150px та overflow: auto.',
      'Після Tab рамка області видима. PageDown прокручує записи всередині області.',
      'Сигнал signal.wav починає відтворюватися після натискання кнопки плеєра. Опис сигналу видно поруч.',
      'Початкова композиція має один стовпчик. Від 600 px блоки стоять поруч.',
      'HTML відкривається офлайн. У локальному редакторі signal.wav лежить поруч з index.html.',
    ],
    referenceHeight: 420,
    reference: htmlDocument(
      'Бортовий журнал',
      `<header><h1>Бортовий журнал</h1>
  <nav aria-label="Розділи журналу"><a href="#entries">До записів</a> · <a href="#signal">До сигналу</a></nav>
</header>
<main class="board">
  <section id="entries"><h2>Записи експедиції</h2>
    <div class="entries" role="region" aria-label="Записи експедиції" tabindex="0">
      <p>Перед стартом команда перевірила карту.</p>
      <p>Зонд дістався першої позначки маршруту.</p>
      <p>Після сигналу команда відкрила журнал.</p>
      <p>Усі матеріали збережено для наступного заняття.</p>
    </div>
  </section>
  <section id="signal"><h2>Сигнал станції</h2>
    <audio controls preload="metadata" src="signal.wav">Короткий тональний сигнал без мовлення.</audio>
    <p>Короткий тональний сигнал без мовлення.</p>
  </section>
</main>
<footer><p>Навчальна станція експедиції.</p></footer>`,
      baseCss +
        `
        .board { display: flex; flex-direction: column; gap: 14px; margin-top: 16px; }
        .board section { min-width: 0; padding: 12px; border: 2px solid #93c5fd; border-radius: 12px; background: white; }
        .board h2 { margin-top: 0; }
        .entries { max-height: 150px; overflow: auto; padding: 8px 12px; border: 1px solid #64748b; scrollbar-color: #1e40af #dbeafe; }
        audio { display: block; width: 100%; max-width: 320px; }
        @media (min-width: 600px) { .board { flex-direction: row; } .board section { flex: 1; } }
      `,
    ),
  },
];

export const review4Starter = htmlDocument(
  'Експедиція',
  '<!-- Додай розмітку обраної вправи. -->',
  '/* Додай стилі. */',
);
