const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ctx=vm.createContext({DOCS:{}});
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../js/geometry/vector-scaling.js'),'utf8'),ctx);
const lesson=vm.runInContext('VectorScaling',ctx);
test('множення координат, модуля та напрям узгоджені для всього діапазону панелі',()=>{
  for(let x=-4;x<=4;x++)for(let y=-4;y<=4;y++)for(let k=-3;k<=3;k+=.25){
    const m=lesson.model(x,y,k);
    assert.equal(m.result[0],x*k);assert.equal(m.result[1],y*k);
    assert(Math.abs(Math.hypot(...m.result)-m.scaledLength)<1e-10);
    assert.equal(m.direction,!x&&!y||!k?'Нульовий вектор не має напряму':k>0?'Співнапрямлені':'Протилежно напрямлені');
  }
});
test('нуль, одиниця, протилежний вектор та дробовий множник',()=>{
  const values=[[2,[6,4]],[-1,[-3,-2]],[.5,[1.5,1]],[0,[0,0]]];
  for(const [k,expected] of values)assert.deepEqual(Array.from(lesson.model(3,2,k).result),expected);
  assert.equal(lesson.model(0,0,-3).scaledLength,0);
});
test('самоперевірка містить коректні відповіді на шість різних задач',()=>{
  const q=lesson.questions;
  assert.equal(q.length,6);
  assert.equal(q[0].options[q[0].answer],String(lesson.model(6,0,-2).scaledLength));
  assert.equal(q[1].options[q[1].answer],lesson.model(1,0,-.5).direction);
  assert.deepEqual(Array.from(lesson.model(-2,3,-3).result),[6,-9]);assert.equal(q[2].answer,0);
  assert.deepEqual(Array.from(lesson.model(2,-4,-.5).result),[-1,2]);assert.equal(q[3].answer,2);
  assert.equal(q[4].answer,0);assert.equal(q[5].answer,1);
});
