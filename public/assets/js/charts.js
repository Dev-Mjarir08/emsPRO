// Chart.js initializations
function getChartColors(){
  const css=getComputedStyle(document.documentElement);
  return{p:'#4f46e5',s:'#06b6d4',ok:'#10b981',w:'#f59e0b',d:'#ef4444',
    grid:css.getPropertyValue('--border').trim()||'#e2e8f0',text:css.getPropertyValue('--text').trim()||'#1e293b'};
}
function initAttendanceChart(id){
  const el=document.getElementById(id);if(!el||typeof Chart==='undefined')return;
  const c=getChartColors();
  new Chart(el,{type:'line',data:{labels:['Mon','Tue','Wed','Thu','Fri','Sat'],
    datasets:[{label:'Present',data:[145,152,148,155,150,120],borderColor:c.p,backgroundColor:c.p+'22',tension:.4,fill:true},
              {label:'Absent',data:[15,8,12,5,10,40],borderColor:c.d,backgroundColor:c.d+'22',tension:.4,fill:true}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:c.text}}},
      scales:{x:{grid:{color:c.grid},ticks:{color:c.text}},y:{grid:{color:c.grid},ticks:{color:c.text}}}}});
}
function initSalaryChart(id){
  const el=document.getElementById(id);if(!el)return;const c=getChartColors();
  new Chart(el,{type:'bar',data:{labels:['Jan','Feb','Mar','Apr','May','Jun'],
    datasets:[{label:'Total Salary ($K)',data:[120,135,128,142,150,165],backgroundColor:c.s,borderRadius:6}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:c.text}}},
      scales:{x:{grid:{color:c.grid},ticks:{color:c.text}},y:{grid:{color:c.grid},ticks:{color:c.text}}}}});
}
function initDepartmentChart(id){
  const el=document.getElementById(id);if(!el)return;const c=getChartColors();
  new Chart(el,{type:'doughnut',data:{labels:['Engineering','Sales','HR','Marketing','Support'],
    datasets:[{data:[45,28,12,18,22],backgroundColor:[c.p,c.s,c.ok,c.w,c.d],borderWidth:0}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{color:c.text}}}}});
}
function initLeaveChart(id){
  const el=document.getElementById(id);if(!el)return;const c=getChartColors();
  new Chart(el,{type:'pie',data:{labels:['Approved','Pending','Rejected'],
    datasets:[{data:[64,18,12],backgroundColor:[c.ok,c.w,c.d]}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{color:c.text}}}}});
}
function initGrowthChart(id){
  const el=document.getElementById(id);if(!el)return;const c=getChartColors();
  new Chart(el,{type:'line',data:{labels:['2020','2021','2022','2023','2024','2025','2026'],
    datasets:[{label:'Employees',data:[45,68,95,120,148,175,210],borderColor:c.ok,backgroundColor:c.ok+'33',tension:.4,fill:true}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:c.text}}},
      scales:{x:{grid:{color:c.grid},ticks:{color:c.text}},y:{grid:{color:c.grid},ticks:{color:c.text}}}}});
}
function initPerformanceChart(id){
  const el=document.getElementById(id);if(!el)return;const c=getChartColors();
  new Chart(el,{type:'radar',data:{labels:['Productivity','Quality','Teamwork','Innovation','Punctuality'],
    datasets:[{label:'Team Avg',data:[85,78,92,70,88],borderColor:c.p,backgroundColor:c.p+'33'}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:c.text}}},
      scales:{r:{angleLines:{color:c.grid},grid:{color:c.grid},pointLabels:{color:c.text}}}}});
}