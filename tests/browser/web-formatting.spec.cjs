const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { formattingTasks } = loadTypeScript('src/features/web-development/formatting-tasks.ts');
const route = '#/web/html-css/text-formatting';

async function run(page, task) {
  await page.locator(`[data-web-task="${task.id}"]`).click();
  await expect(page.locator(`[data-web-task="${task.id}"]`)).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#web-source').fill(task.reference);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
}

test('formatting course shows five tasks and renders semantic elements and CSS', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/#/web/html-css');
  await page.getByRole('link').filter({ hasText: 'Тема 2.' }).click();
  await expect(page).toHaveURL(new RegExp(route + '$'));
  await expect(page.locator('#roboBody')).toContainText('text-align');
  await expect(page.locator('#roboBody')).not.toContainText('align="');
  await expect(page.locator('[data-web-task]')).toHaveCount(5);
  const frame = page.frameLocator('iframe');
  for (const task of formattingTasks) {
    await run(page, task);
    await expect.poll(() => frame.locator('title').textContent()).toBe(task.reference.match(/<title>(.*?)<\/title>/)[1]);
    await expect(page.locator('.web-reference img')).toBeVisible();
    await expect.poll(() => page.locator('.web-reference img').evaluate(image => image.naturalWidth)).toBe(720);
    await expect(frame.locator('[align], font, center')).toHaveCount(0);
    if (task.id === 'formatting-indices') {
      await expect(frame.locator('sup')).toHaveText('2');
      await expect(frame.locator('sub')).toHaveText('2');
      await expect(frame.locator('b')).toHaveCount(3);
    } else if (task.id === 'formatting-story') {
      await expect(frame.locator('strong')).toHaveText('Увага:');
      await expect(frame.locator('em')).toHaveText('разом');
      await expect(frame.locator('s')).toContainText('Старий план');
      await expect(frame.locator('span')).toHaveCSS('text-decoration-line', 'underline');
    } else if (task.id === 'formatting-colors') {
      const colors = ['rgb(185, 28, 28)', 'rgb(154, 52, 18)', 'rgb(133, 77, 14)', 'rgb(22, 101, 52)', 'rgb(29, 78, 216)', 'rgb(126, 34, 206)'];
      for (let i = 1; i <= 6; i++) {
        await expect(frame.locator('h' + i)).toHaveCSS('text-align', 'center');
        await expect(frame.locator('h' + i)).toHaveCSS('color', colors[i - 1]);
      }
    } else if (task.id === 'formatting-mineral') {
      await expect(frame.locator('i sub')).toHaveText(['3', '2', '3', '6']);
    } else {
      await expect(frame.locator('h1')).toHaveCSS('text-align', 'center');
      await expect(frame.locator('h1')).toHaveCSS('color', 'rgb(29, 78, 216)');
      for (const p of await frame.locator('p').all()) await expect(p).toHaveCSS('color', 'rgb(51, 65, 85)');
    }
  }
  expect(errors).toEqual([]);
});

test('formatting preview keeps CSS inside its sandbox and blocks active/external content', async ({ page }) => {
  const external = [];
  const blocked = new Map();
  const responses = [];
  page.on('request', request => { if (request.url().startsWith('https://example.com')) external.push(request.url()); });
  page.on('requestfailed', request => { if (request.url().startsWith('https://example.com')) blocked.set(request.url(), request.failure().errorText); });
  page.on('response', response => { if (response.url().startsWith('https://example.com')) responses.push(response.url()); });
  await page.goto('/' + route);
  const before = await page.locator('h1.page').evaluate(node => getComputedStyle(node).color);
  await page.locator('#web-source').fill('<!DOCTYPE html><html><head><title>Ізоляція</title><style>@import url("https://example.com/a.css"); h1 { color: green; text-align: right; } body { background-image: url("https://example.com/a.png"); }</style></head><body><h1 onclick="parent.document.body.remove()">Заголовок</h1><p><strong>Увага</strong><em>наголос</em><b>назва</b><i>термін</i><u>помилка</u><s>старе</s><del>вилучене</del><sup>2</sup><sub>3</sub></p><script>parent.document.body.remove()</script><iframe src="https://example.com"></iframe><img src="https://example.com/x.png"><meta http-equiv="refresh" content="0;url=https://example.com"></body></html>');
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('h1')).toHaveCSS('color', 'rgb(0, 128, 0)');
  await expect(frame.locator('h1')).toHaveCSS('text-align', 'right');
  await expect(frame.locator('script, iframe, img, [onclick], [http-equiv="refresh"]')).toHaveCount(0);
  await frame.locator('h1').click();
  expect(await page.locator('h1.page').evaluate(node => getComputedStyle(node).color)).toBe(before);
  await expect(page.locator('#web-source')).toBeVisible();
  await expect.poll(() => blocked.size).toBe(2);
  expect(external.length).toBe(2);
  expect([...blocked.values()]).toEqual(['csp', 'csp']);
  expect(responses).toEqual([]);
});

test('lesson changes reset tasks; task and anchor changes retain formatting drafts', async ({ page }) => {
  await page.goto('/' + route);
  await run(page, formattingTasks[1]);
  await page.locator('[data-web-task="formatting-homework"]').click();
  await page.locator('#web-source').fill('Інша чернетка');
  await page.locator('[data-web-task="formatting-story"]').click();
  await expect(page.locator('#web-source')).toHaveValue(formattingTasks[1].reference);
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/text-formatting/text-formatting-css'));
  await expect(page.locator('#web-source')).toHaveValue(formattingTasks[1].reference);
  await expect(page.frameLocator('iframe').locator('span')).toHaveCSS('text-decoration-line', 'underline');
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Завантажити HTML', exact: true }).click();
  const download = await downloadEvent;
  const file = await download.path();
  expect(await require('node:fs/promises').readFile(file, 'utf8')).toBe(formattingTasks[1].reference);
  await page.locator('#web-source').fill('');
  await page.locator('input[type=file]').setInputFiles(file);
  await expect(page.locator('#web-source')).toHaveValue(formattingTasks[1].reference);
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/web-page'));
  await expect(page.locator('[data-web-task="paragraphs"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#web-source')).not.toHaveValue(formattingTasks[1].reference);
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/text-formatting'));
  await expect(page.locator('[data-web-task="formatting-indices"]')).toHaveAttribute('aria-pressed', 'true');
});

test('formatting lesson works offline at desktop and mobile widths', async ({ page }) => {
  const errors = [];
  const external = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) external.push(request.url()); });
  await page.context().setOffline(true);
  await page.goto(pathToFileURL(path.resolve('index.html')).href + route + '/text-formatting-practice');
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await run(page, formattingTasks[4]);
    await expect(page.frameLocator('iframe').locator('h1')).toHaveCSS('color', 'rgb(29, 78, 216)');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('.web-practice').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/stepby-formatting-${width}.png`, fullPage: true });
  }
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});
