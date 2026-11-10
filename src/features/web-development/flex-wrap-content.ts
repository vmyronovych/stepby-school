import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</code></pre>`;
}

export const flexWrapDocuments: Record<string, EngineDocument> = {
  'flex-wrap': {
    title: 'Тема 17. CSS Flexbox: напрямок і перенесення',
    html: `
<p>Тепер навчимося змінювати напрямок, переносити картки на нові рядки й керувати простором між рядками.</p>
<p>Початкові правила контейнера та вирівнювання повтори в <a href="#/web/html-css/flex-basics">темі 16</a>.</p>
<h2 id="flex-wrap-direction">flex-direction визначає головну вісь</h2>
<p><code>row</code> утворює рядок, <code>column</code> — стовпець. Для української сторінки row іде зліва направо, column — згори вниз.</p>
<p><code>row-reverse</code> і <code>column-reverse</code> змінюють напрямок на протилежний. Вони змінюють вигляд, але не порядок HTML.</p>
${code(`.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}`)}
<figure class="web-diagram" aria-labelledby="flex-wrap-axes-caption"><figcaption id="flex-wrap-axes-caption">Ті самі діти, різний напрямок головної осі</figcaption><div class="web-code-result"><div class="web-diagram-card"><h3>row: головна вісь →</h3><div style="display:flex;gap:8px"><div style="border:2px solid #0f766e;padding:12px">A</div><div style="border:2px solid #0f766e;padding:12px">B</div><div style="border:2px solid #0f766e;padding:12px">C</div></div><p class="web-diagram-note">justify-content працює по горизонталі; align-items — по вертикалі.</p></div><div class="web-diagram-card"><h3>column: головна вісь ↓</h3><div style="display:flex;flex-direction:column;align-items:center;gap:8px"><div style="border:2px solid #0f766e;padding:8px">A</div><div style="border:2px solid #0f766e;padding:8px">B</div><div style="border:2px solid #0f766e;padding:8px">C</div></div><p class="web-diagram-note">justify-content працює по вертикалі; align-items — по горизонталі.</p></div></div></figure>
<p>Назви властивостей не означають «завжди горизонтально» або «завжди вертикально». Вони залежать від осей контейнера.</p>
<h2 id="flex-wrap-lines">flex-wrap дозволяє нові рядки</h2>
<p>Початкове значення <code>nowrap</code> залишає одну flex-лінію. Елементи можуть стискатися; якщо цього недостатньо, вміст виходить за межі.</p>
<p><code>wrap</code> дозволяє наступні лінії. У звичайному row картки переходять у нижній рядок, коли ширини бракує.</p>
<p><code>wrap-reverse</code> розташовує нові лінії в протилежному напрямку поперечної осі. Воно не змінює порядок елементів усередині кожного рядка.</p>
${code(`.garden {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.plot { width: 150px; }`)}
<figure class="web-diagram" aria-labelledby="flex-wrap-lines-caption"><figcaption id="flex-wrap-lines-caption">Контейнер шириною 240px: три блоки по 90px потребують переносу</figcaption><div class="web-code-result"><div class="web-diagram-card">${code(`.row { display: flex; flex-wrap: wrap;
  width: 240px; gap: 8px; }
.box { width: 90px; flex: none; }`)}<p><code>flex: none</code> вимикає ріст і стискання. Так легше порівняти wrap та nowrap.</p></div><div class="web-diagram-card"><div style="display:flex;flex-wrap:wrap;width:240px;max-width:100%;gap:8px;border:1px dashed #64748b;padding:4px"><div style="width:90px;flex:none;border:2px solid #0f766e;padding:8px;box-sizing:border-box">A</div><div style="width:90px;flex:none;border:2px solid #0f766e;padding:8px;box-sizing:border-box">B</div><div style="width:90px;flex:none;border:2px solid #0f766e;padding:8px;box-sizing:border-box">C</div></div><p class="web-diagram-note">A і B вміщаються поруч. C починає наступний рядок. Рамка позначає контейнер.</p></div></div></figure>
<p>width за звичайної моделі не включає padding і рамку. <code>box-sizing: border-box</code> включає їх у задані width та height.</p>
<p>Наприклад, блок із width: 70px і border-box займає рівно 70px разом із рамками. Це зручно для навчальних схем.</p>
<h2 id="flex-wrap-content">align-content керує лініями</h2>
<p><code>align-items</code> вирівнює окремі картки всередині їхньої лінії. <code>align-content</code> розподіляє самі лінії вздовж поперечної осі.</p>
<p>Для нашого прикладу потрібні <code>flex-wrap: wrap</code>, кілька рядків і зайве місце по висоті. Якщо місця немає, різницю між center та flex-start не видно.</p>
${code(`.garden {
  display: flex;
  flex-wrap: wrap;
  min-height: 560px;
  align-content: flex-start;
  align-items: flex-end;
  gap: 12px;
}`)}
<ul><li><code>flex-start</code> збирає рядки біля початку поперечної осі.</li><li><code>center</code> збирає рядки в центрі.</li><li><code>flex-end</code> збирає рядки біля кінця.</li><li><code>space-between</code> розподіляє зайве місце між рядками.</li><li><code>space-around</code> додає простір навколо кожного рядка.</li><li><code>stretch</code> розтягує самі лінії за наявності зайвого простору.</li></ul>
<p>У column поперечна вісь горизонтальна. Тому align-content керує розташуванням колонок, а не вертикальним положенням рядків.</p>
<p>Не обмежуй довгий вміст малою фіксованою висотою. min-height дозволяє саду вирости, коли на вузькому екрані з’являється більше рядків.</p>
<h2 id="flex-wrap-reveal">Показ деталі всередині картки</h2>
<p>Селектор <code>.shelter:hover .visitor</code> вибирає visitor усередині shelter, коли вказівник наведено на shelter. Пробіл позначає нащадка.</p>
<p>Додай <code>:focus-within</code>, щоб результат з’являвся також при фокусі на посиланні всередині картки. Сам div не отримує фокус через Tab автоматично.</p>
${code(`<div class="shelter">
  <a href="#visitor-description">Хто живе в саду?</a>
  <img class="visitor" src="rabbit.svg" alt="Кролик">
</div>
<p id="visitor-description">У саду живе вигаданий кролик-мандрівник.</p>
/* CSS */
.visitor { display: none; }
.shelter:hover .visitor,
.shelter:focus-within .visitor { display: block; }`)}
<p><code>display: none</code> прибирає елемент із розкладки та з дерева доступності. Тому важливий опис залишається у видимому абзаці й доступний через посилання.</p>
<p>Не приховуй єдину кнопку чи важливу інструкцію лише за наведенням. На сенсорному екрані посилання теж має вести до зрозумілого опису.</p>
<h2 id="flex-wrap-order">order змінює лише візуальний порядок</h2>
<p>Усі flex-елементи спочатку мають <code>order: 0</code>. Менше число показує елемент раніше. За однакових чисел зберігається порядок HTML.</p>
${code(`<div class="vitrine">
  <div class="card">Листок</div>
  <div class="card">Птах</div>
  <div class="card featured">Квітка</div>
</div>
/* CSS */
.vitrine { display: flex; gap: 12px; }
.featured { order: -1; }`)}
<figure class="web-diagram" aria-labelledby="flex-wrap-order-caption"><figcaption id="flex-wrap-order-caption">.featured вибирає Квітку; order: -1 переміщує її перед елементами з order: 0</figcaption><div class="web-code-result"><div class="web-diagram-card"><h3>Порядок HTML</h3><p>Листок → Птах → <mark class="web-tag-match">Квітка</mark></p><p>Програми озвучення й перехід Tab зазвичай спираються на порядок документа.</p></div><div class="web-diagram-card"><h3>Порядок на екрані</h3><div style="display:flex;flex-wrap:wrap;gap:8px"><div style="border:1px solid #64748b;padding:8px">Листок · 0</div><div style="border:1px solid #64748b;padding:8px">Птах · 0</div><div style="order:-1;border:2px solid #0f766e;padding:8px;background:#ecfdf5">Квітка · −1</div></div><p class="web-diagram-note">Виділена рамка показує елемент featured. HTML залишається тим самим.</p></div></div></figure>
<p>Не змінюй через order логіку інструкцій, навігації або полів форми. Виправляй порядок у HTML, якщо він має значення для читання.</p>
<p>У вправі з order використаємо незалежні інформаційні картки. Для них немає обов’язкової послідовності читання.</p>
<h2 id="flex-wrap-files">Збереження й перевірка</h2>
<p>Малюнки доступні окремими SVG і комплектом ZIP у редакторі. Збережи HTML поруч із файлами ілюстрацій, щоб шляхи на кшталт src="flower.svg" працювали локально.</p>
<p>Завантаж HTML, відкрий його офлайн та перевір перенесення при різній ширині. Щоб продовжити роботу, відкрий збережений HTML через вибір файлу в редакторі.</p>
<h2 id="flex-wrap-practice">Практика: рядки, колонки й порядок</h2>
<p>Перевір кожне нове правило окремо. Змінюй напрямок або перенесення та спостерігай результат. Остання вправа — домашня робота.</p>
<div class="web-practice-mount"></div>`,
  },
};
