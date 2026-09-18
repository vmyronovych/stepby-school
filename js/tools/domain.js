/* =========================================================
   ОБЛАСТЬ ВИЗНАЧЕННЯ ФУНКЦІЇ (10 клас)
   ---------------------------------------------------------
   y = … → «небезпечні місця» (знаменник, корінь парного степеня,
   від'ємний степінь) → система умов → розв'язок кожної умови →
   перетин на числовій прямій → D(y).

   Формули — спільний модуль js/core/formula.js, прямі — js/core/numline.js.
   Лінійні умови розв'язує лінійне ядро (buildLinearRows у режимі нерівності),
   квадратні — корені (швидкий шлях або D) і метод інтервалів.
   ========================================================= */
const D_CIRC='①②③④⑤⑥⑦⑧⑨';
const D_EPS=1e-9;
const D_HINT={
  den:'знаменник ≠ 0', root:'під коренем ≥ 0', rootden:'корінь у знаменнику: > 0',
  rootdenodd:'у знаменнику: ≠ 0', negpow:'основа степеня ≠ 0', odd:'непарний корінь — без обмежень',
};

/* ---------- 1) Небезпечні місця формули ---------- */
function domCollect(ast){
  const dangers=[], handled=new Set();
  const add=(node, kind, expr, rel)=>dangers.push({fid:node.fid, node, kind, expr, rel});
  // знаменник: многочлен → ≠ 0; корінь парного степеня → > 0; непарного → ≠ 0;
  // добуток — по кожному множнику (сталі множники не заважають)
  function denom(b){
    b=fStrip(b);
    if(toPoly(b)){ add(b,'den',b,'≠'); return; }
    if(b.t==='root'){ handled.add(b.fid); const even=b.n%2===0; add(b, even?'rootden':'rootdenodd', fStrip(b.a), even?'>':'≠'); return; }
    if(b.t==='pow'){ const e=constInt(b.e); if(e!=null && e>0){ denom(b.a); return; } }
    if(b.t==='mul'){ denom(b.a); denom(b.b); return; }
    throw 'У знаменнику має бути многочлен не вище 2-го степеня (напр. x² − 9) або корінь.';
  }
  (function walk(n){
    if(!n) return;
    switch(n.t){
      case 'div': walk(n.a); denom(n.b); walk(n.b); return;   // зліва направо: чисельник, тоді знаменник
      case 'root':
        if(!handled.has(n.fid)){ if(n.n%2===0) add(n,'root',fStrip(n.a),'≥'); else add(n,'odd',null,null); }
        walk(n.a); return;
      case 'pow': {
        const e=constInt(n.e);
        if(e==null) throw 'Показник степеня має бути цілим числом (напр. x^2 або x^-1).';
        if(e<0){
          const base=fStrip(n.a);
          if(!toPoly(base)) throw 'Від’ємний степінь підтримується лише для многочлена (напр. x^-2 або (x - 1)^-1).';
          add(n,'negpow',base,'≠');
        }
        walk(n.a); return;
      }
    }
    walk(n.a); walk(n.b);
  })(ast);

  // умова над числом: виконується — місце безпечне (прибираємо); ні — функція ніде не визначена
  const out=[];
  for(const d of dangers){
    if(!d.rel){ out.push(d); continue; }
    const p=toPoly(d.expr);
    if(!p) throw 'Під коренем має бути многочлен не вище 2-го степеня (напр. x² − 5x + 6). Дріб чи корінь під коренем поки не підтримуються.';
    if(polyDeg(p)===0){
      const v=qNum(p[0]);
      const ok = d.rel==='≠' ? v!==0 : d.rel==='≥' ? v>=0 : v>0;
      if(!ok) throw `Умова ${fmlText(d.expr)} ${d.rel} 0 не виконується ні для якого x — функція ніде не визначена.`;
      continue;
    }
    d.poly=p; out.push(d);
  }
  return out;
}

// однакові вирази зводимо в одну умову: ≥ і ≠ над одним виразом дають > 0
function domConditions(dangers){
  const conds=[];
  dangers.forEach(d=>{
    if(!d.rel) return;
    const key=d.poly.map(qKey).join(',');
    let c=conds.find(c=>c.key===key);
    if(c){ if(c.rel!==d.rel){ c.rel='>'; c.merged=true; } }
    else { c={key, poly:d.poly, rel:d.rel, expr:d.expr}; conds.push(c); }
    d.ci=conds.indexOf(c);
  });
  return conds;
}

