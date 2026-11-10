const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { readFile, writeFile } = require('node:fs/promises');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { embedLessonImages, lessonImageAssets } = loadTypeScript('src/features/web-development/media.ts');
const lessons = [
  ['block-elements', 'block-elements-tasks', 'blockElementsTasks'],
  ['external-css', 'external-css-tasks', 'externalCssTasks'],
  ['flex-basics', 'flex-basics-tasks', 'flexBasicsTasks'],
  ['flex-wrap', 'flex-wrap-tasks', 'flexWrapTasks'],
  ['forms-basics', 'forms-tasks', 'formsTasks'],
].map(([route, file, name]) => ({ route, tasks: loadTypeScript(`src/features/web-development/${file}.ts`)[name] }));

async function render(page, task) {
  await page.locator(`[data-web-task="${task.id}"]`).click();
  await page.locator('#web-source').fill(task.reference);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect.poll(() => page.frameLocator('iframe').locator('title').textContent()).toBe(task.reference.match(/<title>(.*?)<\/title>/)[1]);
  await page.frameLocator('iframe').locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
}

for (const [index, lesson] of lessons.entries()) {
  test(`Theme ${index + 14} is discoverable and all references render complete valid structures`, async ({ page, context }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/#/web/html-css');
    await page.getByRole('link').filter({ hasText: `Тема ${index + 14}.` }).click();
    await expect(page).toHaveURL(new RegExp('/' + lesson.route + '$'));
    await expect(page.locator('[data-web-task]')).toHaveCount(lesson.tasks.length);
    const target = await context.newPage();
    for (const task of lesson.tasks) {
      await render(page, task);
      const frame = page.frameLocator('iframe');
      await expect(frame.locator('[align], [cellpadding], [cellspacing], font, center, script')).toHaveCount(0);
      await expect.poll(() => page.locator('.web-reference img').evaluate(img => img.naturalHeight)).toBe(task.referenceHeight ?? 420);
      await target.setViewportSize({ width: 720, height: task.referenceHeight ?? 420 });
      await target.setContent(embedLessonImages(task.reference));
      await target.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
      expect(await target.locator('body').evaluate(body => body.scrollHeight <= innerHeight), task.id + ' height').toBe(true);
      expect(await target.locator('html').evaluate(node => node.scrollWidth <= innerWidth), task.id + ' width').toBe(true);
      const ids = await target.locator('[id]').evaluateAll(nodes => nodes.map(node => node.id));
      expect(new Set(ids).size, task.id + ' unique ids').toBe(ids.length);
      const fragments = await target.locator('a[href^="#"]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href').slice(1)).filter(Boolean));
      for (const fragment of fragments) expect(ids, task.id + ' anchor ' + fragment).toContain(fragment);
      for (const table of await frame.locator('table').all()) {
        await expect(table.locator('caption')).toHaveCount(1);
        expect(await table.locator('th[scope]').count()).toBeGreaterThan(0);
        const result = await table.evaluate(table => {
          const failures = [];
          let width;
          for (const group of [...table.children].filter(node => ['THEAD', 'TBODY', 'TFOOT'].includes(node.tagName))) {
            const rows = [...group.rows];
            const grid = rows.map(() => []);
            rows.forEach((row, y) => {
              let x = 0;
              for (const cell of row.cells) {
                while (grid[y][x]) x++;
                const colSpan = cell.colSpan, rowSpan = cell.rowSpan;
                if (y + rowSpan > rows.length) failures.push('span crosses rowgroup');
                for (let dy = 0; dy < rowSpan; dy++) for (let dx = 0; dx < colSpan; dx++) {
                  if (!grid[y + dy]) continue;
                  if (grid[y + dy][x + dx]) failures.push('overlap');
                  grid[y + dy][x + dx] = true;
                }
                x += colSpan;
              }
            });
            for (const row of grid) {
              width ??= row.length;
              if (row.length !== width || [...row].some(cell => !cell)) failures.push('missing cell or inconsistent columns');
            }
          }
          return failures;
        });
        expect(result, task.id + ' table grid').toEqual([]);
      }
      // The complete reference must fit its stated window, including table columns.
      for (const table of await target.locator('table').all()) {
        expect(await table.evaluate(table => table.getBoundingClientRect().right <= innerWidth + 1), task.id + ' table columns').toBe(true);
      }
    }
    expect(errors).toEqual([]);
  });
}

