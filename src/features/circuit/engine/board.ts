import { CIRC } from './parts';
import { cbTerm } from './geometry';
import { CB_GRID, CB_W, CB_H } from './constants';
import type {
  CircuitBoard,
  CircuitPart,
  Endpoint,
  Wire,
  Point,
  PartProperties,
  PartState,
  Breadboard,
} from './types';
import { required } from './types';
import { parseSnapshot } from './snapshot';
interface CircuitClipboard {
  n: number;
  parts: {
    type: string;
    x: number;
    y: number;
    rot: number;
    props: PartProperties;
  }[];
  wires: { a: { i: number; t: number }; b: { i: number; t: number } }[];
}
export function cbNewBoard(starter: boolean): CircuitBoard {
  const B: CircuitBoard = {
    parts: [],
    wires: [],
    next: 1,
    sel: [],
    pop: null,
    sticky: null,
    undo: [],
    redo: [],
    bb: { place: {}, jumps: [] },
  };
  if (starter) {
    const b = cbAddPart(B, 'battery', 180, 340).id,
      r = cbAddPart(B, 'resistor', 600, 120).id;
    const l = cbAddPart(B, 'led', 1000, 340, 1).id,
      s = cbAddPart(B, 'switch', 600, 560).id;
    const connections: [string, number, string, number][] = [
      [b, 0, r, 0],
      [r, 1, l, 0],
      [l, 1, s, 1],
      [s, 0, b, 1],
    ];
    connections.forEach((w) =>
      cbAddWire(B, { p: w[0], t: w[1] }, { p: w[2], t: w[3] }),
    );
  }
  return B;
}
export function cbAddPart(
  B: CircuitBoard,
  type: string,
  x: number,
  y: number,
  rot = 0,
): CircuitPart {
  const init = CIRC.parts[type].init();
  const p: CircuitPart = {
    id: 'p' + B.next++,
    type,
    x,
    y,
    rot: rot || 0,
    props: init.props,
    s: init.s,
    rt: { I: 0, vrev: 0, vfw: 0 },
    ph: 0,
    ramp: [0, 0],
  };
  B.parts.push(p);
  return p;
}
export function cbAddWire(
  B: CircuitBoard,
  a: Endpoint,
  b: Endpoint,
): Wire | null {
  const same = (u: Endpoint, v: Endpoint) => u.p === v.p && u.t === v.t;
  if (same(a, b)) return null;
  if (
    B.wires.some(
      (w) => (same(w.a, a) && same(w.b, b)) || (same(w.a, b) && same(w.b, a)),
    )
  )
    return null;
  const w = { id: 'w' + B.next++, a, b, rt: { I: 0 }, ph: 0 };
  B.wires.push(w);
  return w;
}

/* ---------- правки схеми: вставити в дріт, вийняти з кола ---------- */
// дроти деталі: яким контактом вони до неї йдуть і де їхній дальній кінець
export function cbLinks(B: CircuitBoard, id: string) {
  const out = [];
  for (const w of B.wires) {
    if (w.a.p === id) out.push({ w, t: w.a.t, far: w.b });
    if (w.b.p === id) out.push({ w, t: w.b.t, far: w.a });
  }
  return out;
}
// деталь стоїть у колі: до обох її контактів іде дріт від іншої деталі
export function cbInCircuit(B: CircuitBoard, id: string) {
  const l = cbLinks(B, id).filter((x) => x.far.p !== id);
  return l.some((x) => x.t === 0) && l.some((x) => x.t === 1);
}
// Вийняти деталь: її дроти зникають, а сусіди з'єднуються напряму,
// так ніби на її місці тепер шматок дроту. Коло лишається цілим.
export function cbExtract(B: CircuitBoard, id: string) {
  const ends: Endpoint[] = [];
  for (const x of cbLinks(B, id))
    if (x.far.p !== id && !ends.some((e) => e.p === x.far.p && e.t === x.far.t))
      ends.push(x.far);
  B.wires = B.wires.filter((w) => w.a.p !== id && w.b.p !== id);
  for (let i = 1; i < ends.length; i++) cbAddWire(B, ends[0], ends[i]);
}
// Вставити вільну деталь у дріт: дріт розрізається, і деталь стає між його
// кінцями. Ближчий до кожного кінця контакт і з'єднуємо з ним.
export function cbInsert(B: CircuitBoard, p: CircuitPart, w: Wire) {
  B.wires = B.wires.filter((x) => x !== w);
  const at = (e: Endpoint) =>
    cbTerm(required(B.parts.find((q) => q.id === e.p)), e.t);
  const A = at(w.a),
    Z = at(w.b),
    t0 = cbTerm(p, 0),
    t1 = cbTerm(p, 1);
  const d = (u: { x: number; y: number }, v: { x: number; y: number }) =>
    Math.abs(u.x - v.x) + Math.abs(u.y - v.y);
  const k = d(A, t0) + d(Z, t1) <= d(A, t1) + d(Z, t0) ? 0 : 1;
  cbAddWire(B, w.a, { p: p.id, t: k });
  cbAddWire(B, { p: p.id, t: 1 - k }, w.b);
}

