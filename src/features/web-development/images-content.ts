import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  const escaped = source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return `<pre class="web-code"><code>${escaped}</code></pre>`;
}

const imageDiagram = `
<figure class="web-diagram" aria-labelledby="page-images-meaning-caption">
  <figcaption id="page-images-meaning-caption">Змістова ілюстрація чи декоративний фон?</figcaption>
  <div class="web-code-result">
    <div class="web-diagram-card">
      <h3>Зображення у вмісті</h3>
      <code>&lt;img src="flower.svg"<br>alt="Ілюстрація квітки"&gt;</code>
      <div class="web-browser-sample"><img src="assets/web-development/media/flower.svg" alt="Ілюстрація квітки" style="display:block;width:160px;max-width:100%;height:auto;margin-inline:auto"></div>
      <p class="web-diagram-note">Зображення додає зміст. Атрибут alt передає його призначення словами.</p>
    </div>
    <div class="web-diagram-card">
      <h3>Декоративне тло</h3>
      <code>background-image:<br>url("meadow.svg");</code>
      <div class="web-browser-sample" style="min-height:100px;background-image:url('assets/web-development/media/meadow.svg');background-size:cover"><span style="background-color:#f0fdf4;color:#14532d">Назва майстерні</span></div>
      <p class="web-diagram-note">Фон оздоблює блок. Важливий текст залишається текстом HTML, а не частиною картинки.</p>
    </div>
  </div>
</figure>`;

const sizingDiagram = `
<figure class="web-diagram" aria-labelledby="page-images-sizing-caption">
  <figcaption id="page-images-sizing-caption">Зберегти все зображення чи заповнити рамку?</figcaption>
  <div class="web-code-result">
    <div class="web-diagram-card">
      <h3>Пропорції збережено</h3>
      <code>width: 180px;<br>height: auto;</code>
      <div class="web-browser-sample"><img src="assets/web-development/media/flower.svg" alt="Повна ілюстрація квітки" style="display:block;width:180px;max-width:100%;height:auto;margin-inline:auto;border:2px solid #7e22ce"></div>
      <p class="web-diagram-note">Висота змінюється разом із шириною. Усе зображення залишається видимим.</p>
    </div>
    <div class="web-diagram-card">
      <h3>Квадрат із кадруванням</h3>
      <code>width: 140px; height: 140px;<br>object-fit: cover;</code>
      <div class="web-browser-sample"><img src="assets/web-development/media/flower.svg" alt="Квітка у квадратній рамці" style="display:block;width:140px;max-width:100%;height:140px;object-fit:cover;margin-inline:auto;border:2px solid #7e22ce"></div>
      <p class="web-diagram-note">Рамка заповнена без розтягування. Частину зображення може бути обрізано.</p>
    </div>
  </div>
</figure>`;

const floatDiagram = `
<figure class="web-diagram" aria-labelledby="page-images-float-caption">
  <figcaption id="page-images-float-caption">Текст обтікає зображення, а наступний блок починається нижче</figcaption>
  <div class="web-code-result">
    <div class="web-diagram-card">
      <h3>CSS → HTML</h3>
      <pre class="web-visual-code"><code><mark class="web-selector-token">.note</mark> { display: flow-root; }
<mark class="web-selector-token">.picture</mark> {
  float: left;
  width: 100px;
  margin-right: 12px;
}
&lt;div <mark class="web-tag-match">class="note"</mark>&gt;
  &lt;img <mark class="web-tag-match">class="picture"</mark>
       src="rabbit.svg" alt="Кролик"&gt;
  &lt;p&gt;Розглянь малюнок кролика…&lt;/p&gt;
&lt;/div&gt;</code></pre>
      <p class="web-diagram-note">Селектор .note вибирає контейнер, а .picture — зображення. Зображення й текст розміщені в одному div з класом note.</p>
    </div>
    <div class="web-diagram-card">
      <h3>Результат</h3>
      <div class="web-browser-sample">
        <div style="display:flow-root;border:1px dashed #64748b;padding:8px"><img src="assets/web-development/media/rabbit.svg" alt="Ілюстрація кролика" style="float:left;width:100px;max-width:45%;height:auto;margin-right:12px"><p>Розглянь малюнок кролика. Текст займає вільне місце праворуч і продовжується нижче, якщо це потрібно.</p></div>
        <p style="border-top:2px solid #7e22ce">Наступний блок — після нотатки.</p>
      </div>
    </div>
  </div>
</figure>`;

