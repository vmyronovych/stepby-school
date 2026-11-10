const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { readFile } = require('node:fs/promises');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { project2Tasks, project2Starter } = loadTypeScript('src/features/web-development/project2-tasks.ts');
const { embedLessonImages, lessonImageAssets } = loadTypeScript('src/features/web-development/media.ts');
const task = project2Tasks[0];
const route = '#/web/html-css/mini-project-2';
async function render(page) {
  await page.locator('#web-source').fill(task.reference);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect(page.frameLocator('iframe').locator('h1')).toHaveText('Кубок шкільного двору');
  await page.frameLocator('iframe').locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
}

test('football mini-project is discoverable and its standings agree with every match', async ({ page, context }) => {
  await page.goto('/#/web/html-css');
  await page.getByRole('link').filter({ hasText: 'Міні-проєкт 2.' }).click();
  await expect(page).toHaveURL(new RegExp(route + '$'));
  await expect(page.locator('#web-source')).toHaveValue(project2Starter);
  await expect(page.locator('[data-web-task]')).toHaveCount(1);
  await render(page);
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('h1')).toHaveCount(1);
  await expect(frame.locator('h2')).toHaveCount(4);
  await expect(frame.locator('h3')).toHaveCount(3);
  await expect(frame.locator('body')).toContainText('Команди, емблеми й результати вигадані');
  await expect(frame.locator('table caption')).toHaveCount(1);
  await expect(frame.locator('thead th[scope="col"]')).toHaveCount(6);
  await expect(frame.locator('tbody th[scope="rowgroup"]')).toHaveAttribute('rowspan', '3');
  await expect(frame.locator('tbody tr')).toHaveCount(3);
  await expect(frame.locator('tbody th[scope="row"]')).toHaveCount(3);
  await expect(frame.locator('tfoot td')).toHaveAttribute('colspan', '6');
  const games = { 'Комети': 0, 'Хвилі': 0, 'Іскри': 0 };
  const wins = { ...games };
  const pairs = new Set();
  for (const text of await frame.locator('ol > li').allTextContents()) {
    const [, home, away, a, b] = text.match(/^(.*?) — (.*?): (\d+):(\d+)$/);
    games[home]++; games[away]++;
    expect(Number(a)).not.toBe(Number(b));
    wins[Number(a) > Number(b) ? home : away]++;
    pairs.add([home, away].sort().join('|'));
  }
  expect(pairs.size).toBe(3);
  for (const row of await frame.locator('tbody tr').all()) {
    const team = await row.locator('th[scope="row"]').innerText();
    const values = await row.locator('td').allTextContents();
    expect(values.slice(0, 3).map(Number)).toEqual([games[team], wins[team], wins[team] * 3]);
  }
  const rowWidths = await frame.locator('tbody tr').evaluateAll(rows => rows.map((row, i) => [...row.cells].reduce((sum, cell) => sum + cell.colSpan, i ? 1 : 0)));
  expect(rowWidths).toEqual([6, 6, 6]);
  await expect(frame.locator('img')).toHaveCount(6);
  await expect(frame.locator('.badge[download]')).toHaveCount(3);
  await expect(frame.locator('[align], [cellpadding], [cellspacing], script')).toHaveCount(0);
  await expect.poll(() => page.locator('.web-reference img').evaluate(img => img.naturalHeight)).toBe(task.referenceHeight);
  const target = await context.newPage();
  await target.setViewportSize({ width: 720, height: task.referenceHeight });
  await target.setContent(embedLessonImages(task.reference));
  await target.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
  expect(await target.locator('body').evaluate(body => body.scrollHeight <= innerHeight)).toBe(true);
  expect(await target.locator('html').evaluate(node => node.scrollWidth <= innerWidth)).toBe(true);
});

