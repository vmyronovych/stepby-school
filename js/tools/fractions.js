/* =========================================================
   ДІЇ З ДРОБАМИ
   ========================================================= */
/* ---------- 4) ДІЇ З ДРОБАМИ ----------
   Розв'язання йде в ОДНОМУ рядку: кожен крок дописує «= <новий вигляд>».
   Коли рядок заповнюється — сегмент автоматично переноситься на новий (flex-wrap). */
function buildFracModel(a,b,op,c,d){
  a=Math.trunc(a);b=Math.trunc(b);c=Math.trunc(c);d=Math.trunc(d);
  if(!b||!d) throw 'bad';
  const plus = op!=='-';
  const sign = plus?'+':'−';
  const F=(n,dd)=>({type:'frac',n,d:dd});
  const O=()=>({type:'op',t:sign});
  const N=(n)=>({type:'num',t:fmtNum(n)});
  const segs=[];          // сегменти ланцюжка (горизонтально)
  const steps=[];         // кроки: {chainUpto, newSeg, denom, text}
  segs.push({units:[F(a,b), O(), F(c,d)]});
  steps.push({chainUpto:1, newSeg:true, text:`Записуємо вираз. Потрібно ${plus?'додати':'відняти'} два дроби.`});

  let L,na,nc;
  if(b!==d){
    // ІТЕРАТИВНИЙ пошук НСК: по черзі відкриваємо наступне кратне кожного знаменника
    // й після кожного перевіряємо збіг. Перший збіг — це НСК.
    const multsB=[], multsD=[];
    const denSnap=(newSide, matchVal, showMult, ka, kc, Lv)=>({b,d, multsB:multsB.slice(), multsD:multsD.slice(), bShown:multsB.length, dShown:multsD.length, newSide, matchVal:matchVal||null, showMult:!!showMult, ka, kc, L:Lv});
    let k=1, match=null;
    while(!match && k<=200){
      const vb=k*b; multsB.push(vb);
      const mb = multsD.includes(vb);
      steps.push({chainUpto:1, denom:denSnap('b', mb?vb:null),
        text: mb ? `Наступне кратне ${b}: ${k}×${b} = ${vb}. А ${vb} вже є серед кратних ${d}! Отже, ${vb} — найменше спільне кратне: НСК(${b}, ${d}) = ${vb}.`
                 : `Наступне кратне ${b}: ${k}×${b} = ${vb}.`});
      if(mb){ match=vb; break; }
      const vd=k*d; multsD.push(vd);
      const md = multsB.includes(vd);
      steps.push({chainUpto:1, denom:denSnap('d', md?vd:null),
        text: md ? `Наступне кратне ${d}: ${k}×${d} = ${vd}. А ${vd} вже є серед кратних ${b}! Отже, ${vd} — найменше спільне кратне: НСК(${b}, ${d}) = ${vd}.`
                 : `Наступне кратне ${d}: ${k}×${d} = ${vd}. Спільного числа ще немає — беремо наступні кратні.`});
      if(md){ match=vd; break; }
      k++;
    }
    L = match || (b/gcd(b,d)*d);
    const ka=L/b, kc=L/d; na=a*ka; nc=c*kc;
    // 1) множення показуємо прямо в дробах: 7·3/10·3 + 2·2/15·2 (множник — маркер «·» → окремий стиль)
    const mul=(base,k)=>`${base}·${k}`;
    segs.push({units:[F(mul(a,ka),mul(b,ka)), O(), F(mul(c,kc),mul(d,kc))], note:'домножуємо чисельник і знаменник'});
    steps.push({chainUpto:segs.length, newSeg:true, denom:denSnap('', L, true, ka, kc, L),
      text:`Скільки разів кожен знаменник уміщається в ${L}? ${b}×${ka}=${L} і ${d}×${kc}=${L}. Множимо і чисельник, і знаменник кожного дробу на цей множник — значення дробу не зміниться.`});
    // 2) обчислений результат: 21/30 + 4/30 (7·3 вилітає й перетворюється на 21)
    segs.push({units:[F(na,L), O(), F(nc,L)], note:`спільний знаменник ${L}`});
    steps.push({chainUpto:segs.length, newSeg:true, flip:'morph',
      text:`Перемножуємо: ${a}·${ka}=${na} над ${b}·${ka}=${L}, і ${c}·${kc}=${nc} над ${d}·${kc}=${L}. Дроби зведені до спільного знаменника ${L}.`});
  } else { L=b; na=a; nc=c; }

  const num = plus? na+nc : na-nc;
  segs.push({units:[F(num,L)], note:plus?'додаємо чисельники':'віднімаємо чисельники', done:true});
  steps.push({chainUpto:segs.length, newSeg:true, flip:'add',
    text:`${plus?'Додаємо':'Віднімаємо'} чисельники, знаменник лишається спільним: ${na} ${sign} ${nc} = ${num}. Отримали ${num}/${L}.`});

  // скорочення
  const g=gcd(Math.abs(num),L);
  let fn=num, fd=L;
  if(g>1 && num!==0){ fn=num/g; fd=L/g;
    segs[segs.length-1].done=false;
    segs.push({units:[F(fn,fd)], note:`скорочуємо на ${g}`, done:true});
    steps.push({chainUpto:segs.length, newSeg:true, flip:'morph', text:`Чисельник і знаменник діляться на ${g}: скорочуємо дріб — ${num}:${g}=${fn}, ${L}:${g}=${fd}.`});
  }
  // ціле або мішане число
  if(fd===1){
    segs[segs.length-1].done=false;
    segs.push({units:[N(fn)], done:true});
    steps.push({chainUpto:segs.length, newSeg:true, text:`Знаменник дорівнює 1 — це ціле число ${fn}.`});
  } else if(Math.abs(fn)>=fd){
    const whole=Math.trunc(fn/fd), rest=Math.abs(fn%fd);
    if(rest!==0){ segs[segs.length-1].done=false;
      segs.push({units:[{type:'mixed',whole,n:rest,d:fd}], note:'мішане число', done:true});
      steps.push({chainUpto:segs.length, newSeg:true, text:`Дріб неправильний: виділяємо цілу частину — ${whole} цілих і ${rest}/${fd}.`});
    }
  }
  return {segments:segs, steps};
}

