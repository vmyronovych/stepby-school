import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</code></pre>`;
}

const imageAnchorDiagram = `
<figure class="web-diagram" aria-labelledby="image-links-wrap-caption">
<figcaption id="image-links-wrap-caption">Посилання обгортає зображення</figcaption>
<div class="web-code-result">
<div class="web-diagram-card"><h3>HTML</h3><pre class="web-visual-code"><code><mark class="web-tag-match">&lt;a href="#flower"&gt;</mark>
  &lt;img src="flower.svg"
       alt="Читати про квітку"&gt;
<mark class="web-tag-match">&lt;/a&gt;</mark>
&lt;h2 id="flower"&gt;Квітка&lt;/h2&gt;</code></pre><p class="web-diagram-note">Початок і кінець a охоплюють img. Дія належить посиланню, а картинка є його вмістом.</p></div>
<div class="web-diagram-card"><h3>Картинка → розділ</h3><div class="web-browser-sample"><img src="assets/web-development/media/flower.svg" alt="Схема зображення-посилання" style="width:160px;max-width:100%;height:auto;border:3px solid #0f766e"><p>Натискання або Enter → «Квітка»</p></div><p class="web-diagram-note">Це схема. Робочу дію перевір у редакторі.</p></div>
</div></figure>`;

const stateDiagram = `
<figure class="web-diagram" aria-labelledby="image-links-states-caption">
<figcaption id="image-links-states-caption">Різні стани одного посилання</figcaption>
<div class="web-code-result">
<div class="web-diagram-card"><h3>:hover — курсор над посиланням</h3><div class="web-browser-sample" style="border:3px solid #b45309;background-color:#fef3c7;padding:12px;color:#134e4a">Перейти до опису</div><p class="web-diagram-note">Приклад зміни тла й кольору рамки.</p></div>
<div class="web-diagram-card"><h3>:focus — посилання отримало фокус</h3><div class="web-browser-sample" style="border:3px solid #0f766e;outline:3px solid #1d4ed8;outline-offset:3px;padding:12px;color:#134e4a">Перейти до опису</div><p class="web-diagram-note">Зовнішній контур показує поточну ціль клавіатури.</p></div>
<div class="web-diagram-card"><h3>:active — триває натискання</h3><div class="web-browser-sample" style="border:3px solid #1d4ed8;background-color:#dbeafe;padding:12px;color:#134e4a">Перейти до опису</div><p class="web-diagram-note">Короткий стан. Після натискання він припиняється.</p></div>
</div></figure>`;

export const imageLinksDocuments: Record<string, EngineDocument> = {
  'image-links': {
    title: 'Тема 9. Посилання та зображення',
    html: `
