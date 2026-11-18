import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</code></pre>`;
}

const structureDiagram = `<figure class="web-diagram" aria-labelledby="semantic-media-structure-caption">
<figcaption id="semantic-media-structure-caption">HTML називає призначення кожної частини</figcaption>
<div class="web-code-result"><div class="web-diagram-card"><h3>Код → зміст</h3><pre class="web-visual-code"><code>&lt;header&gt;
  &lt;h1&gt;Медіаклуб&lt;/h1&gt;
  &lt;nav&gt;Посилання на розділи&lt;/nav&gt;
&lt;/header&gt;
<mark class="web-tag-match">&lt;main&gt;</mark>
  &lt;section&gt;
    &lt;h2&gt;Показ руху&lt;/h2&gt;
  &lt;/section&gt;
<mark class="web-tag-match">&lt;/main&gt;</mark>
&lt;footer&gt;Автор сторінки&lt;/footer&gt;</code></pre><p class="web-diagram-note">Main позначає основний зміст. Заголовки називають сторінку й теми її розділів.</p></div>
<div class="web-diagram-card"><h3>Та сама будова на екрані</h3><div class="web-browser-sample"><div style="padding:10px;border:2px solid #075985">header — назва й навігація</div><div style="padding:12px;border:3px solid #0f766e;margin:8px 0"><strong>main — основний зміст</strong><div style="padding:10px;border:2px dashed #0f766e;margin-top:8px">section — «Показ руху»</div></div><div style="padding:10px;border:2px solid #075985">footer — відомості про сторінку</div></div><p class="web-diagram-note">Рамки додано CSS. Самі назви тегів не створюють це оформлення.</p></div></div></figure>`;

const articleDiagram = `<figure class="web-diagram" aria-labelledby="semantic-media-article-caption">
<figcaption id="semantic-media-article-caption">Section — тема; article — самостійний матеріал</figcaption>
<div class="web-code-result"><div class="web-diagram-card"><h3>Підписи та вкладення</h3>${code('<section>\n  <h2>Рух</h2>\n  <article>\n    <h3>Позначка в кадрі</h3>\n    <p>Повний приклад і його пояснення.</p>\n  </article>\n</section>')}<p>Уяви статтю окремо від цієї сторінки. Чи зрозумілі її назва й зміст?</p></div>
<div class="web-diagram-card"><h3>Вибраний матеріал</h3><div class="web-browser-sample" style="border:2px dashed #075985"><strong>Розділ «Рух»</strong><div style="padding:12px;margin-top:10px;border:3px solid #0f766e"><strong>Стаття «Позначка в кадрі»</strong><p>Власний заголовок, приклад і пояснення утворюють завершений матеріал.</p></div></div><p class="web-diagram-note">Суцільна рамка позначає article, пунктирна — section. Не кожному section потрібен article.</p></div></div></figure>`;

const mediaDiagram = `<figure class="web-diagram" aria-labelledby="semantic-media-player-caption">
<figcaption id="semantic-media-player-caption">Source дає файл, controls — керування, опис — зміст</figcaption>
<div class="web-code-result"><div class="web-diagram-card"><h3>Відео та його частини</h3><pre class="web-visual-code"><code>&lt;video <mark class="web-tag-match">controls</mark> poster="leaf.svg"&gt;
  &lt;source src="<mark class="web-tag-match">motion.webm</mark>"
          type="video/webm"&gt;
  &lt;track src="motion.vtt" kind="captions"
         srclang="uk" label="Українська" default&gt;
  Браузер не підтримує відеоплеєр.
&lt;/video&gt;
&lt;p&gt;Геометрична позначка рухається
в межах кадру; мовлення немає.&lt;/p&gt;</code></pre></div>
<div class="web-diagram-card"><h3>Що бачить читач</h3><div class="web-browser-sample"><div style="padding:20px;border:2px solid #0f766e;text-align:center;background:#ecfdf5">Область відео<br>▶ Відтворення · Пауза · Час</div><p style="border-left:3px solid #0f766e;padding-left:10px">Видимий опис залишається під плеєром, навіть якщо відтворення не почалося.</p></div><p class="web-diagram-note">Це схема. Вправи нижче містять справжні плеєри й власні локальні файли.</p></div></div></figure>`;

export const semanticMediaDocuments: Record<string, EngineDocument> = {
  'semantic-media': {
    title: 'Тема 23. Семантичний HTML, відео та аудіо',
    html: `<p>Навчимося називати частини сторінки за призначенням і додавати власні відео та аудіо. Спочатку побудуємо зміст, а потім оформимо його CSS.</p>
