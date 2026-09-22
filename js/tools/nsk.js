/* =========================================================
   НАЙМЕНШЕ СПІЛЬНЕ КРАТНЕ (розкладанням на прості множники)
   ---------------------------------------------------------
   Кожне число розкладаємо «драбинкою» — праворуч від риски виходить
   стовпчик простих множників. Далі:
     1) стовпчик НАЙБІЛЬШОГО числа беремо в НСК цілком;
     2) решту стовпчиків звіряємо по одному множнику: якщо такий множник
        уже є в НСК і ще не має пари — підкреслюємо пару, а свій закреслюємо;
        якщо пари немає — множника бракує, він летить у НСК;
     3) перемножуємо — це і є НСК.
   Уся розмітка — на клітинках зошита: цифра в клітинці, риска драбинки
   по лінії сітки, тож клон множника летить у рядок НСК без масштабування.
   ========================================================= */

const NSK_FLY=0.6, NSK_GAP=0.12;     // політ множника в рядок НСК і пауза до наступного
const NSK_TAG=3;                     // ширина підказок праворуч від стовпчика, у клітинках

// драбинка: [{val, div}] — останній рядок з 1 без дільника
function nskLadder(n){
  const rows=[], factors=[];
  let cur=n;
  while(cur>1){
    let p=2; while(cur%p) p++;
    rows.push({val:cur, div:p}); factors.push(p); cur/=p;
  }
  rows.push({val:1, div:null});
  return {n, rows, factors};
}