<p>Зображення може вести до опису, іншої сторінки або файлу. Зробимо такі посилання зрозумілими для миші й клавіатури.</p>
<p>Адреси й якорі повтори в <a href="#/web/html-css/hyperlinks">темі 8 «Гіперпосилання»</a>.</p>
<h2 id="image-links-wrap">Картинка всередині посилання</h2>
<p>Розмісти <code>img</code> між початковим і кінцевим тегами <code>a</code>. Адресу <code>href</code> залишай на посиланні.</p>
${imageAnchorDiagram}
<p>Якщо посилання містить тільки картинку, її <code>alt</code> має пояснювати мету переходу. Наприклад, «Читати про квітку».</p>
<p>Якщо в тому самому посиланні вже є зрозумілий видимий підпис, для декоративної картинки можна використати <code>alt=""</code>.</p>
${code('<a href="#meeting">\n  <img src="rabbit.svg" alt="">\n  Дізнатися про зустріч\n</a>')}
<p>Не вставляй одне посилання всередину іншого. Для переходу використовуй a; кнопка button призначена для дії, а не адреси переходу.</p>
<h2 id="image-links-full">Маленьке зображення й повний файл</h2>
${code('<a href="flower.svg" target="_blank" rel="noopener noreferrer">\n  <img src="flower.svg" width="150" height="90"\n       alt="Відкрити повну ілюстрацію квітки — нова вкладка">\n</a>')}
<p>Тут CSS або розміри img зменшують картинку, а посилання веде до самого файлу. Це не команда збільшити img на поточній сторінці.</p>
<p>Збережи <code>flower.svg</code> поруч із HTML. Тоді звичайне посилання відкриє окремий файл у новій вкладці. Після експорту його <code>href</code> залишається назвою файлу.</p>
<p>Картинки <code>img</code> і матеріали посилань із <code>download</code> вбудовуються в завантажений HTML. Для відкриття окремого SVG завантаж його з матеріалів або розпакуй ZIP.</p>
<p>У безпечному перегляді перевіряй внутрішні переходи та download-посилання. Окремий файл відкрий у локальному браузері.</p>
<h2 id="image-links-states">Псевдокласи: стан, а не новий елемент</h2>
<p>Псевдоклас додають після селектора через двокрапку. Він уточнює стан вибраного елемента.</p>
${code('.choice:hover { background-color: #fef3c7; }\n.choice:focus { outline: 3px solid #1d4ed8; outline-offset: 3px; }\n.choice:active { border-color: #1d4ed8; }')}
<ul>
<li><code>:hover</code> діє, коли над елементом є курсор. На сенсорному екрані наведення може бути недоступним.</li>
<li><code>:focus</code> діє, коли елемент отримав фокус. Посилання з href можна вибрати клавішею Tab.</li>
<li><code>:active</code> діє під час активації, наприклад утримання кнопки миші. Це не збережений вибір.</li>
</ul>
${stateDiagram}
<p><code>outline</code> малює зовнішній контур і не змінює розміри блоку. <code>outline-offset</code> відсуває контур від рамки.</p>
<p>Не прибирай видимий фокус. Вибери посилання клавішею Tab і натисни Enter. Shift+Tab повертає фокус до попереднього елемента.</p>
<p>Посилання може одночасно мати кілька станів, наприклад hover і focus. Якщо правила змінюють ту саму властивість з однаковою перевагою, діє пізніше правило.</p>
<h2 id="image-links-stable">Оформлення без стрибків</h2>
<p>Задай рамку звичайному стану та змінюй лише її колір. Зміна товщини або розміру картинки може пересунути сусідній текст.</p>
${code('.choice {\n  display: block;\n  width: 210px;\n  max-width: 100%;\n  box-sizing: border-box;\n  border: 3px solid #0f766e;\n}\n.choice:hover { border-color: #b45309; }')}
<p>Для центрованого посилання-блоку використай <code>margin-inline: auto</code>. Усередині нього текст і звичайне зображення можна центрувати через <code>text-align: center</code>.</p>
<h2 id="image-links-own">Власний малюнок для посилання</h2>
<p>У локальному редакторі можна використати власний PNG або JPEG із графічного редактора. Наприклад, збережи <code>invite.png</code> поруч із HTML.</p>
${code('<a href="#meeting"><img src="invite.png" alt="Дізнатися про зустріч"></a>')}
<p>Для власного зображення потрібно мати сам файл у папці проєкту. Такий шлях перевіряй у локальному браузері; майстерня автоматично знаходить тільки свої матеріали.</p>
<p>Зрозумілий текст краще залишити текстом HTML. Якщо напис є тільки в малюнку, обов’язково передай мету посилання через alt.</p>
<h2 id="image-links-preview">Перегляд і збереження</h2>
<p>У редакторі працюють внутрішні якорі та завантаження ілюстрацій з матеріалів. Зовнішні адреси, інші HTML-файли, пошта й телефон не запускаються в перегляді.</p>
<p>Для перевірки цих переходів відкрий завантажений HTML. Він зберігає початкові адреси. Ілюстрації з матеріалів вбудовуються у файл.</p>
<p>Для роботи локально завантаж SVG або ZIP. Не змінюй назви матеріалів або відповідно виправ шлях у src та href.</p>
<h2 id="image-links-practice">Практика: картинка, адреса та стан</h2>
<p>Перевір кожне посилання мишею та клавіатурою. Порівняй вигляд до наведення, під час фокусу й під час натискання.</p>
<div class="web-practice-mount"></div>`,
  },
};
