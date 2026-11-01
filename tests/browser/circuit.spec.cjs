const { test, expect } = require('@playwright/test');

test('React circuit controls add, edit, wire, undo and preserve the drawing', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('/#/robo/robot/r9');
  await expect(page.locator('#cbSvg')).toBeVisible();
  const parts = page.locator('#cbParts [data-part]');
  const initial = await parts.count();
  await page.locator('[data-add="resistor"]').click();
  await expect(parts).toHaveCount(initial + 1);
  await page.locator('#cbUndo').click();
  await expect(parts).toHaveCount(initial);
  await page.locator('#cbRedo').click();
  await expect(parts).toHaveCount(initial + 1);
  const resistorBox = await parts.last().locator('.resBody').boundingBox();
  await page.mouse.click(
    resistorBox.x + resistorBox.width / 2,
    resistorBox.y + resistorBox.height / 2,
    { button: 'right' },
  );
  await expect(page.locator('#cbPop')).toBeVisible();
  const parameter = page.locator('#cbPop [data-key]').last();
  await parameter.click();
  await expect(parameter).toHaveClass(/on/);
  await page.locator('#cbPop [data-act="rot"]').click();
  await expect(page.locator('#cbPop')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#cbPop')).toBeHidden();

  await page.locator('#cbClear').click();
  await expect(parts).toHaveCount(1);
  await page.locator('[data-add="resistor"]').click();
  await expect(parts).toHaveCount(2);
  const terminals = await page
    .locator('#cbTerms [data-term]')
    .evaluateAll((items) =>
      items.map((item) => item.getAttribute('data-term')),
    );
  await page.locator(`[data-term="${terminals[0]}"]`).click();
  await page.locator(`[data-term="${terminals[2]}"]`).click();
  await expect(page.locator('#cbWires [data-wire]')).toHaveCount(1);
  await page.keyboard.press('ControlOrMeta+z');
  await expect(page.locator('#cbWires [data-wire]')).toHaveCount(0);
  await page.keyboard.press('ControlOrMeta+Shift+z');
  await expect(page.locator('#cbWires [data-wire]')).toHaveCount(1);
  await page.locator('[data-view="bb"]').click();
  await expect(page.locator('#cbMain')).toHaveClass(/bb/);
  await page.locator('[data-view="schem"]').click();
  await expect(parts).toHaveCount(2);

  await page.locator('.logo').click();
  await expect(page.locator('h1')).toContainText('Оберіть клас');
  await page.keyboard.press('ControlOrMeta+z');
  await page.goBack();
  await expect(parts).toHaveCount(2);
  await expect(page.locator('#cbWires [data-wire]')).toHaveCount(1);
  await page.locator('[data-add="resistor"]').click();
  await expect(parts).toHaveCount(3);
  expect(errors).toEqual([]);
  await page.screenshot({
    path: 'test-results/circuit-react.png',
    fullPage: true,
  });
});
