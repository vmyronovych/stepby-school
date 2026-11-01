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
  const theory=`<section class="vs-theory"><h2>Запам’ятай</h2><div class="vs-theory-grid">
      <article><h3>Означення</h3><p>Для ненульового ${a} та k ≠ 0 добуток k${a} має модуль |k| · |${a}|. Додатний k зберігає напрям, від’ємний — змінює на протилежний.</p><p>Якщо k = 0 або ${a} = ${v('0')}, добуток є нульовим вектором. Його напрям не визначено.</p></article>
      <article><h3>Властивості</h3><p>Для будь-яких чисел m, n та векторів ${a}, ${b}:</p><p class="vs-identities">m(n${a}) = (mn)${a}<br>(m + n)${a} = m${a} + n${a}<br>m(${a} + ${b}) = m${a} + m${b}</p></article>
      <article><h3>Колінеарність</h3><p>Вектори ${a} та k${a} завжди колінеарні. Якщо ${a} ≠ ${v('0')} і ${b} колінеарний ${a}, існує число k, для якого ${b} = k${a}.</p><p>Наприклад, (−2; 4) = −2 · (1; −2).</p></article></div>
      <p class="vs-source">За матеріалами підручника О. С. Істера «Геометрія. 9 клас», § 9, с. 73–77. Формулювання й навчальні приклади адаптовано для інтерактивного уроку.</p></section>`;
  function diagram(x,y,k){
    const m=model(x,y,k);
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
    return `<svg class="vec-board vs-board" viewBox="0 0 720 480" role="img" aria-label="a = (${fmt(x)}; ${fmt(y)}), k = ${fmt(k)}, b = (${m.result.map(fmt).join('; ')}). ${m.direction}."><defs>${[['a','#6450c8'],['b','#c73535']].map(([id,color])=>`<marker id="vs-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="14" markerHeight="14" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="${color}"/></marker>`).join('')}</defs><rect width="720" height="480" fill="#fafaff"/>${grid}<path d="M20 240H700 M360 20V460" stroke="#a7a3bd" stroke-width="1.5"/><text x="694" y="229">x</text><text x="372" y="25">y</text><text x="339" y="261">O</text><text x="20" y="30">Клітинка = ${spacing} од.</text>${arrow(m.result,'#c73535','b','b',26)}${arrow([x,y],'#6450c8','a','a',-12)}<circle cx="360" cy="240" r="3" fill="#333"/></svg>`;
  }
  return {model,stages,theory,diagram};
})();
DOCS['geometry-vector-scaling']={title:'Множення вектора на число',app:true,
  html:'<div class="vec-lesson vs-lesson"></div>'};
