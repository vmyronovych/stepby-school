// Hand-drawn teaching illustrations, not screenshots. No external image/font assets.
// Run with: node scripts/create-word2013-illustrations.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const output = fileURLToPath(new URL('../assets/documents/word2013/illustrations/', import.meta.url));
mkdirSync(output, { recursive: true });
const blue = '#2b579a';
const ink = '#343434';
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const rect = (x, y, w, h, fill = 'white', stroke = 'none', extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" ${extra}/>`;
const text = (x, y, label, size = 16, color = ink, extra = '') => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${extra}>${esc(label)}</text>`;
const line = (x1, y1, x2, y2, color = '#c8c8c8', width = 1) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${color}" stroke-width="${width}" fill="none"/>`;
const path = (d, color = ink, width = 2, fill = 'none') => `<path d="${d}" stroke="${color}" stroke-width="${width}" fill="${fill}"/>`;
const down = (x, y) => `<path d="M${x} ${y}h8l-4 5Z" fill="#666"/>`;
const group = (x, y, content) => `<g transform="translate(${x} ${y})">${content}</g>`;
const folder = (x, y, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})">${path('M0 7V2h16l5 5h23v27H0Z', '#ba8a32', 1, '#f4d17c')}${path('M0 12h47l-5 23H0Z', '#bb913f', 1, '#ffe3a3')}</g>`;
const monitor = (x, y) => group(x, y, rect(0, 0, 34, 24, '#f2f6fc', blue) + line(17, 24, 17, 30, blue, 2) + line(7, 30, 27, 30, blue, 2));
const disk = (x, y) => group(x, y, rect(0, 0, 19, 20, '#8663aa') + rect(4, 0, 10, 7) + rect(4, 12, 11, 8) + rect(11, 1, 2, 5, '#8663aa'));
const docIcon = (x, y) => group(x, y, rect(5, 0, 23, 30, 'white', '#aaa') + rect(0, 6, 19, 19, blue) + text(3, 20, 'W', 13, 'white', 'font-weight="bold"'));
const button = (x, y, w, label, selected = false) => rect(x, y, w, 32, selected ? '#dbe9fa' : '#f5f5f5', selected ? '#7da5d5' : '#b8b8b8') + text(x + w / 2, y + 22, label, 15, ink, 'text-anchor="middle"');
const field = (x, y, w, label, arrow = true) => rect(x, y, w, 28, 'white', '#aaa') + text(x + 8, y + 20, label, 16) + (arrow ? down(x + w - 16, y + 11) : '');

function titlebar() {
  return rect(0, 0, 1280, 32) + rect(7, 5, 22, 22, blue) + text(10, 22, 'W', 16, 'white', 'font-weight="bold"') +
    disk(48, 6) + path('M96 10C76 4 74 25 94 23M80 6l-6 6 8 3', blue) + down(101, 13) +
    path('M122 7a10 10 0 1 1-4 5M117 6v8h9', blue) + down(145, 13) +
    text(640, 22, 'Коваленко_знайомство — Word', 16, '#555', 'text-anchor="middle"') +
    text(1117, 22, '?', 17, '#777') + line(1172, 20, 1185, 20, '#666', 2) + rect(1210, 9, 12, 12, 'none', '#666') +
    path('M1253 9l13 13m0-13-13 13', '#666');
}

