import { initReveal, initCounters } from '../utils/animations.js';
import { sendChatMessage } from '../services/api.js';
import { ECI } from '../utils/eci-links.js';
import { setupVoiceFeatures, handleMicClick } from '../utils/voice.js';
import DOMPurify from 'dompurify';
import { FEATURES, STEPS, PROMPT_CARDS } from '../data/homeData.js';

let chatHistory = [];

export function resetChat() {
  chatHistory = [];
  if (document.getElementById('chat-empty-state')) {
    updateUIState();
  }
}
window.resetHomeChat = resetChat;

export function render() {
  return `
    <div id="home-wrapper" style="position:relative;">

      <!-- ================= AI ASSISTANT (LANDING) ================= -->
      <div id="chat-empty-state" class="chat-empty-state" style="min-height: calc(100vh - 60px); justify-content: center; position: relative;">
        <!-- Hero Background Image -->
        <div style="position: absolute; inset: 0; z-index: -1; overflow: hidden; opacity: 0.35; pointer-events: none;">
          <img src="/hero-bg.png" alt="Hero Background" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6);" />
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent, var(--color-bg));"></div>
        </div>
        
        <div class="ai-orb-container">
          <div class="ai-orb" style="display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, var(--color-india-saffron), #d97706);color:white;">
            <i data-lucide="bot" style="width:32px;height:32px;"></i>
          </div>
        </div>
        <h1 class="text-gradient-primary reveal" style="font-size: clamp(38px,6vw,56px); font-weight: 800; margin-bottom: 8px; text-align: center; letter-spacing: -1px;">Namaste, Citizen</h1>
        <h2 class="reveal" style="font-size: clamp(18px, 3vw, 22px); color: var(--color-muted); margin-bottom: 40px; font-weight: 400; text-align: center; max-width: 600px; line-height: 1.5;">Your intelligent companion for civic engagement and elections. Ask anything, or explore our guided journeys below.</h2>

        <div class="chat-input-large-wrapper reveal" style="animation-delay: 0.1s;">
          <textarea id="chat-input-landing" class="chat-input-large-textarea" placeholder="Ask me about voter registration, EVMs, or polling booths..." rows="1"></textarea>
          <div class="chat-input-large-toolbar">
            <div style="font-size:12px;color:var(--color-muted);display:flex;align-items:center;gap:4px;padding-left:4px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> Verified Election Data
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <button id="chat-mic-landing" aria-label="Toggle Voice Input" class="btn btn-ghost" style="border-radius: 50%; width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center; color: var(--color-muted);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
              </button>
              <button id="chat-send-landing" aria-label="Send Message" class="btn btn-primary" style="border-radius: 50%; width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="landing-prompt-grid reveal" style="animation-delay: 0.2s;">
          ${PROMPT_CARDS.map(
    (card) => `
            <div class="landing-prompt-card quick-prompt" data-prompt="${card.title}">
              <div class="landing-prompt-icon">${card.icon}</div>
              <div class="landing-prompt-title">${card.title}</div>
              <div class="landing-prompt-desc">${card.desc}</div>
            </div>
          `
  ).join('')}
        </div>
        
        <div class="reveal" style="margin-top: 48px; color: var(--color-muted); display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0.6; animation: float 3s ease-in-out infinite;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Scroll to explore</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </div>

      <!-- ================= AI ASSISTANT (ACTIVE CHAT) ================= -->
      <div id="chat-active-state" class="chat-active-state" style="display: none; height:calc(100vh - 60px);">
        <!-- Messages -->
        <div id="chat-messages" class="notranslate" style="flex:1;overflow-y:auto;padding:24px 0;">
          <div class="container" style="max-width:760px;">
            <div style="display:flex;flex-direction:column;gap:16px;" id="msg-list"></div>
          </div>
        </div>

        <!-- Input -->
        <div style="border-top:1px solid var(--color-border);padding:16px 0;flex-shrink:0;background:var(--color-bg);">
          <div class="container" style="max-width:760px;">
            <div style="display:flex;gap:10px;align-items:flex-end;">
              <div style="flex:1;position:relative;display:flex;align-items:flex-end;background:var(--color-surface);border:1px solid var(--color-border);border-radius:16px;">
                <textarea id="chat-input-active" class="input" placeholder="Ask a follow-up question..." rows="1" style="flex:1;resize:none;min-height:44px;max-height:120px;padding:11px 40px 11px 14px;overflow-y:auto;line-height:1.5;border:none;background:transparent;"></textarea>
                <button id="chat-mic-active" aria-label="Toggle Voice Input" class="btn btn-ghost" style="position:absolute;right:4px;bottom:4px;width:36px;height:36px;padding:0;display:flex;align-items:center;justify-content:center;color:var(--color-muted);border-radius:50%;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                </button>
              </div>
              <button id="chat-send-active" aria-label="Send Message" class="btn btn-primary" style="flex-shrink:0;padding:0;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
            
            <!-- Disclaimer and Clear Chat -->
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;">
              <p style="font-size:11px;color:var(--color-dimmed);margin:0;">CivicPath AI only answers Indian election and civic questions. For official help, call <strong>1950</strong>.</p>
              <button id="clear-chat" aria-label="Clear Chat" class="btn btn-ghost" style="font-size:11px;padding:4px 8px;color:var(--color-muted);">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;display:inline-block;vertical-align:middle;"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg> Clear Chat & Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= MARKETING SECTIONS ================= -->
      <div id="home-marketing-sections">
        <!-- ── Stats ── -->
        <section style="padding:0 0 80px;">
          <div class="container">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;">
              ${[
      { value: 968, suffix: 'M+', label: 'Registered Voters' },
      { value: 543, suffix: '', label: 'Lok Sabha Seats' },
      { value: 28, suffix: '+8', label: 'States & UTs' },
      { value: 1, suffix: '950', label: 'Voter Helpline' },
    ]
      .map(
        (s) => `
                <div class="card" style="text-align:center;padding:28px 20px;">
                  <div class="stat-value">
                    <span data-count="${s.value}">0</span>${s.suffix}
                  </div>
                  <div class="stat-label">${s.label}</div>
                </div>
              `
      )
      .join('')}
            </div>
          </div>
        </section>

        <!-- ── Features ── -->
        <section class="section" style="padding-top:0;">
          <div class="container">
            <div class="reveal" style="text-align:center;margin-bottom:48px;">
              <h2 style="font-size:clamp(26px,4vw,40px);margin-bottom:12px;">Everything you need to know</h2>
              <p style="color:var(--color-muted);font-size:15px;">Tools and guides to make you an informed voter.</p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;">
              ${FEATURES.map(
        (f) => `
                <a href="${f.route}" class="card card-interactive reveal" aria-label="Navigate to ${f.title}" style="display:block;">
                  <div style="display:flex;align-items:flex-start;gap:14px;">
                    <div style="width:42px;height:42px;background:var(--color-surface2);border:1px solid var(--color-border);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                      <i data-lucide="${f.icon}" style="width:18px;height:18px;color:var(--color-primary);"></i>
                    </div>
                    <div style="flex:1;">
                      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                        <h3 style="font-size:15px;font-weight:600;">${f.title}</h3>
                        ${f.isNew ? `<span class="badge ${f.badge}" style="font-size:9px;padding:2px 6px;">New</span>` : ''}
                      </div>
                      <p style="font-size:13px;color:var(--color-muted);line-height:1.6;">${f.desc}</p>
                    </div>
                  </div>
                </a>
              `
      ).join('')}
            </div>
          </div>
        </section>

        <!-- ── How It Works ── -->
        <section class="section" style="padding-top:0;">
          <div class="container">
            <div class="reveal" style="text-align:center;margin-bottom:48px;">
              <h2 class="text-gradient-primary" style="font-size:clamp(26px,4vw,36px);margin-bottom:12px;">How it works</h2>
              <p style="color:var(--color-muted);font-size:15px;">Three steps to becoming a confident voter.</p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;position:relative;">
              ${STEPS.map(
        (s) => `
                <div class="card reveal" style="text-align:center;padding:40px 28px;">
                  <div style="font-family:var(--font-outfit);font-size:52px;font-weight:800;color:var(--color-border);margin-bottom:16px;">${s.n}</div>
                  <h3 style="font-size:20px;margin-bottom:10px;">${s.title}</h3>
                  <p style="font-size:14px;color:var(--color-muted);line-height:1.7;">${s.desc}</p>
                </div>
              `
      ).join('')}
            </div>
          </div>
        </section>

        <!-- ── CTA Banner ── -->
        <section style="padding:0 0 88px;">
          <div class="container">
            <div class="reveal" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:20px;padding:56px 40px;text-align:center;position:relative;overflow:hidden;">
              <div style="position:absolute;inset:0;background:radial-gradient(ellipse 600px 300px at 50% 100%,rgba(249,115,22,0.06) 0%,transparent 70%);pointer-events:none;"></div>
              <span class="badge" style="margin-bottom:20px;display:inline-flex;background:rgba(245,158,11,0.15);color:var(--color-india-saffron);border:1px solid rgba(245,158,11,0.3);">☎ Voter Helpline: 1950</span>
              <h2 class="text-gradient-primary" style="font-size:clamp(24px,4vw,36px);margin-bottom:14px;">Ready to cast your vote?</h2>
              <p style="color:var(--color-muted);font-size:15px;max-width:440px;margin:0 auto 32px;line-height:1.7;">Register, verify your details, and find your polling booth — all through official ECI portals.</p>
              <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
                <a href="${ECI.register}" target="_blank" class="btn btn-primary">Register to Vote ↗</a>
                <a href="${ECI.searchVoter}" target="_blank" class="btn btn-outline">Check Registration ↗</a>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  `;
}

