/* § 10. Скалярний добуток: теорія, дослід і вправи Істера. */
const ScalarProduct = (() => {
  const v=n=>`<span class="vec-symbol">${n}</span>`;
  const a=v('a'),b=v('b');
  const fmt=n=>String(Object.is(n,-0)?0:Number(n.toFixed(3))).replace('-', '−').replace('.',',');
  const pair=p=>`(${p.map(fmt).join('; ')})`;
  const factor=n=>n<0?`(${fmt(n)})`:fmt(n);
  function model(a,b){
    const dot=a[0]*b[0]+a[1]*b[1],la=Math.hypot(...a),lb=Math.hypot(...b);
    return {dot,la,lb,angle:la&&lb?Math.acos(Math.max(-1,Math.min(1,dot/(la*lb))))*180/Math.PI:null,perpendicular:!!la&&!!lb&&dot===0};
  }
  function polar(la,lb,angle){return [[la,0],[lb*Math.cos(angle*Math.PI/180),lb*Math.sin(angle*Math.PI/180)]];}
  const groups=[
    {ref:'10.1',title:'Добуток за координатами',names:['a','b'],items:[{a:[-2,1],b:[0,3]},{a:[1,-3],b:[-2,1],names:['c','d']}]},
    {ref:'10.3',title:'Скалярний квадрат',names:['m','m'],square:true,items:[{a:[-1,-2],b:[-1,-2]},{a:[4,1],b:[4,1]}]},
    {ref:'10.10',title:'Добуток за кутом',names:['a','b'],items:[
      {lengths:[5,2],angle:30,exact:'5√3',cos:'√3/2',value:5*Math.sqrt(3)},
      {lengths:[4,1],angle:60,exact:'2',cos:'1/2',value:2},
      {lengths:[2,1],angle:135,exact:'−√2',cos:'−√2/2',value:-Math.sqrt(2)},
      {lengths:[10,5],angle:180,exact:'−50',cos:'−1',value:-50}]},
    {ref:'10.12',title:'Доведи перпендикулярність',names:['m','n'],proof:true,items:[{a:[-1,10],b:[20,2]}]},
    {ref:'10.14',title:'Перевір перпендикулярність',names:['c','d'],check:true,items:[{a:[1,5],b:[-5,-1]},{a:[2,3],b:[-6,4]}]}
  ];
  function exercise(g,i){
    const group=groups[g],item=group.items[i],names=item.names||group.names;
    const [av,bv]=item.lengths?polar(...item.lengths,item.angle):[item.a,item.b];
    const m=model(av,bv),left=v(names[0]),right=v(names[1]),product=`${left} · ${right}`;
    const answer=item.lengths?item.value:group.check?(m.perpendicular?'так':'ні'):m.dot;
    const condition=item.lengths?`|${left}| = ${item.lengths[0]}, |${right}| = ${item.lengths[1]}, α = ${item.angle}°. Знайди ${product}.`:
      group.square?`${left} = ${pair(av)}. Знайди ${left}<sup>2</sup>.`:
      `${left} = ${pair(av)}, ${right} = ${pair(bv)}. ${group.proof?'Доведи, що вектори взаємно перпендикулярні.':group.check?'Чи є вектори взаємно перпендикулярними?':`Знайди ${product}.`}`;
    let steps;
    if(item.lengths)steps=[
      ['Обери формулу',`${product} = |${left}| · |${right}| · cos α`],
      ['Підстав дані',`${product} = ${item.lengths[0]} · ${item.lengths[1]} · cos ${item.angle}°`],
      ['Знайди косинус',`cos ${item.angle}° = ${item.cos}`],
      ['Обчисли добуток',`${product} = ${item.lengths[0]*item.lengths[1]} · (${item.cos}) = ${item.exact}`]
    ];
    else {
      steps=[['Обери формулу',group.square?`${left}<sup>2</sup> = ${left} · ${left} = x² + y²`:`${product} = x₁x₂ + y₁y₂`],
        ['Підстав координати',group.square?`${left}<sup>2</sup> = ${factor(av[0])}² + ${factor(av[1])}²`:`${product} = ${factor(av[0])} · ${factor(bv[0])} + ${factor(av[1])} · ${factor(bv[1])}`],
        ['Обчисли',`${product} = ${fmt(av[0]*bv[0])} + ${factor(av[1]*bv[1])} = ${fmt(m.dot)}`]];
      if(group.proof||group.check)steps.push(['Зроби висновок',`${m.dot===0?'Обидва вектори ненульові. Добуток дорівнює 0, тому вектори перпендикулярні.':'Добуток не дорівнює 0, тому вектори не перпендикулярні.'}`]);
      else if(group.square)steps.push(['Перевір зміст',`${left}<sup>2</sup> = |${left}|² = ${fmt(m.dot)}. Це число, а не вектор.`]);
    }
    return {group,item,names,av,bv,m,answer,condition,steps};
  }
  function diagram(av,bv,names,angleLabel,id='problem'){
    const m=model(av,bv),unit=150/Math.max(1,m.la,m.lb);
    const point=p=>[260+p[0]*unit,220-p[1]*unit];
    const [ax,ay]=point(av),[bx,by]=point(bv);
    let grid='';for(let n=20;n<520;n+=25)grid+=`<path d="M${n} 0V440 M0 ${n}H520" stroke="#eeedf5"/>`;
    const angle=m.angle===null?'Кут не визначено':`${fmt(m.angle)}°`;
    const start=Math.atan2(av[1],av[0]),delta=Math.atan2(av[0]*bv[1]-av[1]*bv[0],m.dot);
    const arc=m.angle>0?`<path d="M${260+38*Math.cos(start)} ${220-38*Math.sin(start)} A38 38 0 0 ${delta>=0?0:1} ${260+38*Math.cos(start+delta)} ${220-38*Math.sin(start+delta)}" fill="none" stroke="#ad6b16" stroke-width="2"/>`:'';
    return `<svg class="sp-board" viewBox="0 0 520 440" role="img" aria-label="Вектори ${names.join(' і ')} зі спільним початком. ${angle}."><defs>${['#6450c8','#087f8c'].map((c,i)=>`<marker id="sp-${id}-arrow-${i}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0L10 5L0 10Z" fill="${c}"/></marker>`).join('')}</defs><rect width="520" height="440" fill="#fafaff"/>${grid}<path d="M20 220H500 M260 20V420" stroke="#b9b3ce"/><text x="490" y="207">x</text><text x="274" y="25">y</text>
      <path d="M260 220L${bx} ${by}" stroke="#087f8c" stroke-width="3" fill="none" marker-end="url(#sp-${id}-arrow-1)"/>
      <path d="M260 220L${ax} ${ay}" stroke="#6450c8" stroke-width="2.5" stroke-dasharray="7 4" fill="none" marker-end="url(#sp-${id}-arrow-0)"/>
      <text x="${ax+12}" y="${ay-14}" fill="#6450c8">${names[0]}</text><text x="${bx+12}" y="${by+26}" fill="#087f8c">${names[1]}</text><circle cx="260" cy="220" r="3" fill="#333"/><text x="240" y="243">O</text>
      ${arc}<text x="20" y="400">${angleLabel||`α ≈ ${angle}`}</text></svg>`;
  }
  const theory=`<section class="sp-theory" aria-labelledby="sp-theory-title"><h2 id="sp-theory-title">Що таке скалярний добуток?</h2>
    <p>Скалярний добуток двох векторів — це <b>число</b>. Він пов’язує довжини векторів із кутом між ними.</p>
    <h3>Обчислення за координатами</h3><p>Якщо ${a} = (x₁; y₁), ${b} = (x₂; y₂), перемнож відповідні координати й додай результати.</p>
    <div class="sp-equation">${a} · ${b} = x₁x₂ + y₁y₂</div>
    <p>Наприклад, для ${a} = (2; 3) та ${b} = (4; −1):</p><div class="sp-equation">${a} · ${b} = 2 · 4 + 3 · (−1) = 5</div>
    <h3>Обчислення за довжинами й кутом</h3><p>Перенеси ненульові вектори до спільного початку. Кут α між ними лежить у межах від 0° до 180°.</p>
    <div class="sp-equation">${a} · ${b} = |${a}| · |${b}| · cos α</div>
    <p>За гострого кута добуток додатний, за прямого — нульовий, за тупого — від’ємний. При 0° добуток додатний, при 180° — від’ємний.</p>
    <h3>Скалярний квадрат і перпендикулярність</h3><div class="sp-equation">${a}<sup>2</sup> = ${a} · ${a} = x₁² + y₁² = |${a}|²</div>
    <p>Два <b>ненульові</b> вектори перпендикулярні тоді й лише тоді, коли їхній скалярний добуток дорівнює нулю.</p>
    <p>Добуток нульового вектора на будь-який вектор дорівнює 0. Кут із нульовим вектором не визначено.</p>
    <h3>Властивості</h3><div class="sp-equation">${a} · ${b} = ${b} · ${a}<br>${a} · (${b} + ${v('c')}) = ${a} · ${b} + ${a} · ${v('c')}<br>(k${a}) · ${b} = k(${a} · ${b})</div>
    <p class="sp-source">За підручником О. С. Істера «Геометрія. 9 клас», § 10. Умови вправ: с. 82–83.</p></section>`;
  function init(body){
    const root=body.querySelector('.sp-lesson');
    let la=5,lb=2,angle=30;
    const topic=DB.topics.find(t=>t.id==='scalar-product');
    root.innerHTML=`${theory}<section class="sp-explore"><h2>Досліди вплив кута</h2><p>Змінюй кут і довжини. Стеж за знаком добутку.</p><div class="vec-layout"><div class="sp-live-diagram"></div><div><div class="vs-sliders">${[['angle','Кут α',0,180,30],['la','Довжина a',1,10,5],['lb','Довжина b',1,10,2]].map(([id,label,min,max,value])=>`<label for="sp-${id}">${label}<output for="sp-${id}"></output><input id="sp-${id}" name="${id}" type="range" min="${min}" max="${max}" value="${value}"></label>`).join('')}</div><div class="sp-live-result" aria-live="polite"></div><div class="vec-actions">${[0,90,180].map(n=>`<button type="button" class="btn ghost sm" data-angle="${n}">${n}°</button>`).join('')}</div></div></div></section>
      <section class="sp-practice" aria-labelledby="sp-practice-title"><h2 id="sp-practice-title">Розв’яжи задачі крок за кроком</h2><p>Відкрий першу задачу. Натискай «Далі», щоб дописувати розв’язання в зошиті. Після відповіді переходь до наступної задачі.</p>
      <div class="grid c2">${topic.tasks.map((task,i)=>`<article class="card"><span class="pill">Задача ${i+1} із ${topic.tasks.length}</span><h3>${task.title}</h3><a class="btn sm" href="${hrefTopic(topic,task.id)}">${i===0?'Почати розв’язання':'Розв’язати крок за кроком'} →</a></article>`).join('')}</div></section>`;
    function explore(){
      root.querySelector('.sp-live-diagram').innerHTML=diagram(...polar(la,lb,angle),['a','b'],`α = ${angle}°`,'live');
      for(const [key,value] of Object.entries({la,lb,angle})){
        root.querySelector(`[name="${key}"]`).value=value;
        root.querySelector(`output[for="sp-${key}"]`).textContent=value+(key==='angle'?'°':'');
      }
      const dot=la*lb*Math.cos(angle*Math.PI/180);
      root.querySelector('.sp-live-result').innerHTML=`<div class="sp-equation">${a} · ${b} = ${la} · ${lb} · cos ${angle}° ≈ <b>${fmt(dot)}</b></div><p>${angle===90?'Прямий кут: добуток дорівнює 0. Вектори перпендикулярні.':angle<90?'Добуток додатний.':'Добуток від’ємний.'}</p><p class="sp-source">На рисунку довжини пропорційні. Значення округлено до тисячних.</p>`;
    }
    root.addEventListener('input',e=>{
      if(e.target.name==='la')la=+e.target.value;
      else if(e.target.name==='lb')lb=+e.target.value;
      else if(e.target.name==='angle')angle=+e.target.value;
      else return;
      explore();
    });
    root.addEventListener('click',e=>{
      const button=e.target.closest('button');if(!button)return;
      if(button.dataset.angle!==undefined){angle=+button.dataset.angle;explore();}
    });
    explore();
  }
  return {init,model,polar,groups,exercise};
})();
DOCS['geometry-scalar-product']={title:'Скалярний добуток векторів',app:true,html:'<div class="vec-lesson sp-lesson"></div>',init:ScalarProduct.init};
