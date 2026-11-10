const { test, expect } = require('@playwright/test');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { imageLinksTasks } = loadTypeScript('src/features/web-development/image-links-tasks.ts');
const route = '#/web/html-css/image-links';

async function renderTask(page, taskId) {
  const task = imageLinksTasks.find(item => item.id === taskId);
  await page.goto('/' + route);
  await page.locator(`[data-web-task="${taskId}"]`).click();
  await page.locator('#web-source').fill(task.reference);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  const frame = page.frameLocator('iframe');
  await expect.poll(() => frame.locator('title').textContent()).toBe(task.reference.match(/<title>(.*?)<\/title>/)[1]);
  return frame;
}

test('reference link responds to real hover, keyboard focus and held activation without shifting size', async ({ page }) => {
  const frame = await renderTask(page, 'image-links-states');
  const choice = frame.locator('.choice').first();
  const initial = await choice.boundingBox();
  await choice.hover();
  await expect(choice).toHaveCSS('background-color', 'rgb(254, 243, 199)');
  await expect(choice).toHaveCSS('border-top-color', 'rgb(180, 83, 9)');
  await page.mouse.move(0, 0);
  await frame.locator('h1').click();
  await page.keyboard.press('Tab');
  await expect(choice).toBeFocused();
  await expect(choice).toHaveCSS('outline-color', 'rgb(29, 78, 216)');
  await expect(choice).toHaveCSS('outline-width', '3px');
  await choice.hover();
  await page.mouse.down();
  try {
    await expect(choice).toHaveCSS('background-color', 'rgb(219, 234, 254)');
    await expect(choice).toHaveCSS('border-top-color', 'rgb(29, 78, 216)');
    const active = await choice.boundingBox();
    expect(active.width).toBe(initial.width);
    expect(active.height).toBe(initial.height);
  } finally {
    await page.mouse.up();
  }
  await expect.poll(() => frame.locator('body').evaluate(() => location.hash)).toBe('#result');
  await expect(page).toHaveURL(new RegExp(route + '$'));
});

test('image-only internal link has an action name and activates with Tab and Enter inside its preview', async ({ page }) => {
  const frame = await renderTask(page, 'image-links-fieldbook');
  const link = frame.getByRole('link', { name: 'Читати про квітку', exact: true });
  await expect(link.locator('img')).toHaveCount(1);
  await frame.locator('h1').click();
  await page.keyboard.press('Tab');
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS('outline-width', '3px');
  await page.keyboard.press('Enter');
  await expect.poll(() => frame.locator('body').evaluate(() => location.hash)).toBe('#flower');
  await expect(frame.locator('#flower')).toHaveText('Квітка');
  await expect(page).toHaveURL(new RegExp(route + '$'));
});
