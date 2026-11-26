import type { DocumentSection } from '../../../../components/document';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
}

const breakpointDiagram = `<figure class="web-diagram" aria-labelledby="responsive-breakpoints-caption"><figcaption id="responsive-breakpoints-caption">Одна сторінка, три ширини області перегляду</figcaption><div class="web-code-result"><div class="web-diagram-card"><h3>CSS: базове правило та зміни</h3><pre class="web-visual-code"><code>.board { display: flex;
  flex-direction: column; }
@media (<mark class="web-tag-match">min-width: 600px</mark>) {
  .board { flex-direction: row; }
}
@media (<mark class="web-tag-match">min-width: 1000px</mark>) {
  .board { gap: 24px; }
}</code></pre><p>Правила вибирають ту саму board. Змінюється розміщення її дітей, а не порядок HTML.</p></div><div class="web-diagram-card"><h3>Ширина → результат</h3><div class="web-browser-sample"><div style="border:2px solid #0369a1;padding:8px;margin-bottom:10px">390px: стовпець<div style="border:1px dashed #64748b;padding:6px;margin-top:6px">План</div><div style="border:1px dashed #64748b;padding:6px;margin-top:6px">Журнал</div></div><div style="border:2px solid #0f766e;padding:8px;margin-bottom:10px">720px: рядок<div style="display:flex;gap:6px"><div style="border:1px dashed #64748b;padding:6px;flex:1">План</div><div style="border:1px dashed #64748b;padding:6px;flex:1">Журнал</div></div></div><div style="border:2px solid #7c3aed;padding:8px">1024px: рядок, більший проміжок</div></div><p class="web-diagram-note">Рамки й підписи показують три режими. Це приклади ширин, а не визначення моделі телефона чи комп’ютера.</p></div></div></figure>`;

const overflowDiagram = `<figure class="web-diagram" aria-labelledby="responsive-overflow-caption"><figcaption id="responsive-overflow-caption">Рамка обмежує видиму частину; текст залишається в документі</figcaption><div class="web-code-result"><div class="web-diagram-card"><h3>Код → вибрана область</h3>${code('<div class="scroll-box" tabindex="0"\n     role="region" aria-label="Журнал">\n  <p>Перший запис…</p>\n  <p>Другий запис…</p>\n  <p>Третій запис…</p>\n</div>\n.scroll-box { max-height: 100px;\n  overflow: auto; }')}<p>Tabindex додає область у порядок Tab. Назва «Журнал» пояснює її призначення.</p></div><div class="web-diagram-card"><h3>Результат</h3><div class="web-browser-sample" tabindex="0" role="region" aria-label="Зразок прокрутки" style="max-height:100px;overflow:auto;border:2px solid #0e7490"><p>Перший запис: обираємо станцію.</p><p>Другий запис: готуємо матеріали.</p><p>Третій запис: записуємо враження.</p><p>Останній запис: домовляємося про наступну зустріч.</p></div><p class="web-diagram-note">Прокрути цей зразок вказівником або дотиком. Смуга може ховатися за правилами операційної системи.</p></div></div></figure>`;

