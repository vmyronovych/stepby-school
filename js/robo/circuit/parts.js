/* =========================================================
   ДЕТАЛІ КОНСТРУКТОРА КОЛА
   ---------------------------------------------------------
   Конструктор не знає жодної деталі за іменем: панель, поле,
   контекстне вікно, розв'язувач і анімація беруть усе з
   CIRC.parts[type]. Нова деталь = новий запис тут (кнопка на
   панелі й вікно властивостей з'являються самі).

   Запис описує:
     name, pal         — підпис у панелі й порядок (pal:false — не в панелі)
     single            — на полі може бути лише одна така деталь
     rotatable         — чи можна повертати на 90°
     terms, norms      — два контакти в локальних координатах деталі
                         і напрямок, куди від них виходить дріт
     box               — межі деталі з підписами [x0,y0,x1,y1]: дроти їх оминають
     path              — ламана від контакту 0 до 1, якою біжать
                         електрони крізь деталь (null — не біжать)
     gap(p)            — ділянка [від, до] ламаної, де електронів немає
                         (щілина розімкненого вимикача)
     ramps             — доріжки всередині деталі, якими електрон виходить
                         із кімнати й заходить у неї (лише батарейка)
     onParam(p, key)   — що змінити, коли вчитель змінив властивість
     toggle / hold     — клік перемикає / деталь працює, поки її тримають
     init()            — початкові властивості й стан {props, s}
     params            — властивості у вікні після подвійного кліку:
                         [{key, label, options:[[значення, 'підпис'], …]}]
     actions(p)        — додаткові кнопки у вікні [{id, t}], act(p, id) їх виконує
     elec(p)           — електричний елемент для solver.js
     draw(p)           — SVG у локальних координатах (без підписів)
     labels(p)         — підписи [{x,y,t,cls}] у локальних координатах;
                         текст не повертається разом із деталлю
     paint(p, g, env)  — зміна вигляду на кожен кадр (свічення, дим…)
     tick(p, dt)       — тепло, розряд, зарядка; повертає {resolve, say},
                         коли коло треба перерахувати (щось згоріло, сіло…)
     warn(p)           — що сказати, поки деталь у небезпеці (перегрівається)

   Дітям числа (вольти, міліампери) не показуємо: вони живуть
   лише всередині моделі, а властивості названі словами.
   ========================================================= */
const CIRC = {
  parts: {},
  // Електрони стоять у дроті рідко й рухаються неспішно: дитина має
  // встигати вести очима один електрон уздовж усього кола.
  SPACING: 70,          // відстань між сусідніми електронами
};

const LEAD = 'stroke="#9aa3ad" stroke-width="5" stroke-linecap="round" fill="none"';
const TWO_TERMS = {terms:[[-60,0],[60,0]], norms:[[-1,0],[1,0]], box:[-50,-34,50,96]};

// швидкість електронів відносно світлодіода з резистором 220 Ом (той дає 1)
function circFlow(I){
  I = Math.abs(I);
  return I < 1e-6 ? 0 : Math.min(5, Math.pow(I / 0.0118, 0.35));
}

function circMix(a, b, t){                       // змішати два кольори #rrggbb
  const pa = [1,3,5].map(i => parseInt(a.substr(i, 2), 16));
  const pb = [1,3,5].map(i => parseInt(b.substr(i, 2), 16));
  t = Math.max(0, Math.min(1, t));
  return 'rgb(' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(',') + ')';
}

function smokeSvg(y){
  return `<g class="smoke" opacity="0">
    <circle cx="-6" cy="${y}" r="10" fill="#adb5bd"/>
    <circle cx="8" cy="${y - 22}" r="13" fill="#868e96"/>
    <circle cx="-8" cy="${y - 46}" r="16" fill="#6c757d"/></g>`;
}

function paintSmoke(g, t){                      // t — скільки секунд минуло відтоді, як зіпсувалось
  const sm = g.querySelector('.smoke'); if (!sm) return;
  const up = Math.min(1, t / 2.6);
  sm.setAttribute('opacity', 0.75 * (1 - up));
  sm.setAttribute('transform', 'translate(0,' + (-60 * up) + ')');
}

