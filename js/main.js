// ── Footer year ───────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Gallery thumbnail swap + prev/next arrows ──────────────────
const heroImg     = document.getElementById('hero-img');
const heroTitle   = document.getElementById('hero-title');
const heroCaption = document.getElementById('hero-caption');
const thumbsWrap  = document.getElementById('thumbnails');

if (heroImg && thumbsWrap) {
  const buttons = () => Array.from(thumbsWrap.querySelectorAll('button'));

  function activeIndex() {
    return buttons().findIndex(b => b.classList.contains('active'));
  }

  function switchTo(btn) {
    buttons().forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    heroImg.classList.add('fading');
    setTimeout(() => {
      heroImg.src             = btn.dataset.src     || '';
      heroImg.alt             = btn.dataset.title   || '';
      heroTitle.textContent   = btn.dataset.title   || '';
      heroCaption.textContent = btn.dataset.caption || '';
      heroImg.classList.remove('fading');
    }, 300);
  }

  // Set initial caption from the first active thumbnail
  const firstBtn = thumbsWrap.querySelector('button.active');
  if (firstBtn) {
    heroTitle.textContent   = firstBtn.dataset.title   || '';
    heroCaption.textContent = firstBtn.dataset.caption || '';
  }

  // Thumbnail clicks
  thumbsWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn) switchTo(btn);
  });

  // Prev / Next arrows
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const all = buttons();
      const i = activeIndex();
      switchTo(all[(i - 1 + all.length) % all.length]);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const all = buttons();
      const i = activeIndex();
      switchTo(all[(i + 1) % all.length]);
    });
  }
}
