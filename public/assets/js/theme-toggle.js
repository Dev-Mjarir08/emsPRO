// Theme toggle
(function(){
  const saved=localStorage.getItem('ems-theme')||'light';
  document.documentElement.setAttribute('data-theme',saved);
  document.addEventListener('click',e=>{
    if(e.target.closest('#themeToggle')){
      const cur=document.documentElement.getAttribute('data-theme');
      const nxt=cur==='dark'?'light':'dark';
      document.documentElement.setAttribute('data-theme',nxt);
      localStorage.setItem('ems-theme',nxt);
      const ic=document.querySelector('#themeToggle i');
      if(ic)ic.className=nxt==='dark'?'fa-solid fa-sun':'fa-solid fa-moon';
    }
  });
  document.addEventListener('DOMContentLoaded',()=>{
    setTimeout(()=>{const ic=document.querySelector('#themeToggle i');
      if(ic)ic.className=saved==='dark'?'fa-solid fa-sun':'fa-solid fa-moon';},500);
  });
})();