// тепло: росте, коли навантаження k > 1 (струм чи потужність відносно безпечних),
// і спадає, коли в нормі. При k = 2 деталь псується за `sec` секунд.
function circHeat(s, k, dt, sec, cool){
  if (s.dead){ s.t += dt; return false; }
  if (k > 1) s.heat += Math.sqrt(k - 1) * dt / sec;
  else s.heat = Math.max(0, s.heat - dt / cool);
  if (s.heat >= 1){ s.dead = true; s.heat = 1; s.t = 0; return true; }
  return false;
}
const FRESH = () => ({heat:0, dead:false, t:0});
const FIX = {id:'fix', t:'🔧 Замінити на нову'};

/* ---------------- батарейка ---------------- */
// Скільки електронів уміщує кімната. Запасу має вистачати щонайменше на
// одне коло, інакше дитина не побачить повного шляху електрона.
const BAT_CAP = {small:20, mid:35, big:50};
CIRC.parts.battery = {
  name:'Батарейка', pal:6, rotatable:false, single:true, rooms:true,
  terms:[[100,-40],[100,40]], norms:[[1,0],[1,0]], box:[-86,-86,96,164],
  path:null,
  // Доріжки всередині батарейки: від краю купки в кімнаті «−» до клеми і
  // від клеми «+» назад у кімнату. Завдовжки рівно один проміжок, тож на
  // кожній завжди видно електрон, який саме виходить або заходить.
  ramps:[[[62,64],[100,64],[100,40]], [[100,-40],[100,-64],[62,-64]]],
  cap: p => BAT_CAP[p.props.cap],
  init: () => ({props:{cells:3, cap:'mid'}, s:Object.assign(FRESH(), {m:BAT_CAP.mid, charging:false, acc:0})}),
  params:[
    {key:'cells', label:'Скільки пальчикових', options:[[1,'одна'],[2,'дві'],[3,'три']]},
    {key:'cap',   label:'Ємність',             options:[['small','мала'],['mid','середня'],['big','велика']]},
  ],
  actions: p => p.s.dead ? [FIX] : (p.s.m < BAT_CAP[p.props.cap] && !p.s.charging ? [{id:'charge', t:'🔋 Поставити в зарядне'}] : []),
  onParam(p, key){ if (key === 'cap') p.s.m = BAT_CAP[p.props.cap]; },   // інша батарейка — повна
  act(p, id){
    if (id === 'charge') p.s.charging = true;
    if (id === 'fix') p.s = CIRC.parts.battery.init().s;
  },
  // поки стоїть у зарядному, до кола вона не під'єднана
  elec: p => (p.s.dead || p.s.m <= 0 || p.s.charging) ? {kind:'open'} : {kind:'V', v:1.5 * p.props.cells, r:0.17 * p.props.cells},
  // Місце електрона в кімнаті: 10 у ряд, до п'яти рядів, дрібніші, ніж у дроті.
  // Черга в «−» закінчується біля дверей, тож іде той, хто до них найближче;
  // у «+» перший прибулий стає теж біля дверей, а наступні тісняться далі.
  slotR: 5,
  slot: (room, i) => room === 'minus'
    ? {x: -46 + (i % 10) * 12, y:  12 + Math.floor(i / 10) * 13}
    : {x:  62 - (i % 10) * 12, y: -64 + Math.floor(i / 10) * 13},
  draw: () => `
    <g class="bat-heat" opacity="0">
      <path d="M-50,-100 q8,-10 0,-20 q-8,-10 0,-20 M0,-100 q8,-10 0,-20 q-8,-10 0,-20 M50,-100 q8,-10 0,-20 q-8,-10 0,-20"
        fill="none" stroke="#f76707" stroke-width="4" stroke-linecap="round"/></g>
    <g class="bat-swell">
      <rect class="bat-shell" x="-83" y="-83" width="166" height="166" rx="14" fill="#2b2f36"/>
      <rect x="-71" y="-71" width="142" height="142" rx="10" fill="#3a3f47"/>
      <line x1="-71" y1="0" x2="71" y2="0" stroke="#5c636d" stroke-width="2" stroke-dasharray="6 5"/>
      <path d="M62,64 H100 V40 M100,-40 V-64 H62" fill="none" stroke="#5c636d" stroke-width="2" stroke-dasharray="4 4"/>
      <text x="-59" y="-17" text-anchor="middle" font-size="30" fill="#ff8787" font-weight="bold">+</text>
      <text x="-59" y="53" text-anchor="middle" font-size="32" fill="#74c0fc" font-weight="bold">−</text>
      <rect x="77" y="-52" width="22" height="24" rx="4" fill="#e03131"/>
      <rect x="77" y="28" width="22" height="24" rx="4" fill="#1c7ed6"/>
    </g>
    <path class="bat-leak" d="M-68,83 q-6,14 0,22 q6,-8 0,-22 z" fill="#c5e063" stroke="#8fa832" stroke-width="2" opacity="0"/>
    <g class="charger" opacity="0">
      <path d="M0,-83 V-104" fill="none" stroke="#495057" stroke-width="7" stroke-linecap="round"/>
      <rect x="-70" y="-176" width="140" height="74" rx="12" fill="#343a40" stroke="#212529" stroke-width="3"/>
      <circle class="ch-lamp" cx="-52" cy="-158" r="7" fill="#51cf66"/>
      <text x="6" y="-150" text-anchor="middle" font-size="18" fill="#f8f9fa" font-weight="bold">ЗАРЯДНЕ</text>
      <text x="0" y="-122" text-anchor="middle" font-size="12" fill="#adb5bd">жене електрони в «−»</text>
    </g>
    ${smokeSvg(-104)}`,
  labels: p => [
    {x:107, y:-58, t:'+', cls:'pol plus'},
    {x:107, y:74,  t:'−', cls:'pol minus'},
    {x:0, y:108, t:'БАТАРЕЙКА', cls:'name strong'},
    {x:0, y:132, t:['', 'одна пальчикова', 'дві пальчикові', 'три пальчикові'][p.props.cells], cls:'name'},
    {x:0, y:156, t: p.s.dead ? 'зіпсувалась' : p.s.charging ? 'заряджається' : p.s.m <= 0 ? 'розрядилась'
                  : p.s.heat > 0.6 ? 'гаряча! не чіпай' : p.s.heat > 0.25 ? 'гріється' : '', cls:'word'},
  ],
  paint(p, g, env){
    const h = p.s.dead ? 1 : p.s.heat;
    g.querySelector('.bat-shell').setAttribute('fill', h > 0.02
      ? (h < 0.5 ? circMix('#2b2f36', '#f59f00', h * 2) : circMix('#f59f00', '#e03131', (h - 0.5) * 2)) : '#2b2f36');
    const wave = g.querySelector('.bat-heat');
    wave.setAttribute('opacity', p.s.dead ? 0 : Math.min(1, p.s.heat * 1.6));
    wave.setAttribute('transform', 'translate(0,' + (env.still ? 0 : -((env.t * 30) % 20)) + ')');
    g.querySelector('.bat-swell').setAttribute('transform', p.s.dead ? 'scale(1.07,1.04)' : '');
    g.querySelector('.bat-leak').setAttribute('opacity', p.s.dead ? 1 : 0);
    g.querySelector('.charger').setAttribute('opacity', p.s.charging ? 1 : 0);
    g.querySelector('.ch-lamp').setAttribute('opacity', (Math.floor(env.t / 0.42) % 2) ? 1 : 0.25);
    paintSmoke(g, p.s.dead ? p.s.t : 99);
  },
  // безпечно до ~1 А; коротке замикання (~9 А) псує за ~2 с — раніше, ніж вона розрядиться
  tick(p, dt){
    const s = p.s, N = BAT_CAP[p.props.cap];
    if (circHeat(s, Math.abs(p.rt.I), dt, 6, 6)) return {resolve:true, say:CIRC.parts.battery.say};
    if (!s.charging) return null;
    s.acc += 8 * dt;                                     // зарядне: запас повертається в кімнату «−»
    while (s.acc >= 1 && s.m < N){ s.acc -= 1; s.m++; }
    if (s.m < N) return null;
    s.charging = false; s.acc = 0;
    return {resolve:true, say:'Зарядили! Кімната «−» знову повна, батарейка повернулась у коло.'};
  },
  // Розряд іде рівно за потоком: скільки електронів вийшло доріжкою в дріт,
  // на стільки й зменшилась купка в кімнаті «−». dist — скільки пройшов ланцюг.
  drain(p, dist){
    const s = p.s;
    if (s.dead || s.charging || s.m <= 0) return false;
    s.acc += dist / CIRC.SPACING;
    while (s.acc >= 1 && s.m > 0){ s.acc -= 1; s.m--; }
    return s.m <= 0;
  },
  warn: p => Math.abs(p.rt.I) > 1
    ? 'Коротке замикання! Між плюсом і мінусом немає деталі, яка б стримувала електрони: вони мчать з усієї сили, кімната «−» порожніє на очах, а батарейка гріється. Швидше розірви коло: прибери дріт або розімкни вимикач. Правило 3.' : '',
  say: 'Батарейка зіпсувалась. Плюс і мінус з\'єднали майже навпростець: електрони помчали з усієї сили, і вся енергія батарейки пішла в тепло всередині неї самої. Вона розігрілась, здулась і потекла. Насправді так можна обпекти пальці. Правило 3: плюс і мінус ніколи не з\'єднуємо напряму.',
};

