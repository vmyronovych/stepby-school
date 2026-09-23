/* =========================================================
   МАКЕТКА: ТЕ САМЕ КОЛО НА МАКЕТНІЙ ПЛАТІ 830
   ---------------------------------------------------------
   Макетка — не окреме коло, а інший вигляд ROBO.circuit.
   Схема лишається головною, а тут вона щоразу наново
   розкладається на плату; правки робляться на схемі.

   Плата 830: 63 стовпчики, у кожному дві смужки по 5 отворів
   (f–j зверху, a–e знизу), між ними жолоб; зверху й знизу по
   дві шини «+» і «−» уздовж усієї плати (10 груп по 5 отворів).

   Розкладка (cbBreadboard):
     • вузол схеми (усе, що з'єднано дротами) = смужка у верхній
       половині; вузли батарейки — верхні шини, батарейка стоїть
       ліворуч і з'єднана з ними червоним і чорним дротом;
     • деталь лежить ніжками у двох отворах одного ряду, рівно
       через 4 стовпчики; деталі одна одну не перекривають;
     • деталі беремо від «+» уздовж кола, тож послідовне коло
       стає ланцюжком, де сусіди ділять смужку;
     • ніжка на шині — нова смужка й перемичка від неї до шини;
       якщо смужка вузла вже є, але деталь до неї не дістає, —
       нова смужка й перемичка між ними (через жолоб).
   Повертає місце кожної деталі й дроти макетки — смужки, шини,
   перемички, ніжки — у тому ж вигляді, що й дроти схеми, тож
   solveCircuit рахує струм у кожному з них, а електрони біжать
   тим самим ланцюжком.
   ========================================================= */
const BB = {
  P:16, X0:150, COLS:63, W:1200, H:400, K:32 / 60,        // K: ніжки ±60 стають рівно через 4 отвори
  ROW:{j:140, i:156, h:172, g:188, f:204, e:240, d:256, c:272, b:288, a:304},
  RAIL:{'+':90, '−':106},
  BAT:{x:62, y:150, k:0.5},
};
const bbX = c => BB.X0 + (c - 1) * BB.P;
const bbRailHole = c => c >= 2 && c <= 61 && (c - 2) % 6 < 5;
const BB_JUMP = ['#2f9e44', '#f59f00', '#7048e8', '#e8590c', '#1098ad'];

let BB_BOARD = null;
function bbBoardSvg(){                                   // сама плата: не залежить від кола, малюємо раз
  if (BB_BOARD) return BB_BOARD;
  const x0 = bbX(1) - 22, x1 = bbX(BB.COLS) + 22, w = x1 - x0;
  let h = `<rect x="${x0}" y="62" width="${w}" height="312" rx="10" class="bb-body"/>
    <rect x="${x0}" y="216" width="${w}" height="12" class="bb-groove"/>
    <line x1="${x0}" x2="${x1}" y1="124" y2="124" class="bb-seam"/>
    <line x1="${x0}" x2="${x1}" y1="320" y2="320" class="bb-seam"/>`;
  for (const [y, cls, t] of [[78, 'plus', '+'], [118, 'minus', '−'], [326, 'plus', '+'], [366, 'minus', '−']]){
    h += `<line x1="${x0 + 24}" x2="${x1 - 24}" y1="${y}" y2="${y}" class="bb-line ${cls}"/>`;
    const ty = y + (cls === 'plus' ? 8 : 2);
    h += `<text x="${x0 + 12}" y="${ty}" class="bb-sign ${cls}">${t}</text><text x="${x1 - 12}" y="${ty}" class="bb-sign ${cls}">${t}</text>`;
  }
  const hole = (x, y) => `<rect x="${x - 2.5}" y="${y - 2.5}" width="5" height="5" rx="1"/>`;
  let holes = '';
  for (let c = 1; c <= BB.COLS; c++){
    for (const r in BB.ROW) holes += hole(bbX(c), BB.ROW[r]);
    if (bbRailHole(c)) for (const y of [90, 106, 338, 354]) holes += hole(bbX(c), y);
  }
  h += `<g class="bb-holes">${holes}</g>`;
  for (const c of [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60])
    h += `<text x="${bbX(c)}" y="131" class="bb-num">${c}</text><text x="${bbX(c)}" y="317" class="bb-num">${c}</text>`;
  for (const r in BB.ROW)
    h += `<text x="${x0 + 11}" y="${BB.ROW[r] + 3}" class="bb-num">${r}</text><text x="${x1 - 11}" y="${BB.ROW[r] + 3}" class="bb-num">${r}</text>`;
  return (BB_BOARD = h);
}

