/* =========================================================
   МОДАЛКА
   ========================================================= */
function showModal(title,body){
  const d=document.createElement('div'); d.className='modal-bg'; d.id='modalBg';
  d.innerHTML=`<div class="modal"><h2>${esc(title)}</h2>${body}</div>`;
  d.addEventListener('click',e=>{if(e.target===d)closeModal();});
  document.body.appendChild(d);
}
function closeModal(){ const m=document.getElementById('modalBg'); if(m)m.remove(); }
