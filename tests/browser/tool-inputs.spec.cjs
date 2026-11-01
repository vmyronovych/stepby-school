const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.testErrors = errors;
  await page.emulateMedia({ reducedMotion: 'reduce' });
});
test.afterEach(async ({ page }) => expect(page.testErrors).toEqual([]));

async function submitInputs(page) {
  const revision = await page.evaluate(
    () => StepBySchool.getSnapshot().revision,
  );
  await page.getByRole('button', { name: 'Показати розв’язання' }).click();
  await expect
    .poll(() => page.evaluate(() => StepBySchool.getSnapshot().revision))
    .toBeGreaterThan(revision);
  await expect(page.locator('.step-count')).toContainText('Крок 1');
  await expect(page.locator('.paper.sheet > .empty')).toHaveCount(0);
  expect(await page.evaluate(() => !!StepBySchool.getSnapshot().model)).toBe(
    true,
  );
}

async function finishSteps(page) {
  await page.evaluate(() =>
    StepBySchool.changeStep(StepBySchool.getSnapshot().steps.length - 1),
  );
  await expect(
    page.getByRole('button', { name: 'Далі →', exact: true }),
  ).toBeDisabled();
}

test('all 16 registered tools submit their React input defaults', async ({
  page,
}) => {
  await page.goto('/');
  const toolIds = await page.evaluate(() =>
    Object.keys(StepBySchool.getCatalog().tools).sort(),
  );
  expect(toolIds).toHaveLength(16);
  for (const id of toolIds) {
    await page.goto('/#/tool/' + id);
    await expect(page.locator('#toolInputs')).toBeVisible();
    await expect(
      page.locator(
        '#toolInputs [onclick], #toolInputs [oninput], #toolInputs [onchange]',
      ),
    ).toHaveCount(0);
    await submitInputs(page);
    expect(await page.evaluate(() => StepBySchool.getSnapshot().tool), id).toBe(
      id,
    );
    await finishSteps(page);
  }
});

test('fraction operation and optional common-factor fields submit selected values', async ({
  page,
}) => {
  await page.goto('/#/tool/frac');
  await page.locator('#i_a').fill('3');
  await page.locator('#i_b').fill('4');
  await page.locator('#i_op').selectOption('-');
  await page.locator('#i_c').fill('1');
  await page.locator('#i_d').fill('4');
  await submitInputs(page);
  expect(await page.evaluate(() => StepBySchool.getSnapshot().toolCfg)).toEqual(
    { a: 3, b: 4, op: '-', c: 1, d: 4 },
  );
  await finishSteps(page);
  await expect(page.locator('.fdone')).toBeVisible();
  expect(
    await page.evaluate(
      () => StepBySchool.getSnapshot().model.segments.at(-1).units[0],
    ),
  ).toEqual({ type: 'frac', n: 1, d: 2 });
  for (const id of ['nsk', 'nsd']) {
    await page.goto('/#/tool/' + id);
    await page.locator('#i_c').fill('12');
    await submitInputs(page);
    expect(
      await page.evaluate(() => StepBySchool.getSnapshot().toolCfg.c),
    ).toBe(12);
    await page.locator('#i_c').fill('');
    await submitInputs(page);
    expect(
      await page.evaluate(() => StepBySchool.getSnapshot().toolCfg.c),
    ).toBeNull();
  }
});

test('domain formula preview and palette use React handlers and preserve insertion position', async ({
  page,
}) => {
  await page.goto('/#/tool/domain');
  await page.locator('#i_f').fill('x - 2');
  await expect(page.locator('#dprev .fml')).toBeVisible();
  await page.locator('#i_f').evaluate((input) => {
    input.focus();
    input.setSelectionRange(0, 5);
  });
  await page
    .locator('.dpal')
    .getByRole('button', { name: '√', exact: true })
    .click();
  await expect(page.locator('#i_f')).toHaveValue('sqrt()');
  expect(
    await page.locator('#i_f').evaluate((input) => input.selectionStart),
  ).toBe(5);
  await page.keyboard.type('x - 2');
  await expect(page.locator('#i_f')).toHaveValue('sqrt(x - 2)');
  await expect(page.locator('#dprev .fml')).toBeVisible();
  await submitInputs(page);
  expect(await page.evaluate(() => StepBySchool.getSnapshot().toolCfg)).toEqual(
    { f: 'sqrt(x - 2)' },
  );
  await page.locator('#i_f').fill('sqrt(');
  await expect(page.locator('#dprev .dprev-err')).toBeVisible();
});

test('equation and irrational method fields submit custom values', async ({
  page,
}) => {
  await page.goto('/#/tool/eq');
  await page.locator('#i_text').fill('3x + 5 = 20');
  await submitInputs(page);
  await finishSteps(page);
  await expect(page.locator('.explain')).toContainText('5');
  await page.goto('/#/tool/irrational');
  await page.locator('#i_irmethod').selectOption('substitution');
  await page.locator('#i_irtext').fill('x - 3sqrt(x) + 2 = 0');
  await submitInputs(page);
  expect(await page.evaluate(() => StepBySchool.getSnapshot().toolCfg)).toEqual(
    { method: 'substitution', text: 'x - 3sqrt(x) + 2 = 0' },
  );
  await finishSteps(page);
  await expect(page.locator('.explain')).toContainText('4');
});

test('example selects map to rational-power, vector-scaling and scalar-product configs', async ({
  page,
}) => {
  const cases = [
    {
      tool: 'rational-power',
      field: '#i_rpexample',
      value: '6.13',
      config: { example: '6.13' },
    },
    {
      tool: 'vector-scaling',
      field: '#i_vsexample',
      value: '5',
      config: { example: 5 },
    },
    {
      tool: 'scalar-product',
      field: '#i_spexample',
      value: '10',
      config: { group: 4, part: 1 },
    },
  ];
  for (const item of cases) {
    await page.goto('/#/tool/' + item.tool);
    await page.locator(item.field).selectOption(item.value);
    await submitInputs(page);
    expect(
      await page.evaluate(() => StepBySchool.getSnapshot().toolCfg),
    ).toEqual(item.config);
    await expect(page.locator(item.field)).toHaveValue(item.value);
    await finishSteps(page);
  }
});
