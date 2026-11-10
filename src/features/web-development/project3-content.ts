import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
}

const filesDiagram = `<figure class="web-diagram" aria-labelledby="project3-files-caption">
<figcaption id="project3-files-caption">Чотири файли: дві сторінки та дві таблиці стилів</figcaption>
<div class="web-code-result">
<div class="web-diagram-card"><h3>Картка експедиції</h3>${code('index.html\n<link rel="stylesheet" href="style.css">\n<a href="world.html">Відкрити мапу</a>')}<p class="web-diagram-note">style.css оформлює форму. Посилання називає файл другої сторінки.</p></div>
<div class="web-diagram-card"><h3>Мапа станцій</h3>${code('world.html\n<link rel="stylesheet" href="world.css">\n<a href="index.html">Повернутися</a>')}<p class="web-diagram-note">world.css оформлює мапу. Зворотне посилання повертає до картки.</p></div>
</div></figure>`;

const positionDiagram = `<figure class="web-diagram" aria-labelledby="project3-position-caption">
<figcaption id="project3-position-caption">.map задає систему координат для .pin</figcaption>
<div class="web-code-result"><div class="web-diagram-card"><h3>Код → вибрані елементи</h3><pre class="web-visual-code"><code>&lt;div <mark class="web-tag-match">class="map"</mark>&gt;
  &lt;a <mark class="web-tag-match">class="pin garden"</mark> href="#garden"&gt;Сад&lt;/a&gt;
&lt;/div&gt;
.map { position: relative; }
.pin { position: absolute; width: 28%; }
.garden { top: 12%; left: 4%; }</code></pre><p class="web-diagram-note">Класи pin і garden належать одному посиланню. pin задає спільне оформлення, garden — координати.</p></div>
<div class="web-diagram-card"><h3>Система координат</h3><div style="position:relative;height:170px;border:3px double #0f766e;background:#dcfce7"><div style="position:absolute;top:12%;left:4%;width:28%;box-sizing:border-box;padding:8px;border:2px solid #0f766e;background:white;text-align:center">Сад</div><p style="position:absolute;bottom:0;left:8px;right:8px;font-size:13px">top — від верхнього краю<br>left — від лівого краю</p></div><p class="web-diagram-note">Рамка позначає map. Зміна положення мапи переносить позначку разом із нею.</p></div></div></figure>`;

