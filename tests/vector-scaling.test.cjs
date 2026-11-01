const {test}=require('node:test');
const assert=require('node:assert/strict');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const { VectorScaling: lesson } = loadTypeScript('src/features/geometry/engines/index.ts');
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
