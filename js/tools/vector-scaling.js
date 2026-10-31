/* Шість задач про множення вектора на число, по одній на аркуші. */
const ScalingNotebook = (() => {
  const N=F.num, X=F.x;
  const ast=value=>({kind:'ast',value});
  const text=value=>({kind:'text',value});
  const vector=(name,options={})=>({kind:'vector',name,...options});
  const v=name=>`<span class="vec-symbol">${name}</span>`;
  const a=v('a'),b=v('b'),zero=v('0');
  const half=()=>F.neg(F.div(N(1),N(2)));
  const bracket=n=>n<0?F.paren(N(n)):N(n);
  const kEq=right=>[ast(X('k')),text('='),ast(right)];
  const bLengthEq=right=>[vector('b',{modulus:true}),text('='),...right];
  const coordinatePair=(x,y)=>[text('('),ast(x),text(';'),ast(y),text(')')];
  const coefficient=()=>[ast(N(3)),vector('a'),text('−'),ast(N(5)),vector('a')];
  const examples=[
    {title:'Знайди модуль',condition:`|${a}| = 6, ${b} = −2${a}. Знайди |${b}|.`},
    {title:'Визнач напрям',condition:`${a} ≠ ${zero}, ${b} = −0,5${a}. Як напрямлені вектори ${a} і ${b}?`},
    {title:'Помнож координати',condition:`${a} = (−2; 3). Знайди ${b} = −3${a}.`},
    {title:'Знайди множник',condition:`${a} = (2; −4), ${b} = (−1; 2). Знайди k, якщо ${b} = k${a}.`},
    {title:'Нульовий добуток',condition:`${a} ≠ ${zero}. За якого k добуток k${a} дорівнює ${zero}?`},
    {title:'Застосуй властивість',condition:`Спрости 3${a} − 5${a}.`}
  ];
  function build(cfg={}){
    const index=cfg.example==null?0:Number(cfg.example);
    if(!Number.isInteger(index)||!examples[index])throw 'Вибери задачу зі списку.';
    const steps=[];
    const row=(label,description,tokens,value,appendTo)=>{
      const step={label,text:description,tokens};
      if(value!=null)step.value=value;
      if(appendTo!=null)step.appendTo=appendTo;
      steps.push(step);
    };
    let answer,nonzeroRequired=false;
    switch(index){
      case 0:
        answer=12;
        row('Формула','Модуль добутку дорівнює добутку модулів числа та вектора.',bLengthEq([text('|'),ast(X('k')),text('|·'),vector('a',{modulus:true})]));
        row('Обчислення','Підставляємо множник −2 та модуль 6.',bLengthEq([text('|'),ast(N(-2)),text('|·'),ast(N(6))]),F.mul(N(2),N(6)));
        row('Модуль множника','Модуль числа −2 дорівнює 2.',bLengthEq([ast(F.mul(N(2),N(6)))]),F.mul(N(2),N(6)),1);
        row('Відповідь','Модуль вектора дорівнює 12.',bLengthEq([ast(N(12))]),N(12),1);
        break;
      case 1:
        answer='Протилежно напрямлені';nonzeroRequired=true;
        row('Множник','Маємо від’ємний десятковий множник.',kEq({...N(Q(-1,2)),raw:'−0,5'}),N(Q(-1,2)));
        row('Звичайний дріб','Записуємо множник точним звичайним дробом.',kEq(half()),half(),0);
        row('Знак множника','Множник менший від нуля, а початковий вектор ненульовий.',[ast(X('k')),text('<'),ast(N(0))]);
        row('Відповідь','Від’ємний множник змінює напрям ненульового вектора на протилежний.',[vector('a'),text('↑↓'),vector('b')]);
        break;
      case 2:{
        answer=[6,-9];
        const products=[F.mul(bracket(-3),bracket(-2)),F.mul(bracket(-3),N(3))];
        row('Формула','Множимо кожну координату вектора на те саме число.',[vector('b'),text('='),ast(X('k')),vector('a'),text('='),...coordinatePair(F.mul(X('k'),X('x')),F.mul(X('k'),X('y')))]);
        row('Обчислення','Множимо обидві координати на −3.',[vector('b'),text('='),...coordinatePair(...products)],products);
        row('Відповідь','Добуток двох від’ємних чисел додатний. Другий добуток від’ємний.',[vector('b'),text('='),...coordinatePair(N(6),N(-9))],[N(6),N(-9)],1);
        break;
      }
      case 3:
        answer=-.5;
        row('Перша координата','Із рівності векторів отримуємо рівність перших координат.',[ast(F.mul(N(2),X('k'),true)),text('='),ast(N(-1))]);
        row('Множник','Ділимо обидві частини рівняння на 2.',kEq(half()),half());
        row('Перевірка','Перевіряємо другу координату тим самим множником.',[ast(F.mul(bracket(-4),F.paren(half()))),text('='),ast(N(2))],F.mul(bracket(-4),F.paren(half())));
        row('Відповідь','Обидві координати узгоджені. Отже, множник дорівнює −1/2.',[vector('b'),text('='),ast(half()),vector('a')],half());
        break;
      case 4:
        answer=0;nonzeroRequired=true;
        row('Ненульовий вектор','Модуль ненульового вектора додатний.',[vector('a',{modulus:true}),text('>'),ast(N(0))]);
        row('Нульовий добуток','Модуль добутку дорівнює нулю.',[text('|'),ast(X('k')),text('|·'),vector('a',{modulus:true}),text('='),ast(N(0))]);
        row('Модуль множника','Оскільки модуль вектора додатний, нулем має бути модуль множника.',[text('|'),ast(X('k')),text('|'),text('='),ast(N(0))]);
        row('Відповідь','Лише число 0 має нульовий модуль. Тому k = 0.',kEq(N(0)),N(0));
        break;
      case 5:
        answer=-2;
        row('Обчислення','Виносимо спільний вектор. Віднімаємо його коефіцієнти.',[...coefficient(),text('='),ast(F.paren(F.sub(N(3),N(5)))),vector('a')],F.sub(N(3),N(5)));
        row('Відповідь','Різниця коефіцієнтів дорівнює −2.',[...coefficient(),text('='),ast(N(-2)),vector('a')],N(-2),0);
        break;
    }
    return {...examples[index],index,steps,answer,nonzeroRequired};
  }
  function fields(cfg,id){
    const index=cfg.example==null?0:Number(cfg.example);
    return `<div class="field"><label class="fl" for="${id}">Задача</label><select id="${id}">${examples.map((e,i)=>`<option value="${i}"${i===index?' selected':''}>${esc(e.title)}</option>`).join('')}</select></div><p class="helper">Розв’язуй задачу кнопкою «Далі». Після відповіді відкрий наступну задачу.</p>`;
  }
  function readFields(v,id){return {example:Number(v(id))};}
  function nextHref(index){
    const topic=DB.topics.find(t=>t.id==='vector-scaling');
    const task=topic&&(topic.tasks||[]).find(t=>Number(t.cfg.example)===index);
    return task?hrefTopic(topic,task.id):hrefTool('vector-scaling',{example:index});
  }
  return {examples,build,fields,readFields,nextHref};
})();
registerTool('vector-scaling',{
  name:'Множення вектора на число',icon:'✖',color:'var(--primary)',bg:'var(--primary-l)',
  inputHint:'Натискай «Далі», щоб дописувати розв’язання. Після відповіді відкрий наступну задачу.',
  freeHint:'Розв’язуй задачі про множення вектора на число одну за одною.',
  build:ScalingNotebook.build,
  view(m,ctx){
    const rows=VectorNotebook.renderRows(m,ctx),last=ctx.index===m.steps.length-1;
    return `<div class="rp-sheet sp-tool-sheet"><div class="rp-condition sp-tool-condition"><p>Задача ${m.index+1} із ${ScalingNotebook.examples.length}</p><div>${m.condition}</div></div>${rows}${last?`<div class="sp-tool-next">${m.index+1<ScalingNotebook.examples.length?`<a class="btn sm" href="${ScalingNotebook.nextHref(m.index+1)}">Наступна задача →</a>`:'<p>Усі задачі теми розглянуто.</p>'}</div>`:''}</div>`;
  },
  animate:VectorNotebook.scrollCurrent,
  prepare:(m,from,to)=>to===from+1?{writing:true}:null,
  inputs:cfg=>ScalingNotebook.fields(cfg,'i_vsexample'),read:v=>ScalingNotebook.readFields(v,'i_vsexample'),
  summary:cfg=>ScalingNotebook.examples[Number(cfg.example||0)]?.title||'Множення вектора на число',
  editorFields:cfg=>ScalingNotebook.fields(cfg,'f_vsexample'),readEditor:v=>ScalingNotebook.readFields(v,'f_vsexample')
});
