export function initNavbar() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-links');

  if (!toggle || !nav) return;

  // Reset menu state on new page load
  toggle.classList.remove('open');
  nav.classList.remove('open');
  document.body.style.overflow = '';
  (nav as HTMLElement).style.transition = '';
  (nav as HTMLElement).style.opacity = '';
  (nav as HTMLElement).style.visibility = '';

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu instantly when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Support for View Transitions / ClientRouter
document.addEventListener('astro:page-load', initNavbar);

// Initial load
if (typeof document !== 'undefined') {
  initNavbar();
}
