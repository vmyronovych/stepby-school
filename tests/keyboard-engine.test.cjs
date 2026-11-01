const { test } = require('node:test');
const assert = require('node:assert/strict');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');

function keyboard() {
  const { KeyboardEngine } = loadTypeScript('src/features/keyboard/engine/keyboard.ts');
  KeyboardEngine.activate(null);
  return KeyboardEngine;
}
function key(engine, key, code, options = {}) {
  let prevented = false;
  engine.handleKey({
    type: 'keydown', key, code, ctrlKey: false, altKey: false,
    metaKey: false, shiftKey: false, repeat: false,
    preventDefault() { prevented = true; }, getModifierState() { return false; },
    ...options,
  });
  return prevented;
}

test('keyboard editing preserves selection, undo, replacement and preset state', () => {
  const engine = keyboard();
  key(engine, 'a', 'KeyA'); key(engine, 'b', 'KeyB'); key(engine, 'c', 'KeyC');
  key(engine, 'ArrowLeft', 'ArrowLeft', { shiftKey: true });
  assert.equal(engine.getSnapshot().anchor, 3);
  key(engine, 'X', 'KeyX');
  assert.equal(engine.getSnapshot().text, 'abX');
  key(engine, 'z', 'KeyZ', { ctrlKey: true });
  assert.equal(engine.getSnapshot().text, 'abc');
  engine.placeCaret(1); key(engine, 'Insert', 'Insert'); key(engine, 'Q', 'KeyQ');
  assert.equal(engine.getSnapshot().text, 'aQc');
  engine.applyPreset('caps');
  assert.equal(engine.getSnapshot().text, 'aQc');
  assert.equal(engine.getSnapshot().focus, 'caps');
  engine.deactivate();
});

test('keyboard language descriptions follow typed characters and retain text across remount', () => {
  const engine = keyboard();
  key(engine, 'і', 'KeyS');
  assert.equal(engine.getSnapshot().lang, 'ua');
  assert.match(engine.getSnapshot().info.description, /УКР/);
  engine.deactivate(); engine.activate('five');
  assert.equal(engine.getSnapshot().text, 'і');
  assert.equal(engine.getSnapshot().focus, 'five');
  key(engine, 's', 'KeyS');
  assert.equal(engine.getSnapshot().lang, 'en');
  assert.equal(engine.getSnapshot().text, 'іs');
  engine.deactivate();
});

test('keyboard deactivation clears ghost and held keys, cancels timers and releases subscriptions', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const engine = keyboard();
  let publications = 0;
  const unsubscribe = engine.subscribe(() => publications++);
  assert.equal(key(engine, 'a', 'KeyA'), true);
  key(engine, 'Backspace', 'Backspace');
  assert.equal(engine.getSnapshot().ghost.ch, 'a');
  assert(engine.getSnapshot().down.includes('Backspace'));
  engine.deactivate();
  assert.equal(engine.getSnapshot().ghost, null);
  assert.deepEqual(engine.getSnapshot().down, []);
  const before = publications;
  t.mock.timers.tick(1000);
  assert.equal(publications, before);
  unsubscribe(); engine.applyPreset('caps');
  assert.equal(publications, before);
  assert.equal(key(engine, 'b', 'KeyB'), false);
});
