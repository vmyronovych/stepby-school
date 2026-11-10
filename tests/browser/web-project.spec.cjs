const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { readFile } = require('node:fs/promises');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { projectTasks, projectStarter } = loadTypeScript('src/features/web-development/project-tasks.ts');
const { embedLessonImages } = loadTypeScript('src/features/web-development/media.ts');
const task = projectTasks[0];
const route = '#/web/html-css/mini-project-1';
async function render(page, source = task.reference) {
  await page.locator('#web-source').fill(source);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
}

test('original detective project is discoverable and its reference fulfills the project brief', async ({ page, context }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/#/web/html-css');
  await page.getByRole('link').filter({ hasText: 'Міні-проєкт 1.' }).click();
  await expect(page).toHaveURL(new RegExp(route + '$'));
  await expect(page.locator('[data-web-task]')).toHaveCount(1);
  await expect(page.locator('#web-source')).toHaveValue(projectStarter);
  await render(page);
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('h1')).toHaveText('Детективне бюро «Зелений слід»');
  await expect(frame.locator('h2')).toHaveCount(4);
  await expect(frame.locator('h3')).toHaveCount(3);
  await expect(frame.locator('body')).toContainText('Це вигадана історія');
  await expect(frame.locator('ul.evidence > li')).toHaveCount(3);
  await expect(frame.locator('ol.plan > li')).toHaveCount(3);
  await expect(frame.locator('.evidence')).toHaveCSS('list-style-type', 'square');
  await expect(frame.locator('.plan')).toHaveCSS('list-style-type', 'decimal');
  await expect(frame.locator('strong')).toHaveText('Наше правило: спочатку перевіряємо, потім робимо висновки.');
  await expect(frame.locator('em')).toHaveText('не доказ');
  await expect(frame.locator('.clue')).toHaveCount(3);
  for (const clue of await frame.locator('.clue').all()) {
    await expect(clue).toHaveCSS('display', 'flow-root');
    await expect(clue.locator('img[alt]')).toHaveCount(1);
    await clue.locator('img').evaluate(img => img.decode());
    expect(await clue.evaluate(node => node.getBoundingClientRect().bottom >= node.querySelector('img').getBoundingClientRect().bottom)).toBe(true);
  }
  await expect(frame.locator('.right')).toHaveCSS('float', 'right');
  await expect(frame.locator('.left').first()).toHaveCSS('float', 'left');
  await expect(frame.locator('hr')).toHaveCSS('height', '3px');
  await expect(frame.locator('.result')).toContainText('Закладку знайшли в конверті');
  await expect(frame.locator('.author')).toHaveCSS('text-align', 'right');
  await expect(frame.locator('[align], [clear], [style], script')).toHaveCount(0);
  await expect.poll(() => page.locator('.web-reference img').evaluate(img => img.naturalHeight)).toBe(task.referenceHeight);
  const target = await context.newPage();
  await target.setViewportSize({ width: 720, height: task.referenceHeight });
  await target.setContent(embedLessonImages(task.reference));
  await target.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
  expect(await target.locator('body').evaluate(body => body.scrollHeight <= innerHeight)).toBe(true);
  expect(errors).toEqual([]);
});

test('project draft survives anchors and exported HTML works offline and imports with editable image names', async ({ page, context }, testInfo) => {
  await page.goto('/' + route);
  await render(page);
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/mini-project-1/mini-project-1-files'));
  await expect(page.locator('#web-source')).toHaveValue(task.reference);
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Завантажити HTML', exact: true }).click();
  const download = await downloading;
  const file = testInfo.outputPath(download.suggestedFilename());
  await download.saveAs(file);
  expect(await readFile(file, 'utf8')).toBe(embedLessonImages(task.reference));
  await context.setOffline(true);
  const homework = await context.newPage();
  await homework.goto(pathToFileURL(file).href);
  await expect(homework).toHaveTitle('Зелений слід — справа про закладку');
  await homework.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
  await expect(homework.locator('img')).toHaveCount(3);
  await page.locator('#web-source').fill('');
  await page.locator('input[type=file]').setInputFiles(file);
  await expect(page.locator('#web-source')).toHaveValue(task.reference);
});

test('project works offline on desktop/mobile and reuses local image downloads and isolated preview', async ({ page }) => {
  const errors = [], requests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
  await page.context().setOffline(true);
  await page.goto(pathToFileURL(path.resolve('index.html')).href + route);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    const diagram = page.locator('figure').filter({ has: page.locator('#mini-project-1-map-caption') });
    await diagram.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
    await diagram.screenshot({ path: `/tmp/stepby-project-diagram-${width}.png` });
    await render(page);
    await page.frameLocator('iframe').locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
    expect(await page.frameLocator('iframe').locator('html').evaluate(node => node.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('.web-task-buttons').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/stepby-project-practice-${width}.png` });
  }
  await page.locator('.web-image-bank summary').click();
  const downloading = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Завантажити всі картинки (ZIP)' }).click();
  expect((await downloading).suggestedFilename()).toBe('images.zip');
  const color = await page.locator('h1.page').evaluate(node => getComputedStyle(node).color);
  await render(page, '<style>h1{color:red}</style><h1>Тест</h1><script>parent.document.body.remove()</script><img src="leaf.svg" onload="alert(1)" alt="Листок">');
  await expect(page.frameLocator('iframe').locator('h1')).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect(page.frameLocator('iframe').locator('script, [onload]')).toHaveCount(0);
  expect(await page.locator('h1.page').evaluate(node => getComputedStyle(node).color)).toBe(color);
  await page.locator('.robo-body a[href="#/web/html-css/web-review"]').click();
  await expect(page.locator('[data-web-task]')).toHaveCount(4);
  expect(errors).toEqual([]);
  expect(requests).toEqual([]);
});
