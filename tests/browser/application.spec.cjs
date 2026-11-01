const { test, expect } = require('@playwright/test');

test('one local bundle owns the app without classic globals or inline handlers', async ({
  page,
}) => {
  const requests = [];
  const errors = [];
  page.on('request', (request) => {
    if (request.resourceType() === 'script')
      requests.push(new URL(request.url()).pathname);
  });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('#root > .topbar')).toBeVisible();
  await expect(page.locator('#root > #app')).toBeVisible();
  expect(requests).toEqual(['/assets/app.js']);
  expect(
    await page.evaluate(() =>
      ['DB', 'DOCS', 'S', 'ReactUI', 'render', 'route', 'domIns'].filter(
        (key) => key in window,
      ),
    ),
  ).toEqual([]);
  await page.goto('/#/tool/domain');
  await expect(page.locator('#i_f')).toBeVisible();
  await expect(page.locator('[onclick], [onchange], [oninput]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('invalid routes, malformed encoding and legacy anchors resolve safely', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/%E0%A4%A');
  await expect(page.locator('h1')).toHaveText('Оберіть клас 👋');
  await page.goto('/#/5a/ukr');
  await expect(page).toHaveURL(/#\/5a$/);
  await expect(page.locator('h1')).toContainText('Предмети');
  await page.goto('/#mod1-3');
  await expect(page).toHaveURL(/#\/robo\/robot\/[^/]+\/mod1-3$/);
  await expect(page.locator('#mod1-3')).toBeVisible();
  await page.goto('/#/tool/missing');
  await expect(page).toHaveURL(/#\/$/);
  expect(errors).toEqual([]);
});

test('task title, custom condition and history remain in sync', async ({
  page,
}) => {
  await page.goto('/#/5a/math/t1');
  await page.locator('a.btn').filter({ hasText: 'Розв’язати' }).first().click();
  await expect(page).toHaveTitle(/— StepBy School/);
  await page.locator('#i_a').fill('7');
  await page.locator('#i_b').fill('5');
  await page.getByRole('button', { name: 'Показати розв’язання' }).click();
  await expect(page).toHaveURL(/\?c=/);
  await page.goBack();
  await expect(page).toHaveURL(/#\/5a\/math\/t1$/);
  await expect(page.locator('h1')).toBeVisible();
  await page.goForward();
  await expect(page.locator('#i_a')).toHaveValue('7');
  await expect(page.locator('#i_b')).toHaveValue('5');
});
