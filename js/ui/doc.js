/* =========================================================
   ПЕРЕГЛЯД ДОКУМЕНТА (матеріали гуртка робототехніки)
   ---------------------------------------------------------
   Третій вид сторінки поряд із потоком учня та оболонкою
   інструмента. Тема, у якої є поле `doc`, показується не
   списком завдань, а самим документом: зміст ліворуч, текст
   праворуч, схеми відкриваються на весь екран і друкуються.

   Оболонка не знає жодного розділу за іменем: усе, що вона
   бере з даних, — це id розділу в ROBO.sections.
   ========================================================= */

function openDoc(topicId){
  S.topic = topicId; S.tool = null;
  render();
  window.scrollTo(0, 0);
}

function renderDoc(topic){
  const sec = ROBO.sections[topic.doc];
  if(!sec){ app.innerHTML = '<div class="empty">Розділ не знайдено</div>'; return; }
  const cls  = DB.classes.find(c=>c.id===topic.cls) || {name:''};
  const subj = DB.subjects.find(s=>s.id===topic.subject) || {name:'Предмет'};
  app.innerHTML = crumbs([
      {t:'Класи',              go:"pick('cls',null)"},
      {t:clsCrumb(cls),        go:"pick('subject',null)"},
      {t:subj.name,            go:"pick('topic',null)"},
      {t:topic.title},
    ]) + `
    <div class="robo-doc">
      <aside class="robo-toc" id="roboToc"></aside>
      <div class="robo-body" id="roboBody">
        <h1 class="page">${esc(sec.title)}</h1>
        <p class="sub">${esc(topic.desc)}</p>
        ${sec.html}
      </div>
    </div>
    <div class="robo-lightbox" id="roboLightbox"><div class="box"></div></div>`;

  buildRoboToc();
  restoreKtp();
  bindRoboDoc();
  if(typeof initRoboSim === 'function') initRoboSim();
}

/* ---- зміст розділу: збирається з наявних <h2 id> ---- */
function buildRoboToc(){
  const toc = document.getElementById('roboToc');
  const hs  = [...document.querySelectorAll('#roboBody h2[id]')];
  // розділ без <h2> (суцільний текст) — зміст непотрібен, документ іде на всю ширину
  if(!hs.length){ toc.remove(); document.querySelector('.robo-doc').classList.add('no-toc'); return; }
  toc.innerHTML = '<div class="tt">У цьому розділі</div>' +
    hs.map(h=>`<a data-jump="${h.id}">${esc(h.textContent)}</a>`).join('');
}

/* ---- поля КТП живуть у пам'яті (як і решта даних порталу) ---- */
function restoreKtp(){
  for(const el of document.querySelectorAll('#roboBody [contenteditable][data-k]')){
    const v = ROBO.ktp[el.dataset.k];
    if(v) el.textContent = v;
  }
}

function bindRoboDoc(){
  const body = document.getElementById('roboBody');
  const toc  = document.getElementById('roboToc');

  if(toc) toc.addEventListener('click', e=>{
    const a = e.target.closest('a[data-jump]'); if(!a) return;
    jumpTo(a.dataset.jump);
  });

  for(const el of body.querySelectorAll('[contenteditable][data-k]')){
    el.addEventListener('blur', ()=>{ ROBO.ktp[el.dataset.k] = el.textContent.trim(); });
  }

  // посилання всередині матеріалу: або інший розділ, або якір у цьому
  body.addEventListener('click', e=>{
    const a = e.target.closest('a[href^="#"]'); if(!a) return;
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const topic = docTopicFor(id) || docTopicFor(id.split('-')[0]);
    if(topic && topic.id !== S.topic){ openDoc(topic.id); return; }
    jumpTo(id);
  });

  // схеми: клік розгортає на весь екран
  const lb = document.getElementById('roboLightbox');
  body.addEventListener('click', e=>{
    const fig = e.target.closest('figure.fig'); if(!fig) return;
    lb.querySelector('.box').innerHTML = fig.innerHTML +
      '<div class="acts"><button class="btn sm" data-print-fig>🖨 Друкувати цю схему</button></div>';
    const cap = lb.querySelector('figcaption'); if(cap) cap.className = 'cap';
    lb.classList.add('on');
    lb.querySelector('[data-print-fig]').onclick = ev=>{ ev.stopPropagation(); printHtml('Схема', fig.innerHTML, FIG_CSS); };
  });
  lb.addEventListener('click', e=>{ if(!e.target.closest('.acts')) lb.classList.remove('on'); });
  document.addEventListener('keydown', escCloseLightbox);

  bind('rulesPoster', ()=>printRules(true));
  bind('rulesCard',   ()=>printRules(false));
  bind('morsePrint',  printMorse);
  bind('ktpPrint',    printKtp);
  bind('ktpClear',    clearKtp);

  function bind(id, fn){ const b = document.getElementById(id); if(b) b.onclick = fn; }
}

function escCloseLightbox(e){
  if(e.key !== 'Escape') return;
  const lb = document.getElementById('roboLightbox');
  if(lb) lb.classList.remove('on');
}

function jumpTo(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior: prefersReducedMotion() ? 'auto' : 'smooth', block:'start'});
}

// тема-документ за id розділу
function docTopicFor(sectionId){
  return DB.topics.find(t=>t.doc === sectionId) || null;
}

