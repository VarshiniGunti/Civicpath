// App entry point

import { renderNavbar, initNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { register, initRouter } from './components/Router.js';

// Mount shell
document.getElementById('navbar').innerHTML = renderNavbar();
document.getElementById('footer-container').innerHTML = renderFooter();
initNavbar();

// Register routes (lazy-loaded)
register('#home', () => import('./pages/Home.js'));
register('#timeline', () => import('./pages/Timeline.js'));
register('#guide', () => import('./pages/Guide.js'));
register('#evm', () => import('./pages/EvmSimulator.js'));

register('#quiz', () => import('./pages/Quiz.js'));
register('#glossary', () => import('./pages/Glossary.js'));
register('#resources', () => import('./pages/Resources.js'));

// Start router
initRouter();

// Re-init Lucide icons after each navigation
const observer = new MutationObserver(() => {
  if (window.lucide) window.lucide.createIcons();
});
observer.observe(document.getElementById('main-content'), { childList: true });
