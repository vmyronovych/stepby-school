const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { readFile } = require('node:fs/promises');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { dropdownMenuTasks } = loadTypeScript('src/features/web-development/dropdown-menu-tasks.ts');
const { embedLessonImages } = loadTypeScript('src/features/web-development/media.ts');
const route = '#/web/html-css/dropdown-menu';

async function render(page, task) {
  await page.locator(`[data-web-task="${task.id}"]`).click();
  await page.locator('#web-source').fill(task.reference);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect.poll(() => page.frameLocator('iframe').locator('title').textContent()).toBe(task.reference.match(/<title>(.*?)<\/title>/)[1]);
}

for (const [index, task] of dropdownMenuTasks.entries()) {
  test(`dropdown reference ${index + 1} supports hover, keyboard, internal links and complete targets`, async ({ page, context }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width: 1600, height: 1000 });
    await page.goto('/#/web/html-css');
    await page.getByRole('link').filter({ hasText: 'Тема 22.' }).click();
    await expect(page).toHaveURL(/dropdown-menu$/);
    await render(page, task);
    const frame = page.frameLocator('iframe');
    await expect(frame.locator('nav')).toHaveCount(1);
    await expect(frame.locator('[role=menu], [role=menuitem], script, [onclick]')).toHaveCount(0);
    const item = frame.locator(task.referenceHover);
    const trigger = item.locator(':scope > button');
    const submenu = item.locator(':scope > ul');
    await expect(submenu).toBeHidden();
    await trigger.hover();
    await expect(submenu).toBeVisible();
    await submenu.locator('a').first().hover();
    await expect(submenu).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(submenu).toBeHidden();
    await trigger.focus();
    await expect(submenu).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(submenu.locator('a').first()).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(trigger).toBeFocused();
    await expect(submenu).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(submenu.locator('a').first()).toBeFocused();
    const destination = (await submenu.locator('a').first().getAttribute('href')).split('#')[1];
    await page.keyboard.press('Enter');
    await expect.poll(() => frame.locator('html').evaluate(node => node.ownerDocument.defaultView.location.hash)).toBe('#' + destination);
    await expect(page).toHaveURL(/dropdown-menu$/);
    await frame.locator('a').last().focus();
    await expect(submenu).toBeHidden();
    const ids = await frame.locator('[id]').evaluateAll(nodes => nodes.map(node => node.id));
    const fragments = await frame.locator('a[href^="about:srcdoc#"]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href').split('#')[1]));
    expect(new Set(ids).size).toBe(ids.length);
    for (const fragment of fragments) expect(ids).toContain(fragment);
    const target = await context.newPage();
    await target.setViewportSize({ width: 720, height: task.referenceHeight });
    await target.setContent(embedLessonImages(task.reference));
    await target.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
    await target.locator(task.referenceHover).hover();
    await expect(target.locator(task.referenceHover + ' > ul')).toBeVisible();
    expect(await target.locator('body').evaluate(node => node.scrollHeight <= innerHeight)).toBe(true);
    expect(await target.locator('html').evaluate(node => node.scrollWidth <= innerWidth)).toBe(true);
    expect(await target.locator(task.referenceHover + ' > ul').evaluate(node => { const r = node.getBoundingClientRect(); return r.x >= 0 && r.right <= innerWidth && r.bottom <= innerHeight; })).toBe(true);
    await expect(page.locator('.web-reference img')).toHaveJSProperty('naturalHeight', task.referenceHeight);
    await target.close();
    expect(errors).toEqual([]);
  });
}

test('menu drafts, anchors and downloaded HTML round-trip offline', async ({ page, context }, testInfo) => {
  await page.goto('/' + route);
  const task = dropdownMenuTasks[2];
  await render(page, task);
  await page.locator(`[data-web-task="${dropdownMenuTasks[0].id}"]`).click();
  await page.locator('#web-source').fill('Інша чернетка');
  await page.locator(`[data-web-task="${task.id}"]`).click();
  await expect(page.locator('#web-source')).toHaveValue(task.reference);
  const anchor = await page.locator('.robo-body h2[id]').first().getAttribute('id');
  await page.evaluate(anchor => StepBySchool.navigate('#/web/html-css/dropdown-menu/' + anchor), anchor);
  await expect(page.locator('#web-source')).toHaveValue(task.reference);
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Завантажити HTML', exact: true }).click();
  const file = testInfo.outputPath('index.html');
  await (await downloading).saveAs(file);
  expect(await readFile(file, 'utf8')).toBe(embedLessonImages(task.reference));
  await context.setOffline(true);
  const offline = await context.newPage();
  await offline.goto(pathToFileURL(file).href);
  await offline.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
  await offline.locator(task.referenceHover + ' > button').focus();
  await expect(offline.locator(task.referenceHover + ' > ul')).toBeVisible();
  await offline.locator(task.referenceHover + ' > ul a').first().click();
  await expect(offline).toHaveURL(/index\.html#/);
  await offline.close();
  await page.locator('#web-source').fill('');
  await page.locator('input[type=file]').setInputFiles(file);
  await expect(page.locator('#web-source')).toHaveValue(task.reference);
});

test('all menus support touch focus, mobile flow and offline lesson diagrams', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 1000 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  const errors = [], requests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
  await context.setOffline(true);
  await page.goto(pathToFileURL(path.resolve('index.html')).href + route);
  await page.locator('figure.web-diagram').first().screenshot({ path: '/tmp/stepby-dropdown-diagram-390.png' });
  for (const task of dropdownMenuTasks) {
    await render(page, task);
    const frame = page.frameLocator('iframe');
    const item = frame.locator(task.referenceHover);
    await item.locator(':scope > button').tap();
    await expect(item.locator(':scope > ul')).toBeVisible();
    await expect(item.locator(':scope > ul')).toHaveCSS('position', 'static');
    expect(await frame.locator('html').evaluate(node => node.scrollWidth <= innerWidth), task.id).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('iframe').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/stepby-${task.id}-touch-390.png` });
  }
  expect(errors).toEqual([]);
  expect(requests).toEqual([]);
  await context.close();
});

test('navigation support stays opt-in and active content remains blocked', async ({ page }) => {
  const source = '<nav aria-label="Навігація"><ul><li><button type="button" onclick="alert(1)">Вибрати</button></li></ul></nav><form action="https://example.com/send"><input type="text" required><button type="submit" formaction="https://example.com/evil">Надіслати</button></form><script>alert(1)</script>';
  await page.goto('/' + route);
  await page.locator('#web-source').fill(source);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect(page.frameLocator('iframe').locator('nav')).toHaveCount(1);
  await expect(page.frameLocator('iframe').locator('script, [onclick], [action], [formaction]')).toHaveCount(0);
  await page.goto('/#/web/html-css/web-review-3');
  await page.locator('#web-source').fill(source);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect(page.frameLocator('iframe').locator('nav')).toHaveCount(0);
});
