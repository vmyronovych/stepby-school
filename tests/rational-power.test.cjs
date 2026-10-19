// Запуск: node --test tests/rational-power.test.cjs. Без залежностей.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const context=vm.createContext({document:{getElementById:()=>null}});
for(const file of ['js/data.js','js/core/util.js','js/core/registry.js','js/core/handwriting.js','js/core/formula.js','js/tools/rational-power.js']){
  vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context);
}
const examples=JSON.parse(vm.runInContext('JSON.stringify(RP.examples)',context));

// Незалежний числовий інтерпретатор AST. Не використовує обчислення інструмента.
function evaluate(node,variables={}){
  const ev=n=>evaluate(n,variables);
  switch(node.t){
    case 'num': return node.q.n/node.q.d;
    case 'x': {
      const symbol=node.symbol||'x';
      assert(Object.hasOwn(variables,symbol),'Немає значення '+symbol);
      return variables[symbol];
    }
    case 'paren': return ev(node.a);
    case 'neg': return -ev(node.a);
    case 'add': return ev(node.a)+ev(node.b);
    case 'sub': return ev(node.a)-ev(node.b);
    case 'mul': return ev(node.a)*ev(node.b);
    case 'div': {
      const denominator=ev(node.b);
      if(denominator===0) throw new RangeError('Нульовий знаменник');
      return ev(node.a)/denominator;
    }
    case 'pow': {
      const base=ev(node.a),exponent=ev(node.e);
      if((base===0&&exponent<=0)||(base<0&&!Number.isInteger(exponent))) throw new RangeError('Недопустимий степінь');
      return Math.pow(base,exponent);
    }
    case 'root': {
      const radicand=ev(node.a),degree=Number(node.n);
      if(radicand<0&&degree%2===0) throw new RangeError('Парний корінь від’ємного числа');
      return Math.sign(radicand)*Math.pow(Math.abs(radicand),1/degree);
    }
    default: throw new Error('Непідтримуваний вузол '+node.t);
  }
}
function near(actual,expected,label){
  assert(Number.isFinite(actual),label+': результат має бути скінченним');
  assert(Math.abs(actual-expected)<=1e-10*Math.max(1,Math.abs(expected)),`${label}: ${actual} ≠ ${expected}`);
}
const values={
  '6.1':[{vars:{},answer:Math.cbrt(5)}],
  '6.2':[{vars:{},answer:1/Math.pow(3,1/9)}],
  '6.3':[0,0.25,1,9,100].map(x=>({vars:{x},answer:Math.sqrt(x)})),
  '6.4':[0.125,1,2,16,100].map(m=>({vars:{m},answer:Math.pow(m,-9/14)})),
  '6.5':[{vars:{},answer:81}],
  '6.6':[{vars:{},answer:4}],
  '6.7':[{vars:{},answer:9}],
  '6.8':[{vars:{},answer:49}],
  '6.9':[0,0.125,1,8].flatMap(b=>[0,0.25,1,4].map(c=>({vars:{b,c},answer:9*Math.pow(b,4/3)-c*c*c}))),
  '6.10':[0,0.25,1,9].flatMap(m=>[0,0.5,1,16].map(n=>({vars:{m,n},answer:m-n}))),
  '6.11':[{vars:{},answer:100}],
  '6.12':[{vars:{},answer:1}],
  '6.13':[0,0.25,1,9,24,26,36,100].map(a=>({vars:{a},answer:Math.sqrt(a)})),
};
for(const example of examples){
  test(`кожне перетворення ${example.group} зберігає значення та дає правильну відповідь`,()=>{
    assert(values[example.group]);
    for(const {vars,answer} of values[example.group]){
      for(const [rowIndex,row] of example.rows.entries()){
        assert(row.parts.length>0);
        for(const [partIndex,part] of row.parts.entries()){
          near(evaluate(part,vars),answer,`${example.group}, рядок ${rowIndex+1}, частина ${partIndex+1}, ${JSON.stringify(vars)}`);
        }
      }
    }
  });
}
const conditions={
  '6.3':'x ≥ 0', '6.4':'m > 0', '6.9':'b ≥ 0; c ≥ 0',
  '6.10':'m ≥ 0; n ≥ 0', '6.13':'a ≥ 0; a ≠ 25',
};
test('символьні приклади показують усі обмеження початкового виразу',()=>{
  for(const [group,condition] of Object.entries(conditions)){
    assert.equal(examples.find(e=>e.group===group).condition,condition);
  }
});
const invalid={
  '6.3':[{x:-1}], '6.4':[{m:0},{m:-1}],
  '6.9':[{b:-1,c:1},{b:1,c:-1}],
  '6.10':[{m:-1,n:1},{m:1,n:-1}], '6.13':[{a:-1},{a:25}],
};
test('обмеження справді виключають недопустимі значення початкових виразів',()=>{
  for(const [group,samples] of Object.entries(invalid)){
    const initial=examples.find(e=>e.group===group).rows[0].parts[0];
    for(const variables of samples) assert.throws(()=>evaluate(initial,variables),RangeError);
  }
});
test('скорочення дробу зберігає виключене значення a = 25',()=>{
  const example=examples.find(e=>e.group==='6.13');
  assert.throws(()=>evaluate(example.rows[0].parts[0],{a:25}),RangeError);
  assert.equal(evaluate(example.rows.at(-1).parts.at(-1),{a:25}),5);
  assert(example.condition.includes('a ≠ 25'));
});
test('усі 13 груп мають завдання та доступну модель',()=>{
  assert.deepEqual(examples.map(e=>e.group),Array.from({length:13},(_,i)=>'6.'+(i+1)));
  const topic=JSON.parse(vm.runInContext('JSON.stringify(DB.topics.find(t=>t.id==="rational-power"))',context));
  assert.equal(topic.cls,'10a');
  assert.equal(topic.tasks.length,13);
  assert.equal(new Set(topic.tasks.map(t=>t.cfg.example)).size,13);
  for(const task of topic.tasks){
    const group=vm.runInContext(`buildRationalPower(${JSON.stringify(task.cfg)}).group`,context);
    assert.equal(group,task.cfg.example);
  }
  assert.throws(()=>vm.runInContext('buildRationalPower({example:"6.14"})',context),error=>typeof error==='string');
});