function buildNskModel(cfg){
  const raw=[cfg.a, cfg.b, cfg.c].filter(x=>x!=null && x!=='' && !Number.isNaN(+x));
  if(raw.length<2) throw 'Введи щонайменше два числа — наприклад, 24 і 18.';
  const nums=raw.map(x=>+x);
  if(nums.some(x=>!Number.isInteger(x))) throw 'НСК шукаємо для натуральних чисел — введи цілі числа.';
  if(nums.some(x=>x<2)) throw 'Візьми числа, більші за 1: для 1 кратним є будь-яке число, розкладати нічого.';
  if(nums.some(x=>x>999)) throw 'Щоб драбинки вмістилися на аркуш, візьми числа від 2 до 999.';

  const cols=nums.map(nskLadder);
  const main=nums.indexOf(Math.max(...nums));            // стовпчик найбільшого числа
  const others=nums.map((_,i)=>i).filter(i=>i!==main);
  const list=nums.join('; ');
  const two=nums.length===2;

  // НСК збираємо множниками: {f, col, row} — звідки множник узято
  const ans=cols[main].factors.map((f,row)=>({f, col:main, row}));
  const checks=[];
  for(const c of others){
    const used=new Set();                                // множники НСК, що вже мають пару в цьому стовпчику
    cols[c].factors.forEach((f,row)=>{
      const had=ans.some(a=>a.f===f);
      const k=ans.findIndex((a,i)=>a.f===f && !used.has(i));
      if(k>=0){ used.add(k); checks.push({col:c, row, f, match:k}); }
      else { ans.push({f, col:c, row}); used.add(ans.length-1); checks.push({col:c, row, f, match:null, had, ansIdx:ans.length-1}); }
    });
  }
  const value=ans.reduce((p,a)=>p*a.f, 1);

  const steps=[];
  const base={lad:0, main:false, chk:0, ans:0, final:false};
  const push=(o)=>steps.push(Object.assign({}, base, steps.length?steps[steps.length-1]:{}, {final:false}, o));

  push({kind:'intro',
    text:`Шукаємо <b>найменше спільне кратне</b> чисел ${nums.join(two?' і ':', ')} — найменше число, яке ділиться націло на кожне з них. Записуємо НСК(${list}). План: розкладаємо кожне число на <b>прості множники</b>; з розкладу <b>найбільшого</b> числа беремо <b>всі</b> множники, а з інших чисел дописуємо лише ті, яких <b>бракує</b>.`});

  cols.forEach((col,i)=>{
    const divs=col.rows.filter(r=>r.div).map(r=>`${r.val} : ${r.div} = ${r.val/r.div}`).join(', ');
    push({kind:'ladder', col:i, lad:i+1,
      text: col.factors.length===1
        ? `Розкладаємо <b>${col.n}</b>: ${divs}. ${col.n} — <b>просте</b> число, тому в його стовпчику лише один множник — саме ${col.n}.`
        : `Розкладаємо <b>${col.n}</b> драбинкою: ${divs}. Праворуч від риски — стовпчик множників: <b>${col.n} = ${col.factors.join(' · ')}</b>.`});
  });

  const M=cols[main];
  push({kind:'main', main:true, ans:M.factors.length,
    text:`Найбільше число — <b>${M.n}</b>. Беремо в НСК <b>усі</b> множники з його стовпчика: ${M.factors.join(' · ')}. Будь-яке кратне числа ${M.n} мусить містити їх усі.`
         + (others.length ? ` Тепер звіряємо з ними стовпчик${others.length>1?'и':''} ${others.map(i=>cols[i].n).join(' і ')}.` : '')});

  let lastCol=-1;
  checks.forEach((ch,j)=>{
    const col=cols[ch.col];
    const intro = ch.col!==lastCol ? `Стовпчик числа <b>${col.n}</b>. ` : '';
    lastCol=ch.col;
    const where = two ? `у стовпчику ${M.n}` : 'серед множників НСК';
    let text;
    if(ch.match!=null){
      const src=ans[ch.match];
      const from = !two && src.col!==main ? ` (її дописали з ${cols[src.col].n})` : '';
      text = two
        ? `${intro}Множник <b>${ch.f}</b>: ${where} є ${ch.f} без пари — підкреслюємо її, а наш множник <b>закреслюємо</b>. Він уже є в НСК, вдруге його не беремо.`
        : `${intro}Множник <b>${ch.f}</b>: ${where} уже є ${ch.f}${from}, для цього стовпчика вона ще без пари — отже, наш множник <b>закреслюємо</b>, вдруге його не беремо.`;
    } else if(ch.had){
      text=`${intro}Множник <b>${ch.f}</b>: ${ch.f} ${where} є, але ${pluralUsed(ans, ch)} вже в парі з попередн${pluralUsed(ans, ch)==='вона'?'ьою':'іми'} ${ch.f} цього стовпчика. Для цього множника пари немає — його <b>бракує</b>, тож дописуємо ${ch.f} у НСК.`;
    } else {
      text=`${intro}Множник <b>${ch.f}</b>: ${where} немає жодного множника ${ch.f} — цього множника <b>бракує</b>. Дописуємо його в НСК.`;
    }
    push({kind:'check', chk:j+1, ans:checks.slice(0,j+1).reduce((n,c)=>c.match==null?n+1:n, M.factors.length), text});
  });

  // підсумок + окремі випадки, на які варто звернути увагу
  const crossed=checks.filter(c=>c.match!=null).length;
  let note='';
  if(checks.length && crossed===checks.length)
    note=` Зверни увагу: закреслено <b>всі</b> множники інших чисел — ${M.n} саме ділиться на ${others.map(i=>cols[i].n).join(' і ')}, тому НСК дорівнює найбільшому числу.`;
  else if(crossed===0 && checks.length)
    note=` Спільних множників не було, тому НСК — це просто добуток чисел: ${nums.join(' · ')} = ${value}.`;
  const verify=nums.map(n=>`${value} : ${n} = ${value/n}`).join(', ');
  push({kind:'final', final:true, answer:true,
    text:`Перемножуємо всі множники НСК: ${ans.map(a=>a.f).join(' · ')} = <b>${value}</b>. Отже, <b>НСК(${list}) = ${value}</b>. Перевірка: ${verify} — ділиться націло на кожне.${note}`});

  return {nums, cols, main, others, ans, checks, value, steps,
          wL:Math.max(...nums.map(n=>String(n).length)),
          wR:Math.max(...cols.map(c=>String(Math.max(...c.factors)).length))};
}
// «вона вже в парі» / «обидві вже в парах» — скільки таких самих множників уже зайнято
function pluralUsed(ans, ch){
  const n=ans.filter((a,i)=>a.f===ch.f && i!==ch.ansIdx).length;
  return n===1 ? 'вона' : n===2 ? 'обидві' : `усі ${n}`;
}

