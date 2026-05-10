// Dashboard helpers
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.stat-card').forEach((c,i)=>{c.classList.add('fade-in');c.style.animationDelay=(i*.08)+'s';});
});