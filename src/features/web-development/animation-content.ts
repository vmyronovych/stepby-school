import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</code></pre>`;
}

const framesDiagram = `<figure class="web-diagram" aria-labelledby="animation-frames-caption">
<figcaption id="animation-frames-caption">Кадри задають крайні стани; браузер обчислює проміжні</figcaption>
<div class="web-code-result"><div class="web-diagram-card"><h3>Правило → вибраний елемент</h3><pre class="web-visual-code"><code>&lt;div class="<mark class="web-tag-match">dot</mark>"&gt;&lt;/div&gt;
<mark class="web-tag-match">.dot</mark> { animation: travel 4s linear; }
@keyframes travel {
  from { transform: translateX(0); }
  to { transform: translateX(120px); }
}</code></pre><p>Селектор .dot вибирає маркер. Ім’я travel з’єднує animation із набором кадрів.</p></div>
<div class="web-diagram-card"><h3>Позиції протягом одного проходу</h3><div class="web-browser-sample" style="display:flex;flex-wrap:wrap;gap:8px"><div style="border:2px solid #0f766e;padding:8px">0 s<br>0 px</div><div style="border:2px dashed #0f766e;padding:8px">2 s<br>60 px</div><div style="border:2px solid #0f766e;padding:8px">4 s<br>120 px</div></div><p class="web-diagram-note">Це підписана схема для linear. При іншій функції часу середня позиція може відрізнятися.</p></div></div></figure>`;

const orbitDiagram = `<figure class="web-diagram" aria-labelledby="animation-orbit-caption">
<figcaption id="animation-orbit-caption">Обертаємо радіус, а напрямок картинки зберігаємо</figcaption>
<div class="web-code-result"><div class="web-diagram-card"><h3>Послідовність transform</h3>${code('translate(-50%, -50%)\nrotate(90deg)\ntranslateX(70px)\nrotate(-90deg)')}<p>Центрування → поворот напрямку → відстань від центра → компенсація повороту картинки.</p></div>
<div class="web-diagram-card"><h3>Чверть кола</h3><div class="web-browser-sample" style="position:relative;height:190px;border:2px dashed #64748b"><div style="position:absolute;left:50%;top:50%;width:3px;height:70px;background:#0f766e"></div><div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)">Центр +</div><div style="position:absolute;left:50%;top:calc(50% + 70px);transform:translate(-50%,-50%);padding:6px;background:#ccfbf1;border:2px solid #0f766e">Листок →</div></div><p class="web-diagram-note">Радіус 70px задає translateX. Картинка залишається спрямованою вправо. Схема нерухома.</p></div></div></figure>`;

const delayDiagram = `<figure class="web-diagram" aria-labelledby="animation-delay-caption">
<figcaption id="animation-delay-caption">Затримка та тривалість — різні проміжки</figcaption>
${code('.parcel { animation: delivery 5s ease-in-out 1s 1 forwards; }')}
<div class="web-code-result"><div class="web-diagram-card" style="border-top:4px dashed #d97706"><h3>0–1 s: очікування</h3><p>animation-delay: 1s. Пакунок ще не рухається. Звичайний CSS визначає його вигляд.</p></div><div class="web-diagram-card" style="border-top:4px solid #0f766e"><h3>1–6 s: рух</h3><p>animation-duration: 5s. Після проходу forwards зберігає значення останнього кадру.</p></div></div></figure>`;

