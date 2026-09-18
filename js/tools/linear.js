/* =========================================================
   ЛІНІЙНЕ ЯДРО — спільна логіка і спільний рендер для всього,
   що зводиться до рівняння ax + b = cx + d.
   Перевикористовують: tools/equation.js (парсить текст) і
   tools/proportion.js (зводить навхрест). Нову таку задачу роби
   тонким адаптером поверх buildLinearRows, а не копією.
   ========================================================= */
function parseSide(s){
  s=s.replace(/\s+/g,'').replace(/-/g,'+-').replace(/^\+/,'');
  const numRe=/^-?\d+(\.\d+)?$/;              // допускаємо лише чисті числа-коефіцієнти
  let a=0,b=0;
  for(const t of s.split('+')){
    if(t==='') continue;
    if(t.includes('x')){ let co=t.replace('x',''); if(co===''||co==='+')co='1'; if(co==='-')co='-1'; if(!numRe.test(co)) throw 'bad'; a+=parseFloat(co); }
    else { if(!numRe.test(t)) throw 'bad'; b+=parseFloat(t); }
  }
  return {a,b};
}
// точне значення: ціле, скінченний десятковий або звичайний дріб «1/3» (знаменник ≤ 1000)
function fmtExact(v){
  if(Math.abs(v*100-Math.round(v*100))<1e-9) return fmtNum(v).replace('-','−');
  let h0=0,h1=1,k0=1,k1=0,a=Math.abs(v),f=a;
  for(let i=0;i<20;i++){ const t=Math.floor(f); [h0,h1]=[h1,t*h1+h0]; [k0,k1]=[k1,t*k1+k0]; if(k1>1000) return fmtNum(v); if(Math.abs(h1/k1-a)<1e-9) break; f=1/(f-t); }
  return (v<0?'−':'')+h1+'/'+k1;
}
function fmtX(c){ c=+c; const a=Math.abs(c); const s=c<0?'−':''; const cc=(a===1?'':fmtNum(a)); return s+cc+'x'; }

