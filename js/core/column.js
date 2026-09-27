/* =========================================================
   ОБЧИСЛЕННЯ СТОВПЧИКОМ — спільне ядро додавання, віднімання, множення й ділення.
   Правила — у CLAUDE.md, «Обчислення в стовпчик». Коротко:
     • кожна дія — три кроки «Далі»: питання («6×4=») → відповідь і підпис у дужках →
       цифри летять із чернетки на свої місця;
     • чернетка — праворуч від стовпчика, у рядку, куди йде цифра;
     • число «в умі» й позначка «позичили» — дрібно в правому верхньому куті клітинки
       (colGrid, поле sup), окремих рядків немає.
   Інструмент будує план і на кожен крок кличе sheet.snap(); рендер, такти пера,
   польоти й «спокійний режим» — тут, одні на всіх.
   ========================================================= */
const COL_FLY=0.7, COL_GAP=0.15;       // політ цифри на місце і пауза між діями, с
const COL_ANN_CELLS=10;                // клітинок під підпис «(4 — записуємо, 2 — запам'ятовуємо)»

// ---- клітинки чернетки: {ch, cls, q?, role?} ----
// q — «питання» (пишеться на кроці 'q'); role 'w' — летить у стовпчик, 'm' — «в умі».
const colCells=(str,cls,extra)=>[...String(str)].map(ch=>({ch, cls, ...extra}));
const colPlain=str=>colCells(str,'sc');
const colAsk=str=>colCells(str,'sc',{q:true});
const colMind=(s,extra)=>({ch:String(s), cls:'sc m', ...extra});
// результат: 50 → 5 в умі (жовте, летить угору), 0 у стовпчик (темне); whole — усе число в стовпчик
const colWritten=(s, whole)=>(whole||s<10)
  ? colCells(s,'sc w',{role:'w'})
  : [colMind(Math.floor(s/10),{role:'m'}), {ch:String(s%10), cls:'sc w', role:'w'}];
// стандартний підпис у дужках: частини з'являються по черзі
function colAnn(w, m, wVerb='записуємо'){
  return m==null ? [`(<b class="w">${w}</b> — ${wVerb})`]
    : [`(<b class="w">${w}</b> — ${wVerb},`, `&nbsp;<b class="m">${m}</b> — запам'ятовуємо)`];
}
const colAnnOf=(s, whole)=>(whole||s<10) ? colAnn(s) : colAnn(s%10, Math.floor(s/10));

// «9, 9 і 8»
const colList=xs=>xs.length<2 ? String(xs[0]) : xs.slice(0,-1).join(', ')+' і '+xs[xs.length-1];
// числові клітинки стовпчика, вирівняні правим краєм на endCol
const colNum=(str,r,endCol,cls,role)=>[...String(str)].map((ch,k,arr)=>({r, c:endCol-(arr.length-1-k), ch, cls, role}));

