// ПРОПОРЦІЯ: своя частина (записати → навхрест → перемножити) + делегування лінійному ядру.
function mulLin(u,v){ if(u.a && v.a) return null; return {a:u.a*v.b + v.a*u.b, b:u.b*v.b}; } // (лінійне × лінійне), null якщо x²
function buildProportion(nA,dA,nC,dC){
  const clean=s=>String(s==null?'':s).trim();
  nA=clean(nA); dA=clean(dA); nC=clean(nC); dC=clean(dC);
  if(!nA||!dA||!nC||!dC) throw 'Заповніть усі чотири частини пропорції. Приклад: x : 3 = 4 : 6.';
  let A,Bd,C,Dd;
  try{ A=parseSide(nA); Bd=parseSide(dA); C=parseSide(nC); Dd=parseSide(dC); }
  catch(e){ throw 'Кожна частина має бути числом або доданком з x (напр. 5x, 4, 2x). Приклад: x : 3 = 4 : 6.'; }
  // a:b = c:d  ⇒  добуток крайніх = добуток середніх:  a·d = c·b
  const P1=mulLin(A,Dd), P2=mulLin(C,Bd);
  if(!P1||!P2) throw 'Тут x множиться на x — виходить квадратне рівняння, а не лінійне. Такі поки не підтримуються.';
  let pid=0; const T=(t,cls)=>({id:'p'+(pid++), t, cls}); const OP=t=>T(t,'op'); const EQ=()=>({id:'p'+(pid++), t:'=', cls:'eq-eq'});
  const rows=[];
  // 1) сама пропорція:  nA : dA = nC : dC
  rows.push({tokens:[T(nA), OP(':'), T(dA), EQ(), T(nC), OP(':'), T(dC)], type:'write',
    text:'Записуємо пропорцію. Головна властивість: добуток крайніх членів дорівнює добутку середніх.'});
  // 2) множимо навхрест:  nA · dC = nC · dA
  rows.push({tokens:[T(nA), OP('·'), T(dC), EQ(), T(nC), OP('·'), T(dA)], type:'write', note:'навхрест',
    text:`Множимо навхрест: крайні ${nA} і ${dC}, середні ${dA} і ${nC}. Отримуємо ${nA}·${dC} = ${nC}·${dA}.`});
  // 3) далі — звичайне лінійне рівняння (перевикористовуємо лінійне ядро)
  const lin=buildLinearRows(P1,P2);
  lin[0].text='Перемножуємо — і виходить звичайне лінійне рівняння. Далі розв’язуємо його як завжди.';
  return {rows:[...rows, ...lin]};
}
