const {
  coursePath,
  projectPath,
  projectRelative,
  assetPath,
} = require('../scripts/paths.cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { createHash } = require('node:crypto');
const {
  loadTypeScript,
} = require('../../../../tests/helpers/load-typescript.cjs');
const { lessonContents } = loadTypeScript(
  'src/courses/robotics/lessons/index.ts',
);
test('every remaining lesson is authored with earlier prerequisites and individual readiness checks', () => {
  assert.deepEqual(
    lessonContents.map((l) => l.number).sort((a, b) => a - b),
    Array.from({ length: 32 }, (_, i) => i + 1).filter((n) => n !== 8),
  );
  for (const l of lessonContents) {
    assert.ok(l.prerequisites.every((n) => n < l.number));
    assert.equal(l.slides.length, 3);
    assert.equal(l.practice.length, 4);
    assert.equal(l.first.length, 4);
    assert.equal(l.second.length, 4);
    assert.equal(l.hints.length, 3);
    assert.equal(l.exit.length, 2);
    assert.ok(
      l.practice.every((s) => s.text.length > 50 && s.check.length > 20),
    );
    assert.ok(l.preparation.length >= 2);
    assert.ok(l.safety.length > 40);
  }
});
test('published program files and captured Mcar figures have traceable sources', () => {
  const files = JSON.parse(
    fs.readFileSync('src/courses/robotics/scripts/data/projects.json'),
  );
  assert.equal(files.length, 70);
  for (const item of files) {
    const bytes = fs.readFileSync(projectPath(item.filename));
    assert.deepEqual(
      bytes,
      fs.readFileSync('dist/assets/robotics/' + item.filename),
    );
    assert.ok(bytes.length <= 120000, 'Mcar file import size');
    const p = JSON.parse(bytes);
    assert.ok(JSON.stringify(p.workspace).length <= 100000);
    assert.ok(
      p.workspace.wiring.components
        .filter((c) => c.kind === 'esp32')
        .every((c) => c.expansion === 'esp32s-38p'),
    );
  }
  const captures = JSON.parse(
    fs.readFileSync('src/courses/robotics/shared/content/captures.json'),
  );
  for (const c of captures) {
    assert.ok(fs.existsSync('dist/assets/robotics/' + c.filename));
    if (c.sha256)
      assert.equal(
        createHash('sha256')
          .update(fs.readFileSync(coursePath(c.source)))
          .digest('hex'),
        c.sha256,
        c.filename,
      );
  }
  for (const item of files)
    assert.ok(
      captures.some((c) => c.source === projectRelative(item.filename)),
      'Missing real blocks for ' + item.filename,
    );
});
test('all 73 editable projects mount small components on electrically separate mini breadboard contacts', () => {
  const files = require('../publication.cjs')
    .publicationFiles()
    .filter((f) => f.source.endsWith('.mcar'))
    .map((f) => require('node:path').basename(f.source));
  assert.equal(files.length, 73);
  const group = (hole) =>
    `${hole[0] <= 'E' ? 'upper' : 'lower'}:${hole.slice(1)}`;
  for (const file of files) {
    const state = JSON.parse(fs.readFileSync(projectPath(file))).workspace
      .wiring;
    const boards = new Set(
      state.components.filter((c) => c.kind === 'breadboard').map((c) => c.id),
    );
    const occupied = new Set();
    const parts = state.components.filter((c) =>
      ['led', 'resistor', 'driver'].includes(c.kind),
    );
    assert.ok(parts.length, file);
    for (const part of parts) {
      const mount = part.breadboardMount;
      assert.ok(mount && boards.has(mount.boardId), file + ' ' + part.id);
      const holes = Object.values(mount.holes);
      assert.equal(
        new Set(holes.map(group)).size,
        holes.length,
        'Shorted component pins: ' + file,
      );
      for (const hole of holes) {
        assert.match(hole, /^[A-J](?:[1-9]|1[0-7])$/);
        const ref = mount.boardId + ':' + hole;
        assert.ok(!occupied.has(ref), 'Two legs in one hole');
        occupied.add(ref);
      }
    }
    for (const wire of state.wires)
      for (const ref of [wire.a, wire.b]) {
        assert.ok(
          !parts.some((c) => ref.startsWith(c.id + ':')),
          'Jumper must use breadboard contact',
        );
        if (boards.has(ref.split(':')[0])) {
          assert.ok(!occupied.has(ref), 'Occupied hole: ' + file + ' ' + ref);
          occupied.add(ref);
        }
      }
    assert.deepEqual(
      fs.readFileSync(projectPath(file)),
      fs.readFileSync('dist/assets/robotics/' + file),
    );
  }
});
test('sound lessons use the captured active-buzzer circuit and every open contact interrupts it', async () => {
  const e = loadTypeScript(
    'src/courses/robotics/tools/circuit/engine/index.ts',
  );
  const examples = JSON.parse(
    fs.readFileSync('src/courses/robotics/shared/content/circuit-examples.json'),
  );
  const { assertClearWires } = await import('../scripts/wire-clearance.mjs');
  assert.equal(examples.length, 3);
  for (const example of examples) {
    const board = structuredClone(example.board);
    assertClearWires(
      {
        wires: board.wires.map((w) => ({
          id: w.id,
          a: w.a.p + ':' + w.a.t,
          b: w.b.p + ':' + w.b.t,
        })),
      },
      new Map(example.routes),
    );
    if (example.number === 1) {
      assert.ok(board.parts.some((p) => p.type === 'led'));
      assert.equal(
        board.parts.find((p) => p.type === 'resistor').props.ohm,
        330,
      );
      continue;
    }
    assert.deepEqual(board.parts.map((p) => p.type).sort(), [
      'battery',
      'button',
      'buzzer',
    ]);
    const buzzer = board.parts.find((p) => p.type === 'buzzer'),
      button = board.parts.find((p) => p.type === 'button');
    const sounds = () =>
      e.CIRC.parts.buzzer.sounding({
        ...buzzer,
        rt: { I: e.solveCircuit(board).I[buzzer.id] },
      });
    button.s.pressed = false;
    assert.equal(sounds(), false);
    button.s.pressed = true;
    assert.equal(sounds(), true);
    button.s.pressed = false;
    assert.equal(sounds(), false);
    button.s.pressed = true;
    const wires = board.wires;
    for (const wire of wires) {
      board.wires = wires.filter((w) => w !== wire);
      assert.equal(
        sounds(),
        false,
        'A disconnected wire must silence the game',
      );
    }
    board.wires = wires;
  }
});
