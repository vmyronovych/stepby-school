const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { webTasks } = loadTypeScript('src/features/web-development/tasks.ts');
const route = '#/web/html-css/web-page';

test('course is discoverable, modern theory and all visual tasks render', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.locator('a[href="#/web"]').click();
  await page.getByRole('link').filter({ hasText: 'HTML і CSS' }).click();
  await page.getByRole('link').filter({ hasText: 'Тема 1.' }).click();
  await expect(page).toHaveURL(new RegExp(route + '$'));
  await expect(page.locator('#roboBody')).toContainText('мова розмітки');
  await expect(page.locator('#roboBody')).not.toContainText('marquee');
  for (const task of webTasks) {
    await page.locator(`[data-web-task="${task.id}"]`).click();
    await page.locator('#web-source').fill(task.reference);
    await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
    const frame = page.frameLocator('iframe[title="Твій результат HTML"]');
    await expect.poll(() => frame.locator('title').textContent()).toBe(task.reference.match(/<title>(.*?)<\/title>/)[1]);
    await expect(frame.locator('body')).not.toBeEmpty();
    await expect(page.locator('.web-reference img')).toBeVisible();
    expect(await page.locator('.web-reference img').evaluate((image) => image.naturalWidth)).toBe(720);
  }
  expect(errors).toEqual([]);
});

test('drafts survive task/anchor switching; files round-trip; preview isolates active content', async ({ page }) => {
  await page.goto('/' + route);
  const source = '<!DOCTYPE html><html lang="uk"><head><title>Мій файл</title></head><body><h1 onclick="parent.document.body.innerHTML=1">Мій заголовок</h1><p>Текст<br>Другий рядок</p><script>parent.document.body.innerHTML="BROKEN"</script><style>body{display:none}</style><meta http-equiv="refresh" content="0;url=https://example.com"><img src="https://example.com/a.png"></body></html>';
  await page.locator('#web-source').fill(source);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('h1')).toHaveText('Мій заголовок');
  await expect(frame.locator('script, style, img, [onclick], [http-equiv="refresh"]')).toHaveCount(0);
  await frame.locator('h1').click();
  await expect(page.locator('#web-source')).toBeVisible();
  await page.locator('[data-web-task="homework"]').click();
  await page.locator('#web-source').fill('Другий документ');
  await page.locator('[data-web-task="paragraphs"]').click();
  await expect(page.locator('#web-source')).toHaveValue(source);
  await page.evaluate(() => StepBySchool.navigate('#/web/html-css/web-page/web-page-skeleton'));
  await expect(page.locator('#web-source')).toHaveValue(source);
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Завантажити HTML', exact: true }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('index.html');
  const saved = await download.path();
  const fs = require('node:fs/promises');
  expect(await fs.readFile(saved, 'utf8')).toBe(source);
  await page.locator('#web-source').fill('');
  await page.locator('input[type=file]').setInputFiles(saved);
  await expect(page.locator('#web-source')).toHaveValue(source);
});

test('lesson works offline through file:// on a narrow screen', async ({ page }) => {
  const errors = [];
  const external = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => { if (/^https?:/.test(request.url())) external.push(request.url()); });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.context().setOffline(true);
  await page.goto(pathToFileURL(path.resolve('index.html')).href + route + '/web-page-practice');
  await expect(page.locator('#web-source')).toBeVisible();
  await page.locator('[data-web-task="homework"]').click();
  await page.locator('#web-source').fill(webTasks[3].reference);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect(page.frameLocator('iframe').locator('h1')).toHaveText('Знайомтеся: Марко');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: '/tmp/stepby-web-mobile.png', fullPage: true });
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});
