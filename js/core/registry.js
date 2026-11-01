/* =========================================================
   РЕЄСТР МАТЕМАТИЧНИХ ІНСТРУМЕНТІВ
   ---------------------------------------------------------
   Кожен файл js/tools/<id>.js реєструє модель, рендер зошита,
   читання значень та необов'язкові анімації.
   scripts/engine-runtime.mjs визначає порядок завантаження.
   React-компоненти у src/features/tools/inputs/ володіють
   формами введення. HTML-шаблони форм у реєстрі не зберігаємо.

   Обов'язкові поля:
     name, icon, color, bg — назва й оформлення картки;
     build(cfg)           — модель {steps:[{text, …}], …};
     view(model, ctx)     — розмітка одного кроку зошита;
     read(v)              — умова з React-полів: v('i_a') → значення.

   Анімація (необов'язково):
     prepare(model, from, to) — позиції зі старого DOM перед переходом;
     animate(model, ctx)      — політ після синхронного React-рендера.
     ctx = {step, index, anim}. У спокійному режимі prepare не викликаємо.

   build може кинути рядок-пояснення. 'bad' використовує errorHint.
   inputHint і freeHint — необов'язкові підказки для React UI.
   ========================================================= */
const TOOL_REQUIRED = ['name','icon','color','bg','build','view','read'];

function registerTool(id, def){
  if(DB.tools[id]) throw new Error(`Інструмент «${id}» уже зареєстровано`);
  const missing = TOOL_REQUIRED.filter(k=>def[k]==null);
  if(missing.length) throw new Error(`Інструмент «${id}»: не заповнено ${missing.join(', ')}`);
  DB.tools[id] = Object.assign({id}, def);
}

// Запис поточного (або вказаного) інструмента.
function toolDef(id){ return DB.tools[id||S.tool] || null; }

// Тема-урок: спочатку шукаємо у поточному класі.
function topicForTool(id){
  const ts=DB.topics.filter(t=>(t.tasks||[]).some(k=>k.tool===id));
  return ts.find(t=>t.cls===S.cls) || ts[0] || null;
}
