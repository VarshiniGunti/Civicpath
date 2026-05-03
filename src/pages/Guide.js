import { initReveal } from '../utils/animations.js';
import { CHAPTERS } from '../data/guideData.js';

/**
 * Renders the Step-by-Step Guide view.
 * @returns {string} HTML string representing the Guide page
 */

export function render() {
  return `
  <style>
    .guide-accordion {
      border: 1px solid var(--color-border);
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 10px;
      background: var(--color-surface);
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .guide-accordion.open {
      border-color: rgba(245,158,11,0.35);
      box-shadow: 0 0 0 1px rgba(245,158,11,0.05);
    }
    .guide-acc-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 22px;
      cursor: pointer;
      gap: 12px;
      user-select: none;
      transition: background 0.15s;
    }
    .guide-acc-header:hover { background: rgba(245,158,11,0.03); }
    .guide-acc-body {
      display: none;
      padding: 18px 22px 22px;
      border-top: 1px solid rgba(245,158,11,0.08);
      color: var(--color-muted);
      font-size: 14px;
      line-height: 1.8;
    }
    .guide-accordion.open .guide-acc-body { display: block; }
    .guide-chev {
      transition: transform 0.2s ease;
      color: var(--color-dimmed);
      flex-shrink: 0;
    }
    .guide-accordion.open .guide-chev { transform: rotate(180deg); color: #f59e0b; }
    .guide-icon-bubble {
      width: 38px; height: 38px;
      border-radius: 10px;
      background: rgba(245,158,11,0.08);
      border: 1px solid rgba(245,158,11,0.15);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; flex-shrink: 0;
    }
    .section-label {
      font-family:var(--font-outfit);
      font-size:11px;
      font-weight:700;
      color:#f59e0b;
      letter-spacing:0.1em;
      text-transform:uppercase;
      display:flex;
      align-items:center;
      gap:8px;
      margin-bottom:20px;
    }
    .section-label::after {
      content:'';flex:1;height:1px;
      background:linear-gradient(90deg,rgba(245,158,11,0.2),transparent);
    }
  </style>
  <div>
    <!-- Hero -->
    <section style="padding:72px 0 48px;">
      <div class="container">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:999px;padding:5px 14px;margin-bottom:20px;" class="reveal">
          <span style="width:6px;height:6px;border-radius:50%;background:#f59e0b;"></span>
          <span style="font-size:11px;font-weight:700;color:#f59e0b;letter-spacing:0.1em;text-transform:uppercase;">8 Chapters</span>
        </div>
        <h1 class="reveal" style="font-size:clamp(30px,5vw,52px);font-weight:800;margin-bottom:14px;line-height:1.15;">
          Voter's <span class="text-gradient-primary">Step-by-Step</span> Guide
        </h1>
        <p class="reveal" style="color:var(--color-muted);font-size:16px;max-width:500px;line-height:1.7;">
          Everything from checking eligibility to casting your vote — one clear step at a time.
        </p>
      </div>
    </section>

    <!-- Accordion Chapters -->
    <section style="padding:0 0 96px;">
      <div class="container" style="max-width:780px;">
        <div class="section-label reveal">All Chapters</div>

        <div data-guide-accordion>
          ${CHAPTERS.map((c, idx) => `
            <div class="guide-accordion reveal" id="${c.id}">
              <div class="guide-acc-header" data-guide-toggle="${c.id}">
                <div style="display:flex;align-items:center;gap:14px;flex:1;">
                  <div class="guide-icon-bubble">${c.icon}</div>
                  <div>
                    <span style="font-size:10px;color:var(--color-dimmed);font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">Chapter ${idx + 1}</span>
                    <div style="font-family:var(--font-outfit);font-weight:700;font-size:15px;color:var(--color-text);margin-top:1px;">${c.title}</div>
                  </div>
                </div>
                <svg class="guide-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              <div class="guide-acc-body">${c.content}</div>
            </div>
          `).join('')}
        </div>

        <!-- CTA -->
        <div class="reveal" style="margin-top:40px;background:var(--color-surface);border:1px solid rgba(245,158,11,0.2);border-radius:16px;padding:28px 32px;position:relative;overflow:hidden;">
          <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(245,158,11,0.04),transparent 60%);pointer-events:none;"></div>
          <p style="font-size:15px;margin-bottom:16px;font-weight:600;">Still have questions about the process?</p>
          <a href="#home" class="btn btn-primary" style="border-radius:12px;">Ask CivicPath AI →</a>
        </div>
      </div>
    </section>
  </div>`;
}

/**
 * Initializes interactions for the Guide page.
 * Sets up reveal animations and accordion toggles.
 */
export function init() {
  initReveal();

  document.querySelectorAll('[data-guide-toggle]').forEach((header) => {
    header.addEventListener('click', () => {
      const id = header.dataset.guideToggle;
      const item = document.getElementById(id);
      const isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
    });
  });
}
