/* =========================================================
   КАБІНЕТ ВЧИТЕЛЯ — код живий, але ВІД'ЄДНАНИЙ від UI:
   render() на нього не маршрутизує (ролей в інтерфейсі немає).
   Тримаємо цілим, бо контракт реєстру (summary/editorFields/readEditor)
   під нього заточений.
   ========================================================= */
function renderTeacher(){
  if(S.topic){
    return renderTeacherTopic();
  }
  const topics=DB.topics.filter(t=>t.subject==='math');
  app.innerHTML = `
    <h1 class="page">Кабінет вчителя</h1>
    <p class="sub">Марія Іванівна · вчитель математики. Керуйте темами та налаштовуйте інтерактивні завдання для учнів.</p>
    <div class="stat" style="margin-bottom:24px">
      <div class="box"><div class="n">${DB.classes.length}</div><div class="l">класів</div></div>
      <div class="box"><div class="n">${topics.length}</div><div class="l">тем з математики</div></div>
      <div class="box"><div class="n">${topics.reduce((a,t)=>a+t.tasks.length,0)}</div><div class="l">завдань створено</div></div>
      <div class="box"><div class="n">4</div><div class="l">інтерактивні інструменти</div></div>
    </div>

    <div class="section-title">📋 Теми та завдання</div>
    <div class="card">
      <table class="tbl">
        <tr><th>Тема</th><th>Клас</th><th>Завдань</th><th>Інструменти</th><th></th></tr>
        ${topics.map(t=>`
          <tr>
            <td><b>${esc(t.title)}</b></td>
            <td>${DB.classes.find(c=>c.id===t.cls).name}</td>
            <td>${t.tasks.length}</td>
            <td>${[...new Set(t.tasks.map(x=>x.tool))].map(tl=>DB.tools[tl].icon).join(' ')}</td>
            <td style="text-align:right"><button class="btn ghost sm" onclick="teacherOpen('${t.id}')">Налаштувати</button></td>
          </tr>`).join('')}
      </table>
    </div>

    <div class="section-title">🧪 Швидко перевірити інструмент</div>
    <div class="grid c2">
      ${Object.keys(DB.tools).map(tl=>`
        <div class="card click" onclick="openTool('${tl}',null,null)">
          <div class="ico" style="background:${DB.tools[tl].bg}">${DB.tools[tl].icon}</div>
          <h3>${DB.tools[tl].name}</h3>
          <p class="d">Відкрити інструмент і перевірити роботу</p>
        </div>`).join('')}
    </div>`;
}
function teacherOpen(id){ S.topic=id; render(); }

function renderTeacherTopic(){
  const t=DB.topics.find(x=>x.id===S.topic);
  const clsName=DB.classes.find(c=>c.id===t.cls).name;
  app.innerHTML = crumbs([{t:'Кабінет вчителя',go:"S.topic=null;render()"},{t:t.title}]) + `
    <h1 class="page">${esc(t.title)}</h1>
    <p class="sub">${esc(clsName)} клас · Математика. Тут ви налаштовуєте завдання, які учні розв’язують інтерактивно.</p>

    <div class="section-title">🧩 Завдання цієї теми</div>
    <div class="card">
      ${t.tasks.map(k=>`
        <div class="list-item">
          <div class="ic" style="background:${DB.tools[k.tool].bg}">${DB.tools[k.tool].icon}</div>
          <div class="txt"><b>${esc(k.title)}</b><small>${DB.tools[k.tool].name} · параметри: ${esc(toolDef(k.tool).summary(k.cfg))}</small></div>
          <button class="btn ghost sm" onclick="editTask('${t.id}','${k.id}')">✏️ Змінити</button>
          <button class="btn gray sm" onclick="openTool('${k.tool}',${JSON.stringify(k.cfg).replace(/"/g,'&quot;')},null)">👁 Перегляд</button>
        </div>`).join('')}
      <button class="btn" style="margin-top:8px" onclick="addTask('${t.id}')">➕ Додати завдання</button>
    </div>`;
}
let editCtx=null;
function editTask(topicId,taskId){
  const t=DB.topics.find(x=>x.id===topicId); const k=t.tasks.find(x=>x.id===taskId);
  editCtx={topicId,taskId,tool:k.tool};
  showModal(`Редагувати завдання`, `
    <p class="sub" style="margin-bottom:16px">${DB.tools[k.tool].icon} ${DB.tools[k.tool].name}</p>
    <div class="field"><label class="fl">Назва завдання (бачить учень)</label><input id="f_title" value="${esc(k.title)}"></div>
    ${toolDef(k.tool).editorFields(k.cfg||{})}
    <div class="row" style="justify-content:flex-end;margin-top:8px">
      <button class="btn gray" onclick="closeModal()">Скасувати</button>
      <button class="btn" onclick="saveTask()">💾 Зберегти</button>
    </div>`);
}
function addTask(topicId){
  showModal('Додати завдання',`
    <div class="field"><label class="fl">Інструмент</label>
      <select id="f_tool" onchange="switchAddTool('${topicId}')">
        ${Object.keys(DB.tools).map(tl=>`<option value="${tl}">${DB.tools[tl].name}</option>`).join('')}
      </select></div>
    <div class="field"><label class="fl">Назва завдання</label><input id="f_title" placeholder="Напр. Обчисли 123 × 45"></div>
    <div id="addFields">${toolDef('mult').editorFields({})}</div>
    <div class="row" style="justify-content:flex-end;margin-top:8px">
      <button class="btn gray" onclick="closeModal()">Скасувати</button>
      <button class="btn" onclick="createTask('${topicId}')">➕ Створити</button>
    </div>`);
  editCtx={topicId,taskId:null,tool:'mult'};
}
function switchAddTool(topicId){
  const tool=document.getElementById('f_tool').value; editCtx.tool=tool;
  document.getElementById('addFields').innerHTML=toolDef(tool).editorFields({});
}
function saveTask(){
  const t=DB.topics.find(x=>x.id===editCtx.topicId); const k=t.tasks.find(x=>x.id===editCtx.taskId);
  k.title=document.getElementById('f_title').value; k.cfg=toolDef(editCtx.tool).readEditor(readField);
  closeModal(); toast('Завдання оновлено ✓'); render();
}
function createTask(topicId){
  const t=DB.topics.find(x=>x.id===topicId);
  const tool=editCtx.tool;
  t.tasks.push({id:'k'+Math.round(performance.now()), tool, title:document.getElementById('f_title').value||'Нове завдання', cfg:toolDef(tool).readEditor(readField), done:false});
  closeModal(); toast('Завдання створено ✓'); render();
}
