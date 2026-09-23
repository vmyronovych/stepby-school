/* =========================================================
   МАКЕТКА: ТЕ САМЕ КОЛО НА МАКЕТНІЙ ПЛАТІ 830
   ---------------------------------------------------------
   Плата 830: 63 стовпчики, у кожному дві смужки по 5 отворів
   (f–j зверху, a–e знизу), між ними жолоб; зверху й знизу по
   дві шини «+» і «−» уздовж усієї плати (10 груп по 5 отворів).

   Коло одне, а вигляди два. Схема й макетка — два записи тих
   самих з'єднань, і вони завжди збігаються:
     B.wires           — дроти схеми;
     B.bb.place[id]    — де стоїть деталь: {c, r, flip} — ліва
                         ніжка в стовпчику c ряду r, права через 4
                         отвори; flip — ніжка 0 праворуч;
     B.bb.jumps        — перемички {id, a:{c,r}, b:{c,r}, pts?, color}.
   Батарейка стоїть поза платою й з'єднана з верхніми шинами.

   Правка на макетці → cbSchemFromBoard: дроти схеми
   переписуються так, щоб з'єднання збіглися (зайві дроти
   прибираються, бракуючі додаються, решта лишається).
   Правка на схемі → cbBoardFromSchem: розкладка на макетці
   лагодиться, а не будується наново — деталі лишаються там,
   де їх поставили; зайве (деталь у чужій смужці, перемичка між
   різними вузлами) знімається, нові деталі стають у вільні
   смужки, а бракуючі з'єднання доповнюються перемичками.

   cbBreadboard(B) — для малювання й анімації: місце кожної
   деталі й дроти макетки (ніжки, смужки, шини, перемички) у
   тому ж вигляді, що й дроти схеми, тож solveCircuit рахує
   струм у кожному з них, а електрони біжать тим самим ланцюжком.
   ========================================================= */
const BB = {
  P:16, X0:150, COLS:63, W:1200, H:400, K:32 / 60,        // K: ніжки ±60 стають рівно через 4 отвори
  ROW:{tp:90, tm:106, j:140, i:156, h:172, g:188, f:204, e:240, d:256, c:272, b:288, a:304, bp:338, bm:354},
  BAT:{x:62, y:150, k:0.5},
};
const BB_UP = ['j', 'i', 'h', 'g', 'f'], BB_DN = ['e', 'd', 'c', 'b', 'a'];
const BB_JUMP = ['#2f9e44', '#f59f00', '#7048e8', '#e8590c', '#1098ad'];
const BB_LEADS = [{c:2, r:'tp'}, {c:2, r:'tm'}];          // куди встромлені дроти батарейки: «+» і «−»
const bbX = c => BB.X0 + (c - 1) * BB.P;
const bbRailHole = c => c >= 2 && c <= 61 && (c - 2) % 6 < 5;
const bbIsRail = r => r === 'tp' || r === 'tm' || r === 'bp' || r === 'bm';   // і ряд, і смужка-шина
const bbValid = h => h.c >= 1 && h.c <= BB.COLS && h.r in BB.ROW && (!bbIsRail(h.r) || bbRailHole(h.c));
const bbStrip = h => bbIsRail(h.r) ? h.r : (BB_UP.includes(h.r) ? 'U' : 'D') + h.c;   // отвори, з'єднані всередині
const bbKey = h => h.c + h.r;
const bbPt = h => [bbX(h.c), BB.ROW[h.r]];
// ніжки деталі: [отвір контакту 0, отвір контакту 1]
function bbLegs(pl){
  const l = {c:pl.c, r:pl.r}, r = {c:pl.c + 4, r:pl.r};
  return pl.flip ? [r, l] : [l, r];
}
function cbUF(){
  const up = new Map(), root = k => { while (up.has(k)) k = up.get(k); return k; };
  return {root, join(a, b){ a = root(a); b = root(b); if (a !== b) up.set(a, b); }};
}
function cbSchemNets(B){
  const u = cbUF();
  for (const w of B.wires) u.join(w.a.p + ':' + w.a.t, w.b.p + ':' + w.b.t);
  return (id, t) => u.root(id + ':' + t);
}
function bbBattery(B){ return B.parts.find(p => p.type === 'battery'); }

