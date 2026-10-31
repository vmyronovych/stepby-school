/* Множення вектора на число. Автономний урок без мережевих залежностей. */
const VectorScaling = (() => {
  const v = name => `<span class="vec-symbol">${name}</span>`;
  const a=v('a'), b=v('b');
  const fmt = n => String(Object.is(n,-0)?0:Number(n.toFixed(3))).replace('.',',');
  function model(x,y,k){
    const length=Math.hypot(x,y),result=[k*x,k*y];
    return {result,length,scaledLength:Math.abs(k)*length,
      direction:!length||!k?'Нульовий вектор не має напряму':k>0?'Співнапрямлені':'Протилежно напрямлені'};
  }
  const stages=[
    {title:'Додатний множник',k:2,text:`Якщо k > 0 і ${a} ≠ ${v('0')}, вектори ${a} і ${b} = k${a} співнапрямлені.`,task:'Порівняй k = 2 та k = 0,5. Коли стрілка стає коротшою?'},
    {title:'Від’ємний множник',k:-1.5,text:`Якщо k < 0 і ${a} ≠ ${v('0')}, добуток k${a} має протилежний напрям. Модуль множиться на |k|.`,task:'Зміни знак k. Порівняй довжини стрілок для k = 1,5 та k = −1,5.'},
    {title:'Нуль і одиниця',k:0,text:`0${a} = ${v('0')}, 1${a} = ${a}, (−1)${a} = −${a}. Для будь-якого k маємо k${v('0')} = ${v('0')}.`,task:'Обери «Нульовий вектор», потім змінюй k. Чи з’являється напрям?'},
    {title:'Координати',k:2,text:`Якщо ${a} = (x; y), то k${a} = (kx; ky). Помнож кожну координату на k.`,task:'Установи a = (−2; 3), k = −2. Перевір результат (4; −6).'}
  ];
  function init(body){
    const root=body.querySelector('.vs-lesson');
    let x=3,y=2,k=2,stage=0;
    const topic=DB.topics.find(t=>t.id==='vector-scaling');
    root.innerHTML=`<div class="vec-tabs" role="group" aria-label="Кроки дослідження">${stages.map((s,i)=>`<button type="button" data-stage="${i}" aria-pressed="${i===0}"><span>${i+1}</span>${s.title}</button>`).join('')}</div>
      <div class="vec-layout"><section class="vec-workspace" aria-label="Інтерактивна побудова">
      <div class="vec-board-head"><span><i class="vec-dot"></i>${a}</span><span><i class="vec-dot teal"></i>${b} = k${a}</span><span class="vec-scale">Спільний початок O</span></div>
      <svg class="vec-board vs-board" viewBox="0 0 720 480" role="img" aria-label="Вектор a та його добуток на число"></svg>
      <div class="vs-sliders">${[['k','Множник k',-3,3,.25,2],['x','Координата x',-4,4,1,3],['y','Координата y',-4,4,1,2]].map(([id,label,min,max,step,value])=>`<label for="vs-${id}">${label}<output id="vs-${id}-value" for="vs-${id}"></output><input id="vs-${id}" name="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>`).join('')}</div>
      <p class="vec-help">Змінюй повзунки мишею, дотиком або клавішами зі стрілками. Масштаб сітки підлаштовується автоматично.</p>
      </section><aside class="vec-explanation" aria-label="Пояснення та результат">
      <div class="vec-explain-head"><span class="pill">Досліджуємо</span><span class="vec-step"></span></div>
      <p class="vec-rule"></p><div class="vec-task-box"><b>Спробуй на рисунку</b><p class="vec-task"></p></div>
      <div class="vs-formula"></div><div class="vec-results" aria-live="polite" aria-atomic="true"></div>
      <p class="vec-note vs-grid-note"></p>
      <div class="vec-pager"><button type="button" class="btn ghost sm" data-action="prev">← Назад</button><button type="button" class="btn sm" data-action="next">Далі →</button></div>
      </aside></div>
      <div class="vec-experiments"><span>Готовий дослід</span><div class="vec-actions">${[['double','Подвоїти'],['half','Зменшити вдвічі'],['opposite','Протилежний'],['zero','Нульовий вектор'],['reset','Скинути']].map(([id,label])=>`<button type="button" class="btn ghost sm" data-action="${id}">${label}</button>`).join('')}</div></div>
      <section class="vs-theory"><h2>Запам’ятай</h2><div class="vs-theory-grid">
      <article><h3>Означення</h3><p>Для ненульового ${a} та k ≠ 0 добуток k${a} має модуль |k| · |${a}|. Додатний k зберігає напрям, від’ємний — змінює на протилежний.</p><p>Якщо k = 0 або ${a} = ${v('0')}, добуток є нульовим вектором. Його напрям не визначено.</p></article>
      <article><h3>Властивості</h3><p>Для будь-яких чисел m, n та векторів ${a}, ${b}:</p><p class="vs-identities">m(n${a}) = (mn)${a}<br>(m + n)${a} = m${a} + n${a}<br>m(${a} + ${b}) = m${a} + m${b}</p></article>
      <article><h3>Колінеарність</h3><p>Вектори ${a} та k${a} завжди колінеарні. Якщо ${a} ≠ ${v('0')} і ${b} колінеарний ${a}, існує число k, для якого ${b} = k${a}.</p><p>Наприклад, (−2; 4) = −2 · (1; −2).</p></article></div>
      <p class="vs-source">За матеріалами підручника О. С. Істера «Геометрія. 9 клас», § 9, с. 73–77. Формулювання й навчальні приклади адаптовано для інтерактивного уроку.</p></section>
      <section class="vs-practice" aria-labelledby="vs-practice-title"><h2 id="vs-practice-title">Розв’яжи приклади крок за кроком</h2><p>Відкрий перший приклад. Натискай «Далі», щоб дописувати розв’язання в зошиті. Після відповіді переходь до наступного прикладу.</p><div class="grid c2">${topic.tasks.map((task,i)=>`<article class="card"><span class="pill">Приклад ${i+1} із ${topic.tasks.length}</span><h3>${task.title}</h3><a class="btn sm" href="${hrefTopic(topic,task.id)}">${i===0?'Почати розв’язання':'Розв’язати крок за кроком'} →</a></article>`).join('')}</div></section>`;
    function draw(){
      const m=model(x,y,k),s=stages[stage];
      root.querySelectorAll('[data-stage]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.stage)===stage)));
      for(const [name,value] of Object.entries({x,y,k})){
        root.querySelector(`[name="${name}"]`).value=value;
        root.querySelector(`#vs-${name}-value`).textContent=fmt(value);
      }
      root.querySelector('.vec-step').textContent=`Крок ${stage+1} із ${stages.length}`;
      root.querySelector('.vec-rule').innerHTML=s.text;
      root.querySelector('.vec-task').textContent=s.task;
      root.querySelector('[data-action="prev"]').disabled=stage===0;
      root.querySelector('[data-action="next"]').disabled=stage===stages.length-1;
      root.querySelector('.vs-formula').innerHTML=`${b} = ${fmt(k)} · (${fmt(x)}; ${fmt(y)})<br><strong>= (${fmt(m.result[0])}; ${fmt(m.result[1])})</strong>`;
      root.querySelector('.vec-results').innerHTML=`<div><span>|${a}|</span><strong>${fmt(m.length)}</strong></div><div><span>|${b}| = |k| · |${a}|</span><strong>${fmt(m.scaledLength)}</strong></div><div><span>Напрям</span><strong>${m.direction}</strong></div>`;
      root.querySelector('.vs-grid-note').textContent='Модулі на панелі округлено до тисячних. Координати обчислено точно.';
      const extent=Math.max(4,Math.abs(x),Math.abs(y),...m.result.map(Math.abs))+1;
      const unit=180/extent,spacing=extent>9?2:1;
      const p=([px,py])=>[360+px*unit,240-py*unit];
      let grid='';
      for(let n=-Math.ceil(extent*1.8/spacing)*spacing;n<=extent*1.8;n+=spacing){
        const gx=360+n*unit,gy=240-n*unit;
        grid+=`<path d="M${gx} 0V480 M0 ${gy}H720" stroke="#eeedf5"/>`;
      }
      function arrow(coords,color,id,label,offset){
        const [ex,ey]=p(coords);
        return coords.every(n=>n===0)?`<circle cx="360" cy="240" r="${id==='b'?9:5}" fill="none" stroke="${color}" stroke-width="3"/><text x="374" y="${240+offset}" fill="${color}">${label} = 0</text>`:
          `<path d="M360 240L${ex} ${ey}" fill="none" stroke="${color}" stroke-width="${id==='b'?3:2.5}" ${id==='a'?'stroke-dasharray="8 5"':''} marker-end="url(#vs-${id})"/><text x="${ex+12}" y="${ey+offset}" fill="${color}">${label}</text>`;
      }
      const svg=root.querySelector('svg');
      svg.setAttribute('aria-label',`a = (${fmt(x)}; ${fmt(y)}), k = ${fmt(k)}, b = (${m.result.map(fmt).join('; ')}). ${m.direction}.`);
      svg.innerHTML=`<defs>${[['a','#6450c8'],['b','#c73535']].map(([id,color])=>`<marker id="vs-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="14" markerHeight="14" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="${color}"/></marker>`).join('')}</defs><rect width="720" height="480" fill="#fafaff"/>${grid}<path d="M20 240H700 M360 20V460" stroke="#a7a3bd" stroke-width="1.5"/><text x="694" y="229">x</text><text x="372" y="25">y</text><text x="339" y="261">O</text><text x="20" y="30">Клітинка = ${spacing} од.</text>${arrow(m.result,'#c73535','b','b',26)}${arrow([x,y],'#6450c8','a','a',-12)}<circle cx="360" cy="240" r="3" fill="#333"/>`;
    }
    root.addEventListener('input',e=>{
      const value=Number(e.target.value);
      if(e.target.name==='k')k=value;
      else if(e.target.name==='x')x=value;
      else if(e.target.name==='y')y=value;
      else return;
      draw();
    });
    root.addEventListener('click',e=>{
      const button=e.target.closest('button');if(!button)return;
      if(button.dataset.stage!==undefined){stage=Number(button.dataset.stage);k=stages[stage].k;draw();return;}
      switch(button.dataset.action){
        case 'prev':stage=Math.max(0,stage-1);k=stages[stage].k;break;
        case 'next':stage=Math.min(stages.length-1,stage+1);k=stages[stage].k;break;
        case 'double':k=2;break;
        case 'half':k=.5;break;
        case 'opposite':k=-1;break;
        case 'zero':x=0;y=0;break;
        case 'reset':x=3;y=2;k=2;stage=0;break;
        default:return;
      }
      draw();
    });
    draw();
  }
  return {init,model};
})();
DOCS['geometry-vector-scaling']={title:'Множення вектора на число',app:true,
  html:'<div class="vec-lesson vs-lesson"></div>',init:VectorScaling.init};