function updateUIState() {
  const emptyState = document.getElementById('chat-empty-state');
  const activeState = document.getElementById('chat-active-state');
  const marketingSections = document.getElementById('home-marketing-sections');

  if (chatHistory.length === 0) {
    emptyState.style.display = 'flex';
    activeState.style.display = 'none';
    marketingSections.style.display = 'block';
    setTimeout(() => document.getElementById('chat-input-landing')?.focus(), 100);
  } else {
    emptyState.style.display = 'none';
    activeState.style.display = 'flex';
    marketingSections.style.display = 'none';
    setTimeout(() => document.getElementById('chat-input-active')?.focus(), 100);
  }
}

function appendMessage(role, text) {
  const list = document.getElementById('msg-list');
  const isUser = role === 'user';
  const id = `ai-${Date.now()}`;

  const div = document.createElement('div');
  div.style.cssText = `display:flex;gap:10px;align-items:flex-start;margin-bottom:${isUser ? '16px' : '32px'};${isUser ? 'flex-direction:row-reverse;' : ''}`;

  if (isUser) {
    const escapeHTML = (str) =>
      str.replace(
        /[&<>'"]/g,
        (tag) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[tag]
      );
    div.innerHTML = `<div class="chat-bubble-user">${escapeHTML(text).replace(/\n/g, '<br>')}</div>`;
  } else {
    const rawHTML = window.marked ? window.marked.parse(text) : text.replace(/\n/g, '<br>');
    const parsedHTML = DOMPurify.sanitize(rawHTML);
    div.innerHTML = `
      <div style="width:32px;height:32px;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.2);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;">🤖</div>
      <div class="chat-bubble-ai" id="${id}">
        ${parsedHTML}
        <div style="display:flex;gap:8px;margin-top:12px;border-top:1px solid rgba(0,0,0,0.05);padding-top:8px;">
          <button class="copy-btn" aria-label="Copy message" onclick="navigator.clipboard.writeText(this.parentElement.parentElement.innerText.replace(/Copy|Copied|Listen/g,'').trim()); this.innerHTML='<svg width=14 height=14 viewBox=\\'0 0 24 24\\' fill=none stroke=currentColor stroke-width=2><polyline points=\\'20 6 9 17 4 12\\'></polyline></svg> Copied'; setTimeout(() => this.innerHTML='<svg width=14 height=14 viewBox=\\'0 0 24 24\\' fill=none stroke=currentColor stroke-width=2><rect x=9 y=9 width=13 height=13 rx=2 ry=2></rect><path d=\\'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\\'></path></svg> Copy', 2000);" style="display:flex;align-items:center;gap:4px;font-size:12px;color:var(--color-muted);background:transparent;border:none;cursor:pointer;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy
          </button>
          <button class="listen-btn" aria-label="Listen to message" onclick="window.toggleSpeech(this, this.parentElement.parentElement.innerText)" style="display:flex;align-items:center;gap:4px;font-size:12px;color:var(--color-muted);background:transparent;border:none;cursor:pointer;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> <span>Listen</span>
          </button>
        </div>
      </div>`;
  }
  list.appendChild(div);

  const container = document.getElementById('chat-messages');
  container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
}

function showTyping() {
  const list = document.getElementById('msg-list');
  const div = document.createElement('div');
  div.id = 'typing-indicator';
  div.style.cssText = 'display:flex;gap:10px;align-items:center;margin-bottom:16px;';
  div.innerHTML = `
    <div style="width:32px;height:32px;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.2);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;">🤖</div>
    <div style="display:flex;gap:4px;padding:12px 16px;background:var(--color-surface2);border:1px solid var(--color-border);border-radius:18px;">
      <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
    </div>`;
  list.appendChild(div);
  const container = document.getElementById('chat-messages');
  container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
}

function hideTyping() {
  document.getElementById('typing-indicator')?.remove();
}

async function sendMessage(text) {
  if (!text.trim()) return;

  const inputLanding = document.getElementById('chat-input-landing');
  const inputActive = document.getElementById('chat-input-active');
  const btnLanding = document.getElementById('chat-send-landing');
  const btnActive = document.getElementById('chat-send-active');

  // Clear inputs and disable
  inputLanding.value = '';
  inputActive.value = '';
  inputLanding.style.height = 'auto';
  inputActive.style.height = 'auto';

  inputLanding.disabled = true;
  inputActive.disabled = true;
  btnLanding.disabled = true;
  btnActive.disabled = true;

  chatHistory.push({ role: 'user', text });
  updateUIState();

  appendMessage('user', text);
  showTyping();

  try {
    const reply = await sendChatMessage(text, chatHistory.slice(0, -1));
    hideTyping();
    appendMessage('model', reply);
    chatHistory.push({ role: 'model', text: reply });
    if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
  } catch (err) {
    hideTyping();
    appendMessage('model', `⚠️ ${err.message || 'Something went wrong. Please try again.'}`);
  } finally {
    inputLanding.disabled = false;
    inputActive.disabled = false;
    btnLanding.disabled = false;
    btnActive.disabled = false;
    inputActive.focus();
  }
}

export function init() {
  initReveal();
  initCounters();
  if (window.lucide) window.lucide.createIcons();

  // Setup Voice Features
  setupVoiceFeatures();

  const inputLanding = document.getElementById('chat-input-landing');
  const inputActive = document.getElementById('chat-input-active');
  const btnLanding = document.getElementById('chat-send-landing');
  const btnActive = document.getElementById('chat-send-active');
  const micLanding = document.getElementById('chat-mic-landing');
  const micActive = document.getElementById('chat-mic-active');

  if (micLanding)
    micLanding.addEventListener('click', () => handleMicClick(inputLanding, micLanding));
  if (micActive) micActive.addEventListener('click', () => handleMicClick(inputActive, micActive));

  const autoResize = function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  };
  inputLanding.addEventListener('input', autoResize);
  inputActive.addEventListener('input', autoResize);

  btnLanding.addEventListener('click', () => sendMessage(inputLanding.value));
  btnActive.addEventListener('click', () => sendMessage(inputActive.value));

  const handleKeydown = (e, inputEl) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputEl.value);
    }
  };
  inputLanding.addEventListener('keydown', (e) => handleKeydown(e, inputLanding));
  inputActive.addEventListener('keydown', (e) => handleKeydown(e, inputActive));

  document.querySelectorAll('.quick-prompt').forEach((card) => {
    card.addEventListener('click', () => {
      const promptText = card.getAttribute('data-prompt');
      sendMessage(promptText);
    });
  });

  document.getElementById('clear-chat').addEventListener('click', () => {
    chatHistory = [];
    document.getElementById('msg-list').innerHTML = '';
    updateUIState();
  });

  updateUIState();
}
