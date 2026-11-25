const {
  coursePath,
  projectPath,
  projectRelative,
  assetPath,
} = require('../scripts/paths.cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const {
  loadTypeScript,
} = require('../../../../tests/helpers/load-typescript.cjs');
const e = loadTypeScript('src/courses/robotics/tools/circuit/engine/index.ts');
const { transistorMotorPreset } = loadTypeScript(
  'src/courses/robotics/lessons/lesson-07/experiment.ts',
);
function fixture() {
  const board = structuredClone(transistorMotorPreset.board);
  return {
    board,
    control: board.parts[0],
    power: board.parts[1],
    controlSwitch: board.parts[5],
    powerSwitch: board.parts[6],
    motor: board.parts.find((p) => p.type === 'motor'),
    transistor: board.parts.find((p) => p.type === 'npn'),
  };
}
const nearZero = (v) => assert.ok(Math.abs(v) < 1e-6, String(v));
test('the experiment reuses two ordinary batteries and adds only motor and transistor types', () => {
  const { board } = fixture();
  assert.deepEqual(
    board.parts.map((p) => p.type),
    ['battery', 'battery', 'npn', 'motor', 'resistor', 'switch', 'switch'],
  );
  for (const type of ['gpio', 'driver', 'supply'])
    assert.equal(e.CIRC.parts[type], undefined);
  assert.ok(!e.CIRC.parts.battery.single);
});
test('both power sources are required; removing either stops the motor', () => {
  const f = fixture();
  f.controlSwitch.s.on = true;
  for (const controlOn of [false, true])
    for (const powerOn of [false, true]) {
      f.control.s.off = !controlOn;
      f.power.s.off = !powerOn;
      const r = e.solveCircuit(f.board);
      if (controlOn && powerOn) assert.ok(r.I[f.motor.id] > 0.1);
      else nearZero(r.I[f.motor.id]);
    }
});
test('NPN base draws limited control current; emitter current is the sum of base and collector currents', () => {
  const f = fixture();
  f.controlSwitch.s.on = true;
  const r = e.solveCircuit(f.board),
    ib = r.I[f.transistor.id + ':base'],
    ic = r.I[f.transistor.id + ':collector'];
  assert.ok(ib > 0.002 && ib < 0.003);
  assert.ok(ic > 50 * ib);
  nearZero(r.I[f.power.id] + r.I[f.motor.id]);
  nearZero(r.I[f.control.id] + ib);
  const emitterWires = f.board.wires.filter(
    (w) =>
      (w.a.p === f.transistor.id && w.a.t === 1) ||
      (w.b.p === f.transistor.id && w.b.t === 1),
  );
  const emitterCurrent = emitterWires.reduce(
    (sum, w) => sum + (w.a.p === f.transistor.id ? 1 : -1) * r.I[w.id],
    0,
  );
  nearZero(emitterCurrent - ib - ic);
  f.powerSwitch.s.on = false;
  const off = e.solveCircuit(f.board);
  nearZero(off.I[f.motor.id]);
  assert.ok(off.I[f.transistor.id + ':base'] > 0.002);
});
test('opening the base path or reversing control power switches the NPN off', () => {
  const f = fixture();
  f.controlSwitch.s.on = true;
  const baseWire = f.board.wires.find(
    (w) => w.b.p === f.transistor.id && w.b.t === 2,
  );
  nearZero(
    e.solveCircuit({
      ...f.board,
      wires: f.board.wires.filter((w) => w !== baseWire),
    }).I[f.motor.id],
  );
  f.control.props.volt = -3.3;
  const r = e.solveCircuit(f.board);
  nearZero(r.I[f.motor.id]);
  nearZero(r.I[f.transistor.id + ':base']);
});
test('breaking each motor power wire stops current', () => {
  const f = fixture();
  f.controlSwitch.s.on = true;
  for (const wire of f.board.wires.filter(
    (w) => w.role === 'power' || w.a.p === f.power.id,
  ))
    nearZero(
      e.solveCircuit({
        ...f.board,
        wires: f.board.wires.filter((w) => w.id !== wire.id),
      }).I[f.motor.id],
    );
});
test('removing the transistor never shorts its former pins; routes survive history', () => {
  const { board, transistor } = fixture(),
    snap = e.cbSnap(board),
    kept = board.wires
      .filter((w) => w.a.p !== transistor.id && w.b.p !== transistor.id)
      .map((w) => w.id);
  e.cbExtract(board, transistor.id);
  assert.deepEqual(
    board.wires.map((w) => w.id),
    kept,
  );
  e.cbRestore(board, snap);
  assert.deepEqual(
    board.wires.map((w) => [w.route, w.role]),
    transistorMotorPreset.board.wires.map((w) => [w.route, w.role]),
  );
});
test('the embedded circuit has exact endpoints and no wire crossings or overlaps', async () => {
  const { assertClearWires } = await import('../scripts/wire-clearance.mjs');
  const { board } = fixture();
  for (const w of board.wires)
    for (const [endpoint, point] of [
      [w.a, w.route[0]],
      [w.b, w.route.at(-1)],
    ]) {
      const p = board.parts.find((p) => p.id === endpoint.p),
        t = e.cbTerm(p, endpoint.t);
      assert.deepEqual(point, [t.x, t.y]);
    }
  assertClearWires(
    {
      wires: board.wires.map((w) => ({
        id: w.id,
        a: w.a.p + ':' + w.a.t,
        b: w.b.p + ':' + w.b.t,
      })),
    },
    new Map(
      board.wires.map((w) => [w.id, w.route.map(([x, y]) => ({ x, y }))]),
    ),
  );
});

test('ordinary switches independently open the control and motor circuits', () => {
  const f = fixture();
  for (const controlOn of [false, true])
    for (const powerOn of [false, true]) {
      f.controlSwitch.s.on = controlOn;
      f.powerSwitch.s.on = powerOn;
      const current = e.solveCircuit(f.board).I[f.motor.id];
      if (controlOn && powerOn) assert.ok(current > 0.1);
      else nearZero(current);
      assert.equal(f.control.s.off, false);
      assert.equal(f.power.s.off, false);
    }
});
