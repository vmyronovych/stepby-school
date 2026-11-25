const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

test.beforeEach(async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.testErrors = errors;
});
test.afterEach(async ({ page }) => expect(page.testErrors).toEqual([]));

test('student navigation, history, completion and custom inputs', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('a.card[href="#/courses/math"]').click();
  await expect(page.locator('h1')).toHaveText('Математика');
  await expect(
    page.getByRole('heading', { name: '5 клас', exact: true }),
  ).toBeVisible();
  await page.locator('a.card[href="#/courses/math/t1"]').click();
  const task = page.locator('a.btn').filter({ hasText: 'Розв’язати' }).first();
  const href = await task.getAttribute('href');
  await task.click();
  await expect(page.locator('.paper.sheet')).toBeVisible();
  await page.getByRole('button', { name: 'Позначити виконаним' }).click();
  await page.getByRole('link', { name: '← Назад', exact: true }).click();
  await expect(page.locator('.badge.ok')).toHaveCount(1);
  await page.goBack();
  await expect(page).toHaveURL(
    new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$'),
  );
  await page.goForward();
  await expect(page.locator('h1')).toBeVisible();
  await page.goto('/#/tool/add');
  await page.locator('#i_a').fill('27');
  await page.locator('#i_b').fill('15');
  await page.getByRole('button', { name: 'Показати розв’язання' }).click();
  await expect(page.locator('.step-count')).toContainText('Крок 1');
  expect(await page.evaluate(() => StepBySchool.getSnapshot().toolCfg)).toEqual(
    { a: 27, b: 15 },
  );
  await page.getByRole('button', { name: 'Далі →', exact: true }).click();
  await expect(page.locator('.step-count')).toContainText('Крок 2');
  await page.evaluate(() =>
    StepBySchool.changeStep(StepBySchool.getSnapshot().steps.length - 1),
  );
  await expect(page.locator('.explain')).toContainText('42');
  await expect(
    page.getByRole('button', { name: 'Далі →', exact: true }),
  ).toBeDisabled();
  await page.getByRole('button', { name: 'Спочатку' }).click();
  await expect(page.locator('.step-count')).toContainText('Крок 1');
  await page.locator('#i_a').fill('0');
  await page.getByRole('button', { name: 'Показати розв’язання' }).click();
  await expect(page.locator('.paper .empty')).toContainText(
    'Введи два натуральні',
  );
});

test('React and interactive documents can alternate without losing document state', async ({
  page,
}) => {
  await page.goto('/#/9a/geometry/vector-scaling');
  await expect(page.locator('#roboBody')).toBeVisible();
  await page.evaluate(() => {
    document.querySelector('#roboBody').dataset.retained = 'yes';
  });
  await page.evaluate(() =>
    StepBySchool.navigate('#/9a/geometry/vector-scaling/section'),
  );
  await expect(page.locator('#roboBody')).toHaveAttribute(
    'data-retained',
    'yes',
  );
  await page.goto('/#/9a/geometry/vector-scaling/scaling-1');
  await expect(page.locator('.paper.sheet')).toBeVisible();
  await page.getByRole('link', { name: '← Назад', exact: true }).click();
  await expect(page.locator('#roboBody')).toBeVisible();
  await page.locator('.logo').click();
  await expect(page.locator('h1')).toContainText('Оберіть курс');
  await page.goBack();
  await expect(page.locator('#roboBody')).toBeVisible();
});

test('offline classic bundle supports file URLs', async ({ page }) => {
  await page.route('http://**/*', (route) => route.abort());
  await page.route('https://**/*', (route) => route.abort());
  await page.goto(
    pathToFileURL(path.resolve('dist/index.html')).href +
      '#/9a/geometry/vector-scaling/scaling-2',
  );
  await expect(page.locator('.paper.sheet')).toBeVisible();
  await page.getByRole('button', { name: 'Далі →', exact: true }).click();
  await expect(page.locator('.step-count')).toContainText('Крок 2');
  await page.screenshot({
    path: 'test-results/notebook-desktop.png',
    fullPage: true,
  });
});

test('every registered lesson tool renders and reaches its last step in the React shell', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const samples = await page.evaluate(() => {
    const seen = new Set();
    return StepBySchool.getCatalog().topics.flatMap((topic) =>
      (topic.tasks || [])
        .filter((task) => {
          if (seen.has(task.tool)) return false;
          seen.add(task.tool);
          return true;
        })
        .map((task) => ({
          tool: task.tool,
          href: StepBySchool.hrefTopic(topic, task.id),
        })),
    );
  });
  expect(samples.length).toBeGreaterThan(10);
  for (const sample of samples) {
    await page.evaluate((href) => StepBySchool.navigate(href), sample.href);
    await expect
      .poll(() => page.evaluate(() => StepBySchool.getSnapshot().tool))
      .toBe(sample.tool);
    await expect(page.locator('.paper.sheet')).toBeVisible();
    expect(
      await page.evaluate(() => !!StepBySchool.getSnapshot().model),
      sample.tool,
    ).toBe(true);
    await page.evaluate(() =>
      StepBySchool.changeStep(StepBySchool.getSnapshot().steps.length - 1),
    );
    await expect(
      page.getByRole('button', { name: 'Далі →', exact: true }),
    ).toBeDisabled();
    await page.evaluate(() => StepBySchool.changeStep(0));
    await expect(page.locator('.step-count')).toContainText('Крок 1');
  }
});
