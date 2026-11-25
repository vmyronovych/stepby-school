import { CIRC } from './parts';
import { CIRC_WIRE_R, CIRC_LEAK } from './constants';
import type {
  CircuitPart,
  Wire,
  SolverBranch,
  ElectricalElement,
} from './types';
/* =========================================================
   РОЗВ'ЯЗУВАЧ ЕЛЕКТРИЧНОГО КОЛА (метод вузлових потенціалів)
   ---------------------------------------------------------
   Кіл на гуртку небагато (5–30 вузлів), тож рахуємо чесно:
   вузол = контакт деталі, дріт = дуже малий опір (щоб знати
   струм у кожному дроті, а не лише у вузлах).

   Двоконтактна деталь через elec(part) віддає один елемент.
   Багатоконтактна через branches(part, voltages) віддає гілки
   між конкретними контактами; стани ключів перераховуються
   за напругами вузлів до усталеного рішення:
     {kind:'R', r}                  — опір
     {kind:'D', vf, rd, a, k}       — клапан (світлодіод, пищалка):
                                      пропускає лише від a до k,
                                      забираючи vf вольт, опір rd
     {kind:'V', v, r}               — джерело: контакт 0 = «+»
     {kind:'open'}                  — розрив (струму немає)

   Результат: струм у кожній деталі (від контакту 0 до 1) і в
   кожному дроті (від кінця a до b) — у звичному напрямку, від
   «+» до «−». Електрони біжать навпаки.

   Рахується лише при зміні стану кола (живлення, вимикач,
   кнопка, щось згоріло), а не на кожен кадр.
   ========================================================= */

export function solveCircuit(board: { parts: CircuitPart[]; wires: Wire[] }) {
  const node = new Map<string, number>(); // "partId:t" -> індекс вузла
  const nid = (p: string, t: number): number => {
    const k = p + ':' + t;
    if (!node.has(k)) node.set(k, node.size);
    return node.get(k) ?? 0;
  };
  // Allocate every terminal before the nonlinear iteration.
  for (const p of board.parts)
    CIRC.parts[p.type].terms.forEach((_, t) => nid(p.id, t));
  for (const w of board.wires) {
    nid(w.a.p, w.a.t);
    nid(w.b.p, w.b.t);
  }
  const branches = (voltages: number[]): SolverBranch[] => {
    const result: SolverBranch[] = [];
    for (const p of board.parts) {
      const def = CIRC.parts[p.type];
      if (def.branches) {
        for (const branch of def.branches(
          p,
          def.terms.map((_, t) => voltages[nid(p.id, t)] ?? 0),
        ))
          result.push({
            src: 'part',
            id: p.id + ':' + branch.key,
            n0: nid(p.id, branch.from),
            n1: nid(p.id, branch.to),
            e: branch.element,
          });
      } else
        result.push({
          src: 'part',
          id: p.id,
          n0: nid(p.id, 0),
          n1: nid(p.id, 1),
          e: def.elec(p),
        });
    }
    for (const w of board.wires)
      result.push({
        src: 'wire',
        id: w.id,
        n0: nid(w.a.p, w.a.t),
        n1: nid(w.b.p, w.b.t),
        e: { kind: 'R', r: CIRC_WIRE_R },
      });
    return result;
  };
  const n = node.size;
  let V = new Array<number>(n).fill(0);
  let els = branches(V);
  const diodeStates = new Map<string, boolean>();
  for (let iter = 0; iter < 80; iter++) {
    els = branches(V);
    for (const d of els)
      if (d.e.kind === 'D') d.on = diodeStates.get(d.id) ?? false;
    V = solveLinear(n, els);
    let changed = false;
    for (const d of els) {
      if (d.e.kind !== 'D') continue;
      const va = V[d.e.a === 0 ? d.n0 : d.n1],
        vk = V[d.e.a === 0 ? d.n1 : d.n0];
      const on = d.on ?? false;
      const next = on
        ? (va - vk - d.e.vf) / d.e.rd >= -1e-9
        : va - vk > d.e.vf + 1e-6;
      if (next !== on) changed = true;
      diodeStates.set(d.id, next);
    }
    const next = branches(V);
    if (
      !changed &&
      next.every((b, i) => JSON.stringify(b.e) === JSON.stringify(els[i].e))
    )
      break;
  }
  const I: Record<string, number> = {}; // id -> струм від контакту 0 до 1 (дріт: від a до b)
  for (const x of els) I[x.id] = branchCurrent(x, V[x.n0] || 0, V[x.n1] || 0);
  return { I, V, node };
}

export function branchCurrent(x: SolverBranch, v0: number, v1: number) {
  const e = x.e;
  if (e.kind === 'R') return (v0 - v1) / e.r;
  if (e.kind === 'V') return (v0 - v1 - e.v) / e.r; // додатний = заряджається; розряд дає від'ємний
  if (e.kind === 'D') {
    if (!x.on) return 0;
    const i = ((e.a === 0 ? v0 - v1 : v1 - v0) - e.vf) / e.rd;
    return e.a === 0 ? i : -i;
  }
  return 0;
}

export function solveLinear(n: number, els: SolverBranch[]) {
  const G = Array.from({ length: n }, () => new Array(n).fill(0));
  const b = new Array(n).fill(0);
  const stamp = (i: number, j: number, g: number) => {
    G[i][i] += g;
    G[j][j] += g;
    G[i][j] -= g;
    G[j][i] -= g;
  };
  for (let i = 0; i < n; i++) G[i][i] += CIRC_LEAK;
  for (const x of els) {
    const e = x.e,
      i = x.n0,
      j = x.n1;
    if (e.kind === 'R') stamp(i, j, 1 / e.r);
    else if (e.kind === 'V') {
      // Нортон: провідність 1/r і струм v/r усередину «+»
      stamp(i, j, 1 / e.r);
      b[i] += e.v / e.r;
      b[j] -= e.v / e.r;
    } else if (e.kind === 'D') {
      const a = e.a === 0 ? i : j,
        k = e.a === 0 ? j : i;
      if (x.on) {
        stamp(a, k, 1 / e.rd);
        b[a] += e.vf / e.rd;
        b[k] -= e.vf / e.rd;
      } else stamp(a, k, CIRC_LEAK);
    }
  }
  // Гаусс із вибором головного елемента
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++)
      if (Math.abs(G[r][c]) > Math.abs(G[p][c])) p = r;
    [G[c], G[p]] = [G[p], G[c]];
    [b[c], b[p]] = [b[p], b[c]];
    const d = G[c][c];
    if (Math.abs(d) < 1e-30) continue;
    for (let r = c + 1; r < n; r++) {
      const f = G[r][c] / d;
      if (!f) continue;
      for (let k = c; k < n; k++) G[r][k] -= f * G[c][k];
      b[r] -= f * b[c];
    }
  }
  const x = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let s = b[r];
    for (let k = r + 1; k < n; k++) s -= G[r][k] * x[k];
    x[r] = Math.abs(G[r][r]) < 1e-30 ? 0 : s / G[r][r];
  }
  return x;
}
