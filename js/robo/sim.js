/* =========================================================
   ДЕМОНСТРАЦІЯ ЕЛЕКТРИЧНОГО КОЛА
   Жива SVG-анімація для проєктора: електрони виходять з «−»,
   біжать дротами і збираються в «+». Не покроковий інструмент —
   це вільна демонстрація, тому вона поза реєстром інструментів.

   initRoboSim() викликає js/ui/doc.js після кожного рендера розділу.
   ========================================================= */
function initRoboSim(){
  if (!document.getElementById('scene')) return;
  const gen = ++ROBO.simGen;

  var track = document.getElementById('track');
  var dotsG = document.getElementById('dots');
  var plusG = document.getElementById('plusRoom');
  var minusG= document.getElementById('minusRoom');
  var glow  = document.getElementById('glow');
  var msg   = document.getElementById('msg');
  var gSwHit = document.getElementById('swHit');
  var chBtn = document.getElementById('chargeBtn');
  var rsBtn = document.getElementById('reset');
  var speed = document.getElementById('speed');
  var swArm = document.getElementById('swArm');
  var charger = document.getElementById('charger');
  var dirLabel = document.getElementById('dirLabel');
  var gRes = document.getElementById('gRes');
  var gLed = document.getElementById('gLed');
  var gSw  = document.getElementById('gSw');
  var chLamp = document.getElementById('chLamp');
  var swBridge = document.getElementById('swBridge');
  var gap = document.getElementById('gap');
  var resBands = document.getElementById('resBands');
  var resLabel = document.getElementById('resLabel');
  var rbs = document.querySelectorAll('.rb');

  function showCharger(on){
    charger.setAttribute('opacity', on ? 1 : 0);
    swBridge.setAttribute('opacity', on ? 1 : 0);
    gRes.setAttribute('opacity', on ? 0 : 1);
    gLed.setAttribute('opacity', on ? 0 : 1);
    gSw.setAttribute('opacity', on ? 0 : 1);
    gSw.style.pointerEvents = on ? 'none' : 'auto';
  }
  var ledBody = document.getElementById('ledBody');
  var ledWord = document.getElementById('ledWord');
  var glowOut = document.getElementById('glowOut');
  var ledFlange = document.getElementById('ledFlange');
  var crack = document.getElementById('crack');
  var smoke = document.getElementById('smoke');
  var blocked = document.getElementById('blocked');
  var legLeft = document.getElementById('legLeft');
  var legRight = document.getElementById('legRight');
  var flipBtn = document.getElementById('flipBtn');

  function drawPolarity(){
    legLeft.textContent  = flipped ? '−' : '+';
    legRight.textContent = flipped ? '+' : '−';
    legLeft.setAttribute('fill',  flipped ? '#74c0fc' : '#ff8787');
    legRight.setAttribute('fill', flipped ? '#ff8787' : '#74c0fc');
    blocked.setAttribute('opacity', flipped && !burned ? 1 : 0);
    flipBtn.textContent = flipped ? 'Повернути як було' : 'Перевернути світлодіод';
  }

  function burn(){
    burned = true; closed = false; lit = false; smokeT = 0;
    crack.setAttribute('opacity', 1);
    say('Світлодіод згорів. Без резистора крізь нього за секунду проходило надто багато електронів. Він не встигав перетворювати їхню енергію на світло, і зайве пішло в тепло: кристал перегрівся і тріснув. Саме тому поряд зі світлодіодом завжди ставлять резистор.');
    setButtons();
  }

  function mixRed(t){                    // від темного бордо до майже білого
    var r = Math.round(108 + 147 * t), g = Math.round(14 + 152 * t), b = Math.round(14 + 142 * t);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  var slow = 1;               // 1 = 220 Ом, менше = більший опір
  var BANDS = {
    '1':   ['#c92a2a','#c92a2a','#7a4a1e'],
    '0.45':['#7a4a1e','#111111','#c92a2a'],
    '0.18':['#7a4a1e','#111111','#f08c00']
  };

  function drawResistor(){
    var w = 76 + 76 * (1 - slow), h = 26 + 22 * (1 - slow);
    var body = document.getElementById('resBody');
    body.setAttribute('x', 550 - w / 2); body.setAttribute('y', 110 - h / 2);
    body.setAttribute('width', w); body.setAttribute('height', h);
    while (resBands.firstChild) resBands.removeChild(resBands.firstChild);
    var cols = BANDS[String(slow)] || BANDS['1'];
    var bw = Math.max(6, w * 0.07), step = bw + 8;
    for (var i = 0; i < 3; i++){
      var r = document.createElementNS(SVGNS, 'rect');
      r.setAttribute('x', 550 - step + i * step - bw / 2);
      r.setAttribute('y', 110 - h / 2 + 3);
      r.setAttribute('width', bw); r.setAttribute('height', h - 6);
      r.setAttribute('fill', cols[i]);
      resBands.appendChild(r);
    }
  }

  var SVGNS = 'http://www.w3.org/2000/svg';
  var LEN = track.getTotalLength();
  var WIRE_N = 12;             // стільки електронів завжди їде в дроті
  var ROOM_N = 12;             // стільки лежить у кімнатах батарейки
  var N = WIRE_N + ROOM_N;
  var R = 6;

  // кімнати всередині батарейки: 6 місць у ряд, два ряди
  function slot(room, i){
    var col = i % 8, row = Math.floor(i / 8);
    return { x: 132 + col * 14, y: (room === 'minus' ? 290 : 226) + row * 20 };
  }

  var e = [];                  // {state:'minus'|'wire'|'plus', s, el, tx}
  for (var i = 0; i < N; i++){
    var c = document.createElementNS(SVGNS, 'circle');
    c.setAttribute('r', R); c.setAttribute('fill', '#4dabf7');
    c.setAttribute('stroke', '#1864ab'); c.setAttribute('stroke-width', '2');
    dotsG.appendChild(c);
    var t = document.createElementNS(SVGNS, 'rect');   // знак «−» усередині електрона
    t.setAttribute('width', 6); t.setAttribute('height', 2);
    t.setAttribute('rx', 1); t.setAttribute('fill', '#0b3d66');
    dotsG.appendChild(t);
    e.push({ state: 'minus', s: 0, el: c, tx: t });
  }

  var closed = false, charging = false, dead = false;
  var hot = 0, burned = false, smokeT = 0, flipped = false;
  var last = 0, glowLevel = 0;

  function spread(){            // рівномірно розставити дротяні електрони по колу
    var d = LEN / WIRE_N, k = 0;
    for (var i = 0; i < N; i++){
      if (e[i].state === 'wire'){ e[i].s = k * d; k++; }
    }
  }

  function room_gap(forward){   // чи від'їхав попередній достатньо, щоб випустити наступного
    var d = LEN / WIRE_N, ok = true;
    for (var i = 0; i < N; i++){
      if (e[i].state !== 'wire') continue;
      if (forward ? (e[i].s < d) : (e[i].s > LEN - d)) ok = false;
    }
    return ok;
  }

  function takeFrom(room, s0){  // один електрон із кімнати виходить у дріт
    for (var i = 0; i < N; i++){
      if (e[i].state === room){ e[i].state = 'wire'; e[i].s = s0; return true; }
    }
    return false;
  }

  function nearest(x, y){
    var best = 0, bd = 1e9;
    for (var s = 0; s <= LEN; s += 2){
      var p = track.getPointAtLength(s);
      var d = (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y);
      if (d < bd){ bd = d; best = s; }
    }
    return best;
  }

  var ledA = nearest(874, 250), ledB = nearest(850, 250);
  var ledIn  = Math.min(ledA, ledB);   // вхід у ніжку світлодіода
  var ledOut = Math.max(ledA, ledB);   // вихід із другої ніжки
  var ledS = nearest(862, 216);
  var lit = false;

  function count(state){
    var n = 0;
    for (var i = 0; i < N; i++) if (e[i].state === state) n++;
    return n;
  }

  function put(el, tx, x, y){
    el.setAttribute('cx', x); el.setAttribute('cy', y);
    tx.setAttribute('x', x - 3); tx.setAttribute('y', y - 1);
  }

  function draw(){
    var mi = 0, pi = 0;
    for (var i = 0; i < N; i++){
      var q = e[i], p;
      if (q.state === 'wire'){
        p = track.getPointAtLength(Math.max(0, Math.min(LEN, q.s)));
        put(q.el, q.tx, p.x, p.y);
      } else if (q.state === 'minus'){
        p = slot('minus', mi++); put(q.el, q.tx, p.x, p.y);
      } else {
        p = slot('plus', pi++);  put(q.el, q.tx, p.x, p.y);
      }
    }
  }

  function say(t){ msg.textContent = t; }

  function setButtons(){
    chBtn.disabled = charging || burned || count('plus') === 0;
    chBtn.textContent = charging ? 'Заряджається…' : 'Поставити в зарядне';
    swArm.setAttribute('x2', closed ? 580 : 560);
    swArm.setAttribute('y2', closed ? 430 : 386);
    gap.setAttribute('opacity', closed ? 0 : 1);
  }

  function step(ts){
    if (gen !== ROBO.simGen) return;   // документ перемальовано — старий цикл гасне
    if (!last) last = ts;
    var dt = Math.min(64, ts - last); last = ts;
    var v = Number(speed.value) * 46 * slow * dt / 1000;
    var i, q, near = 0;

    if (charging){
      for (i = 0; i < N; i++){
        q = e[i];
        if (q.state !== 'wire') continue;
        q.s -= v;
        if (q.s <= 0){
          var back = q.s;
          q.state = 'minus'; q.s = 0;
          takeFrom('plus', LEN + back);
        }
      }
      if (count('wire') < WIRE_N && count('plus') > 0 && room_gap(false)){
        takeFrom('plus', LEN);
      }
      if (count('plus') === 0 && count('wire') === 0){
        charging = false; closed = false;
        showCharger(false);
        dirLabel.textContent = 'електрони біжать з кімнати «−» через дроти в кімнату «+»';
        say('Зарядили! Запас у кімнаті «−» повний. Натисни на вимикач, щоб знову засвітити.');
        setButtons();
      }
      chLamp.setAttribute('opacity', (Math.floor(ts / 420) % 2) ? 1 : 0.25);
      glowLevel = 0;
    } else if (closed && !burned && !flipped && (count('minus') > 0 || count('wire') > 0)){
      for (i = 0; i < N; i++){
        q = e[i];
        if (q.state !== 'wire') continue;
        q.s += v;
        if (q.s >= ledIn && q.s <= ledOut){ near = 1; lit = true; }
        if (q.s >= LEN){
          var carry = q.s - LEN;
          q.state = 'plus'; q.s = LEN;
          takeFrom('minus', carry);         // на місце того, що доїхав, виходить наступний
        }
      }
      if (count('wire') < WIRE_N && count('minus') > 0 && room_gap(true)){
        takeFrom('minus', 0);               // заповнюємо дріт на початку роботи
      }
      // коли запас скінчився, хвіст добігає: гасимо світло, щойно останній минув світлодіод
      var ahead = false;
      for (i = 0; i < N; i++){ if (e[i].state === 'wire' && e[i].s <= ledOut) ahead = true; }
      if (!ahead) lit = false;
      glowLevel = lit ? Math.min(1, 0.10 + 0.82 * Math.pow(slow, 0.7) + 0.08 * near) : 0;
      if (slow > 1 && lit){
        hot += dt;
        if (hot > 2300){ burn(); }
      }
      if (count('minus') === 0 && count('wire') === 0 && !dead){
        dead = true; lit = false;
        say('Усі електрони перебігли в кімнату «+», дроти порожні. Батарейка розрядилась, світла немає. Постав її в зарядне.');
        setButtons();
      }
    } else {
      lit = false;
      glowLevel = 0;
    }

    if (burned){
      smokeT += dt;
      var up = Math.min(1, smokeT / 2600);
      smoke.setAttribute('opacity', 0.75 * (1 - up));
      smoke.setAttribute('transform', 'translate(0,' + (-60 * up) + ')');
      glow.setAttribute('opacity', 0); glowOut.setAttribute('opacity', 0);
      ledBody.setAttribute('fill', '#2f2f2f'); ledFlange.setAttribute('fill', '#262626');
      ledWord.textContent = 'згорів';
      draw();
      requestAnimationFrame(step);
      return;
    }
    // перегрів: що гарячіше, то білішим стає кристал
    if (slow > 1 && hot > 0){
      var ov = Math.min(1, hot / 2300);
      glowOut.setAttribute('fill', ov > 0.5 ? '#ffd8a8' : '#e03131');
      glow.setAttribute('fill', ov > 0.5 ? '#fff5f5' : '#ff8787');
    } else {
      glowOut.setAttribute('fill', '#e03131'); glow.setAttribute('fill', '#ff8787');
    }
    glow.setAttribute('opacity', Math.min(1, glowLevel * 1.1));
    glow.setAttribute('r', 10 + 30 * glowLevel);
    glowOut.setAttribute('opacity', 0.42 * glowLevel);
    glowOut.setAttribute('r', 26 + 44 * glowLevel);
    ledBody.setAttribute('fill', glowLevel > 0.02 ? mixRed(glowLevel) : '#7a1212');
    ledFlange.setAttribute('fill', glowLevel > 0.02 ? mixRed(glowLevel * 0.7) : '#6b1010');
    ledWord.textContent = glowLevel < 0.02 ? ''
      : (flipped ? '' : slow > 1 ? 'перегрівається!' : (slow === 1 ? 'яскраво' : (slow > 0.2 ? 'тьмяніше' : 'ледь світить')));
    draw();
    requestAnimationFrame(step);
  }

  gSwHit.addEventListener('click', function(){
    if (charging || burned) return;
    closed = !closed;
    if (!closed) lit = false;
    say(closed && flipped
      ? 'Коло замкнене, а електрони стоять. Світлодіод пропускає струм тільки в один бік, і зараз він стоїть навпаки: для струму це те саме, що ще один розрив. Світла немає, але нічого й не згорить: немає струму, немає тепла.'
      : closed
      ? (count('wire') === 0
          ? 'Коло замкнене. Електрони вийшли з кімнати «−» і побігли по дротах.'
          : 'Коло замкнене. Усі електрони рушили одночасно, світло спалахнуло тієї ж миті.')
      : 'Коло розірване. Зупинились усі одразу, навіть далеко від вимикача.');
    setButtons();
  });

  flipBtn.addEventListener('click', function(){
    flipped = !flipped; lit = false; hot = 0;
    drawPolarity();
    say(flipped
      ? 'Світлодіод поставили навпаки. Тепер він пропускати не буде: замкни вимикач і переконайся.'
      : 'Світлодіод повернули правильно: довга ніжка до плюса. Замкни коло, і він засвітиться.');
    setButtons();
  });

  chBtn.addEventListener('click', function(){
    charging = true; closed = true; lit = false; dead = false;
    showCharger(true);
    dirLabel.textContent = 'зарядне жене ті самі електрони назад, у кімнату «−»';
    say('Зарядне штовхає електрони у зворотний бік: з «+» через дроти назад у «−».');
    setButtons();
  });

  rsBtn.addEventListener('click', function(){
    closed = false; charging = false; lit = false; dead = false;
    burned = false; hot = 0; smokeT = 0; flipped = false; drawPolarity();
    crack.setAttribute('opacity', 0); smoke.setAttribute('opacity', 0);
    smoke.setAttribute('transform', 'translate(0,0)');
    showCharger(false);
    for (var i = 0; i < N; i++){ e[i].state = 'minus'; e[i].s = 0; }
    dirLabel.textContent = 'електрони біжать з кімнати «−» через дроти в кімнату «+»';
    say('Коло розімкнуте, у дротах порожньо. Натисни на вимикач унизу схеми, щоб замкнути коло.');
    draw(); setButtons();
  });

  for (var b = 0; b < rbs.length; b++){
    rbs[b].addEventListener('click', function(){
      for (var k = 0; k < rbs.length; k++) rbs[k].classList.remove('on');
      this.classList.add('on');
      slow = Number(this.getAttribute('data-k'));
      resLabel.textContent = 'резистор ' + this.getAttribute('data-n');
      drawResistor();
      hot = 0;
      if (slow > 1){
        gRes.setAttribute('opacity', 0);
      } else {
        gRes.setAttribute('opacity', 1);
      }
      say(slow > 1
        ? 'Резистора в колі немає: стримувати електрони нічим. Замкни вимикач і дивись, що станеться зі світлодіодом.'
        : slow === 1
        ? 'Резистор 220 Ом, найменший: стримує слабко, електрони йдуть швидко, світло яскраве.'
        : (slow > 0.2
          ? 'Резистор 1 кОм, більший: сповільнились УСІ електрони в колі, навіть ті, що далеко від резистора. Світло тьмяніше, зате батарейка живе довше.'
          : 'Резистор 10 кОм, найбільший: електрони ледь повзуть по всьому колу, світло ледь помітне, а батарейка розрядиться дуже нескоро.'));
    });
  }

  drawResistor(); drawPolarity(); draw(); setButtons();
  requestAnimationFrame(step);

}
