/* =========================================================
   ДІЛЕННЯ В СТОВПЧИК («куточком»; ядро — js/core/column.js)
   Перше неповне ділене → для кожної цифри частки три дії, кожна — три кроки
   (питання → відповідь і підпис → цифри летять на місця):
     ділимо «72:8=» → цифра летить у частку;
     множимо «9×8=» → «−» і добуток летить під неповне ділене;
     віднімаємо «72−72=» → остача летить під риску (0 посередині не пишемо).
   Далі наступна цифра діленого летить униз («зносимо»). Якщо неповне ділене менше
   за дільник — у частку йде 0, множення й віднімання не пишемо.
   ========================================================= */
const divDigits=n=>n===1?'цифра':(n>=2&&n<=4)?'цифри':'цифр';

function divSteps(N,D){
  N=Math.abs(Math.trunc(N)); D=Math.abs(Math.trunc(D));
  if(!N||!D||N>99999999||D>9999) throw 'bad';
  if(D>N) throw 'Ділене має бути не менше за дільник — інакше частка дорівнює 0.';
  const Ns=String(N), n=Ns.length, Ds=String(D), Q=String(Math.floor(N/D)), R=N%D;
  let k=0; while(+Ns.slice(0,k+1)<D) k++;              // перше неповне ділене — цифри 0..k

  // ---- розкладка: вільний стовпець під «−», ділене, «куточок» із дільником і часткою ----
  const L=1, col=i=>L+i;
  const R0=L+n, dW=Math.max(Ds.length, Q.length), W=R0+dW;
  const cells=(r,end,len)=>Array.from({length:len},(_,j)=>r+','+(end-len+1+j));
  const dvHl=Object.fromEntries(cells(0,R0+Ds.length-1,Ds.length).map(k=>[k,'hl']));

  // ---- план ----
  const acts=[];
  let cur=+Ns.slice(0,k+1), curRow=0, row=2;
  for(let i=k;i<n;i++){
    if(i>k){
      const d=+Ns[i]; cur=cur*10+d;
      acts.push({kind:'bring', i, d, cur, curRow, write:cur>0 || i===n-1});
    }
    const qd=Math.floor(cur/D), prod=qd*D, rem=cur-prod, qi=i-k, last=i===n-1;
    acts.push({kind:'div', i, cur, curRow, qd, prod, qi,
      note:[[...colAsk(`${cur}:${D}=`), ...colWritten(qd,true)]], noteRow:curRow,
      ann:[qd ? `(<b class="w">${qd}</b> — пишемо в частку)` : `(<b class="w">0</b> — пишемо в частку: ${cur} менше за ${D})`]});
    if(qd){
      const prodRow=curRow===0 ? 1 : row++, remRow=row++;
      acts.push({kind:'mul', i, cur, curRow, qd, qi, prod, prodRow,
        note:[[...colAsk(`${qd}×${D}=`), ...colWritten(prod,true)]], noteRow:prodRow,
        ann:[`(<b class="w">${prod}</b> — пишемо під ${cur})`]});
      acts.push({kind:'sub', i, cur, curRow, prod, prodRow, rem, remRow, last,
        write:rem>0 || last,
        note:[[...colAsk(`${cur}−${prod}=`), ...colWritten(rem,true)]], noteRow:remRow,
        ann:[rem===0 && !last ? `(<b class="w">0</b> — не пишемо, зносимо наступну цифру)`
          : last ? `(<b class="w">${rem}</b> — остача${rem?'':', ділиться націло'})` : `(<b class="w">${rem}</b> — пишемо під рискою)`]});
      cur=rem; curRow=remRow;
    }
  }
  const sheet=colSheet({W, rows:row, notes:acts.filter(a=>a.note)});
  const {ul, deco, snap}=sheet;
  ul[0]=[R0, W-1];                                           // «куточок»: риска під дільником…
  deco['0,'+R0]=deco['1,'+R0]='vl';                          // …і вертикальна — між діленим і дільником

  // крок 0 — ділене й дільник
  snap({news:[...colNum(Ns,0,col(n-1)), ...colNum(Ds,0,R0+Ds.length-1)],
    text:`Записуємо ділене ${N}, праворуч за рискою — дільник ${D}. Частку писатимемо під дільником.`});
  // перше неповне ділене
  snap({hl:Object.fromEntries(cells(0,col(k),k+1).map(c=>[c,'hl'])),
    text:(k ? `Шукаємо перше неповне ділене: ${Ns.slice(0,k)} менше за ${D}, тому беремо ${Ns.slice(0,k+1)}.`
            : `Шукаємо перше неповне ділене: ${Ns[0]} не менше за ${D}, тож беремо ${Ns[0]}.`)
      +(n-1-k ? ` Після нього в діленому ${n-1-k} ${divDigits(n-1-k)}, тож у частці буде ${Q.length} ${divDigits(Q.length)}.`
              : ` Інших цифр у діленому немає, тож у частці буде 1 цифра.`)});

  acts.forEach(a=>{
    const curLen=String(a.cur).length;
    const curHl=Object.fromEntries(cells(a.curRow, col(a.i), curLen).map(c=>[c,'hl']));

    if(a.kind==='bring'){
      snap({news:a.write ? [{r:a.curRow, c:col(a.i), ch:String(a.d), role:'w', from:{r:0, c:col(a.i)}}] : [],
        hl:{['0,'+col(a.i)]:'hl'}, phase:a.write?'fly':null,
        text:`Зносимо наступну цифру діленого — ${a.d}. `+(a.write ? `Маємо ${a.cur}.` : `Маємо 0 — його не пишемо, одразу ділимо.`)});
      return;
    }
    if(a.kind==='div'){
      const hl={...curHl, ...dvHl};
      snap({hl, op:a, phase:'q', text:`Скільки разів ${D} вміщується в ${a.cur}? Ділимо ${a.cur} на ${D}.`});
      snap({hl, op:a, phase:'a', text: a.qd
        ? `${a.cur} : ${D} = ${a.qd}, бо ${a.qd} × ${D} = ${a.prod}`+(a.prod<a.cur ? `, а ${a.qd+1} × ${D} = ${(a.qd+1)*D} — вже більше за ${a.cur}.` : '.')
        : `${a.cur} менше за ${D} — ${D} не вміщується жодного разу. У частці пишемо 0.`});
      snap({news:[{r:1, c:R0+a.qi, ch:String(a.qd), cls:'res', role:'w'}], hl, op:a, phase:'fly',
        text:`${a.qd} стає в частку.`});
      return;
    }
    if(a.kind==='mul'){
      const hl={['1,'+(R0+a.qi)]:'hl', ...dvHl};
      const minus={r:a.prodRow, c:col(a.i)-Math.max(curLen, String(a.prod).length), ch:'−', cls:'op mid'};
      snap({hl, op:a, phase:'q', text:`Множимо ${a.qd} на дільник ${D} — дізнаємось, скільки вже поділили.`});
      snap({hl, op:a, phase:'a', text:`${a.qd} × ${D} = ${a.prod}. Пишемо під ${a.cur}.`});
      snap({news:[minus, ...colNum(a.prod, a.prodRow, col(a.i), '', 'w')], hl, op:a, phase:'fly',
        text:`Ставимо «−» і пишемо ${a.prod} під ${a.cur}.`});
      return;
    }
    // sub
    const w=Math.max(curLen, String(a.prod).length);
    const hl={...curHl, ...Object.fromEntries(cells(a.prodRow, col(a.i), String(a.prod).length).map(c=>[c,'hl']))};
    ul[a.prodRow]=[col(a.i)-w+1, col(a.i)];
    snap({hl, op:a, phase:'q', text:`Проводимо риску й віднімаємо: ${a.cur} − ${a.prod}.`});
    snap({hl, op:a, phase:'a', text:`${a.cur} − ${a.prod} = ${a.rem}. `
      +(a.rem===0 && !a.last ? `Нуль не пишемо — зносимо наступну цифру.`
        : a.last ? (a.rem ? `Це остача: ${a.rem} менше за ${D}.` : `Остачі немає — ділиться націло.`)
        : `${a.rem} менше за ${D} — отже, цифру частки знайдено правильно.`)});
    if(a.write) snap({news:colNum(a.rem, a.remRow, col(a.i), '', 'w'), hl, op:a, phase:'fly',
      text:`${a.rem} стає під риску.`});
  });

  const parts=[{t:Ns},{t:':',cls:'op'},{t:Ds},{t:'=',cls:'op'},{t:Q,cls:'res'}];
  if(R) parts.push({t:'(ост. '+R+')'});
  snap({text:`Готово! ${N} : ${D} = ${Q}${R?`, остача ${R}`:', ділиться націло'}.`,
    tail:`<div class="col-final">${hwEqline(parts)}</div>`});
  return sheet.steps;
}

registerTool('div', Object.assign({}, colToolBase, {
  name:'Ділення в стовпчик', icon:'➗', color:'var(--green)', bg:'var(--green-l)',
  build: cfg => ({steps: divSteps(cfg.n, cfg.d)}),
  inputs: c => `
    <div class="field"><label class="fl">Ділене</label><input id="i_n" type="number" value="${c.n??7256}"></div>
    <div class="field"><label class="fl">Дільник</label><input id="i_d" type="number" value="${c.d??8}"></div>`,
  read: v => ({n:+v('i_n'), d:+v('i_d')}),
  summary: cfg => `${cfg.n} : ${cfg.d}`,
  editorFields: cfg => `
    <div class="row">
      <div class="field" style="flex:1"><label class="fl">Ділене</label><input id="f_n" type="number" value="${cfg.n||''}"></div>
      <div class="field" style="flex:1"><label class="fl">Дільник</label><input id="f_d" type="number" value="${cfg.d||''}"></div>
    </div>`,
  readEditor: v => ({n:+v('f_n'), d:+v('f_d')}),
  errorHint:'Введи натуральні числа: ділене — до 99 999 999, дільник — до 9999.',
}));
