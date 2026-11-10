import type { EngineDocument } from '../../runtime/types';

const projectMap = `
<figure class="web-diagram" aria-labelledby="mini-project-2-map-caption">
<figcaption id="mini-project-2-map-caption">Таблиця веде до команди, емблема — до завантаження</figcaption>
<div class="web-code-result">
<div class="web-diagram-card"><h3>Перехід за id</h3><pre class="web-visual-code"><code>&lt;a <mark class="web-selector-token">href="#comets"</mark>&gt;Комети&lt;/a&gt;
…
&lt;h3 <mark class="web-tag-match">id="comets"</mark>&gt;Комети&lt;/h3&gt;</code></pre><div class="web-browser-sample"><p><span style="color:#166534;text-decoration:underline">Комети</span> → опис команди</p><p style="border:2px dashed #15803d;padding:10px"><strong>Комети</strong><br>Тут починається розділ команди.</p></div></div>
<div class="web-diagram-card"><h3>Завантаження файлу</h3><pre class="web-visual-code"><code>&lt;a href="comets.svg"
   <mark class="web-tag-match">download="comets.svg"</mark>&gt;
  &lt;img src="comets.svg" alt=""&gt;
  Завантажити емблему Комет
&lt;/a&gt;</code></pre><div class="web-browser-sample"><img src="assets/web-development/media/comets.svg" alt="Синя емблема з кометою" style="width:140px;max-width:100%;height:auto"><p>Завантажити емблему Комет</p></div><p class="web-diagram-note">У підписі вже названа дія. Порожній alt не дублює її під час озвучення.</p></div>
</div></figure>`;

