const {test}=require('node:test');
const assert=require('node:assert/strict');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const { ScalingNotebook, scalingTool: def, catalog, runtimeServices } = loadTypeScript('src/features/geometry/engines/index.ts');
const lesson={...ScalingNotebook,build:(cfg={})=>def.build(cfg)};
function value(n,variables={}){
  if(Array.isArray(n))return Array.from(n,x=>value(x,variables));
  switch(n.t){
    case 'num':return n.q.n/n.q.d;
    case 'x':assert(Object.hasOwn(variables,n.symbol));return variables[n.symbol];
    case 'neg':return -value(n.a,variables);
    case 'paren':return value(n.a,variables);
    case 'add':return value(n.a,variables)+value(n.b,variables);
    case 'sub':return value(n.a,variables)-value(n.b,variables);
    case 'mul':return value(n.a,variables)*value(n.b,variables);
    case 'div':return value(n.a,variables)/value(n.b,variables);
    default:throw new Error('Unsupported numerical node '+n.t);
  }
}
function render(index,step,anim=null){const m=lesson.build({example:index});return def.view(m,{index:step,step:m.steps[step],anim});}
test('шість прикладів мають правильні числові відповіді та векторний напрям',()=>{
  assert.equal(lesson.examples.length,6);
  assert.deepEqual(Array.from(lesson.examples,e=>e.title),['Знайди модуль','Визнач напрям','Помнож координати','Знайди множник','Нульовий добуток','Застосуй властивість']);
  const expected=[12,'Протилежно напрямлені',[6,-9],-.5,0,-2];
  expected.forEach((answer,i)=>{
    const m=lesson.build({example:i});
    assert.deepEqual(Array.isArray(m.answer)?Array.from(m.answer):m.answer,answer);
    assert(m.steps.length>=2);
  });
  const expectedValues=[[12,12,12],[-.5,-.5],[[6,-9],[6,-9]],[-.5,2,-.5],[0],[-2,-2]];
  lesson.examples.forEach((_,i)=>{
    const numerical=Array.from(lesson.build({example:i}).steps.filter(s=>s.value!=null),s=>value(s.value));
    assert.deepEqual(numerical,expectedValues[i]);
  });
});
test('перевірка множника використовує обидві координати й точний дріб',()=>{
  const m=lesson.build({example:3});
  const k=value(m.steps[1].value);
  const firstEquation=m.steps[0].tokens[0].value;
  assert.equal(value(firstEquation,{k}),-1);
  assert.equal(value(m.steps[2].value),2);
  assert.deepEqual([k*2,k*(-4)],[-1,2]);
  assert.equal(m.steps[1].tokens[2].value.t,'neg');
  assert.equal(m.steps[1].tokens[2].value.a.t,'div');
});
test('напрям і єдиний нульовий множник потребують ненульового вектора',()=>{
  for(const i of [1,4]){
    const m=lesson.build({example:i});
    assert.equal(m.nonzeroRequired,true);
    assert.match(m.condition,/≠/);
    assert(m.steps.some(s=>/ненульов|додатний/.test(s.text)));
  }
  const direction=lesson.build({example:1});
  const k=value(direction.steps[1].value);
  assert(k<0);
  const source=[2,-4],target=source.map(x=>x*k);
  assert.equal(target[0]*source[0]+target[1]*source[1],-10);
  assert.equal(lesson.build({example:4}).answer,0);
  assert.deepEqual(source.map(x=>x*0),[0,-0]);
  assert(source.some(x=>x!==0));
});
test('числові перетворення дописуються в той самий рядок',()=>{
  const modulus=render(0,3);
  assert.match(modulus,/aria-label="\|b\| = \| -2 \|· 6 = 2·6 = 12"/);
  assert.equal((modulus.match(/<section class="rp-row/g)||[]).length,2);
  const coordinates=render(2,2);
  assert.equal((coordinates.match(/<section class="rp-row/g)||[]).length,2);
  assert.match(coordinates,/aria-label="b = \( \(-3\)·\(-2\) ; \(-3\)·3 \) = \( 6 ; -9 \)"/);
  const simplify=render(5,1);
  assert.equal((simplify.match(/<section class="rp-row/g)||[]).length,1);
  assert.match(simplify,/aria-label="3 a − 5 a = \(3 − 5\) a = -2 a"/);
  assert(!modulus.includes('За вправою'));
});
test('анімація пише лише новий фрагмент, стрибки й рух назад статичні',()=>{
  const m=lesson.build({example:0});
  assert.equal(def.prepare(m,0,1).writing,true);
  assert.equal(def.prepare(m,0,3),null);
  assert.equal(def.prepare(m,2,1),null);
  const html=render(0,3,{writing:true});
  assert(!html.split('data-step="3"')[0].includes('animation:hwdraw'));
  assert(html.split('data-step="3"')[1].includes('animation:hwdraw'));
  assert(!render(0,3).includes('animation:hwdraw'));
  assert(!render(0,1).includes('Наступна задача'));
  assert(render(0,3).includes('Наступна задача'));
  const last=lesson.build({example:5});
  assert(!render(5,last.steps.length-1).includes('Наступна задача'));
  assert(render(5,last.steps.length-1).includes('Усі задачі теми розглянуто'));
});
test('наступна задача має адресу завдання теми; вибір і помилкові умови оброблено',()=>{
  assert(catalog.topics.some(t=>t.id==='vector-scaling'));
  runtimeServices.hrefTopic=(topic,id)=>`#/9a/geometry/${topic.id}/${id}`;
  assert.equal(lesson.nextHref(1),'#/9a/geometry/vector-scaling/scaling-2');
  assert.deepEqual(JSON.parse(JSON.stringify(lesson.readFields(()=> '4','i_vsexample'))),{example:4});
  assert.equal(lesson.build().index,0);
  for(const example of [-1,6,1.5,'bad'])assert.throws(()=>lesson.build({example}));
});
