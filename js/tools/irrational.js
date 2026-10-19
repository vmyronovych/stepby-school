/* Ірраціональні рівняння: один квадратний або кубічний корінь у кожній частині
   або один корінь і лінійний вираз; також заміна t = √x.
   Корені й записи — зі спільних ядер. */
const IR_FORM='Підтримуються квадратні та кубічні корені. Для квадратних: √P(x) = ax + b або √P(x) = √Q(x). Для кубічних: ∛P(x) = число або ∛P(x) = ∛Q(x). Під коренем — многочлен до x²; корінь можна відокремити перенесенням доданків.';
const irSubPoly=(a,b)=>polyAdd(a,b.map(qNeg));
const irEq=(a,b)=>[{f:a},{g:'='},{f:b}];

// Відокремлюємо один корінь із коефіцієнтом +1; решта — лінійний вираз.
function irSide(ast){
  const n=fStrip(ast), p=toPoly(n);
  if(p && polyDeg(p)<=1) return {p, root:null};
  if(n.t==='root' && (n.n===2 || n.n===3)){
    const rad=toPoly(n.a);
    if(rad) return {p:[Q(0)], root:n, rad};
  }
  if(n.t==='add'||n.t==='sub'){
    const a=irSide(n.a), b=irSide(n.b);
    if(a.root && !b.root) return {p:polyAdd(a.p,n.t==='sub'?b.p.map(qNeg):b.p), root:a.root, rad:a.rad};
    if(n.t==='add' && !a.root && b.root) return {p:polyAdd(a.p,b.p), root:b.root, rad:b.rad};
  }
  throw IR_FORM;
}

// Межі та інтервали ОДЗ використовують наявне ядро області визначення.
function irCondition(p){
  let roots=[];
  if(polyDeg(p)===1) roots=[dRq(qDiv(qNeg(p[0]),p[1]))];
  if(polyDeg(p)===2) roots=domQuad(p,'≥').roots;
  return {poly:p, roots};
}
function irIntervals(conditions){
  // Різні близькі межі не можна зливати за допуском EPS.
  const pts=conditions.flatMap(c=>c.roots).sort((a,b)=>a.v-b.v)
    .filter((p,i,all)=>i===0 || p.v!==all[i-1].v);
  return domPieces(pts,x=>{
    const boundary=pts.find(p=>p.v===x);
    if(boundary){
      const exact=irExactRoot(boundary.ast);
      return conditions.every(c=>irPairSign(irExactPoly(c.poly,exact),exact.d)>=0);
    }
    return conditions.every(c=>polyEval(c.poly,x)>=0);
  });
}