function ribbon(titleSelected = false) {
  let svg = rect(0, 32, 1280, 152) + rect(0, 32, 77, 33, blue) + text(18, 54, 'ФАЙЛ', 14, 'white');
  const tabs = [[78, 98, 'ОСНОВНЕ'], [176, 105, 'ВСТАВЛЕННЯ'], [281, 125, 'КОНСТРУКТОР'], [406, 174, 'РОЗМІТКА СТОРІНКИ'], [580, 109, 'ПОСИЛАННЯ'], [689, 105, 'РОЗСИЛКИ'], [794, 135, 'РЕЦЕНЗУВАННЯ'], [929, 86, 'ВИГЛЯД']];
  svg += line(0, 65, 1280, 65);
  for (const [x, w, label] of tabs) {
    if (x === 78) svg += rect(x, 32, w, 34, 'white', '#ccc');
    svg += text(x + w / 2, 54, label, 13, x === 78 ? blue : ink, 'text-anchor="middle"');
  }
  svg += rect(21, 81, 28, 36, '#f2d69b', '#ab925a') + rect(26, 77, 18, 8, '#e4e4e4', '#999') +
    rect(33, 94, 24, 29, 'white', '#999') + text(9, 145, 'Вставити', 13) + down(35, 151) +
    text(73, 88, '✂', 20, '#777') + text(98, 87, 'Вирізати', 13) +
    rect(76, 100, 12, 14, '#edf2fa', '#aaa') + rect(80, 104, 12, 14, 'white', '#aaa') + text(98, 115, 'Копіювати', 13) +
    path('M78 133h14v5H78Zm7 5v9', '#b18b50', 3) + text(98, 144, 'Формат за зразком', 10);
  svg += field(196, 80, 204, 'Arial') + field(408, 80, 56, titleSelected ? '20' : '16') +
    text(479, 102, 'A', 24, '#555') + text(506, 102, 'A', 17, '#555') +
    rect(196, 116, 28, 28, titleSelected ? '#cde1f7' : 'white', titleSelected ? '#86abd5' : 'none') +
    text(204, 137, 'Ж', 19, ink, 'font-weight="bold"') + text(239, 137, 'К', 19, ink, 'font-style="italic"') +
    text(270, 137, 'П', 19, ink, 'text-decoration="underline"') + down(290, 129) +
    text(312, 136, 'abc', 15, ink, 'text-decoration="line-through"') + text(352, 137, 'x₂', 18) + text(382, 134, 'x²', 18) +
    text(419, 137, 'A', 19, '#5794ce') + rect(454, 139, 22, 5, '#ffdf00') + text(457, 135, 'ab', 16) +
    text(494, 135, 'A', 21) + rect(491, 140, 23, 4, '#c23b38');
  for (let i = 0; i < 3; i++) {
    const x = 553 + i * 55;
    for (let j = 0; j < 3; j++) {
      svg += text(x, 85 + j * 7, i === 0 ? '•' : `${j + 1}`, i === 0 ? 13 : 8, '#555') + line(x + 12, 82 + j * 7, x + 32, 82 + j * 7, '#777', 1.4);
    }
  }
  svg += text(732, 101, 'A↓Z', 18) + text(781, 102, '¶', 23) + rect(547, 116, 28, 28, '#cde1f7', '#86abd5');
  for (let i = 0; i < 4; i++) {
    for (let row = 0; row < 4; row++) {
      const w = row % 2 === 0 || i === 3 ? 18 : 12;
      const start = 552 + i * 34 + (i === 1 ? (18 - w) / 2 : i === 2 ? 18 - w : 0);
      svg += line(start, 121 + row * 6, start + w, 121 + row * 6, '#555', 1.5);
    }
  }
  svg += text(697, 137, '↕', 24, blue) + down(722, 129) + rect(761, 119, 19, 22, 'none', '#777') + down(790, 128);
  for (const [x, label, size] of [[839, 'Звичайний', 17], [928, 'Без інтерв.', 17], [1017, 'Заголовок 1', 18]]) {
    svg += rect(x, 78, 85, 75, 'white', x === 839 ? '#7298c8' : '#ddd') + text(x + 8, 110, 'AaБбВв', size, x === 1017 ? blue : ink) + text(x + 5, 141, label, 11);
  }
  svg += text(1137, 91, '⌕', 24, '#555') + text(1163, 89, 'Знайти', 13) +
    text(1138, 116, 'ab', 15) + text(1163, 116, 'Замінити', 13) +
    path('M1141 130v15l5-5 4 7 4-2-4-6 6-2Z', '#777', 1, 'white') + text(1163, 142, 'Виділити', 13);
  for (const [x, label] of [[90, 'Буфер обміну'], [355, 'Шрифт'], [678, 'Абзац'], [970, 'Стилі'], [1189, 'Редагування']]) svg += text(x, 174, label, 12, '#777', 'text-anchor="middle"');
  for (const x of [187, 536, 828, 1116]) svg += line(x, 73, x, 177, '#ddd');
  return svg + line(0, 184, 1280, 184, '#bdbdbd');
}

