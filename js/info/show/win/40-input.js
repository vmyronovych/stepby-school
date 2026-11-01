/* ---- миша, клавіатура, меню ----
   Кнопки спрацьовують на відпусканні, як у Windows, і порівнюються не за
   DOM-вузлом, а за ключем (вікно + дія + значення): між натисканням і
   відпусканням розмітка могла перемалюватися. Подвійне клацання теж
   рахуємо самі — з тієї самої причини. */
function wnPt(ev){ const r=wn.scr.getBoundingClientRect(), k=r.width/wnW(); return {x:(ev.clientX-r.left)/k, y:(ev.clientY-r.top)/k}; }
function wnRectV(el){
  const r=el.getBoundingClientRect(), b=wn.scr.getBoundingClientRect(), k=b.width/wnW();
  return {l:(r.left-b.left)/k, t:(r.top-b.top)/k, r:(r.right-b.left)/k, b:(r.bottom-b.top)/k};
}
function wnPressKey(el){ const w=el.closest("[data-w]"); return (w?w.getAttribute("data-w"):"")+"|"+el.getAttribute("data-a")+"|"+el.getAttribute("data-v"); }
function wnKeyOf(t){
  const it=t.closest("[data-it]"), sf=t.closest("[data-sf]");
  if(it && sf) return "it"+sf.getAttribute("data-sf")+":"+it.getAttribute("data-it");
  const dr=t.closest("[data-drag]"), w=t.closest("[data-w]");
  return dr && w && !t.closest("[data-a]") ? "tb"+w.getAttribute("data-w") : null;
}
function wnModal(){ return wn.wins.filter(w=>w.kind==="dlg" || w.kind==="save").sort((a,b)=>b.z-a.z)[0] || null; }
function wnCell4(p){ const c=wnCell(); return [Math.max(0,Math.min(wnCols()-1,Math.floor((p.x-4)/c.w))), Math.max(0,Math.min(wnRows()-1,Math.floor((p.y-4)/c.h)))]; }
function wnSurfEl(sf){ return sf==="desk" ? wn.scr.querySelector("#wnDesk") : wn.scr.querySelector('[data-sf="'+sf+'"]'); }
function wnDomIds(sf){ const b=wnSurfEl(sf); return b ? [...b.querySelectorAll("[data-it]")].map(e=>+e.getAttribute("data-it")) : []; }
function wnRange(sf, a, b){
  const ids=wnDomIds(sf), i=ids.indexOf(a), j=ids.indexOf(b);
  return i<0||j<0 ? [b] : ids.slice(Math.min(i,j), Math.max(i,j)+1);
}

function wnPDown(ev){
  if(!wn.open) return;
  const t=ev.target, p=wnPt(ev), field=t.closest("input,textarea");
  clearTimeout(wn.slow);
  if(!field){ ev.preventDefault(); wn.scr.focus({preventScroll:true}); }
  const key=wnKeyOf(t), now=Date.now();
  const dbl=ev.button===0 && key && wn.last && wn.last.key===key && now-wn.last.t<500 && Math.abs(wn.last.x-p.x)<5 && Math.abs(wn.last.y-p.y)<5;
  wn.last = dbl ? null : {key, t:now, x:p.x, y:p.y};
  const aEl=t.closest("[data-a]");
  if(t.closest("#wnMenu")){ if(aEl) wn.press={key:wnPressKey(aEl), a:aEl.getAttribute("data-a"), v:aEl.getAttribute("data-v")}; return; }
  wn.menu=null;
  if(wn.edit && !t.closest('[data-fk="ren"]')) wnCommit();
  wn.wins.forEach(w=>{ if(w.tabs) w.tabs.forEach(x=>{ if(x.addr && !t.closest('[data-fk="addr'+w.id+'"]')){ x.addr=false; x.addrv=null; } }); if(w.rpop && !t.closest(".rb,.rt")) w.rpop=false; });
  if(wn.start && !t.closest("#wnStart") && !t.closest('#wnBar [data-a="start"],#wnBar [data-a="tsearch"]')){ wn.start=null; wn.sq=""; }
  if(t.closest(".wn-block")){ const d=wnModal(); if(d) wnFocus(d.id); wnRender(); return; }
  const wEl=t.closest("[data-w]"), w=wEl && wnWin(+wEl.getAttribute("data-w"));
  if(w) wnFocus(w.id); else if(t.closest("#wnDesk")) wn.act=null;
  const it=t.closest("[data-it]"), sfEl=t.closest("[data-sf]");
  if(ev.button!==0){
    if(sfEl && !aEl){
      const h=wnHold(sfEl.getAttribute("data-sf"));
      if(h && it){ const id=+it.getAttribute("data-it"); if(!h.sel.includes(id)){ h.sel=[id]; h.anc=id; } }
      else if(h) h.sel=[];
    }
    wnRender(); return;
  }
  if(aEl){ wn.press={key:wnPressKey(aEl), a:aEl.getAttribute("data-a"), v:aEl.getAttribute("data-v"), w:w?w.id:null}; wnRender(); return; }
  if(field){ wnRender(); return; }
  const rs=t.closest("[data-rs]");
  if(rs && w && !w.max){ wn.mv={kind:"size", d:rs.getAttribute("data-rs"), id:w.id, p0:p, r0:{x:w.x, y:w.y, w:w.w, h:w.h||wEl.offsetHeight}}; wnRender(); return; }
  if(t.closest("[data-drag]") && w){
    if(dbl) wnMax(w.id); else wn.mv={kind:"move", id:w.id, p0:p, r0:{x:w.x, y:w.y}};
    wnRender(); return;
  }
  if(it && sfEl){
    const sf=sfEl.getAttribute("data-sf"), h=wnHold(sf), id=+it.getAttribute("data-it");
    if(dbl){ wnOpenItem(id, sf); wnRender(); return; }
    const was=h.sel.includes(id), single=h.sel.length===1;
    if(ev.ctrlKey){ h.sel = was ? h.sel.filter(x=>x!==id) : [...h.sel, id]; h.anc=id; }
    else if(ev.shiftKey && h.anc!=null) h.sel=wnRange(sf, h.anc, id);
    else if(!was){ h.sel=[id]; h.anc=id; }
    if(w && w.kind==="save" && wn.by[id] && wn.by[id].kind==="file") w.fname=wnFull(wn.by[id]);
    const pos=wn.pos[id], c=wnCell();
    wn.drag={sf, id, p0:p, on:false, reduce:was && !ev.ctrlKey && !ev.shiftKey, slow:was && single && !!t.closest(".nm"),
      off: sf==="desk" && pos ? {x:p.x-(4+pos[0]*c.w), y:p.y-(4+pos[1]*c.h)} : null};
    wnRender(); return;
  }
  if(sfEl){
    const sf=sfEl.getAttribute("data-sf"), h=wnHold(sf);
    if(h){ const base=ev.ctrlKey ? h.sel.slice() : []; h.sel=base.slice(); wn.band={sf, p0:p, base}; }
  }
  wnRender();
}

