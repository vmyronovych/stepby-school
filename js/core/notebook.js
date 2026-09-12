// Відмальовка колонкового обчислення на клітинковій сітці.
// rows: [{cells:[...]}] або {line:true, span?:[from,to]} — лінія підкреслює попередній рядок.
function colGrid(rows, width){
  const content=[];
  for(const r of rows){
    if(r.line){
      if(content.length){
        const prev=content[content.length-1];
        if(r.span) prev.ulSpan=r.span; else prev.ulFull=true;
      }
    } else content.push({cells:r.cells, anim:r.anim});
  }
  const ctx={writing:true, order:0};                 // спільний лічильник для послідовного «письма»
  let h=`<div class="notebook" style="grid-template-columns:repeat(${width},var(--cell))">`;
  for(const r of content){
    for(let i=0;i<width;i++){
      const c=r.cells[i];
      let cls='nk'+(c?(' '+(c.cls||'')):' e');
      if(r.ulFull || (r.ulSpan && i>=r.ulSpan[0] && i<=r.ulSpan[1])) cls+=' ul';
      let inner='';
      if(c){ inner = (r.anim||c.anim) ? hwGlyphs(c.ch, ctx) : hwGlyphs(c.ch, {writing:false}); }
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