function editor(titleSelected = false) {
  let svg = titlebar() + ribbon(titleSelected) + rect(0, 185, 1280, 585, '#e8e8e8');
  svg += rect(160, 197, 960, 23, 'white', '#bbb');
  for (let i = 0; i <= 80; i++) {
    const x = 210 + i * 10;
    svg += line(x, 215, x, i % 5 === 0 ? 205 : 211, '#929292');
    if (i % 10 === 0) svg += text(x - 3, 206, String(i / 10), 10, '#777');
  }
  svg += rect(133, 233, 18, 519, '#f4f4f4', '#bbb');
  for (let i = 0; i < 51; i++) svg += line(145, 240 + i * 10, i % 5 === 0 ? 136 : 140, 240 + i * 10, '#aaa');
  svg += rect(164, 237, 960, 529, '#d3d3d3') + rect(160, 233, 960, 529, 'white', '#c3c3c3');
  if (titleSelected) svg += rect(215, 291, 160, 43, '#c7ddf5');
  svg += '<g font-family="Arial, sans-serif">' + text(215, 324, 'Про мене', 32.5, '#111', 'font-weight="bold"') +
    text(215, 391, 'Мене звати Максим Коваленко. Мені 9 років.', 26, '#111') +
    text(215, 446, 'Я навчаюся у 4 класі. Люблю малювати й грати у футбол.', 26, '#111') +
    text(215, 501, 'Мрію створити власну комп’ютерну гру.', 26, '#111') + '</g>';
  svg += rect(1260, 187, 18, 581, '#f9f9f9', '#ccc') + rect(1263, 213, 12, 280, '#ddd', '#bbb') + down(1265, 752);
  svg += rect(0, 770, 1280, 30, blue) + text(12, 790, 'СТОРІНКА 1 З 1', 12, 'white') + text(154, 790, 'СЛІВ: 25', 12, 'white') +
    text(269, 790, 'УКРАЇНСЬКА', 12, 'white') + text(1000, 791, '−', 22, 'white') + line(1030, 784, 1180, 784, 'white', 2) +
    rect(1095, 778, 5, 13, 'white') + text(1190, 791, '+', 20, 'white') + text(1222, 790, '100%', 13, 'white');
  return svg;
}

