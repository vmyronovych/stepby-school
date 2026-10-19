/* § 6: напрямлені відрізки. Геометричні дані — цілі клітинки сітки. */
const VectorLesson = (() => {
  const presets = {
    equal: {name:'Рівні вектори', points:[[3,8],[7,5],[10,9],[14,6]]},
    parallel: {name:'Співнапрямлені, різні модулі', points:[[3,8],[7,6],[9,7],[15,4]]},
    opposite: {name:'Протилежні напрями, однакові модулі', points:[[3,8],[7,5],[14,5],[10,8]]},
    crossing: {name:'Неколінеарні, однакові модулі', points:[[3,8],[7,5],[11,4],[14,8]]},
    zero: {name:'Один нульовий вектор', points:[[4,7],[4,7],[10,8],[14,5]]},
    zeros: {name:'Два нульові вектори', points:[[4,7],[4,7],[12,6],[12,6]]},
  };
  const symbol = name => `<span class="vec-symbol" aria-label="вектор ${name}">${name}</span>`;
  const ab = symbol('AB'), cd = symbol('CD');
  const lessons = [
    {title:'Вектор', preset:'equal', rule:`<b>Вектор — це напрямлений відрізок.</b> У ${ab} точка A — початок, а B — кінець. Стрілка показує напрям від A до B.`,
      note:`Вектор позначають двома великими літерами зі стрілкою або однією малою: <span class="vec-symbol">a</span>. Якщо A і B збігаються, маємо нульовий вектор.`,
      task:'Перемісти B. Простеж, як змінюється стрілка від A до B.'},
    {title:'Модуль', preset:'equal', rule:`<b>Модуль вектора — довжина його відрізка.</b> Записуємо |${ab}| = AB. Модуль завжди невід’ємний.`,
      note:'Одна сторона клітинки — одна одиниця довжини. Нульовий вектор має модуль 0. Модулі двох векторів можуть бути рівними, навіть коли напрями різні.',
      task:'Обери точку B та пересувай її кнопками. Порівняй довжини двох стрілок.'},
    {title:'Напрям', preset:'opposite', rule:`<b>Напрям читаємо від початку до кінця.</b> Для різних точок A і B вектори ${ab} і ${symbol('BA')} мають протилежні напрями.`,
      note:'Ненульові колінеарні вектори можуть бути співнапрямленими або протилежно напрямленими. Напрям нульового вектора не визначають.',
      task:'Натисни «Поміняти A і B». Модуль залишиться тим самим, а напрям зміниться.'},
    {title:'Колінеарність', preset:'parallel', rule:'<b>Колінеарні вектори лежать на одній прямій або на паралельних прямих.</b> Їхні модулі можуть бути різними.',
      note:'Ненульові колінеарні вектори мають однаковий або протилежний напрям. Нульовий вектор вважають колінеарним із будь-яким вектором.',
      task:'Увімкни прямі векторів. Перемісти D на одну клітинку вбік і перевір колінеарність.'},
    {title:'Рівність', preset:'equal', rule:'<b>Ненульові вектори рівні, якщо вони співнапрямлені та мають однакові модулі.</b> Розташування на площині не впливає на рівність.',
      note:'Однакової довжини недостатньо: потрібен і однаковий напрям. Усі нульові вектори рівні між собою.',
      task:'Натисни «Перенести CD». Обидві точки змістяться разом. Чи збережеться рівність?'},
  ];
  function classify(points){
    const [a,b,c,d] = points;
    const u = [b[0]-a[0], b[1]-a[1]], v = [d[0]-c[0], d[1]-c[1]];
    const n = u[0]**2+u[1]**2, m = v[0]**2+v[1]**2;
    const zero = n===0 || m===0;
    const collinear = u[0]*v[1]===u[1]*v[0];
    const dot = u[0]*v[0]+u[1]*v[1];
    return {n,m,zero,collinear,same:!zero&&collinear&&dot>0,
      opposite:!zero&&collinear&&dot<0,equal:u[0]===v[0]&&u[1]===v[1]};
  }
  function length(n){
    const root = Math.sqrt(n);
    return Number.isInteger(root) ? String(root) : `√${n} ≈ ${root.toFixed(2).replace('.',',')}`;
  }
  const names = ['A','B','C','D'];
  let host, points, lesson, selected, lines, drag;
  function loadPreset(key){ points=presets[key].points.map(p=>p.slice()); }
  function draw(){
    const svg = host.querySelector('.vec-board');
    const r = classify(points);
    const arrow = (i,color) => {
      const a=points[i], b=points[i+1], x=a[0]*40, y=a[1]*40;
      if(a[0]===b[0]&&a[1]===b[1]) return `<circle cx="${x}" cy="${y}" r="12" fill="none" stroke="${color}" stroke-width="3"/>`;
      const dx=b[0]*40-x, dy=b[1]*40-y, len=Math.hypot(dx,dy), ux=dx/len, uy=dy/len;
      const tx=b[0]*40, ty=b[1]*40;
      const guide=lines?`<line x1="${x-ux*1200}" y1="${y-uy*1200}" x2="${x+ux*1200}" y2="${y+uy*1200}" stroke="${color}" opacity=".35" stroke-width="2" stroke-dasharray="8 8"/>`:'';
      return guide+`<line x1="${x}" y1="${y}" x2="${tx-ux*9}" y2="${ty-uy*9}" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
        <path d="M ${tx} ${ty} L ${tx-ux*20+uy*8} ${ty-uy*20-ux*8} L ${tx-ux*20-uy*8} ${ty-uy*20+ux*8} Z" fill="${color}"/>`;
    };
    host.querySelector('.vec-arrows').innerHTML=arrow(0,'#6450c8')+arrow(2,'#087f8c');
    host.querySelectorAll('[data-point]').forEach(el=>{
      const i=Number(el.dataset.point), p=points[i];
      el.setAttribute('transform',`translate(${p[0]*40} ${p[1]*40})`);
      el.setAttribute('aria-label',`Точка ${names[i]}. Клавіші зі стрілками пересувають на одну клітинку.`);
      el.classList.toggle('selected',i===selected);
      const text=el.querySelector('text');
      // Початок і кінець нульового вектора мають спільний підпис.
      const paired=points[i^1];
      const coincides=p[0]===paired[0]&&p[1]===paired[1];
      text.textContent=coincides ? (i%2===1 ? `${names[i-1]} = ${names[i]}` : '') : names[i];
      const otherPair=points[i<2?2:0];
      const sharedStart=i%2===0&&p[0]===otherPair[0]&&p[1]===otherPair[1];
      text.setAttribute('y',i%2===0 ? (sharedStart&&i===2?28:-18) : 28);
    });
    svg.querySelector('desc').textContent=`Фіолетовий вектор AB: модуль ${length(r.n)}. Бірюзовий вектор CD: модуль ${length(r.m)}. ${r.equal?'Вектори рівні.':'Вектори не рівні.'}`;
    host.querySelector('[data-length="ab"]').textContent=length(r.n);
    host.querySelector('[data-length="cd"]').textContent=length(r.m);
    const direction=r.zero?'Для нульового вектора напрям не визначають.':r.same?'Співнапрямлені':r.opposite?'Протилежно напрямлені':'Не співнапрямлені й не протилежно напрямлені';
    host.querySelector('.vec-results').innerHTML=`
      <div><span>Колінеарність</span><strong>${r.collinear?'Колінеарні':'Неколінеарні'}</strong></div>
      <div><span>Напрям</span><strong>${direction}</strong></div>
      <div><span>Модулі</span><strong>${r.n===r.m?'Однакові':'Різні'}</strong></div>
      <div class="vec-verdict"><span>Рівність</span><strong>${ab} ${r.equal?'=':'≠'} ${cd}</strong></div>`;
    host.querySelector('.vec-zero-note').textContent=r.zero ? (r.n===0&&r.m===0?'Обидва вектори нульові. Вони рівні та колінеарні.':'Один вектор нульовий. Він колінеарний з іншим, але не дорівнює йому.') : '';
    host.querySelector('[data-action="translate"]').disabled=!translation();
    host.querySelector('[data-action="previous"]').disabled=lesson===0;
    host.querySelector('[data-action="next"]').disabled=lesson===lessons.length-1;
  }
  function changeLesson(index){
    lesson=index; selected=1; lines=index===3;
    loadPreset(lessons[index].preset);
    host.querySelectorAll('[data-lesson]').forEach((el,i)=>el.setAttribute('aria-pressed',String(i===index)));
    host.querySelector('.vec-step').textContent=`${index+1} / ${lessons.length}`;
    host.querySelector('.vec-rule').innerHTML=lessons[index].rule;
    host.querySelector('.vec-note').innerHTML=lessons[index].note;
    host.querySelector('.vec-task').textContent=lessons[index].task;
    host.querySelector('[name="vec-preset"]').value=lessons[index].preset;
    host.querySelector('[name="vec-point"]').value=String(selected);
    host.querySelector('[name="vec-lines"]').checked=lines;
    draw();
  }
  function move(index,dx,dy){
    const p=points[index]; p[0]=Math.max(1,Math.min(17,p[0]+dx)); p[1]=Math.max(1,Math.min(11,p[1]+dy));
    draw();
  }
  function translation(){
    return [[1,0],[-1,0],[0,1],[0,-1]].find(([dx,dy])=>
      points.slice(2).every(([x,y])=>x+dx>=1&&x+dx<=17&&y+dy>=1&&y+dy<=11));
  }
  function init(body){
    host=body.querySelector('.vec-lesson');
    host.innerHTML=`
      <a class="vec-practice-jump" href="#vector-practice">Перейти до задач ↓</a>
      <nav class="vec-tabs" aria-label="Пояснення про вектори">${lessons.map((l,i)=>`<button type="button" data-lesson="${i}" aria-pressed="false"><span>${i+1}</span>${l.title}</button>`).join('')}</nav>
      <div class="vec-layout">
        <section class="vec-workspace" aria-label="Рисунок векторів">
          <div class="vec-board-head"><span><i class="vec-dot"></i>${ab}</span><span><i class="vec-dot teal"></i>${cd}</span><span class="vec-scale">Клітинка = 1 одиниця</span></div>
          <svg class="vec-board" viewBox="0 0 720 480" role="group" aria-label="Рухомі точки A, B, C, D">
            <desc></desc><defs><pattern id="vec-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 H 0 V 40" fill="none" stroke="#dddff0" stroke-width="1"/></pattern></defs>
            <rect width="720" height="480" fill="#fafaff"/><rect width="720" height="480" fill="url(#vec-grid)"/>
            <g class="vec-arrows"></g>
            ${names.map((n,i)=>`<g data-point="${i}" tabindex="0" role="button" class="vec-point ${i<2?'':'teal'}"><circle r="21" class="vec-hit"/><circle r="6" class="vec-handle"/><text x="0" y="-18" text-anchor="middle">${n}</text></g>`).join('')}
          </svg>
          <div class="vec-measures"><span>|${ab}| = <b data-length="ab"></b></span><span>|${cd}| = <b data-length="cd"></b></span></div>
          <div class="vec-controls">
            <label>Рухати точку <select name="vec-point">${names.map((n,i)=>`<option value="${i}">${n}</option>`).join('')}</select></label>
            <div class="vec-nudge" role="group" aria-label="Пересунути обрану точку"><button type="button" data-move="-1,0" aria-label="Ліворуч">←</button><button type="button" data-move="0,-1" aria-label="Вгору">↑</button><button type="button" data-move="0,1" aria-label="Вниз">↓</button><button type="button" data-move="1,0" aria-label="Праворуч">→</button></div>
            <label class="vec-check"><input type="checkbox" name="vec-lines"> Прямі векторів</label>
          </div>
          <p class="vec-help">Перетягуй точки на сітці. Або обери точку й натискай кнопки зі стрілками.</p>
        </section>
        <aside class="vec-explanation" aria-label="Пояснення">
          <div class="vec-explain-head"><span class="pill">§ 6 · Досліджуємо</span><span class="vec-step"></span></div>
          <p class="vec-rule"></p><p class="vec-note"></p>
          <div class="vec-task-box"><b>Спробуй на рисунку</b><p class="vec-task"></p></div>
          <div class="vec-results" aria-live="polite" aria-atomic="true"></div><p class="vec-zero-note"></p>
          <div class="vec-pager"><button type="button" class="btn ghost sm" data-action="previous">← Назад</button><button type="button" class="btn sm" data-action="next">Далі →</button></div>
        </aside>
      </div>
      <div class="vec-experiments"><label>Готовий приклад <select name="vec-preset">${Object.entries(presets).map(([key,p])=>`<option value="${key}">${p.name}</option>`).join('')}</select></label>
        <div class="vec-actions"><button type="button" class="btn ghost sm" data-action="reverse">Поміняти A і B</button><button type="button" class="btn ghost sm" data-action="translate">Перенести CD</button><button type="button" class="btn gray sm" data-action="reset">Скинути</button></div>
      </div>
      <section class="vec-practice" id="vector-practice" aria-labelledby="vector-practice-title"></section>`;
    // Локальний перехід не змінює маршрут уроку.
    host.querySelector('.vec-practice-jump').addEventListener('click',e=>{
      e.preventDefault();host.querySelector('.vec-practice').scrollIntoView({behavior:'auto'});
      host.querySelector('[data-problem="0"]').focus({preventScroll:true});
    });
    VectorPractice.init(host.querySelector('.vec-practice'));
    host.addEventListener('click',e=>{
      const tab=e.target.closest('[data-lesson]');
      if(tab){changeLesson(Number(tab.dataset.lesson));return;}
      const button=e.target.closest('button');
      if(!button)return;
      if(button.dataset.move){const [dx,dy]=button.dataset.move.split(',').map(Number);move(selected,dx,dy);return;}
      switch(button.dataset.action){
        case 'previous': if(lesson>0)changeLesson(lesson-1); break;
        case 'next': if(lesson<4)changeLesson(lesson+1); break;
        case 'reverse': [points[0],points[1]]=[points[1],points[0]];draw();break;
        case 'translate': {
          // Один і той самий зсув обох кінців зберігає вектор.
          const shift=translation();
          if(shift) points.slice(2).forEach(p=>{p[0]+=shift[0];p[1]+=shift[1];});
          draw();break;
        }
        case 'reset': changeLesson(lesson);break;
      }
    });
    host.addEventListener('change',e=>{
      if(e.target.name==='vec-preset'){loadPreset(e.target.value);draw();}
      if(e.target.name==='vec-point'){selected=Number(e.target.value);draw();}
      if(e.target.name==='vec-lines'){lines=e.target.checked;draw();}
    });
    const svg=host.querySelector('.vec-board');
    svg.addEventListener('pointerdown',e=>{
      const point=e.target.closest('[data-point]');if(!point)return;
      selected=Number(point.dataset.point);host.querySelector('[name="vec-point"]').value=String(selected);
      drag={index:selected,id:e.pointerId};svg.setPointerCapture(e.pointerId);point.focus();draw();e.preventDefault();
    });
    svg.addEventListener('pointermove',e=>{
      if(!drag||drag.id!==e.pointerId)return;
      const p=new DOMPoint(e.clientX,e.clientY).matrixTransform(svg.getScreenCTM().inverse());
      points[drag.index]=[Math.max(1,Math.min(17,Math.round(p.x/40))),Math.max(1,Math.min(11,Math.round(p.y/40)))];draw();
    });
    const stop=()=>{drag=null;};
    svg.addEventListener('pointerup',stop);svg.addEventListener('pointercancel',stop);svg.addEventListener('lostpointercapture',stop);
    svg.addEventListener('keydown',e=>{
      const point=e.target.closest('[data-point]');if(!point)return;
      const keys={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
      if(!keys[e.key])return;
      selected=Number(point.dataset.point);host.querySelector('[name="vec-point"]').value=String(selected);
      move(selected,...keys[e.key]);e.preventDefault();
    });
    changeLesson(0);
  }
  return {init,classify,length,presets,leave(){drag=null;host=null;}};
})();
DOCS['geometry-vectors']={
  title:'Вектор. Модуль і напрям вектора',
  app:true,
  html:'<div class="vec-lesson"></div>',
  init:VectorLesson.init,
  leave:VectorLesson.leave,
};