// Аркуш стовпчика.
//   W     — ширина самого стовпчика (клітинок); праворуч через клітинку — чернетка;
//   rows  — висота стовпчика; notes — усі дії з чернеткою {note, noteRow} (для розміру аркуша).
// sheet.ul[r]=[from,to] — риска під рядком r; sheet.deco['r,c']='клас' — статичне оформлення
// клітинки (напр. вертикальна риска «куточка»).
function colSheet({W, rows, notes=[]}){
  const SX=W+1;
  const SW=Math.max(0, ...notes.map(o=>Math.max(...o.note.map(l=>l.length))));
  const GW=SW ? SX+SW+COL_ANN_CELLS : W;
  const nRows=Math.max(rows, ...notes.map(o=>o.noteRow+o.note.length));
  const G=Array.from({length:nRows},()=>Array(GW).fill(null));
  const ul={}, deco={}, steps=[];
  const same=(n,r,c,sup)=>n.r===r && n.c===c && !!n.sup===sup;

  // Знімок кроку.
  //   news  — нові клітинки стовпчика в порядку пера (pause — зайвий такт перед клітинкою;
  //           sup — дрібна цифра в куті; role 'w'/'m' — на кроці 'fly' прилітає з чернетки,
  //           from:{r,c} — прилітає з клітинки стовпчика, напр. знесена цифра);
  //   hl    — підсвітка: 'r,c' — клітинка ('hl' тло), 'r,c^' — її дрібна цифра ('hlc');
  //   op    — дія з чернеткою {note, noteRow, ann}; phase: 'q' — питання, 'a' — відповідь
  //           і підпис, 'fly' — цифри летять на місця (чернетка лишається, у G не пишеться);
  //   clear — клітинки, чиї дрібні цифри тануть.
  // Два варіанти кроку: html — усе пише перо (спокійний режим, перший показ),
  // htmlFly — цілі сховані до прильоту; оболонка вибирає за ctx.anim.
  function snap({news=[], hl={}, text, op=null, phase=null, tail='', clear=[]}){
    const scratch=[];
    if(op && op.note) op.note.forEach((line,li)=>line.forEach((c,k)=>{
      if(phase==='q' && !c.q) return;
      scratch.push({r:op.noteRow+li, c:SX+k, ch:c.ch, cls:c.cls, role:c.role,
        pen: phase==='q' || (phase==='a' && !c.q)});
    }));
    const fly=phase==='fly';
    const pre=news.filter(n=>!(fly&&n.role));
    const flyW=fly?news.filter(n=>n.role==='w'):[], flyM=fly?news.filter(n=>n.role==='m'):[];
    news.forEach(n=>{
      if(n.sup){ const c=G[n.r][n.c] || (G[n.r][n.c]={ch:'', cls:''}); c.sup={ch:n.ch, cls:n.cls||''}; }
      else G[n.r][n.c]={ch:n.ch, cls:n.cls||'', sup:G[n.r][n.c]&&G[n.r][n.c].sup};
    });
    clear.forEach(({r,c})=>{ G[r][c].sup.cls+=' out'; });
    const view=G.map(cells=>cells.slice());
    scratch.forEach(n=>{ view[n.r][n.c]={ch:n.ch, cls:n.cls}; });

    const ticks=list=>{ let t=0; return list.map(n=>{ t+=n.pause||0; return t++; }); };
    const endOf=seqs=>seqs.length ? seqs[seqs.length-1]*HW_STEP+HW_DUR : 0;
    function grid(pen, seqs, hidden=[]){
      const rows=[];
      view.forEach((cells,r)=>{
        rows.push({cells:cells.map((c,ci)=>{
          const d=deco[r+','+ci];
          if(!c) return d ? {ch:'', cls:d} : '';
          const i=pen.findIndex(n=>same(n,r,ci,false));
          const fw=hidden.some(n=>same(n,r,ci,false)), fws=hidden.some(n=>same(n,r,ci,true));
          const out={ch:c.ch, cls:[c.cls, d, hl[r+','+ci], fw?'fw':'', fws?'fws':''].filter(Boolean).join(' '),
            seq:(i>=0&&!fw)?seqs[i]:undefined};
          if(c.sup){
            const si=pen.findIndex(n=>same(n,r,ci,true));
            out.sup={ch:c.sup.ch, cls:[c.sup.cls, hl[r+','+ci+'^']].filter(Boolean).join(' '), seq:(si>=0&&!fws)?seqs[si]:undefined};
          }
          return out;
        })});
        if(ul[r]) rows.push({line:true, span:ul[r]});
      });
      return colGrid(rows, GW);
    }
    // підпис у дужках праворуч від останнього рядка чернетки; t — коли з'являється (null — одразу)
    function ann(t){
      if(!op || !op.note || !op.ann || phase==='q') return '';
      const line=op.note[op.note.length-1];
      const parts=op.ann.map((html,i)=>t==null ? `<span>${html}</span>`
        : `<span class="hwa" style="animation:hwfade .3s ease ${(t+i*0.45).toFixed(2)}s both">${html}</span>`);
      return `<div class="col-ann" style="left:calc(var(--cell)*${SX+line.length});top:calc(var(--cell)*${op.noteRow+op.note.length-1})">${parts.join('')}</div>`;
    }
    const wrap=(g, a)=>`<div class="col-wrap">${g}${a}</div>${tail}`;

    // спокійний варіант: перо пише все по черзі
    const penBase=[...pre, ...scratch.filter(n=>n.pen)];
    const penCalm=[...penBase, ...flyW.map((n,i)=>i?n:{...n, pause:1}), ...flyM.map((n,i)=>i?n:{...n, pause:1})];
    const sc=ticks(penCalm);
    const step={text, gw:GW, html:wrap(grid(penCalm, sc), ann(phase==='a' ? endOf(sc)+COL_GAP : null))};

    // варіант із польотами: спершу летить 'w', тоді 'm'
    if(flyW.length||flyM.length){
      const sb=ticks(penBase);
      const t1=penBase.length ? endOf(sb)+COL_GAP : COL_GAP;
      const t2=t1+(flyW.length ? COL_FLY+COL_GAP : 0);
      const pairs=(role, dst)=>{
        const src=scratch.filter(n=>n.role===role); let k=0;
        return dst.map(d=>[d.from || src[k++], {r:d.r, c:d.c, sup:!!d.sup}]).map(([s,d])=>[{r:s.r,c:s.c}, d]);
      };
      step.flights=[];
      if(flyW.length) step.flights.push({at:t1, pairs:pairs('w', flyW)});
      if(flyM.length) step.flights.push({at:t2, pairs:pairs('m', flyM)});
      step.htmlFly=wrap(grid(penBase, sb, [...flyW, ...flyM]), ann(null));
    }
    steps.push(step);
    clear.forEach(({r,c})=>{ G[r][c].sup=null; if(!G[r][c].ch) G[r][c]=null; });
  }
  return {W, SX, GW, G, ul, deco, steps, snap};
}

