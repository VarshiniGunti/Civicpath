import { initReveal } from '../utils/animations.js';

const CANDIDATES = [
  { id: 1, name: 'Apple Party', symbol: '🍎' },
  { id: 2, name: 'Mango Party', symbol: '🥭' },
  { id: 3, name: 'Banana Party', symbol: '🍌' },
  { id: 4, name: 'Grapes Party', symbol: '🍇' },
  { id: 5, name: 'NOTA', symbol: '❌' },
];

export function render() {
  return `
    <style>
      .evm-container {
        display: flex;
        flex-direction: row;
        gap: 40px;
        justify-content: center;
        align-items: flex-start;
        margin-top: 40px;
        flex-wrap: wrap;
      }

      /* Ballot Unit (BU) */
      .bu-unit {
        background: #e5e5e0; /* Beige plastic */
        border: 12px solid #333; /* Dark casing edge */
        border-radius: 8px;
        padding: 24px 16px 16px;
        width: 100%;
        max-width: 420px;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.1), 10px 10px 30px rgba(0,0,0,0.4);
        position: relative;
      }
      [data-theme="dark"] .bu-unit {
        background: #2a2a28; /* Darker plastic */
        border-color: #1a1a1a;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.4), 10px 10px 30px rgba(0,0,0,0.7);
      }

      /* Ready Light at Top of BU */
      .bu-ready-indicator {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        padding: 6px 16px;
        border-radius: 0 0 8px 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        border: 2px solid #222;
        border-top: none;
      }
      .ready-led {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #10b981;
        box-shadow: 0 0 8px #10b981, inset 0 2px 4px rgba(255,255,255,0.4);
        border: 1px solid #065f46;
      }
      .ready-text {
        color: #10b981;
        font-family: monospace;
        font-weight: bold;
        font-size: 12px;
        letter-spacing: 1px;
      }
      .bu-unit.busy .ready-led { background: #064e3b; box-shadow: none; border-color: #022c22; }
      .bu-unit.busy .ready-text { color: #064e3b; }

      .candidates-list {
        background: #f4f4f0;
        border: 2px solid #cbd5e1;
        border-radius: 4px;
        padding: 2px;
      }
      [data-theme="dark"] .candidates-list {
        background: #1c1c1c;
        border-color: #404040;
      }

      .candidate-row {
        display: flex;
        align-items: center;
        border-bottom: 2px solid #cbd5e1;
        padding: 8px 12px;
        gap: 16px;
      }
      .candidate-row:last-child { border-bottom: none; }
      [data-theme="dark"] .candidate-row { border-color: #404040; }

      .candidate-sn {
        font-family: var(--font-outfit);
        font-weight: 800;
        font-size: 18px;
        color: #475569;
        width: 28px;
        text-align: center;
        border-right: 2px solid #cbd5e1;
        padding-right: 12px;
      }
      [data-theme="dark"] .candidate-sn { color: #94a3b8; border-color: #404040; }

      .candidate-info {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .candidate-name {
        font-weight: 700;
        font-size: 15px;
        color: #1e293b;
        text-transform: uppercase;
      }
      [data-theme="dark"] .candidate-name { color: #f8fafc; }

      .candidate-symbol {
        font-size: 28px;
        margin-left: auto;
        padding-right: 16px;
        filter: drop-shadow(0 2px 2px rgba(0,0,0,0.1));
      }

      /* Red Indicator LED */
      .vote-light-container {
        width: 32px;
        display: flex;
        justify-content: center;
        border-left: 2px solid #cbd5e1;
        padding-left: 12px;
      }
      [data-theme="dark"] .vote-light-container { border-color: #404040; }
      
      .vote-light {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #7f1d1d; /* Dark red when off */
        border: 2px solid #450a0a;
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.6);
        transition: all 0.1s;
      }
      .vote-light.active {
        background: #ef4444; /* Bright red when on */
        border-color: #b91c1c;
        box-shadow: 0 0 12px 2px #ef4444, inset 0 4px 6px rgba(255,255,255,0.6);
      }

      /* Blue Voting Button */
      .vote-btn-container {
        padding-left: 12px;
      }
      .vote-btn {
        width: 48px;
        height: 32px;
        border-radius: 16px; /* Pill shape */
        background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
        border: 2px solid #1e3a8a;
        box-shadow: inset 0 2px 4px rgba(255,255,255,0.4), 0 6px 0 #1e3a8a, 0 8px 10px rgba(0,0,0,0.3);
        cursor: pointer;
        position: relative;
        transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
      }
      /* Braille dots simulation */
      .vote-btn::after {
        content: '';
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 20px; height: 10px;
        background-image: radial-gradient(circle, rgba(255,255,255,0.6) 2px, transparent 2px);
        background-size: 8px 8px;
        background-position: center;
        opacity: 0.5;
      }

      .vote-btn:active, .vote-btn.pressed {
        transform: translateY(6px);
        box-shadow: inset 0 2px 6px rgba(0,0,0,0.3), 0 0px 0 #1e3a8a, 0 2px 4px rgba(0,0,0,0.3);
      }
      .vote-btn:disabled {
        cursor: not-allowed;
      }

      /* VVPAT Unit */
      .vvpat-unit {
        background: #1c1917; /* Very dark grey/black casing */
        border: 2px solid #292524;
        border-radius: 16px 16px 4px 4px;
        padding: 32px 20px 20px;
        width: 100%;
        max-width: 360px;
        height: 520px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: inset 0 0 30px rgba(0,0,0,0.8), 10px 10px 40px rgba(0,0,0,0.6);
        position: relative;
      }
      .vvpat-unit::before {
        content: 'VVPAT';
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        color: #78716c;
        font-family: var(--font-outfit);
        font-weight: 900;
        letter-spacing: 4px;
        font-size: 14px;
      }

      /* Glass Window */
      .vvpat-window {
        width: 240px;
        height: 320px;
        background: #000;
        border: 12px solid #292524; /* Thick plastic bezel */
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        box-shadow: inset 0 20px 40px rgba(0,0,0,0.9), 0 4px 10px rgba(255,255,255,0.05);
        display: flex;
        justify-content: center;
      }
      /* Reflection effect on glass */
      .vvpat-window::after {
        content: '';
        position: absolute;
        top: 0; left: -50%; width: 200%; height: 200%;
        background: linear-gradient(to bottom right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 100%);
        transform: rotate(30deg);
        pointer-events: none;
        z-index: 20;
      }
      
      .vvpat-light {
        position: absolute;
        inset: 0;
        background: rgba(255, 255, 255, 0);
        pointer-events: none;
        transition: background 0.1s; /* Instant light up */
        z-index: 10;
      }
      .vvpat-window.active .vvpat-light {
        /* Bright greenish-white light typical of VVPAT */
        background: rgba(220, 255, 220, 0.4); 
        box-shadow: inset 0 0 60px rgba(200, 255, 200, 0.2);
      }

      /* Receipt Slip */
      .vvpat-slip {
        width: 180px;
        background: #f1f5f9; /* Thermal paper color */
        position: absolute;
        top: -200px; /* Hidden above */
        padding: 24px 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        font-family: 'Courier New', Courier, monospace;
        color: #000;
        box-shadow: 0 10px 15px rgba(0,0,0,0.5);
        /* Jagged bottom edge for receipt look */
        clip-path: polygon(0 0, 100% 0, 100% calc(100% - 5px), 95% 100%, 90% calc(100% - 5px), 85% 100%, 80% calc(100% - 5px), 75% 100%, 70% calc(100% - 5px), 65% 100%, 60% calc(100% - 5px), 55% 100%, 50% calc(100% - 5px), 45% 100%, 40% calc(100% - 5px), 35% 100%, 30% calc(100% - 5px), 25% 100%, 20% calc(100% - 5px), 15% 100%, 10% calc(100% - 5px), 5% 100%, 0 calc(100% - 5px));
        z-index: 5;
      }
      /* Thermal printing texture/fade */
      .vvpat-slip::before {
        content: '';
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
        pointer-events: none;
      }

      .vvpat-slip.printing {
        animation: printSlip 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }
      .vvpat-slip.dropping {
        animation: dropSlip 1.2s cubic-bezier(0.5, 0, 1, 0.5) forwards;
      }

      @keyframes printSlip {
        0% { top: -200px; }
        100% { top: 20px; }
      }

      @keyframes dropSlip {
        0% { top: 20px; opacity: 1; }
        70% { top: 320px; opacity: 1; }
        100% { top: 350px; opacity: 0; }
      }

      .slip-sn { 
        font-size: 20px; 
        font-weight: bold; 
        border-bottom: 2px dashed #94a3b8; 
        width: 100%; 
        text-align: center; 
        padding-bottom: 8px; 
      }
      .slip-symbol { 
        font-size: 48px; 
        line-height: 1;
        filter: grayscale(100%) contrast(150%); /* Make symbol look printed */
      }
      .slip-name { 
        font-size: 16px; 
        text-transform: uppercase; 
        font-weight: bold; 
        text-align: center; 
        width: 100%;
        border-top: 2px dashed #94a3b8;
        padding-top: 8px;
      }

      /* Base status (simulating physical stickers on the VVPAT) */
      .vvpat-stickers {
        margin-top: auto;
        display: flex;
        gap: 12px;
        width: 100%;
      }
      .sticker {
        flex: 1;
        background: #eab308;
        color: #000;
        font-family: var(--font-outfit);
        font-size: 10px;
        font-weight: 900;
        text-align: center;
        padding: 6px;
        border-radius: 2px;
        text-transform: uppercase;
      }
      .sticker.red { background: #ef4444; color: white; }

    </style>

    <section class="section" style="padding-top: 40px; min-height: 80vh;">
      <div class="container">
        <div class="reveal" style="text-align:center; max-width: 600px; margin: 0 auto 32px;">
          <h1 class="reveal" style="font-size:clamp(30px,5vw,52px);font-weight:800;margin-bottom:14px;line-height:1.15;">
          EVM <span class="text-gradient-primary">Simulator</span>
        </h1>
          <p style="color:var(--color-muted);font-size:15px;line-height:1.6;">
            Experience the voting process. Click a blue button on the Ballot Unit to cast your vote. 
            Watch the VVPAT machine print your slip, visible for exactly 7 seconds before dropping into the secure ballot box.
          </p>
        </div>

        <div class="evm-container reveal">
          <!-- EVM Ballot Unit -->
          <div class="bu-unit" id="bu-unit">
            <div class="bu-ready-indicator">
              <div class="ready-led"></div>
              <div class="ready-text">READY</div>
            </div>
            
            <div class="candidates-list">
              ${CANDIDATES.map(c => `
                <div class="candidate-row">
                  <div class="candidate-sn">${c.id}</div>
                  <div class="candidate-info">
                    <div class="candidate-name">${c.name}</div>
                    <div class="candidate-symbol">${c.symbol}</div>
                  </div>
                  <div class="vote-light-container">
                    <div class="vote-light" id="light-${c.id}"></div>
                  </div>
                  <div class="vote-btn-container">
                    <button class="vote-btn" data-id="${c.id}" data-name="${c.name}" data-symbol="${c.symbol}" aria-label="Vote for ${c.name}"></button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- VVPAT Unit -->
          <div class="vvpat-unit">
            <div class="vvpat-window" id="vvpat-window">
              <div class="vvpat-light"></div>
              <div class="vvpat-slip" id="vvpat-slip">
                <div class="slip-sn" id="slip-sn">0</div>
                <div class="slip-symbol" id="slip-symbol"></div>
                <div class="slip-name" id="slip-name"></div>
              </div>
            </div>
            <div class="vvpat-stickers">
              <div class="sticker">Election Comm.</div>
              <div class="sticker red">Sealed Unit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Audio context for the beep sound
let audioCtx = null;

function playBeep() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Resume context if suspended
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(3000, audioCtx.currentTime); // 3kHz is similar to EVM beep
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    // Beep lasts for about 3 seconds on a real EVM, but we'll let it trail off
    oscillator.stop(audioCtx.currentTime + 3);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
}

