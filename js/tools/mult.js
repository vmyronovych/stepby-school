/* =========================================================
   МНОЖЕННЯ В СТОВПЧИК (ядро — js/core/column.js)
   Кожна цифра першого множника — три кроки: «6×4=» → «24 (4 — записуємо, 2 — запам'ятовуємо)» →
   4 летить у неповний добуток, 2 — у правий верхній кут наступної цифри першого множника.
   Потім неповні добутки додаються стовпчиком так само, як у інструменті додавання.
   Коли беремо нову цифру другого множника, сірі числа «в умі» над першим множником тануть.
   ========================================================= */
const MULT_ZEROS=['','нуль, який пропустили','два нулі, які пропустили','три нулі, які пропустили'];

function multSteps(a,b){
  a=Math.abs(Math.trunc(a)); b=Math.abs(Math.trunc(b));
  if(!a||!b||a>999999||b>9999) throw 'bad';
  const total=a*b, A=String(a), B=String(b), T=String(total);
  const W=T.length+1, last=W-1;                     // зліва завжди є вільний стовпець під знак

  // ---- план: неповні добутки для ненульових цифр другого множника ----
  const parts=[];
  for(let i=B.length-1;i>=0;i--){
    const d=+B[i], shift=B.length-1-i;
    if(!d) continue;
    const ops=[]; let carry=0;
    for(let k=A.length-1;k>=0;k--){
      const pos=A.length-1-k, ad=+A[k], p=d*ad, s=p+carry, lastDigit=k===0;
      const cout=lastDigit?0:Math.floor(s/10);
      ops.push({ad, aCol:last-pos, col:last-shift-pos, p, cin:carry, s, cout, lastDigit});
      carry=cout;
    }
    parts.push({d, shift, bCol:last-shift, ops, val:a*d});
  }
  const multi=parts.length>1;

  // ---- розкладка: множники, риска, неповні добутки, риска, сума ----
  const aRow=0, bRow=1, pRow0=2;
  parts.forEach((p,j)=>{ p.row=pRow0+j; p.end=last-p.shift; });
  const sumRow=multi?pRow0+parts.length:-1;

  // ---- чернетки ----
  parts.forEach(p=>p.ops.forEach(o=>{
    o.note = o.cin
      ? [[...colAsk(`${p.d}×${o.ad}=`), ...colPlain(o.p)], [...colPlain(`${o.p}+`), colMind(o.cin), ...colPlain('='), ...colWritten(o.s, o.lastDigit)]]
      : [[...colAsk(`${p.d}×${o.ad}=`), ...colWritten(o.s, o.lastDigit)]];
    o.noteRow=p.row; o.ann=colAnnOf(o.s, o.lastDigit);
  }));
  const add=multi ? colAddPlan(parts, last, sumRow) : [];   // неповні добутки: {row, val, end}
  const sheet=colSheet({W, rows:multi?sumRow+1:pRow0+1, notes:[...parts.flatMap(p=>p.ops), ...add.filter(o=>o.note)]});
  const {G, ul, snap}=sheet;
  ul[bRow]=[0, last];
  const partCls=multi?'':'res';                                // єдиний добуток — це й є відповідь

  // крок 0 — записуємо множники; знак — посередині між ними, лівіше за довший
  snap({news:[...colNum(A,aRow,last), {r:bRow, c:last-Math.max(A.length,B.length), ch:'×', cls:'op mid'}, ...colNum(B,bRow,last)],
    text:`Записуємо числа у стовпчик: одиниці під одиницями.`+
      (B.length>1 ? ` Множитимемо ${a} на кожну цифру числа ${b} по черзі, починаючи з одиниць.`
        : A.length>1 ? ` Множимо ${b} на кожну цифру числа ${a}, починаючи з одиниць.` : ` Множимо ${a} на ${b}.`)});

  // множення: кожна цифра — три кроки: питання → відповідь → цифри на місця
  let prevShift=-1;
  parts.forEach(p=>{
    p.ops.forEach((o,k)=>{
      const hl={};
      hl[bRow+','+p.bCol]='hl'; hl[aRow+','+o.aCol]='hl';
      if(o.cin) hl[aRow+','+o.aCol+'^']='hlc';
      // нова цифра другого множника — використані числа «в умі» над першим множником тануть
      const clear=k===0 ? G[aRow].map((c,ci)=>c&&c.sup?{r:aRow,c:ci}:null).filter(Boolean) : [];

      let tq='';
      if(k===0){
        const skipped=[]; for(let z=prevShift+1; z<p.shift; z++) skipped.push(z);
        if(skipped.length===1) tq+=`Цифра ${COL_GEN[skipped[0]]} — 0: множення на 0 дає 0, тож цей рядок пропускаємо. `;
        else if(skipped.length) tq+=`Цифри ${skipped.slice(0,-1).map(z=>COL_GEN[z]).join(', ')} і ${COL_GEN[skipped[skipped.length-1]]} — нулі: множення на 0 дає 0, тож ці рядки пропускаємо. `;
        if(B.length>1) tq+= p.shift===0
          ? `Беремо ${p.d} — цифру одиниць другого множника. `
          : `Тепер беремо ${p.d} — цифру ${COL_GEN[p.shift]}. Першу цифру поставимо під ${COL_INS[p.shift]}. `;
      }
      tq+= o.cin ? `Множимо ${p.d} на ${o.ad}, а тоді додаємо ${o.cin}, що в умі.` : `Множимо ${p.d} на ${o.ad}.`;
      snap({hl, text:tq, op:o, phase:'q', clear});

      let ta=`${p.d} × ${o.ad} = ${o.p}`+(o.cin ? `, і ще ${o.cin} в умі: ${o.p} + ${o.cin} = ${o.s}.` : '.');
      if(o.lastDigit) ta+= (o.s>=10 && A.length>1) ? ` Це остання цифра, тож записуємо ${o.s} повністю.` : ` Записуємо ${o.s}.`;
      else ta+= o.cout ? ` ${o.s%10} записуємо, а ${o.cout} запам'ятовуємо.` : ` Записуємо ${o.s}, запам'ятовувати нічого.`;
      snap({hl, text:ta, op:o, phase:'a'});

      const news=[]; let tf;
      if(o.lastDigit){
        news.push(...colNum(o.s, p.row, o.col, partCls, 'w'));
        tf=`${o.s} стає на своє місце.`+(multi ? ` Неповний добуток: ${p.val}.` : !p.shift ? ` Відповідь: ${total}.` : '');
      } else {
        news.push({r:p.row, c:o.col, ch:String(o.s%10), cls:partCls, role:'w'});
        tf=`${o.s%10} стає на своє місце в стовпчику`;
        if(o.cout){
          news.push({r:aRow, c:o.aCol-1, sup:true, ch:String(o.cout), cls:'cy', pause:1, role:'m'});
          tf+=`, а ${o.cout} записуємо дрібно в куті наступної цифри, щоб не забути.`;
        } else tf+='.';
      }
      snap({news, hl, text:tf, op:o, phase:'fly'});
      if(o.cin) G[aRow][o.aCol].sup.cls='cy used';
    });
    prevShift=p.shift;
  });

  // єдиний неповний добуток, а другий множник закінчується нулями — дописуємо їх
  if(!multi && parts[0].shift){
    const z=parts[0].shift, news=[];
    for(let c=last-z+1;c<=last;c++) news.push({r:parts[0].row, c, ch:'0', cls:'res'});
    snap({news, text:`Дописуємо в кінці ${MULT_ZEROS[z]}. Відповідь: ${total}.`});
  }

  // додавання неповних добутків — спільне ядро; риска й «+» — з першим кроком
  if(multi){
    ul[parts[parts.length-1].row]=[0, last];
    const left=Math.min(...parts.map(p=>p.end-String(p.val).length+1));
    colAddRun(sheet, add, {nums:parts, last, sumRow, topRow:pRow0, total,
      first:[{r:parts[1].row, c:left-1, ch:'+', cls:'op mid'}],   // між першим і другим доданком
      intro:'Додаємо неповні добутки стовпчиком, справа наліво. '});
  }

  // фінал — запис стовпчика лишається, під ним рядок-відповідь
  snap({text:`Готово! ${a} × ${b} = ${total}.`,
    tail:`<div class="col-final">${hwEqline([{t:A},{t:'×',cls:'op'},{t:B},{t:'=',cls:'op'},{t:T,cls:'res'}])}</div>`});
  return sheet.steps;
}

registerTool('mult', Object.assign({}, colToolBase, {
  name:'Множення в стовпчик', icon:'✖️', color:'var(--primary)', bg:'var(--primary-l)',
  build: cfg => ({steps: multSteps(cfg.a, cfg.b)}),
  inputs: c => `
    <div class="field"><label class="fl">Перший множник</label><input id="i_a" type="number" value="${c.a??284}"></div>
    <div class="field"><label class="fl">Другий множник</label><input id="i_b" type="number" value="${c.b??36}"></div>`,
  read: v => ({a:+v('i_a'), b:+v('i_b')}),
  summary: cfg => `${cfg.a} × ${cfg.b}`,
  editorFields: cfg => `
    <div class="row">
      <div class="field" style="flex:1"><label class="fl">Перший множник</label><input id="f_a" type="number" value="${cfg.a||''}"></div>
      <div class="field" style="flex:1"><label class="fl">Другий множник</label><input id="f_b" type="number" value="${cfg.b||''}"></div>
    </div>`,
  readEditor: v => ({a:+v('f_a'), b:+v('f_b')}),
}));