/* ---------------- резистор ---------------- */
const RES_COLORS = ['#111111','#7a4a1e','#c92a2a','#f08c00','#fcc419','#2f9e44','#1c7ed6','#7048e8','#868e96','#f8f9fa'];
function resText(o){ return o >= 1000 ? String(o / 1000).replace('.', ',') + ' кОм' : o + ' Ом'; }
function resBands(o){                           // справжній кольоровий код: дві цифри й множник
  let e = 0; while (o >= 100){ o /= 10; e++; }
  const d = Math.round(o);
  return [Math.floor(d / 10), d % 10, e].map(i => RES_COLORS[i]);
}
CIRC.parts.resistor = {
  name:'Резистор', pal:1, rotatable:true, ...TWO_TERMS,
  path:[[-60,0],[60,0]],
  init: () => ({props:{ohm:220}, s:FRESH()}),
  params:[{key:'ohm', label:'Опір', options:[10, 47, 100, 220, 470, 1000, 4700, 10000, 100000].map(o => [o, resText(o)])}],
  actions: p => p.s.dead ? [FIX] : [],
  act(p, id){ if (id === 'fix') p.s = FRESH(); },
  elec: p => p.s.dead ? {kind:'open'} : {kind:'R', r:p.props.ohm},
  draw(p){
    // розмір — умовний код: що більший опір, то більший резистор
    const k = Math.log10(p.props.ohm / 10) / 4, w = 54 + 50 * k, h = 22 + 18 * k;
    const bw = Math.max(6, w * 0.07), st = bw + 8, burnt = p.s.dead;
    return `<line x1="-60" y1="0" x2="60" y2="0" ${LEAD}/>
      <rect class="resBody" x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="10"
        fill="${burnt ? '#3b2f25' : '#e8cfa0'}" stroke="${burnt ? '#1a1a1a' : '#b08d57'}" stroke-width="3"/>
      ${burnt ? '' : resBands(p.props.ohm).map((c, i) => `<rect x="${-st + i*st - bw/2}" y="${-h/2 + 3}" width="${bw}" height="${h - 6}" fill="${c}"/>`).join('')}
      ${smokeSvg(-34)}`;
  },
  labels: p => [{x:0, y:44, t:'резистор ' + resText(p.props.ohm), cls:'name'},
    {x:0, y:68, t: p.s.dead ? 'згорів' : p.s.heat > 0.02 ? 'гріється!' : '', cls:'word'}],
  paint(p, g){
    if (!p.s.dead) g.querySelector('.resBody').setAttribute('fill', circMix('#e8cfa0', '#e8590c', p.s.heat));
    paintSmoke(g, p.s.dead ? p.s.t : 99);
  },
  // звичайний резистор витримує чверть вата; 10 Ом просто на батарейку згорає за ~2,5 с
  tick: (p, dt) => circHeat(p.s, p.rt.I * p.rt.I * p.props.ohm / 0.25, dt, 6, 4) ? {resolve:true, say:CIRC.parts.resistor.say} : null,
  warn: p => p.rt.I * p.rt.I * p.props.ohm > 0.25
    ? 'Резистор гріється: опір замалий, і крізь нього мчить забагато електронів. Уся їхня енергія йде в тепло. Розірви коло або постав резистор з більшим опором.' : '',
  say: 'Резистор згорів. Опір був замалий, електронів ішло забагато, і він перегрівся. Тепер у колі розрив, струму немає.',
};

