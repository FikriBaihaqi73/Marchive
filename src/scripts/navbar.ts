export function initNavbar() {
  console.log('Initializing Navbar...');
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-links');

  if (!toggle || !nav) {
    console.warn('Navbar elements not found!');
    return;
  }

  // Reset menu state on new page load
  toggle.classList.remove('open');
  nav.classList.remove('open');
  document.body.style.overflow = '';

  // Remove old listeners by cloning (to be safe with persistent elements)
  const newToggle = toggle.cloneNode(true) as HTMLElement;
  toggle.parentNode?.replaceChild(newToggle, toggle);

  newToggle.addEventListener('click', () => {
    console.log('Hamburger clicked');
    newToggle.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when links are clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      newToggle.classList.remove('open');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Support for View Transitions / ClientRouter
// This event fires on initial load AND every subsequent navigation
document.addEventListener('astro:page-load', initNavbar);
