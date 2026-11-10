import type { EngineDocument } from '../../runtime/types';

const structureDiagram = `
<figure class="web-diagram" aria-labelledby="mini-project-1-map-caption">
  <figcaption id="mini-project-1-map-caption">Від плану справи до структури сторінки</figcaption>
  <div class="web-code-result">
    <div class="web-diagram-card">
      <h3>Зміст → HTML</h3>
      <ol>
        <li>Назва бюро → один <code>h1</code>.</li>
        <li>Назва справи й вступ → <code>p</code>.</li>
        <li>Перелік доказів → <code>h2</code> та <code>ul</code>.</li>
        <li>План перевірки → <code>h2</code> та <code>ol</code>.</li>
        <li>Нотатки → <code>h2</code>, три <code>div</code> із <code>h3</code>, <code>img</code> і <code>p</code>.</li>
        <li>Тематична межа → <code>hr</code>; висновок → <code>h2</code> і <code>p</code>.</li>
        <li>Підпис команди → окремий <code>p</code>.</li>
      </ol>
    </div>
    <div class="web-diagram-card">
      <h3>Клас об’єднує нотатки</h3>
      <pre class="web-visual-code"><code><mark class="web-selector-token">.clue</mark> { display: flow-root; }
&lt;div <mark class="web-tag-match">class="clue"</mark>&gt;
  &lt;h3&gt;Назва підказки&lt;/h3&gt;
  &lt;img class="left" src="leaf.svg"
       alt="Листок — підказка"&gt;
  &lt;p&gt;Спостереження команди…&lt;/p&gt;
&lt;/div&gt;</code></pre>
      <div class="web-browser-sample" style="display:flow-root;border:1px solid #cbd5e1;padding:12px">
        <img src="assets/web-development/media/leaf.svg" alt="Зелений листок" style="float:left;width:90px;max-width:45%;height:auto;margin-right:12px">
        <p>Зображення й текст належать одній нотатці.</p>
      </div>
      <p class="web-diagram-note">Селектор .clue вибирає всі три нотатки. flow-root утримує обтікання всередині кожної.</p>
    </div>
  </div>
</figure>`;

