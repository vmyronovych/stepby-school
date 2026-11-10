import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</code></pre>`;
}

const anchorDiagram = `
<figure class="web-diagram" aria-labelledby="hyperlinks-anchor-caption">
<figcaption id="hyperlinks-anchor-caption">Адреса #flower знаходить елемент із id="flower"</figcaption>
<div class="web-code-result">
<div class="web-diagram-card"><h3>HTML: посилання → ціль</h3><pre class="web-visual-code"><code>&lt;a <mark class="web-selector-token">href="#flower"</mark>&gt;Квітка&lt;/a&gt;
…
&lt;h2 <mark class="web-tag-match">id="flower"</mark>&gt;Квітка&lt;/h2&gt;</code></pre><p class="web-diagram-note"># належить адресі переходу. Значення id записано без #.</p></div>
<div class="web-diagram-card"><h3>Результат</h3><div class="web-browser-sample"><p><span style="color:#075985;text-decoration:underline">Квітка</span> → розділ нижче</p><div style="border:2px dashed #0369a1;padding:12px"><strong>Квітка</strong><p>Ціль переходу: id="flower"</p></div></div><p class="web-diagram-note">Це схема переходу. Робочі посилання створиш у практичній майстерні.</p></div>
</div></figure>`;

export const linksDocuments: Record<string, EngineDocument> = {
  hyperlinks: {
    title: 'Тема 8. Гіперпосилання',
    html: `
<p>Посилання з’єднують розділи, сторінки й файли. Навчимося задавати адресу, підпис і мету переходу.</p>
<h2 id="hyperlinks-element">Посилання a та адреса href</h2>
<p>Елемент <code>&lt;a&gt;</code> з атрибутом <code>href</code> створює посилання. Текст між тегами пояснює, куди воно веде.</p>
${code('<a href="https://example.com">Відкрити навчальну сторінку</a>')}
<p>Пиши зрозумілий текст: «Розклад майстерні» краще пояснює перехід, ніж «Натисни тут». Перевіряй адресу перед відкриттям.</p>
<p><code>https://example.com</code> — навчальна зовнішня адреса. Для переходу на інший сайт потрібен інтернет.</p>
<h2 id="hyperlinks-paths">Сторінка поруч чи в іншій папці</h2>
${code('<a href="about.html">Про майстерню</a>\n<a href="pages/gallery.html">Галерея</a>')}
<p><code>about.html</code> означає файл поруч із поточним HTML. <code>pages/gallery.html</code> означає файл у підпапці pages. Назви й регістр літер мають збігатися.</p>
<p>Для такого переходу потрібно створити обидва HTML-файли. Майстерня редагує один документ; кілька сторінок зручно перевіряти в локальній папці.</p>
<h2 id="hyperlinks-anchors">Перехід усередині сторінки</h2>
<p>Атрибут <code>id</code> задає унікальний ідентифікатор елемента. У посиланні на нього запиши <code>#</code> перед назвою.</p>
${anchorDiagram}
<p>Не повторюй однаковий id у документі. Для кількох елементів зі спільним оформленням використовуй <code>class</code>.</p>
${code('<p id="menu"><a href="#flower">До квітки</a></p>\n<h2 id="flower">Квітка</h2>\n<p>Опис квітки.</p>\n<a href="#menu">Повернутися до меню</a>')}
<p>До елемента з <code>id="flower"</code> можна звернутися в CSS через <code>#flower</code>. Клас вибирають через крапку, наприклад <code>.note</code>.</p>
<h2 id="hyperlinks-options">Підказка й нова вкладка</h2>
${code('<a href="https://example.com"\n   title="Відкриється у новій вкладці"\n   target="_blank" rel="noopener noreferrer">\n  Навчальна сторінка — нова вкладка\n</a>')}
<p><code>title</code> додає допоміжну підказку. На сенсорному екрані її можна не побачити, тому важливу інформацію залишай у видимому тексті.</p>
<p><code>target="_blank"</code> просить браузер відкрити нову вкладку або вікно. Без target перехід зазвичай відбувається в поточній вкладці.</p>
<p><code>rel="noopener noreferrer"</code> відокремлює нову вкладку від початкової та не передає адресу початкової сторінки як джерело переходу.</p>
<h2 id="hyperlinks-actions">Пошта, телефон і завантаження</h2>
${code('<a href="mailto:club@example.com">Написати в майстерню</a>\n<a href="tel:+380000000000">Навчальний телефон</a>\n<a href="flower.svg" download="flower.svg">Завантажити квітку</a>')}
<p><code>mailto:</code> пропонує відкрити поштову програму. Лист не надсилається автоматично. <code>tel:</code> передає номер програмі для дзвінків, якщо така є.</p>
<p>Контакти в прикладах вигадані. Для обох дій потрібна відповідна програма або налаштування пристрою.</p>
<p>Атрибут <code>download</code> пропонує завантажити файл замість переходу. Значення атрибута задає бажане ім’я файлу.</p>
<p>Завантаження найнадійніше працює для локальних файлів, матеріалів того самого сайту та вбудованих даних. Віддалений сервер або браузер може змінити цю поведінку.</p>
<h2 id="hyperlinks-style">Зрозумілий вигляд посилань</h2>
<p>Колір і шрифт посилань змінюються через CSS. <code>text-decoration: none</code> прибирає підкреслення, але посилання має залишатися впізнаваним.</p>
${code('a { color: #075985; font-size: 18px; }')}
<p>Для посилань серед звичайного тексту зручно зберігати підкреслення. Не покладайся лише на різницю кольорів.</p>
<h2 id="hyperlinks-preview">Як перевіряти переходи</h2>
<p>У безпечному перегляді працюють внутрішні якорі й завантаження ілюстрацій із матеріалів. Зовнішні адреси, інші HTML-файли, mailto й tel показано без активного переходу.</p>
<p>Наведи курсор на таке посилання, щоб побачити початкову адресу в підказці. Для перевірки повної поведінки відкрий завантажений HTML у звичайній вкладці.</p>
<p>Для роботи локально завантаж SVG або ZIP із матеріалів. Картинки та HTML розмісти поруч. Під час експорту з майстерні локальні зображення вбудовуються у файл.</p>
<h2 id="hyperlinks-practice">Практика: переходи й матеріали</h2>
<p>Спочатку перевір відповідність href та id. Потім перевір підписи, завантаження й вигляд сторінки у вузькому вікні.</p>
<div class="web-practice-mount"></div>`,
  },
};
