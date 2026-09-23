/* =========================================================
   КОНСТРУКТОР ЕЛЕКТРИЧНОГО КОЛА
   ---------------------------------------------------------
   Вільна інтерактивна пісочниця для проєктора, тому вона
   поза реєстром інструментів. initRoboSim() викликає
   js/ui/doc.js після кожного рендера розділу; лічильник
   ROBO.simGen гасить попередній rAF-цикл.

   Три дії, і все: взяти деталь із панелі, з'єднати дротом
   (від контакту до контакту), двічі клацнути на деталь, щоб
   змінити її властивості. Коло живе завжди: щойно воно
   замкнулось, електрони біжать.

   Правка — як у звичних редакторах схем: деталь, кинута на
   дріт, розрізає його й стає в коло; «Вийняти з кола» (чи
   Alt+перетягнути), Ctrl+X і Delete забирають деталь, а її
   сусідів з'єднують напряму. Рамка й Shift виділяють кілька деталей;
   Ctrl+Z/Ctrl+Shift+Z, Ctrl+C/V/D, Delete, R, стрілки. Кінець
   вибраного дроту можна перетягнути на інший контакт.

   Дроти й деталі завжди рівно заповнені електронами. Коли йде
   струм, рушають усі одразу, швидкість у кожній гілці ∝ струму.
   Кімнати батарейки — запас: кожен електрон, що зайшов у «+»,
   переходить у кімнату «+», а з кімнати «−» у дріт виходить новий.

   Деталі описані в parts.js, струми рахує solver.js.
   ========================================================= */
const CB_W = 1200, CB_H = 680, CB_GRID = 20;

/* ---------- геометрія ---------- */
function cbRot(rot, x, y){
  return rot === 1 ? [-y, x] : rot === 2 ? [-x, -y] : rot === 3 ? [y, -x] : [x, y];
}
function cbTerm(p, t){
  const d = CIRC.parts[p.type], [x, y] = cbRot(p.rot, d.terms[t][0], d.terms[t][1]);
  const [nx, ny] = cbRot(p.rot, d.norms[t][0], d.norms[t][1]);
  return {x: p.x + x, y: p.y + y, nx, ny};
}
function cbBox(p){                                  // межі деталі з підписами — дроти їх оминають
  const b = CIRC.parts[p.type].box;
  const c = [cbRot(p.rot, b[0], b[1]), cbRot(p.rot, b[2], b[3])];
  return {x0: p.x + Math.min(c[0][0], c[1][0]), y0: p.y + Math.min(c[0][1], c[1][1]),
          x1: p.x + Math.max(c[0][0], c[1][0]), y1: p.y + Math.max(c[0][1], c[1][1])};
}

function cbPoly(pts){
  const cum = [0];
  for (let i = 1; i < pts.length; i++)
    cum.push(cum[i-1] + Math.abs(pts[i][0] - pts[i-1][0]) + Math.abs(pts[i][1] - pts[i-1][1]));
  return {pts, cum, len: cum[cum.length - 1]};
}
function cbAt(poly, s){
  const {pts, cum} = poly;
  let i = 1;
  while (i < pts.length - 1 && cum[i] < s) i++;
  const seg = cum[i] - cum[i-1] || 1, k = Math.max(0, Math.min(1, (s - cum[i-1]) / seg));
  return [pts[i-1][0] + (pts[i][0] - pts[i-1][0]) * k, pts[i-1][1] + (pts[i][1] - pts[i-1][1]) * k];
}
function cbSimplify(pts){
  const out = [];
  for (const q of pts){
    const l = out[out.length - 1];
    if (l && l[0] === q[0] && l[1] === q[1]) continue;
    const m = out[out.length - 2];
    if (m && ((m[0] === l[0] && l[0] === q[0]) || (m[1] === l[1] && l[1] === q[1]))) out[out.length - 1] = q;
    else out.push(q);
  }
  return out;
}

/* ---------- траса дроту: прямі кути, в обхід деталей ---------- */
function cbRoute(A, B, parts){
  const st = 20, g = v => Math.round(v / CB_GRID) * CB_GRID;
  const sA = [A.x + A.nx * st, A.y + A.ny * st], sB = [B.x + B.nx * st, B.y + B.ny * st];
  const xm = g((sA[0] + sB[0]) / 2), ym = g((sA[1] + sB[1]) / 2);
  const mids = [
    [[sB[0], sA[1]]], [[sA[0], sB[1]]],
    [[xm, sA[1]], [xm, sB[1]]], [[sA[0], ym], [sB[0], ym]],
  ];
  const xs = [Math.max(sA[0], sB[0]), Math.min(sA[0], sB[0])], ys = [Math.max(sA[1], sB[1]), Math.min(sA[1], sB[1])];
  for (const off of [40, 80, 140]){
    for (const [x, sgn] of [[xs[0], 1], [xs[1], -1]]){ const X = x + sgn * off; mids.push([[X, sA[1]], [X, sB[1]]]); }
    for (const [y, sgn] of [[ys[0], 1], [ys[1], -1]]){ const Y = y + sgn * off; mids.push([[sA[0], Y], [sB[0], Y]]); }
  }
  let best = null, bestCost = Infinity;
  for (const m of mids){
    const pts = cbSimplify([[A.x, A.y], sA, ...m, sB, [B.x, B.y]]);
    const cost = cbRouteCost(pts, parts);
    if (cost < bestCost){ bestCost = cost; best = pts; }
  }
  return best;
}
function cbRouteCost(pts, parts){
  let cost = 0;
  for (let i = 1; i < pts.length; i++){
    const a = pts[i-1], b = pts[i];
    cost += Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
    const x0 = Math.min(a[0], b[0]), x1 = Math.max(a[0], b[0]), y0 = Math.min(a[1], b[1]), y1 = Math.max(a[1], b[1]);
    for (const p of parts){                        // крізь деталь чи її підпис — дорого
      const r = cbBox(p);
      if (x1 > r.x0 + 2 && x0 < r.x1 - 2 && y1 > r.y0 + 2 && y0 < r.y1 - 2) cost += 2000;
    }
    if (i >= 2){                                   // розворот назад по собі
      const c = pts[i-2];
      const d1 = [Math.sign(a[0] - c[0]), Math.sign(a[1] - c[1])], d2 = [Math.sign(b[0] - a[0]), Math.sign(b[1] - a[1])];
      if (d1[0] === -d2[0] && d1[1] === -d2[1]) cost += 800;
    }
  }
  return cost + pts.length * 12;                    // менше зламів — охайніше
}

/* ---------- поле: деталі й дроти ---------- */
// на старті — перше коло із заняття 1, щоб поле не було порожнім
function cbNewBoard(starter){
  const B = {parts:[], wires:[], next:1, sel:[], pop:null, sticky:null, undo:[], redo:[]};
  if (starter){
    const b = cbAddPart(B, 'battery', 180, 340).id, r = cbAddPart(B, 'resistor', 600, 120).id;
    const l = cbAddPart(B, 'led', 1000, 340, 1).id, s = cbAddPart(B, 'switch', 600, 560).id;
    [[b,0, r,0], [r,1, l,0], [l,1, s,1], [s,0, b,1]].forEach(w => cbAddWire(B, {p:w[0], t:w[1]}, {p:w[2], t:w[3]}));
  }
  return B;
}
function cbAddPart(B, type, x, y, rot){
  const init = CIRC.parts[type].init();
  const p = {id:'p' + B.next++, type, x, y, rot:rot || 0, props:init.props, s:init.s, rt:{I:0, vrev:0, vfw:0}, ph:0, ramp:[0, 0]};
  B.parts.push(p);
  return p;
}
function cbAddWire(B, a, b){
  const same = (u, v) => u.p === v.p && u.t === v.t;
  if (same(a, b)) return null;
  if (B.wires.some(w => (same(w.a, a) && same(w.b, b)) || (same(w.a, b) && same(w.b, a)))) return null;
  const w = {id:'w' + B.next++, a, b, rt:{I:0}, ph:0};
  B.wires.push(w);
  return w;
}

