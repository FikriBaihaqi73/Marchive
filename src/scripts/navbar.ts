export function initNavbar() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-links');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu instantly when a link is clicked to avoid navigation lag
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      // Force instant hide without any transition
      (nav as HTMLElement).style.transition = 'none';
      (nav as HTMLElement).style.opacity = '0';
      (nav as HTMLElement).style.visibility = 'hidden';
      
      // Reset body scroll lock
      document.body.style.overflow = '';
    });
  });
}



// Auto-init
if (typeof document !== 'undefined') {
  initNavbar();
}