const navigation = [['Відомості', 99], ['Створити', 148], ['Відкрити', 197], ['Зберегти', 246], ['Зберегти як', 295], ['Друк', 344], ['Надати спільний доступ', 393], ['Експорт', 442], ['Закрити', 491], ['Обліковий запис', 670], ['Параметри', 719]];
function backstage(active, heading) {
  let svg = rect(0, 0, 1280, 800) + rect(0, 0, 218, 800, blue) +
    `<circle cx="42" cy="41" r="20" stroke="white" stroke-width="2" fill="none"/>` + path('M49 41H32m8-8-8 8 8 8', 'white') +
    text(670, 23, 'Коваленко_знайомство — Word', 15, '#777', 'text-anchor="middle"') + text(265, 100, heading, 40, '#555');
  for (const [label, y] of navigation) {
    if (label === active) svg += rect(0, y - 30, 218, 45, '#4778b9');
    svg += text(26, y, label, label.length > 18 ? 14 : 17, 'white');
  }
  return svg;
}
function newDocument() {
  let svg = backstage('Створити', 'Створити');
  svg += field(265, 134, 650, 'Пошук онлайнових шаблонів', false) + text(878, 156, '⌕', 25, blue) +
    rect(265, 205, 224, 290, '#e8eff8', '#8aaad2') + rect(296, 230, 162, 212, 'white', '#b7b7b7') + text(285, 478, 'Новий документ', 19);
  svg += rect(549, 230, 162, 212, 'white', '#ccc') + text(571, 311, 'Ласкаво', 24, blue) + text(571, 347, 'просимо', 24, blue) + text(550, 478, 'Огляд можливостей', 17, '#666');
  return svg;
}
function location(open = false) {
  let svg = backstage(open ? 'Відкрити' : 'Зберегти як', open ? 'Відкрити' : 'Зберегти як');
  svg += text(277, 183, 'OneDrive', 20, '#777') + rect(265, 218, 370, 76, '#d5e3f6') + monitor(285, 239) + text(338, 263, 'Комп’ютер', 23) +
    text(282, 340, '+', 32, '#77a399') + text(322, 336, 'Додати розташування', 20, '#555') + line(664, 150, 664, 714, '#ddd') +
    monitor(709, 153) + text(762, 179, 'Комп’ютер', 29, blue) + text(710, 235, 'Останні папки', 21, '#555') +
    folder(711, 266, 0.6) + text(755, 286, 'Тексти', 21) + folder(711, 316, 0.6) + text(755, 337, 'Документи', 20) +
    rect(706, 399, 157, 125, '#e1eafa', '#9cb9dd') + folder(759, 417, 1) + text(784, 502, 'Огляд', 20, ink, 'text-anchor="middle"');
  return svg;
}
function fileDialog(open = false) {
  let svg = rect(0, 0, 1280, 800, '#edf0f5') + rect(58, 47, 1164, 698, '#d1d7df');
  svg += rect(50, 40, 1164, 698, '#f9f9f9', '#86a4c3') + rect(50, 40, 1164, 38, '#d9e8f6') +
    docIcon(62, 44) + text(101, 66, open ? 'Відкриття документа' : 'Збереження документа', 18) + text(1177, 65, '×', 24) +
    text(74, 111, '←', 27, '#6b747d') + text(116, 111, '↑', 24, '#6b747d') +
    rect(154, 87, 748, 35, 'white', '#b5bdc6') + folder(164, 91, 0.55) + text(204, 111, 'Цей ПК  ›  Документи  ›  Тексти', 17) +
    field(916, 89, 277, 'Пошук у папці Тексти', false) + text(75, 156, 'Упорядкувати', 16) + text(241, 156, 'Нова папка', 16);
  svg += rect(59, 176, 1147, 374, 'white', '#ddd') + line(260, 176, 260, 550, '#ddd');
  for (const [label, y] of [['Уподобання', 210], ['Робочий стіл', 254], ['Документи', 298], ['Завантаження', 342], ['Цей ПК', 413]]) svg += text(83, y, label, 17, '#555');
  svg += rect(63, 273, 190, 36, '#e5eef9') + text(83, 298, 'Документи', 17) + text(283, 205, 'Ім’я', 16, '#666') + text(810, 205, 'Тип', 16, '#666');
  if (open) svg += rect(275, 224, 915, 45, '#d7e9fa', '#a1c4e7') + docIcon(286, 231) + text(327, 254, 'Коваленко_знайомство.docx', 20) + text(811, 254, 'Документ Word', 17);
  else svg += text(689, 343, 'Ця папка пуста.', 17, '#777', 'text-anchor="middle"');
  svg += text(75, 591, 'Ім’я файлу:', 18) + field(222, 568, 971, 'Коваленко_знайомство', false) +
    text(75, 635, 'Тип файлу:', 18) + field(222, 612, 971, 'Документ Word (*.docx)') +
    button(893, 681, 142, open ? 'Відкрити' : 'Зберегти', true) + button(1055, 681, 138, 'Скасувати');
  return svg;
}
function info() {
  return backstage('Відомості', 'Відомості') + text(270, 174, 'Коваленко_знайомство', 28) + text(270, 212, 'Документи › Тексти', 19, '#666') +
    rect(270, 270, 220, 105, '#eef3fa', '#bdcde1') + text(293, 314, 'Захист документа', 20) + text(293, 349, 'Дозволи', 16, '#666') +
    text(535, 306, 'Захист документа', 23) + text(535, 347, 'Керування доступом до документа', 20, '#666');
}

const outline = (x, y, w, h, color) => rect(x, y, w, h, 'none', 'white', 'stroke-width="6"') + rect(x, y, w, h, 'none', color, 'stroke-width="3"');
const illustratedExample = editor() + outline(193, 77, 210, 34, '#c62932') + outline(405, 77, 62, 34, '#1765b8');
const drawings = {
  'editor.svg': editor(),
  'title.svg': editor(true),
  'example.svg': illustratedExample,
  'new.svg': newDocument(),
  'save-location.svg': location(),
  'open.svg': location(true),
  'save-dialog.svg': fileDialog(),
  'open-dialog.svg': fileDialog(true),
  'close.svg': info(),
};
for (const [name, drawing] of Object.entries(drawings)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="840" viewBox="0 0 1280 840" role="img"><title>Word 2013 українською — навчальна ілюстрація</title><g font-family="Segoe UI, Arial, sans-serif">${drawing}${rect(0, 800, 1280, 40, '#edf2f9')}${text(20, 826, 'Навчальна ілюстрація інтерфейсу Word 2013 · StepBy School', 15, '#536783')}</g></svg>`;
  writeFileSync(`${output}${name}`, svg + '\n');
}
console.log(`Created ${Object.keys(drawings).length} Word 2013 teaching illustrations.`);
