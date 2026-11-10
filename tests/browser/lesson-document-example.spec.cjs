const { test, expect } = require('@playwright/test');
const fs = require('node:fs/promises');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const lesson = '/#/4a/info/i4a/inf4-8-6';

test('lesson 8 offers the editable sample and a fullscreen preview', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(lesson);
  const sample = page.locator('#inf4-8-6 .lesson-example');
  await expect(sample).toBeVisible();
  const preview = sample.locator('.lesson-example-image');
  await expect(preview).toBeVisible();
  await expect
    .poll(() => preview.evaluate((img) => img.naturalWidth))
    .toBeGreaterThan(1000);

  const downloadEvent = page.waitForEvent('download');
  await sample.getByRole('link', { name: 'Завантажити DOCX' }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('Про-мене-зразок-4-клас.docx');
  expect(await fs.readFile(await download.path())).toEqual(
    await fs.readFile(
      path.resolve('assets/documents/info4-lesson8-about-me.docx'),
    ),
  );

  const open = sample.getByRole('button', { name: 'На весь екран' });
  const dialog = page.getByRole('dialog', {
    name: 'Зразок документа Про мене',
  });
  await open.click();
  await expect(dialog).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => document.fullscreenElement?.className))
    .toBe('lesson-example-presentation');
  await dialog.getByRole('button', { name: 'Закрити · Esc' }).click();
  await expect(dialog).not.toBeVisible();
  await expect
    .poll(() => page.evaluate(() => document.fullscreenElement === null))
    .toBe(true);
  await expect(open).toBeFocused();

  await open.click();
  await expect
    .poll(() => page.evaluate(() => !!document.fullscreenElement))
    .toBe(true);
  // Browser Escape exits native fullscreen; exercise that fullscreenchange path.
  await page.evaluate(() => document.exitFullscreen());
  await expect(dialog).not.toBeVisible();
  await expect(open).toBeFocused();
  expect(errors).toEqual([]);
});

test('preview works offline on a narrow screen when native fullscreen is unavailable', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    Element.prototype.requestFullscreen = () =>
      Promise.reject(new Error('Unavailable'));
  });
  await page.goto(
    pathToFileURL(path.resolve('index.html')).href + lesson.slice(1),
  );
  const sample = page.locator('.lesson-example');
  await expect(sample.locator('img').first()).toBeVisible();
  await expect
    .poll(() =>
      sample
        .locator('img')
        .first()
        .evaluate((img) => img.naturalWidth),
    )
    .toBeGreaterThan(1000);
  await sample.getByRole('button', { name: 'На весь екран' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  expect(await page.evaluate(() => document.fullscreenElement)).toBeNull();
  const bounds = await dialog.boundingBox();
  expect(bounds.width).toBeLessThanOrEqual(390);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(
    sample.getByRole('button', { name: 'На весь екран' }),
  ).toBeFocused();
  await page.evaluate(() => StepBySchool.navigate('#/'));
  await expect(page.locator('.lesson-example')).toHaveCount(0);
});

test('Word 2013 galleries load offline, highlight tools and switch slides in fullscreen', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(
    pathToFileURL(path.resolve('index.html')).href + '#/4a/info/i4a/inf4-8-3',
  );
  await expect(page.locator('.word-shot-gallery')).toHaveCount(5);
  const gallery = page.locator('[data-word-gallery="tour"]');
  await expect(gallery).toContainText(
    'Навчальні ілюстрації інтерфейсу Word 2013 українською',
  );
  await expect(gallery.locator('svg').first().locator('rect')).toHaveCount(8);
  await gallery
    .getByRole('button', { name: 'На весь екран', exact: true })
    .click();
  const dialog = page.getByRole('dialog', {
    name: 'Екскурсія по вікну Word 2013',
  });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('strong')).toHaveText('Назва та розмір шрифту');
  await expect(dialog.locator('svg')).toHaveAttribute(
    'viewBox',
    '188 65 640 120',
  );
  await expect(dialog.locator('rect')).toHaveCount(4);
  await dialog.getByRole('button', { name: 'Сховати обводки' }).click();
  await expect(dialog.locator('rect')).toHaveCount(0);
  await dialog.getByRole('button', { name: 'Показати обводки' }).click();
  await expect(dialog.locator('rect')).toHaveCount(4);
  await dialog.getByRole('button', { name: 'Закрити · Esc' }).click();
  await expect(dialog).not.toBeVisible();
  await expect(gallery.locator('.word-shot-heading strong')).toHaveText(
    'Назва та розмір шрифту',
  );
  await expect(
    gallery.getByRole('button', { name: 'На весь екран', exact: true }),
  ).toBeFocused();
  expect(errors).toEqual([]);
});

