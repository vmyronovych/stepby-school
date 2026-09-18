/* =========================================================
   ФОРМУЛИ: текст → дерево (AST) → рукописний рендер
   ---------------------------------------------------------
   Спільний модуль для інструментів старших класів (корені, степені,
   дроби з виразами). Нічого не знає про конкретні інструменти.

   Синтаксис введення:  sqrt(x - 2)   root(3, x - 1)   x^2   x^-2   (x+1)/(x^2-9)
   Псевдоніми:          √  ∛  ²  ³  −  ×  ·  ÷      неявне множення: 2x, 3(x-1), x(x-5)

   Вузли AST:  num{q} · x · add/sub/mul{a,b} · neg{a} · paren{a} · div{a,b}
               pow{a,e} · root{n,a} · pm{a,b} (лише для побудованих формул: «±»)
   Кожен вузол розібраної формули має стійкий fid — за ним інструмент
   підсвічує підвираз і знаходить його в DOM (data-fid) для польотів.
   ========================================================= */

/* ---------- Раціональні числа: точна арифметика без округлень ---------- */
function Q(n,d){
  d = d==null ? 1 : d;
  if(d===0) throw 'На нуль ділити не можна.';
  if(d<0){ n=-n; d=-d; }
  const g=gcd(n,d); return {n:n/g, d:d/g};
}
function qFromStr(s){ const [i,f='']=s.split('.'); return Q(parseInt(i+f||'0',10), Math.pow(10,f.length)); }
const qAdd=(a,b)=>Q(a.n*b.d+b.n*a.d, a.d*b.d);
const qNeg=a=>Q(-a.n, a.d);
const qSub=(a,b)=>qAdd(a, qNeg(b));
const qMul=(a,b)=>Q(a.n*b.n, a.d*b.d);
const qDiv=(a,b)=>Q(a.n*b.d, a.d*b.n);
const qNum=a=>a.n/a.d;
const qIsZero=a=>a.n===0;
const qEq=(a,b)=>a.n===b.n && a.d===b.d;
const qKey=a=>a.n+'/'+a.d;
// точний квадратний корінь, якщо чисельник і знаменник — повні квадрати; інакше null
function qSqrt(a){
  if(a.n<0) return null;
  const rn=Math.round(Math.sqrt(a.n)), rd=Math.round(Math.sqrt(a.d));
  return (rn*rn===a.n && rd*rd===a.d) ? Q(rn,rd) : null;
}

/* ---------- Будівники вузлів (для формул, які складає сам інструмент) ---------- */
const F={
  num:q=>({t:'num', q:typeof q==='number'?Q(q):q}),
  x:()=>({t:'x'}),
  add:(a,b)=>({t:'add',a,b}), sub:(a,b)=>({t:'sub',a,b}), pm:(a,b)=>({t:'pm',a,b}),
  mul:(a,b,imp)=>({t:'mul',a,b,imp:!!imp}), neg:a=>({t:'neg',a}), paren:a=>({t:'paren',a}),
  div:(a,b)=>({t:'div',a,b}), pow:(a,e)=>({t:'pow',a,e:typeof e==='number'?F.num(e):e}),
  root:(n,a)=>({t:'root',n,a}),
};
// раціональне число → вузол: 3 → «3», −1/2 → «−½» (дріб рискою)
function qAst(q){
  const m=Math.abs(q.n);
  const body = q.d===1 ? F.num(Q(m)) : F.div(F.num(Q(m)), F.num(Q(q.d)));
  return q.n<0 ? F.neg(body) : body;
}
// у дужки, якщо вузол починається з мінуса (для множення й степеня: (−5)², 4·(−2))
function qAstP(q){ const a=qAst(q); return q.n<0 ? F.paren(a) : a; }

