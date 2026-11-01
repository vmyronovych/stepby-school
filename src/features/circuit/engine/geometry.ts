import { CIRC } from './parts';
import { CB_GRID } from './constants';
import type { CircuitPart, Terminal, Point, Polyline, Position } from './types';
import { required } from './types';
export function cbRot(rot: number, x: number, y: number): Point {
  return rot === 1
    ? [-y, x]
    : rot === 2
      ? [-x, -y]
      : rot === 3
        ? [y, -x]
        : [x, y];
}
export function cbTerm(p: CircuitPart, t: number): Terminal {
  const d = CIRC.parts[p.type],
    [x, y] = cbRot(p.rot, d.terms[t][0], d.terms[t][1]);
  const [nx, ny] = cbRot(p.rot, d.norms[t][0], d.norms[t][1]);
  return { x: p.x + x, y: p.y + y, nx, ny };
}
export function cbBox(p: CircuitPart) {
  // межі деталі з підписами — дроти їх оминають
  const b = CIRC.parts[p.type].box;
  const c = [cbRot(p.rot, b[0], b[1]), cbRot(p.rot, b[2], b[3])];
  return {
    x0: p.x + Math.min(c[0][0], c[1][0]),
    y0: p.y + Math.min(c[0][1], c[1][1]),
    x1: p.x + Math.max(c[0][0], c[1][0]),
    y1: p.y + Math.max(c[0][1], c[1][1]),
  };
}

export function cbPoly(pts: Point[]): Polyline {
  const cum = [0];
  for (let i = 1; i < pts.length; i++)
    cum.push(
      cum[i - 1] +
        Math.abs(pts[i][0] - pts[i - 1][0]) +
        Math.abs(pts[i][1] - pts[i - 1][1]),
    );
  return { pts, cum, len: cum[cum.length - 1] };
}
export function cbAt(poly: Polyline, s: number): Point {
  const { pts, cum } = poly;
  let i = 1;
  while (i < pts.length - 1 && cum[i] < s) i++;
  const seg = cum[i] - cum[i - 1] || 1,
    k = Math.max(0, Math.min(1, (s - cum[i - 1]) / seg));
  return [
    pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k,
    pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k,
  ];
}
export function cbSimplify(pts: Point[]): Point[] {
  const out: Point[] = [];
  for (const q of pts) {
    const l = out[out.length - 1];
    if (l && l[0] === q[0] && l[1] === q[1]) continue;
    const m = out[out.length - 2];
    if (
      m &&
      ((m[0] === l[0] && l[0] === q[0]) || (m[1] === l[1] && l[1] === q[1]))
    )
      out[out.length - 1] = q;
    else out.push(q);
  }
  return out;
}

/* ---------- траса дроту: прямі кути, в обхід деталей ---------- */
export function cbRoute(
  A: Terminal,
  B: Terminal,
  parts: CircuitPart[],
): Point[] {
  const st = 20,
    g = (v: number) => Math.round(v / CB_GRID) * CB_GRID;
  const sA: Point = [A.x + A.nx * st, A.y + A.ny * st],
    sB: Point = [B.x + B.nx * st, B.y + B.ny * st];
  const xm = g((sA[0] + sB[0]) / 2),
    ym = g((sA[1] + sB[1]) / 2);
  const mids: Point[][] = [
    [[sB[0], sA[1]]],
    [[sA[0], sB[1]]],
    [
      [xm, sA[1]],
      [xm, sB[1]],
    ],
    [
      [sA[0], ym],
      [sB[0], ym],
    ],
  ];
  const xs = [Math.max(sA[0], sB[0]), Math.min(sA[0], sB[0])],
    ys = [Math.max(sA[1], sB[1]), Math.min(sA[1], sB[1])];
  for (const off of [40, 80, 140]) {
    for (const [x, sgn] of [
      [xs[0], 1],
      [xs[1], -1],
    ]) {
      const X = x + sgn * off;
      mids.push([
        [X, sA[1]],
        [X, sB[1]],
      ]);
    }
    for (const [y, sgn] of [
      [ys[0], 1],
      [ys[1], -1],
    ]) {
      const Y = y + sgn * off;
      mids.push([
        [sA[0], Y],
        [sB[0], Y],
      ]);
    }
  }
  let best: Point[] | null = null,
    bestCost = Infinity;
  for (const m of mids) {
    const pts = cbSimplify([[A.x, A.y], sA, ...m, sB, [B.x, B.y]]);
    const cost = cbRouteCost(pts, parts);
    if (cost < bestCost) {
      bestCost = cost;
      best = pts;
    }
  }
  return required(best);
}
export function cbRouteCost(pts: Point[], parts: CircuitPart[]) {
  let cost = 0;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1],
      b = pts[i];
    cost += Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
    const x0 = Math.min(a[0], b[0]),
      x1 = Math.max(a[0], b[0]),
      y0 = Math.min(a[1], b[1]),
      y1 = Math.max(a[1], b[1]);
    for (const p of parts) {
      // крізь деталь чи її підпис — дорого
      const r = cbBox(p);
      if (x1 > r.x0 + 2 && x0 < r.x1 - 2 && y1 > r.y0 + 2 && y0 < r.y1 - 2)
        cost += 2000;
    }
    if (i >= 2) {
      // розворот назад по собі
      const c = pts[i - 2];
      const d1 = [Math.sign(a[0] - c[0]), Math.sign(a[1] - c[1])],
        d2 = [Math.sign(b[0] - a[0]), Math.sign(b[1] - a[1])];
      if (d1[0] === -d2[0] && d1[1] === -d2[1]) cost += 800;
    }
  }
  return cost + pts.length * 12; // менше зламів — охайніше
}