<p>Назва HTML5 часто позначає появу сучасних можливостей HTML. Нині HTML розвивається як живий стандарт: для цих вправ достатньо знайомого запису <code>&lt;!DOCTYPE html&gt;</code>.</p>

<h2 id="semantic-media-meaning">Семантика пояснює призначення</h2>
<p>Семантичний елемент описує зміст своєї частини документа. Наприклад, nav позначає навігацію, а main — основний зміст.</p>
<p>Клас <code>header</code> на div є лише назвою для CSS. Тег <code>header</code> додатково повідомляє браузеру призначення цього блока.</p>
<p>Це допомагає читачам, інструментам пошуку та програмам озвучення розуміти структуру. Семантика не замінює зрозумілих заголовків і тексту.</p>
${structureDiagram}
<ul>
<li><code>header</code> містить вступну частину сторінки або матеріалу: назву, короткий вступ чи навігацію.</li>
<li><code>nav</code> об’єднує основні навігаційні посилання. Не кожна група посилань повинна бути nav.</li>
<li><code>main</code> позначає головний зміст документа. У наших сторінках буде один main, окремо від спільної шапки й підвалу.</li>
<li><code>footer</code> містить відомості про сторінку або матеріал: автора, примітку чи пов’язані посилання.</li>
</ul>
<p>Header і footer можуть належати також окремій article. Вони не означають обов’язкове прикріплення до країв вікна.</p>
<p>Колір, рамки, відступи й розташування задає CSS. Div залишається доречним для контейнера, який потрібен лише для оформлення.</p>

<h2 id="semantic-media-sections">Section та article</h2>
<p><code>section</code> об’єднує частину документа за однією темою. Зазвичай такий розділ має власний заголовок.</p>
<p><code>article</code> містить самостійний матеріал: нотатку, новину чи завершений приклад. Його зміст можна зрозуміти окремо від сусідів.</p>
${articleDiagram}
<p>Section може містити кілька article. Article теж може мати свої тематичні section. Вкладення обирай за змістом, а не за бажаною формою рамки.</p>
<p>Не створюй зайвий section лише для відступів. Якщо змістовної теми немає, використовуй div або CSS на наявному елементі.</p>
<p>Зберігай рівні заголовків: h1 називає сторінку, h2 — основні розділи, h3 — підрозділи або матеріали всередині них. Section не змінює рівень h1 автоматично.</p>

<h2 id="semantic-media-video">Відео з керуванням</h2>
<p><code>video</code> вставляє відеоплеєр. Атрибут <code>controls</code> показує стандартні засоби відтворення, паузи й перемотування.</p>
<p>Файл можна задати через src на video або через вкладений source. У прикладах використовуємо source, щоб одразу вказати формат.</p>
${code('<video controls preload="metadata" poster="leaf.svg">\n  <source src="motion.webm" type="video/webm">\n  Браузер не підтримує відеоплеєр.\n</video>')}
<p><code>source</code> не має закривального тега. Його src задає шлях, а type повідомляє формат, наприклад video/webm або video/mp4.</p>
<p>Можна вказати кілька source різних форматів. Браузер шукає підтримуваний варіант. Зміна type не перетворює файл на інший формат.</p>
<p><code>preload="metadata"</code> радить заздалегідь отримати основні відомості про файл. Це підказка браузеру, а не команда почати відтворення.</p>
<p><code>poster</code> задає зображення, яке можна показати до початку відтворення. У наших вправах це власний leaf.svg із матеріалів. Це умовна ілюстрація, а не кадр ролика.</p>
<p>Motion.webm — коротка беззвучна демонстрація руху геометричної позначки. Це не відео реального заняття й не відгук учня.</p>
${mediaDiagram}

<h2 id="semantic-media-audio">Аудіо та текстовий опис</h2>
<p><code>audio</code> відтворює звуковий файл. Controls додає керування, а src чи вкладений source називає файл.</p>
${code('<audio controls preload="metadata" src="signal.wav">\n  Браузер не підтримує аудіоплеєр.\n</audio>\n<p>Короткий навчальний тональний сигнал без мовлення.</p>')}
<p>У другій вправі використаємо розгорнутий запис: <code>&lt;source src="signal.wav" type="audio/wav"&gt;</code> усередині audio.</p>
<p>Signal.wav — власний тональний сигнал для навчання. Він не містить розмови, оцінки курсу чи прихованої інструкції.</p>
<p>Текстовий опис пояснює, що чути. Для мовного запису потрібна точна розшифровка важливого мовлення та звуків.</p>