function wnPMove(ev){
  if(!wn.open || !(wn.mv || wn.drag || wn.band)) return;
  const p=wnPt(ev);
  if(wn.mv){
    const w=wnWin(wn.mv.id); if(!w){ wn.mv=null; return; }
    const dx=p.x-wn.mv.p0.x, dy=p.y-wn.mv.p0.y, r=wn.mv.r0;
    if(wn.mv.kind==="move"){
      if(w.max){
        if(Math.abs(dx)+Math.abs(dy)<6) return;
        w.max=false; w.x=Math.round(p.x-w.w/2); w.y=0; wn.mv.p0=p; wn.mv.r0={x:w.x, y:w.y}; wnRender(); return;
      }
      w.x=Math.round(r.x+dx); w.y=Math.round(Math.max(0, Math.min(wnH()-wnTB()-30, r.y+dy)));
    } else {
      const d=wn.mv.d, mw=w.kind==="exp"?480:320, mh=w.kind==="exp"?300:200;
      let x=r.x, y=r.y, W=r.w, H=r.h;
      if(d.includes("e")) W=Math.max(mw, r.w+dx);
      if(d.includes("s")) H=Math.max(mh, r.h+dy);
      if(d.includes("w")){ W=Math.max(mw, r.w-dx); x=r.x+r.w-W; }
      if(d.includes("n")){ H=Math.max(mh, r.h-dy); y=r.y+r.h-H; }
      Object.assign(w, {x:Math.round(x), y:Math.round(y), w:Math.round(W), h:Math.round(H)});
    }
    const el=wn.scr.querySelector('#wnWins > [data-w="'+w.id+'"]');
    wnRender();
    return;
  }
  const fx=wn.scr.querySelector("#wnFx");
  if(wn.drag){
    const d=wn.drag;
    if(!d.on){
      if(Math.hypot(p.x-d.p0.x, p.y-d.p0.y)<5 || wn.edit) return;
      const h=wnHold(d.sf); if(!h){ wn.drag=null; return; }
      d.ids=h.sel.includes(d.id) ? h.sel.slice() : [d.id];
      d.on=true; clearTimeout(wn.slow);
      const n=wn.by[d.id];
      wn.reactFx={kind:"drag",node:n,size:d.sf==="desk"?wnCell().i:48,count:d.ids.length};
    }
    d.ctrl=ev.ctrlKey; d.shift=ev.shiftKey;
    Object.assign(wn.reactFx,{x:p.x,y:p.y});
    const tg=wnDropAt(document.elementFromPoint(ev.clientX, ev.clientY), d);
    wn.scr.querySelectorAll(".dropt").forEach(e=>{ if(!tg || e!==tg.el) e.classList.remove("dropt"); });
    if(tg && tg.el) tg.el.classList.add("dropt");
    d.tgt=tg;
    wn.reactFx.label=tg && tg.label ? tg.label.replace(/<[^>]*>/g, "") : "";
    wnRender();
    return;
  }
  const b=wn.band, box=wnSurfEl(b.sf); if(!box){ wn.band=null; return; }
  const r=wnRectV(box), cx=Math.max(r.l, Math.min(r.r, p.x)), cy=Math.max(r.t, Math.min(r.b, p.y));
  const R={l:Math.min(b.p0.x,cx), t:Math.min(b.p0.y,cy), r:Math.max(b.p0.x,cx), b:Math.max(b.p0.y,cy)};
  if(R.r-R.l<3 && R.b-R.t<3) return;
  wn.reactFx={kind:"band",x:R.l,y:R.t,width:R.r-R.l,height:R.b-R.t};
  const hits=[];
  box.querySelectorAll("[data-it]").forEach(e=>{
    const q=wnRectV(e.querySelector(".ic")||e), on=q.l<R.r && q.r>R.l && q.t<R.b && q.b>R.t, id=+e.getAttribute("data-it");
    if(on) hits.push(id);
    e.classList.toggle("sel", on || b.base.includes(id));
  });
  const h=wnHold(b.sf); if(h){ h.sel=[...new Set([...b.base, ...hits])]; if(hits.length) h.anc=hits[0]; }
  wnRender();
}

/* куди впаде перетягуване: у папку, у Кошик, у відкрите вікно, на стіл */
function wnDropAt(el, d){
  if(!el || !wn.scr.contains(el) || el.closest("#wnBar,#wnStart,.wn-block,#wnFx")) return null;
  const ids=d.ids;
  const mk=(destId, tel)=>{
    const dest=wn.by[destId]; if(!dest) return null;
    if(dest.bin) return ids.some(id=>wn.by[id].lock) ? null : {del:1, el:tel, label:wnG("fwd",12)+" Перемістити в «Кошик»"};
    if(!wnWritable(destId) || ids.some(id=>wnPath(destId).includes(id)) || ids.some(id=>wn.by[id].lock)) return null;
    const op = d.ctrl ? "copy" : d.shift ? "move" : wnDrive(destId)!==wnDrive(ids[0]) ? "copy" : "move";
    if(op==="move" && ids.every(id=>wn.up[id]===destId)) return null;
    return {dest:destId, op, el:tel, label:(op==="copy"?wnG("add",12)+" Копіювати в":wnG("fwd",12)+" Перемістити в")+" «"+esc(dest.name)+"»"};
  };
  const it=el.closest("[data-it]");
  if(it){
    const id=+it.getAttribute("data-it"), n=wn.by[id];
    if(!ids.includes(id) && n && (n.kind==="dir" || n.bin) && !wnInBin(id)) return mk(id, it);
  }
  const nv=el.closest("[data-nv]");
  if(nv) return mk(+nv.getAttribute("data-nv"), nv);
  const sf=el.closest("[data-sf]");
  if(!sf) return null;
  const s=sf.getAttribute("data-sf");
  if(s==="desk") return d.sf==="desk" ? {desk:1} : mk(wn.desk.id, null);
  const w=wnWin(+s.slice(1)), t=w && wnTab(w);
  return t && typeof t.loc==="number" && !t.q ? mk(t.loc, null) : null;
}
function wnDrop(d, p){
  const tg=d.tgt; if(!tg) return;
  if(tg.desk){
    const c=wnCell(), old=wn.pos[d.id]; if(!old) return;
    const to=wnCell4({x:p.x-(d.off?d.off.x:0)+c.w/2, y:p.y-(d.off?d.off.y:0)+c.h/2}), dc=to[0]-old[0], dr=to[1]-old[1];
    const want=d.ids.map(id=>[id, wn.pos[id] ? [Math.max(0,Math.min(wnCols()-1,wn.pos[id][0]+dc)), Math.max(0,Math.min(wnRows()-1,wn.pos[id][1]+dr))] : undefined]);
    d.ids.forEach(id=>{ delete wn.pos[id]; });
    want.forEach(x=>wnPlace(x[0], x[1]));
    return;
  }
  if(tg.del){ wnTrash(d.ids); return; }
  const destSf = tg.dest===wn.desk.id ? "desk" : null;
  wnTransfer(d.ids, tg.dest, tg.op, ids=>{ if(destSf){ wn.dk.sel=ids.slice(); wn.dk.anc=ids[0]; } }, tg.dest===wn.desk.id ? wnCell4(p) : undefined);
}

function wnPUp(ev){
  if(!wn.open) return;
  const p=wnPt(ev);
  if(wn.mv){
    const w=wnWin(wn.mv.id);
    if(w && wn.mv.kind==="move" && p.y<=2 && (w.kind==="exp"||w.kind==="app")) w.max=true;
    wn.mv=null; wnRender(); return;
  }
  const fx=wn.scr.querySelector("#wnFx");
  if(wn.drag){
    const d=wn.drag; wn.drag=null;
    wn.reactFx=null; wn.scr.querySelectorAll(".dropt").forEach(e=>e.classList.remove("dropt"));
    if(d.on){ wnDrop(d, p); wnRender(); return; }
    const h=wnHold(d.sf);
    if(d.reduce && h){ h.sel=[d.id]; h.anc=d.id; }
    if(d.slow) wn.slow=setTimeout(()=>{
      const h2=wnHold(d.sf);
      if(!wn.drag && !wn.edit && h2 && h2.sel.length===1 && h2.sel[0]===d.id){ wnStartEdit(d.sf, d.id); wnRender(); }
    }, 520);
    wnRender(); return;
  }
  if(wn.band){ wn.band=null; wn.reactFx=null; wnRender(); return; }
  if(wn.press){
    const pr=wn.press, el=document.elementFromPoint(ev.clientX, ev.clientY), a=el && el.closest("[data-a]");
    wn.press=null;
    if(a && !a.disabled && wnPressKey(a)===pr.key && pr.a) wnAct(pr.a, pr.v, pr.w!=null ? wnWin(pr.w) : null, a);
    wnRender();
  }
}

/* ---- контекстні меню ---- */
function wnNewItems(fn){
  const v11=wn.ver==="11";
  return [{t:v11?WN_NEW.dir.label11:WN_NEW.dir.label, ic:wnFolder(16,false), act:()=>fn("dir")}, {t:"Ярлик", dis:1}, "-",
    ...["bmp","docx","txt"].map(k=>({t:WN_NEW[k].label, ic:wnFileIco(k,16), act:()=>fn(k)}))];
}
function wnSortItems(loc){
  const s=wnSortOf(loc), set=o=>{ wn.sorts[loc]=Object.assign({}, wnSortOf(loc), o); };
  const by=loc===wn.bin.id ? [["name","Ім'я"],["orig","Вихідне розташування"],["del","Дата видалення"],["size","Розмір"],["type","Тип"]] : [["name","Ім'я"],["date","Дата змінення"],["type","Тип"],["size","Розмір"]];
  return [...by.map(x=>({t:x[1], rad:s.by===x[0], act:()=>set({by:x[0]})})), "-",
    {t:"За зростанням", rad:s.dir>0, act:()=>set({dir:1})}, {t:"За спаданням", rad:s.dir<0, act:()=>set({dir:-1})}];
}
function wnSetView(loc, v){ if(typeof loc==="number" && wn.by[loc] && !wn.by[loc].pc || loc==="gallery") wn.views[loc]=v; }
function wnClip(op, ids){
  ids=ids.filter(id=>wn.by[id] && id!==wn.bin.id);
  if(!ids.length || op==="cut" && ids.some(id=>wn.by[id].lock)) return;
  wn.clip={op, ids};
}
function wnPin(id){
  const n=wn.by[id]; if(!n || n.kind!=="dir" || n.pc || wnInBin(id)) return;
  wn.pins = wn.pins.includes(id) ? wn.pins.filter(x=>x!==id) : [...wn.pins, id];
}
function wnCopyPath(ids){
  const s=ids.map(id=>'"'+wnReal(id)+'"').join("\r\n");
  if(s && navigator.clipboard) navigator.clipboard.writeText(s).catch(()=>{});
}
function wnPinText(id){ return wn.pins.includes(id) ? "Відкріпити від панелі швидкого доступу" : "Закріпити на панелі швидкого доступу"; }