function cbBreadboard(B){
  const up = new Map(), root = k => { while (up.has(k)) k = up.get(k); return k; };
  const join = (a, b) => { a = root(a); b = root(b); if (a !== b) up.set(a, b); };
  for (const w of B.wires) join(w.a.p + ':' + w.a.t, w.b.p + ':' + w.b.t);
  const net = (id, t) => root(id + ':' + t);

  const L = {place:new Map(), wires:[], strips:[], rails:{'+':[], '−':[]}, h:BB.H, over:false};
  const bat = B.parts.find(p => p.type === 'battery');
  const rails = new Map();                                // вузол -> шина
  if (bat){ rails.set(net(bat.id, 1), '−'); rails.set(net(bat.id, 0), '+'); }

  let wid = 0, jumps = 0;
  const wire = (a, b, pts, kind, color) => L.wires.push({id:'bb' + wid++, a, b, pts, kind, color, rt:{I:0}, ph:0});
  const H = (c, r) => ({p:'H' + c + r, t:0});
  const R = (side, c) => ({p:'R' + side + c, t:0});
  const col = [], netCols = new Map(), spans = [], lanes = [];
  const railUsed = {'+':new Set(), '−':new Set()};
  const colsOf = n => netCols.get(n) || [];
  const claim = (c, n) => { col[c] = {net:n, rows:new Set()}; netCols.set(n, colsOf(n).concat(c)); };
  const take = (c, pref) => { const r = pref.find(q => !col[c].rows.has(q)); col[c].rows.add(r); return r; };
  const railHole = (side, c) => {
    for (let d = 0; d < BB.COLS; d++) for (const s of [c - d, c + d])
      if (bbRailHole(s) && !railUsed[side].has(s)){ railUsed[side].add(s); return s; }
  };

  function toRail(c, side){                               // перемичка від смужки до шини
    const r = take(c, ['j', 'i', 'h', 'g', 'f']), rc = railHole(side, c), x = bbX(c), xr = bbX(rc), y = BB.RAIL[side];
    const pts = x === xr ? [[x, BB.ROW[r]], [x, y]] : [[x, BB.ROW[r]], [x, 128], [xr, 128], [xr, y]];
    wire(H(c, r), R(side, rc), pts, 'jump', side === '+' ? '#e03131' : '#212529');
    L.rails[side].push(rc);
  }
  function bridge(a, b){                                  // перемичка між двома смужками одного вузла, по нижній половині
    const pref = ['f', 'g', 'h', 'i', 'j'], ra = take(a, pref), rb = take(b, pref);
    const x0 = Math.min(bbX(a), bbX(b)), x1 = Math.max(bbX(a), bbX(b));
    let k = 0;
    while ((lanes[k] || []).some(s => s[0] <= x1 + 6 && x0 - 6 <= s[1])) k++;
    (lanes[k] = lanes[k] || []).push([x0, x1]);
    const y = 234 + k * 12;
    wire(H(a, ra), H(b, rb), [[bbX(a), BB.ROW[ra]], [bbX(a), y], [bbX(b), y], [bbX(b), BB.ROW[rb]]], 'jump', BB_JUMP[jumps++ % BB_JUMP.length]);
  }

  // батарейка ліворуч, дроти від неї — у перші отвори верхніх шин
  if (bat){
    L.place.set(bat.id, {x:BB.BAT.x, y:BB.BAT.y, rot:0, mx:1, k:BB.BAT.k});
    const tx = BB.BAT.x + 100 * BB.BAT.k, ty = [BB.BAT.y - 40 * BB.BAT.k, BB.BAT.y + 40 * BB.BAT.k];
    railUsed['+'].add(2); railUsed['−'].add(2); L.rails['+'].push(2); L.rails['−'].push(2);
    wire({p:bat.id, t:0}, R('+', 2), [[tx, ty[0]], [125, ty[0]], [125, 90], [bbX(2), 90]], 'lead', '#e03131');
    wire({p:bat.id, t:1}, R('−', 2), [[tx, ty[1]], [137, ty[1]], [137, 106], [bbX(2), 106]], 'lead', '#212529');
    if (net(bat.id, 0) === net(bat.id, 1)){               // плюс і мінус з'єднані навпростець — перемичка між шинами
      const c = [...Array(BB.COLS).keys()].map(i => BB.COLS - i).find(bbRailHole);
      railUsed['+'].add(c); railUsed['−'].add(c); L.rails['+'].push(c); L.rails['−'].push(c);
      wire(R('+', c), R('−', c), [[bbX(c), 90], [bbX(c), 106]], 'jump', '#f59f00');
    }
  }

  // порядок: від «+» уздовж кола, тоді решта
  const others = B.parts.filter(p => p !== bat), byNet = new Map();
  for (const p of others) for (const t of [0, 1]){ const n = net(p.id, t); if (!byNet.has(n)) byNet.set(n, []); byNet.get(n).push(p); }
  const order = [], seen = new Set(), reached = new Set();
  const visit = n0 => {
    const q = [n0]; reached.add(n0);
    while (q.length){
      const n = q.shift();
      for (const p of byNet.get(n) || []){
        if (seen.has(p)) continue;
        seen.add(p);
        const tin = net(p.id, 0) === n ? 0 : 1, m = net(p.id, 1 - tin);
        order.push({p, tin});
        if (!reached.has(m)){ reached.add(m); q.push(m); }
      }
    }
  };
  if (bat) visit(net(bat.id, 0));
  for (const p of others) if (!seen.has(p)) visit(net(p.id, 0));

  // скільки перемичок коштує ніжка вузла n у стовпчику c (Infinity — не можна)
  const legCost = (c, n) => {
    if (c < 1 || c > BB.COLS) return Infinity;
    if (col[c]) return col[c].net === n && col[c].rows.size < 5 ? 0 : Infinity;
    return rails.has(n) || colsOf(n).length ? 1 : 0;
  };
  const spanFree = (a, b) => spans.every(s => Math.max(a, s[0]) >= Math.min(b, s[1]));
  const rowFor = (a, b) => ['h', 'g', 'i', 'f', 'j'].find(r => !(col[a] && col[a].rows.has(r)) && !(col[b] && col[b].rows.has(r)));

  let cursor = 4, tray = 0;
  for (const {p, tin} of order){
    const nIn = net(p.id, tin), nOut = net(p.id, 1 - tin);
    let best = null;
    for (const flip of [0, 1]){
      const [a, b] = flip ? [nOut, nIn] : [nIn, nOut];
      const cands = new Set([...colsOf(a), ...colsOf(b).map(c => c - 4), cursor]);
      for (const c of cands){
        const cost = legCost(c, a) + legCost(c + 4, b);
        if (cost === Infinity || !spanFree(c, c + 4)) continue;
        const r = rowFor(c, c + 4); if (!r) continue;
        const score = cost * 1000 + flip * 100 + (c === cursor ? 50 : 0) + c * 0.01;
        if (!best || score < best.score) best = {score, c, r, flip, a, b};
      }
    }
    if (!best){                                           // на платі не вмістилась — лежить поруч
      L.over = true; L.h = 450;
      L.place.set(p.id, {x:bbX(4) + tray++ * 90, y:420, rot:0, mx:1, k:BB.K});
      continue;
    }
    const {c, r, flip, a, b} = best, tLeft = flip ? 1 - tin : tin;
    for (const [cc, n, t] of [[c, a, tLeft], [c + 4, b, 1 - tLeft]]){
      const had = colsOf(n).slice();
      if (!col[cc]) claim(cc, n);
      col[cc].rows.add(r);
      wire({p:p.id, t}, H(cc, r), [[bbX(cc), BB.ROW[r]], [bbX(cc), BB.ROW[r]]], 'leg');
      if (had.includes(cc)) continue;
      if (rails.has(n)) toRail(cc, rails.get(n));
      else if (had.length){
        const room = had.filter(x => col[x].rows.size < 5);
        if (room.length) bridge(room.reduce((m, x) => Math.abs(x - cc) < Math.abs(m - cc) ? x : m), cc);
        else L.over = true;
      }
    }
    spans.push([c, c + 4]);
    L.place.set(p.id, {x:bbX(c) + 2 * BB.P, y:BB.ROW[r], rot:0, mx:tLeft === 0 ? 1 : -1, k:BB.K});
    cursor = Math.max(cursor, c + 6);
  }

  // смужки: під отворами одного стовпчика — метал, яким теж біжать електрони
  col.forEach((k, c) => {
    if (!k) return;
    const rs = [...k.rows].sort((u, v) => BB.ROW[u] - BB.ROW[v]);
    L.strips.push(c);
    for (let i = 1; i < rs.length; i++)
      wire(H(c, rs[i-1]), H(c, rs[i]), [[bbX(c), BB.ROW[rs[i-1]]], [bbX(c), BB.ROW[rs[i]]]], 'strip');
  });
  for (const side of ['+', '−']){
    const cs = [...new Set(L.rails[side])].sort((u, v) => u - v), y = BB.RAIL[side];
    for (let i = 1; i < cs.length; i++) wire(R(side, cs[i-1]), R(side, cs[i]), [[bbX(cs[i-1]), y], [bbX(cs[i]), y]], 'rail');
  }
  return L;
}

