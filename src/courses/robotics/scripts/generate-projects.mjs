import paths from './paths.cjs';
const { coursePath, projectPath, projectRelative, assetPath, publicPath } =
  paths;
// Generate editable teaching projects using the real Mcar serializer and compiler.
import { mountOnMiniBreadboards } from './mini-breadboards.mjs';
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const src = (name) =>
  pathToFileURL(resolve(process.argv[2] || '../mcar', 'web/src', name)).href;
const { validatePinState } = await import(src('usb-pins.js'));
const { Blockly } = await import(src('usb-blocks.js'));
const { compileUsbBytecode } = await import(src('usb-bytecode.js'));
const { physicalLayout } = await import(src('wiring-physical.js'));
const { expansionPorts, validateWiring, analyzeWiring } = await import(
  src('wiring-model.js')
);
const original = JSON.parse(
  await readFile(
    'src/courses/robotics/lessons/lesson-08/files/lesson-08-start.mcar',
    'utf8',
  ),
);
const clone = (x) => structuredClone(x);
const pins = [16, 17, 18, 19, 23, 25, 26, 27];
const forward = [16, 18, 23, 26],
  backward = [17, 19, 25, 27];
const port = (n) =>
  `esp:${expansionPorts().find((p) => p.gpio === n && p.id.includes('-S-')).id}`;
const b = (type, fields) => ({ type, ...(fields ? { fields } : {}) });
const num = (n) => ({ shadow: b('math_number', { NUM: n }) });
const chain = (...items) => {
  const a = items.flat(Infinity).filter(Boolean).map(clone);
  for (let i = 0; i < a.length - 1; i++) a[i].next = { block: a[i + 1] };
  return a[0];
};
const out = (pin, on = false) =>
  b('usb_pin_write', { PIN: String(pin), STATE: on ? 'ON' : 'OFF' });
