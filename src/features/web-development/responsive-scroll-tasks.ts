import { htmlDocument, type WebTask } from './tasks';

const baseCss = `    body { margin: 0; padding: 16px; font-family: Arial, sans-serif; color: #164e63; background-color: #ecfeff; }
    h1 { font-size: 28px; text-align: center; }
    h2 { font-size: 21px; }
    .panel { box-sizing: border-box; max-width: 680px; margin: 20px auto; padding: 16px; border: 2px solid #0e7490; border-radius: 12px; background-color: white; }
    .scroll-box { max-height: 160px; overflow: auto; padding: 12px; border: 2px solid #64748b; scrollbar-color: #0e7490 #e2e8f0; scrollbar-width: auto; }
    .scroll-box:focus { outline: 3px solid #d97706; outline-offset: 3px; }
    .scroll-box p { line-height: 1.6; }
    .scroll-box::-webkit-scrollbar { width: 14px; }
    .scroll-box::-webkit-scrollbar-track { background-color: #e2e8f0; }
    .scroll-box::-webkit-scrollbar-thumb { background-color: #0e7490; border-radius: 7px; }`;

const journalText =
  'Сад — порівнюємо три форми листків і малюємо їхні контури.\nВежа — помічаємо деталі на вигаданій мапі й створюємо знак команди.\nГалявина — пишемо два речення про початок пригоди.\nМайстерня — додаємо до мапи власну станцію та пояснюємо її назву.\nБібліотека — читаємо всі записи й обираємо ідею для наступної зустрічі.';
const journalBody = `<p>Сад — порівнюємо три форми листків і малюємо їхні контури.</p>
<p>Вежа — помічаємо деталі на вигаданій мапі й створюємо знак команди.</p>
<p>Галявина — пишемо два речення про початок пригоди.</p>
<p>Майстерня — додаємо до мапи власну станцію та пояснюємо її назву.</p>
<p>Бібліотека — читаємо всі записи й обираємо ідею для наступної зустрічі.</p>`;

