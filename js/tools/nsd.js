/* =========================================================
   НАЙБІЛЬШИЙ СПІЛЬНИЙ ДІЛЬНИК (розкладанням на прості множники)
   ---------------------------------------------------------
   Кожне число розкладаємо «драбинкою», як для НСК. Далі:
     1) записуємо розклади рядками одне під одним — менше число зверху;
     2) йдемо верхнім рядком: беремо множник і закреслюємо його, шукаємо
        такий самий незакреслений у нижньому рядку. Є — закреслюємо і його,
        множник спільний, пишемо в НСД. Немає — у НСД не пишемо;
     3) перемножуємо множники НСД (жодного — НСД = 1).
   Як розкладати, тут не пояснюємо: праворуч від драбинок — lessonNote з посиланням
   на урок розкладання.
   Питання «чи є такий самий?» і відповідь — два окремі кроки, щоб учень
   встиг пошукати сам. Драбинки, клітинки й політ у рядок відповіді —
   спільні з НСК (js/tools/nsk.js: nskLadder, nskCells, nskFlySlots).
   ========================================================= */

function buildNsdModel(cfg){
  const raw=[cfg.a, cfg.b, cfg.c].filter(x=>x!=null && x!=='' && !Number.isNaN(+x));
  if(raw.length<2) throw 'Введи щонайменше два числа — наприклад, 24 і 18.';
  const nums=raw.map(x=>+x);
  if(nums.some(x=>!Number.isInteger(x))) throw 'НСД шукаємо для натуральних чисел — введи цілі числа.';
  if(nums.some(x=>x<2)) throw 'Візьми числа, більші за 1: у 1 немає простих множників, розкладати нічого.';
  if(nums.some(x=>x>999)) throw 'Щоб драбинки вмістилися на аркуш, візьми числа від 2 до 999.';

  const cols=nums.map(nskLadder);
  const main=nums.indexOf(Math.min(...nums));            // верхній рядок — менше число
  const low=nums.map((_,i)=>i).filter(i=>i!==main);
  const order=[main, ...low];
  const list=nums.join('; ');
  const two=nums.length===2;
  const inLow = two ? `у розкладі ${nums[low[0]]}` : `у розкладах ${low.map(c=>nums[c]).join(' і ')}`;
  const top=cols[main].factors;

  // проходимо верхній рядок: для кожного множника — чи є незакреслена пара в кожному нижньому
  const used=new Map(low.map(c=>[c, new Set()]));
  const checks=[], ans=[];
  for(let i=0;i<top.length;i++){
    const f=top[i], hits=[], lack=[];
    low.forEach(c=>{
      const j=cols[c].factors.findIndex((x,k)=>x===f && !used.get(c).has(k));
      if(j>=0) hits.push({col:c, row:j}); else lack.push(c);
    });
    const match=!lack.length;
    if(match){ hits.forEach(h=>used.get(h.col).add(h.row)); ans.push({f, i}); }
    checks.push({i, f, match, hits, lack});
  }
  const value=ans.reduce((p,a)=>p*a.f, 1);

  const steps=[];
  const base={lad:0, rows:0, chk:0, open:false, final:false};
  const push=(o)=>steps.push(Object.assign({}, base, steps.length?steps[steps.length-1]:{}, o));

  push({kind:'intro',
    text:`Шукаємо <b>найбільший спільний дільник</b> чисел ${nums.join(two?' і ':', ')} — найбільше число, на яке кожне з них ділиться націло. Записуємо НСД(${list}). План: розкладаємо кожне число на <b>прості множники</b>, записуємо розклади одне під одним і йдемо верхнім рядком: беремо множник і закреслюємо його, шукаємо такий самий у нижн${two?'ьому рядку':'іх рядках'}. Знайшли — закреслюємо і його, а множник пишемо в НСД.`});

  cols.forEach((col,i)=>{
    const divs=col.rows.filter(r=>r.div).map(r=>`${r.val} : ${r.div} = ${r.val/r.div}`).join(', ');
    push({kind:'ladder', col:i, lad:i+1,
      text: col.factors.length===1
        ? `Розкладаємо <b>${col.n}</b>: ${divs}. ${col.n} — <b>просте</b> число, у його розкладі лише один множник — саме ${col.n}.`
        : `Розкладаємо <b>${col.n}</b> драбинкою: ${divs}. Праворуч від риски — прості множники: <b>${col.n} = ${col.factors.join(' · ')}</b>.`});
  });

  order.forEach((c,r)=>{
    const col=cols[c], eq=`${col.n} = ${col.factors.join(' · ')}`;
    push({kind:'row', rows:r+1,
      text: r===0
        ? `Переписуємо розклади рядками. Зверху — розклад меншого числа: <b>${eq}</b>. Цим рядком підемо множник за множником.`
        : `Під ним — розклад числа ${col.n}: <b>${eq}</b>.`});
  });

  checks.forEach((ch,j)=>{
    const lead = j===0
      ? `Записуємо «НСД(${list}) =» — сюди збиратимемо спільні множники. Беремо перший множник верхнього рядка — <b>${ch.f}</b> — і закреслюємо його.`
      : `Беремо наступний множник верхнього рядка — <b>${ch.f}</b> — і закреслюємо його.`;
    push({kind:'pick', chk:j+1, open:false,
      text:`${lead} Чи є незакреслений множник ${ch.f} ${inLow}?`});

    let text;
    if(ch.match){
      text = two
        ? `Так, у нижньому рядку є множник ${ch.f} — закреслюємо і його. Множник ${ch.f} є в обох розкладах, тобто він <b>спільний</b>, — пишемо його в НСД.`
        : `Так, множник ${ch.f} є ${inLow} — закреслюємо і їх. Множник ${ch.f} є в розкладі кожного числа, тобто він <b>спільний</b>, — пишемо його в НСД.`;
    } else {
      // «у розкладах 24 і 36 множника 5 немає» — одним реченням, а не двома однаковими
      // рядки з однаковою причиною — одним реченням: «у розкладах 36 і 60 множника 5 немає»
      const by=new Map();
      ch.lack.forEach(c=>{ const k=cols[c].factors.filter(x=>x===ch.f).length; by.set(k, (by.get(k)||[]).concat(nums[c])); });
      const why=[...by].map(([k,ns])=>nsdWhyLack(ns, k, ch.f)).join(' ');
      text = two
        ? `Ні. ${why} Тож ${ch.f} — <b>не спільний</b> множник, у НСД його не пишемо.`
        : `Ні. ${why} Множник ${ch.f} не спільний для всіх чисел — у НСД його не пишемо, а в нижніх рядках нічого не закреслюємо.`;
    }
    push({kind:ch.match?'hit':'miss', chk:j+1, open:true, text});
  });

  const verify=nums.map(n=>`${n} : ${value} = ${n/value}`).join(', ');
  const all = two ? 'обидва діляться' : 'кожне ділиться';
  let text;
  if(!ans.length){
    text=`Жоден множник не пішов у НСД — спільних простих множників у цих чисел немає. Тоді <b>НСД(${list}) = 1</b>: разом ці числа діляться лише на 1. Такі числа називають <b>взаємно простими</b>.`;
  } else {
    text = ans.length===1
      ? `У НСД лише один множник, перемножувати нічого: <b>НСД(${list}) = ${value}</b>.`
      : `Перемножуємо множники НСД: ${ans.map(a=>a.f).join(' · ')} = <b>${value}</b>. Отже, <b>НСД(${list}) = ${value}</b>.`;
    text+=` Перевірка: ${verify} — ${all} націло.`;
    const min=Math.min(...nums);
    if(value===min && nums.some(n=>n!==min))
      text+=` Зверни увагу: ${min} саме є дільником ${two?'числа '+Math.max(...nums):'решти чисел'}, тому НСД дорівнює меншому числу.`;
  }
  push({kind:'final', final:true, text});

  return {nums, cols, main, low, order, checks, ans, value, steps,
          wL:Math.max(...nums.map(n=>String(n).length)),
          wR:Math.max(...cols.map(c=>String(Math.max(...c.factors)).length))};
}
// чому в нижніх рядках немає пари: такого множника немає зовсім — чи всі k таких уже закреслено
function nsdWhyLack(ns, k, f){
  const many=ns.length>1, where = many ? `У розкладах ${ns.join(' і ')}` : `У розкладі ${ns[0]}`;
  if(!k) return `${where} множника ${f} немає.`;
  if(k===1) return many
    ? `${where} було по одному множнику ${f}, і їх уже закреслено в парі з попереднім.`
    : `${where} був один множник ${f}, але його вже закреслено в парі з попереднім.`;
  return `${where} ${k===2?'обидва':'усі '+k} множники ${f} вже закреслено в парі з попередніми.`;
}

