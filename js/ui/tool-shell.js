/* =========================================================
   ОБОЛОНКА ІНСТРУМЕНТА
   Не знає жодного інструмента за іменем — усе через toolDef().
   Життєвий цикл кроку:
     stepTo(i) → def.prepare(...)  (читає позиції зі старого DOM)
               → render() → def.view(...)  (малює новий крок)
               → rAF ×2 → def.animate(...) (запускає польоти)
   ========================================================= */
// Інструмент відкривається адресою (див. js/app.js): завдання — #/клас/предмет/тема/завдання,
// вільно — #/tool/<id>, власна умова — ?c=<JSON>. Самі стан і кроки будує роутер.
function openTool(tool,cfg,taskId){
  const t = taskId ? taskTopic(taskId) : null;
  go(t ? hrefTopic(t, taskId) : hrefTool(tool, cfg));
}
function closeTool(){ go(toolBackHref()); }

// тема, у якій лежить завдання
function taskTopic(taskId){ return DB.topics.find(t=>(t.tasks||[]).some(k=>k.id===taskId)) || null; }
// «← Назад»: із завдання — до теми; вільний інструмент — туди, звідки прийшли
function toolBackHref(){
  const t = S.toolTaskId ? taskTopic(S.toolTaskId) : null;
  return t ? hrefTopic(t) : (S.toolFrom || hrefHome());
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
  ReactUI.renderTool();
  S.anim=null; // React captures the animation context during the synchronous commit.
}

// Те, що бачить рендер і анімація кроку.
function stepCtx(){ return {step:S.steps[S.step], index:S.step, anim:S.anim}; }

// Власна умова йде в адресу (?c=…) — таку сторінку можна відкрити в новій вкладці.
// replace, а не новий запис: «Назад» не гортає кожне натискання кнопки.
function applyTool(){
  const def=toolDef();
  const cfg = def.read(readField);
  const t = S.toolTaskId ? taskTopic(S.toolTaskId) : null;
  const h = t ? hrefTopic(t, S.toolTaskId) + cfgQuery(cfg) : hrefTool(S.tool, cfg);
  if(location.hash === h) route(); else location.replace(h);
}
function markDone(){
  for(const t of DB.topics){ const k=(t.tasks||[]).find(x=>x.id===S.toolTaskId); if(k){k.done=true;} }
  toast('Завдання виконано! 🎉');
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
