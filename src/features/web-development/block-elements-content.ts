import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
}

const displayDiagram = `<figure class="web-diagram" aria-labelledby="blocks-display-caption">
<figcaption id="blocks-display-caption">Ті самі три блоки — різне розміщення</figcaption>
<div class="web-code-result"><div class="web-diagram-card"><h3>display: block</h3>
${code('.item { display: block; }')}
<div class="web-browser-sample"><div style="border:2px solid #0f766e;padding:6px;margin:4px">А — окремий рядок</div><div style="border:2px solid #0f766e;padding:6px;margin:4px">Б — окремий рядок</div><div style="border:2px solid #0f766e;padding:6px;margin:4px">В — окремий рядок</div></div>
<p>Блок починається з нового рядка. Без заданої ширини він зазвичай займає доступну ширину контейнера.</p></div>
<div class="web-diagram-card"><h3>inline-block і none</h3>${code('.item { display: inline-block; }\n.hidden { display: none; }')}
<div class="web-browser-sample"><div style="display:inline-block;vertical-align:top;border:2px solid #0f766e;padding:12px">А</div> <div style="display:none">Б</div> <div style="display:inline-block;vertical-align:top;border:2px solid #0f766e;padding:12px">В</div></div>
<p>А та В стоять у рядку, якщо вистачає місця. Б приховано разом із його місцем.</p></div></div></figure>`;

const positionDiagram = `<figure class="web-diagram" aria-labelledby="blocks-position-caption"><figcaption id="blocks-position-caption">Селектор → контейнер → координати деталі</figcaption>
<div class="web-code-result"><div class="web-diagram-card"><h3>HTML та CSS</h3><pre class="web-visual-code"><code>&lt;div <mark class="web-tag-match">class="scene"</mark>&gt;
  &lt;div <mark class="web-tag-match">class="label"</mark>&gt;Мітка&lt;/div&gt;
&lt;/div&gt;
<mark class="web-selector-token">.scene</mark> { position: relative; height: 140px; }
<mark class="web-selector-token">.label</mark> { position: absolute;
  top: 32px; left: 24px; }</code></pre><p>Рамка контейнера задає область. Мітка відлічує координати від його внутрішнього краю рамки.</p></div>
<div class="web-diagram-card"><h3>Результат</h3><div style="position:relative;height:140px;border:2px dashed #0f766e;background:#f0fdfa"><span style="position:absolute;top:2px;left:4px;font-size:12px">.scene — контейнер</span><div style="position:absolute;top:32px;left:24px;border:2px solid #9a3412;padding:8px;background:#ffedd5">Мітка .label</div></div><p>32px згори, 24px зліва. Змінюй лише одну координату й перевіряй результат.</p></div></div></figure>`;