/* ---------- рендер ---------- */
// число клітинками: кожна цифра у своїй клітинці
function nskCells(str, pen, cls){
  return [...String(str)].map(ch=>`<span class="nk${cls?' '+cls:''}">${hwGlyphs(ch, pen)}</span>`).join('');
}

// стан кроку: що вже записано і що саме пишеться зараз
function nskState(m, st){
  const chk=m.checks.slice(0, st.chk);
  const cur = st.kind==='check' ? m.checks[st.chk-1] : null;
  const crossed=new Map(), paired=new Set(), unique=new Set();
  let fresh=null;                                        // пара, що з'явилася саме на цьому кроці
  chk.forEach(c=>{
    if(c.match!=null){
      crossed.set(c.col+'_'+c.row, c);
      const s=m.ans[c.match], k=s.col+'_'+s.row;
      if(c===cur && !paired.has(k)) fresh=k;
      paired.add(k);
    }
    else unique.add(c.col+'_'+c.row);
  });
  return {cur, crossed, paired, unique, fresh,
          started:new Set(chk.map(c=>c.col))};
}
// такти пера для розмітки кроку — у порядку пояснення, а не в порядку рендера стовпчиків
// (стовпчик найбільшого числа може стояти й праворуч від того, що звіряємо)
function nskTicks(m, st, S, pen){
  const T={};
  if(st.kind==='main'){ T.cap=hwTick(pen,'hwfade'); T.frame=hwTick(pen,'hwfade'); }
  if(S.cur){
    if(S.cur.row===0) T.cap=hwTick(pen,'hwfade');
    // кожна позначка — окремий рух пера: наступна починається, коли попередня дописана
    if(S.cur.match!=null){ if(S.fresh) T.pair=hwTick(pen,'hwbar',HW_DUR,2); T.mark=hwTick(pen,'nskstrike',HW_DUR,2); }
    else T.mark=hwTick(pen,'hwpop',HW_DUR,2);
    T.tag=hwTick(pen,'hwfade');
  }
  return T;
}

