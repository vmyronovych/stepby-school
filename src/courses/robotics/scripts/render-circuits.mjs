import paths from './paths.cjs';
const { coursePath, projectPath, projectRelative, assetPath, publicPath } =
  paths;
// Capture the school circuit engine's actual SVG and validate its electrical behavior.
import './render-wire-game.mjs';
import { build } from 'esbuild';
import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { assertClearWires } from './wire-clearance.mjs';
const bundle = await build({
  entryPoints: ['src/courses/robotics/tools/circuit/engine/index.ts'],
  bundle: true,
  write: false,
  format: 'iife',
  globalName: 'CircuitCapture',
  platform: 'browser',
  target: 'es2020',
});
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 820 },
  deviceScaleFactor: 2,
});
const captures = JSON.parse(
  await readFile('src/courses/robotics/docs/course-captures.json'),
).filter(
  (c) =>
    !['School circuit engine', 'docs/circuit-examples.json'].includes(
      c.source,
    ) && c.filename !== 'wire-game-assembly.svg',
);
const examples = [];
try {
  await page.goto(pathToFileURL(resolve('dist/index.html')).href);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => {
    document.body.innerHTML = `<div class="circuit-editor" id="circuit" style="width:1200px;margin:20px auto"><input id="cbSpeed" value="1" hidden><div id="cbStage" style="width:1200px;height:680px"><svg id="cbSvg" viewBox="0 0 1200 680" width="1200" height="680"><defs><pattern id="cbCell" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40,0 H0 V40" fill="none" stroke="var(--cb-cell)" stroke-width="1.5"/></pattern></defs><rect id="cbGrid" width="1200" height="680" fill="url(#cbCell)"/><g id="cbWires"/><g id="cbParts"/><g id="cbDots"/><g id="cbLabels"/><g id="cbTerms"/><path id="cbRubber"/><rect id="cbMarq"/></svg><div id="cbPop"></div></div></div>`;
  });
  await page.addScriptTag({ content: bundle.outputFiles[0].text });
  for (const [number, filename, pressed] of [
    [1, 'circuit-first.png', false],
    [2, 'circuit-button.png', false],
    [3, 'circuit-contact.png', true],
  ]) {
    const result = await page.evaluate(
      ({ number, pressed }) => {
        window.captureSession?.dispose();
        document.getElementById('cbDots').replaceChildren();
        const C = CircuitCapture;
        const board = C.cbNewBoard(number === 1);
        if (number === 1) {
          board.parts.find((p) => p.type === 'resistor').props.ohm = 330;
          board.parts.find((p) => p.type === 'switch').s.on = true;
        } else {
          const battery = C.cbAddPart(board, 'battery', 180, 340),
            buzzer = C.cbAddPart(board, 'buzzer', 600, 160),
            button = C.cbAddPart(board, 'button', 980, 440);
          buzzer.props.vol = 0.01;
          button.s.pressed = pressed;
          for (const [a, at, b, bt] of [
            [battery, 0, buzzer, 0],
            [buzzer, 1, button, 1],
            [button, 0, battery, 1],
          ])
            C.cbAddWire(board, { p: a.id, t: at }, { p: b.id, t: bt });
        }
        board.parts.find((p) => p.type === 'battery').props.volt = 3.3;
        const checks = [];
        if (number !== 1) {
          const buzzer = board.parts.find((p) => p.type === 'buzzer'),
            button = board.parts.find((p) => p.type === 'button');
          for (const down of [false, true, false]) {
            button.s.pressed = down;
            const answer = C.solveCircuit(board);
            buzzer.rt.I = answer.I[buzzer.id];
            checks.push(C.CIRC.parts.buzzer.sounding(buzzer));
          }
          button.s.pressed = pressed;
        }
        const routes = board.wires.map((w) => {
          const part = (id) => board.parts.find((p) => p.id === id);
          return [
            w.id,
            C.cbRoute(
              C.cbTerm(part(w.a.p), w.a.t),
              C.cbTerm(part(w.b.p), w.b.t),
              board.parts,
            ).map(([x, y]) => ({ x, y })),
          ];
        });
        const snapshot = JSON.parse(C.cbSnap(board));
        C.circuitState.circuit = board;
        window.captureSession = C.CircuitEngine.mount(
          document.getElementById('circuit'),
          () => {},
        );
        return {
          checks,
          routes,
          snapshot,
          wires: board.wires.map((w) => ({
            id: w.id,
            a: w.a.p + ':' + w.a.t,
            b: w.b.p + ':' + w.b.t,
          })),
        };
      },
      { number, pressed },
    );
    if (number !== 1)
      assert.deepEqual(
        result.checks,
        [false, true, false],
        'Release / press / release must mean silence / sound / silence',
      );
    assertClearWires(result, new Map(result.routes));
    examples.push({
      number,
      filename,
      board: result.snapshot,
      routes: result.routes,
    });
    await page.waitForTimeout(100);
    await page.locator('#cbSvg').screenshot({ path: assetPath(filename) });
    captures.push({
      filename,
      source: 'docs/circuit-examples.json',
      width: 2400,
      height: 1360,
      caption:
        number === 1
          ? 'Перше коло: джерело 3,3 В, резистор 330 Ом і LED.'
          : number === 2
            ? 'Звукове Морзе: активна пищалка та кнопка. Кнопка відпущена — коло розімкнене, звуку немає.'
            : 'Звукова гра: кнопка на цій схемі позначає дотик петлі до траси. Контакт замкнений — пищалка звучить; у виробі окремої кнопки немає.',
    });
  }
  await writeFile(
    'src/courses/robotics/docs/circuit-examples.json',
    JSON.stringify(examples, null, 2) + '\n',
  );
  const hash = createHash('sha256')
    .update(await readFile('src/courses/robotics/docs/circuit-examples.json'))
    .digest('hex');
  for (const c of captures)
    if (c.source === 'docs/circuit-examples.json') c.sha256 = hash;
  captures.push({
    filename: 'wire-game-assembly.svg',
    source: 'scripts/render-wire-game.mjs',
    sha256: createHash('sha256')
      .update(
        await readFile('src/courses/robotics/scripts/render-wire-game.mjs'),
      )
      .digest('hex'),
    width: 1200,
    height: 780,
    caption:
      'Готова гра «Нервовий дріт» із активною пищалкою на mini breadboard.',
  });
  await writeFile(
    'src/courses/robotics/docs/course-captures.json',
    JSON.stringify(captures, null, 2) + '\n',
  );
  await writeFile(
    'src/courses/robotics/shared/content/resources.ts',
    'export interface CourseImage { filename:string; width:number; height:number; caption:string; source:string }\nexport const courseImages: CourseImage[] = ' +
      JSON.stringify(
        captures.map(({ sha256, ...rest }) => rest),
        null,
        2,
      ) +
      ';\n',
  );
  console.log(
    'Three circuits: native rendering, sound states and non-crossing wires PASS.',
  );
} finally {
  await browser.close();
}
