/* =========================================================
   КАБІНЕТ УЧНЯ — основний потік: клас → предмет → тема → інструмент
   ========================================================= */
// Назва класу: гуртки мають власну повну назву (label), звичайні класи — «5 клас».
function clsTitle(c){ return c.label || c.name + ' клас'; }
// Коротший варіант для крихт і заголовків.
function clsCrumb(c){ return c.label ? c.name : c.name + ' клас'; }

function renderStudent(){
  // home -> вибір класу; далі предмет; далі теми; далі тема
  if(!S.cls){
    app.innerHTML = `
      <h1 class="page">Оберіть клас 👋</h1>
      <p class="sub">Оберіть клас, щоб перейти до предметів і покрокових інтерактивних інструментів.</p>
      <div class="grid c3">
        ${DB.classes.map(c=>{
          const n = DB.topics.filter(t=>t.cls===c.id).length;
          return `<a class="card click" href="${hrefCls(c.id)}">
            <div class="ico" style="background:${c.label?'var(--green-l)':'var(--primary-l)'}">${c.icon||'🏫'}</div>
            <h3>${esc(clsTitle(c))}</h3>
            <p class="d">${c.note?esc(c.note)+'<br>':''}${n} ${c.label?'розділів курсу':'навчальних тем'}</p>
          </a>`;}).join('')}
      </div>`;
    return;
  }
  const cls = DB.classes.find(c=>c.id===S.cls);
  const clsName = cls.name;
  const subjName = S.subject ? ((DB.subjects.find(s=>s.id===S.subject)||{}).name || 'Предмет') : 'Предмет';
  const subjects = DB.subjects.filter(s=>(s.cls||[]).includes(S.cls));
  if(!S.subject){
    const soon = subjects.filter(s=>!s.active).map(s=>s.name.toLowerCase());
    app.innerHTML = crumbs([{t:'Класи',href:hrefHome()},{t:clsCrumb(cls)}]) + `
      <h1 class="page">Предмети — ${esc(clsTitle(cls))}</h1>
      <p class="sub">Оберіть предмет.${soon.length?' У розробці: '+esc(soon.join(', '))+'.':''}</p>
      <div class="grid c3">
        ${subjects.map(s=>{ const tag = s.active ? 'a' : 'div'; return `
          <${tag} class="card ${s.active?'click':''}" ${s.active?`href="${hrefSubj(S.cls,s.id)}"`:'style="opacity:.55"'}>
            <div class="ico" style="background:${s.bg}">${s.icon}</div>
            <h3>${esc(s.name)}</h3>
            <p class="d">${s.active?'Доступні теми та інтерактивні інструменти':'Скоро з’явиться'}</p>
            ${s.active?'<div class="tag-row"><span class="pill">Активний</span></div>':''}
          </${tag}>`;}).join('')}
      </div>`;
    return;
  }
  if(!S.topic){
    const topics = DB.topics.filter(t=>t.cls===S.cls && t.subject===S.subject);
    // інструменти (kind:'tool', напр. схеми на проєктор) — окремою секцією над матеріалами
    const tools = topics.filter(t=>t.kind==='tool'), rest = topics.filter(t=>t.kind!=='tool');
    const grid = list => `<div class="grid c2">${list.map(topicCard).join('') || '<div class="empty">Тем поки немає</div>'}</div>`;
    app.innerHTML = crumbs([{t:'Класи',href:hrefHome()},{t:clsCrumb(cls),href:hrefCls(S.cls)},{t:subjName}]) + `
      <h1 class="page">${esc(cls.label ? clsTitle(cls) : subjName+' — '+clsName+' клас')}</h1>
      <p class="sub">${cls.label?'Оберіть розділ курсу.':tools.length?'Оберіть тему навчальної програми або інструмент для проєктора.':'Оберіть тему навчальної програми.'}</p>
      ${tools.length
        ? `<div class="section-title">🖥️ Інструменти на проєктор</div>${grid(tools)}
           <div class="section-title">📚 Матеріали</div>${grid(rest)}`
        : grid(rest)}`;
    return;
  }
  // сторінка теми
  const t = DB.topics.find(x=>x.id===S.topic);
  const matIcon={video:'🎬',text:'📄',test:'✅'};
  app.innerHTML = crumbs([{t:'Класи',href:hrefHome()},{t:clsCrumb(cls),href:hrefCls(S.cls)},{t:subjName,href:hrefSubj(S.cls,S.subject)},{t:t.title}]) + `
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
            <a class="btn sm" href="${hrefTopic(t,k.id)}">▶ Розв’язати крок за кроком</a>
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
        <a class="card click" href="${hrefTool(tl)}">
          <div class="ico" style="background:${DB.tools[tl].bg}">${DB.tools[tl].icon}</div>
          <h3>${DB.tools[tl].name}</h3>
          <p class="d">Введи власні числа і розв’яжи крок за кроком</p>
        </a>`).join('')}
    </div>`;
}

// картка теми в списку: документ, інструмент (теж документ, kind:'tool') або тема із завданнями
function topicCard(t){
  if(t.doc){
    const tool = t.kind==='tool';
    return `<a class="card click" href="${hrefTopic(t)}">
      <div style="display:flex;justify-content:space-between;align-items:start">
        <div class="ico" style="background:${tool?'var(--amber-l)':'var(--green-l)'}">${t.icon||'📘'}</div>
        <span class="pill${tool?' tool':''}">${tool?'інструмент':'матеріал'}</span>
      </div>
      <h3>${esc(t.title)}</h3>
      <p class="d">${esc(t.desc)}</p>
      ${t.chips&&t.chips.length?`<div class="tag-row">${t.chips.map(c=>`<span class="chip">${esc(c)}</span>`).join('')}</div>`:''}
    </a>`;
  }
  const done=t.tasks.filter(x=>x.done).length;
  return `<a class="card click" href="${hrefTopic(t)}">
    <div style="display:flex;justify-content:space-between;align-items:start">
      <div class="ico" style="background:var(--primary-l)">📘</div>
      <span class="pill">${done}/${t.tasks.length} виконано</span>
    </div>
    <h3>${esc(t.title)}</h3>
    <p class="d">${esc(t.desc)}</p>
    <div class="tag-row">
      ${[...new Set(t.tasks.map(x=>x.tool))].map(tl=>`<span class="chip">${DB.tools[tl].icon} ${DB.tools[tl].name}</span>`).join('')}
    </div>
  </a>`;
}

// перехід рівнем нижче/вище — лише зміна адреси (публічний API для inline-onclick)
function pick(key,val){
  if(key==='cls') go(val ? hrefCls(val) : hrefHome());
  if(key==='subject') go(val ? hrefSubj(S.cls,val) : hrefCls(S.cls));
  if(key==='topic'){ const t = val && DB.topics.find(x=>x.id===val); go(t ? hrefTopic(t) : hrefSubj(S.cls,S.subject)); }
}
