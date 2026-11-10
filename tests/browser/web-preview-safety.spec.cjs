const { test, expect } = require('@playwright/test');
const { readFile } = require('node:fs/promises');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { lessonImageAssets } = loadTypeScript('src/features/web-development/media.ts');
const route = '#/web/html-css/hyperlinks';

async function render(page, source) {
  await page.locator('#web-source').fill(source);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
}

test('link previews make unsafe and external destinations inert and strip navigation capabilities', async ({ page }) => {
  await page.goto('/' + route);
  const parentURL = page.url();
  const requests = [], popups = [], dialogs = [];
  page.on('request', request => { if (request.url().startsWith('https://preview-block.invalid')) requests.push(request.url()); });
  page.on('popup', popup => popups.push(popup.url()));
  page.on('dialog', async dialog => { dialogs.push(dialog.message()); await dialog.dismiss(); });
  await render(page, `<!DOCTYPE html><html><head><title>Безпечні переходи</title></head><body>
    <h1>Перевірка посилань</h1>
    <p><a href="javascript:alert(1)" target="_top" ping="https://preview-block.invalid/ping" onclick="parent.location='https://preview-block.invalid/event'">Сценарій</a></p>
    <p><a href="data:text/html,%3Cscript%3Ealert(1)%3C/script%3E" target="_blank">Дані</a></p>
    <p><a href="file:///tmp/forbidden.html">Локальний файл</a></p>
    <p><a href="https://preview-block.invalid/page" target="_blank" rel="opener">Зовнішній сайт</a></p>
    <p><a href="//preview-block.invalid/protocol-relative">Без протоколу</a></p>
    <p><a href="other.html">Інша сторінка</a></p>
    <p><a href="mailto:club@example.com">Пошта</a></p>
    <p><a href="tel:+380000000000">Телефон</a></p>
    <p><a href="data:image/svg+xml,%3Csvg%20onload=%22alert(1)%22/%3E" download="attack.svg">Чуже SVG</a></p>
    <script>parent.location='https://preview-block.invalid/script'</script>
  </body></html>`);
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('h1')).toHaveText('Перевірка посилань');
  await expect(frame.locator('a')).toHaveCount(9);
  await expect(frame.locator('a[href], [target], [rel], [download], [ping], [onclick], script')).toHaveCount(0);
  await expect(frame.locator('a[aria-disabled="true"][role="link"][tabindex="0"]')).toHaveCount(9);
  for (const link of await frame.locator('a').all()) {
    await expect(link).toHaveAttribute('title', /Перевір це посилання/);
    await link.click({ force: true });
  }
  expect(page.url()).toBe(parentURL);
  expect(requests).toEqual([]);
  expect(popups).toEqual([]);
  expect(dialogs).toEqual([]);
});

test('srcdoc anchors scroll inside their frame and cannot navigate the course page', async ({ page }) => {
  await page.goto('/' + route);
  const parentURL = page.url();
  const external = [];
  page.on('request', request => { if (/^https?:/.test(request.url()) && !request.url().startsWith('http://127.0.0.1:5173')) external.push(request.url()); });
  await render(page, '<style>.space {height:700px}</style><h1>Якір</h1><p><a href="#destination" target="_top" download="wrong.html">До розділу</a></p><p class="space">Проміжок</p><h2 id="destination">Потрібний розділ</h2>');
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('a')).toHaveAttribute('href', 'about:srcdoc#destination');
  await expect(frame.locator('a')).not.toHaveAttribute('target', /.+/);
  await expect(frame.locator('a')).not.toHaveAttribute('download', /.+/);
  await frame.getByRole('link', { name: 'До розділу' }).click();
  await expect(frame.locator('#destination')).toBeVisible();
  expect(await frame.locator('html').evaluate(() => scrollY)).toBeGreaterThan(200);
  await expect(frame.locator('h1')).toHaveText('Якір');
  expect(page.url()).toBe(parentURL);
  expect(external).toEqual([]);
});

test('link preview downloads only known SVG bytes and earlier lessons retain their sandbox restrictions', async ({ page }) => {
  await page.goto('/' + route);
  await expect(page.locator('iframe')).toHaveAttribute('sandbox', 'allow-downloads');
  await render(page, '<h1>Матеріал</h1><a href="flower.svg" download="renamed.html" target="_blank">Завантажити квітку</a>');
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('a')).toHaveAttribute('href', /^data:image\/svg\+xml,/);
  await expect(frame.locator('a')).toHaveAttribute('download', 'flower.svg');
  const downloading = page.waitForEvent('download');
  await frame.getByRole('link', { name: 'Завантажити квітку' }).click();
  const download = await downloading;
  expect(download.suggestedFilename()).toBe('flower.svg');
  expect(await readFile(await download.path(), 'utf8')).toBe(lessonImageAssets.find(asset => asset.filename === 'flower.svg').svg);
  const source = '<h1 id="title">Раніше</h1><a href="#title" download>Перехід</a><table><tr><td rowspan="2">Дані</td></tr><tr></tr></table>';
  for (const lesson of ['mini-project-1', 'css-intro', 'web-page']) {
    await page.evaluate(lesson => StepBySchool.navigate('#/web/html-css/' + lesson), lesson);
    await expect(page.locator('iframe')).toHaveAttribute('sandbox', '');
    await render(page, source);
    await expect(frame.locator('a, table, [id], [rowspan], [download]')).toHaveCount(0);
  }
});
