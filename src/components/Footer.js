// Footer component

export function renderFooter() {
  return `
    <footer style="border-top:1px solid rgba(245,158,11,0.12);padding:56px 0 32px;margin-top:40px;position:relative;">
      <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(245,158,11,0.25),transparent);pointer-events:none;"></div>

      <div class="container">
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:48px;margin-bottom:48px;">

          <!-- Brand -->
          <div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
              <div style="width:32px;height:32px;background:linear-gradient(135deg,#d97706,#f59e0b);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 4px 10px rgba(245,158,11,0.25);">🗳️</div>
              <span style="font-family:var(--font-outfit);font-weight:800;font-size:16px;color:var(--color-text);">CivicPath <span style="background:linear-gradient(135deg,#fbbf24,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">AI</span></span>
            </div>
            <p style="font-size:13px;color:var(--color-muted);line-height:1.75;max-width:300px;">
              An AI-powered guide helping every Indian citizen navigate the election process and civic duties with confidence.
            </p>
            <div style="margin-top:20px;display:flex;gap:12px;align-items:center;">
              <a href="tel:1950" style="display:inline-flex;align-items:center;gap:6px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);color:#f59e0b;border-radius:999px;padding:6px 14px;font-size:12px;font-weight:700;letter-spacing:0.05em;text-decoration:none;">☎ 1950</a>
              <span style="font-size:11px;color:var(--color-dimmed);">Free Voter Helpline</span>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <p style="font-family:var(--font-outfit);font-weight:700;font-size:11px;color:#f59e0b;margin-bottom:16px;text-transform:uppercase;letter-spacing:0.1em;">Explore</p>
            <div style="display:flex;flex-direction:column;gap:11px;">
              ${[
      '#timeline:Election Timeline',
      '#guide:Voter Journey',
      '#home:Guided Assistant',
      '#quiz:Civic Quiz',
      '#glossary:Glossary',
      '#resources:Resources',
    ]
      .map((r) => {
        const [href, label] = r.split(':');
        return `<a href="${href}" style="font-size:13px;color:var(--color-muted);transition:color 0.15s;" onmouseover="this.style.color='#f59e0b'" onmouseout="this.style.color='var(--color-muted)'">${label}</a>`;
      })
      .join('')}
            </div>
          </div>

          <!-- Official Links -->
          <div>
            <p style="font-family:var(--font-outfit);font-weight:700;font-size:11px;color:#f59e0b;margin-bottom:16px;text-transform:uppercase;letter-spacing:0.1em;">Official</p>
            <div style="display:flex;flex-direction:column;gap:11px;">
              ${[
      ['https://www.eci.gov.in', 'ECI Website'],
      ['https://voters.eci.gov.in', 'Voter Portal'],
      ['https://www.nvsp.in', 'NVSP'],
      ['https://results.eci.gov.in', 'Election Results'],
    ]
      .map(
        ([href, label]) =>
          `<a href="${href}" target="_blank" rel="noopener" style="font-size:13px;color:var(--color-muted);transition:color 0.15s;" onmouseover="this.style.color='#f59e0b'" onmouseout="this.style.color='var(--color-muted)'">${label} ↗</a>`
      )
      .join('')}
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div style="width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(245,158,11,0.15),transparent);margin-bottom:24px;"></div>

        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <p style="font-size:12px;color:var(--color-dimmed);">
            © 2025 CivicPath AI &nbsp;·&nbsp; Not affiliated with ECI &nbsp;·&nbsp; For educational purposes only
          </p>
          <p style="font-size:12px;color:var(--color-dimmed);">
            Data sourced from <a href="https://www.eci.gov.in" target="_blank" style="color:var(--color-muted);text-decoration:underline;">eci.gov.in</a> &nbsp;·&nbsp; Powered by Gemini
          </p>
        </div>
      </div>

      <style>
        @media (max-width: 768px) {
          footer > .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      </style>
    </footer>
  `;
}
