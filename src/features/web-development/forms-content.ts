import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</code></pre>`;
}

const labelDiagram = `
<figure class="web-diagram" aria-labelledby="forms-label-caption">
<figcaption id="forms-label-caption">for → id: підпис знаходить своє поле</figcaption>
<div class="web-code-result">
  <div class="web-diagram-card"><h3>Код і зв’язок</h3>
    <pre class="web-visual-code"><code>&lt;label for="<mark class="web-selector-token">team</mark>"&gt;Назва команди&lt;/label&gt;
&lt;input id="<mark class="web-tag-match">team</mark>"
       name="team" type="text"
       placeholder="Наприклад, Листок"&gt;</code></pre>
    <p class="web-diagram-note">Однакове слово team з’єднує підпис і поле. name задає назву значення для надсилання.</p>
  </div>
  <div class="web-diagram-card"><h3>Результат</h3>
    <div class="web-browser-sample"><p style="font-weight:bold;margin:0 0 8px">Назва команди — постійний підпис</p><div style="padding:10px;border:2px dashed #0f766e;border-radius:6px;color:#475569">Наприклад, Листок</div></div>
    <p class="web-diagram-note">Рамка позначає input. Підказка всередині зникає після введення, а підпис над полем залишається.</p>
  </div>
</div>
</figure>`;

const resetDiagram = `
<figure class="web-diagram" aria-labelledby="forms-reset-caption">
<figcaption id="forms-reset-caption">Reset повертає початкове значення</figcaption>
${code('<input name="team" type="text" value="Листок">\n<button type="reset">Відновити початкове</button>')}
<div class="web-code-result">
  <div class="web-diagram-card"><h3>До редагування</h3><div class="web-browser-sample" style="border:2px solid #0f766e">Листок</div><p>Цей текст записано в value.</p></div>
  <div class="web-diagram-card"><h3>Після редагування → після reset</h3><div class="web-browser-sample" style="border:2px dashed #64748b">Квітка → <strong>Листок</strong></div><p>Reset відкидає введене слово «Квітка». Поле знову містить «Листок».</p></div>
</div>
</figure>`;

const statesDiagram = `
<figure class="web-diagram" aria-labelledby="forms-states-caption">
<figcaption id="forms-states-caption">Три різні правила для поля</figcaption>
<div class="web-code-result">
  <div class="web-diagram-card"><h3>Атрибут → поведінка</h3>
    <pre class="web-visual-code"><code>&lt;input <mark class="web-tag-match">required</mark>&gt;
&lt;input value="Сад" <mark class="web-tag-match">readonly</mark>&gt;
&lt;input value="Майстерня" <mark class="web-tag-match">disabled</mark>&gt;</code></pre>
    <p class="web-diagram-note">Це логічні атрибути. Самої присутності достатньо: disabled="false" усе одно вимикає поле.</p>
  </div>
  <div class="web-diagram-card"><h3>Що перевірити</h3>
    <div class="web-browser-sample"><p style="border-left:3px solid #0f766e;padding-left:8px"><strong>required:</strong> порожнє редаговане поле не проходить перевірку.</p><p style="border-left:3px dashed #075985;padding-left:8px"><strong>readonly:</strong> текст можна виділити й скопіювати.</p><p style="border-left:3px dotted #64748b;padding-left:8px"><strong>disabled:</strong> поле пропускається клавішею Tab.</p></div>
  </div>
</div>
</figure>`;

export const formsDocuments: Record<string, EngineDocument> = {
  'forms-basics': {
    title: 'Тема 18. Форми: поля, підписи й кнопки',
    html: `
<p>Форма збирає пов’язані поля й кнопки. Створимо навчальні макети: кабінет читача, запрошення до майстерні та заявку на творчий набір.</p>
<p>HTML задає поля та просту перевірку. Справжня реєстрація, перевірка пароля й збереження заявки потребують окремої програми.</p>

