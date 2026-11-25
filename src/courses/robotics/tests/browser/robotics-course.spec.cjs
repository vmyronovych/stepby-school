const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
test('student motor and sensor tables scroll inside the panel on narrow phones', async ({
  page,
}) => {
  const entry = pathToFileURL(path.resolve('dist/index.html')).href;
  for (const number of [11, 22]) {
    for (const width of [360, 390]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`${entry}#/robo/robot/lesson-${number}/student`);
      await expect(page.locator('.robotics-student-only')).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        `lesson ${number}, viewport ${width}`,
      ).toBeLessThanOrEqual(width + 1);
      const table = page.locator('.robotics-table-wrap').first();
      const panelWidth = await table.evaluate((el) => el.clientWidth);
      expect(panelWidth).toBeLessThan(width);
      if (width === 360) {
        expect(
          await table.evaluate((el) => {
            el.scrollLeft = el.scrollWidth;
            return el.scrollLeft;
          }),
        ).toBeGreaterThan(0);
      }
    }
  }
});
for (const mobile of [false, true])
  test(`all 32 lessons and four modes: ${mobile ? 'mobile file URL' : 'desktop HTTP'}`, async ({
    page,
  }) => {
    test.setTimeout(180000);
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewportSize(
      mobile ? { width: 390, height: 844 } : { width: 1366, height: 768 },
    );
    await page.goto(
      mobile ? pathToFileURL(path.resolve('dist/index.html')).href : '/',
    );
    for (let n = 1; n <= 32; n++)
      for (const mode of ['classroom', 'practice', 'teacher', 'student']) {
        const hash = `#/robo/robot/lesson-${String(n).padStart(2, '0')}/${mode}`;
        await page.evaluate((h) => StepBySchool.navigate(h), hash);
        await expect(page.locator('.robotics-course h1').first()).toBeVisible();
        await expect(page.locator('.robotics-course')).not.toContainText(
          'Матеріали цього заняття ще готуються',
        );
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          hash,
        ).toBe(true);
        if (mode === 'classroom') {
          const classroom = page.locator('.robotics-classroom:visible');
          const steps = classroom.locator('.robotics-steps button');
          await expect(page.locator('.robotics-lesson-bar h1')).toHaveText(
            new RegExp('^' + n + '\\. '),
          );
          await expect(
            page.locator(
              '.robotics-course > .crumbs,.robotics-course > .robotics-nav',
            ),
          ).toHaveCount(0);
          const primary = classroom
            .locator('#cbSvg:visible,img:visible')
            .first();
          const primaryTop = await primary.evaluate(
            (el) => el.getBoundingClientRect().top + window.scrollY,
          );
          expect(primaryTop, hash + ' first teaching visual').toBeLessThan(
            mobile ? 480 : 300,
          );

          const expectedTabs = [1, 2, 4, 5, 31, 32].includes(n)
            ? []
            : n === 3
              ? ['Виріб', 'Схема']
              : n === 7
                ? ['Дослід', 'Підключення', 'Програма']
                : n === 8
                  ? ['Підключення', 'Програма']
                  : n >= 25
                    ? ['Правило руху', 'Програма', 'Підключення']
                    : ['Програма', 'Підключення'];
          await expect(classroom.getByRole('tab')).toHaveText(expectedTabs);
          await expect(classroom.locator('[aria-current="step"]')).toHaveCount(
            0,
          );
          const visualSets = [];
          for (
            let material = 0;
            material < Math.max(1, expectedTabs.length);
            material++
          ) {
            if (expectedTabs.length) await steps.nth(material).click();
            const panel = classroom.locator('.robotics-material-panel:visible');
            await expect(panel).toHaveCount(1);
            if (expectedTabs.length)
              await expect(classroom.getByRole('tabpanel')).toHaveCount(1);
            else await expect(classroom.getByRole('tablist')).toHaveCount(0);
            const images = await panel
              .locator('img:visible')
              .evaluateAll((elements) =>
                elements.map((el) => el.getAttribute('src')),
              );
            const kind = await panel.getAttribute('data-material');
            if (kind === 'experiment') {
              await expect(panel.locator('#cbSvg')).toBeVisible();
              expect(images).toEqual([]);
            } else {
              expect(images.length, hash + ' ' + kind).toBeGreaterThan(0);
              if (kind === 'program')
                expect(
                  images.every((src) => src.includes('-demo-blocks')),
                ).toBe(true);
              else
                expect(images.every((src) => !src.includes('-blocks'))).toBe(
                  true,
                );
              if (kind === 'rule')
                expect(
                  images.every((src) =>
                    /line-(decision|stop-memory)/.test(src),
                  ),
                ).toBe(true);
            }
            visualSets.push(
              kind === 'experiment' ? 'interactive-circuit' : images.join('|'),
            );
            expect(
              await page.evaluate(
                () => document.documentElement.scrollWidth <= innerWidth + 1,
              ),
              hash + ' ' + kind,
            ).toBe(true);
          }
          expect(new Set(visualSets).size, hash + ' distinct materials').toBe(
            visualSets.length,
          );
          if (expectedTabs.length) await steps.first().click();
        }
        if (mode === 'student') {
          await expect(
            page.getByRole('link', {
              name: 'Матеріали для вчителя',
              exact: true,
            }),
          ).toHaveCount(0);
          await expect(page.locator('a[href*="-solution.mcar"]')).toHaveCount(
            0,
          );
          await expect(page.locator('img[src*="solution-blocks"]')).toHaveCount(
            0,
          );
        }
        if (mode === 'teacher') {
          const preparation = page.getByText(
            'Спільна підготовка курсу · обладнання, файли та порядок роботи',
            { exact: true },
          );
          await expect(preparation).toBeVisible();
          await preparation.click();
          const common = page.locator('details').filter({ has: preparation });
          if (n < 6) await expect(common).not.toContainText('Web Serial');
          if (n < 7) await expect(common).not.toContainText('4 × AA');
          expect(
            (await page.locator('.robotics-timeline').allTextContents()).join(
              '\n',
            ),
          ).not.toMatch(
            /План на папері|Робота руками|Перевірка без екрана|Обговорення без екрана|На підставці або папері/,
          );
          if (n === 17)
            await expect(
              page.locator('.robotics-timeline').last(),
            ).toContainText('З’єднайте телефон');
          if (n === 27)
            await expect(
              page.locator('.robotics-timeline').first(),
            ).toContainText('Прочитайте схему станів');
        }
        const broken = await page
          .locator('.robotics-course img')
          .evaluateAll(async (images) => {
            await Promise.all(
              images.map((i) =>
                i.complete
                  ? Promise.resolve()
                  : new Promise((r) => {
                      i.addEventListener('load', r, { once: true });
                      i.addEventListener('error', r, { once: true });
                    }),
              ),
            );
            return images.filter((i) => !i.naturalWidth).map((i) => i.src);
          });
        expect(broken, hash).toEqual([]);
      }
    expect(errors).toEqual([]);
  });