function wnItemMenu(sf, ids, nav){
  const ns=ids.map(id=>wn.by[id]).filter(Boolean); if(!ns.length) return null;
  const n=ns[0], one=ns.length===1, dir=one && n.kind==="dir", lock=ns.some(x=>x.lock);
  const w=sf!=="desk" ? wnWin(+sf.slice(1)) : null;
  const open={t:"Відкрити", b:1, act:()=>ns.forEach(x=>{ if(nav && x.kind==="dir") wnNav(w, x.id); else wnOpenItem(x.id, sf); })};
  if(n.bin) return {st:"10", items:[open, {t:"Очистити кошик", dis:!wn.bin.kids.length, act:wnEmptyBin}, "-", {t:"Створити ярлик", dis:1}, {t:"Перейменувати", dis:1}, "-", {t:"Властивості", dis:1}]};
  if(ns.every(x=>wn.up[x.id]===wn.bin.id))
    return {st:"10", items:[{t:"Відновити", b:1, act:()=>wnRestore(ids)}, "-", {t:"Вирізати", act:()=>wnClip("cut",ids)}, "-", {t:"Видалити", act:()=>wnPurge(ids,true)}, "-", {t:"Властивості", act:()=>wnProps(n.id)}]};
  const app=!dir && one ? wnAppOf(n) : null;
  const withApp=app ? {t:"Відкрити за допомогою", sub:[{t:WN_APPS[app].n, ic:wnAppIco(app,16), act:()=>wnOpenItem(n.id)},
    ...(app!=="notepad"?[{t:"Блокнот", ic:wnAppIco("notepad",16), act:()=>wnOpenApp("notepad", n.id)}]:[])]} : null;
  const paste=dir && wn.clip && wnWritable(n.id)!==0 ? {t:"Вставити", ic:wnG("paste"), act:()=>wnPaste(n.id)} : null;
  const pin=dir ? {t:wnPinText(n.id), ic:wnG("pin"), act:()=>wnPin(n.id)} : null;
  const newWin=dir ? {t:"Відкрити в новому вікні", ic:wnG("open"), act:()=>wnOpenExplorer(n.id)} : null;
  const classic=()=>[open, newWin, pin, withApp, "-",
    {t:"Надіслати", sub:[{t:"Документи", ic:wnSpecial("docs",16), act:()=>wnCopyTo(ids,"docs","copy")}, {t:"Робочий стіл (створити ярлик)", ic:wnSpecial("desk",16), dis:1}]}, "-",
    lock ? null : {t:"Вирізати", act:()=>wnClip("cut",ids)}, {t:"Копіювати", act:()=>wnClip("copy",ids)}, paste, "-",
    {t:"Створити ярлик", dis:1}, lock ? null : {t:"Видалити", act:()=>wnTrash(ids)}, lock ? null : {t:"Перейменувати", dis:!one, act:()=>wnStartEdit(sf, n.id)}, "-",
    {t:"Властивості", act:()=>wnProps(n.id)}].filter(Boolean);
  if(wn.ver==="10") return {st:"10", items:classic()};
  return {row:[{g:"cut", t:"Вирізати", dis:lock, act:()=>wnClip("cut",ids)}, {g:"copy", t:"Копіювати", act:()=>wnClip("copy",ids)},
      {g:"ren", t:"Перейменувати", dis:lock||!one, act:()=>wnStartEdit(sf, n.id)}, {g:"share", t:"Поділитися", dis:1}, {g:"del", t:"Видалити", dis:lock, act:()=>wnTrash(ids)}],
    items:[Object.assign({}, open, {ic:wnG("open"), k:"Enter"}), dir && w ? {t:"Відкрити в новій вкладці", ic:wnG("add"), act:()=>wnTabAdd(w, n.id)} : null, newWin, pin, withApp, paste,
      {t:"Стиснути до ZIP-файлу", ic:wnG("zip"), dis:1}, {t:"Копіювати як шлях", ic:wnG("copy"), k:"Ctrl+Shift+C", act:()=>wnCopyPath(ids)},
      {t:"Властивості", ic:wnG("props"), k:"Alt+Enter", act:()=>wnProps(n.id)}, "-",
      {t:"Показати більше параметрів", ic:wnG("more"), k:"Shift+F10", act:m=>{ wn.menu={x:m.x, y:m.y, st:"10", items:classic()}; }}].filter(Boolean)};
}
function wnDeskMenu(p, classic){
  const at=wnCell4(p), v11=wn.ver==="11" && !classic;
  const view={t:"Вигляд", ic:wnG("vbig"), sub:[["large","Великі значки"],["medium","Звичайні значки"],["small","Дрібні значки"]].map(x=>({t:x[1], rad:wn.dico===x[0], act:()=>{ wn.dico=x[0]; wnLayoutDesk(); }}))
    .concat(["-", {t:"Автоматично впорядковувати значки"}, {t:"Вирівняти значки за сіткою", chk:1}, "-", {t:"Показувати значки робочого стола", chk:1}])};
  const sort={t:v11?"Сортувати за":"Сортувати", ic:wnG("sort"), sub:[["name","Ім'я"],["size","Розмір"],["type","Тип елемента"],["date","Дата змінення"]].map(x=>({t:x[1], act:()=>wnDeskSort(x[0])}))};
  const nw={t:"Створити", ic:wnG("plus"), sub:wnNewItems(k=>wnCreate(wn.desk.id, k, "desk", at))};
  const paste={t:"Вставити", ic:wnG("paste"), k:v11?"Ctrl+V":"", dis:!wn.clip, act:()=>wnPaste(wn.desk.id, "desk")};
  if(!v11) return {st:"10", items:[view, sort, {t:"Оновити"}, "-", paste, {t:"Вставити ярлик", dis:1}, "-", nw, "-", {t:"Параметри дисплея", ic:wnG("net")}, {t:"Персоналізація", ic:wnG("edit")}]};
  return {items:[view, sort, {t:"Оновити", ic:wnG("refresh")}, "-", wn.clip ? paste : null, {t:"Скасувати", ic:wnG("restore"), k:"Ctrl+Z", dis:1}, nw, "-",
    {t:"Параметри дисплея", ic:wnG("net")}, {t:"Персоналізувати", ic:wnG("edit")}, "-", {t:"Відкрити в терміналі", ic:wnG("term"), dis:1}, "-",
    {t:"Показати більше параметрів", ic:wnG("more"), k:"Shift+F10", act:m=>{ wn.menu=Object.assign({x:m.x, y:m.y}, wnDeskMenu(p,1)); }}].filter(Boolean)};
}
function wnBgMenu(w, classic){
  const t=wnTab(w), loc=t.loc, sf="w"+w.id, n=typeof loc==="number" ? wn.by[loc] : null, v11=wn.ver==="11" && !classic;
  const vis=n && !n.pc || loc==="gallery" || t.q;
  const view={t:"Вигляд", ic:wnG("vbig"), dis:!vis, sub:WN_VIEWS.map(v=>({t:v[1], rad:wnViewOf(loc)===v[0], act:()=>wnSetView(loc, v[0])}))};
  const sort={t:v11?"Сортувати за":"Сортувати", ic:wnG("sort"), dis:!vis, sub:wnSortItems(loc)};
  const wr=!t.q && wnWritable(loc)!==0;
  const nw={t:"Створити", ic:wnG("plus"), sub:wnNewItems(k=>wnCreate(loc, k, sf))};
  if(!n || n.pc || t.q) return {st:v11?undefined:"10", items:[view, sort, {t:"Оновити", ic:wnG("refresh")}]};
  if(n.bin) return {st:"10", items:[view, sort, {t:"Оновити"}, "-", {t:"Очистити кошик", dis:!n.kids.length, act:wnEmptyBin},
    {t:"Відновити всі елементи", dis:!n.kids.length, act:()=>wnRestore(n.kids.map(k=>k.id))}]};
  const paste={t:"Вставити", ic:wnG("paste"), k:v11?"Ctrl+V":"", dis:!(wn.clip && wr), act:()=>wnPaste(loc, sf)};
  const props={t:"Властивості", ic:wnG("props"), k:v11?"Alt+Enter":"", act:()=>wnProps(loc)};
  if(!v11) return {st:"10", items:[view, sort, {t:"Групувати", sub:[{t:"(Немає)", rad:1}]}, {t:"Оновити"}, "-", {t:"Настроїти цю папку…", dis:1}, "-",
    paste, {t:"Вставити ярлик", dis:1}, "-", {t:"Надати доступ до", sub:[{t:"Конкретні люди…", dis:1}]}, "-", wr ? nw : Object.assign({}, nw, {dis:1}), "-", props]};
  return {items:[view, sort, {t:"Групувати за", ic:wnG("vlist"), dis:1}, "-", wn.clip && wr ? paste : null, {t:"Скасувати", ic:wnG("restore"), k:"Ctrl+Z", dis:1}, "-",
    wr ? nw : Object.assign({}, nw, {dis:1}), "-", props, "-", {t:"Відкрити в терміналі", ic:wnG("term"), dis:1}, "-",
    {t:"Показати більше параметрів", ic:wnG("more"), k:"Shift+F10", act:m=>{ wn.menu=Object.assign({x:m.x, y:m.y}, wnBgMenu(w,1)); }}].filter(Boolean)};
}
/* Win + X: права кнопка на «Пуску» — ще один шлях до Провідника */
function wnWinXMenu(){
  const v11=wn.ver==="11", d=x=>({t:x, dis:1});
  const top=(v11?["Інстальовані програми","Центр мобільності","Параметри електроживлення","Перегляд подій","Система","Диспетчер пристроїв","Мережеві підключення","Керування дисками","Керування комп'ютером","Термінал","Термінал (адміністратор)"]
    :["Програми та засоби","Центр мобільності","Параметри електроживлення","Перегляд подій","Система","Диспетчер пристроїв","Мережеві підключення","Керування дисками","Керування комп'ютером","Windows PowerShell","Windows PowerShell (адміністратор)"]).map(d);
  return {items:[...top, "-", {t:"Диспетчер завдань", act:()=>wnOpenApp("taskmgr")}, {t:v11?"Параметри":"Настройки", act:()=>wnOpenApp("settings")},
    {t:"Провідник файлів", act:()=>wnOpenExplorer()}, {t:"Пошук", act:()=>{ wn.start="search"; wn.want=v11?"ssearch":"tsearch"; }}, {t:"Виконати", dis:1}, "-",
    {t:v11?"Завершити роботу або вийти":"Завершення роботи або вихід із системи", sub:[{t:"Вийти"},{t:"Сплячий режим"},{t:"Завершити роботу"},{t:"Перезавантажити"}]},
    {t:"Робочий стіл", act:wnShowDesk}], st:v11?undefined:"10", dark:!v11, bottom:wnTB()+(v11?8:0)};
}
function wnTaskMenu(app){
  const ws=wn.wins.filter(w=>wnAppKey(w)===app), items=[];
  if(app==="explorer"){
    items.push({t:"Закріплено", hd:1});
    wn.pins.map(id=>wn.by[id]).filter(Boolean).forEach(n=>items.push({t:n.name, ic:wnIco(n,16), act:()=>wnOpenExplorer(n.id)}));
    items.push("-");
  }
  items.push({t:WN_APPS[app].n, ic:wnAppIco(app,16), act:()=>wnOpenApp(app)},
    {t:WN_PINNED.includes(app) ? "Відкріпити від панелі завдань" : "Закріпити на панелі завдань", ic:wnG("pin"), dis:1});
  if(ws.length) items.push({t:ws.length>1 ? "Закрити всі вікна" : "Закрити вікно", ic:wnG("x"), act:()=>ws.forEach(w=>wnClose(w.id))});
  return {items, dark:wn.ver==="10", jump:1, bottom:wnTB()+(wn.ver==="11"?8:0)};
}
function wnCtx(ev){
  ev.preventDefault();
  if(!wn.open) return;
  const t=ev.target, p=wnPt(ev);
  if(t.closest("#wnMenu") || t.closest(".wn-block") || t.closest("input,textarea")) return;
  let m=null;
  const app=t.closest("#wnBar [data-app]"), sfEl=t.closest("[data-sf]"), it=t.closest("[data-it]"), nv=t.closest("[data-nv]");
  if(app) m=wnTaskMenu(app.getAttribute("data-app"));
  else if(t.closest('#wnBar [data-a="start"]')){ m=wnWinXMenu(); m.x=Math.round(wnRectV(t.closest("[data-a]")).l); }
  else if(t.closest("#wnBar")) m={items:wn.ver==="11" ? [{t:"Параметри панелі завдань", ic:wnG("gear")}]
    : [{t:"Панелі інструментів", sub:[{t:"Адреса"},{t:"Посилання"},{t:"Робочий стіл"}]}, {t:"Пошук", sub:[{t:"Приховано"},{t:"Показати значок пошуку"},{t:"Показати поле пошуку", rad:1}]},
       {t:"Показати кнопку подання завдань", chk:1}, "-", {t:"Диспетчер завдань", act:()=>wnOpenApp("taskmgr")}, "-", {t:"Закріпити всі панелі завдань", chk:1}, {t:"Параметри панелі завдань", ic:wnG("gear")}],
    st:wn.ver==="11"?undefined:"10", bottom:wnTB()+(wn.ver==="11"?8:0)};
  else if(nv){ const w=wnWin(+t.closest("[data-w]").getAttribute("data-w")); m=wnItemMenu("w"+w.id, [+nv.getAttribute("data-nv")], true); }
  else if(it && sfEl){ const sf=sfEl.getAttribute("data-sf"), h=wnHold(sf); m=wnItemMenu(sf, h && h.sel.length ? h.sel : [+it.getAttribute("data-it")]); }
  else if(sfEl){ const sf=sfEl.getAttribute("data-sf"); m = sf==="desk" ? wnDeskMenu(p) : wnBgMenu(wnWin(+sf.slice(1))); }
  if(m){ if(m.x==null) m.x=Math.round(p.x); if(m.y==null && m.bottom==null) m.y=Math.round(p.y); wn.menu=m; }
  wnRender();
}