/* ---------- 2) Розв'язок однієї умови ---------- */
const dRq=q=>({v:qNum(q), ast:qAst(q)});
const dFmt=q=>fmlText(qAst(q));
function dRootsParts(roots){
  if(roots.length===1) return [{g:'x'},{g:'='},{f:roots[0].ast}];
  return [{x:'1'},{g:'='},{f:roots[0].ast},{g:';',c:'dsemi'},{x:'2'},{g:'='},{f:roots[1].ast}];
}
// x = (m ± √D)/den з додатним знаменником; sg — знак перед коренем
function dIrrRoot(mb, D, twoA, sg){
  const neg=twoA.n<0, m=neg?qNeg(mb):mb, den=neg?qNeg(twoA):twoA, s=neg?-sg:sg;
  const r=F.root(2, qAst(D));
  const num = qIsZero(m) ? (s<0 ? F.neg(r) : r) : (s<0 ? F.sub(qAst(m), r) : F.add(qAst(m), r));
  return {v:(qNum(m)+s*Math.sqrt(qNum(D)))/qNum(den), ast: qEq(den,Q(1)) ? num : F.div(num, qAst(den))};
}
// квадратна умова: рядки-записи і корені
function domQuad(p, rel){
  const c=p[0], b=p[1], a=p[2], X=F.x();
  const rows=[]; let roots=[];
  rows.push({parts:[{f:polyAst(p)},{g:'='},{f:F.num(0)}],
    text:`Знайдемо, при яких x вираз ${fmlText(polyAst(p))} дорівнює нулю — ${rel==='≠'?'саме ці x доведеться виключити':'ці точки поділять пряму на проміжки, де вираз зберігає знак'}.`});
  if(qIsZero(b) && qIsZero(c)){
    rows.push({parts:[{g:'x'},{g:'='},{f:F.num(0)}], text:`${fmlText(polyAst(p))} = 0 лише тоді, коли x = 0.`});
    roots=[dRq(Q(0))];
  } else if(qIsZero(b)){
    const k=qDiv(qNeg(c),a);
    rows.push({parts:[{f:F.pow(X,2)},{g:'='},{f:qAst(k)}],
      text:`Неповне рівняння: переносимо число в праву частину${qEq(a,Q(1))?'':' і ділимо на '+dFmt(a)} — x² = ${dFmt(k)}.`});
    if(k.n<0){
      rows.push({parts:[{w:'коренів немає'}], text:`Квадрат числа не буває від’ємним, тому x² = ${dFmt(k)} не має коренів.`});
    } else {
      const s=qSqrt(k), sAst = s ? qAst(s) : F.root(2, qAst(k)), v=Math.sqrt(qNum(k));
      rows.push({parts:[{g:'x'},{g:'='},{g:'±'},{f:sAst}], text:`Два корені — протилежні числа: x = ±${fmlText(sAst)}.`});
      roots=[{v:-v, ast:F.neg(sAst)}, {v, ast:sAst}];
    }
  } else if(qIsZero(c)){
    const inner=polyAst([b,a]), r2=qDiv(qNeg(b),a);
    rows.push({parts:[{f:F.mul(X, F.paren(inner), true)},{g:'='},{f:F.num(0)}], text:'Неповне рівняння: виносимо x за дужки.'});
    roots=[dRq(Q(0)), dRq(r2)].sort((u,w)=>u.v-w.v);
    rows.push({parts:dRootsParts(roots), text:`Добуток дорівнює нулю, коли хоч один множник — нуль: x = 0 або ${fmlText(inner)} = 0, тобто x = ${dFmt(r2)}.`});
  } else {
    const D=qSub(qMul(b,b), qMul(Q(4),qMul(a,c)));
    const dAst=F.sub(F.pow(qAstP(b),2), F.mul(F.mul(F.num(4), qAstP(a)), qAstP(c)));
    rows.push({parts:[{g:'D'},{g:'='},{f:dAst},{g:'='},{f:qAst(D)}],
      text:`Рахуємо дискримінант: D = b² − 4ac = ${fmlText(dAst)} = ${dFmt(D)}.`});
    const mb=qNeg(b), twoA=qMul(Q(2),a);
    if(D.n<0){
      rows.push({parts:[{g:'D'},{g:'<'},{f:F.num(0)},{w:'коренів немає'}], text:'Дискримінант від’ємний — рівняння не має коренів.'});
    } else if(D.n===0){
      const r=qDiv(mb,twoA);
      rows.push({parts:[{g:'x'},{g:'='},{f:F.div(qAst(mb), qAst(twoA))},{g:'='},{f:qAst(r)}], text:`D = 0 — один корінь: x = −b / 2a = ${dFmt(r)}.`});
      roots=[dRq(r)];
    } else {
      rows.push({parts:[{x:'1,2'},{g:'='},{f:F.div(F.pm(qAst(mb), F.root(2,qAst(D))), qAst(twoA))}],
        text:'D > 0 — рівняння має два корені: x₁,₂ = (−b ± √D) / 2a.'});
      const s=qSqrt(D);
      roots = s ? [dRq(qDiv(qSub(mb,s),twoA)), dRq(qDiv(qAdd(mb,s),twoA))]
                : [dIrrRoot(mb,D,twoA,-1), dIrrRoot(mb,D,twoA,1)];
      roots.sort((u,w)=>u.v-w.v);
      rows.push({parts:dRootsParts(roots),
        text:`Корені: x₁ = ${fmlText(roots[0].ast)}, x₂ = ${fmlText(roots[1].ast)}${s?'':' (√D не добувається націло — лишаємо корінь у записі)'}.`});
    }
  }
  if(rel==='≠'){
    rows.push(roots.length
      ? {parts:roots.flatMap((r,i)=>[...(i?[{g:';',c:'dsemi'}]:[]),{g:'x'},{g:'≠'},{f:r.ast}]), res:true,
         text:`Отже, вираз не дорівнює нулю при всіх x, крім ${roots.map(r=>fmlText(r.ast)).join(' і ')}.`}
      : {parts:[{w:'вираз ніколи не дорівнює 0 — обмежень немає'}], res:true,
         text:'Коренів немає — знаменник ніколи не дорівнює нулю, тож ця умова нічого не виключає.'});
  }
  return {rows, roots};
}