// ЛІНІЙНЕ ЯДРО (перевикористовується рівняннями, пропорціями й умовами ОДЗ):
// приймає коефіцієнти ls={a,b}, rs={a,b} і будує кроки «записуємо → перенос → зведення → ділимо → відповідь».
// opts.rel — знак відношення замість «=» ('≠', '≥', '>' …): режим нерівності. У ньому
// пропускаються порожні кроки (зведення одного доданка, ділення на 1), при діленні на
// від'ємне число знак перевертається, а відповідь — точний дріб (1/3), а не 0.33.
const REL_FLIP={'≥':'≤','≤':'≥','>':'<','<':'>','≠':'≠','=':'='};
function buildLinearRows(ls, rs, opts){
  const rel=(opts&&opts.rel)||'=', ineq=rel!=='=';
  const A=ls.a-rs.a, B=rs.b-ls.b;
  const EQ=(t)=>({id:'eq', t:t||rel, cls:'eq-eq'});
  const rows=[];
  // будуємо сторону з доданків: перший — зі своїм знаком (без окремого токена),
  // наступні — окремий знак 's'+id + модуль значення. Записуємо і опис одиниць.
  function emitSide(list, units){
    const t=[];
    list.forEach((u,i)=>{
      const fmt = u.xf? fmtX : fmtNum;               // формат визначає сам доданок (x-член чи число)
      if(i===0){ t.push({id:u.id, t:fmt(u.coef), from:u.from}); units && units.push({valId:u.id, signId:null, cross:!!u.cross}); }
      else { const sid='s'+u.id; t.push({id:sid, t:(u.coef<0?'−':'+'), cls:'op'}); t.push({id:u.id, t:fmt(Math.abs(u.coef)), from:u.from}); units && units.push({valId:u.id, signId:sid, cross:!!u.cross}); }
    });
    if(!list.length) t.push({id:'z', t:'0'});
    return t;
  }

  // 1) початкове рівняння
  const oL=[]; if(ls.a!==0) oL.push({id:'LX',coef:ls.a,xf:true}); if(ls.b!==0) oL.push({id:'LC',coef:ls.b,xf:false}); if(!oL.length) oL.push({id:'LC',coef:0,xf:false});
  const oR=[]; if(rs.a!==0) oR.push({id:'RX',coef:rs.a,xf:true}); if(rs.b!==0) oR.push({id:'RC',coef:rs.b,xf:false}); if(!oR.length) oR.push({id:'RC',coef:0,xf:false});
  rows.push({tokens:[...emitSide(oL), EQ(), ...emitSide(oR)],
    type:'write', text: ineq ? 'Записуємо умову. Шукаємо всі x, які її задовольняють.' : 'Записуємо рівняння. Наша мета — знайти x.'});

  const needMove = rs.a!==0 || ls.b!==0;
  if(needMove){
    // 2) перенос: x — ліворуч, числа — праворуч. Число летить РАЗОМ зі знаком; знак
    //    змінюється в момент приземлення (бо перейшло через «=»).
    const leftX=[]; if(ls.a!==0) leftX.push({id:'LX',coef:ls.a,xf:true,cross:false}); if(rs.a!==0) leftX.push({id:'RX',coef:-rs.a,xf:true,cross:true});
    const rightC=[]; if(rs.b!==0) rightC.push({id:'RC',coef:rs.b,xf:false,cross:false}); if(ls.b!==0) rightC.push({id:'LC',coef:-ls.b,xf:false,cross:true});
    const units=[];
    const mtoks=[...emitSide(leftX,units), EQ(), ...emitSide(rightC,units)];
    rows.push({tokens:mtoks, type:'move', note:'переносимо', moveUnits:units,
      text:`Переносимо доданки з x у ліву частину, а числа — у праву. Число летить разом зі своїм знаком, і коли приземляється по інший бік «${rel}», його знак змінюється на протилежний.`});

    // 3) зводимо подібні: x-члени злітаються в A·x, числа — в B
    const axFrom=leftX.map(t=>t.id), bcFrom=rightC.map(t=>t.id);
    if(ineq && leftX.length===1 && rightC.length===1){       // зводити нічого — по доданку з кожного боку
      if(A===1) return rows;
    } else {
      const rc=[{id:'ACX', t:(A===0?'0':fmtX(A)), from:axFrom}, EQ(), {id:'BCC', t:fmtNum(B), from:bcFrom}];
      const doneCombine = A===0;
      rows.push({tokens:rc, type:'combine', note: doneCombine?undefined:'зводимо подібні', done:doneCombine,
        text: doneCombine
          ? (B===0?'Цифри злітаються: ліворуч і праворуч виходить однаково — рівняння є тотожністю, розв’язків безліч.':'Цифри злітаються: ліворуч виходить 0, а праворуч інше число — рівняння не має розв’язків.')
          : `Додаємо однакові доданки: цифри злітаються разом. Ліворуч ${fmtNum(ls.a)} − ${fmtNum(rs.a)} = ${fmtNum(A)} перед x, праворуч ${fmtNum(rs.b)} − ${fmtNum(ls.b)} = ${fmtNum(B)}.`});
      if(A===0) return rows;
      if(ineq && A===1) return rows;
    }
  } else if(ineq && A===1){
    return rows;                                                // уже x ≠ 0 — ділити нічого
  } else if(A===0){
    rows.push({tokens:[{id:'z',t:'0'}, EQ(), {id:'RC',t:fmtNum(B)}], type:'write', done:true,
      text: B===0?'Рівняння є тотожністю — розв’язків безліч.':'Рівняння не має розв’язків.'});
    return rows;
  }

  const x=B/A;
  if(ineq){
    // 4') ділимо на коефіцієнт; на від'ємне — знак нерівності перевертається
    const flip = A<0 && rel!=='≠', rel2 = flip ? REL_FLIP[rel] : rel;
    const fm = v => fmtNum(v).replace('-','−');
    const aTxt = A<0 ? `(${fm(A)})` : fm(A);
    rows.push({tokens:[{id:'x1',t:'x'}, EQ(rel2), {id:'bdiv',t:fm(B)}, {id:'od',t:':',cls:'op'}, {id:'adiv',t:aTxt}],
      type:'write', note: flip ? `ділимо на ${fm(A)} — знак змінюється` : `ділимо на ${fm(A)}`,
      text: flip
        ? `Ділимо обидві частини на ${fm(A)}. Число від’ємне, тому знак нерівності змінюється на протилежний: «${rel}» стає «${rel2}».`
        : `Щоб знайти x, ділимо обидві частини на коефіцієнт біля x, тобто на ${fm(A)}.`});
    rows.push({tokens:[{id:'x1',t:'x'}, EQ(rel2), {id:'ans',t:fmtExact(x),cls:'res', from:['bdiv','adiv']}], type:'combine', done:true,
      text:`Виконуємо ділення: ${fm(B)} : ${aTxt} = ${fmtExact(x)}. Отже, x ${rel2} ${fmtExact(x)}.`});
    return rows;
  }
  // 4) ділимо на коефіцієнт біля x
  rows.push({tokens:[{id:'x1',t:'x'}, EQ(), {id:'bdiv',t:fmtNum(B)}, {id:'od',t:':',cls:'op'}, {id:'adiv',t:fmtNum(A)}],
    type:'write', note:`ділимо на ${fmtNum(A)}`,
    text:`Щоб знайти x, ділимо обидві частини рівняння на коефіцієнт біля x, тобто на ${fmtNum(A)}.`});
  // 5) відповідь: виконуємо ділення — цифри злітаються в результат (як при додаванні/відніманні)
  rows.push({tokens:[{id:'x1',t:'x'}, EQ(), {id:'ans',t:fmtNum(x),cls:'res', from:['bdiv','adiv']}], type:'combine', done:true,
    text:`Виконуємо ділення: ${fmtNum(B)} : ${fmtNum(A)} = ${fmtNum(x)}. Цифри злітаються в результат. Отже, x = ${fmtNum(x)}.`});

  return rows;
}

