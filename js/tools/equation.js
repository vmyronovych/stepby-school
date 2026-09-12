/* =========================================================
   РОЗВ'ЯЗУВАННЯ РІВНЯНЬ — тонкий адаптер: розбирає текст і
   делегує лінійному ядру (js/tools/linear.js).
   ========================================================= */
// Будуємо структуровану модель розв'язання: рядки з токенами, кожен токен має стійкий id
// (щоб анімувати переліт цифри зі старої позиції на нову), і тип переходу для кожного рядка.
// Тонка обгортка: розбирає текст рівняння й делегує лінійному ядру
function buildEqModel(text){
  if(!text||!text.includes('=')) throw 'Введіть рівняння зі знаком «=». Приклад: 3x + 5 = 20.';
  if(/[:/]/.test(text)) throw 'Цей інструмент поки розв’язує лінійні рівняння виду ax + b = cx + d (напр. 3x + 5 = 20). Для пропорцій є окремий інструмент «Пропорції».';
  if(text.split('=').length!==2) throw 'У рівнянні має бути один знак «=». Приклад: 5x − 4 = 2x + 11.';
  if(!/x/i.test(text)) throw 'У рівнянні має бути змінна x. Приклад: 3x + 5 = 20.';
  const [L,R]=text.split('=');
  return {rows: buildLinearRows(parseSide(L), parseSide(R))};
}

registerTool('eq', Object.assign({}, linearToolBase, {
  name:'Розв’язування рівнянь', icon:'🟰', color:'var(--pink)', bg:'var(--pink-l)',
  errorHint:'Не вдалося прочитати рівняння. Приклад: 3x + 5 = 20 або 5x − 4 = 2x + 11.',
  build(cfg){ const model=buildEqModel(cfg.text); model.steps=linearSteps(model.rows); return model; },
  inputs: c => `
    <div class="field"><label class="fl">Рівняння</label><input id="i_text" value="${c.text??'3x + 5 = 20'}"></div>`,
  read: v => ({text:v('i_text')}),
  summary: cfg => cfg.text,
  editorFields: cfg => `
    <div class="field"><label class="fl">Рівняння (наприклад 3x + 5 = 20)</label><input id="f_text" value="${cfg.text||''}"></div>
    <p class="helper">Підтримуються лінійні рівняння з x з обох боків.</p>`,
  readEditor: v => ({text:v('f_text')}),
}));
