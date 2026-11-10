import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  const escaped = source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return `<pre class="web-code"><code>${escaped}</code></pre>`;
}

const listDiagram = `
<figure class="web-diagram" aria-labelledby="lists-lines-structure-caption">
<figcaption id="lists-lines-structure-caption">Контейнер списку та його пункти</figcaption>
<div class="web-code-result">
<div class="web-diagram-card"><h3>HTML</h3><pre class="web-visual-code"><code><mark class="web-tag-match">&lt;ul&gt;</mark>
  &lt;li&gt;Карта&lt;/li&gt;
  &lt;li&gt;Вода&lt;/li&gt;
<mark class="web-tag-match">&lt;/ul&gt;</mark></code></pre><p class="web-diagram-note">ul об’єднує список. Кожна пара li утворює окремий пункт.</p></div>
<div class="web-diagram-card"><h3>Результат</h3><div class="web-browser-sample"><ul><li>Карта</li><li>Вода</li></ul></div><p class="web-diagram-note">Маркер з’являється біля кожного пункту. Не вводь символи маркерів вручну.</p></div>
</div>
</figure>`;

const nestingDiagram = `
<figure class="web-diagram" aria-labelledby="lists-lines-nesting-caption">
<figcaption id="lists-lines-nesting-caption">Вкладений список належить одному пункту</figcaption>
<div class="web-code-result">
<div class="web-diagram-card"><h3>Зверни увагу на межі li</h3><pre class="web-visual-code"><code>&lt;ul&gt;
  <mark class="web-tag-match">&lt;li&gt;</mark>Спорядження
    &lt;ul&gt;
      &lt;li&gt;Карта&lt;/li&gt;
      &lt;li&gt;Блокнот&lt;/li&gt;
    &lt;/ul&gt;
  <mark class="web-tag-match">&lt;/li&gt;</mark>
  &lt;li&gt;Перевірка погоди&lt;/li&gt;
&lt;/ul&gt;</code></pre></div>
<div class="web-diagram-card"><h3>Результат</h3><div class="web-browser-sample"><ul><li>Спорядження<ul><li>Карта</li><li>Блокнот</li></ul></li><li>Перевірка погоди</li></ul></div><p class="web-diagram-note">Карта й блокнот належать до спорядження. Перевірка погоди — окремий пункт зовнішнього списку.</p></div>
</div>
</figure>`;

