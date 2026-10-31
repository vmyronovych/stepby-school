/* Спільне письмо векторних формул і ланцюжків рівностей у зошиті. */
const VectorNotebook = (() => {
  function renderVector(token,pen){
    let body=hwGlyphs(token.name,pen);
    body=`<span class="sp-tool-vector">${body}<svg class="sp-tool-arrow hwa" viewBox="0 0 60 12" aria-hidden="true"${hwTick(pen,'hwwipe',.28)}><path d="M2 6H56 M48 1L56 6L48 11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
    if(token.modulus)body=hwGlyphs('|',pen)+body+hwGlyphs('|',pen);
    if(token.square)body+=`<sup class="sp-tool-square">${hwGlyphs('2',pen)}</sup>`;
    return body;
  }
  function tokenText(token){return token.kind==='vector'?(token.modulus?'|':'')+token.name+(token.modulus?'|':'')+(token.square?'²':''):token.kind==='ast'?fmlText(token.value):token.value;}
  function renderTokens(tokens,pen){return tokens.map(t=>t.kind==='vector'?renderVector(t,pen):t.kind==='ast'?renderFormula(t.value,pen):hwGlyphs(t.value,pen)).join('');}
  function renderRows(m,ctx){
    const lines=new Map();
    m.steps.slice(0,ctx.index+1).forEach((step,i)=>{
      const target=step.appendTo??i;
      if(!lines.has(target))lines.set(target,[]);
      // Наступна частина рівності починається зі знака «=».
      const tokens=step.appendTo==null?step.tokens:step.tokens.slice(step.tokens.findIndex(t=>t.kind==='text'&&t.value==='='));
      lines.get(target).push({step,i,tokens});
    });
    return [...lines.values()].map(chunks=>{
      const current=chunks.some(c=>c.i===ctx.index),answer=chunks.some(c=>c.i===m.steps.length-1);
      const label=chunks[0].step.label;
      const formula=chunks.map(({i,tokens})=>{
        const pen={writing:!!ctx.anim&&i===ctx.index,order:0};
        return `<span class="sp-tool-segment" data-step="${i}">${renderTokens(tokens,pen)}</span>`;
      }).join('');
      return `<section class="rp-row${current?' rp-current':''}${answer?' rp-answer':''}"><div class="rp-label">${label}</div><div class="fml sp-tool-formula" role="img" aria-label="${esc(chunks.flatMap(c=>c.tokens).map(tokenText).join(' '))}">${formula}</div></section>`;
    }).join('');
  }
  function scrollCurrent(m,ctx){
    if(ctx.step.appendTo==null)return;
    const line=document.querySelector('.rp-current .sp-tool-formula');
    if(line)line.scrollLeft=line.scrollWidth;
  }
  return {renderTokens,tokenText,renderRows,scrollCurrent};
})();
