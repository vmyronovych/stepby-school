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

test('disposing a stale circuit session leaves the current session active and releases owned resources', async ({
  page,
}) => {
  const { buildSync } = require('esbuild');
  const source = buildSync({
    entryPoints: ['src/features/circuit/engine/index.ts'],
    bundle: true,
    write: false,
    format: 'iife',
    globalName: 'CircuitLifecycle',
    platform: 'browser',
    target: 'es2020',
  }).outputFiles[0].text;
  await page.setContent(
    `<div id="root"><input id="cbSpeed" value="1"><div id="cbStage"><svg id="cbSvg" viewBox="0 0 1200 680" width="1200" height="680"><rect id="cbGrid"/><g id="cbWires"/><g id="cbParts"/><g id="cbDots"/><g id="cbLabels"/><g id="cbTerms"/><path id="cbRubber"/><rect id="cbMarq"/></svg><div id="cbPop"></div></div></div>`,
  );
  await page.addScriptTag({ content: source });
  const result = await page.evaluate(() => {
    const frames = new Map();
    let sequence = 0,
      closed = 0,
      stopped = 0,
      notifications = 0;
    window.requestAnimationFrame = (callback) => {
      const id = ++sequence;
      frames.set(id, callback);
      return id;
    };
    window.cancelAnimationFrame = (id) => frames.delete(id);
    window.AudioContext = class {
      state = 'running';
      destination = {};
      createOscillator() {
        return {
          frequency: { value: 0 },
          connect() {},
          disconnect() {},
          start() {},
          stop() {
            stopped++;
          },
        };
      }
      createGain() {
        return { gain: { value: 0 }, connect() {}, disconnect() {} };
      }
      close() {
        closed++;
        this.state = 'closed';
        return Promise.resolve();
      }
    };
    const e = CircuitLifecycle,
      root = document.getElementById('root'),
      publish = () => {
        notifications++;
      };
    const first = e.CircuitEngine.mount(root, publish),
      board = e.circuitState.circuit,
      battery = board.parts.find((part) => part.type === 'battery');
    const buzzer = e.cbAddPart(board, 'buzzer', 500, 400),
      button = e.cbAddPart(board, 'button', 750, 500);
    buzzer.props.vol = 0.01;
    e.cbAddWire(board, { p: battery.id, t: 0 }, { p: buzzer.id, t: 0 });
    e.cbAddWire(board, { p: buzzer.id, t: 1 }, { p: battery.id, t: 1 });
    first.setView('schem');
    function runLatest() {
      const [id, callback] = [...frames].at(-1);
      frames.delete(id);
      callback(performance.now());
    }
    runLatest();
    const second = e.CircuitEngine.mount(root, publish);
    runLatest();
    button.s.pressed = true;
    first.dispose();
    const stale = { closed, stopped, pressed: button.s.pressed };
    const count = notifications;
    second.setView('bb');
    const active = notifications > count;
    second.dispose();
    second.dispose();
    const afterDispose = notifications;
    for (const callback of frames.values()) callback(performance.now());
    document
      .querySelector('#cbSvg')
      .dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          clientX: 20,
          clientY: 20,
        }),
      );
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'KeyZ',
        ctrlKey: true,
        bubbles: true,
      }),
    );
    return {
      stale,
      active,
      closed,
      stopped,
      pressed: button.s.pressed,
      pendingFrames: frames.size,
      ghostNotifications: notifications - afterDispose,
    };
  });
  expect(result.stale).toEqual({ closed: 0, stopped: 0, pressed: true });
  expect(result.active).toBe(true);
  expect(result.closed).toBe(1);
  expect(result.stopped).toBe(1);
  expect(result.pressed).toBe(false);
  expect(result.pendingFrames).toBe(0);
  expect(result.ghostNotifications).toBe(0);
});