// хто займає отвори: ніжки, кінці перемичок, дроти батарейки. skip — не рахувати цю деталь чи перемичку
function bbOcc(B, skip){
  const occ = new Map(), bat = bbBattery(B);
  if (bat) BB_LEADS.forEach((h, t) => occ.set(bbKey(h), {p:bat.id, t, lead:true, h}));
  for (const p of B.parts){
    const pl = B.bb.place[p.id];
    if (pl && p.id !== skip) bbLegs(pl).forEach((h, t) => occ.set(bbKey(h), {p:p.id, t, h}));
  }
  for (const j of B.bb.jumps) if (j.id !== skip){ occ.set(bbKey(j.a), {j:j.id, h:j.a}); occ.set(bbKey(j.b), {j:j.id, h:j.b}); }
  return occ;
}

// з'єднання, як їх бачить макетка: смужки, шини, перемички
function bbBoardNets(B){
  const u = cbUF(), bat = bbBattery(B);
  if (bat) BB_LEADS.forEach((h, t) => u.join(bat.id + ':' + t, bbStrip(h)));
  for (const p of B.parts){
    const pl = B.bb.place[p.id];
    if (pl) bbLegs(pl).forEach((h, t) => u.join(p.id + ':' + t, bbStrip(h)));
  }
  for (const j of B.bb.jumps) u.join(bbStrip(j.a), bbStrip(j.b));
  // деталь, що не вмістилась на плату, тримає з'єднання схеми
  const off = id => id !== (bat && bat.id) && !B.bb.place[id];
  for (const w of B.wires) if (off(w.a.p) || off(w.b.p)) u.join(w.a.p + ':' + w.a.t, w.b.p + ':' + w.b.t);
  return (id, t) => u.root(id + ':' + t);
}

/* ---------- макетка → схема ---------- */
function cbSchemFromBoard(B){
  const bn = bbBoardNets(B), key = e => bn(e.p, e.t);
  B.wires = B.wires.filter(w => key(w.a) === key(w.b));    // дріт між тим, що на макетці роз'єднане, — зайвий
  const sn = cbSchemNets(B), groups = new Map();
  for (const p of B.parts) for (const t of [0, 1]){
    const n = bn(p.id, t);
    if (!groups.has(n)) groups.set(n, []);
    groups.get(n).push({p:p.id, t});
  }
  const pos = e => cbTerm(B.parts.find(p => p.id === e.p), e.t);
  for (const ts of groups.values()){
    const comps = new Map();                               // що вже з'єднано дротами схеми
    for (const e of ts){ const r = sn(e.p, e.t); if (!comps.has(r)) comps.set(r, []); comps.get(r).push(e); }
    const cs = [...comps.values()], done = cs[0].slice();
    for (const c of cs.slice(1)){                          // кожну частину — найкоротшим дротом до вже з'єднаного
      let best = null;
      for (const a of done) for (const b of c){
        const pa = pos(a), pb = pos(b), d = Math.abs(pa.x - pb.x) + Math.abs(pa.y - pb.y);
        if (!best || d < best.d) best = {a, b, d};
      }
      cbAddWire(B, best.a, best.b);
      done.push(...c);
    }
  }
}

