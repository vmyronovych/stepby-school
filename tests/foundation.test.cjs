const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadTypeScript}=require('./helpers/load-typescript.cjs');
const core=loadTypeScript('src/engines/core/index.ts');
test('rational operations preserve reduced signed fractions',()=>{
 const {Q,qAdd,qMul,qDiv,qSqrt}=core;
 assert.deepEqual(Q(6,-8),{n:-3,d:4});
 assert.deepEqual(qAdd(Q(1,3),Q(1,6)),Q(1,2));
 assert.deepEqual(qMul(Q(-2,3),Q(9,4)),Q(-3,2));
 assert.deepEqual(qDiv(Q(2,3),Q(-4,5)),Q(-5,6));
 assert.deepEqual(qSqrt(Q(9,16)),Q(3,4));
 assert.equal(qSqrt(Q(2)),null);
 assert.throws(()=>Q(1,0));
});
test('parser, polynomial conversion, and rendering retain exact roots and powers',()=>{
 const expression=core.parseFormula('sqrt(x - 2)/(x^2 - 9)');
 assert.equal(core.fmlText(expression),'√(x − 2)/(x² − 9)');
 assert.deepEqual(core.toPoly(core.parseFormula('(x-2)(x+3)')),[core.Q(-6),core.Q(1),core.Q(1)]);
 assert.equal(core.toPoly(core.parseFormula('x^3')),null);
 const pen={writing:true,order:0};
 const html=core.formulaHtml(expression,pen);
 assert(html.includes('ffbar hwa'));
 assert(html.includes('data-fid="f0"'));
 assert.equal(pen.order,10);
});
test('tool assembly rejects duplicates atomically and dispatches only its built models',()=>{
 const definition=core.defineTool('contract-test',{
  name:'test',icon:'x',color:'red',bg:'white',read:()=>({}),
  build:()=>({steps:[{text:'one'}],answer:42}),
  view:(model,context)=>`${model.answer}:${context.step.text}`,
 });
 assert.throws(()=>core.registerTools([definition,definition]),/уже зареєстровано/);
 assert.equal(core.toolDef('contract-test'),null);
 core.registerTools([definition]);
 assert.equal(core.toolDef('contract-test'),definition);
 const model=definition.build({});
 assert.equal(definition.view(model,{step:model.steps[0],index:0,anim:null}),'42:one');
 assert.throws(()=>definition.view({...model},{step:model.steps[0],index:0,anim:null}),/невідома модель/);
 assert.throws(()=>definition.view(model,{step:{text:'one'},index:0,anim:null}),/невідомий крок/);
});
