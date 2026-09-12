/* =========================================================
   КАБІНЕТ ВЧИТЕЛЯ
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
          <div class="txt"><b>${esc(k.title)}</b><small>${DB.tools[k.tool].name} · параметри: ${esc(cfgSummary(k.tool,k.cfg))}</small></div>
          <button class="btn ghost sm" onclick="editTask('${t.id}','${k.id}')">✏️ Змінити</button>
          <button class="btn gray sm" onclick="openTool('${k.tool}',${JSON.stringify(k.cfg).replace(/"/g,'&quot;')},null)">👁 Перегляд</button>
        </div>`).join('')}
      <button class="btn" style="margin-top:8px" onclick="addTask('${t.id}')">➕ Додати завдання</button>
    </div>`;
}

function cfgSummary(tool,cfg){
  if(tool==='mult') return `${cfg.a} × ${cfg.b}`;
  if(tool==='div')  return `${cfg.n} : ${cfg.d}`;
  if(tool==='eq')   return cfg.text;
  if(tool==='frac') return `${cfg.a}/${cfg.b} ${cfg.op} ${cfg.c}/${cfg.d}`;
  if(tool==='prop') return `${cfg.a} : ${cfg.b} = ${cfg.c} : ${cfg.d}`;
  if(tool==='dvk')  return `число ${cfg.n}`;
  return '';
}

/* ---- редагування / додавання завдання вчителем ---- */
function taskEditorFields(tool,cfg){
  cfg=cfg||{};
  if(tool==='mult') return `
    <div class="row">
      <div class="field" style="flex:1"><label class="fl">Перший множник</label><input id="f_a" type="number" value="${cfg.a||''}"></div>
      <div class="field" style="flex:1"><label class="fl">Другий множник</label><input id="f_b" type="number" value="${cfg.b||''}"></div>
    </div>`;
  if(tool==='div') return `
    <div class="row">
      <div class="field" style="flex:1"><label class="fl">Ділене</label><input id="f_n" type="number" value="${cfg.n||''}"></div>
      <div class="field" style="flex:1"><label class="fl">Дільник</label><input id="f_d" type="number" value="${cfg.d||''}"></div>
    </div>`;
  if(tool==='eq') return `
    <div class="field"><label class="fl">Рівняння (наприклад 3x + 5 = 20)</label><input id="f_text" value="${cfg.text||''}"></div>
    <p class="helper">Підтримуються лінійні рівняння з x з обох боків.</p>`;
  if(tool==='prop') return `
    <div class="row">
      <div class="field" style="flex:1"><label class="fl">a</label><input id="f_a" value="${cfg.a||''}"></div>
      <div class="field" style="flex:1"><label class="fl">b</label><input id="f_b" value="${cfg.b||''}"></div>
      <div class="field" style="flex:1"><label class="fl">c</label><input id="f_c" value="${cfg.c||''}"></div>
      <div class="field" style="flex:1"><label class="fl">d</label><input id="f_d" value="${cfg.d||''}"></div>
    </div>
    <p class="helper">Пропорція a : b = c : d. Кожна частина — число або доданок з x (напр. 5x, 4).</p>`;
  if(tool==='dvk') return `
    <div class="field"><label class="fl">Число (2–30)</label><input id="f_n" type="number" min="2" max="30" value="${cfg.n||''}"></div>
    <p class="helper">Учень побачить порівняння дільників і кратних цього числа.</p>`;
  if(tool==='frac') return `
    <div class="row">
      <div class="field" style="flex:1"><label class="fl">Чисельник 1</label><input id="f_a" type="number" value="${cfg.a||''}"></div>
      <div class="field" style="flex:1"><label class="fl">Знаменник 1</label><input id="f_b" type="number" value="${cfg.b||''}"></div>
      <div class="field" style="width:80px"><label class="fl">Дія</label>
        <select id="f_op"><option ${cfg.op==='+'?'selected':''}>+</option><option ${cfg.op==='-'?'selected':''}>-</option></select></div>
      <div class="field" style="flex:1"><label class="fl">Чисельник 2</label><input id="f_c" type="number" value="${cfg.c||''}"></div>
      <div class="field" style="flex:1"><label class="fl">Знаменник 2</label><input id="f_d" type="number" value="${cfg.d||''}"></div>
    </div>`;
}
function readEditor(tool){
  const v=id=>document.getElementById(id).value;
  if(tool==='mult') return {a:+v('f_a'),b:+v('f_b')};
  if(tool==='div')  return {n:+v('f_n'),d:+v('f_d')};
  if(tool==='eq')   return {text:v('f_text')};
  if(tool==='prop') return {a:v('f_a'),b:v('f_b'),c:v('f_c'),d:v('f_d')};
  if(tool==='dvk')  return {n:+v('f_n')};
  if(tool==='frac') return {a:+v('f_a'),b:+v('f_b'),op:v('f_op'),c:+v('f_c'),d:+v('f_d')};
}
let editCtx=null;
function editTask(topicId,taskId){
  const t=DB.topics.find(x=>x.id===topicId); const k=t.tasks.find(x=>x.id===taskId);
  editCtx={topicId,taskId,tool:k.tool};
  showModal(`Редагувати завдання`, `
    <p class="sub" style="margin-bottom:16px">${DB.tools[k.tool].icon} ${DB.tools[k.tool].name}</p>
    <div class="field"><label class="fl">Назва завдання (бачить учень)</label><input id="f_title" value="${esc(k.title)}"></div>
    ${taskEditorFields(k.tool,k.cfg)}
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
    <div id="addFields">${taskEditorFields('mult',{})}</div>
    <div class="row" style="justify-content:flex-end;margin-top:8px">
      <button class="btn gray" onclick="closeModal()">Скасувати</button>
      <button class="btn" onclick="createTask('${topicId}')">➕ Створити</button>
    </div>`);
  editCtx={topicId,taskId:null,tool:'mult'};
}
function switchAddTool(topicId){
  const tool=document.getElementById('f_tool').value; editCtx.tool=tool;
  document.getElementById('addFields').innerHTML=taskEditorFields(tool,{});
}
function saveTask(){
  const t=DB.topics.find(x=>x.id===editCtx.topicId); const k=t.tasks.find(x=>x.id===editCtx.taskId);
  k.title=document.getElementById('f_title').value; k.cfg=readEditor(editCtx.tool);
  closeModal(); toast('Завдання оновлено ✓'); render();
}
function createTask(topicId){
  const t=DB.topics.find(x=>x.id===topicId);
  const tool=editCtx.tool;
  t.tasks.push({id:'k'+Math.round(performance.now()), tool, title:document.getElementById('f_title').value||'Нове завдання', cfg:readEditor(tool), done:false});
  closeModal(); toast('Завдання створено ✓'); render();
}
