const { test, expect } = require('@playwright/test');

async function navigate(page, href) {
  await page.evaluate((target) => StepBySchool.navigate(target), href);
  await expect(page).toHaveURL(
    new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$'),
  );
}

test.beforeEach(async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.documentErrors = errors;
});

test.afterEach(async ({ page }) => {
  expect(page.documentErrors).toEqual([]);
});

test('every document route mounts through the React document page', async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto('/');
  const documents = await page.evaluate(() =>
    StepBySchool.getCatalog()
      .topics.filter((topic) => topic.doc)
      .map((topic) => ({
        href: `#/${topic.cls}/${topic.subject}/${topic.id}`,
        title: topic.title,
        id: topic.id,
      })),
  );
  expect(documents.length).toBeGreaterThan(20);
  for (const document of documents) {
    await navigate(page, document.href);
    await expect(page.locator('#roboBody'), document.id).toBeVisible();
    await expect(
      page.locator('#roboBody h1.page'),
      document.id,
    ).not.toBeEmpty();
    await expect(page.locator('.crumbs'), document.id).toContainText(
      document.title,
    );
    await expect(page.locator('#roboBody'), document.id).not.toContainText(
      'Розділ не знайдено',
    );
  }
});

test('vector controls and independent practice remain interactive', async ({
  page,
}) => {
  await page.goto('/#/9a/geometry/vectors');
  await page.locator('[name="vec-preset"]').selectOption('zeros');
  await expect(page.locator('.vec-zero-note')).toContainText('нульов');
  await page.locator('[name="vec-preset"]').selectOption('equal');
  await page.locator('[name="vec-point"]').selectOption('1');
  const before = await page.locator('[data-length="ab"]').textContent();
  await page.getByRole('button', { name: 'Праворуч', exact: true }).click();
  await expect(page.locator('[data-length="ab"]')).not.toHaveText(before);
  await page.locator('.vec-problem-form [name="vec-answer"]').fill('6');
  await page
    .locator('.vec-problem-form')
    .getByRole('button', { name: 'Перевірити', exact: true })
    .click();
  await expect(page.locator('.vec-answer-feedback')).toContainText('Правильно');
  await expect(page.locator('.vec-practice-head .pill')).toContainText(
    'Розв’язано 1',
  );
  await page.locator('[data-problem="2"]').click();
  await page.locator('.vec-problem-form [value="opposite"]').check();
  await page
    .locator('.vec-problem-form')
    .getByRole('button', { name: 'Перевірити', exact: true })
    .click();
  await expect(page.locator('.vec-answer-feedback')).toContainText('Правильно');
});

test('vector scaling and scalar product diagrams respond to their controls', async ({
  page,
}) => {
  await page.goto('/#/9a/geometry/vector-scaling');
  await page.locator('[data-action="opposite"]').click();
  await expect(page.locator('.vec-results')).toContainText(
    'Протилежно напрямлені',
  );
  await page.locator('[data-action="zero"]').click();
  await expect(page.locator('.vec-results')).toContainText(
    'Нульовий вектор не має напряму',
  );
  await page.locator('[data-action="reset"]').click();
  await expect(page.locator('#vs-k-value')).toHaveText('2');
  await navigate(page, '#/9a/geometry/scalar-product');
  await page.locator('[data-angle="90"]').click();
  await expect(page.locator('.sp-live-result')).toContainText(
    'Вектори перпендикулярні',
  );
  await page.locator('[data-angle="180"]').click();
  await expect(page.locator('.sp-live-result')).toContainText(
    'Добуток від’ємний',
  );
  await expect(page.locator('.sp-practice a.btn')).toHaveCount(11);
});

