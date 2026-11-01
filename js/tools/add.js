/* =========================================================
   ДОДАВАННЯ В СТОВПЧИК (ядро — js/core/column.js)
   Розряд за розрядом справа наліво: «7+5=» → «12 (2 — записуємо, 1 — запам'ятовуємо)» →
   2 летить під риску, 1 — у правий верхній кут наступної цифри першого доданка.
   ========================================================= */
function addSteps(a,b){
  a=Math.abs(Math.trunc(a)); b=Math.abs(Math.trunc(b));
  if(!a||!b||a>99999999||b>99999999) throw 'bad';
  const total=a+b, A=String(a), B=String(b), T=String(total);
  const W=T.length+1, last=W-1;                     // зліва завжди є вільний стовпець під знак
  const aRow=0, bRow=1, sumRow=2;
  const nums=[{row:aRow, val:a, end:last}, {row:bRow, val:b, end:last}];
  const ops=colAddPlan(nums, last, sumRow);
  const sheet=colSheet({W, rows:3, notes:ops.filter(o=>o.note)});
  sheet.ul[bRow]=[0, last];

  // крок 0 — записуємо доданки; «+» — посередині між ними, лівіше за довший
  sheet.snap({news:[...colNum(A,aRow,last), {r:bRow, c:last-Math.max(A.length,B.length), ch:'+', cls:'op mid'}, ...colNum(B,bRow,last)],
    text:`Записуємо числа у стовпчик: одиниці під одиницями, десятки під десятками. Додаємо справа наліво, починаючи з одиниць.`});
  colAddRun(sheet, ops, {nums, last, sumRow, topRow:aRow, total});
  sheet.snap({text:`Готово! ${a} + ${b} = ${total}.`,
    tail:`<div class="col-final">${hwEqline([{t:A},{t:'+',cls:'op'},{t:B},{t:'=',cls:'op'},{t:T,cls:'res'}])}</div>`});
  return sheet.steps;
}

registerTool('add', Object.assign({}, colToolBase, {
  name:'Додавання в стовпчик', icon:'➕', color:'var(--amber)', bg:'var(--amber-l)',
  build: cfg => ({steps: addSteps(cfg.a, cfg.b)}),
  read: v => ({a:+v('i_a'), b:+v('i_b')}),
  errorHint:'Введи два натуральні числа, не більші за 99 999 999.',
}));
