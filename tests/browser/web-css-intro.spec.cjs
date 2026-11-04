const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { cssIntroTasks } = loadTypeScript('src/features/web-development/css-intro-tasks.ts');
const route = '#/web/html-css/css-intro';

async function run(page, task) {
  await page.locator(`[data-web-task="${task.id}"]`).click();
  await page.locator('#web-source').fill(task.reference);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect.poll(() => page.frameLocator('iframe').locator('title').textContent()).toBe(task.reference.match(/<title>(.*?)<\/title>/)[1]);
}

test('CSS introduction is discoverable and all five class-based targets render', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/#/web/html-css');
  await page.getByRole('link').filter({ hasText: 'Тема 3.' }).click();
  await expect(page).toHaveURL(new RegExp(route + '$'));
  await expect(page.locator('#css-intro-class-caption')).toBeVisible();
  await expect(page.locator('[data-web-task]')).toHaveCount(5);
  const frame = page.frameLocator('iframe');
  for (const task of cssIntroTasks) {
    await run(page, task);
    await expect.poll(() => page.locator('.web-reference img').evaluate(image => image.naturalHeight)).toBe(task.referenceHeight ?? 420);
    await expect(frame.locator('[align], font, center')).toHaveCount(0);
    if (task.id === 'css-first-class') {
      await expect(frame.locator('p').first()).toHaveCSS('color', 'rgb(0, 0, 0)');
      await expect(frame.locator('.welcome')).toHaveCSS('color', 'rgb(0, 0, 255)');
      await expect(frame.locator('.welcome')).toHaveCSS('font-size', '20px');
      await expect(frame.locator('.welcome')).toHaveCSS('font-family', 'Arial, sans-serif');
    } else if (task.id === 'css-shared-classes') {
      await expect(frame.locator('p')).toHaveCount(5);
      await expect(frame.locator('.fact')).toHaveCount(2);
      for (const fact of await frame.locator('.fact').all()) {
        await expect(fact).toHaveCSS('color', 'rgb(0, 100, 0)');
        await expect(fact).toHaveCSS('font-size', '28px');
        await expect(fact).toHaveCSS('font-weight', '700');
      }
      await expect(frame.locator('.notice')).toHaveCSS('font-family', 'Georgia, serif');
      await expect(frame.locator('.notice')).toHaveCSS('color', 'rgb(255, 0, 0)');
    } else if (task.id === 'css-rainbow') {
      await expect(frame.locator('p')).toHaveCount(7);
      const colors = ['rgb(185, 28, 28)', 'rgb(154, 52, 18)', 'rgb(133, 77, 14)', 'rgb(22, 101, 52)', 'rgb(3, 105, 161)', 'rgb(29, 78, 216)', 'rgb(126, 34, 206)'];
      for (let index = 0; index < 7; index++) {
        await expect(frame.locator('p').nth(index)).toHaveCSS('color', colors[index]);
        await expect(frame.locator('p').nth(index)).toHaveCSS('font-weight', '700');
        await expect(frame.locator('p').nth(index)).toHaveCSS('text-align', 'center');
      }
    } else if (task.id === 'css-world-guide') {
      await expect(frame.locator('h1')).toHaveCSS('font-size', '40px');
      await expect(frame.locator('h2')).toHaveCSS('font-size', '32px');
      await expect(frame.locator('h3')).toHaveCount(4);
      await expect(frame.locator('.question')).toHaveCSS('font-family', '"Courier New", monospace');
      await expect(frame.locator('.question')).toHaveCSS('font-size', '26px');
      await expect(frame.locator('.advice')).toHaveCSS('color', 'rgb(139, 0, 0)');
      await expect(frame.locator('.discovery')).toHaveCSS('color', 'rgb(0, 128, 128)');
      await expect(frame.locator('.reminder')).toHaveCSS('color', 'rgb(75, 85, 99)');
      for (const p of await frame.locator('p').all()) await expect(p).toHaveCSS('font-size', '18px');
    } else {
      await expect(frame.locator('.game.centered')).toHaveCSS('color', 'rgb(0, 100, 0)');
      await expect(frame.locator('.game.centered')).toHaveCSS('text-align', 'center');
      await expect(frame.locator('.challenge')).toHaveCSS('font-size', '24px');
      await expect(frame.locator('.feedback')).toHaveCSS('font-weight', '700');
    }
  }
  expect(errors).toEqual([]);
});