/* ---------- Розбір тексту ---------- */
function tokenizeFormula(src){
  const s=String(src==null?'':src)
    .replace(/[−–—]/g,'-').replace(/[×·*]/g,'*').replace(/÷/g,'/')
    .replace(/\s+/g,'').replace(/X/g,'x').replace(/^y=/,'');
  const toks=[]; let i=0;
  while(i<s.length){
    const c=s[i];
    if(/[0-9.]/.test(c)){
      let j=i; while(j<s.length && /[0-9.]/.test(s[j])) j++;
      const raw=s.slice(i,j);
      if(!/^\d+(\.\d+)?$/.test(raw)) throw `Не можу прочитати число «${raw}».`;
      toks.push({k:'num', v:raw}); i=j; continue;
    }
    if(s.startsWith('sqrt',i)){ toks.push({k:'fn',v:'sqrt'}); i+=4; continue; }
    if(s.startsWith('cbrt',i)){ toks.push({k:'fn',v:'cbrt'}); i+=4; continue; }
    if(s.startsWith('root',i)){ toks.push({k:'fn',v:'root'}); i+=4; continue; }
    if(c==='√'){ toks.push({k:'fn',v:'sqrt'}); i++; continue; }
    if(c==='∛'){ toks.push({k:'fn',v:'cbrt'}); i++; continue; }
    if(c==='²'||c==='³'){ toks.push({k:'sup',v:c==='²'?2:3}); i++; continue; }
    if(c==='x'){ toks.push({k:'x'}); i++; continue; }
    if('+-*/^(),'.includes(c)){ toks.push({k:'op',v:c}); i++; continue; }
    throw `Незнайомий символ «${c}». Змінна — x, корінь — sqrt( ), степінь — ^.`;
  }
  return toks;
}

function parseFormula(src){
  const toks=tokenizeFormula(src);
  if(!toks.length) throw 'Введіть функцію. Приклад: sqrt(x - 2)/(x^2 - 9).';
  let p=0;
  const peek=()=>toks[p];
  const isOp=v=>peek() && peek().k==='op' && peek().v===v;
  const expect=v=>{ if(!isOp(v)) throw v===')' ? 'Бракує закривної дужки «)».' : `Очікую «${v}».`; p++; };
  const startsAtom=()=>{ const t=peek(); return !!t && (t.k==='num'||t.k==='x'||t.k==='fn'||(t.k==='op'&&t.v==='(')); };

  function expr(){
    let a=term();
    while(isOp('+')||isOp('-')){ const o=toks[p++].v; a={t:o==='+'?'add':'sub', a, b:term()}; }
    return a;
  }
  function term(){
    let a=unary();
    for(;;){
      if(isOp('*')){ p++; a={t:'mul', a, b:unary()}; }
      else if(isOp('/')){ p++; a={t:'div', a, b:unary()}; }
      else if(startsAtom()){ a={t:'mul', a, b:power(), imp:true}; }   // 2x, 3(x-1)
      else break;
    }
    return a;
  }
  function unary(){
    if(isOp('-')){ p++; return {t:'neg', a:unary()}; }
    if(isOp('+')){ p++; return unary(); }
    return power();
  }
  function power(){
    let a=atom();
    for(;;){
      const t=peek();
      if(t && t.k==='sup'){ p++; a={t:'pow', a, e:F.num(t.v)}; continue; }
      if(isOp('^')){
        p++;
        let e;
        if(isOp('-')){ p++; e={t:'neg', a:atom()}; } else e=atom();
        if(e.t==='paren') e=e.a;                   // x^(-2): дужки лише групують показник
        a={t:'pow', a, e}; continue;
      }
      return a;
    }
  }
  function atom(){
    const t=peek();
    if(!t) throw 'Вираз обривається — чогось бракує в кінці.';
    if(t.k==='num'){ p++; return {t:'num', q:qFromStr(t.v), raw:t.v}; }
    if(t.k==='x'){ p++; return {t:'x'}; }
    if(t.k==='op' && t.v==='('){ p++; const a=expr(); expect(')'); return {t:'paren', a}; }
    if(t.k==='fn'){
      p++;
      if(t.v==='root'){
        expect('(');
        const nt=peek();
        if(!nt || nt.k!=='num' || !/^\d+$/.test(nt.v) || +nt.v<2) throw 'Показник кореня — ціле число від 2. Приклад: root(3, x - 1).';
        p++; expect(',');
        const a=expr(); expect(')');
        return {t:'root', n:+nt.v, a};
      }
      const n = t.v==='cbrt' ? 3 : 2;
      if(isOp('(')){ p++; const a=expr(); expect(')'); return {t:'root', n, a}; }
      return {t:'root', n, a:atom()};              // √x, √2
    }
    if(t.k==='op' && t.v===')') throw 'Зайва закривна дужка «)».';
    throw `Не очікую «${t.v||t.k}» у цьому місці.`;
  }

  const ast=expr();
  if(p<toks.length){ const t=toks[p]; throw t.k==='op'&&t.v===')' ? 'Зайва закривна дужка «)».' : `Не очікую «${t.v||'²'}» у цьому місці.`; }
  let k=0;
  (function tag(n){ if(!n||typeof n!=='object') return; n.fid='f'+(k++); tag(n.a); tag(n.b); tag(n.e); })(ast);
  return ast;
}
const fStrip=n=>{ while(n && n.t==='paren') n=n.a; return n; };

