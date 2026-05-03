import { initReveal } from '../utils/animations.js';
import { QUICK_ACTIONS, ECI_PORTALS, STATE_CEOS } from '../data/resourcesData.js';

/**
 * Renders the Resources & Official Links view.
 * @returns {string} HTML string representing the Resources page
 */

export function render() {
  return `
  <style>
    .res-action-card {
      display:block;
      background:var(--color-surface);
      border:1px solid var(--color-border);
      border-radius:14px;
      padding:20px 22px;
      text-decoration:none;
      transition:all 0.2s ease;
      position:relative;
      overflow:hidden;
    }
    /* Local res-action-card accent removed as it is now global in tailwind.css */
    .res-action-card:hover {
      border-color:rgba(245,158,11,0.35);
      transform:translateY(-3px);
      box-shadow:0 12px 36px rgba(0,0,0,0.4);
    }
    .res-portal-card {
      display:block;
      background:var(--color-surface);
      border:1px solid var(--color-border);
      border-radius:12px;
      padding:16px 18px;
      text-decoration:none;
      transition:all 0.2s;
    }
    .res-portal-card:hover {
      border-color:rgba(245,158,11,0.3);
      background:rgba(26,23,16,0.95);
      transform:translateY(-2px);
      box-shadow:0 8px 24px rgba(0,0,0,0.3);
    }
    .res-state-chip {
      display:block;
      background:var(--color-surface);
      border:1px solid var(--color-border);
      border-radius:10px;
      padding:11px 14px;
      font-size:13px;
      color:var(--color-muted);
      text-decoration:none;
      transition:all 0.15s;
    }
    .res-state-chip:hover {
      border-color:rgba(245,158,11,0.35);
      color:#f59e0b;
      background:rgba(245,158,11,0.04);
    }
    .section-label {
      font-family:var(--font-outfit);
      font-weight:700;
      font-size:11px;
      color:#f59e0b;
      letter-spacing:0.1em;
      text-transform:uppercase;
      margin-bottom:18px;
      display:flex;
      align-items:center;
      gap:8px;
    }
    .section-label::after {
      content:'';
      flex:1;
      height:1px;
      background:linear-gradient(90deg,rgba(245,158,11,0.2),transparent);
    }
  </style>
  <div>
    <!-- Hero -->
    <section style="padding:72px 0 48px;">
      <div class="container">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:999px;padding:5px 14px;margin-bottom:20px;" class="reveal">
          <span style="width:6px;height:6px;border-radius:50%;background:#f59e0b;"></span>
          <span style="font-size:11px;font-weight:700;color:#f59e0b;letter-spacing:0.1em;text-transform:uppercase;">Official Links</span>
        </div>
        <h1 class="reveal" style="font-size:clamp(30px,5vw,52px);font-weight:800;margin-bottom:14px;line-height:1.15;">
          Resources &amp; <span class="text-gradient-primary">Official Links</span>
        </h1>
        <p class="reveal" style="color:var(--color-muted);font-size:16px;max-width:500px;line-height:1.7;">
          Direct access to ECI portals, state CEO websites, voter apps, and official helplines.
        </p>
      </div>
    </section>

    <!-- Quick Actions -->
    <section style="padding:0 0 56px;">
      <div class="container">
        <div class="section-label reveal">Quick Actions</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;">
          ${QUICK_ACTIONS.map((a) => `
            <a href="${a.href}" target="_blank" rel="noopener" class="res-action-card resource-card reveal" aria-label="${a.title}" style="--accent:${a.color};">
              <div style="display:flex;align-items:flex-start;gap:14px;">
                <div style="width:44px;height:44px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.15);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">${a.icon}</div>
                <div style="flex:1;">
                  <div style="font-size:14px;font-weight:700;font-family:var(--font-outfit);color:var(--color-text);margin-bottom:4px;">${a.label}</div>
                  <p style="font-size:13px;color:var(--color-muted);line-height:1.5;">${a.desc}</p>
                </div>
                <svg style="margin-top:2px;color:var(--color-dimmed);flex-shrink:0;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- ECI Portals -->
    <section style="padding:0 0 56px;">
      <div class="container">
        <div class="section-label reveal">Official ECI Portals</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;">
          ${ECI_PORTALS.map(([label, href, desc]) => `
            <a href="${href}" target="_blank" rel="noopener" class="res-portal-card reveal" aria-label="${label} Portal">
              <div style="font-size:14px;font-weight:700;font-family:var(--font-outfit);color:var(--color-text);margin-bottom:5px;display:flex;justify-content:space-between;align-items:center;">
                <span>${label}</span>
                <span style="color:#f59e0b;font-size:12px;">↗</span>
              </div>
              <div style="font-size:12px;color:var(--color-muted);line-height:1.5;">${desc}</div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- State CEOs -->
    <section style="padding:0 0 56px;">
      <div class="container">
        <div class="section-label reveal">State &amp; UT Chief Electoral Officers (Verified Links)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:8px;">
          ${STATE_CEOS.map(([state, href]) => `
            <a href="${href}" target="_blank" rel="noopener" class="res-state-chip reveal" aria-label="Portal for ${state}">${state} ↗</a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Helpline Banner -->
    <section style="padding:0 0 96px;">
      <div class="container">
        <div class="reveal" style="position:relative;background:var(--color-surface);border:1px solid rgba(245,158,11,0.2);border-radius:20px;padding:56px 40px;text-align:center;overflow:hidden;">
          <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(245,158,11,0.06),transparent 70%);pointer-events:none;"></div>
          <div style="font-size:52px;margin-bottom:16px;">☎️</div>
          <h2 style="font-size:clamp(22px,3vw,32px);font-weight:800;margin-bottom:10px;">
            Voter Helpline: <span class="text-gradient-primary">1950</span>
          </h2>
          <p style="color:var(--color-muted);font-size:15px;margin-bottom:28px;max-width:440px;margin-left:auto;margin-right:auto;line-height:1.7;">
            Free toll-free helpline available in multiple languages for all election-related queries, complaints, and voter registration assistance.
          </p>
          <a href="tel:1950" class="btn btn-primary" style="font-size:15px;padding:14px 36px;border-radius:14px;">📞 Call 1950 Now</a>
        </div>
      </div>
    </section>
  </div>`;
}

export function init() {
  initReveal();
}