function nskLadderHtml(m, c, st, S, T, pen){
  const col=m.cols[c], wL=m.wL, wR=m.wR, R=col.rows.length;
  const still={writing:false};
  const writeHead = st.kind==='intro';
  const writeBody = st.kind==='ladder' && st.col===c;
  const shown = st.lad>c;
  const isMain = c===m.main;
  let h=`<div class="nlad" style="grid-template-columns:repeat(${wL+wR+NSK_TAG},var(--cell));grid-template-rows:repeat(${R+1},var(--cell))">`;

  // підпис над стовпчиком множників
  if(isMain && st.main){
    h+=`<div class="ncap" style="grid-row:1;grid-column:${wL+1}/span ${wR+NSK_TAG}"><span class="hwa main"${T.cap||''}>беремо всі ↓</span></div>`;
  } else if(!isMain && S.started.has(c)){
    const a = S.cur && S.cur.col===c ? (T.cap||'') : '';
    h+=`<div class="ncap" style="grid-row:1;grid-column:${wL+1}/span ${wR+NSK_TAG}"><span class="hwa"${a}>звіряємо ↓</span></div>`;
  }

  // риска драбинки — по лінії сітки
  if(shown) h+=`<div class="nbar" style="grid-row:2/span ${R};grid-column:${wL+1}"><span class="hwa"${writeBody?hwTick(pen,'hwwipeV',HW_DUR*1.5,2):''}></span></div>`;

  // рамка навколо стовпчика найбільшого числа
  if(isMain && st.main){
    h+=`<div class="nframe" style="grid-row:2/span ${R-1};grid-column:${wL+1}/span ${wR}"><span class="hwa"${T.frame||''}></span></div>`;
  }

  col.rows.forEach((r,i)=>{
    const row=i+2;
    if(i===0 || shown){
      const p = (i===0 ? writeHead : writeBody) ? pen : still;
      const s=String(r.val);
      h+=`<div class="nval" style="grid-row:${row};grid-column:${wL-s.length+1}/span ${s.length}">${nskCells(s, p, r.val===1&&shown?'one':'')}</div>`;
    }
    if(!shown || r.div==null) return;
    const key=c+'_'+i;
    const isCur = S.cur && S.cur.col===c && S.cur.row===i;
    let cls='nf';
    if(isMain && st.main) cls+=' take';
    if(S.crossed.has(key)) cls+=' x';
    if(S.unique.has(key)) cls+=' uni';
    if(S.paired.has(key)) cls+=' pair';
    const ds=String(r.div);
    // пара для поточного множника підкреслюється першою — тоді закреслюємо свій
    let marks='';
    if(S.paired.has(key)){
      marks+=`<span class="nu hwa"${S.fresh===key?T.pair:''}></span>`;
    }
    if(S.crossed.has(key)) marks+=`<span class="ns hwa"${isCur?T.mark:''}></span>`;
    if(S.unique.has(key))  marks+=`<span class="no hwa"${isCur?T.mark:''}></span>`;
    h+=`<div class="${cls}" id="nf${key}" style="grid-row:${row};grid-column:${wL+1}/span ${ds.length}">${nskCells(ds, writeBody?pen:still)}${marks}</div>`;

    // підказка праворуч — під сегментом не вміщається, тож збоку й дрібно
    if(S.crossed.has(key) || S.unique.has(key)){
      const txt = S.crossed.has(key) ? (m.nums.length===2 ? `є в ${m.cols[m.main].n}` : 'вже є') : 'бракує → в НСК';
      h+=`<div class="ntag${S.unique.has(key)?' uni':''}" style="grid-row:${row};grid-column:${wL+wR+1}/span ${NSK_TAG}"><span class="hwa"${isCur?T.tag:''}>${txt}</span></div>`;
    }
  });
  return h+'</div>';
}

// рядок НСК: умова, множники (кожен — слот, у який прилітає клон), підсумок
function nskAnswerHtml(m, st, pen, fly){
  const still={writing:false};
  const writePrefix = st.kind==='intro';          // умову «НСК(…) =» записуємо одразу, слоти заповнюються далі
  let h='<div class="nans">';
  h+=`<span class="ngrp">${nskCells(`НСК(${m.nums.join(';')})`, writePrefix?pen:still)}${nskCells('=', writePrefix?pen:still, 'op')}</span>`;
  // польоти стартують, коли перо дописало все, що мало бути перед ними
  let t=pen.order*HW_STEP + HW_DUR*0.6;
  const newFrom = st.kind==='main' ? 0 : (st.kind==='check' && m.checks[st.chk-1].match==null ? st.ans-1 : st.ans);
  for(let k=0;k<st.ans;k++){
    const a=m.ans[k];
    const flying = fly && k>=newFrom;
    const data = flying ? ` data-src="nf${a.col}_${a.row}" data-t="${t.toFixed(2)}"` : '';
    if(flying) t+=NSK_FLY+NSK_GAP;
    h+=`<span class="ngrp nslot${flying?' fly':''}"${data}>${k?nskCells('·', still, 'op'):''}`
      +`<span class="nsf ${a.col===m.main?'take':'uni'}">${nskCells(a.f, still)}</span></span>`;
  }
  if(st.final){
    h+=`<span class="ngrp">${nskCells('=', pen, 'op')}${nskCells(m.value, pen, 'res')}</span>`;
  }
  return h+'</div>';
}

function nskView(m, ctx){
  const st=ctx.step;
  const S=nskState(m, st);
  const pen={writing:true, order:0};
  const T=nskTicks(m, st, S, pen);
  // ctx.anim є лише тоді, коли польоти справді будуть (крок уперед і не «спокійний режим»);
  // без нього слоти показуємо одразу — інакше множник лишився б невидимим.
  const fly=!!ctx.anim;
  let h='<div class="nsk"><div class="nlads">';
  m.cols.forEach((_,c)=>{ h+=nskLadderHtml(m, c, st, S, T, pen); });
  h+='</div>';
  h+=nskAnswerHtml(m, st, pen, fly);
  return h+'</div>';
}

