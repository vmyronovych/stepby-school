const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadTypeScript}=require('./helpers/load-typescript.cjs');
const {digest}=require('./helpers/parity.cjs');
const baseline=require('./fixtures/migration-parity.json');
const algebra=loadTypeScript('src/features/tools/engines/test-entry.ts');
for(const definition of algebra.algebraCoreTools) {
 test(`${definition.id}: canonical task models and every rendered step match the pre-migration baseline`,()=>{
  const tasks=baseline.tasks.filter(task=>task.tool===definition.id);
  assert(tasks.length);
  for(const task of tasks) {
   const model=definition.build(task.config);
   assert.equal(digest(model),task.model,task.id+' model');
   assert.equal(digest(model.steps.map((step,index)=>definition.view(model,{step,index,anim:null}))),task.steps,task.id+' views');
  }
 });
}
