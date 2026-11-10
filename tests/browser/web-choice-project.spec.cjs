const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { readFile, writeFile } = require('node:fs/promises');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { embedLessonImages, lessonImageAssets } = loadTypeScript('src/features/web-development/media.ts');
const lessons = [
  ['forms-choice', 'forms-choice-tasks', 'formsChoiceTasks'],
  ['web-review-3', 'web-review-3-tasks', 'review3Tasks'],
].map(([route, file, name]) => ({ route, tasks: loadTypeScript(`src/features/web-development/${file}.ts`)[name] }));

async function render(page, task) {
  await page.locator(`[data-web-task="${task.id}"]`).click();
  await page.locator('#web-source').fill(task.reference);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect.poll(() => page.frameLocator('iframe').locator('title').textContent()).toBe(task.reference.match(/<title>(.*?)<\/title>/)[1]);
  await page.frameLocator('iframe').locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
}

for (const [index, lesson] of lessons.entries()) {
  test(`Theme ${index + 19} is discoverable and all references render complete valid structures`, async ({ page, context }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/#/web/html-css');
    await page.getByRole('link').filter({ hasText: `Тема ${index + 19}.` }).click();
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

test('both lessons and targets work offline at desktop and mobile sizes', async ({ page }) => {
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


test('choice controls preserve native grouping, keyboard changes, defaults, multi-select and reset', async ({ page }) => {
  await page.goto('/#/web/html-css/forms-choice');
  const source = `<form action="https://example.com/submit" target="_top">
    <fieldset><legend>Маршрут</legend><label><input id="a" type="radio" name="route" value="a" checked>Стежка</label><label><input id="b" type="radio" name="route" value="b">Парк</label></fieldset>
    <fieldset><legend>Матеріали</legend><label><input id="paper" type="checkbox" name="materials" value="paper" checked>Папір</label><label><input id="pen" type="checkbox" name="materials" value="pen">Олівець</label><label><input type="checkbox" disabled>Недоступно</label></fieldset>
    <label for="station">Станція</label><select id="station" name="station" required><option value="" selected disabled>Обери станцію</option><option value="garden">Сад</option></select>
    <label for="colors">Кольори</label><select id="colors" name="colors" multiple size="3"><option value="green" selected>Зелений</option><option value="blue">Синій</option><option value="red" disabled>Червоний</option></select>
    <button type="submit">Перевірити</button><button type="reset">Початкове</button>
    <button type="button" id="focus">Показати рамку</button><img src="leaf.svg" alt="Листок">
    <style>#focus:focus + img { border: 4px solid red; }</style>
  </form>`;
  await page.locator('#web-source').fill(source);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  const frame = page.frameLocator('iframe');
  await expect(frame.getByRole('group', { name: 'Маршрут' })).toHaveCount(1);
  await expect(frame.getByLabel('Стежка', { exact: true })).toBeChecked();
  await frame.getByLabel('Стежка', { exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(frame.getByLabel('Парк', { exact: true })).toBeChecked();
  await expect(frame.getByLabel('Стежка', { exact: true })).not.toBeChecked();
  await frame.getByLabel('Олівець', { exact: true }).check();
  await expect(frame.getByLabel('Папір', { exact: true })).toBeChecked();
  await expect(frame.getByLabel('Олівець', { exact: true })).toBeChecked();
  await expect(frame.getByLabel('Недоступно', { exact: true })).toBeDisabled();
  await frame.getByRole('button', { name: 'Перевірити', exact: true }).click();
  await expect(frame.getByLabel('Станція', { exact: true })).toBeFocused();
  await frame.getByLabel('Станція', { exact: true }).selectOption('garden');
  await frame.getByLabel('Кольори', { exact: true }).selectOption(['green', 'blue']);
  expect(await frame.locator('#colors').evaluate(node => [...node.selectedOptions].map(option => option.value))).toEqual(['green', 'blue']);
  await frame.getByRole('button', { name: 'Показати рамку' }).focus();
  await expect(frame.locator('img')).toHaveCSS('border-top-width', '4px');
  await frame.getByRole('button', { name: 'Початкове' }).click();
  await expect(frame.getByLabel('Стежка', { exact: true })).toBeChecked();
  await expect(frame.getByLabel('Олівець', { exact: true })).not.toBeChecked();
  await expect(frame.getByLabel('Станція', { exact: true })).toHaveValue('');
  expect(await frame.locator('#colors').evaluate(node => [...node.selectedOptions].map(option => option.value))).toEqual(['green']);
  await expect(frame.locator('[action], [target]')).toHaveCount(0);
  await page.goto('/#/web/html-css/forms-basics');
  await page.locator('#web-source').fill(source);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect(page.frameLocator('iframe').locator('fieldset, legend, select, option, input[type=radio], input[type=checkbox], [checked]')).toHaveCount(0);
});

const { project3FilesReference, project3Tasks, project3MapReference, project3MapReferenceHeight } = loadTypeScript('src/features/web-development/project3-tasks.ts');
const projectNames = ['index.html', 'style.css', 'world.html', 'world.css'];
async function selectFile(page, name) {
  await page.getByRole('group', { name: 'Файли проєкту', exact: true }).getByRole('button', { name, exact: true }).click();
}
async function fillProject(page) {
  for (const name of projectNames) {
    await selectFile(page, name);
    await page.locator('#web-project-source').fill(project3FilesReference[name]);
  }
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
}

test('third project edits four independent files, previews both pages, exports and imports offline', async ({ page, context }, testInfo) => {
  await page.goto('/#/web/html-css');
  await page.getByRole('link').filter({ hasText: 'Міні-проєкт 3.' }).click();
  await expect(page).toHaveURL(/mini-project-3$/);
  await fillProject(page);
  for (const [name, color] of [['style.css', 'rgb(1, 2, 3)'], ['world.css', 'rgb(4, 5, 6)']]) {
    await selectFile(page, name);
    await page.locator('#web-project-source').fill(project3FilesReference[name] + '\nbody { color: ' + color + '; }');
  }
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('body')).toHaveCSS('color', 'rgb(1, 2, 3)');
  await page.getByRole('button', { name: 'Перегляд world.html', exact: true }).click();
  await expect(frame.locator('body')).toHaveCSS('color', 'rgb(4, 5, 6)');
  await fillProject(page);
  await page.getByRole('button', { name: 'Перегляд index.html', exact: true }).click();
  await expect(frame.locator('form')).toHaveCount(1);
  await expect(frame.locator('fieldset')).not.toHaveCount(0);
  await expect(frame.locator('link, script, [action], [formaction]')).toHaveCount(0);
  await expect(page.locator('.web-reference img').first()).toHaveJSProperty('naturalHeight', project3Tasks[0].referenceHeight);
  await expect(page.locator('.web-reference img').nth(1)).toHaveJSProperty('naturalHeight', project3MapReferenceHeight);
  await page.getByRole('button', { name: 'Перегляд world.html', exact: true }).click();
  await expect(frame.locator('form')).toHaveCount(0);
  await expect(frame.locator('a[href^="about:srcdoc#"]')).toHaveCount(6);
  const mapAnchor = frame.locator('a[href^="about:srcdoc#"]').first();
  const fragment = (await mapAnchor.getAttribute('href')).split('#')[1];
  await mapAnchor.click();
  expect(await frame.locator('html').evaluate(node => node.ownerDocument.defaultView.location.hash)).toBe('#' + fragment);
  const heading = await page.locator('.robo-body h2[id]').first().getAttribute('id');
  await page.evaluate(heading => StepBySchool.navigate('#/web/html-css/mini-project-3/' + heading), heading);
  for (const name of projectNames) {
    await selectFile(page, name);
    await expect(page.locator('#web-project-source')).toHaveValue(project3FilesReference[name]);
    const downloading = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Завантажити ' + name, exact: true }).click();
    const download = await downloading;
    expect(download.suggestedFilename()).toBe(name);
    await download.saveAs(testInfo.outputPath(name));
    expect(await readFile(testInfo.outputPath(name), 'utf8')).toBe(embedLessonImages(project3FilesReference[name]));
  }
  const offline = await context.newPage();
  await context.setOffline(true);
  await offline.goto(pathToFileURL(testInfo.outputPath('index.html')).href);
  await expect(offline.locator('form')).toHaveCount(1);
  // Both local files and the second stylesheet must resolve in a real downloaded project.
  await offline.locator('a[href="world.html"]').click();
  await expect(offline).toHaveURL(/world\.html$/);
  await expect(offline.locator('h1')).toBeVisible();
  expect(await offline.locator('a[href^="#"]').count()).toBeGreaterThanOrEqual(6);
  await offline.locator('a[href="index.html"]').click();
  await expect(offline).toHaveURL(/index\.html$/);
  await offline.close();
  for (const name of projectNames) {
    await selectFile(page, name);
    await page.locator('#web-project-source').fill('');
    await page.locator('input[type=file]').setInputFiles(testInfo.outputPath(name));
    await expect(page.locator('#web-project-source')).toHaveValue(project3FilesReference[name]);
  }
});

test('project pages, all original targets and mobile workshop work offline without overflow', async ({ page }) => {
  const errors = [], external = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) external.push(request.url()); });
  await page.context().setOffline(true);
  await page.goto(pathToFileURL(path.resolve('index.html')).href + '#/web/html-css/mini-project-3');
  await fillProject(page);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.locator('figure.web-diagram').first().screenshot({ path: `/tmp/stepby-project3-diagram-${width}.png` });
    for (const name of ['index.html', 'world.html']) {
      await page.getByRole('button', { name: 'Перегляд ' + name, exact: true }).click();
      expect(await page.frameLocator('iframe').locator('html').evaluate(node => node.scrollWidth <= innerWidth), name).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('#web-project-source').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/stepby-project3-workspace-${width}.png` });
  }
  for (const [source, height] of [[project3Tasks[0].reference, project3Tasks[0].referenceHeight], [project3MapReference, project3MapReferenceHeight]]) {
    await page.setViewportSize({ width: 720, height });
    await page.setContent(embedLessonImages(source));
    await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
    expect(await page.locator('body').evaluate(node => node.scrollHeight <= innerHeight)).toBe(true);
    expect(await page.locator('html').evaluate(node => node.scrollWidth <= innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});
