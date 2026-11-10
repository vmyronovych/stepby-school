const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { readFile } = require('node:fs/promises');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { imagesTasks } = loadTypeScript('src/features/web-development/images-tasks.ts');
const { embedLessonImages } = loadTypeScript('src/features/web-development/media.ts');
const route = '#/web/html-css/page-images';
async function render(page, source) {
  await page.locator('#web-source').fill(source);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
}
async function loaded(frame, count) {
  await expect(frame.locator('img')).toHaveCount(count);
  await expect.poll(() => frame.locator('img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0))).toBe(true);
}

test('image lesson and all references render images, backgrounds, borders and contained floats', async ({ page, context }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/#/web/html-css');
  await page.getByRole('link').filter({ hasText: 'Тема 5.' }).click();
  await expect(page).toHaveURL(new RegExp(route + '$'));
  await expect(page.locator('[data-web-task]')).toHaveCount(3);
  const frame = page.frameLocator('iframe');
  const target = await context.newPage();
  for (const [index, task] of imagesTasks.entries()) {
    await page.locator(`[data-web-task="${task.id}"]`).click();
    await render(page, task.reference);
    await loaded(frame, [3, 2, 1][index]);
    await expect.poll(() => page.locator('.web-reference img').evaluate(img => img.naturalHeight)).toBe(task.referenceHeight ?? 420);
    await expect(frame.locator('[align], [clear], [border]')).toHaveCount(0);
    await target.setViewportSize({ width: 720, height: task.referenceHeight ?? 420 });
    await target.setContent(embedLessonImages(task.reference));
    await target.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
    expect(await target.locator('body').evaluate(body => body.scrollHeight <= innerHeight)).toBe(true);
    if (index === 0) {
      await expect(frame.locator('img').first()).toHaveCSS('object-fit', 'cover');
      await expect(frame.locator('img').first()).toHaveCSS('border-radius', '20px');
      await expect(frame.locator('body')).toHaveCSS('background-repeat', 'no-repeat');
      await expect(frame.locator('body')).toHaveCSS('background-size', 'cover');
      expect(await frame.locator('body').evaluate(body => getComputedStyle(body).backgroundImage)).toContain('data:image/svg+xml');
    } else if (index === 1) {
      await expect(frame.locator('.left')).toHaveCSS('float', 'left');
      await expect(frame.locator('.right')).toHaveCSS('float', 'right');
      for (const note of await frame.locator('.animal-note').all()) {
        await expect(note).toHaveCSS('display', 'flow-root');
        expect(await note.evaluate(node => node.getBoundingClientRect().bottom >= node.querySelector('img').getBoundingClientRect().bottom)).toBe(true);
      }
    } else {
      await expect(frame.locator('body')).toHaveCSS('background-repeat', 'repeat-x');
      expect(await frame.locator('img').evaluate(img => Math.abs(img.getBoundingClientRect().left + img.getBoundingClientRect().width / 2 - innerWidth / 2))).toBeLessThan(1);
    }
  }
  expect(errors).toEqual([]);
});

test('image bank inserts at cursor and drafts and embedded homework round-trip offline', async ({ page, context }, testInfo) => {
  await page.goto('/' + route);
  await page.locator('summary').filter({ hasText: 'Зображення для завдань' }).click();
  const source = '<!DOCTYPE html><html><head><title>Квітка</title></head><body><p>Текст</p></body></html>';
  await page.locator('#web-source').fill(source);
  await page.locator('#web-source').evaluate(node => node.setSelectionRange(node.value.indexOf('<p>'), node.value.indexOf('<p>')));
  await page.getByRole('button', { name: 'Квітка flower.svg', exact: true }).click();
  expect(await page.locator('#web-source').inputValue()).toContain('<body>\n<img src="flower.svg" alt="Квітка">\n<p>');
  const task = imagesTasks[2];
  await page.locator(`[data-web-task="${task.id}"]`).click();
  await render(page, task.reference);
  await page.locator('[data-web-task="images-flower-shop"]').click();
  await page.locator(`[data-web-task="${task.id}"]`).click();
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/page-images/page-images-size'));
  await expect(page.locator('#web-source')).toHaveValue(task.reference);
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Завантажити HTML', exact: true }).click();
  const download = await downloading;
  const file = testInfo.outputPath(download.suggestedFilename());
  await download.saveAs(file);
  const text = await readFile(file, 'utf8');
  expect(text).toBe(embedLessonImages(task.reference));
  const homework = await context.newPage();
  await context.setOffline(true);
  await homework.goto(pathToFileURL(file).href);
  await loaded(homework, 1);
  await expect(homework.locator('body')).toHaveCSS('background-repeat', 'repeat-x');
  await page.locator('#web-source').fill('');
  await page.locator('input[type=file]').setInputFiles(file);
  await expect(page.locator('#web-source')).toHaveValue(task.reference);
});

test('image preview removes external and active content and preserves earlier restrictions', async ({ page }) => {
  await page.goto('/' + route);
  const blocked = [], responses = [];
  page.on('requestfailed', request => { if (request.url().startsWith('https://example.com')) blocked.push(request.failure().errorText); });
  page.on('response', response => { if (response.url().startsWith('https://example.com')) responses.push(response.url()); });
  const color = await page.locator('h1.page').evaluate(node => getComputedStyle(node).color);
  await render(page, '<style>body {background-image:url(https://example.com/a.png)} h1 {color:red}</style><h1>Текст</h1><img src=flower.svg alt="Квітка" width="300" height="180" onload="parent.document.body.remove()" style="width:999px" srcset="https://example.com/b.png 2x"><img src="https://example.com/img.png"><img src="data:image/svg+xml,%3Csvg%20onload=%22alert(1)%22%3E%3C/svg%3E"><script>alert(1)</script>');
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('img').first()).toHaveAttribute('alt', 'Квітка');
  await expect(frame.locator('img').first()).toHaveAttribute('width', '300');
  await expect.poll(() => frame.locator('img').first().evaluate(img => img.naturalWidth)).toBe(300);
  await expect(frame.locator('script, [onload], [style], [srcset]')).toHaveCount(0);
  await expect(frame.locator('img[src]')).toHaveCount(1);
  await expect.poll(() => blocked).toEqual(['csp']);
  expect(responses).toEqual([]);
  expect(await page.locator('h1.page').evaluate(node => getComputedStyle(node).color)).toBe(color);
  for (const lesson of ['lists-lines', 'css-intro', 'text-formatting', 'web-page']) {
    await page.evaluate(lesson => StepBySchool.navigate('#/web/html-css/' + lesson), lesson);
    await render(page, '<img src="flower.svg" alt="Квітка"><div>Контейнер</div>');
    await expect(frame.locator('img, div')).toHaveCount(0);
    await expect(page.locator('.web-image-bank')).toHaveCount(0);
  }
});

test('image diagrams, local media and responsive tasks work offline at mobile and desktop widths', async ({ page }) => {
  const errors = [], external = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) external.push(request.url()); });
  await page.context().setOffline(true);
  await page.goto(pathToFileURL(path.resolve('index.html')).href + route);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const name of ['meaning', 'sizing', 'float', 'repeat']) {
      const diagram = page.locator('figure').filter({ has: page.locator(`#page-images-${name}-caption`) });
      await diagram.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
      await diagram.screenshot({ path: `/tmp/stepby-images-${name}-${width}.png` });
    }
    for (const [index, task] of imagesTasks.entries()) {
      await page.locator(`[data-web-task="${task.id}"]`).click();
      await render(page, task.reference);
      await loaded(page.frameLocator('iframe'), [3, 2, 1][index]);
      expect(await page.frameLocator('iframe').locator('html').evaluate(node => node.scrollWidth <= innerWidth)).toBe(true);
    }
    await page.locator('.web-image-bank summary').click();
    await page.locator('.web-image-bank').screenshot({ path: `/tmp/stepby-images-bank-${width}.png` });
    await page.locator('.web-image-bank summary').click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test('the full local archive downloads over HTTP and offline file URLs', async ({ page }, testInfo) => {
  for (const offline of [false, true]) {
    await page.context().setOffline(offline);
    await page.goto(offline ? pathToFileURL(path.resolve('index.html')).href + route : '/' + route);
    await page.locator('.web-image-bank summary').click();
    const downloading = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Завантажити всі картинки (ZIP)', exact: true }).click();
    const download = await downloading;
    expect(download.suggestedFilename()).toBe('images.zip');
    const file = testInfo.outputPath(offline ? 'offline-images.zip' : 'http-images.zip');
    await download.saveAs(file);
    expect(await readFile(file)).toEqual(await readFile(path.resolve('assets/web-development/media/images.zip')));
    await expect(page.locator('#web-source')).toBeVisible();
    await page.setViewportSize({ width: 390, height: 1000 });
    await page.locator('.web-image-bank').screenshot({ path: `/tmp/stepby-images-downloads-${offline ? 'offline' : 'http'}.png` });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});


// Separate browser contexts avoid Chromium's burst download limit when the bank grows.
for (const asset of loadTypeScript('src/features/web-development/media.ts').lessonImageAssets) {
  test(`original SVG ${asset.filename} downloads over HTTP and offline file URLs`, async ({ page }) => {
    for (const offline of [false, true]) {
      await page.context().setOffline(offline);
      await page.goto(offline ? pathToFileURL(path.resolve('index.html')).href + route : '/' + route);
      await page.locator('.web-image-bank summary').click();
      const downloading = page.waitForEvent('download');
      await page.getByRole('link', { name: `Завантажити ${asset.filename}`, exact: true }).click();
      const download = await downloading;
      expect(download.suggestedFilename()).toBe(asset.filename);
      expect(await readFile(await download.path(), 'utf8')).toBe(asset.svg);
    }
  });
}
