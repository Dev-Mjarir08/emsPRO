// Sidebar logic - load partials and handle interactions
async function loadPartial(id,url){
  const el=document.getElementById(id);if(!el)return;
  try{const r=await fetch(url);el.innerHTML=await r.text();}catch(e){console.error('Load fail',url);}
}
async function initLayout(prefix=''){
  await Promise.all([
    loadPartial('sidebar-mount',prefix+'partials/sidebar.html'),
    loadPartial('navbar-mount',prefix+'partials/navbar.html'),
    loadPartial('footer-mount',prefix+'partials/footer.html')
  ]);
  // Fix relative paths in sidebar/navbar to use prefix
  document.querySelectorAll('#sidebar-mount a, #navbar-mount a').forEach(a=>{
    const h=a.getAttribute('href');
    if(h && !h.startsWith('#') && !h.startsWith('http') && !h.startsWith('/')){
      a.setAttribute('href',prefix+ (prefix.includes('..')?'pages/':'pages/') +h);
      // adjust if already had path; below logic ensures correct nesting
    }
  });
  bindSidebar();
}
function bindSidebar(){
  const sidebar=document.getElementById('sidebar');
  const toggle=document.getElementById('menuToggle');
  const backdrop=document.getElementById('sidebarBackdrop');
  if(toggle){toggle.addEventListener('click',()=>{sidebar.classList.toggle('show');backdrop.classList.toggle('show');});}
  if(backdrop){backdrop.addEventListener('click',()=>{sidebar.classList.remove('show');backdrop.classList.remove('show');});}
  document.querySelectorAll('.has-sub > a').forEach(a=>{
    a.addEventListener('click',e=>{
      if(a.getAttribute('href')==='#'){e.preventDefault();a.parentElement.classList.toggle('open');}
    });
  });
  // Reapply active
  const path=location.pathname.split('/').pop().replace('.html','')||'index';
  document.querySelectorAll('.sidebar-menu a').forEach(a=>{
    const href=(a.getAttribute('href')||'').split('/').pop().replace('.html','');
    if(href===path){a.classList.add('active');
      const sub=a.closest('.has-sub');if(sub)sub.classList.add('open');}
  });
}