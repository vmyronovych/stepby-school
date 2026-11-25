const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { buildSync } = require('esbuild');

test('lesson 7 uses two existing batteries and preserves a simple transistor experiment between modes', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(
    pathToFileURL(path.resolve('dist/index.html')).href + '#/robo/robot/lesson-07',
  );
  const c = page.locator('.cb-experiment'),
    motor = c.locator('[data-running]');
  const control = c.getByRole('button', { name: 'Керування', exact: true });
  const power = c.getByRole('button', { name: 'Живлення мотора', exact: true });
  await expect(c.locator('.cb-experiment-inputs')).toHaveCount(0);
  await expect(c.locator('#cbParts > [data-part]')).toHaveCount(7);
  await expect(c.locator('.cb-interior')).toHaveCount(0);
  const symbol = c
    .locator('#cbParts [data-part]')
    .filter({ has: page.locator('text', { hasText: /^B$/ }) });
  await expect(symbol.locator('circle')).toHaveAttribute('r', '45');
  for (const label of ['B', 'C', 'E'])
    await expect(
      symbol.locator('text', { hasText: new RegExp('^' + label + '$') }),
    ).toHaveCount(1);
  await expect(motor).toHaveAttribute('data-running', 'false');
  await control.click();
  await expect(motor).toHaveAttribute('data-running', 'true');
  await power.click();
  await expect(motor).toHaveAttribute('data-running', 'false');
  await expect(control).toHaveAttribute('aria-pressed', 'true');
  await power.click();
  await expect(motor).toHaveAttribute('data-running', 'true');
  await control.click();
  await expect(motor).toHaveAttribute('data-running', 'false');
  await control.click();
  await expect(motor).toHaveAttribute('data-running', 'true');
  await control.focus();
  await page.keyboard.press('Space');
  await expect(control).toBeFocused();
  await expect(motor).toHaveAttribute('data-running', 'false');
  await page.keyboard.press('Enter');
  await expect(motor).toHaveAttribute('data-running', 'true');
  await page
    .getByRole('link', { name: 'Практика в парі', exact: true })
    .click();
  await expect(c).toBeHidden();
  const before = await motor.locator('.cb-rotor').getAttribute('transform');
  await page.waitForTimeout(120);
  expect(await motor.locator('.cb-rotor').getAttribute('transform')).toBe(
    before,
  );
  await page.getByRole('link', { name: 'Разом у класі', exact: true }).click();
  await expect(control).toHaveAttribute('aria-pressed', 'true');
  await page
    .locator('header')
    .evaluateAll((nodes) =>
      nodes.forEach((n) => (n.style.visibility = 'hidden')),
    );
  await c.screenshot({ path: '/tmp/circuit-transistor-desktop.png' });
  await c.getByRole('button', { name: 'Початковий стан', exact: true }).click();
  await expect(motor).toHaveAttribute('data-running', 'false');
  await page.setViewportSize({ width: 390, height: 844 });
  await c.getByRole('button', { name: 'Збільшити схему', exact: true }).click();
  expect(
    await c
      .locator('.cb-canvas-scroll')
      .evaluate((el) => el.scrollWidth > el.clientWidth),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await control.click();
  await expect(motor).toHaveAttribute('data-running', 'true');
  await expect(motor.locator('.cb-rotor')).toHaveAttribute(
    'transform',
    'rotate(0)',
  );
  await c.screenshot({ path: '/tmp/circuit-transistor-mobile.png' });
  expect(errors).toEqual([]);
});

