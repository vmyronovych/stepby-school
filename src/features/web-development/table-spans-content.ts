import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</code></pre>`;
}

const colspanDiagram = `
<figure class="web-diagram" aria-labelledby="table-spans-columns-caption"><figcaption id="table-spans-columns-caption">colspan="2": одна клітинка займає дві позиції по горизонталі</figcaption><div class="web-code-result">
<div class="web-diagram-card"><h3>HTML: сітка з трьох стовпців</h3><pre class="web-visual-code"><code>&lt;tr&gt;
  &lt;td&gt;A&lt;/td&gt;&lt;td&gt;B&lt;/td&gt;&lt;td&gt;C&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
  &lt;td <mark class="web-tag-match">colspan="2"</mark>&gt;A + B&lt;/td&gt;
  &lt;td&gt;C&lt;/td&gt;
&lt;/tr&gt;</code></pre><p class="web-diagram-note">У другому рядку лише два теги td, але вони займають три позиції: 2 + 1.</p></div>
<div class="web-diagram-card"><h3>Результат</h3><div class="web-browser-sample"><table style="width:100%;border-collapse:collapse"><tbody><tr><td style="border:1px solid #64748b;padding:12px">A</td><td style="border:1px solid #64748b;padding:12px">B</td><td style="border:1px solid #64748b;padding:12px">C</td></tr><tr><td colspan="2" style="border:2px solid #0f766e;padding:12px;background:#ccfbf1">A + B</td><td style="border:1px solid #64748b;padding:12px">C</td></tr></tbody></table></div><p class="web-diagram-note">Не додавай ще одну порожню клітинку в зайняту позицію.</p></div></div></figure>`;

const rowspanDiagram = `
<figure class="web-diagram" aria-labelledby="table-spans-rows-caption"><figcaption id="table-spans-rows-caption">rowspan="2": клітинка займає позицію у двох рядках</figcaption><div class="web-code-result">
<div class="web-diagram-card"><h3>HTML</h3><pre class="web-visual-code"><code>&lt;tr&gt;
  &lt;td <mark class="web-tag-match">rowspan="2"</mark>&gt;Група&lt;/td&gt;
  &lt;td&gt;Квітка&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
  &lt;td&gt;Листок&lt;/td&gt;
&lt;/tr&gt;</code></pre><p class="web-diagram-note">У другому tr немає клітинки для назви групи: її позиція вже зайнята зверху.</p></div>
<div class="web-diagram-card"><h3>Результат</h3><div class="web-browser-sample"><table style="width:100%;border-collapse:collapse"><tbody><tr><td rowspan="2" style="border:2px solid #0f766e;padding:12px;background:#ccfbf1">Група</td><td style="border:1px solid #64748b;padding:12px">Квітка</td></tr><tr><td style="border:1px solid #64748b;padding:12px">Листок</td></tr></tbody></table></div><p class="web-diagram-note">Одна назва стосується обох рядків. У таблиці залишаються два стовпці.</p></div></div></figure>`;

export const tableSpansDocuments: Record<string, EngineDocument> = {
  'table-spans': {
    title: 'Тема 11. Таблиці: об’єднання клітинок',
    html: `
