/* =========================================================
   ІНТЕРАКТИВНІ ІНСТРУМЕНТИ
   ========================================================= */
function openTool(tool,cfg,taskId){
  S.tool=tool; S.toolCfg=cfg; S.toolTaskId=taskId||null; S.step=0;
  buildSteps();
  render();
}
function closeTool(){ S.tool=null; S.toolCfg=null; S.steps=[]; S.step=0; render(); }

function buildSteps(){
  const c=S.toolCfg;
  try{
    if(S.tool==='mult') S.steps = c? multSteps(c.a,c.b) : [];
    if(S.tool==='div')  S.steps = c? divSteps(c.n,c.d) : [];
    if(S.tool==='eq'){ if(c){ S.eqModel=buildEqModel(c.text); S.steps=S.eqModel.rows.map(r=>({text:r.text, eq:true})); } else { S.eqModel=null; S.steps=[]; } }
    if(S.tool==='prop'){ if(c){ S.eqModel=buildProportion(c.a,c.b,c.c,c.d); S.steps=S.eqModel.rows.map(r=>({text:r.text, eq:true})); } else { S.eqModel=null; S.steps=[]; } }
    if(S.tool==='frac'){ if(c){ S.fracModel=buildFracModel(c.a,c.b,c.op,c.c,c.d); S.steps=S.fracModel.steps.map(s=>({text:s.text, frac:true})); } else { S.fracModel=null; S.steps=[]; } }
    if(S.tool==='dvk'){ if(c){ S.dvkModel=buildDvkModel(c.n); S.steps=S.dvkModel.steps.map(s=>({text:s.text, dvk:true, phase:s.phase})); } else { S.dvkModel=null; S.steps=[]; } }
  }catch(e){
    const msg = (typeof e==='string' && e!=='bad') ? e
      : (S.tool==='eq' ? 'Не вдалося прочитати рівняння. Приклад: 3x + 5 = 20 або 5x − 4 = 2x + 11.' : 'Перевірте введені значення.');
    S.steps=[{html:`<div class="empty">${esc(msg)}</div>`, text:msg}];
  }
}

function renderTool(){
  const meta=DB.tools[S.tool];
  const hasData = S.steps.length>0;
  app.innerHTML = `
    <div class="crumbs"><a onclick="closeTool()">← Назад</a></div>
    <h1 class="page">${meta.icon} ${meta.name}</h1>
    <p class="sub">Покроковий інтерактивний розбір. Натискай «Далі», щоб побачити кожен крок.</p>
    <div class="tool-shell">
      <div class="panel cfg">
        <h3>⚙️ Умова</h3>
        <div id="toolInputs">${toolInputs()}</div>
        <button class="btn" style="width:100%;margin-top:4px" onclick="applyTool()">▶ Показати розв’язання</button>
        ${S.toolTaskId?`<button class="btn green sm" style="width:100%;margin-top:8px" onclick="markDone()">✓ Позначити виконаним</button>`:''}
        <p class="helper">Можна ввести свої значення і натиснути «Показати розв’язання».</p>
      </div>
      <div class="panel stage">
        ${hasData?stageHtml():'<div class="empty">Введи умову ліворуч і натисни «Показати розв’язання», щоб побачити покроковий розбір 👈</div>'}
      </div>
    </div>`;
  if((S.tool==='eq'||S.tool==='prop') && S.eqAnim){ requestAnimationFrame(()=>requestAnimationFrame(runEqAnim)); }
  if(S.tool==='frac'){ requestAnimationFrame(()=>requestAnimationFrame(()=>{ runFracMulAnim(); runFracFlip(); })); }
}

