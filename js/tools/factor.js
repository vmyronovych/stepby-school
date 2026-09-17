/* =========================================================
   РОЗКЛАДАННЯ НА ПРОСТІ МНОЖНИКИ (перебір дільників 2, 3, 5, 7 …)
   ---------------------------------------------------------
   Пишемо «драбинку»: ліворуч від риски — число, праворуч — простий
   дільник, під числом — частка. І так, поки ліворуч не залишиться 1.
   Кожен дільник спершу ПЕРЕВІРЯЄМО за ознакою подільності (робоча
   зона під драбинкою), і лише тоді він влітає праворуч від риски.
   ========================================================= */

// Політ дільника з чипа-перевірки у стовпчик; частка починає писатися після приземлення.
const FAC_DELAY=0.18, FAC_DUR=0.62;
const FAC_PEN=Math.ceil((FAC_DELAY+FAC_DUR)/HW_STEP);   // на скільки «тактів» пера зсунути частку

function facIsPrime(k){ if(k<2) return false; for(let d=2; d*d<=k; d++) if(k%d===0) return false; return true; }
function facNextPrime(p){ let q=p+1; while(!facIsPrime(q)) q++; return q; }

// Ознака подільності: {q:питання, a:відповідь-пояснення}. Для 2, 3, 5 — правило,
// для решти простих — чесне ділення з остачею.
function facRule(cur, p){
  const s=String(cur), last=+s[s.length-1];
  const ok = cur%p===0;
  const q=`Чи ділиться ${cur} на ${p}?`;
  if(p===2) return {q, ok, a:`остання цифра — <b>${last}</b>, вона ${ok?'парна':'непарна'} → ${ok?'ділиться':'не ділиться'}`};
  if(p===3){ const sum=[...s].reduce((a,c)=>a+ +c,0);
    return {q, ok, a:`сума цифр ${[...s].join(' + ')} = <b>${sum}</b>, вона ${ok?'ділиться':'не ділиться'} на 3 → ${ok?'ділиться':'не ділиться'}`}; }
  if(p===5) return {q, ok, a:`остання цифра — <b>${last}</b>, ${ok?'це 0 або 5':'це не 0 і не 5'} → ${ok?'ділиться':'не ділиться'}`};
  const d=Math.floor(cur/p), r=cur-d*p;
  return {q, ok, a:`готової ознаки немає — ділимо: ${cur} : ${p} = <b>${d}</b>${r?` (остача ${r})`:''} → ${ok?'остачі немає, ділиться':'є остача, не ділиться'}`};
}

