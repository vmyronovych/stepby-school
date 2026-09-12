/* =========================================================
   ПАНЕЛЬ АДМІНІСТРАТОРА — так само ВІД'ЄДНАНА від UI (див. teacher.js)
   ========================================================= */
function renderAdmin(){
  app.innerHTML = `
    <h1 class="page">Панель адміністратора</h1>
    <p class="sub">Керування структурою порталу: класи, предмети, програма та користувачі.</p>
    <div class="stat" style="margin-bottom:24px">
      <div class="box"><div class="n">${DB.classes.length}</div><div class="l">класів</div></div>
      <div class="box"><div class="n">${DB.subjects.length}</div><div class="l">предметів</div></div>
      <div class="box"><div class="n">${DB.topics.length}</div><div class="l">тем у програмі</div></div>
      <div class="box"><div class="n">3</div><div class="l">ролі користувачів</div></div>
    </div>

    <div class="grid c2">
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <h3>🏫 Класи</h3><button class="btn ghost sm" onclick="adminAddClass()">➕ Додати</button>
        </div>
        <table class="tbl">
          <tr><th>Клас</th><th>Тем</th></tr>
          ${DB.classes.map(c=>`<tr><td><b>${esc(c.name)}</b></td><td>${DB.topics.filter(t=>t.cls===c.id).length}</td></tr>`).join('')}
        </table>
      </div>
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <h3>📚 Предмети</h3><button class="btn ghost sm" onclick="toast('Демо: додавання предмета')">➕ Додати</button>
        </div>
        <table class="tbl">
          <tr><th>Предмет</th><th>Статус</th></tr>
          ${DB.subjects.map(s=>`<tr><td>${s.icon} <b>${esc(s.name)}</b></td><td>${s.active?'<span class="badge ok">активний</span>':'<span class="badge new">у розробці</span>'}</td></tr>`).join('')}
        </table>
      </div>
    </div>

    <div class="section-title">📖 Навчальна програма (математика)</div>
    <div class="card">
      <table class="tbl">
        <tr><th>Тема</th><th>Клас</th><th>Матеріалів</th><th>Завдань</th><th>Інструменти</th></tr>
        ${DB.topics.filter(t=>t.subject==='math').map(t=>`
          <tr><td><b>${esc(t.title)}</b></td><td>${DB.classes.find(c=>c.id===t.cls).name}</td>
          <td>${t.materials.length}</td><td>${t.tasks.length}</td>
          <td>${[...new Set(t.tasks.map(x=>x.tool))].map(tl=>DB.tools[tl].icon).join(' ')}</td></tr>`).join('')}
      </table>
    </div>

    <div class="section-title">👥 Користувачі та ролі</div>
    <div class="card">
      <table class="tbl">
        <tr><th>Ім’я</th><th>Роль</th><th>Доступ</th></tr>
        <tr><td><b>Олег Петренко</b></td><td>🎒 Учень</td><td>5-А клас · перегляд матеріалів, розв’язування завдань</td></tr>
        <tr><td><b>Марія Іванівна</b></td><td>👩‍🏫 Вчитель</td><td>Математика · створення й налаштування завдань</td></tr>
        <tr><td><b>Адміністратор школи</b></td><td>🛠️ Адміністратор</td><td>Повний доступ до структури порталу</td></tr>
      </table>
    </div>`;
}
function adminAddClass(){
  showModal('Додати клас',`
    <div class="field"><label class="fl">Назва класу</label><input id="f_cls" placeholder="Напр. 6-Б"></div>
    <div class="row" style="justify-content:flex-end">
      <button class="btn gray" onclick="closeModal()">Скасувати</button>
      <button class="btn" onclick="doAddClass()">Додати</button>
    </div>`);
}
function doAddClass(){
  const n=document.getElementById('f_cls').value.trim(); if(!n) return;
  DB.classes.push({id:'c'+Math.round(performance.now()),name:n});
  closeModal(); toast('Клас додано ✓'); render();
}