function toolInputs(){
  const c=S.toolCfg||{};
  if(S.tool==='mult') return `
    <div class="field"><label class="fl">Перший множник</label><input id="i_a" type="number" value="${c.a??284}"></div>
    <div class="field"><label class="fl">Другий множник</label><input id="i_b" type="number" value="${c.b??36}"></div>`;
  if(S.tool==='div') return `
    <div class="field"><label class="fl">Ділене</label><input id="i_n" type="number" value="${c.n??7256}"></div>
    <div class="field"><label class="fl">Дільник</label><input id="i_d" type="number" value="${c.d??8}"></div>`;
  if(S.tool==='eq') return `
    <div class="field"><label class="fl">Рівняння</label><input id="i_text" value="${c.text??'3x + 5 = 20'}"></div>`;
  if(S.tool==='prop') return `
    <div class="field"><label class="fl">Пропорція (a : b = c : d)</label>
      <div class="row"><input id="i_a" value="${c.a??'x'}" style="flex:1"><span style="align-self:center">:</span><input id="i_b" value="${c.b??'3'}" style="flex:1"></div></div>
    <div class="field"><label class="fl">=</label>
      <div class="row"><input id="i_c" value="${c.c??'4'}" style="flex:1"><span style="align-self:center">:</span><input id="i_d" value="${c.d??'6'}" style="flex:1"></div></div>
    <p class="helper">Кожна частина — число або доданок з x (напр. 5x, 4). Пропорція зводиться навхрест до лінійного рівняння.</p>`;
  if(S.tool==='frac') return `
    <div class="field"><label class="fl">Перший дріб</label>
      <div class="row"><input id="i_a" type="number" value="${c.a??1}" style="flex:1"><span style="align-self:center">/</span><input id="i_b" type="number" value="${c.b??4}" style="flex:1"></div></div>
    <div class="field"><label class="fl">Дія</label>
      <select id="i_op"><option ${c.op==='-'?'':'selected'}>+</option><option ${c.op==='-'?'selected':''}>-</option></select></div>
    <div class="field"><label class="fl">Другий дріб</label>
      <div class="row"><input id="i_c" type="number" value="${c.c??1}" style="flex:1"><span style="align-self:center">/</span><input id="i_d" type="number" value="${c.d??6}" style="flex:1"></div></div>`;
  if(S.tool==='dvk') return `
    <div class="field"><label class="fl">Число</label><input id="i_n" type="number" min="2" max="30" value="${c.n??12}"></div>
    <p class="helper">Порівняємо дільники і кратні цього числа. Найкраще працює для чисел від 2 до 30.</p>`;
}
function applyTool(){
  const v=id=>document.getElementById(id).value;
  if(S.tool==='mult') S.toolCfg={a:+v('i_a'),b:+v('i_b')};
  if(S.tool==='div')  S.toolCfg={n:+v('i_n'),d:+v('i_d')};
  if(S.tool==='eq')   S.toolCfg={text:v('i_text')};
  if(S.tool==='prop') S.toolCfg={a:v('i_a'),b:v('i_b'),c:v('i_c'),d:v('i_d')};
  if(S.tool==='frac') S.toolCfg={a:+v('i_a'),b:+v('i_b'),op:v('i_op'),c:+v('i_c'),d:+v('i_d')};
  if(S.tool==='dvk')  S.toolCfg={n:+v('i_n')};
  S.step=0; buildSteps(); render();
}
function markDone(){
  for(const t of DB.topics){ const k=t.tasks.find(x=>x.id===S.toolTaskId); if(k){k.done=true;} }
  toast('Завдання виконано! 🎉');
}
function stageHtml(){
  const st=S.steps[S.step];
  const last=S.step===S.steps.length-1;
  let contentHtml;
  if(st.eq) contentHtml=eqStageInner();
  else if(st.frac) contentHtml=fracStageInner();
  else if(st.dvk) contentHtml=dvkView(S.dvkModel, st.phase);
  else contentHtml=st.html;
  const inner = `<div class="paper sheet">${contentHtml}</div>`;
  return `
    <div class="stage-head">
      <span class="step-count">Крок ${S.step+1} з ${S.steps.length}</span>
      <div>
        <button class="btn gray sm" onclick="stepTo(0)" ${S.step===0?'disabled style=opacity:.4':''}>⟲ Спочатку</button>
      </div>
    </div>
    <div class="calc">${inner}</div>
    <div class="explain ${last?'done':''}"><span>${last?'🎉 ':''}${st.text}</span></div>
    <div class="step-nav">
      <button class="btn gray" onclick="stepTo(${S.step-1})" ${S.step===0?'disabled style=opacity:.4':''}>← Назад</button>
      <button class="btn" onclick="stepTo(${S.step+1})" ${last?'disabled style=opacity:.4':''}>Далі →</button>
    </div>`;
}
function stepTo(i){ if(i<0||i>=S.steps.length) return; if(S.tool==='eq'||S.tool==='prop') prepareEqAnim(i); if(S.tool==='frac') prepareFracAnim(i); S.step=i; render(); }