/* ---------- схема → макетка: полагодити розкладку ---------- */
function cbBoardFromSchem(B){
  const bb = B.bb, sn = cbSchemNets(B), bat = bbBattery(B), ids = new Set(B.parts.map(p => p.id));
  const railNet = r => bat && (r === 'tp' ? sn(bat.id, 0) : r === 'tm' ? sn(bat.id, 1) : null);

  // 1. деталі, яких уже немає, і ті, що стоять поза отворами чи на зайнятих
  const taken = new Set(bat ? BB_LEADS.map(bbKey) : []);
  for (const id in bb.place) if (!ids.has(id) || (bat && id === bat.id)) delete bb.place[id];
  for (const p of B.parts){
    const pl = bb.place[p.id]; if (!pl) continue;
    const hs = bbLegs(pl);
    if (hs.some(h => !bbValid(h) || taken.has(bbKey(h)))) delete bb.place[p.id];
    else hs.forEach(h => taken.add(bbKey(h)));
  }
  bb.jumps = bb.jumps.filter(j => {
    if (!bbValid(j.a) || !bbValid(j.b) || bbKey(j.a) === bbKey(j.b) || taken.has(bbKey(j.a)) || taken.has(bbKey(j.b))) return false;
    taken.add(bbKey(j.a)); taken.add(bbKey(j.b)); return true;
  });

  // чиї смужки: вузли схеми, чиї ніжки в них стоять (і шини батарейки)
  const stripNets = () => {
    const m = new Map(), add = (s, n) => { if (!m.has(s)) m.set(s, new Map()); m.get(s).set(n, (m.get(s).get(n) || 0) + 1); };
    if (bat){ add('tp', railNet('tp')); add('tm', railNet('tm')); }
    for (const p of B.parts){ const pl = bb.place[p.id]; if (pl) bbLegs(pl).forEach((h, t) => add(bbStrip(h), sn(p.id, t))); }
    return m;
  };
  // 2. деталь у смужці чужого вузла — знімаємо (лишається вузол, якого там більше)
  for (;;){
    const bad = [...stripNets()].find(([, m]) => m.size > 1);
    if (!bad) break;
    const [s, m] = bad, keep = railNet(s) || [...m].sort((a, b) => b[1] - a[1])[0][0];
    for (const p of B.parts){
      const pl = bb.place[p.id];
      if (pl && bbLegs(pl).some((h, t) => bbStrip(h) === s && sn(p.id, t) !== keep)) delete bb.place[p.id];
    }
  }
  // 3. перемичка між різними вузлами — знімаємо
  const groupsOf = () => { const u = cbUF(); for (const j of bb.jumps) u.join(bbStrip(j.a), bbStrip(j.b)); return u; };
  for (;;){
    const sm = stripNets(), netOf = s => sm.has(s) ? [...sm.get(s).keys()][0] : null, u = groupsOf(), gn = new Map();
    for (const s of sm.keys()){ const g = u.root(s); if (!gn.has(g)) gn.set(g, new Set()); gn.get(g).add(netOf(s)); }
    const g = [...gn].find(([, ns]) => ns.size > 1);
    if (!g) break;
    const inG = j => u.root(bbStrip(j.a)) === g[0];
    const direct = bb.jumps.filter(j => inG(j) && netOf(bbStrip(j.a)) && netOf(bbStrip(j.b)) && netOf(bbStrip(j.a)) !== netOf(bbStrip(j.b)));
    const drop = new Set(direct.length ? direct : bb.jumps.filter(inG));
    bb.jumps = bb.jumps.filter(j => !drop.has(j));
  }

  // вузол кожної смужки з урахуванням перемичок (порожня смужка під перемичкою теж належить вузлу)
  const netMap = () => {
    const sm = stripNets(), u = groupsOf(), gnet = new Map();
    for (const [s, m] of sm) gnet.set(u.root(s), [...m.keys()][0]);
    return s => gnet.get(u.root(s)) || null;
  };

  // 4. нові (і зняті) деталі — у вільні смужки, від «+» уздовж кола
  const loose = B.parts.filter(p => p !== bat && !bb.place[p.id]);
  if (loose.length){
    const order = [], seen = new Set(), byNet = new Map();
    for (const p of loose) for (const t of [0, 1]){ const n = sn(p.id, t); if (!byNet.has(n)) byNet.set(n, []); byNet.get(n).push({p, t}); }
    const visit = n0 => {
      const q = [n0], reached = new Set([n0]);
      while (q.length){
        const n = q.shift();
        for (const {p, t} of byNet.get(n) || []){
          if (seen.has(p)) continue;
          seen.add(p); order.push({p, tin:t});
          const m = sn(p.id, 1 - t);
          if (!reached.has(m)){ reached.add(m); q.push(m); }
        }
      }
    };
    if (bat) visit(sn(bat.id, 0));
    for (const p of loose) if (!seen.has(p)) visit(sn(p.id, 0));
    for (const {p, tin} of order) bbAutoPlace(B, p, tin, sn, railNet, netMap());
  }

  // 5. вузол розкиданий по кількох смужках — доповнюємо перемичками
  bbConnect(B, sn, railNet);
}

