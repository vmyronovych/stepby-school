import { htmlDocument, type WebTask } from '../../shared/content/tasks';

const baseCss = `    body { margin: 0; font-family: Arial, sans-serif; color: #164e63; background-color: #f0fdfa; }
    header, footer { padding: 16px; background-color: #ccfbf1; text-align: center; }
    h1 { margin: 0 0 12px; font-size: 28px; }
    h2 { font-size: 22px; }
    h3 { font-size: 18px; }
    nav { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; }
    a { color: #075985; }
    a:focus { outline: 3px solid #d97706; outline-offset: 3px; }
    main { max-width: 920px; margin: 0 auto; padding: 20px; }
    article, section { min-width: 0; }
    article { padding: 16px; border: 2px solid #0f766e; border-radius: 12px; background-color: white; }
    video { display: block; width: 320px; max-width: 100%; height: auto; margin: 12px auto; }
    audio { display: block; width: 100%; max-width: 320px; margin: 12px 0; }
    .description { padding: 10px; border-left: 3px solid #0f766e; background-color: #ecfeff; }
    footer p { margin: 4px 0; }`;

const videoMarkup = `<video controls preload="metadata" poster="leaf.svg">
  <source src="motion.webm" type="video/webm">
  <track src="motion.vtt" kind="captions" srclang="uk" label="Українська" default>
  Браузер не підтримує відеоплеєр. Прочитай опис під ним.
</video>`;