export const blockElementsDocuments: Record<string, EngineDocument> = {
  'block-elements': {
    title: 'Тема 14. Блоки та їх розташування',
    html: `<p>Згрупуємо вміст у картки та складемо малюнок із простих блоків. Навчимося керувати потоком і координатами.</p>
<h2 id="block-elements-div">Контейнер div і звичайний потік</h2>
<p><code>div</code> — універсальний контейнер без окремого смислового призначення. Він об’єднує елементи для спільного оформлення.</p>
${code('<div class="card">\n  <h2>Листок</h2>\n  <p>Знахідка на стежці.</p>\n</div>')}
<p>Заголовок залишається заголовком, а абзац — абзацом. Контейнер не замінює їхні ролі.</p>
<p>Звичайний потік — порядок розміщення елементів браузером. Блокові елементи зазвичай починають новий рядок.</p>
<h2 id="block-elements-display">Властивість display</h2>
<ul><li><code>block</code> — блок у звичайному потоці. Йому можна задати ширину й висоту.</li><li><code>inline-block</code> — прямокутник у рядку. Він має ширину й висоту, а за нестачі місця переноситься.</li><li><code>none</code> — елемент не відображається й не займає місця. Його вміст також недоступний для звичайного читання допоміжними програмами.</li></ul>
${displayDiagram}
<p>Ці значення змінюють розміщення, але не смислову роль HTML. Наприклад, заголовок із display: inline-block залишається заголовком.</p>
<p><code>vertical-align: top</code> вирівнює верх inline-block відносно рядка. Це зручно для сусідніх карток із різною кількістю тексту.</p>
${code('.card {\n  display: inline-block;\n  vertical-align: top;\n  width: 200px;\n  max-width: 100%;\n  box-sizing: border-box;\n}')}
<p>Без vertical-align картки зазвичай вирівнюються по базовій лінії тексту. <code>text-align: center</code> на батьківському контейнері центрує inline-block у рядку.</p>
<p><code>box-sizing: border-box</code> включає padding і рамку в задані width та height. Без нього вони додаються до ширини й висоти вмісту.</p>
<p>Наприклад, width: 200px із рамками по 2px має ширину 204px без border-box і 200px із ним. Зовнішні поля margin завжди залишаються поза цією шириною.</p>
<h2 id="block-elements-position">position: static і relative</h2>
<p>Початкове значення <code>position: static</code> залишає елемент у звичайному потоці. Властивості top, right, bottom і left його не зміщують.</p>
<p><code>position: relative</code> зберігає місце елемента в потоці. Координати можуть зсунути його від цього місця.</p>
${code('.note { position: relative; top: 8px; left: 12px; }')}
<p>При такому зсуві сусіди не займають старе місце. Можливе перекриття, тому не вирівнюй так великі розділи сторінки.</p>
<h2 id="block-elements-absolute">Абсолютне розташування</h2>
<p><code>position: absolute</code> виймає елемент зі звичайного потоку. Його місце більше не резервується.</p>
<p>У наших прикладах найближчий предок із position: relative стає контейнером координат. Він не обов’язково є безпосереднім батьком.</p>
<p>Якщо такого предка немає, координати відлічуються від початкового контейнера сторінки. Щоб отримати передбачуваний малюнок, явно задай relative зовнішньому div.</p>
${positionDiagram}
<p><code>top</code> задає відстань від верхнього краю, <code>left</code> — від лівого. <code>bottom</code> та <code>right</code> відлічують від протилежних країв.</p>
<p>Для деталі з відомим розміром обери одну вертикальну й одну горизонтальну координату. Не задавай усі чотири без потреби.</p>
<p>Абсолютні деталі не збільшують висоту контейнера. Для малюнка задай йому явну висоту, щоб наступний абзац не потрапив під малюнок.</p>
<p>У цих простих малюнках пізніша абсолютна деталь перекриває попередню в місці перетину. Тому стіну записуємо перед дверима.</p>
<h2 id="block-elements-fixed">Нерухомий елемент: fixed</h2>
<p><code>position: fixed</code> у наших прикладах прив’язує блок до вікна браузера. Під час прокручування він залишається на тому самому місці.</p>
${code('.sun {\n  position: fixed; top: 12px; right: 12px;\n  width: 40px; height: 40px;\n  border-radius: 50%; background-color: #fbbf24;\n}')}
<p>У майстерні це вікно вбудованого перегляду. У завантаженому HTML — вікно браузера. Перевір, що нерухомий блок не закриває текст.</p>
<p>Щоб перевірити fixed, зменш висоту вікна та прокрути сторінку. Важливий текст повинен залишатися доступним.</p>
<h2 id="block-elements-triangle">Трикутник із рамок</h2>
<p>Блок без ширини й висоти теж може мати рамки. Прозорі бічні рамки та кольорова нижня утворюють трикутник.</p>
${code('.roof {\n  width: 0; height: 0;\n  border-left: 120px solid transparent;\n  border-right: 120px solid transparent;\n  border-bottom: 90px solid #9a3412;\n}')}
<p><code>transparent</code> означає прозорий колір. Дві бічні рамки разом задають ширину 240px, а нижня — висоту 90px.</p>
<h2 id="block-elements-files">Матеріали й збереження</h2>
<p>Для карток використай власні ілюстрації з матеріалів редактора. Завантаж окремі SVG або ZIP і розпакуй поруч із index.html.</p>
<p>Тоді шляхи leaf.svg, flower.svg і bird.svg працюватимуть локально. Після «Завантажити HTML» ілюстрації вбудовуються у файл.</p>
<p>Щоб продовжити роботу, натисни «Відкрити HTML» і вибери збережений документ. Чернетки тримаються лише в поточному сеансі.</p>
<h2 id="block-elements-practice">Практика: малюнок і картки</h2>
<p>Перевір кожний блок окремо. Потім зміни розмір вікна й перевір розташування всіх частин.</p><div class="web-practice-mount"></div>`,
  },
};