// число рукописними гліфами; якщо є маркер «·» (множник) — частину «·k» виділяємо стилем .fmul
function hwNum(value, ctx){
  const s=String(value); const dot=s.indexOf('·');
  if(dot<0) return hwGlyphs(s, ctx);
  return hwGlyphs(s.slice(0,dot), ctx) + `<span class="fmul">${hwGlyphs('·'+s.slice(dot+1), ctx)}</span>`;
}
// риска дробу отримує «такт» у послідовності письма (малюється між чисельником і знаменником)
function fbar(ctx){ let d=''; if(ctx.writing){ d=` style="animation-delay:${(ctx.order*HW_STEP).toFixed(2)}s"`; ctx.order++; } return `<span class="fbar"${d}></span>`; }
function renderFUnit(u, ctx){
  if(u.type==='frac') return `<span class="funit"><span class="frac"><span class="fn">${hwNum(u.n,ctx)}</span>${fbar(ctx)}<span class="fd">${hwNum(u.d,ctx)}</span></span></span>`;
  if(u.type==='op')   return `<span class="funit fop">${hwGlyphs(String(u.t),ctx)}</span>`;
  if(u.type==='mixed')return `<span class="funit"><span class="fmix">${hwGlyphs(String(u.whole),ctx)}</span><span class="frac"><span class="fn">${hwNum(u.n,ctx)}</span>${fbar(ctx)}<span class="fd">${hwNum(u.d,ctx)}</span></span></span>`;
  return `<span class="funit">${hwGlyphs(String(u.t),ctx)}</span>`;
}
// Робоча область пошуку НСК: кожен чип підписаний номером кратного (×1, ×2 …).
// Номер, на якому стоїть НСК, — це і є множник для того дробу.
function renderDenom(dn){
  const row=(label, arr, side)=>{
    let s=`<div class="denrow"><span class="denlbl">${label}</span>`;
    for(let i=0;i<arr.length;i++){
      const v=arr[i];
      const hl = dn.matchVal && v===dn.matchVal;
      const isNew = (i===arr.length-1) && dn.newSide===side;
      const isMul = dn.showMult && hl;                 // на кроці множників підсвічуємо номер
      s+=`<span class="denchip${hl?' hl':''}${isNew?' chipnew':''}${isMul?' mul':''}"><span class="chipk">×${i+1}</span><span class="chipv">${v}</span></span>`;
    }
    return s+'</div>';
  };
  let h=`<div class="denbox"><div class="denttl">🔍 Шукаємо спільний знаменник — НСК(${dn.b}, ${dn.d})</div>`;
  h+=row(`Кратні ${dn.b}:`, dn.multsB, 'b');
  h+=row(`Кратні ${dn.d}:`, dn.multsD, 'd');
  if(dn.matchVal && !dn.showMult) h+=`<div class="denres">Спільне кратне знайдено → НСК(${dn.b}, ${dn.d}) = <b>${dn.matchVal}</b></div>`;
  if(dn.showMult) h+=`<div class="denres">Дивимось, котре це кратне: ${dn.L} — це <b class="mk">×${dn.ka}</b> кратне ${dn.b} і <b class="mk">×${dn.kc}</b> кратне ${dn.d}. Це і є множники для дробів!</div>`;
  return h+'</div>';
}
// Рендер сцени дробів: горизонтальний ланцюжок + робоча область НСК (за потреби)
function fracStageInner(model, ctx){
  const m=model, st=ctx.step;
  let html='<div class="fracwork"><div class="fracsolve">';
  for(let i=0;i<st.chainUpto;i++){
    const seg=m.segments[i], isCur=(i===st.chainUpto-1) && st.newSeg;
    // .morphing ховає числа до прильоту, тож ставимо його ЛИШЕ коли політ справді
    // готується (ctx.anim). Інакше — стрибок через крок або «спокійний режим» —
    // показуємо фінальний вигляд одразу, без руху.
    const isFlip = isCur && st.flip && !!ctx.anim;
    const isWrite = isCur && !st.flip;                        // звичайний послідовний запис
    const flymul = isCur && st.denom && st.denom.showMult;    // множники прилетять із блоку НСК
    const pen = isWrite ? {writing:true, order:0} : {writing:false};   // рукописне письмо, глиф за гліфом
    html+=`<span class="fseg${seg.done?' fdone':''}${isWrite?' writing':''}${isFlip?' morphing':''}${flymul?' flymul':''}"><span class="fseg-math">`;
    if(i>0) html+=`<span class="funit feq">${hwGlyphs('=',pen)}</span>`;
    seg.units.forEach(u=>{ html+=renderFUnit(u, pen); });      // чисельник → риска → знаменник → знак → …
    html+='</span>';
    if(seg.note){ const d=isWrite?` style="animation-delay:${(pen.order*HW_STEP).toFixed(2)}s"`:''; html+=`<span class="fnote"${d}>${seg.note}</span>`; }
    html+='</span>';
  }
  html+='</div>';
  if(st.denom) html+=renderDenom(st.denom);
  return html+'</div>';
}
// Анімація: множники (×3, ×2) вилітають із чипів НСК і летять у дроби (в чисельник і знаменник)
function runFracMulAnim(model, ctx){
  const st = ctx.step;
  if(!(st && st.denom && st.denom.showMult)) return;
  const work=document.querySelector('.fracwork'); if(!work) return;
  const seg=work.querySelector('.fseg.flymul'); if(!seg) return;
  const fmuls=[...seg.querySelectorAll('.fmul')]; if(!fmuls.length) return;
  const reveal=()=>fmuls.forEach(t=>{t.style.opacity='1';});
  if(prefersReducedMotion()){ reveal(); return; }
  const sources=[...work.querySelectorAll('.denchip.mul .chipk')];
  if(sources.length<2){ reveal(); return; }
  work.style.position='relative';
  const wr=work.getBoundingClientRect();
  const rel=el=>{const r=el.getBoundingClientRect();return{left:r.left-wr.left,top:r.top-wr.top,w:r.width,h:r.height};};
  work.querySelectorAll('.fmulclone').forEach(c=>c.remove());
  // fmuls у порядку: [чисельник1, знаменник1, чисельник2, знаменник2]
  // СТРОГО ПОСЛІДОВНО — кожен наступний стартує лише коли попередній приземлився,
  // і лише після того, як базовий дріб уже дописано (рахуємо намальовані гліфи)
  const baseGlyphs = seg.querySelectorAll('.fseg-math .hwg').length - seg.querySelectorAll('.fmul .hwg').length;
  const bars = seg.querySelectorAll('.fbar').length;
  const half=Math.ceil(fmuls.length/2), DUR=0.55, GAP=0.16, START=(baseGlyphs+bars)*HW_STEP + HW_DUR + 0.2;
  fmuls.forEach((tgt,idx)=>{
    const src = idx<half? sources[0] : sources[1];   // 1-й дріб ← множник знаменника b, 2-й ← d
    const sR=rel(src), tR=rel(tgt);
    const clone=document.createElement('span');
    clone.className='fmulclone'; clone.innerHTML=tgt.innerHTML;
    clone.style.left=sR.left+'px'; clone.style.top=sR.top+'px'; clone.style.opacity='0';
    work.appendChild(clone);
    const dx=(tR.left+tR.w/2)-(sR.left+sR.w/2), dy=(tR.top+tR.h/2)-(sR.top+sR.h/2);
    const delay=START+idx*(DUR+GAP);
    clone.style.transition=`transform ${DUR}s cubic-bezier(.4,.05,.2,1) ${delay.toFixed(2)}s, opacity .12s ease ${delay.toFixed(2)}s`;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ clone.style.opacity='1'; clone.style.transform=`translate(${dx}px,${dy}px)`; }));
    setTimeout(()=>{ tgt.style.opacity='1'; tgt.style.animation='fmulPop .32s ease-out'; clone.remove(); }, (delay+DUR)*1000);
  });
}