/* ---- дії кнопок ---- */
function wnTabAdd(w, loc){ w.tabs.push(wnNewTab(loc)); w.ti=w.tabs.length-1; wnExpand(w, loc); }
function wnPropsApply(w){
  const n=wn.by[w.id2]; if(!n || w.val===wnFull(n)) return;
  wnRename(n.id, w.val, wn.showExt, null);
  w.val=wnFull(n);
}
function wnAct(a, v, w, el){
  const t=w && w.tabs ? wnTab(w) : null, sf=w ? "w"+w.id : "desk";
  const menuAt=m=>{ const r=wnRectV(el); wn.menu=Object.assign({x:Math.round(r.l), y:Math.round(r.b)}, m); };
  const sel=()=>t ? t.sel.slice() : [];
  const num=x=>isNaN(+x) || x==="" ? x : +x;
  if(w && w.rpop && a!=="rtab") w.rpop=false;
  switch(a){
    case "close": if(w.kind==="dlg") wnDlgBtn(w, w.d.btns.length-1); else wnClose(w.id); break;
    case "min": wnMin(w.id); break;
    case "max": wnMax(w.id); break;
    case "dlgb": wnDlgBtn(w, +v); break;
    case "pok": wnPropsApply(w); wnClose(w.id); break;
    case "papply": wnPropsApply(w); break;
    case "start": wn.start = wn.start && wn.start!=="search" ? null : "menu"; wn.sq=""; wn.srail=false; break;
    case "tsearch": wn.start="search"; wn.want=wn.ver==="11" ? "ssearch" : "tsearch"; break;
    case "task": wn.start=null; wnTask(v); break;
    case "showdesk": wn.start=null; wnShowDesk(); break;
    case "lang": wn.start=null; wnLangMenu(el); break;
    case "app": wnOpenApp(v); wn.sq=""; break;
    case "sopen": wn.start=null; wn.sq=""; wnOpenItem(+v); break;
    case "sres": { const r=wnFind(wn.sq)[+v]; wn.start=null; wn.sq=""; if(r){ if(r.kind==="app") wnOpenApp(r.k); else wnOpenItem(r.id); } break; }
    case "sloc": wnOpenExplorer(wn.sp[v]); break;
    case "sloc2": { const id=+v, x=wnOpenExplorer(wn.up[id]); wnTab(x).sel=[id]; wnTab(x).anc=id; wn.sq=""; break; }
    case "sfold": wn.sfold[v]=!wn.sfold[v]; break;
    case "srail": wn.srail=!wn.srail; break;
    case "sall": wn.start="all"; break;
    case "sback": wn.start="menu"; break;
    case "power": { const r=wnRectV(el); wn.menu={x:Math.round(r.l), bottom:Math.round(wnH()-r.t+6), dark:wn.ver==="10", st:wn.ver==="11"?undefined:"10",
      items:[{t:"Сплячий режим", ic:wnG("hist")}, {t:"Завершити роботу", ic:wnG("power")}, {t:"Перезавантажити", ic:wnG("refresh")}]}; break; }
    case "mi": { const m=wn.menu, it=wnMenuItem(v); wn.menu=null; if(it && it.act) it.act(m); break; }
    case "mrow": { const m=wn.menu, r=m.row[+v]; wn.menu=null; if(r && r.act) r.act(m); break; }
    case "chk": { const h=wnHold(el.closest("[data-sf]").getAttribute("data-sf")), id=+v; if(h){ h.sel = h.sel.includes(id) ? h.sel.filter(x=>x!==id) : [...h.sel, id]; h.anc=id; } break; }
    case "npfile": menuAt({st:"10", items:[{t:"Створити", k:"Ctrl+N", dis:1}, {t:"Відкрити…", k:"Ctrl+O", dis:1}, {t:"Зберегти", k:"Ctrl+S", act:()=>wnNoteSave(w)},
      {t:"Зберегти як…", k:"Ctrl+Shift+S", act:()=>wnNoteSave(w, true)}, "-", {t:"Друк…", k:"Ctrl+P", dis:1}, "-", {t:"Вийти", act:()=>wnClose(w.id)}]}); break;
    case "emptybin": wnEmptyBin(); break;
    case "svok": wnSaveAs(w); break;
    case "svtype": menuAt({st:"10", items:[["txt","Текстові документи (*.txt)"],["all","Усі файли (*.*)"]].map(x=>({t:x[1], rad:w.ftype===x[0], act:()=>{ w.ftype=x[0]; }}))}); break;
    case "restoreall": wnRestore(wn.bin.kids.map(k=>k.id)); break;
  }
  if(!t) return;
  const f=wnFlags(w);
  switch(a){
    case "back": wnBack(w); break;
    case "fwd": wnFwd(w); break;
    case "up": wnUp(w); break;
    case "nav": case "crumb": wnNav(w, num(v)); break;
    case "tog": if(w.open.has(v)) w.open.delete(v); else w.open.add(v); break;
    case "crumbm": {
      const kids = v==="" ? ["quick", wn.root.id, wn.bin.id, "net"] : wnSorted(wn.by[+v].kids.filter(k=>k.kind==="dir"), {by:"name", dir:1}).map(k=>k.id);
      menuAt({st:"10", items:kids.map(x=>({t:wnLocName(x), ic:wnLocIco(x,16), b:x===t.loc, act:()=>wnNav(w, x)}))}); break;
    }
    case "addr": t.addr=true; t.addrv=null; wn.want="addr"+w.id; break;
    case "addrm": case "recent": {
      const list=[...t.back.slice(-6).map((x,i,arr)=>({x, go:()=>{ for(let k=arr.length-i; k>0; k--) wnBack(w); }})), {x:t.loc, cur:1},
        ...t.fwd.slice().reverse().slice(0,6).map((x,i)=>({x, go:()=>{ for(let k=0; k<=i; k++) wnFwd(w); }}))].reverse();
      menuAt({st:"10", items:list.map(e=>({t:wnLocName(e.x), ic:wnLocIco(e.x,16), chk:e.cur, act:e.go}))}); break;
    }
    case "refresh": break;
    case "sort": { const s=wnSortOf(t.loc); wn.sorts[t.loc] = s.by===v ? {by:v, dir:-s.dir} : {by:v, dir:1}; break; }
    case "view": wnSetView(t.loc, v); break;
    case "tab": w.ti=+v; break;
    case "tabx": if(w.tabs.length<2) wnClose(w.id); else { w.tabs.splice(+v,1); w.ti=Math.min(w.ti>+v ? w.ti-1 : w.ti, w.tabs.length-1); } break;
    case "tabnew": wnTabAdd(w, "quick"); break;
    case "rtab": if(w.rmin) w.rpop = !(w.rpop && w.rtab===v); w.rtab=v; break;
    case "rmin": w.rmin=!w.rmin; w.rpop=false; break;
    case "filemenu": menuAt({st:"10", items:[{t:"Відкрити нове вікно", act:()=>wnOpenExplorer(t.loc)}, {t:"Відкрити Windows PowerShell", dis:1}, "-",
      {t:"Змінити параметри папок і пошуку", dis:1}, "-", {t:"Довідка", dis:1}, "-", {t:"Закрити", act:()=>wnClose(w.id)}]}); break;
    case "pin": wnPin(t.sel.length===1 ? t.sel[0] : t.loc); break;
    case "copy": wnClip("copy", sel()); break;
    case "cut": wnClip("cut", sel()); break;
    case "paste": wnPaste(t.loc, sf); break;
    case "copypath": wnCopyPath(sel()); break;
    case "movem": case "copym": menuAt({st:"10", items:["desk","docs","down","pics","music","video"].map(k=>({t:wn.by[wn.sp[k]].name, ic:wnSpecial(k,16),
      act:()=>wnCopyTo(sel(), k, a==="movem" ? "move" : "copy")})).concat(["-", {t:"Вибрати розташування…", dis:1}])}); break;
    case "del": if(t.loc===wn.bin.id) wnPurge(sel(), true); else wnTrash(sel()); break;
    case "ren": if(t.sel.length===1) wnStartEdit(sf, t.sel[0]); break;
    case "newdir": wnCreate(t.loc, "dir", sf); break;
    case "newm": menuAt({st:wn.ver==="11"?undefined:"10", items:wnNewItems(k=>wnCreate(t.loc, k, sf))}); break;
    case "props": if(t.sel.length) wnProps(t.sel[0]); else if(typeof t.loc==="number") wnProps(t.loc); break;
    case "open": t.sel.forEach(id=>wnOpenItem(id, sf)); break;
    case "selall": t.sel=wnShown(w).map(n=>n.id); break;
    case "selnone": t.sel=[]; break;
    case "selinv": t.sel=wnShown(w).map(n=>n.id).filter(id=>!t.sel.includes(id)); break;
    case "pane": w.pane = w.pane===v ? null : v; break;
    case "navm": menuAt({st:"10", items:[{t:"Область переходів", chk:w.nav, act:()=>{ w.nav=!w.nav; }}, {t:"Розгорнути до відкритої папки", chk:1, dis:1}, {t:"Показати всі папки", dis:1}]}); break;
    case "opt": if(v==="ext") wn.showExt=!wn.showExt; else if(v==="boxes") wn.boxes=!wn.boxes; else if(v==="hidden") wn.hidden=!wn.hidden; break;
    case "sortm": menuAt({st:wn.ver==="11"?undefined:"10", items:wnSortItems(t.loc)}); break;
    case "viewm": menuAt({items:[...WN_VIEWS.map((x,i)=>({t:x[1], k:"Ctrl+Shift+"+(i+1), rad:wnViewOf(t.loc)===x[0], act:()=>wnSetView(t.loc, x[0])})), "-",
      {t:"Компактний режим", chk:wn.compact, act:()=>{ wn.compact=!wn.compact; }},
      {t:"Показати", sub:[{t:"Область переходів", chk:w.nav, act:()=>{ w.nav=!w.nav; }}, {t:"Панель відомостей", chk:w.pane==="details", act:()=>{ w.pane=w.pane==="details"?null:"details"; }},
        {t:"Область перегляду", chk:w.pane==="preview", act:()=>{ w.pane=w.pane==="preview"?null:"preview"; }}, "-",
        {t:"Прапорці елементів", chk:wn.boxes, act:()=>{ wn.boxes=!wn.boxes; }}, {t:"Розширення імен файлів", chk:wn.showExt, act:()=>{ wn.showExt=!wn.showExt; }},
        {t:"Приховані елементи", chk:!!wn.hidden, act:()=>{ wn.hidden=!wn.hidden; }}]}]}); break;
    case "more": menuAt({items:[{t:"Скасувати", ic:wnG("restore"), k:"Ctrl+Z", dis:1},
      {t:wnPinText(t.sel.length===1 ? t.sel[0] : t.loc), ic:wnG("pin"), dis:!f.canPin, act:()=>wnPin(t.sel.length===1 ? t.sel[0] : t.loc)},
      {t:"Виділити все", ic:wnG("selall"), k:"Ctrl+A", act:()=>{ t.sel=wnShown(w).map(n=>n.id); }},
      {t:"Скасувати виділення", ic:wnG("selnone"), dis:!f.any, act:()=>{ t.sel=[]; }},
      {t:"Інвертувати виділення", ic:wnG("selinv"), act:()=>{ t.sel=wnShown(w).map(n=>n.id).filter(id=>!t.sel.includes(id)); }}, "-",
      {t:"Властивості", ic:wnG("props"), act:()=>wnAct("props", null, w, el)}, {t:"Параметри", ic:wnG("gear"), dis:1}]}); break;
    case "restore": wnRestore(sel()); break;
  }
}

