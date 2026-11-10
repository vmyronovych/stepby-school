const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { readFile } = require('node:fs/promises');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { reviewTasks } = loadTypeScript('src/features/web-development/review-tasks.ts');
const { embedLessonImages } = loadTypeScript('src/features/web-development/media.ts');
const route = '#/web/html-css/web-review';
async function render(page, task) {
  await page.locator(`[data-web-task="${task.id}"]`).click();
  await page.locator('#web-source').fill(task.reference);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect.poll(() => page.frameLocator('iframe').locator('title').textContent()).toBe(task.reference.match(/<title>(.*?)<\/title>/)[1]);
}

test('review lesson is discoverable and all references combine the first five topics', async ({ page, context }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/#/web/html-css');
  await page.getByRole('link').filter({ hasText: 'Тема 6.' }).click();
  await expect(page).toHaveURL(new RegExp(route + '$'));
  await expect(page.locator('[data-web-task]')).toHaveCount(4);
  const frame = page.frameLocator('iframe');
  const target = await context.newPage();
  for (const [index, task] of reviewTasks.entries()) {
    await render(page, task);
    await expect.poll(() => page.locator('.web-reference img').evaluate(img => img.naturalHeight)).toBe(task.referenceHeight ?? 420);
    await expect(frame.locator('h1')).toHaveCount(1);
    await expect(frame.locator('font, center, [align], [type]')).toHaveCount(0);
    await target.setViewportSize({ width: 720, height: task.referenceHeight ?? 420 });
    await target.setContent(embedLessonImages(task.reference));
    await target.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
    expect(await target.locator('body').evaluate(body => body.scrollHeight <= innerHeight)).toBe(true);
    if (index === 0) {
      await expect(frame.locator('p')).toHaveCount(3);
      await expect(frame.locator('.title-mark')).toHaveCSS('text-decoration-line', 'underline');
      await expect(frame.locator('em')).toHaveText('разом');
      await expect(frame.locator('strong')).toHaveText('Важливо:');
      await expect(frame.locator('s')).toHaveText('Старий план: грати самому.');
      await expect(frame.locator('h1')).toHaveCSS('color', 'rgb(0, 0, 139)');
      await expect(frame.locator('p').first()).toHaveCSS('font-size', '18px');
    } else if (index === 1) {
      await expect(frame.locator('sub')).toHaveText('2');
      await expect(frame.locator('sup')).toHaveCount(3);
      await expect(frame.locator('br')).toHaveCount(1);
      await expect(frame.locator('p').last()).toContainText('Тег <br> переносить');
      await expect(frame.locator('h1')).toHaveCSS('color', 'rgb(139, 0, 0)');
    } else if (index === 2) {
      await expect(frame.locator('h2')).toHaveCount(3);
      for (const [name, marker] of [['food-list', 'circle'], ['activity-list', 'disc'], ['subject-list', 'upper-roman']]) {
        await expect(frame.locator('.' + name)).toHaveCSS('list-style-type', marker);
        await expect(frame.locator('.' + name + ' > li')).toHaveCount(5);
      }
      await expect(frame.locator('li').first()).toHaveCSS('font-weight', '700');
      await expect(frame.locator('ul > :not(li), ol > :not(li)')).toHaveCount(0);
    } else {
      await expect(frame.locator('.photo')).toHaveCount(3);
      await expect(frame.locator('.photo > img[alt]')).toHaveCount(3);
      await expect(frame.locator('.photo > br')).toHaveCount(3);
      await expect.poll(() => frame.locator('img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0))).toBe(true);
      await expect(frame.locator('img').first()).toHaveCSS('object-fit', 'cover');
      await expect(frame.locator('img').first()).toHaveCSS('border-radius', '24px');
      expect(await frame.locator('body').evaluate(body => getComputedStyle(body).backgroundImage)).toContain('data:image/svg+xml');
    }
  }
  expect(errors).toEqual([]);
});

test('review drafts and embedded gallery survive task and anchor changes and file round-trip', async ({ page, context }, testInfo) => {
  await page.goto('/' + route);
  const task = reviewTasks[3];
  await render(page, task);
  await render(page, reviewTasks[0]);
  await page.locator('[data-web-task="review-gallery"]').click();
  await expect(page.locator('#web-source')).toHaveValue(task.reference);
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/web-review/web-review-css'));
  await expect(page.locator('#web-source')).toHaveValue(task.reference);
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Завантажити HTML', exact: true }).click();
  const download = await downloading;
  const file = testInfo.outputPath(download.suggestedFilename());
  await download.saveAs(file);
  expect(await readFile(file, 'utf8')).toBe(embedLessonImages(task.reference));
  const homework = await context.newPage();
  await context.setOffline(true);
  await homework.goto(pathToFileURL(file).href);
  await homework.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
  await expect(homework.locator('img')).toHaveCount(3);
  await page.locator('#web-source').fill('');
  await page.locator('input[type=file]').setInputFiles(file);
  await expect(page.locator('#web-source')).toHaveValue(task.reference);
});

test('review combines known preview features without style leaks or changes to earlier restrictions', async ({ page }) => {
  await page.goto('/' + route);
  const before = await page.locator('h1.page').evaluate(node => getComputedStyle(node).color);
  const source = '<style>h1 {color:red} .item {color:navy}</style><h1>Тест</h1><ul class="item"><li>Пункт</li></ul><img src="flower.svg" alt="Квітка" onload="parent.document.body.remove()"><script>alert(1)</script><iframe src="https://example.com"></iframe>';
  await page.locator('#web-source').fill(source);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('.item')).toHaveCSS('color', 'rgb(0, 0, 128)');
  await expect.poll(() => frame.locator('img').evaluate(img => img.naturalWidth)).toBe(300);
  await expect(frame.locator('script, [onload], iframe')).toHaveCount(0);
  expect(await page.locator('h1.page').evaluate(node => getComputedStyle(node).color)).toBe(before);
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/lists-lines'));
  await page.locator('#web-source').fill(source);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect(frame.locator('img')).toHaveCount(0);
  await expect(frame.locator('ul.item')).toHaveCount(1);
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/web-review'));
  await expect(page.locator('[data-web-task="review-interests"]')).toHaveAttribute('aria-pressed', 'true');
});

test('review diagrams, topic links and every exercise work offline on desktop and mobile', async ({ page }) => {
  const errors = [], requests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
  await page.context().setOffline(true);
  await page.goto(pathToFileURL(path.resolve('index.html')).href + route);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.locator('figure').filter({ has: page.locator('#web-review-file-caption') }).screenshot({ path: `/tmp/stepby-review-file-${width}.png` });
    for (const task of reviewTasks) {
      await render(page, task);
      expect(await page.frameLocator('iframe').locator('html').evaluate(node => node.scrollWidth <= innerWidth)).toBe(true);
    }
    await page.locator('.web-task-buttons').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/stepby-review-practice-${width}.png` });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.locator('.web-image-bank summary').click();
  await expect(page.getByRole('link', { name: 'Завантажити всі картинки (ZIP)' })).toBeVisible();
  const downloading = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Завантажити rabbit.svg', exact: true }).click();
  expect((await downloading).suggestedFilename()).toBe('rabbit.svg');
  for (const lesson of ['web-page', 'text-formatting', 'css-intro', 'lists-lines', 'page-images']) {
    await page.evaluate(() => StepBySchool.navigate('#/web/html-css/web-review'));
    await page.locator(`.robo-body a[href="#/web/html-css/${lesson}"]`).first().click();
    await expect(page.locator('[data-web-task]').first()).toBeVisible();
    await expect(page).toHaveURL(new RegExp('/' + lesson + '$'));
  }
  expect(errors).toEqual([]);
  expect(requests).toEqual([]);
});