test('class precedence works without leaking styles or broadening earlier previews', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/' + route);
  const originalColor = await page.locator('h1.page').evaluate(node => getComputedStyle(node).color);
  const source = '<!DOCTYPE html><html lang="uk"><head><title>Класи</title><style>.note { color: darkgreen; } p { color: navy; } .large { font-size: 30px; } h1 { color:red; }</style></head><body><p class="note large" onclick="parent.document.body.remove()" style="color:red" id="escape">Текст</p><script>parent.document.body.remove()</script></body></html>';
  const frame = page.frameLocator('iframe');
  for (const classes of ['note large', 'large note']) {
    await page.locator('#web-source').fill(source.replace('note large', classes));
    await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
    await expect(frame.locator('.note.large')).toHaveCSS('color', 'rgb(0, 100, 0)');
    await expect(frame.locator('.note.large')).toHaveCSS('font-size', '30px');
    await expect(frame.locator('script, [onclick], [style], [id]')).toHaveCount(0);
  }
  expect(await page.locator('h1.page').evaluate(node => getComputedStyle(node).color)).toBe(originalColor);
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/text-formatting'));
  await page.locator('#web-source').fill(source);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect(frame.locator('p')).toHaveCSS('color', 'rgb(0, 0, 128)');
  await expect(frame.locator('[class]')).toHaveCount(0);
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/web-page'));
  await page.locator('#web-source').fill(source);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect(frame.locator('p')).toHaveCSS('color', 'rgb(0, 0, 0)');
  await expect(frame.locator('style, [class]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('class drafts survive task/anchor changes and HTML round-trips through files', async ({ page }) => {
  await page.goto('/' + route);
  await run(page, cssIntroTasks[4]);
  await page.locator('[data-web-task="css-first-class"]').click();
  await page.locator('#web-source').fill('Інший текст');
  await page.locator('[data-web-task="css-homework"]').click();
  await expect(page.locator('#web-source')).toHaveValue(cssIntroTasks[4].reference);
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/css-intro/css-intro-class'));
  await expect(page.locator('#web-source')).toHaveValue(cssIntroTasks[4].reference);
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Завантажити HTML', exact: true }).click();
  const file = await (await downloading).path();
  expect(await require('node:fs/promises').readFile(file, 'utf8')).toBe(cssIntroTasks[4].reference);
  await page.locator('#web-source').fill('');
  await page.locator('input[type=file]').setInputFiles(file);
  await expect(page.locator('#web-source')).toHaveValue(cssIntroTasks[4].reference);
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/text-formatting'));
  await expect(page.locator('[data-web-task="formatting-indices"]')).toHaveAttribute('aria-pressed', 'true');
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/css-intro'));
  await expect(page.locator('[data-web-task="css-first-class"]')).toHaveAttribute('aria-pressed', 'true');
});

test('class diagrams and tasks work offline at desktop/mobile sizes', async ({ page }) => {
  const errors = [];
  const external = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) external.push(request.url()); });
  await page.context().setOffline(true);
  await page.goto(pathToFileURL(path.resolve('index.html')).href + route);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await expect(page.locator('#css-intro-class-caption')).toBeVisible();
    const diagram = page.locator('figure').filter({ has: page.locator('#css-intro-class-caption') });
    await diagram.screenshot({ path: `/tmp/stepby-css-class-${width}.png` });
    await run(page, cssIntroTasks[4]);
    await expect(page.frameLocator('iframe').locator('.game')).toHaveCSS('text-align', 'center');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('.web-task-buttons').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/stepby-css-practice-${width}.png` });
  }
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});
