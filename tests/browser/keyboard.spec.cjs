const { test, expect } = require('@playwright/test');

async function expectText(page, text) {
  await expect
    .poll(() =>
      page
        .locator('#kbType [data-i]')
        .allTextContents()
        .then((characters) => characters.join('')),
    )
    .toBe(text);
}

test.beforeEach(async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.keyboardErrors = errors;
  await page.goto('/#/3a/info/kb3');
  await expect(
    page.getByRole('region', { name: 'Клавіатура і групи клавіш' }),
  ).toBeVisible();
});
test.afterEach(async ({ page }) => expect(page.keyboardErrors).toEqual([]));

test('React typing area supports selection, clipboard, undo, deletion ghosts and overwrite', async ({
  page,
}) => {
  await page.keyboard.type('abc def');
  await expectText(page, 'abc def');
  await page.keyboard.press('Control+Home');
  await page.keyboard.press('Control+Shift+ArrowRight');
  await expect(page.locator('#kbType [data-i].sel')).toHaveCount(4);
  await page.keyboard.press('Control+c');
  await page.keyboard.press('End');
  await page.keyboard.press('Control+v');
  await expectText(page, 'abc defabc ');
  await page.keyboard.press('Control+z');
  await expectText(page, 'abc def');
  await page.keyboard.press('Control+Home');
  await page.keyboard.press('Delete');
  await expectText(page, 'bc def');
  await expect(page.locator('#kbType .ghost')).toHaveText('a');
  await expect(page.locator('#kbType .ghost')).toHaveCount(0);
  await page.keyboard.press('Insert');
  await expect(page.locator('#kbMode')).toContainText('Режим заміни');
  await page.keyboard.type('x');
  await expectText(page, 'xc def');
  await expect(page.locator('#kbType .car')).toHaveClass(/ovr/);
  await page.keyboard.press('Insert');
  await page.keyboard.press('Control+a');
  await page.keyboard.press('Backspace');
  await expectText(page, '');
  await expect(page.locator('#kbType .ph')).toBeVisible();
});

test('preset chips, physical key highlights, LEDs and on-screen descriptions use React', async ({
  page,
}) => {
  await page.locator('[data-kbf="caps"]').click();
  await expect(page).toHaveURL(/\/caps$/);
  await expect(page.locator('[data-kbf="caps"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.locator('#kbBoard .key.on')).toHaveCount(3);
  await page.keyboard.down('a');
  await expect(page.locator('[data-code="KeyA"]')).toHaveClass(/down/);
  await expect(page.locator('#kbLang')).toHaveText('ENG');
  await page.keyboard.up('a');
  await expect(page.locator('[data-code="KeyA"]')).not.toHaveClass(/down/);
  await page.keyboard.press('CapsLock');
  await expect(page.locator('#kbInfo')).toContainText('Вмикає ВЕЛИКІ');
  // Browser automation cannot toggle host lock keys. Verify reported modifier state with native events.
  await page.evaluate(() => {
    for (const type of ['keydown', 'keyup']) {
      document.dispatchEvent(
        new KeyboardEvent(type, {
          key: 'NumLock',
          code: 'NumLock',
          bubbles: true,
          modifierCapsLock: true,
          modifierNumLock: true,
        }),
      );
    }
  });
  await expect(page.locator('#ledCaps')).toHaveClass(/on/);
  await expect(page.locator('#ledNum')).toHaveClass(/on/);
  await page.locator('[data-kbf="num"]').click();
  await expect(page).toHaveURL(/\/num$/);
  await expect(page.locator('[data-kbf="num"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.locator('#kbBoard .key.g-num.on')).toHaveCount(27);
  await expectText(page, 'a');
  await page.locator('[data-code="Enter"]').click();
  await expect(page.locator('#kbInfo')).toContainText('Новий рядок');
  await expect(page.locator('[data-code="Enter"]')).toHaveClass(/sel/);
  await expectText(page, 'a');
  await expect(
    page.locator('.kbx [onclick], .kbx [oninput], .kbx [onchange]'),
  ).toHaveCount(0);
});

test('mouse placement moves the text caret and preset changes preserve the editor', async ({
  page,
}) => {
  await page.keyboard.type('abc');
  const first = page.locator('#kbType [data-i="0"]');
  await first.click({ position: { x: 1, y: 5 } });
  await page.keyboard.type('z');
  await expectText(page, 'zabc');
  await page.keyboard.press('End');
  await page.keyboard.press('Enter');
  await page.keyboard.type('line');
  await expectText(page, 'zabc\nline');
  await page.locator('[data-kbf="bsdel"]').click();
  await expect(page).toHaveURL(/\/bsdel$/);
  await expectText(page, 'zabc\nline');
  await page.keyboard.press('Home');
  await page.keyboard.press('Shift+End');
  await expect(page.locator('#kbType [data-i].sel')).toHaveCount(4);
  await page.keyboard.type('next');
  await expectText(page, 'zabc\nnext');
  await page.locator('#kbClear').click();
  await expectText(page, '');
  await page.keyboard.press('Control+z');
  await expectText(page, 'zabc\nnext');
});

test('navigation removes keyboard listeners and releases held keys before remount', async ({
  page,
}) => {
  await page.keyboard.type('abc');
  await page.keyboard.down('Shift');
  await expect(page.locator('[data-code="ShiftLeft"]')).toHaveClass(/down/);
  await page.evaluate(() => StepBySchool.navigate('#/'));
  await expect(page.locator('h1.page')).toContainText('Оберіть клас');
  await page.keyboard.up('Shift');
  await page.keyboard.type('ignored');
  await page.evaluate(() => StepBySchool.navigate('#/tool/add'));
  await expect(page.locator('#i_a')).toBeVisible();
  await page.locator('#i_a').fill('123');
  await expect(page.locator('#i_a')).toHaveValue('123');
  await page.evaluate(() => StepBySchool.navigate('#/3a/info/kb3/caps'));
  await expect(page.locator('#kbBoard')).toBeVisible();
  await expectText(page, 'abc');
  await expect(page.locator('#kbBoard .key.down')).toHaveCount(0);
  await page.keyboard.type('d');
  await expectText(page, 'abcd');
});