export const projectDocuments: Record<string, EngineDocument> = {
  'mini-project-1': {
    title: 'Міні-проєкт 1. Детективне бюро',
    html: `
<p>Створи завершений сайт детективного бюро «Зелений слід». Його читач має зрозуміти справу, переглянути підказки та дізнатися висновок.</p>
<p>Сюжет вигаданий: у шкільній бібліотеці зникла зелена закладка. На шляху до саду команда знайшла паперовий листок, записку з квіткою та конверт із птахом.</p>
<p>Це самостійна робота на основі тем 1–6. Використай знайомі заголовки, абзаци, списки, класи, зображення й обтікання.</p>

<h2 id="mini-project-1-result">Що має вийти</h2>
<p>Одна сторінка з чотирма розділами: «Що ми знайшли», «План розслідування», «Нотатки команди» та «Справу завершено».</p>
<p>Перелік знахідок не має обов’язкового порядку, тому використай <code>ul</code>. Для послідовності перевірок потрібен <code>ol</code>.</p>
<p>Розділяй спостереження й припущення. Малюнок птаха на конверті допомагає впізнати конверт, але не доводить, що птах переніс закладку.</p>
${structureDiagram}

<h2 id="mini-project-1-steps">Етапи роботи</h2>
<ol>
<li><strong>Підготуй документ.</strong> Задай українську мову, UTF-8, viewport і назву вкладки «Зелений слід — справа про закладку».</li>
<li><strong>Побудуй зміст.</strong> Додай один h1, вступні абзаци, чотири h2 та два списки по три пункти. Текст доступний під умовою завдання.</li>
<li><strong>Додай нотатки.</strong> У кожній розмісти h3, зображення й абзац. Задай контейнерам клас clue, зображенням — left або right.</li>
<li><strong>Запиши висновок.</strong> Перед ним постав hr. Після висновку додай авторський підпис окремим абзацом.</li>
<li><strong>Оформи сторінку.</strong> Спочатку застосуй спільні правила, потім класи. Параметри базового варіанта є нижче.</li>
<li><strong>Перевір і збережи.</strong> Зменш вікно, переглянь описи картинок і завантаж готовий HTML.</li>
</ol>
<p>Не обмежуй висоту нотаток. Вона має збільшуватися, коли текст переноситься на нові рядки.</p>

<h2 id="mini-project-1-style">Оформлення базового варіанта</h2>
<table>
<thead><tr><th>Елемент або клас</th><th>Параметри</th></tr></thead>
<tbody>
<tr><td>body</td><td>Фон #f0fdfa, текст #0f172a, Arial із sans-serif, 16px.</td></tr>
<tr><td>h1, h2, h3</td><td>Розміри: 30px, 22px, 18px. h1 і h2 мають колір #115e59; h1 вирівняний по центру.</td></tr>
<tr><td>.case-name</td><td>Назва справи: 20px, жирний шрифт, по центру.</td></tr>
<tr><td>.evidence, .plan</td><td>Для доказів — square; для плану — decimal.</td></tr>
<tr><td>.clue</td><td>display: flow-root; padding: 12px; білий фон; рамка 1px solid #cbd5e1.</td></tr>
<tr><td>img</td><td>width: 150px; max-width: 45%; height: auto; box-sizing: border-box; рамка 3px solid #0f766e; border-radius: 16px.</td></tr>
<tr><td>.left, .right</td><td>Листок і птах — float: left та margin-right: 12px. Квітка — float: right та margin-left: 12px.</td></tr>
<tr><td>hr</td><td>border: 0; height: 3px; width: 80%; background-color: #0f766e.</td></tr>
<tr><td>.result, .author</td><td>Висновок: фон #ccfbf1, padding: 12px. Авторський підпис: text-align: right.</td></tr>
</tbody>
</table>
<p>Познач правило бюро через <code>strong</code>. У нотатці про квітку виділи слова «не доказ» через <code>em</code>.</p>
<p>Спочатку виконай базовий варіант. Потім можеш змінити назву команди, написати власну коротку справу або підібрати інші читабельні кольори.</p>
<p>У власному варіанті збережи чотири розділи, два види списків, три ілюстровані нотатки та окремий висновок. Зміни текстові описи картинок відповідно до сюжету.</p>

<h2 id="mini-project-1-files">Картинки та локальна робота</h2>
<p>Використай <code>leaf.svg</code>, <code>flower.svg</code> і <code>bird.svg</code>. У розділі «Зображення для завдань» можна вставити картинку або завантажити SVG чи ZIP-комплект.</p>
<p>Для роботи в локальному редакторі розпакуй архів і створи <code>index.html</code> поруч із картинками. Тоді короткі назви в <code>src</code> працюватимуть без змін.</p>
<p>Якщо працюєш у нашому редакторі, завантаження HTML вбудує картинки в документ. Готовий файл відкриватиметься без інтернету.</p>
<p>Завантажуй проміжний результат після кожного етапу. Чернетка в редакторі зберігається лише до виходу зі сторінки або її перезавантаження. Щоб продовжити пізніше, відкрий збережений HTML у редакторі.</p>

<h2 id="mini-project-1-check">Як перевірити проєкт</h2>
<ul>
<li><strong>Зміст:</strong> справу легко зрозуміти, підказки відповідають висновку, заголовки утворюють зрозумілу структуру.</li>
<li><strong>HTML:</strong> пункти списків записані через li, нотатки мають описи alt, важливість strong і наголос em використані за змістом.</li>
<li><strong>CSS:</strong> класи в коді й стилях збігаються, обтікання не переходить до наступної нотатки, текст має читабельний колір.</li>
<li><strong>Готовий файл:</strong> сторінка працює офлайн, у вузькому вікні немає горизонтальної прокрутки, назва вкладки правильна.</li>
</ul>
<p>Поясни вчителю, чому докази записані через ul, план — через ol і навіщо нотаткам потрібен flow-root. Зразок допомагає порівняти структуру; доступні шрифти можуть відрізнятися.</p>
<p>Для повторення відкрий <a href="#/web/html-css/web-review">тему 6 «Повторення: HTML і CSS»</a>. Обтікання й картинки пояснено в <a href="#/web/html-css/page-images">темі 5</a>.</p>

<h2 id="mini-project-1-workshop">Майстерня проєкту</h2>
<p>Почни з порожньої основи документа. Повний готовий код не потрібно переписувати: побудуй сторінку за етапами й перевір себе за умовами.</p>
<div class="web-practice-mount"></div>`,
  },
};
