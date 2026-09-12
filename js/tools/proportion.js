/* =========================================================
   ПРОПОРЦІЇ — своя частина (записати → навхрест → перемножити),
   далі делегування лінійному ядру (js/tools/linear.js).
   ========================================================= */
function mulLin(u,v){ if(u.a && v.a) return null; return {a:u.a*v.b + v.a*u.b, b:u.b*v.b}; } // (лінійне × лінійне), null якщо x²
function buildProportion(nA,dA,nC,dC){
  const clean=s=>String(s==null?'':s).trim();
  nA=clean(nA); dA=clean(dA); nC=clean(nC); dC=clean(dC);
  if(!nA||!dA||!nC||!dC) throw 'Заповніть усі чотири частини пропорції. Приклад: x : 3 = 4 : 6.';
  let A,Bd,C,Dd;
  try{ A=parseSide(nA); Bd=parseSide(dA); C=parseSide(nC); Dd=parseSide(dC); }
  catch(e){ throw 'Кожна частина має бути числом або доданком з x (напр. 5x, 4, 2x). Приклад: x : 3 = 4 : 6.'; }
  // a:b = c:d  ⇒  добуток крайніх = добуток середніх:  a·d = c·b
  const P1=mulLin(A,Dd), P2=mulLin(C,Bd);
  if(!P1||!P2) throw 'Тут x множиться на x — виходить квадратне рівняння, а не лінійне. Такі поки не підтримуються.';
  let pid=0; const T=(t,cls)=>({id:'p'+(pid++), t, cls}); const OP=t=>T(t,'op'); const EQ=()=>({id:'p'+(pid++), t:'=', cls:'eq-eq'});
  const rows=[];
  // 1) сама пропорція:  nA : dA = nC : dC
  rows.push({tokens:[T(nA), OP(':'), T(dA), EQ(), T(nC), OP(':'), T(dC)], type:'write',
    text:'Записуємо пропорцію. Головна властивість: добуток крайніх членів дорівнює добутку середніх.'});
  // 2) множимо навхрест:  nA · dC = nC · dA
  rows.push({tokens:[T(nA), OP('·'), T(dC), EQ(), T(nC), OP('·'), T(dA)], type:'write', note:'навхрест',
    text:`Множимо навхрест: крайні ${nA} і ${dC}, середні ${dA} і ${nC}. Отримуємо ${nA}·${dC} = ${nC}·${dA}.`});
  // 3) далі — звичайне лінійне рівняння (перевикористовуємо лінійне ядро)
  const lin=buildLinearRows(P1,P2);
  lin[0].text='Перемножуємо — і виходить звичайне лінійне рівняння. Далі розв’язуємо його як завжди.';
  return {rows:[...rows, ...lin]};
}

registerTool('prop', Object.assign({}, linearToolBase, {
  name:'Пропорції', icon:'⚖️', color:'var(--pink)', bg:'var(--pink-l)',
  build(cfg){ const model=buildProportion(cfg.a, cfg.b, cfg.c, cfg.d); model.steps=linearSteps(model.rows); return model; },
  inputs: c => `
    <div class="field"><label class="fl">Пропорція (a : b = c : d)</label>
      <div class="row"><input id="i_a" value="${c.a??'x'}" style="flex:1"><span style="align-self:center">:</span><input id="i_b" value="${c.b??'3'}" style="flex:1"></div></div>
    <div class="field"><label class="fl">=</label>
      <div class="row"><input id="i_c" value="${c.c??'4'}" style="flex:1"><span style="align-self:center">:</span><input id="i_d" value="${c.d??'6'}" style="flex:1"></div></div>
    <p class="helper">Кожна частина — число або доданок з x (напр. 5x, 4). Пропорція зводиться навхрест до лінійного рівняння.</p>`,
  read: v => ({a:v('i_a'), b:v('i_b'), c:v('i_c'), d:v('i_d')}),
  summary: cfg => `${cfg.a} : ${cfg.b} = ${cfg.c} : ${cfg.d}`,
  editorFields: cfg => `
    <div class="row">
      <div class="field" style="flex:1"><label class="fl">a</label><input id="f_a" value="${cfg.a||''}"></div>
      <div class="field" style="flex:1"><label class="fl">b</label><input id="f_b" value="${cfg.b||''}"></div>
      <div class="field" style="flex:1"><label class="fl">c</label><input id="f_c" value="${cfg.c||''}"></div>
      <div class="field" style="flex:1"><label class="fl">d</label><input id="f_d" value="${cfg.d||''}"></div>
    </div>
    <p class="helper">Пропорція a : b = c : d. Кожна частина — число або доданок з x (напр. 5x, 4).</p>`,
  readEditor: v => ({a:v('f_a'), b:v('f_b'), c:v('f_c'), d:v('f_d')}),
}));