test('new lesson drafts survive task and anchor switching and embedded HTML round-trips offline', async ({ page, context }, testInfo) => {
  for (const lesson of lessons) {
    await page.goto('/#/web/html-css/' + lesson.route);
    const task = lesson.tasks.at(-1);
    await render(page, task);
    await page.locator(`[data-web-task="${lesson.tasks[0].id}"]`).click();
    await page.locator('#web-source').fill('Інша чернетка');
    await page.locator(`[data-web-task="${task.id}"]`).click();
    await expect(page.locator('#web-source')).toHaveValue(task.reference);
    const anchor = await page.locator('.robo-body h2[id]').first().getAttribute('id');
    await page.evaluate(({route, anchor}) => StepBySchool.navigate(`#/web/html-css/${route}/${anchor}`), {route: lesson.route, anchor});
    await expect(page.locator('#web-source')).toHaveValue(task.reference);
    const downloading = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Завантажити HTML', exact: true }).click();
    const file = testInfo.outputPath(lesson.route + '.html');
    await (await downloading).saveAs(file);
    expect(await readFile(file, 'utf8')).toBe(embedLessonImages(task.reference));
    const standalone = await context.newPage();
    await context.setOffline(true);
    await standalone.goto(pathToFileURL(file).href);
    await standalone.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
    await expect(standalone).toHaveTitle(task.reference.match(/<title>(.*?)<\/title>/)[1]);
    await expect(standalone.locator('h1, h2, table').first()).toBeVisible();
    if (await standalone.locator('a[download]').count()) {
      const downloadingImage = standalone.waitForEvent('download');
      await standalone.locator('a[download]').first().click();
      const image = await downloadingImage;
      const asset = lessonImageAssets.find(asset => asset.filename === image.suggestedFilename());
      expect(asset).toBeDefined();
      expect(await readFile(await image.path(), 'utf8')).toBe(asset.svg);
    }
    await standalone.close();
    await page.locator('#web-source').fill('');
    await page.locator('input[type=file][accept*="html"]').setInputFiles(file);
    await expect(page.locator('#web-source')).toHaveValue(task.reference);
    await context.setOffline(false);
  }
});

test('all five lessons and targets work offline at desktop and mobile sizes', async ({ page }) => {
  const errors = [], requests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
  await page.context().setOffline(true);
  for (const lesson of lessons) {
    await page.goto(pathToFileURL(path.resolve('index.html')).href + '#/web/html-css/' + lesson.route);
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      const diagram = page.locator('figure.web-diagram').first();
      await diagram.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
      await diagram.screenshot({ path: `/tmp/stepby-${lesson.route}-diagram-${width}.png` });
      for (const task of lesson.tasks) {
        await render(page, task);
        expect(await page.frameLocator('iframe').locator('html').evaluate(node => node.scrollWidth <= innerWidth), task.id + ' preview overflow').toBe(true);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), lesson.route + ' lesson overflow').toBe(true);
      await page.locator('.web-task-buttons').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `/tmp/stepby-${lesson.route}-practice-${width}.png` });
    }
  }
  expect(errors).toEqual([]);
  expect(requests).toEqual([]);
});