// Корені → відрізки прямої, де умова виконується. Перевіряємо кожен проміжок і
// кожну точку окремо; сусідні «так» зливаються в один проміжок.
function domSat(c){
  return x=>{ const v=polyEval(c.poly,x); return c.rel==='≠' ? Math.abs(v)>D_EPS : c.rel==='≥' ? v>=-D_EPS : v>D_EPS; };
}
function domPieces(pts, sat){
  const n=pts.length, el=[];
  for(let i=0;i<=n;i++){
    const x = n===0 ? 0 : i===0 ? pts[0].v-1 : i===n ? pts[n-1].v+1 : (pts[i-1].v+pts[i].v)/2;
    el.push({gap:true, i, ok:sat(x)});
    if(i<n) el.push({gap:false, i, ok:sat(pts[i].v)});
  }
  const runs=[]; let run=null;
  el.forEach(e=>{ if(e.ok){ if(!run) run={s:e}; run.e=e; } else if(run){ runs.push(run); run=null; } });
  if(run) runs.push(run);
  return runs.map(({s,e})=>({
    l: s.gap ? (s.i===0 ? null : pts[s.i-1]) : pts[s.i], li: !s.gap,
    r: e.gap ? (e.i===n ? null : pts[e.i]) : pts[e.i], ri: !e.gap,
  }));
}
function domUniq(list){
  const out=[];
  list.slice().sort((a,b)=>a.v-b.v).forEach(p=>{ if(!out.length || Math.abs(out[out.length-1].v-p.v)>D_EPS) out.push(p); });
  return out;
}
// проміжки → запис «(−∞; 2] ∪ [3; +∞)»
function domIntervalParts(pieces){
  if(!pieces.length) return [{g:'∅'}];
  const out=[];
  pieces.forEach((pc,i)=>{
    if(i) out.push({g:'∪', c:'dcup'});
    if(pc.l && pc.l===pc.r){ out.push({g:'{'},{f:pc.l.ast},{g:'}'}); return; }
    out.push({g: pc.l && pc.li ? '[' : '('});
    out.push(pc.l ? {f:pc.l.ast} : {g:'−∞'});
    out.push({g:';', c:'dsemi'});
    out.push(pc.r ? {f:pc.r.ast} : {g:'+∞'});
    out.push({g: pc.r && pc.ri ? ']' : ')'});
  });
  return out;
}
function domIntervalText(pieces){
  if(!pieces.length) return '∅';
  return pieces.map(pc=> pc.l && pc.l===pc.r ? `{${fmlText(pc.l.ast)}}`
    : `${pc.l&&pc.li?'[':'('}${pc.l?fmlText(pc.l.ast):'−∞'}; ${pc.r?fmlText(pc.r.ast):'+∞'}${pc.r&&pc.ri?']':')'}`).join(' ∪ ');
}

