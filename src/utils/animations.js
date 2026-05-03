// Animation helpers

// Scroll-reveal using IntersectionObserver
export function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

// Animated number counter
export function animateCount(el, target, duration = 1600) {
  const start = performance.now();
  const isDecimal = String(target).includes('.');
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = isDecimal
      ? (ease * target).toFixed(1)
      : Math.floor(ease * target).toLocaleString('en-IN');
    el.textContent = value;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// Trigger all stat counters on page
export function initCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCount(el, target);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
  });
}

// Confetti burst
export function confetti(count = 60) {
  const colors = ['#f97316', '#22c55e', '#3b82f6', '#8b5cf6', '#fcd34d', '#ec4899'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `
      left:${Math.random() * 100}vw;
      top:-10px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${1.5 + Math.random() * 2}s;
      animation-delay:${Math.random() * 0.5}s;
      width:${6 + Math.random() * 6}px;
      height:${6 + Math.random() * 6}px;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

// Accordion toggler (delegated)
export function initAccordions(container = document) {
  container.querySelectorAll('.accordion-header').forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      // Close all siblings
      item
        .closest('[data-accordion-group]')
        ?.querySelectorAll('.accordion-item')
        .forEach((i) => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}
