import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
}

const articleDiagram = `<figure class="web-diagram" aria-labelledby="moon-layout-caption">
<figcaption id="moon-layout-caption">Два класи керують виглядом статті</figcaption>
<div class="web-code-result">
  <div class="web-diagram-card"><h3>Код і вибрані елементи</h3>
    <pre class="web-visual-code"><code>&lt;article class="<mark class="web-tag-match">item left</mark>"&gt;…&lt;/article&gt;
&lt;article class="<mark class="web-tag-match">item right</mark>"&gt;…&lt;/article&gt;</code></pre>
    <p class="web-diagram-note"><code>.item</code> вибирає обидві статті. <code>.right</code> задає зворотний напрямок тільки для другої.</p>
  </div>
  <div class="web-diagram-card"><h3>Порядок на широкому екрані</h3>
    <div class="web-browser-sample" style="display:flex;gap:8px;align-items:center;padding:8px">
      <span style="border:2px solid #0f766e;padding:4px;border-radius:5px">Схема</span><span>Текст 1</span>
    </div>
    <div class="web-browser-sample" style="display:flex;gap:8px;align-items:center;padding:8px;margin-top:8px">
      <span>Текст 2</span><span style="border:2px solid #0f766e;padding:4px;border-radius:5px">Схема</span>
    </div>
    <p class="web-diagram-note">На вузькому екрані обидві статті стають стовпцями. Схема стоїть над текстом.</p>
  </div>
</div>
</figure>`;

