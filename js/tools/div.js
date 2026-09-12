/* =========================================================
   ДІЛЕННЯ В СТОВПЧИК («куточком»)
   ========================================================= */
function divSteps(N,D){
  N=Math.abs(Math.trunc(N)); D=Math.abs(Math.trunc(D));
  if(!N||!D||D>N||D>9999) throw 'bad';
  const ds=String(N).split('').map(Number);
  const n=ds.length;
  const steps=[];
  // повна частка наперед — щоб ширина правого блоку не «стрибала»
  const fullQ=(()=>{let r=0,q='',st=false;for(const d of ds){const cur=r*10+d;const dq=Math.floor(cur/D);if(dq>0)st=true;if(st)q+=dq;r=cur-dq*D;}return q||'0';})();
  const dW=Math.max(String(D).length, fullQ.length);
  // заголовок «куточком»: ділене | дільник над часткою
  function header(work, quotient, opts={}){
    const dividend=mkRow(N,n-1,n); if(opts.animHead) dividend.anim=true;
    const left=colGrid([dividend, ...work], n);
    const divRow=mkRow(D, dW-1, dW); if(opts.animHead) divRow.anim=true;
    const quoRow=quotient? mkRow(quotient, dW-1, dW, 'res') : {cells:Array(dW).fill('')};
    if(opts.animQuot && quotient){ for(let k=quoRow.cells.length-1;k>=0;k--){ if(quoRow.cells[k]){ quoRow.cells[k].anim=true; break; } } }
    const right=colGrid([divRow, {line:true}, quoRow], dW);
    return `<div class="divwrap">${left}<div class="divbar"></div>${right}</div>`;
  }
  steps.push({ html:header([],'', {animHead:true}), text:`Ділимо ${N} на ${D} «куточком». Дільник ${D} записуємо праворуч, частку будемо писати під ним.` });

  const work=[];
  let r=0, quotient='', started=false;
  for(let i=0;i<n;i++){
    const cur=r*10+ds[i];
    const q=Math.floor(cur/D); const prod=q*D; const rem=cur-prod;
    if(q>0) started=true;
    if(started){
      quotient+=q;
      // рядок зменшуваного (поточний шматок) — end col = i
      const curRow=mkRow(cur, i, n, 'muted'); work.push(curRow);
      // добуток з мінусом
      const prow=mkRow(prod, i, n);
      const minusCol=i-String(prod).length; if(minusCol>=0) prow.cells[minusCol]={ch:'−',cls:'op'};
      work.push(prow);
      work.push({line:true, span:[Math.max(0,minusCol), i]});
      curRow.anim=true; prow.anim=true;                    // «пишемо» лише новий шматок і добуток + нову цифру частки
      steps.push({ html:header(work.slice(), quotient, {animQuot:true}),
        text:`${cur} : ${D} = ${q}, бо ${q} × ${D} = ${prod}. Віднімаємо: ${cur} − ${prod} = ${rem}${i<n-1?`, зносимо наступну цифру`:''}.` });
      curRow.anim=false; prow.anim=false;                  // далі показуємо їх статично
      // рядок остачі (буде основою наступного шматка)
      work.push(mkRow(rem, i, n, rem===0?'':'muted'));
      r=rem;
    } else {
      r=cur; // провідні нулі частки пропускаємо
    }
  }
  const finalRem=r;
  const parts=[{t:String(N)},{t:':',cls:'op'},{t:String(D)},{t:'=',cls:'op'},{t:quotient,cls:'res'}];
  if(finalRem){ parts.push({t:'('},{t:'ост. '+finalRem}); parts.push({t:')'}); }
  steps.push({ html:hwEqline(parts),
    text:`Готово! ${N} : ${D} = ${quotient}${finalRem?`, остача ${finalRem}`:', ділиться націло'}.` });
  return steps;
}

registerTool('div', {
  name:'Ділення в стовпчик', icon:'➗', color:'var(--green)', bg:'var(--green-l)',
  build: cfg => ({steps: divSteps(cfg.n, cfg.d)}),
  view:  (model, ctx) => ctx.step.html,
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
});
