/* =========================================================
   ІНФОРМАТИКА — схема «Клавіатура на проєктор»
   ---------------------------------------------------------
   Перенесено зі старого сайту уроків. Зміни лише в тому, як схема
   з'являється: не оверлеєм на весь екран, а на власній сторінці
   (kbOpen(preset, mount) переносить готовий елемент у контейнер
   сторінки; стан — надруковане, мова — живе, поки відкрито портал).
   Кнопки пресетів міняють адресу сторінки (docReplaceSub), тож
   сторінку з пресетом можна відкрити в новій вкладці.
   Глобальні слухачі клавіатури працюють лише при kb.open.
   ========================================================= */
/* ---- схема клавіатури на проєктор ----
   Повнорозмірна 104-клавішна клавіатура з українськими й англійськими
   літерами, як на наклейках шкільних клавіатур. Клавіші розфарбовані за
   групами; кнопки над схемою приглушують усе, крім однієї групи або однієї
   комбінації. Поки схема відкрита, натискання на клавіатурі ПК учителя
   підсвічують ту саму клавішу на екрані (за event.code, тобто за фізичним
   місцем) і показують, що надрукувалося. Урок посилається на схему полем
   "show": "keyboard" або "keyboard:<пресет>" у кроці конспекту. */
const KB_GROUPS = {
  let:{label:"Літери і знаки", desc:"Центр клавіатури. На кожній клавіші дві літери: англійська ліворуч угорі, українська праворуч унизу."},
  num:{label:"Цифри", desc:"Ряд над літерами і окремий блок праворуч, як на калькуляторі. Правий блок друкує цифри, коли світиться Num Lock."},
  fn:{label:"Функціональні", desc:"Верхній ряд F1–F12. У кожній програмі роблять своє: F1 — довідка, F5 — оновити сторінку."},
  ctl:{label:"Спеціальні", desc:"Нічого не друкують, а керують: новий рядок, велика літера, стерти, пробіл, перемкнути мову."},
  nav:{label:"Стрілки", desc:"Переміщують курсор по тексту. Поруч — Delete, Home, End, Page Up, Page Down."}
};
const KB_PRESETS = {
  five:{label:"П'ять головних", keys:["Enter","ShiftLeft","ShiftRight","Backspace","Space"],
        desc:"Enter — новий рядок. Shift — велика літера. Backspace — стерти ліворуч. Пробіл — між словами. П'ята — перемикання мови, дві кнопки праворуч."},
  caps:{label:"Велика літера", keys:["ShiftLeft","ShiftRight","CapsLock"],
        desc:"Одна велика літера: тримай Shift і натисни літеру. Caps Lock — усе великими, поки світиться лампочка."},
  bsdel:{label:"Backspace і Delete", keys:["Backspace","Delete"],
        desc:"Backspace стирає ліворуч від курсора, Delete — праворуч. Вони в різних кінцях клавіатури."},
  win:{label:"Мова: Win + Пробіл", keys:["MetaLeft","Space"],
        desc:"Тримай Win і натисни Пробіл. Яка мова зараз — видно праворуч унизу екрана: УКР або ENG."},
  alt:{label:"Мова: Alt + Shift", keys:["AltLeft","ShiftLeft"],
        desc:"Тримай ліву Alt і натисни Shift. Яка мова зараз — видно праворуч унизу екрана: УКР або ENG."}
};
const KB_HINT="Натисни клавішу на клавіатурі цього комп'ютера — вона засвітиться на схемі, а в полі вище з'явиться, що надрукувалося. Або клацни по клавіші мишею.";

