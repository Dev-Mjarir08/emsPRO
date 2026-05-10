// EMS Global App JS
document.addEventListener('DOMContentLoaded',()=>{
  // Page loader hide
  const loader=document.getElementById('pageLoader');
  if(loader){setTimeout(()=>loader.classList.add('hide'),300);}
  // Active link highlight
  const path=location.pathname.split('/').pop().replace('.html','')||'index';
  document.querySelectorAll('.sidebar-menu a').forEach(a=>{
    const href=(a.getAttribute('href')||'').split('/').pop().replace('.html','');
    if(href===path){a.classList.add('active');
      const sub=a.closest('.has-sub');if(sub)sub.classList.add('open');}
  });
});