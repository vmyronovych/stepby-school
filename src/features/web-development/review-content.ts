import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  const escaped = source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return `<pre class="web-code"><code>${escaped}</code></pre>`;
}

const documentDiagram = `
<figure class="web-diagram" aria-labelledby="web-review-file-caption">
  <figcaption id="web-review-file-caption">У кожної частини документа своя робота</figcaption>
  <div class="web-code-result">
    <div class="web-diagram-card">
      <h3>head: відомості й оформлення</h3>
      <pre class="web-visual-code"><code>&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Мій проєкт&lt;/title&gt;
  &lt;style&gt;
    <mark class="web-selector-token">.note</mark> { color: darkgreen; }
  &lt;/style&gt;
&lt;/head&gt;</code></pre>
      <p class="web-diagram-note">Назва вкладки, кодування та правила CSS. Селектор .note вибирає елементи з класом note.</p>
    </div>
    <div class="web-diagram-card">
      <h3>body: вміст сторінки</h3>
      <pre class="web-visual-code"><code>&lt;body&gt;
  &lt;h1&gt;Мій проєкт&lt;/h1&gt;
  &lt;p <mark class="web-tag-match">class="note"</mark>&gt;Привіт!&lt;/p&gt;
&lt;/body&gt;</code></pre>
      <div class="web-browser-sample"><div style="font-size:24px;font-weight:700">Мій проєкт</div><p style="color:darkgreen">Привіт!</p></div>
    </div>
  </div>
</figure>`;

const planningDiagram = `
<figure class="web-diagram" aria-labelledby="web-review-plan-caption">
  <figcaption id="web-review-plan-caption">Рухайся від змісту до результату</figcaption>
  <ol>
    <li><strong>Прочитай умову.</strong> Випиши назви розділів, текст і потрібні зображення.</li>
    <li><strong>Побудуй HTML.</strong> Вибери заголовки, абзаци та списки за змістом.</li>
    <li><strong>Додай CSS.</strong> Задай спільні правила й класи для окремих елементів.</li>
    <li><strong>Перевір результат.</strong> Порівняй сторінку зі зразком і списком умов.</li>
  </ol>
</figure>`;