test('table and menu anchors, keyboard states and each original badge download work', async ({ page }) => {
  await page.goto('/' + route);
  await render(page);
  const parentURL = page.url();
  const frame = page.frameLocator('iframe');
  const menu = frame.locator('#menu a').first();
  await menu.focus();
  await page.keyboard.press('Tab');
  await expect(frame.locator('#menu a').nth(1)).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(menu).toHaveCSS('outline-color', 'rgb(29, 78, 216)');
  await page.keyboard.press('Enter');
  expect(await frame.locator('html').evaluate(() => location.hash)).toBe('#standings');
  await frame.getByRole('link', { name: 'Комети', exact: true }).click();
  expect(await frame.locator('html').evaluate(() => location.hash)).toBe('#comets');
  const badge = frame.locator('.badge').first();
  const size = await badge.boundingBox();
  await badge.hover();
  await expect(badge).toHaveCSS('background-color', 'rgb(220, 252, 231)');
  await page.mouse.down();
  await expect(badge).toHaveCSS('background-color', 'rgb(254, 243, 199)');
  const held = await badge.boundingBox();
  expect(held.width).toBe(size.width);
  expect(held.height).toBe(size.height);
  const firstDownload = page.waitForEvent('download');
  await page.mouse.up();
  const first = await firstDownload;
  expect(first.suggestedFilename()).toBe('comets.svg');
  expect(await readFile(await first.path(), 'utf8')).toBe(lessonImageAssets.find(asset => asset.filename === 'comets.svg').svg);
  for (const name of ['waves', 'sparks']) {
    const downloading = page.waitForEvent('download');
    await frame.locator(`a[download="${name}.svg"]`).click();
    const download = await downloading;
    expect(download.suggestedFilename()).toBe(name + '.svg');
    expect(await readFile(await download.path(), 'utf8')).toBe(lessonImageAssets.find(asset => asset.filename === name + '.svg').svg);
  }
  expect(page.url()).toBe(parentURL);
});

test('football project preserves its draft and exports/imports a standalone offline HTML with badges', async ({ page, context }, testInfo) => {
  await page.goto('/' + route);
  await render(page);
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/mini-project-2/mini-project-2-files'));
  await expect(page.locator('#web-source')).toHaveValue(task.reference);
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Завантажити HTML', exact: true }).click();
  const file = testInfo.outputPath('index.html');
  await (await downloading).saveAs(file);
  expect(await readFile(file, 'utf8')).toBe(embedLessonImages(task.reference));
  await context.setOffline(true);
  const standalone = await context.newPage();
  await standalone.goto(pathToFileURL(file).href);
  await expect(standalone).toHaveTitle('Кубок шкільного двору');
  await standalone.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
  await expect(standalone.locator('img')).toHaveCount(6);
  await standalone.getByRole('link', { name: 'Хвилі', exact: true }).click();
  await expect(standalone).toHaveURL(/#waves$/);
  const getting = standalone.waitForEvent('download');
  await standalone.locator('[download="waves.svg"]').click();
  const badge = await getting;
  expect(await readFile(await badge.path(), 'utf8')).toBe(lessonImageAssets.find(asset => asset.filename === 'waves.svg').svg);
  await page.locator('#web-source').fill('');
  await page.locator('input[type=file]').setInputFiles(file);
  await expect(page.locator('#web-source')).toHaveValue(task.reference);
});

test('football lesson and new local badge bank work offline on mobile and desktop', async ({ page }) => {
  const errors = [], requests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
  await page.context().setOffline(true);
  await page.goto(pathToFileURL(path.resolve('index.html')).href + route);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    const diagram = page.locator('figure').filter({ has: page.locator('#mini-project-2-map-caption') });
    await diagram.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
    await diagram.screenshot({ path: `/tmp/stepby-football-diagram-${width}.png` });
    await render(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.frameLocator('iframe').locator('html').evaluate(node => node.scrollWidth <= innerWidth)).toBe(true);
    if (width === 390) expect(await page.frameLocator('iframe').locator('.table-scroll').evaluate(node => node.scrollWidth > node.clientWidth)).toBe(true);
    await page.locator('.web-task-buttons').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/stepby-football-practice-${width}.png` });
  }
  await page.locator('.web-image-bank summary').click();
  await expect(page.getByRole('link', { name: 'Завантажити comets.svg', exact: true })).toBeVisible();
  const downloading = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Завантажити всі картинки (ZIP)' }).click();
  expect((await downloading).suggestedFilename()).toBe('images.zip');
  expect(errors).toEqual([]);
  expect(requests).toEqual([]);
});