// Польоти: клон гліфа летить із клітинки-джерела в клітинку-ціль (число «в умі» зменшується
// й сідає в кут), ціль розкривається на посадці. Джерело лишається на місці.
function colFly(step){
  const wrap=document.querySelector('.panel.stage .col-wrap'); if(!wrap) return;
  const cells=wrap.querySelector('.notebook').children;
  const cell=rc=>cells[rc.r*step.gw+rc.c];
  step.flights.forEach(f=>setTimeout(()=>{
    if(!wrap.isConnected) return;                              // учень уже пішов на інший крок
    const W0=wrap.getBoundingClientRect();
    f.pairs.forEach(([s,d])=>{
      const se=cell(s), de=cell(d); if(!se||!de) return;
      const sg=se.querySelector(':scope>.hwg'), dg=de.querySelector(d.sup ? '.nk-sup .hwg' : ':scope>.hwg');
      if(!sg||!dg) return;
      const sr=sg.getBoundingClientRect(), dr=dg.getBoundingClientRect();
      const cl=document.createElement('div');
      cl.className='col-clone';
      cl.innerHTML=sg.outerHTML;
      cl.querySelectorAll('path').forEach(p=>p.removeAttribute('style'));   // гліф уже дописаний
      Object.assign(cl.style, {left:(sr.left-W0.left)+'px', top:(sr.top-W0.top)+'px', width:sr.width+'px', height:sr.height+'px'});
      const c0=getComputedStyle(se).color, c1=getComputedStyle(dg).color, k=dr.height/sr.height;
      wrap.appendChild(cl);
      cl.animate([
        {transform:'translate(0,0) scale(1)', color:c0},
        {transform:`translate(${dr.left-sr.left}px,${dr.top-sr.top}px) scale(${k})`, color:c1},
      ], {duration:COL_FLY*1000, easing:'cubic-bezier(.45,.02,.25,1)', fill:'forwards'})
        .onfinish=()=>{ de.classList.remove(d.sup?'fws':'fw'); cl.remove(); };
    });
  }, f.at*1000));
}