export const responsiveScrollDocuments: Record<string, DocumentSection> = {
  'responsive-scroll': {
    title: 'Тема 24. Адаптивність, прокрутка та GitHub Pages',
    html: `<p>Навчимося змінювати розміщення елементів залежно від ширини вікна та прокручувати довгий вміст усередині блока.</p>
<p>Наприкінці розглянемо ручну публікацію готового статичного сайту. Усі вправи можна виконати локально без облікового запису GitHub.</p>

<h2 id="responsive-viewport">Ширина вікна та viewport</h2>
<p>Область перегляду — частина вікна браузера, де показано сторінку. Її ширина може змінюватися без зміни самого пристрою.</p>
<p>У head збережи <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code>. Ця настройка допомагає сторінці відповідати ширині мобільного вікна.</p>
<p>У майстерні медіазапит перевіряє ширину рамки результату. Широка сторінка курсу може містити вузький перегляд.</p>
<p>Зменшуй вікно або використай режим адаптивного перегляду в інструментах розробника. Перевір 390, 720 і 1024px.</p>

<h2 id="responsive-media">@media: правило з умовою</h2>
<p><code>@media</code> — правило CSS, а не HTML-тег. Воно застосовує вкладені стилі лише тоді, коли виконується умова.</p>
<p><code>min-width: 600px</code> означає «ширина не менша за 600px». <code>max-width: 600px</code> означає «ширина не більша за 600px».</p>
${breakpointDiagram}
<p>Спочатку опиши вузький вигляд без медіазапитів. Потім додавай зміни для ширших вікон через min-width.</p>
<p>Поріг 600px не означає «всі телефони». Обирай поріг там, де твій вміст потребує іншого розміщення.</p>
${code('.board { display: flex; flex-direction: column; gap: 12px; }\n@media (min-width: 600px) {\n  .board { flex-direction: row; }\n}\n@media (min-width: 1000px) {\n  .board { gap: 24px; }\n}')}
<p>За ширини 1024px виконуються обидві min-width умови. Сторінка отримує рядок із першого запиту та проміжок із другого.</p>
<p>Якщо правила однакової сили змінюють одну властивість, діє пізніший запис. Тому впорядковуй зміни та перевіряй межі.</p>

<h2 id="responsive-ranges">Обмежений діапазон і max-width</h2>
${code('@media (min-width: 600px) and (max-width: 900px) {\n  .board { border-color: #7c3aed; }\n}\n@media (max-width: 500px) {\n  h1 { font-size: 24px; }\n}')}
<p>Слово <code>and</code> вимагає виконання обох умов. Спеціальна рамка з прикладу діє від 600 до 900px включно.</p>
<p>За 901px діє базовий колір рамки. Інші властивості дошки не скасовуються лише через завершення цього діапазону.</p>
<p>Перевір обидві межі та сусідні значення. Не залишай випадкових проміжків між правилами для основного розміщення.</p>
<p>Властивість <code>max-width</code> у звичайному правилі обмежує ширину елемента. Умова max-width у @media перевіряє ширину вікна. Це різні дії.</p>
<p>Для flex-карток задай <code>min-width: 0</code>, щоб вони могли звужуватися. <code>box-sizing: border-box</code> включає padding і рамку в задану ширину.</p>

<h2 id="responsive-overflow">Overflow: коли вміст не вміщується</h2>
<p>Звичайний блок росте разом із текстом. Якщо його висоту обмежено, довгий вміст може вийти за межі.</p>
<ul>
<li><code>visible</code> залишає зайвий вміст видимим поза рамкою. Він може перекривати наступні елементи.</li>
<li><code>hidden</code> обрізає зайву видиму частину без звичайної смуги прокрутки. Не використовуй його для приховування важливих абзаців.</li>
<li><code>scroll</code> створює область прокручування. Система може приховувати смуги, навіть якщо місце для них передбачено.</li>
<li><code>auto</code> дозволяє прокручування за потреби. Якщо все вмістилося, прокрутка не потрібна.</li>
</ul>
${overflowDiagram}
<p><code>height</code> задає висоту, а <code>max-height</code> лише її верхню межу. Для короткого журналу max-height не створює зайвої порожньої площі.</p>
<p><code>overflow-x</code> керує горизонтальним напрямком, <code>overflow-y</code> — вертикальним. Для довгого тексту спочатку дозволь перенесення рядків.</p>
<p>Не приховуй переповнення всього body, щоб замаскувати помилку ширини. Виправ ширину блока або створи зрозумілий локальний контейнер.</p>

<h2 id="responsive-keyboard">Прокрутка клавіатурою</h2>
${code('<div class="scroll-box" tabindex="0" role="region"\n     aria-label="Журнал станцій">\n  <p>Запис станції…</p>\n</div>\n.scroll-box:focus {\n  outline: 3px solid #d97706;\n  outline-offset: 3px;\n}')}
<p><code>tabindex="0"</code> додає область у звичайний порядок Tab. Це дозволяє сфокусувати її перед прокручуванням.</p>
<p><code>role="region"</code> разом з aria-label дає області змістову назву. Додавай такі названі області лише там, де вони допомагають орієнтуватися.</p>
<p>Натисни Tab до появи контуру, потім стрілки, Page Down або Page Up. Наступний Tab переводить фокус далі.</p>
<p>Контур не повинен зникати. Не роби область клавіатурною пасткою та не ховай останній запис під іншим блоком.</p>

<h2 id="responsive-scrollbar">Оформлення смуги прокрутки</h2>
${code('.scroll-box {\n  overflow: auto;\n  scrollbar-color: #0e7490 #e2e8f0;\n  scrollbar-width: auto;\n}\n.scroll-box::-webkit-scrollbar { width: 14px; }\n.scroll-box::-webkit-scrollbar-track { background-color: #e2e8f0; }\n.scroll-box::-webkit-scrollbar-thumb {\n  background-color: #0e7490; border-radius: 7px;\n}')}
<p><code>scrollbar-color</code> задає колір бігунка й доріжки. <code>scrollbar-width</code> пропонує звичайну, тонку або приховану смугу; залишимо auto.</p>
<p>Псевдоелементи <code>::-webkit-scrollbar</code> та його частини — необов’язкове розширення для браузерів, які їх підтримують.</p>
<p>Перед <code>::</code> немає пробілу: правило стосується смуги саме scroll-box. Пробіл змінив би область вибору на нащадків.</p>
<p>Стандартні властивості можуть мати перевагу над цими псевдоелементами. Не вимагай однакового вигляду смуг у всіх браузерах.</p>
<p>Користувач також може мати приховані системні смуги або особливий режим контрастності. Читання тексту має працювати без декоративних стилів.</p>

<h2 id="responsive-github">GitHub і необов’язкова публікація</h2>
<p>Репозиторій GitHub зберігає файли та історію їхніх змін. GitHub Pages публікує статичний сайт із таких файлів.</p>
<p>Збереження файлів у репозиторії й публікація сайту — окремі кроки. Для вправ достатньо зберегти index.html і відкрити його локально.</p>
<p>Якщо група публікує роботи, використайте обліковий запис і репозиторій, які погодив учитель. Створення нового облікового запису не є умовою цієї теми.</p>
<p>Безоплатний GitHub Pages доступний для публічних репозиторіїв. Можливість роботи з приватними залежить від плану. Опубліковані сторінки доступні в інтернеті.</p>
<p>Перед публікацією прибери особисті дані, паролі та інші приватні файли. Публікуй лише погоджені навчальні матеріали.</p>
<p>Актуальні умови пояснює <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages" target="_blank" rel="noopener noreferrer">офіційний опис GitHub Pages</a>.</p>

<h2 id="responsive-publish">Ручний порядок публікації</h2>
<ol>
<li>У погодженому репозиторії відкрий Add file → Upload files. Додай index.html і потрібні локальні ресурси, зберігаючи структуру папок.</li>
<li>Запиши короткий опис зміни. Заверши запропонований GitHub процес збереження; за потреби зміна проходить через окрему гілку та pull request.</li>
<li>Коли файли є у main, відкрий Settings → Pages. Для цих налаштувань потрібен відповідний доступ до репозиторію.</li>
<li>У Build and deployment вибери Source → Deploy from a branch. Укажи наявну гілку main та папку /(root), якщо index.html лежить у корені.</li>
<li>Натисни Save й дочекайся завершення розгортання. Відкрий адресу, яку покаже Pages. Час публікації може відрізнятися.</li>
<li>Перевір сторінку, стилі, картинки й посилання на телефоні та комп’ютері. Якщо публікація не вдалася, переглянь повідомлення про розгортання в репозиторії.</li>
</ol>
<p>Для сайту проєкту адреса зазвичай містить назву репозиторію: <code>https://ім’я.github.io/назва-проєкту/</code>.</p>
<p>Відносний шлях <code>href="style.css"</code> шукає файл поруч із HTML. Шлях <code>href="/style.css"</code> починається від кореня домену й може пропустити папку проєкту.</p>
<p>Назви файлів і регістр літер мають збігатися. Після зміни файлів дочекайся нового розгортання перед перевіркою.</p>
<p>Порядок звірено з <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site" target="_blank" rel="noopener noreferrer">офіційною інструкцією джерела публікації</a> та <a href="https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository" target="_blank" rel="noopener noreferrer">інструкцією завантаження файлів</a>. Назви кнопок можуть змінюватися.</p>

<h2 id="responsive-practice">Практика: ширина, прокрутка та збереження</h2>
<p>Почни з локальних вправ. Перевір усі режими, прокрутку й фокус. Завантаж HTML та відкрий збережений файл у майстерні для продовження роботи.</p>
<p>Публікацію виконуйте лише як окрему погоджену дію. Редактор сам не створює репозиторій і не завантажує файли на GitHub.</p>
<div class="web-practice-mount"></div>`,
  },
};
