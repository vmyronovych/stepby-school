const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { readFile, writeFile } = require('node:fs/promises');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { embedLessonMedia, lessonImageAssets } = loadTypeScript('src/features/web-development/media.ts');
const lessons = [
  ['semantic-media', 'semantic-media-tasks', 'semanticMediaTasks'],
  ['responsive-scroll', 'responsive-scroll-tasks', 'responsiveScrollTasks'],
  ['css-animation', 'animation-tasks', 'animationTasks'],
].map(([route, file, name]) => ({ route, tasks: loadTypeScript(`src/features/web-development/${file}.ts`)[name] }));

async function render(page, task) {
  await page.locator(`[data-web-task="${task.id}"]`).click();
  await page.locator('#web-source').fill(task.reference);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect.poll(() => page.frameLocator('iframe').locator('title').textContent()).toBe(task.reference.match(/<title>(.*?)<\/title>/)[1]);
  await page.frameLocator('iframe').locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
}

for (const [index, lesson] of lessons.entries()) {
  test(`Theme ${index + 23} is discoverable and all references render complete valid structures`, async ({ page, context }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/#/web/html-css');
    await page.getByRole('link').filter({ hasText: `Тема ${index + 23}.` }).click();
    await expect(page).toHaveURL(new RegExp('/' + lesson.route + '$'));
    await expect(page.locator('[data-web-task]')).toHaveCount(lesson.tasks.length);
    const target = await context.newPage();
    for (const task of lesson.tasks) {
      await render(page, task);
      const frame = page.frameLocator('iframe');
      await expect(frame.locator('[align], [cellpadding], [cellspacing], font, center, script')).toHaveCount(0);
      await expect.poll(() => page.locator('.web-reference img').evaluate(img => img.naturalHeight)).toBe(task.referenceHeight ?? 420);
      await target.setViewportSize({ width: 720, height: task.referenceHeight ?? 420 });
      await target.setContent(embedLessonMedia(task.reference));
      if (task.referenceTimeMs !== undefined) await target.evaluate(time => {
        for (const animation of document.getAnimations()) { animation.pause(); animation.currentTime = time; }
      }, task.referenceTimeMs);
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
    expect(await readFile(file, 'utf8')).toBe(embedLessonMedia(task.reference));
    const standalone = await context.newPage();
    await context.setOffline(true);
    await standalone.goto(pathToFileURL(file).href);
    await standalone.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
    await expect(standalone).toHaveTitle(task.reference.match(/<title>(.*?)<\/title>/)[1]);
    if (lesson.route === 'semantic-media') {
      for (const tag of ['audio', 'video']) {
        await expect.poll(() => standalone.locator(tag).evaluate(media => media.readyState)).toBeGreaterThanOrEqual(2);
        await standalone.locator(tag).evaluate(media => { media.volume = 0; return media.play(); });
        await expect.poll(() => standalone.locator(tag).evaluate(media => media.currentTime)).toBeGreaterThan(0.05);
        await standalone.locator(tag).evaluate(media => media.pause());
      }
    }
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

test('all three lessons and targets work offline at desktop and mobile sizes', async ({ page }) => {
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


test('known local audio, video, captions and posters play in the sandbox without network access', async ({ page }) => {
  const requests = [];
  page.on('request', request => { if (/example\.com/.test(request.url())) requests.push(request.url()); });
  await page.goto('/#/web/html-css/semantic-media');
  await render(page, lessons[0].tasks[0]);
  const frame = page.frameLocator('iframe');
  for (const tag of ['audio', 'video']) {
    await expect.poll(() => frame.locator(tag).evaluate(media => media.readyState)).toBeGreaterThanOrEqual(2);
    expect(await frame.locator(tag).evaluate(media => ({ paused: media.paused, controls: media.controls, error: media.error?.code ?? null }))).toEqual({ paused: true, controls: true, error: null });
    await frame.locator(tag).evaluate(media => { media.volume = 0; return media.play(); });
    await expect.poll(() => frame.locator(tag).evaluate(media => media.currentTime)).toBeGreaterThan(0.05);
    await frame.locator(tag).evaluate(media => media.pause());
    await expect(frame.locator(tag)).toHaveJSProperty('paused', true);
  }
  await expect.poll(() => frame.locator('track').evaluate(track => track.readyState)).toBe(2);
  expect(await frame.locator('track').evaluate(track => track.track.cues.length)).toBeGreaterThan(0);
  await expect(frame.locator('video')).toHaveAttribute('poster', /^data:image\/svg\+xml/);
  const attack = '<header>Заголовок</header><main><audio autoplay src="https://example.com/music.wav" onplay="alert(1)"></audio><video src="data:video/webm;base64,AAAA" poster="https://example.com/poster.svg"><source src="https://example.com/a.webm"><track src="https://example.com/a.vtt" kind="captions"></video><script>alert(1)</script></main>';
  await page.locator('#web-source').fill(attack);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect(frame.locator('header')).toHaveText('Заголовок');
  await expect(frame.locator('[src], [poster], [onplay], [autoplay], script')).toHaveCount(0);
  expect(requests).toEqual([]);
  await page.goto('/#/web/html-css/dropdown-menu');
  await page.locator('#web-source').fill(attack);
  await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
  await expect(frame.locator('header, main, audio, video, source, track')).toHaveCount(0);
});

test('all three media downloads contain their original bytes and ZIP includes every file', async ({ page }, testInfo) => {
  const { lessonAvAssets } = loadTypeScript('src/features/web-development/av-media.ts');
  await page.goto('/#/web/html-css/semantic-media');
  await page.getByText('Аудіо, відео та описи для завдань', { exact: true }).click();
  for (const asset of lessonAvAssets) {
    const downloading = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Завантажити ' + asset.filename, exact: true }).click();
    const download = await downloading;
    expect(download.suggestedFilename()).toBe(asset.filename);
    expect(await readFile(await download.path())).toEqual(Buffer.from(asset.src.split(',')[1], 'base64'));
  }
  const downloading = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Завантажити комплект медіа (ZIP)', exact: true }).click();
  const zip = await readFile(await (await downloading).path());
  let offset = 0; const files = [];
  while (zip.readUInt32LE(offset) === 0x04034b50) {
    const size = zip.readUInt32LE(offset + 18), nameLength = zip.readUInt16LE(offset + 26), extra = zip.readUInt16LE(offset + 28);
    const name = zip.subarray(offset + 30, offset + 30 + nameLength).toString();
    const start = offset + 30 + nameLength + extra;
    const asset = lessonAvAssets.find(asset => asset.filename === name);
    expect(asset).toBeDefined();
    expect(zip.subarray(start, start + size)).toEqual(Buffer.from(asset.src.split(',')[1], 'base64'));
    files.push(name); offset = start + size;
  }
  expect(files.sort()).toEqual(lessonAvAssets.map(asset => asset.filename).sort());
});

test('media queries switch at exact boundaries and a keyboard user scrolls the named region', async ({ page }) => {
  const task = lessons[1].tasks[0];
  // Standalone widths prove media conditions independently of the course's narrower iframe.
  for (const [width, mode] of [[390, 'compact'], [599, 'compact'], [600, 'medium'], [720, 'medium'], [999, 'medium'], [1000, 'wide'], [1024, 'wide']]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.setContent(task.reference);
    for (const name of ['compact', 'medium', 'wide']) await expect(page.locator('.' + name + '-text'))[name === mode ? 'toBeVisible' : 'toBeHidden']();
  }
  await page.goto('/#/web/html-css/responsive-scroll');
  await render(page, lessons[1].tasks[1]);
  const region = page.frameLocator('iframe').getByRole('region').first();
  await expect(region).toHaveAttribute('tabindex', '0');
  await region.focus();
  const before = await region.evaluate(node => node.scrollTop);
  await page.keyboard.press('PageDown');
  await expect.poll(() => region.evaluate(node => node.scrollTop)).toBeGreaterThan(before);
});

test('animations move, native checkbox pauses, update restarts, and reduced motion stops every animation', async ({ page }) => {
  await page.goto('/#/web/html-css/css-animation');
  const frame = page.frameLocator('iframe');
  for (const task of lessons[2].tasks) {
    await render(page, task);
    const samples = await frame.locator('.animated').evaluateAll(nodes => {
      const animations = document.getAnimations();
      animations.forEach(animation => { animation.pause(); animation.currentTime = 0; });
      const before = nodes.map(node => getComputedStyle(node).transform);
      animations.forEach(animation => { animation.currentTime = 3000; });
      return { before, after: nodes.map(node => getComputedStyle(node).transform), count: animations.length };
    });
    expect(samples.count).toBeGreaterThan(0);
    expect(samples.after).not.toEqual(samples.before);
    // A fresh preview avoids the imperative play-state override from sampled WAAPI animations.
    await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
    await frame.getByRole('checkbox').focus();
    await page.keyboard.press('Space');
    await expect(frame.getByRole('checkbox')).toBeChecked();
    expect(await frame.locator('.animated').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).animationPlayState === 'paused'))).toBe(true);
    await expect.poll(() => frame.locator('body').evaluate(() => document.getAnimations().every(animation => !animation.pending && animation.playState === 'paused'))).toBe(true);
    const times = await frame.locator('body').evaluate(() => document.getAnimations().map(animation => animation.currentTime));
    await page.waitForTimeout(100);
    expect(await frame.locator('body').evaluate(() => document.getAnimations().map(animation => animation.currentTime))).toEqual(times);
    await page.keyboard.press('Space');
    await expect(frame.getByRole('checkbox')).not.toBeChecked();
    await frame.locator('body').evaluate(() => document.getAnimations().forEach(animation => { animation.pause(); animation.currentTime = 6000; }));
    await page.getByRole('button', { name: 'Оновити результат', exact: true }).click();
    await expect.poll(() => frame.locator('body').evaluate(() => document.getAnimations().some(animation => animation.currentTime < 1000))).toBe(true);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect.poll(() => frame.locator('body').evaluate(() => document.getAnimations().length)).toBe(0);
    await expect(frame.locator('.animated').first()).toBeVisible();
    await page.emulateMedia({ reducedMotion: 'no-preference' });
  }
});
