/* ---------- 1) МНОЖЕННЯ В СТОВПЧИК ---------- */
function multSteps(a,b){
  a=Math.abs(Math.trunc(a)); b=Math.abs(Math.trunc(b));
  if(!a||!b||a>999999||b>9999) throw 'bad';
  const total=a*b;
  const B=String(b);
  const width=String(total).length+1;
  const partials=[]; // {val, shift, digit}
  for(let i=B.length-1;i>=0;i--){ const digit=+B[i]; const shift=B.length-1-i; partials.push({val:a*digit, shift, digit}); }
  const steps=[];
  // базовий макет
  const rowA=()=>mkRow(a, width-1, width);
  const rowB=()=>{ const r=mkRow(b, width-1, width); const c=width-String(b).length-1; if(c>=0) r.cells[c]={ch:'×',cls:'op'}; return r; };

  // крок 0 — пишемо обидва множники
  const a0=rowA(); a0.anim=true; const b0=rowB(); b0.anim=true;
  steps.push({ html: colGrid([a0, b0, {line:true}], width),
    text:`Записуємо числа у стовпчик, вирівнюючи за розрядами. Множимо ${a} на ${b}.` });

  // кроки-часткові добутки (пишеться лише новий частковий добуток)
  const shownPartials=[];
  partials.forEach((p,idx)=>{
    const pr=mkRow(p.val, width-1-p.shift, width);
    shownPartials.push(pr);
    const rows=[rowA(), rowB(), {line:true}, ...shownPartials.map((x,i)=>({cells:x.cells, anim:i===idx}))];
    steps.push({ html: colGrid(rows, width),
      text: partials.length===1
        ? `Множимо ${a} × ${p.digit} = ${p.val}. Це і є відповідь.`
        : `Множимо ${a} на ${p.digit} (розряд ${p.shift===0?'одиниць':p.shift===1?'десятків':'сотень'}): ${a} × ${p.digit} = ${p.val}${p.shift?`, записуємо зі зсувом на ${p.shift} ${p.shift===1?'розряд':'розряди'} вліво`:''}.` });
  });

  // додавання часткових добутків — пишеться підсумок
  if(partials.length>1){
    const sum=mkRow(total, width-1, width, 'res'); sum.anim=true;
    const rows=[rowA(), rowB(), {line:true}, ...shownPartials.map(x=>({cells:x.cells})), {line:true}, sum];
    steps.push({ html: colGrid(rows, width),
      text:`Додаємо часткові добутки стовпчиком і отримуємо результат: ${total}.` });
  }
  // фінал
  steps.push({ html:hwEqline([{t:String(a)},{t:'×',cls:'op'},{t:String(b)},{t:'=',cls:'op'},{t:String(total),cls:'res'}]),
    text:`Готово! ${a} × ${b} = ${total}.` });
  return steps;
}
