import paths from './paths.cjs';
const { coursePath, projectPath, projectRelative, assetPath, publicPath } =
  paths;
// Explanatory diagrams of the same rule implemented by the Mcar programs.
import { writeFile } from 'node:fs/promises';
const header = (title, w, h) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}"><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#53677c"/></marker></defs><rect width="100%" height="100%" rx="20" fill="#fff"/><g font-family="Arial,sans-serif" fill="#203443">`;
const text = (x, y, t, size = 23) =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}">${t}</text>`;
const box = (x, y, w, h, t, color) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${color}" stroke="#95a5b5" stroke-width="2"/>${text(x + w / 2, y + h / 2 + 8, t)}`;
const arrow = (d) =>
  `<path d="${d}" fill="none" stroke="#53677c" stroke-width="3" marker-end="url(#arrow)"/>`;
let svg = header('Як три датчики обирають одну дію', 900, 720);
svg +=
  text(450, 45, 'Три датчики → одна дія', 30) +
  text(450, 80, 'Перевіряємо по черзі: центр → ліворуч → праворуч', 20);
svg +=
  box(70, 105, 410, 62, 'Зчитати три покази', '#f0f3f8') +
  arrow('M275 167V202');
for (const [y, label, action, symbol] of [
  [210, 'Центр бачить темне?', 'Вперед', '↑'],
  [355, 'Лівий бачить темне?', 'Ліворуч', '↶'],
  [500, 'Правий бачить темне?', 'Праворуч', '↷'],
]) {
  svg +=
    box(70, y, 410, 70, label, '#e9f2fe') +
    arrow(`M480 ${y + 35}H610`) +
    text(545, y + 21, 'так', 19) +
    box(620, y, 220, 70, `${symbol} ${action}`, '#e8f5eb');
  svg += arrow(`M275 ${y + 70}V${y + 137}`) + text(300, y + 104, 'ні', 19);
}
svg +=
  box(150, 645, 250, 55, '■ Стоп', '#fce9e7') +
  text(700, 653, 'Обрана гілка завершує вибір.', 17) +
  text(700, 680, 'Наступні умови не перевіряємо.', 17) +
  '</g></svg>';
await writeFile(assetPath('line-decision.svg'), svg);
let memory = header('Пам’ять про втрату лінії', 900, 390);
memory += text(450, 48, 'Після втрати лінії стоп зберігається', 28);
memory +=
  box(45, 130, 290, 100, 'Рух дозволений', '#e8f5eb') +
  box(565, 130, 290, 100, 'Стоп запам’ятовано', '#fce9e7');
memory += arrow('M335 160H555') + text(450, 120, 'Лінію втрачено', 20);
memory +=
  arrow('M710 230V310H190V240') + text(450, 300, 'Новий старт / EN–RESET', 20);
memory +=
  text(710, 260, 'Лінія повернулася? Стоїмо.', 18) +
  text(190, 260, 'Перевіряємо покази.', 18) +
  '</g></svg>';
await writeFile(assetPath('line-stop-memory.svg'), memory);
console.log('Line decision and latched-stop diagrams generated.');
