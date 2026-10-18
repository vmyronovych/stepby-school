// Запуск: node --test tests/irrational.test.cjs. Залежностей немає.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const ctx=vm.createContext({document:{getElementById:()=>null}});
for(const f of ['js/data.js','js/core/util.js','js/core/registry.js','js/core/formula.js','js/tools/linear.js','js/tools/domain.js','js/tools/irrational.js']){
 vm.runInContext(fs.readFileSync(path.join(__dirname,'..',f),'utf8'),ctx);
}
function solve(text){
 return JSON.parse(vm.runInContext(`JSON.stringify((()=>{const m=buildIrrationalModel(${JSON.stringify(text)});return {answer:m.answer.map(r=>fmlText(r.ast)),domain:domIntervalText(m.domain),intervals:m.answerIntervals?domIntervalText(m.answerIntervals):null,linear:m.linearRows,checks:m.checks.map(c=>({ok:c.ok,inDomain:c.inDomain,rightOK:c.rightOK})),steps:m.steps}})())`,ctx));
}
const examples=[
 ['sqrt(x-2)=3',['11']],
 ['sqrt(x+2)=x',['2']],
 ['sqrt(x+1)=-2',[]],
 ['sqrt(x-2)=0',['2']],
 ['sqrt(2x+3)=sqrt(x+5)',['2']],
 ['sqrt(x+2)+1=x',['(3 + √13)/2']],
 ['3=sqrt(x-2)',['11']],
 ['x=sqrt(x+2)',['2']],
 ['sqrt(x+1)=x',['(1 + √5)/2']],
 ['sqrt(x^2-2)=0',['−√2','√2']],
 ['sqrt(x^2+2)=sqrt(2x^2)',['−√2','√2']],
 ['sqrt(x^2+1)=0',[]],
 ['sqrt(x^2-2x+1)=0',['1']],
 ['sqrt(-x^2-1)=0',[]],
 ['sqrt(x-2)=sqrt(2-x)',['2']],
 ['sqrt(x-2)=sqrt(1-x)',[]],
 ['sqrt(x+2)=sqrt(x+3)',[]],
 ['sqrt(2x)=3',['9/2']],
 ['sqrt(x/3)=1/2',['3/4']],
 ['sqrt(0)=x',['0']],
 ['sqrt(2)=x',['√2']],
 ['sqrt(x^2-1)=x',[]],
 ['sqrt(x^2-1)=sqrt(3-x^2)',['−√2','√2']],
];
for(const [equation,answer] of examples){test(equation,()=>assert.deepEqual(solve(equation).answer,answer));}
test('сторонній корінь належить ОДЗ, але права частина від’ємна',()=>{
 assert.deepEqual(solve('sqrt(x+2)=x').checks,[{ok:false,inDomain:true,rightOK:false},{ok:true,inDomain:true,rightOK:true}]);
});
test('точні межі ОДЗ та ізольована точка',()=>{
 assert.equal(solve('sqrt(x^2-2)=0').domain,'(−∞; −√2] ∪ [√2; +∞)');
 assert.equal(solve('sqrt(x-2)=sqrt(2-x)').domain,'{2}');
});
test('тотожності враховують ОДЗ і знак правої частини',()=>{
 assert.equal(solve('sqrt(x^2)=x').intervals,'[0; +∞)');
 assert.equal(solve('sqrt(x^2)=-x').intervals,'(−∞; 0]');
 assert.equal(solve('sqrt(x^2-2)=sqrt(x^2-2)').intervals,'(−∞; −√2] ∪ [√2; +∞)');
});
for(const bad of ['x=2','sqrt(x)+sqrt(x+1)=2','sqrt(x^3)=1','sqrt(1/x)=1','sqrt(x)=x^2','sqrt(x)=1=2','sqrt(x)=','sqrt(x)=sqrt(x+1)+1']){
 test('непідтримувана умова: '+bad,()=>assert.throws(()=>solve(bad),e=>typeof e==='string'));
}
test('ідентифікатори тем і завдань унікальні; урок після області визначення',()=>{
 const data=JSON.parse(vm.runInContext('JSON.stringify(DB.topics)',ctx));
 for(const ids of [data.map(t=>t.id),data.flatMap(t=>(t.tasks||[]).map(k=>k.id))]) assert.equal(new Set(ids).size,ids.length);
 assert.equal(data.findIndex(t=>t.id==='irrational'),data.findIndex(t=>t.id==='t9')+1);
 assert.equal(data.find(t=>t.id==='irrational').tasks.length,11);
});

test('близькі межі ОДЗ не зливаються',()=>{
 const m=solve('sqrt(x^2-0.00000000000000000001)=sqrt(x^2-0.00000000000000000001)');
 assert.equal(m.domain,'(−∞; −1/10000000000] ∪ [1/10000000000; +∞)');
 assert.equal(m.intervals,m.domain);
});
test('лінійні кроки не округлюють дробові коефіцієнти',()=>{
 for(const text of ['sqrt(x/3)=1','sqrt(0.001x)=1','sqrt(x/3)=1/2']){
  const m=solve(text);
  const tokens=m.linear.flatMap(r=>r.tokens.map(t=>t.t));
  assert(!tokens.some(t=>t.includes('.')));
  assert(!tokens.includes('0.33'));
 }
 assert.deepEqual(solve('sqrt(0.001x)=1').answer,['1000']);
});

