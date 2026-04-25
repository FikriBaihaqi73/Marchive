export function initHybridSlider() {
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

  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    showSlide(current - 1);
  });
  
  nextBtn?.addEventListener('click', (e) => {
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

  // Auto slide
  const autoSlideInterval = setInterval(() => showSlide(current + 1), 7000);
}

// Auto-init
if (typeof document !== 'undefined') {
  initHybridSlider();
}
