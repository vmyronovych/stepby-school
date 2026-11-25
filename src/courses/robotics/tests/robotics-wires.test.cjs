const {
  coursePath,
  projectPath,
  projectRelative,
  assetPath,
} = require('../scripts/paths.cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const geometry = import('../scripts/wire-clearance.mjs');
const wires = [
  { id: 'a', a: 'one', b: 'two' },
  { id: 'b', a: 'three', b: 'four' },
];
const routes = (a, b) =>
  new Map([
    ['a', a.map(([x, y]) => ({ x, y }))],
    ['b', b.map(([x, y]) => ({ x, y }))],
  ]);
test('wire publication rejects crossings, overlapping segments and unrelated touching endpoints', async () => {
  const { wireConflicts, assertClearWires } = await geometry;
  for (const r of [
    routes(
      [
        [0, 5],
        [10, 5],
      ],
      [
        [5, 0],
        [5, 10],
      ],
    ),
    routes(
      [
        [0, 5],
        [10, 5],
      ],
      [
        [4, 5],
        [12, 5],
      ],
    ),
    routes(
      [
        [0, 5],
        [10, 5],
      ],
      [
        [10, 5],
        [10, 10],
      ],
    ),
  ]) {
    assert.ok(wireConflicts(wires, r).length);
    assert.throws(() => assertClearWires({ wires }, r), /forbidden/);
  }
});
test('a true shared terminal permits one junction, but never a hidden overlapping trunk', async () => {
  const { assertClearWires } = await geometry,
    joined = [wires[0], { ...wires[1], a: 'one' }];
  assert.doesNotThrow(() =>
    assertClearWires(
      { wires: joined },
      routes(
        [
          [0, 0],
          [10, 0],
        ],
        [
          [0, 0],
          [0, 10],
        ],
      ),
    ),
  );
  assert.throws(
    () =>
      assertClearWires(
        { wires: joined },
        routes(
          [
            [0, 0],
            [10, 0],
          ],
          [
            [0, 0],
            [5, 0],
            [5, 10],
          ],
        ),
      ),
    /overlap/,
  );
  assert.doesNotThrow(() =>
    assertClearWires(
      { wires },
      routes(
        [
          [0, 0],
          [10, 0],
        ],
        [
          [0, 12],
          [10, 12],
        ],
      ),
    ),
  );
});
