const { test, expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
for (const [width, base] of [
  [1366, '/'],
  [390, pathToFileURL(path.resolve(__dirname, '../../../../../dist/index.html')).href],
]) {
  test(`informatics separates tools from class materials and preserves navigation at ${width}px`, async ({
    page,
  }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.setViewportSize({ width, height: 844 });
    await page.goto(base + '#/courses/info');
    const nav = page.getByRole('navigation', {
      name: 'Розділи курсу «Інформатика»',
    });
    await expect(
      nav.getByRole('link', { name: 'Заняття', exact: true }),
    ).toHaveAttribute('aria-current', 'page');
    await expect(page.locator('.course-groups > section > h2')).toHaveText([
      '3 клас',
      '4 клас',
    ]);
    await expect(page.locator('.course-groups a.card')).toHaveCount(6);
    await expect(
      page.locator(
        'a.card[href="#/3a/info/kb3"],a.card[href="#/4a/info/win4"]',
      ),
    ).toHaveCount(0);
    await nav.getByRole('link', { name: 'Інструменти', exact: true }).click();
    await expect(page).toHaveURL(/#\/courses\/info\/tools$/);
    await expect(
      nav.getByRole('link', { name: 'Інструменти', exact: true }),
    ).toHaveAttribute('aria-current', 'page');
    await expect(page.locator('#app a.card')).toHaveCount(2);
    await expect(page.locator('.course-groups')).toHaveCount(0);
    await expect(page).toHaveTitle('Інструменти · Інформатика — StepBy School');
    await page.screenshot({
      path: `test-results/informatics-tools-${width}.png`,
      fullPage: true,
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    await page.goBack();
    await expect(page.locator('.course-groups > section > h2')).toHaveText([
      '3 клас',
      '4 клас',
    ]);
    await page.goForward();
    await expect(page.locator('#app a.card')).toHaveCount(2);
    await page.locator('a.card[href="#/3a/info/kb3"]').click();
    await expect(page.locator('.kbx')).toBeVisible();
    await expect(
      nav.getByRole('link', { name: 'Інструменти', exact: true }),
    ).toHaveAttribute('aria-current', 'page');
    await expect(
      page
        .locator('.crumbs')
        .getByRole('link', { name: 'Інструменти', exact: true }),
    ).toHaveAttribute('href', '#/courses/info/tools');
    await page
      .locator('.crumbs')
      .getByRole('link', { name: 'Інструменти', exact: true })
      .click();
    await page.locator('a.card[href="#/4a/info/win4"]').click();
    await expect(page.locator('.wnx')).toBeVisible();
    await nav.getByRole('link', { name: 'Заняття', exact: true }).click();
    await expect(page.locator('.course-groups a.card')).toHaveCount(6);
    await page.goto(base + '#/3a/info/kb3/caps');
    await expect(page.locator('.kbx')).toBeVisible();
    await page.goto(base + '#/4a/info/win4/11');
    await expect(page.locator('.wnx')).toBeVisible();
    expect(errors).toEqual([]);
  });
}

for (const width of [1366, 390]) {
  test(`breadcrumbs precede course navigation on catalog and document pages at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    const base =
      width === 390
        ? pathToFileURL(path.resolve(__dirname, '../../../../../dist/index.html')).href
        : '/';
    for (const route of [
      '#/3a/info/kb3',
      '#/4a/info/win4',
      '#/3a/info/i3k',
      '#/courses/info',
      '#/courses/info/tools',
      '#/robo/robot/r9',
    ]) {
      await page.goto(base + route);
      const crumbs = page.locator('.crumbs');
      const navigation = page.locator('.course-navigation');
      await expect(crumbs).toBeVisible();
      await expect(navigation).toBeVisible();
      await page.evaluate(() => window.scrollTo(0, 0));
      const breadcrumbBox = await crumbs.boundingBox();
      const navigationBox = await navigation.boundingBox();
      expect(breadcrumbBox.y + breadcrumbBox.height, route).toBeLessThanOrEqual(
        navigationBox.y,
      );
      if (route === '#/3a/info/kb3')
        await page.screenshot({
          path: `test-results/keyboard-navigation-${width}.png`,
        });
    }
  });
}
