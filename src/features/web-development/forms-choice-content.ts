import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</code></pre>`;
}

const groupDiagram = `<figure class="web-diagram" aria-labelledby="forms-choice-group-caption">
<figcaption id="forms-choice-group-caption">fieldset групує поля, legend називає групу</figcaption>
<div class="web-code-result"><div class="web-diagram-card"><h3>Код і зв’язки</h3><pre class="web-visual-code"><code>&lt;fieldset&gt;
  &lt;legend&gt;<mark class="web-tag-match">Один напій</mark>&lt;/legend&gt;
  &lt;label&gt;&lt;input type="radio"
    name="<mark class="web-tag-match">drink</mark>" value="water" checked&gt;Вода&lt;/label&gt;
  &lt;label&gt;&lt;input type="radio"
    name="<mark class="web-tag-match">drink</mark>" value="tea"&gt;Чай&lt;/label&gt;
&lt;/fieldset&gt;</code></pre><p>Спільний name="drink" робить перемикачі однією групою вибору. Fieldset додає групі змістову назву.</p></div>
<div class="web-diagram-card"><h3>Результат і правило</h3><div class="web-browser-sample" style="border:2px solid #0f766e"><strong>Один напій</strong><p>◉ Вода — початковий вибір</p><p>○ Чай — інший варіант</p></div><p class="web-diagram-note">Після вибору Чаю позначка Води зникне. Одночасно обрати обидва напої в цій групі не можна.</p></div></div></figure>`;

const choiceDiagram = `<figure class="web-diagram" aria-labelledby="forms-choice-types-caption">
<figcaption id="forms-choice-types-caption">Тип поля визначає правило вибору</figcaption><div class="web-code-result">
<div class="web-diagram-card"><h3>radio: один варіант групи</h3>${code('<input type="radio" name="time" value="morning">\n<input type="radio" name="time" value="day">')}<div class="web-browser-sample">◉ Ранок<br>○ День</div><p>Однаковий name зв’язує перемикачі. У формі можна мати кілька незалежних radio-груп із різними name.</p></div>
<div class="web-diagram-card"><h3>checkbox: незалежні позначки</h3>${code('<input type="checkbox" name="equipment" value="map">\n<input type="checkbox" name="equipment" value="pencil">')}<div class="web-browser-sample">☑ Карта<br>☑ Олівець</div><p>Можна позначити обидві речі або жодної. Однаковий name дозволяє передавати кілька значень однієї категорії.</p></div></div></figure>`;

const selectDiagram = `<figure class="web-diagram" aria-labelledby="forms-choice-select-caption">
<figcaption id="forms-choice-select-caption">option дає назву на екрані та значення для даних</figcaption><div class="web-code-result">
<div class="web-diagram-card"><h3>HTML</h3><pre class="web-visual-code"><code>&lt;label for="trail"&gt;Стежка&lt;/label&gt;
&lt;select id="trail" name="trail"&gt;
  &lt;option value="forest"&gt;Лісова&lt;/option&gt;
  &lt;option value="<mark class="web-tag-match">meadow</mark>" selected&gt;<mark class="web-tag-match">Лугова</mark>&lt;/option&gt;
&lt;/select&gt;</code></pre></div>
<div class="web-diagram-card"><h3>Екран → дані</h3><div class="web-browser-sample" style="border:2px solid #0f766e">Стежка: Лугова ▾</div><p>Користувач читає «Лугова». У даних форми це пара <code>trail=meadow</code>.</p><p class="web-diagram-note">selected задає початковий варіант. Назва селектора select і назва значення value виконують різні завдання.</p></div></div></figure>`;

const focusDiagram = `<figure class="web-diagram" aria-labelledby="forms-choice-focus-caption">
<figcaption id="forms-choice-focus-caption">button:focus + img: фокус кнопки змінює її наступного сусіда</figcaption><div class="web-code-result">
<div class="web-diagram-card"><h3>Порядок HTML має значення</h3><pre class="web-visual-code"><code>&lt;div class="character"&gt;
  &lt;button type="button"&gt;Птах&lt;/button&gt;
  <mark class="web-tag-match">&lt;img src="bird.svg" alt="Птах"&gt;</mark>