export const imagesDocuments: Record<string, EngineDocument> = {
  'page-images': {
    title: 'Тема 5. Зображення на сторінці',
    html: `
<p>Додамо ілюстрації, підберемо їхній розмір і створимо декоративне тло. Навчимося розміщувати текст поруч із зображенням.</p>
<p>Знання про списки й фон можна повторити в <a href="#/web/html-css/lists-lines">попередній темі</a>.</p>

<h2 id="page-images-element">Елемент img та опис alt</h2>
<p><code>&lt;img&gt;</code> додає зображення до HTML. Він не має кінцевого тега. Атрибут <code>src</code> задає адресу або шлях до файлу.</p>
${code('<img src="flower.svg" alt="Ілюстрація квітки">')}
<p>Якщо HTML і картинка лежать в одній папці, запиши <code>src="flower.svg"</code>. Для картинки в підпапці images запиши <code>src="images/flower.svg"</code>. Назва й регістр літер мають збігатися з файлом.</p>
<p>У цій майстерні короткі назви з матеріалів працюють автоматично. Зовнішні адреси в перегляді заблоковано.</p>
<p><code>alt</code> — текстова альтернатива зображення. Вона допомагає, коли картинку не видно або сторінку читає програма озвучення.</p>
<p>Пиши опис відповідно до ролі картинки. Недостатньо написати лише «картинка». Для суто декоративного зображення використовуй порожній опис <code>alt=""</code>.</p>
${imageDiagram}

<h2 id="page-images-size">Розміри та пропорції</h2>
<p>Атрибути <code>width</code> і <code>height</code> задають розміри в CSS-пікселях без одиниці <code>px</code>. Правильні пропорції допомагають браузеру заздалегідь залишити місце.</p>
<p>Ілюстрація <code>flower.svg</code> з матеріалів має розмір 300 × 180 і пропорції 5:3. Вказуй правильну пару розмірів для вибраного зображення.</p>
${code('<img src="flower.svg" alt="Ілюстрація квітки" width="300" height="180">')}
<p>Через CSS можна зменшити зображення для вузького екрана. Значення <code>height: auto</code> збереже його пропорції.</p>
${code(`img {
  width: 240px;
  max-width: 100%;
  height: auto;
}`)}
<p>Рамка додається до ширини елемента. Щоб умістити її в задану ширину, додай <code>box-sizing: border-box</code>. Це також допомагає уникнути прокрутки на вузькому екрані.</p>
<p>Для однакових рамок іноді потрібні і ширина, і висота. Додай <code>object-fit: cover</code>, щоб заповнити рамку без розтягування.</p>
<p><code>object-fit: contain</code> показує все зображення; біля нього може залишитися вільне місце.</p>
${sizingDiagram}

<h2 id="page-images-position">Центрування й обтікання</h2>
<p>Щоб відцентрувати окреме зображення, зроби його блоковим і задай автоматичні бічні поля.</p>
${code(`img {
  display: block;
  width: 240px;
  max-width: 100%;
  height: auto;
  margin-inline: auto;
}`)}
<p>Невеликі зображення всередині рядка можна вирівняти відносно тексту через <code>vertical-align: middle</code>. Ця властивість не центрує зображення по горизонталі.</p>
<p>Для обтікання текстом використовуй <code>float: left</code> або <code>float: right</code>. Додай поле між картинкою й текстом.</p>
<p>Обгорни нотатку елементом <code>&lt;div&gt;</code> — звичайним контейнером для групування. Стиль <code>display: flow-root</code> утримає обтікання всередині нього.</p>
${floatDiagram}
<p>За потреби <code>clear: both</code> на наступному блоці опустить його нижче попередніх плаваючих елементів.</p>

<h2 id="page-images-background">Зображення як фон</h2>
<p>Для декоративного тла задай властивість CSS <code>background-image</code>. Це властивість, а не атрибут HTML.</p>
${code(`body {
  background-color: #f0fdf4;
  background-image: url("meadow.svg");
  background-repeat: no-repeat;
  background-size: cover;
}`)}
<p>Запасний <code>background-color</code> залишиться, якщо фон не завантажиться. Перевір, що текст легко читати поверх зображення.</p>
<ul>
<li><code>repeat</code> — повторювати в обох напрямках.</li>
<li><code>repeat-x</code> — повторювати по горизонталі.</li>
<li><code>repeat-y</code> — повторювати по вертикалі.</li>
<li><code>no-repeat</code> — показати одну копію.</li>
</ul>
<figure class="web-diagram" aria-labelledby="page-images-repeat-caption"><figcaption id="page-images-repeat-caption">Одна плитка фону: різне повторення</figcaption><div class="web-code-result">
<div class="web-diagram-card"><h3>repeat-x</h3><div style="height:150px;background-color:#f8fafc;background-image:url('assets/web-development/media/meadow.svg');background-size:60px 60px;background-repeat:repeat-x;border:1px solid #64748b" aria-hidden="true"></div><p class="web-diagram-note">Копії утворюють один горизонтальний ряд.</p></div>
<div class="web-diagram-card"><h3>repeat-y</h3><div style="height:150px;background-color:#f8fafc;background-image:url('assets/web-development/media/meadow.svg');background-size:60px 60px;background-repeat:repeat-y;border:1px solid #64748b" aria-hidden="true"></div><p class="web-diagram-note">Копії утворюють один вертикальний стовпчик.</p></div>
</div></figure>
<p><code>background-size: cover</code> заповнює тло блоку зі збереженням пропорцій і можливим обрізанням. <code>contain</code> уміщує ціле зображення, але може залишити вільний простір.</p>

<h2 id="page-images-border">Рамки та кути</h2>
${code(`img {
  border: 3px solid #7e22ce;
  border-radius: 20px;
}`)}
<p>У <code>border</code> послідовно вказано товщину, стиль і колір рамки. Для стилю можна вибрати, наприклад, <code>solid</code>, <code>dashed</code> або <code>dotted</code>.</p>
<p><code>border-radius</code> округлює кути. Значення <code>50%</code> утворить коло лише для квадратної рамки; для прямокутної вийде овал.</p>

<h2 id="page-images-files">Матеріали та збереження роботи</h2>
<p>У практичній майстерні є власні ілюстрації. Кнопка матеріалу вставляє елемент <code>&lt;img&gt;</code> із короткою назвою файлу.</p>
<p>Назву на зразок <code>flower.svg</code> використовуй у <code>src</code>, а <code>meadow.svg</code> можна вказати в CSS <code>url(...)</code>.</p>
<p>Під час завантаження HTML ілюстрації з матеріалів вбудовуються в документ. Готовий файл працює без мережі й окремої папки з картинками.</p>
<p>Для роботи у VS Code або іншому локальному редакторі завантаж окремі SVG або весь ZIP-комплект у розділі «Зображення для завдань».</p>
<p>Розпакуй архів і створи <code>index.html</code> поруч із картинками. Тоді короткі назви з прикладів працюватимуть і локально.</p>
${code(`my-project/
  index.html
  flower.svg
  meadow.svg`)}
<p>Якщо перенесеш картинки в підпапку <code>images</code>, зміни шлях на <code>images/flower.svg</code>. У зовнішньому CSS-файлі шлях до фону відраховується від папки цього CSS-файлу.</p>

<h2 id="page-images-practice">Практика: ілюстрації та фон</h2>
<p>Спочатку перевір опис і пропорції кожного зображення. Потім порівняй рамки, розташування й читабельність тексту зі зразком.</p>
<div class="web-practice-mount"></div>`,
  },
};
