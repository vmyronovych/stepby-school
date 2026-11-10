import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</code></pre>`;
}

const treeDiagram = `<figure class="web-diagram" aria-labelledby="dropdown-tree-caption"><figcaption id="dropdown-tree-caption">Кнопка та підменю належать одному головному пункту</figcaption><div class="web-code-result"><div class="web-diagram-card"><h3>HTML: вкладений список</h3><pre class="web-visual-code"><code>&lt;ul class="menu"&gt;
  &lt;li <mark class="web-tag-match">class="route-item"</mark>&gt;
    &lt;button type="button"&gt;Стежки ▾&lt;/button&gt;
    <mark class="web-tag-match">&lt;ul class="submenu"&gt;</mark>
      &lt;li&gt;&lt;a href="#garden"&gt;Сад&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="#tower"&gt;Вежа&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;</code></pre><p class="web-diagram-note">Вкладений ul стоїть усередині li, перед його закривальним тегом.</p></div><div class="web-diagram-card"><h3>Структура → результат</h3><div class="web-browser-sample"><div style="padding:10px;border:2px solid #0f766e">Головний li: Стежки<div style="margin-top:10px;padding:10px;border:2px dashed #0f766e">Дочірній ul.submenu<br>• Сад → #garden<br>• Вежа → #tower</div></div></div><p class="web-diagram-note">Суцільна рамка позначає батьківський пункт. Пунктирна рамка — його вкладений список.</p></div></div></figure>`;

const selectorDiagram = `<figure class="web-diagram" aria-labelledby="dropdown-selector-caption"><figcaption id="dropdown-selector-caption">Вибраний батько → тільки його безпосереднє підменю</figcaption><div class="web-code-result"><div class="web-diagram-card"><h3>Правило CSS</h3><pre class="web-visual-code"><code>.submenu { display: none; }
.menu <mark class="web-tag-match">&gt; li:hover &gt; .submenu</mark>,
.menu <mark class="web-tag-match">&gt; li:focus-within &gt; .submenu</mark> {
  display: block;
}</code></pre><p><code>&gt;</code> означає безпосередню дитину. Перший знак знаходить головні li, другий — їхні власні підменю.</p></div><div class="web-diagram-card"><h3>Результат при фокусі</h3><div class="web-browser-sample"><div style="padding:8px;border:3px solid #d97706">Стежки — фокус усередині<div style="padding:8px;border:2px solid #0f766e;background:#ccfbf1">Сад<br>Вежа</div></div><p style="padding:8px;border:1px dashed #64748b">Матеріали — інше підменю приховане</p></div><p class="web-diagram-note">Рамка фокуса та підпис показують активний пункт. Не покладайся лише на зміну кольору.</p></div></div></figure>`;

const positionDiagram = `<figure class="web-diagram" aria-labelledby="dropdown-position-caption"><figcaption id="dropdown-position-caption">Позиція підменю залежить від батьківського li</figcaption><div class="web-code-result"><div class="web-diagram-card"><h3>Вертикальне меню: праворуч</h3>${code('.menu > li { position: relative; }\n.submenu { position: absolute;\n  top: 0; left: 100%; }')}<div style="position:relative;height:100px"><div style="width:45%;box-sizing:border-box;padding:8px;border:2px solid #0f766e">Стежки</div><div style="position:absolute;top:0;left:45%;width:50%;box-sizing:border-box;padding:8px;border:2px dashed #0f766e">Сад<br>Вежа</div></div><p class="web-diagram-note">Left: 100% починає підменю біля правого краю головного пункту.</p></div><div class="web-diagram-card"><h3>Горизонтальне меню: нижче</h3>${code('.menu > li { position: relative; }\n.submenu { position: absolute;\n  top: 100%; left: 0; }')}<div style="position:relative;height:100px"><div style="padding:8px;border:2px solid #0f766e">Стежки</div><div style="padding:8px;border:2px dashed #0f766e">Сад<br>Вежа</div></div><p class="web-diagram-note">Top: 100% починає підменю від нижнього краю головного пункту.</p></div></div></figure>`;

