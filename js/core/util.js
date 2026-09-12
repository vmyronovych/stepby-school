const app = document.getElementById('app');
function toast(msg){ const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2200); }
function esc(s){ return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])); }
/* ---------- helpers для колонкового рендера ---------- */
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a||1;}
function fmtNum(x){ if(Number.isInteger(x)) return String(x); const g=gcd(Math.round(x*1000000),1000000); return String(Math.round(x*100)/100); }
function signed(x){ return x<0?`− ${Math.abs(x)}`:`+ ${x}`; }
