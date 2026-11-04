const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

test('radian theory precedes ten tasks; all steps and next links work at desktop and mobile sizes', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/#/10a/math/radian');
    await expect(page.locator('h1')).toHaveText('8. Радіанна міра кутів');
    await expect(page.getByRole('heading', { name: 'Що таке радіанна міра кута?' })).toBeVisible();
    const tasks = page.locator('a[href*="/radian/radian-"]');
    await expect(tasks).toHaveCount(10);
    await expect(page.locator('#app')).not.toContainText(/9\.[135]/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/radian-theory-${width}.png`, fullPage: true });
    await tasks.first().click();
    for (let example = 0; example < 10; example++) {
      await expect(page.locator('#i_radexample')).toHaveValue(String(example));
      const count = await page.evaluate(() => StepBySchool.getSnapshot().steps.length);
      for (let step = 1; step < count; step++) {
        await page.getByRole('button', { name: 'Далі →', exact: true }).click();
        await expect(page.locator('.step-count')).toHaveText(`Крок ${step + 1} з ${count}`);
      }
      await expect(page.locator('.rp-answer')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if ([1, 3, 7, 9].includes(example)) await page.screenshot({ path: `test-results/radian-task-${example}-${width}.png`, fullPage: true });
      if (example < 9) await page.getByRole('link', { name: 'Наступна задача →' }).click();
      else await expect(page.getByRole('link', { name: 'Наступна задача →' })).toHaveCount(0);
    }
    await page.locator('#i_radexample').selectOption('3');
    await page.getByRole('button', { name: 'Показати розв’язання' }).click();
    await expect.poll(() => page.evaluate(() => StepBySchool.getSnapshot().toolCfg.example)).toBe(3);
    await page.goto('/#/10a/math/radian/radian-2');
    await page.getByRole('button', { name: 'Далі →', exact: true }).click();
    await page.getByRole('button', { name: '← Назад', exact: true }).click();
    await expect(page.locator('.sp-tool-segment[data-step="1"]')).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});

test('radian works offline and animates only the appended segment', async ({ page }) => {
  const errors = [];
  const external = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) external.push(request.url()); });
  await page.goto(pathToFileURL(path.resolve('index.html')).href + '#/10a/math/radian/radian-4');
  await expect(page.locator('#i_radexample')).toBeVisible();
  await page.getByRole('button', { name: 'Далі →', exact: true }).click();
  await expect(page.locator('[data-step="1"] .hwa').first()).toBeAttached();
  await page.getByRole('button', { name: 'Далі →', exact: true }).click();
  expect(await page.locator('[data-step="1"] [style*="animation:"]').count()).toBe(0);
  expect(await page.locator('[data-step="2"] [style*="animation:"]').count()).toBeGreaterThan(0);
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test('equality conditions align the fraction bar with the equals sign', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const task of [5, 6]) {
      await page.goto(`/#/10a/math/radian/radian-${task}`);
      const equation = page.locator('.sp-condition-equation');
      await expect(equation).toBeVisible();
      const centers = await equation.evaluate(element => {
        const bar = element.querySelector('.ffbar').getBoundingClientRect();
        const equals = element.querySelector('.sp-condition-equals').getBoundingClientRect();
        return { bar: bar.y + bar.height / 2, equals: equals.y + equals.height / 2 };
      });
      expect(Math.abs(centers.bar - centers.equals)).toBeLessThan(1);
      await page.screenshot({ path: `test-results/radian-equality-${task}-${width}.png`, fullPage: true });
    }
  }
});


test('trigonometric function names have space before ordinary and fractional arguments', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['radian', 'radian/radian-4']) {
      await page.goto('/#/10a/math/' + route);
      const functions = page.locator('.fx-function');
      await expect(functions.first()).toBeVisible();
      const gaps = await functions.evaluateAll(elements => elements.map(element => {
        const name = element.children[0].getBoundingClientRect();
        const argument = element.children[1].getBoundingClientRect();
        return argument.left - name.right;
      }));
      expect(gaps.length).toBeGreaterThan(1);
      expect(gaps.every(gap => gap >= 3)).toBe(true);
      await page.screenshot({ path: `test-results/radian-spacing-${route.includes('/') ? 'notebook' : 'theory'}-${width}.png`, fullPage: true });
    }
  }
});