/* ---------- 3) Модель і кроки ---------- */
function buildDomainModel(text){
  const ast=parseFormula(text);
  const dangers=domCollect(ast);
  const conds=domConditions(dangers);
  const m={ast, dangers, conds, steps:[]};

  conds.forEach((c,ci)=>{
    c.ci=ci; c.sat=domSat(c);
    if(polyDeg(c.poly)===1){
      c.kind='lin';
      c.rows=buildLinearRows({a:qNum(c.poly[1]), b:qNum(c.poly[0])}, {a:0,b:0}, {rel:c.rel});
      c.rows.forEach(r=>{ r.done=false; });
      c.roots=[dRq(qDiv(qNeg(c.poly[0]), c.poly[1]))];
    } else {
      c.kind='quad';
      const q=domQuad(c.poly, c.rel); c.rows=q.rows; c.roots=q.roots;
    }
    c.pts=domUniq(c.roots);
    c.pieces=domPieces(c.pts, c.sat);
    if(c.rel!=='≠'){
      const signs = c.kind==='quad' ? domSigns(c) : null;
      c.line={pts:c.pts, marks:c.pts.map(p=>c.sat(p.v)?'fill':'hole'), signs,
        hatch:c.pieces.filter(pc=>!(pc.l&&pc.l===pc.r)).map(pc=>({l:pc.l, r:pc.r, level:0, cls:'lv'+ci}))};
      c.resParts=[{g:'x'},{g:'∈'},...domIntervalParts(c.pieces)];
    }
  });

  // спільна пряма й відповідь
  const all=domUniq(conds.flatMap(c=>c.roots));
  const satAll=x=>conds.every(c=>c.sat(x));
  const ans=domPieces(all, satAll);
  m.finalLine={pts:all, marks:all.map(p=>satAll(p.v)?'fill':'hole'),
    hatch:conds.flatMap((c,ci)=>domPieces(all,c.sat).filter(pc=>!(pc.l&&pc.l===pc.r)).map(pc=>({l:pc.l, r:pc.r, level:ci, cls:'lv'+ci}))),
    res:ans};
  m.ansParts=[{g:'D'},{g:'('},{g:'y'},{g:')'},{g:'='},...domIntervalParts(ans)];
  m.ansText=domIntervalText(ans);

  const S_=m.steps;
  S_.push({ph:'write', text:`Записуємо функцію y = ${fmlText(ast)}. Шукаємо всі x, при яких її можна обчислити, — це і є область визначення D(y).`});
  dangers.forEach((d,di)=>S_.push({ph:'danger', di, text:domDangerText(d)}));
  if(conds.length){
    m.sysStep=S_.length;
    const merged=conds.filter(c=>c.merged).map(c=>`${fmlText(c.expr)} > 0`);
    S_.push({ph:'sys', text:(conds.length>1
      ? 'Усі умови мають виконуватися одночасно, тому записуємо їх системою. Кожен вираз переноситься з формули у свій рядок.'
      : 'Записуємо умову: вираз переноситься з формули.')
      + (merged.length ? ` Той самий вираз трапився двічі (≥ 0 і ≠ 0) — разом це ${merged.join(', ')}.` : '')});
    conds.forEach((c,ci)=>{
      c.rowSteps=c.rows.map((r,j)=>{ S_.push({ph:'row', ci, j, text:(j===0?`Умова ${D_CIRC[ci]}. `:'')+r.text}); return S_.length-1; });
      if(c.line){
        c.lineStep=S_.length;
        S_.push({ph:'cline', ci, text:domLineText(c)});
      }
    });
    if(conds.length>1 || !conds[0].line){
      m.finalStep=S_.length;
      S_.push({ph:'final', text: conds.length>1
        ? 'Накладаємо розв’язки всіх умов на одну пряму. Підходять лише ті x, де є штрихування від кожної умови, — там проводимо зелену смугу.'
        : 'Позначаємо на прямій: точки, де знаменник дорівнює нулю, виколюємо, а решта прямої підходить.'});
    }
  }
  m.ansStep=S_.length;
  S_.push({ph:'ans', text: conds.length
    ? `Відповідь: D(y) = ${m.ansText}.`
    : `Обмежень немає — функцію можна обчислити при будь-якому x: D(y) = ${m.ansText}.`});
  return m;
}
// знаки квадратного тричлена на проміжках між коренями
function domSigns(c){
  const n=c.pts.length, s=[];
  for(let i=0;i<=n;i++){
    const x = n===0 ? 0 : i===0 ? c.pts[0].v-1 : i===n ? c.pts[n-1].v+1 : (c.pts[i-1].v+c.pts[i].v)/2;
    s.push(polyEval(c.poly,x)>0 ? '+' : '−');
  }
  return s;
}
function domDangerText(d){
  const t=d.expr ? fmlText(d.expr) : '';
  switch(d.kind){
    case 'den':    return `Знаменник ${t} не може дорівнювати нулю — на нуль ділити не можна. Умова: ${t} ≠ 0.`;
    case 'root':   return `Корінь парного степеня добувається лише з невід’ємного числа. Умова: ${t} ≥ 0.`;
    case 'rootden':return `Корінь стоїть у знаменнику: під ним має бути невід’ємне число, а сам корінь не може дорівнювати нулю. Тому умова строга: ${t} > 0.`;
    case 'rootdenodd': return `Корінь непарного степеня добувається з будь-якого числа, але він стоїть у знаменнику, тож не може бути нулем. Умова: ${t} ≠ 0.`;
    case 'negpow': {
      const e=-constInt(d.node.e), base=['x','num'].includes(d.expr.t) ? t : `(${t})`;
      return `Від’ємний показник означає дріб: ${fmlText(d.node)} = 1/${base}${String(e).split('').map(ch=>SUPS[ch]).join('')}. Тому основа не може дорівнювати нулю: ${t} ≠ 0.`;
    }
    case 'odd':    return 'Корінь непарного степеня можна добувати з будь-якого числа, навіть від’ємного, — тут обмежень немає.';
  }
  return '';
}
function domLineText(c){
  const strict=c.rel==='>';
  const one = c.pts.length===1;
  const dots = c.pts.length ? ` ${one?'Точку':'Точки'} ${strict?'виколюємо (нерівність строга)':'зафарбовуємо (нерівність нестрога — рівність дозволена)'}.` : '';
  const how = c.kind==='quad'
    ? (c.pts.length ? ' Розставляємо знаки виразу на проміжках і штрихуємо ті, де «+».' : ' Коренів немає, тож вираз усюди одного знака.')
    : '';
  return `Позначаємо розв’язок умови ${D_CIRC[c.ci]} на числовій прямій.${how}${dots} Виходить x ∈ ${domIntervalText(c.pieces)}.`;
}