// ---- додавання стовпчиком (інструмент «додавання» і неповні добутки множення) ----
// nums — [{row, val, end}] доданки (end — стовпець одиниць); сума — у рядок sumRow, вирівняна на last.
// План рахується ДО colSheet (чернетки задають розмір аркуша).
function colAddPlan(nums, last, sumRow){
  const digit=(n,col)=>{ const v=String(n.val), idx=v.length-1-(n.end-col); return idx>=0&&idx<v.length ? +v[idx] : null; };
  const width=String(nums.reduce((t,n)=>t+n.val*10**(last-n.end),0)).length;
  const ops=[]; let carry=0;
  for(let col=last; col>last-width; col--){
    const ds=nums.map((n,j)=>({j, v:digit(n,col)})).filter(x=>x.v!=null);
    const s=ds.reduce((t,x)=>t+x.v,0)+carry, lastCol=col===last-width+1;
    const cout=lastCol?0:Math.floor(s/10);
    const o={col, ds, cin:carry, s, cout, lastCol};
    if(ds.length+(carry?1:0)>=2){                              // «зносимо» — рахувати нічого
      o.note=[[...colAsk(ds.map(x=>x.v).join('+')), ...(carry?[...colAsk('+'), colMind(carry,{q:true})]:[]), ...colAsk('='), ...colWritten(s, lastCol)]];
      o.noteRow=sumRow; o.ann=colAnnOf(s, lastCol);
    }
    ops.push(o); carry=cout;
  }
  return ops;
}
// Кроки додавання: розряд із рахунком — три кроки, «зносимо» — один. Число «в умі» — у куті
// клітинки верхнього доданка (topRow) у наступному розряді. first — клітинки, що пишуться
// на першому кроці (знак «+»); intro — перше речення першого кроку.
function colAddRun(sheet, ops, {nums, last, sumRow, topRow, total, first=[], intro=''}){
  const {G, snap}=sheet;
  let pending=first;
  const take=()=>{ const n=pending; pending=[]; return n; };
  ops.forEach((o,i)=>{
    const hl={};
    o.ds.forEach(x=>{ hl[nums[x.j].row+','+o.col]='hl'; });
    if(o.cin) hl[topRow+','+o.col+'^']='hlc';
    const head=(i===0?intro:'')+`Розряд ${COL_GEN[last-o.col]}. `;
    const sumCells=o.lastCol ? colNum(o.s, sumRow, o.col, 'res', 'w') : [{r:sumRow, c:o.col, ch:String(o.s%10), cls:'res', role:'w'}];
    const answer=o.lastCol ? ` Відповідь: ${total}.` : '';
    const used=()=>{ if(o.cin) G[topRow][o.col].sup.cls='cy used'; };

    if(!o.note){
      let t=head;
      if(!o.ds.length && !o.cin) t+=`Цифр немає — пишемо 0.`;
      else if(!o.ds.length) t+=`Цифр більше немає — пишемо ${o.cin}, що було в умі.`;
      else t+=`Лише ${o.s} — зносимо ${o.s}.`;
      snap({news:[...take(), ...sumCells], hl, text:t+answer});
      used(); return;
    }
    snap({news:take(), hl, op:o, phase:'q',
      text:head+`Додаємо ${colList(o.ds.map(x=>x.v))}`+(o.cin ? `, а тоді ${o.cin}, що в умі.` : '.')});
    snap({hl, op:o, phase:'a',
      text:`${[...o.ds.map(x=>x.v), ...(o.cin?[o.cin]:[])].join(' + ')} = ${o.s}.`
        +(o.cout ? ` ${o.s%10} записуємо, а ${o.cout} запам'ятовуємо.` : ` Записуємо ${o.s}.`)});
    const news=[...sumCells];
    if(o.cout) news.push({r:topRow, c:o.col-1, sup:true, ch:String(o.cout), cls:'cy', pause:1, role:'m'});
    snap({news, hl, op:o, phase:'fly',
      text:`${o.lastCol?o.s:o.s%10} стає під риску`+(o.cout ? `, а ${o.cout} записуємо дрібно в куті наступного розряду.` : '.')+answer});
    used();
  });
}

// Рендер і анімація для registerTool — однакові для всіх стовпчикових інструментів.
const colToolBase={
  view:    (model, ctx) => (ctx.anim && ctx.step.htmlFly) || ctx.step.html,
  prepare: (model, from, to) => model.steps[to].flights ? {fly:true} : null,
  animate: (model, ctx) => { if(ctx.anim && ctx.step.flights) colFly(ctx.step); },
};

// Розряди для пояснень
const COL_GEN=['одиниць','десятків','сотень','тисяч','десятків тисяч','сотень тисяч',
  'мільйонів','десятків мільйонів','сотень мільйонів','мільярдів'];
const COL_INS=['одиницями','десятками','сотнями','тисячами'];