export const listsDocuments: Record<string, EngineDocument> = {
  'lists-lines': {
    title: 'Тема 4. Списки та лінії',
    html: `
<p>Згрупуємо пов’язані пункти, запишемо порядок дій і розділимо теми. Додамо фони та ширину, яка підходить вузькому екрану.</p>
<p>Класи й селектори повтори в темі <a href="#/web/html-css/css-intro">«Вступ до CSS»</a>.</p>

<h2 id="lists-lines-basics">Два види списків</h2>
<p><code>&lt;ul&gt;</code> створює невпорядкований список: порядок пунктів не змінює його зміст. Наприклад, це перелік речей у рюкзаку.</p>
<p><code>&lt;ol&gt;</code> створює впорядкований список: послідовність важлива. Наприклад, це кроки збереження HTML-файлу.</p>
<p>Кожен пункт записуй в елементі <code>&lt;li&gt;</code>. Заголовок списку розміщуй перед <code>&lt;ul&gt;</code> або <code>&lt;ol&gt;</code>.</p>
${listDiagram}
${code(`<h2>Порядок роботи</h2>
<ol>
  <li>Напиши код.</li>
  <li>Збережи файл.</li>
  <li>Відкрий його у браузері.</li>
</ol>`)}

<h2 id="lists-lines-nesting">Список усередині списку</h2>
<p>Додай вкладений список усередині того <code>&lt;li&gt;</code>, який він уточнює. Закрий зовнішній пункт лише після вкладеного списку.</p>
${nestingDiagram}
<p>Відступи в коді допомагають бачити вкладеність. Вони не замінюють правильні теги.</p>

<h2 id="lists-lines-markers">Маркери й нумерація через CSS</h2>
<p>Властивість <code>list-style-type</code> задає вигляд маркера. Правило можна застосувати до списку або до окремого <code>li</code>.</p>
${code(`.supplies { list-style-type: square; }
.route { list-style-type: upper-roman; }`)}
<figure class="web-diagram" aria-labelledby="lists-lines-marker-caption">
<figcaption id="lists-lines-marker-caption">Клас списку змінює маркери його пунктів</figcaption>
<div class="web-code-result"><div class="web-diagram-card"><h3>CSS → HTML</h3>
<pre class="web-visual-code"><code><mark class="web-selector-token">.supplies</mark> { list-style-type: square; }
&lt;ul <mark class="web-tag-match">class="supplies"</mark>&gt;
  &lt;li&gt;Карта&lt;/li&gt;
  &lt;li&gt;Вода&lt;/li&gt;
&lt;/ul&gt;</code></pre><p class="web-diagram-note">Селектор .supplies вибирає список із цим класом. Пункти успадковують тип маркера.</p></div>
<div class="web-diagram-card"><h3>Результат: квадратні маркери</h3><div class="web-browser-sample"><ul style="list-style-type:square"><li>Карта</li><li>Вода</li></ul></div></div></div></figure>
<table><thead><tr><th>Значення</th><th>Приклад маркерів</th></tr></thead><tbody>
<tr><td><code>disc</code></td><td>Заповнені кружечки</td></tr>
<tr><td><code>circle</code></td><td>Порожні кружечки</td></tr>
<tr><td><code>square</code></td><td>Квадрати</td></tr>
<tr><td><code>decimal</code></td><td>1, 2, 3</td></tr>
<tr><td><code>upper-alpha</code></td><td>A, B, C</td></tr>
<tr><td><code>lower-alpha</code></td><td>a, b, c</td></tr>
<tr><td><code>upper-roman</code></td><td>I, II, III</td></tr>
<tr><td><code>lower-roman</code></td><td>i, ii, iii</td></tr>
<tr><td><code>none</code></td><td>Без видимого маркера</td></tr>
</tbody></table>
<p>Для оформлення маркерів використовуй CSS. У впорядкованого списку також чинні атрибути <code>type</code> і <code>start</code>.</p>
${code(`<ol type="A" start="3">
  <li>Перевір результат.</li>
  <li>Передай роботу вчителю.</li>
</ol>`)}
<p>Тут <code>type="A"</code> задає великі латинські літери, а <code>start="3"</code> починає відлік із третьої позиції: C, D. Значення <code>start</code> записують числом.</p>
<p>Не змінюй спосіб нумерації посеред однієї послідовності без потреби. Однакове оформлення допомагає читати кроки.</p>
<p>Якщо прибираєш маркери через <code>none</code>, додай <code>role="list"</code> до списку. Атрибут <code>role</code> повідомляє допоміжним програмам призначення елемента; значення <code>list</code> означає список. Це допомагає зберегти його оголошення допоміжними програмами в деяких браузерах.</p>

<h2 id="lists-lines-background">Фон: background-color</h2>
<p><code>color</code> задає колір тексту, а <code>background-color</code> — колір фону елемента. Добирай темний текст на світлому тлі або інше читабельне поєднання.</p>
${code(`.note {
  color: #0f172a;
  background-color: #e0f2fe;
}`)}
<p>Шестизначний HEX-код має вигляд <code>#RRGGBB</code>. Пари задають червону, зелену й синю складові числами від <code>00</code> до <code>FF</code>.</p>
<p>У <code>rgb(224, 242, 254)</code> ті самі складові записано десятковими числами від 0 до 255. Це той самий колір, що й <code>#e0f2fe</code>.</p>
<figure class="web-diagram" aria-labelledby="lists-lines-color-caption"><figcaption id="lists-lines-color-caption">Два записи одного кольору</figcaption><div class="web-code-result"><div class="web-diagram-card"><code>background-color: #e0f2fe;</code><div style="height:48px;background-color:#e0f2fe;margin-top:12px" aria-hidden="true"></div></div><div class="web-diagram-card"><code>background-color: rgb(224, 242, 254);</code><div style="height:48px;background-color:rgb(224,242,254);margin-top:12px" aria-hidden="true"></div></div></div></figure>
<p>Властивість <code>background</code> може задавати відразу кілька параметрів фону. Для зміни лише кольору поки використовуй <code>background-color</code>.</p>

<h2 id="lists-lines-size">Ширина без обрізання тексту</h2>
<p><code>width</code> задає ширину. <code>max-width</code> обмежує її зверху. Так список може мати ширину 320px і водночас уміщуватися у вузькому вікні.</p>
${code(`.supplies {
  width: 320px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 12px 12px 12px 32px;
  background-color: #e0f2fe;
}`)}
<p><code>padding</code> залишає внутрішній простір, зокрема для маркерів. <code>box-sizing: border-box</code> враховує цей простір і рамку в заданій ширині.</p>
<p>Чотири значення <code>padding</code> задають відступи згори, справа, знизу та зліва. У прикладі ліворуч залишено 32px для маркерів. Одне значення, наприклад <code>padding: 16px</code>, задає однаковий відступ з усіх боків.</p>
<p><code>height</code> задає висоту. Не обмежуй нею список із текстом: довгі рядки можуть вийти за фон. Без фіксованої висоти блок росте разом із вмістом.</p>

<h2 id="lists-lines-break">Тематичний роздільник hr</h2>
<p><code>&lt;hr&gt;</code> позначає тематичний перехід між частинами тексту. Браузер зазвичай показує його як горизонтальну лінію. Кінцевий тег не потрібний.</p>
${code(`<p>План подорожі готовий.</p>
<hr>
<p>Тепер перевіримо спорядження.</p>`)}
${code(`hr {
  border: 0;
  height: 4px;
  width: 70%;
  background-color: #0369a1;
}`)}
<figure class="web-diagram" aria-labelledby="lists-lines-hr-caption"><figcaption id="lists-lines-hr-caption">Перехід до іншої теми</figcaption><div class="web-browser-sample"><p>План подорожі готовий.</p><hr style="border:0;height:4px;width:70%;background-color:#0369a1"><p>Тепер перевіримо спорядження.</p></div></figure>
<p><code>border: 0</code> прибирає стандартну рамку. <code>height</code> задає товщину нашої лінії, а <code>width: 70%</code> — частку ширини контейнера.</p>
<p>Для простого декоративного підкреслення елемента використовують CSS-рамку. Додавай <code>hr</code> там, де змінюється тема.</p>

<h2 id="lists-lines-practice">Практика: довідники й маршрути</h2>
<p>Відтвори структуру списків. Перевір вкладеність, маркери, фони та тематичну лінію. Зменш вікно й переконайся, що текст уміщується.</p>
<div class="web-practice-mount"></div>`,
  },
};