// Готуємо FLIP перед зміною кроку (лише вперед, лише для кроків-обчислень).
// Джерело лишається на екрані (попередній сегмент), тож позиції читаємо вже після рендера.
function prepareFracAnim(model, from, to){
  if(to!==from+1) return null;
  const st=model.steps[to]; if(!st||!st.flip) return null;
  return {kind:st.flip, newIdx:st.chainUpto-1};
}
// Виконуємо FLIP: число ВИЛІТАЄ зі старого місця (оригінал ховаємо, щоб не було здвоєння)
// і перетворюється на результат у новому.
function runFracFlip(model, ctx){
  const flip=ctx.anim; if(!flip) return;
  const work=document.querySelector('.fracwork'); if(!work) return;
  work.style.position='relative';
  const cont=work.getBoundingClientRect();
  const rel=el=>{const r=el.getBoundingClientRect();return{left:r.left-cont.left,top:r.top-cont.top,w:r.width,h:r.height};};
  const segEls=work.querySelectorAll('.fracsolve .fseg');
  const newSeg=segEls[flip.newIdx], srcSeg=segEls[flip.newIdx-1];
  if(!newSeg||!srcSeg) return;
  const newFracs=[...newSeg.querySelectorAll('.frac')];
  const srcFracs=[...srcSeg.querySelectorAll('.frac')];
  work.querySelectorAll('.fracmorph').forEach(c=>c.remove());
  const DUR=0.62, GAP=0.18;
  // один елемент-джерело летить у ціль і перетворюється на неї.
  // keep=true — оригінал НЕ ховаємо (лишається на місці як запис кроку)
  const flyOne=(srcEl, tgtEl, delay, keep)=>{
    const sR=rel(srcEl), tR=rel(tgtEl);
    tgtEl.style.opacity='0'; if(!keep) srcEl.style.visibility='hidden';
    const c=document.createElement('span'); c.className='fracmorph'; c.innerHTML=srcEl.innerHTML;
    c.style.left=sR.left+'px'; c.style.top=sR.top+'px';
    work.appendChild(c);
    const dx=(tR.left+tR.w/2)-(sR.left+sR.w/2), dy=(tR.top+tR.h/2)-(sR.top+sR.h/2);
    c.style.transition=`transform ${DUR}s cubic-bezier(.4,.05,.2,1) ${delay.toFixed(2)}s`;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ c.style.transform=`translate(${dx}px,${dy}px)`; }));
    setTimeout(()=>{ tgtEl.style.opacity='1'; tgtEl.style.animation='fmulPop .32s ease-out'; if(!keep) srcEl.style.visibility='visible'; c.remove(); }, (delay+DUR)*1000);
  };
  if(flip.kind==='morph'){
    // 1-до-1, ПОСЛІДОВНО: чисельник1 → знаменник1 → чисельник2 → …
    let t=0.15;
    newFracs.forEach((fr,i)=>{
      const s=srcFracs[i]; if(!s) return;
      flyOne(s.querySelector('.fn'), fr.querySelector('.fn'), t); t+=DUR+GAP;
      flyOne(s.querySelector('.fd'), fr.querySelector('.fd'), t); t+=DUR+GAP;
    });
  } else if(flip.kind==='add'){
    const fr=newFracs[0]; if(!fr) return;
    const newFn=fr.querySelector('.fn'), newFd=fr.querySelector('.fd');
    const fn0=srcFracs[0].querySelector('.fn'), fn1=srcFracs[1]?srcFracs[1].querySelector('.fn'):null;
    const opEl=srcSeg.querySelector('.fseg-math .fop'); const opHtml=opEl?opEl.innerHTML:hwGlyphs('+',{writing:false});
    // ЄДИНИЙ напис "21 + 4" — злітає з чисельників (оригінали лишаються) і зводиться в новий чисельник
    const label=document.createElement('span'); label.className='fracmorph fmlabel';
    label.innerHTML = fn1 ? `${fn0.innerHTML}<span class="fmop">${opHtml}</span>${fn1.innerHTML}` : fn0.innerHTML;
    work.appendChild(label);
    const lw=label.getBoundingClientRect().width, lh=label.getBoundingClientRect().height;
    const r0=rel(fn0), r1=fn1?rel(fn1):r0;
    const startCX=((r0.left+r0.w/2)+(r1.left+r1.w/2))/2, startTop=r0.top-4;
    label.style.left=(startCX-lw/2)+'px'; label.style.top=startTop+'px'; label.style.opacity='0';
    const tR=rel(newFn); newFn.style.opacity='0';
    const dx=(tR.left+tR.w/2)-startCX, dy=(tR.top+tR.h/2)-(startTop+lh/2);
    const delay=0.25, D2=0.8;
    label.style.transition=`transform ${D2}s cubic-bezier(.4,.05,.2,1) ${delay}s, opacity .18s ease ${delay}s`;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ label.style.opacity='1'; label.style.transform=`translate(${dx}px,${dy}px)`; }));
    // на посадці напис стискається й зникає, а на його місці з'являється сума
    setTimeout(()=>{ label.style.transition='transform .22s ease, opacity .22s ease'; label.style.transform=`translate(${dx}px,${dy}px) scale(.4)`; label.style.opacity='0'; }, (delay+D2-0.02)*1000);
    setTimeout(()=>{ newFn.style.opacity='1'; newFn.style.animation='fmulPop .42s ease-out'; label.remove(); }, (delay+D2+0.18)*1000);
    // спільний знаменник переноситься вниз (оригінал лишається)
    flyOne(srcFracs[0].querySelector('.fd'), newFd, delay+D2+0.26, true);
  }
}

