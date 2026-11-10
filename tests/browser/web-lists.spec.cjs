const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { readFile } = require('node:fs/promises');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { listsTasks } = loadTypeScript('src/features/web-development/lists-tasks.ts');
const route = '#/web/html-css/lists-lines';
async function render(page, source) {
  await page.locator('#web-source').fill(source);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
}

test('lists lesson is discoverable and all original references render complete list structures', async ({ page, context }) => {
  const target = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/#/web/html-css');
  await page.getByRole('link').filter({ hasText: 'Тема 4.' }).click();
  await expect(page).toHaveURL(new RegExp(route + '$'));
  await expect(page.locator('[data-web-task]')).toHaveCount(4);
  const frame = page.frameLocator('iframe');
  for (const task of listsTasks) {
    await page.locator(`[data-web-task="${task.id}"]`).click();
    await render(page, task.reference);
    await expect.poll(() => page.locator('.web-reference img').evaluate(img => img.naturalHeight)).toBe(task.referenceHeight ?? 420);
    await expect.poll(() => frame.locator('title').textContent()).toBe(task.reference.match(/<title>(.*?)<\/title>/)[1]);
    await target.setViewportSize({ width: 720, height: task.referenceHeight ?? 420 });
    await target.setContent(task.reference);
    expect(await target.locator('body').evaluate(body => body.scrollHeight <= innerHeight)).toBe(true);
    await expect(frame.locator('ul > :not(li), ol > :not(li)')).toHaveCount(0);
    if (task.id === 'lists-island') {
      for (const [name, marker] of [['round', 'disc'], ['hollow', 'circle'], ['square', 'square']])
        await expect(frame.locator('.' + name)).toHaveCSS('list-style-type', marker);
      await expect(frame.locator('ol > li')).toHaveCount(5);
    } else if (task.id === 'lists-regions') {
      await expect(frame.locator('ol')).toHaveCSS('list-style-type', 'upper-alpha');
      await expect(frame.locator('ul')).toHaveCSS('background-color', 'rgb(224, 240, 255)');
      await expect(frame.locator('hr')).toHaveCSS('height', '4px');
      await expect(frame.locator('body')).toHaveCSS('background-color', 'rgb(236, 253, 245)');
    } else if (task.id === 'lists-nested') {
      await expect(frame.locator('.catalog')).toHaveAttribute('role', 'list');
      await expect(frame.locator('.catalog > li > ul')).toHaveCount(3);
      await expect(frame.locator('.catalog > li > ul > li')).toHaveCount(9);
      await expect(frame.locator('.catalog')).toHaveCSS('list-style-type', 'none');
    } else {
      await expect(frame.locator('.route')).toHaveCSS('list-style-type', 'upper-roman');
      await expect(frame.locator('.supplies')).toHaveCSS('width', '320px');
      await expect(frame.locator('.supplies')).toHaveCSS('background-color', 'rgb(224, 242, 254)');
    }
  }
  expect(errors).toEqual([]);
});

test('list attributes stay narrow and preview styles and network access stay isolated', async ({ page }) => {
  await page.goto('/' + route);
  const color = await page.locator('h1.page').evaluate(node => getComputedStyle(node).color);
  const blocked = [];
  const responses = [];
  page.on('requestfailed', request => { if (request.url().includes('blocked.invalid')) blocked.push(request.failure().errorText); });
  page.on('response', response => { if (response.url().includes('blocked.invalid')) responses.push(response.url()); });
  await render(page, '<style>h1 {color:red} ul {background-image:url(https://blocked.invalid/image)}</style><h1>Тест</h1><ol type="A" start="3" reversed onclick="alert(1)"><li style="color:red">Крок</li></ol><ul role="list" type="square"><li>Пункт</li></ul><hr color="red"><img src="https://blocked.invalid/img"><script>alert(1)</script>');
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('ol')).toHaveAttribute('type', 'A');
  await expect(frame.locator('ol')).toHaveAttribute('start', '3');
  await expect(frame.locator('ul')).toHaveAttribute('role', 'list');
  await expect(frame.locator('script, img, [onclick], [style], [reversed], [color], ul[type]')).toHaveCount(0);
  expect(await page.locator('h1.page').evaluate(node => getComputedStyle(node).color)).toBe(color);
  await expect.poll(() => blocked).toEqual(['csp']);
  expect(responses).toEqual([]);
  for (const lesson of ['css-intro', 'text-formatting', 'web-page']) {
    await page.evaluate(lesson => StepBySchool.navigate('#/web/html-css/' + lesson), lesson);
    await render(page, '<ul><li>Текст</li></ul><ol><li>Крок</li></ol><hr>');
    await expect(frame.locator('ul, ol, li, hr')).toHaveCount(0);
  }
});

test('list drafts survive task and anchor changes and UTF-8 files round-trip', async ({ page }) => {
  await page.goto('/' + route);
  const task = listsTasks[3];
  await page.locator(`[data-web-task="${task.id}"]`).click();
  await render(page, task.reference);
  await page.locator('[data-web-task="lists-island"]').click();
  await page.locator('#web-source').fill('Чернетка');
  await page.locator(`[data-web-task="${task.id}"]`).click();
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/lists-lines/lists-lines-nesting'));
  await expect(page.locator('#web-source')).toHaveValue(task.reference);
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Завантажити HTML', exact: true }).click();
  const file = await (await downloading).path();
  expect(await readFile(file, 'utf8')).toBe(task.reference);
  await page.locator('#web-source').fill('');
  await page.locator('input[type=file]').setInputFiles(file);
  await expect(page.locator('#web-source')).toHaveValue(task.reference);
});

test('list diagrams and responsive references work offline on desktop and mobile', async ({ page }) => {
  const errors = [], requests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
  await page.context().setOffline(true);
  await page.goto(pathToFileURL(path.resolve('index.html')).href + route);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.locator('figure').filter({ has: page.locator('#lists-lines-marker-caption') }).screenshot({ path: `/tmp/stepby-lists-diagram-${width}.png` });
    for (const task of [listsTasks[2], listsTasks[3]]) {
      await page.locator(`[data-web-task="${task.id}"]`).click();
      await render(page, task.reference);
      await expect(page.frameLocator('iframe').locator('h1')).toBeVisible();
      expect(await page.frameLocator('iframe').locator('html').evaluate(html => html.scrollWidth <= innerWidth)).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('.web-task-buttons').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/stepby-lists-practice-${width}.png` });
  }
  expect(errors).toEqual([]);
  expect(requests).toEqual([]);
});
