/* =========================================================
   РОУТЕР І СТАРТ
   Завантажується останнім: на цей момент реєстр уже наповнений.
   ========================================================= */
// повернення на головну (клік по лого)
function goHome(){ S.view='home'; S.cls=null; S.subject=null; S.topic=null; S.tool=null; S.step=0; render(); }

function render(){
  // тема-документ (матеріали гуртка) показується власним переглядом
  const topic = S.topic ? DB.topics.find(x=>x.id===S.topic) : null;
  const isDoc = !S.tool && topic && topic.doc;
  // ширша сторінка для інструмента (зошит) і для документа (схеми й таблиці)
  app.classList.toggle('wide', !!S.tool || !!isDoc);
  if(S.tool){ return renderTool(); }
  if(isDoc){ return renderDoc(topic); }
  return renderStudent();
}

function crumbs(parts){
  return '<div class="crumbs">'+parts.map((p,i)=>{
    const sep = i<parts.length-1 ? '<span class="sep">›</span>' : '';
    if(p.go) return `<a onclick="${p.go}">${esc(p.t)}</a>${sep}`;
    return `<span>${esc(p.t)}</span>${sep}`;
  }).join('')+'</div>';
}

/* ---- старт ---- */
render();
