import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
}

const filesDiagram = `<figure class="web-diagram" aria-labelledby="external-css-files-caption"><figcaption id="external-css-files-caption">HTML знаходить CSS за шляхом у href</figcaption>
<div class="web-code-result"><div class="web-diagram-card"><h3>index.html</h3><pre class="web-visual-code"><code>&lt;head&gt;
  &lt;link rel="stylesheet" <mark class="web-tag-match">href="style.css"</mark>&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Моя колекція&lt;/h1&gt;
&lt;/body&gt;</code></pre><p>HTML задає структуру та називає файл стилів. Обидва файли лежать поруч.</p></div>
<div class="web-diagram-card"><h3>style.css → результат</h3><pre class="web-visual-code"><code><mark class="web-selector-token">h1</mark> { color: #115e59;
     border-bottom: 3px solid #0f766e; }</code></pre><div class="web-browser-sample"><div style="font-size:24px;font-weight:bold;color:#115e59;border-bottom:3px solid #0f766e">Моя колекція</div></div><p>Селектор h1 знаходить заголовок. Правило змінює колір і додає нижню рамку.</p></div></div></figure>`;

const boxDiagram = `<figure class="web-diagram" aria-labelledby="external-css-box-caption"><figcaption id="external-css-box-caption">Вміст → padding → border → margin</figcaption>
<div class="web-code-result"><div class="web-diagram-card"><h3>Правило для .card</h3>${code('.card {\n  width: 200px;\n  padding: 12px;\n  border: 2px solid #0f766e;\n  margin: 16px;\n  box-sizing: border-box;\n}')}<p>Ширина 200px включає вміст, внутрішні відступи та рамку. Зовнішні поля залишаються поза цією шириною.</p></div>
<div class="web-diagram-card"><h3>Підписані області</h3><div style="background:#ffedd5;padding:16px;border:1px dashed #9a3412;text-align:center">margin — зовнішнє поле<div style="border:3px solid #0f766e;background:#ccfbf1;padding:12px">border — рамка<br>padding — простір усередині<div style="background:#fff;border:1px dashed #475569;padding:8px">Вміст</div></div></div><p>Фон покриває padding, але не margin. Рамка відокремлює внутрішню область від зовнішньої.</p></div></div></figure>`;

const floatDiagram = `<figure class="web-diagram" aria-labelledby="external-css-float-caption"><figcaption id="external-css-float-caption">Контейнер утримує обтікання</figcaption><div class="web-code-result">
<div class="web-diagram-card"><h3>Селектори та елементи</h3><pre class="web-visual-code"><code>&lt;div <mark class="web-tag-match">class="note"</mark>&gt;
  &lt;img <mark class="web-tag-match">class="picture"</mark> src="leaf.svg" alt="Листок"&gt;
  &lt;p&gt;Розглядаємо форму листка…&lt;/p&gt;
&lt;/div&gt;
<mark class="web-selector-token">.note</mark> { display: flow-root; }
<mark class="web-selector-token">.picture</mark> { float: left;
  width: 90px; margin-right: 12px; }</code></pre></div>
<div class="web-diagram-card"><h3>Результат</h3><div style="display:flow-root;border:2px solid #0f766e;padding:10px"><img src="assets/web-development/media/leaf.svg" alt="Листок" style="float:left;width:90px;max-width:40%;height:auto;margin-right:12px"><p>Розглядаємо форму листка. Текст займає місце праворуч, а потім продовжується нижче малюнка.</p></div><p style="border-top:2px solid #9a3412">Наступний розділ залишається під карткою.</p></div></div></figure>`;