test('external CSS uses only the local editor, preserves both drafts, and exports two offline files', async ({ page, context }, testInfo) => {
  await page.goto('/#/web/html-css/external-css');
  const html = '<!DOCTYPE html><html lang="uk"><head><meta charset="UTF-8"><title>Два файли</title><link rel="stylesheet" href="style.css"></head><body><h1>Моя майстерня</h1><p>Привіт</p></body></html>';
  const css = 'body { background-color: rgb(230, 240, 250); background-image: url("leaf.svg"); } h1 { color: rgb(12, 34, 56); }';
  const requests = [];
  page.on('request', request => { if (/example\.com|style\.css/.test(request.url())) requests.push(request.url()); });
  const blocked = [];
  page.on('requestfailed', request => { if (/example\.com/.test(request.url())) blocked.push({ url: request.url(), error: request.failure().errorText }); });
  await page.locator('#web-source').fill(html);
  await page.locator('#web-css').fill(css);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect(page.frameLocator('iframe').locator('h1')).toHaveCSS('color', 'rgb(12, 34, 56)');
  const tasks = page.locator('[data-web-task]');
  await tasks.nth(1).click();
  await page.locator('#web-css').fill('body { color: red; }');
  await tasks.first().click();
  await expect(page.locator('#web-source')).toHaveValue(html);
  await expect(page.locator('#web-css')).toHaveValue(css);
  const anchor = await page.locator('.robo-body h2[id]').first().getAttribute('id');
  await page.evaluate(anchor => StepBySchool.navigate('#/web/html-css/external-css/' + anchor), anchor);
  await expect(page.locator('#web-css')).toHaveValue(css);
  for (const [button, filename, contents] of [['Завантажити HTML', 'index.html', html], ['Завантажити CSS', 'style.css', embedLessonImages(css)]]) {
    const downloading = page.waitForEvent('download');
    await page.getByRole('button', { name: button, exact: true }).click();
    const download = await downloading;
    expect(download.suggestedFilename()).toBe(filename);
    await download.saveAs(testInfo.outputPath(filename));
    expect(await readFile(testInfo.outputPath(filename), 'utf8')).toBe(contents);
  }
  const standalone = await context.newPage();
  await context.setOffline(true);
  await standalone.goto(pathToFileURL(testInfo.outputPath('index.html')).href);
  await expect(standalone.locator('h1')).toHaveCSS('color', 'rgb(12, 34, 56)');
  await expect(standalone.locator('body')).toHaveCSS('background-image', /data:image\/svg\+xml/);
  await standalone.close();
  await page.locator('#web-source').fill('');
  await page.locator('#web-css').fill('');
  await page.locator('input[type=file][accept*="html"]').setInputFiles(testInfo.outputPath('index.html'));
  await page.locator('input[type=file][accept*="css"]').setInputFiles(testInfo.outputPath('style.css'));
  await expect(page.locator('#web-source')).toHaveValue(html);
  await expect(page.locator('#web-css')).toHaveValue(css);
  await page.locator('#web-source').fill(html.replace('href="style.css"', 'href="https://example.com/style.css"'));
  await page.locator('#web-css').fill('h1 { color: red; } @import "https://example.com/a.css"; body { background-image: url(https://example.com/track); }');
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect(page.frameLocator('iframe').locator('h1')).toHaveCSS('color', 'rgb(0, 0, 0)');
  await expect(page.frameLocator('iframe').locator('link')).toHaveCount(0);
  await page.locator('#web-source').fill(html);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect(page.frameLocator('iframe').locator('h1')).toHaveCSS('color', 'rgb(255, 0, 0)');
  await page.locator('#web-css').fill('h1 { color: rgb(12, 34, 56); } /* </style><h2>Вставлений HTML</h2><script>alert(1)</script> */');
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect(page.frameLocator('iframe').locator('h2, script')).toHaveCount(0);
  await expect(page.frameLocator('iframe').locator('h1')).toHaveCSS('color', 'rgb(12, 34, 56)');
  await expect.poll(() => blocked.length).toBe(requests.length);
  expect(blocked.map(item => item.url)).toEqual(requests);
  for (const item of blocked) expect(item.error).toMatch(/csp|blocked/i);
});

