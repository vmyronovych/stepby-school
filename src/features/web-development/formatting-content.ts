import type { EngineDocument } from '../../runtime/types';
import {
  alignmentIllustration,
  emphasisIllustration,
  indicesIllustration,
  selectorIllustration,
} from './illustrations';

function code(source: string) {
  const escaped = source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return `<pre class="web-code"><code>${escaped}</code></pre>`;
}

export const webFormattingDocuments: Record<string, EngineDocument> = {
  'text-formatting': {
    title: 'Тема 2. Форматування тексту',
    html: `
<p>Навчимося виділяти важливі слова, записувати індекси та змінювати колір і вирівнювання тексту.</p>
<p>Потрібна основа документа? Повтори <a href="#/web/html-css/web-page">тему «Веб-сторінка»</a>.</p>

<h2 id="text-formatting-meaning">Зміст і вигляд тексту</h2>
<p>HTML пояснює роль тексту. CSS задає його вигляд. Спочатку визнач зміст, а потім добери оформлення.</p>
<p>Наприклад, <code>&lt;h1&gt;</code> позначає головний заголовок, а не просто великі літери. Рівні заголовків визначає структура документа.</p>

<h2 id="text-formatting-emphasis">Важливість і наголос</h2>
<p><code>&lt;strong&gt;</code> позначає важливий текст. <code>&lt;em&gt;</code> додає смисловий наголос. Браузер зазвичай показує їх жирним шрифтом і курсивом.</p>
${code(`<p><strong>Збережи файл</strong> перед закриттям редактора.</p>
<p>Сьогодні саме <em>ти</em> створюєш сторінку.</p>`)}
${emphasisIllustration}
<p><code>&lt;b&gt;</code> і <code>&lt;i&gt;</code> також чинні. Вони мають інший зміст: <code>&lt;b&gt;</code> привертає увагу без додаткової важливості, а <code>&lt;i&gt;</code> позначає інший голос або термін.</p>
${code(`<p>Ключове слово уроку: <b>розмітка</b>.</p>
<p>Англійський термін <i>browser</i> означає «браузер».</p>`)}

<h2 id="text-formatting-changes">Перекреслення та підкреслення</h2>
<p><code>&lt;s&gt;</code> позначає інформацію, яка вже не актуальна. Для вилученого тексту під час редагування документа використовуй <code>&lt;del&gt;</code>.</p>
${code(`<p>Початок зустрічі: <s>15:00</s> 16:00.</p>
<p>Виправлення чернетки: <del>три абзаци</del> два абзаци.</p>`)}
<p><code>&lt;u&gt;</code> позначає анотацію, наприклад слово з помилкою. Це не універсальний тег для декоративного підкреслення.</p>
${code('<p>Знайди помилку: <u>браузир</u>.</p>')}
<p>Для оздоблення використовуй CSS <code>text-decoration: underline;</code>. Не зловживай підкресленням: читач може сплутати його з посиланням.</p>

<h2 id="text-formatting-indices">Верхній і нижній індекси</h2>
<p><code>&lt;sup&gt;</code> піднімає індекс над рядком. Так можна записати степінь числа або квадратну одиницю вимірювання.</p>
<p><code>&lt;sub&gt;</code> опускає індекс під рядок. Він потрібний, наприклад, у хімічних формулах.</p>
${code(`<p>Квадрат числа: 5<sup>2</sup> = 25.</p>
<p>Площа кімнати: 18 м<sup>2</sup>.</p>
<p>Вода: H<sub>2</sub>O.</p>`)}
<p>Кількість предметів записуй у звичайному рядку: «3 дошки» або «дошка × 3». Верхній індекс означав би степінь, а не кількість.</p>
${indicesIllustration}

<h2 id="text-formatting-css">Перші правила CSS</h2>
<p>Додай елемент <code>&lt;style&gt;</code> усередині <code>&lt;head&gt;</code>. Записуй у ньому правила CSS.</p>
${code(`p {
  color: navy;
}`)}
<p><code>p</code> — селектор. Він вибирає всі абзаци документа. Усередині фігурних дужок записано властивість <code>color</code> та її значення <code>navy</code>.</p>
${selectorIllustration}
<p>Двокрапка відділяє властивість від значення. Крапка з комою завершує оголошення. Одне правило може містити кілька оголошень.</p>
<p><code>color</code> тут є властивістю CSS, а не атрибутом HTML. Для вирівнювання використовуй властивість <code>text-align</code>: <code>left</code>, <code>center</code> або <code>right</code>.</p>
<p>Вирівнювання змінює розташування тексту всередині блоку. Воно не переміщує сам блок.</p>
${alignmentIllustration}

<h2 id="text-formatting-example">Сторінка з оформленням</h2>
${code(`<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Моя вебмайстерня</title>
  <style>
    body {
      background-color: white;
    }
    h1 {
      text-align: center;
      color: darkred;
    }
    p {
      color: navy;
    }
    span {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>Моя вебмайстерня</h1>
  <p><strong>Перший дослід:</strong> змінюю колір тексту.</p>
  <p>Я вже вмію записати H<sub>2</sub>O.</p>
  <p>Мій наступний крок — <span>власна сторінка</span>.</p>
</body>
</html>`)}
<p>Правило для <code>p</code> діє на всі три абзаци. Правило для <code>span</code> підкреслює текст усіх елементів <code>&lt;span&gt;</code>.</p>
<p><code>&lt;span&gt;</code> об’єднує частину тексту без додаткового значення. Тут він дає змогу оформити лише кілька слів.</p>
<p>Добирай читабельні кольори. У прикладі темний текст розміщено на білому тлі. Світло-жовті літери на білому тлі читати важко.</p>
<p>У майстерні стилі діють лише всередині вікна «Твій результат». Вони не змінюють оформлення цього уроку.</p>
<p>Щоб перевірити назву вкладки з <code>&lt;title&gt;</code>, завантаж HTML і відкрий файл у браузері.</p>

<h2 id="text-formatting-practice">Практика: текст, індекси й кольори</h2>
<p>Відтвори структуру зі зразка. Перевір значення елементів, положення індексів і читабельність кольорів.</p>
<p>Після змін натисни «Оновити результат». Збережи готову роботу у файлі <code>index.html</code>.</p>
<div class="web-practice-mount"></div>`,
  },
};
