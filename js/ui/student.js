/* =========================================================
   КАБІНЕТ УЧНЯ — основний потік: клас → предмет → тема → інструмент
   ========================================================= */
function renderStudent(){
  // home -> вибір класу; далі предмет; далі теми; далі тема
  if(!S.cls){
    app.innerHTML = `
      <h1 class="page">Оберіть клас 👋</h1>
      <p class="sub">Оберіть клас, щоб перейти до предметів і покрокових інтерактивних інструментів.</p>
      <div class="grid c3">
        ${DB.classes.map(c=>`
          <div class="card click" onclick="pick('cls','${c.id}')">
            <div class="ico" style="background:var(--primary-l)">🏫</div>
            <h3>${esc(c.name)} клас</h3>
            <p class="d">${DB.topics.filter(t=>t.cls===c.id).length} навчальних тем</p>
          </div>`).join('')}
      </div>`;
    return;
  }
  const clsName = DB.classes.find(c=>c.id===S.cls).name;
  const subjName = S.subject ? ((DB.subjects.find(s=>s.id===S.subject)||{}).name || 'Предмет') : 'Предмет';
  if(!S.subject){
    app.innerHTML = crumbs([{t:'Класи',go:"pick('cls',null)"},{t:clsName+' клас'}]) + `
      <h1 class="page">Предмети — ${esc(clsName)} клас</h1>
      <p class="sub">Оберіть предмет. Наразі наповнена математика — українська мова, фізика та хімія в розробці.</p>
      <div class="grid c3">
        ${DB.subjects.map(s=>`
          <div class="card ${s.active?'click':''}" ${s.active?`onclick="pick('subject','${s.id}')"`:'style="opacity:.55"'}>
            <div class="ico" style="background:${s.bg}">${s.icon}</div>
            <h3>${esc(s.name)}</h3>
            <p class="d">${s.active?'Доступні теми та інтерактивні інструменти':'Скоро з’явиться'}</p>
            ${s.active?'<div class="tag-row"><span class="pill">Активний</span></div>':''}
          </div>`).join('')}
      </div>`;
    return;
  }
  if(!S.topic){
    const topics = DB.topics.filter(t=>t.cls===S.cls && t.subject===S.subject);
    app.innerHTML = crumbs([{t:'Класи',go:"pick('cls',null)"},{t:clsName+' клас',go:"pick('subject',null)"},{t:subjName}]) + `
      <h1 class="page">${esc(subjName)} — ${esc(clsName)} клас</h1>
      <p class="sub">Оберіть тему навчальної програми.</p>
      <div class="grid c2">
        ${topics.map(t=>{
          const done=t.tasks.filter(x=>x.done).length;
          return `<div class="card click" onclick="pick('topic','${t.id}')">
            <div style="display:flex;justify-content:space-between;align-items:start">
              <div class="ico" style="background:var(--primary-l)">📘</div>
              <span class="pill">${done}/${t.tasks.length} виконано</span>
            </div>
            <h3>${esc(t.title)}</h3>
            <p class="d">${esc(t.desc)}</p>
            <div class="tag-row">
              ${[...new Set(t.tasks.map(x=>x.tool))].map(tl=>`<span class="chip">${DB.tools[tl].icon} ${DB.tools[tl].name}</span>`).join('')}
            </div>
          </div>`;
        }).join('') || '<div class="empty">Тем поки немає</div>'}
      </div>`;
    return;
  }
  // сторінка теми
  const t = DB.topics.find(x=>x.id===S.topic);
  const matIcon={video:'🎬',text:'📄',test:'✅'};
  app.innerHTML = crumbs([{t:'Класи',go:"pick('cls',null)"},{t:clsName+' клас',go:"pick('subject',null)"},{t:subjName,go:"pick('topic',null)"},{t:t.title}]) + `
    <h1 class="page">${esc(t.title)}</h1>
    <p class="sub">${esc(t.desc)}</p>

    <div class="section-title">🧩 Інтерактивні завдання від вчителя</div>
    <div class="grid c2">
      ${t.tasks.map(k=>`
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:8px">
            <div class="ico" style="background:${DB.tools[k.tool].bg};margin:0">${DB.tools[k.tool].icon}</div>
            ${k.done?'<span class="badge ok">✓ виконано</span>':'<span class="badge new">нове</span>'}
          </div>
          <h3>${esc(k.title)}</h3>
          <p class="d">${DB.tools[k.tool].name}</p>
          <div style="margin-top:14px">
            <button class="btn sm" onclick="openTool('${k.tool}',${JSON.stringify(k.cfg).replace(/"/g,'&quot;')},'${k.id}')">▶ Розв’язати крок за кроком</button>
          </div>
        </div>`).join('')}
    </div>

    <div class="section-title">📚 Навчальні матеріали</div>
    <div class="card">
      ${t.materials.map(m=>`
        <div class="list-item">
          <div class="ic" style="background:var(--primary-l)">${matIcon[m.type]||'📄'}</div>
          <div class="txt"><b>${esc(m.title)}</b><small>${m.type==='video'?'Відеоурок':m.type==='test'?'Інтерактивний тест':'Текстовий конспект'}</small></div>
          <button class="btn ghost sm" onclick="toast('Демо: матеріал відкрито')">Відкрити</button>
        </div>`).join('')}
    </div>

    <div class="section-title">🛠️ Спробувати інструменти вільно</div>
    <div class="grid c2">
      ${[...new Set(t.tasks.map(x=>x.tool))].map(tl=>`
        <div class="card click" onclick="openTool('${tl}',null,null)">
          <div class="ico" style="background:${DB.tools[tl].bg}">${DB.tools[tl].icon}</div>
          <h3>${DB.tools[tl].name}</h3>
          <p class="d">Введи власні числа і розв’яжи крок за кроком</p>
        </div>`).join('')}
    </div>`;
}

function pick(key,val){
  if(key==='cls'){ S.cls=val; S.subject=null; S.topic=null; }
  if(key==='subject'){ S.subject=val; S.topic=null; }
  if(key==='topic'){ S.topic=val; }
  render();
}
