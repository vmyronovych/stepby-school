const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ctx=vm.createContext({document:{getElementById:()=>null},hrefTool:(id,cfg)=>'#/tool/'+id+'?c='+encodeURIComponent(JSON.stringify(cfg)),DOCS:{},DB:{topics:[],tools:{}},registerTool:(id,def)=>ctx.DB.tools[id]=def});
for(const file of ['js/core/util.js','js/core/handwriting.js','js/core/formula.js','js/geometry/scalar-product.js','js/tools/scalar-product.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),ctx);
const tool=vm.runInContext('ScalarNotebook',ctx);
function value(n){
  switch(n.t){
    case 'num':return n.q.n/n.q.d;
    case 'neg':return -value(n.a);
    case 'paren':return value(n.a);
    case 'add':return value(n.a)+value(n.b);
    case 'mul':return value(n.a)*value(n.b);
    case 'div':return value(n.a)/value(n.b);
    case 'pow':return value(n.a)**value(n.e);
    case 'root':return value(n.a)**(1/n.n);
    default:throw new Error('Unexpected numerical node '+n.t);
  }
}
test('зошит містить усі 11 підпунктів у порядку підручника',()=>{
  assert.equal(tool.examples.length,11);
  const expected=[3,-5,5,17,5*Math.sqrt(3),2,-Math.sqrt(2),-50,0,-10,0];
  tool.examples.forEach((cfg,i)=>{
    const m=tool.build(cfg);
    assert.equal(m.index,i);
    assert(m.steps.length>=4);
    const calculations=m.steps.filter(s=>s.value);
    assert(calculations.length>=2);
    for(const step of calculations)assert(Math.abs(value(step.value)-expected[i])<1e-12,`${i}: ${JSON.stringify(step.value)}`);
    if(typeof m.answer==='number')assert(Math.abs(m.answer-expected[i])<1e-12);
    else assert.equal(m.answer,i===9?'ні':'так');
  });
});
test('корені та дроби залишаються точними; висновки перевіряють перпендикулярність',()=>{
  const root=tool.build({group:2,part:0});
  assert.equal(root.steps[2].tokens[2].value.t,'div');
  assert.equal(root.steps.at(-1).value.b.t,'root');
  assert.equal(tool.build({group:2,part:2}).steps.at(-1).value.t,'neg');
  assert.match(tool.build({group:3,part:0}).steps.at(-1).text,/Обидва вектори ненульові/);
  assert.match(tool.build({group:4,part:0}).steps.at(-1).text,/не перпендикулярні/);
  assert.match(tool.build({group:4,part:1}).steps.at(-1).text,/перпендикулярні/);
  assert.throws(()=>tool.build({group:10,part:0}));
  assert.throws(()=>tool.build({group:2,part:9}));
});
test('лише послідовний крок отримує анімацію; рендер накопичує рядки',()=>{
  const def=ctx.DB.tools['scalar-product'],m=tool.build({group:2,part:0});
  assert.equal(def.prepare(m,0,2),null);
  assert.equal(def.prepare(m,2,1),null);
  assert.equal(def.prepare(m,0,1).writing,true);
  const html=def.view(m,{index:2,step:m.steps[2],anim:{writing:true}});
  assert.equal((html.match(/<section class="rp-row/g)||[]).length,3);
  assert(html.includes('hwdraw'));
  assert(html.includes('rhook'));
  const staticHtml=def.view(m,{index:2,step:m.steps[2],anim:null});
  assert(!staticHtml.includes('animation:hwdraw'));
  assert(!html.includes('Наступна задача'));
});
test('обчислення дописуються в рядок, номер вправи не показується',()=>{
  const def=ctx.DB.tools['scalar-product'];
  tool.examples.forEach(cfg=>{
    const m=tool.build(cfg),last=m.steps.length-1;
    const html=def.view(m,{index:last,step:m.steps[last],anim:null});
    assert(!html.includes('За вправою'));
    assert(!html.includes('підпункт'));
    assert.equal((html.match(/<section class="rp-row/g)||[]).length,cfg.group===2||cfg.group>=3?3:2);
    assert(html.includes('data-step="1"'));
    assert(html.includes('data-step="3"'));
  });
  const m=tool.build({group:0,part:0});
  const html=def.view(m,{index:3,step:m.steps[3],anim:{writing:true}});
  const label=html.match(/aria-label="a · b = \([-−]2\)·0 \+ 1·3 = 0 \+ 3 = 3"/);
  assert(label,'записуємо весь ланцюжок рівностей в одному рядку');
  assert(!html.split('data-step="3"')[0].includes('animation:hwdraw'),'попередні частини не переписуються');
  assert(html.split('data-step="3"')[1].includes('animation:hwdraw'));
});
