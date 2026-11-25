const { test, expect } = require('@playwright/test');
const { readFile } = require('node:fs/promises');
const { pathToFileURL } = require('node:url');
const { loadTypeScript } = require('../../../../../tests/helpers/load-typescript.cjs');
const { review4Tasks } = loadTypeScript(
  'src/courses/web-development/lessons/web-review-4/tasks.ts',
);
const { project4Tasks, project4ReferenceCss, project4ReferenceHtml } =
  loadTypeScript('src/courses/web-development/lessons/mini-project-4/tasks.ts');

async function refresh(page) {
  await page
    .getByRole('button', { name: 'Оновити результат', exact: true })
    .click();
  return page.frameLocator('iframe');
}

test('review exercises preserve drafts and render their media, animation and open panels', async ({
  page,
}) => {
  await page.goto('/#/web/html-css');
  await page.getByRole('link', { name: /Тема 26\./ }).click();
  const editor = page.locator('#web-source');
  const tasks = page.locator('[data-web-task]');
  await expect(tasks).toHaveCount(3);
  for (const [index, task] of review4Tasks.entries()) {
    await tasks.nth(index).click();
    await editor.fill(task.reference);
    const frame = await refresh(page);
    await expect(frame.locator('h1')).toBeVisible();
    const image = page.locator('.web-reference img');
    await expect
      .poll(() => image.evaluate((img) => img.naturalHeight))
      .toBe(task.referenceHeight ?? 420);
    if (task.referenceHover) {
      const trigger = frame.locator(task.referenceHover);
      await trigger.hover();
      const items = frame.locator('.bag:first-child .items');
      await expect(items).toBeVisible();
      await expect(frame.locator('.bag:nth-child(2) .items')).toBeHidden();
      await page.mouse.move(0, 0);
      await trigger.focus();
      await expect(items).toBeVisible();
      await page.keyboard.press('Tab');
      await expect(items.getByRole('link').first()).toBeFocused();
    }
    if (task.referenceTimeMs !== undefined) {
      await expect
        .poll(() =>
          frame.locator('body').evaluate(() => document.getAnimations().length),
        )
        .toBeGreaterThan(0);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await expect
        .poll(() =>
          frame.locator('body').evaluate(() => document.getAnimations().length),
        )
        .toBe(0);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
    }
    await frame
      .locator('img')
      .evaluateAll((images) => Promise.all(images.map((img) => img.decode())));
    await frame.locator('audio, video').evaluateAll((media) =>
      Promise.all(
        media.map((el) =>
          el.readyState >= 1
            ? undefined
            : new Promise((resolve, reject) => {
                el.addEventListener('loadedmetadata', resolve, { once: true });
                el.addEventListener('error', reject, { once: true });
              }),
        ),
      ),
    );
    await page.setViewportSize({ width: 390, height: 900 });
    expect(
      await frame
        .locator('html')
        .evaluate((el) => el.scrollWidth <= innerWidth),
    ).toBe(true);
    expect(
      await page.locator('html').evaluate((el) => el.scrollWidth <= innerWidth),
    ).toBe(true);
    await page.setViewportSize({ width: 1280, height: 900 });
  }
  await tasks.first().click();
  await expect(editor).toHaveValue(review4Tasks[0].reference);
});

test('Moon project uses both editor files and exports ten illustrated articles that work offline', async ({
  page,
  context,
}, testInfo) => {
  await page.setViewportSize({ width: 1050, height: 900 });
  await page.goto('/#/web/html-css/mini-project-4');
  const editor = page.locator('#web-source');
  await expect(editor).toHaveValue(/href="style\.css"/);
  const task = project4Tasks[0];
  await expect
    .poll(() =>
      page.locator('.web-reference img').evaluate((img) => img.naturalHeight),
    )
    .toBe(task.referenceHeight);
  const html = project4ReferenceHtml;
  await editor.fill(html);
  await page.locator('#web-css').fill(project4ReferenceCss);
  const frame = await refresh(page);
  await expect(frame.locator('main article')).toHaveCount(10);
  await frame
    .locator('main article img')
    .evaluateAll((images) => Promise.all(images.map((img) => img.decode())));
  expect(
    await frame
      .locator('article')
      .evaluateAll((articles) =>
        articles.slice(0, 2).map((el) => getComputedStyle(el).flexDirection),
      ),
  ).toEqual(['row', 'row-reverse']);
  const pause = frame.getByRole('checkbox');
  await pause.focus();
  await page.keyboard.press('Space');
  await expect(pause).toBeChecked();
  await expect(frame.locator('article img').first()).toHaveCSS(
    'animation-play-state',
    'paused',
  );
  const downloads = [
    ['Завантажити HTML', 'index.html'],
    ['Завантажити CSS', 'style.css'],
  ];
  for (const [name, filename] of downloads) {
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name, exact: true }).click();
    await (await download).saveAs(testInfo.outputPath(filename));
  }
  expect(await readFile(testInfo.outputPath('style.css'), 'utf8')).toBe(
    project4ReferenceCss,
  );
  await page.getByText('Ілюстрації Місяця', { exact: true }).click();
  const archive = page.waitForEvent('download');
  await page
    .getByRole('link', { name: 'Завантажити ілюстрації Місяця (ZIP)' })
    .click();
  expect((await archive).suggestedFilename()).toBe('moon-images.zip');
  await context.setOffline(true);
  const standalone = await context.newPage();
  await standalone.setViewportSize({ width: 320, height: 900 });
  await standalone.goto(pathToFileURL(testInfo.outputPath('index.html')).href);
  await expect(standalone.locator('main article')).toHaveCount(10);
  await standalone
    .locator('article img')
    .evaluateAll((images) => Promise.all(images.map((img) => img.decode())));
  expect(
    await standalone
      .locator('article')
      .evaluateAll((articles) =>
        articles.every((el) => getComputedStyle(el).flexDirection === 'column'),
      ),
  ).toBe(true);
  expect(
    await standalone
      .locator('html')
      .evaluate((el) => el.scrollWidth <= innerWidth),
  ).toBe(true);
  await standalone.emulateMedia({ reducedMotion: 'reduce' });
  await expect
    .poll(() => standalone.evaluate(() => document.getAnimations().length))
    .toBe(0);
  await page
    .locator('input[type=file][accept*="html"]')
    .setInputFiles(testInfo.outputPath('index.html'));
  await expect(editor).toHaveValue(html);
});
