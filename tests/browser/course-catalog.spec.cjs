const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { loadTypeScript } = require('../helpers/load-typescript.cjs');
const { engine } = loadTypeScript('src/runtime/index.ts');
const catalog = engine.DB;
const mathematical = catalog.topics.filter((t) =>
  ['math', 'algebra', 'geometry'].includes(t.subject),
);
for (const [name, width, base] of [
  ['desktop', 1366, '/'],
  [
    'phone offline',
    390,
    pathToFileURL(path.resolve(__dirname, '../../dist/index.html')).href,
  ],
]) {
  test(`course catalog, grade groups and all mathematical lessons: ${name}`, async ({
    page,
  }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    await page.setViewportSize({ width, height: 844 });
    await page.goto(base);
    await expect(page.locator('h1')).toHaveText('Оберіть курс');
    await expect(page.locator('#app > .grid > a.card')).toHaveCount(7);
    await expect(page.locator('#app')).not.toContainText('Скоро');
    await expect(page.locator('a[href="#/5a"]')).toHaveCount(0);
    await page.screenshot({
      path: `test-results/courses-home-${width}.png`,
      fullPage: true,
    });
    for (const [id, title, grades] of [
      ['math', 'Математика', [5, 6]],
      ['algebra', 'Алгебра', [10]],
      ['geometry', 'Геометрія', [9]],
    ]) {
      await page.goto(base + '#/courses/' + id);
      await expect(page.locator('h1')).toHaveText(title);
      await expect(page.locator('.course-groups > section > h2')).toHaveText(
        grades.map((g) => g + ' клас'),
      );
      await expect(page.locator('#app')).not.toContainText('Інструменти');
      if (id === 'math') {
        const duplicates = page.locator('a[href="#/courses/math/t3"]');
        await expect(duplicates).toHaveCount(2);
        for (const grade of grades)
          await expect(
            page.locator(
              `section[aria-labelledby="grade-${grade}"] a[href="#/courses/math/t3"]`,
            ),
          ).toHaveCount(1);
      }
      await page.screenshot({
        path: `test-results/course-${id}-${width}.png`,
        fullPage: true,
      });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
      for (const topic of mathematical.filter((t) => t.subject === id)) {
        await page
          .locator(`a[href="#/courses/${id}/${topic.id}"]`)
          .first()
          .click();
        await expect(page.locator('h1')).toHaveText(
          topic.doc ? engine.DOCS[topic.doc].title : topic.title,
        );
        await expect(page.locator('#app')).not.toContainText('Демо:');
        await expect(
          page.getByRole('button', { name: 'Відкрити', exact: true }),
        ).toHaveCount(0);
        await expect(
          page
            .locator('.crumbs')
            .getByRole('link', { name: title, exact: true }),
        ).toHaveAttribute('href', `#/courses/${id}`);
        if (topic.tasks?.length) {
          const task = topic.tasks[0];
          await page.goto(base + `#/courses/${id}/${topic.id}/${task.id}`);
          await expect(page.locator('.paper.sheet')).toBeVisible();
          await page
            .getByRole('button', { name: 'Далі →', exact: true })
            .click();
          await expect(page.locator('.step-count')).toContainText('Крок 2');
          await page.evaluate(() =>
            StepBySchool.changeStep(
              StepBySchool.getSnapshot().steps.length - 1,
            ),
          );
          await expect(page.locator('.explain.done')).toBeVisible();
        }
        await page.goto(base + '#/courses/' + id);
      }
    }
    expect(errors).toEqual([]);
  });
}
test('old merged task addresses preserve custom input, completion and browser history', async ({
  page,
}) => {
  const cfg = { a: 7, b: 10, op: '+', c: 2, d: 15 };
  await page.goto('/#/courses/math');
  await page.locator('a[href="#/courses/math/t3"]').last().click();
  await page.goto(
    '/#/6a/math/t5/k9?c=' + encodeURIComponent(JSON.stringify(cfg)),
  );
  await expect(page).toHaveURL(/#\/courses\/math\/t3\/k9\?c=/);
  await expect(page.locator('#i_a')).toHaveValue('7');
  await page.getByRole('button', { name: 'Позначити виконаним' }).click();
  await page.getByRole('link', { name: '← Назад', exact: true }).click();
  await expect(page.locator('.badge.ok')).toHaveCount(1);
  await page.getByRole('link', { name: 'Математика', exact: true }).click();
  await expect(page.locator('a[href="#/courses/math/t3"]')).toHaveCount(2);
  await page.goBack();
  await expect(page.locator('h1')).toContainText('дробів');
  await page.goForward();
  await expect(page.locator('h1')).toHaveText('Математика');
});