export const reviewDocuments: Record<string, EngineDocument> = {
  'web-review': {
    title: 'Тема 6. Повторення: HTML і CSS',
    html: `
<p>Зберемо знайомі прийоми в невеликі сторінки. Нові властивості не потрібні: поясни призначення кожного елемента й перевір свій код.</p>

<h2 id="web-review-plan">План перед початком роботи</h2>
${planningDiagram}
<p>Не намагайся одразу написати всю сторінку. Перевіряй кожну завершену частину.</p>

<h2 id="web-review-document">Будова HTML-документа</h2>
<p>Файл починається з оголошення <code>&lt;!DOCTYPE html&gt;</code>. Елемент <code>html</code> має мову <code>lang="uk"</code> та містить <code>head</code> і <code>body</code>.</p>
${documentDiagram}
<p>Не забудь <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code> для вузьких екранів.</p>
<p>Повна основа документа є в <a href="#/web/html-css/web-page">темі 1 «Веб-сторінка»</a>.</p>

<h2 id="web-review-text">Заголовки, абзаци та виділення</h2>
<ul>
<li>Головна назва — <code>h1</code>, основні розділи — <code>h2</code>. Рівень визначає зміст, а не бажаний розмір літер.</li>
<li>Окрема думка — <code>p</code>. Перенесення рядка всередині думки — <code>br</code>.</li>
<li><code>strong</code> передає важливість, <code>em</code> — наголос.</li>
<li><code>s</code> позначає неактуальний текст. Декоративне підкреслення задає CSS <code>text-decoration</code>.</li>
<li><code>sup</code> записує показник степеня, <code>sub</code> — нижній індекс у формулі.</li>
</ul>
${code(`<p><strong>Важливо:</strong> збережи <em>свою</em> роботу.</p>
<p>Площа квадрата: S = a<sup>2</sup>.</p>
<p>Вода: H<sub>2</sub>O.</p>`)}
<p>Якщо треба показати сам тег у тексті, заміни кутові дужки: <code>&amp;lt;br&amp;gt;</code> відобразиться як <code>&lt;br&gt;</code>.</p>
<p>Порівняй код і результат у <a href="#/web/html-css/text-formatting">темі 2 «Форматування тексту»</a>.</p>

<h2 id="web-review-css">Правила CSS і класи</h2>
<p>Селектор тега, наприклад <code>p</code>, вибирає всі елементи цього виду. Селектор <code>.note</code> вибирає елементи з <code>class="note"</code>.</p>
${code(`p { font-family: Arial, sans-serif; font-size: 18px; }
.note { color: darkgreen; font-weight: 700; }`)}
<p>Клас дає змогу повторно використати оформлення. Кілька назв у <code>class</code> розділяй пробілами. Крапку став лише в селекторі CSS.</p>
<p>Вибирай читабельний колір на обраному тлі. Завершуй список <code>font-family</code> запасним сімейством.</p>
<p>Схему зв’язку класів і елементів показано в <a href="#/web/html-css/css-intro">темі 3 «Вступ до CSS»</a>.</p>

<h2 id="web-review-lists">Списки та поділ на розділи</h2>
<p>Використовуй <code>ul</code>, коли порядок пунктів не має значення, і <code>ol</code> для послідовності. Кожен пункт належить <code>li</code>.</p>
<p>Назву списку розмісти перед ним. Вкладений список належить тому <code>li</code>, який він уточнює.</p>
${code(`<h2>План роботи</h2>
<ol>
  <li>Створити HTML.</li>
  <li>Додати CSS.</li>
  <li>Перевірити сторінку.</li>
</ol>`)}
<p>Вигляд маркерів задає <code>list-style-type</code>. Елемент <code>hr</code> позначає тематичний перехід.</p>
<p>Приклади є в <a href="#/web/html-css/lists-lines">темі 4 «Списки та лінії»</a>.</p>

<h2 id="web-review-images">Зображення і підписи</h2>
<p>Атрибут <code>src</code> указує файл, а <code>alt</code> передає зміст зображення, якщо його не видно. Для декоративного зображення використовуй порожній <code>alt=""</code>.</p>
${code('<p><img src="rabbit.svg" alt="Малюнок кролика"><br>Кролик на галявині</p>')}
<p>Розміри, рамки й заокруглення задавай через CSS. Якщо потрібне обрізання до однакового розміру, поєднай фіксовані ширину й висоту з <code>object-fit: cover</code>.</p>
<p>Фонове зображення є оформленням. Не ховай у ньому текст умови або іншу важливу інформацію.</p>
<p>Повтори способи розміщення в <a href="#/web/html-css/page-images">темі 5 «Зображення на сторінці»</a>.</p>

<h2 id="web-review-check">Перевірка перед здаванням</h2>
<ol>
<li>Перевір структуру документа та парні теги.</li>
<li>Зістав назви класів у HTML і CSS.</li>
<li>Онови результат. Перевір заголовки, кольори, маркери та індекси.</li>
<li>Переконайся, що зображення мають доречні описи та правильні пропорції.</li>
<li>Переглянь сторінку у вузькому вікні. Текст має залишатися доступним.</li>
<li>Завантаж HTML і відкрий його в браузері. Перевір назву вкладки.</li>
</ol>
<p>Для роботи у локальному редакторі розпакуй комплект зображень і створи <code>index.html</code> поруч із ними. Окремі SVG та ZIP доступні в розділі «Зображення для завдань» нижче.</p>
<p>Різниця шрифтів на іншому пристрої можлива. Оцінюй також правильність структури й виконання умов.</p>

<h2 id="web-review-practice">Практика: застосуй вивчене</h2>
<p>Спробуй виконати завдання самостійно. За потреби повернися до відповідної теми, а потім продовж роботу.</p>
<p>Остання вправа — домашня робота з невеликою галереєю. Доступні малюнки можна вставити кнопками редактора.</p>
<div class="web-practice-mount"></div>`,
  },
};
