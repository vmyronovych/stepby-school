const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const lesson = '#/robo/robot/lesson-08';

test('home enters lessons directly; all lesson cards and tools open', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Робототехніка/ }).click();
  await expect(page).toHaveURL(/#\/robo\/robot\/lessons$/);
  await expect(page.locator('a.card[href*="/lesson-"]')).toHaveCount(32);
  await expect(page.locator('.robotics-stage .robotics-status')).toHaveCount(0);
  await expect(page.locator('.robotics-stage h3').first()).toHaveText(
    '1. Перше коло',
  );
  await expect(page.locator('.robotics-course')).not.toContainText(
    /Pico|MicroBlocks|КТП/,
  );
  await page.locator('a.card[href$="/lesson-09"]').click();
  await expect(
    page.getByRole('heading', {
      name: '9. Майстерня «Перевіряємо нашу збірку»',
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByText('Готується', { exact: true })).toHaveCount(0);
  await expect(
    page.getByRole('navigation', { name: 'Режим заняття' }),
  ).toHaveCount(1);
  await page.getByText('Про заняття', { exact: true }).click();
  await page
    .getByRole('link', { name: 'Інструменти робототехніки →', exact: true })
    .click();
  await expect(page).toHaveURL(/\/tools$/);
  const external = page
    .locator('.robotics-tool-grid a')
    .filter({ hasText: 'Мандрівник' });
  await expect(external).toHaveAttribute('target', '_blank');
  await expect(external).toHaveAttribute(
    'href',
    'https://vmyronovych.github.io/stepby-robotics/',
  );
  await page.getByRole('link', { name: /Електричне коло/ }).click();
  await expect(page.locator('#cbSvg')).toBeVisible();
  await page
    .getByRole('link', { name: 'Інструменти', exact: true })
    .first()
    .click();
  await page.getByRole('link', { name: /Азбука Морзе/ }).click();
  await expect(page.locator('#morsePrint')).toBeVisible();
});

test('classroom reveals explanations deliberately; hints survive mode navigation and history', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/' + lesson);
  await page
    .getByRole('button', { name: 'На весь екран', exact: true })
    .click();
  await expect(
    page.locator('.robotics-lesson-screen:fullscreen'),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Вийти з повного екрана', exact: true })
    .click();
  await expect(page.locator('.robotics-lesson-screen:fullscreen')).toHaveCount(
    0,
  );
  await page.getByRole('tab', { name: 'Програма', exact: true }).click();
  await expect(page.locator('#motor-explanation')).toHaveCount(0);
  await expect(
    page.locator('.robotics-classroom img[src$="demo-blocks.png"]').first(),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Збільшити блоки', exact: true })
    .click();
  await expect(
    page.getByRole('dialog', { name: 'Блоки програми Mcar' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await page
    .getByRole('button', { name: 'Показати пояснення', exact: true })
    .click();
  await expect(page.locator('#motor-explanation')).toContainText('інерцією');
  await page
    .getByRole('link', { name: 'Практика в парі', exact: true })
    .first()
    .click();
  const practice = page.locator('.robotics-practice:visible');
  await expect(
    practice.locator('.robotics-hints .robotics-callout'),
  ).toHaveCount(0);
  await practice.getByRole('button', { name: 'Перша підказка' }).click();
  await expect(
    practice.locator('.robotics-hints .robotics-callout'),
  ).toHaveCount(1);
  await page.getByRole('link', { name: 'Разом у класі', exact: true }).click();
  await expect(
    page.getByRole('tab', { name: 'Програма', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
  await page.goBack();
  await expect(
    practice.locator('.robotics-hints .robotics-callout'),
  ).toHaveCount(1);
  await practice.getByRole('button', { name: 'Наступна підказка' }).click();
  await practice.getByRole('button', { name: 'Наступна підказка' }).click();
  await expect(
    practice.locator('.robotics-hints .robotics-callout'),
  ).toHaveCount(3);
  await expect(
    practice.getByRole('button', { name: 'Наступна підказка' }),
  ).toHaveCount(0);
  await practice.getByRole('button', { name: 'Збільшити схему' }).click();
  await expect(
    practice.getByRole('dialog', {
      name: 'Зображення складання та підключення',
    }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(
    practice.getByRole('dialog', { name: 'Схема одного мотора' }),
  ).not.toBeVisible();
  await practice.getByRole('button', { name: 'Збільшити схему' }).click();
  await page.goForward();
  await expect(page).toHaveURL(/\/lesson-08$/);
  await expect(page.locator('dialog[open]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('student view has no teacher answers; the starter downloads unchanged', async ({
  page,
}) => {
  await page.goto('/' + lesson + '/student');
  await expect(page.locator('.robotics-student-only')).toBeVisible();
  await expect(
    page.locator('img[src$="start-blocks.png"]').first(),
  ).toBeVisible();
  await expect(
    page.locator(
      'img[src$="solution-blocks.png"], img[src$="demo-blocks.png"]',
    ),
  ).toHaveCount(0);
  await expect(
    page.locator(
      '.topbar,.robotics-nav,.crumbs,.robotics-lesson-footer,.robotics-teacher',
    ),
  ).toHaveCount(0);
  await expect(
    page.locator(
      'a[href$="lesson-08-solution.mcar"],a[href$="lesson-08-demo.mcar"]',
    ),
  ).toHaveCount(0);
  const event = page.waitForEvent('download');
  await page
    .getByRole('link', {
      name: 'Завантажити стартовий файл .mcar',
      exact: true,
    })
    .click();
  const download = await event;
  expect(download.suggestedFilename()).toBe('lesson-08-start.mcar');
  expect(fs.readFileSync(await download.path())).toEqual(
    fs.readFileSync(
      'src/courses/robotics/lessons/lesson-08/files/lesson-08-start.mcar',
    ),
  );
  await page.goto('/' + lesson + '/teacher');
  await expect(page.locator('.robotics-teacher')).toContainText(
    'Перша частина заняття',
  );
  await expect(page.locator('.robotics-teacher')).toContainText(
    'Друга частина заняття',
  );
  await expect(page.locator('a[href$="lesson-08-solution.mcar"]')).toHaveCount(
    1,
  );
  await expect(
    page.locator('.robotics-teacher img[src$="solution-blocks.png"]').first(),
  ).toBeVisible();
});

test('all modes work from file URLs on mobile without page overflow or script errors', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const base = pathToFileURL(path.resolve('dist/index.html')).href;
  for (const route of [
    '#/robo/robot/lessons',
    '#/robo/robot/tools',
    lesson,
    lesson + '/practice',
    lesson + '/teacher',
    lesson + '/student',
  ]) {
    await page.goto(base + route);
    await expect(page.locator('.robotics-course')).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    expect(
      await page
        .locator('.robotics-course img')
        .evaluateAll((images) =>
          images.every((img) => img.complete && img.naturalWidth > 0),
        ),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});