// Точна перевірка у Q(√d). BigInt-дроби не округлюють знак кандидата.
const irRat=(n,d=1n)=>({n,d});
const irFromQ=q=>irRat(BigInt(q.n),BigInt(q.d));
const irAdd=(a,b)=>irRat(a.n*b.d+b.n*a.d,a.d*b.d);
const irNeg=a=>irRat(-a.n,a.d);
const irMul=(a,b)=>irRat(a.n*b.n,a.d*b.d);
const irDiv=(a,b)=>{ if(b.n===0n) throw 'На нуль ділити не можна.'; return irRat(a.n*b.d*(b.n<0n?-1n:1n),a.d*(b.n<0n?-b.n:b.n)); };
const irSign=a=>a.n<0n?-1:a.n>0n?1:0;
const irPair=q=>({a:q,b:irRat(0n)});
function irPairAdd(x,y){ return {a:irAdd(x.a,y.a),b:irAdd(x.b,y.b)}; }
function irPairMul(x,y,d){ return {a:irAdd(irMul(x.a,y.a),irMul(irMul(x.b,y.b),d)),b:irAdd(irMul(x.a,y.b),irMul(x.b,y.a))}; }
function irPairSign(x,d){
  const a=irSign(x.a), b=irSign(x.b);
  if(!b || !irSign(d)) return a;
  if(!a || a===b) return b;
  const diff=irAdd(irMul(x.a,x.a),irNeg(irMul(irMul(x.b,x.b),d)));
  return irSign(diff)*a;
}
function irExactRoot(ast){
  let d=irRat(0n);
  (function find(n){ if(n.t==='root') d=irFromQ(toPoly(n.a)[0]); if(n.a) find(n.a); if(n.b) find(n.b); })(ast);
  function read(n){
    if(n.t==='root') return {a:irRat(0n),b:irRat(1n)};
    if(n.t==='paren') return read(n.a);
    if(n.t==='neg'){const x=read(n.a);return {a:irNeg(x.a),b:irNeg(x.b)};}
    if(n.t==='add'||n.t==='sub'){ const x=read(n.a),y=read(n.b);return irPairAdd(x,n.t==='sub'?{a:irNeg(y.a),b:irNeg(y.b)}:y); }
    if(n.t==='div'){ const x=read(n.a),y=read(n.b);return {a:irDiv(x.a,y.a),b:irDiv(x.b,y.a)}; }
    return irPair(irFromQ(toPoly(n)[0]));
  }
  return {x:read(ast),d};
}
function irExactPoly(p,r){
  return p.slice().reverse().reduce((v,c)=>irPairAdd(irPairMul(v,r.x,r.d),irPair(irFromQ(c))),irPair(irRat(0n)));
}
function irSubstitute(n,x){
  if(n.t==='x') return F.paren(x);
  const out=Object.assign({},n); delete out.fid;
  for(const k of ['a','b','e']) if(n[k]) out[k]=irSubstitute(n[k],x);
  return out;
}

