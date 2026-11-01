const { test } = require('node:test');
const assert = require('node:assert/strict');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const engine = () => loadTypeScript('src/features/circuit/engine/index.ts');
function close(actual, expected, tolerance = 1e-6) {
  assert(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);
}
function resistorLoop(e, ohm = 220) {
  const b = e.cbNewBoard(false),
    battery = e.cbAddPart(b, 'battery', 180, 340),
    resistor = e.cbAddPart(b, 'resistor', 600, 340);
  resistor.props.ohm = ohm;
  e.cbAddWire(b, { p: battery.id, t: 0 }, { p: resistor.id, t: 0 });
  e.cbAddWire(b, { p: resistor.id, t: 1 }, { p: battery.id, t: 1 });
  return { b, battery, resistor };
}
test('pure circuit imports do not read the DOM or construct an application', () => {
  const e = engine();
  assert.equal(e.circuitState.circuit, null);
  assert.equal(e.CircuitEngine.palette().length, 6);
});
test('series resistor current follows Ohm law including source and wire resistance', () => {
  const e = engine();
  for (const ohm of [10, 47, 220, 1000, 100000]) {
    const { b, battery, resistor } = resistorLoop(e, ohm),
      r = e.solveCircuit(b),
      expected = 5 / (ohm + 0.2 + 2 * 0.01);
    close(r.I[resistor.id], expected);
    close(r.I[battery.id], -expected);
    for (const wire of b.wires) close(r.I[wire.id], expected);
  }
});
test('parallel branches share voltage and source current equals their sum', () => {
  const e = engine(),
    { b, battery, resistor } = resistorLoop(e, 220),
    other = e.cbAddPart(b, 'resistor', 700, 440);
  other.props.ohm = 1000;
  e.cbAddWire(b, { p: battery.id, t: 0 }, { p: other.id, t: 0 });
  e.cbAddWire(b, { p: other.id, t: 1 }, { p: battery.id, t: 1 });
  const r = e.solveCircuit(b);
  close(-r.I[battery.id], r.I[resistor.id] + r.I[other.id]);
  close(r.I[resistor.id] / r.I[other.id], (1000 + 0.02) / (220 + 0.02));
});
test('open switch stops current and closed switch preserves series LED current', () => {
  const e = engine(),
    b = e.cbNewBoard(true),
    sw = b.parts.find((p) => p.type === 'switch'),
    led = b.parts.find((p) => p.type === 'led');
  assert(Math.abs(e.solveCircuit(b).I[led.id]) < 1e-6);
  sw.s.on = true;
  close(e.solveCircuit(b).I[led.id], (5 - 1.9) / (220 + 10 + 0.2 + 5 * 0.01));
});
test('reverse LED blocks current and one AA cell cannot exceed its forward threshold', () => {
  const e = engine(),
    b = e.cbNewBoard(true),
    sw = b.parts.find((p) => p.type === 'switch'),
    led = b.parts.find((p) => p.type === 'led'),
    battery = b.parts.find((p) => p.type === 'battery');
  sw.s.on = true;
  led.props.flipped = true;
  assert(Math.abs(e.solveCircuit(b).I[led.id]) < 1e-6);
  led.props.flipped = false;
  battery.props.src = 'aa';
  battery.props.cells = 1;
  assert(Math.abs(e.solveCircuit(b).I[led.id]) < 1e-6);
  battery.props.cells = 3;
  assert(e.solveCircuit(b).I[led.id] > 0.01);
});
test('source protection, charge drain and heat model retain physical state', () => {
  const e = engine(),
    { b, battery } = resistorLoop(e, 10);
  battery.props.cap = 'small';
  e.CIRC.parts.battery.onParam(battery, 'cap');
  assert.equal(battery.s.m, 20);
  e.CIRC.parts.battery.drain(battery, e.CIRC.SPACING * 3);
  assert.equal(battery.s.m, 17);
  e.CIRC.parts.battery.act(battery, 'charge');
  e.CIRC.parts.battery.tick(battery, 1);
  assert.equal(battery.s.m, 20);
  assert.equal(battery.s.charging, false);
  const s = e.FRESH();
  assert.equal(e.circHeat(s, 2, 6, 6, 6), true);
  assert.equal(s.dead, true);
  assert.equal(s.heat, 1);
  e.circHeat(s, 0, 0.5, 6, 6);
  assert.equal(s.t, 0.5);
  battery.s.off = true;
  assert.equal(e.CIRC.parts.battery.elec(battery).kind, 'open');
});
test('insertion and extraction preserve a connected loop without duplicate wires', () => {
  const e = engine(),
    { b } = resistorLoop(e),
    part = e.cbAddPart(b, 'resistor', 400, 340),
    wire = b.wires[0];
  e.cbInsert(b, part, wire);
  assert.equal(b.wires.length, 3);
  assert.equal(e.cbInCircuit(b, part.id), true);
  e.cbExtract(b, part.id);
  assert.equal(b.wires.length, 2);
  assert.equal(e.cbInCircuit(b, part.id), false);
  const w = b.wires[0];
  assert.equal(e.cbAddWire(b, w.a, w.b), null);
  assert.equal(e.cbAddWire(b, w.a, w.a), null);
});
test('history restores layout and properties while keeping current damage and charge', () => {
  const e = engine(),
    { b, battery, resistor } = resistorLoop(e),
    snapshot = e.cbSnap(b),
    next = b.next;
  resistor.s.dead = true;
  battery.s.m = 7;
  resistor.x = 900;
  resistor.props.ohm = 1000;
  e.cbAddPart(b, 'led', 400, 500);
  b.sel = ['missing', resistor.id];
  b.pop = resistor.id;
  e.cbRestore(b, snapshot);
  assert.equal(b.parts.length, 2);
  assert.equal(b.parts.find((p) => p.id === resistor.id).x, 600);
  assert.equal(b.parts.find((p) => p.id === resistor.id).props.ohm, 220);
  assert.equal(b.parts.find((p) => p.id === resistor.id).s.dead, true);
  assert.equal(b.parts.find((p) => p.id === battery.id).s.m, 7);
  assert(b.next > next);
  assert.deepEqual(b.sel, [resistor.id]);
  assert.equal(b.pop, null);
  assert.throws(() => e.cbRestore(b, '{"parts":[]}'), /Invalid circuit/);
});
test('clipboard clones properties and internal wires while retaining single source constraint', () => {
  const e = engine(),
    { b, battery, resistor } = resistorLoop(e);
  assert.equal(e.cbCopy(b, [battery.id, resistor.id]), true);
  const ids = e.cbPaste(b, [700, 500]);
  assert.equal(ids.length, 1);
  assert.equal(b.parts.filter((p) => p.type === 'battery').length, 1);
  const copy = b.parts.find((p) => p.id === ids[0]);
  copy.props.ohm = 47;
  assert.equal(resistor.props.ohm, 220);
  assert.equal(b.wires.length, 2);
});
test('breadboard round trip preserves circuit connectivity and component currents', () => {
  const e = engine(),
    b = e.cbNewBoard(true);
  b.parts.find((p) => p.type === 'switch').s.on = true;
  const original = e.solveCircuit(b),
    nets = e.cbSchemNets(b);
  e.cbBoardFromSchem(b);
  const boardNets = e.bbBoardNets(b),
    ends = b.parts.flatMap((p) => [0, 1].map((t) => ({ p: p.id, t })));
  for (const a of ends)
    for (const z of ends)
      assert.equal(
        boardNets(a.p, a.t) === boardNets(z.p, z.t),
        nets(a.p, a.t) === nets(z.p, z.t),
      );
  const layout = e.cbBreadboard(b),
    physical = e.solveCircuit({ parts: b.parts, wires: layout.wires });
  for (const p of b.parts) close(physical.I[p.id], original.I[p.id], 0.0001);
  e.cbSchemFromBoard(b);
  const restored = e.solveCircuit(b);
  for (const p of b.parts) close(restored.I[p.id], original.I[p.id], 0.0001);
});
test('breadboard placement uses free holes and does not move valid existing parts', () => {
  const e = engine(),
    b = e.cbNewBoard(true);
  e.cbBoardFromSchem(b);
  const before = JSON.stringify(b.bb.place);
  e.cbBoardFromSchem(b);
  assert.equal(JSON.stringify(b.bb.place), before);
  const used = new Set();
  for (const p of b.parts) {
    const placement = b.bb.place[p.id];
    if (!placement) continue;
    for (const h of e.bbLegs(placement)) {
      const key = e.bbKey(h);
      assert(!used.has(key));
      used.add(key);
    }
  }
});
test('terminal rotation and polyline interpolation retain exact geometry', () => {
  const e = engine(),
    b = e.cbNewBoard(false),
    p = e.cbAddPart(b, 'resistor', 100, 100, 1);
  assert.deepEqual(e.cbTerm(p, 0), { x: 100, y: 40, nx: -0, ny: -1 });
  const poly = e.cbPoly([
    [0, 0],
    [100, 0],
    [100, 100],
  ]);
  assert.equal(poly.len, 200);
  assert.deepEqual(e.cbAt(poly, 50), [50, 0]);
  assert.deepEqual(e.cbAt(poly, 150), [100, 50]);
});