export const project4Documents: Record<string, EngineDocument> = {
  'mini-project-4': {
    title: 'Міні-проєкт 4. Десять фактів про Місяць',
    html: `<p>Створи ілюстровану сторінку про Місяць. Кожен факт матиме окремий заголовок, абзац та схему. Тексти для десяти статей є під завданням.</p>
<p>Застосуй семантичні елементи, Flexbox і зовнішній CSS. Анімація ілюстрацій має підтримувати паузу та системне налаштування зменшеного руху.</p>

<h2 id="project4-files">Підготуй файли</h2>
${code('moon-project/\n  index.html\n  style.css\n  moon-01.svg\n  moon-02.svg\n  …\n  moon-10.svg')}
<p>Додай у head посилання на таблицю стилів. Майстерня використовує окрему чернетку для кожного файлу.</p>
${code('<link rel="stylesheet" href="style.css">')}
<p>Завантаж схеми окремо з блоку «Ілюстрації Місяця» або розпакуй moon-images.zip. У локальному редакторі збережи SVG у тій самій папці, що й HTML та CSS.</p>
<p>Наприклад, <code>src="moon-01.svg"</code> шукає першу схему поруч з index.html. Схеми намальовано для вправи. Розміри та відстані на них умовні.</p>

<h2 id="project4-structure">Розміть сторінку</h2>
<ol>
<li>Додай у header заголовок h1 «Десять фактів про Місяць» і короткий вступ.</li>
<li>Створи main з класом articles. Помісти в нього десять article за порядком із завдання.</li>
<li>У кожній статті додай img, потім div з класом fact-text. У div розмісти h2 і абзац.</li>
<li>Опиши зміст кожної схеми в alt. Додай у footer примітку про умовний масштаб.</li>
</ol>
${code('<article class="item left">\n  <img src="moon-01.svg" alt="Світлові промені йдуть від Сонця до Місяця"\n       width="300" height="180">\n  <div class="fact-text">\n    <h2>Звідки береться світло</h2>\n    <p>Місяць відбиває сонячне світло.</p>\n  </div>\n</article>')}
<p>Використовуй article для самостійної нотатки. Кожна з десяти статей має власний заголовок і зрозуміла окремо. Повтори <a href="#/web/html-css/semantic-media">семантичні елементи в темі 23</a>.</p>

<h2 id="project4-layout">Чергуй сторони та перевір вузький екран</h2>
${articleDiagram}
${code('.item { display: flex; align-items: center; gap: 20px; }\n.left { flex-direction: row; }\n.right { flex-direction: row-reverse; }\n.item img { width: 38%; height: auto; }\n.fact-text { flex: 1; min-width: 0; }\n\n@media (max-width: 560px) {\n  .articles .item { flex-direction: column; gap: 12px; }\n  .item img { width: 100%; max-width: 300px; }\n}')}
<p>Додай клас left до першої статті, right до другої. Продовжуй чергування до десятої. <code>row-reverse</code> змінює лише розміщення зображення й тексту, а порядок статей залишається таким, як у HTML.</p>
<p>Правило <code>.articles .item</code> діє до 560 px включно. Воно застосовується до обох класів напрямку. <code>min-width: 0</code> дозволяє текстовому блоку звузитися, а <code>height: auto</code> зберігає пропорції схеми.</p>

<h2 id="project4-motion">Додай керований рух</h2>
${code('.item img { animation: drift 5s ease-in-out infinite; }\n@keyframes drift {\n  0%, 100% { transform: scale(.96) rotate(2deg); }\n  50% { transform: scale(.89) rotate(-2deg); }\n}')}
<p>У середньому кадрі схема трохи менша й повернута в інший бік. Записуй scale і rotate через пробіл у тому самому transform.</p>
<p>Постав прапорець і пов’язаний label перед main. Усі три елементи мають бути прямими нащадками body. Селектор <code>~</code> знаходить main після позначеного прапорця, навіть якщо між ними є label.</p>
${code('<input type="checkbox" class="pause" id="pause">\n<label for="pause">Призупинити рух ілюстрацій</label>\n<main class="articles">…</main>')}
${code('.pause:checked ~ .articles img { animation-play-state: paused; }\n@media (prefers-reduced-motion: reduce) {\n  .item img { animation: none; }\n}')}
<p>Залиши видимий фокус на прапорці. Перейди до нього клавішею Tab і натисни Пробіл. Ілюстрації мають зупинитися, а текст залишитися на місці. Повтори <a href="#/web/html-css/css-animation">налаштування анімації в темі 25</a>.</p>

<h2 id="project4-sources">Звідки взято факти</h2>
<ul>
<li>Відстань, обертання, тяжіння, кратери та полярний лід. <a href="https://science.nasa.gov/moon/facts/">Факти про Місяць від NASA</a>.</li>
<li>Видимість Місяця вдень. <a href="https://science.nasa.gov/moon/top-moon-questions/">Запитання про Місяць від NASA</a>.</li>
<li>Відбите сонячне світло, освітлені ділянки й тривалість циклу фаз. <a href="https://science.nasa.gov/moon/moon-phases/">Фази Місяця від NASA</a>.</li>
<li>Застигла лава в місячних морях. <a href="https://science.nasa.gov/moon/lunar-craters/">Кратери та місячні моря від NASA</a>.</li>
<li>Розріджені частинки біля поверхні. <a href="https://science.nasa.gov/moon/lunar-atmosphere/">Місячна атмосфера від NASA</a>.</li>
<li>Розташування Землі, Сонця й Місяця під час затемнення. <a href="https://science.nasa.gov/moon/eclipses/">Місячні затемнення від NASA</a>.</li>
</ul>

<h2 id="project4-check">Перевір і збережи</h2>
<ol>
<li>Відкрий результат і перевір усі десять заголовків та зображень.</li>
<li>Порівняй широкий екран зі вікном 320 px. На вузькому екрані текст і схеми мають поміститися в один стовпець.</li>
<li>Перевір паузу з клавіатури. Перевір системне налаштування зменшеного руху.</li>
<li>Завантаж HTML і CSS окремо. Збережи їх поруч і відкрий index.html у браузері без мережі.</li>
<li>Щоб продовжити роботу в майстерні, відкрий обидва збережені файли у відповідних полях.</li>
</ol>
<div class="web-practice-mount"></div>`,
  },
};