function buildIrrationalModel(text){
  if(typeof text!=='string'||text.split('=').length!==2) throw 'Введіть рівняння з одним знаком «=». Приклад: sqrt(x + 2) = x.';
  const original=text.split('=').map(parseFormula);
  if(!/x/i.test(text)) throw 'У рівнянні має бути змінна x.';
  let [l,r]=original.map(irSide);
  if(!l.root && r.root) [l,r]=[r,l];
  if(!l.root) throw IR_FORM;
  const right=irSubPoly(r.p,l.p);
  const degree=l.root.n, cube=degree===3;
  if(r.root && r.root.n!==degree) throw 'Використайте корені однакового степеня з обох боків: квадратні або кубічні. Змішані показники поки не підтримуються.';
  if(r.root && right.some(q=>!qIsZero(q))) throw 'Для двох коренів використайте форму sqrt(P(x)) = sqrt(Q(x)) або root(3, P(x)) = root(3, Q(x)) без додаткових доданків.';
  if(cube && !r.root && polyDeg(right)>0) throw 'Після піднесення лінійної правої частини до куба виникає рівняння третього степеня. Поки використайте сталу праву частину або кубічні корені з обох боків.';
  const rhs=r.root||polyAst(right);
  const m={steps:[],original,checks:[],roots:[],answer:[]};
  const add=(title,text,parts,extra={})=>m.steps.push(Object.assign({title,text,parts},extra));
  add('Ірраціональне рівняння','Ірраціональне рівняння містить змінну під знаком кореня. Записуємо початкову умову.',irEq(...original));
  const conditions=cube?[]:[irCondition(l.rad),...(r.root?[irCondition(r.rad)]:[])];
  if(cube) add('Що таке ОДЗ кубічного кореня','ОДЗ — область допустимих значень змінної. Кубічний корінь визначений для будь-якого дійсного підкореневого значення, зокрема від’ємного. Многочлени під цими коренями не обмежують ОДЗ.',[{g:'x'},{g:'∈'},...domIntervalParts(irIntervals([]))],{domainNote:true});
  conditions.forEach((c,i)=>add(i?'ОДЗ: друга умова':'Що таке ОДЗ',
    'ОДЗ — область допустимих значень змінної. За цих значень визначені обидві частини початкового рівняння. Під квадратним коренем має бути невід’ємний вираз.',
    [{f:polyAst(c.poly)},{g:'≥'},{f:F.num(0)}],{domainNote:i===0}));
  m.domain=irIntervals(conditions);
  if(!cube) add('ОДЗ рівняння',`Усі умови мають виконуватися одночасно. ОДЗ: x ∈ ${domIntervalText(m.domain)}.`,[{g:'x'},{g:'∈'},...domIntervalParts(m.domain)]);
  const finish=(parts,text)=>add('Відповідь',text,parts,{answer:true});
  if(!m.domain.length){ finish([{g:'∅'}],'ОДЗ порожня. Рівняння не має розв’язків.'); return m; }
  if(fmlText(original[0])!==fmlText(l.root)||fmlText(original[1])!==fmlText(rhs)){
    add('Відокремлюємо корінь','Переносимо доданки без кореня в іншу частину, змінюючи їхні знаки. Корінь залишаємо ліворуч.',irEq(l.root,rhs));
  }
  if(!r.root && !cube){
    add('Умова рівності','Квадратний корінь невід’ємний. Тому права частина також має бути ≥ 0. Це умова рівності, окрема від ОДЗ.',[{f:rhs},{g:'≥'},{f:F.num(0)}]);
    if(polyDeg(right)===0 && right[0].n<0){ finish([{g:'∅'}],'Квадратний корінь не може дорівнювати від’ємному числу. Розв’язків немає.'); return m; }
  }
  add(cube?'Підносимо обидві частини до куба':'Підносимо обидві частини до квадрата',
    cube?'Підносимо обидві частини до третього степеня. Це рівносильне перетворення для дійсних чисел: куб зберігає знак. Сторонні корені через це перетворення не виникають.'
      :'Підносимо обидві частини до квадрата. Після цього можуть з’явитися сторонні корені, тому кожен кандидат потребує перевірки.',
    irEq(F.pow(F.paren(l.root),degree),F.pow(F.paren(rhs),degree)));
  const powered=r.root?r.rad:cube?[qMul(qMul(right[0],right[0]),right[0])]:polyMul(right,right);
  add('Позбуваємося кореня',cube
    ?'Куб кубічного кореня дорівнює підкореневому виразу для будь-якого дійсного значення. Обчислюємо куб правої частини.'
    :'Квадрат квадратного кореня дорівнює підкореневому виразу на ОДЗ. Розкриваємо квадрат правої частини.',irEq(polyAst(l.rad),polyAst(powered)));
  const p=irSubPoly(l.rad,powered);
  const directLinear=polyDeg(p)===1 && polyDeg(l.rad)<=1 && polyDeg(powered)<=1;
  if(!directLinear) add('Зводимо до рівняння','Переносимо всі доданки ліворуч та зводимо подібні.',irEq(polyAst(p),F.num(0)));
  if(polyDeg(p)===0){
    if(!qIsZero(p[0])) finish([{g:'∅'}],'Отримали хибну рівність. Рівняння не має розв’язків.');
    else {
      const valid=r.root||cube?conditions:[...conditions,irCondition(right)];
      m.answerIntervals=irIntervals(valid);
      finish([{g:'x'},{g:'∈'},...domIntervalParts(m.answerIntervals)],`Після піднесення отримали тотожність. Враховуємо ОДЗ${r.root||cube?'':' та невід’ємність правої частини'}. Відповідь: x ∈ ${domIntervalText(m.answerIntervals)}.`);
    }
    return m;
  }
  if(polyDeg(p)===1){
    // Спільне лінійне ядро дає кроки; точну відповідь будуємо через Q.
    // Ядро лінійних рівнянь форматує числа до сотих. Прибираємо
    // знаменники, щоб у навчальних рядках не було округлених рівностей.
    const sides=directLinear?[l.rad,powered]:[p,[Q(0)]];
    const co=sides.flatMap(s=>[s[0],s[1]||Q(0)]);
    const den=co.reduce((n,q)=>n/gcd(n,q.d)*q.d,1);
    const ints=co.map(q=>q.n*(den/q.d));
    const common=ints.reduce((g,n)=>gcd(g,n),0);
    const [lb,la,rb,ra]=ints.map(n=>n/common);
    if(![lb,la,rb,ra].every(Number.isSafeInteger)) throw 'Коефіцієнти надто великі для покрокового розбору. Використайте менші числа.';
    const rows=buildLinearRows({a:la,b:lb},{a:ra,b:rb},{simplify:true});
    const unit=la-ra===1;
    m.linearRows=unit?rows:rows.slice(0,-1);
    const same=co.every((q,i)=>qEq(q,Q([lb,la,rb,ra][i])));
    if(same) m.steps[m.steps.length-1].linearIndex=0;
    else add('Прибираємо дробові коефіцієнти','Множимо рівняння на спільний знаменник коефіцієнтів і скорочуємо спільний числовий множник. Отримуємо рівносильне рівняння з цілими коефіцієнтами.',null,{linearIndex:0});
    m.linearRows.slice(1).forEach((row,i)=>add('Розв’язуємо лінійне рівняння',row.text,null,{linearIndex:i+1}));
    m.roots=[dRq(qDiv(qNeg(p[0]),p[1]))];
    const candidate=`Отримали x = ${fmlText(m.roots[0].ast)}. Перевіримо його в початковому рівнянні.`;
    if(unit) m.steps[m.steps.length-1].text+=' '+candidate;
    else add('Кандидат у корені',candidate,dRootsParts(m.roots));
  } else {
    const q=domQuad(p,'≥');
    q.rows.slice(1).forEach(row=>add('Розв’язуємо квадратне рівняння',row.text,row.parts));
    m.roots=q.roots;
  }
  for(const root of m.roots){
    const exact=irExactRoot(root.ast);
    const inDomain=conditions.every(c=>irPairSign(irExactPoly(c.poly,exact),exact.d)>=0);
    const rightOK=cube || !!r.root || irPairSign(irExactPoly(right,exact),exact.d)>=0;
    const equality=irPairSign(irExactPoly(p,exact),exact.d)===0;
    const ok=inDomain && rightOK && equality;
    m.checks.push({root,ok,inDomain,rightOK});
    if(ok) m.answer.push(root);
    const reason=!inDomain?'значення не належить ОДЗ':!rightOK?'права частина після відокремлення кореня від’ємна':'обидві частини початкового рівняння рівні';
    add(`Перевірка: x = ${fmlText(root.ast)}`,`Підставляємо x = ${fmlText(root.ast)} у початкове рівняння: ${reason}. ${ok?'Корінь підходить.':'Це сторонній корінь. Відкидаємо його.'}`,
      inDomain?[{f:irSubstitute(original[0],root.ast)},{g:ok?'=':'≠'},{f:irSubstitute(original[1],root.ast)}]:[{g:'x'},{g:'='},{f:root.ast},{w:'поза ОДЗ: підстановка не визначена'}],{verdict:ok?'Корінь підходить':'Сторонній корінь',rejected:!ok});
  }
  finish(m.answer.length?dRootsParts(m.answer):[{g:'∅'}],m.answer.length
    ?`Відповідь: ${m.answer.map(x=>'x = '+fmlText(x.ast)).join('; ')}. Усі корені перевірено в початковому рівнянні.`
    :'Рівняння не має розв’язків: допустимих коренів немає.');
  return m;
}