const stop = () => pins.map((p) => out(p));
const wait = (n) => ({ type: 'robot_wait', inputs: { TIME: num(n) } });
const get = (id) => ({ type: 'variables_get', fields: { VAR: { id } } });
const set = (id, value) => ({
  type: 'variables_set',
  fields: { VAR: { id } },
  inputs: { VALUE: typeof value === 'number' ? num(value) : { block: value } },
});
const pwm = (pin, value) => ({
  type: 'usb_pin_pwm',
  fields: { PIN: String(pin) },
  inputs: {
    DUTY: typeof value === 'number' ? num(value) : { block: get(value) },
  },
});
const call = (id) => ({
  type: 'my_block_call',
  extraState: { definitionId: id },
});
const print = (text) => b('usb_print', { TEXT: text });
const compare = (id, n, op = 'GT') => ({
  type: 'logic_compare',
  fields: { OP: op },
  inputs: { A: { block: get(id) }, B: num(n) },
});
const iff = (condition, yes, no) => ({
  type: 'controls_if',
  extraState: { hasElse: true },
  inputs: {
    IF0: { block: condition },
    DO0: { block: chain(yes) },
    ELSE: { block: chain(no) },
  },
});
const forever = (body) => ({
  type: 'usb_forever',
  inputs: { DO: { block: chain(body) } },
});
const repeat = (n, body) => ({
  type: 'controls_repeat_ext',
  inputs: { TIMES: num(n), DO: { block: chain(body) } },
});
const start = (body) => ({ ...chain(b('usb_start'), body), x: 40, y: 40 });
const remote = (n, event, body) => ({
  ...chain(b('usb_remote', { COMMAND: String(n), EVENT: event }), body),
  x: 40 + (n - 1) * 600,
  y: event === 'PRESS' ? 40 : 380,
});
function definitions(mode = 'digital', turns = false) {
  const move = (active) =>
    chain(
      call('stop'),
      active.map((p) =>
        mode === 'digital'
          ? out(p, true)
          : pwm(p, mode === 'variable' ? 'speed' : 100),
      ),
    );
  return [
    { id: 'stop', name: 'Стоп', body: chain(stop()) },
    { id: 'forward', name: 'Вперед', body: move(forward) },
    { id: 'backward', name: 'Назад', body: move(backward) },
    ...(turns
      ? [
          { id: 'left', name: 'Ліворуч', body: move([23, 26]) },
          { id: 'right', name: 'Праворуч', body: move([16, 18]) },
        ]
      : []),
  ];
}
const motor = mountOnMiniBreadboards(original.workspace.wiring);
const four = {
  version: 1,
  components: [
    {
      id: 'esp',
      kind: 'esp32',
      name: 'ESP32 + розширення',
      x: 700,
      y: 750,
      expansion: 'esp32s-38p',
    },
    { id: 'd1', kind: 'driver', name: 'D1 · ліві мотори', x: 450, y: 200 },
    {
      id: 'd2',
      kind: 'driver',
      name: 'D2 · праві мотори',
      x: 1450,
      y: 200,
      rotation: 180,
    },
    ...[1, 2, 3, 4].map((n) => ({
      id: 'm' + n,
      kind: 'motor',
      name: 'M' + n + (n <= 2 ? ' · ліворуч' : ' · праворуч'),
      x: n <= 2 ? 80 : 1850,
      y: n % 2 ? 100 : 500,
      rotation: n <= 2 ? 90 : 270,
    })),
    {
      id: 'battery',
      kind: 'battery',
      name: '4 × AA NiMH · підготовлено',
      x: 1250,
      y: 1150,
      rotation: 180,
    },
    { id: 'usb', kind: 'usb', name: 'Комп’ютер · USB', x: 700, y: 1150 },
  ],
  wires: [],
  checked: [],
};
function wire(state, a, c, color, vertices) {
  state.wires.push({
    id: 'w' + state.wires.length,
    a,
    b: c,
    color,
    ...(vertices ? { vertices: vertices.map(([x, y]) => ({ x, y })) } : {}),
  });
}
wire(four, 'usb:USB', 'esp:USB', '#748699');
for (const [i, d] of ['d1', 'd2'].entries()) {
  wire(four, 'battery:PLUS', d + ':VCC', '#b83c38');
  wire(four, 'battery:GND', d + ':GND', '#384854');
  for (let j = 0; j < 4; j++)
    wire(
      four,
      port(pins[i * 4 + j]),
      `${d}:IN${j + 1}`,
      ['#3478b4', '#8455a0', '#27816a', '#b56725'][j],
    );
  for (let j = 0; j < 4; j++)
    wire(
      four,
      `${d}:OUT${j + 1}`,
      `m${i * 2 + 1 + Math.floor(j / 2)}:${j % 2 ? 'B' : 'A'}`,
      '#b97806',
    );
}
wire(four, 'esp:exp-aux-top-3', 'd1:GND', '#384854');
const led = {
  version: 1,
  components: [
    {
      id: 'esp',
      kind: 'esp32',
      name: 'ESP32 + розширення',
      x: 80,
      y: 150,
      expansion: 'esp32s-38p',
    },
    {
      id: 'r',
      kind: 'resistor',
      name: '330 Ом',
      x: 700,
      y: 100,
      resistance: 330,
    },
    { id: 'led', kind: 'led', name: 'LED', x: 1000, y: 100 },
    { id: 'usb', kind: 'usb', name: 'Комп’ютер', x: 80, y: 650 },
  ],
  wires: [],
  checked: [],
};
wire(led, 'usb:USB', 'esp:USB', '#748699');
wire(led, port(2), 'r:A', '#3478b4');
wire(led, 'r:B', 'led:A', '#b97806');
wire(led, 'led:K', 'esp:exp-aux-top-3', '#384854');
// Stable orthogonal routes are stored in the editable files, not painted on top.
function point(state, ref) {
  const [id, pin] = ref.split(':');
  const c = state.components.find((c) => c.id === id);
  const p = physicalLayout(c).points.get(pin);
  return { x: c.x + p.x, y: c.y + p.y };
}
function route(state, index, vertices) {
  state.wires[index].vertices = vertices.map(([x, y]) => ({ x, y }));
}
route(led, 0, [
  [650, 861.2],
  [650, 354],
]);
route(led, 1, [
  [352.88, 80],
  [670, 80],
  [670, 136],
]);
route(led, 2, [
  [900, 136],
  [900, 260],
  [1025.2, 260],
]);
route(led, 3, [
  [1046.8, 300],
  [1120, 300],
  [1120, 30],
  [485.72, 30],
]);
for (const i of [3, 4, 5, 6]) {
  const w = four.wires[i],
    a = point(four, w.a),
    b = point(four, w.b);
  route(four, i, [[a.x, b.y]]);
}
route(four, 0, [
  [1560, 1361.2],
  [1560, 954],
]);
route(four, 1, [
  [1448, 440],
  [700, 440],
  [700, 300.09133858267717],
]);
route(four, 2, [
  [1316, 410],
  [720, 410],
  [720, 278.49133858267714],
]);
route(four, 11, [
  [1448, 500],
  [1400, 500],
  [1400, 278.49133858267714],
]);
route(four, 12, [
  [1316, 530],
  [1380, 530],
  [1380, 300.09133858267717],
]);
route(four, 13, [
  [790, 80],
  [1340, 80],
  [1340, 235.29133858267716],
]);
for (const [j, i] of [14, 15, 16].entries()) {
  const a = point(four, four.wires[i].a),
    b = point(four, four.wires[i].b);
  const x = 1260 - j * 30,
    y = 1200 - j * 30;
  route(four, i, [
    [a.x, y],
    [x, y],
    [x, b.y],
  ]);
}
route(four, 21, [
  [1105.72, 380],
  [740, 380],
  [740, 278.49133858267714],
]);
for (const [index, lane, y] of [
  [7, 330, 50],
  [8, 300, 30],
  [9, 300, 470],
  [10, 330, 490],
  [17, 1710, 470],
  [18, 1740, 450],
  [19, 1770, 870],
  [20, 1800, 850],
]) {
  const a = point(four, four.wires[index].a),
    b = point(four, four.wires[index].b);
  route(four, index, [
    [lane, a.y],
    [lane, y],
    [b.x, y],
  ]);
}
const reads = () =>
  [
    ['left', 32],
    ['center', 34],
    ['right', 36],
  ].map(([id, p]) => set(id, b('usb_pin_analog', { PIN: String(p) })));