// поставити одну деталь: ніжки в смужки своїх вузлів, інакше — у вільні
function bbAutoPlace(B, p, tin, sn, railNet, netOf){
  const bb = B.bb, occ = bbOcc(B), nets = [sn(p.id, 0), sn(p.id, 1)];
  const present = new Set();                              // вузли, які вже десь є на платі
  for (const q of B.parts){ const pl = bb.place[q.id]; if (pl) [0, 1].forEach(t => present.add(sn(q.id, t))); }
  if (railNet('tp')) present.add(railNet('tp'));
  if (railNet('tm')) present.add(railNet('tm'));
  const spans = B.parts.filter(q => bb.place[q.id]).map(q => bb.place[q.id]);
  let best = null;
  for (const half of ['U', 'D']){
    const rows = half === 'U' ? ['h', 'g', 'i', 'f', 'j'] : ['c', 'd', 'b', 'e', 'a'];
    const holeFree = h => !occ.has(bbKey(h));
    const legCost = (c, n) => {
      if (c < 1 || c > BB.COLS) return Infinity;
      const s = half + c, m = netOf(s), hs = rows.map(r => ({c, r}));
      if (m !== null && m !== n) return Infinity;
      if (!hs.some(holeFree)) return Infinity;
      if (m === n) return 0;
      if (hs.some(h => occ.has(bbKey(h)))) return Infinity;   // у смужці вже щось є (перемичка без вузла)
      return present.has(n) ? 1 : 0;                       // нова смужка вузла, що вже є на платі, — буде перемичка
    };
    const cands = new Set([4]);
    for (let c = 1; c <= BB.COLS; c++){ const m = netOf(half + c); if (m === nets[0] || m === nets[1]){ cands.add(c); cands.add(c - 4); } }
    for (let c = 4; c <= BB.COLS - 4; c++) if (netOf(half + c) === null && netOf(half + (c + 4)) === null) cands.add(c);
    for (const c of cands) for (const flip of [false, true]){
      const tl = flip ? 1 : 0;                             // який контакт ліворуч
      const cost = legCost(c, nets[tl]) + legCost(c + 4, nets[1 - tl]);
      if (cost === Infinity) continue;
      if (spans.some(s => BB_UP.includes(s.r) === (half === 'U') && Math.max(c, s.c) < Math.min(c + 4, s.c + 4))) continue;
      const r = rows.find(r => holeFree({c, r}) && holeFree({c:c + 4, r})); if (!r) continue;
      const score = cost * 1000 + (half === 'D' ? 500 : 0) + (tl !== tin ? 5 : 0) + c * 0.5;
      if (!best || score < best.score) best = {score, c, r, flip};
    }
  }
  if (best) bb.place[p.id] = {c:best.c, r:best.r, flip:best.flip};
}

// кожен вузол має бути однією групою смужок: бракуючі з'єднання — перемичками
function bbConnect(B, sn, railNet){
  const bb = B.bb;
  for (let guard = 0; guard < 60; guard++){
    const u = cbUF(); for (const j of bb.jumps) u.join(bbStrip(j.a), bbStrip(j.b));
    const byNet = new Map(), add = (n, s) => { if (!byNet.has(n)) byNet.set(n, new Set()); byNet.get(n).add(s); };
    for (const r of ['tp', 'tm']) if (railNet(r)) add(railNet(r), r);
    for (const p of B.parts){ const pl = bb.place[p.id]; if (pl) bbLegs(pl).forEach((h, t) => add(sn(p.id, t), bbStrip(h))); }
    let job = null;
    for (const [, ss] of byNet){
      const comps = new Map();
      for (const s of ss){ const g = u.root(s); if (!comps.has(g)) comps.set(g, []); comps.get(g).push(s); }
      if (comps.size < 2) continue;
      const cs = [...comps.values()].sort((a, b) => (b.some(bbIsRail) ? 1 : 0) - (a.some(bbIsRail) ? 1 : 0));
      job = [cs[0], cs[1]]; break;
    }
    if (!job) return;
    if (!bbJoin(B, job[0], job[1])) return;              // немає вільного отвору — лишаємо як є
  }
}

