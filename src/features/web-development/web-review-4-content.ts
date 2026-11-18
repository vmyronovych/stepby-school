import type { EngineDocument } from '../../runtime/types';

function code(source: string) {
  return `<pre class="web-code"><code>${source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
}

const revealDiagram = `
<figure class="web-diagram" aria-labelledby="review4-reveal-caption">
<figcaption id="review4-reveal-caption">Два стани однієї сумки</figcaption>
<div class="web-code-result">
<div class="web-diagram-card"><h3>Як селектор вибирає список</h3>
<pre class="web-visual-code"><code>.items { display: none; }
.bag:hover &gt; <mark class="web-tag-match">.items</mark>,
.bag:focus-within &gt; <mark class="web-tag-match">.items</mark> {
  display: flex;
}</code></pre>
<p>Знак &gt; обмежує вибір прямими дітьми сумки. Інші сумки мають власні списки.</p></div>
<div class="web-diagram-card"><h3>Результат</h3>
<div class="web-browser-sample" style="border:2px solid #1e3a8a;padding:12px;margin-bottom:8px">Польова · закрита</div>
<div class="web-browser-sample" style="border:2px solid #1e3a8a;padding:12px">Польова · фокус усередині<div style="margin-top:8px;padding:8px;border:2px dashed #1e3a8a">Список .items · Листок, Квітка</div></div>
</div></div></figure>`;

const keyframesDiagram = `
<figure class="web-diagram" aria-labelledby="review4-frames-caption">
<figcaption id="review4-frames-caption">Опорні кадри задають точки маршруту</figcaption>
<div class="web-code-result">
<div class="web-diagram-card"><h3>Код → зонд</h3>
<pre class="web-visual-code"><code><mark class="web-tag-match">.probe</mark> {
  animation: <mark class="web-tag-match">fly</mark> 6s ease-in-out
    infinite alternate;
}
@keyframes <mark class="web-tag-match">fly</mark> {
  0%   { left: 8%; top: 60%; }
  50%  { left: 40%; top: 15%; }
  100% { left: 72%; top: 48%; }
}</code></pre></div>
<div class="web-diagram-card"><h3>Точки в межах сцени</h3>
<div class="web-browser-sample" style="position:relative;height:166px;border:2px dashed #1e3a8a">
<span style="position:absolute;left:8%;top:60%;border:2px solid #1e3a8a;padding:2px">0%</span>
<span style="position:absolute;left:40%;top:15%;border:2px solid #1e3a8a;padding:2px">50%</span>
<span style="position:absolute;left:72%;top:48%;border:2px solid #1e3a8a;padding:2px">100%</span>
</div><p>Браузер обчислює проміжні положення. Після фінішу alternate змінює напрямок.</p></div>
</div></figure>`;

export const review4Documents: Record<string, EngineDocument> = {
  'web-review-4': {
    title: 'Тема 26. Повторення: навігація, медіа, адаптивність і рух',
    html: `
<p>Підготуємо три сторінки вигаданої експедиції. Спорядження допоможе повторити випадні списки. Політ зонда покаже ключові кадри. Бортовий журнал поєднає структуру, медіа й прокрутку.</p>
<h2 id="review4-navigation">Вкладені списки та фокус</h2>
<p>Для навігації використовуй nav із підписом. Кнопка в сумці отримує фокус, а посилання всередині списку ведуть до наявних цілей.</p>
${revealDiagram}
<p>Після наведення переведи вказівник на список. Для клавіатури перейди до кнопки клавішею Tab. Наступний Tab має перевести фокус до першого відкритого посилання.</p>
<p>Список у вправі займає місце під кнопкою. Так він може розширитися, коли доступна ширина змінюється. Повний перелік доступний через окреме видиме посилання.</p>
<p>Перевір решту способів розташування підменю в <a href="#/web/html-css/dropdown-menu">темі 22</a>.</p>
<h2 id="review4-structure">Будова сторінки й опис медіа</h2>
<p>У header розмісти заголовок і навігацію. Один main містить основний вміст. Section об’єднує матеріали за темою, article підходить для самостійного запису, а footer містить завершальні відомості.</p>
${code(`<section id="signal">
  <h2>Сигнал станції</h2>
  <audio controls preload="metadata" src="signal.wav">
    Короткий сигнал без мовлення.
  </audio>
  <p>Короткий тональний сигнал без мовлення.</p>
</section>`)}
<p>Controls додає кнопки керування. Речення всередині audio є запасним вмістом. Видимий абзац поруч доступний навіть до відтворення. Для відео працює та сама ідея, а текстовий файл track може додати синхронізовані описи.</p>
<p>Переглянь приклад із відео й доріжкою у <a href="#/web/html-css/semantic-media">темі 23</a>.</p>
<h2 id="review4-responsive">Адаптивність і прокрутка</h2>
<p>Спочатку зроби один стовпчик. Додай другий, коли розділам вистачає місця. Усередині редактора медіазапит вимірює ширину рамки результату.</p>
${code(`.board { display: flex; flex-direction: column; }
@media (min-width: 600px) {
  .board { flex-direction: row; }
  .board section { flex: 1; }
}
.entries { max-height: 150px; overflow: auto; }`)}
<p>Overflow: auto додає прокрутку, якщо записи перевищують висоту. Для області журналу задай role="region", aria-label і tabindex="0". Виділи фокус рамкою та спробуй PageDown.</p>
<p>Порівняй види overflow у <a href="#/web/html-css/responsive-scroll">темі 24</a>. За потреби скористайся її інструкцією GitHub Pages, коли завершиш локальну перевірку.</p>
<h2 id="review4-flight">Анімація, пауза та зменшений рух</h2>
<p>Position: relative задає сцену для абсолютно розташованого зонда. Відсотки left і top залежать від ширини й висоти сцени. Залиш місце для самої картинки біля країв.</p>
${keyframesDiagram}
<p>Додай rotate до кадрів, якщо потрібен нахил. Прапорець паузи і сцена мають спільного батька. Селектор ~ знаходить сцену після позначеного прапорця.</p>
${code(`.pause:checked ~ .scene .probe {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .scene .probe { animation: none; }
}`)}
<p>Пауза зберігає поточне положення. Налаштування зменшеного руху лишає зонд на початковій позиції. Повтори функції часу й перетворення в <a href="#/web/html-css/css-animation">темі 25</a>.</p>
<h2 id="review4-practice">Вправи</h2>
<p>Спочатку перевір посилання, кнопки й порядок Tab. Потім змінюй ширину перегляду, перевіряй прокрутку та паузу. У зразках показано одне відкрите меню й один кадр польоту.</p>
<p>Для локальної роботи завантаж ілюстрації та signal.wav з матеріалів. Збережи їх поруч з index.html. Завантаж HTML із редактора й відкрий його знову через вибір файлу, коли захочеш продовжити роботу.</p>
<div class="web-practice-mount"></div>`,
  },
};