/* ---- клавіатура ---- */
function wnCast(text){
  if(!wn.cast) return;
  wn.reactCast=text; wnRender();
  clearTimeout(wn.castT); wn.castT=setTimeout(()=>{wn.reactCast=null;wnRender();},1700);
}
function wnBalloon(element){
  const bounds=wnRectV(element);
  wn.reactBalloon={x:Math.round(bounds.l),y:Math.round(bounds.b+8)};wnRender();
  clearTimeout(wn.blnT);wn.blnT=setTimeout(()=>{wn.reactBalloon=null;wnRender();},4500);
}
function wnArrow(sf, k){
  const h=wnHold(sf), box=wnSurfEl(sf); if(!h || !box) return;
  const els=[...box.querySelectorAll("[data-it]")]; if(!els.length) return;
  const cur=els.find(e=>+e.getAttribute("data-it")===(h.anc!=null ? h.anc : h.sel[0]));
  let next;
  if(!cur || k==="Home") next=els[0];
  else if(k==="End") next=els[els.length-1];
  else {
    const c=wnRectV(cur), cx=(c.l+c.r)/2, cy=(c.t+c.b)/2, dir={ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0]}[k];
    let best=Infinity;
    els.forEach(e=>{
      if(e===cur) return;
      const r=wnRectV(e), dx=(r.l+r.r)/2-cx, dy=(r.t+r.b)/2-cy, along=dx*dir[0]+dy*dir[1];
      if(along<2) return;
      const score=along+Math.abs(dir[0] ? dy : dx)*3;
      if(score<best){ best=score; next=e; }
    });
  }
  if(!next) return;
  const id=+next.getAttribute("data-it"); h.sel=[id]; h.anc=id; wn.scrollTo=id;
}
function wnJump(sf, ch){
  const h=wnHold(sf); if(!h) return;
  const ids=wnDomIds(sf), start=ids.indexOf(h.anc)+1;
  for(let i=0;i<ids.length;i++){
    const id=ids[(start+i)%ids.length], n=wn.by[id];
    if(n && wnFull(n).toLowerCase().startsWith(ch.toLowerCase())){ h.sel=[id]; h.anc=id; wn.scrollTo=id; return; }
  }
}
function wnLang(l){ wn.lang=l; const e=wn.scr.querySelector("#wnLang"); if(e) e.textContent=l; }
function wnLangNext(){ wnLang(wn.lang==="УКР" ? "ENG" : "УКР"); }
/* що надрукує клавіша в розкладці схеми; null — клавіша не друкує літер */
function wnChar(ev){
  const r=WN_KEYS[ev.code]; if(!r) return null;
  const i=wn.lang==="УКР" ? 2 : 0;
  let sh=ev.shiftKey;
  if(ev.getModifierState && ev.getModifierState("CapsLock") && r[i]!==r[i+1] && /\p{L}/u.test(r[i])) sh=!sh;
  return r[i+(sh?1:0)];
}
function wnLangMenu(el){
  const r=wnRectV(el), v11=wn.ver==="11";
  const it=(code,t,d)=>({t, d, on:wn.lang===code, ic:'<b class="lc">'+code+'</b>', act:()=>wnLang(code)});
  wn.menu={x:Math.round(r.r-300), bottom:wnTB()+(v11?8:0), dark:!v11,
    items:[it("УКР","Українська","Українська клавіатура"), it("ENG","English (United States)","Клавіатура США"), "-",
      {t:"Параметри мови", ic:wnG("gear")}]};
}
/* команди для активного вікна Провідника або робочого столу */
function wnKeyCmd(ev){
  const k=ev.key, c=ev.code, ctrl=ev.ctrlKey, sh=ev.shiftKey, alt=ev.altKey;
  if(k==="Escape"){
    const d=wnModal();
    if(wn.menu) wn.menu=null; else if(d){ if(d.kind==="save") wnClose(d.id); else wnDlgBtn(d, d.d.btns.length-1); } else if(wn.start){ wn.start=null; wn.sq=""; }
    return 1;
  }
  if(wn.menu) return 1;
  const dlg=wnModal();
  if(dlg && dlg.kind==="dlg"){ if(k==="Enter"){ const i=dlg.d.btns.findIndex(b=>b.def); wnDlgBtn(dlg, i<0 ? 0 : i); } return 1; }
  const w=dlg || wnWin(wn.act);
  if(w && w.kind==="save" && k==="Enter" && !alt){
    const one=wnTab(w).sel.length===1 && wn.by[wnTab(w).sel[0]];
    if(one && one.kind==="dir") wnNav(w, one.id); else wnSaveAs(w);
    return 1;
  }
  if(w && w.kind==="props"){ if(k==="Enter"){ wnPropsApply(w); wnClose(w.id); } return 1; }
  if(w && w.kind==="app"){ if(ctrl && c==="KeyS" && w.app==="notepad"){ wnCast(sh?"Ctrl + Shift + S":"Ctrl + S"); wnNoteSave(w, sh); } return ctrl||k.startsWith("F"); }
  const sf=w ? "w"+w.id : "desk", h=wnHold(sf), t=w ? wnTab(w) : null, loc=t ? t.loc : wn.desk.id;
  if(!h) return 0;
  if(ctrl && sh && c==="KeyN"){ wnCast("Ctrl + Shift + N"); if(!t || !t.q) wnCreate(loc, "dir", sf); return 1; }
  if(ctrl && sh && /^Digit[1-8]$/.test(c) && t){ wnSetView(loc, WN_VIEWS[+c.slice(5)-1][0]); return 1; }
  if(ctrl && sh && c==="KeyC"){ wnCast("Ctrl + Shift + C"); wnCopyPath(h.sel); return 1; }
  if(ctrl && c==="KeyC"){ wnCast("Ctrl + C"); wnClip("copy", h.sel); return 1; }
  if(ctrl && c==="KeyX"){ wnCast("Ctrl + X"); wnClip("cut", h.sel); return 1; }
  if(ctrl && c==="KeyV"){ wnCast("Ctrl + V"); if(!t || !t.q) wnPaste(loc, sf); return 1; }
  if(ctrl && c==="KeyA"){ wnCast("Ctrl + A"); h.sel = t ? wnShown(w).map(n=>n.id) : wnDeskItems().map(n=>n.id); return 1; }
  if(ctrl && c==="KeyZ"){ wnCast("Ctrl + Z"); return 1; }
  if(t && ctrl && (c==="KeyE" || c==="KeyF")){ wn.want="q"+w.id; return 1; }
  if(t && (ctrl && c==="KeyL" || alt && c==="KeyD" || k==="F4")){ t.addr=true; t.addrv=null; wn.want="addr"+w.id; return 1; }
  if(t && ctrl && c==="KeyN"){ wnCast("Ctrl + N"); wnOpenExplorer(t.loc); return 1; }
  if(w && ctrl && c==="KeyW"){ wnCast("Ctrl + W"); wnClose(w.id); return 1; }
  if(t && ctrl && c==="KeyT" && wn.ver==="11"){ wnCast("Ctrl + T"); wnTabAdd(w, "quick"); return 1; }
  if(alt && k==="Enter"){ wnCast("Alt + Enter"); if(h.sel.length) wnProps(h.sel[0]); else if(typeof loc==="number") wnProps(loc); return 1; }
  if(t && alt && k==="ArrowLeft"){ wnCast("Alt + ←"); wnBack(w); return 1; }
  if(t && alt && k==="ArrowRight"){ wnCast("Alt + →"); wnFwd(w); return 1; }
  if(t && alt && k==="ArrowUp"){ wnCast("Alt + ↑"); wnUp(w); return 1; }
  if(t && k==="Backspace"){ wnBack(w); return 1; }
  if(k==="F2"){ wnCast("F2"); if(h.sel.length) wnStartEdit(sf, h.anc!=null && h.sel.includes(h.anc) ? h.anc : h.sel[0]); return 1; }
  if(k==="Delete"){
    if(sh){ wnCast("Shift + Delete"); wnPurge(h.sel, true); }
    else { wnCast("Delete"); if(t && t.loc===wn.bin.id) wnPurge(h.sel, true); else wnTrash(h.sel); }
    return 1;
  }
  if(k==="Enter"){ h.sel.slice().forEach(id=>wnOpenItem(id, sf)); return 1; }
  if(k==="F5" || k==="Tab") return 1;
  if(k.startsWith("Arrow") || k==="Home" || k==="End"){ wnArrow(sf, k); return 1; }
  if(k.length===1 && k!==" " && !ctrl && !alt){ wnJump(sf, wnChar(ev)||k); return 1; }
  return 0;
}
function wnKeyDown(ev){
  if(!wn.open || ev.code==="F11") return;
  wn.last=null;
  const e=ev.target, fk=e && e.getAttribute ? e.getAttribute("data-fk") : null;
  if(ev.key==="Meta" || ev.key==="OS"){ wn.win={alone:true}; ev.preventDefault(); return; }
  if(wn.win) wn.win.alone=false;
  if(ev.metaKey || wn.win){
    ev.preventDefault();
    const v11=wn.ver==="11";
    if(ev.code==="KeyE"){ wnCast("Win + E"); wn.start=null; wn.menu=null; wnOpenExplorer(); }
    else if(ev.code==="KeyD"){ wnCast("Win + D"); wn.start=null; wnShowDesk(); }
    else if(ev.code==="KeyS" || ev.code==="KeyQ"){ wnCast("Win + S"); wn.start="search"; wn.want=v11?"ssearch":"tsearch"; }
    else if(ev.code==="KeyX"){ wnCast("Win + X"); wn.menu=wnWinXMenu(); wn.menu.x=0; }
    else if(ev.code==="Space"){ wnCast("Win + Пробіл"); wnLangNext(); }
    else return;
    wnRender(); return;
  }
  if(!ev.repeat && (ev.key==="Shift" && ev.altKey || ev.key==="Alt" && ev.shiftKey)){ ev.preventDefault(); wnCast("Alt + Shift"); wnLangNext(); return; }
  const ch=!ev.ctrlKey && !ev.altKey ? wnChar(ev) : null;
  if(ch && fk && !e.readOnly && !(fk==="ren" && WN_BADCH.includes(ch))){
    ev.preventDefault();
    e.setRangeText(ch, e.selectionStart, e.selectionEnd, "end");
    e.dispatchEvent(new Event("input", {bubbles:true}));
    return;
  }
  if(ev.altKey && ev.code==="F4"){
    ev.preventDefault(); wnCast("Alt + F4");
    const w=wnModal() || wnWin(wn.act); if(w){ if(w.kind==="dlg") wnDlgBtn(w, w.d.btns.length-1); else wnClose(w.id); }
    wnRender(); return;
  }
  if(fk==="ren"){
    if(ev.key==="Enter" || ev.key==="Tab"){ ev.preventDefault(); wnCommit(); wn.scr.focus({preventScroll:true}); wnRender(); }
    else if(ev.key==="Escape"){ ev.preventDefault(); wn.edit=null; wn.scr.focus({preventScroll:true}); wnRender(); }
    else if(ch && WN_BADCH.includes(ch)){ ev.preventDefault(); wnBalloon(e); }
    return;
  }
  if(fk==="tsearch" || fk==="ssearch"){
    if(ev.key==="Enter"){ ev.preventDefault(); const r=wnFind(wn.sq)[0]; wn.start=null; wn.sq=""; if(r){ if(r.kind==="app") wnOpenApp(r.k); else wnOpenItem(r.id); } wn.scr.focus({preventScroll:true}); wnRender(); }
    else if(ev.key==="Escape"){ ev.preventDefault(); wn.start=null; wn.sq=""; wn.scr.focus({preventScroll:true}); wnRender(); }
    return;
  }
  if(fk && fk.startsWith("addr")){
    const w=wnWin(+fk.slice(4)), t=w && wnTab(w); if(!t) return;
    if(ev.key==="Enter"){
      ev.preventDefault();
      const loc=wnResolve(e.value); t.addr=false; t.addrv=null; wn.scr.focus({preventScroll:true});
      if(loc==null) wnDialog({title:"Провідник файлів", icon:"err", text:"Windows не вдається знайти «"+esc(e.value)+"». Перевірте правильність написання й повторіть спробу.", btns:[{t:"OK", def:1}]});
      else wnNav(w, loc);
      wnRender();
    } else if(ev.key==="Escape"){ ev.preventDefault(); t.addr=false; t.addrv=null; wn.scr.focus({preventScroll:true}); wnRender(); }
    return;
  }
  if(fk && fk.startsWith("q")){
    if(ev.key==="Escape"){ ev.preventDefault(); const w=wnWin(+fk.slice(1)); if(w){ wnTab(w).q=""; } wn.scr.focus({preventScroll:true}); wnRender(); }
    return;
  }
  if(fk && fk.startsWith("np")){
    if(ev.ctrlKey && ev.code==="KeyS"){ ev.preventDefault(); wnCast(ev.shiftKey?"Ctrl + Shift + S":"Ctrl + S"); const w=wnWin(+fk.slice(2)); if(w){ wnNoteSave(w, ev.shiftKey); wnRender(); } }
    return;
  }
  if(fk && fk.startsWith("sn")){
    const w=wnWin(+fk.slice(2)); if(!w) return;
    if(ev.key==="Enter"){ ev.preventDefault(); wnSaveAs(w); wnRender(); }
    else if(ev.key==="Escape"){ ev.preventDefault(); wnClose(w.id); wn.scr.focus({preventScroll:true}); wnRender(); }
    return;
  }
  if(fk && fk.startsWith("pn")){
    if(ev.key==="Enter"){ ev.preventDefault(); const w=wnWin(+fk.slice(2)); if(w){ wnPropsApply(w); wnClose(w.id); wnRender(); } }
    return;
  }
  if(fk) return;
  /* «Пуск» відкритий — друк іде в пошук, як у Windows */
  if(wn.start && ev.key.length===1 && !ev.ctrlKey && !ev.altKey){
    const i=wn.scr.querySelector(wn.ver==="11" ? '[data-fk="ssearch"]' : '[data-fk="tsearch"]');
    if(i){
      i.focus({preventScroll:true});
      if(ch){ ev.preventDefault(); i.setRangeText(ch, i.value.length, i.value.length, "end"); i.dispatchEvent(new Event("input", {bubbles:true})); }
      return;
    }
  }
  if(wnKeyCmd(ev)){ ev.preventDefault(); wnRender(); }
}
function wnKeyUp(ev){
  if(!wn.open) return;
  if(ev.key==="Meta" || ev.key==="OS"){
    ev.preventDefault();
    if(wn.win && wn.win.alone){
      wnCast("Win"); wn.menu=null;
      wn.start = wn.start ? null : "menu"; wn.sq="";
      wnRender();
    }
    wn.win=null;
  }
}
function wnInput(ev){
  const e=ev.target, fk=e.getAttribute("data-fk"); if(!fk) return;
  if(fk==="ren"){
    const clean=e.value.replace(/[\\/:*?"<>|\r\n]/g,"");
    if(clean!==e.value){ const pos=Math.max(0, e.selectionStart-(e.value.length-clean.length)); e.value=clean; e.setSelectionRange(pos,pos); wnBalloon(e); }
    if(wn.edit) wn.edit.val=e.value;
    if(!e.classList.contains("line")) wnGrow(e);
    return;
  }
  if(fk==="tsearch" || fk==="ssearch"){ wn.sq=e.value; wn.start="search"; wnRender(); return; }
  if(fk.startsWith("addr")){ const w=wnWin(+fk.slice(4)); if(w) wnTab(w).addrv=e.value; return; }
  if(fk.startsWith("q")){ const w=wnWin(+fk.slice(1)); if(w){ const t=wnTab(w); t.q=e.value; t.sel=[]; wnRender(); } return; }
  if(fk.startsWith("np")){ const w=wnWin(+fk.slice(2)); if(w){ w.text=e.value; if(!w.dirty){ w.dirty=true; wnRender(); } } return; }
  if(fk.startsWith("pn")){ const w=wnWin(+fk.slice(2)); if(w) w.val=e.value; }
  if(fk.startsWith("sn")){ const w=wnWin(+fk.slice(2)); if(w) w.fname=e.value; }
}

/* ---- схема на проєктор ---- */
const WN_PRESETS={"10":{label:"Windows 10"}, "11":{label:"Windows 11"}};
function wnFit(){
  if(!wn.open) return;
  const st=wn.el.querySelector(".wn-stage"), W=st.clientWidth, H=st.clientHeight;
  if(!W || !H) return;
  const k=Math.min(W/wnW(), H/wnH());
  wn.scr.style.transform="translate("+Math.round((W-wnW()*k)/2)+"px,"+Math.round((H-wnH()*k)/2)+"px) scale("+k+")";
}
function wnClamp(){
  const W=wnW(), H=wnH()-wnTB();
  wn.wins.forEach(w=>{
    if(w.w>W-20) w.w=W-20;
    if(w.h && w.h>H-10) w.h=H-10;
    w.x=Math.max(0, Math.min(W-Math.min(w.w,200), w.x)); w.y=Math.max(0, Math.min(H-(w.h||40), w.y));
  });
}
// The projector is mounted by the React document feature.
function wnOpen(preset){ WN_REACT.setPreset(preset); }
function wnHide(){ WN_REACT.close(); }

const WN_REACT = (() => {
  let revision=0;
  const listeners=new Set();
  let detach=null,focusMemo=null;
  function invalidate(){
    const active=document.activeElement;
    if(wn.scr && active && wn.scr.contains(active) && active.getAttribute('data-fk')){
      focusMemo={key:active.getAttribute('data-fk'),start:active.selectionStart,end:active.selectionEnd,direction:active.selectionDirection};
    }
    revision++;listeners.forEach(listener=>listener());
  }
  function afterRender(){
    if(!wn.open || !wn.scr)return;
    if(wn.edit && wn.edit.fresh){
      wn.edit.fresh=false;
      const field=wn.scr.querySelector('[data-fk="ren"]'),node=wn.by[wn.edit.id];
      if(field){field.focus({preventScroll:true});field.setSelectionRange(0,node.kind==='file'&&node.ext&&wn.showExt?node.name.length:field.value.length);field.scrollIntoView({block:'nearest'});}
    }else if(wn.want){
      const field=wn.scr.querySelector('[data-fk="'+wn.want+'"]');wn.want=null;
      if(field){field.focus({preventScroll:true});if(field.select)field.select();}
    }else if(focusMemo){
      const field=wn.scr.querySelector('[data-fk="'+focusMemo.key+'"]');
      if(field && field!==document.activeElement){field.focus({preventScroll:true});if(field.setSelectionRange&&focusMemo.start!=null)try{field.setSelectionRange(focusMemo.start,focusMemo.end,focusMemo.direction);}catch(_){}}
    }
    focusMemo=null;
    if(wn.scrollTo!=null){const item=wn.scr.querySelector('[data-w="'+wn.act+'"] [data-it="'+wn.scrollTo+'"]')||wn.scr.querySelector('#wnDesk [data-it="'+wn.scrollTo+'"]');item?.scrollIntoView({block:'nearest'});wn.scrollTo=null;}
    wn.scr.querySelectorAll('textarea.ren:not(.line)').forEach(wnGrow);
    wnFitMenu();wnFit();
  }
  function setPreset(preset){
    if(!WN_PRESETS[preset] || wn.ver===preset)return;
    wn.ver=preset;wn.menu=null;wn.start=null;
    if(wn.root)wnLayoutDesk();invalidate();
  }
  function close(){
    if(detach){detach();detach=null;}
    if(document.fullscreenElement && wn.el?.contains(document.fullscreenElement))document.exitFullscreen().catch(()=>{});
    wn.open=false;wn.drag=null;wn.band=null;wn.mv=null;wn.win=null;wn.reactFx=null;
    clearInterval(wn.clock);clearTimeout(wn.castT);clearTimeout(wn.blnT);clearTimeout(wn.slow);
    wn.el=null;wn.scr=null;
  }
  function mount(host,preset){
    if(detach)close();
    wn.el=host;wn.scr=host.querySelector('#wnScr');wn.open=true;
    if(!wn.root)wnReset();
    if(WN_PRESETS[preset])wn.ver=preset;
    wnLayoutDesk();
    const bindings=[];
    const bind=(target,event,handler)=>{target.addEventListener(event,handler);bindings.push(()=>target.removeEventListener(event,handler));};
    bind(wn.scr,'pointerdown',wnPDown);bind(wn.scr,'contextmenu',wnCtx);bind(wn.scr,'input',wnInput);
    bind(window,'pointermove',wnPMove);bind(window,'pointerup',wnPUp);
    bind(window,'blur',()=>{wn.win=null;});
    bind(document,'keydown',wnKeyDown);bind(document,'keyup',wnKeyUp);
    bind(document,'fullscreenchange',()=>{if(!document.fullscreenElement&&navigator.keyboard?.unlock)navigator.keyboard.unlock();requestAnimationFrame(wnFit);});
    const observer=window.ResizeObserver?new ResizeObserver(wnFit):null;
    if(observer)observer.observe(host.querySelector('.wn-stage'));else bind(window,'resize',wnFit);
    detach=()=>{bindings.forEach(remove=>remove());observer?.disconnect();};
    wn.clock=setInterval(invalidate,15000);
    invalidate();requestAnimationFrame(()=>{if(wn.scr){wnFit();wn.scr.focus({preventScroll:true});}});
    return close;
  }
  function toolbar(action,value){
    if(action==='fullscreen'){
      if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});
      else wn.el?.requestFullscreen?.().then(()=>{navigator.keyboard?.lock?.().catch(()=>{});wn.scr?.focus({preventScroll:true});}).catch(()=>{});
      return;
    }
    if(action==='ver'){wn.ver=value;wn.menu=null;wn.start=null;wnLayoutDesk();docReplaceSub(value);}
    else if(action==='big'){wn.big=!wn.big;wn.menu=null;wnClamp();wnLayoutDesk();}
    else if(action==='cast')wn.cast=!wn.cast;
    else if(action==='wine'){if(wn.cast)wnCast('Win + E');wn.start=null;wnOpenExplorer();}
    else if(action==='reset')wnReset();
    invalidate();wn.scr?.focus({preventScroll:true});
  }
  return {state:()=>wn,subscribe(listener){listeners.add(listener);return()=>listeners.delete(listener);},getRevision:()=>revision,mount,setPreset,toolbar,afterRender,invalidate,close,
    helpers:{g:wnG,svg:wnSvg,ico:wnIco,appIco:wnAppIco,locIco:wnLocIco,folder:wnFolder,pic:wnPic,logo:wnLogo,defs:WN_DEFS,wallpaper:WN_WALL,icons:WN_I,dialogIcons:WN_DLGI,
      apps:WN_APPS,views:WN_VIEWS,pinned:WN_PINNED,start10:WN_S10,tiles10:WN_T10,pins11:WN_P11,all11:WN_A11,cols:WN_COLS,viewPixels:WN_VPX,
      w:wnW,h:wnH,tb:wnTB,cell:wnCell,tab:wnTab,win:wnWin,appKey:wnAppKey,deskItems:wnDeskItems,itClass:wnItCls,full:wnFull,type:wnType,real:wnReal,locName:wnLocName,path:wnPath,upLoc:wnUpLoc,writable:wnWritable,inBin:wnInBin,
      dt:wnDt,dtLong:wnDtLong,kb:wnKB,human:wnHuman,num:wnNum,title:wnTitle,flags:wnFlags,shown:wnShown,sorted:wnSorted,sortOf:wnSortOf,viewOf:wnViewOf,find:wnFind,resIco:wnResIco,modal:wnModal,appOf:wnAppOf,dirSize:wnDirSize}
  };
})();
