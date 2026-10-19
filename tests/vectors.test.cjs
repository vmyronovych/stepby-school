const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ctx=vm.createContext({DOCS:{}});
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../js/geometry/vectors.js'),'utf8'),ctx);
const lesson=vm.runInContext('VectorLesson',ctx);
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../js/geometry/vector-practice.js'),'utf8'),ctx);
const practice=vm.runInContext('VectorPractice',ctx);
test('готові приклади відповідають означенням',()=>{
  const expected={equal:[true,true,true,false],parallel:[true,false,true,false],opposite:[true,false,false,true],crossing:[false,false,false,false],zero:[true,false,false,false],zeros:[true,true,false,false]};
  for(const [key,values] of Object.entries(expected)){
    const r=lesson.classify(lesson.presets[key].points);
    assert.deepEqual([r.collinear,r.equal,r.same,r.opposite],values,key);
  }
});
test('однакові модулі не гарантують рівності',()=>{
  for(const key of ['opposite','crossing']){
    const r=lesson.classify(lesson.presets[key].points);
    assert.equal(r.n,r.m);assert.equal(r.equal,false);
  }
});
test('перенесення обох кінців зберігає вектор',()=>{
  for(const {points} of Object.values(lesson.presets)){
    const moved=points.map((p,i)=>[p[0]+(i<2?0:2),p[1]+(i<2?0:-3)]);
    assert.equal(JSON.stringify(lesson.classify(moved)),JSON.stringify(lesson.classify(points)));
  }
});
test('одна пряма, вертикальні вектори та перестановка кінців',()=>{
  const same=lesson.classify([[2,2],[2,5],[2,6],[2,9]]);
  assert(same.collinear&&same.equal&&same.same);
  const reversed=lesson.classify([[2,5],[2,2],[2,6],[2,9]]);
  assert(reversed.collinear&&reversed.opposite&&!reversed.equal);
});
test('близькі напрями не прирівнюються',()=>{
  const r=lesson.classify([[0,0],[16,10],[0,0],[15,9]]);
  assert.equal(r.collinear,false);
});
test('модуль — невід’ємна довжина, нуль не має напряму',()=>{
  const r=lesson.classify([[4,7],[4,7],[10,8],[14,5]]);
  assert.equal(r.n,0);assert.equal(r.m,25);assert(r.zero&&!r.same&&!r.opposite);
  assert.equal(lesson.length(0),'0');assert.equal(lesson.length(25),'5');
  assert.equal(lesson.length(2),'√2 ≈ 1,41');
});
test('задачі про модуль відповідають довжинам рисунків',()=>{
  const numeric=practice.problems.filter(p=>p.kind==='number');
  assert.equal(numeric.length,2);
  for(const p of numeric){
    const [a,b]=p.points;
    assert.equal(Number(p.answer),Math.hypot(b[0]-a[0],b[1]-a[1]));
  }
});
test('твердження у відповідях узгоджені з геометрією задач',()=>{
  const result=id=>lesson.classify(practice.problems.find(p=>p.id===id).points);
  assert.equal(result('direction').opposite,true);
  assert.equal(result('collinear').collinear,true);
  assert.equal(result('collinear').equal,false);
  assert.equal(result('equality').equal,true);
  assert.equal(result('same-length').n,result('same-length').m);
  assert.equal(result('same-length').collinear,false);
  const zero=result('zero');
  assert.equal(zero.n,0);assert(zero.m>0&&zero.collinear&&!zero.equal);
});
test('перевірка чисел приймає кому, крапку та пробіли і відхиляє порожній або сторонній текст',()=>{
  const p=practice.problems[0];
  for(const value of ['6','6,0','6.00',' 6 '])assert.equal(practice.checkAnswer(p,value).correct,true,value);
  for(const value of ['',' ','abc','6abc','6+0','Infinity','-6'])assert.equal(practice.checkAnswer(p,value).valid,false,value);
  assert.equal(practice.checkAnswer(p,'7').valid,true);
  assert.equal(practice.checkAnswer(p,'7').correct,false);
});
test('у кожній задачі з вибором рівно одна правильна відповідь',()=>{
  assert.equal(new Set(practice.problems.map(p=>p.id)).size,7);
  for(const p of practice.problems.filter(p=>p.kind==='choice')){
    assert.equal(p.options.filter(([key])=>practice.checkAnswer(p,key).correct).length,1,p.id);
    assert.equal(practice.checkAnswer(p,'').valid,false);
    assert.equal(practice.checkAnswer(p,'unknown').valid,false);
  }
});