const KB_KEYS=(()=>{
  const K=[];
  const add=(c,x,y,o)=>K.push(Object.assign({c,x,y,w:1,h:1},o));
  const nm=(c,x,y,g,label,o)=>add(c,x,y,Object.assign({g,nm:label},o||{}));
  const letters=(x0,y,en,ua)=>{ for(let i=0;i<en.length;i++) add("Key"+en[i],x0+i,y,{g:"let",en:en[i],ua:ua[i]}); };
  const pad=(y,ds)=>ds.forEach((d,i)=>nm("Numpad"+d,19+i,y,"num",d,{big:1}));

  nm("Escape",0,0,"ctl","Esc",{big:1});
  [2,3,4,5,6.5,7.5,8.5,9.5,11,12,13,14].forEach((x,i)=>nm("F"+(i+1),x,0,"fn","F"+(i+1),{big:1}));
  nm("PrintScreen",15.5,0,"oth","PrtSc"); nm("ScrollLock",16.5,0,"oth","Scroll Lock"); nm("Pause",17.5,0,"oth","Pause");

  let y=1.5;
  add("Backquote",0,y,{g:"let",sh:"~",un:"`",ua:"'"});
  for(let i=0;i<10;i++) add("Digit"+"1234567890"[i],1+i,y,{g:"num",sh:"!@#$%^&*()"[i],un:"1234567890"[i]});
  add("Minus",11,y,{g:"let",sh:"_",un:"-"}); add("Equal",12,y,{g:"let",sh:"+",un:"="});
  nm("Backspace",13,y,"ctl","← Backspace",{w:2});
  nm("Insert",15.5,y,"nav","Insert"); nm("Home",16.5,y,"nav","Home"); nm("PageUp",17.5,y,"nav","Page Up");
  nm("NumLock",19,y,"num","Num Lock"); nm("NumpadDivide",20,y,"num","/",{big:1});
  nm("NumpadMultiply",21,y,"num","*",{big:1}); nm("NumpadSubtract",22,y,"num","-",{big:1});

  y=2.5;
  nm("Tab",0,y,"ctl","Tab ⇥",{w:1.5});
  letters(1.5,y,"QWERTYUIOP","ЙЦУКЕНГШЩЗ");
  add("BracketLeft",11.5,y,{g:"let",en:"[",ua:"Х"}); add("BracketRight",12.5,y,{g:"let",en:"]",ua:"Ї"});
  add("Backslash",13.5,y,{g:"let",en:"\\",ua:"Ґ",w:1.5});
  nm("Delete",15.5,y,"nav","Delete"); nm("End",16.5,y,"nav","End"); nm("PageDown",17.5,y,"nav","Page Down");
  pad(y,["7","8","9"]); nm("NumpadAdd",22,y,"num","+",{big:1,h:2});

  y=3.5;
  nm("CapsLock",0,y,"ctl","Caps Lock",{w:1.75});
  letters(1.75,y,"ASDFGHJKL","ФІВАПРОЛД");
  add("Semicolon",10.75,y,{g:"let",en:";",ua:"Ж"}); add("Quote",11.75,y,{g:"let",en:"'",ua:"Є"});
  nm("Enter",12.75,y,"ctl","Enter ↵",{w:2.25});
  pad(y,["4","5","6"]);

  y=4.5;
  nm("ShiftLeft",0,y,"ctl","⇧ Shift",{w:2.25});
  letters(2.25,y,"ZXCVBNM","ЯЧСМИТЬ");
  add("Comma",9.25,y,{g:"let",en:",",ua:"Б"}); add("Period",10.25,y,{g:"let",en:".",ua:"Ю"});
  add("Slash",11.25,y,{g:"let",en:"/",ua:"."});
  nm("ShiftRight",12.25,y,"ctl","⇧ Shift",{w:2.75});
  nm("ArrowUp",16.5,y,"nav","↑",{big:1});
  pad(y,["1","2","3"]); nm("NumpadEnter",22,y,"num","Enter",{h:2,ctr:1});

  y=5.5;
  nm("ControlLeft",0,y,"ctl","Ctrl",{w:1.25}); nm("MetaLeft",1.25,y,"ctl","Win",{w:1.25});
  nm("AltLeft",2.5,y,"ctl","Alt",{w:1.25}); nm("Space",3.75,y,"ctl","Пробіл",{w:6.25,ctr:1});
  nm("AltRight",10,y,"ctl","Alt",{w:1.25}); nm("MetaRight",11.25,y,"ctl","Win",{w:1.25});
  nm("ContextMenu",12.5,y,"ctl","☰",{w:1.25,big:1}); nm("ControlRight",13.75,y,"ctl","Ctrl",{w:1.25});
  nm("ArrowLeft",15.5,y,"nav","←",{big:1}); nm("ArrowDown",16.5,y,"nav","↓",{big:1}); nm("ArrowRight",17.5,y,"nav","→",{big:1});
  nm("Numpad0",19,y,"num","0",{w:2,big:1}); nm("NumpadDecimal",21,y,"num",".",{big:1});
  return K;
})();
const KB_BY={}; KB_KEYS.forEach(k=>{ KB_BY[k.c]=k; });