export const dropdownMenuDocuments: Record<string, EngineDocument> = {
  'dropdown-menu': {
    title: 'Тема 22. Випадне меню: вкладені списки та фокус',
    html: `<p>Побудуємо навігацію з вкладеними посиланнями. Підменю відкриватиметься при наведенні вказівника або переході фокуса всередину пункту.</p>
<p>Усі посилання в наших прикладах ведуть до справжніх розділів цієї сторінки. Кнопка розкриває групу посилань; сама вона нікуди не переходить.</p>

<h2 id="dropdown-structure">Nav, списки й вкладення</h2>
<p><code>nav</code> позначає область основної навігації. Додай <code>aria-label</code>, наприклад «Експедиція», щоб назвати її призначення.</p>
<p><code>ul</code> описує список, а <code>li</code> — його пункт. Вкладений ul створює групу підпунктів.</p>
${treeDiagram}
<p>Не став другий ul між двома головними li. Вкладай його в той li, до якого належить група.</p>
<p>Для переходу використовуй <code>a href="…"</code>. Для головного пункту з підменю використай <code>button type="button"</code>.</p>
<p>Звичайна кнопка отримує фокус через Tab і натискання. Div або простий текст li не отримують клавіатурний фокус автоматично.</p>
${code('<nav aria-label="Експедиція">\n  <ul class="menu">\n    <li><a href="#start">Початок</a></li>\n    <!-- Тут розмісти пункт Стежки із вкладеним списком. -->\n  </ul>\n</nav>\n<h2 id="start">Початок</h2>')}
<p>Не додавай <code>role="menu"</code> до звичайної навігації сайту. Такий інтерфейс має окремі правила керування; тут достатньо nav, списків, кнопок і посилань.</p>

<h2 id="dropdown-display">Display: приховуємо й показуємо</h2>
<p><code>display: none</code> прибирає підменю з розкладки. Його посилання також недоступні для фокуса й програм озвучення, поки список прихований.</p>
<p><code>display: block</code> показує підменю. Його точне місце задаватимемо через position, top і left.</p>
<p>Теги не зникають із HTML-коду. Змінюється те, як браузер розміщує та показує відповідний елемент.</p>
<p><code>display: inline</code> залишає елемент у рядку тексту; width і height не працюють для звичайного рядкового елемента так само, як для block.</p>
<p><code>inline-block</code> дозволяє елементам стояти поруч і мати власну ширину. У наших горизонтальних меню використаємо вже знайомий Flexbox.</p>

<h2 id="dropdown-open">Hover, focus-within та знак &gt;</h2>
<p><code>:hover</code> спрацьовує, коли вказівник розташований над елементом або його нащадками.</p>
<p><code>:focus-within</code> спрацьовує, коли фокус має сам елемент або будь-який елемент усередині нього.</p>
${selectorDiagram}
<p>Коли Tab переводить фокус на кнопку Стежки, li отримує стан focus-within. Підменю стає видимим, а його посилання входять у порядок Tab.</p>
<p>Під час переходу Tab на посилання Сад фокус залишається всередині того самого li. Тому підменю не закривається.</p>
<p>Після виходу фокуса за межі li підменю закривається, якщо вказівник теж не перебуває над ним.</p>
<p>Не залишай проміжок між кнопкою й підменю. Інакше при русі вказівника пункт втратить hover, і підменю закриється.</p>

<h2 id="dropdown-position">Relative для батька, absolute для підменю</h2>
${positionDiagram}
<p>Без position: relative на потрібному li підменю може отримати іншу опору для координат. Перевір батьківський пункт перед зміною top і left.</p>
<p>Абсолютне підменю не збільшує висоту головного списку. Воно може перекривати вміст під навігацією.</p>
<p>У вправах контейнер stage залишає місце під відкритий список. Не ховай важливий текст під ним.</p>
<p><code>z-index: 1</code> на позиціонованому підменю допомагає показати його над сусіднім звичайним вмістом. Це порядок накладання, а не відступ.</p>
<p>Позиціонування повтори в <a href="#/web/html-css/block-elements">темі 14</a>, а вкладені списки — у <a href="#/web/html-css/lists-lines">темі 4</a>.</p>

<h2 id="dropdown-look">Великі області натискання й видимий фокус</h2>
${code('.menu, .submenu { list-style: none; margin: 0; padding: 0; }\n.menu a, .menu button {\n  display: block; width: 100%; box-sizing: border-box;\n  padding: 12px; border: 0; font: inherit;\n  color: white; background-color: transparent;\n  text-align: left; text-decoration: none;\n}\n.menu a:focus, .menu button:focus {\n  outline: 3px solid #fbbf24; outline-offset: -3px;\n}')}
<p>Display: block поширює посилання на доступну ширину пункту. Padding збільшує область натискання, а border-box включає відступи в width.</p>
<p>Прозорий фон і font: inherit дозволяють оформити кнопку поруч із посиланнями однаково. Button усе одно залишається кнопкою за поведінкою.</p>
<p>Outline показує фокус без зміни розмірів. Від’ємний outline-offset розміщує контур усередині області, щоб сусідній блок його не закрив.</p>
<p>Залиш назви пунктів зрозумілими. Не додавай посилання «Вихід», якщо на статичній сторінці немає такої дії.</p>

<h2 id="dropdown-mobile">Вузьке вікно: media-запит і звичайний потік</h2>
<p>Підменю праворуч може вийти за межі телефона. Змінимо розміщення, коли ширина вікна перегляду не перевищує 600px.</p>
${code('@media (max-width: 600px) {\n  .menu { width: 100%; flex-direction: column; }\n  .submenu { position: static; width: auto; }\n}')}
<p><code>@media</code> застосовує правила лише за вказаної умови. Max-width: 600px означає «ширина вікна не більша за 600px».</p>
<p>У редакторі умовою є ширина рамки результату. Навіть на широкому моніторі сама рамка може бути вузькою.</p>
<p><code>position: static</code> повертає підменю у звичайний потік. Top і left тоді не позиціонують його.</p>
<p>Відкрите підменю збільшує висоту навігації та зсуває наступний вміст донизу. Width: auto дозволяє йому зайняти доступне місце.</p>
<p>На широкому екрані горизонтальний menu має display: flex і flex-wrap: wrap. На вузькому flex-direction: column утворює стовпець.</p>

<h2 id="dropdown-limits">Що вміє CSS-макет</h2>
<p>На сенсорному екрані натискання кнопки часто переводить у неї фокус. Тоді focus-within показує вкладені посилання. Перевір це у своєму браузері.</p>
<p>Поведінка фокуса після дотику залежить від браузера. Тому під навігацією залишаємо видимий блок «Усі розділи» з усіма адресами призначення.</p>
<p>Цей навчальний CSS-макет не перемикає відкриття повторним натисканням і не закриває підменю клавішею Escape.</p>
<p>CSS також не оновлює <code>aria-expanded</code>. Не записуй постійне aria-expanded="false", якщо список може бути видимим.</p>
<p>Для повноцінної поведінки кнопки розкриття потрібне керування станом через JavaScript. Ця тема вивчає вкладення, селектори та позиціонування без скриптів.</p>
<p>Видимий список усіх адрес дає запасний шлях. Важливі сторінки не повинні бути доступні лише через hover.</p>

<h2 id="dropdown-check">Перевірка меню</h2>
<ol><li>Перевір кожен href: він має вести до наявного id.</li><li>Наведи вказівник на кнопку та переведи його на підпункт. Підменю повинно залишатися відкритим.</li><li>Забери вказівник і пройди меню клавішею Tab. Відкрий посилання через Enter.</li><li>Повернися Shift+Tab і перевір видимий фокус кнопки.</li><li>Зменш ширину до 390px. Перевір стовпець, відкритий список і запасні посилання.</li><li>Завантаж HTML, відкрий його офлайн та перевір меню ще раз.</li></ol>
<p>У зразках підменю відкрите наведенням, щоб було видно результат. У твоєму HTML початковий стан залишається прихованим.</p>
<p>Для декоративної іконки останнього завдання завантаж leaf.svg із матеріалів окремо або ZIP-комплектом. У локальному редакторі збережи файл поруч із index.html.</p>
<p>Завантаж HTML для продовження роботи. Щоб повернути код у майстерню, відкрий збережений файл через вибір HTML-файлу.</p>

<h2 id="dropdown-practice">Практика: від списку до навігації</h2>
<p>Спочатку додай всі розділи й посилання. Потім вклади підменю та перевір фокус. Після цього додай приховування й координати.</p>
<div class="web-practice-mount"></div>`,
  },
};
