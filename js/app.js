/* =========================================================
   РОУТЕР
   ========================================================= */
function render(){
  app.classList.toggle('wide', !!S.tool);   // ширша сторінка для інструмента (зошит займає більше місця)
  if(S.tool){ return renderTool(); }
  return renderStudent();
}

function crumbs(parts){
  return '<div class="crumbs">'+parts.map((p,i)=>{
    const sep = i<parts.length-1 ? '<span class="sep">›</span>' : '';
    if(p.go) return `<a onclick="${p.go}">${esc(p.t)}</a>${sep}`;
    return `<span>${esc(p.t)}</span>${sep}`;
  }).join('')+'</div>';
}

/* Role switch */
// повернення на головну (клік по лого)
function goHome(){ S.view='home'; S.cls=null; S.subject=null; S.topic=null; S.tool=null; S.step=0; render(); }

/* ---- старт ---- */
render();