const KB_DESC=(()=>{
  const d={
    Escape:"Скасувати або закрити: меню, вікно з питанням, повноекранний режим.",
    Tab:"Великий відступ у тексті. У вікні — перейти до наступного поля.",
    CapsLock:"Вмикає ВЕЛИКІ літери для всього тексту, світиться лампочка Caps Lock. Натисни ще раз — вимкнеш. Для однієї великої літери потрібен Shift, а не Caps Lock.",
    Enter:"Новий рядок у тексті. У вікні з кнопками — те саме, що натиснути «OK».",
    Backspace:"Стирає один символ ліворуч від курсора.",
    Delete:"Стирає один символ праворуч від курсора.",
    Space:"Пробіл між словами. Одне натискання — один пробіл.",
    ContextMenu:"Те саме, що клацнути правою кнопкою миші.",
    AltLeft:"Сама нічого не робить, лише разом з іншою клавішею. Ліва Alt + Shift перемикає мову.",
    AltRight:"Права Alt. Для перемикання мови бери ліву Alt.",
    Insert:"Вмикає режим заміни: нова літера стирає ту, що праворуч від курсора. Спробуй у полі під клавіатурою. Сталося випадково — натисни Insert ще раз.",
    Home:"Курсор на початок рядка.", End:"Курсор у кінець рядка.",
    PageUp:"На сторінку вгору.", PageDown:"На сторінку вниз.",
    ArrowUp:"Курсор на рядок вгору.", ArrowDown:"Курсор на рядок вниз.",
    ArrowLeft:"Курсор на одну літеру ліворуч.", ArrowRight:"Курсор на одну літеру праворуч.",
    PrintScreen:"Фотографує весь екран. Знімок можна вставити в Paint.",
    ScrollLock:"На уроках не знадобиться.", Pause:"На уроках не знадобиться.",
    NumLock:"Вмикає цифри на правому блоці. Не друкуються цифри справа — натисни Num Lock, щоб засвітилася лампочка.",
    F1:"Довідка — підказки до програми.", F5:"Оновити сторінку в браузері.", F11:"Браузер на весь екран і назад.",
    Backquote:"В українській мові — апостроф: м'яч, п'ять, сім'я.",
    Slash:"В українській мові тут крапка, а з Shift — кома. Клавіша з літерою Ю крапку не ставить.",
    Backslash:"Українська літера Ґ. Якщо замість неї друкується \\ — у Windows стоїть стара розкладка «Українська», потрібна «Українська (розширена)».",
    numpad:"Цифра на правому блоці. Друкує цифри, лише коли світиться лампочка Num Lock."
  };
  d.ShiftLeft=d.ShiftRight="Тримай Shift і натисни літеру — буде велика літера. Тримай і натисни цифру — буде знак, а не цифра.";
  d.ControlLeft=d.ControlRight="Сама нічого не робить, лише разом з іншою: Ctrl + C — копіювати, Ctrl + V — вставити, Ctrl + S — зберегти.";
  d.MetaLeft=d.MetaRight="Відкриває меню «Пуск». Win + Пробіл перемикає мову.";
  d.NumpadEnter=d.Enter;
  return d;
})();
const KB_KEY_DESC={
  let:"Літера або знак. Англійська — ліворуч угорі, українська — праворуч унизу. Що надрукується, залежить від мови: УКР або ENG праворуч унизу екрана.",
  num:"Цифра. З Shift друкує знак, а не цифру.",
  fn:"Функціональна клавіша. У кожній програмі робить своє."
};

function kbDesc(k){
  if(KB_DESC[k.c]) return KB_DESC[k.c];
  if(k.c.indexOf("Numpad")===0) return KB_DESC.numpad;
  return KB_KEY_DESC[k.g]||"";
}
/* lang — "en" або "ua": на літерній клавіші показуємо лише ту літеру, яку
   зараз друкує розкладка; без мови (підпис для читалки екрана) — обидві */
function kbName(k, lang){
  if(k.en){
    if(!k.ua || lang==="en") return k.en;
    return lang==="ua" ? k.ua : k.en+" "+k.ua;
  }
  if(k.un) return k.un;
  return k.nm.replace(/^[⇧←]\s|\s[⇥↵]$/g,"");
}
function kbKeyHtml(k){
  let inner;
  if(k.en) inner='<span class="en">'+esc(k.en)+'</span>';
  else if(k.un) inner='<span class="sh">'+esc(k.sh)+'</span><span class="un">'+esc(k.un)+'</span>';
  else inner='<span class="nm'+(k.big?" big":k.ctr?" ctr":"")+'">'+esc(k.nm)+'</span>';
  if(k.ua) inner+='<span class="ua">'+esc(k.ua)+'</span>';
  return '<button type="button" class="key g-'+k.g+'" data-code="'+k.c+'" aria-label="'+esc(kbName(k))+'" '+
    'style="--x:'+k.x+';--y:'+k.y+';--w:'+k.w+';--h:'+k.h+'">'+inner+'</button>';
}

