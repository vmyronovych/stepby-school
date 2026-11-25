// A shared electrical endpoint is the only permitted contact between wires.
const eps = 0.01;
const same = (a, b) => Math.hypot(a.x - b.x, a.y - b.y) < eps;
const between = (v, a, b) =>
  v >= Math.min(a, b) - eps && v <= Math.max(a, b) + eps;
export function wireConflicts(wires, routes) {
  const issues = [];
  for (let i = 0; i < wires.length; i++)
    for (let j = i + 1; j < wires.length; j++) {
      const a = wires[i],
        b = wires[j],
        pa = routes.get(a.id),
        pb = routes.get(b.id);
      if (!pa || !pb) throw Error('Missing rendered wire route');
      const shared = [a.a, a.b]
        .filter((ref) => ref === b.a || ref === b.b)
        .map((ref) => (ref === a.a ? pa[0] : pa.at(-1)));
      for (let k = 1; k < pa.length; k++)
        for (let l = 1; l < pb.length; l++) {
          const p = pa[k - 1],
            q = pa[k],
            r = pb[l - 1],
            s = pb[l];
          if (same(p, q) || same(r, s)) continue;
          const ph = Math.abs(p.y - q.y) < eps,
            rh = Math.abs(r.y - s.y) < eps;
          let hit,
            overlap = false;
          if (ph === rh) {
            const axis = ph ? 'x' : 'y',
              fixed = ph ? 'y' : 'x';
            if (Math.abs(p[fixed] - r[fixed]) > eps) continue;
            const lo = Math.max(
                Math.min(p[axis], q[axis]),
                Math.min(r[axis], s[axis]),
              ),
              hi = Math.min(
                Math.max(p[axis], q[axis]),
                Math.max(r[axis], s[axis]),
              );
            if (hi < lo - eps) continue;
            hit = { ...p, [axis]: lo };
            overlap = hi - lo > eps;
          } else {
            const h = ph ? [p, q] : [r, s],
              v = ph ? [r, s] : [p, q];
            hit = { x: v[0].x, y: h[0].y };
            if (
              !between(hit.x, h[0].x, h[1].x) ||
              !between(hit.y, v[0].y, v[1].y)
            )
              continue;
          }
          if (!overlap && shared.some((e) => same(hit, e))) continue;
          issues.push({
            a: a.id,
            b: b.id,
            kind: overlap ? 'overlap' : 'crossing',
            point: hit,
          });
        }
    }
  return issues;
}
export function assertClearWires(state, routes) {
  const issues = wireConflicts(state.wires, routes);
  if (issues.length)
    throw Error('Wire intersections are forbidden: ' + JSON.stringify(issues));
}