test('keyboard presets retain typed text and release keyboard handling when leaving', async ({
  page,
}) => {
  await page.goto('/#/3a/info/kb3/caps');
  await expect(page.locator('[data-kbf="caps"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.keyboard.type('abc');
  await expect(page.locator('#kbType')).toContainText('abc');
  await page.locator('[data-kbf="bsdel"]').click();
  await expect(page).toHaveURL(/#\/3a\/info\/kb3\/bsdel$/);
  await expect(page.locator('#kbType')).toContainText('abc');
  await expect(page.locator('[data-kbf="bsdel"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await navigate(page, '#/tool/add');
  await page.locator('#i_a').fill('123');
  await expect(page.locator('#i_a')).toHaveValue('123');
});

test('Windows windows survive version preset changes and close normally', async ({
  page,
}) => {
  await page.goto('/#/4a/info/win4/10');
  await page.locator('[data-wnc="wine"]').click();
  await expect(page.locator('#wnWins .wn-win.k-exp')).toHaveCount(1);
  await page.locator('[data-wnc="ver"][data-v="11"]').click();
  await expect(page).toHaveURL(/#\/4a\/info\/win4\/11$/);
  await expect(page.locator('[data-wnc="ver"][data-v="11"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.locator('#wnWins .wn-win.k-exp')).toHaveCount(1);
  await page.locator('#wnWins .wn-win.k-exp [data-a="max"]').click();
  await expect(page.locator('#wnWins .wn-win.k-exp')).toHaveClass(/max/);
  await page.locator('#wnWins .wn-win.k-exp [data-a="close"]').click();
  await expect(page.locator('#wnWins .wn-win')).toHaveCount(0);
  await page.locator('#wnBar [data-a="start"]').click();
  await expect(page.locator('#wnStart')).not.toBeEmpty();
});

test('circuit views and component state persist across React route changes', async ({
  page,
}) => {
  await page.goto('/#/robo/robot/r9');
  await expect(page.locator('#cbSvg')).toBeVisible();
  const initialParts = await page.locator('#cbParts [data-part]').count();
  expect(initialParts).toBeGreaterThan(0);
  await page.locator('[data-view="bb"]').click();
  await expect(page.locator('#cbMain')).toHaveClass(/bb/);
  await navigate(page, '#/');
  await expect(page.locator('h1.page')).toContainText('Оберіть клас');
  await navigate(page, '#/robo/robot/r9');
  await expect(page.locator('#cbMain')).toHaveClass(/bb/);
  await page.locator('[data-view="schem"]').click();
  await expect(page.locator('#cbMain')).not.toHaveClass(/bb/);
  await expect(page.locator('#cbParts [data-part]')).toHaveCount(initialParts);
});

test('editable KTP fields persist in memory and clear after confirmation', async ({
  page,
}) => {
  await page.goto('/#/robo/robot/r2');
  const field = page.locator('[contenteditable][data-k="d1"]');
  await field.fill('31.10.2026');
  await page.locator('h1.page').click();
  await navigate(page, '#/');
  await expect(page.locator('h1.page')).toContainText('Оберіть клас');
  await navigate(page, '#/robo/robot/r2');
  await expect(field).toHaveText('31.10.2026');
  page.once('dialog', (dialog) => dialog.accept());
  await page.locator('#ktpClear').click();
  await expect(field).toBeEmpty();
  await expect(page.locator('#toast')).toContainText('Поля КТП очищено');
});

test('figures open a React lightbox, preserve article state, and close with Escape', async ({
  page,
}) => {
  await page.goto('/#/robo/robot/r5');
  await page.locator('#roboBody').evaluate((body) => {
    body.dataset.retained = 'yes';
  });
  await page.locator('#roboBody figure.fig').first().click();
  await expect(page.locator('#roboLightbox')).toHaveClass(/on/);
  await expect(page.locator('#roboLightbox svg')).toBeVisible();
  await expect(page.locator('#roboBody')).toHaveAttribute(
    'data-retained',
    'yes',
  );
  await page.keyboard.press('Escape');
  await expect(page.locator('#roboLightbox')).not.toHaveClass(/on/);
});

test('document print actions open printable content and NIT export downloads an xlsx', async ({
  page,
}) => {
  await page.goto('/#/robo/robot/r3');
  const popupEvent = page.waitForEvent('popup');
  await page.locator('#rulesCard').click();
  const popup = await popupEvent;
  await expect(popup.locator('h1')).toHaveText('Правила нашого гуртка');
  await expect(popup.locator('.r')).toHaveCount(6);
  await popup.close();
  await navigate(page, '#/4a/info/i4k');
  const downloadEvent = page.waitForEvent('download');
  await page.locator('[data-nit="s1"]').click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toMatch(/Інформатика-4-клас.*\.xlsx$/);
  expect(await download.failure()).toBeNull();
});