// Метод заміни: вираз, квадратний відносно t = √x.
function irReplacementPoly(ast){
  let found=false;
  function replace(n){
    const v=fStrip(n);
    if(v.t==='root'){
      if(v.n!==2 || fStrip(v.a).t!=='x') throw 'Для цього методу використайте заміну t = √x. Приклад: x - 3sqrt(x) + 2 = 0.';
      found=true; return F.x();
    }
    if(v.t==='x') return F.pow(F.x(),2);
    const out=Object.assign({},v);
    for(const k of ['a','b','e']) if(v[k]) out[k]=replace(v[k]);
    return out;
  }
  const poly=toPoly(replace(ast));
  return {poly,found};
}
function irRenameVariable(ast,symbol){
  if(ast.t==='x') return F.x(symbol);
  const out=Object.assign({},ast); delete out.fid;
  for(const k of ['a','b','e']) if(ast[k]) out[k]=irRenameVariable(ast[k],symbol);
  return out;
}
function irReplacementParts(parts){
  return parts.map(p=>p.f?{...p,f:irRenameVariable(p.f,'t')}:p.x?{...p,symbol:'t'}:p.g==='x'?{g:'t'}:p);
}
function irRationalQ(r){
  let a=r.n<0n?-r.n:r.n,b=r.d;
  while(b){const next=a%b;a=b;b=next;}
  const n=Number(r.n/(a||1n)),d=Number(r.d/(a||1n));
  if(!Number.isSafeInteger(n)||!Number.isSafeInteger(d)) throw 'Числа надто великі для точного розбору. Використайте менші коефіцієнти.';
  return Q(n,d);
}
// Повертаємо точний AST числа a + b√d; спільний знаменник лишається дробом.
function irSurdAst(value,d){
  const a=irRationalQ(value.a), b=irRationalQ(value.b);
  if(qIsZero(b)||!irSign(d)) return qAst(a);
  const den=a.d/gcd(a.d,b.d)*b.d;
  const na=a.n*(den/a.d),nb=b.n*(den/b.d);
  const root=F.root(2,qAst(irRationalQ(d)));
  const term=Math.abs(nb)===1?root:F.mul(F.num(Math.abs(nb)),root);
  const num=na===0?(nb<0?F.neg(term):term):nb<0?F.sub(qAst(Q(na)),term):F.add(qAst(Q(na)),term);
  return den===1?num:F.div(num,F.num(den));
}
function buildSubstitutionModel(text){
  if(typeof text!=='string'||text.split('=').length!==2) throw 'Введіть рівняння з одним знаком «=». Приклад: x - 3sqrt(x) + 2 = 0.';
  const original=text.split('=').map(parseFormula);
  const sides=original.map(irReplacementPoly);
  if(!sides.some(s=>s.found)||sides.some(s=>!s.poly)) throw 'Після заміни t = √x рівняння має стати квадратним. Приклад: x - 3sqrt(x) + 2 = 0.';
  const p=irSubPoly(sides[0].poly,sides[1].poly);
  if(polyDeg(p)!==2) throw 'Цей метод розбирає квадратні рівняння відносно t = √x. Приклад: x - 3sqrt(x) + 2 = 0.';
  const m={steps:[],original,roots:[],answer:[],checks:[],replacements:[],domain:irIntervals([irCondition([Q(0),Q(1)])])};
  const add=(title,text,parts,extra={})=>m.steps.push({title,text,parts,...extra});
  const T=F.x('t');
  add('Рівняння для заміни','У рівнянні є x та √x. Оскільки x є квадратом √x на ОДЗ, введемо нову змінну.',irEq(...original));
  add('ОДЗ рівняння','Квадратний корінь √x визначений, коли x ≥ 0. Це ОДЗ початкового рівняння.',[{g:'x'},{g:'≥'},{f:F.num(0)}],{domainNote:true});
  add('Вводимо нову змінну','Позначаємо √x через t. Це заміна змінної.',irEq(T,F.root(2,F.x())));
  add('Умова для нової змінної','Квадратний корінь невід’ємний, тому t ≥ 0. Від’ємні значення t не підходять.',[{g:'t'},{g:'≥'},{f:F.num(0)}]);
  add('Виражаємо x через t','За заміною t = √x маємо x = t². У початковому рівнянні замінюємо x на t², а √x — на t.',irEq(F.x(),F.pow(T,2)));
  add('Рівняння відносно t','Після заміни отримуємо квадратне рівняння відносно t. Переносимо доданки в одну частину та зводимо подібні.',irEq(irRenameVariable(polyAst(p),'t'),F.num(0)));
  const quad=domQuad(p,'≥');
  quad.rows.slice(1).forEach(row=>add('Розв’язуємо рівняння відносно t',row.text.replace(/\bx\b/g,'t'),irReplacementParts(row.parts)));
  m.tRoots=quad.roots;
  for(const t of quad.roots){
    const exact=irExactRoot(t.ast),ok=irPairSign(exact.x,exact.d)>=0;
    const replacement={t,ok}; m.replacements.push(replacement);
    if(!ok){
      add(`Відбір: t = ${fmlText(t.ast)}`,`t = ${fmlText(t.ast)} < 0. Це значення не задовольняє умову t ≥ 0. Відкидаємо його до повернення до x.`,[{g:'t'},{g:'='},{f:t.ast}],{verdict:'Не підходить: t < 0',rejected:true});
      continue;
    }
    const squared=irPairMul(exact.x,exact.x,exact.d);
    const x={v:t.v*t.v,ast:irSurdAst(squared,exact.d)};
    replacement.x=x;
    m.roots.push(x); m.answer.push(x);
    add(`Повертаємося до x: t = ${fmlText(t.ast)}`,`t = ${fmlText(t.ast)} задовольняє умову t ≥ 0. Обчислюємо x = t² = ${fmlText(x.ast)}.`,[{g:'x'},{g:'='},{f:F.pow(F.paren(t.ast),2)},{g:'='},{f:x.ast}]);
    // t ≥ 0 дає √(t²) = t, а p(t) = 0 підтверджує початкову рівність.
    const equality=irPairSign(irExactPoly(p,exact),exact.d)===0;
    if(!equality) throw 'Не вдалося точно перевірити корінь. Використайте менші коефіцієнти.';
    m.checks.push({root:x,ok:true,inDomain:true,rightOK:true});
    add(`Перевірка: x = ${fmlText(x.ast)}`,`Підставляємо x = ${fmlText(x.ast)} у початкове рівняння. Обидві частини рівні. Корінь підходить.`,irEq(irSubstitute(original[0],x.ast),irSubstitute(original[1],x.ast)),{verdict:'Корінь підходить'});
  }
  add('Відповідь',m.answer.length?`Відповідь: ${m.answer.map(x=>'x = '+fmlText(x.ast)).join('; ')}.`:'Рівняння не має розв’язків: допустимих значень t немає.',m.answer.length?dRootsParts(m.answer):[{g:'∅'}],{answer:true});
  return m;
}