/* ---------------- світлодіод ---------------- */
function anodeT(p){ return p.props.flipped ? 1 : 0; }     // довга ніжка «+»

function polLabels(p, y){
  const a = anodeT(p);
  return [
    {x:-44, y, t: a === 0 ? '+' : '−', cls: 'pol ' + (a === 0 ? 'plus' : 'minus')},
    {x: 44, y, t: a === 1 ? '+' : '−', cls: 'pol ' + (a === 1 ? 'plus' : 'minus')},
  ];
}

// vf — скільки «сили» забирає світлодіод: жодному не вистачить однієї пальчикової, синьому й білому — ледь вистачає двох
const LED_COLORS = {
  red:    {t:'червоний', vf:1.9, dark:'#7a1212', lit:'#ffa69c', glow:'#ff8787', out:'#e03131', edge:'#a61e1e'},
  yellow: {t:'жовтий',   vf:2.0, dark:'#7a5a00', lit:'#fff3a0', glow:'#ffe066', out:'#fab005', edge:'#b08900'},
  green:  {t:'зелений',  vf:2.1, dark:'#0b5a1e', lit:'#b2f2bb', glow:'#69db7c', out:'#2f9e44', edge:'#1e7a34'},
  blue:   {t:'синій',    vf:2.8, dark:'#0b2e6b', lit:'#a5d8ff', glow:'#74c0fc', out:'#1c7ed6', edge:'#1864ab'},
  white:  {t:'білий',    vf:2.8, dark:'#adb5bd', lit:'#ffffff', glow:'#f1f3f5', out:'#ced4da', edge:'#868e96'},
};
CIRC.parts.led = {
  name:'Світлодіод', pal:2, rotatable:true, ...TWO_TERMS, box:[-44,-80,44,96],
  path:[[-60,0],[-12,0],[-12,-24],[12,-24],[12,0],[60,0]],
  init: () => ({props:{flipped:false, color:'red'}, s:FRESH()}),
  params:[{key:'color', label:'Колір', options:Object.keys(LED_COLORS).map(k => [k, LED_COLORS[k].t])}],
  actions: p => [{id:'flip', t:'⇄ Перевернути ніжки'}].concat(p.s.dead ? [FIX] : []),
  act(p, id){
    if (id === 'flip') p.props.flipped = !p.props.flipped;
    if (id === 'fix') p.s = FRESH();
  },
  elec: p => p.s.dead ? {kind:'open'} : {kind:'D', vf:LED_COLORS[p.props.color].vf, rd:10, a:anodeT(p), k:1 - anodeT(p)},
  draw: p => {
    const c = LED_COLORS[p.props.color];
    return `
    <circle class="glowOut" cx="0" cy="-48" r="54" fill="${c.out}" opacity="0"/>
    <circle class="glow" cx="0" cy="-48" r="26" fill="${c.glow}" opacity="0"/>
    <path d="M-60,0 H-12 V-24 M60,0 H12 V-24" ${LEAD} stroke-linejoin="round"/>
    <path class="ledBody" d="M-22,-24 V-50 a22,22 0 0 1 44,0 V-24 z" fill="${c.dark}" stroke="${c.edge}" stroke-width="3"/>
    <rect class="ledFlange" x="-28" y="-30" width="56" height="12" rx="3" fill="${c.dark}" stroke="${c.edge}" stroke-width="2"/>
    <path class="crack" d="M-16,-36 l10,-14 l-4,20 l12,-10 l-6,18 l10,-8" fill="none" stroke="#1a1a1a"
      stroke-width="3" stroke-linecap="round" opacity="0"/>
    <g class="blocked" opacity="0">
      <circle cx="0" cy="-40" r="34" fill="none" stroke="#e03131" stroke-width="7"/>
      <line x1="-22" y1="-62" x2="22" y2="-18" stroke="#e03131" stroke-width="7" stroke-linecap="round"/>
    </g>
    ${smokeSvg(-86)}`;
  },
  labels: p => [...polLabels(p, 24),
    {x:0, y:48, t:'світлодіод', cls:'name'},
    {x:0, y:72, t: ledWord(p), cls:'word'}],
  paint(p, g){
    const s = p.s, c = LED_COLORS[p.props.color], I = p.rt.I * (anodeT(p) === 0 ? 1 : -1), dead = s.dead;
    const lvl = dead || I <= 1e-5 ? 0 : Math.min(1, 0.10 + 0.82 * Math.pow(Math.min(1, circFlow(I)), 0.7) + 0.3 * s.heat);
    const glow = g.querySelector('.glow'), out = g.querySelector('.glowOut');
    glow.setAttribute('fill', s.heat > 0.5 ? '#fffdf5' : c.glow);         // перегрів: кристал біліє
    out.setAttribute('fill', s.heat > 0.5 ? '#ffd8a8' : c.out);
    glow.setAttribute('opacity', Math.min(1, lvl * 1.1)); glow.setAttribute('r', 10 + 30 * lvl);
    out.setAttribute('opacity', 0.42 * lvl);               out.setAttribute('r', 26 + 44 * lvl);
    g.querySelector('.ledBody').setAttribute('fill', dead ? '#2f2f2f' : lvl > 0.02 ? circMix(c.dark, c.lit, lvl) : c.dark);
    g.querySelector('.ledFlange').setAttribute('fill', dead ? '#262626' : lvl > 0.02 ? circMix(c.dark, c.lit, lvl * 0.7) : c.dark);
    g.querySelector('.crack').setAttribute('opacity', dead ? 1 : 0);
    g.querySelector('.blocked').setAttribute('opacity', !dead && p.rt.vrev > 0.3 ? 1 : 0);
    paintSmoke(g, dead ? s.t : 99);
  },
  // безпечно до ~25 мА; без резистора (~250 мА) згорає за ~2,5 с
  tick: (p, dt) => circHeat(p.s, Math.abs(p.rt.I) / 0.025, dt, 7.5, 4) ? {resolve:true, say:CIRC.parts.led.say} : null,
  warn: p => Math.abs(p.rt.I) > 0.025
    ? 'Світлодіод перегрівається: крізь нього мчить забагато електронів, і те, що не встигає стати світлом, стає теплом. Швидше розірви коло або додай резистор! Правило 4.' : '',
  say: 'Світлодіод згорів. Крізь нього за секунду проходило надто багато електронів. Він не встигав перетворювати їхню енергію на світло, і зайве пішло в тепло: кристал перегрівся і тріснув. Правило 4: світлодіод працює тільки разом з резистором.',
};