const kb={el:null, board:null, info:null, type:null, focus:null, down:new Set(), open:false, lang:null, prevLang:null,
          t:{text:"", caret:0, anchor:null, hist:[]}, ovr:false, clip:"", ghost:null, gid:0};

function kbBuild(){
  const el=document.createElement("div");
  el.className="proj kbx"; el.hidden=true;
  el.setAttribute("role","region"); el.setAttribute("aria-label","Клавіатура і групи клавіш");
  const chip=(id,label,sw)=>'<button type="button" class="chip'+(sw?" g-"+id:"")+'" data-kbf="'+id+'" aria-pressed="false">'+(sw?"<i></i>":"")+esc(label)+'</button>';
  el.innerHTML='<div class="proj-bar"><h2>Клавіатура</h2>'+
      '<span class="kb-lang">Мова: <b id="kbLang">—</b></span>'+
      '<button type="button" class="nav" id="kbFull">На весь екран</button></div>'+
    '<div class="proj-chips">'+chip("","Усі групи",0)+
      Object.keys(KB_GROUPS).map(id=>chip(id,KB_GROUPS[id].label,1)).join("")+
      '<span class="proj-sep"></span>'+
      Object.keys(KB_PRESETS).map(id=>chip(id,KB_PRESETS[id].label,0)).join("")+'</div>'+
    '<div class="kb-scroll"><div class="kb" id="kbBoard">'+KB_KEYS.map(kbKeyHtml).join("")+
      '<div class="kb-leds"><span class="led" id="ledNum"><i></i>Num Lock</span><span class="led" id="ledCaps"><i></i>Caps Lock</span></div>'+
    '</div></div>'+
    '<div class="kb-typebar"><div class="kb-type" id="kbType" aria-label="Поле для друку"></div>'+
      '<div class="kb-tyctl"><span id="kbMode">Друкуй на клавіатурі — текст з\'являється тут. Курсор ставиться стрілками або клацанням.</span>'+
      '<button type="button" class="nav" id="kbClear">Очистити</button></div></div>'+
    '<div class="kb-info" id="kbInfo" aria-live="polite"></div>';
  kb.el=el; kb.board=el.querySelector("#kbBoard"); kb.info=el.querySelector("#kbInfo"); kb.type=el.querySelector("#kbType");
  el.querySelector("#kbClear").addEventListener("click", ()=>{
    const t=kb.t; t.hist.push({text:t.text, caret:t.caret, anchor:t.anchor});
    t.text=""; t.caret=0; t.anchor=null; kb.ghost=null; kbTypeRender();
  });
  kb.type.addEventListener("mousedown", ev=>{
    ev.preventDefault();
    const t=kb.t, ch=ev.target.closest("[data-i]");
    let i=t.text.length;
    if(ch){
      const n=+ch.getAttribute("data-i"), r=ch.getBoundingClientRect();
      i = t.text[n]==="\n" ? n : n+(ev.clientX>r.left+r.width/2 ? 1 : 0);
    }
    t.caret=i; t.anchor=null; kbTypeRender();
  });
  kbTypeRender();

  el.querySelector("#kbFull").addEventListener("click", ()=>{
    if(document.fullscreenElement) document.exitFullscreen().catch(()=>{});
    else if(el.requestFullscreen) el.requestFullscreen().catch(()=>{});
  });
  el.addEventListener("click", ev=>{
    const f=ev.target.closest("[data-kbf]");
    if(f){ const id=f.getAttribute("data-kbf"); kbApply(id===kb.focus ? null : id); docReplaceSub(kb.focus); return; }
    const key=ev.target.closest(".key");
    if(key){ kbLeds(ev); kbShowKey(KB_BY[key.getAttribute("data-code")], null); }
  });
}

// mount — контейнер сторінки, куди переноситься схема (див. js/info/sections.js)
function kbOpen(preset, mount){
  if(!kb.el) kbBuild();
  if(mount) mount.appendChild(kb.el);
  kb.el.hidden=false; kb.open=true;
  kbApply(preset||null);
}
function kbClose(){
  if(!kb.open) return;
  if(document.fullscreenElement) document.exitFullscreen().catch(()=>{});
  kb.el.hidden=true; kb.open=false;
  kbReleaseAll();
}

