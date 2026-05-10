// Table search & filter
function bindTableSearch(inputId,tableId){
  const inp=document.getElementById(inputId),tbl=document.getElementById(tableId);
  if(!inp||!tbl)return;
  inp.addEventListener('input',()=>{
    const q=inp.value.toLowerCase();
    tbl.querySelectorAll('tbody tr').forEach(r=>{
      r.style.display=r.textContent.toLowerCase().includes(q)?'':'none';
    });
  });
}
document.addEventListener('DOMContentLoaded',()=>{
  bindTableSearch('tableSearch','dataTable');
  // Global navbar search proxies to table search
  setTimeout(()=>{
    const g=document.getElementById('globalSearch');
    if(g)g.addEventListener('input',e=>{
      const ts=document.getElementById('tableSearch');
      if(ts){ts.value=e.target.value;ts.dispatchEvent(new Event('input'));}
    });
  },800);
});