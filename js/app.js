/* =========================================================
   РОУТЕР І СТАРТ
   Завантажується останнім: на цей момент реєстр уже наповнений.

   Кожна сторінка має адресу (hash — працює і з file://):
     #/                               головна
     #/<клас>                         предмети класу
     #/<клас>/<предмет>               теми предмета
     #/<клас>/<предмет>/<тема>        тема: завдання або документ
     #/<клас>/<предмет>/<тема>/<sub>  sub: завдання (відкрите в інструменті)
                                      або якір / пресет документа
     #/tool/<інструмент>              інструмент вільно
     …?c=<JSON>                       власна умова інструмента
   Перехід між сторінками — звичайне посилання <a href>: так працюють
   «Назад»/«Вперед», нова вкладка й закладки. Стан S виводиться з адреси,
   render() лише малює S. Крок інструмента в адресу не пишеться.
   ========================================================= */

/* ---- побудова адрес: одне місце на весь сайт ---- */
function hrefHome(){ return '#/'; }
function hrefCls(cls){ return '#/'+cls; }
function hrefSubj(cls, subj){ return '#/'+cls+'/'+subj; }
function hrefTopic(t, sub){ return '#/'+t.cls+'/'+t.subject+'/'+t.id+(sub?'/'+encodeURIComponent(sub):''); }
function hrefTool(tool, cfg){ return '#/tool/'+tool+cfgQuery(cfg); }
// документ за id розділу (DOCS) — для посилань усередині матеріалів
function hrefDoc(docId, sub){ const t = docTopicFor(docId); return t ? hrefTopic(t, sub) : hrefHome(); }
function cfgQuery(cfg){ return cfg ? '?c='+encodeURIComponent(JSON.stringify(cfg)) : ''; }

// перейти за адресою; та сама адреса hashchange не дає — тоді малюємо вручну
function go(h){ clickNav = true; if(location.hash === h) route(); else location.hash = h; }

