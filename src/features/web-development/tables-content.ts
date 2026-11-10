import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</code></pre>`;
}

const structureDiagram = `
<figure class="web-diagram" aria-labelledby="tables-basics-structure-caption">
<figcaption id="tables-basics-structure-caption">Рядки містять клітинки; заголовки пояснюють дані</figcaption>
<div class="web-code-result">
<div class="web-diagram-card"><h3>HTML</h3><pre class="web-visual-code"><code>&lt;table&gt;
  &lt;caption&gt;Матеріали&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th scope="col"&gt;Назва&lt;/th&gt;
      &lt;th scope="col"&gt;Кількість&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    <mark class="web-tag-match">&lt;tr&gt;</mark>
      &lt;th scope="row"&gt;Блокнот&lt;/th&gt;
      &lt;td&gt;3&lt;/td&gt;
    <mark class="web-tag-match">&lt;/tr&gt;</mark>
  &lt;/tbody&gt;
&lt;/table&gt;</code></pre></div>
<div class="web-diagram-card"><h3>Результат</h3><div class="web-browser-sample"><table style="width:100%;border-collapse:collapse"><caption>Матеріали</caption><thead><tr><th scope="col" style="border:1px solid #64748b;padding:8px">Назва</th><th scope="col" style="border:1px solid #64748b;padding:8px">Кількість</th></tr></thead><tbody><tr><th scope="row" style="border:2px solid #0f766e;padding:8px;background:#ecfdf5">Блокнот</th><td style="border:2px solid #0f766e;padding:8px;background:#ecfdf5">3</td></tr></tbody></table></div><p class="web-diagram-note">Виділений tr створює один рядок: назва «Блокнот» і значення 3. Рамки тут додано через CSS.</p></div>
</div></figure>`;

export const tablesDocuments: Record<string, EngineDocument> = {
  'tables-basics': {
    title: 'Тема 10. Таблиці: основи',
    html: `
<p>Таблиця показує дані, які зручно порівнювати за рядками й стовпцями: розклад, каталог або результати спостережень.</p>
<p>Не використовуй таблицю лише для розміщення частин сторінки. Її клітинки мають утворювати зрозумілі зв’язки між даними.</p>
<h2 id="tables-basics-structure">З чого складається таблиця</h2>
<ul><li><code>table</code> об’єднує всю таблицю.</li><li><code>tr</code> створює рядок.</li><li><code>td</code> містить дані однієї клітинки.</li><li><code>th</code> містить заголовок клітинки: назву стовпця або рядка.</li><li><code>caption</code> дає назву всій таблиці. Розмісти його першим усередині table.</li></ul>
<p>Усередині <code>tr</code> записуй клітинки <code>th</code> і <code>td</code>. Текст, зображення й посилання розміщуй уже в цих клітинках.</p>
${structureDiagram}
<h2 id="tables-basics-headings">Заголовки та групи рядків</h2>
<p><code>thead</code> об’єднує рядки заголовків, <code>tbody</code> — основні дані. Для підсумку можна використати <code>tfoot</code>.</p>
<p>Атрибут <code>scope="col"</code> у th означає заголовок стовпця. <code>scope="row"</code> означає заголовок рядка. Це допомагає програмам озвучення пов’язати дані з назвами.</p>
<p>Не замінюй th на td лише заради кольору або жирного шрифту. Спочатку визнач призначення клітинки, потім налаштуй CSS.</p>
${code(`<thead>
  <tr><th scope="col">Матеріал</th><th scope="col">Кількість</th></tr>
</thead>
<tbody>
  <tr><th scope="row">Блокнот</th><td>3</td></tr>
</tbody>
<tfoot>
  <tr><th scope="row">Усього</th><td>3</td></tr>
</tfoot>`)}
<p>Без об’єднань кожен рядок має однакову кількість клітинок. Якщо заголовків чотири, кожен рядок даних теж повинен мати чотири клітинки.</p>
<h2 id="tables-basics-style">Рамки, відступи та фони</h2>
${code(`table {
  width: 100%;
  border-collapse: collapse;
  margin-inline: auto;
}
th, td {
  border: 2px solid #64748b;
  padding: 10px;
  text-align: center;
}
th { background-color: #e0f2fe; }
caption { font-size: 24px; font-weight: bold; }`)}
<p>Селектор <code>th, td</code> через кому застосовує одне правило до двох видів клітинок. Рамка table сама по собі не створює рамки всередині таблиці.</p>
<p><code>border-collapse: collapse</code> робить сусідні рамки спільними. <code>padding</code> залишає простір між рамкою та вмістом клітинки.</p>
<p><code>text-align</code> вирівнює текст усередині клітинок. <code>margin-inline: auto</code> центрує саму таблицю, якщо її ширина менша за ширину контейнера.</p>
<p>Клас можна додати до tr, щоб змінити фон усього рядка. Якщо клітинка має власний фон, він перекриє фон рядка.</p>
${code(`.flower-row { background-color: #fff1f2; }
/* Заголовок рядка показує колір свого tr. */
tbody th { background-color: transparent; }`)}
<p><code>tbody th</code> — селектор нащадка: він вибирає всі th усередині tbody. Пробіл між назвами задає цей зв’язок.</p>
<p>Якщо колір позначає вибір, додай ще слово або символ. Не передавай значення лише кольором.</p>
<h2 id="tables-basics-media">Зображення та посилання в клітинках</h2>
${code(`<td><img src="flower.svg" alt="Наліпка з квіткою"></td>
<td><a href="#details">Опис серії</a></td>`)}
<p>Для img задай доречний alt, помірну ширину й <code>height: auto</code>. Посилання додавай звичайним a всередині клітинки.</p>
<p>Ілюстрації можна вставити або завантажити в розділі «Зображення для завдань». Для локального редактора створи index.html поруч із розпакованими SVG.</p>
<h2 id="tables-basics-narrow">Широка таблиця на вузькому екрані</h2>
<p>Не зменшуй текст до нечитабельного розміру. Обгорни таблицю в div і дозволь прокручувати саме цей контейнер.</p>
${code(`<div class="table-scroll">
  <table>…</table>
</div>`)}
${code(`.table-scroll { max-width: 100%; overflow-x: auto; }
table { width: 100%; min-width: 660px; }`)}
<p><code>min-width</code> задає найменшу ширину. <code>overflow-x: auto</code> додає горизонтальну прокрутку, коли вміст ширший за контейнер.</p>
<p>Застарілі атрибути align, border і cellpadding не потрібні: використовуй CSS. Розмір і колір шрифту повтори в <a href="#/web/html-css/css-intro">темі 3</a>.</p>
<h2 id="tables-basics-practice">Практика: порівняння та каталоги</h2>
<p>Спочатку порахуй стовпці й запиши заголовки. Потім додай дані, рамки й кольори. Остання вправа — домашня робота.</p>
<div class="web-practice-mount"></div>`,
  },
};