// підсвічені смужки й шини (метал, що з'єднує отвори), перемички й дроти батарейки
function bbCircuitSvg(L){
  let h = '';
  for (const c of L.strips) h += `<rect x="${bbX(c) - 6}" y="${BB.ROW.j - 7}" width="12" height="${BB.ROW.f - BB.ROW.j + 14}" rx="4" class="bb-strip"/>`;
  for (const side of ['+', '−']){
    const cs = L.rails[side]; if (cs.length < 2) continue;
    const x0 = bbX(Math.min(...cs)), x1 = bbX(Math.max(...cs));
    h += `<rect x="${x0 - 6}" y="${BB.RAIL[side] - 6}" width="${x1 - x0 + 12}" height="12" rx="4" class="bb-strip"/>`;
  }
  for (const w of L.wires){
    if (w.kind !== 'jump' && w.kind !== 'lead') continue;
    const d = w.pts.map(q => q.join(',')).join(' '), a = w.pts[0], z = w.pts[w.pts.length - 1];
    h += `<g class="bb-jump"><polyline points="${d}" class="edge"/><polyline points="${d}" stroke="${w.color}" class="core"/>` +
      (w.kind === 'lead' ? '' : `<circle cx="${a[0]}" cy="${a[1]}" r="3" class="plug"/>`) + `<circle cx="${z[0]}" cy="${z[1]}" r="3" class="plug"/></g>`;
  }
  return h;
}
