// Lightweight hash-based SPA router

const routes = {};
let currentPage = null;

export function register(hash, loader) {
  routes[hash] = loader;
}

export async function navigate(hash) {
  const route = routes[hash] || routes['#home'];
  const main = document.getElementById('main-content');

  main.classList.remove('page-enter');
  void main.offsetWidth; // force reflow

  const { render, init } = await route();
  main.innerHTML = render();
  main.classList.add('page-enter');

  if (init) init();

  // Hide footer on pages other than home
  const footer = document.getElementById('footer-container');
  if (footer) {
    const isHome = hash === '#home' || !hash || !routes[hash];
    footer.style.display = isHome ? 'block' : 'none';
  }

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach((l) => {
    l.classList.toggle('active', l.dataset.route === hash);
  });

  currentPage = hash;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

export function initRouter() {
  const go = () => navigate(window.location.hash || '#home');

  window.addEventListener('hashchange', go);
  go();
}

export function getCurrentPage() {
  return currentPage;
}