/* ---------- правки схеми: вставити в дріт, вийняти з кола ---------- */
// дроти деталі: яким контактом вони до неї йдуть і де їхній дальній кінець
function cbLinks(B, id){
  const out = [];
  for (const w of B.wires){
    if (w.a.p === id) out.push({w, t:w.a.t, far:w.b});
    if (w.b.p === id) out.push({w, t:w.b.t, far:w.a});
  }
  return out;
}
// деталь стоїть у колі: до обох її контактів іде дріт від іншої деталі
function cbInCircuit(B, id){
  const l = cbLinks(B, id).filter(x => x.far.p !== id);
  return l.some(x => x.t === 0) && l.some(x => x.t === 1);
}
// Вийняти деталь: її дроти зникають, а сусіди з'єднуються напряму,
// так ніби на її місці тепер шматок дроту. Коло лишається цілим.
function cbExtract(B, id){
  const ends = [];
  for (const x of cbLinks(B, id))
    if (x.far.p !== id && !ends.some(e => e.p === x.far.p && e.t === x.far.t)) ends.push(x.far);
  B.wires = B.wires.filter(w => w.a.p !== id && w.b.p !== id);
  for (let i = 1; i < ends.length; i++) cbAddWire(B, ends[0], ends[i]);
}
// Вставити вільну деталь у дріт: дріт розрізається, і деталь стає між його
// кінцями. Ближчий до кожного кінця контакт і з'єднуємо з ним.
function cbInsert(B, p, w){
  B.wires = B.wires.filter(x => x !== w);
  const at = e => cbTerm(B.parts.find(q => q.id === e.p), e.t);
  const A = at(w.a), Z = at(w.b), t0 = cbTerm(p, 0), t1 = cbTerm(p, 1);
  const d = (u, v) => Math.abs(u.x - v.x) + Math.abs(u.y - v.y);
  const k = d(A, t0) + d(Z, t1) <= d(A, t1) + d(Z, t0) ? 0 : 1;
  cbAddWire(B, w.a, {p:p.id, t:k});
  cbAddWire(B, {p:p.id, t:1 - k}, w.b);
}

/* ---------- скасування: знімки схеми ---------- */
// У знімку лише те, що склав учень: деталі, їхні місця й властивості, дроти.
// Стан деталей (згорів, розряджена, увімкнений) скасуванням не повертається —
// спалений резистор так і лишається спаленим.
function cbSnap(B){
  return JSON.stringify({next:B.next,
    parts:B.parts.map(p => ({id:p.id, type:p.type, x:p.x, y:p.y, rot:p.rot, props:p.props, s:p.s})),
    wires:B.wires.map(w => ({id:w.id, a:w.a, b:w.b}))});
}
function cbRestore(B, snap){
  const o = JSON.parse(snap), now = new Map(B.parts.map(p => [p.id, p]));
  B.parts = o.parts.map(q => Object.assign(q, {s:now.has(q.id) ? now.get(q.id).s : q.s, rt:{I:0, vrev:0, vfw:0}, ph:0, ramp:[0, 0]}));
  B.wires = o.wires.map(w => Object.assign(w, {rt:{I:0}, ph:0}));
  B.next = Math.max(B.next, o.next);
  const ids = new Set(B.parts.map(p => p.id).concat(B.wires.map(w => w.id)));
  B.sel = B.sel.filter(id => ids.has(id));
  B.pop = null;
}

/* ---------- буфер обміну (у пам'яті, як і решта даних) ---------- */
let CB_CLIP = null;          // {parts:[{type,x,y,rot,props}], wires:[{a:{i,t}, b:{i,t}}]}, n — скільки разів вставлено
function cbCopy(B, ids){
  const parts = B.parts.filter(p => ids.includes(p.id));
  if (!parts.length) return false;
  const idx = new Map(parts.map((p, i) => [p.id, i]));
  CB_CLIP = {n:0,
    parts:parts.map(p => ({type:p.type, x:p.x, y:p.y, rot:p.rot, props:JSON.parse(JSON.stringify(p.props))})),
    wires:B.wires.filter(w => idx.has(w.a.p) && idx.has(w.b.p))
      .map(w => ({a:{i:idx.get(w.a.p), t:w.a.t}, b:{i:idx.get(w.b.p), t:w.b.t}}))};
  return true;
}
// Вставляє копію навколо точки at (або зі зсувом від оригіналу). Повертає id нових деталей.
function cbPaste(B, at){
  if (!CB_CLIP) return [];
  const src = CB_CLIP.parts, g = v => Math.round(v / CB_GRID) * CB_GRID;
  const cx = src.reduce((s, q) => s + q.x, 0) / src.length, cy = src.reduce((s, q) => s + q.y, 0) / src.length;
  CB_CLIP.n++;
  let dx = at ? g(at[0] - cx) : 40 * CB_CLIP.n, dy = at ? g(at[1] - cy) : 40 * CB_CLIP.n;
  const xs = src.map(q => q.x + dx), ys = src.map(q => q.y + dy);          // увесь гурт лишається на полі
  dx += Math.max(0, 60 - Math.min(...xs)) - Math.max(0, Math.max(...xs) - (CB_W - 60));
  dy += Math.max(0, 60 - Math.min(...ys)) - Math.max(0, Math.max(...ys) - (CB_H - 60));
  const made = src.map(q => {
    if (CIRC.parts[q.type].single && B.parts.some(p => p.type === q.type)) return null;
    const p = cbAddPart(B, q.type, q.x + dx, q.y + dy, q.rot);
    p.props = JSON.parse(JSON.stringify(q.props));
    return p;
  });
  for (const w of CB_CLIP.wires)
    if (made[w.a.i] && made[w.b.i]) cbAddWire(B, {p:made[w.a.i].id, t:w.a.t}, {p:made[w.b.i].id, t:w.b.t});
  return made.filter(Boolean).map(p => p.id);
}

/* ---------- звук пищалок (Web Audio, без файлів) ---------- */
const CB_AUDIO = {ctx:null, voices:new Map()};      // id пищалки -> {osc, gain}
function cbSound(list){                              // list: [{id, vol, tone}] — ті, що зараз пищать
  const want = new Map(list.filter(v => v.vol > 0).map(v => [v.id, v]));
  for (const [id, v] of CB_AUDIO.voices) if (!want.has(id)){ v.osc.stop(); v.osc.disconnect(); CB_AUDIO.voices.delete(id); }
  if (!want.size) return;
  const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
  if (!CB_AUDIO.ctx) CB_AUDIO.ctx = new AC();
  for (const [id, w] of want){
    let v = CB_AUDIO.voices.get(id);
    if (!v){
      const osc = CB_AUDIO.ctx.createOscillator(), gain = CB_AUDIO.ctx.createGain();
      osc.type = 'square'; osc.connect(gain); gain.connect(CB_AUDIO.ctx.destination); osc.start();
      v = {osc, gain}; CB_AUDIO.voices.set(id, v);
    }
    v.osc.frequency.value = w.tone; v.gain.gain.value = w.vol;
  }
}

