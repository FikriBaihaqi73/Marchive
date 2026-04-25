export function initPreloader() {
  const preloader = document.getElementById('preloader');
  const loadingBox = document.getElementById('loading-box');
  const enterBtn = document.getElementById('enter-btn');
  const tapes = document.querySelectorAll('.tape-item');

  // Jika sudah pernah masuk di sesi ini, jangan jalankan logika apapun
  if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('marchive_visited')) {
    if (preloader) preloader.style.display = 'none';
    return;
  }

  // Tahap 1: Selesai Loading, tampilkan tombol
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loadingBox) loadingBox.classList.add('fade-out');
      setTimeout(() => {
        if (enterBtn) enterBtn.classList.remove('hidden');
      }, 500);
    }, 2000); 
  });

  // Tahap 2: Klik tombol, hancurkan pita
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      sessionStorage.setItem('marchive_visited', 'true');

      tapes.forEach((tape) => {
        tape.classList.add('snapped');
      });

      enterBtn.classList.add('hidden');
      
      setTimeout(() => {
        if (preloader) preloader.classList.add('completed');
        setTimeout(() => {
          if (preloader) preloader.style.display = 'none';
        }, 1000);
      }, 600);
    });
  }
}

// Auto-init
if (typeof document !== 'undefined') {
  initPreloader();
}
