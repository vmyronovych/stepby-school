import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  const escaped = source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return `<pre class="web-code"><code>${escaped}</code></pre>`;
}

export const webDevelopmentDocuments: Record<string, EngineDocument> = {
  'web-page': {
    title: 'Тема 1. Веб-сторінка',
    html: `
<p>Створимо першу сторінку: додамо назву, заголовки й текст. Потім порівняємо результат зі зразком у практичних завданнях.</p>

<h2 id="web-page-browser">Сторінка, сайт і браузер</h2>
<p><strong>Веб-сторінка</strong> — документ, який відкриває браузер. На ній можуть бути текст, зображення та посилання.</p>
<p><strong>Веб-сайт</strong> об’єднує пов’язані сторінки. Наприклад, сайт школи може містити розклад, новини та контакти.</p>
<p><strong>Браузер</strong> читає код сторінки та показує її вміст. Локальний HTML-файл також можна відкрити у браузері.</p>
<p>HTML описує структуру та зміст документа. Це мова розмітки, а не мова програмування. CSS відповідає за оформлення; його вивчатимемо далі.</p>

<h2 id="web-page-elements">Теги, елементи й атрибути</h2>
${code('<p>Я створюю свою першу сторінку.</p>')}
<p><code>&lt;p&gt;</code> — початковий тег, а <code>&lt;/p&gt;</code> — кінцевий. Разом із текстом між ними вони утворюють <strong>елемент</strong> абзацу.</p>
<p><strong>Атрибут</strong> додає відомості про елемент. У <code>&lt;html lang="uk"&gt;</code> атрибут <code>lang</code> задає українську мову документа. Значення беремо в лапки.</p>
<p>Вкладені елементи закриваємо у зворотному порядку: спочатку внутрішній, потім зовнішній. Деякі елементи, зокрема <code>&lt;br&gt;</code> і <code>&lt;meta&gt;</code>, не мають кінцевого тега.</p>

<h2 id="web-page-skeleton">Основа HTML-документа</h2>
${code(`<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Моя перша сторінка</title>
  </head>
  <body>
    <h1>Вітаю на моїй сторінці!</h1>
    <p>Тут починається моя подорож у веброзробку.</p>
  </body>
</html>`)}
<ul>
<li><code>&lt;!DOCTYPE html&gt;</code> — оголошення типу документа, а не HTML-тег. Воно вмикає стандартний режим відображення.</li>
<li><code>&lt;html&gt;</code> охоплює документ.</li>
<li><code>&lt;head&gt;</code> містить налаштування. <code>UTF-8</code> задає кодування, а <code>viewport</code> допомагає правильно показувати сторінку на вузьких екранах.</li>
<li><code>&lt;title&gt;</code> задає назву вкладки браузера. Це не видимий заголовок у тексті сторінки.</li>
<li><code>&lt;body&gt;</code> містить видимий вміст.</li>
</ul>

<h2 id="web-page-paragraphs">Абзац чи новий рядок?</h2>
<p>Використовуй <code>&lt;p&gt;</code> для окремої думки. Два абзаци — це два елементи.</p>
${code(`<p>Я навчаюся створювати вебсторінки.</p>
<p>Сьогодні я додав заголовок і два абзаци.</p>`)}
<p><code>&lt;br&gt;</code> переносить текст на новий рядок усередині одного блоку. Він доречний, наприклад, у вірші або адресі.</p>
${code(`<p>Навчальна майстерня<br>
вулиця Сонячна, 10</p>`)}
<p>Не додавай багато <code>&lt;br&gt;</code> для відступів. Відстані між блоками налаштовують через CSS. Звичайне натискання Enter у коді не створює нового рядка у відображеному тексті.</p>

<h2 id="web-page-headings">Заголовки та структура</h2>
<p>HTML має шість рівнів заголовків: від <code>&lt;h1&gt;</code> до <code>&lt;h6&gt;</code>. Рівень позначає місце розділу в структурі документа.</p>
<p>Для нашої сторінки використаємо один <code>&lt;h1&gt;</code> як головну назву. Основні розділи матимуть <code>&lt;h2&gt;</code>, а їхні підрозділи — <code>&lt;h3&gt;</code>.</p>
${code(`<h1>Моє дозвілля</h1>
<h2>Творчість</h2>
<p>У вільний час я малюю.</p>
<h3>Малюнки природи</h3>
<p>Найчастіше малюю дерева та птахів.</p>
<h2>Спорт</h2>
<p>Після уроків я катаюся на велосипеді.</p>`)}
<p>Не пропускай рівні під час створення вкладених розділів. Не вибирай рівень за бажаним розміром літер: вигляд заголовка можна змінити через CSS.</p>

<h2 id="web-page-save">Як зберегти та відкрити сторінку</h2>
<ol>
<li>Створи папку для першого проєкту.</li>
<li>Відкрий редактор звичайного тексту або редактор коду.</li>
<li>Введи основу документа та власний текст.</li>
<li>Збережи файл як <code>index.html</code> у кодуванні UTF-8. Перевір, що назва не закінчується на <code>.txt</code>.</li>
<li>Відкрий файл у браузері. Перевір назву вкладки та вміст сторінки.</li>
<li>Після змін збережи файл у редакторі й онови сторінку браузера.</li>
</ol>

<h2 id="web-page-practice">Практика за зразком</h2>
<p>Спочатку відтвори абзаци й перенесення рядків. Потім створи сторінку про свої вподобання та коротку статичну мінібіографію.</p>
<p>Порівнюй структуру й текст зі зразком. Використовуй вигадані дані, якщо не хочеш розповідати про себе.</p>
<details class="web-sources"><summary>Джерела та додаткове читання</summary>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax" target="_blank" rel="noopener noreferrer">MDN: основи синтаксису HTML</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements" target="_blank" rel="noopener noreferrer">MDN: рівні заголовків</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/br" target="_blank" rel="noopener noreferrer">MDN: перенесення рядка</a></li>
</ul>
</details>
<div class="web-practice-mount"></div>`,
  },
};
