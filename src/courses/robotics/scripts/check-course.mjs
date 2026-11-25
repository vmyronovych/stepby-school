import paths from './paths.cjs';
const { coursePath, projectPath, projectRelative, assetPath, publicPath } =
  paths;
import {
  assertMiniBreadboards,
  assertRenderedWiresClear,
} from './mini-breadboards.mjs';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
const src = (name) =>
  pathToFileURL(resolve(process.argv[2] || '../mcar', 'web/src', name)).href;
const { validatePinState } = await import(src('usb-pins.js'));
const { Blockly } = await import(src('usb-blocks.js'));
const { compileUsbBytecode } = await import(src('usb-bytecode.js'));
const { analyzeWiring, validateWiring } = await import(src('wiring-model.js'));
const manifest = JSON.parse(
  await readFile('src/courses/robotics/scripts/data/projects.json'),
);
const codes = new Map();
for (const item of manifest) {
  const bytes = await readFile(projectPath(item.filename));
  assert.deepEqual(bytes, await readFile('dist/assets/robotics/' + item.filename));
  const p = JSON.parse(bytes),
    w = p.workspace;
  validatePinState(w);
  validateWiring(w.wiring);
  assertMiniBreadboards(w.wiring, assert);
  if (item.number < 11) assertRenderedWiresClear(w.wiring);
  assert.deepEqual(
    analyzeWiring(w.wiring).issues.filter((i) => i.severity === 'error'),
    [],
  );
  for (const c of w.wiring.components.filter((c) => c.kind === 'esp32')) {
    assert.equal(c.expansion, 'esp32s-38p');
    for (const wire of w.wiring.wires)
      for (const ref of [wire.a, wire.b])
        if (ref.startsWith(c.id + ':'))
          assert.match(ref, new RegExp(`^${c.id}:(USB|exp-)`));
  }
  const bindings = analyzeWiring(w.wiring).bindings;
  const expected = w.wiring.components.some((c) => c.kind === 'led')
    ? [['led:A', 2]]
    : w.wiring.components.some((c) => c.id === 'd1')
      ? [
          ['d1:IN1', 16],
          ['d1:IN2', 17],
          ['d1:IN3', 18],
          ['d1:IN4', 19],
          ['d2:IN1', 23],
          ['d2:IN2', 25],
          ['d2:IN3', 26],
          ['d2:IN4', 27],
        ]
      : [
          ['drv:IN1', 16],
          ['drv:IN2', 17],
        ];
  for (const [ref, gpio] of expected) {
    const binding = bindings.find((b) => b.ref === ref);
    assert.ok(binding?.available, item.filename + ' ' + ref);
    assert.equal(
      binding.gpio,
      gpio,
      'GPIO continuity through breadboard: ' + item.filename,
    );
  }
  const ws = new Blockly.Workspace(),
    reload = new Blockly.Workspace();
  try {
    Blockly.serialization.workspaces.load(w, ws);
    const compiled = compileUsbBytecode(ws);
    assert.equal(compiled.checksum, item.crc);
    Blockly.serialization.workspaces.load(
      Blockly.serialization.workspaces.save(ws),
      reload,
    );
    assert.deepEqual(compileUsbBytecode(reload).bytes, compiled.bytes);
    codes.set(item.filename, compiled.code);
  } finally {
    ws.dispose();
    reload.dispose();
  }
  const serialized = JSON.stringify(w.blocks);
  if (item.number < 14)
    assert.doesNotMatch(serialized, /controls_repeat_ext|usb_forever/);
  if (item.number < 15)
    assert.doesNotMatch(serialized, /variables_set|variables_get/);
  if (item.number >= 17 && item.number <= 21) {
    assert.doesNotMatch(serialized, /usb_start|robot_wait|usb_forever/);
  }
}
// Small independent interpreter checks generated control flow, not hardware behavior.
const motorPins = [16, 17, 18, 19, 23, 25, 26, 27];
function run(
  code,
  { frames = [{}], event, initial = {}, variables = {} } = {},
) {
  const stack = [],
    outputs = { ...initial },
    values = { ...variables },
    snapshots = [],
    waits = [];
  let pc =
      event === undefined
        ? 0
        : code.findIndex((i) => i.op === 'T' && i.value === event) + 1,
    frame = 0;
  assert.ok(event === undefined || pc > 0, 'Missing event');
  for (let step = 0; step < 20000; step++) {
    const { op, value } = code[pc++];
    if (op === 'P') stack.push(value);
    else if (op === 'V') stack.push(values[value] ?? 0);
    else if (op === '=') values[value] = stack.pop();
    else if (op === 'I') values[value] = Math.max(0, Math.floor(stack.pop()));
    else if (op === 'o' || op === 'p') outputs[value] = stack.pop();
    else if (op === 'a')
      stack.push(frames[Math.min(frame, frames.length - 1)][value] ?? 0);
    else if (op === 'W') {
      waits.push({ seconds: stack.pop(), outputs: { ...outputs } });
    } else if (op === 'J') pc = value;
    else if (op === 'C') {
      if (!stack.pop()) pc = value;
    } else if (op === '>') {
      const right = stack.pop();
      stack.push(stack.pop() > right ? 1 : 0);
    } else if (op === 'E') {
      const right = stack.pop();
      stack.push(stack.pop() === right ? 1 : 0);
    } else if (op === '-') {
      const right = stack.pop();
      stack.push(stack.pop() - right);
    } else if (op === 'M') pc += value;
    else if (op === 'D') {
      snapshots.push({ ...outputs });
      frame++;
      if (frame >= frames.length) return { outputs, values, snapshots, waits };
    } else if (op === 'H') return { outputs, values, snapshots, waits };
    else assert.fail('Unknown opcode ' + op);
  }
  assert.fail('Control flow did not terminate or yield');
}
const file = (n, v = 'solution') =>
  codes.get(`lesson-${String(n).padStart(2, '0')}-${v}.mcar`);
