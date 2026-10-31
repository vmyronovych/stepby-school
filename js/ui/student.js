/* =========================================================
   КАБІНЕТ УЧНЯ — основний потік: клас → предмет → тема → інструмент
   ========================================================= */
// Назва класу: гуртки мають власну повну назву (label), звичайні класи — «5 клас».
function clsTitle(c){ return c.label || c.name + ' клас'; }
// Коротший варіант для крихт і заголовків.
function clsCrumb(c){ return c.label ? c.name : c.name + ' клас'; }

// React owns student pages; navigation helpers remain public for legacy documents.
function renderStudent(){ ReactUI.renderStudent(); }

// перехід рівнем нижче/вище — лише зміна адреси (публічний API для inline-onclick)
function pick(key,val){
  if(key==='cls') go(val ? hrefCls(val) : hrefHome());
  if(key==='subject') go(val ? hrefSubj(S.cls,val) : hrefCls(S.cls));
  if(key==='topic'){ const t = val && DB.topics.find(x=>x.id===val); go(t ? hrefTopic(t) : hrefSubj(S.cls,S.subject)); }
}
