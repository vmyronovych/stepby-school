import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  const escaped = source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return `<pre class="web-code"><code>${escaped}</code></pre>`;
}

const classDiagram = `
<figure class="web-diagram" aria-labelledby="css-intro-class-caption">
  <figcaption id="css-intro-class-caption">Один клас об’єднує різні елементи</figcaption>
  <div class="web-selector-flow">
    <div class="web-diagram-card web-flow-step">
      <h3>1. Правило CSS</h3>
      <pre class="web-visual-code"><code><mark class="web-tag-match">.tip</mark> {
  color: darkgreen;
}</code></pre>
      <p class="web-diagram-note">Крапка означає: шукай клас tip.</p>
      <span class="web-flow-arrow" aria-hidden="true">→</span>
    </div>
    <div class="web-diagram-card web-flow-step">
      <h3>2. Пошук класу в HTML</h3>
      <div class="web-html-line web-element-match"><code>&lt;h2 class="<mark class="web-tag-match">tip</mark>"&gt;Порада&lt;/h2&gt;</code><small>Збіг: h2 має клас tip</small></div>
      <div class="web-html-line web-element-match"><code>&lt;p class="<mark class="web-tag-match">tip</mark>"&gt;Збережи файл.&lt;/p&gt;</code><small>Збіг: p також має клас tip</small></div>
      <div class="web-html-line"><code>&lt;p&gt;Готово!&lt;/p&gt;</code><small>Класу tip немає — не вибрано</small></div>
      <span class="web-flow-arrow" aria-hidden="true">→</span>
    </div>
    <div class="web-diagram-card">
      <h3>3. Результат у браузері</h3>
      <div class="web-browser-sample">
        <div style="font-size:24px;font-weight:bold;color:darkgreen">Порада</div>
        <p style="color:darkgreen">Збережи файл.</p>
        <p style="color:black">Готово!</p>
      </div>
      <p class="web-diagram-note">Клас вибирає і заголовок, і абзац. Звичайний абзац лишається чорним.</p>
    </div>
  </div>
</figure>`;

const fontDiagram = `
<figure class="web-diagram" aria-labelledby="css-intro-font-caption">
  <figcaption id="css-intro-font-caption">Три властивості шрифту</figcaption>
  <div class="web-code-result">
    <div class="web-diagram-card">
      <h3>CSS</h3>
      <pre class="web-visual-code"><code>.message {
  font-family: Georgia, serif;
  font-size: 24px;
  font-weight: 700;
}</code></pre>
      <p class="web-diagram-note">Сімейство → розмір → насиченість.</p>
    </div>
    <div class="web-diagram-card">
      <h3>Результат</h3>
      <div class="web-browser-sample"><div style="font-family:Georgia,serif;font-size:24px;font-weight:700">Моя вебмайстерня</div></div>
      <p class="web-diagram-note">Вигляд залежить від шрифтів на пристрої. Якщо Georgia недоступна, браузер добирає шрифт із засічками.</p>
    </div>
  </div>
</figure>`;

const fontComparison = `
<figure class="web-diagram" aria-labelledby="css-intro-compare-caption">
  <figcaption id="css-intro-compare-caption">Змінюємо по одній властивості</figcaption>
  <div class="web-selector-flow">
    <div class="web-diagram-card">
      <h3>Сімейство</h3>
      <div class="web-browser-sample">
        <small>Arial, sans-serif</small><p style="font-family:Arial,sans-serif;font-size:20px">Абетка</p>
        <small>Georgia, serif</small><p style="font-family:Georgia,serif;font-size:20px">Абетка</p>
        <small>"Courier New", monospace</small><p style="font-family:'Courier New',monospace;font-size:20px">Абетка</p>
      </div>
      <p class="web-diagram-note">Розмір однаковий: 20px. Форма літер різна.</p>
    </div>
    <div class="web-diagram-card">
      <h3>Розмір</h3>
      <div class="web-browser-sample" style="font-family:Arial,sans-serif">
        <small>16px</small><p style="font-size:16px">Абетка</p>
        <small>24px</small><p style="font-size:24px">Абетка</p>
        <small>32px</small><p style="font-size:32px">Абетка</p>
      </div>
      <p class="web-diagram-note">Той самий шрифт. Літери стають більшими.</p>
    </div>
    <div class="web-diagram-card">
      <h3>Насиченість</h3>
      <div class="web-browser-sample" style="font-family:Arial,sans-serif">
        <small>400 — normal</small><p style="font-size:24px;font-weight:400">Абетка</p>
        <small>700 — bold</small><p style="font-size:24px;font-weight:700">Абетка</p>
      </div>
      <p class="web-diagram-note">Розмір однаковий: 24px. Штрихи стають товстішими.</p>
    </div>
  </div>
</figure>`;

