import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</code></pre>`;
}

const positionDiagram = `
<figure class="web-diagram" aria-labelledby="review3-position-caption">
<figcaption id="review3-position-caption">Батьківська картка задає опору для підпису</figcaption>
<div class="web-code-result"><div class="web-diagram-card"><h3>Код → вибрані елементи</h3>
<pre class="web-visual-code"><code>&lt;div class="<mark class="web-tag-match">helper</mark>"&gt;
  &lt;span class="<mark class="web-tag-match">badge</mark>"&gt;Команда&lt;/span&gt;
  &lt;p&gt;Помічник експедиції&lt;/p&gt;
&lt;/div&gt;
.helper { position: relative;
  padding: 40px 12px 12px; }
.badge { position: absolute;
  top: 8px; right: 8px; }</code></pre></div>
<div class="web-diagram-card"><h3>Результат</h3><div class="web-browser-sample" style="position:relative;border:2px dashed #0f766e;padding:48px 12px 12px"><span style="position:absolute;top:8px;right:8px;border:2px solid #075985;padding:4px;background:#ccfbf1">Команда</span>Помічник експедиції</div><p class="web-diagram-note">Пунктирна рамка — helper. Суцільна рамка — badge. Верхній padding залишає місце під підписом.</p></div></div>
</figure>`;

const formDiagram = `
<figure class="web-diagram" aria-labelledby="review3-choice-caption">
<figcaption id="review3-choice-caption">name задає групу, value — значення варіанта</figcaption>
<div class="web-code-result"><div class="web-diagram-card"><h3>Radio: одна роль</h3>
<pre class="web-visual-code"><code>&lt;label&gt;&lt;input type="radio"
 name="<mark class="web-tag-match">role</mark>" value="mapmaker" checked&gt;
 Картограф&lt;/label&gt;
&lt;label&gt;&lt;input type="radio"
 name="<mark class="web-tag-match">role</mark>" value="observer"&gt;
 Спостерігач&lt;/label&gt;</code></pre><p>Однаковий name поєднує перемикачі в межах цієї форми. Новий вибір скасовує попередній.</p></div>
<div class="web-diagram-card"><h3>Checkbox: незалежні вміння</h3>
<pre class="web-visual-code"><code>&lt;label&gt;&lt;input type="checkbox"
 name="skills" value="map"&gt;
 Малювати карту&lt;/label&gt;
&lt;label&gt;&lt;input type="checkbox"
 name="skills" value="notes"&gt;
 Записувати нотатки&lt;/label&gt;</code></pre><p>Можна позначити обидва варіанти або жодного. Однаковий name не робить checkbox взаємовиключними.</p></div></div>
</figure>`;

export const review3Documents: Record<string, EngineDocument> = {
  'web-review-3': {
    title: 'Тема 20. Повторення: блоки, Flexbox і форми',
    html: `