/* ---------- 4) Рендер кроку ---------- */
function domParts(parts, pen){
  return parts.map(p=>{
    if(p.f) return `<span class="dp">${renderFormula(p.f,pen)}</span>`;
    if(p.x) return `<span class="dp dxi">${hwGlyphs('x',pen)}<span class="dsub">${hwGlyphs(p.x,pen)}</span></span>`;
    if(p.w) return `<span class="dp dword hwa"${hwTick(pen,'hwfade',0.3,3)}>${esc(p.w)}</span>`;
    return `<span class="dp${p.c?' '+p.c:''}">${hwGlyphs(p.g,pen)}</span>`;
  }).join('');
}
const dPen=on=>on ? {writing:true, order:0} : {writing:false};
const dMk=d=>d.ci!=null ? 'mk'+d.ci : 'mkn';

// Розклад польотів у систему: спершу дужка, далі вираз за виразом — летить,
// приземляється, дописується «≠ 0», і лише тоді стартує наступний.
function domSysSchedule(m){
  const FLY=0.85;
  let t = m.conds.length>1 ? HW_DUR+0.12 : 0.12;
  return m.conds.map(()=>{
    const start=t, land=t+FLY, relOrder=Math.ceil(land/HW_STEP);
    t=(relOrder+1)*HW_STEP+HW_DUR+0.12;
    return {start, land, relOrder, FLY};
  });
}