const decision = (latch = false) =>
  iff(
    compare('center', 2048),
    call('forward'),
    iff(
      compare('left', 2048),
      call('left'),
      iff(
        compare('right', 2048),
        call('right'),
        latch ? [set('run', 0), call('stop')] : call('stop'),
      ),
    ),
  );
const variables = [
  { id: 'speed', name: 'швидкість' },
  { id: 'left', name: 'ліворуч' },
  { id: 'center', name: 'центр' },
  { id: 'right', name: 'праворуч' },
  { id: 'run', name: 'рух дозволено' },
];
function project(number, variant) {
  const duration = variant === 'demo' ? 1 : 2;
  let roots,
    defs = [],
    used = [];
  const wiring = number === 6 ? led : number <= 10 ? motor : four;
  if (number === 6)
    roots = [
      start(
        variant === 'start'
          ? [out(2)]
          : [out(2), out(2, true), wait(duration), out(2)],
      ),
    ];
  else if (number === 7) roots = [start([out(16), out(17), wait(3)])];
  else if (number <= 10)
    roots = [
      start(
        variant === 'start'
          ? [out(16), out(17), wait(3)]
          : [
              out(16),
              out(17),
              wait(3),
              out(16, true),
              wait(duration),
              out(16),
              out(17),
              ...(number === 10
                ? [wait(2), out(17, true), wait(duration), out(16), out(17)]
                : []),
            ],
      ),
    ];
  else if (number === 11)
    roots = [
      start(
        variant === 'start'
          ? stop()
          : variant === 'demo'
            ? [stop(), wait(3), out(16, true), wait(1), stop()]
            : [
                stop(),
                wait(3),
                forward.map((p) => out(p, true)),
                wait(1),
                stop(),
                wait(2),
                backward.map((p) => out(p, true)),
                wait(1),
                stop(),
              ],
      ),
    ];
  else if (number <= 16) {
    defs = definitions(
      number === 12 ? 'digital' : number < 15 ? 'fixed' : 'variable',
      number >= 14,
    );
    if (number >= 15) used = ['speed'];
    const route = [
      call('forward'),
      wait(duration),
      call('stop'),
      wait(1),
      call(number >= 14 ? 'left' : 'backward'),
      wait(1),
      call('stop'),
    ];
    if (number === 12 && variant === 'start') defs = [];
    roots = [
      start([
        ...(number >= 15 ? [set('speed', 100)] : []),
        ...(number === 12 && variant === 'start' ? stop() : [call('stop')]),
        wait(3),
        ...(variant === 'start'
          ? []
          : number >= 14
            ? [repeat(variant === 'demo' ? 2 : 3, route), call('stop')]
            : route),
      ]),
    ];
  } else if (number <= 21) {
    defs = definitions('variable', true);
    used = ['speed'];
    if (number === 17 || (number === 18 && variant === 'start'))
      roots = [
        remote(variant === 'demo' ? 7 : 8, 'PRESS', print('Команду отримано!')),
      ];
    else {
      const n = number === 18 || (number === 19 && variant === 'start') ? 1 : 4;
      roots = Array.from({ length: n }, (_, i) => [
        remote(i + 1, 'PRESS', [
          set('speed', 100),
          call(['forward', 'backward', 'left', 'right'][i]),
        ]),
        remote(i + 1, 'RELEASE', call('stop')),
      ]).flat();
      if (n === 4) roots.push(remote(7, 'PRESS', call('stop')));
    }
  } else {
    defs = definitions('variable', true);
    used = [
      'speed',
      'left',
      'center',
      'right',
      ...(number >= 27 ? ['run'] : []),
    ];
    const diagnostic = iff(
      compare('center', 2048),
      print('темне'),
      print('світле'),
    );
    if (number === 22)
      roots = [
        start([call('stop'), forever([reads()[1], diagnostic, wait(0.3)])]),
      ];
    else if (number === 23)
      roots = [
        start([
          call('stop'),
          ...(variant === 'start' ? [] : [reads()[1], diagnostic]),
        ]),
      ];
    else if (number === 24)
      roots = [
        start([
          call('stop'),
          ...(variant === 'start'
            ? [reads()[1], diagnostic]
            : [
                reads(),
                ...['left', 'center', 'right'].map((id, i) =>
                  iff(
                    compare(id, 2048),
                    print(
                      ['ліворуч: темне', 'центр: темне', 'праворуч: темне'][i],
                    ),
                    print(
                      ['ліворуч: світле', 'центр: світле', 'праворуч: світле'][
                        i
                      ],
                    ),
                  ),
                ),
              ]),
        ]),
      ];
    else if (number === 25)
      roots = [
        start([
          set('speed', 80),
          call('stop'),
          reads(),
          ...(variant === 'start'
            ? [diagnostic]
            : [decision(), wait(1), call('stop')]),
        ]),
      ];
    else if (number === 26)
      roots = [
        start([
          set('speed', 80),
          call('stop'),
          ...(variant === 'start'
            ? [reads(), decision(), wait(1), call('stop')]
            : [forever([reads(), decision()])]),
        ]),
      ];
    else
      roots = [
        start([
          set('speed', variant === 'demo' ? 80 : 100),
          set('run', 1),
          call('stop'),
          forever([
            reads(),
            ...(variant === 'start' && number === 27
              ? [decision()]
              : [iff(compare('run', 1, 'EQ'), decision(true), call('stop'))]),
          ]),
        ]),
      ];
  }
  return {
    format: 'mandrivnyk-usb',
    version: 1,
    name: `Заняття ${String(number).padStart(2, '0')} — ${variant === 'start' ? 'старт' : variant === 'demo' ? 'показ' : 'приклад учителя'}`,
    workspace: {
      wiring: mountOnMiniBreadboards(wiring),
      ...(defs.length ? { myBlocks: defs } : {}),
      ...(used.length
        ? { variables: variables.filter((v) => used.includes(v.id)) }
        : {}),
      blocks: { languageVersion: 0, blocks: roots },
    },
  };
}
const manifest = [];
for (let n = 6; n <= 30; n++) {
  if (n === 8) continue;
  for (const variant of ['start', 'demo', 'solution']) {
    if (n === 22 && variant !== 'demo') continue;
    const p = project(n, variant);
    validatePinState(p.workspace);
    validateWiring(p.workspace.wiring);
    const problems = analyzeWiring(p.workspace.wiring).issues.filter(
      (i) => i.severity === 'error',
    );
    if (problems.length) throw Error(JSON.stringify(problems));
    const workspace = new Blockly.Workspace();
    const reload = new Blockly.Workspace();
    try {
      Blockly.serialization.workspaces.load(p.workspace, workspace);
      const compiled = compileUsbBytecode(workspace);
      const saved = Blockly.serialization.workspaces.save(workspace);
      Blockly.serialization.workspaces.load(saved, reload);
      if (
        Buffer.compare(
          Buffer.from(compiled.bytes),
          Buffer.from(compileUsbBytecode(reload).bytes),
        )
      )
        throw Error('Roundtrip mismatch');
      const filename = `lesson-${String(n).padStart(2, '0')}-${variant}.mcar`;
      await writeFile(projectPath(filename), JSON.stringify(p, null, 2) + '\n');
      manifest.push({
        number: n,
        variant,
        filename,
        instructions: compiled.code.length,
        crc: compiled.checksum,
      });
    } catch (e) {
      throw new Error(`${n} ${variant}: ${e.message}`, { cause: e });
    } finally {
      workspace.dispose();
      reload.dispose();
    }
  }
}
await writeFile(
  'src/courses/robotics/docs/projects.json',
  JSON.stringify(manifest, null, 2) + '\n',
);
console.log(`Validated and round-tripped ${manifest.length} Mcar files.`);
