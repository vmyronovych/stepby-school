import type { PartDefinition } from './types';

const line =
  'fill="none" stroke="#536471" stroke-width="5" stroke-linecap="round"';
const text = (x: number, y: number, value: string, size = 18) =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-family="system-ui" fill="#203342">${value}</text>`;
const base = {
  rotatable: false,
  path: null,
  elec: () => ({ kind: 'open' as const }),
  labels: () => [],
  init: () => ({ props: {}, s: {} }),
};
export const powerParts: Record<string, PartDefinition> = {
  motor: {
    ...base,
    name: 'Мотор',
    labels: () => [{ x: 0, y: 76, t: 'Мотор', cls: '' }],
    pal: 7,
    rotatable: true,
    terms: [
      [-60, 0],
      [60, 0],
    ],
    norms: [
      [-1, 0],
      [1, 0],
    ],
    box: [-48, -48, 48, 80],
    path: [
      [-60, 0],
      [60, 0],
    ],
    // Steady-state teaching load. No inductance, back EMF or mechanical inertia.
    elec: () => ({ kind: 'R', r: 24 }),
    draw: () =>
      `<path d="M-60 0H60" ${line}/><circle r="43" fill="#fff4d6" stroke="#a47722" stroke-width="4"/><g class="cb-rotor"><path d="M0-32V32M-32 0H32" stroke="#a47722" stroke-width="7"/></g><circle r="11" fill="#a47722"/>`,
    paint(p, g, { t, still }) {
      const moving = Math.abs(p.rt.I) > 0.001;
      g.setAttribute('data-running', String(moving));
      g.setAttribute('data-direction', String(Math.sign(p.rt.I)));
      g.querySelector('.cb-rotor')?.setAttribute(
        'transform',
        `rotate(${moving && !still ? t * 130 * Math.sign(p.rt.I) : 0})`,
      );
    },
  },
  npn: {
    ...base,
    name: 'Транзистор',
    labels: () => [{ x: 140, y: -80, t: 'Транзистор', cls: '' }],
    pal: 8,
    // Three visual paths meet at the base bar; emitter current is Ic + Ib.
    flows: [
      {
        from: 0,
        to: 3,
        path: [
          [0, -70],
          [0, -34],
          [-28, -8],
          [-28, 0],
        ],
        current: (p) => p.rt.branches?.collector ?? 0,
      },
      {
        from: 2,
        to: 3,
        path: [
          [-90, 0],
          [-28, 0],
        ],
        current: (p) => p.rt.branches?.base ?? 0,
      },
      {
        from: 3,
        to: 1,
        path: [
          [-28, 0],
          [-28, 8],
          [0, 34],
          [0, 70],
        ],
        current: (p) =>
          (p.rt.branches?.collector ?? 0) + (p.rt.branches?.base ?? 0),
      },
    ],
    terms: [
      [0, -70],
      [0, 70],
      [-90, 0],
    ],
    norms: [
      [0, -1],
      [0, 1],
      [-1, 0],
    ],
    box: [-74, -60, 80, 62],
    // Idealized NPN switch, not an amplifier or a model of a specific part.
    // The base-emitter junction draws current; an external series resistor limits it.
    branches: (_p, v) => {
      const baseCurrent = Math.max(0, ((v[2] ?? 0) - (v[1] ?? 0) - 0.7) / 10);
      return [
        {
          key: 'base',
          from: 2,
          to: 1,
          element: { kind: 'D', vf: 0.7, rd: 10, a: 0, k: 1 },
        },
        {
          key: 'collector',
          from: 0,
          to: 1,
          element:
            baseCurrent >= 0.001
              ? { kind: 'D', vf: 0.2, rd: 1, a: 0, k: 1 }
              : { kind: 'open' },
        },
      ];
    },
    draw: () => `<circle cx="-15" cy="0" r="45" fill="white" stroke="#111" stroke-width="3"/>
      <path d="M0-70V-34L-28-8M-90 0H-28M-28-28V28M-28 8L0 34V70" fill="none" stroke="#111" stroke-width="7" stroke-linecap="square"/>
      <path d="M0 34L-22 27L-7 12Z" fill="#111"/>
      ${text(-68, -15, 'B')}${text(22, -51, 'C')}${text(22, 62, 'E')}`,
    say: 'B — база, C — колектор, E — емітер. Струм через базу керує струмом від колектора до емітера. Резистор перед базою обмежує струм керування. Це спрощена навчальна модель ключа.',
  },
};