test('lesson galleries keep independent state across anchor and history navigation', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/4a/info/i4a/inf4-8-3');
  const tour = page.locator('[data-word-gallery="tour"]');
  const introduction = page.locator('[data-word-gallery="introduction"]');
  await tour
    .getByRole('button', { name: 'Назва та розмір шрифту', exact: true })
    .click();
  await tour.getByRole('button', { name: 'Сховати обводки' }).click();
  await expect(introduction.locator('.word-shot-heading strong')).toHaveText(
    'Чотири частини вікна Word',
  );
  await expect(
    introduction.getByRole('button', { name: 'Сховати обводки' }),
  ).toBeVisible();
  await page.evaluate(() => StepBySchool.navigate('#/4a/info/i4a/inf4-8-6'));
  await expect(page.locator('.lesson-example')).toBeVisible();
  await expect(tour.locator('.word-shot-heading strong')).toHaveText(
    'Назва та розмір шрифту',
  );
  await page.goBack();
  await expect(page).toHaveURL(/inf4-8-3$/);
  await expect(
    tour.getByRole('button', { name: 'Показати обводки' }),
  ).toBeVisible();
  await page.goForward();
  await expect(page).toHaveURL(/inf4-8-6$/);
  await expect(page.locator('.word-shot-gallery')).toHaveCount(5);
  await expect(page.locator('.lesson-example')).toHaveCount(1);
  expect(errors).toEqual([]);
});

for (const offline of [false, true]) {
  test(`leaving Word fullscreen releases the page for existing interactive tools (${offline ? 'offline' : 'HTTP'})`, async ({
    page,
  }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    const route = '#/4a/info/i4a/inf4-8-3';
    if (offline) await page.context().setOffline(true);
    await page.goto(
      offline
        ? pathToFileURL(path.resolve('index.html')).href + route
        : '/' + route,
    );
    const checks = [
      [
        '#/3a/info/kb3/caps',
        async () => {
          await page.keyboard.type('abc');
          await expect(page.locator('#kbType')).toContainText('abc');
          await page.locator('[data-kbf="bsdel"]').click();
          await expect(page.locator('#kbType')).toContainText('abc');
        },
      ],
      [
        '#/4a/info/win4/10',
        async () => {
          await page.locator('[data-wnc="wine"]').click();
          await expect(page.locator('#wnWins .wn-win.k-exp')).toHaveCount(1);
          await page.locator('#wnWins .wn-win.k-exp [data-a="close"]').click();
          await expect(page.locator('#wnWins .wn-win.k-exp')).toHaveCount(0);
        },
      ],
      [
        '#/web/html-css/web-page',
        async () => {
          await page
            .locator('#web-source')
            .fill('<h1>Перевірка після Word</h1>');
          await page
            .getByRole('button', { name: 'Оновити результат', exact: true })
            .click();
          await expect(
            page
              .frameLocator('iframe[title="Твій результат HTML"]')
              .locator('h1'),
          ).toHaveText('Перевірка після Word');
        },
      ],
      [
        '#/robo/robot/r9',
        async () => {
          await expect(page.locator('#cbSvg')).toBeVisible();
          await page.locator('[data-view="bb"]').click();
          await expect(page.locator('#cbMain')).toHaveClass(/bb/);
          await page.locator('[data-view="schem"]').click();
          await expect(page.locator('#cbMain')).not.toHaveClass(/bb/);
        },
      ],
      [
        '#/tool/add',
        async () => {
          await page.locator('#i_a').fill('27');
          await page.locator('#i_b').fill('15');
          await page
            .getByRole('button', { name: 'Показати розв’язання' })
            .click();
          await expect
            .poll(() => page.evaluate(() => StepBySchool.getSnapshot().toolCfg))
            .toEqual({ a: 27, b: 15 });
          await page
            .getByRole('button', { name: 'Далі →', exact: true })
            .click();
          await expect(page.locator('.step-count')).toContainText('Крок 2');
          await page.evaluate(() =>
            StepBySchool.changeStep(
              StepBySchool.getSnapshot().steps.length - 1,
            ),
          );
          await expect(page.locator('.explain')).toContainText('42');
        },
      ],
    ];
    for (const [target, check] of checks) {
      const gallery = page.locator('[data-word-gallery="tour"]');
      await gallery
        .getByRole('button', { name: 'На весь екран', exact: true })
        .click();
      await expect
        .poll(() => page.evaluate(() => !!document.fullscreenElement))
        .toBe(true);
      // Simulate browser navigation while the presentation is still open.
      await page.evaluate((href) => StepBySchool.navigate(href), target);
      await expect
        .poll(() => page.evaluate(() => document.fullscreenElement))
        .toBeNull();
      await expect(page.locator('dialog[open]')).toHaveCount(0);
      await expect(
        page.locator('.word-shot-gallery, .lesson-example'),
      ).toHaveCount(0);
      await check();
      await page.evaluate((href) => StepBySchool.navigate(href), route);
      await expect(page.locator('.word-shot-gallery')).toHaveCount(5);
      await expect(gallery.locator('.word-shot-heading strong')).toHaveText(
        'Чотири частини вікна Word',
      );
    }
    expect(errors).toEqual([]);
  });
}