function domView(m, ctx){
  const i=ctx.index, st=ctx.step, anim=ctx.anim;
  let h='<div class="dsheet" id="dsheet">';

  // формула з обведеними небезпечними місцями
  const shown = st.ph==='write' ? 0 : st.ph==='danger' ? st.di+1 : m.dangers.length;
  const marks={};
  for(let k=0;k<shown;k++){
    const d=m.dangers[k], isNew = st.ph==='danger' && st.di===k;
    marks[d.fid]={cls:dMk(d)+(isNew?' mnew':'')};      // номер — у підказці під рамкою, не в самій формулі
  }
  const p0=dPen(i===0);
  h+=`<div class="dline${i===0?' dcur':''}"><span class="fml dfx">${hwGlyphs('y',p0)}<span class="fo">${hwGlyphs('=',p0)}</span>${renderFormula(m.ast,p0,{marks})}</span></div>`;
  // підказки — стовпчиком під формулою; з рамкою їх зв'язує колір і номер умови.
  // Однакова підказка (той самий вираз, та сама причина) пишеться один раз.
  if(shown){
    const hints=[];
    for(let k=0;k<shown;k++){
      const d=m.dangers[k], key=(d.ci!=null?d.ci:'n')+d.kind, isNew = st.ph==='danger' && st.di===k;
      const old=hints.find(x=>x.key===key);
      if(old){ old.isNew = old.isNew || isNew; old.again = old.again || isNew; }
      else hints.push({key, d, isNew});
    }
    h+='<div class="dhints">';
    hints.forEach(({d,isNew,again})=>{
      const anim = isNew ? ` style="animation:${again?'hintAgain .6s ease .2s':'hwfade .4s ease .35s both'}"` : '';
      h+=`<span class="dhint ${dMk(d)}${isNew?' hwa':''}"${anim}><b>${d.ci!=null?D_CIRC[d.ci]:'✓'}</b> ${D_HINT[d.kind]}</span>`;
    });
    h+='</div>';
  }

  // система умов
  if(m.sysStep!=null && i>=m.sysStep){
    const cur=i===m.sysStep, fly=cur && anim && anim.kind==='sys';
    const sch = fly ? domSysSchedule(m) : null;
    const pen = dPen(cur && !fly);
    let brace='';
    if(m.conds.length>1){
      brace=`<span class="dbrace hwa"${cur?` style="animation:hwwipeV ${HW_DUR}s ease 0s both"`:''}><svg viewBox="0 0 20 100" preserveAspectRatio="none"><path d="M18,2 C9,2 11,14 10,30 C9,44 8,48 2,50 C8,52 9,56 10,70 C11,86 9,98 18,98" vector-effect="non-scaling-stroke"/></svg></span>`;
      if(pen.writing) pen.order=2;
    }
    let rows='';
    m.conds.forEach((c,ci)=>{
      const rp = fly ? {writing:true, order:sch[ci].relOrder} : pen;
      const ex = renderFormula(c.expr, fly ? {writing:false} : pen);
      rows+=`<div class="dsrow"><span class="fml dsx" data-ci="${ci}"${fly?' style="opacity:0"':''}>${ex}</span>`
          + `<span class="fml dsrel">${hwGlyphs(c.rel,rp)}${hwGlyphs('0',rp)}</span><span class="dtag mk${ci}">${D_CIRC[ci]}</span></div>`;
    });
    h+=`<div class="dsys${cur?' dcur':''}">${brace}<div class="dsrows">${rows}</div></div>`;
  }

  // розв'язок кожної умови — окремий блок
  let blocks='';
  m.conds.forEach((c,ci)=>{
    if(i<c.rowSteps[0]) return;
    let upto=-1, cur=-1;
    c.rowSteps.forEach((s,j)=>{ if(s<=i) upto=j; if(s===i) cur=j; });
    let b=`<div class="dblock"><div class="dbttl"><span class="dtag mk${ci}">${D_CIRC[ci]}</span> ${esc(fmlText(c.expr))} ${c.rel} 0</div>`;
    if(c.kind==='lin'){
      const animating = !!(anim && anim.kind==='lin' && anim.ci===ci && anim.toStep===cur);
      b+=`<div class="eqsolve dlin" data-block="${ci}">${eqRowsHtml(c.rows, upto, cur, animating)}</div>`;
    } else {
      for(let j=0;j<=upto;j++){
        const r=c.rows[j], isCur=j===cur;
        b+=`<div class="drow${isCur?' cur':''}${r.res?' dres':''}"><span class="fml">${domParts(r.parts, dPen(isCur))}</span></div>`;
      }
    }
    if(c.lineStep!=null && i>=c.lineStep){
      const lc=i===c.lineStep, pen=dPen(lc);
      b+=`<div class="dlinewrap${lc?' dcur':''}">${numLine(c.line,pen)}<div class="drow dres"><span class="fml">${domParts(c.resParts,pen)}</span></div></div>`;
    }
    blocks+=b+'</div>';
  });
  if(blocks) h+=`<div class="dblocks">${blocks}</div>`;

  // спільна пряма і відповідь
  if(m.finalStep!=null && i>=m.finalStep){
    const cur=i===m.finalStep;
    h+=`<div class="dfinal${cur?' dcur':''}">${numLine(m.finalLine, dPen(cur))}</div>`;
  }
  if(i>=m.ansStep){
    const cur=i===m.ansStep;
    h+=`<div class="dans${cur?' dcur':''}"><span class="fml">${domParts(m.ansParts, dPen(cur))}</span></div>`;
  }
  return h+'</div>';
}