export const animationDocuments: Record<string, EngineDocument> = {
  'css-animation': {
    title: 'Тема 25. CSS-анімація: кадри, рух і пауза',
    html: `<p>CSS може поступово змінювати положення, розмір, поворот або інші властивості елемента. Створимо три невеликі моделі руху.</p>
<p>Спочатку зроби зрозумілий нерухомий стан. Анімація доповнює вміст, а не замінює текст, посилання чи інструкції.</p>

<h2 id="animation-keyframes">Правило @keyframes і властивість animation</h2>
<p><code>@keyframes</code> — правило CSS, а не тег HTML. Воно називає набір ключових кадрів: станів на певних частинах проходу.</p>
<p><code>from</code> відповідає 0%, <code>to</code> — 100%. Можна додати проміжний кадр, наприклад 50%.</p>
${framesDiagram}
<p><code>animation</code> підключає кадри до конкретного елемента. Ім’я в animation має точно збігатися з іменем після @keyframes.</p>
${code('@keyframes turn {\n  0% { transform: rotate(0deg); }\n  50% { transform: rotate(90deg); }\n  100% { transform: rotate(180deg); }\n}\n.marker { animation: turn 4s linear; }')}
<p>Браузер обчислює проміжні значення між кадрами. Не всі CSS-властивості змінюються плавно; для цих вправ використаємо transform і box-shadow.</p>

<h2 id="animation-transform">Translate, rotate та scale</h2>
<ul>
<li><code>translateX(80px)</code> зміщує елемент на 80px вправо; translateY(30px) — на 30px вниз.</li>
<li><code>translate(-20px, -10px)</code> зміщує вліво й угору. Від’ємні значення задають протилежний напрямок.</li>
<li><code>rotate(90deg)</code> повертає елемент на чверть оберту. У звичайній українській сторінці додатний кут повертає за годинниковою стрілкою.</li>
<li><code>scale(1.1)</code> збільшує обидва розміри в 1.1 раза, а scale(0.8) зменшує до 80%.</li>
<li><code>scale(1.2, 0.8)</code> окремо змінює ширину й висоту. Від’ємний множник також віддзеркалює відповідну вісь.</li>
</ul>
<p>Transform змінює зображення елемента, але не пересуває сусідів у звичайному потоці. Заздалегідь залиш місце для всіх положень і тіней.</p>
<p>Відсотки в translate відлічуються від розмірів самого елемента. Тому translate(-50%, -50%) допомагає центрувати картинку відносно заданої точки.</p>
<p>Не плутай це з top: 50% і left: 50% абсолютного елемента: їхня опора — контейнер позиціонування.</p>
<p>Звичайний початок координат для повороту й масштабу — центр елемента. Властивість transform може містити кілька функцій перетворення.</p>
${code('.parcel { transform: translateX(180px) rotate(12deg) scale(1.1); }')}
<p>Порядок функцій має значення. Поворот змінює напрямки наступних перетворень. Не переставляй функції, поки не перевіриш результат.</p>

<h2 id="animation-orbit">Рух по колу без обертання картинки</h2>
<p>У першій вправі leaf має position: absolute, top: 50% і left: 50% усередині relative-контейнера.</p>
<p>Застосуємо чотири перетворення: центрування, поворот напрямку, зміщення від центра й зворотний поворот картинки.</p>
${orbitDiagram}
${code('@keyframes orbit {\n  from { transform: translate(-50%, -50%) rotate(0deg) translateX(70px) rotate(0deg); }\n  to { transform: translate(-50%, -50%) rotate(360deg) translateX(70px) rotate(-360deg); }\n}')}
<p>Перший rotate змінює напрямок радіуса. Другий компенсує поворот картинки: вона обходить коло, але не перевертається.</p>
<p>Радіус 70px і ширина картинки 70px поміщаються в сцені 280 × 280px. Позиціонування повтори в <a href="#/web/html-css/block-elements">темі 14</a>.</p>

<h2 id="animation-time">Тривалість і функція часу</h2>
<p><code>animation-duration: 4s</code> задає тривалість одного проходу. Одна секунда — 1000 мілісекунд.</p>
<p><code>animation-timing-function</code> визначає, як змінюється швидкість переходу між кадрами.</p>
<ul>
<li><code>linear</code> — рівномірний прогрес.</li>
<li><code>ease</code> — повільний початок, швидша середина та повільний кінець.</li>
<li><code>ease-in</code> — поступове прискорення.</li>
<li><code>ease-out</code> — поступове сповільнення.</li>
<li><code>ease-in-out</code> — плавний початок і кінець.</li>
</ul>
<p>У лабораторії всі маркери проходять 200px за 4 секунди. Різні функції часу дають різні проміжні позиції, але однакові початок і кінець.</p>
<p>Ease та ease-in-out схожі за описом, але мають різні криві. Порівнюй їх на одній доріжці з однаковою тривалістю.</p>

<h2 id="animation-delay">Затримка, повтори, напрямок і кінцевий стан</h2>
${delayDiagram}
<p><code>animation-delay</code> задає затримку перед початком. У вправі 1s очікування та 5s руху дають завершення на шостій секунді.</p>
<p><code>animation-iteration-count: 1</code> означає один прохід. Число 3 повторить його тричі, а infinite — без обмеження.</p>
<p><code>animation-direction: alternate</code> змінює напрямок кожного наступного проходу. Маркер рухається вперед, потім назад.</p>
<p><code>animation-fill-mode: forwards</code> залишає кінцеві значення після останнього проходу. Воно не переписує звичайні правила CSS у файлі.</p>
<p>Без forwards після завершення елемент повертається до звичайного оформлення. При infinite кінця немає, тому forwards не створює зупинки.</p>
${code('.parcel {\n  animation-name: delivery;\n  animation-duration: 5s;\n  animation-timing-function: ease-in-out;\n  animation-delay: 1s;\n  animation-iteration-count: 1;\n  animation-fill-mode: forwards;\n}\n/* Той самий набір коротко: */\n.parcel { animation: delivery 5s ease-in-out 1s 1 forwards; }')}
<p>У короткому записі перше значення часу — тривалість, друге — затримка. Після короткого запису можна уточнити окрему властивість.</p>

<h2 id="animation-shadow">Box-shadow: тінь без зміни розмітки</h2>
${code('.parcel { box-shadow: 8px 8px 14px rgba(15, 23, 42, 0.25); }')}
<p>Перші два числа зміщують тінь вправо й вниз. Третє задає розмиття. Останнє число rgba — прозорість від 0 до 1.</p>
<p>Зміщення можуть бути від’ємними. Розмиття має бути невід’ємним. Тінь не додає елементу ширини в розкладці.</p>
<p>Не використовуй тінь замість видимого фокуса. Вона лише допомагає відділити пакунок від фону.</p>

<h2 id="animation-pause">Доступна пауза без JavaScript</h2>
<p><code>animation-play-state: paused</code> зупиняє анімацію в поточному місці. Running продовжує її. Пауза не обнуляє час.</p>
<p>Прапорець із label дозволяє керувати паузою мишею, дотиком і клавішами Tab та Пробіл.</p>
${code('<input class="pause" id="pause" type="checkbox">\n<label for="pause">Призупинити рух</label>\n<div class="stage">\n  <div class="animated">Маркер</div>\n</div>\n\n.pause:checked ~ .stage .animated {\n  animation-play-state: paused;\n}')}
<p><code>:checked</code> вибирає позначений прапорець. Знак <code>~</code> знаходить наступного сусіда того самого батька; між ними можуть бути інші елементи.</p>
<p>Тут .pause і .stage — сусіди. Пробіл перед .animated вибирає потрібних нащадків сцени.</p>
<p>Пауза завершеного одноразового руху не починає його знову. У майстерні натисни «Оновити результат», щоб перезавантажити перегляд.</p>

<h2 id="animation-reduced">Менше руху за налаштуванням користувача</h2>
<p>Операційна система або браузер можуть повідомити, що користувач просить зменшити рух.</p>
${code('@media (prefers-reduced-motion: reduce) {\n  .stage .animated { animation: none; transform: none; }\n}')}
<p>Цей медіазапит вимикає навчальну анімацію. Вміст і його підписи залишаються видимими. Перевір і рухомий, і нерухомий варіанти.</p>
<p>У темі 24 медіазапити змінювали оформлення за шириною. Тут умова інша: налаштування зменшеного руху.</p>
<p>Не створюй швидких спалахів чи постійного миготіння. Декоративний рух не повинен заважати читанню або керуванню сторінкою.</p>

<h2 id="animation-check">Перевірка руху й збереження</h2>
<ol><li>Спочатку перевір звичайне оформлення без animation.</li><li>Перевір початок, середину й кінець кожного проходу. Елемент не повинен виходити за доступне місце.</li><li>Постав рух на паузу через label і Пробіл. Зніми паузу та перевір продовження.</li><li>Увімкни зменшення руху в системі або інструментах розробника. Усі підписи мають залишитися видимими.</li><li>Перевір ширину 390px і відсутність прокрутки всієї сторінки.</li><li>Завантаж HTML та відкрий його без мережі. Для продовження імпортуй збережений файл у редактор.</li></ol>
<p>Для листка завантаж leaf.svg окремо або комплект ZIP. У локальному редакторі збережи зображення поруч із index.html.</p>
<p>Зразок — один нерухомий кадр. Він не замінює перевірки паузи, затримки й повного проходу в редакторі.</p>

<h2 id="animation-practice">Практика: рух із поясненням</h2>
<p>Створи три моделі по черзі. Спочатку повтори базові параметри, а після перевірки зміни кольори й текст на власні.</p>
<div class="web-practice-mount"></div>`,
  },
};
