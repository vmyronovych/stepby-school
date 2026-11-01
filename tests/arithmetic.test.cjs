const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadTypeScript}=require('./helpers/load-typescript.cjs');
const {digest}=require('./helpers/parity.cjs');
const baseline=require('./fixtures/migration-parity.json');
const arithmetic=loadTypeScript('src/features/tools/engines/arithmetic-index.ts');
for(const definition of arithmetic.arithmeticTools) {
 test(`${definition.id}: canonical task models and every rendered step match the pre-migration baseline`,()=>{
  const tasks=baseline.tasks.filter(t=>t.tool===definition.id);
  assert(tasks.length);
  for(const task of tasks) {
   const model=definition.build(task.config);
   assert.equal(digest(model),task.model,task.id+' model');
   assert.equal(digest(model.steps.map((step,index)=>definition.view(model,{step,index,anim:null}))),task.steps,task.id+' views');
  }
 });
}
test('prime decompositions reconstruct every supported integer',()=>{
 for(let n=2;n<=9999;n++) {
  const model=arithmetic.buildFactorModel(n);
  assert.equal(model.factors.reduce((a,b)=>a*b,1),n);
  assert(model.factors.every(arithmetic.facIsPrime));
 }
});
test('GCD and LCM match independent Euclidean arithmetic',()=>{
 const gcd=(a,b)=>b?gcd(b,a%b):a;
 for(const a of [2,7,12,24,60,97,144,999])for(const b of [2,3,18,25,96,999]) {
  const expected=gcd(a,b);
  assert.equal(arithmetic.buildNsdModel({a,b}).value,expected);
  assert.equal(arithmetic.buildNskModel({a,b}).value,a*b/expected);
 }
});
test('column arithmetic keeps carries, borrow chains, zero digits, and remainders',()=>{
 for(const [fn,a,b,result] of [
  [arithmetic.addSteps,9999,1,'10000'],
  [arithmetic.subSteps,10000,1,'9999'],
  [arithmetic.subSteps,57,57,'0'],
  [arithmetic.multSteps,507,203,'102921'],
  [arithmetic.multSteps,507,200,'101400'],
  [arithmetic.divSteps,10005,5,'2001'],
  [arithmetic.divSteps,10006,5,'2001, остача 1']
 ])assert(fn(a,b).at(-1).text.includes(result));
 assert.throws(()=>arithmetic.subSteps(2,3));
 assert.throws(()=>arithmetic.divSteps(2,3));
});
