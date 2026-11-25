const { test, expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const lesson = '#/media/literacy/safety/robux';

test('all illustrated conversations load offline and fit a phone screen', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const file = pathToFileURL(path.resolve('dist/index.html')).href;
  await page.setViewportSize({ width: 390, height: 844 });
  let conversations = 0;
  for (const topic of [
    'truth',
    'publishing',
    'games',
    'safety',
    'safety/robux',
  ]) {
    for (const practice of [false, true]) {
      const route = practice
        ? topic === 'safety/robux'
          ? 'safety/robux-student'
          : topic + '/student'
        : topic;
      await page.goto(file + '#/media/literacy/' + route);
      const tabs = page.locator(
        practice ? '.media-story-nav button' : '.media-projector-scenes button',
      );
      for (let i = 0; i < (await tabs.count()); i++) {
        await tabs.nth(i).click();
        const comic = page.locator(
          practice
            ? '.media-practice:visible .media-comic'
            : '.media-projector .media-comic',
        );
        if (!(await comic.count())) continue;
        conversations++;
        const images = comic.locator('img');
        await expect
          .poll(() =>
            images.evaluateAll(
              (items) =>
                items.length > 0 &&
                items.every((img) => img.complete && img.naturalWidth >= 1024),
            ),
          )
          .toBe(true);
        expect(
          await comic.locator('.media-comic-balloon').count(),
        ).toBeGreaterThanOrEqual(2);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
    }
  }
  expect(conversations).toBe(11);
  expect(errors).toEqual([]);
});

test('classroom is default, reveals explanations on demand, and allows free navigation', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/' + lesson);
  await expect(
    page.getByRole('link', { name: 'Разом у класі', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
  const board = page.locator('.media-projector');
  await expect(board.locator('.media-chat')).toBeVisible();
  await expect(board.locator('textarea,input')).toHaveCount(0);
  await board
    .getByRole('button', { name: 'Обираємо дію', exact: true })
    .click();
  await expect(board.locator('.media-feedback')).toHaveCount(0);
  await board.getByRole('button', { name: 'Показати пояснення' }).click();
  await expect(board.locator('.media-feedback')).toBeVisible();
  await board.locator('.media-projector-scenes button').last().click();
  await expect(board.locator('.media-slide')).toContainText('5 із 5');
  await board
    .getByRole('button', { name: 'Перейти до практики', exact: true })
    .click();
  await expect(board.locator('.media-qr')).toBeVisible();
  const target = await board
    .getByRole('link', { name: 'Відкрити практику', exact: true })
    .getAttribute('href');
  expect(target).toContain('/robux-student');
  await page.goto(target);
  await expect(page.locator('.media-student-only')).toBeVisible();
  await expect(
    page.locator(
      '.media-mode-nav,.media-lesson-services,.topbar,.media-teacher-plan,.crumbs',
    ),
  ).toHaveCount(0);
  await expect(page.getByRole('link', { name: /вчителя/ })).toHaveCount(0);
  await page.reload();
  await expect(page.locator('.media-student-only')).toBeVisible();
  expect(errors).toEqual([]);
});

test('practice and teacher routes support browser history without losing practice answers', async ({
  page,
}) => {
  await page.goto('/' + lesson);
  await page.getByRole('link', { name: 'Практика учня', exact: true }).click();
  const practice = page.locator('.media-practice:visible');
  await practice.locator('.media-choice').first().click();
  await page.getByRole('link', { name: 'Матеріали для вчителя' }).click();
  await expect(
    page.getByRole('heading', { name: 'Хід уроку', exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(practice.locator('.media-choice').first()).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.goBack();
  await expect(page.locator('.media-projector')).toBeVisible();
});

test('local QR targets the exact file and opens isolated practice at a narrow viewport', async ({
  page,
}) => {
  const file = pathToFileURL(path.resolve('dist/index.html')).href;
  await page.goto(file + lesson);
  await page
    .locator('.media-projector')
    .getByRole('button', { name: 'Перейти до практики', exact: true })
    .click();
  await expect(
    page.getByRole('link', { name: 'Відкрити практику', exact: true }),
  ).toHaveAttribute('href', file + '#/media/literacy/safety/robux-student');
  await page
    .getByRole('link', { name: 'Відкрити практику', exact: true })
    .click();
  await page.setViewportSize({ width: 360, height: 800 });
  await expect(page.locator('.media-stage .media-choice')).toHaveCount(3);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test('each theme has classroom, isolated student practice and teacher guidance', async ({
  page,
}) => {
  for (const id of ['truth', 'publishing', 'games', 'safety']) {
    await page.goto('/#/media/literacy/' + id);
    await expect(page.locator('.media-projector')).toBeVisible();
    const crumbs = page.locator('.crumbs');
    await expect(crumbs).toBeVisible();
    await expect(
      crumbs.getByRole('link', { name: 'Головна', exact: true }),
    ).toHaveAttribute('href', '#/');
    await crumbs
      .getByRole('link', { name: 'Медіаграмотність', exact: true })
      .click();
    await expect(page).toHaveURL(/#\/courses\/literacy$/);
    await page.goBack();
    await expect(crumbs).toBeVisible();
    await page
      .getByRole('link', { name: 'Практика учня', exact: true })
      .click();
    await expect(crumbs).toBeVisible();
    await page.getByRole('link', { name: 'Матеріали для вчителя' }).click();
    await expect(crumbs).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'План заняття · 45 хвилин' }),
    ).toBeVisible();
    await page.goto('/#/media/literacy/' + id + '/student');
    await expect(page.locator('.media-choice')).not.toHaveCount(0);
    await page
      .getByRole('group', { name: 'Обери дію', exact: true })
      .getByRole('button')
      .first()
      .click();
    await expect(page.locator('.media-feedback')).toHaveCount(0);
    await page
      .getByRole('group', { name: 'Обери пояснення', exact: true })
      .getByRole('button')
      .first()
      .click();
    await page.getByRole('button', { name: 'Перевірити', exact: true }).click();
    await expect(page.locator('.media-feedback')).toBeVisible();
    await expect(
      page.locator(
        '.media-teacher-plan,.media-mode-nav,.media-projector,.crumbs',
      ),
    ).toHaveCount(0);
  }
});

test('practice checks action and reason together and retains attempts between tasks', async ({
  page,
}) => {
  await page.goto('/#/media/literacy/truth/student');
  const actions = page.getByRole('group', { name: 'Обери дію', exact: true });
  await actions.getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Перевірити', exact: true }).click();
  await expect(
    page.locator('.media-practice').getByRole('status'),
  ).toContainText('чому ти так думаєш?');
  const reasons = page.getByRole('group', {
    name: 'Обери пояснення',
    exact: true,
  });
  await expect(
    page.getByRole('heading', { name: '2. Чому ти так думаєш?', exact: true }),
  ).toBeVisible();
  await reasons.getByRole('button').nth(1).click();
  await expect(page.locator('.media-practice-mismatch')).toHaveCount(0);
  await page.getByRole('button', { name: 'Перевірити', exact: true }).click();
  await expect(page.locator('.media-feedback')).toHaveAttribute(
    'data-success',
    'false',
  );
  await expect(page.locator('.media-feedback')).toContainText(
    'Дія підходить. Розберімо твоє пояснення.',
  );
  await expect(page.locator('.media-feedback p')).toHaveCount(1);
  await reasons.getByRole('button').nth(0).click();
  await page.getByRole('button', { name: 'Перевірити', exact: true }).click();
  await expect(page.locator('.media-feedback')).toHaveAttribute(
    'data-success',
    'true',
  );
  await page.getByRole('button', { name: 'Наступне завдання' }).click();
  await expect(
    page.getByRole('group', { name: 'Обери пояснення', exact: true }),
  ).toHaveCount(0);
  await page.getByRole('button', { name: 'Попереднє завдання' }).click();
  await expect(page.locator('.media-feedback')).toHaveAttribute(
    'data-success',
    'true',
  );
  await actions.getByRole('button').nth(0).click();
  await expect(reasons.locator('[aria-pressed="true"]')).toHaveCount(0);
  await expect(page.locator('.media-feedback')).toHaveCount(0);
});

test('craft photo can be enlarged, inspected on mobile and closed with keyboard offline', async ({
  page,
}) => {
  const file = pathToFileURL(path.resolve('dist/index.html')).href;
  await page.goto(file + '#/media/literacy/publishing');
  await page
    .getByRole('button', {
      name: '2. Що видно на задньому плані?',
      exact: true,
    })
    .click();
  const panels = page.locator('.media-projector .media-comic-illustration');
  await expect(panels).toHaveCount(2);
  await expect
    .poll(() =>
      panels.evaluateAll((images) =>
        images.every((img) => img.complete && img.naturalWidth >= 1024),
      ),
    )
    .toBe(true);
  await expect(
    page.locator('.media-projector .media-comic-balloon').first(),
  ).toContainText('Хочу показати друзям');
  await expect(
    page.locator('.media-projector .media-comic-balloon').nth(1),
  ).toContainText('Подивімося разом');
  const photo = page.locator('.media-photo-open img');
  await expect(photo).toBeVisible();
  expect(
    await photo.evaluate((img) => img.complete && img.naturalWidth >= 1024),
  ).toBe(true);
  const open = page.getByRole('button', {
    name: 'Розглянути фото на весь екран',
    exact: true,
  });
  await open.click();
  const dialog = page.getByRole('dialog', { name: 'Розглядаємо фото Данила' });
  await expect(dialog).toBeVisible();
  await page
    .getByRole('button', { name: 'Збільшити деталі', exact: true })
    .click();
  await page.setViewportSize({ width: 390, height: 844 });
  const viewport = dialog.locator('.media-photo-viewport');
  expect(await viewport.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(
    true,
  );
  await viewport.evaluate((el) => {
    el.scrollLeft = el.scrollWidth;
  });
  expect(await viewport.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(open).toBeFocused();
  await open.click();
  await expect(
    dialog.getByRole('button', { name: 'Збільшити деталі', exact: true }),
  ).toHaveAttribute('aria-pressed', 'false');
  await dialog.getByRole('button', { name: 'Закрити', exact: false }).click();
  await expect(dialog).not.toBeVisible();
});