export const project3Documents: Record<string, EngineDocument> = {
  'mini-project-3': {
    title: 'Міні-проєкт 3. Мапа шкільних відкриттів',
    html: `<p>Створи невеликий сайт для вигаданої шкільної експедиції. Перша сторінка містить картку команди, друга — мапу шести станцій.</p>
<p>Станції не позначають реальні місця. На кожній є коротке творче завдання. Тексти й зображення можна змінити після завершення базового варіанта.</p>
<p>Проєкт поєднує зовнішній CSS, модель блока, Flexbox, форми, позиціонування та посилання. Починай із будови, а оформлення додавай поступово.</p>

<h2 id="project3-files">План файлів і переходів</h2>
${filesDiagram}
${code('my-expedition/\n  index.html\n  style.css\n  world.html\n  world.css\n  meadow.svg\n  leaf.svg\n  flower.svg\n  bird.svg\n  rabbit.svg\n  comets.svg\n  waves.svg')}
<p>Обидві HTML-сторінки мають lang="uk", UTF-8, viewport і власний title. У head кожної є link на відповідний CSS.</p>
<p>У CSS-файлах не пиши теги style. Назви файлів і регістр літер повинні точно збігатися з href.</p>
<p>Обидва CSS-файли лежать поруч із SVG. Тому фон мапи має короткий шлях <code>url("meadow.svg")</code>.</p>

<h2 id="project3-form">Картка експедиції</h2>
<p>На index.html додай h1, вступ і form із h2 «Картка експедиції». У вступі поясни, що це навчальний макет без збереження заявок.</p>
<ol>
<li><strong>Команда.</strong> Fieldset із legend містить три підписані поля: псевдонім капітана, назву команди та навчальний пароль. Усі мають required.</li>
<li><strong>Стартова станція.</strong> Select із підписом має варіанти Сад, Вежа та Гавань. Сад обраний через selected; Гавань недоступна через disabled.</li>
<li><strong>Формат експедиції.</strong> Два radio мають спільний name="format". Перший варіант «Разом із командою» має checked, другий — «Удвох».</li>
<li><strong>Матеріали.</strong> Чотири checkbox пропонують Блокнот, Олівці, Наліпки й Телескоп. Блокнот спочатку обраний, Телескоп недоступний.</li>
<li><strong>Ідея для маршруту.</strong> Підписана textarea дозволяє написати кілька рядків. Залиш resize: vertical.</li>
<li><strong>Кнопки.</strong> Submit «Перевірити поля» перевіряє required. Reset «Відновити початкове» повертає початкові значення й вибори.</li>
</ol>
<p>Використовуй лише вигадані значення. Парольне поле приховує символи, але саме не створює захищеного облікового запису.</p>
<p>Кожне текстове поле має унікальний id, label із відповідним for та name. Radio й checkbox можна обгорнути у власні label.</p>
<p>Перемикачі з однаковим name утворюють один вибір у цій формі. Прапорці дозволяють незалежно вибрати кілька матеріалів.</p>
<p>Для повторення відкрий <a href="#/web/html-css/forms-basics">тему 18</a> та <a href="#/web/html-css/forms-choice">тему 19</a>.</p>

<h2 id="project3-navigation">Перехід — це посилання</h2>
${code('<button type="submit">Перевірити поля</button>\n<!-- Посилання стоїть після form. -->\n<a href="world.html">Відкрити мапу</a>')}
<p>Форма не є системою реєстрації. У проєкті немає обробника, який зберігає заявку або перевіряє пароль.</p>
<p>У майстерні надсилання форми заблоковане. У завантаженому HTML submit без action може спробувати відкрити адресу поточного документа з даними.</p>
<p>Тому для мапи використай окреме посилання. Воно відкриває world.html незалежно від заповнення полів і нічого не передає.</p>
<p>На world.html додай зворотне посилання на index.html. Перехід між окремими HTML-файлами може повернути поля до початкового стану.</p>

<h2 id="project3-map">Мапа шести станцій</h2>
<p>На world.html розмісти h1, пояснення та div.map. Усередині мапи є шість a.pin із зображенням і видимою назвою.</p>
${positionDiagram}
<p>Контейнер map має position: relative. Посилання pin мають position: absolute, тому top і left відраховуються від мапи.</p>
<p>Не використовуй fixed для цих позначок. Вони повинні рухатися разом із мапою, коли читач прокручує сторінку.</p>
<p>Мапа має width: 100% і height: 360px. Три колонки отримують left: 4%, 36%, 68%; два ряди — top: 12%, 58%.</p>
<p>Ширина кожного pin — 28% із box-sizing: border-box. Вона включає padding та рамку й залишає проміжок між колонками.</p>
<p>Усередині pin зображення має width: 64px, max-width: 100%, height: auto. Видима назва пояснює призначення посилання, тому alt картинки порожній.</p>
<ul>
<li>Сад — leaf.svg — href="#garden".</li>
<li>Квітник — flower.svg — href="#flower".</li>
<li>Вежа — bird.svg — href="#tower".</li>
<li>Галявина — rabbit.svg — href="#meadow".</li>
<li>Стадіон — comets.svg — href="#stadium".</li>
<li>Гавань — waves.svg — href="#harbor".</li>
</ul>
<p>Після мапи додай h2 та шість div.station. Кожен має відповідний унікальний id, h3 з назвою та абзац із творчим завданням.</p>
<p>Перехід #garden шукає id усередині world.html. Перехід world.html відкриває інший файл. Це різні адреси.</p>

<h2 id="project3-style">Відступи, ширина й стани</h2>
<p>Задай формі display: flex і flex-direction: column. Її ширина 360px, max-width: 100%, padding: 20px, margin: 20px auto.</p>
<p>Для форми й текстових полів використай box-sizing: border-box. Поля, select та textarea мають width: 100% і padding: 8px.</p>
<p>Для fieldset задай min-width: 0. Це дозволяє групі звузитися разом із формою. Для radio й checkbox не задавай width: 100%.</p>
<p>У map збережи рамку 4px double #0f766e та фон meadow.svg. Картки станцій мають білий фон і рамку 2px solid #0f766e.</p>
<p>Hover змінює фон позначки. Focus має видимий outline 3px solid #d97706. Не змінюй товщину рамки між станами.</p>
<p>Повні параметри базового оформлення наведено у списку самоперевірки під майстернею. Зразки показують вигляд обох сторінок.</p>

<h2 id="project3-steps">Етапи роботи</h2>
<ol>
<li>Створи чотири файли. Перевір підключення простим правилом для кольору body у кожному CSS.</li>
<li>Додай на обидві сторінки посилання переходу й перевір точні назви файлів.</li>
<li>Побудуй форму без CSS. Натисни підписи й перевір групи radio, checkbox, список і reset.</li>
<li>Додай оформлення форми. Зменш ширину вікна й перевір, що поля залишаються всередині.</li>
<li>Побудуй мапу та шість видимих описів. Перевір кожен href та id.</li>
<li>Розмісти позначки через relative/absolute. Додай стани hover та focus.</li>
<li>Збережи всі файли. Перевір дві сторінки та SVG без інтернету.</li>
</ol>

<h2 id="project3-workspace">Файли в майстерні</h2>
<p>Кнопки файлів вибирають, який документ ти редагуєш. Окремі кнопки сторінок вибирають, яку сторінку показує перегляд.</p>
<p>Натисни «Оновити результат» після змін. Перегляд застосовує відповідний CSS із цього проєкту. Зовнішні файли з мережі не завантажуються.</p>
<p>Якорі станцій працюють усередині перегляду. Переходи між index.html та world.html перевір у завантаженому проєкті; тут вибирай сторінку кнопками перегляду.</p>
<p>Завантаж кожен із чотирьох файлів і збережи їх в одну папку. Для продовження вибери потрібний файл у майстерні й відкрий відповідний збережений документ.</p>
<p>Зображення можна завантажити з матеріалів окремо або ZIP-комплектом. Для локального редактора розпакуй SVG поруч із HTML та CSS.</p>
<p>Чернетки живуть лише в поточному сеансі сторінки. Перемикання файлів зберігає їх, а перезавантаження — скидає. Зберігай роботу після кожного етапу.</p>

<h2 id="project3-check">Перевірка готового сайту</h2>
<ul>
<li>Кожна сторінка підключає свій CSS. Перехід на мапу й повернення працюють у локальній папці.</li>
<li>Підписи пов’язані з полями, radio утворюють одну групу, checkbox дозволяють незалежні вибори.</li>
<li>Required перевіряє порожні поля. Reset відновлює початкові значення, selected і checked.</li>
<li>Шість позначок залишаються на мапі й ведуть до правильних описів.</li>
<li>Tab і Enter працюють; фокус видно. При ширині 390px немає прокрутки всього документа по горизонталі.</li>
<li>Усі чотири файли збережено. Зображення й фони видно без мережі.</li>
</ul>
<p>Після базового варіанта придумай власні станції та завдання. Збережи зв’язки файлів, будову форми, шість цілей і доступний фокус.</p>
<p>Поясни вчителю різницю між submit і посиланням та між absolute і fixed.</p>
<div class="web-practice-mount"></div>`,
  },
};