<h2 id="forms-container">Контейнер form</h2>
<p><code>form</code> об’єднує елементи однієї форми. Без власних стилів цей контейнер не має видимої рамки.</p>
${code(`<form>
  <!-- Тут будуть підписи, поля та кнопки. -->
</form>`)}
<p>На робочому сайті атрибут <code>action</code> задає адресу обробника, а <code>method</code> — спосіб надсилання: GET або POST. Обробник має існувати.</p>
<p>Звичайний HTML-файл сам не перевіряє обліковий запис і не зберігає заявки. У наших макетах action не задаємо.</p>
<p>У майстерні можна вводити текст, переходити клавішею Tab, перевіряти required і відновлювати початкові значення. Надсилання даних і навігація форми заблоковані.</p>
<p>У збереженому HTML діють звичайні правила браузера: без action форма може спробувати надіслати дані на адресу цього документа. Це не створює обробника.</p>

<h2 id="forms-label">Підпис label та поле input</h2>
<p><code>input</code> створює поле або кнопку залежно від <code>type</code>. Закривального тега input немає.</p>
<p>Кожне поле повинно мати зрозумілий підпис <code>label</code>. Його <code>for</code> дорівнює унікальному <code>id</code> потрібного поля.</p>
<p>Натискання підпису переводить фокус у відповідне поле. Цей зв’язок також допомагає програмам читання з екрана називати поле.</p>
${labelDiagram}
<p><code>name</code> задає назву значення під час надсилання. Наприклад, поле з name="team" та текстом «Листок» утворює пару team=Листок.</p>
<p><code>id</code> потрібен для зв’язків усередині документа. <code>name</code> потрібен для даних форми. Вони можуть мати однакове написання, але виконують різні завдання.</p>

<h2 id="forms-text-password">Звичайний текст і пароль</h2>
<p><code>type="text"</code> дає однорядкове текстове поле. <code>type="password"</code> приховує символи на екрані крапками або іншими знаками.</p>
${code(`<label for="alias">Псевдонім</label>
<input id="alias" name="alias" type="text">
<label for="demo-password">Навчальний пароль</label>
<input id="demo-password" name="demo-password" type="password">`)}
<p>Приховані символи не означають шифрування чи захищене зберігання. Використовуй лише вигадані паролі для вправ.</p>
<p>Два парольні поля самі не перевіряють збіг значень. Додаткове поле «Повтор» у першій вправі показує лише будову макета.</p>

<h2 id="forms-values">value та placeholder</h2>
<p><code>value</code> у текстовому input задає початкове значення. Користувач може змінити його, якщо поле дозволяє редагування.</p>
<p><code>placeholder</code> показує короткий приклад у порожньому полі. Це підказка, а не введене значення і не заміна label.</p>
${code(`<label for="kit">Назва набору</label>
<input id="kit" name="kit" type="text" value="Паперовий сад">
<label for="alias-example">Псевдонім</label>
<input id="alias-example" name="alias" type="text" placeholder="Наприклад, Сова">`)}
<p>Поле з placeholder залишається порожнім, доки користувач не введе текст. Тому placeholder не задовольняє required.</p>

<h2 id="forms-textarea">Кілька рядків: textarea</h2>
<p><code>textarea</code> має початковий і закривальний теги. Початковий текст записують між ними, без атрибута value.</p>
${code(`<label for="note">Коментар</label>
<textarea id="note" name="note" rows="4">Потрібен зелений папір.</textarea>`)}
<p><code>rows</code> задає початкову кількість видимих рядків. CSS може змінити висоту та ширину поля.</p>
<p>Через <code>resize: vertical</code> користувач змінює висоту поля, не розширюючи всю сторінку. <code>resize: none</code> повністю прибирає ручну зміну розміру.</p>
<p>Залишай достатньо місця для тексту. У вправах використаємо min-height: 90px і можливість збільшити висоту.</p>

