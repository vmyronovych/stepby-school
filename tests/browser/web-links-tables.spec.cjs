const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { readFile, writeFile } = require('node:fs/promises');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { embedLessonImages, lessonImageAssets } = loadTypeScript('src/features/web-development/media.ts');
const lessons = [
  ['hyperlinks', 'links-tasks', 'linksTasks'],
  ['image-links', 'image-links-tasks', 'imageLinksTasks'],
  ['tables-basics', 'tables-tasks', 'tablesTasks'],
  ['table-spans', 'table-spans-tasks', 'tableSpansTasks'],
  ['web-review-2', 'review2-tasks', 'review2Tasks'],
].map(([route, file, name]) => ({ route, tasks: loadTypeScript(`src/features/web-development/${file}.ts`)[name] }));

async function render(page, task) {
  await page.locator(`[data-web-task="${task.id}"]`).click();
  await page.locator('#web-source').fill(task.reference);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect.poll(() => page.frameLocator('iframe').locator('title').textContent()).toBe(task.reference.match(/<title>(.*?)<\/title>/)[1]);
  await page.frameLocator('iframe').locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
}

for (const [index, lesson] of lessons.entries()) {
  test(`Theme ${index + 8} is discoverable and all references render complete valid structures`, async ({ page, context }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/#/web/html-css');
    await page.getByRole('link').filter({ hasText: `Тема ${index + 8}.` }).click();
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
    await expect(standalone.locator('h1, table').first()).toBeVisible();
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
    await page.locator('input[type=file]').setInputFiles(file);
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


test('table headers and spans are opt-in and invalid span and legacy attributes are removed', async ({ page }) => {
  const source = '<table border="1" cellpadding="9" cellspacing="5" align="center"><caption>Дані</caption><thead><tr><th scope="col" colspan="2">Група</th><th scope="invalid">Інше</th></tr></thead><tbody><tr><td rowspan="2">Спільне</td><td colspan="0" rowspan="100" onclick="alert(1)">Значення</td></tr><tr><td>Друге</td></tr></tbody></table>';
  const frame = page.frameLocator('iframe');
  for (const lesson of ['hyperlinks', 'tables-basics', 'table-spans']) {
    await page.goto('/#/web/html-css/' + lesson);
    await page.locator('#web-source').fill(source);
    await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
    await expect(frame.locator('[border], [align], [cellpadding], [cellspacing], [onclick]')).toHaveCount(0);
    if (lesson === 'hyperlinks') {
      await expect(frame.locator('table')).toHaveCount(0);
    } else {
      await expect(frame.locator('table')).toHaveCount(1);
      await expect(frame.locator('th[scope="col"]')).toHaveCount(1);
      await expect(frame.locator('th[scope="invalid"]')).toHaveCount(0);
      await expect(frame.locator('[colspan="0"], [rowspan="100"]')).toHaveCount(0);
      await expect(frame.locator('[colspan="2"], [rowspan="2"]')).toHaveCount(lesson === 'table-spans' ? 2 : 0);
    }
  }
});


test('exported full-size image links open the separate local SVG while displayed images stay embedded', async ({ page, context }, testInfo) => {
  await page.goto('/#/web/html-css/image-links');
  const source = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Повна картинка</title></head><body><a href="flower.svg" target="_blank" rel="noopener noreferrer"><img src="flower.svg" alt="Відкрити повну квітку"></a></body></html>';
  await page.locator('#web-source').fill(source);
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Завантажити HTML', exact: true }).click();
  const file = testInfo.outputPath('full-size.html');
  await (await downloading).saveAs(file);
  const html = await readFile(file, 'utf8');
  expect(html).toContain('href="flower.svg"');
  expect(html).toContain('src="data:image/svg+xml,');
  await writeFile(testInfo.outputPath('flower.svg'), lessonImageAssets.find(asset => asset.filename === 'flower.svg').svg);
  await context.setOffline(true);
  const standalone = await context.newPage();
  await standalone.goto(pathToFileURL(file).href);
  await standalone.locator('img').evaluate(img => img.decode());
  const opening = context.waitForEvent('page');
  await standalone.getByRole('link', { name: 'Відкрити повну квітку' }).click();
  const full = await opening;
  await expect(full).toHaveURL(/\/flower\.svg$/);
  await expect(full.locator('svg')).toBeVisible();
});