/* ---- розбір адреси ---- */
function parseRoute(hash){
  const h = (hash||'').replace(/^#/, '');
  if(h && h[0] !== '/') return {legacy: decodeURIComponent(h)};
  const [path, query] = h.split('?');
  const p = path.split('/').filter(Boolean).map(decodeURIComponent);
  let cfg = null;
  const m = /(?:^|&)c=([^&]*)/.exec(query||'');
  if(m){ try{ cfg = JSON.parse(decodeURIComponent(m[1])); }catch(e){ cfg = null; } }
  if(p[0] === 'tool') return {tool:p[1]||'', cfg};
  return {cls:p[0]||null, subject:p[1]||null, topic:p[2]||null, sub:p[3]||null, cfg};
}

// {state} — що показати, або {redirect} — канонічна/найближча відома адреса
function resolveRoute(r){
  if(r.legacy !== undefined){
    // старі посилання в матеріалах (#rules, #mod1-3): розділ за найдовшим префіксом id
    for(let id = r.legacy; id; id = id.includes('-') ? id.slice(0, id.lastIndexOf('-')) : ''){
      const t = docTopicFor(id);
      if(t) return {redirect: hrefTopic(t, id === r.legacy ? null : r.legacy)};
    }
    return {redirect: hrefHome()};
  }
  if(r.tool !== undefined){
    if(!DB.tools[r.tool]) return {redirect: hrefHome()};
    return {state:{tool:r.tool, toolCfg:r.cfg, toolTaskId:null}};
  }
  if(!r.cls) return {state:{}};
  const cls = DB.classes.find(c=>c.id===r.cls);
  if(!cls) return {redirect: hrefHome()};
  if(!r.subject) return {state:{cls:cls.id}};
  const subj = DB.subjects.find(s=>s.id===r.subject && s.active && (s.cls||[]).includes(cls.id));
  if(!subj) return {redirect: hrefCls(cls.id)};
  if(!r.topic) return {state:{cls:cls.id, subject:subj.id}};
  const t = DB.topics.find(x=>x.id===r.topic && x.cls===cls.id && x.subject===subj.id);
  if(!t) return {redirect: hrefSubj(cls.id, subj.id)};
  const st = {cls:cls.id, subject:subj.id, topic:t.id};
  if(t.doc){ st.sub = r.sub; return {state:st}; }
  if(!r.sub) return {state:st};
  const k = (t.tasks||[]).find(x=>x.id===r.sub);
  if(!k) return {redirect: hrefTopic(t)};
  return {state:Object.assign(st, {tool:k.tool, toolCfg:r.cfg || k.cfg, toolTaskId:k.id})};
}

/* ---- маршрутизація ---- */
const scrollMemo = {};   // адреса → прокрутка, щоб «Назад» повертав на те саме місце
let shown = null;        // адреса, яку зараз показано
// Перехід посиланням/кодом — нова сторінка (вгору або до якоря); без нього —
// «Назад»/«Вперед» браузера: повертаємо прокрутку, яка була на тій адресі.
let clickNav = false;
document.addEventListener('click', e=>{
  const a = e.target.closest && e.target.closest('a[href^="#"]');
  if(a && e.button===0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) clickNav = true;
}, true);

function route(){
  const hash = location.hash || '#/';
  const res = resolveRoute(parseRoute(hash));
  if(res.redirect){ location.replace(res.redirect); return; }
  const restore = !clickNav && scrollMemo[hash] != null;
  clickNav = false;
  const st = res.state;
  const topic = st.topic ? DB.topics.find(t=>t.id===st.topic) : null;

  // той самий документ, змінився лише якір/пресет — без перемальовування
  // (стан конструктора кола, поля КТП, схема на проєктор лишаються)
  if(shown && topic && topic.doc && !st.tool && !S.tool && S.topic === st.topic){
    scrollMemo[shown] = window.scrollY;
    shown = hash; S.sub = st.sub || null;
    const sec = DOCS[topic.doc];
    if(restore && !(sec && sec.onSub)) window.scrollTo(0, scrollMemo[hash]);
    else docSub(S.sub);
    return;
  }

  if(shown) scrollMemo[shown] = window.scrollY;
  leaveDoc();
  const from = shown;
  S.cls = st.cls||null; S.subject = st.subject||null; S.topic = st.topic||null; S.sub = st.sub||null;
  S.tool = st.tool||null; S.toolCfg = st.toolCfg||null; S.toolTaskId = st.toolTaskId||null; S.step = 0;
  // «← Назад» вільного інструмента веде туди, звідки прийшли
  if(S.tool && !S.toolTaskId && from && !parseRoute(from).tool) S.toolFrom = from;
  if(S.tool) buildSteps(); else { S.model = null; S.steps = []; S.anim = null; }
  shown = hash;
  render();
  document.title = pageTitle();
  // «Назад»/«Вперед» — туди, де були; якір документа вже прокрутив renderDoc
  // (пресет інтерактиву — не якір); інакше — вгору
  const anchored = topic && topic.doc && S.sub && DOCS[topic.doc] && !DOCS[topic.doc].onSub;
  if(restore) window.scrollTo(0, scrollMemo[hash]);
  else if(!anchored) window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

function pageTitle(){
  const brand = 'StepBy School';
  if(S.tool){ const def = toolDef(); return (def ? def.name+' — ' : '') + brand; }
  const cls = S.cls ? DB.classes.find(c=>c.id===S.cls) : null;
  if(!cls) return brand+' — шкільні предмети крок за кроком';
  const subj = S.subject ? DB.subjects.find(s=>s.id===S.subject) : null;
  if(!subj) return clsTitle(cls)+' — '+brand;
  const where = subj.name+(cls.label ? '' : ', '+clsCrumb(cls));
  const t = S.topic ? DB.topics.find(x=>x.id===S.topic) : null;
  return (t ? t.title+' · ' : '') + where + ' — ' + brand;
}

// повернення на головну (клік по лого — посилання; функція лишається для кабінетів)
function goHome(){ go(hrefHome()); }

function render(){
  // тема-документ (матеріали гуртка, інформатика) показується власним переглядом
  const topic = S.topic ? DB.topics.find(x=>x.id===S.topic) : null;
  const isDoc = !S.tool && topic && topic.doc;
  // ширша сторінка для інструмента (зошит) і для документа (схеми й таблиці)
  app.classList.toggle('wide', !!S.tool || !!isDoc);
  if(S.tool){ return renderTool(); }
  if(isDoc){ return renderDoc(topic); }
  return renderStudent();
}

// крихти: {t, href} — посилання; {t, go} — дія (від'єднані кабінети); {t} — поточна сторінка
function crumbs(parts){
  return '<div class="crumbs">'+parts.map((p,i)=>{
    const sep = i<parts.length-1 ? '<span class="sep">›</span>' : '';
    if(p.href) return `<a href="${p.href}">${esc(p.t)}</a>${sep}`;
    if(p.go) return `<a onclick="${p.go}">${esc(p.t)}</a>${sep}`;
    return `<span>${esc(p.t)}</span>${sep}`;
  }).join('')+'</div>';
}

/* ---- старт ---- */
route();