export const cssIntroDocuments: Record<string, EngineDocument> = {
  'css-intro': {
    title: 'Тема 3. Вступ до CSS',
    html: `
<p>Навчимося давати елементам класи та керувати шрифтами. Так можна оформлювати окремі частини сторінки, не змінюючи всі абзаци одразу.</p>
<p>Як записувати правила в <code>&lt;style&gt;</code>, пояснює <a href="#/web/html-css/text-formatting">тема «Форматування тексту»</a>.</p>

<h2 id="css-intro-class">Атрибут class і селектор класу</h2>
<p><code>class</code> — атрибут HTML. Він додає елементу назву класу. Одну назву можуть мати кілька елементів.</p>
${code(`<h2 class="tip">Порада</h2>
<p class="tip">Збережи файл.</p>
<p>Готово!</p>`)}
<p>У CSS селектор класу починається з крапки. <code>.tip</code> вибирає всі елементи з класом <code>tip</code>, незалежно від назви тега.</p>
${classDiagram}
<p>У HTML пиши <code>class="tip"</code>, а в CSS — <code>.tip</code>. Крапка належить селектору CSS, а не назві класу.</p>
<p>Назви класів чутливі до регістру: <code>tip</code> і <code>Tip</code> — різні класи. Для навчальних робіт вибирай прості змістовні назви латиницею, наприклад <code>game-title</code> або <code>note</code>.</p>

<h2 id="css-intro-multiple">Кілька класів для одного елемента</h2>
<p>Розділяй назви класів пробілами. Елемент із <code>class="tip large"</code> має два класи: <code>tip</code> і <code>large</code>.</p>
${code(`.tip {
  color: darkgreen;
}
.large {
  font-size: 24px;
}`)}
<p>Запиши ці правила в <code>&lt;style&gt;</code>. Додай у <code>&lt;body&gt;</code> абзац із двома класами:</p>
${code('<p class="tip large">Збережи свою роботу.</p>')}
<p>Обидва правила діють разом: текст темно-зелений і має розмір 24px.</p>

<h2 id="css-intro-priority">Як вибрати між двома правилами</h2>
<p>Кілька правил можуть задавати ту саму властивість одному елементу. Порівняй селектор тега <code>p</code> і селектор класу <code>.tip</code>.</p>
${code(`.tip { color: darkgreen; }
p { color: navy; }`)}
<p>Абзац із класом <code>tip</code> буде темно-зеленим. Селектор класу має вищу специфічність, ніж селектор тега, навіть якщо правило для тега записане пізніше.</p>
<p>У цих прикладах порівнюємо звичайні правила з одного <code>&lt;style&gt;</code>, без <code>!important</code>.</p>
<p>Якщо специфічність однакова, у таких правилах перемагає пізніше оголошення.</p>
${code(`.tip { color: navy; }
.tip { color: darkgreen; }`)}
<p>Результат знову темно-зелений. Порядок назв у <code>class="tip large"</code> не визначає, яке правило переможе.</p>

<h2 id="css-intro-family">Сімейство шрифтів: font-family</h2>
<p><code>font-family</code> задає список шрифтів за пріоритетом. Браузер шукає доступний варіант, починаючи з першого.</p>
${code(`.note {
  font-family: "Trebuchet MS", Arial, sans-serif;
}`)}
<p>Якщо першого шрифту немає, браузер пробує наступний. Назву з пробілами бери в лапки. Завершуй список загальним сімейством без лапок.</p>
<ul>
<li><code>serif</code> — шрифт із засічками.</li>
<li><code>sans-serif</code> — шрифт без засічок.</li>
<li><code>monospace</code> — шрифт з однаковою шириною символів.</li>
</ul>
<p>Конкретні шрифти доступні не на всіх пристроях. Назва у CSS сама не встановлює шрифт. У цих завданнях використовуємо локальні шрифти та запасне загальне сімейство.</p>

<h2 id="css-intro-size">Розмір тексту: font-size</h2>
<p><code>font-size</code> задає розмір шрифту. Значення <code>24px</code> означає 24 CSS-пікселі, а не висоту кожної літери.</p>
<p>Одиниця <code>rem</code> залежить від розміру шрифту кореневого елемента <code>html</code>, а не батьківського елемента.</p>
${code(`html { font-size: 20px; }
.note { font-size: 1.5rem; }`)}
<p>У цьому прикладі <code>1.5rem</code> дорівнює 30px: 1,5 × 20. Без явного налаштування базовий розмір залежить від браузера й вибору користувача. Не вважай його завжди рівним 16px.</p>

<h2 id="css-intro-weight">Насиченість: font-weight</h2>
<p><code>font-weight</code> керує насиченістю шрифту. <code>normal</code> відповідає 400, а <code>bold</code> — 700.</p>
<p>Числові значення можуть бути від 1 до 1000. Не кожен шрифт має всі ці варіанти: браузер використовує доступну насиченість, а вигляд залежить від підтримки шрифту.</p>
${fontDiagram}
${fontComparison}
<p>Візуально жирний текст не завжди є важливим за змістом. Для важливості використовуй <code>&lt;strong&gt;</code>, а для оформлення класу — CSS.</p>

<h2 id="css-intro-example">Поєднаємо властивості</h2>
${code(`<style>
  h1 {
    text-align: center;
    font-family: Arial, sans-serif;
  }
  .note {
    color: darkgreen;
    font-family: Georgia, serif;
    font-size: 24px;
    font-weight: 700;
  }
</style>`)}
${code(`<h1>Моя вебмайстерня</h1>
<p class="note">Мій наступний крок — власна сторінка.</p>`)}
<p>Помісти <code>&lt;style&gt;</code> у <code>&lt;head&gt;</code>, а заголовок і абзац — у <code>&lt;body&gt;</code>. Для вирівнювання застосовуй CSS <code>text-align</code>.</p>
<p>Рівень заголовка визначай за змістом розділу. Розмір і сімейство шрифту змінюй окремо через CSS.</p>
<p>Щоб дати кільком видам елементів спільні стилі, розділи селектори комами:</p>
${code('h1, h2, h3, p { text-align: center; }')}

<h2 id="css-intro-practice">Практика: класи й шрифти</h2>
<p>Знайди відповідність між назвами класів у HTML і селекторами CSS. Потім порівняй кольори, розміри й насиченість зі зразком.</p>
<p>Невелика різниця форми літер на іншому пристрої можлива. Перевір також код і список умов. Завантаж готовий HTML, щоб зберегти роботу.</p>
<div class="web-practice-mount"></div>`,
  },
};
