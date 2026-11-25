import paths from './paths.cjs';
const { coursePath, projectPath, projectRelative, assetPath, publicPath } =
  paths;
import { readFileSync } from 'node:fs';
import { assertClearWires } from './wire-clearance.mjs';
const approvedRoutes = JSON.parse(
  readFileSync(new URL('../docs/wiring-routes.json', import.meta.url)),
);
// Real Mcar footprints, electrical groups and routing; no decorative breadboards.
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const root = resolve(process.argv[2] || '../mcar', 'web');
const moduleURL = (name) => pathToFileURL(resolve(root, 'src', name)).href;
const { physicalLayout } = await import(moduleURL('wiring-physical.js'));
const { syncMounts } = await import(moduleURL('breadboard-mount.js'));
const { BREADBOARD_PINS } = await import(moduleURL('breadboard.js'));
const { createAvoidRouter } = await import(moduleURL('wiring-avoid-core.js'));
const { routingScene, insideObstacle } = await import(
  moduleURL('wiring-routing-scene.js')
);
const { AvoidLib } = await import(
  pathToFileURL(resolve(root, 'node_modules/libavoid-js/dist/index-node.mjs'))
    .href
);
await AvoidLib.load();
const route = createAvoidRouter(AvoidLib.getInstance());
const driverHoles = {
  SLEEP: 'D11',
  OUT1: 'D10',
  OUT2: 'D9',
  OUT3: 'D8',
  OUT4: 'D7',
  FAULT: 'D6',
  IN4: 'H11',
  IN3: 'H10',
  GND: 'H9',
  VCC: 'H8',
  IN2: 'H7',
  IN1: 'H6',
};
export function mountOnMiniBreadboards(input) {
  const state = structuredClone(input);
  const alreadyMounted = state.components.some((c) => c.breadboardMount);
  const isLed = state.components.some((c) => c.kind === 'led');
  if (!alreadyMounted) {
    if (isLed) {
      state.components.push({
        id: 'bb',
        kind: 'breadboard',
        name: 'Mini breadboard · 330 Ом + LED',
        x: 800,
        y: 150,
      });
      state.components.find((c) => c.kind === 'resistor').breadboardMount = {
        boardId: 'bb',
        holes: { A: 'A3', B: 'A7' },
      };
      state.components.find((c) => c.kind === 'led').breadboardMount = {
        boardId: 'bb',
        holes: { A: 'E7', K: 'E6' },
      };
      // Resistor B and LED A share column 7, A–E: the board makes this connection.
      state.wires = state.wires.filter((w) => ![w.a, w.b].includes('r:B'));
      for (const w of state.wires)
        for (const end of ['a', 'b'])
          w[end] = { 'r:A': 'bb:D3', 'led:K': 'bb:C6' }[w[end]] || w[end];
    } else {
      for (const c of state.components) c.y += 160;
      if (state.components.filter((c) => c.kind === 'driver').length === 2)
        state.components.find((c) => c.kind === 'battery').x = 1550;
      for (const driver of state.components.filter(
        (c) => c.kind === 'driver',
      )) {
        const desired = { x: driver.x, y: driver.y },
          id = 'bb-' + driver.id;
        const board = {
          id,
          kind: 'breadboard',
          name: `Mini breadboard · ${driver.id === 'drv' ? 'HW-627' : driver.id.toUpperCase()}`,
          x: 0,
          y: 0,
          rotation: ((driver.rotation || 0) + 270) % 360,
        };
        state.components.push(board);
        driver.breadboardMount = { boardId: id, holes: { ...driverHoles } };
        syncMounts(state);
        board.x += desired.x - driver.x;
        board.y += desired.y - driver.y;
        syncMounts(state);
        const counts = {};
        for (const w of state.wires)
          for (const end of ['a', 'b'])
            if (w[end].startsWith(driver.id + ':')) {
              const pin = w[end].split(':')[1],
                hole = driverHoles[pin];
              const index = counts[pin] || 0;
              counts[pin] = index + 1;
              const row =
                hole[0] === 'D'
                  ? ['A', 'B', 'C', 'E'][index]
                  : ['J', 'I', 'G', 'F'][index];
              if (!row) throw Error('Not enough free holes for ' + pin);
              w[end] = id + ':' + row + hole.slice(1);
            }
      }
    }
  }
  syncMounts(state);
  for (const wire of state.wires) delete wire.vertices;
  const layout = isLed
    ? 'led'
    : state.components.filter((c) => c.kind === 'driver').length === 1
      ? 'motor'
      : null;
  if (layout) {
    for (const wire of state.wires) {
      const saved = approvedRoutes[layout].find(
        (w) => w.a === wire.a && w.b === wire.b,
      );
      if (!saved)
        throw Error('Missing approved route: ' + wire.a + ' → ' + wire.b);
      wire.vertices = structuredClone(saved.vertices);
    }
    assertClearWires(state, route(state).routes);
    state.checked = [];
    return state;
  }
  // Save the native orthogonal routes in every editable project.
  const result = route(state),
    scene = routingScene(state);
  for (const wire of state.wires) {
    const corners = result.routes
      .get(wire.id)
      .slice(1, -1)
      .filter((p) => !scene.obstacles.some((r) => insideObstacle(p, r, 4)));
    if (corners.length) wire.vertices = corners;
  }
  const point = (ref) => {
    const [id, pin] = ref.split(':');
    const c = state.components.find((c) => c.id === id),
      p = physicalLayout(c).points.get(pin);
    return { x: c.x + p.x, y: c.y + p.y };
  };
  const set = (w, points) => (w.vertices = points.map(([x, y]) => ({ x, y })));
  if (state.components.filter((c) => c.kind === 'driver').length === 2) {
    for (const w of state.wires) {
      const a = point(w.a),
        b = point(w.b);
      if (w.a.startsWith('battery:')) {
        const positive = w.a.endsWith('PLUS'),
          first = w.b.startsWith('bb-d1:');
        const x = first ? (positive ? 1110 : 1140) : positive ? 1380 : 1350,
          y = first ? (positive ? 780 : 810) : positive ? 750 : 840;
        set(w, [
          [a.x, y],
          [x, y],
          [x, b.y],
        ]);
      }
      if (w.b.startsWith('bb-d1:J') && w.a.includes('-S-'))
        set(w, [[a.x, b.y]]);
      if (w.b === 'bb-d2:J6')
        set(w, [
          [a.x, 180],
          [1320, 180],
          [1320, b.y],
        ]);
      const lane = { 'bb-d2:J7': 0, 'bb-d2:J10': 1, 'bb-d2:J11': 2 }[w.b];
      if (lane !== undefined && w.a.includes('-S-')) {
        const x = 1320 - lane * 30,
          y = 1450 - lane * 30;
        set(w, [
          [a.x, y],
          [x, y],
          [x, b.y],
        ]);
      }
      if (w.a.startsWith('bb-d1:A')) {
        const n = 10 - Number(w.a.split(':A')[1]),
          x = 300 - n * 20,
          y = b.y - (n % 2 ? 70 : 40);
        set(w, [
          [x, a.y],
          [x, y],
          [b.x, y],
        ]);
      }
      if (w.a.startsWith('bb-d2:A')) {
        const n = 10 - Number(w.a.split(':A')[1]),
          x = 1760 + n * 20,
          y = b.y + (n % 2 ? 70 : 40);
        set(w, [
          [x, a.y],
          [x, y],
          [b.x, y],
        ]);
      }
    }
  }
  state.checked = [];
  return state;
}
export function assertMiniBreadboards(state, assert) {
  const small = state.components.filter((c) =>
    ['resistor', 'led', 'driver'].includes(c.kind),
  );
  for (const c of small) {
    assert.ok(
      c.breadboardMount,
      `${c.id} must be inserted in a mini breadboard`,
    );
    const board = state.components.find(
      (b) => b.id === c.breadboardMount.boardId,
    );
    assert.equal(board?.kind, 'breadboard');
    const groups = Object.values(c.breadboardMount.holes).map(
      (h) => BREADBOARD_PINS.find((p) => p.id === h).group,
    );
    assert.equal(
      new Set(groups).size,
      groups.length,
      `${c.id}: distinct pins must not be shorted by the board`,
    );
    if (c.kind === 'driver') {
      assert.ok(
        Object.values(c.breadboardMount.holes).some((h) => h[0] <= 'E'),
      );
      assert.ok(
        Object.values(c.breadboardMount.holes).some((h) => h[0] >= 'F'),
      );
    }
    for (const w of state.wires)
      assert.ok(
        ![w.a, w.b].some((ref) => ref.startsWith(c.id + ':')),
        'Use free breadboard holes, not occupied component legs',
      );
  }
  const used = new Set();
  for (const w of state.wires)
    for (const ref of [w.a, w.b])
      if (
        state.components.find((c) => c.id === ref.split(':')[0])?.kind ===
        'breadboard'
      ) {
        assert.ok(!used.has(ref), 'One jumper per breadboard hole: ' + ref);
        used.add(ref);
      }
}

export function assertRenderedWiresClear(state) {
  assertClearWires(state, route(state).routes);
}
