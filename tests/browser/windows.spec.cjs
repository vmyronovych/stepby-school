const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  page.windowsErrors = [];
  page.on('pageerror', (error) => page.windowsErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') page.windowsErrors.push(message.text());
  });
  await page.goto('/#/4a/info/win4/11');
  await expect(page.locator('#wnDesk')).toBeVisible();
});
test.afterEach(async ({ page }) => expect(page.windowsErrors).toEqual([]));

async function createFolder(page, name) {
  await page.locator('#wnScr').focus();
  await page.keyboard.press('Control+Shift+n');
  const rename = page.locator('[data-fk="ren"]');
  await expect(rename).toBeVisible();
  await rename.fill(name);
  await page.keyboard.press('Enter');
  await expect(rename).toHaveCount(0);
}

test('desktop folder creation, rename, copy, delete and context properties', async ({
  page,
}) => {
  await createFolder(page, 'React Folder');
  const folder = page
    .locator('#wnDesk [data-it]')
    .filter({ has: page.locator('.nm', { hasText: /^React Folder$/ }) });
  await expect(folder).toHaveCount(1);
  await page.keyboard.press('F2');
  await page.locator('[data-fk="ren"]').fill('Renamed Folder');
  await page.keyboard.press('Enter');
  await expect(
    page.locator('#wnDesk .nm', { hasText: /^Renamed Folder$/ }),
  ).toHaveCount(1);
  await page.keyboard.press('Control+c');
  await page.keyboard.press('Control+v');
  await expect(
    page.locator('#wnDesk .nm', { hasText: /^Renamed Folder — копія$/ }),
  ).toHaveCount(1);
  await page.keyboard.press('Delete');
  await expect(
    page.locator('#wnDesk .nm', { hasText: /^Renamed Folder — копія$/ }),
  ).toHaveCount(0);
  const renamed = page
    .locator('#wnDesk [data-it]')
    .filter({ has: page.locator('.nm', { hasText: /^Renamed Folder$/ }) });
  await renamed.click({ button: 'right' });
  await expect(page.locator('#wnMenu')).toBeVisible();
  await page
    .locator('#wnMenu .mi')
    .filter({ has: page.locator('.mt', { hasText: /^Властивості$/ }) })
    .click();
  await expect(page.locator('#wnWins .k-props')).toBeVisible();
  await page.locator('#wnWins .k-props .cap[data-a="close"]').click();
  await expect(page.locator('#wnWins .k-props')).toHaveCount(0);
  await renamed.dblclick();
  await expect(page.locator('#wnWins .k-exp')).toBeVisible();
  await expect(page.locator('#wnWins .k-exp')).toContainText('Renamed Folder');
  await createFolder(page, 'Inside Folder');
  await expect(
    page.locator('#wnWins .k-exp .nm', { hasText: /^Inside Folder$/ }),
  ).toHaveCount(1);
});

test('Notepad save dialog, explorer search and window lifecycle', async ({
  page,
}) => {
  await page.locator('#wnBar [data-a="start"]').click();
  await page.locator('#wnStart [data-a="app"][data-v="notepad"]').click();
  const note = page.locator('#wnWins .a-notepad');
  await expect(note).toBeVisible();
  await note.locator('textarea.np-t').fill('React notebook text');
  await note.locator('textarea.np-t').focus();
  await page.keyboard.press('Control+s');
  const save = page.locator('#wnWins .k-save');
  await expect(save).toBeVisible();
  await save.locator('[data-fk^="sn"]').fill('react-note.txt');
  await page.keyboard.press('Enter');
  await expect(save).toHaveCount(0);
  await expect(note).toContainText('react-note');
  await expect(note.locator('textarea.np-t')).toHaveValue(
    'React notebook text',
  );
  await page.locator('[data-wnc="wine"]').click();
  const explorer = page.locator('#wnWins .k-exp');
  await expect(explorer).toBeVisible();
  await explorer.locator('[data-fk^="q"]').fill('react-note');
  await expect(explorer.locator('.it')).toHaveCount(1);
  await expect(explorer).toContainText('react-note');
  await explorer.locator('[data-a="max"]').click();
  await expect(explorer).toHaveClass(/max/);
  await explorer.locator('[data-a="max"]').click();
  await expect(explorer).not.toHaveClass(/max/);
  await page.locator('[data-wnc="ver"][data-v="10"]').click();
  await expect(note.locator('textarea.np-t')).toHaveValue(
    'React notebook text',
  );
  await page.locator('.logo').click();
  await expect(page.locator('h1')).toContainText('Оберіть клас');
  await page.goBack();
  await expect(note.locator('textarea.np-t')).toHaveValue(
    'React notebook text',
  );
  await page.screenshot({
    path: 'test-results/windows-react.png',
    fullPage: true,
  });
});