export function init() {
  initReveal();
  
  const buttons = document.querySelectorAll('.vote-btn');
  const buUnit = document.getElementById('bu-unit');
  const readyText = buUnit.querySelector('.ready-text');
  const vvpatWindow = document.getElementById('vvpat-window');
  const vvpatSlip = document.getElementById('vvpat-slip');
  const slipSn = document.getElementById('slip-sn');
  const slipSymbol = document.getElementById('slip-symbol');
  const slipName = document.getElementById('slip-name');
  
  let isVoting = false;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isVoting) return; // Prevent multiple votes
      
      isVoting = true;
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const symbol = btn.getAttribute('data-symbol');
      
      // Update system state
      readyText.textContent = 'BUSY';
      buUnit.classList.add('busy');
      buttons.forEach(b => b.disabled = true);
      
      // Turn on the red light
      const light = document.getElementById(`light-${id}`);
      if (light) light.classList.add('active');
      btn.classList.add('pressed');
      
      // Play beep sound
      playBeep();
      
      // Prepare slip
      slipSn.textContent = id;
      slipSymbol.textContent = symbol;
      slipName.textContent = name;
      
      // Animate slip printing
      vvpatSlip.className = 'vvpat-slip printing';
      vvpatWindow.classList.add('active'); // Turn on VVPAT light
      
      // After 7 seconds, drop the slip
      setTimeout(() => {
        vvpatSlip.className = 'vvpat-slip dropping';
        vvpatWindow.classList.remove('active'); // Turn off light
        
        // Reset everything after slip drops (1.2s drop animation as per updated CSS)
        setTimeout(() => {
          vvpatSlip.className = 'vvpat-slip';
          if (light) light.classList.remove('active');
          btn.classList.remove('pressed');
          buttons.forEach(b => b.disabled = false);
          readyText.textContent = 'READY';
          buUnit.classList.remove('busy');
          isVoting = false;
        }, 1200);
        
      }, 7000);
    });
  });
}
