const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ctx=vm.createContext({document:{addEventListener(){}},window:{addEventListener(){}}});
for(const file of ['js/data.js','js/app.js']){
  let source=fs.readFileSync(path.join(__dirname,'..',file),'utf8');
  if(file==='js/app.js')source=source.replace(/\/\* ---- старт ---- \*\/[\s\S]*$/,'');
  vm.runInContext(source,ctx);
}
const resolve=hash=>vm.runInContext(`resolveRoute(parseRoute(${JSON.stringify(hash)}))`,ctx);
test('задачі документа відкривають інструмент, розділи лишаються документом',()=>{
  const topic=vm.runInContext("DB.topics.find(t=>t.id==='scalar-product')",ctx);
  assert.equal(topic.tasks.length,11);
  for(const task of topic.tasks){
    const r=resolve('#/9a/geometry/scalar-product/'+task.id);
    assert.equal(r.state.tool,'scalar-product');
    assert.equal(r.state.toolTaskId,task.id);
    assert.deepEqual(r.state.toolCfg,task.cfg);
  }
  for(const sub of ['', '/sp-theory-title','/sp-practice-title']){
    const r=resolve('#/9a/geometry/scalar-product'+sub);
    assert.equal(r.state.tool,undefined);
    assert.equal(r.state.topic,'scalar-product');
  }
});
test('попередні документи й задачі алгебри зберігають маршрути',()=>{
  assert.equal(resolve('#/9a/geometry/vector-scaling').state.tool,undefined);
  assert.equal(resolve('#/9a/geometry/vector-scaling/section').state.sub,'section');
  const task=vm.runInContext("DB.topics.find(t=>t.id==='rational-power').tasks[0]",ctx);
  assert.equal(resolve('#/10a/math/rational-power/'+task.id).state.tool,'rational-power');
});