/* ---------- рендер ---------- */
// що закреслено й як позначено на цьому кроці; ключ множника — '<стовпчик>_<номер у розкладі>'
function nsdState(m, st){
  const cls=new Map(), struck=new Set();
  const live=['pick','hit','miss'].includes(st.kind);
  const add=(k,c)=>cls.set(k, (cls.get(k)||'')+c);
  let ans=0;
  m.checks.slice(0, st.chk).forEach((ch,j)=>{
    const key=m.main+'_'+ch.i, done = j<st.chk-1 || st.open;
    struck.add(key);
    if(live && j===st.chk-1) add(key,' cur');
    if(!done) return;
    add(key, ch.match?' hit':' miss');
    if(!ch.match) return;
    ans++;
    ch.hits.forEach(h=>{
      const k=h.col+'_'+h.row; struck.add(k); add(k,' hit');
      if(live && j===st.chk-1) add(k,' cur');
    });
  });
  return {cls, struck, ans};
}
// такти пера для рисок кроку: кожна — окремий рух, наступна починається, коли попередня дописана
function nsdTicks(m, st, pen){
  const T={};
  const strike=k=>{ T[k]=hwTick(pen,'nskstrike',HW_DUR,2); };
  const ch=m.checks[st.chk-1];
  if(st.kind==='pick') strike(m.main+'_'+ch.i);
  if(st.kind==='hit') ch.hits.forEach(h=>strike(h.col+'_'+h.row));
  return T;
}

