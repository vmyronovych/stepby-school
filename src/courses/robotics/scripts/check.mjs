import paths from './paths.cjs';
const { coursePath, projectPath, projectRelative, assetPath, publicPath } =
  paths;
import {
  assertMiniBreadboards,
  assertRenderedWiresClear,
} from './mini-breadboards.mjs';
// Check the teaching files against an existing local mcar checkout.
// Usage: node src/courses/robotics/scripts/check.mjs ../mcar
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const directory = dirname(fileURLToPath(import.meta.url));
const mcar = resolve(process.argv[2] || '../mcar');
const source = (name) => pathToFileURL(resolve(mcar, 'web/src', name)).href;
const { Blockly } = await import(source('usb-blocks.js'));
const { validatePinState } = await import(source('usb-pins.js'));
const { validateWiring, analyzeWiring } = await import(
  source('wiring-model.js')
);
const { compileUsbBytecode } = await import(source('usb-bytecode.js'));

// Catalog coverage is checked against course.ts by tests/robotics.test.cjs.
// This script verifies the three editable motor projects, not Markdown formatting.
for (const [id, duration] of [
  ['start', 0],
  ['demo', 1],
  ['solution', 2],
]) {
  const filename = `lesson-08-${id}.mcar`;
  const project = JSON.parse(await readFile(projectPath(filename), 'utf8'));
  assert.equal(project.format, 'mandrivnyk-usb');
  assert.equal(project.version, 1);
  assert.ok(typeof project.name === 'string' && project.name.length <= 60);
  assert.ok(Buffer.byteLength(JSON.stringify(project)) < 100000);
  validatePinState(project.workspace);
  validateWiring(project.workspace.wiring);
  assertMiniBreadboards(project.workspace.wiring, assert);
  assertRenderedWiresClear(project.workspace.wiring);
  const controller = project.workspace.wiring.components.find(
    (component) => component.kind === 'esp32',
  );
  assert.equal(
    controller?.expansion,
    'esp32s-38p',
    'Always show ESP32 mounted on the expansion board',
  );
  for (const wire of project.workspace.wiring.wires) {
    for (const ref of [wire.a, wire.b]) {
      if (ref.startsWith(controller.id + ':'))
        assert.ok(
          ref === controller.id + ':USB' ||
            ref.startsWith(controller.id + ':exp-'),
          'Use the expansion board terminals for wiring',
        );
    }
  }
  const analysis = analyzeWiring(project.workspace.wiring);
  assert.deepEqual(
    analysis.issues.filter((issue) =>
      ['error', 'incomplete'].includes(issue.severity),
    ),
    [],
  );
  for (const [ref, gpio] of [
    ['drv:IN1', 16],
    ['drv:IN2', 17],
  ]) {
    const binding = analysis.bindings.find((item) => item.ref === ref);
    assert.ok(binding?.available);
    assert.equal(binding.gpio, gpio);
  }

  const workspace = new Blockly.Workspace();
  const reloaded = new Blockly.Workspace();
  try {
    Blockly.serialization.workspaces.load(project.workspace, workspace);
    const compiled = compileUsbBytecode(workspace);
    const saved = Blockly.serialization.workspaces.save(workspace);
    assert.deepEqual(saved.wiring, project.workspace.wiring);
    Blockly.serialization.workspaces.load(saved, reloaded);
    assert.deepEqual(compileUsbBytecode(reloaded).bytes, compiled.bytes);

    // Trace only the straight-line commands used by these three examples.
    // This checks command timing, not physical motion or the firmware runtime.
    const stack = [];
    const events = [];
    let time = 0;
    let halted = false;
    for (const { op, value } of compiled.code) {
      assert.equal(halted, false, 'Unexpected command after program end');
      if (op === 'P') stack.push(value);
      else if (op === 'o') {
        assert.ok([16, 17].includes(value));
        const state = stack.pop();
        assert.ok([0, 1].includes(state));
        events.push([time, value, state]);
      } else if (op === 'W') {
        const seconds = stack.pop();
        assert.ok(seconds >= 0);
        time += seconds;
      } else if (op === 'H') halted = true;
      else assert.fail(`Unexpected instruction ${op}`);
    }
    const expected = [
      [0, 16, 0],
      [0, 17, 0],
    ];
    if (duration)
      expected.push([3, 16, 1], [3 + duration, 16, 0], [3 + duration, 17, 0]);
    assert.deepEqual(events, expected);
    assert.equal(time, 3 + duration);
    assert.equal(halted, true);
    assert.equal(stack.length, 0);
    console.log(
      `${filename}: PASS; ${compiled.code.length} instructions; ${time}s; CRC ${compiled.checksum}`,
    );
    console.log(
      '  Physical checks retained:',
      analysis.issues.map((issue) => issue.code).join(', '),
    );
  } finally {
    workspace.dispose();
    reloaded.dispose();
  }
}