/* ---------- Многочлени до 2-го степеня: [c0, c1, c2] з раціональних ---------- */
function polyTrim(p){ p=p.slice(); while(p.length>1 && qIsZero(p[p.length-1])) p.pop(); return p; }
const polyDeg=p=>polyTrim(p).length-1;
function polyAdd(a,b){ const r=[]; for(let i=0;i<Math.max(a.length,b.length);i++) r.push(qAdd(a[i]||Q(0), b[i]||Q(0))); return polyTrim(r); }
function polyMul(a,b){
  const r=Array(a.length+b.length-1).fill(null).map(()=>Q(0));
  a.forEach((x,i)=>b.forEach((y,j)=>{ r[i+j]=qAdd(r[i+j], qMul(x,y)); }));
  const t=polyTrim(r); return t.length>3 ? null : t;
}
const polyEval=(p,x)=>p.reduce((s,c,i)=>s+qNum(c)*Math.pow(x,i),0);
// сталий цілий показник (для x^2, x^-1); null, якщо показник не ціле число
function constInt(e){ const p=toPoly(e); if(!p || polyDeg(p)>0 || p[0].d!==1) return null; return p[0].n; }
// вузол → многочлен степеня ≤ 2 або null (корінь, ділення на вираз, степінь > 2)
function toPoly(n){
  switch(n.t){
    case 'num': return [n.q];
    case 'x': return [Q(0),Q(1)];
    case 'paren': return toPoly(n.a);
    case 'neg': { const a=toPoly(n.a); return a && a.map(qNeg); }
    case 'add': case 'sub': {
      const a=toPoly(n.a), b=toPoly(n.b); if(!a||!b) return null;
      return polyAdd(a, n.t==='sub' ? b.map(qNeg) : b);
    }
    case 'mul': { const a=toPoly(n.a), b=toPoly(n.b); return (a&&b) ? polyMul(a,b) : null; }
    case 'div': {
      const a=toPoly(n.a), b=toPoly(n.b);
      if(!a||!b||polyDeg(b)>0) return null;
      if(qIsZero(b[0])) throw 'У формулі є ділення на нуль.';
      return a.map(c=>qDiv(c,b[0]));
    }
    case 'pow': {
      const e=constInt(n.e); if(e==null||e<0||e>2) return null;
      const a=toPoly(n.a); if(!a) return null;
      let r=[Q(1)]; for(let i=0;i<e;i++){ r=polyMul(r,a); if(!r) return null; }
      return r;
    }
    default: return null;
  }
}
// многочлен → вузол у звичному записі: x² − 5x + 6
function polyAst(p){
  p=polyTrim(p);
  let out=null;
  for(let k=p.length-1;k>=0;k--){
    const c=p[k]; if(qIsZero(c) && !(k===0 && !out)) continue;
    const mag=Q(Math.abs(c.n), c.d);
    const base = k===0 ? null : (k===1 ? F.x() : F.pow(F.x(), k));
    const term = !base ? qAst(mag) : (qEq(mag,Q(1)) ? base : F.mul(qAst(mag), base, true));
    if(!out) out = c.n<0 ? F.neg(term) : term;
    else out = c.n<0 ? F.sub(out, term) : F.add(out, term);
  }
  return out || F.num(0);
}

