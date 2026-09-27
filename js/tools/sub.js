/* =========================================================
   ВІДНІМАННЯ В СТОВПЧИК (ядро — js/core/column.js)
   Розряд за розрядом справа наліво. Якщо цифри зменшуваного не вистачає — позичаємо 1
   у сусіда зліва: над ним з'являється крапка (дрібно, у правому верхньому куті), а тут
   маємо на 10 більше. Коли доходимо до цифри з крапкою — спершу віднімаємо від неї 1;
   нуль із крапкою сам позичає в сусіда (10 − 1 = 9).
   Кроки: «14−7=» → «7 (7 — записуємо)» → 7 летить під риску. Нулі на початку різниці не пишемо.
   ========================================================= */
function subSteps(a,b){
  a=Math.abs(Math.trunc(a)); b=Math.abs(Math.trunc(b));
  if(!a||!b||a>99999999) throw 'bad';
  if(b>a) throw 'Зменшуване має бути не менше за від’ємник: від меншого числа більше не віднімеш.';
  const diff=a-b, A=String(a), B=String(b), T=String(diff);
  const W=A.length+1, last=W-1;                     // зліва завжди є вільний стовпець під знак
  const aRow=0, bRow=1, rRow=2;
  const firstRes=last-T.length+1;                   // лівіше — нулі на початку, їх не пишемо

  // ---- план: розряд за розрядом ----
  const ops=[]; let bi=0;
  for(let col=last; col>=1; col--){
    const k=last-col, t=+A[A.length-1-k], bd=k<B.length ? +B[B.length-1-k] : null;
    const e=t-bi, bo=e<(bd||0) ? 1 : 0, v=e+10*bo, r=v-(bd||0);
    const o={col, k, t, bd, bi, bo, e, v, r, lead:col<firstRes};
    if(bd==null && !bi) { ops.push(o); bi=0; continue; }      // «зносимо»
    const wr=o.lead ? [{ch:String(r), cls:'sc w'}] : colWritten(r, true);
    if(bi && t===0)                                           // нуль із крапкою: позичає сам
      o.note = bd==null ? [[...colAsk('10−1='), ...wr]]
        : [[...colAsk('10−1='), ...colPlain(9)], [...colPlain(`9−${bd}=`), ...wr]];
    else if(bi)
      o.note = bd==null ? [[...colAsk(`${t}−1=`), ...wr]]
        : [[...colAsk(`${t}−1=`), ...colPlain(e)], [...colPlain(`${v}−${bd}=`), ...wr]];
    else o.note=[[...colAsk(`${v}−${bd}=`), ...wr]];
    o.noteRow=rRow;
    o.ann = o.lead ? [`(<b class="w">0</b> — на початку числа не пишемо)`] : colAnn(r);
    ops.push(o); bi=bo;
  }

  const sheet=colSheet({W, rows:3, notes:ops.filter(o=>o.note)});
  const {G, ul, snap}=sheet;
  ul[bRow]=[0, last];

  // крок 0 — записуємо зменшуване й від'ємник; «−» — посередині між ними, лівіше за довше
  snap({news:[...colNum(A,aRow,last), {r:bRow, c:last-Math.max(A.length,B.length), ch:'−', cls:'op mid'}, ...colNum(B,bRow,last)],
    text:`Записуємо числа у стовпчик: одиниці під одиницями. Віднімаємо справа наліво, починаючи з одиниць.`});

  ops.forEach((o,i)=>{
    const hl={};
    hl[aRow+','+o.col]='hl'; if(o.bd!=null) hl[bRow+','+o.col]='hl';
    if(o.bi) hl[aRow+','+o.col+'^']='hlc';
    const head=`Розряд ${COL_GEN[o.k]}. `;
    const answer=i===ops.length-1 ? ` Відповідь: ${diff}.` : '';
    const used=()=>{ if(o.bi) G[aRow][o.col].sup.cls='cy dot used'; };

    if(!o.note){                                             // рахувати нічого — один крок
      snap({news:[{r:rRow, c:o.col, ch:String(o.t), cls:'res'}], hl, text:head+`Лише ${o.t} — зносимо ${o.t}.`+answer});
      return;
    }
    // крапка над сусідом, у якого позичаємо, — пишеться разом із питанням
    const dot=o.bo ? [{r:aRow, c:o.col-1, sup:true, ch:'·', cls:'cy dot'}] : [];
    let tq=head;
    if(o.bi && o.t===0) tq+=`Над 0 стоїть крапка — ми в нього позичили, а в нуля нічого немає. Він сам позичає 1 у сусіда зліва (ставимо крапку) — маємо 10, і 1 віддаємо.`;
    else if(o.bi) tq+=`Над ${o.t} стоїть крапка — ми в нього позичили, тож спершу віднімаємо 1.`
      +(o.bo ? ` Лишається ${o.e}, а це менше за ${o.bd}: позичаємо 1 у сусіда зліва (ставимо крапку) — маємо ${o.v}.` : '');
    else if(o.bo) tq+=`${o.t} менше за ${o.bd} — не віднімеш. Позичаємо 1 у сусіда зліва й ставимо над ним крапку. Тут це 10, тож маємо ${o.v}.`;
    else tq+=`Віднімаємо ${o.bd} від ${o.t}.`;
    snap({news:dot, hl, op:o, phase:'q', text:tq});

    const calc = o.bi
      ? (o.t===0 ? `10 − 1 = 9` : `${o.t} − 1 = ${o.e}`)+(o.bd!=null ? `, ${o.v} − ${o.bd} = ${o.r}` : '')
      : `${o.v} − ${o.bd} = ${o.r}`;
    snap({hl, op:o, phase:'a', text:calc+'.'+(o.lead ? ` Нуль на початку числа не пишемо.${answer}` : ` Записуємо ${o.r}.`)});
    if(o.lead){ used(); return; }

    snap({news:[{r:rRow, c:o.col, ch:String(o.r), cls:'res', role:'w'}], hl, op:o, phase:'fly',
      text:`${o.r} стає під риску.`+answer});
    used();
  });

  snap({text:`Готово! ${a} − ${b} = ${diff}.`,
    tail:`<div class="col-final">${hwEqline([{t:A},{t:'−',cls:'op'},{t:B},{t:'=',cls:'op'},{t:T,cls:'res'}])}</div>`});
  return sheet.steps;
}

registerTool('sub', Object.assign({}, colToolBase, {
  name:'Віднімання в стовпчик', icon:'➖', color:'var(--pink)', bg:'var(--pink-l)',
  build: cfg => ({steps: subSteps(cfg.a, cfg.b)}),
  inputs: c => `
    <div class="field"><label class="fl">Зменшуване</label><input id="i_a" type="number" value="${c.a??5003}"></div>
    <div class="field"><label class="fl">Від’ємник</label><input id="i_b" type="number" value="${c.b??1748}"></div>`,
  read: v => ({a:+v('i_a'), b:+v('i_b')}),
  summary: cfg => `${cfg.a} − ${cfg.b}`,
  editorFields: cfg => `
    <div class="row">
      <div class="field" style="flex:1"><label class="fl">Зменшуване</label><input id="f_a" type="number" value="${cfg.a||''}"></div>
      <div class="field" style="flex:1"><label class="fl">Від’ємник</label><input id="f_b" type="number" value="${cfg.b||''}"></div>
    </div>`,
  readEditor: v => ({a:+v('f_a'), b:+v('f_b')}),
  errorHint:'Введи два натуральні числа, зменшуване — не більше за 99 999 999.',
}));