<p>Поєднаємо розташування блоків, відступи й форми в сторінках вигаданої експедиції. Спочатку поясни, яке завдання виконує кожне правило.</p>
<p>Ця тема повторює теми 14–19. Якщо приклад незрозумілий, повернися до відповідного уроку за посиланням у поясненні.</p>
<h2 id="review3-blocks">Блоки та звичайний потік</h2>
<p><code>div</code> об’єднує вміст без додаткового змісту. <code>span</code> виділяє частину рядка, наприклад ім’я всередині заголовка.</p>
<p><code>display: block</code> зазвичай починає новий рядок. <code>inline-block</code> дозволяє блокам стояти поруч, мати ширину й переходити на наступний рядок.</p>
<p>Для inline-block використовуй <code>vertical-align: top</code>, щоб вирівняти верхні краї. <code>display: none</code> прибирає елемент і його місце в розкладці.</p>
<p>Не ховай через display: none єдину важливу інструкцію. Прихований елемент також зникає з дерева доступності.</p>
<h2 id="review3-position">relative, absolute та fixed</h2>
<ul><li><code>relative</code> зберігає місце елемента у звичайному потоці й може задавати опору для абсолютних нащадків.</li><li><code>absolute</code> вилучає елемент зі звичайного потоку. У наших прикладах опора — найближчий предок із position: relative.</li><li><code>fixed</code> у наших прикладах прив’язує елемент до вікна перегляду, навіть під час прокручування.</li></ul>
<p><code>top</code>, <code>right</code>, <code>bottom</code> і <code>left</code> задають зміщення. Для relative вони відраховуються від звичайного місця елемента.</p>
${positionDiagram}
<p>Абсолютний підпис не резервує місця. Тому збільш padding картки, щоб підпис не перекривав її текст.</p>
<p>Повтори будову блоків у <a href="#/web/html-css/block-elements">темі 14</a>.</p>
<h2 id="review3-box">Зовнішній CSS і модель блока</h2>
<p><code>padding</code> створює простір усередині рамки; <code>margin</code> віддаляє блок від сусідів. <code>border</code> задає саму рамку.</p>
${code(`.card {
  width: 340px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 20px;
  border: 2px solid #0f766e;
  margin: 20px auto;
}`)}
<p>З border-box ширина 340px включає padding та рамку. Margin залишається зовні. Значення auto зліва й справа центрує картку, коли є вільне місце.</p>
<p>У цій майстерні стилі можна писати всередині style в HTML. Щоб повторити зовнішній CSS локально, перенеси лише правила в style.css.</p>
${code('<link rel="stylesheet" href="style.css">')}
<p>Запиши link у head замість style. Збережи index.html і style.css поруч. У CSS-файлі не повинно бути тегів style.</p>
<p>Для окремих полів HTML/CSS і відкриття обох файлів використовуй <a href="#/web/html-css/external-css">майстерню теми 15</a>.</p>
<h2 id="review3-float">Обтікання всередині картки</h2>
<p><code>float: right</code> розміщує зображення праворуч; текст обтікає його зліва. Margin-left залишає проміжок між текстом і зображенням.</p>
${code(`.card { display: flow-root; }
.card img { float: right; width: 100px; margin-left: 15px; }
.name { color: #075985; }`)}
<p><code>flow-root</code> утримує float усередині картки. Наступний розділ починається після неї. Span із класом name оформлює лише ім’я.</p>
<p>Для важливості за змістом використовуй strong, а не span. Для нового абзацу використовуй p.</p>
<h2 id="review3-flex">Flexbox: контейнер і його діти</h2>
<p><code>display: flex</code> задавай спільному батьківському елементу. Його безпосередні діти стають flex-елементами.</p>
${code(`.team {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
}`)}
<p>За звичайного row головна вісь горизонтальна: justify-content центрує картки. Align-items вирівнює їхні верхні краї по поперечній осі.</p>
<p><code>flex-direction: column</code> повертає головну вісь вертикально. Тоді justify-content керує вертикальним розподілом.</p>
<p><code>gap</code> задає проміжки між дітьми. <code>flex-wrap: wrap</code> дозволяє нові рядки, якщо ширини бракує.</p>
<p><code>flex: 1</code> на схожих картках допомагає розподілити вільну ширину. Враховуй min-width, довжину тексту, padding і рамки.</p>
<p><code>align-content</code> розподіляє flex-лінії по поперечній осі. У навчальному прикладі потрібні wrap та вільне місце між лініями.</p>
<p><code>order</code> змінює візуальний порядок. Для логічних кроків, навігації й полів форми встановлюй правильну послідовність у HTML.</p>
<p>Переглянь схеми осей у <a href="#/web/html-css/flex-basics">темі 16</a> і приклади переносу в <a href="#/web/html-css/flex-wrap">темі 17</a>.</p>
<h2 id="review3-fields">Форма: підписи, поля та групи</h2>
<p><code>form</code> об’єднує поля. <code>fieldset</code> групує пов’язані елементи, а перший legend називає цю групу.</p>
<p>Для окремого текстового поля використовуй label із for та input із відповідним id. Для radio й checkbox можна обгорнути input і текст одним label.</p>
${code(`<label for="alias">Псевдонім</label>
<input id="alias" name="alias" type="text" required>
<label><input type="checkbox" name="skills" value="map"> Малювати карту</label>`)}
<p><code>name</code> називає дані. <code>value</code> задає початковий текст або значення варіанта. Placeholder — лише коротка підказка в порожньому полі.</p>
<p><code>required</code> запускає просту перевірку браузера. <code>readonly</code> не дозволяє зміну тексту; <code>disabled</code> вимикає поле й виключає його з надсилання.</p>
<p>Type password лише приховує символи на екрані. Для вправ використовуй вигадані значення; HTML сам не створює обліковий запис.</p>
${formDiagram}
<p><code>checked</code> задає початкову позначку radio або checkbox. Для двох незалежних груп radio використовуй різні name.</p>
<p><code>select</code> із option дозволяє вибрати варіант зі списку. Selected визначає початковий варіант, disabled робить варіант недоступним.</p>
<p>Для кількох варіантів select використовує multiple, а size задає кількість видимих рядків. На комп’ютері додатковий вибір часто потребує Ctrl або Command; взаємодія залежить від пристрою.</p>
<p>Початковий текст textarea записуй між її тегами. Resize: vertical дозволяє збільшити висоту, не розширюючи сторінку.</p>
<p>Будову полів повтори в <a href="#/web/html-css/forms-basics">темі 18</a>, групи й варіанти — у <a href="#/web/html-css/forms-choice">темі 19</a>.</p>
<h2 id="review3-focus">Фокус не дорівнює вибору</h2>
<p>Фокус показує поточний елемент для клавіатури. Він переходить до іншого елемента під час Tab або натискання.</p>
${code(`a:focus img { border-color: #b45309; }
button:focus + img { border-color: #b45309; }`)}
<p>Перший селектор змінює картинку всередині посилання у фокусі. Другий — картинку, яка стоїть одразу після кнопки в тому самому батьківському елементі.</p>
<p>Таке оформлення зникає після втрати фокуса. Для збереженого вибору використовуй radio чи checkbox, а не колір рамки від focus.</p>
<p>Залишай видимий контур фокуса. Змінюй колір рамки, не її товщину, щоб сусідній вміст не зміщувався.</p>
<h2 id="review3-check">Перевірка завершеної роботи</h2>
<ol><li>Перевір вкладеність контейнерів, унікальні id й зв’язки підписів із полями.</li><li>Зменш вікно до ширини телефона. Перевір перенесення, текст і всі кнопки.</li><li>Пройди посилання й поля клавішею Tab; перевір radio стрілками та checkbox пробілом.</li><li>Зміни дані й натисни reset. Кнопка повертає початкові значення, а не завжди очищає поля.</li><li>Спробуй submit із порожнім required. У майстерні надсилання заблоковане; макет не зберігає анкету.</li><li>Завантаж HTML і відкрий його окремо. Відкрий збережений файл у редакторі, щоб продовжити.</li></ol>
<p>У збереженому HTML звичайне надсилання без action може спробувати відкрити поточну адресу з даними. Це не створює серверного обробника.</p>
<p>Ілюстрації доступні окремо та ZIP-комплектом у матеріалах редактора. Для локальних шляхів збережи SVG поруч із HTML, а за зовнішнього CSS — поруч зі style.css.</p>
<h2 id="review3-practice">Практика: три сторінки експедиції</h2>
<p>Виконай три вправи. Остання — домашня робота. Спочатку побудуй HTML, потім додай CSS і перевір поведінку форми.</p>
<div class="web-practice-mount"></div>`,
  },
};
