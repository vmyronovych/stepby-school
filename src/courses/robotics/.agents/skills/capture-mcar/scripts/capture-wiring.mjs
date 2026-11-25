import { assertClearWires } from '../../../../scripts/wire-clearance.mjs';
// Expose existing pin/hole names for a static image, without altering the circuit.
export async function captureWiring(
  page,
  state,
  path,
  { physicalLayout, BREADBOARD_PINS },
) {
  await page.locator('#openWiring').click();
  if (
    (await page
      .locator('[data-palette-toggle]')
      .getAttribute('aria-expanded')) === 'true'
  )
    await page.locator('[data-palette-toggle]').click();
  await page.locator('[data-wire-fit]').click();
  await page.waitForFunction(
    (count) =>
      document.querySelectorAll('.wiring-component img').length === count &&
      [...document.querySelectorAll('.wiring-component img')].every(
        (img) => img.complete && img.naturalWidth,
      ) &&
      document.querySelector('.wiring-lines')?.dataset.router === 'libavoid',
    state.components.length,
  );
  const rendered = await page
    .locator('.wiring-lines path[data-wire]:not(.wire-hit)')
    .evaluateAll((paths) =>
      paths.map((p) => [p.dataset.wire, JSON.parse(p.dataset.points)]),
    );
  assertClearWires(state, new Map(rendered));
  const used = new Set(state.wires.flatMap((w) => [w.a, w.b]));
  const pins = Object.fromEntries(
    state.components.flatMap((c) =>
      [...physicalLayout(c).points]
        .filter(([id]) => used.has(c.id + ':' + id))
        .map(([id, p]) => {
          let label;
          if (c.kind === 'breadboard') {
            const group = BREADBOARD_PINS.find((h) => h.id === id).group;
            const names = state.components
              .filter((child) => child.breadboardMount?.boardId === c.id)
              .flatMap((child) =>
                Object.entries(child.breadboardMount.holes)
                  .filter(
                    ([, hole]) =>
                      BREADBOARD_PINS.find((h) => h.id === hole).group ===
                      group,
                  )
                  .map(([pin]) => pin),
              );
            label =
              id +
              (id[0] === 'I'
                ? ''
                : names.length
                  ? ' · ' + names.join(' / ')
                  : '');
          }
          return [
            c.id + ':' + id,
            {
              side: p.side,
              label,
              rotate:
                c.kind === 'esp32' &&
                id.startsWith('exp-') &&
                id.includes('-S-'),
            },
          ];
        }),
    ),
  );
  const style = await page.addStyleTag({
    content:
      '.wiring-canvas-controls{visibility:hidden}.wire-pin span{display:none!important}.wire-pin[data-capture-pin] span{display:block!important;font-family:Arial,sans-serif!important;font-size:12px!important;line-height:12px!important;padding:0 2px!important;white-space:nowrap!important;background:white!important;color:#243a44!important;border:1px solid #dbe2e7!important}',
  });
  try {
    await page.evaluate(
      ({ pins, components }) => {
        for (const pin of document.querySelectorAll('.wire-pin')) {
          const ref = pin.dataset.endpoint,
            info = pins[ref];
          if (!info) continue;
          pin.dataset.capturePin = 'true';
          const label = pin.querySelector('span'),
            side = info.side;
          if (info.label) label.textContent = info.label;
          Object.assign(label.style, {
            left: 'auto',
            right: 'auto',
            top: 'auto',
            bottom: 'auto',
            transform: 'none',
          });
          if (info.rotate)
            Object.assign(label.style, {
              left: '50%',
              transformOrigin: '0 50%',
              transform: 'rotate(-90deg)',
              top: side === 'top' ? '-25px' : '85px',
            });
          else if (side === 'left')
            Object.assign(label.style, {
              right: 'calc(100% + 7px)',
              top: '50%',
              transform: 'translateY(-50%)',
            });
          else if (side === 'right')
            Object.assign(label.style, {
              left: 'calc(100% + 7px)',
              top: '50%',
              transform: 'translateY(-50%)',
            });
          else
            Object.assign(label.style, {
              left: '50%',
              transform: 'translateX(-50%)',
              [side === 'top' ? 'bottom' : 'top']:
                'calc(100% + ' + (ref.endsWith(':B') ? 40 : 9) + 'px)',
            });
        }
        const viewport = document
          .querySelector('.wiring-viewport')
          .getBoundingClientRect();
        const overlaps = (a, b) =>
          a.left < b.right &&
          a.right > b.left &&
          a.top < b.bottom &&
          a.bottom > b.top;
        const wireRects = [
          ...document.querySelectorAll(
            '.wiring-lines path[data-wire]:not(.wire-hit)',
          ),
        ].flatMap((path) => {
          const points = JSON.parse(path.dataset.points),
            matrix = path.getScreenCTM();
          return points.slice(1).map((p, i) => {
            const a = new DOMPoint(points[i].x, points[i].y).matrixTransform(
                matrix,
              ),
              b = new DOMPoint(p.x, p.y).matrixTransform(matrix);
            const rect = {
              left: Math.min(a.x, b.x) - 4,
              right: Math.max(a.x, b.x) + 4,
              top: Math.min(a.y, b.y) - 4,
              bottom: Math.max(a.y, b.y) + 4,
            };
            return { getBoundingClientRect: () => rect };
          });
        });
        for (const c of components.filter((c) => !c.breadboardMount)) {
          const card = document.querySelector(`[data-component="${c.id}"]`),
            name = document.createElement('div');
          name.textContent = c.name;
          name.dataset.captureLabel = 'true';
          Object.assign(name.style, {
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
            font: '600 17px Arial,sans-serif',
            color: '#243a44',
            background: '#fff',
            padding: '4px 8px',
            borderRadius: '5px',
          });
          card.append(name);
          const candidates = [
            { left: '50%', top: '-48px' },
            { left: '50%', top: 'calc(100% + 12px)' },
            { left: '50%', top: '-150px' },
            { left: 'calc(100% + 95px)', top: '45%' },
            { left: '-95px', top: '45%' },
          ];
          const obstacles = [
            ...document.querySelectorAll(
              '.wire-pin[data-capture-pin] span,.wiring-component img,[data-capture-label]',
            ),
            ...wireRects,
          ].filter((el) => el !== name);
          for (const pos of candidates) {
            Object.assign(name.style, pos);
            const box = name.getBoundingClientRect();
            if (
              box.left >= viewport.left &&
              box.right <= viewport.right &&
              box.top >= viewport.top &&
              box.bottom <= viewport.bottom &&
              !obstacles.some((el) => overlaps(box, el.getBoundingClientRect()))
            )
              break;
          }
        }
        const labels = [
          ...document.querySelectorAll(
            '.wire-pin[data-capture-pin] span,[data-capture-label]',
          ),
        ];
        for (let i = 0; i < labels.length; i++) {
          const a = labels[i].getBoundingClientRect();
          if (
            a.left < viewport.left ||
            a.right > viewport.right ||
            a.top < viewport.top ||
            a.bottom > viewport.bottom
          )
            throw Error('Label outside image: ' + labels[i].textContent);
          for (const other of labels.slice(i + 1))
            if (overlaps(a, other.getBoundingClientRect()))
              throw Error(
                'Overlapping labels: ' +
                  labels[i].textContent +
                  ' / ' +
                  other.textContent,
              );
        }
      },
      { pins, components: state.components },
    );
    await page
      .locator('.wiring-viewport')
      .screenshot({ path, animations: 'disabled' });
    return await page.locator('.wiring-viewport').boundingBox();
  } finally {
    await style.evaluate((node) => node.remove());
    await page.locator('[data-close]').click();
  }
}