// з'єднати дві групи смужок найкоротшою перемичкою
function bbJoin(B, A, Z){
  const occ = bbOcc(B), free = h => bbValid(h) && !occ.has(bbKey(h));
  const colOf = s => bbIsRail(s) ? null : +s.slice(1);
  const holesOf = (s, near, toward) => {                  // вільні отвори смужки, найзручніші — першими
    if (bbIsRail(s)){
      const out = [];
      for (let d = 0; d < BB.COLS; d++) for (const c of [near - d, near + d]) if (free({c, r:s})) out.push({c, r:s});
      return out;
    }
    const c = colOf(s), up = s[0] === 'U';
    const pref = up ? (toward === 'tp' || toward === 'tm' ? ['j', 'i', 'h', 'g', 'f'] : ['f', 'g', 'h', 'i', 'j'])
                    : (toward === 'bp' || toward === 'bm' ? ['a', 'b', 'c', 'd', 'e'] : ['e', 'd', 'c', 'b', 'a']);
    return pref.map(r => ({c, r})).filter(free);
  };
  let best = null;
  for (const s of A) for (const z of Z){
    const cs = colOf(s), cz = colOf(z), d = cs === null || cz === null ? 0 : Math.abs(cs - cz);
    if (!best || d < best.d) best = {s, z, d};
  }
  const cs = colOf(best.s), cz = colOf(best.z);
  const a = holesOf(best.s, cz ?? cs ?? 2, best.z)[0], b = holesOf(best.z, a ? a.c : cs ?? 2, best.s)[0];
  if (!a || !b) return false;
  const color = [a.r, b.r].includes('tp') || [a.r, b.r].includes('bp') ? '#e03131'
    : [a.r, b.r].includes('tm') || [a.r, b.r].includes('bm') ? '#212529' : BB_JUMP[B.bb.jumps.length % BB_JUMP.length];
  B.bb.jumps.push({id:'j' + B.next++, a, b, pts:bbRoute(B, a, b), color});
  return true;
}

// траса перемички, яку поклала розкладка: прямо або «скобою» в обхід
function bbRoute(B, a, b){
  const [xa, ya] = bbPt(a), [xb, yb] = bbPt(b);
  if (xa === xb) return [[xa, ya], [xb, yb]];
  const top = r => r === 'tp' || r === 'tm', bot = r => r === 'bp' || r === 'bm';
  if ((top(a.r) && BB_UP.includes(b.r)) || (top(b.r) && BB_UP.includes(a.r))) return [[xa, ya], [xa, 128], [xb, 128], [xb, yb]];
  if ((bot(a.r) && BB_DN.includes(b.r)) || (bot(b.r) && BB_DN.includes(a.r))) return [[xa, ya], [xa, 318], [xb, 318], [xb, yb]];
  const x0 = Math.min(xa, xb), x1 = Math.max(xa, xb);
  const busy = y => B.bb.jumps.some(j => j.pts && j.pts.some((q, i) => i && q[1] === y && j.pts[i-1][1] === y &&
    Math.max(x0, Math.min(q[0], j.pts[i-1][0])) - 6 < Math.min(x1, Math.max(q[0], j.pts[i-1][0]))));
  const y = [222, 234, 210, 246, 198, 258, 186, 270, 174, 282].find(v => !busy(v)) || 222;
  return [[xa, ya], [xa, y], [xb, y], [xb, yb]];
}

/* ---------- малювання й анімація ---------- */
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
  let holes = '';
  for (let c = 1; c <= BB.COLS; c++) for (const r in BB.ROW){
    if (!bbValid({c, r})) continue;
    const [x, y] = bbPt({c, r});
    holes += `<rect x="${x - 2.5}" y="${y - 2.5}" width="5" height="5" rx="1"/>`;
  }
  h += `<g class="bb-holes">${holes}</g>`;
  for (const c of [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60])
    h += `<text x="${bbX(c)}" y="131" class="bb-num">${c}</text><text x="${bbX(c)}" y="317" class="bb-num">${c}</text>`;
  for (const r of BB_UP.concat(BB_DN))
    h += `<text x="${x0 + 11}" y="${BB.ROW[r] + 3}" class="bb-num">${r}</text><text x="${x1 - 11}" y="${BB.ROW[r] + 3}" class="bb-num">${r}</text>`;
  return (BB_BOARD = h);
}

