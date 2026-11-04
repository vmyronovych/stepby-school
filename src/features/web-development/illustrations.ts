/** Trusted lesson diagrams. Text stays selectable and readable at narrow widths. */
export const selectorIllustration = `
<figure class="web-diagram" aria-labelledby="web-selector-caption">
  <figcaption id="web-selector-caption">Як селектор знаходить елементи</figcaption>
  <div class="web-selector-flow">
    <div class="web-diagram-card web-flow-step">
      <h3>1. Правило CSS</h3>
      <pre class="web-visual-code"><code><mark class="web-tag-match">p</mark> {
  color: navy;
}</code></pre>
      <dl class="web-rule-parts">
        <dt><code>p</code></dt><dd>Кого вибрати? Усі елементи p.</dd>
        <dt><code>color</code></dt><dd>Що змінити? Колір тексту.</dd>
        <dt><code>navy</code></dt><dd>Який колір? Темно-синій.</dd>
      </dl>
      <span class="web-flow-arrow" aria-hidden="true">→</span>
    </div>
    <div class="web-diagram-card web-flow-step">
      <h3>2. Пошук у HTML</h3>
      <div class="web-html-line"><code>&lt;h1&gt;Моя сторінка&lt;/h1&gt;</code><small>h1 — інша назва, не вибрано</small></div>
      <div class="web-html-line web-element-match"><code><mark class="web-tag-match">&lt;p&gt;</mark>Перший абзац.<mark class="web-tag-match">&lt;/p&gt;</mark></code><small>Збіг із селектором p</small></div>
      <div class="web-html-line web-element-match"><code><mark class="web-tag-match">&lt;p&gt;</mark>Другий абзац.<mark class="web-tag-match">&lt;/p&gt;</mark></code><small>Ще один збіг із p</small></div>
      <span class="web-flow-arrow" aria-hidden="true">→</span>
    </div>
    <div class="web-diagram-card">
      <h3>3. Результат у браузері</h3>
      <div class="web-browser-sample">
        <div class="web-sample-heading">Моя сторінка</div>
        <p class="web-sample-navy">Перший абзац.</p>
        <p class="web-sample-navy">Другий абзац.</p>
      </div>
      <p class="web-diagram-note">Обидва абзаци стали темно-синіми. Це правило не вибирає h1.</p>
    </div>
  </div>
  <p class="web-diagram-note">Назва селектора p збігається з назвою елемента. У CSS її пишемо без кутових дужок. Текст HTML залишається тим самим.</p>
</figure>`;

export const emphasisIllustration = `
<figure class="web-diagram" aria-labelledby="web-emphasis-caption">
  <figcaption id="web-emphasis-caption">Код і його відображення</figcaption>
  <div class="web-code-result">
    <div class="web-diagram-card"><h3>HTML</h3><code>&lt;strong&gt;Важливо!&lt;/strong&gt;<br>&lt;em&gt;Спробуй сам.&lt;/em&gt;</code></div>
    <div class="web-diagram-card"><h3>Результат</h3><div class="web-browser-sample"><strong>Важливо!</strong><br><em>Спробуй сам.</em></div></div>
  </div>
  <p class="web-diagram-note">strong передає важливість, em — наголос. Тут показано їхній звичний вигляд без додаткового CSS.</p>
</figure>`;

export const indicesIllustration = `
<figure class="web-diagram" aria-labelledby="web-indices-caption">
  <figcaption id="web-indices-caption">Де опиниться індекс?</figcaption>
  <div class="web-code-result">
    <div class="web-diagram-card"><h3>Верхній: sup</h3><code>5&lt;sup&gt;2&lt;/sup&gt;</code><div class="web-index-result">5<sup>2</sup></div><p class="web-diagram-note">Цифра 2 над рядком — показник степеня.</p></div>
    <div class="web-diagram-card"><h3>Нижній: sub</h3><code>H&lt;sub&gt;2&lt;/sub&gt;O</code><div class="web-index-result">H<sub>2</sub>O</div><p class="web-diagram-note">Цифра 2 під рядком — індекс у формулі.</p></div>
  </div>
</figure>`;

export const alignmentIllustration = `
<figure class="web-diagram" aria-labelledby="web-alignment-caption">
  <figcaption id="web-alignment-caption">Той самий блок, різне вирівнювання</figcaption>
  <div class="web-alignment-samples">
    <div><code>text-align: left;</code><div class="web-alignment-box web-align-left">Моя сторінка</div></div>
    <div><code>text-align: center;</code><div class="web-alignment-box web-align-center">Моя сторінка</div></div>
    <div><code>text-align: right;</code><div class="web-alignment-box web-align-right">Моя сторінка</div></div>
  </div>
  <p class="web-diagram-note">Рамки однакові за шириною. Змінюється положення тексту всередині, а не положення блоку.</p>
</figure>`;