function ledWord(p){
  const s = p.s, I = Math.abs(p.rt ? p.rt.I : 0);
  if (s.dead) return 'згорів';
  if (I <= 1e-5) return '';
  if (s.heat > 0.02 || I > 0.025) return 'перегрівається!';
  const f = circFlow(I);
  return f > 0.75 ? 'яскраво' : f > 0.4 ? 'тьмяніше' : 'ледь світить';
}

/* ---------------- пищалка (активний баззер) ---------------- */
CIRC.parts.buzzer = {
  name:'Пищалка', pal:3, rotatable:true, ...TWO_TERMS,
  path:[[-60,0],[60,0]],
  init: () => ({props:{flipped:false, vol:0, tone:2500}, s:{}}),
  params:[
    {key:'vol',  label:'Гучність', options:[[0,'без звуку'],[0.01,'тихо'],[0.03,'середньо'],[0.06,'голосно']]},
    {key:'tone', label:'Тон',      options:[[1000,'низький'],[2500,'середній'],[4000,'високий']]},
  ],
  actions: () => [{id:'flip', t:'⇄ Перевернути ніжки'}],
  act(p, id){ if (id === 'flip') p.props.flipped = !p.props.flipped; },
  // власний генератор і опір усередині: сама себе стримує, резистор не потрібен
  elec: p => ({kind:'D', vf:0.5, rd:150, a:anodeT(p), k:1 - anodeT(p)}),
  sounding: p => Math.abs(p.rt.I) > 0.005,
  draw: () => `
    <line x1="-60" y1="0" x2="60" y2="0" ${LEAD}/>
    <g class="waves" opacity="0" fill="none" stroke="#f59f00" stroke-width="4" stroke-linecap="round">
      <path d="M-16,-40 Q0,-50 16,-40"/><path d="M-26,-52 Q0,-66 26,-52"/><path d="M-36,-64 Q0,-82 36,-64"/>
    </g>
    <circle cx="0" cy="0" r="30" fill="#1f2328" stroke="#000" stroke-width="2"/>
    <circle cx="0" cy="0" r="20" fill="none" stroke="#3a3f47" stroke-width="3"/>
    <circle cx="0" cy="0" r="5" fill="#000"/>`,
  labels: p => [...polLabels(p, 24),
    {x:0, y:52, t:'пищалка', cls:'name'},
    {x:0, y:76, t: p.rt && CIRC.parts.buzzer.sounding(p) ? (p.props.vol ? 'пі-і-і!' : 'пищить без звуку') : '', cls:'word'}],
  paint(p, g, env){
    const w = g.querySelector('.waves');
    w.setAttribute('opacity', CIRC.parts.buzzer.sounding(p) ? 1 : 0);
    const k = env.still ? 2 : Math.floor(env.t * p.props.tone / 300) % 3;   // що вищий тон, то частіше хвилі
    [...w.children].forEach((c, i) => c.setAttribute('opacity', i <= k ? 1 : 0.2));
  },
};

