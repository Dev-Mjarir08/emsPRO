// Toast notification helper
function showToast(msg,type='primary'){
  let c=document.querySelector('.toast-container-c');
  if(!c){c=document.createElement('div');c.className='toast-container-c';document.body.appendChild(c);}
  const t=document.createElement('div');t.className='toast-c '+type;
  t.innerHTML=`<i class="fa-solid fa-circle-info"></i><span>${msg}</span>`;
  c.appendChild(t);setTimeout(()=>{t.style.opacity=0;setTimeout(()=>t.remove(),400);},3000);
}