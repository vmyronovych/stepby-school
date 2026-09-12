/* =========================================================
   ДРІБНІ УТИЛІТИ (без залежностей від інструментів)
   ========================================================= */
const app = document.getElementById('app');

function toast(msg){ const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2200); }
function esc(s){ return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])); }
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a||1;}
function fmtNum(x){ if(Number.isInteger(x)) return String(x); return String(Math.round(x*100)/100); }

// Єдина точка перевірки «спокійного режиму»: якщо користувач просив меньше руху,
// оболонка просто не готує польотів і показує фінальний вигляд кроку одразу.
function prefersReducedMotion(){ return !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); }

// Читання значення поля за id — ним інструменти отримують умову (read/readEditor).
const readField = id => document.getElementById(id).value;
