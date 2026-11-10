import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</code></pre>`;
}

export const flexBasicsDocuments: Record<string, EngineDocument> = {
  'flex-basics': {
    title: 'Тема 16. CSS Flexbox: основи',
    html: `
<p>Flexbox розміщує елементи в ряд або стовпець. Він допомагає розподілити вільний простір, задати проміжки й вирівняти картки.</p>
<h2 id="flex-basics-container">Контейнер і його елементи</h2>
<p>Додай <code>display: flex</code> до батьківського елемента. Його безпосередні діти стануть flex-елементами. Вкладені заголовки й абзаци автоматично ними не стають.</p>
${code(`<div class="team">
  <div class="member"><h2>Листок</h2><p>Зберігає карту.</p></div>
  <div class="member"><h2>Птах</h2><p>Шукає знаки.</p></div>
</div>
/* CSS */
.team { display: flex; gap: 16px; }`)}
<figure class="web-diagram" aria-labelledby="flex-basics-children-caption"><figcaption id="flex-basics-children-caption">.team вибирає батька; рамки позначають його безпосередніх дітей</figcaption><div class="web-code-result"><div class="web-diagram-card"><h3>Правило</h3><pre class="web-visual-code"><code><mark class="web-tag-match">.team</mark> { display: flex; gap: 16px; }</code></pre><p>Flexbox керує двома картками member. Заголовок і абзац залишаються всередині своєї картки.</p></div><div class="web-diagram-card"><h3>Результат: головна вісь →</h3><div style="display:flex;gap:16px"><div style="flex:1;min-width:0;border:2px solid #0f766e;padding:8px;background:#ecfdf5"><strong>Дитина 1</strong><p>Листок</p></div><div style="flex:1;min-width:0;border:2px solid #0f766e;padding:8px;background:#ecfdf5"><strong>Дитина 2</strong><p>Птах</p></div></div><p class="web-diagram-note">Проміжок між рамками — gap. Він не додає відступу біля зовнішнього краю.</p></div></div></figure>
<h2 id="flex-basics-axes">Дві осі</h2>
<p>За замовчуванням <code>flex-direction: row</code> розташовує елементи вздовж головної осі. Для українського тексту це напрямок зліва направо.</p>
<p>Поперечна вісь перпендикулярна до головної. У звичайному рядку вона проходить зверху вниз. У наступній темі навчимося змінювати напрямок.</p>
<h2 id="flex-basics-justify">justify-content: простір уздовж головної осі</h2>
<p><code>justify-content</code> розподіляє вільне місце вздовж головної осі. Властивість записуй на контейнері.</p>
<ul><li><code>flex-start</code> збирає елементи біля початку осі.</li><li><code>center</code> збирає групу в центрі.</li><li><code>flex-end</code> збирає групу біля кінця.</li><li><code>space-between</code> залишає однакові проміжки між сусідами, без зовнішніх проміжків.</li><li><code>space-around</code> дає кожному елементу однаковий простір з обох боків. Між сусідами ці частини додаються.</li><li><code>space-evenly</code> робить усі проміжки однаковими, включно з крайніми.</li></ul>
${code(`.row { display: flex; justify-content: space-between; gap: 12px; }`)}
<p>Якщо елементи вже зайняли всю ширину, вільного місця для розподілу немає. gap усе одно задає мінімальні проміжки.</p>
<h2 id="flex-basics-align">align-items: положення на поперечній осі</h2>
<p><code>align-items</code> вирівнює елементи всередині кожного flex-рядка. Для звичайного горизонтального рядка center вирівнює вертикальні центри.</p>
<ul><li><code>flex-start</code> — біля початку поперечної осі.</li><li><code>center</code> — посередині поперечної осі.</li><li><code>flex-end</code> — біля кінця поперечної осі.</li><li><code>stretch</code> — розтягує елементи з автоматичним поперечним розміром. Це звичайна поведінка.</li><li><code>baseline</code> — суміщає базові лінії тексту.</li></ul>
<figure class="web-diagram" aria-labelledby="flex-basics-align-caption"><figcaption id="flex-basics-align-caption">align-items: center — центри різних за висотою блоків лежать на одній лінії</figcaption><div class="web-code-result"><div class="web-diagram-card">${code(`.row {
  display: flex;
  min-height: 160px;
  justify-content: center;
  align-items: center;
  gap: 16px;
}`)}</div><div class="web-diagram-card"><div style="display:flex;min-height:160px;justify-content:center;align-items:center;gap:16px;border:1px dashed #64748b"><div style="border:2px solid #0f766e;padding:8px;background:#ecfdf5">Короткий</div><div style="border:2px solid #0f766e;padding:8px;background:#ecfdf5">Вищий<br>блок<br>із текстом</div></div><p class="web-diagram-note">Додаткова висота контейнера робить вертикальне вирівнювання помітним.</p></div></div></figure>
<h2 id="flex-basics-size">Рівні частини: flex: 1</h2>
<p><code>flex: 1</code> записуй на дочірніх елементах. Вони можуть рости й стискатися та отримують однакову частку доступного місця.</p>
<p>Однакові рамки й padding допомагають отримати однакові зовнішні розміри. Довге слово або мінімальна ширина можуть завадити стисканню.</p>
${code(`.gallery { display: flex; gap: 8px; }
.sign { flex: 1; min-width: 0; }
.sign img { width: 100px; max-width: 100%; height: auto; }`)}
<p><code>min-width: 0</code> дозволяє flex-елементу стиснутися менше за природну ширину вмісту. Картинка теж потребує max-width: 100%.</p>
<p>Коли картки повинні зберігати читабельну ширину, задай їм min-width, а контейнеру — <code>overflow-x: auto</code>. У наступній темі замінимо прокрутку переносом.</p>
<h2 id="flex-basics-viewport">Центрування у високому контейнері</h2>
<p><code>1vh</code> дорівнює одному відсотку висоти області перегляду, <code>1vw</code> — одному відсотку її ширини. 100vh відповідає повній висоті.</p>
<p>Для блока з текстом частіше зручно min-height: 100vh. Він займає щонайменше висоту вікна й може вирости разом із вмістом.</p>
${code(`.stage {
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}`)}
<p>Центрування не фіксує елемент на екрані. Під час прокрутки він рухається разом зі сторінкою. На мобільних панелі браузера можуть змінювати видиму висоту.</p>
<p>Для ширини звичайного контейнера використовуй width: 100% від батька. 100vw разом із рамками, padding або смугою прокрутки може створити переповнення.</p>
<h2 id="flex-basics-files">Малюнки й локальна робота</h2>
<p>Використовуй ілюстрації з розділу редактора. Завантаж окремі SVG або ZIP. Розмісти index.html поруч із flower.svg, leaf.svg, bird.svg і rabbit.svg.</p>
<p>Шлях src="leaf.svg" означає файл у тій самій папці. Завантаж готовий HTML через кнопку редактора. Для продовження відкрий збережений HTML через вибір файлу в редакторі.</p>
<h2 id="flex-basics-practice">Практика: галерея й картки</h2>
<p>Спочатку створи вкладені елементи, потім увімкни Flexbox на потрібному батькові. Останнє завдання виконай удома.</p>
<div class="web-practice-mount"></div>`,
  },
};
