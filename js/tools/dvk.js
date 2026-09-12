/* =========================================================
   ДІЛЬНИКИ І КРАТНІ — інструмент-контраст (чому це різне)
   ========================================================= */
function buildDvkModel(N){
  N = Math.max(2, Math.min(30, Math.round(N)||12));
  const divs=[]; for(let d=1; d<=N; d++) if(N%d===0) divs.push(d);
  const mult=[]; for(let k=1;k<=6;k++) mult.push(N*k);
  const isPrime = divs.length===2;
  // «міст»: одна дія читається двома мовами. Для складеного — менший дільник; для простого — власне кратне.
  let bridge;
  if(!isPrime){ const b=divs[1]; bridge={a:N, b, q:N/b}; }        // N : b = q
  else { bridge={a:N*2, b:N, q:2}; }                              // 2N : N = 2
  const steps=[
    {phase:'intro', text:`Візьмемо число <b>${N}</b>. У нього є <b>дільники</b> і є <b>кратні</b> — це зовсім різні речі. Порівняймо їх поруч.`},
    {phase:'div',   text:`<b>Дільники</b> — числа, на які ${N} ділиться <b>націло</b>. Шукаємо їх діленням: починаємо з <b>1</b> (найменший дільник) і закінчуємо самим <b>${N}</b> (найбільший). Вони «вкладаються» всередину числа, тому <b>не більші за ${N}</b>, і їх <b>скінченна</b> кількість — ось усі ${divs.length}.`},
    {phase:'mult',  text:`<b>Кратні</b> — числа, які самі діляться на ${N} націло (це ${N}, взяте 1, 2, 3… рази). Вони <b>не менші за ${N}</b> і тягнуться <b>без кінця</b> — кратних <b>нескінченно</b>.`},
    {phase:'bridge',text:`Обидва поняття — про одну дію. ${bridge.a} : ${bridge.b} = ${bridge.q} (остача 0) читається двома мовами: <b>${bridge.b}</b> — дільник ${bridge.a}, а <b>${bridge.a}</b> — кратне ${bridge.b}.`},
    {phase:'summary',text:`Головне: <b>дільник менший</b> — його «ділять на»; <b>кратне більше</b> — його «отримують». Дільників скінченно, кратних — нескінченно.`},
  ];
  return {N, divs, mult, isPrime, bridge, steps};
}