// драбинка: число | риска по лінії сітки | простий множник
function nsdLadderHtml(m, c, st, pen){
  const col=m.cols[c], wL=m.wL, R=col.rows.length;
  const still={writing:false};
  const body = st.kind==='ladder' && st.col===c;
  const shown = st.lad>c;
  let h=`<div class="nlad" style="grid-template-columns:repeat(${wL+m.wR},var(--cell));grid-template-rows:repeat(${R},var(--cell))">`;
  if(shown) h+=`<div class="nbar" style="grid-row:1/span ${R};grid-column:${wL+1}"><span class="hwa"${body?hwTick(pen,'hwwipeV',HW_DUR*1.5,2):''}></span></div>`;
  col.rows.forEach((r,i)=>{
    if(i>0 && !shown) return;
    const s=String(r.val);
    const p = (i===0 ? st.kind==='intro' : body) ? pen : still;
    h+=`<div class="nval" style="grid-row:${i+1};grid-column:${wL-s.length+1}/span ${s.length}">${nskCells(s, p, r.val===1&&shown?'one':'')}</div>`;
    if(shown && r.div!=null)
      h+=`<div class="nf" style="grid-row:${i+1};grid-column:${wL+1}/span ${String(r.div).length}">${nskCells(r.div, body?pen:still)}</div>`;
  });
  return h+'</div>';
}

// розклади рядками: «24 = 2 · 2 · 2 · 3», знаки «=» один під одним
function nsdRowsHtml(m, st, V, T, pen){
  const still={writing:false};
  let h='<div class="ndrows">';
  m.order.forEach((c,r)=>{
    if(st.rows<=r) return;
    const p = st.kind==='row' && st.rows===r+1 ? pen : still;
    const n=String(m.nums[c]);
    h+='<div class="ndrow">'+'<span class="nk"></span>'.repeat(m.wL-n.length)+nskCells(n, p)+nskCells('=', p, 'op');
    m.cols[c].factors.forEach((f,k)=>{
      const key=c+'_'+k;
      if(k) h+=nskCells('·', p, 'op');
      const mark = V.struck.has(key) ? `<span class="ns hwa"${T[key]||''}></span>` : '';
      h+=`<span class="nf${V.cls.get(key)||''}" id="nd${key}">${nskCells(f, p)}${mark}</span>`;
    });
    h+='</div>';
  });
  return h+'</div>';
}