export const semanticMediaTasks: WebTask[] = [
  {
    id: 'semantic-media-club',
    title: 'Сторінка медіаклубу',
    brief:
      'Створи сторінку «Медіаклуб стежки». Використай header із h1 та nav, один main, два тематичні section з h2 і footer. У розділі «Показ руху» розмісти відео motion.webm з керуванням, постером leaf.svg і текстовою доріжкою motion.vtt. У розділі «Звуковий знак» додай audio signal.wav та видимий опис звуку. Не вмикай автоматичне відтворення.',
    text: 'Медіаклуб стежки\nПоказ руху\nЗвуковий знак\nПро сторінку\nЦе навчальна колекція власних медіафайлів.\nВідео: геометрична позначка рухається в межах кадру; мовлення немає.\nАудіо: короткий навчальний тональний сигнал без мовлення.\nСторінку підготувала вигадана команда «Стежка».',
    checklist: [
      'Є header, nav з aria-label="Розділи медіаклубу", один main і footer. У header лише один h1.',
      'Main містить section id="motion" та section id="sound" із власними h2. Посилання навігації ведуть до motion/sound/about.',
      'Video має controls, preload="metadata", poster="leaf.svg", source src="motion.webm" type="video/webm". Autoplay немає.',
      'Track має src="motion.vtt", kind="captions", srclang="uk", label="Українська" і default. Під плеєром є видимий текстовий опис.',
      'Audio має controls, preload="metadata", src="signal.wav". Під ним є видимий опис тонального сигналу.',
      'Video має width: 320px, max-width: 100%, height: auto. Audio має width: 100%, max-width: 320px.',
      'Footer має id="about" і називає вигадану команду. Немає рекламної кнопки без дії чи вигаданих відгуків.',
      'Код збережено як HTML. Відео, звук і доріжку завантажено для локального редактора; відтворення починається лише за дією користувача.',
    ],
    hint: 'Section об’єднує тему, а не будь-який прямокутник. Дай кожному розділу h2. Текст усередині video є запасним для браузера без підтримки тега; опис під плеєром читається завжди.',
    referenceHeight: 920,
    reference: htmlDocument(
      'Медіаклуб стежки',
      `<header><h1>Медіаклуб стежки</h1><nav aria-label="Розділи медіаклубу"><a href="#motion">Показ руху</a><a href="#sound">Звуковий знак</a><a href="#about">Про сторінку</a></nav></header>
<main>
  <p>Це навчальна колекція власних медіафайлів.</p>
  <section id="motion"><h2>Показ руху</h2>
    ${videoMarkup}
    <p class="description">Відео: геометрична позначка рухається в межах кадру; мовлення немає.</p>
  </section>
  <section id="sound"><h2>Звуковий знак</h2>
    <audio controls preload="metadata" src="signal.wav">Браузер не підтримує аудіоплеєр. Прочитай опис під ним.</audio>
    <p class="description">Аудіо: короткий навчальний тональний сигнал без мовлення.</p>
  </section>
</main>
<footer id="about"><p>Сторінку підготувала вигадана команда «Стежка».</p></footer>`,
      baseCss,
    ),
  },
  {
    id: 'semantic-media-posts',
    title: 'Дві самостійні нотатки',
    brief:
      'Створи сторінку «Нотатки медіамайстерні» з двома article. Перша самостійна нотатка пояснює відеоприклад, друга — звуковий знак. Кожна має h2, плеєр, опис та власний footer з ім’ям вигаданого автора. Main розміщує статті через Flexbox із перенесенням, щоб вони вміщалися на телефоні.',
    text: 'Нотатки медіамайстерні\nРух у кадрі\nЗвуковий знак\nРух у кадрі\nЦей короткий беззвучний ролик показує рух геометричної позначки.\nОпис відео: геометрична позначка рухається в межах кадру; мовлення немає.\nАвтор нотатки: вигаданий дослідник Листок.\nЗвуковий знак\nКороткий тональний сигнал можна використати як навчальний зразок аудіо.\nОпис аудіо: короткий навчальний тональний сигнал без мовлення.\nАвтор нотатки: вигадана дослідниця Квітка.\nЦе демонстраційні медіа, а не записи голосів учнів.',
    checklist: [
      'Є header з h1 і nav, один main із двома article та footer усієї сторінки.',
      'Article id="motion-note" і article id="sound-note" мають h2 й зрозумілі самостійні тексти. Два посилання nav ведуть до цих id.',
      'Відео використовує source, track captions, poster і controls. Аудіо використовує вкладений source src="signal.wav" type="audio/wav" та controls.',
      'Обидва плеєри мають preload="metadata", запасний текст і видимий опис поруч. Автоматичного відтворення немає.',
      'Main має display: flex, flex-wrap: wrap, gap: 20px. Article: flex: 1, min-width: 240px, max-width: 100%, box-sizing: border-box.',
      'У кожному article є власний footer з автором нотатки. Footer сторінки пояснює призначення демонстрації.',
      'Поля, рамки та плеєри не створюють горизонтальної прокрутки документа при ширині 390px.',
      'Перевірено початок/паузу в плеєрах і навігацію клавіатурою. HTML збережено й повторно відкрито.',
    ],
    hint: 'Article має сенс окремо від сторінки. Footer може належати не лише всій сторінці, а й конкретній статті. Source дозволяє вказати формат файлу; він не перетворює WAV на інший формат.',
    referenceHeight: 920,
    reference: htmlDocument(
      'Нотатки медіамайстерні',
      `<header><h1>Нотатки медіамайстерні</h1><nav aria-label="Нотатки"><a href="#motion-note">Рух у кадрі</a><a href="#sound-note">Звуковий знак</a></nav></header>
<main class="notes">
  <article id="motion-note"><h2>Рух у кадрі</h2><p>Цей короткий беззвучний ролик показує рух геометричної позначки.</p>
    ${videoMarkup}
    <p class="description">Опис відео: геометрична позначка рухається в межах кадру; мовлення немає.</p>
    <footer><p>Автор нотатки: вигаданий дослідник Листок.</p></footer>
  </article>
  <article id="sound-note"><h2>Звуковий знак</h2><p>Короткий тональний сигнал можна використати як навчальний зразок аудіо.</p>
    <audio controls preload="metadata"><source src="signal.wav" type="audio/wav">Браузер не підтримує аудіоплеєр. Прочитай опис під ним.</audio>
    <p class="description">Опис аудіо: короткий навчальний тональний сигнал без мовлення.</p>
    <footer><p>Автор нотатки: вигадана дослідниця Квітка.</p></footer>
  </article>
</main>
<footer><p>Це демонстраційні медіа, а не записи голосів учнів.</p></footer>`,
      baseCss +
        `
    .notes { display: flex; flex-wrap: wrap; gap: 20px; }
    .notes article { flex: 1; min-width: 240px; max-width: 100%; box-sizing: border-box; }
    article footer { padding: 10px; text-align: left; }`,
    ),
  },
  {
    id: 'semantic-media-homework',
    title: 'Домашня робота: виставка прикладів',
    brief:
      'Створи сторінку «Виставка медіаприкладів». У main розмісти section «Рух» і section «Звук», а всередині кожного — самостійну article з h3. Додай навігацію, відео з доріжкою, аудіо, видимі описи та footer з підсумком. Вибери власні кольори після завершення базового варіанта.',
    text: 'Виставка медіаприкладів\nРух\nЗвук\nПідсумок\nРух\nПозначка в кадрі\nВідео: геометрична позначка рухається в межах кадру; мовлення немає.\nЗвук\nТональний знак\nАудіо: короткий навчальний тональний сигнал без мовлення.\nПідсумок\nСемантика пояснює будову, CSS оформлює її, а плеєри відтворюють власні файли.',
    checklist: [
      'Є header з h1 та nav, рівно один main і footer id="summary". Навігація веде до movement/sound/summary.',
      'У main два тематичні section: movement і sound. Кожен має h2 та article із h3.',
      'Назви h1/h2/h3 утворюють змістову послідовність. Section не вставлено лише заради рамки; article містить повний медіаприклад.',
      'Відео: controls, preload="metadata", poster="leaf.svg", source motion.webm з type="video/webm", track motion.vtt із kind="captions", srclang="uk", label="Українська", default.',
      'Аудіо: controls, preload="metadata", source signal.wav з type="audio/wav". Для обох плеєрів є видимий опис і запасний текст усередині.',
      'Video має width: 320px, max-width: 100%, height: auto. Audio має width: 100%, max-width: 320px.',
      'Посилання мають видимий фокус. У footer є h2 «Підсумок» і речення про зміст HTML, CSS та плеєри.',
      'HTML і комплект файлів перевірено офлайн. Описи доступні навіть без відтворення та незалежно від показу субтитрів.',
    ],
    hint: 'Спочатку побудуй заголовки та посилання. Після цього додай плеєри. Не називай запасний текст субтитрами: для часової доріжки потрібен track, а видимий опис — окремий абзац.',
    referenceHeight: 1120,
    reference: htmlDocument(
      'Виставка медіаприкладів',
      `<header><h1>Виставка медіаприкладів</h1><nav aria-label="Виставка"><a href="#movement">Рух</a><a href="#sound">Звук</a><a href="#summary">Підсумок</a></nav></header>
<main>
  <section id="movement"><h2>Рух</h2><article><h3>Позначка в кадрі</h3>
    ${videoMarkup}
    <p class="description">Відео: геометрична позначка рухається в межах кадру; мовлення немає.</p>
  </article></section>
  <section id="sound"><h2>Звук</h2><article><h3>Тональний знак</h3>
    <audio controls preload="metadata"><source src="signal.wav" type="audio/wav">Браузер не підтримує аудіоплеєр. Прочитай опис під ним.</audio>
    <p class="description">Аудіо: короткий навчальний тональний сигнал без мовлення.</p>
  </article></section>
</main>
<footer id="summary"><h2>Підсумок</h2><p>Семантика пояснює будову, CSS оформлює її, а плеєри відтворюють власні файли.</p></footer>`,
      baseCss,
    ),
  },
];

export const semanticMediaStarter = htmlDocument(
  'Моя медіасторінка',
  '  <!-- Додай header, nav, main із розділами та footer. -->',
  '    /* Оформи сторінку й обмеж ширину плеєрів. */',
);