/* ---------- 5) Польоти ---------- */
function domPrepare(m, from, to){
  if(to!==from+1) return null;
  const st=m.steps[to];
  if(st.ph==='sys') return {kind:'sys'};
  if(st.ph==='row'){
    const c=m.conds[st.ci], r=c.rows[st.j];
    if(c.kind==='lin' && (r.type==='move'||r.type==='combine')){
      const blk=document.querySelector(`.dlin[data-block="${st.ci}"]`);
      if(blk) return {kind:'lin', ci:st.ci, type:r.type, toStep:st.j, srcRects:captureEqRects(st.j-1, blk)};
    }
  }
  return null;
}
// вираз летить із формули у свій рядок системи (оригінал лишається на місці)
function domFlySystem(m, sheet){
  const sch=domSysSchedule(m);
  const c=sheet.getBoundingClientRect();
  const rel=el=>{ const r=el.getBoundingClientRect(); return {left:r.left-c.left, top:r.top-c.top}; };
  sheet.querySelectorAll('.dclone').forEach(e=>e.remove());
  m.conds.forEach((cd,ci)=>{
    const s=sch[ci];
    const src=sheet.querySelector(`.dfx [data-fid="${cd.expr.fid}"]`);
    const tgt=sheet.querySelector(`.dsx[data-ci="${ci}"]`);
    if(!tgt) return;
    const tgtIn=tgt.firstElementChild;
    if(!src || !tgtIn){ tgt.style.opacity='1'; return; }
    const sR=rel(src), tR=rel(tgtIn);
    const clone=document.createElement('span');
    clone.className='fml dclone';
    clone.innerHTML=src.outerHTML;
    clone.querySelectorAll('.fbadge').forEach(e=>e.remove());
    clone.querySelectorAll('.fmark').forEach(e=>{ e.className=e.className.replace(/\b(fmark|mnew|mk\w+)\b/g,''); });
    clone.style.left=sR.left+'px'; clone.style.top=sR.top+'px';
    sheet.appendChild(clone);
    clone.style.transition=`transform ${s.FLY}s cubic-bezier(.45,.02,.25,1) ${s.start.toFixed(2)}s`;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ clone.style.transform=`translate(${tR.left-sR.left}px,${tR.top-sR.top}px)`; }));
    setTimeout(()=>{ tgt.style.opacity='1'; clone.remove(); }, s.land*1000);
  });
}
function domAnimate(m, ctx){
  const sheet=document.getElementById('dsheet'); if(!sheet) return;
  const a=ctx.anim;
  if(a && a.kind==='sys') domFlySystem(m, sheet);
  if(a && a.kind==='lin') runEqAnim({rows:m.conds[a.ci].rows}, {anim:a}, sheet.querySelector(`.dlin[data-block="${a.ci}"]`));
  const cur=[...sheet.querySelectorAll('.dcur,.eqrow.cur,.drow.cur')].pop();
  if(cur && cur.scrollIntoView) cur.scrollIntoView({block:'nearest'});
}