function irView(m,ctx){
  const writing=!!ctx.anim;
  const linearSteps=m.steps.slice(0,ctx.index+1).filter(s=>s.linearIndex!=null);
  const upto=linearSteps.length?linearSteps.at(-1).linearIndex:-1;
  return '<div class="irsheet">'+m.steps.slice(0,ctx.index+1).map((s,i)=>{
    if(s.linearIndex>0) return '';
    const pen={writing:writing && i===ctx.index,order:0};
    const current=ctx.step.linearIndex!=null && writing ? upto : -1;
    const row=s.linearIndex===0?`<div class="eqsolve irlinear">${eqRowsHtml(m.linearRows,upto,current,ctx.anim?.kind==='linear')}</div>`:`<span class="fml">${domParts(s.parts,pen)}</span>`;
    const note=s.domainNote?lessonNote('domain','Як знайти область визначення',pen.writing?hwTick(pen,'hwfade',.3,3):''):'';
    return `<section class="irrow${s.answer?' iranswer':''}${s.rejected?' irrejected':''}${i===ctx.index?' ircurrent':''}"><div class="irlabel">${esc(s.title)}</div><div class="irformula">${row}</div>${s.verdict?`<div class="irverdict hwa"${hwTick(pen,'hwfade',.3,3)}>${esc(s.verdict)}</div>`:''}${note}</section>`;
  }).join('')+'</div>';
}
registerTool('irrational',{
  name:'Ірраціональні рівняння',icon:'√',color:'var(--primary)',bg:'var(--primary-l)',
  build:c=>c.method==='substitution'?buildSubstitutionModel(c.text):buildIrrationalModel(c.text),view:irView,
  prepare(m,from,to){
    if(to!==from+1) return null;
    const j=m.steps[to].linearIndex, row=m.linearRows?.[j];
    const block=document.querySelector('.irlinear');
    if(j>0 && block && (row.type==='move'||row.type==='combine')) return {kind:'linear',type:row.type,toStep:j,srcRects:captureEqRects(j-1,block)};
    return {writing:true};
  },
  animate(m,ctx){
    if(ctx.anim?.kind==='linear') runEqAnim({rows:m.linearRows},ctx,document.querySelector('.irlinear'));
    const current=document.querySelector('.irlinear .eqrow.cur') || document.querySelector('.irsheet .ircurrent');
    if(current) current.scrollIntoView({block:'nearest'});
  },
  inputs:c=>`<div class="field"><label class="fl" for="i_irmethod">Метод</label><select id="i_irmethod"><option value="power"${c.method!=='substitution'?' selected':''}>Піднесення до степеня</option><option value="substitution"${c.method==='substitution'?' selected':''}>Заміна t = √x</option></select></div><div class="field"><label class="fl" for="i_irtext">Рівняння</label><input id="i_irtext" value="${esc(c.text??'sqrt(x + 2) = x')}" autocomplete="off" spellcheck="false"></div><p class="helper">Квадратний корінь: sqrt(x + 2) або √(x + 2). Кубічний: root(3, x − 1), cbrt(x − 1) або ∛(x − 1). Степінь: x^2. Для кубічного кореня справа має бути число або інший кубічний корінь після перенесення доданків. Для методу заміни: x - 3sqrt(x) + 2 = 0.</p>`,
  read:v=>({text:v('i_irtext'),method:v('i_irmethod')}),summary:c=>c.text,
  editorFields:c=>`<div class="field"><label class="fl" for="f_irmethod">Метод</label><select id="f_irmethod"><option value="power"${c.method!=='substitution'?' selected':''}>Піднесення до степеня</option><option value="substitution"${c.method==='substitution'?' selected':''}>Заміна t = √x</option></select></div><div class="field"><label class="fl" for="f_irtext">Рівняння</label><input id="f_irtext" value="${esc(c.text||'')}"></div><p class="helper">${IR_FORM}</p>`,
  readEditor:v=>({text:v('f_irtext'),method:v('f_irmethod')}),errorHint:IR_FORM,
});