export const project2Documents: Record<string, EngineDocument> = {
  'mini-project-2': {
    title: 'Міні-проєкт 2. Кубок шкільного двору',
    html: `
<p>Створи сайт вигаданого футбольного кубка. Читач має побачити результати, перейти до команди й завантажити її емблему.</p>
<p>У кубку грають «Комети», «Хвилі» та «Іскри». Назви, емблеми й результати навчальні. Це не статистика реального змагання.</p>
<p>Міні-проєкт поєднує вивчене: посилання, стани CSS, картинки, таблиці та об’єднані клітинки. Нові можливості HTML не потрібні.</p>

<h2 id="mini-project-2-plan">План сторінки</h2>
<ol>
<li>Один h1 «Кубок шкільного двору» та вступ із позначкою про вигадані дані.</li>
<li>Меню з чотирма переходами: «Таблиця», «Матчі», «Команди», «Матеріали».</li>
<li>Розділ h2 із турнірною таблицею.</li>
<li>Розділ h2 із результатами трьох матчів.</li>
<li>Розділ h2 із трьома описами команд, їхніми h3 та емблемами-посиланнями.</li>
<li>Тематичний hr, розділ h2 «Матеріали команди», повернення до меню й підпис автора.</li>
</ol>
<p>Для меню використай id="menu". Цілі розділів: standings, matches, teams і materials. Цілі команд: comets, waves і sparks.</p>
${projectMap}

<h2 id="mini-project-2-data">Результати й очки</h2>
<p>Запиши три матчі: «Комети — Хвилі: 2:0», «Хвилі — Іскри: 1:0», «Іскри — Комети: 0:1».</p>
<p>У цьому навчальному кубку перемога дає 3 очки, поразка — 0. Усі матчі завершилися перемогою однієї команди.</p>
<table><caption>Дані для турнірної таблиці</caption><thead><tr><th scope="col">Команда</th><th scope="col">Ігри</th><th scope="col">Перемоги</th><th scope="col">Очки</th><th scope="col">Емблема</th></tr></thead><tbody>
<tr><th scope="row">Комети</th><td>2</td><td>2</td><td>6</td><td>comets.svg</td></tr>
<tr><th scope="row">Хвилі</th><td>2</td><td>1</td><td>3</td><td>waves.svg</td></tr>
<tr><th scope="row">Іскри</th><td>2</td><td>0</td><td>0</td><td>sparks.svg</td></tr>
</tbody></table>
<p>HTML і CSS самі не підраховують очки. Зістав результати матчів із таблицею: дві перемоги дають 6 очок, одна — 3.</p>

<h2 id="mini-project-2-table">Як побудувати таблицю</h2>
<p>У власній таблиці додай шість колонок: «Група», «Команда», «Ігри», «Перемоги», «Очки», «Емблема».</p>
<ul>
<li>Назва таблиці — caption «Підсумки групи А — назва команди веде до її опису».</li>
<li>Шість заголовків у thead мають scope="col".</li>
<li>Три команди належать одному tbody. Група «А» записана один раз у th із rowspan="3" та scope="rowgroup".</li>
<li>Назви команд — th зі scope="row". Кожна назва містить посилання на опис своєї команди.</li>
<li>У tfoot одна td із colspan="6" пояснює правило нарахування очок.</li>
</ul>
<p>У другому й третьому рядках не додавай нову клітинку групи: цю позицію вже займає rowspan.</p>
<p>Обгорни таблицю в div.table-scroll з overflow-x: auto. Так широка таблиця прокручуватиметься всередині обгортки на телефоні.</p>
<p>Приклади сіток і заголовків є в <a href="#/web/html-css/table-spans">темі 11 «Таблиці. Частина 2»</a>.</p>

<h2 id="mini-project-2-steps">Етапи роботи</h2>
<ol>
<li><strong>Створи основу.</strong> Додай українську мову, UTF-8, viewport, назву вкладки «Кубок шкільного двору» й style у head.</li>
<li><strong>Побудуй структуру.</strong> Запиши заголовки, вступ і меню. Перевір кожен href та відповідний id.</li>
<li><strong>Заповни таблицю.</strong> Спочатку перевір кількість позицій у кожному рядку, потім оформлюй її.</li>
<li><strong>Додай матчі.</strong> Використай ol із трьома результатами.</li>
<li><strong>Представ команди.</strong> Створи три div.team. У кожному розмісти h3, a.badge з картинкою й підписом та абзац опису.</li>
<li><strong>Оформи стани.</strong> Задай hover, focus та active без зміни товщини рамок і розмірів картинок.</li>
<li><strong>Перевір і збережи.</strong> Натисни Tab, Enter, посилання в таблиці та завантаження емблем. Відкрий збережений HTML офлайн.</li>
</ol>
<p>Повний текст для роботи, параметри оформлення й самоперевірка доступні в майстерні нижче.</p>

<h2 id="mini-project-2-style">Оформлення базового варіанта</h2>
<table><thead><tr><th scope="col">Частина</th><th scope="col">Параметри</th></tr></thead><tbody>
<tr><th scope="row">Сторінка</th><td>Arial/sans-serif, 16px, текст #0f172a, фон #f0fdf4. Заголовки #14532d: h1 — 30px по центру, h2 — 22px, h3 — 18px.</td></tr>
<tr><th scope="row">Таблиця</th><td>width: 100%, min-width: 560px, border-collapse: collapse. Клітинки: padding: 8px, рамка 1px solid #64748b, text-align: center.</td></tr>
<tr><th scope="row">Кольори таблиці</th><td>thead th: фон #14532d, білий текст; tbody th: фон #dcfce7; tfoot td: фон #fef3c7. caption: жирний шрифт, padding: 8px.</td></tr>
<tr><th scope="row">Емблеми</th><td>У таблиці — 48px завширшки. У a.badge — width: 100%, height: auto.</td></tr>
<tr><th scope="row">Нотатки команд</th><td>team: display: flow-root, padding: 12px, білий фон, рамка 1px solid #cbd5e1. badge: float: left, width: 140px, max-width: 45%, box-sizing: border-box, margin-right: 12px, padding: 6px, рамка 3px solid #15803d, text-align: center.</td></tr>
<tr><th scope="row">Посилання</th><td>Колір #166534, підкреслення збережено. hover: фон #dcfce7; focus: outline 3px solid #1d4ed8; active: фон #fef3c7.</td></tr>
<tr><th scope="row">Завершення</th><td>hr: border: 0, height: 3px, width: 80%, фон #15803d. p.author: text-align: right.</td></tr>
</tbody></table>
<p>Спочатку виконай базовий варіант. Потім можеш змінити назви команд, описи та читабельні кольори.</p>
<p>Якщо змінюєш рахунки матчів, перерахуй перемоги й очки. Збережи структуру таблиці, робочі якорі, стани посилань і завантаження емблем.</p>

<h2 id="mini-project-2-files">Емблеми й локальна робота</h2>
<p>Емблеми створено для цього проєкту. Їх можна вставити з матеріалів редактора, завантажити окремими SVG або разом у ZIP.</p>
<p>Для локального редактора поклади comets.svg, waves.svg і sparks.svg поруч із index.html. Короткі назви в src і href працюватимуть без змін.</p>
<p>Під час завантаження HTML із майстерні картинки й матеріали download-посилань вбудовуються у файл. Він працюватиме без окремої папки емблем.</p>
<p>Зберігай проміжний HTML після кожного етапу. Чернетка в майстерні зникає після виходу зі сторінки або перезавантаження. Для продовження відкрий збережений файл.</p>

<h2 id="mini-project-2-check">Перевірка готового сайту</h2>
<ul>
<li>Читач розуміє, що це вигаданий кубок. Результати та таблиця не суперечать одне одному.</li>
<li>З меню й таблиці можна перейти до потрібного розділу. Є повернення нагору.</li>
<li>Об’єднані клітинки займають рівно шість позицій у кожному рядку. Заголовки мають доречні scope.</li>
<li>Посилання доступні через Tab і Enter. Фокус помітний; hover та active не пересувають сусідні елементи.</li>
<li>Емблеми завантажуються, зображення не розтягуються. Широка таблиця не створює прокрутки всієї сторінки.</li>
<li>Збережений index.html працює без інтернету; назва вкладки правильна.</li>
</ul>
<p>Поясни вчителю, навіщо таблиці rowspan і colspan та чим перехід #comets відрізняється від завантаження comets.svg.</p>
<p>За потреби повернися до <a href="#/web/html-css/web-review-2">теми 12 «Повторення: посилання й таблиці»</a>.</p>

<h2 id="mini-project-2-workshop">Майстерня футбольного сайту</h2>
<p>Почни з порожньої основи. Зразок показує структуру й оформлення; доступні шрифти та перенесення рядків можуть відрізнятися.</p>
<div class="web-practice-mount"></div>`,
  },
};
