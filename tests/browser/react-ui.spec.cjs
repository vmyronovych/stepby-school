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
  await page.locator('a.card[href="#/5a"]').click();
  await expect(page.locator('h1')).toContainText('Предмети');
  await expect(
    page.locator('.card').filter({ hasText: 'Скоро з’явиться' }).first(),
  ).not.toHaveAttribute('href');
  await page.locator('a.card[href="#/5a/math"]').click();
  await page.locator('a.card[href="#/5a/math/t1"]').click();
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

test('notebook animation commits, skipped steps, reduced motion and mobile', async ({
  page,
}) => {
  await page.goto('/#/9a/geometry/scalar-product/scalar-1');
  await expect(page.locator('.step-count')).toContainText('Крок 1');
  await page.evaluate(() => {
    window.animationChecks = [];
    const def = StepBySchool.getToolDefinition(),
      original = def.animate;
    def.animate = (model, ctx) => {
      animationChecks.push({
        index: ctx.index,
        hasSheet: !!document.querySelector('.paper.sheet'),
        anim: !!ctx.anim,
      });
      return original?.(model, ctx);
    };
  });
  await page.getByRole('button', { name: 'Далі →', exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => animationChecks.length))
    .toBeGreaterThan(0);
  expect(await page.evaluate(() => animationChecks.at(-1))).toEqual({
    index: 1,
    hasSheet: true,
    anim: true,
  });
  await page.evaluate(() => StepBySchool.changeStep(3));
  await expect
    .poll(() => page.evaluate(() => animationChecks.at(-1)?.index))
    .toBe(3);
  expect(await page.evaluate(() => animationChecks.at(-1).anim)).toBe(false);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => StepBySchool.changeStep(0));
  await page.getByRole('button', { name: 'Далі →', exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => animationChecks.at(-1)?.index))
    .toBe(1);
  expect(await page.evaluate(() => animationChecks.at(-1).anim)).toBe(false);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.paper.sheet')).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: 'test-results/notebook-mobile.png',
    fullPage: true,
  });
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
  await expect(page.locator('h1')).toContainText('Оберіть клас');
  await page.goBack();
  await expect(page.locator('#roboBody')).toBeVisible();
});

test('offline classic bundle supports file URLs', async ({ page }) => {
  await page.route('http://**/*', (route) => route.abort());
  await page.route('https://**/*', (route) => route.abort());
  await page.goto(
    pathToFileURL(path.resolve('index.html')).href +
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

test('leaving the React shell cancels scheduled notebook animation', async ({
  page,
}) => {
  await page.goto('/#/9a/geometry/scalar-product/scalar-1');
  const calls = await page.evaluate(async () => {
    let calls = 0;
    const definition = StepBySchool.getToolDefinition();
    definition.animate = () => {
      calls++;
    };
    // Hold animation frames until navigation finishes, then run uncancelled work.
    // This makes cancellation verification independent of browser frame timing.
    const request = window.requestAnimationFrame;
    const cancel = window.cancelAnimationFrame;
    const pending = new Map();
    let nextFrame = 1;
    window.requestAnimationFrame = (callback) => {
      const id = nextFrame++;
      pending.set(id, callback);
      return id;
    };
    window.cancelAnimationFrame = (id) => {
      pending.delete(id);
    };
    try {
      StepBySchool.changeStep(1);
      const navigated = new Promise((resolve) =>
        window.addEventListener('hashchange', resolve, { once: true }),
      );
      StepBySchool.navigate('#/');
      await navigated;
      for (let frame = 0; frame < 2; frame++) {
        const callbacks = [...pending.values()];
        pending.clear();
        callbacks.forEach((callback) => callback(performance.now()));
      }
      return calls;
    } finally {
      window.requestAnimationFrame = request;
      window.cancelAnimationFrame = cancel;
    }
  });
  expect(calls).toBe(0);
  await expect(page.locator('h1')).toContainText('Оберіть клас');
});

test('column arithmetic flies written digits and carry digits in sequence', async ({
  page,
}) => {
  await page.goto(
    '/#/tool/add?c=' + encodeURIComponent(JSON.stringify({ a: 7, b: 5 })),
  );
  const flightIndex = await page.evaluate(() =>
    StepBySchool.getSnapshot().steps.findIndex(
      (step) => step.flights?.length === 2,
    ),
  );
  expect(flightIndex).toBeGreaterThan(0);
  await page.evaluate(
    (index) => StepBySchool.changeStep(index - 1),
    flightIndex,
  );
  await page.evaluate(() => {
    window.flightTimes = [];
    const original = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      if (this.classList.contains('col-clone'))
        flightTimes.push(performance.now());
      return original.apply(this, args);
    };
  });
  await page.getByRole('button', { name: 'Далі →', exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => flightTimes.length), { timeout: 10000 })
    .toBe(2);
  expect(
    await page.evaluate(() => flightTimes[1] - flightTimes[0]),
  ).toBeGreaterThan(600);
  await expect(page.locator('.col-clone')).toHaveCount(0);
  await expect(page.locator('.fw, .fws')).toHaveCount(0);
});
