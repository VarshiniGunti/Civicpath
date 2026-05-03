// Navbar component

const NAV_ITEMS = [
  { label: 'Home', route: '#home' },
  { label: 'Timeline', route: '#timeline' },
  { label: 'Guide', route: '#guide' },
  { label: 'Polling Demo', route: '#evm' },
  { label: 'Quiz', route: '#quiz' },
  { label: 'Glossary', route: '#glossary' },
  { label: 'Resources', route: '#resources' },
];

export function renderNavbar() {
  return `
    <header style="position:sticky;top:0;z-index:100;background:var(--header-bg);backdrop-filter:blur(20px);border-bottom:1px solid rgba(245,158,11,0.12);transition:background 0.3s ease;">
      <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(245,158,11,0.2),transparent);pointer-events:none;"></div>
      <div class="container" style="display:flex;align-items:center;justify-content:space-between;height:62px;">

        <!-- Logo -->
        <a href="#home" aria-label="Go to Home" onclick="window.resetHomeChat?.();" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
          <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg, var(--color-india-saffron), #d97706);display:flex;align-items:center;justify-content:center;color:white;box-shadow:0 4px 12px rgba(245,158,11,0.3);">
            <i data-lucide="vote" style="width:20px;height:20px;"></i>
          </div>
          <span style="font-family:var(--font-outfit);font-weight:800;font-size:17px;color:var(--color-text);letter-spacing:-0.3px;">CivicPath <span class="text-gradient-primary">AI</span></span>
        </a>

        <!-- Desktop Nav -->
        <nav id="desktop-nav" style="display:flex;align-items:center;gap:32px;" aria-label="Main navigation">
          ${NAV_ITEMS.map((i) => `
            <a href="${i.route}" class="nav-link" data-route="${i.route}" ${i.route === '#home' ? `onclick="window.resetHomeChat?.();"` : ''}>${i.label}</a>
          `).join('')}
        </nav>

        <!-- Right: Theme Toggle + Helpline pill + Mobile menu -->
        <div style="display:flex;align-items:center;gap:12px;">
          <!-- Theme Toggle -->
          <button id="theme-toggle-btn" aria-label="Toggle Theme" style="background:none;border:none;cursor:pointer;color:var(--color-text);display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:var(--color-surface2);border:1px solid var(--color-border);transition:all 0.2s;">
            <i data-lucide="moon" id="theme-icon-dark" style="width:18px;height:18px;display:none;"></i>
            <i data-lucide="sun" id="theme-icon-light" style="width:18px;height:18px;display:none;"></i>
          </button>
          
          <a href="tel:1950" aria-label="Call Helpline 1950" style="display:flex;align-items:center;gap:6px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);color:#f59e0b;border-radius:999px;padding:5px 14px;font-size:12px;font-weight:700;letter-spacing:0.03em;text-decoration:none;transition:all 0.2s;" onmouseover="this.style.background='rgba(245,158,11,0.18)'" onmouseout="this.style.background='rgba(245,158,11,0.1)'">
            ☎ 1950
          </a>
          <button id="mobile-menu-btn" aria-label="Open menu" style="display:none;background:none;border:none;cursor:pointer;color:var(--color-muted);padding:4px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>

      <!-- Mobile Drawer -->
      <div id="mobile-drawer" style="display:none;flex-direction:column;padding:16px 24px 24px;gap:4px;border-top:1px solid rgba(245,158,11,0.12);background:var(--drawer-bg);transition:background 0.3s ease;">
        ${NAV_ITEMS.map((i) => `
          <a href="${i.route}" class="nav-link mobile-nav-link" data-route="${i.route}" ${i.route === '#home' ? `onclick="window.resetHomeChat?.();"` : ''}
             style="padding:13px 0;font-size:15px;border-bottom:1px solid rgba(245,158,11,0.08);">${i.label}</a>
        `).join('')}
        <a href="tel:1950" aria-label="Call Helpline 1950" style="margin-top:12px;display:flex;align-items:center;justify-content:center;gap:6px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);color:#f59e0b;border-radius:12px;padding:12px;font-size:14px;font-weight:700;text-decoration:none;">☎ Call Helpline 1950</a>
      </div>
    </header>

    <style>
      @media (max-width: 860px) {
        #desktop-nav { display: none !important; }
        #mobile-menu-btn { display: flex !important; }
      }
    </style>
  `;
}

export function initNavbar() {
  const btn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');

  btn?.addEventListener('click', () => {
    const open = drawer.style.display === 'flex';
    drawer.style.display = open ? 'none' : 'flex';
  });

  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      drawer.style.display = 'none';
    });
  });

  // Theme Toggle Logic
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const darkIcon = document.getElementById('theme-icon-dark');
  const lightIcon = document.getElementById('theme-icon-light');

  function updateThemeIcons() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (darkIcon && lightIcon) {
      if (isDark) {
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'block';
      } else {
        darkIcon.style.display = 'block';
        lightIcon.style.display = 'none';
      }
    }
  }

  // Initial icon state
  updateThemeIcons();

  themeToggleBtn?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    updateThemeIcons();
  });
}