test('forms keep native editing, labels, required checks and reset without scripts or navigation', async ({ page }) => {
  await page.goto('/#/web/html-css/forms-basics');
  const source = `<form action="https://example.com/send" target="_top" onsubmit="alert(1)">
    <label for="alias">Псевдонім</label><input id="alias" name="alias" type="text" value="Учень" required>
    <label for="secret">Навчальний пароль</label><input id="secret" name="secret" type="password" required>
    <label for="note">Коментар</label><textarea id="note" name="note" rows="3" cols="20">Початок</textarea>
    <input type="text" aria-label="Код" value="Код" readonly><input type="text" value="Вимкнено" disabled>
    <button type="submit" formaction="https://example.com/evil">Надіслати</button><button type="reset">Відновити</button>
    <input type="image" src="https://example.com/track"><script>alert(1)</script>
  </form>`;
  await page.locator('#web-source').fill(source);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('[action], [target], [onsubmit], [formaction], [src], script')).toHaveCount(0);
  await expect(page.locator('iframe')).toHaveAttribute('sandbox', 'allow-downloads allow-forms');
  await frame.getByRole('button', { name: 'Надіслати', exact: true }).click();
  await expect(frame.getByLabel('Навчальний пароль')).toBeFocused();
  await frame.getByLabel('Псевдонім', { exact: true }).fill('Мандрівник');
  await frame.getByLabel('Коментар', { exact: true }).fill('Два\nрядки');
  expect(await frame.locator('form').evaluate(form => form.checkValidity())).toBe(false);
  await frame.getByLabel('Навчальний пароль').fill('вигаданий');
  expect(await frame.locator('form').evaluate(form => form.checkValidity())).toBe(true);
  await expect(frame.locator('[readonly]')).toHaveJSProperty('readOnly', true);
  await expect(frame.locator('[disabled]')).toBeDisabled();
  const url = page.url();
  await frame.getByRole('button', { name: 'Надіслати', exact: true }).click();
  await expect(frame.locator('form')).toHaveCount(1);
  expect(page.url()).toBe(url);
  await frame.getByRole('button', { name: 'Відновити', exact: true }).click();
  await expect(frame.getByLabel('Псевдонім', { exact: true })).toHaveValue('Учень');
  await expect(frame.getByLabel('Навчальний пароль')).toHaveValue('');
  await expect(frame.getByLabel('Коментар', { exact: true })).toHaveValue('Початок');
  await page.goto('/#/web/html-css/mini-project-2');
  await page.locator('#web-source').fill(source);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect(page.frameLocator('iframe').locator('form, input, textarea, button')).toHaveCount(0);
});

test('positioned details move together and fixed sun stays in the preview viewport', async ({ page }) => {
  const lesson = lessons[0];
  await page.goto('/#/web/html-css/' + lesson.route);
  await render(page, lesson.tasks[2]);
  const frame = page.frameLocator('iframe');
  const before = await frame.locator('.sun, .cabin').evaluateAll(nodes => nodes.map(node => ({ cls: node.className, top: node.getBoundingClientRect().top })));
  await expect(frame.locator('.draft')).toBeHidden();
  expect(await frame.locator('.cabin').evaluate(cabin => [...cabin.children].every(node => node.offsetParent === cabin))).toBe(true);
  await frame.locator('body').evaluate(body => body.ownerDocument.defaultView.scrollTo(0, 100));
  const after = await frame.locator('.sun, .cabin').evaluateAll(nodes => nodes.map(node => ({ cls: node.className, top: node.getBoundingClientRect().top })));
  expect(after.find(node => node.cls === 'sun').top).toBe(before.find(node => node.cls === 'sun').top);
  expect(after.find(node => node.cls === 'cabin').top).toBeLessThan(before.find(node => node.cls === 'cabin').top);
});

test('Flexbox references align centers, wrap rows and change visual order while preserving HTML order', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto('/#/web/html-css/flex-basics');
  await render(page, lessons[2].tasks[1]);
  const frame = page.frameLocator('iframe');
  const centers = await frame.locator('.member').evaluateAll(nodes => nodes.map(node => { const r = node.getBoundingClientRect(); return r.top + r.height / 2; }));
  expect(Math.max(...centers) - Math.min(...centers)).toBeLessThan(1);
  await page.goto('/#/web/html-css/flex-wrap');
  await render(page, lessons[3].tasks[1]);
  const cards = await frame.locator('.card').evaluateAll(nodes => nodes.map(node => ({ text: node.querySelector('h2').textContent, x: node.getBoundingClientRect().x, y: node.getBoundingClientRect().y })));
  expect(cards.map(card => card.text)).toEqual(['Листок', 'Птах', 'Кролик', 'Квітка']);
  expect([...cards].sort((a, b) => a.y - b.y || a.x - b.x)[0].text).toBe('Квітка');
  await render(page, lessons[3].tasks[2]);
  const rows = await frame.locator('.wrapped .box').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().top));
  expect(new Set(rows).size).toBeGreaterThan(1);
  const columns = await frame.locator('.column .box').evaluateAll(nodes => nodes.map(node => ({ x: node.getBoundingClientRect().left, y: node.getBoundingClientRect().top })));
  expect(new Set(columns.map(point => point.x)).size).toBe(1);
  expect(columns[4].y).toBeGreaterThan(columns[0].y);
});