/* ---------- Текстовий запис (для пояснень під аркушем) ---------- */
const SUPS={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻'};
function fmlText(n){
  const T=fmlText, simple=x=>['num','x','paren','root','pow'].includes(x.t);
  switch(n.t){
    case 'num': return n.raw || (n.q.d===1 ? String(n.q.n) : `${n.q.n}/${n.q.d}`);
    case 'x': return 'x';
    case 'add': return `${T(n.a)} + ${T(n.b)}`;
    case 'sub': return `${T(n.a)} − ${T(n.b)}`;
    case 'pm':  return `${T(n.a)} ± ${T(n.b)}`;
    case 'mul': return n.imp ? T(n.a)+T(n.b) : `${T(n.a)}·${T(n.b)}`;
    case 'neg': return '−'+T(n.a);
    case 'paren': return `(${T(n.a)})`;
    case 'div': { const a=fStrip(n.a), b=fStrip(n.b); return `${simple(a)?T(a):'('+T(a)+')'}/${simple(b)?T(b):'('+T(b)+')'}`; }
    case 'pow': { const e=constInt(n.e); return T(n.a) + (e!=null ? String(e).split('').map(ch=>SUPS[ch]).join('') : `^(${T(n.e)})`); }
    case 'root': { const a=fStrip(n.a), sign=n.n===2?'√':n.n===3?'∛':`${n.n}√`; return sign + (['num','x'].includes(a.t)?T(a):`(${T(a)})`); }
  }
  return '';
}

/* ---------- Рукописний рендер ----------
   pen — лічильник пера {writing, order}, спільний із hwGlyphs: формула
   пишеться строго по черзі. Порядок пера: показник кореня → гачок →
   дах → підкореневий вираз; дріб — чисельник → риска → знаменник;
   степінь — одразу після основи.
   opt.marks = {fid: {cls, badge}} — обведення підвиразів (з номером). */
function renderFormula(n, pen, opt){
  pen = pen || {writing:false};
  opt = opt || {};
  const R=x=>renderFormula(x, pen, opt);
  const op=ch=>`<span class="fo">${hwGlyphs(ch,pen)}</span>`;
  let inner;
  switch(n.t){
    case 'num': inner=hwGlyphs(fmlText(n), pen); break;
    case 'x':   inner=hwGlyphs('x', pen); break;
    case 'add': inner=R(n.a)+op('+')+R(n.b); break;
    case 'sub': inner=R(n.a)+op('−')+R(n.b); break;
    case 'pm':  inner=R(n.a)+op('±')+R(n.b); break;
    case 'mul': inner=R(n.a)+(n.imp?'':op('·'))+R(n.b); break;
    case 'neg': inner=hwGlyphs('−',pen)+R(n.a); break;
    case 'paren': inner=`<span class="fpar">${hwGlyphs('(',pen)}</span>${R(n.a)}<span class="fpar">${hwGlyphs(')',pen)}</span>`; break;
    case 'div': {
      const num=R(fStrip(n.a));
      const bar=`<span class="ffbar hwa"${hwTick(pen,'hwbar',0.28)}></span>`;
      inner=`<span class="ffn">${num}</span>${bar}<span class="ffd">${R(fStrip(n.b))}</span>`;
      break;
    }
    case 'pow': inner=R(n.a)+`<span class="fpow">${R(fStrip(n.e))}</span>`; break;
    case 'root': {
      const idx = n.n!==2 ? `<span class="ridx">${hwGlyphs(String(n.n),pen)}</span>` : '';
      const hook=`<span class="rhook hwa"${hwTick(pen,'hwwipe')}><svg viewBox="0 0 20 100" preserveAspectRatio="none"><path d="M1,62 L6,55 L11,97 L19.6,1" vector-effect="non-scaling-stroke"/></svg></span>`;
      const roof=`<span class="rbar hwa"${hwTick(pen,'hwbar',0.3)}></span>`;
      inner=`${idx}${hook}<span class="rbody">${roof}${R(fStrip(n.a))}</span>`;
      break;
    }
    default: inner='';
  }
  const mk = n.fid && opt.marks && opt.marks[n.fid];
  const cls = `fx fx-${n.t}` + (n.t==='div'?' ffrac':'') + (mk ? ' fmark '+(mk.cls||'') : '');
  const badge = mk && mk.badge ? `<span class="fbadge">${mk.badge}</span>` : '';
  return `<span class="${cls}"${n.fid?` data-fid="${n.fid}"`:''}>${inner}${badge}</span>`;
}
// формула як самостійний напис (обгортка задає шрифт і колір)
function formulaHtml(n, pen, opt){ return `<span class="fml">${renderFormula(n, pen, opt)}</span>`; }