export const responsiveScrollTasks: WebTask[] = [
  {
    id: 'responsive-window-modes',
    title: 'Індикатор ширини вікна',
    brief:
      'Створи панель із трьома підписаними кругами: Компактно, Просторо, Широко. Підсвічуй лише той круг, який відповідає ширині вікна. За ширини менше ніж 600px діє компактний режим, від 600px — просторий, від 1000px — широкий. Текст під панеллю теж змінюється. Це індикатор ширини, а не справжній світлофор.',
    text: 'Режими вікна\nКомпактно\nПросторо\nШироко\nКомпактний режим: менше ніж 600px.\nПросторий режим: від 600px до менш ніж 1000px.\nШирокий режим: від 1000px.',
    checklist: [
      'Є один h1 і panel з трьома div.mode. Кожен містить span.dot і видимий текст.',
      'modes: display flex, flex-direction column, align-items center, gap 16px. Круги мають 64×64px і border-radius 50%.',
      'Початково всі dot сірі; .compact .dot має фон #0369a1. Опис compact-text видимий, інші два приховані.',
      '@media (min-width: 600px) робить modes рядком і вмикає лише medium із фоном #0f766e та medium-text.',
      '@media (min-width: 1000px) записано пізніше. Воно вмикає лише wide із фоном #7c3aed та wide-text.',
      'Кожен медіазапит скасовує попередню підсвітку й показ попереднього опису. У будь-якій ширині видимий один опис.',
      'Перевірено 390, 599, 600, 720, 999, 1000 і 1024px. Підписи дозволяють зрозуміти режим без розрізнення кольорів.',
    ],
    hint: 'Базові стилі описують вузьке вікно. Потім ширші min-width поступово змінюють оформлення. У вбудованому редакторі вимірюється ширина рамки результату, а не всього монітора.',
    referenceHeight: 460,
    reference: htmlDocument(
      'Режими вікна',
      `<h1>Режими вікна</h1>
<div class="panel"><div class="modes">
  <div class="mode compact"><span class="dot"></span><p>Компактно</p></div>
  <div class="mode medium"><span class="dot"></span><p>Просторо</p></div>
  <div class="mode wide"><span class="dot"></span><p>Широко</p></div>
</div>
<p class="compact-text">Компактний режим: менше ніж 600px.</p>
<p class="medium-text">Просторий режим: від 600px до менш ніж 1000px.</p>
<p class="wide-text">Широкий режим: від 1000px.</p></div>`,
      baseCss +
        `
    .modes { display: flex; flex-direction: column; align-items: center; gap: 16px; }
    .mode { text-align: center; }
    .dot { display: block; width: 64px; height: 64px; margin: 0 auto; border-radius: 50%; background-color: #cbd5e1; }
    .compact .dot { background-color: #0369a1; }
    .medium-text, .wide-text { display: none; }
    @media (min-width: 600px) {
      .modes { flex-direction: row; justify-content: center; }
      .compact .dot { background-color: #cbd5e1; }
      .medium .dot { background-color: #0f766e; }
      .compact-text { display: none; }
      .medium-text { display: block; }
    }
    @media (min-width: 1000px) {
      .medium .dot { background-color: #cbd5e1; }
      .wide .dot { background-color: #7c3aed; }
      .medium-text { display: none; }
      .wide-text { display: block; }
    }`,
    ),
  },
  {
    id: 'responsive-scroll-journal',
    title: 'Журнал із прокруткою',
    brief:
      'Створи журнал п’яти станцій у панелі. Обмеж висоту самого журналу до 160px і додай overflow: auto. Дай області tabindex="0", role="region" та зрозумілий aria-label. Користувач повинен прочитати всі записи мишею, дотиком або клавіатурою.',
    text:
      'Журнал експедиції\nПерейди до журналу клавішею Tab. Прокручуй стрілками або Page Down.\n' +
      journalText +
      '\nУсі п’ять записів залишаються в HTML. Прокрутка відкриває нижню частину журналу.',
    checklist: [
      'Є h1, коротка інструкція і panel із h2 «П’ять станцій».',
      'У div.scroll-box збережено всі п’ять абзаців без скорочення тексту.',
      'scroll-box має max-height: 160px, overflow: auto, padding: 12px, border: 2px solid #64748b.',
      'Область має tabindex="0", role="region", aria-label="Журнал п’яти станцій" та видимий outline при focus.',
      'Задано scrollbar-color: #0e7490 #e2e8f0 та scrollbar-width: auto. Смуга може виглядати інакше залежно від браузера.',
      'Необов’язкові webkit-правила застосовано до .scroll-box::-webkit-scrollbar без пробілу перед ::.',
      'Tab і клавіші прокрутки дозволяють дістатися останнього запису. Наступний Tab виводить фокус із області.',
      'Під журналом є видимий підсумок. Немає overflow: hidden на body та обрізаного тексту без способу прочитати його.',
    ],
    hint: 'Max-height дозволяє короткому журналу бути нижчим. Overflow: auto створює прокручування лише за потреби. Tabindex=0 додає область у звичайний порядок клавіші Tab.',
    referenceHeight: 540,
    reference: htmlDocument(
      'Журнал експедиції',
      `<h1>Журнал експедиції</h1>
<p>Перейди до журналу клавішею Tab. Прокручуй стрілками або Page Down.</p>
<div class="panel"><h2>П’ять станцій</h2>
<div class="scroll-box" tabindex="0" role="region" aria-label="Журнал п’яти станцій">${journalBody}</div>
<p>Усі п’ять записів залишаються в HTML. Прокрутка відкриває нижню частину журналу.</p></div>`,
      baseCss,
    ),
  },
  {
    id: 'responsive-expedition-board',
    title: 'Домашня робота: адаптивна дошка',
    brief:
      'Побудуй дошку з двох карток: план і журнал. До 600px вони стоять стовпцем, від 600px — поруч із рівною шириною. Від 1000px збільш проміжок між ними. Застосуй ще один медіазапит із min-width та max-width до рамки дошки. Збережи HTML і перевір різні ширини; публікація є окремою необов’язковою дією.',
    text:
      'Дошка експедиції\nПлан зустрічі\nОбираємо станцію.\nГотуємо матеріали.\nЗаписуємо враження.\nЖурнал станцій\n' +
      journalText +
      '\nФайли готові для локального перегляду. Публікацію погоджуємо окремо.',
    checklist: [
      'Є h1 та div.board із двома div.card. У першій h2 і ol із трьох кроків; у другій h2 та журнал із п’яти абзаців.',
      'board: display flex, flex-direction column, gap 12px, max-width 900px, margin 20px auto, padding 12px, border 3px solid #0e7490.',
      'card: box-sizing border-box, min-width 0, padding 16px, border 2px solid #64748b, білий фон. Заголовки мають 21px.',
      '@media (min-width: 600px) робить board рядком; card отримує flex: 1.',
      '@media (min-width: 600px) and (max-width: 900px) задає рамку board кольором #7c3aed. Поза цим діапазоном діє базовий колір.',
      '@media (min-width: 1000px) задає gap: 24px. Правила не приховують жодної картки.',
      'Журнал має tabindex="0", role="region", aria-label="Журнал дошки", max-height 160px, overflow auto й видимий фокус.',
      'Перевірено 390/720/1024px, межі 600 і 900px, прокрутку журналу, збереження HTML та повторне відкриття офлайн.',
    ],
    hint: 'Не фіксуй ширину картки в пікселях. Min-width: 0 дозволяє flex-елементу звузитися, а min/max у combined-запиті обмежують лише спеціальну рамку.',
    referenceHeight: 480,
    reference: htmlDocument(
      'Дошка експедиції',
      `<h1>Дошка експедиції</h1>
<div class="board">
  <div class="card"><h2>План зустрічі</h2><ol><li>Обираємо станцію.</li><li>Готуємо матеріали.</li><li>Записуємо враження.</li></ol></div>
  <div class="card"><h2>Журнал станцій</h2><div class="scroll-box" tabindex="0" role="region" aria-label="Журнал дошки">${journalBody}</div></div>
</div><p>Файли готові для локального перегляду. Публікацію погоджуємо окремо.</p>`,
      baseCss +
        `
    .board { display: flex; flex-direction: column; gap: 12px; max-width: 900px; margin: 20px auto; padding: 12px; border: 3px solid #0e7490; }
    .card { box-sizing: border-box; min-width: 0; padding: 16px; border: 2px solid #64748b; background-color: white; }
    @media (min-width: 600px) {
      .board { flex-direction: row; }
      .card { flex: 1; }
    }
    @media (min-width: 600px) and (max-width: 900px) {
      .board { border-color: #7c3aed; }
    }
    @media (min-width: 1000px) {
      .board { gap: 24px; }
    }`,
    ),
  },
];

export const responsiveScrollStarter = htmlDocument(
  'Адаптивна сторінка',
  '  <!-- Додай заголовок і потрібні блоки. -->',
  '    /* Почни з вузького вікна, потім додай медіазапити. */',
);