function cbBreadboard(B){
  const L = {place:new Map(), wires:[], used:new Map(), h:BB.H};
  let wid = 0, tray = 0;
  const wire = (a, b, pts, kind, color) => L.wires.push({id:'bb' + wid++, a, b, pts, kind, color, rt:{I:0}, ph:0});
  const node = h => ({p:'H' + bbKey(h), t:0});
  const use = h => { const s = bbStrip(h); if (!L.used.has(s)) L.used.set(s, []); L.used.get(s).push(h); };
  const bat = bbBattery(B);
  if (bat){                                              // батарейка ліворуч, дроти від неї — у перші отвори верхніх шин
    L.place.set(bat.id, {x:BB.BAT.x, y:BB.BAT.y, rot:0, mx:1, k:BB.BAT.k});
    const tx = BB.BAT.x + 100 * BB.BAT.k, ty = [BB.BAT.y - 40 * BB.BAT.k, BB.BAT.y + 40 * BB.BAT.k];
    wire({p:bat.id, t:0}, node(BB_LEADS[0]), [[tx, ty[0]], [125, ty[0]], [125, 90], bbPt(BB_LEADS[0])], 'lead', '#e03131');
    wire({p:bat.id, t:1}, node(BB_LEADS[1]), [[tx, ty[1]], [137, ty[1]], [137, 106], bbPt(BB_LEADS[1])], 'lead', '#212529');
    BB_LEADS.forEach(use);
  }
  for (const p of B.parts){
    if (p === bat) continue;
    const pl = B.bb.place[p.id];
    if (!pl){                                            // не вмістилась — лежить під платою
      L.h = 450; L.place.set(p.id, {x:bbX(4) + tray++ * 90, y:420, rot:0, mx:1, k:BB.K});
      continue;
    }
    L.place.set(p.id, {x:bbX(pl.c) + 2 * BB.P, y:BB.ROW[pl.r], rot:0, mx:pl.flip ? -1 : 1, k:BB.K});
    bbLegs(pl).forEach((h, t) => { const q = bbPt(h); wire({p:p.id, t}, node(h), [q, q], 'leg'); use(h); });
  }
  for (const j of B.bb.jumps){
    wire(node(j.a), node(j.b), j.pts || [bbPt(j.a), bbPt(j.b)], 'jump', j.color);
    L.wires[L.wires.length - 1].jid = j.id;
    use(j.a); use(j.b);
  }
  // смужки й шини: метал під отворами, яким теж біжать електрони
  for (const [s, hs] of L.used){
    const uniq = [...new Map(hs.map(h => [bbKey(h), h])).values()].sort((u, v) => bbIsRail(s) ? u.c - v.c : BB.ROW[u.r] - BB.ROW[v.r]);
    for (let i = 1; i < uniq.length; i++) wire(node(uniq[i-1]), node(uniq[i]), [bbPt(uniq[i-1]), bbPt(uniq[i])], 'strip');
  }
  return L;
}

// підсвічені смужки й шини (метал, що з'єднує отвори), перемички й дроти батарейки
function bbCircuitSvg(L, isSel){
  let h = '';
  for (const [s, hs] of L.used){
    if (bbIsRail(s)){
      if (hs.length < 2) continue;
      const x0 = bbX(Math.min(...hs.map(q => q.c))), x1 = bbX(Math.max(...hs.map(q => q.c))), y = BB.ROW[s];
      h += `<rect x="${x0 - 6}" y="${y - 6}" width="${x1 - x0 + 12}" height="12" rx="4" class="bb-strip"/>`;
    } else {
      const rows = s[0] === 'U' ? BB_UP : BB_DN, x = bbX(+s.slice(1));
      h += `<rect x="${x - 6}" y="${BB.ROW[rows[0]] - 7}" width="12" height="${BB.ROW[rows[4]] - BB.ROW[rows[0]] + 14}" rx="4" class="bb-strip"/>`;
    }
  }
  for (const w of L.wires){
    if (w.kind !== 'jump' && w.kind !== 'lead') continue;
    const d = w.pts.map(q => q.join(',')).join(' '), a = w.pts[0], z = w.pts[w.pts.length - 1];
    const color = w.color || BB_JUMP[0];
    h += `<g class="bb-jump${w.jid && isSel(w.jid) ? ' sel' : ''}"${w.jid ? ` data-jump="${w.jid}"` : ''}>
      <polyline points="${d}" class="hit"/><polyline points="${d}" class="halo"/><polyline points="${d}" class="edge"/><polyline points="${d}" stroke="${color}" class="core"/>` +
      (w.kind === 'lead' ? '' : `<circle cx="${a[0]}" cy="${a[1]}" r="3" class="plug"/>`) + `<circle cx="${z[0]}" cy="${z[1]}" r="3" class="plug"/></g>`;
  }
  return h;
}