function buildFactorModel(nIn){
  const n=Math.trunc(Number(nIn));
  if(!Number.isFinite(n)) throw 'Введи натуральне число — наприклад, 360.';
  if(n<2)    throw 'На прості множники розкладають натуральні числа, більші за 1. Спробуй число від 2 до 9999.';
  if(n>9999) throw 'Щоб драбинка вмістилася на аркуш, візьми число від 2 до 9999.';

  const rows=[{val:n, div:null, tried:[]}];              // рядки драбинки (мутуються по ходу)
  const snap=()=>rows.map(r=>({val:r.val, div:r.div, tried:r.tried.slice()}));
  const chips=(tried, ghosts)=>tried.map(t=>({p:t.p, state:t.ok?'ok':'no'}))
                                    .concat((ghosts||[]).map(p=>({p, state:'todo'})));
  const steps=[];
  const factors=[];
  let cur=n, p=2;

  steps.push({kind:'intro', ladder:snap(), rulep:0,
    text:`Розкладаємо <b>${n}</b> на прості множники. Записуємо число ліворуч від риски: праворуч писатимемо <b>прості дільники</b>, а знизу ліворуч — <b>частку</b>. Перебиратимемо прості числа по порядку — <b>2, 3, 5, 7, 11…</b> — і ділитимемо доти, доки ліворуч не залишиться <b>1</b>.`});

  let guard=0;
  while(cur>1 && guard++<300){
    const row=rows[rows.length-1];
    const firstTry=row.tried.length===0;
    let probe;                                            // чипи перебору для цього рядка — їх же бачить крок ділення

    if(p*p>cur){
      // Далі перебирати нема сенсу: менших дільників немає, отже число просте.
      row.tried.push({p:cur, ok:true});
      probe={cur, cands:chips(row.tried), q:`Чи є в ${cur} дільник, менший за ${cur}?`,
             a:`<b>${p} · ${p} = ${p*p}</b>, а це вже більше за ${cur}. Якби в ${cur} був дільник, менший за саме число, ми б його вже знайшли — отже, <b>${cur} просте</b>`, ok:true};
      steps.push({kind:'prime', ladder:snap(), probe, rulep:0,
        text:`Перебір можна зупинити: ${p} · ${p} = ${p*p} — уже більше за ${cur}. Менших дільників у ${cur} немає, тому <b>${cur} — просте число</b>. Воно й буде останнім множником.`});
      p=cur;                                                  // ділимо на саме число
    } else {
      const r=facRule(cur, p);
      row.tried.push({p, ok:r.ok});
      const ghosts = r.ok ? [] : [facNextPrime(p), facNextPrime(facNextPrime(p))];
      probe={cur, cands:chips(row.tried, ghosts), q:r.q, a:r.a, ok:r.ok};
      if(r.ok){
        // після вдалого ділення перебір продовжуємо з ТОГО САМОГО простого — менші вже відсіяні
        const note = firstTry && factors.length && factors[factors.length-1]===p
          ? ` Менші прості вже перевірені раніше — починаємо з того самого дільника <b>${p}</b>.` : '';
        steps.push({kind:'test', ladder:snap(), probe, rulep:p,
          text:`${r.q} ${cap(r.a)}.${note} Отже, <b>${p}</b> — простий дільник числа ${cur}.`});
      } else {
        const np=facNextPrime(p);
        steps.push({kind:'test', ladder:snap(), probe, rulep:p,
          text:`${r.q} Ні: ${r.a}. Переходимо до наступного простого числа — <b>${np}</b>.`});
        p=np;
        continue;                                             // дільника ще не знайшли — рядок той самий
      }
    }

    // знайшли дільник → записуємо його праворуч, частку — знизу ліворуч
    const qt=cur/p;
    row.div=p; factors.push(p);
    rows.push({val:qt, div:null, tried:[]});
    steps.push({kind:'divide', ladder:snap(), probe, rulep:p, flyRow:rows.length-2,
      text:`Ділимо: ${cur} : ${p} = <b>${qt}</b>. Множник <b>${p}</b> записуємо праворуч від риски, а частку <b>${qt}</b> — ліворуч під ${cur}.`
           + (qt===1 ? ' Ліворуч залишилася <b>1</b> — драбинка закінчена.' : '')});
    cur=qt;
  }

  // степеневий (канонічний) запис: однакові множники згортаємо в степінь
  const powers=[];
  for(const f of factors){ const t=powers[powers.length-1]; if(t && t[0]===f) t[1]++; else powers.push([f,1]); }
  const hasPow=powers.some(([,e])=>e>1);
  const prime=factors.length===1;

  steps.push({kind:'answer', ladder:snap(), answer:true, rulep:0,
    text: prime
      ? `Ліворуч від риски лишилася 1, а праворуч — єдиний множник. Це означає, що <b>${n} — просте число</b>: воно ділиться тільки на 1 і на себе.`
      : `Готово! Усі множники праворуч від риски й утворюють розклад: <b>${n} = ${factors.join(' · ')}</b>. Перевірити легко — перемнож їх назад.`});
  if(hasPow) steps.push({kind:'power', ladder:snap(), answer:true, power:true, rulep:0,
    text:`Однакові множники зручно записати степенем: ${powers.filter(([,e])=>e>1).map(([f,e])=>`${f} повторюється ${e} ${plural(e)} → ${f}<sup>${e}</sup>`).join(', ')}. Канонічний розклад: <b>${n} = ${powers.map(([f,e])=>e>1?`${f}<sup>${e}</sup>`:f).join(' · ')}</b>.`});

  return {n, factors, powers, prime,
          wL:String(n).length, wR:String(Math.max(...factors)).length, steps};
}
function cap(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
function plural(e){ const t=e%10, h=e%100; return (t===1&&h!==11)?'раз':(t>=2&&t<=4&&(h<12||h>14))?'рази':'разів'; }

/* ---------- рендер ---------- */
// драбинка: рядок = [число | риска | дільник | перекреслені кандидати]
function facLadder(m, st, writeRow, offset, fly){
  let h=`<div class="flad">
    <div class="flrow flhd"><span class="hl" style="width:calc(var(--cell)*${m.wL})">число</span><span class="hb"></span><span class="hr">простий дільник</span></div>`;
  st.ladder.forEach((r,i)=>{
    const writing=(i===writeRow);
    const valRow=mkRow(r.val, m.wL-1, m.wL, r.val===1?'res':'');
    if(writing) valRow.anim=true;
    const left=colGrid([valRow], m.wL, writing?offset:0);
    // дільник вирівнюємо ВЛІВО, до самої риски — так стовпчик множників читається зверху вниз
    const right = r.div!=null
      ? colGrid([mkRow(r.div, String(r.div).length-1, m.wR, 'pf')], m.wR)
      : colGrid([{cells:Array(m.wR).fill('')}], m.wR);
    const flying = fly && st.flyRow===i;
    const tags = r.tried.filter(t=>!t.ok).map(t=>`<span class="fx">${t.p}</span>`).join('');
    h+=`<div class="flrow"><div class="flleft">${left}</div><div class="flbar"></div>`
      +`<div class="flright${flying?' flying':''}">${right}</div><div class="fltag">${tags}</div></div>`;
  });
  return h+'</div>';
}
// робоча зона: чипи перебору + питання-відповідь за ознакою подільності
function facProbe(pr){
  if(!pr) return '';
  const chips=pr.cands.map(c=>`<span class="fchip ${c.state}"><span class="cv">${c.p}</span><span class="cs">${c.state==='ok'?'✓':c.state==='no'?'✗':'?'}</span></span>`).join('');
  return `<div class="fprobe ${pr.ok?'good':'bad'}">
    <div class="fpttl">🔍 Перебираємо прості числа по порядку — шукаємо дільник числа <b>${pr.cur}</b></div>
    <div class="fpchips">${chips}</div>
    <div class="fprule"><span class="q">${pr.q}</span> <span class="a">${pr.a}</span></div>
  </div>`;
}
// пам'ятка ознак подільності — не зникає між кроками, підсвічується та, якою користуємось
function facRules(active){
  const R=[[2,'остання цифра парна'],[3,'сума цифр ділиться на 3'],[5,'остання цифра 0 або 5'],
           [0,'на 7, 11, 13… — перевіряємо діленням']];
  return `<div class="frules">${R.map(([p,t])=>
    `<span class="frule${active===p&&p?' on':''}${!p&&active&&active>5?' on':''}">${p?`<b>на ${p}</b> — ${t}`:t}</span>`).join('')}</div>`;
}
// рядок-відповідь рукописними гліфами; степені — надрядковим індексом у такт письма
function facLine(m, power, writing){
  const pen={writing:!!writing, order:0};
  let h='<div class="eqline">'+`<span>${hwGlyphs(String(m.n),pen)}</span><span class="op">${hwGlyphs('=',pen)}</span>`;
  const list = power ? m.powers : m.factors.map(f=>[f,1]);
  list.forEach(([f,e],i)=>{
    if(i) h+=`<span class="op">${hwGlyphs('·',pen)}</span>`;
    h+=`<span class="res">${hwGlyphs(String(f),pen)}`;
    if(e>1){ const d=pen.writing?` style="animation-delay:${(pen.order*HW_STEP).toFixed(2)}s"`:''; if(pen.writing) pen.order++; h+=`<sup class="fexp"${d}>${e}</sup>`; }
    h+='</span>';
  });
  return h+'</div>';
}

function facView(m, ctx){
  const st=ctx.step;
  // ctx.anim є лише тоді, коли політ дільника справді відбудеться (крок уперед, не «спокійний режим»).
  // Без нього показуємо фінальний вигляд кроку одразу, інакше дільник лишився б невидимим.
  const fly = st.kind==='divide' && !!ctx.anim;
  const writeRow = st.kind==='intro' ? 0 : (st.kind==='divide' ? st.ladder.length-1 : -1);
  let h='<div class="fac">'+facLadder(m, st, writeRow, fly?FAC_PEN:0, fly);
  if(st.answer){
    h+=`<div class="fanswer">${facLine(m, false, st.kind==='answer')}`;
    if(st.power) h+=facLine(m, true, true);
    h+='</div>';
  }
  if(st.probe) h+=facProbe(st.probe);
  h+=facRules(st.rulep);
  return h+'</div>';
}

/* ---------- анімація: дільник влітає з чипа-перевірки у стовпчик ---------- */
function prepareFacAnim(model, from, to){
  if(to!==from+1) return null;                      // стрибок через крок — без польоту
  const st=model.steps[to];
  return (st && st.kind==='divide') ? {fly:true} : null;
}
function runFacFly(model, ctx){
  if(!ctx.anim) return;
  const wrap=document.querySelector('.fac'); if(!wrap) return;
  const tgt=wrap.querySelector('.flright.flying'); if(!tgt) return;
  const src=wrap.querySelector('.fchip.ok');
  const land=()=>{ tgt.classList.remove('flying'); tgt.classList.add('landed'); };
  if(!src){ land(); return; }
  const wr=wrap.getBoundingClientRect();
  const rel=el=>{const r=el.getBoundingClientRect();return{left:r.left-wr.left,top:r.top-wr.top,w:r.width,h:r.height};};
  wrap.querySelectorAll('.facfly').forEach(c=>c.remove());
  const sR=rel(src), tR=rel(tgt);
  const clone=document.createElement('div');
  clone.className='facfly'; clone.innerHTML=tgt.innerHTML;      // той самий вміст і той самий відступ, що й у цілі
  clone.style.left=sR.left+'px'; clone.style.top=sR.top+'px';
  wrap.appendChild(clone);
  const cR=rel(clone);
  const dx=(tR.left+tR.w/2)-(cR.left+cR.w/2), dy=(tR.top+tR.h/2)-(cR.top+cR.h/2);
  clone.style.transition=`transform ${FAC_DUR}s cubic-bezier(.4,.05,.2,1) ${FAC_DELAY}s`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ clone.style.transform=`translate(${dx}px,${dy}px)`; }));
  setTimeout(()=>{ land(); clone.remove(); }, (FAC_DELAY+FAC_DUR)*1000);
}

registerTool('factor', {
  name:'Розкладання на прості множники', icon:'🧩', color:'var(--primary)', bg:'var(--primary-l)',
  build: cfg => buildFactorModel(cfg.n),
  view:  facView,
  prepare: prepareFacAnim,
  animate: runFacFly,
  inputs: c => `
    <div class="field"><label class="fl">Число</label><input id="i_n" type="number" min="2" max="9999" value="${c.n??360}"></div>
    <p class="helper">Розкладемо число на прості множники перебором дільників 2, 3, 5, 7… Підійде будь-яке число від 2 до 9999.</p>`,
  read: v => ({n:+v('i_n')}),
  summary: cfg => `розклад числа ${cfg.n}`,
  editorFields: cfg => `
    <div class="field"><label class="fl">Число (2–9999)</label><input id="f_n" type="number" min="2" max="9999" value="${cfg.n||''}"></div>
    <p class="helper">Учень побачить драбинку ділення й канонічний розклад цього числа.</p>`,
  readEditor: v => ({n:+v('f_n')}),
  errorHint:'Введи натуральне число від 2 до 9999.',
});