<h2 id="semantic-media-captions">Запасний текст, опис і часова доріжка</h2>
<p>Текст між тегами audio або video є запасним для браузера, який не підтримує сам елемент. Він не є звичайним підписом під плеєром.</p>
<p>Такий текст не гарантує повідомлення про пошкоджений чи відсутній файл. Тому важливий опис пиши окремим видимим абзацом.</p>
<p><code>track</code> додає текстову доріжку до video. Файл WebVTT містить текст із часовими позначками.</p>
${code('<track src="motion.vtt" kind="captions"\n       srclang="uk" label="Українська" default>')}
<ul><li><code>src</code> указує файл доріжки.</li><li><code>kind="captions"</code> позначає текстовий супровід мовлення й важливих звуків. У беззвучній демонстрації доріжка містить короткі навчальні пояснення.</li><li><code>srclang="uk"</code> задає українську мову, label — видиму назву доріжки.</li><li><code>default</code> пропонує цю доріжку як початкову; показ також залежить від налаштувань браузера.</li></ul>
<p>У цьому беззвучному прикладі доріжка описує рух. Видимий опис під відео залишається доступним незалежно від ввімкнених титрів.</p>
<p>Доріжки можуть мати обмеження через походження файлу й ізоляцію перегляду. Якщо титри не показуються в рамці, перевір їх у локальному редакторі через HTTP-сервер. Опис під відео все одно має бути видимим.</p>

<h2 id="semantic-media-playback">Відтворення починає читач</h2>
<p>Не запускай звук автоматично. Дозволь читачу самому натиснути відтворення й налаштувати гучність.</p>
<p><code>autoplay</code> просить почати відтворення автоматично, <code>loop</code> — повторювати файл, <code>muted</code> — почати без звуку.</p>
<p>Автозапуск залежить від правил браузера. Навіть autoplay разом із muted не гарантує відтворення в кожному середовищі.</p>
<p>У цих вправах autoplay і loop не потрібні. Controls залишає керування читачу; короткий приклад можна запустити повторно вручну.</p>
<p>Для переходу до іншого розділу використовуй a. Не додавай кнопку «Записатися», якщо сторінка не виконує такої дії.</p>

<h2 id="semantic-media-size">Ширина та розміщення</h2>
${code('video {\n  display: block; width: 320px; max-width: 100%;\n  height: auto; margin: 12px auto;\n}\naudio {\n  display: block; width: 100%; max-width: 320px;\n  margin: 12px 0;\n}')}
<p>Max-width: 100% не дозволяє плеєру перевищити ширину контейнера. Height: auto зберігає пропорції відео чи постера.</p>
<p>Розташуй дві статті через display: flex, flex-wrap: wrap та gap. Дай article box-sizing: border-box і max-width: 100%.</p>
<p>Не приховуй переповнення всього body, щоб сховати помилку ширини. Зменш плеєр чи відступи в його контейнері.</p>

<h2 id="semantic-media-files">Власні файли й робота офлайн</h2>
${code('my-media-page/\n  index.html\n  leaf.svg\n  motion.webm\n  motion.vtt\n  signal.wav')}
<p>Усі файли прикладів створено для цього курсу. Завантаж медіа з матеріалів редактора, а leaf.svg — із банку зображень.</p>
<p>Для локального редактора збережи їх поруч із index.html. Шляхи src="motion.webm" та src="signal.wav" тоді збігатимуться з назвами файлів.</p>
<p>Файл із розширенням .vtt збережи як текстовий файл WebVTT, без доданого .txt. Назви й регістр літер мають точно збігатися.</p>
<p>Завантаж HTML для збереження коду. Щоб продовжити пізніше, відкрий його в майстерні. Перевір відтворення без інтернету та видимі описи без запуску медіа.</p>
<p>Вигляд стандартних плеєрів залежить від браузера. Зразки показують розміщення й текст, а не обов’язковий вигляд кожної кнопки.</p>

<h2 id="semantic-media-check">Самоперевірка будови</h2>
<ol><li>Знайди єдиний main і перевір послідовність h1, h2 та h3.</li><li>Поясни, чому кожен section є темою, а кожен article — завершеним матеріалом.</li><li>Перевір навігаційні посилання та унікальні id.</li><li>Запусти й призупини відео та аудіо. Переконайся, що вони не запускаються самі.</li><li>Прочитай видимі описи, не запускаючи плеєри.</li><li>Зменш ширину до 390px, збережи HTML і повторно відкрий його.</li></ol>

<h2 id="semantic-media-practice">Практика: зміст і медіа разом</h2>
<p>Спочатку створи назви й розділи. Потім додай плеєри, опис і доріжку. Наприкінці оформи сторінку CSS.</p>
<div class="web-practice-mount"></div>`,
  },
};