// Як у конспекті rational-power, формули будуємо зі спільного ядра.
(()=>{
  const html=(...texts)=>{
    const nodes=texts.map(text=>typeof text==='string'?parseFormula(text):text);
    return `<div class="ir-lesson-formula" role="img" aria-label="${esc(nodes.map(fmlText).join(' = '))}">${nodes.map((node,i)=>(i?'<span class="ir-lesson-equals">=</span>':'')+formulaHtml(node)).join('')}</div>`;
  };
  DB.topics.find(t=>t.id==='irrational').lesson=`
    <h2>Що таке ірраціональне рівняння</h2>
    <p>Ірраціональне рівняння містить змінну під знаком кореня. У цьому уроці розглядаємо квадратні та кубічні корені.</p>
    <p>Приклади:</p>
    ${html('sqrt(x - 2)','3')}
    ${html('root(3, x - 1)','-2')}
    <h2>Рівносильні рівняння та рівняння-наслідок</h2>
    <p>Рівносильні рівняння мають однакові множини коренів.</p>
    <p>Рівняння-наслідок зберігає всі корені початкового рівняння, але може мати й додаткові.</p>
    <p>Такий додатковий корінь називають стороннім: він не задовольняє початкове рівняння.</p>
    <h2>Піднесення обох частин до степеня</h2>
    <h3>Непарний степінь</h3>
    <p>Піднесення обох частин до непарного степеня зберігає рівносильність на ОДЗ початкового рівняння. Непарний степінь зберігає знак числа.</p>
    <p>Приклад: піднесемо обидві частини до куба.</p>
    ${html('root(3, x - 1)','-2')}
    ${html('x - 1','-8')}
    ${html('x','-7')}
    <h3>Парний степінь</h3>
    <p>Піднесення обох частин до парного степеня дає рівняння-наслідок. Можуть з’явитися сторонні корені, бо числа з протилежними знаками мають однакові квадрати.</p>
    ${html('2^2','(-2)^2','4')}
    <p>Приклад: піднесемо обидві частини до квадрата.</p>
    ${html('sqrt(x + 2)','x')}
    ${html('x + 2','x^2')}
    <p>Кандидати: −1 і 2. Перевіримо x = −1:</p>
    ${html('sqrt(-1 + 2)','1')}
    <p>Ліва частина дорівнює 1, а права — −1. Отже, −1 — сторонній корінь.</p>
    <p>При x = 2 обидві частини рівні:</p>
    ${html('sqrt(2 + 2)','2')}
    <p>Відповідь: 2. Обидва кандидати належать ОДЗ x ≥ −2, тому самої перевірки ОДЗ недостатньо.</p>
    <h2>Як розв’язувати ірраціональні рівняння</h2>
    <h3>1. Знайди ОДЗ</h3>
    <p>Область допустимих значень змінної — це значення, за яких визначені обидві частини рівняння.</p>
    <p>Під квадратним коренем має бути невід’ємний вираз. Кубічний корінь визначений для будь-якого дійсного підкореневого значення, навіть від’ємного. Знаменник, якщо він є, не може дорівнювати нулю.</p>
    <h3>2. Відокрем корінь і піднеси обидві частини до степеня</h3>
    <p>Для квадратного кореня — до другого, для кубічного — до третього.</p>
    <p>Квадратний корінь невід’ємний, тому вираз, якому він дорівнює, також має бути невід’ємним. Цю умову перевіряємо окремо від ОДЗ.</p>
    <p>Для кубічного кореня обмеження за знаком немає: він може дорівнювати від’ємному числу.</p>
    <h3>3. Розв’яжи отримане рівняння</h3>
    <p>Розкрий дужки, зведи подібні доданки та знайди кандидатів у корені.</p>
    <h3>4. Перевір кожного кандидата</h3>
    <p>Підстав кандидата в початкове рівняння: обидві частини мають бути рівними. Піднесення до квадрата може дати сторонні корені. Піднесення до куба зберігає рівносильність і не створює сторонніх коренів.</p>
    <h2>Метод заміни змінної</h2>
    <p>Якщо рівняння містить x і √x, познач √x через t. Тоді t ≥ 0:</p>
    ${html({t:'x',symbol:'t'},'sqrt(x)')}
    ${html('x',F.pow({t:'x',symbol:'t'},F.num(2)))}
    <p>Розв’яжи рівняння відносно t, відкинь від’ємні значення та повернися до x. Перевір отримані корені в початковому рівнянні.</p>
    <h2>Перейди до прикладів</h2>
    <p>Почни з простого прикладу. Потім розглянь сторонній корінь і рівняння без розв’язків. У кожному завданні можна ввести власну умову.</p>`;
})();