registerTool('frac', {
  name:'Дії з дробами', icon:'½', color:'var(--amber)', bg:'var(--amber-l)',
  build: cfg => buildFracModel(cfg.a, cfg.b, cfg.op, cfg.c, cfg.d),
  view:  fracStageInner,
  prepare: prepareFracAnim,
  // два різні польоти на одному кроці: множники влітають із чипів НСК,
  // а числа морфляться в результат. Обидва — послідовно, кожен своїм розкладом.
  animate(model, ctx){ runFracMulAnim(model, ctx); runFracFlip(model, ctx); },
  inputs: c => `
    <div class="field"><label class="fl">Перший дріб</label>
      <div class="row"><input id="i_a" type="number" value="${c.a??1}" style="flex:1"><span style="align-self:center">/</span><input id="i_b" type="number" value="${c.b??4}" style="flex:1"></div></div>
    <div class="field"><label class="fl">Дія</label>
      <select id="i_op"><option ${c.op==='-'?'':'selected'}>+</option><option ${c.op==='-'?'selected':''}>-</option></select></div>
    <div class="field"><label class="fl">Другий дріб</label>
      <div class="row"><input id="i_c" type="number" value="${c.c??1}" style="flex:1"><span style="align-self:center">/</span><input id="i_d" type="number" value="${c.d??6}" style="flex:1"></div></div>`,
  read: v => ({a:+v('i_a'), b:+v('i_b'), op:v('i_op'), c:+v('i_c'), d:+v('i_d')}),
  summary: cfg => `${cfg.a}/${cfg.b} ${cfg.op} ${cfg.c}/${cfg.d}`,
  editorFields: cfg => `
    <div class="row">
      <div class="field" style="flex:1"><label class="fl">Чисельник 1</label><input id="f_a" type="number" value="${cfg.a||''}"></div>
      <div class="field" style="flex:1"><label class="fl">Знаменник 1</label><input id="f_b" type="number" value="${cfg.b||''}"></div>
      <div class="field" style="width:80px"><label class="fl">Дія</label>
        <select id="f_op"><option ${cfg.op==='+'?'selected':''}>+</option><option ${cfg.op==='-'?'selected':''}>-</option></select></div>
      <div class="field" style="flex:1"><label class="fl">Чисельник 2</label><input id="f_c" type="number" value="${cfg.c||''}"></div>
      <div class="field" style="flex:1"><label class="fl">Знаменник 2</label><input id="f_d" type="number" value="${cfg.d||''}"></div>
    </div>`,
  readEditor: v => ({a:+v('f_a'), b:+v('f_b'), op:v('f_op'), c:+v('f_c'), d:+v('f_d')}),
});
