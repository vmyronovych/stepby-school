/* Розв’язання задач § 10 на спільному аркуші зошита. */
const ScalarNotebook = (() => {
  const N=F.num, X=F.x, add=F.add, mul=F.mul;
  const bracket=n=>n<0?F.paren(N(n)):N(n);
  const vector=(name,options={})=>({kind:'vector',name,...options});
  const ast=value=>({kind:'ast',value});
  const text=value=>({kind:'text',value});
  const examples=ScalarProduct.groups.flatMap((group,g)=>group.items.map((item,part)=>({
    group:g,part,
    title:group.title+(item.lengths?`: кут ${item.angle}°`:`: (${item.a.join('; ')})`)
  })));
  function build(cfg={}){
    const group=cfg.group==null?0:Number(cfg.group),part=cfg.part==null?0:Number(cfg.part);
    const index=examples.findIndex(e=>e.group===group&&e.part===part);
    if(index<0)throw 'Вибери задачу зі списку.';
    const ex=ScalarProduct.exercise(group,part),[a,b]=ex.names;
    const lhs=()=>ex.group.square?[vector(a,{square:true})]:[vector(a),text('·'),vector(b)];
    const eq=(right)=>[...lhs(),text('='),ast(right)];
    const row=(label,description,tokens,value)=>({label,text:description,tokens,value});
    const steps=[];
    if(ex.item.lengths){
      const [la,lb]=ex.item.lengths;
      const cos=[F.div(F.root(2,N(3)),N(2)),F.div(N(1),N(2)),F.neg(F.div(F.root(2,N(2)),N(2))),N(-1)][part];
      const result=[mul(N(5),F.root(2,N(3)),true),N(2),F.neg(F.root(2,N(2))),N(-50)][part];
      steps.push(row('Формула','Множимо довжини векторів і косинус кута між ними.',[...lhs(),text('='),vector(a,{modulus:true}),text('·'),vector(b,{modulus:true}),text('·'),ast(X('cos α'))]));
      steps.push(row('Підстановка',`Підставляємо довжини ${la} і ${lb} та кут ${ex.item.angle}°.`,eq(mul(mul(N(la),N(lb)),X(`cos ${ex.item.angle}°`)))));
      steps.push(row('Косинус','Використовуємо точне значення косинуса.',[ast(X(`cos ${ex.item.angle}°`)),text('='),ast(cos)]));
      const numeric=mul(N(la*lb),part===2||part===3?F.paren(cos):cos);
      steps.push(row('Обчислення','Множимо довжини та підставляємо значення косинуса.',eq(numeric),numeric));
      steps.push(row('Відповідь','Одержуємо точний скалярний добуток.',eq(result),result));
    }else{
      const [x,y]=ex.av,[u,w]=ex.bv;
      const law=ex.group.square?add(F.pow(X('x'),2),F.pow(X('y'),2)):add(mul(X('x₁'),X('x₂')),mul(X('y₁'),X('y₂')));
      const substitution=ex.group.square?add(F.pow(bracket(x),2),F.pow(bracket(y),2)):add(mul(bracket(x),bracket(u)),mul(bracket(y),bracket(w)));
      const products=add(N(x*u),y*w<0?F.paren(N(y*w)):N(y*w));
      steps.push(row('Формула',ex.group.square?'Скалярний квадрат дорівнює сумі квадратів координат.':'Множимо відповідні координати й додаємо добутки.',eq(law)));
      steps.push(row('Підстановка','Підставляємо координати. Від’ємні множники беремо в дужки.',eq(substitution),substitution));
      steps.push(row('Обчислення',ex.group.square?'Обчислюємо квадрати координат.':'Обчислюємо кожний добуток зі своїм знаком.',eq(products),products));
      steps.push(row(ex.group.proof||ex.group.check?'Добуток':'Відповідь','Додаємо отримані числа.',eq(N(ex.m.dot)),N(ex.m.dot)));
      if(ex.group.proof||ex.group.check){
        const perpendicular=ex.m.perpendicular;
        steps.push(row('Висновок',perpendicular?'Обидва вектори ненульові. Їхній добуток дорівнює нулю, тому вектори перпендикулярні.':'Добуток не дорівнює нулю, тому вектори не перпендикулярні.',[
          vector(a),text('⊥'),vector(b)
        ]));
        // Слова однозначно передають заперечення без нестандартного математичного знака.
        if(!perpendicular)steps[steps.length-1].tokens=[text('Вектори не перпендикулярні')];
      }
    }
    // Числові перетворення продовжують рядок підстановки.
    for(const i of ex.item.lengths?[3,4]:[2,3])steps[i].appendTo=1;
    steps[1].label='Обчислення';
    return {...ex,...examples[index],index,steps};
  }
  function renderVector(token,pen){
    let body=hwGlyphs(token.name,pen);
    body=`<span class="sp-tool-vector">${body}<svg class="sp-tool-arrow hwa" viewBox="0 0 60 12" aria-hidden="true"${hwTick(pen,'hwwipe',.28)}><path d="M2 6H56 M48 1L56 6L48 11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
    if(token.modulus)body=hwGlyphs('|',pen)+body+hwGlyphs('|',pen);
    if(token.square)body+=`<sup class="sp-tool-square">${hwGlyphs('2',pen)}</sup>`;
    return body;
  }
  function tokenText(token){return token.kind==='vector'?(token.modulus?'|':'')+token.name+(token.modulus?'|':'')+(token.square?'²':''):token.kind==='ast'?fmlText(token.value):token.value;}
  function renderTokens(tokens,pen){return tokens.map(t=>t.kind==='vector'?renderVector(t,pen):t.kind==='ast'?renderFormula(t.value,pen):hwGlyphs(t.value,pen)).join('');}
  function fields(cfg,id){
    const group=cfg.group==null?0:Number(cfg.group),part=cfg.part==null?0:Number(cfg.part);
    return `<div class="field"><label class="fl" for="${id}">Задача</label><select id="${id}">${examples.map((e,i)=>`<option value="${i}"${e.group===group&&e.part===part?' selected':''}>${esc(e.title)}</option>`).join('')}</select></div><p class="helper">Розв’язуй задачу кнопкою «Далі». Після відповіді переходь до наступної задачі.</p>`;
  }
  function readFields(v,id){const i=Number(v(id)),e=examples[i];return e?{group:e.group,part:e.part}:{group:-1,part:-1};}
  function nextHref(example){
    const topic=DB.topics.find(t=>t.id==='scalar-product');
    const task=topic&&(topic.tasks||[]).find(t=>Number(t.cfg.group)===example.group&&Number(t.cfg.part)===example.part);
    return task?hrefTopic(topic,task.id):hrefTool('scalar-product',{group:example.group,part:example.part});
  }
  return {build,examples,fields,readFields,renderTokens,tokenText,nextHref};
})();
registerTool('scalar-product',{
  name:'Скалярний добуток векторів',icon:'↗',color:'var(--primary)',bg:'var(--primary-l)',
  inputHint:'Кроки записуються на аркуші послідовно. Після відповіді відкрий наступну задачу.',
  freeHint:'Розв’язуй задачі про скалярний добуток одну за одною на аркуші зошита.',
  build:ScalarNotebook.build,
  view(m,ctx){
    const lines=new Map();
    m.steps.slice(0,ctx.index+1).forEach((step,i)=>{
      const target=step.appendTo??i;
      if(!lines.has(target))lines.set(target,[]);
      // Наступна частина рівності починається зі знака «=».
      const tokens=step.appendTo==null?step.tokens:step.tokens.slice(step.tokens.findIndex(t=>t.kind==='text'&&t.value==='='));
      lines.get(target).push({step,i,tokens});
    });
    const rows=[...lines.values()].map(chunks=>{
      const current=chunks.some(c=>c.i===ctx.index),answer=chunks.some(c=>c.i===m.steps.length-1);
      const label=chunks[0].step.label;
      const formula=chunks.map(({i,tokens})=>{
        const pen={writing:!!ctx.anim&&i===ctx.index,order:0};
        return `<span class="sp-tool-segment" data-step="${i}">${ScalarNotebook.renderTokens(tokens,pen)}</span>`;
      }).join('');
      return `<section class="rp-row${current?' rp-current':''}${answer?' rp-answer':''}"><div class="rp-label">${label}</div><div class="fml sp-tool-formula" role="img" aria-label="${esc(chunks.flatMap(c=>c.tokens).map(ScalarNotebook.tokenText).join(' '))}">${formula}</div></section>`;
    }).join('');
    const next=ScalarNotebook.examples[m.index+1];
    return `<div class="rp-sheet sp-tool-sheet"><div class="rp-condition sp-tool-condition"><p>Задача ${m.index+1} із ${ScalarNotebook.examples.length}</p><div>${m.condition}</div></div>${rows}${ctx.index===m.steps.length-1?`<div class="sp-tool-next">${next?`<a class="btn sm" href="${ScalarNotebook.nextHref(next)}">Наступна задача →</a>`:'<p>Усі задачі теми розглянуто.</p>'}</div>`:''}</div>`;
  },
  animate(m,ctx){
    if(ctx.step.appendTo==null)return;
    const line=document.querySelector('.rp-current .sp-tool-formula');
    if(line)line.scrollLeft=line.scrollWidth;
  },
  prepare:(m,from,to)=>to===from+1?{writing:true}:null,
  inputs:cfg=>ScalarNotebook.fields(cfg,'i_spexample'),read:v=>ScalarNotebook.readFields(v,'i_spexample'),
  summary:cfg=>ScalarNotebook.examples.find(e=>e.group===Number(cfg.group||0)&&e.part===Number(cfg.part||0))?.title||'Скалярний добуток',
  editorFields:cfg=>ScalarNotebook.fields(cfg,'f_spexample'),readEditor:v=>ScalarNotebook.readFields(v,'f_spexample')
});
