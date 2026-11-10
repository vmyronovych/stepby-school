const { mkdir, writeFile } = require('node:fs/promises');
const path = require('node:path');
const { loadTypeScript } = require('../tests/helpers/load-typescript.cjs');
const { lessonImageAssets } = loadTypeScript('src/features/web-development/media.ts');
const { zipStore } = loadTypeScript('src/features/documents/services/workbook.ts');
const instructions = `Зображення для курсу веброзробки

1. Розпакуй ZIP-архів в окрему папку.
2. Створи в цій папці файл index.html.
3. Залиши назви картинок без змін.
4. Відкрий index.html у локальному редакторі та браузері.

HTML: <img src="flower.svg" alt="Квітка">
CSS у style всередині HTML: background-image: url("meadow.svg");

HTML і картинки мають лежати поруч. Якщо перенесеш картинки до підпапки images,
зміни шляхи на images/flower.svg та images/meadow.svg.
У зовнішньому CSS-файлі шлях до фону відраховується від розташування CSS-файлу.

Це власні навчальні ілюстрації курсу. Для їх перегляду інтернет не потрібний.
`;

(async () => {
  const folder = path.resolve(__dirname, '../assets/web-development/media');
  await mkdir(folder, { recursive: true });
  for (const asset of lessonImageAssets) await writeFile(path.join(folder, asset.filename), asset.svg);
  const encoder = new TextEncoder();
  const archive = zipStore([
    ...lessonImageAssets.map(asset => ({ name: asset.filename, data: encoder.encode(asset.svg) })),
    { name: 'README.txt', data: encoder.encode(instructions) },
  ]);
  await writeFile(path.join(folder, 'images.zip'), archive);
})().catch(error => { console.error(error); process.exitCode = 1; });
