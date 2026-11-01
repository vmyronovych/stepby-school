const {test}=require('node:test');
const assert=require('node:assert/strict');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const { ScalarProduct: lesson } = loadTypeScript('src/features/geometry/engines/index.ts');
test('усі підпункти підручника дають звірені відповіді',()=>{
  const expected=[[3,-5],[5,17],[5*Math.sqrt(3),2,-Math.sqrt(2),-50],[0],['ні','так']];
  assert.deepEqual(Array.from(lesson.groups,g=>g.ref),['10.1','10.3','10.10','10.12','10.14']);
  expected.forEach((items,g)=>items.forEach((answer,i)=>{
    const ex=lesson.exercise(g,i);
    assert.equal(ex.answer,answer);
    if(typeof answer==='number')assert(Math.abs(ex.m.dot-answer)<1e-12);
    assert(ex.steps.length>=3);
  }));
});
test('формули за координатами та кутом узгоджені; знак і нульові вектори',()=>{
  for(let angle=0;angle<=180;angle++)for(const la of [1,5,10])for(const lb of [1,2,10]){
    const m=lesson.model(...lesson.polar(la,lb,angle));
    assert(Math.abs(m.dot-la*lb*Math.cos(angle*Math.PI/180))<1e-10);
    assert(Math.abs(m.angle-angle)<1e-5);
  }
  assert.equal(lesson.model([0,0],[1,1]).angle,null);
  assert.equal(lesson.model([0,0],[1,1]).perpendicular,false);
  assert.equal(lesson.model([-1,10],[20,2]).perpendicular,true);
  assert.equal(lesson.model([1,5],[-5,-1]).perpendicular,false);
});