test('new lesson preserves work between modes, resets on lesson change, closes fullscreen and image dialogs', async ({
  page,
}) => {
  await page.goto('/#/robo/robot/lesson-18/practice');
  const practice = page.locator('.robotics-course-practice:visible');
  await practice.getByRole('checkbox').first().check();
  await practice
    .getByRole('button', { name: 'Відкрити наступну підказку' })
    .click();
  await page.getByRole('link', { name: 'Разом у класі', exact: true }).click();
  await page.getByRole('button', { name: /На весь екран/ }).click();
  await expect(
    page.locator('.robotics-lesson-screen:fullscreen'),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Вийти з повного екрана', exact: true })
    .click();
  await page.getByRole('tab', { name: 'Програма', exact: true }).click();
  await page.getByRole('button', { name: 'Збільшити блоки' }).first().click();
  await expect(
    page.getByRole('dialog', { name: 'Блоки програми Mcar' }).first(),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await page
    .getByRole('link', { name: 'Практика в парі', exact: true })
    .click();
  await expect(practice.getByRole('checkbox').first()).toBeChecked();
  await expect(practice.getByText(/1\. /).last()).toBeVisible();
  await page.getByRole('link', { name: 'Заняття 19 →' }).click();
  await page
    .getByRole('link', { name: 'Практика в парі', exact: true })
    .click();
  await expect(
    page
      .locator('.robotics-course-practice:visible')
      .getByRole('checkbox')
      .first(),
  ).not.toBeChecked();
});
test('sound lessons show the new circuit and the wire-game illustration opens on mobile', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(
    pathToFileURL(path.resolve('dist/index.html')).href +
      '#/robo/robot/lesson-02/practice',
  );
  const practice = page.locator('.robotics-course-practice:visible');
  await expect(practice).toContainText('активну пищалку');
  await expect(practice).toContainText('М або Т');
  await page.evaluate(() =>
    StepBySchool.navigate('#/robo/robot/lesson-03/practice'),
  );
  const figure = practice
    .locator('figure')
    .filter({ has: page.locator('img[src$="wire-game-assembly.svg"]') });
  await expect(figure.locator(':scope > img')).toBeVisible();
  await figure
    .getByRole('button', { name: 'Збільшити схему', exact: true })
    .click();
  await expect(figure.getByRole('dialog')).toBeVisible();
  await expect(figure.getByRole('dialog').locator('img')).toBeVisible();
  await page.keyboard.press('Escape');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
});

test('compact lesson header keeps the experiment alive across steps and exits fullscreen on mode change', async ({
  page,
}) => {
  await page.goto('/#/robo/robot/lesson-07');
  const circuit = page.locator('.cb-experiment'),
    motor = circuit.locator('[data-running]');
  await circuit.getByRole('button', { name: 'Керування', exact: true }).click();
  await expect(motor).toHaveAttribute('data-running', 'true');
  await page
    .getByRole('button', { name: 'На весь екран', exact: true })
    .click();
  await expect(
    page.locator('.robotics-lesson-screen:fullscreen'),
  ).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    '7. Як команда доходить до мотора',
  );
  await page.locator('.robotics-steps button').nth(1).click();
  await expect(circuit).toBeHidden();
  const rotor = await motor.locator('.cb-rotor').getAttribute('transform');
  await page.waitForTimeout(100);
  expect(await motor.locator('.cb-rotor').getAttribute('transform')).toBe(
    rotor,
  );
  await page.locator('.robotics-steps button').first().click();
  await expect(circuit).toBeVisible();
  await expect(motor).toHaveAttribute('data-running', 'true');
  await page
    .getByRole('link', { name: 'Практика в парі', exact: true })
    .click();
  await expect(page.locator('.robotics-lesson-screen:fullscreen')).toHaveCount(
    0,
  );
  await page.getByRole('link', { name: 'Вчителю', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Перед заняттям 7', exact: true }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Разом у класі', exact: true }).click();
  await expect(motor).toHaveAttribute('data-running', 'true');
});