/* ---------------- вимикач ---------------- */
CIRC.parts.switch = {
  name:'Вимикач', pal:4, rotatable:true, toggle:true, ...TWO_TERMS,
  path:[[-60,0],[60,0]],
  init: () => ({props:{}, s:{on:false}}),
  gap: p => p.s.on ? null : [30, 90],
  elec: p => p.s.on ? {kind:'R', r:CIRC_WIRE_R} : {kind:'open'},
  draw: p => `
    <rect class="hit" x="-64" y="-50" width="128" height="72" rx="12" fill="transparent"/>
    <path d="M-60,0 H-30 M30,0 H60" ${LEAD}/>
    <line x1="-30" y1="0" x2="${p.s.on ? 30 : 10}" y2="${p.s.on ? 0 : -44}"
      stroke="var(--wire)" stroke-width="12" stroke-linecap="round"/>
    <circle cx="-30" cy="0" r="10" fill="#868e96" stroke="var(--wire)" stroke-width="3"/>
    <circle cx="30" cy="0" r="10" fill="#868e96" stroke="var(--wire)" stroke-width="3"/>
    ${p.s.on ? '' : '<path d="M-14,0 H16" stroke="#e03131" stroke-width="4" stroke-dasharray="6 6" stroke-linecap="round"/>'}`,
  labels: p => [{x:0, y:44, t: p.s.on ? 'вимикач: замкнено' : 'вимикач: натисни', cls:'name'}],
};

/* ---------------- кнопка ---------------- */
CIRC.parts.button = {
  name:'Кнопка', pal:5, rotatable:true, hold:true, ...TWO_TERMS,
  path:[[-60,0],[60,0]],
  init: () => ({props:{}, s:{pressed:false}}),
  gap: p => p.s.pressed ? null : [34, 86],
  elec: p => p.s.pressed ? {kind:'R', r:CIRC_WIRE_R} : {kind:'open'},
  draw: p => `
    <rect class="hit" x="-64" y="-40" width="128" height="80" rx="12" fill="transparent"/>
    <path d="M-60,0 H-26 M26,0 H60" ${LEAD}/>
    <rect x="-26" y="-26" width="52" height="52" rx="7" fill="#343a40" stroke="#212529" stroke-width="3"/>
    <circle cx="0" cy="0" r="${p.s.pressed ? 13 : 16}" fill="${p.s.pressed ? '#a61e1e' : '#e03131'}"
      stroke="${p.s.pressed ? '#ffd43b' : '#a61e1e'}" stroke-width="3"/>`,
  labels: p => [{x:0, y:48, t: p.s.pressed ? 'кнопка: натиснута' : 'кнопка: тримай', cls:'name'}],
};