const active = (o) => motorPins.filter((p) => o[p] > 0);
for (const n of [6, 7, 9, 10, 11, 12, 13])
  assert.deepEqual(active(run(file(n)).outputs), [], `Lesson ${n} stops`);
for (const n of [18, 19, 20, 21]) {
  const count = n === 18 ? 1 : 4;
  for (let event = 1; event <= count; event++) {
    const pressed = run(file(n), { event });
    assert.deepEqual(
      active(pressed.outputs),
      [
        [16, 18, 23, 26],
        [17, 19, 25, 27],
        [23, 26],
        [16, 18],
      ][event - 1],
    );
    assert.ok(
      active(pressed.outputs).every((p) => pressed.outputs[p] === 100),
      'Speed initialized in press',
    );
    assert.deepEqual(
      active(
        run(file(n), {
          event: event + 8,
          initial: pressed.outputs,
          variables: pressed.values,
        }).outputs,
      ),
      [],
    );
  }
}
for (const n of [14, 15, 16])
  for (const [variant, count] of [
    ['demo', 2],
    ['solution', 3],
  ]) {
    const result = run(file(n, variant), {
      frames: Array.from({ length: 10 }, () => ({})),
    });
    assert.equal(result.snapshots.length, count);
    assert.deepEqual(active(result.outputs), []);
  }
const frame = (bits) => ({
  32: bits[0] ? 3000 : 500,
  34: bits[1] ? 3000 : 500,
  36: bits[2] ? 3000 : 500,
});
const expected = (bits) =>
  bits[1] ? [16, 18, 23, 26] : bits[0] ? [23, 26] : bits[2] ? [16, 18] : [];
for (let mask = 0; mask < 8; mask++) {
  const bits = [(mask >> 2) & 1, (mask >> 1) & 1, mask & 1];
  const once = run(file(25), { frames: [frame(bits)] });
  assert.deepEqual(active(once.waits[0].outputs), expected(bits));
  assert.deepEqual(active(once.outputs), []);
  for (const n of [26, 27, 28, 29, 30])
    assert.deepEqual(
      active(run(file(n), { frames: [frame(bits)] }).snapshots[0]),
      expected(bits),
    );
}
const frames = [
  frame([0, 1, 0]),
  frame([1, 0, 0]),
  frame([0, 0, 0]),
  frame([0, 1, 0]),
];
assert.deepEqual(run(file(26), { frames }).snapshots.map(active), [
  [16, 18, 23, 26],
  [23, 26],
  [],
  [16, 18, 23, 26],
]);
for (const n of [27, 28, 29, 30])
  assert.deepEqual(run(file(n), { frames }).snapshots.map(active), [
    [16, 18, 23, 26],
    [23, 26],
    [],
    [],
  ]);
for (const capture of JSON.parse(
  await readFile('src/courses/robotics/shared/content/captures.json'),
)) {
  assert.ok((await readFile('dist/assets/robotics/' + capture.filename)).length > 0);
  if (capture.sha256)
    assert.equal(
      createHash('sha256')
        .update(await readFile(coursePath(capture.source)))
        .digest('hex'),
      capture.sha256,
      'Stale capture ' + capture.filename,
    );
}
console.log(
  `${manifest.length} projects: import, compile, roundtrip, expansion boards, progression, remote releases, all 8 line combinations, fresh reads and latched stop PASS.`,
);