test('lesson 7 material tabs identify distinct content and support keyboard navigation', async ({
  page,
}) => {
  await page.goto('/#/robo/robot/lesson-07');
  const tabs = page.getByRole('tablist', { name: 'Матеріали заняття' });
  await expect(tabs.getByRole('tab')).toHaveText([
    'Дослід',
    'Підключення',
    'Програма',
  ]);
  const experiment = tabs.getByRole('tab', { name: 'Дослід', exact: true });
  const wiring = tabs.getByRole('tab', { name: 'Підключення', exact: true });
  const program = tabs.getByRole('tab', { name: 'Програма', exact: true });
  await experiment.focus();
  await page.keyboard.press('ArrowRight');
  await expect(wiring).toBeFocused();
  await expect(wiring).toHaveAttribute('aria-selected', 'true');
  await expect(
    page.getByRole('tabpanel', { name: 'Підключення', exact: true }),
  ).toBeVisible();
  await page
    .getByText('Навіщо з’єднувати GND контролера, драйвера й мінус батарей?', {
      exact: true,
    })
    .click();
  await expect(
    page.getByRole('tabpanel', { name: 'Підключення', exact: true }),
  ).toContainText('Це спільна точка відліку');
  await wiring.focus();
  await page.keyboard.press('End');
  await expect(program).toBeFocused();
  await expect(
    page.getByRole('tabpanel', { name: 'Програма', exact: true }),
  ).toContainText('команди руху тут ще немає');
  await page
    .getByRole('button', { name: 'Збільшити блоки', exact: true })
    .click();
  await expect(
    page.getByRole('dialog', { name: 'Блоки програми Mcar' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await program.focus();
  await page.keyboard.press('ArrowRight');
  await expect(experiment).toBeFocused();
  await expect(
    page.getByRole('tabpanel', { name: 'Дослід', exact: true }),
  ).toBeVisible();
  await page.keyboard.press('End');
  await page.keyboard.press('Home');
  await expect(experiment).toHaveAttribute('aria-selected', 'true');
});
