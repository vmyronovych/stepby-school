import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</code></pre>`;
}

const anchorDiagram = `
<figure class="web-diagram" aria-labelledby="web-review-2-anchor-caption">
  <figcaption id="web-review-2-anchor-caption">Посилання знаходить елемент за id</figcaption>
  <div class="web-code-result">
    <div class="web-diagram-card"><h3>HTML → ціль переходу</h3>
      <pre class="web-visual-code"><code>&lt;a href="<mark class="web-selector-token">#notes</mark>"&gt;Нотатки&lt;/a&gt;
&lt;h2 id="<mark class="web-tag-match">notes</mark>"&gt;Нотатки&lt;/h2&gt;</code></pre>
      <p class="web-diagram-note">У href є #. В атрибуті id записано ту саму назву без #.</p>
    </div>
    <div class="web-diagram-card"><h3>Результат і перевірка</h3>
      <div class="web-browser-sample"><span style="color:#075985;text-decoration:underline">Нотатки</span><p style="border:2px dashed #075985;padding:8px"><strong>Ціль: заголовок «Нотатки»</strong></p></div>
      <p class="web-diagram-note">Натискання посилання переходить до заголовка. Кожне id має бути унікальним у документі.</p>
    </div>
  </div>
</figure>`;

const spansDiagram = `
<figure class="web-diagram" aria-labelledby="web-review-2-spans-caption">
  <figcaption id="web-review-2-spans-caption">Рахуй логічні колонки, а не лише теги td</figcaption>
  <div class="web-code-result">
    <div class="web-diagram-card"><h3>Клітинка займає два рядки</h3>
      <pre class="web-visual-code"><code>&lt;tr&gt;
  &lt;td <mark class="web-tag-match">rowspan="2"</mark>&gt;Група&lt;/td&gt;
  &lt;td&gt;Перший запис&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;Другий запис&lt;/td&gt;&lt;/tr&gt;</code></pre>
      <p class="web-diagram-note">Другий рядок має одну нову клітинку. Першу колонку вже зайнято.</p>
    </div>
    <div class="web-diagram-card"><h3>Дві логічні колонки</h3>
      <table><caption>Навчальна схема групи</caption><thead><tr><th scope="col">Група</th><th scope="col">Запис</th></tr></thead><tbody><tr><td rowspan="2">Група</td><td>Перший запис</td></tr><tr><td>Другий запис</td></tr></tbody></table>
      <p class="web-diagram-note">Для colspan="2" клітинка натомість займає дві колонки одного рядка.</p>
    </div>
  </div>
</figure>`;

export const review2Documents: Record<string, EngineDocument> = {
  'web-review-2': {
    title: 'Тема 12. Повторення: посилання й таблиці',
    html: `
<p>Поєднаємо навички тем 8–11: навігацію, картинки-посилання, стани посилань і таблиці з об’єднаними клітинками.</p>
<p>Спочатку виконай структуру HTML. Потім додай CSS і перевір результат мишею, клавіатурою та у вузькому вікні.</p>

<h2 id="web-review-2-links">Адреса й призначення посилання</h2>
<p><code>a</code> створює посилання, а <code>href</code> задає його адресу. Текст посилання має пояснювати дію або назву цілі.</p>
${code(`<a href="#notes">Нотатки команди</a>
<a href="https://example.com" target="_blank" rel="noopener">Демонстраційний сайт — нова вкладка</a>`)}
<p>Для переходу в межах документа використовуй <code>href="#notes"</code> та <code>id="notes"</code> на потрібному елементі.</p>
${anchorDiagram}
<p><code>title</code> може містити додаткову підказку. Він не замінює зрозумілий видимий текст.</p>
<p><code>mailto:</code> пропонує відкрити поштову програму. <code>tel:</code> пропонує відкрити програму дзвінків. Доступність дії залежить від пристрою й налаштованих програм.</p>
<p>Для навчальних прикладів використовуй вигадані контакти. Перевіряй їхню будову в коді; надсилати листи чи телефонувати не потрібно.</p>
<p>Докладніше — у <a href="#/web/html-css/hyperlinks">темі 8 «Гіперпосилання»</a>.</p>

