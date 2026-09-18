/* =========================================================
   ЧИСЛОВА ПРЯМА — спільний рендер для методу інтервалів і перетину умов
   ---------------------------------------------------------
   Точки стоять у порядку зростання на рівних відстанях, без масштабу,
   як у зошиті. Підписи точок — формули (корінь, дріб), тож вони живуть
   в HTML поверх SVG.

   cfg = {
     pts:   [{v, ast}]                 впорядковані точки
     marks: ['fill'|'hole', …]         зафарбована (входить) / виколота
     signs: ['+','−', …] | null        знаки на n+1 проміжках (з дугами)
     hatch: [{l, r, li, ri, level, cls}]  штрихування; l/r — точка з pts або null (∞);
                                       li/ri=false — межа не входить (розрив біля точки)
     res:   [{l, r}]                   підсумок — зелена смуга на осі
   }
   Порядок пера: вісь → точки з підписами зліва направо → дуги зі знаками →
   штрихування (по черзі) → підсумкова смуга. Шари SVG — у порядку «під/над»,
   а черговість появи задають затримки пера, тож одне одному не заважає.
   ========================================================= */
let NL_UID=0;
function numLine(cfg, pen){
  pen = pen || {writing:false};
  const uid=++NL_UID;
  const pts=cfg.pts||[], n=pts.length, G=cfg.gap||92;
  const hatch=cfg.hatch||[], res=cfg.res||[], signs=cfg.signs||null;
  const levels = hatch.reduce((m,h)=>Math.max(m,h.level+1),0);
  const hatchH = k => 13 + 9*k;
  const arcH = signs ? (levels ? hatchH(levels-1) : 0) + 16 : 0;
  const top = signs ? 26 : 10;
  const Y = top + Math.max(arcH, levels ? hatchH(levels-1) : 0) + 4;
  const W = G*(n+1), H = Y + 38;
  const X = i => G*(i+1);
  const idx = p => pts.indexOf(p);
  const xl = p => p ? X(idx(p)) : 3;
  const xr = p => p ? X(idx(p)) : W-15;
  // штрих, що «малюється» пером (pathLength=100 + hwdash)
  const dash = (ticks, dur) => pen.writing
    ? ` style="stroke-dasharray:100 101;animation:hwdash ${dur||HW_DUR}s ease ${(pen.order*HW_STEP).toFixed(2)}s both"` + (pen.order+=ticks, '')
    : '';

  let under='', over='', html='';
  // 1) вісь зі стрілкою і підписом x
  over += `<path class="nlaxis hwa" pathLength="100" d="M3,${Y} L${W-5},${Y} M${W-13},${Y-5} L${W-4},${Y} L${W-13},${Y+5}"${dash(3,0.55)}/>`;
  html += `<span class="nllbl nlx" style="left:${W-10}px;top:${Y+6}px">${hwGlyphs('x',pen)}</span>`;
  // 2) точки з підписами, зліва направо
  pts.forEach((p,i)=>{
    const mk=(cfg.marks&&cfg.marks[i])||'fill';
    over += `<circle class="nlpt ${mk} hwa" cx="${X(i)}" cy="${Y}" r="5"${hwTick(pen,'hwpop',0.3)}/>`;
    html += `<span class="nllbl" style="left:${X(i)}px;top:${Y+9}px">${formulaHtml(p.ast, pen)}</span>`;
  });
  // 3) дуги зі знаками (метод інтервалів)
  if(signs){
    for(let i=0;i<=n;i++){
      const a = i===0 ? 3 : X(i-1), b = i===n ? W-15 : X(i), mid=(a+b)/2;
      under += `<path class="nlarc hwa" pathLength="100" d="M${a},${Y} Q${mid},${Y-2*arcH} ${b},${Y}"${dash(2)}/>`;
      html += `<span class="nllbl nlsign" style="left:${mid}px;top:${Y-arcH-24}px">${hwGlyphs(signs[i],pen)}</span>`;
    }
  }
  // 4) штрихування — кожен шар по черзі, свій колір і нахил
  let defs='';
  const seen=new Set();
  hatch.forEach(hc=>{
    const pid=`nlp${uid}_${hc.level}`;
    if(!seen.has(hc.level)){
      seen.add(hc.level);
      defs += `<pattern id="${pid}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(${hc.level%2?-45:45})"><path class="${hc.cls||''}" d="M0,0 L0,7"/></pattern>`;
    }
    // біля виколотої точки штрихування переривається — умова там порушена
    const GAP=7, a=xl(hc.l)+(hc.l && hc.li===false ? GAP : 0), b=xr(hc.r)-(hc.r && hc.ri===false ? GAP : 0), h=hatchH(hc.level);
    under += `<g class="nlh ${hc.cls||''} hwa"${hwTick(pen,'hwwipe',0.45,2)}><rect x="${a}" y="${Y-h}" width="${Math.max(0,b-a)}" height="${h}" fill="url(#${pid})"/><path d="M${a},${Y-h} L${b},${Y-h}"/></g>`;
  });
  // 5) підсумкова смуга на осі — перетин умов
  res.forEach(r=>{
    if(r.l && r.l===r.r) return;
    under += `<path class="nlres hwa" pathLength="100" d="M${xl(r.l)},${Y} L${xr(r.r)},${Y}"${dash(2,0.5)}/>`;
  });
  return `<div class="nl" style="width:${W}px;height:${H}px"><svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${defs}</defs>${under}${over}</svg>${html}</div>`;
}