test('the ordinary editor adds only motor and transistor and allows a second battery', async ({
  page,
}) => {
  await page.goto('/#/robo/robot/r9');
  const editor = page.locator('.circuit-editor');
  await expect(editor.locator('[data-add]')).toHaveCount(8);
  for (const type of ['npn', 'motor'])
    await expect(editor.locator(`[data-add="${type}"]`)).toBeVisible();
  for (const type of ['gpio', 'driver', 'supply'])
    await expect(editor.locator(`[data-add="${type}"]`)).toHaveCount(0);
  await editor.locator('[data-add="npn"]').click();
  const part = editor.locator('#cbParts [data-part]').last();
  const id = await part.getAttribute('data-part');
  await expect(editor.locator(`#cbTerms [data-term^="${id}:"]`)).toHaveCount(3);
  await expect(
    editor.getByRole('button', { name: 'Макетка', exact: true }),
  ).toBeDisabled();
  await editor.getByRole('button', { name: 'Скасувати', exact: true }).click();
  await expect(
    editor.getByRole('button', { name: 'Макетка', exact: true }),
  ).toBeEnabled();
  const count = await editor.locator('#cbParts [data-part]').count();
  await editor.locator('[data-add="battery"]').click();
  await expect(editor.locator('#cbParts [data-part]')).toHaveCount(count + 1);
  await expect(
    editor.getByRole('button', { name: 'Макетка', exact: true }),
  ).toBeDisabled();
});

test('two embedded circuits own independent state, reset and animation lifetimes', async ({
  page,
}) => {
  const source = buildSync({
    stdin: {
      contents:
        "export { CircuitEngine, circuitState } from './src/courses/robotics/tools/circuit/engine'; export {transistorMotorPreset} from './src/courses/robotics/lessons/lesson-07/experiment';",
      resolveDir: path.resolve('.'),
    },
    bundle: true,
    write: false,
    format: 'iife',
    globalName: 'CircuitTest',
    platform: 'browser',
    target: 'es2020',
  }).outputFiles[0].text;
  const markup =
    '<input id="cbSpeed" value="1"><div id="cbStage"><svg id="cbSvg" width="1200" height="760"><rect id="cbGrid"/><g id="cbWires"/><g id="cbParts"/><g id="cbDots"/><g id="cbLabels"/><g id="cbTerms"/><path id="cbRubber"/><rect id="cbMarq"/></svg><div id="cbPop"></div></div>';
  await page.setContent(
    `<div id="one">${markup}</div><div id="two">${markup}</div>`,
  );
  await page.addScriptTag({ content: source });
  const result = await page.evaluate(() => {
    const { CircuitEngine, transistorMotorPreset, circuitState } = CircuitTest;
    const frames = new Map();
    let i = 0;
    window.requestAnimationFrame = (cb) => {
      frames.set(++i, cb);
      return i;
    };
    window.cancelAnimationFrame = (id) => frames.delete(id);
    const one = CircuitEngine.mount(document.getElementById('one'), () => {}, {
      preset: transistorMotorPreset,
    });
    const two = CircuitEngine.mount(document.getElementById('two'), () => {}, {
      preset: transistorMotorPreset,
    });
    const control = transistorMotorPreset.board.parts.find(
      (p) => p.props.label === 'Керування',
    );
    const button = (id) =>
      document.querySelector(`#${id} [aria-label="Керування"]`);
    const click = (id) =>
      button(id).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const on = (id) => button(id).getAttribute('aria-pressed') === 'true';
    click('one');
    const separate = [on('one'), on('two')];
    two.setActive(false);
    click('two');
    const inactiveIgnored = !on('two');
    two.setActive(true);
    click('two');
    one.reset();
    const reset = [on('one'), on('two')];
    one.dispose();
    const afterOne = frames.size;
    two.setActive(false);
    const paused = frames.size;
    two.setActive(true);
    const resumed = frames.size;
    two.dispose();
    return {
      separate,
      reset,
      afterOne,
      paused,
      resumed,
      finished: frames.size,
      toolBoard: circuitState.circuit,
      seed: control.s.on,
      inactiveIgnored,
    };
  });
  expect(result).toEqual({
    separate: [true, false],
    reset: [false, true],
    afterOne: 1,
    paused: 0,
    resumed: 1,
    finished: 0,
    toolBoard: null,
    seed: false,
    inactiveIgnored: true,
  });
});