/* ---------- скасування: знімки схеми ---------- */
// У знімку лише те, що склав учень: деталі, їхні місця й властивості, дроти.
// Стан деталей (згорів, розряджена, увімкнений) скасуванням не повертається —
// спалений резистор так і лишається спаленим.
export function cbSnap(B: CircuitBoard) {
  return JSON.stringify({
    next: B.next,
    parts: B.parts.map((p) => ({
      id: p.id,
      type: p.type,
      x: p.x,
      y: p.y,
      rot: p.rot,
      props: p.props,
      s: p.s,
    })),
    wires: B.wires.map((w) => ({ id: w.id, a: w.a, b: w.b })),
    bb: B.bb,
  });
}
export function cbRestore(B: CircuitBoard, snap: string) {
  const o = parseSnapshot(snap),
    now = new Map(B.parts.map((p) => [p.id, p]));
  B.parts = o.parts.map((q) =>
    Object.assign(q, {
      s: now.has(q.id) ? required(now.get(q.id)).s : q.s,
      rt: { I: 0, vrev: 0, vfw: 0 },
      ph: 0,
      ramp: [0, 0],
    }),
  );
  B.wires = o.wires.map((w) => Object.assign(w, { rt: { I: 0 }, ph: 0 }));
  B.next = Math.max(B.next, o.next);
  B.bb = o.bb || { place: {}, jumps: [] };
  const ids = new Set(
    B.parts
      .map((p) => p.id)
      .concat(
        B.wires.map((w) => w.id),
        B.bb.jumps.map((j) => j.id),
      ),
  );
  B.sel = B.sel.filter((id) => ids.has(id));
  B.pop = null;
}

/* ---------- буфер обміну (у пам'яті, як і решта даних) ---------- */
export let CB_CLIP: CircuitClipboard | null = null; // {parts:[{type,x,y,rot,props}], wires:[{a:{i,t}, b:{i,t}}]}, n — скільки разів вставлено
export function cbCopy(B: CircuitBoard, ids: string[]) {
  const parts = B.parts.filter((p) => ids.includes(p.id));
  if (!parts.length) return false;
  const idx = new Map(parts.map((p, i) => [p.id, i]));
  CB_CLIP = {
    n: 0,
    parts: parts.map((p) => ({
      type: p.type,
      x: p.x,
      y: p.y,
      rot: p.rot,
      props: { ...p.props },
    })),
    wires: B.wires
      .filter((w) => idx.has(w.a.p) && idx.has(w.b.p))
      .map((w) => ({
        a: { i: required(idx.get(w.a.p)), t: w.a.t },
        b: { i: required(idx.get(w.b.p)), t: w.b.t },
      })),
  };
  return true;
}
// Вставляє копію навколо точки at (або зі зсувом від оригіналу). Повертає id нових деталей.
export function cbPaste(B: CircuitBoard, at?: Point | null) {
  if (!CB_CLIP) return [];
  const src = CB_CLIP.parts,
    g = (v: number) => Math.round(v / CB_GRID) * CB_GRID;
  const cx = src.reduce((s, q) => s + q.x, 0) / src.length,
    cy = src.reduce((s, q) => s + q.y, 0) / src.length;
  CB_CLIP.n++;
  let dx = at ? g(at[0] - cx) : 40 * CB_CLIP.n,
    dy = at ? g(at[1] - cy) : 40 * CB_CLIP.n;
  const xs = src.map((q) => q.x + dx),
    ys = src.map((q) => q.y + dy); // увесь гурт лишається на полі
  dx +=
    Math.max(0, 60 - Math.min(...xs)) -
    Math.max(0, Math.max(...xs) - (CB_W - 60));
  dy +=
    Math.max(0, 60 - Math.min(...ys)) -
    Math.max(0, Math.max(...ys) - (CB_H - 60));
  const made = src.map((q) => {
    if (CIRC.parts[q.type].single && B.parts.some((p) => p.type === q.type))
      return null;
    const p = cbAddPart(B, q.type, q.x + dx, q.y + dy, q.rot);
    p.props = { ...q.props };
    return p;
  });
  for (const w of CB_CLIP.wires)
    if (made[w.a.i] && made[w.b.i])
      cbAddWire(
        B,
        { p: required(made[w.a.i]).id, t: w.a.t },
        { p: required(made[w.b.i]).id, t: w.b.t },
      );
  return made
    .filter((part): part is CircuitPart => part !== null)
    .map((p) => p.id);
}
