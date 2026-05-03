import { initReveal } from '../utils/animations.js';
import { TERMS } from '../data/glossaryData.js';

/**
 * Renders the Election Glossary view.
 * @returns {string} HTML string representing the Glossary page
 */
export function render() {
  return `
  <style>
    @keyframes glossaryIn {
      from { opacity:0; transform:translateY(10px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .glossary-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 14px;
      padding: 20px 22px;
      transition: all 0.2s ease;
      animation: glossaryIn 0.25s ease forwards;
      position: relative;
      overflow: hidden;
    }
    /* Local glossary-card accent removed as it is now global in tailwind.css */
    .glossary-card:hover {
      border-color: rgba(245,158,11,0.35);
      transform: translateY(-3px);
      box-shadow: 0 12px 36px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,158,11,0.05);
    }
    .glossary-search-wrap {
      position:relative;
      max-width:520px;
      margin-bottom:36px;
    }
    .glossary-search-wrap svg {
      position:absolute;
      left:14px;
      top:50%;
      transform:translateY(-50%);
      color:var(--color-dimmed);
      pointer-events:none;
    }
    #glossary-search {
      width:100%;
      background:var(--color-surface);
      border:1px solid rgba(245,158,11,0.2);
      border-radius:12px;
      color:var(--color-text);
      font-family:var(--font-inter);
      font-size:14px;
      padding:13px 14px 13px 44px;
      outline:none;
      transition:border-color 0.2s, box-shadow 0.2s;
    }
    #glossary-search:focus {
      border-color:rgba(245,158,11,0.5);
      box-shadow:0 0 0 3px rgba(245,158,11,0.08);
    }
    #glossary-search::placeholder { color:var(--color-dimmed); }
  </style>
  <div>
    <section style="padding:72px 0 48px;">
      <div class="container">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:999px;padding:5px 14px;margin-bottom:20px;" class="reveal">
          <span style="width:6px;height:6px;border-radius:50%;background:#f59e0b;"></span>
          <span style="font-size:11px;font-weight:700;color:#f59e0b;letter-spacing:0.1em;text-transform:uppercase;">${TERMS.length} Terms</span>
        </div>
        <h1 class="reveal" style="font-size:clamp(30px,5vw,52px);font-weight:800;margin-bottom:14px;line-height:1.15;">
          Election <span class="text-gradient-primary">Glossary</span>
        </h1>
        <p class="reveal" style="color:var(--color-muted);font-size:16px;max-width:500px;line-height:1.7;">
          Decode every election term — with Hindi translations. Search to find what you need.
        </p>
      </div>
    </section>

    <section style="padding:0 0 96px;">
      <div class="container">
        <!-- Search -->
        <div class="glossary-search-wrap reveal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input id="glossary-search" placeholder="Search terms in English or हिंदी…" aria-label="Search glossary terms" autocomplete="off" />
        </div>

        <!-- Terms grid -->
        <div id="terms-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:14px;">
          ${TERMS.map((t) => `
            <div class="glossary-card reveal" data-term="${t.term.toLowerCase()} ${t.hindi.toLowerCase()} ${t.def.toLowerCase()}">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;gap:8px;">
                <h3 style="font-size:15px;font-weight:700;font-family:var(--font-outfit);color:var(--color-text);">${t.term}</h3>
                <span style="font-size:13px;color:#f59e0b;font-family:var(--font-indic);white-space:nowrap;opacity:0.85;">${t.hindi}</span>
              </div>
              <p style="font-size:13px;color:var(--color-muted);line-height:1.75;">${t.def}</p>
            </div>
          `).join('')}
        </div>

        <div id="no-results" style="display:none;text-align:center;padding:64px 24px;">
          <div style="font-size:40px;margin-bottom:12px;">🔍</div>
          <p style="color:var(--color-muted);font-size:15px;">No terms match your search. Try a different keyword.</p>
        </div>
      </div>
    </section>
  </div>`;
}

export function init() {
  initReveal();
  const search = document.getElementById('glossary-search');
  const cards = document.querySelectorAll('#terms-grid .glossary-card');
  const noRes = document.getElementById('no-results');

  search.addEventListener('input', () => {
    const q = search.value.toLowerCase().trim();
    let visible = 0;
    cards.forEach((card) => {
      const match = !q || card.dataset.term.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    noRes.style.display = visible === 0 ? 'block' : 'none';
  });
}