export const externalCssDocuments: Record<string, EngineDocument> = {
  'external-css': {
    title: 'Тема 15. Зовнішній CSS, відступи та обтікання',
    html: `<p>Відокремимо стилі від HTML. Навчимося розрізняти зовнішні поля, внутрішні відступи й рамки та оформлювати частину речення.</p>
<h2 id="external-css-link">Файл style.css і тег link</h2>
<p>Зовнішня таблиця стилів — окремий текстовий файл із розширенням .css. Він містить такі самі правила, як елемент style.</p>
<p>У CSS-файлі не пиши теги style, head або html. Записуй лише селектори та правила CSS.</p>
${filesDiagram}
<p><code>link</code> розміщують у head. Він не має кінцевого тега. Атрибут <code>rel="stylesheet"</code> визначає призначення файлу, а href задає шлях.</p>
<p>Для CSS атрибут type не потрібний. Якщо назва чи регістр літер не збігаються з файлом, браузер не знайде стилі.</p>
${code('my-project/\n  index.html\n  style.css\n  leaf.svg')}
<p>Якщо перемістиш CSS у підпапку css, запиши <code>href="css/style.css"</code>. Шлях до фонового зображення в CSS відлічується від папки CSS-файлу.</p>
<p>Наприклад, для style.css у підпапці css та картинки leaf.svg поруч із index.html потрібен шлях <code>url("../leaf.svg")</code>.</p>
<p>Один файл CSS можна підключити до кількох HTML-сторінок. Зміна правила тоді змінить оформлення всіх підключених сторінок.</p>
<h2 id="external-css-workshop">Два поля майстерні</h2>
<p>У цій темі HTML і CSS мають окремі поля. Початкова HTML-заготовка вже містить link на style.css. Пиши правила в полі CSS.</p>
<p>Перегляд застосовує вміст поля CSS замість локального style.css. Завантаження зовнішніх файлів із мережі в перегляді заблоковано.</p>
<p>Для продовження роботи завантаж HTML і CSS окремими кнопками. Збережи файли як index.html і style.css в одній папці.</p>
<p>Кнопка відкриття HTML повертає розмітку в редактор. Окремо відкрий збережений CSS відповідною кнопкою. Перевір, що link залишився в head.</p>
<p>Чернетки обох полів зберігаються під час перемикання завдань у поточному сеансі. Для роботи пізніше потрібні завантажені файли.</p>
<p>Зображення завантажуй окремими SVG або ZIP-комплектом. Розпакуй їх поруч із HTML і CSS для коротких шляхів із завдань.</p>
<p>Зразки показують вигляд сторінки, а не місце зберігання CSS. У своїй роботі збережи стилі окремим файлом.</p>
<h2 id="external-css-span">span: частина тексту без нового рядка</h2>
<p><code>span</code> — універсальний рядковий контейнер. Він дозволяє дати клас кільком словам усередині абзацу.</p>
${code('<p><span class="label">Місце:</span> міський парк</p>\n\n.label { color: #9a3412; font-weight: bold; }')}
<p>Селектор .label вибирає тільки позначений фрагмент. Решта абзацу зберігає своє оформлення.</p>
<p>span не додає важливості за змістом. Для важливого попередження використовуй strong, а для смислового наголосу — em.</p>
<h2 id="external-css-box">Поля, рамка та внутрішні відступи</h2>
<p><code>padding</code> створює простір між вмістом і рамкою. <code>border</code> малює рамку. <code>margin</code> віддаляє елемент від сусідів.</p>
${boxDiagram}
<p>Без border-box ширина 200px задає лише вміст. Два padding по 12px і дві рамки по 2px дають зовнішню ширину 228px.</p>
<p>З <code>box-sizing: border-box</code> зовнішня ширина разом із рамкою становить 200px. Область вмісту тоді має 172px.</p>
<p>Margin додається окремо. Два поля по 16px разом із рамкою 200px займають 232px по горизонталі.</p>
<h2 id="external-css-shorthand">Короткі та окремі записи</h2>
<ul><li><code>padding: 12px</code> — усі чотири боки однакові.</li><li><code>padding: 8px 16px</code> — згори й знизу 8px; зліва й справа 16px.</li><li><code>padding: 8px 16px 20px</code> — згори 8px; зліва й справа 16px; знизу 20px.</li><li><code>padding: 8px 16px 20px 4px</code> — згори, справа, знизу, зліва.</li></ul>
<p>Той самий порядок працює для margin. Окремий бік можна змінити через margin-top, margin-right, margin-bottom, margin-left або відповідні властивості padding.</p>
<p><code>margin: 20px auto</code> дає по 20px згори й знизу та центрує блок із заданою шириною по горизонталі.</p>
<p>Вертикальні margin сусідніх звичайних блоків іноді об’єднуються. Два поля по 20px не завжди створюють проміжок 40px.</p>
<p>У border запис <code>2px solid #0f766e</code> означає товщину, стиль і колір. Для окремого боку використовуй, наприклад, border-bottom.</p>
<p>Для перевірки відкрий інструменти розробника браузера й вибери елемент. Схема блочної моделі показує його вміст, padding, border та margin.</p>
<h2 id="external-css-float">Обтікання зображення текстом</h2>
<p><code>float: left</code> притискає елемент ліворуч, а текст обтікає його справа. <code>float: right</code> робить навпаки; none скасовує float.</p>
<p>Задай зображенню ширину та поле з боку тексту. <code>display: flow-root</code> на контейнері утримує обтікання всередині.</p>
${floatDiagram}
<p>Якщо наступний елемент у цьому самому контейнері має початися нижче плаваючих зображень, задай йому <code>clear: both</code>.</p>
<p>Clear скасовує обтікання для цього елемента, але не вимикає float у самого зображення. Застарілий атрибут clear на br не використовуй.</p>
<h2 id="external-css-repeat-position">Координати й колекції</h2>
<p>Першу вправу побудовано на fixed із попередньої теми. Відсотки top і left відраховуються від висоти й ширини вікна.</p>
<p>Мітки fixed залишаються біля вікна, коли фон прокручується. Для міток на самій мапі потрібне absolute усередині relative-контейнера.</p>
<p>Галерея повторює inline-block і vertical-align: top. Рамки, margin та padding допоможуть відокремити картки й підписи.</p>
<h2 id="external-css-practice">Практика: стилі в окремому файлі</h2>
<p>Спочатку перевір link і просте правило для body. Потім додай усі відступи. Наприкінці відкрий збережені файли без мережі.</p><div class="web-practice-mount"></div>`,
  },
};