function kbInfo(title, desc){
  kb.info.innerHTML='<div class="kb-combo">'+title+'</div><p class="kb-desc">'+esc(desc)+'</p>';
}
function kbApply(id){
  kb.focus = id && (KB_GROUPS[id]||KB_PRESETS[id]) ? id : null;
  const src = kb.focus ? (KB_GROUPS[kb.focus]||KB_PRESETS[kb.focus]) : null;
  const on = !src ? null : KB_GROUPS[kb.focus] ? KB_KEYS.filter(k=>k.g===kb.focus).map(k=>k.c) : src.keys;
  kb.board.classList.toggle("focus", !!on);
  kb.board.querySelectorAll(".key").forEach(el=>{
    el.classList.toggle("on", !!on && on.indexOf(el.getAttribute("data-code"))>=0);
    el.classList.remove("sel");
  });
  kb.el.querySelectorAll("[data-kbf]").forEach(b=>b.setAttribute("aria-pressed", String((b.getAttribute("data-kbf")||null)===kb.focus)));
  kbInfo(esc(src ? src.label : "Клавіатура"), src ? src.desc : KB_HINT);
}
/* ---- комбінації клавіш ----
   Коли затиснуто Win, Ctrl, Alt або Shift, підказка описує всю комбінацію,
   а не останню клавішу. Ключ — модифікатори в порядку Win, Ctrl, Alt, Shift
   і основна клавіша: «Win+E», «Ctrl+Shift+Escape», «Alt+Shift». */
const KB_COMBOS={
  "Win+E":"Відкриває Провідник — вікно з папками й файлами.",
  "Win+D":"Згортає всі вікна й показує Робочий стіл. Ще раз — вікна повертаються.",
  "Win+L":"Блокує комп'ютер: з'являється екран входу. Відкриті програми не закриваються.",
  "Win+Space":"Перемикає мову: УКР ↔ ENG.",
  "Win+Tab":"Показує всі відкриті вікна, щоб вибрати потрібне.",
  "Win+I":"Відкриває «Параметри» Windows.",
  "Win+R":"Відкриває вікно «Виконати».",
  "Win+PrintScreen":"Фотографує екран і зберігає знімок у «Зображення» → «Знімки екрана».",
  "Win+Shift+S":"Вирізка екрана: виділи мишею частину екрана — її знімок скопіюється.",
  "Win+ArrowUp":"Розгортає вікно на весь екран.",
  "Win+ArrowDown":"Згортає вікно або повертає звичайний розмір.",
  "Win+ArrowLeft":"Притискає вікно до лівої половини екрана.",
  "Win+ArrowRight":"Притискає вікно до правої половини екрана.",
  "Alt+Shift":"Перемикає мову: УКР ↔ ENG.",
  "Alt+Tab":"Перемикає між відкритими вікнами: тримай Alt і натискай Tab.",
  "Alt+F4":"Закриває вікно програми. Незбережене програма запитає, чи зберегти.",
  "Ctrl+C":"Копіює виділене.",
  "Ctrl+X":"Вирізає виділене: воно зникає тут, але його можна вставити деінде.",
  "Ctrl+V":"Вставляє те, що скопіювали або вирізали.",
  "Ctrl+Z":"Скасовує останню дію.",
  "Ctrl+Y":"Повертає те, що скасували.",
  "Ctrl+A":"Виділяє все.",
  "Ctrl+S":"Зберігає файл.",
  "Ctrl+P":"Друкує.",
  "Ctrl+F":"Шукає слово в тексті чи на сторінці.",
  "Ctrl+N":"Новий документ або нове вікно.",
  "Ctrl+Backspace":"Стирає ціле слово ліворуч від курсора.",
  "Ctrl+Delete":"Стирає ціле слово праворуч від курсора.",
  "Ctrl+ArrowLeft":"Курсор на слово ліворуч.",
  "Ctrl+ArrowRight":"Курсор на слово праворуч.",
  "Ctrl+Home":"Курсор на самий початок тексту.",
  "Ctrl+End":"Курсор у самий кінець тексту.",
  "Ctrl+Shift+Escape":"Відкриває Диспетчер завдань — там видно, які програми працюють.",
  "Shift+ArrowLeft":"Виділяє текст ліворуч, по одній літері.",
  "Shift+ArrowRight":"Виділяє текст праворуч, по одній літері.",
  "Shift+Home":"Виділяє до початку рядка.",
  "Shift+End":"Виділяє до кінця рядка.",
  "Shift+Delete":"У Провіднику видаляє файл одразу, без Кошика. Обережно!",
  "Ctrl+Alt+Delete":"Екран безпеки: заблокувати, змінити користувача, Диспетчер завдань."
};
const KB_MOD_ORDER=["Win","Ctrl","Alt","Shift"];
function kbModType(code){
  return /^Meta/.test(code) ? "Win" : /^Control/.test(code) ? "Ctrl" : /^Alt/.test(code) ? "Alt" : /^Shift/.test(code) ? "Shift" : null;
}
/* null — якщо це одна клавіша без модифікаторів або один модифікатор сам по собі */
function kbCombo(k, ev){
  if(!ev) return null;
  const held=new Set();
  kb.down.forEach(c=>{ const t=kbModType(c); if(t) held.add(t); });
  const kt=kbModType(k.c);
  if(kt) held.add(kt);
  const mods=KB_MOD_ORDER.filter(t=>held.has(t));
  const main=kt ? null : k.c.replace(/^(Key|Digit)/,"");
  if(!mods.length || (!main && mods.length<2)) return null;
  return {mods, main, id:mods.concat(main ? [main] : []).join("+")};
}
function kbComboDesc(cb, k){
  if(KB_COMBOS[cb.id]) return KB_COMBOS[cb.id];
  if(cb.mods.length===1 && cb.mods[0]==="Shift" && cb.main){
    if(k.g==="let" && k.ua) return "Shift + літера — велика літера.";
    if(/^Digit/.test(k.c)) return "Shift + цифра — знак, намальований над цифрою.";
    return kbDesc(k);
  }
  return "Комбінація клавіш. Що вона робить, залежить від програми.";
}