<h2 id="web-review-2-images">Картинка як посилання</h2>
<p>Запиши <code>img</code> всередині <code>a</code>. Для посилання без іншого тексту опис <code>alt</code> має пояснювати його дію.</p>
${code('<a href="rabbit.svg" download>\n  <img src="rabbit.svg" alt="Завантажити ілюстрацію кролика">\n</a>')}
<p>Атрибут <code>download</code> пропонує зберегти файл. Завантаження найпростіше перевіряти на власних локальних матеріалах; сторонній сайт може мати інші правила.</p>
<p>У майстерні працюють внутрішні переходи й завантаження ілюстрацій з матеріалів. Зовнішні сторінки, відносні переходи на інші HTML-файли та контакти тут не відкриваються.</p>
<p>Їхні адреси перевіряй у коді. У завантаженому HTML посилання зберігаються; зовнішнім сайтам потрібен інтернет, а локальним сторінкам — відповідні файли.</p>
<p>Для локальної роботи завантаж SVG або ZIP з матеріалів. Створи <code>index.html</code> поруч із картинками, щоб короткі назви працювали без змін.</p>

<h2 id="web-review-2-states">Наведення, фокус і натискання</h2>
<ul>
<li><code>:hover</code> — курсор наведений на посилання.</li>
<li><code>:focus</code> — посилання отримало фокус; його можна вибрати клавішею Tab.</li>
<li><code>:active</code> — короткий стан під час натискання.</li>
</ul>
${code(`a { border: 3px solid #64748b; }
a:hover { border-color: #92400e; }
a:focus { outline: 3px solid #1d4ed8; }
a:active { background-color: #92400e; color: white; }`)}
<p>Кілька станів можуть діяти одночасно. Залишай фокус видимим, навіть коли мишу наведено на посилання.</p>
<p>Не змінюй товщину рамки між станами: це може зсувати сусідні елементи. Змінюй її колір або додавай outline.</p>
<p>Порівняй зі схемами у <a href="#/web/html-css/image-links">темі 9 «Посилання та картинки»</a>.</p>

<h2 id="web-review-2-tables">Таблиця описує дані</h2>
<p>Використовуй таблицю, коли значення пов’язані рядками й колонками. Для розміщення довільних блоків сторінки вибирай інші засоби.</p>
<ul>
<li><code>caption</code> називає таблицю.</li>
<li><code>tr</code> утворює рядок, <code>td</code> — клітинку даних.</li>
<li><code>th</code> — клітинка-заголовок. <code>scope="col"</code> пов’язує її з колонкою, <code>scope="row"</code> — із рядком.</li>
<li><code>thead</code>, <code>tbody</code> і <code>tfoot</code> групують відповідні рядки.</li>
</ul>
<p>Рамки задавай через CSS <code>border</code>, простір усередині клітинок — через <code>padding</code>. Для спільних рамок використовуй <code>border-collapse: collapse</code>.</p>
<p>Відстань між окремими рамками задає <code>border-spacing</code> у режимі <code>border-collapse: separate</code>.</p>
<p>Основу повтори в <a href="#/web/html-css/tables-basics">темі 10 «Таблиці. Частина 1»</a>.</p>

<h2 id="web-review-2-spans">Об’єднані клітинки</h2>
<p><code>colspan</code> задає кількість колонок, зайнятих клітинкою. <code>rowspan</code> задає кількість рядків.</p>
${spansDiagram}
<p>Перед написанням коду намалюй сітку. Познач зайняті місця й не додавай у них зайві клітинки.</p>
<p>Не ускладнюй заголовки без потреби. У навчальному досьє достатньо простих заголовків колонок і рядків.</p>
<p>Широку таблицю обгорни в <code>div</code> з <code>overflow-x: auto</code>, щоб прокручувалася таблиця, а не вся сторінка.</p>
<p>Приклади об’єднання є в <a href="#/web/html-css/table-spans">темі 11 «Таблиці. Частина 2»</a>.</p>

<h2 id="web-review-2-check">Перед збереженням</h2>
<ol>
<li>Перевір, що всі внутрішні href мають відповідні унікальні id.</li>
<li>Перевір завантаження картинки й видимий фокус клавішею Tab.</li>
<li>Порахуй логічні колонки таблиці з урахуванням rowspan і colspan.</li>
<li>Зменш вікно та перевір текст, зображення й прокрутку таблиці.</li>
<li>Завантаж HTML і відкрий його окремо. Збережений файл можна імпортувати для продовження.</li>
</ol>
<p>Якщо виконуєш власний варіант, збережи потрібні навички, але обери інші тексти й читабельні кольори.</p>

<h2 id="web-review-2-practice">Практика: посилання й таблиці разом</h2>
<p>Виконай три вправи. Після завершення поясни, чому вибрав саме ці теги, стани та об’єднання клітинок.</p>
<div class="web-practice-mount"></div>`,
  },
};