/* ---------- 6) Панель умови: поле, кнопки-вставки, живе прев'ю ---------- */
function domPreviewHtml(text){
  try{
    const ast=parseFormula(text);
    return `<span class="fml">${hwGlyphs('y',{})}<span class="fo">${hwGlyphs('=',{})}</span>${renderFormula(ast,{writing:false})}</span>`;
  }catch(e){
    return `<span class="dprev-err">${esc(typeof e==='string' ? e : 'Не вдалося прочитати формулу.')}</span>`;
  }
}
function domPreview(){
  const el=document.getElementById('i_f'), out=document.getElementById('dprev');
  if(el && out) out.innerHTML=domPreviewHtml(el.value);
}
// вставка фрагмента в позицію курсора; «|» — де лишити курсор
function domIns(s){
  const el=document.getElementById('i_f'); if(!el) return;
  const a=el.selectionStart!=null ? el.selectionStart : el.value.length, b=el.selectionEnd!=null ? el.selectionEnd : a;
  const k=s.indexOf('|'), ins=s.replace('|','');
  el.value=el.value.slice(0,a)+ins+el.value.slice(b);
  const pos=a+(k<0 ? ins.length : k);
  el.focus(); el.setSelectionRange(pos,pos);
  domPreview();
}
const D_PAL=[['√','sqrt(|)'],['∛','root(3, |)'],['x²','^2'],['xⁿ','^'],['( )','(|)'],['a/b','/'],['x','x']];

registerTool('domain', {
  name:'Область визначення функції', icon:'🔎', color:'var(--primary)', bg:'var(--primary-l)',
  errorHint:'Не вдалося прочитати функцію. Приклад: sqrt(x - 2)/(x^2 - 9).',
  build: cfg => buildDomainModel(cfg.f),
  view: domView,
  prepare: domPrepare,
  animate: domAnimate,
  inputs: c => {
    const f = c.f ?? 'sqrt(x - 2)/(x^2 - 9)';
    return `
    <div class="field"><label class="fl">Функція y =</label>
      <input id="i_f" value="${esc(f).replace(/"/g,'&quot;')}" oninput="domPreview()" autocomplete="off" spellcheck="false">
      <div class="dpal">${D_PAL.map(([l,s])=>`<button type="button" onclick="domIns('${s}')">${l}</button>`).join('')}</div>
    </div>
    <div id="dprev">${domPreviewHtml(f)}</div>
    <p class="helper">Корінь — sqrt( ), корінь 3-го степеня — root(3, …), степінь — ^, дріб — /. Під коренем і в знаменнику — многочлен до x².</p>`;
  },
  read: v => ({f:v('i_f')}),
  summary: cfg => 'y = '+cfg.f,
  editorFields: cfg => `
    <div class="field"><label class="fl">Функція (наприклад sqrt(x - 2)/(x^2 - 9))</label><input id="f_f" value="${esc(cfg.f||'').replace(/"/g,'&quot;')}"></div>
    <p class="helper">Дроби, корені (sqrt, root(n, …)), цілі степені; під коренем і в знаменнику — многочлен до 2-го степеня.</p>`,
  readEditor: v => ({f:v('f_f')}),
});
