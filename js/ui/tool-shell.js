/* =========================================================
   ОБОЛОНКА ІНСТРУМЕНТА
   Не знає жодного інструмента за іменем — усе через toolDef().
   Життєвий цикл кроку:
     stepTo(i) → def.prepare(...)  (читає позиції зі старого DOM)
               → render() → def.view(...)  (малює новий крок)
               → rAF ×2 → def.animate(...) (запускає польоти)
   ========================================================= */
function openTool(tool,cfg,taskId){
  S.tool=tool; S.toolCfg=cfg; S.toolTaskId=taskId||null; S.step=0;
  buildSteps();
  render();
}
function closeTool(){
  S.tool=null; S.toolCfg=null; S.model=null; S.steps=[]; S.step=0; S.anim=null;
  render();
}

// Будуємо модель поточного інструмента. Помилку умови інструмент кидає
// РЯДКОМ-поясненням — показуємо його учневі як єдиний крок.
function buildSteps(){
  const def=toolDef();
  S.model=null; S.steps=[]; S.anim=null;
  if(!def || !S.toolCfg) return;
  try{
    const model=def.build(S.toolCfg);
    if(!model || !Array.isArray(model.steps)) throw 'bad';
    S.model=model; S.steps=model.steps;
  }catch(e){
    const msg = (typeof e==='string' && e!=='bad') ? e
      : (def.errorHint || 'Перевірте введені значення.');
    S.steps=[{text:msg, error:true}];
  }
}

function renderTool(){
  const def=toolDef();
  const hasData = S.steps.length>0;
  app.innerHTML = `
    <div class="crumbs"><a onclick="closeTool()">← Назад</a></div>
    <h1 class="page">${def.icon} ${def.name}</h1>
    <p class="sub">Покроковий інтерактивний розбір. Натискай «Далі», щоб побачити кожен крок.</p>
    <div class="tool-shell">
      <div class="panel cfg">
        <h3>⚙️ Умова</h3>
        <div id="toolInputs">${def.inputs(S.toolCfg||{})}</div>
        <button class="btn" style="width:100%;margin-top:4px" onclick="applyTool()">▶ Показати розв’язання</button>
        ${S.toolTaskId?`<button class="btn green sm" style="width:100%;margin-top:8px" onclick="markDone()">✓ Позначити виконаним</button>`:''}
        <p class="helper">Можна ввести свої значення і натиснути «Показати розв’язання».</p>
      </div>
      <div class="panel stage">
        ${hasData?stageHtml():'<div class="empty">Введи умову ліворуч і натисни «Показати розв’язання», щоб побачити покроковий розбір 👈</div>'}
      </div>
    </div>`;
  // Політ запускаємо лише після того, як новий крок уже в DOM (позиції цілей відомі).
  if(hasData && S.model && def.animate){
    const ctx=stepCtx();
    requestAnimationFrame(()=>requestAnimationFrame(()=>def.animate(S.model, ctx)));
  }
  S.anim=null;   // «посилка» одноразова
}

// Те, що бачить рендер і анімація кроку.
function stepCtx(){ return {step:S.steps[S.step], index:S.step, anim:S.anim}; }

function applyTool(){
  const def=toolDef();
  S.toolCfg = def.read(readField);
  S.step=0; buildSteps(); render();
}
function markDone(){
  for(const t of DB.topics){ const k=t.tasks.find(x=>x.id===S.toolTaskId); if(k){k.done=true;} }
  toast('Завдання виконано! 🎉');
}

function stageHtml(){
  const st=S.steps[S.step];
  const last=S.step===S.steps.length-1;
  const contentHtml = st.error
    ? `<div class="empty">${esc(st.text)}</div>`
    : toolDef().view(S.model, stepCtx());
  return `
    <div class="stage-head">
      <span class="step-count">Крок ${S.step+1} з ${S.steps.length}</span>
      <div>
        <button class="btn gray sm" onclick="stepTo(0)" ${S.step===0?'disabled style=opacity:.4':''}>⟲ Спочатку</button>
      </div>
    </div>
    <div class="calc"><div class="paper sheet">${contentHtml}</div></div>
    <div class="explain ${last?'done':''}"><span>${last?'🎉 ':''}${st.text}</span></div>
    <div class="step-nav">
      <button class="btn gray" onclick="stepTo(${S.step-1})" ${S.step===0?'disabled style=opacity:.4':''}>← Назад</button>
      <button class="btn" onclick="stepTo(${S.step+1})" ${last?'disabled style=opacity:.4':''}>Далі →</button>
    </div>`;
}

function stepTo(i){
  if(i<0||i>=S.steps.length) return;
  const def=toolDef();
  // Знімок позицій робимо ДО перемальовування. У «спокійному режимі» не анімуємо взагалі.
  S.anim = (def && def.prepare && S.model && !prefersReducedMotion())
    ? (def.prepare(S.model, S.step, i) || null)
    : null;
  S.step=i;
  render();
}