/* =========================================================
   ДРУК: кожен матеріал іде у нове вікно зі своїм стилем
   ========================================================= */
const FIG_CSS = 'body{margin:0;display:flex;align-items:center;justify-content:center;height:100vh;' +
  'font-family:sans-serif}svg{width:96%;height:auto}';

function printHtml(title, html, css){
  const w = window.open('', '_blank');
  if(!w){ toast('Дозвольте відкривати вікна, щоб друкувати'); return; }
  w.document.write('<!DOCTYPE html><html lang="uk"><head><meta charset="utf-8"><title>' +
    esc(title) + '</title><style>' + css + '</style></head><body>' + html + '</body></html>');
  w.document.close(); w.focus();
  setTimeout(()=>w.print(), 400);
}

function printRules(big){
  const rules = [...document.querySelectorAll('#roboBody .rule')];
  const css = '@page{size:A4 portrait;margin:' + (big?'10mm':'14mm') + '}' +
    'body{font-family:"Trebuchet MS",Arial,sans-serif;color:#111;margin:0}' +
    'h1{text-align:center;font-size:' + (big?'30pt':'18pt') + ';margin:0 0 ' + (big?'8mm':'5mm') + '}' +
    '.r{display:flex;gap:' + (big?'8mm':'5mm') + ';align-items:flex-start;margin:' + (big?'7mm 0':'3.5mm 0') + '}' +
    '.n{flex:none;width:' + (big?'18mm':'10mm') + ';height:' + (big?'18mm':'10mm') + ';border-radius:50%;' +
    'background:#5b4be6;color:#fff;font-weight:bold;font-size:' + (big?'22pt':'13pt') + ';' +
    'display:flex;align-items:center;justify-content:center}' +
    '.t{font-size:' + (big?'20pt':'12.5pt') + ';font-weight:bold;line-height:1.25}' +
    '.s{font-size:' + (big?'14pt':'10.5pt') + ';color:#444;margin-top:1mm}';
  const html = '<h1>Правила нашого гуртка</h1>' + rules.map((el,i)=>
    '<div class="r"><div class="n">' + (i+1) + '</div><div><div class="t">' +
    esc(el.querySelector('.rtitle').textContent) + '</div><div class="s">' +
    esc(el.querySelector('.rsub').textContent) + '</div></div></div>').join('');
  printHtml('Правила гуртка', html, css);
}

function printKtp(){
  const page = document.getElementById('roboBody').cloneNode(true);
  page.querySelectorAll('.noprint, .robo-toc').forEach(n=>n.remove());
  const css = '@page{size:A4 landscape;margin:12mm}' +
    'body{font-family:Georgia,"Times New Roman",serif;color:#000;margin:0;font-size:11pt}' +
    'h1.page,p.sub{display:none}' +
    '.approve{display:flex;gap:40px;font-size:9.5pt;margin:0 0 6mm}.approve span{flex:1}' +
    'h2.ktptitle{text-align:center;font-size:15pt;margin:0 0 1mm}' +
    '.ktpsub{text-align:center;margin:0 0 3mm;font-size:11pt}' +
    '.ktpmeta{font-size:10pt;margin:0 0 4mm}' +
    'h2{font-size:12pt;margin:6mm 0 2mm}' +
    'table{border-collapse:collapse;width:100%;font-size:9.5pt}' +
    'th,td{border:1px solid #000;padding:2px 4px;vertical-align:top}th{background:#eee}' +
    'tr.modrow td{background:#ddd;font-weight:bold}' +
    '[contenteditable]{background:none;padding:0}' +
    'ul{margin:1mm 0 2mm;padding-left:6mm}li{margin:0.6mm 0}tr{page-break-inside:avoid}';
  printHtml('КТП гуртка робототехніки', page.innerHTML, css);
}

function clearKtp(){
  if(!confirm('Очистити всі заповнені поля КТП?')) return;
  ROBO.ktp = {};
  for(const el of document.querySelectorAll('#roboBody [contenteditable][data-k]')){
    if(/^[dn]\d/.test(el.dataset.k)) el.textContent = '';
  }
  toast('Поля КТП очищено');
}

function printMorse(){
  const blocks = [...document.querySelectorAll('#roboBody .mgrid')];
  const titles = ['Українські літери','Цифри','Розділові знаки й сигнали','Латинські літери'];
  const css = 'body{font-family:Georgia,serif;margin:14mm;color:#111}' +
    'h1{font-size:20pt;margin:0 0 2mm}p.sub{margin:0 0 6mm;color:#555;font-size:10pt}' +
    'h2{font-size:12pt;margin:6mm 0 2mm}table{border-collapse:collapse;width:100%}' +
    'th,td{border:1px solid #bbb;padding:3px 6px;font-size:11pt}' +
    'th{background:#f0f0f0;width:34px;text-align:center}' +
    'td{font-family:Consolas,monospace;letter-spacing:2px}' +
    'th:empty,td:empty{border:none;background:none}';
  const html = '<h1>Азбука Морзе</h1><p class="sub">Крапка = 1, тире = 3. ' +
    'Пауза між літерами = 3, між словами = 7.</p>' +
    blocks.map((b,i)=>'<h2>' + (titles[i]||'') + '</h2>' + b.innerHTML).join('');
  printHtml('Азбука Морзе', html, css);
}