/* =========================================================
   СТАРТ: розмітка, події, цикл анімації
   ========================================================= */
function initRoboSim(){
  const root = document.getElementById('circuit');
  if (!root) return;
  const gen = ++ROBO.simGen;
  if (!ROBO.circuit) ROBO.circuit = cbNewBoard(true);
  let B = ROBO.circuit;
  const still = prefersReducedMotion();
  const SVGNS = 'http://www.w3.org/2000/svg';

  const palette = Object.keys(CIRC.parts).filter(k => CIRC.parts[k].pal).sort((a, b) => CIRC.parts[a].pal - CIRC.parts[b].pal);
  root.innerHTML = `
    <div class="cb-bar">
      <span class="cb-hint">Тягни деталі з панелі на поле, а можна <b>просто на дріт</b>: деталь розріже його й стане в коло. З'єднуй дротом: від кружечка до кружечка. <b>Двічі клацни</b> на деталь, щоб змінити її властивості або вийняти з кола.</span>
      <label class="speed">швидкість <input id="cbSpeed" type="range" min="1" max="6" step="1" value="3"></label>
      <span class="cb-hist">
        <button class="sec icon" id="cbUndo" title="Скасувати (Ctrl+Z)" aria-label="Скасувати"><svg viewBox="0 0 24 24"><path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg></button>
        <button class="sec icon" id="cbRedo" title="Повернути (Ctrl+Shift+Z)" aria-label="Повернути"><svg viewBox="0 0 24 24"><path d="m15 14 5-5-5-5M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/></svg></button>
      </span>
      <button class="sec" id="cbClear">Очистити поле</button>
    </div>
    <div class="cb-main">
      <div class="cb-pal" id="cbPal">
        <div class="cb-pal-t">Деталі</div>
        ${palette.map(k => `<button class="cb-item" data-add="${k}">
            <svg viewBox="${k === 'battery' ? '-92 -92 200 184' : '-70 -90 140 130'}">${CIRC.parts[k].draw(Object.assign({type:k, rot:0, rt:{I:0, vrev:0}}, CIRC.parts[k].init()))}</svg>
            <span>${CIRC.parts[k].name}</span></button>`).join('')}
      </div>
      <div class="cb-stage" id="cbStage">
        <svg id="cbSvg" viewBox="0 0 ${CB_W} ${CB_H}" role="img" aria-label="Поле для складання електричного кола">
          <defs><pattern id="cbCell" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40,0 H0 V40" fill="none" stroke="var(--cb-cell)" stroke-width="1.5"/></pattern></defs>
          <rect x="0" y="0" width="${CB_W}" height="${CB_H}" fill="url(#cbCell)"/>
          <g id="cbWires"></g><g id="cbParts"></g><g id="cbTerms"></g><g id="cbDots"></g><g id="cbLabels"></g>
          <path id="cbRubber" d="" fill="none" stroke="#4dabf7" stroke-width="6" stroke-dasharray="10 8" stroke-linecap="round"/>
          <rect id="cbMarq" class="cb-marq" x="0" y="0" width="0" height="0" rx="6" hidden/>
        </svg>
        <div class="cb-pop" id="cbPop" hidden></div>
      </div>
    </div>
    <div class="msg" id="cbMsg"></div>`;

  const $ = id => document.getElementById(id);
  const svg = $('cbSvg'), stage = $('cbStage'), gW = $('cbWires'), gP = $('cbParts'), gD = $('cbDots'), gL = $('cbLabels'), gT = $('cbTerms');
  const rubber = $('cbRubber'), msgEl = $('cbMsg'), popEl = $('cbPop'), speedEl = $('cbSpeed'), marq = $('cbMarq');

  let conductors = [];          // [{obj, poly, gap}] — дроти й деталі, якими біжать електрони
  let lastLabels = '', lastMsg = '', lastPop = '', drag = null, pending = null, hoverTerm = null;
  let clock = 0, note = null, chainDirty = true, lastDown = {id:null, t:-1};
  let floating = null;          // вільна деталь у руці: дроти її не оминають, щоб її можна було кинути на дріт
  let dropWire = null;          // дріт, на який деталь стане, якщо зараз її відпустити
  let lastPt = null;            // де вказівник на полі — туди вставляємо скопійоване
  const isSel = id => B.sel.includes(id);

  /* ---------- малювання поля ---------- */
  function renderStatic(){
    const byId = new Map(B.parts.map(p => [p.id, p]));
    const obst = floating ? B.parts.filter(p => p !== floating) : B.parts;
    conductors = [];
    gW.innerHTML = B.wires.map(w => {
      const pts = cbRoute(cbTerm(byId.get(w.a.p), w.a.t), cbTerm(byId.get(w.b.p), w.b.t), obst);
      conductors.push({obj:w, poly:cbPoly(pts), ends:[w.a.p + ':' + w.a.t, w.b.p + ':' + w.b.t]});
      const d = pts.map(q => q.join(',')).join(' ');
      return `<g data-wire="${w.id}" class="cb-wire${isSel(w.id) ? ' sel' : ''}${dropWire === w.id ? ' drop' : ''}">
        <polyline points="${d}" class="hitw"/><polyline points="${d}" class="halo"/><polyline points="${d}" class="core"/></g>`;
    }).join('');
    gP.innerHTML = B.parts.map(p => {
      const d = CIRC.parts[p.type];
      const local = q => { const [x, y] = cbRot(p.rot, q[0], q[1]); return [p.x + x, p.y + y]; };
      if (d.path) conductors.push({obj:p, gap:d.gap, poly:cbPoly(d.path.map(local)), ends:[p.id + ':0', p.id + ':1']});
      // доріжки всередині батарейки: видно, як електрон виходить із кімнати й заходить у неї
      (d.ramps || []).forEach((r, i) => conductors.push({
        obj:{get rt(){ return p.rt; }, get ph(){ return p.ramp[i]; }, set ph(v){ p.ramp[i] = v; }},
        poly:cbPoly(r.map(local)), ends: i ? [p.id + ':0', null] : [null, p.id + ':1'], ramp:i ? 'in' : 'out', part:p,
      }));
      const cls = 'cb-part' + (d.toggle || d.hold ? ' press' : '') + (isSel(p.id) ? ' sel' : '');
      return `<g data-part="${p.id}" class="${cls}" transform="translate(${p.x},${p.y}) rotate(${p.rot * 90})">${d.draw(p)}</g>`;
    }).join('');
    for (const g of gP.querySelectorAll('.cb-part.sel')){              // рамка вибраної деталі
      const bb = g.getBBox(), r = document.createElementNS(SVGNS, 'rect');
      r.setAttribute('x', bb.x - 10); r.setAttribute('y', bb.y - 10);
      r.setAttribute('width', bb.width + 20); r.setAttribute('height', bb.height + 20);
      r.setAttribute('rx', 14); r.setAttribute('class', 'selbox');
      g.insertBefore(r, g.firstChild);
    }
    gT.innerHTML = B.parts.map(p => [0, 1].map(t => {
      const q = cbTerm(p, t);
      return `<circle data-term="${p.id}:${t}" cx="${q.x}" cy="${q.y}" r="9" class="cb-term"/>`;
    }).join('')).join('') + selWireEnds();
    lastLabels = ''; lastPop = ''; chainDirty = true;
    renderLabels(); renderPalette(); renderPop(); renderHist();
  }
  // кінці вибраного дроту — ручки: їх можна перетягнути на інший контакт
  function selWireEnds(){
    const w = B.sel.length === 1 && B.wires.find(x => x.id === B.sel[0]);
    if (!w) return '';
    return [w.a, w.b].map(e => {
      const q = cbTerm(B.parts.find(p => p.id === e.p), e.t);
      return `<circle cx="${q.x}" cy="${q.y}" r="12" class="cb-wend"/>`;
    }).join('');
  }
  function renderHist(){ $('cbUndo').disabled = !B.undo.length; $('cbRedo').disabled = !B.redo.length; }

  // Ланцюг: електрони мають стояти рівно по всьому колу, а не мати власну
  // фазу в кожному дроті, інакше на стиках крапки зникають і з'являються.
  // Ідемо від батарейки за течією і зсуваємо фази на пройдену відстань.
  function chain(){
    chainDirty = false;
    const at = new Map();                                   // контакт -> провідники, що в ньому сходяться
    for (const c of conductors){
      c.off = undefined;
      c.entry = c.obj.rt.I > 0 ? 1 : 0;                     // електрони йдуть проти «звичного» струму
      for (const k of c.ends) if (k){ if (!at.has(k)) at.set(k, []); at.get(k).push(c); }
    }
    const live = c => Math.abs(c.obj.rt.I) > 1e-9;
    const start = conductors.find(c => c.ramp === 'out' && live(c)) || conductors.find(live);
    if (!start) return;
    const seen = new Set([start]);
    let queue = [start];
    start.off = 0;
    while (queue.length){
      const c = queue.shift(), exit = c.ends[1 - c.entry];
      for (const n of (at.get(exit) || [])){
        if (seen.has(n) || !live(n) || n.ends[n.entry] !== exit) continue;
        n.off = c.off + c.poly.len; seen.add(n); queue.push(n);
      }
    }
    const ref = start.obj.ph;
    for (const c of conductors) if (c.off !== undefined && c !== start) c.obj.ph = ref - c.off;
  }

  function renderLabels(){
    let html = '';
    for (const p of B.parts){
      const odd = p.rot % 2 === 1;
      let k = 0;
      for (const L of CIRC.parts[p.type].labels(p)){
        const pol = L.cls.startsWith('pol');
        if (!L.t){ if (!pol) k++; continue; }
        let x, y, anchor = 'middle';
        if (odd && !pol){                              // вертикальна деталь: підписи збоку, стовпчиком
          const side = cbRot(p.rot, 0, 1)[0];
          x = p.x + side * 44; y = p.y - 6 + k * 24; anchor = side > 0 ? 'start' : 'end';
        } else {
          const [dx, dy] = cbRot(p.rot, L.x, L.y); x = p.x + dx; y = p.y + dy + (pol ? 7 : 0);
        }
        if (!pol) k++;
        html += `<text x="${x}" y="${y}" text-anchor="${anchor}" class="cb-lab ${L.cls}">${esc(L.t)}</text>`;
      }
    }
    if (html !== lastLabels){ gL.innerHTML = html; lastLabels = html; }
  }

  function renderPalette(){
    for (const b of root.querySelectorAll('[data-add]'))
      b.disabled = !!CIRC.parts[b.dataset.add].single && B.parts.some(p => p.type === b.dataset.add);
  }

  /* ---------- контекстне вікно: властивості деталі ---------- */
  function renderPop(){
    const p = B.parts.find(x => x.id === B.pop), w = !p && B.wires.find(x => x.id === B.pop);
    if (!p && !w){ popEl.hidden = true; lastPop = ''; return; }
    let h;
    if (w){
      h = `<div class="cb-pop-h"><b>Дріт</b><button class="x" data-act="close" aria-label="Закрити">✕</button></div>
        <div class="cb-pop-acts"><button class="sec" data-act="del">🗑 Прибрати</button></div>`;
    } else {
      const d = CIRC.parts[p.type];
      h = `<div class="cb-pop-h"><b>${d.name}</b><button class="x" data-act="close" aria-label="Закрити">✕</button></div>`;
      for (const prm of d.params || []){
        h += `<div class="cb-pop-row"><span>${prm.label}</span><div class="cb-seg">` +
          prm.options.map((o, i) => `<button class="rb${p.props[prm.key] === o[0] ? ' on' : ''}" data-key="${prm.key}" data-i="${i}">${o[1]}</button>`).join('') +
          `</div></div>`;
      }
      const acts = (d.actions ? d.actions(p) : []).slice();
      if (d.rotatable) acts.push({id:'rot', t:'↻ Повернути'});
      if (cbInCircuit(B, p.id)) acts.push({id:'out', t:'✂ Вийняти з кола'});
      acts.push({id:'del', t:'🗑 Прибрати'});
      h += `<div class="cb-pop-acts">${acts.map(a => `<button class="${a.id === 'fix' || a.id === 'charge' ? 'warn' : 'sec'}" data-act="${a.id}">${a.t}</button>`).join('')}</div>`;
    }
    if (h !== lastPop){ popEl.innerHTML = h; lastPop = h; }
    popEl.hidden = false;
    placePop(p ? gP.querySelector(`[data-part="${p.id}"]`) : gW.querySelector(`[data-wire="${w.id}"]`));
  }
  function placePop(el){                              // поруч із деталлю, не виходячи за поле
    if (!el) return;
    const sr = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
    const pw = popEl.offsetWidth, ph = popEl.offsetHeight;
    let x = r.right - sr.left + 14;
    if (x + pw > sr.width - 6) x = r.left - sr.left - pw - 14;
    if (x < 6) x = Math.max(6, Math.min(sr.width - pw - 6, r.left - sr.left));
    const y = Math.max(6, Math.min(sr.height - ph - 6, r.top - sr.top + r.height / 2 - ph / 2));
    popEl.style.left = x + 'px'; popEl.style.top = y + 'px';
  }
  function openPop(id){ B.pop = id; B.sel = [id]; renderStatic(); }
  function closePop(){ if (B.pop){ B.pop = null; renderPop(); } }

  popEl.addEventListener('pointerdown', e => e.stopPropagation());
  popEl.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const p = B.parts.find(x => x.id === B.pop);
    if (b.dataset.key && p){
      const prm = CIRC.parts[p.type].params.find(q => q.key === b.dataset.key), v = prm.options[+b.dataset.i][0];
      if (p.props[prm.key] === v) return;
      mark();
      p.props[prm.key] = v;
      if (CIRC.parts[p.type].onParam) CIRC.parts[p.type].onParam(p, prm.key);
      changed();
    } else if (b.dataset.act) act(b.dataset.act);
  });

  /* ---------- стан кола ---------- */
  function battery(){ return B.parts.find(p => p.type === 'battery'); }

  function resolve(){
    for (const p of B.parts) p.rt = {I:0, vrev:0, vfw:0};
    for (const w of B.wires) w.rt = {I:0};
    if (!B.parts.length) return;
    const r = solveCircuit(B), V = (id, t) => r.V[r.node.get(id + ':' + t)] || 0;
    for (const p of B.parts){
      p.rt.I = r.I[p.id] || 0;
      if (p.props.flipped !== undefined && looped(p)){  // клапан: пряма й зворотна напруга на ньому
        const a = p.props.flipped ? 1 : 0;
        p.rt.vfw = V(p.id, a) - V(p.id, 1 - a);
        p.rt.vrev = -p.rt.vfw;
      }
    }
    for (const w of B.wires) w.rt.I = r.I[w.id] || 0;
    chainDirty = true;
  }

  // Чи є навколо деталі замкнений шлях: від одного її контакту до другого
  // дротами й іншими деталями, крім розривів. Без нього напруга на клапані —
  // лише наслідок крихітного витоку в розв'язувачі, а не справжня.
  function looped(p){
    const up = new Map(), root = k => { while (up.has(k)) k = up.get(k); return k; };
    const join = (a, b) => { a = root(a); b = root(b); if (a !== b) up.set(a, b); };
    for (const w of B.wires) join(w.a.p + ':' + w.a.t, w.b.p + ':' + w.b.t);
    for (const q of B.parts)
      if (q !== p && CIRC.parts[q.type].elec(q).kind !== 'open') join(q.id + ':0', q.id + ':1');
    return root(p.id + ':0') === root(p.id + ':1');
  }

  // світлодіод, який цілий і стоїть як слід, але струм іде повз нього
  function bypassed(){
    return B.parts.filter(p => p.type === 'led' && !p.s.dead && Math.abs(p.rt.I) <= 1e-5 && Math.abs(p.rt.vfw) < 0.3);
  }

  function status(){
    if (dropWire) return 'Відпусти, і дріт розріжеться: деталь стане в коло між його кінцями.';
    if (note && clock < note.until) return note.t;
    if (B.sticky) return B.sticky;
    if (!B.parts.length) return 'Поле порожнє. Перетягни батарейку з панелі ліворуч, а тоді додай деталі.';
    const bat = battery();
    if (!bat) return 'На полі немає батарейки, тож штовхати електрони нікому. Перетягни її з панелі.';
    if (bat.s.charging) return 'Батарейка в зарядному: воно жене електрони у зворотний бік, з кімнати «+» назад у кімнату «−». Поки вона заряджається, до кола її не під\'єднано.';
    if (bat.s.dead) return CIRC.parts.battery.say;
    if (bat.s.m <= 0) return 'Усі електрони з кімнати «−» перейшли в кімнату «+». Батарейка розрядилась: електрони в дротах є, але штовхати їх більше нікому. Двічі клацни на батарейку й постав її в зарядне.';
    for (const p of B.parts){                           // деталь у небезпеці — найважливіше
      const w = CIRC.parts[p.type].warn && CIRC.parts[p.type].warn(p);
      if (w) return w + (p.type === 'battery' && bypassed().length ? ' І подивись: світлодіод не світить, бо весь потік іде дротом в обхід нього.' : '');
    }
    const leds = B.parts.filter(p => p.type === 'led' && !p.s.dead), buzz = B.parts.filter(p => p.type === 'buzzer');
    if (Math.abs(bat.rt.I) < 1e-6){
      if (leds.concat(buzz).some(p => p.rt.vrev > 0.3))
        return 'Коло замкнене, а електрони стоять. Світлодіод і пищалка пропускають струм тільки в один бік, а зараз деталь стоїть навпаки: для струму це те саме, що розрив. Двічі клацни на неї й переверни ніжки.';
      if (leds.some(p => p.rt.vfw > 0.3))
        return 'Коло замкнене, а електрони стоять: батарейка заслабка, щоб проштовхнути їх крізь світлодіод. Двічі клацни на батарейку й додай ще пальчикову. Будь-якому світлодіоду треба щонайменше дві.';
      if (B.parts.some(p => p.type === 'button' && !p.s.pressed)) return 'Електрони стоять: кнопка розриває коло, поки її не тримають. Натисни й тримай кнопку.';
      if (B.parts.some(p => p.type === 'switch' && !p.s.on)) return 'Електрони стоять: вимикач розриває коло. Натисни на вимикач.';
      if (B.parts.some(p => p.s.dead)) return 'Електрони стоять: зіпсована деталь розриває коло. Двічі клацни на неї й заміни на нову.';
      return 'Електрони стоять: коло десь розірване. Шлях від «−» батарейки до «+» має бути суцільним, без жодної щілини.';
    }
    const lit = leds.filter(l => Math.abs(l.rt.I) > 1e-5), beep = buzz.filter(z => CIRC.parts.buzzer.sounding(z));
    let t = 'Коло замкнене: електрони рушили всі одночасно, по всьому колу, від кімнати «−» до кімнати «+».';
    const fs = lit.map(l => circFlow(l.rt.I));
    if (lit.length > 1 && Math.max(...fs) - Math.min(...fs) > 0.2)
      t += ' Світлодіоди світять по-різному: у гілці з більшим резистором електрони біжуть повільніше, і світло там тьмяніше.';
    else if (lit.length){
      const f = Math.max(...fs);
      t += f > 0.75 ? ' Світлодіод світить яскраво.' : f > 0.4 ? ' Резистор більший, тож сповільнились усі електрони в гілці, навіть далекі від нього: світло тьмяніше.' : ' Опір великий: електрони ледь повзуть, світло ледь помітне, зате батарейка житиме довго.';
    }
    if (bypassed().length) t += ' А світлодіод не світить: поруч із ним є дріт, і електрони біжать цим легшим шляхом в обхід нього.';
    if (beep.length) t += ' Пищалка пищить. Їй резистор не потрібен: вона сама себе стримує.';
    return t;
  }

  function say(){
    const t = status();
    if (t !== lastMsg){ msgEl.textContent = t; lastMsg = t; }
  }

  // будь-яка зміна схеми: перерахувати струми й перемалювати
  function changed(){ note = null; B.sticky = null; resolve(); renderStatic(); say(); }

  /* ---------- історія: скасувати / повернути ---------- */
  // mark() — перед кожною правкою схеми. Серія однакових дрібних правок
  // (стрілками) іде одним кроком скасування.
  let lastMark = {tag:null, t:0};
  function mark(tag){
    const now = performance.now();
    if (tag && lastMark.tag === tag && now - lastMark.t < 800){ lastMark.t = now; return; }
    lastMark = {tag, t:now};
    B.undo.push(cbSnap(B));
    if (B.undo.length > 100) B.undo.shift();
    B.redo = [];
  }
  function undo(){
    if (!B.undo.length) return;
    B.redo.push(cbSnap(B)); cbRestore(B, B.undo.pop());
    lastMark = {tag:null, t:0}; closePop(); changed();
  }
  function redo(){
    if (!B.redo.length) return;
    B.undo.push(cbSnap(B)); cbRestore(B, B.redo.pop());
    lastMark = {tag:null, t:0}; closePop(); changed();
  }

  /* ---------- дії ---------- */
  function removeIds(ids){                   // прибрати деталі разом з їхніми дротами, а також вибрані дроти
    B.parts = B.parts.filter(p => !ids.includes(p.id));
    B.wires = B.wires.filter(w => !ids.includes(w.id) && !ids.includes(w.a.p) && !ids.includes(w.b.p));
    B.sel = B.sel.filter(id => !ids.includes(id));
    if (ids.includes(B.pop)) B.pop = null;
  }
  // Прибрати з поля: деталь виходить з кола так само, як при вирізанні, —
  // її сусіди з'єднуються напряму. Вибраний дріт просто зникає.
  function discard(ids){
    for (const id of ids) if (B.parts.some(p => p.id === id)) cbExtract(B, id);
    removeIds(ids);
  }
  function removeSel(){
    if (!B.sel.length) return;
    mark(); discard(B.sel.slice()); changed();
  }
  // відсунути вийняту деталь убік, щоб видно було, що дріт знову суцільний
  function moveAside(p){
    for (const [dx, dy] of [[0, -120], [0, 120], [-160, 0], [160, 0], [0, -200], [0, 200]]){
      const x = p.x + dx, y = p.y + dy;
      if (x < 60 || x > CB_W - 60 || y < 60 || y > CB_H - 60) continue;
      if (B.parts.every(q => q === p || Math.abs(q.x - x) > 130 || Math.abs(q.y - y) > 100)){ p.x = x; p.y = y; return; }
    }
  }
  function extract(p){
    mark(); cbExtract(B, p.id); moveAside(p); B.pop = null;
    note = {t:'Деталь вийнято, а дріт знову суцільний: її сусіди тепер з\'єднані напряму. Кинь її на інший дріт, щоб вставити деінде.', until:clock + 5};
    resolve(); renderStatic(); say();
  }
  function rotateSel(){
    const ps = B.parts.filter(p => isSel(p.id) && CIRC.parts[p.type].rotatable);
    if (!ps.length) return;
    mark();
    for (const p of ps) p.rot = (p.rot + 1) % 4;
    changed();
  }
  function nudge(dx, dy){
    const ps = B.parts.filter(p => isSel(p.id));
    if (!ps.length) return;
    dx = Math.max(dx, ...ps.map(p => 60 - p.x)); dx = Math.min(dx, ...ps.map(p => CB_W - 60 - p.x));
    dy = Math.max(dy, ...ps.map(p => 60 - p.y)); dy = Math.min(dy, ...ps.map(p => CB_H - 60 - p.y));
    if (!dx && !dy) return;
    mark('nudge');
    for (const p of ps){ p.x += dx; p.y += dy; }
    closePop(); renderStatic();
  }
  function copySel(){ return cbCopy(B, B.sel); }
  function cutSel(){                         // вирізати: у буфер і прибрати
    if (!copySel()) return;
    mark(); discard(B.sel.slice()); changed();
  }
  function paste(){
    if (!CB_CLIP) return;
    mark();
    const ids = cbPaste(B, lastPt);
    if (!ids.length){ B.undo.pop(); return; }
    B.sel = ids; closePop(); changed();
  }
  function act(a){
    if (a === 'close') return closePop();
    const id = B.pop || (B.sel.length === 1 ? B.sel[0] : null);
    if (a === 'del' && id){ mark(); discard([id]); return changed(); }
    const p = B.parts.find(x => x.id === id); if (!p) return;
    const d = CIRC.parts[p.type];
    if (a === 'out') return extract(p);
    mark();
    if (a === 'rot'){ if (d.rotatable) p.rot = (p.rot + 1) % 4; }
    else if (d.act) d.act(p, a);
    changed();
  }

  /* ---------- вказівник ---------- */
  function svgPt(e){
    const m = svg.getScreenCTM().inverse(), pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const r = pt.matrixTransform(m);
    return [r.x, r.y];
  }
  const snap = v => Math.round(v / CB_GRID) * CB_GRID;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const far = (d, x, y) => Math.abs(x - d.x0) + Math.abs(y - d.y0) > 8;
  const insideSvg = e => { const r = svg.getBoundingClientRect(); return e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom; };
  function termAt(x, y, except){
    let best = null, bd = 22 * 22;
    for (const p of B.parts) for (const t of [0, 1]){
      if (except && except.p === p.id && except.t === t) continue;
      const q = cbTerm(p, t), d = (q.x - x) ** 2 + (q.y - y) ** 2;
      if (d < bd){ bd = d; best = {p:p.id, t}; }
    }
    return best;
  }
  function showRubber(from, x, y){
    const q = cbTerm(B.parts.find(p => p.id === from.p), from.t);
    rubber.setAttribute('d', `M${q.x},${q.y} L${x},${y}`);
  }
  function markHover(t){
    const key = t ? t.p + ':' + t.t : null;
    if (key === hoverTerm) return;
    hoverTerm = key;
    for (const c of gT.children) c.classList.toggle('hot', c.dataset.term === key);
  }
  function freeSpot(){
    for (let r = 0; r < 12; r++) for (let a = 0; a < 8; a++){
      const x = snap(CB_W * 0.55 + Math.cos(a * Math.PI / 4) * r * 70), y = snap(CB_H / 2 + Math.sin(a * Math.PI / 4) * r * 60);
      if (x < 80 || x > CB_W - 80 || y < 80 || y > CB_H - 80) continue;
      if (B.parts.every(p => Math.abs(p.x - x) > 150 || Math.abs(p.y - y) > 110)) return [x, y];
    }
    return [snap(CB_W / 2), snap(CB_H / 2)];
  }
  // подвійний клік ловимо самі: після першого натискання поле перемальовується,
  // і браузерний dblclick губиться. Повертає попереднє натискання, якщо це другий клік.
  function secondClick(id){
    const now = performance.now(), prev = lastDown;
    const dbl = prev.id === id && now - prev.t < 380;
    lastDown = dbl ? {id:null, t:-1} : {id, t:now, toggled:false};
    return dbl ? prev : null;
  }

  // дріт під точкою: найближчий відрізок ламаної, не далі за maxD
  function wireAt(x, y, maxD){
    let best = null, bd = maxD;
    for (const c of conductors){
      if (!B.wires.includes(c.obj)) continue;
      const pts = c.poly.pts;
      for (let i = 1; i < pts.length; i++){
        const a = pts[i-1], b = pts[i];
        const qx = clamp(x, Math.min(a[0], b[0]), Math.max(a[0], b[0])), qy = clamp(y, Math.min(a[1], b[1]), Math.max(a[1], b[1]));
        const d = Math.hypot(x - qx, y - qy);
        if (d < bd){ bd = d; best = {w:c.obj, a, b}; }
      }
    }
    return best;
  }
  // Вільна деталь над дротом: дріт підсвічується, деталь стає вздовж нього
  // й на його лінію — так, як стоятиме, коли її відпустять.
  function aim(p, rot0){
    p.rot = rot0;
    const hit = wireAt(p.x, p.y, 28);
    dropWire = hit ? hit.w.id : null;
    if (!hit || !CIRC.parts[p.type].rotatable) return;
    const vert = hit.a[0] === hit.b[0];
    if ((p.rot % 2 === 1) !== vert) p.rot = vert ? 1 : 0;
    if (vert) p.x = hit.a[0]; else p.y = hit.a[1];
  }
  function drop(p){                                  // відпустили вільну деталь: над дротом — стає в коло
    const w = dropWire && B.wires.find(x => x.id === dropWire);
    floating = null; dropWire = null;
    if (w){
      cbInsert(B, p, w);
      note = {t:'Деталь розрізала дріт і стала в коло.', until:clock + 3};
    }
  }

  svg.addEventListener('pointerdown', e => {
    if (e.button > 0) return;
    const [x, y] = svgPt(e);
    const pEl = e.target.closest('[data-part]'), wEl = e.target.closest('[data-wire]');
    const near = termAt(x, y);

    if (pending){                                             // другий клік режиму «клік — клік»
      if (near && !(near.p === pending.p && near.t === pending.t)){ mark(); if (!cbAddWire(B, pending, near)) B.undo.pop(); }
      pending = null; rubber.setAttribute('d', ''); markHover(null); changed(); return;
    }
    const wSel = near && B.sel.length === 1 && B.wires.find(w => w.id === B.sel[0]);
    const end = wSel && ['a', 'b'].find(k => wSel[k].p === near.p && wSel[k].t === near.t);
    if (end){                                                 // кінець вибраного дроту — перечіпляємо
      closePop();
      drag = {kind:'rewire', w:wSel, end, fixed:wSel[end === 'a' ? 'b' : 'a'], from:near, x0:x, y0:y, moved:false};
      startTrack(); return;
    }
    if (near){                                                // від контакту тягнемо дріт
      closePop();
      drag = {kind:'wire', from:near, x0:x, y0:y, moved:false};
      showRubber(near, x, y); startTrack(); return;
    }
    if (pEl){
      const p = B.parts.find(q => q.id === pEl.dataset.part), d = CIRC.parts[p.type];
      if (e.shiftKey){                                        // Shift — додати до вибраного чи прибрати з нього
        closePop();
        B.sel = isSel(p.id) ? B.sel.filter(id => id !== p.id) : B.sel.concat(p.id);
        renderStatic(); return;
      }
      const prev = secondClick(p.id);
      if (prev){
        if (d.toggle && prev.toggled) p.s.on = !p.s.on;       // подвійний клік вимикач не перемикає
        resolve(); openPop(p.id); say(); return;
      }
      if (B.pop !== p.id) closePop();
      if (d.hold){ p.s.pressed = true; changed(); }
      if (!isSel(p.id)){ B.sel = [p.id]; renderStatic(); }
      const group = B.parts.filter(q => isSel(q.id));
      drag = {kind:'move', p, group, start:group.map(q => [q.x, q.y]), dx:x - p.x, dy:y - p.y, x0:x, y0:y, moved:false, alt:e.altKey};
      startTrack(); return;
    }
    if (wEl){
      const id = wEl.dataset.wire;
      closePop();
      if (e.shiftKey){ B.sel = isSel(id) ? B.sel.filter(s => s !== id) : B.sel.concat(id); renderStatic(); return; }
      if (secondClick(id)){ openPop(id); return; }
      B.sel = [id]; renderStatic(); return;
    }
    closePop();                                               // порожнє місце: рамка виділення
    drag = {kind:'marq', x0:x, y0:y, keep:e.shiftKey ? B.sel.slice() : [], moved:false};
    if (!e.shiftKey && B.sel.length){ B.sel = []; renderStatic(); }
    startTrack();
  });

  svg.addEventListener('contextmenu', e => {                  // права кнопка — те саме вікно, що й подвійний клік
    const el = e.target.closest('[data-part],[data-wire]'); if (!el) return;
    e.preventDefault(); resolve(); openPop(el.dataset.part || el.dataset.wire); say();
  });

  svg.addEventListener('pointermove', e => {
    const [x, y] = svgPt(e);
    lastPt = [x, y];
    if (drag) return;
    if (pending){ showRubber(pending, x, y); markHover(termAt(x, y, pending)); return; }
    markHover(termAt(x, y));
  });
  svg.addEventListener('pointerleave', () => { if (!drag) lastPt = null; });

  // перетягування з панелі деталей
  $('cbPal').addEventListener('pointerdown', e => {
    const b = e.target.closest('[data-add]'); if (!b || e.button > 0 || b.disabled) return;
    e.preventDefault(); closePop();
    drag = {kind:'palette', type:b.dataset.add, p:null, cx:e.clientX, cy:e.clientY, moved:false};
    startTrack();
  });

  function startTrack(){
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  }
  function stopTrack(){
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
  }

  function onMove(e){
    if (!drag || gen !== ROBO.simGen) return;
    const [x, y] = svgPt(e);
    if (drag.kind === 'wire' || drag.kind === 'rewire'){
      if (far(drag, x, y)) drag.moved = true;
      if (drag.kind === 'rewire' && !drag.moved) return;
      const from = drag.kind === 'wire' ? drag.from : drag.fixed;
      showRubber(from, x, y); markHover(termAt(x, y, from));
    } else if (drag.kind === 'move'){
      if (!drag.moved && far(drag, x, y)){
        drag.moved = true; closePop(); lastDown = {id:null, t:-1};     // перетягування — не половина подвійного кліку
        if (drag.p.s.pressed){ drag.p.s.pressed = false; changed(); }   // кнопку потягли — це не натискання
        mark();
        if (drag.alt && drag.group.length === 1 && cbInCircuit(B, drag.p.id)){   // Alt — витягти з кола
          cbExtract(B, drag.p.id); resolve();
        }
        // вільну деталь (без жодного дроту) можна кинути на дріт
        if (drag.group.length === 1 && !cbLinks(B, drag.p.id).length){ floating = drag.p; drag.rot0 = drag.p.rot; }
      }
      if (!drag.moved) return;
      const i = drag.group.indexOf(drag.p);
      let ddx = snap(x - drag.dx) - drag.start[i][0], ddy = snap(y - drag.dy) - drag.start[i][1];
      for (const [sx, sy] of drag.start){                     // увесь гурт лишається на полі
        ddx = clamp(ddx, 60 - sx, CB_W - 60 - sx); ddy = clamp(ddy, 60 - sy, CB_H - 60 - sy);
      }
      drag.group.forEach((q, k) => { q.x = drag.start[k][0] + ddx; q.y = drag.start[k][1] + ddy; });
      if (floating) aim(drag.p, drag.rot0);
      renderStatic(); say();
    } else if (drag.kind === 'palette'){
      if (Math.abs(e.clientX - drag.cx) + Math.abs(e.clientY - drag.cy) > 8) drag.moved = true;
      if (!drag.moved) return;
      if (insideSvg(e) && !drag.p){
        mark();
        drag.p = cbAddPart(B, drag.type, snap(x), snap(y)); B.sel = [drag.p.id];
        floating = drag.p; drag.rot0 = 0;
      }
      if (drag.p){
        drag.p.x = clamp(snap(x), 60, CB_W - 60); drag.p.y = clamp(snap(y), 60, CB_H - 60);
        aim(drag.p, drag.rot0); renderStatic(); say();
      }
    } else if (drag.kind === 'marq'){
      if (far(drag, x, y)) drag.moved = true;
      if (!drag.moved) return;
      const r = {x0:Math.min(x, drag.x0), y0:Math.min(y, drag.y0), x1:Math.max(x, drag.x0), y1:Math.max(y, drag.y0)};
      marq.setAttribute('x', r.x0); marq.setAttribute('y', r.y0);
      marq.setAttribute('width', r.x1 - r.x0); marq.setAttribute('height', r.y1 - r.y0);
      marq.removeAttribute('hidden');
      // деталь вибрана, якщо рамка захопила її середину; дріт — якщо обидві його деталі
      const ps = B.parts.filter(p => p.x >= r.x0 && p.x <= r.x1 && p.y >= r.y0 && p.y <= r.y1).map(p => p.id);
      const all = new Set(drag.keep.concat(ps));
      const ws = B.wires.filter(w => all.has(w.a.p) && all.has(w.b.p)).map(w => w.id);
      const sel = [...new Set([...all, ...ws])];
      if (sel.join() !== B.sel.join()){ B.sel = sel; renderStatic(); }
    }
  }
  function onUp(e){
    stopTrack();
    const d = drag; drag = null;
    if (!d || gen !== ROBO.simGen) return;
    const [x, y] = svgPt(e);
    if (d.kind === 'wire'){
      const to = termAt(x, y, d.from);
      rubber.setAttribute('d', '');
      if (to && d.moved){ mark(); if (!cbAddWire(B, d.from, to)) B.undo.pop(); changed(); }
      else if (!d.moved){ pending = d.from; showRubber(d.from, x, y); }   // клік по контакту: далі клік по другому
      markHover(null);
    } else if (d.kind === 'rewire'){
      rubber.setAttribute('d', ''); markHover(null);
      if (!d.moved){ pending = d.from; showRubber(d.from, x, y); return; }
      const to = termAt(x, y, d.fixed);
      if (!to || (to.p === d.from.p && to.t === d.from.t)) return renderStatic();   // не на контакт — дріт лишається, як був
      mark();
      const same = (u, v) => u.p === v.p && u.t === v.t;
      d.w[d.end] = to;
      if (B.wires.some(w => w !== d.w && ((same(w.a, d.w.a) && same(w.b, d.w.b)) || (same(w.a, d.w.b) && same(w.b, d.w.a)))))
        removeIds([d.w.id]);                                   // такий дріт уже є — зайвий прибираємо
      changed();
    } else if (d.kind === 'move'){
      const def = CIRC.parts[d.p.type];
      if (def.hold) d.p.s.pressed = false;
      if (!d.moved && def.toggle){
        d.p.s.on = !d.p.s.on;
        if (lastDown.id === d.p.id) lastDown.toggled = true;
      }
      if (floating) drop(d.p);
      changed();
      if (d.moved && !note && d.alt) note = {t:'Деталь вийнято з кола, а її сусіди з\'єднались напряму.', until:clock + 3};
    } else if (d.kind === 'palette'){
      if (!d.moved){                                           // простий клік — ставимо на вільне місце
        mark();
        const [fx, fy] = freeSpot(); B.sel = [cbAddPart(B, d.type, fx, fy).id];
      } else if (d.p && !insideSvg(e)){                       // винесли за поле — передумали
        floating = null; dropWire = null; removeIds([d.p.id]); B.undo.pop();
      } else if (d.p) drop(d.p);
      changed();
    } else if (d.kind === 'marq'){
      marq.setAttribute('hidden', '');
    }
  }

  function onKey(e){
    if (gen !== ROBO.simGen || !root.isConnected){ document.removeEventListener('keydown', onKey); return; }
    if (e.target.closest && e.target.closest('input,textarea,[contenteditable]')) return;
    if (drag) return;
    const mod = e.ctrlKey || e.metaKey, c = e.code;          // e.code: однаково на українській і англійській розкладці
    if (mod){
      const fn = {KeyZ:e.shiftKey ? redo : undo, KeyY:redo, KeyC:copySel, KeyX:cutSel, KeyV:paste,
        KeyD:() => { if (copySel()){ CB_CLIP.n = 0; lastPt = null; paste(); } },
        KeyA:() => { B.sel = B.parts.map(p => p.id).concat(B.wires.map(w => w.id)); closePop(); renderStatic(); }}[c];
      if (fn){ e.preventDefault(); fn(); }
      return;
    }
    if (e.key === 'Escape'){
      if (pending){ pending = null; rubber.setAttribute('d', ''); markHover(null); return; }
      if (B.pop) return closePop();
      if (B.sel.length){ B.sel = []; renderStatic(); }
      return;
    }
    if (!B.sel.length) return;
    const step = e.shiftKey ? CB_GRID * 3 : CB_GRID;
    const arrows = {ArrowLeft:[-step, 0], ArrowRight:[step, 0], ArrowUp:[0, -step], ArrowDown:[0, step]}[e.key];
    if (e.key === 'Delete' || e.key === 'Backspace'){ e.preventDefault(); removeSel(); }
    else if (c === 'KeyR'){ e.preventDefault(); rotateSel(); }
    else if (arrows){ e.preventDefault(); nudge(arrows[0], arrows[1]); }
  }
  document.addEventListener('keydown', onKey);

  $('cbUndo').onclick = undo;
  $('cbRedo').onclick = redo;
  $('cbClear').onclick = () => {
    const bat = battery(), hist = B.undo.concat(cbSnap(B));
    B = ROBO.circuit = cbNewBoard(false);
    B.undo = hist.slice(-100);
    if (bat){ const nb = cbAddPart(B, 'battery', 180, 340); nb.props = bat.props; nb.s = bat.s; }   // та сама батарейка
    changed();
  };

  /* ---------- кадр: електрони, тепло, розряд ---------- */
  const pool = [];
  function put(i, x, y, r){
    r = r || 7;
    let d = pool[i];
    if (!d){
      const c = document.createElementNS(SVGNS, 'circle');
      c.setAttribute('class', 'el');
      const t = document.createElementNS(SVGNS, 'rect');                   // знак «−» усередині електрона
      t.setAttribute('rx', 1); t.setAttribute('class', 'elm');
      gD.appendChild(c); gD.appendChild(t);
      d = pool[i] = {c, t, vis:true, r:0};
    }
    if (d.r !== r){
      d.r = r;
      d.c.setAttribute('r', r);
      d.t.setAttribute('width', r); d.t.setAttribute('height', Math.max(1.6, r * 0.34));
    }
    d.c.setAttribute('cx', x); d.c.setAttribute('cy', y);
    d.t.setAttribute('x', x - r / 2); d.t.setAttribute('y', y - r * 0.17);
    if (!d.vis){ d.c.style.display = d.t.style.display = ''; d.vis = true; }
  }

  let last = 0;
  function frame(ts){
    if (gen !== ROBO.simGen || !root.isConnected){ cbSound([]); return; }   // сторінку перемальовано чи покинуто
    const dt = last ? Math.min(0.064, (ts - last) / 1000) : 0; last = ts; clock += dt;
    const base = Number(speedEl.value) * 34;    // одиниць за секунду — темп, за яким око встигає

    // тепло, розряд, зарядка — кожна деталь сама знає свої
    let need = false;
    for (const p of B.parts){
      const r = CIRC.parts[p.type].tick && CIRC.parts[p.type].tick(p, dt);
      if (r){ need = need || r.resolve; if (r.say) B.sticky = r.say; }
    }

    // електрони: один ланцюжок по всьому колу, рух ∝ струму в гілці
    if (chainDirty) chain();
    let n = 0;
    for (const c of conductors){
      const len = c.poly.len, dist = circFlow(c.obj.rt.I) * base * dt;
      if (!still) c.obj.ph += dist;                        // фаза — пройдений шлях від входу в провідник
      if (c.ramp === 'out' && CIRC.parts[c.part.type].drain(c.part, dist)) need = true;  // купка тане рівно за потоком
      const gap = c.gap && c.gap(c.obj);
      const ph = ((c.obj.ph % CIRC.SPACING) + CIRC.SPACING) % CIRC.SPACING;
      for (let d = ph; d < len - 0.5; d += CIRC.SPACING){   // кінцева точка дістанеться сусідові
        const s = c.entry === 0 ? d : len - d;
        if (gap && s > gap[0] && s < gap[1]) continue;
        const [x, y] = cbAt(c.poly, s); put(n++, x, y);
      }
    }
    // кімнати батарейки: запас, який тане
    for (const p of B.parts){
      const d = CIRC.parts[p.type]; if (!d.rooms) continue;
      for (let i = 0; i < d.cap(p); i++){
        const room = i < p.s.m ? 'minus' : 'plus', q = d.slot(room, room === 'minus' ? i : i - p.s.m);
        put(n++, p.x + q.x, p.y + q.y, d.slotR);
      }
    }
    if (need){ resolve(); renderStatic(); }            // щось згоріло чи сіло: деталь виглядає інакше
    for (let i = n; i < pool.length; i++) if (pool[i].vis){ pool[i].c.style.display = pool[i].t.style.display = 'none'; pool[i].vis = false; }

    // вигляд деталей
    const env = {t:clock, still};
    for (const g of gP.children){
      const p = B.parts.find(q => q.id === g.dataset.part), d = p && CIRC.parts[p.type];
      if (d && d.paint) d.paint(p, g, env);
    }
    cbSound(B.parts.filter(p => p.type === 'buzzer' && CIRC.parts.buzzer.sounding(p)).map(p => ({id:p.id, vol:p.props.vol, tone:p.props.tone})));
    renderLabels(); say();
    requestAnimationFrame(frame);
  }

  changed();
  requestAnimationFrame(frame);
}