&lt;/div&gt;
button:focus <mark class="web-tag-match">+</mark> img {
  border-color: #b45309;
}</code></pre><p>Кнопка й зображення мають одного батька. Між ними немає іншого елемента.</p></div>
<div class="web-diagram-card"><h3>Кнопка у фокусі → рамка картинки</h3><div class="web-browser-sample" style="text-align:center"><div style="display:inline-block;padding:6px;border:2px solid #0f766e;outline:3px solid #d97706;outline-offset:2px">Птах — фокус</div><br><img src="assets/web-development/media/bird.svg" alt="Зразок картинки з рамкою" style="width:120px;max-width:100%;height:auto;border:2px solid #b45309;margin-top:12px"></div><p class="web-diagram-note">Після переходу фокуса на іншу кнопку рамка повертається. Це тимчасове оформлення, а не збережений вибір персонажа.</p></div></div></figure>`;

export const formsChoiceDocuments: Record<string, EngineDocument> = {
  'forms-choice': {
    title: 'Тема 19. Форми: групи та вибір варіантів',
    html: `<p>Навчимося обирати один або кілька варіантів і збирати пов’язані поля у змістові групи.</p>
<p>Підписи, текстові поля та кнопки повтори в <a href="#/web/html-css/forms-basics">темі 18</a>. Усі вправи залишаються навчальними макетами.</p>
<h2 id="forms-choice-groups">Група fieldset та її назва legend</h2>
<p><code>fieldset</code> об’єднує пов’язані поля форми. <code>legend</code> називає цю групу. Розміщуй legend першим елементом усередині fieldset.</p>
<p>Наприклад, група «Один напій» містить варіанти напоїв, а «Доповнення» — речі, які можна взяти разом.</p>
${groupDiagram}
<p>Legend називає всю групу, але не замінює окремих label. Кожен варіант повинен мати власний зрозумілий підпис.</p>
<p>Підпис можна пов’язати через for/id або обгорнути поле тегом label. У цих вправах короткі варіанти обгортаємо в label.</p>
${code('<label><input type="checkbox" name="extra" value="napkins">Серветки</label>')}
<p>Натискання такого підпису перемикає прапорець. Для окремого текстового поля або select продовжуй використовувати for та унікальний id.</p>
<h2 id="forms-choice-radio">Radio: один варіант з групи</h2>
<p><code>input type="radio"</code> створює перемикач. Radio однієї форми з однаковим name утворюють групу, де можна обрати один варіант.</p>
<p><code>value</code> задає значення цього варіанта. Використовуй різні value для різних відповідей: water, tea, compote.</p>
<p>Спільний fieldset сам не об’єднує перемикачі. Якщо name різні, браузер вважатиме їх окремими групами.</p>
<p><code>checked</code> задає початкову позначку. У radio-групі позначай ним щонайбільше один варіант.</p>
${choiceDiagram}
<p>Без checked група може починатися без вибору. Якщо вибір обов’язковий, required на radio робить обов’язковим вибір одного варіанта цієї групи.</p>
<p>Після входу в radio-групу клавішею Tab переміщуйся між варіантами клавішами стрілок. Натискання label також обирає відповідний варіант.</p>
<h2 id="forms-choice-checkbox">Checkbox: кілька незалежних позначок</h2>
<p><code>input type="checkbox"</code> створює прапорець. Кожен прапорець можна позначити або зняти незалежно від інших.</p>
<p>Прапорці можуть мати однаковий name та різні value. Тоді у формі одна категорія міститиме кілька вибраних значень.</p>
${code('<label><input type="checkbox" name="extra" value="napkins" checked>Серветки</label>\n<label><input type="checkbox" name="extra" value="spoon">Ложка</label>')}
<p>Не позначені radio й checkbox не входять до даних форми. Записуй value явно, щоб вибрані варіанти мали зрозумілі значення.</p>
<p>Клавіша Пробіл перемикає прапорець у фокусі. За потреби користувач може вибрати всі доступні прапорці або жодного.</p>
<p>Required на checkbox вимагає саме цей прапорець. Воно не означає «познач хоча б один у групі».</p>
<h2 id="forms-choice-select">Select та option: список варіантів</h2>
<p><code>select</code> створює список вибору. Кожен <code>option</code> усередині нього описує один варіант.</p>
${selectDiagram}
<p>Без multiple у списку обирають один варіант. Selected задає початковий вибір; не записуй кілька selected у звичайному одноразовому списку.</p>
<p>Щоб користувач обов’язково зробив свій вибір, додай required до select та початковий варіант із порожнім value.</p>
${code('<label for="trail">Стежка</label>\n<select id="trail" name="trail" required>\n  <option value="" selected disabled>Оберіть стежку</option>\n  <option value="forest">Лісова</option>\n  <option value="meadow">Лугова</option>\n</select>')}
<p>Такий початковий варіант — підказка. Порожнє value не задовольняє required. Вибери Лісову або Лугову перед перевіркою форми.</p>
<h2 id="forms-choice-multiple">Multiple та size</h2>
<p><code>multiple</code> дозволяє вибрати кілька option. <code>size="3"</code> задає кількість видимих рядків списку.</p>
${code('<label for="fruit">Фрукти — можна кілька</label>\n<select id="fruit" name="fruit" multiple size="3">\n  <option value="apple" selected>Яблуко</option>\n  <option value="pear">Груша</option>\n  <option value="plum">Слива</option>\n</select>')}
<p>У звичайному списку size більше 1 теж показує кілька рядків, але без multiple вибір залишається одиничним.</p>
<p>На комп’ютері незалежні варіанти часто вибирають із Ctrl у Windows/Linux або Command у macOS. Shift допомагає вибрати діапазон.</p>
<p>Клавіатурні команди й вигляд на телефоні залежать від браузера. Якщо кілька варіантів важко вибирати, використай прапорці для такого самого завдання.</p>
<h2 id="forms-choice-defaults">Початкові, недоступні та поточні значення</h2>
<p><code>checked</code> задає початкову позначку radio або checkbox. <code>selected</code> задає початковий option. Це логічні атрибути: їхньої присутності достатньо.</p>
<p>Checked="false" усе одно додає початкову позначку. Щоб її не було, прибери атрибут повністю.</p>
<p><code>disabled</code> на input чи select вимикає поле. Disabled на option вимикає тільки один варіант списку.</p>
<p>Кнопка reset повертає початкові checked та selected, а також початковий текст. Вона не обов’язково знімає всі позначки.</p>
<p>Зміни у формі існують лише на відкритій сторінці. Наші макети не зберігають і не надсилають вибрані дані.</p>
<h2 id="forms-choice-focus">Фокус та наступний сусід у CSS</h2>
<p><code>:focus</code> вибирає елемент, який зараз отримує клавіатурне введення. У прикладі кнопку можна сфокусувати через Tab.</p>
<p>Знак <code>+</code> вибирає наступний сусідній елемент того самого батька. Пробіли й перенесення між тегами не заважають.</p>
${focusDiagram}
<p>Якщо вставити між button та img інший елемент, правило button:focus + img не спрацює. У HTML зразка кнопка стоїть перед картинкою.</p>
<p>Фокус не означає збережений вибір. Тому у вправі кнопки демонструють CSS, а супутника обирають окремі radio.</p>
<p>Зберігай видимий контур фокуса самої кнопки. Зміна рамки картинки лише доповнює його.</p>
<h2 id="forms-choice-style">Оформлення полів без втрати їхніх функцій</h2>
<p>Не задавай усім input ширину 100%: це розтягне radio й checkbox. Для текстового поля створи окремий клас text-field.</p>
${code('.text-field, select, textarea { width: 100%; box-sizing: border-box; padding: 8px; font: inherit; }\ninput[type="radio"], input[type="checkbox"] { margin-right: 8px; }\nfieldset { min-width: 0; padding: 12px; }\nlabel { display: block; margin: 8px 0; }')}
<p><code>input[type="radio"]</code> — селектор атрибута. Він вибирає лише input із відповідним значенням type. Кома об’єднує два незалежні селектори.</p>
<p><code>min-width: 0</code> дозволяє fieldset звузитися разом із формою. Max-width: 100% та border-box допомагають утримати рамки всередині вузького вікна.</p>
<h2 id="forms-choice-check">Перевірка перед збереженням</h2>
<ol><li>Натисни підписи й перевір правильні перемикачі та прапорці.</li><li>Зміни radio: попередня позначка в тій самій групі повинна зникнути.</li><li>Познач два checkbox одночасно й вибери кілька option у multiple.</li><li>Спробуй обрати disabled: він має залишитися недоступним.</li><li>Перевір Tab, стрілки та Пробіл. Потім натисни reset і порівняй початкові значення.</li><li>Зменш ширину вікна та перевір усі підписи й кнопки.</li></ol>
<p>Зображення другої вправи доступні в матеріалах окремими SVG та комплектом ZIP. Для локального редактора збережи їх поруч із index.html.</p>
<p>Завантаж HTML, щоб зберегти код. Для продовження відкрий цей файл у майстерні. Поточні введені відповіді не переписують початкові атрибути HTML.</p>
<p>У перегляді працюють редагування й reset. Submit перевіряє обов’язкові поля, але надсилання заблоковане. Макет не виконує справжніх замовлень.</p>
<h2 id="forms-choice-practice">Практика: обираємо варіанти</h2>
<p>Спочатку додай змістові групи, підписи, name та value. Перевір поведінку без CSS, а потім оформи форму.</p>
<div class="web-practice-mount"></div>`,
  },
};
