import { initReveal } from '../utils/animations.js';
import { PHASES, statusColors } from '../data/timelineData.js';

/**
 * Renders the Election Timeline view.
 * @returns {string} HTML string representing the Timeline page
 */

export function render() {
  return `
  <style>
    @keyframes tlFadeUp {
      from { opacity:0; transform:translateY(16px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .phase-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 14px;
      padding: 20px 22px;
      flex: 1;
      margin-bottom: 6px;
      transition: all 0.22s ease;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    /* Local phase-card accent removed as it is now global in tailwind.css */
    .phase-card:hover {
      border-color: rgba(245,158,11,0.4);
      background: var(--color-surface2);
      transform: translateX(4px);
      box-shadow: -4px 0 20px rgba(245,158,11,0.07), 0 8px 24px rgba(245,158,11,0.05);
    }
    .phase-card.phase-open {
      border-color: rgba(245,158,11,0.5);
      background: var(--color-surface);
      box-shadow: 0 0 0 1px rgba(245,158,11,0.1), 0 8px 32px rgba(245,158,11,0.05);
    }
    .phase-detail {
      display: none;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid rgba(245,158,11,0.1);
      font-size: 14px;
      color: var(--color-muted);
      line-height: 1.8;
      animation: tlFadeUp 0.2s ease forwards;
    }
    .tl-number {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-outfit);
      font-weight: 700;
      font-size: 13px;
      flex-shrink: 0;
      margin-top: 18px;
      position: relative;
      z-index: 1;
      transition: all 0.2s;
    }
  </style>
  <div>
    <section style="padding:72px 0 48px;">
      <div class="container">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:999px;padding:5px 14px;margin-bottom:20px;" class="reveal">
          <span style="width:6px;height:6px;border-radius:50%;background:#f59e0b;"></span>
          <span style="font-size:11px;font-weight:700;color:#f59e0b;letter-spacing:0.1em;text-transform:uppercase;">10 Phases</span>
        </div>
        <h1 class="reveal" style="font-size:clamp(30px,5vw,52px);font-weight:800;margin-bottom:14px;line-height:1.15;">
          Election <span class="text-gradient-primary">Timeline</span>
        </h1>
        <p class="reveal" style="color:var(--color-muted);font-size:16px;max-width:500px;line-height:1.7;">
          Every phase of an Indian election — from announcement to result. Click any phase to expand details.
        </p>
      </div>
    </section>

    <section style="padding:0 0 96px;">
      <div class="container">
        <div style="position:relative;">
          <!-- Vertical Tri-color line -->
          <div style="position:absolute;left:19px;top:24px;bottom:24px;width:3px;background:linear-gradient(180deg, var(--color-india-saffron) 0%, #FFFFFF 50%, var(--color-india-green) 100%);border-radius:1px;z-index:0;opacity:0.3;"></div>

          <div style="display:flex;flex-direction:column;gap:4px;">
            ${PHASES.map((p) => {
              const sc = statusColors[p.status];
              return `
              <div style="display:flex;gap:20px;" class="timeline-phase reveal" data-id="${p.id}">
                <!-- Node -->
                <div class="tl-number" style="background:${sc.bg};border:2px solid ${sc.border};color:${sc.color};">
                  ${p.status === 'done' ? '✓' : p.id}
                </div>

                <!-- Card -->
                <div class="phase-card" id="pc-${p.id}">
                  <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">
                    <div style="display:flex;align-items:flex-start;gap:12px;flex:1;">
                      <span style="font-size:22px;margin-top:1px;flex-shrink:0;">${p.icon}</span>
                      <div style="flex:1;">
                        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:5px;">
                          <h3 style="font-size:15px;font-weight:700;font-family:var(--font-outfit);">${p.title}</h3>
                          <span style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:2px 8px;border-radius:999px;background:${sc.bg};color:${sc.color};border:1px solid ${sc.border};">${sc.label}</span>
                        </div>
                        <p style="font-size:13px;color:var(--color-muted);line-height:1.6;">${p.summary}</p>
                      </div>
                    </div>
                    <svg class="phase-chev" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;color:var(--color-dimmed);transition:transform 0.2s;margin-top:3px;"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>

                  <div class="phase-detail" id="pd-${p.id}">
                    ${p.details}
                    ${p.calendarLink ? `
                    <div style="margin-top:16px;">
                      <a href="${p.calendarLink}" target="_blank" aria-label="Add ${p.title} to Calendar" class="btn btn-outline" style="font-size:12px;padding:7px 14px;border-radius:12px;border-color:rgba(245,158,11,0.25);color:#f59e0b;" onclick="event.stopPropagation()">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        Add to Google Calendar
                      </a>
                    </div>` : ''}
                  </div>
                </div>
              </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </section>
  </div>`;
}

export function init() {
  initReveal();
  document.querySelectorAll('.timeline-phase').forEach((phase) => {
    phase.addEventListener('click', () => {
      const card = document.getElementById(`pc-${phase.dataset.id}`);
      const detail = document.getElementById(`pd-${phase.dataset.id}`);
      const chev = card.querySelector('.phase-chev');
      const open = detail.style.display === 'block';
      detail.style.display = open ? 'none' : 'block';
      chev.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
      card.classList.toggle('phase-open', !open);
    });
  });
}
