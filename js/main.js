// ── Footer year ───────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Gallery: crossfade + dot indicators ───────────────────────
const hero        = document.getElementById('gallery-hero');
const dotsWrap    = document.getElementById('dots');
const heroTitle   = document.getElementById('hero-title');
const heroCaption = document.getElementById('hero-caption');

if (hero && dotsWrap) {
  const dots = () => Array.from(dotsWrap.querySelectorAll('.dot'));
  let isAnimating = false;

  function activeIndex() {
    return dots().findIndex(d => d.classList.contains('active'));
  }

  function switchTo(dot) {
    if (isAnimating || dot.classList.contains('active')) return;
    const currentImg = hero.querySelector('.hero-slide.active');
    if (!currentImg) return;

    isAnimating = true;

    // Build the incoming image (starts invisible, stacked on top)
    const newImg = document.createElement('img');
    newImg.className = 'hero-slide';
    newImg.src = dot.dataset.src || '';
    newImg.alt = dot.dataset.title || '';
    hero.appendChild(newImg);

    // Force reflow so opacity:0 is painted before transitioning
    newImg.getBoundingClientRect();

    // Crossfade: fade in new, fade out current
    newImg.classList.add('active');
    currentImg.classList.remove('active');

    // Update caption
    heroTitle.textContent   = dot.dataset.title   || '';
    heroCaption.textContent = dot.dataset.caption || '';

    // Update active dot
    dots().forEach(d => d.classList.remove('active'));
    dot.classList.add('active');

    // Remove old image after transition completes
    currentImg.addEventListener('transitionend', () => {
      currentImg.remove();
      isAnimating = false;
    }, { once: true });
  }

  // Set initial caption
  const firstDot = dotsWrap.querySelector('.dot.active');
  if (firstDot) {
    heroTitle.textContent   = firstDot.dataset.title   || '';
    heroCaption.textContent = firstDot.dataset.caption || '';
  }

  // Dot clicks
  dotsWrap.addEventListener('click', (e) => {
    const dot = e.target.closest('.dot');
    if (dot) switchTo(dot);
  });

  // Prev / Next arrows
  document.getElementById('prev-btn')?.addEventListener('click', () => {
    const all = dots();
    switchTo(all[(activeIndex() - 1 + all.length) % all.length]);
  });

  document.getElementById('next-btn')?.addEventListener('click', () => {
    const all = dots();
    switchTo(all[(activeIndex() + 1) % all.length]);
  });
}