// рядок НСД: «НСД(24;18) =», множники-слоти (прилітають з верхнього рядка), підсумок
function nsdAnswerHtml(m, st, V, head, pen, fly){
  if(!st.chk) return '';
  const still={writing:false};
  let h=`<div class="nans"><span class="ngrp">${head}</span>`;
  // політ стартує, коли перо дописало риски кроку
  const t=pen.order*HW_STEP + HW_DUR*0.6;
  const one = st.final && m.ans.length===1;          // єдиний множник і є відповіддю
  for(let k=0;k<V.ans;k++){
    const a=m.ans[k];
    const flying = fly && st.kind==='hit' && k===V.ans-1;
    const data = flying ? ` data-src="nd${m.main}_${a.i}" data-t="${t.toFixed(2)}"` : '';
    h+=`<span class="ngrp nslot${flying?' fly':''}"${data}>${k?nskCells('·', still, 'op'):''}`
      +`<span class="nsf take${one?' res':''}">${nskCells(a.f, still)}</span></span>`;
  }
  if(st.final && !m.ans.length) h+=`<span class="ngrp">${nskCells('1', pen, 'res')}</span>`;
  if(st.final && m.ans.length>1) h+=`<span class="ngrp">${nskCells('=', pen, 'op')}${nskCells(m.value, pen, 'res')}</span>`;
  return h+'</div>';
}

function nsdView(m, ctx){
  const st=ctx.step;
  const V=nsdState(m, st);
  const pen={writing:true, order:0};
  const still={writing:false};
  // порядок пера = порядок пояснення: драбинки й рядки → «НСД(…) =» → риски → політ
  let lads='';
  m.cols.forEach((_,c)=>{ lads+=nsdLadderHtml(m, c, st, pen); });
  if(st.lad) lads+=lessonNote('factor', 'Як розкласти число на прості множники драбинкою',
                              st.kind==='ladder' && st.lad===1 ? hwTick(pen,'hwfade') : '');
  const hp = st.kind==='pick' && st.chk===1 ? pen : still;
  const head = st.chk ? nskCells(`НСД(${m.nums.join(';')})`, hp)+nskCells('=', hp, 'op') : '';
  const T=nsdTicks(m, st, pen);
  // ctx.anim є лише тоді, коли політ справді буде; інакше множник у НСД видно одразу
  return `<div class="nsk nsd"><div class="nlads">${lads}</div>`
    + nsdRowsHtml(m, st, V, T, pen)
    + nsdAnswerHtml(m, st, V, head, pen, !!ctx.anim)
    + '</div>';
}

/* ---------- анімація: спільний множник летить з верхнього рядка в рядок НСД ---------- */
function prepareNsdAnim(model, from, to){
  if(to!==from+1) return null;                      // стрибок через крок — без польотів
  return model.steps[to].kind==='hit' ? {fly:true} : null;
}
function runNsdFly(model, ctx){
  if(!ctx.anim) return;
  const wrap=document.querySelector('.nsd'); if(wrap) nskFlySlots(wrap);
}

registerTool('nsd', {
  name:'Найбільший спільний дільник', icon:'🧩', color:'var(--green)', bg:'var(--green-l)',
  build: buildNsdModel,
  view:  nsdView,
  prepare: prepareNsdAnim,
  animate: runNsdFly,
  inputs: c => `
    <div class="field"><label class="fl">Перше число</label><input id="i_a" type="number" min="2" max="999" value="${c.a??24}"></div>
    <div class="field"><label class="fl">Друге число</label><input id="i_b" type="number" min="2" max="999" value="${c.b??18}"></div>
    <div class="field"><label class="fl">Третє число (необов’язково)</label><input id="i_c" type="number" min="2" max="999" value="${c.c??''}" placeholder="—"></div>
    <p class="helper">Знайдемо НСД розкладанням на прості множники. Числа від 2 до 999; третє можна не вводити.</p>`,
  read: v => ({a:+v('i_a'), b:+v('i_b'), c:v('i_c')===''?null:+v('i_c')}),
  summary: cfg => `НСД(${[cfg.a,cfg.b,cfg.c].filter(x=>x!=null).join('; ')})`,
  editorFields: cfg => `
    <div class="field"><label class="fl">Перше число</label><input id="f_a" type="number" min="2" max="999" value="${cfg.a||''}"></div>
    <div class="field"><label class="fl">Друге число</label><input id="f_b" type="number" min="2" max="999" value="${cfg.b||''}"></div>
    <div class="field"><label class="fl">Третє число (необов’язково)</label><input id="f_c" type="number" min="2" max="999" value="${cfg.c||''}"></div>
    <p class="helper">Учень побачить драбинки розкладу, розклади рядками й закреслення спільних множників.</p>`,
  readEditor: v => ({a:+v('f_a'), b:+v('f_b'), c:v('f_c')===''?null:+v('f_c')}),
  errorHint:'Введи два або три натуральні числа від 2 до 999.',
});