<p>Навчимося робити спільні клітинки для підсумків і груп. Спочатку намалюй сітку: кожна позиція повинна належати рівно одній клітинці.</p>
<p>Будову таблиці й заголовки повтори в <a href="#/web/html-css/tables-basics">темі 10</a>. Об’єднання змінює кількість зайнятих позицій, а не кількість даних у твоєму списку.</p>
<h2 id="table-spans-columns">Об’єднання стовпців: colspan</h2>
<p>Атрибут <code>colspan</code> у td або th задає кількість стовпців, які займає клітинка. Значення <code>2</code> означає дві позиції замість однієї.</p>
${colspanDiagram}
<p>Для підсумку зручно об’єднати назву в перших стовпцях, а число залишити в останньому.</p>
${code(`<tfoot>
  <tr><th colspan="2" scope="row">Разом</th><td>180 грн</td></tr>
</tfoot>`)}
<h2 id="table-spans-rows">Об’єднання рядків: rowspan</h2>
<p>Атрибут <code>rowspan</code> задає кількість рядків, які займає клітинка. Починай її в першому рядку групи.</p>
${rowspanDiagram}
<p>Не записуй ще одну клітинку на місці, зайнятому rowspan. Інакше браузер може утворити зайвий стовпець.</p>
<p>Rowspan не повинен переходити з одного tbody до іншого. Розміщуй усі рядки однієї групи в одному tbody.</p>
<h2 id="table-spans-groups">Назви груп і доступність</h2>
<p>Для назви групи рядків використай th із <code>scope="rowgroup"</code>. Окремий tbody визначає, які рядки належать цій групі.</p>
${code(`<tbody>
  <tr>
    <th rowspan="2" scope="rowgroup">Рослини</th>
    <th scope="row">Квітка</th><td>flower.svg</td>
  </tr>
  <tr><th scope="row">Листок</th><td>leaf.svg</td></tr>
</tbody>`)}
<p>Тут «Рослини» пояснює всю групу, а «Квітка» й «Листок» — окремі рядки. Не використовуй об’єднання лише для декоративної форми.</p>
<p>Для складних багаторівневих заголовків потрібні додаткові зв’язки між заголовками й даними. У цих вправах залишимо прості заголовки стовпців та зрозумілі групи рядків.</p>
<h2 id="table-spans-both">Обидва атрибути в одній клітинці</h2>
<p>Клітинка може займати кілька позицій і по горизонталі, і по вертикалі. Значення 2 та 2 утворюють прямокутник із чотирьох позицій.</p>
${code(`<tr>
  <td rowspan="2" colspan="2">Спільний блок</td><td>A</td>
</tr>
<tr><td>B</td></tr>`)}
<figure class="web-diagram" aria-labelledby="table-spans-both-caption"><figcaption id="table-spans-both-caption">Сітка 3 × 2: спільний блок займає 2 × 2 позиції</figcaption><div class="web-browser-sample"><table style="width:100%;border-collapse:collapse"><tbody><tr><td rowspan="2" colspan="2" style="width:66%;border:2px solid #0f766e;padding:18px;background:#ccfbf1">Спільний блок<br>2 стовпці × 2 рядки</td><td style="border:1px solid #64748b;padding:14px">A</td></tr><tr><td style="border:1px solid #64748b;padding:14px">B</td></tr></tbody></table></div></figure>
<p>Перевір кожен рядок сітки. У прикладі перші дві позиції другого рядка зайняті спільним блоком, тому там залишається лише td з літерою B.</p>
<h2 id="table-spans-spacing">Внутрішні відступи та проміжки</h2>
<p><code>padding</code> на th і td задає простір усередині клітинки. <code>border-spacing</code> на table задає проміжки між сусідніми клітинками.</p>
${code(`table { border-collapse: separate; border-spacing: 8px; }
th, td { border: 2px solid #64748b; padding: 10px; }`)}
<p><code>border-collapse: separate</code> залишає рамки окремими. При <code>collapse</code> сусідні рамки стають спільними, а border-spacing не створює проміжків.</p>
<p>Для цих відступів використовуй CSS замість застарілих атрибутів cellpadding і cellspacing. Для центрування тексту використовуй text-align; для центрування таблиці меншої ширини — margin-inline: auto.</p>
<h2 id="table-spans-check">Перевірка сітки</h2>
<ol><li>Визнач загальну кількість стовпців.</li><li>Познач усі клітинки з colspan і rowspan.</li><li>У кожному наступному рядку врахуй позиції, зайняті зверху.</li><li>Перевір, що клітинки не накладаються й не залишають випадкових порожніх позицій.</li><li>Перевір заголовки, підсумки та доступ до правих стовпців у вузькому вікні.</li></ol>
<p>Зображення бери з матеріалів редактора. Для роботи локально завантаж SVG або ZIP і створи index.html поруч із картинками.</p>
<h2 id="table-spans-practice">Практика: підсумки та групи</h2>
<p>Почни з таблиці без CSS і перевір сітку. Потім додай фони, рамки й відступи. Остання вправа — домашня робота.</p>
<div class="web-practice-mount"></div>`,
  },
};