/* ---------- Спільний рендер і польоти рядків рівняння ---------- */
// Рендер сцени: усі рядки 0..ctx.index; поточний «пишеться» або анімується (перенос/зведення).
function eqStageInner(model, ctx){
  const cur=ctx.index;
  const animating = !!(ctx.anim && ctx.anim.toStep===cur);
  return '<div class="eqsolve" id="eqsolve">' + eqRowsHtml(model.rows, cur, cur, animating) + '</div>';
}
// Рядки 0..upto; рядок cur — поточний («пишеться» або летить, якщо animating).
// Окремо від обгортки, щоб кілька блоків рядків жили на одному аркуші (умови ОДЗ).
function eqRowsHtml(rows, upto, cur, animating){
  let html='';
  for(let i=0;i<=upto;i++){
    const row=rows[i];
    const isCur=i===cur;
    const writing = isCur && row.type==='write' && !animating;
    let cls='eqrow'+(isCur?(row.done?' done-row':' cur'):'')+(writing?' writing':'');
    html+=`<div class="${cls}" data-row="${i}">`;
    const eqIdx = writing? row.tokens.findIndex(t=>t.cls&&t.cls.indexOf('eq-eq')>-1) : -1;
    // порядок «написання» — природний, зліва направо; лічильник — по гліфах
    let startOrder={}, total=0;
    if(writing){
      row.tokens.forEach((tk,ti)=>{ startOrder[ti]=total; total+=String(tk.t).length; });
    }
    row.tokens.forEach((tk,ti)=>{
      let style='';
      if(!writing && animating && isCur) style=' style="opacity:0"';
      const from = tk.from? ` data-from="${tk.from.join('|')}"`:'';
      const inner = writing ? hwGlyphs(tk.t, {writing:true, order:startOrder[ti]}) : hwGlyphs(tk.t, {writing:false});
      html+=`<span class="tok ${tk.cls||''}" data-id="${tk.id}"${from}${style}>${inner}</span>`;
    });
    if(row.note){
      let style=''; if(writing) style=` style="animation-delay:${(total*HW_STEP).toFixed(2)}s"`; else if(animating&&isCur) style=' style="opacity:0"';
      html+=`<span class="note tok" data-note="1"${style}>${row.note}</span>`;
    }
    html+='</div>';
  }
  return html;
}