<h2 id="forms-state">required, readonly та disabled</h2>
${statesDiagram}
<ul>
<li><code>required</code> вимагає значення в редагованому полі перед надсиланням. Це проста перевірка браузера, а не перевірка правдивості тексту.</li>
<li><code>readonly</code> забороняє зміну текстового поля. Воно може отримати фокус, дозволяє копіювання й зазвичай входить до даних форми.</li>
<li><code>disabled</code> вимикає поле. Воно не отримує фокус клавішею Tab і не входить до даних форми.</li>
</ul>
<p>Ці атрибути застосовують за призначенням. Не поєднуй required із readonly чи disabled: такі поля не беруть участі у звичайній перевірці обов’язкового введення.</p>

<h2 id="forms-buttons">Три типи кнопок</h2>
<p><code>button</code> має закривальний тег і текст усередині. Завжди вказуй type, щоб дія кнопки була зрозумілою.</p>
${code(`<button type="submit">Перевірити поля</button>
<button type="reset">Відновити початкове</button>
<button type="button">Гостьовий режим</button>`)}
<ul>
<li><code>submit</code> запускає перевірку форми, а потім спробу надсилання. У майстерні надсилання заблоковане.</li>
<li><code>reset</code> повертає початкові значення всіх полів цієї форми. Воно не завжди очищає їх.</li>
<li><code>button</code> не має вбудованої дії. Для додаткової поведінки потрібна програма.</li>
</ul>
<p>Усередині форми button без явного type зазвичай працює як submit. Для переходу на іншу сторінку використовуй посилання a.</p>
<p>Ті самі типи існують у input. Для такої кнопки напис задає value, наприклад <code>&lt;input type="reset" value="Відновити"&gt;</code>.</p>
${resetDiagram}

<h2 id="forms-css">Оформлення та доступність</h2>
<p>Розташуй підпис над полем через display: block. Задай полям однакові відступи, а кнопкам — читабельні написи.</p>
${code(`form { width: 320px; max-width: 100%; padding: 20px; margin: 20px auto; box-sizing: border-box; }
label { display: block; margin-top: 12px; }
input, textarea { width: 100%; padding: 8px; box-sizing: border-box; font: inherit; }
textarea { min-height: 90px; resize: vertical; }
button:hover { background-color: #134e4a; }
input:focus, textarea:focus, button:focus { outline: 3px solid #d97706; outline-offset: 2px; }`)}
<p><code>box-sizing: border-box</code> включає padding і рамку в задану ширину. Тому поле з width: 100% поміщається всередині форми.</p>
<p><code>font: inherit</code> бере шрифт батьківського елемента. <code>outline-offset</code> створює відстань між контуром фокуса та полем.</p>
<p>У другій вправі flex розміщує зображення й форму поруч. <code>flex-wrap: wrap</code> переносить їх у вузькому вікні, а gap задає проміжок.</p>
<p>Для ілюстрації завантаж leaf.svg або комплект ZIP із матеріалів. У локальному редакторі збережи картинку поруч із index.html.</p>

<h2 id="forms-check">Перевірка форми</h2>
<ol>
<li>Натисни кожен label: фокус має перейти у відповідне поле.</li>
<li>Пройди форму клавішею Tab. Перевір видимий фокус і пропуск disabled.</li>
<li>Спробуй submit із порожнім required. Потім введи вигаданий текст і повтори.</li>
<li>Зміни textarea та натисни reset. Порівняй результат із початковим текстом.</li>
<li>Зменш вікно. Поля, підписи й кнопки повинні залишитися доступними.</li>
<li>Завантаж HTML для збереження роботи. Відкрий або імпортуй його, щоб продовжити пізніше.</li>
</ol>

<h2 id="forms-practice">Практика: від поля до форми</h2>
<p>Спочатку створи підписи й поля. Перевір зв’язки for/id, а потім додай стилі та кнопки.</p>
<div class="web-practice-mount"></div>`,
  },
};