/* літерна клавіша, коли мова відома: що друкує зараз і що дасть інша мова */
function kbLetterDesc(k, lang){
  if(k.g!=="let" || !k.ua || KB_DESC[k.c] || (lang!=="ua" && lang!=="en")) return "";
  const what=c=>/[A-ZА-ЯІЇЄҐ]/i.test(c) ? "літеру" : "знак";
  return lang==="ua"
    ? "Зараз мова УКР — друкується «"+k.ua+"», вона праворуч унизу на клавіші. В англійській мові ця клавіша дасть "+what(k.en)+" «"+k.en+"»."
    : "Зараз мова ENG — друкується «"+k.en+"», вона ліворуч угорі на клавіші. В українській мові ця клавіша дасть "+what(k.ua)+" «"+k.ua+"».";
}
function kbShowKey(k, ev){
  const cb=kbCombo(k, ev);
  /* Ctrl + C, а не Ctrl + С: у комбінаціях клавішу називають англійською */
  const lang = ev && (ev.ctrlKey || ev.altKey || ev.metaKey) ? "en" : kbLangOf(ev) || kb.lang;
  const parts = cb ? cb.mods.concat(cb.main ? [kbName(k, lang)] : []) : [kbName(k, lang)];
  let h = parts.map(x=>'<kbd>'+esc(x)+'</kbd>').join('<span class="plus">+</span>');
  if(ev && ev.key && ev.key.length===1 && !ev.ctrlKey && !ev.altKey && !ev.metaKey)
    h += '<span class="arr">→</span><span class="res">'+(ev.key===" " ? "пробіл" : esc(ev.key))+'</span>';
  kbInfo(h, cb ? kbComboDesc(cb, k) : kbLetterDesc(k, lang) || kbDesc(k));
  kb.board.querySelectorAll(".key.sel").forEach(e=>e.classList.remove("sel"));
  kb.board.querySelector('.key[data-code="'+k.c+'"]').classList.add("sel");
}
/* ---- мова розкладки ----
   Поточну мову введення браузер сторінці не повідомляє. Keyboard API тут не
   допомагає: для кириличних розкладок він за специфікацією віддає англійську.
   Тому мову знаємо з двох джерел: надрукована літера (точно) і комбінація
   перемикання — Win + Пробіл, ліва Alt + Shift (за замовчуванням у Windows),
   Ctrl + Пробіл (macOS). Комбінація перемикає між двома останніми мовами;
   якщо мов на ПК більше, наступна літера виправить індикатор. */
const KB_LANG_LABEL={en:"ENG", ua:"УКР", ru:"РУС"};
function kbSetLang(l){
  if(l!==kb.lang){ kb.prevLang=kb.lang; kb.lang=l; }
  const el=document.getElementById("kbLang");
  if(el) el.textContent=KB_LANG_LABEL[l]||"—";
}
function kbLangHotkey(ev){
  const d=c=>kb.down.has(c);
  const hot = (ev.code==="Space" && (d("MetaLeft")||d("MetaRight")||d("ControlLeft")||d("ControlRight")))
    || (/^Shift/.test(ev.code) && d("AltLeft"))
    || (ev.code==="AltLeft" && (d("ShiftLeft")||d("ShiftRight")));
  if(!hot || !kb.lang) return;
  kbSetLang(kb.prevLang && kb.prevLang!==kb.lang ? kb.prevLang : (kb.lang==="en" ? "ua" : "en"));
}
function kbLangOf(ev){
  if(!ev || !ev.key || ev.key.length!==1) return null;
  if(/[a-z]/i.test(ev.key)) return "en";
  if(/[ыэъё]/i.test(ev.key)) return "ru";
  if(/[а-яієїґ]/i.test(ev.key)) return "ua";
  return null;
}
function kbLeds(ev){
  if(!ev.getModifierState) return;
  kb.el.querySelector("#ledCaps").classList.toggle("on", ev.getModifierState("CapsLock"));
  kb.el.querySelector("#ledNum").classList.toggle("on", ev.getModifierState("NumLock"));
}
function kbReleaseAll(){
  kb.down.clear();
  if(kb.board) kb.board.querySelectorAll(".key.down").forEach(e=>e.classList.remove("down"));
}