// Зчитуємо позиції токенів поточного (старого) рядка перед перемальовуванням.
// solve — контейнер рядків (за замовчуванням #eqsolve).
function captureEqRects(rowIndex, solve){
  solve=solve||document.getElementById('eqsolve'); const map={};
  if(!solve) return map;
  const c=solve.getBoundingClientRect();
  const row=solve.querySelector(`.eqrow[data-row="${rowIndex}"]`); if(!row) return map;
  row.querySelectorAll('.tok[data-id]').forEach(el=>{
    const r=el.getBoundingClientRect();
    map[el.dataset.id]={left:r.left-c.left, top:r.top-c.top, w:r.width, h:r.height, text:el.innerHTML, cls:el.className};
  });
  return map;
}
// Готуємо анімацію ПЕРЕД зміною кроку (лише вперед на 1, лише для переносу/зведення).
// Повертаємо «посилку» для animate() або null, якщо цей перехід не анімується.
function prepareEqAnim(model, from, to){
  if(to!==from+1) return null;
  const type=model.rows[to] && model.rows[to].type;
  if(type!=='move' && type!=='combine') return null;
  return {type, toStep:to, srcRects:captureEqRects(from)};
}
// Виконуємо FLIP-анімацію: цифри летять зі старих позицій на нові / злітаються в результат
function runEqAnim(model, ctx, solve){
  const anim=ctx.anim; if(!anim) return;
  solve=solve||document.getElementById('eqsolve'); if(!solve) return;
  solve.style.position='relative';
  const c=solve.getBoundingClientRect();
  const rel=el=>{const r=el.getBoundingClientRect();return{left:r.left-c.left,top:r.top-c.top,w:r.width,h:r.height};};
  const newRow=solve.querySelector(`.eqrow[data-row="${anim.toStep}"]`); if(!newRow) return;
  const toks=[...newRow.querySelectorAll('.tok[data-id]')];
  const note=newRow.querySelector('[data-note]');
  solve.querySelectorAll('.eqclone').forEach(c=>c.remove());
  const DUR=1.0; // ~1 секунда на цифру
  let totalMs=0;

  if(anim.type==='move'){
    const units = (model.rows[anim.toStep].moveUnits)||[];
    const unitByVal={}, signIds=new Set();
    units.forEach(u=>{ unitByVal[u.valId]=u; if(u.signId) signIds.add(u.signId); });
    // хелпери
    const fly=(el,src,tgt,dur,start)=>{
      const dx=src.left-tgt.left, dy=src.top-tgt.top;
      el.style.transition='none'; el.style.transform=`translate(${dx}px,${dy}px)`; el.style.opacity='0';
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        el.style.transition=`transform ${dur}s cubic-bezier(.45,.02,.25,1) ${start.toFixed(2)}s, opacity .12s ease ${start.toFixed(2)}s`;
        el.style.transform='translate(0,0)'; el.style.opacity='1';
      }));
    };
    const fade=(el,start,dur)=>{ el.style.opacity='0'; requestAnimationFrame(()=>requestAnimationFrame(()=>{ el.style.transition=`opacity ${dur}s ease ${start.toFixed(2)}s`; el.style.opacity='1'; })); };
    // СТРОГО ПОСЛІДОВНО, доданок за доданком (знак — частина свого доданка)
    let cursor=0;
    toks.forEach(el=>{
      const id=el.dataset.id;
      if(signIds.has(id)) return;                 // знаки анімуються разом зі своїм числом
      const src=anim.srcRects[id], tgt=rel(el);
      const unit=unitByVal[id];
      const dur=(unit&&unit.cross)?DUR:0.4;
      const start=cursor; cursor+=dur+0.08;
      totalMs=Math.max(totalMs,(start+dur)*1000+350);
      if(src) fly(el,src,tgt,dur,start); else fade(el,start,0.2);
      // знак цього доданка
      if(unit&&unit.signId){
        const sEl=newRow.querySelector(`.tok[data-id="${unit.signId}"]`);
        if(sEl){
          const newSign=sEl.innerHTML;
          const ssrc=anim.srcRects[unit.signId];
          if(ssrc){ // знак був явно написаний — летить разом із числом, показуючи старий знак…
            sEl.innerHTML=ssrc.text;
            fly(sEl, ssrc, rel(sEl), dur, start);
            setTimeout(()=>{ sEl.innerHTML=newSign; sEl.style.animation='signFlip .38s ease-out'; }, (start+dur)*1000); // …і перевертається на посадці
          } else { // знака раніше не було — з'являється у момент приземлення
            sEl.style.opacity='0';
            setTimeout(()=>{ sEl.style.opacity='1'; sEl.style.animation='signFlip .38s ease-out'; }, (start+dur)*1000);
          }
        }
      }
    });
  } else if(anim.type==='combine'){
    let order=0;
    toks.forEach(el=>{
      const id=el.dataset.id, tgt=rel(el);
      const from=el.dataset.from? el.dataset.from.split('|').filter(Boolean):[];
      if(from.length){
        el.style.opacity='0';
        const delay=order*DUR; order++;
        from.forEach((sid,si)=>{
          const src=anim.srcRects[sid]; if(!src) return;
          const clone=document.createElement('span');
          clone.className='eqclone '+(src.cls||'tok');
          clone.innerHTML=src.text;
          clone.style.left=src.left+'px'; clone.style.top=src.top+'px';
          clone.style.transition=`transform ${DUR}s cubic-bezier(.45,.02,.25,1) ${(delay+si*0.1).toFixed(2)}s, opacity .3s ease ${(delay+DUR-0.25).toFixed(2)}s`;
          solve.appendChild(clone);
          const dx=(tgt.left+tgt.w/2)-(src.left+src.w/2), dy=(tgt.top+tgt.h/2)-(src.top+src.h/2);
          requestAnimationFrame(()=>requestAnimationFrame(()=>{ clone.style.transform=`translate(${dx}px,${dy}px)`; clone.style.opacity='0'; }));
        });
        setTimeout(()=>{ el.style.opacity='1'; el.style.animation='tokPop .4s ease-out'; }, (delay+DUR)*1000);
        totalMs=Math.max(totalMs,(delay+DUR)*1000+400);
      } else {
        const src=anim.srcRects[id];
        if(src){ const dx=src.left-tgt.left, dy=src.top-tgt.top;
          el.style.transition='none'; el.style.transform=`translate(${dx}px,${dy}px)`; el.style.opacity='1';
          requestAnimationFrame(()=>requestAnimationFrame(()=>{ el.style.transition='transform .5s ease'; el.style.transform='translate(0,0)'; }));
        } else { el.style.opacity='1'; }
      }
    });
  }
  if(note){ note.style.opacity='0'; note.style.transition='opacity .5s ease'; setTimeout(()=>note.style.opacity='1', totalMs+150); }
}

/* ---------- База для будь-якого «лінійного» інструмента ----------
   Рендер рядків і польоти доданків однакові — різниться лише спосіб
   дістати коефіцієнти. Тому view/prepare/animate беруться звідси,
   а інструмент додає лише свої build/inputs/read/summary/editorFields. */
const linearToolBase = {
  view:    eqStageInner,
  prepare: prepareEqAnim,
  animate: runEqAnim,
};
// рядки моделі → кроки навігації
function linearSteps(rows){ return rows.map(r=>({text:r.text})); }
