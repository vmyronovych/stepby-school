// ---- Рукописні гліфи: одноштрихові SVG-контури, що «малюються» пером (stroke-dashoffset) ----
const HW_STEP=0.2, HW_DUR=0.34;
const HW={
  '0':["M30,10 C13,10 13,90 30,90 C47,90 47,10 30,10"],
  '1':["M15,32 L31,12 L31,90"],
  '2':["M13,30 C13,8 49,8 49,32 C49,55 15,64 12,90 L52,88"],
  '3':["M14,22 C28,6 52,14 45,36 C41,50 27,49 27,49 C50,49 53,78 37,88 C24,96 12,86 12,72"],
  '4':["M44,90 L44,10 L9,66 L55,66"],
  '5':["M48,12 L20,12 L16,46 C31,38 50,45 48,66 C46,90 17,92 11,74"],
  '6':["M47,15 C27,10 14,42 14,63 C14,88 49,88 49,63 C49,47 18,45 15,60"],
  '7':["M11,14 L52,14 L25,90"],
  '8':["M30,47 C11,47 13,13 30,13 C47,13 49,47 30,47 C9,47 8,90 30,90 C52,90 51,47 30,47"],
  '9':["M47,55 C27,61 14,42 16,27 C18,11 48,11 46,38 C44,74 40,85 21,90"],
  'x':["M14,34 L46,72","M46,34 L14,72"],
  '×':["M16,36 L44,70","M44,36 L16,70"],
  '=':["M12,42 L52,42","M12,64 L52,64"],
  '+':["M32,28 L32,76","M12,52 L52,52"],
  '−':["M12,52 L52,52"],
  '-':["M12,52 L52,52"],
  ':':["M30,34 L30,40","M30,62 L30,68"],
  '.':["M29,84 L31,84"],
  '·':["M29,52 L31,52"],
};
// text -> послідовність намальованих гліфів. opts.writing=true — малюємо по черзі; order — лічильник гліфів.
function hwGlyphs(text, opts){
  const writing = opts && opts.writing;
  let html='';
  for(const ch of String(text)){
    const strokes=HW[ch];
    if(!strokes){ html+=`<span class="hwt">${ch}</span>`; continue; }
    const o = writing ? (opts.order++) : 0;
    let paths='';
    strokes.forEach((d,si)=>{
      if(writing){
        const dl=(o*HW_STEP + si*(HW_DUR*0.55)).toFixed(2);
        paths+=`<path d="${d}" pathLength="100" style="stroke-dasharray:100;stroke-dashoffset:100;animation:hwdraw ${HW_DUR}s ease ${dl}s forwards"/>`;
      } else {
        paths+=`<path d="${d}" pathLength="100"/>`;
      }
    });
    html+=`<svg class="hwg" viewBox="0 0 60 100">${paths}</svg>`;
  }
  return html;
}
// підсумковий рядок (напр. «284 × 36 = 10224») рукописними гліфами, послідовно
function hwEqline(parts){
  const ctx={writing:true, order:0};
  let h='<div class="eqline">';
  for(const p of parts){ h+=`<span class="${p.cls||''}">${hwGlyphs(p.t, ctx)}</span>`; }
  return h+'</div>';
}
// рукописний рядок без обгортки-центрування (для вбудованих у макет виразів)
function hwInline(parts){
  const ctx={writing:true, order:0};
  return parts.map(p=>`<span class="${p.cls||''}">${hwGlyphs(p.t, ctx)}</span>`).join('');
}