/* Поки схема відкрита, клавіші працюють лише на неї: F5 не перезавантажує
   сторінку, Tab не бігає по кнопках, Alt не відкриває меню браузера.
   F11 пропускаємо — ним зручно розгорнути браузер на проєкторі. */
function kbKeyEvent(ev){
  if(!kb.open || ev.code==="F11") return;
  ev.preventDefault();
  kbLeds(ev);
  if(ev.type==="keydown") kbTypeKey(ev);
  const k=KB_BY[ev.code];
  if(!k) return;
  const el=kb.board.querySelector('.key[data-code="'+ev.code+'"]');
  if(ev.type==="keyup"){
    /* PrtSc у Windows приходить лише як keyup — хай хоч блимне */
    if(!kb.down.has(ev.code)){
      kbShowKey(k, null); el.classList.add("down");
      setTimeout(()=>el.classList.remove("down"), 180);
    }
    kb.down.delete(ev.code); el.classList.remove("down");
    return;
  }
  if(!ev.repeat) kbLangHotkey(ev);
  el.classList.add("down"); kb.down.add(ev.code);
  if(ev.repeat) return;
  if(ev.key && ev.key.length===1){
    const l=kbLangOf(ev);
    if(l) kbSetLang(l);
  }
  kbShowKey(k, ev);
}
/* ---- поле для друку під клавіатурою ----
   Власний маленький редактор, а не textarea: курсор тут товстий і видно його
   з задньої парти, а стерта літера на мить лишається червоною й закресленою
   з того боку курсора, звідки її прибрали, — Backspace ліворуч, Delete
   праворуч. Працює як у Блокноті: стрілки, Home/End, Shift — виділення,
   Ctrl + стрілки — по словах, Ctrl + A/C/X/V/Z, Insert — режим заміни. */
