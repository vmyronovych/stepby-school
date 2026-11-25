const { test, expect } = require('@playwright/test');
const { cp, mkdtemp, rm } = require('node:fs/promises');
const { tmpdir } = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

test('a copied dist works offline without any repository source files', async ({
  page,
}) => {
  const folder = await mkdtemp(path.join(tmpdir(), 'stepby-offline-'));
  const errors = [],
    requests = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (/^https?:/.test(request.url())) requests.push(request.url());
  });
  try {
    await cp('dist', folder, { recursive: true });
    await page.context().setOffline(true);
    const entry = pathToFileURL(path.join(folder, 'index.html')).href;
    await page.goto(entry + '#/robo/robot/lesson-07');
    await expect(page.locator('.robotics-classroom svg').first()).toBeVisible();
    await page.getByRole('tab', { name: 'Підключення', exact: true }).click();
    await expect
      .poll(() =>
        page
          .locator('.robotics-material-panel:visible img')
          .first()
          .evaluate((image) => image.naturalWidth),
      )
      .toBeGreaterThan(0);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(entry + '#/robo/robot/lesson-08/practice');
    await expect(page.locator('.robotics-practice:visible')).toBeVisible();
    await expect
      .poll(() =>
        page
          .locator('.robotics-practice:visible img')
          .first()
          .evaluate((image) => image.naturalWidth),
      )
      .toBeGreaterThan(0);
    await page.goto(entry + '#/media/literacy');
    await expect
      .poll(() =>
        page
          .locator('img')
          .first()
          .evaluate((image) => image.naturalWidth),
      )
      .toBeGreaterThan(0);
    await page.goto(entry + '#/web/html-css/web-page/web-page-practice');
    await expect(page.locator('#web-source')).toBeVisible();
    expect(errors).toEqual([]);
    expect(requests).toEqual([]);
  } finally {
    await page.goto('about:blank');
    await rm(folder, { recursive: true, force: true });
  }
});