test('після усунення кореня переносимо число одразу вправо без ділення на 1',()=>{
 const m=solve('sqrt(x-2)=3');
 assert.deepEqual(m.linear.map(r=>r.tokens.map(t=>t.t).join(' ')),['x − 2 = 9','x = 9 + 2','x = 11']);
 assert(!m.steps.some(s=>s.title==='Зводимо до рівняння'));
 assert(!m.steps.some(s=>s.text.includes('ділимо на 1')));
 assert(!m.steps.some(s=>s.title==='Кандидат у корені'));
});
test('один доданок не потребує зведення чи ділення на 1',()=>{
 const m=solve('sqrt(x-2)=0');
 assert.deepEqual(m.linear.map(r=>r.tokens.map(t=>t.t).join(' ')),['x − 2 = 0','x = 2']);
});
test('ділення залишається потрібним для коефіцієнта, відмінного від 1',()=>{
 const m=solve('sqrt(2x-1)=2');
 assert.deepEqual(m.answer,['5/2']);
 assert(m.linear.some(r=>r.tokens.some(t=>t.t===':')));
});

for(const [equation,answer] of [
 ['root(3,x-1)=2',['9']],
 ['root(3,x+1)=-2',['−9']],
 ['∛(x+1)=-2',['−9']],
 ['cbrt(x+1)=-2',['−9']],
 ['-2=root(3,x+1)',['−9']],
 ['root(3,2x-1)=root(3,x+3)',['4']],
 ['root(3,x^2-1)=2',['−3','3']],
 ['root(3,x^2+1)=0',[]],
 ['root(3,x-2)=0',['2']],
 ['root(3,x)+1=-1',['−8']],
 ['root(3,x)+x=x-2',['−8']],
 ['root(3,x^2-2)=0',['−√2','√2']],
 ['root(3,x/3)=1/2',['3/8']],
 ['root(3,2x-1)=root(3,x-4)',['−3']],
]) test(equation,()=>{const m=solve(equation);assert.deepEqual(m.answer,answer);assert.equal(m.domain,'(−∞; +∞)');});
test('кубічні корені не потребують умов невід’ємності',()=>{
 const m=solve('root(3,x+1)=-2');
 assert(!m.steps.some(s=>s.title==='Умова рівності'));
 assert(m.steps.some(s=>s.title==='Підносимо обидві частини до куба'));
 assert(m.checks.every(c=>c.ok));
 assert(!m.steps.some(s=>s.title==='Зводимо до рівняння'));
 assert(!m.steps.some(s=>s.text.includes('ділимо на 1')));
});
test('тотожність кубічних коренів має ОДЗ усі дійсні числа',()=>{
 assert.equal(solve('root(3,x^2-2)=root(3,x^2-2)').intervals,'(−∞; +∞)');
});
for(const equation of ['root(3,x)=x','root(3,x)=sqrt(x)','root(4,x)=2']){
 test('межі підтримки: '+equation,()=>assert.throws(()=>solve(equation),e=>typeof e==='string'));
}

function substitution(text){
 return JSON.parse(vm.runInContext(`JSON.stringify((()=>{const m=toolDef('irrational').build({text:${JSON.stringify(text)},method:'substitution'});return {answer:m.answer.map(r=>fmlText(r.ast)),replacements:m.replacements.map(r=>({t:fmlText(r.t.ast),ok:r.ok})),steps:m.steps,checks:m.checks}})())`,ctx));
}
for(const [equation,answer] of [
 ['x-3sqrt(x)+2=0',['1','4']],
 ['x+sqrt(x)-2=0',['1']],
 ['x-sqrt(x)=0',['0','1']],
 ['x+sqrt(x)=0',['0']],
 ['x-2sqrt(x)+1=0',['1']],
 ['4x-4sqrt(x)-3=0',['9/4']],
 ['x+sqrt(x)-1=0',['(3 − √5)/2']],
 ['x-sqrt(x)-1=0',['(3 + √5)/2']],
 ['x+sqrt(x)+1=0',[]],
 ['x+3sqrt(x)+2=0',[]],
 ['-x+3sqrt(x)-2=0',['1','4']],
 ['3sqrt(x)=x+2',['1','4']],
 ['x+0sqrt(x)-1=0',['1']],
]) test('заміна: '+equation,()=>assert.deepEqual(substitution(equation).answer,answer));
test('від’ємний t відкидаємо до повернення до x',()=>{
 const m=substitution('x+sqrt(x)-2=0');
 assert.deepEqual(m.replacements,[{t:'−2',ok:false},{t:'1',ok:true}]);
 assert.equal(m.checks.length,1);
 assert.equal(m.steps.filter(s=>s.title.startsWith('Повертаємося до x')).length,1);
});
test('символ t є у формулах та індексованих коренях',()=>{
 const m=substitution('x-3sqrt(x)+2=0');
 const rows=m.steps.filter(s=>s.title==='Розв’язуємо рівняння відносно t');
 assert(rows.some(s=>s.parts.some(p=>p.x && p.symbol==='t')));
 assert(rows.every(s=>!s.text.includes('x')));
 assert.equal(vm.runInContext("fmlText(irRenameVariable(polyAst([Q(2),Q(-3),Q(1)]),'t'))",ctx),'t² − 3t + 2');
});
for(const text of ['x=1','sqrt(x)-2=0','x^2+sqrt(x)=0','x+sqrt(x+1)=0','x+root(3,x)=0','x+sqrt(x)=']){
 test('межі методу заміни: '+text,()=>assert.throws(()=>substitution(text),e=>typeof e==='string'));
}
