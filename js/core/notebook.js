/* =========================================================
   КОЛОНКОВА СІТКА ЗОШИТА — спільний рендер для множення й ділення
   ========================================================= */
// Відмальовка колонкового обчислення на клітинковій сітці.
// rows: [{cells:[...]}] або {line:true, span?:[from,to]} — лінія підкреслює попередній рядок.
// startOrder — з якого «такту» пера починати письмо (щоб дописувати після польоту/іншого рядка).
// Клітинка з полем seq пишеться на такті startOrder+seq незалежно від рядка — так цифру
// можна написати раніше за перенесення в рядку НАД нею (як пише людина).
// Клітинка з полем sup:{ch, cls, seq?} має ще дрібну цифру в правому верхньому куті
// (число «в умі» над цифрою, до якої його додаватимуть); main-гліф тоді може бути порожнім.
function colGrid(rows, width, startOrder){
  const content=[];
  for(const r of rows){
    if(r.line){
      if(content.length){
        const prev=content[content.length-1];
        if(r.span) prev.ulSpan=r.span; else prev.ulFull=true;
      }
    } else content.push({cells:r.cells, anim:r.anim});
  }
  const ctx={writing:true, order:startOrder||0};                 // спільний лічильник для послідовного «письма»
  let h=`<div class="notebook" style="grid-template-columns:repeat(${width},var(--cell))">`;
  for(const r of content){
    for(let i=0;i<width;i++){
      const c=r.cells[i];
      let cls='nk'+(c?(' '+(c.cls||'')):' e');
      if(r.ulFull || (r.ulSpan && i>=r.ulSpan[0] && i<=r.ulSpan[1])) cls+=' ul';
      let inner='';
      if(c){
        if(c.seq!=null) inner = hwGlyphs(c.ch, {writing:true, order:(startOrder||0)+c.seq});
        else inner = (r.anim||c.anim) ? hwGlyphs(c.ch, ctx) : hwGlyphs(c.ch, {writing:false});
        if(c.sup) inner+=`<span class="nk-sup ${c.sup.cls||''}">${hwGlyphs(c.sup.ch,
          c.sup.seq!=null ? {writing:true, order:(startOrder||0)+c.sup.seq} : {writing:false})}</span>`;
      }
      h+=`<div class="${cls}">${inner}</div>`;
    }
  }
  return h+'</div>';
}
function mkRow(str,endCol,width,cls){
  const cells=Array(width).fill('');
  str=String(str);
  for(let k=0;k<str.length;k++){ const c=endCol-(str.length-1)+k; if(c>=0&&c<width) cells[c]={ch:str[k],cls}; }
  return {cells};
}

// Нотатка на полях аркуша: навичку з окремого уроку (напр. розклад на множники в НСК і НСД)
// інструмент заново не пояснює, а посилається на урок. what — що саме там пояснено;
// anim — такт пера (hwTick), коли нотатка з'являється. Немає уроку — нотатки немає.
function lessonNote(toolId, what, anim){
  const t=topicForTool(toolId);
  if(!t) return '';
  return `<div class="lnote hwa"${anim||''}>${what} — докладно в уроці <a href="${hrefTopic(t)}">«${esc(t.title)}»</a>.</div>`;
}