function kbTypeKey(ev){
  const t=kb.t, k=ev.key, ctrl=ev.ctrlKey && !ev.altKey, shift=ev.shiftKey, n=t.text.length;
  const selR=()=> t.anchor!=null && t.anchor!==t.caret ? [Math.min(t.anchor,t.caret), Math.max(t.anchor,t.caret)] : null;
  const snap=()=>{ t.hist.push({text:t.text, caret:t.caret, anchor:t.anchor}); if(t.hist.length>300) t.hist.shift(); };
  const cut=(a,b)=>{ t.text=t.text.slice(0,a)+t.text.slice(b); t.caret=a; t.anchor=null; };
  const put=str=>{
    snap();
    const r=selR();
    let a=t.caret, b=t.caret;
    if(r){ a=r[0]; b=r[1]; }
    else if(kb.ovr && str!=="\n" && a<n && t.text[a]!=="\n") b=a+1;
    t.text=t.text.slice(0,a)+str+t.text.slice(b); t.caret=a+str.length; t.anchor=null;
  };
  const move=to=>{
    if(shift){ if(t.anchor==null) t.anchor=t.caret; } else t.anchor=null;
    t.caret=Math.max(0, Math.min(t.text.length, to));
  };
  const ls=i=>t.text.lastIndexOf("\n", i-1)+1;
  const le=i=>{ const j=t.text.indexOf("\n", i); return j<0 ? t.text.length : j; };
  const wl=i=>{ while(i>0 && /\s/.test(t.text[i-1])) i--; while(i>0 && !/\s/.test(t.text[i-1])) i--; return i; };
  const wr=i=>{ while(i<n && !/\s/.test(t.text[i])) i++; while(i<n && /\s/.test(t.text[i])) i++; return i; };
  let ghost=null;

  if(ctrl && ev.code==="KeyA"){ t.anchor=0; t.caret=n; }
  else if(ctrl && ev.code==="KeyC"){ const r=selR(); if(r) kbClip(t.text.slice(r[0],r[1])); }
  else if(ctrl && ev.code==="KeyX"){ const r=selR(); if(r){ kbClip(t.text.slice(r[0],r[1])); snap(); cut(r[0],r[1]); } }
  else if(ctrl && ev.code==="KeyV"){ if(kb.clip) put(kb.clip); }
  else if(ctrl && ev.code==="KeyZ"){ const h=t.hist.pop(); if(h){ t.text=h.text; t.caret=h.caret; t.anchor=h.anchor; } }
  else if(k==="Backspace"){
    const r=selR();
    if(r){ snap(); cut(r[0],r[1]); }
    else if(t.caret>0){ const a=ctrl ? wl(t.caret) : t.caret-1; snap(); ghost={side:"l", ch:t.text.slice(a,t.caret)}; cut(a,t.caret); }
  }
  else if(k==="Delete"){
    const r=selR();
    if(r){ snap(); cut(r[0],r[1]); }
    else if(t.caret<n){ const b=ctrl ? wr(t.caret) : t.caret+1; snap(); ghost={side:"r", ch:t.text.slice(t.caret,b)}; cut(t.caret,b); }
  }
  else if(k==="ArrowLeft"){ const r=selR(); if(r && !shift){ t.caret=r[0]; t.anchor=null; } else move(ctrl ? wl(t.caret) : t.caret-1); }
  else if(k==="ArrowRight"){ const r=selR(); if(r && !shift){ t.caret=r[1]; t.anchor=null; } else move(ctrl ? wr(t.caret) : t.caret+1); }
  else if(k==="Home") move(ctrl ? 0 : ls(t.caret));
  else if(k==="End") move(ctrl ? n : le(t.caret));
  else if(k==="ArrowUp"){ const s0=ls(t.caret), col=t.caret-s0; if(s0===0) move(0); else { const p=ls(s0-1); move(Math.min(p+col, s0-1)); } }
  else if(k==="ArrowDown"){ const s0=ls(t.caret), col=t.caret-s0, e=le(t.caret); if(e>=n) move(n); else move(Math.min(e+1+col, le(e+1))); }
  else if(k==="Enter") put("\n");
  else if(k==="Tab") put("\t");
  else if(k==="Insert"){ if(!ev.repeat) kb.ovr=!kb.ovr; }
  /* AltGr у Windows приходить як Ctrl + Alt разом — це теж друк */
  else if(k && k.length===1 && !ev.metaKey && ev.ctrlKey===ev.altKey) put(k);
  else return;

  kb.ghost = ghost ? Object.assign(ghost, {id:++kb.gid}) : null;
  kbTypeRender();
  if(ghost){
    const id=kb.ghost.id;
    setTimeout(()=>{ if(kb.ghost && kb.ghost.id===id){ kb.ghost=null; kbTypeRender(); } }, 850);
  }
}
function kbClip(str){
  kb.clip=str;
  try{ if(navigator.clipboard) navigator.clipboard.writeText(str).catch(()=>{}); }catch(e){}
}
function kbTypeRender(){
  const t=kb.t, g=kb.ghost;
  const r = t.anchor!=null && t.anchor!==t.caret ? [Math.min(t.anchor,t.caret), Math.max(t.anchor,t.caret)] : null;
  const gh = g ? '<span class="ghost" style="max-width:'+g.ch.length+'ch">'+esc(g.ch.replace(/\n/g,"↵"))+'</span>' : '';
  let h="";
  for(let i=0;i<=t.text.length;i++){
    if(i===t.caret){
      if(g && g.side==="l") h+=gh;
      h+='<span class="car'+(kb.ovr?" ovr":"")+'"></span>';
      if(g && g.side==="r") h+=gh;
    }
    if(i<t.text.length) h+='<span data-i="'+i+'"'+(r && i>=r[0] && i<r[1] ? ' class="sel"' : '')+'>'+esc(t.text[i])+'</span>';
  }
  if(!t.text && !g) h+='<span class="ph">Друкуй — літери з\'являться тут</span>';
  kb.type.innerHTML=h;
  const c=kb.type.querySelector(".car");
  if(c) c.scrollIntoView({block:"nearest", inline:"nearest"});
  kb.el.querySelector("#kbMode").innerHTML = kb.ovr
    ? '<b>Режим заміни.</b> Нова літера стирає ту, що праворуч. Вимкнути — Insert.'
    : 'Друкуй на клавіатурі — текст з\'являється тут. Курсор ставиться стрілками або клацанням.';
}

document.addEventListener("keydown", kbKeyEvent);
document.addEventListener("keyup", kbKeyEvent);
window.addEventListener("blur", kbReleaseAll);