function dvkView(m, phase){
  // накопичувальний показ — як у зошиті нічого не зникає: секція зʼявляється на своєму кроці й лишається
  const ord={intro:0, div:1, mult:2, bridge:3, summary:4};
  const cur=ord[phase];
  const N=m.N, shown={div:cur>=ord.div, mult:cur>=ord.mult, bridge:cur>=ord.bridge, summary:cur>=ord.summary};
  let h='<div class="dvk">';
  // центральне число
  h+=`<div class="dvk-num"><div class="nbig">${N}</div><div class="ncap">наше число</div></div>`;

  // ЛАНА ДІЛЬНИКІВ — той самий ланцюг, що й у кратних, але ділення; починається з 1, закінчується числом
  if(shown.div){
    const last=m.divs.length-1;
    let stops='';
    m.divs.forEach((d,j)=>{
      const pop = phase==='div' ? ` pop" style="animation-delay:${j*0.09}s` : '';
      const edge = j===0 ? ' first' : (j===last ? ' last' : '');
      const cap = j===0 ? '<span class="kcap">найменший</span>' : (j===last ? '<span class="kcap">найбільший</span>' : '');
      stops+=`<span class="kstop${edge}${pop}"><span class="kv">${d}</span><span class="kk">${N}:${d}=${N/d}</span>${cap}</span>`;
      if(j<last) stops+=`<span class="kdash"></span>`;
    });
    h+=`<div class="dlane d">
      <div class="dlane-hd"><span class="lt">🟢 Дільники</span><span class="lsub">на них ділиться ${N}</span>
        <span class="cnt">скінченно: ${m.divs.length}</span></div>
      <div class="ktrack">${stops}<span class="kend"></span></div>
      <div class="note">${m.divs.join(', ')} — усі <b>≤ ${N}</b>. Починаємо завжди з <b>1</b> (найменший дільник будь-якого числа), закінчуємо самим <b>${N}</b> (найбільший). Вони йдуть парами: ${pairsText(m)}. Далі дільників немає — ланцюг <b>закінчується</b>.</div>
    </div>`;
  }

  // ЛАНА КРАТНИХ — відкритий ланцюг до ∞
  if(shown.mult){
    let stops='';
    m.mult.forEach((v,j)=>{
      const pop = phase==='mult' ? ` pop" style="animation-delay:${j*0.09}s` : '';
      stops+=`<span class="kstop${j===0?' first':''}${pop}"><span class="kv">${v}</span><span class="kk">${N}·${j+1}</span></span>`;
      stops+=`<span class="kdash"></span>`;
    });
    h+=`<div class="dlane k">
      <div class="dlane-hd"><span class="lt">🟡 Кратні</span><span class="lsub">самі діляться на ${N}</span>
        <span class="cnt">нескінченно ∞</span></div>
      <div class="ktrack">${stops}<span class="kinf">∞</span></div>
      <div class="note">${m.mult.join(', ')}, … — усі <b>≥ ${N}</b> і ланцюг <b>не закінчується</b>.</div>
    </div>`;
  }

  // МІСТ — одна дія, два прочитання
  if(shown.bridge){
    const B=m.bridge;
    const popcls = phase==='bridge' ? ' pop' : '';
    h+=`<div class="dvk-bridge${popcls}">
      <div class="bridge-eq" style="font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:800;color:var(--graphite)">
        ${B.a} <span style="color:var(--pink)">:</span> ${B.b} <span style="color:var(--pink)">=</span> ${B.q}<span class="rem">остача 0 ✓</span></div>
      <div class="bridge-reads">
        <div class="bread d"><span class="arw">↙︎</span><span class="big">${B.b} — ДІЛЬНИК ${B.a}</span><span class="sml">менше число, «залазить» усередину</span></div>
        <div class="bread k"><span class="arw">↗︎</span><span class="big">${B.a} — КРАТНЕ ${B.b}</span><span class="sml">більше число, «виходить» назовні</span></div>
      </div>
    </div>`;
  }

  // ПІДСУМОК — таблиця-контраст
  if(shown.summary){
    const dvExample = m.divs.length>6 ? m.divs.slice(0,6).join(', ')+' …' : m.divs.join(', ');
    h+=`<div class="dvk-sum"><table>
      <tr><th></th><th class="cd">🟢 Дільник</th><th class="ck">🟡 Кратне</th></tr>
      <tr><td class="rl">Приклади для ${N}</td><td class="cd">${dvExample}</td><td class="ck">${m.mult.slice(0,4).join(', ')}, … ∞</td></tr>
      <tr><td class="rl">Що це за число</td><td>вкладається в ${N}</td><td>містить ${N}</td></tr>
      <tr><td class="rl">Розмір</td><td class="cd">≤ ${N}</td><td class="ck">≥ ${N}</td></tr>
      <tr><td class="rl">Скільки їх</td><td class="cd">скінченно (${m.divs.length})</td><td class="ck">нескінченно (∞)</td></tr>
      <tr><td class="rl">Як питаємо</td><td>«${N} ділиться на&nbsp;?»</td><td>«? ділиться на&nbsp;${N}»</td></tr>
    </table></div>
    <div class="dvk-verdict">🔑 <b>Дільник менший</b> — на нього ділять число. <b>Кратне більше</b> — його отримують, повторюючи число.
      ${m.isPrime?`До речі, ${N} — <b>просте</b> число: у нього лише 2 дільники (1 і ${N}).`:''}</div>`;
  }

  return h+'</div>';
}
// пари дільників d × (N/d) — показуємо, що дільники йдуть парами
function pairsText(m){
  const seen=new Set(), out=[];
  for(const d of m.divs){ const p=m.N/d; const key=Math.min(d,p)+'x'+Math.max(d,p); if(seen.has(key))continue; seen.add(key); out.push(`${d}·${p}`); }
  return out.join(', ');
}
