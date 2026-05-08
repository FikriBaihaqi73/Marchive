export function initHybridSlider() {
  console.log('Initializing Hero Slider...');
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.getElementById('prev-hero');
  const nextBtn = document.getElementById('next-hero');
  let current = 0;

  if (!slides.length) return;

  function showSlide(index: number) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      // Synchronize all dot-lines across all slide captions
      const allDotsAtThisIndex = document.querySelectorAll(`.dot-line[data-index="${i}"]`);
      allDotsAtThisIndex.forEach(dot => {
        if (i === index) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    });

    slides[index].classList.add('active');
    current = index;
  }

  // Use a named function for listeners to avoid duplicates if necessary, 
  // though astro:page-load usually handles clean slate well.
  prevBtn?.addEventListener('click', (e) => {
    console.log('Hero Prev Clicked');
    e.preventDefault();
    e.stopPropagation();
    showSlide(current - 1);
  });
  
  nextBtn?.addEventListener('click', (e) => {
    console.log('Hero Next Clicked');
    e.preventDefault();
    e.stopPropagation();
    showSlide(current + 1);
  });

  // Handle clicks on all possible dot positions
  document.querySelectorAll('.dot-line').forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = parseInt((e.currentTarget as HTMLElement).dataset.index || '0');
      showSlide(index);
    });
  });

  // Auto slide - Clear existing if any (basic protection)
  if ((window as any).heroInterval) clearInterval((window as any).heroInterval);
  (window as any).heroInterval = setInterval(() => showSlide(current + 1), 7000);
}

// Support for View Transitions / ClientRouter
document.addEventListener('astro:page-load', initHybridSlider);

// Initial load
if (typeof document !== 'undefined') {
  initHybridSlider();
}