/* ---------- анімація: множник летить зі стовпчика в рядок НСК ---------- */
function prepareNskAnim(model, from, to){
  if(to!==from+1) return null;                      // стрибок через крок — без польотів
  const st=model.steps[to];
  if(st.kind==='main') return {fly:true};
  if(st.kind==='check' && model.checks[st.chk-1].match==null) return {fly:true};
  return null;
}
function runNskFly(model, ctx){
  if(!ctx.anim) return;
  const wrap=document.querySelector('.nsk'); if(!wrap) return;
  wrap.querySelectorAll('.nslot.fly').forEach(slot=>{
    const src=document.getElementById(slot.dataset.src);
    const land=()=>{ slot.classList.remove('fly'); slot.classList.add('landed'); };
    if(!src){ land(); return; }
    setTimeout(()=>{
      if(!slot.isConnected) return;                 // учень уже перейшов на інший крок
      const tgt=slot.querySelector('.nsf');
      const wr=wrap.getBoundingClientRect(), sR=src.getBoundingClientRect(), tR=tgt.getBoundingClientRect();
      // клон — копія цілі: ті самі клітинки, що й у стовпчику, тож стартує рівно поверх джерела
      const clone=tgt.cloneNode(true);
      clone.classList.add('nskfly');
      clone.style.left=(sR.left-wr.left)+'px'; clone.style.top=(sR.top-wr.top)+'px';
      wrap.appendChild(clone);
      clone.style.transition=`transform ${NSK_FLY}s cubic-bezier(.4,.05,.2,1)`;
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        clone.style.transform=`translate(${tR.left-sR.left}px,${tR.top-sR.top}px)`;
      }));
      setTimeout(()=>{ land(); clone.remove(); }, NSK_FLY*1000);
    }, (+slot.dataset.t)*1000);
  });
}

registerTool('nsk', {
  name:'Найменше спільне кратне', icon:'🎯', color:'var(--amber)', bg:'var(--amber-l)',
  build: buildNskModel,
  view:  nskView,
  prepare: prepareNskAnim,
  animate: runNskFly,
  inputs: c => `
    <div class="field"><label class="fl">Перше число</label><input id="i_a" type="number" min="2" max="999" value="${c.a??24}"></div>
    <div class="field"><label class="fl">Друге число</label><input id="i_b" type="number" min="2" max="999" value="${c.b??18}"></div>
    <div class="field"><label class="fl">Третє число (необов’язково)</label><input id="i_c" type="number" min="2" max="999" value="${c.c??''}" placeholder="—"></div>
    <p class="helper">Знайдемо НСК розкладанням на прості множники. Числа від 2 до 999; третє можна не вводити.</p>`,
  read: v => ({a:+v('i_a'), b:+v('i_b'), c:v('i_c')===''?null:+v('i_c')}),
  summary: cfg => `НСК(${[cfg.a,cfg.b,cfg.c].filter(x=>x!=null).join('; ')})`,
  editorFields: cfg => `
    <div class="field"><label class="fl">Перше число</label><input id="f_a" type="number" min="2" max="999" value="${cfg.a||''}"></div>
    <div class="field"><label class="fl">Друге число</label><input id="f_b" type="number" min="2" max="999" value="${cfg.b||''}"></div>
    <div class="field"><label class="fl">Третє число (необов’язково)</label><input id="f_c" type="number" min="2" max="999" value="${cfg.c||''}"></div>
    <p class="helper">Учень побачить драбинки розкладу й збирання НСК із множників.</p>`,
  readEditor: v => ({a:+v('f_a'), b:+v('f_b'), c:v('f_c')===''?null:+v('f_c')}),
  errorHint:'Введи два або три натуральні числа від 2 до 999.',
});
