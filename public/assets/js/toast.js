// Toast & Flash Alert Auto-Dismiss Handler (5 Seconds)
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function (alert) {
      alert.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      alert.style.opacity = '0';
      alert.style.transform = 'translateY(-10px)';
      setTimeout(function () {
        if (typeof bootstrap !== 'undefined' && bootstrap.Alert) {
          const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
          if (bsAlert) bsAlert.close();
        } else {
          alert.remove();
        }
      }, 500);
    });
  }, 3000);
});

// Toast notification helper
function showToast(msg, type = 'primary') {
  let c = document.querySelector('.toast-container-c');
  if (!c) {
    c = document.createElement('div');
    c.className = 'toast-container-c';
    document.body.appendChild(c);
  }
  const t = document.createElement('div');
  t.className = 'toast-c ' + type;
  t.innerHTML = `<i class="fa-solid fa-circle-info"></i><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => {
    t.style.opacity = 0;
    setTimeout(() => t.remove(), 400);
  }, 3000);
}