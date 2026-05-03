import { confetti, initReveal } from '../utils/animations.js';

const QUESTIONS = [
  { q: 'What is the full form of EVM?', opts: ['Electronic Voting Machine','Electric Voter Method','Electoral Vote Module','Electro Voting Mechanism'], ans: 0, exp: 'EVM stands for Electronic Voting Machine — used in all Indian elections since 1999 for Lok Sabha and replaced paper ballots entirely.' },
  { q: 'How many seats are there in the Lok Sabha?', opts: ['442','520','543','550'], ans: 2, exp: 'The Lok Sabha has 543 seats — 530 from states, 13 from UTs.' },
  { q: 'What is the minimum age to vote in India?', opts: ['16 years','18 years','21 years','25 years'], ans: 1, exp: 'The voting age in India is 18 years, lowered from 21 by the 61st Constitutional Amendment Act, 1988.' },
  { q: 'NOTA stands for?', opts: ['None Of The Allowed','None Of The Above','No Other Than Allowed','Not One To Approve'], ans: 1, exp: 'NOTA (None Of The Above) was introduced in 2013 following a Supreme Court ruling.' },
  { q: 'How long does the Model Code of Conduct remain in force?', opts: ['Until nomination filing ends','From announcement until results declared','Only during campaign period','For 48 hours before polling'], ans: 1, exp: 'The MCC comes into force from the date of election announcement and remains in effect until the results are declared.' },
  { q: 'What is the security deposit for a Lok Sabha candidate?', opts: ['₹10,000','₹25,000','₹50,000','₹1,00,000'], ans: 1, exp: 'Candidates contesting Lok Sabha elections must pay ₹25,000 as security deposit. SC/ST candidates pay ₹12,500.' },
  { q: 'What does VVPAT stand for?', opts: ['Voter Verified Paper Audit Trail','Verified Voter Paper Audit Track','Voting Verification Paper Audit Trail','Voter Verified Polling Audit Tool'], ans: 0, exp: 'VVPAT is a Voter Verified Paper Audit Trail machine attached to EVMs. After voting, a slip is displayed for 7 seconds.' },
  { q: 'The Election Commission of India is established by which Article?', opts: ['Article 312','Article 324','Article 356','Article 370'], ans: 1, exp: 'Article 324 of the Indian Constitution establishes the Election Commission of India.' },
  { q: 'Which form is used for new voter registration?', opts: ['Form 4','Form 6','Form 8','Form 12'], ans: 1, exp: 'Form 6 is used by first-time voters to register their name in the Electoral Roll.' },
  { q: 'What is the election expenditure limit for a Lok Sabha candidate?', opts: ['₹40 lakh','₹70 lakh','₹95 lakh','₹1.5 crore'], ans: 2, exp: 'As of 2022, the expenditure limit for Lok Sabha candidates is ₹95 lakh.' },
  { q: 'Under which law is the Model Code of Conduct enforced?', opts: ['It is not a statutory law — it is a voluntary code','IPC Section 171','Representation of People Act, 1951','The Constitution of India'], ans: 0, exp: 'The MCC is NOT a statutory document. It is enforced by ECI through its powers under Article 324.' },
  { q: 'How many phases did the 2024 Lok Sabha elections have?', opts: ['5','6','7','8'], ans: 2, exp: 'The 2024 General Elections (18th Lok Sabha) were conducted in 7 phases, from April 19 to June 1, 2024.' },
  { q: 'What is the term of the Lok Sabha?', opts: ['4 years','5 years','6 years','Until dissolved'], ans: 1, exp: 'The Lok Sabha has a term of 5 years from the date of its first sitting after a general election.' },
  { q: 'Which body publishes the electoral rolls in India?', opts: ['State Government','Chief Electoral Officer','Election Commission of India','Returning Officer'], ans: 2, exp: 'The Electoral Rolls are prepared and published under the supervision of the Election Commission of India.' },
  { q: 'Indelible ink used in elections is made from which compound?', opts: ['Silver Nitrate','Potassium Permanganate','Silver Chloride','Potassium Dichromate'], ans: 0, exp: 'The indelible ink used in Indian elections is made from Silver Nitrate (AgNO₃).' },
  { q: 'Who appoints the Chief Election Commissioner?', opts: ['Prime Minister','Parliament','President of India','Rajya Sabha'], ans: 2, exp: 'The Chief Election Commissioner is appointed by the President of India.' },
  { q: 'What is the maximum voters per polling station as per ECI guidelines?', opts: ['500','800','1000','1500'], ans: 3, exp: 'Each polling station is set up to serve a maximum of 1,500 voters to ensure smooth voting.' },
  { q: 'EPIC stands for?', opts: ['Electoral Photo Identity Card','Election Public Identification Certificate','Electoral Public Identity Code','Electors Personal Identity Card'], ans: 0, exp: 'EPIC stands for Electoral Photo Identity Card — commonly known as the Voter ID card.' },
  { q: 'How many alternative documents can be used instead of Voter ID?', opts: ['6','8','10','12'], ans: 3, exp: 'ECI accepts 12 alternative photo documents in place of EPIC on polling day, including Aadhaar, Passport, Driving Licence, PAN Card, and more.' },
  { q: 'Which amendment lowered the voting age from 21 to 18?', opts: ['52nd','58th','61st','73rd'], ans: 2, exp: 'The 61st Constitutional Amendment Act, 1988 reduced the voting age from 21 to 18 years, effective March 28, 1989.' },
];

const LABELS = ['A', 'B', 'C', 'D'];
let current = 0, score = 0, answered = false;

export function render() {
  return `
  <style>
    .quiz-page { min-height: 100vh; background: var(--color-bg); padding: 0 0 100px; }

    .quiz-hero {
      text-align: center;
      padding: 72px 24px 48px;
      background: radial-gradient(ellipse 800px 400px at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 70%);
      border-bottom: 1px solid rgba(245,158,11,0.15);
      margin-bottom: 48px;
    }
    .quiz-hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.3);
      color: #f59e0b; border-radius: 999px; padding: 6px 16px;
      font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
      margin-bottom: 20px;
    }
    .quiz-hero h1 {
      font-family: var(--font-outfit); font-size: clamp(32px, 5vw, 56px);
      font-weight: 800; letter-spacing: -1.5px; margin-bottom: 12px;
    }
    .quiz-hero p { color: var(--color-muted); font-size: 16px; max-width: 480px; margin: 0 auto; line-height: 1.7; }

    .quiz-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 12px 48px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1);
      position: relative; overflow: hidden;
      animation: cardEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    /* Local quiz-card accent removed as it is now global in tailwind.css */
    @keyframes cardEnter {
      from { opacity: 0; transform: translateY(20px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .quiz-meta {
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;
    }
    .quiz-counter {
      font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--color-india-saffron);
    }
    .quiz-score-pill {
      background: rgba(255,153,51,0.1); border: 1px solid rgba(255,153,51,0.25);
      color: var(--color-india-saffron); border-radius: 999px; padding: 4px 14px;
      font-size: 12px; font-weight: 700; letter-spacing: 0.05em;
    }

    .quiz-progress-track {
      width: 100%; height: 6px;
      background: var(--color-surface2); border-radius: 99px; margin-bottom: 32px; overflow: hidden;
      border: 1px solid var(--color-border);
    }
    .quiz-progress-fill {
      height: 100%; border-radius: 99px;
      background: linear-gradient(90deg, var(--color-india-saffron), var(--color-india-green));
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 0 10px rgba(255,153,51,0.3);
    }

    .quiz-question {
      font-size: clamp(16px, 2.5vw, 20px); font-weight: 700; line-height: 1.55;
      color: var(--color-text); margin-bottom: 28px; font-family: var(--font-outfit);
    }

    .quiz-options { display: flex; flex-direction: column; gap: 10px; }

    .quiz-opt {
      display: flex; align-items: center; gap: 14px;
      background: var(--color-surface2); border: 1px solid var(--color-border);
      border-radius: 14px; padding: 14px 18px; cursor: pointer; width: 100%; text-align: left;
      transition: all 0.2s ease; color: var(--color-text); font-size: 14px; font-weight: 500;
    }
    .quiz-opt:hover:not(:disabled) {
      background: rgba(255,153,51,0.08); border-color: rgba(255,153,51,0.35);
      transform: translateX(4px);
    }
    .quiz-opt-label {
      min-width: 28px; height: 28px; border-radius: 8px;
      background: rgba(255,153,51,0.1); border: 1px solid rgba(255,153,51,0.25);
      color: var(--color-india-saffron); font-size: 12px; font-weight: 800;
      display: flex; align-items: center; justify-content: center; letter-spacing: 0.05em;
      transition: all 0.2s ease; flex-shrink: 0;
    }
    .quiz-opt.correct {
      background: rgba(34,197,94,0.1); border-color: rgba(34,197,94,0.5);
      animation: correctPulse 0.4s ease;
    }
    .quiz-opt.correct .quiz-opt-label {
      background: rgba(34,197,94,0.2); border-color: #22c55e; color: #22c55e;
    }
    .quiz-opt.wrong {
      background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.5);
      animation: wrongShake 0.4s ease;
    }
    .quiz-opt.wrong .quiz-opt-label {
      background: rgba(239,68,68,0.2); border-color: #ef4444; color: #ef4444;
    }
    @keyframes correctPulse {
      0%,100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    @keyframes wrongShake {
      0%,100% { transform: translateX(0); }
      25% { transform: translateX(-6px); }
      75% { transform: translateX(6px); }
    }

    .quiz-explanation {
      display: none; margin-top: 20px; padding: 16px 20px;
      background: rgba(255,153,51,0.06); border: 1px solid rgba(255,153,51,0.2);
      border-radius: 14px; font-size: 13.5px; color: var(--color-muted); line-height: 1.75;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    .quiz-explanation strong { font-size: 13px; letter-spacing: 0.05em; text-transform: uppercase; }

    .quiz-next-btn {
      display: none; margin-top: 24px; width: 100%;
      background: linear-gradient(135deg, var(--color-india-saffron), var(--color-india-green));
      color: white; border: none; border-radius: 14px;
      padding: 14px 24px; font-size: 15px; font-weight: 700;
      cursor: pointer; justify-content: center; align-items: center; gap: 8px;
      transition: all 0.2s ease; letter-spacing: 0.02em; font-family: var(--font-outfit);
    }
    .quiz-next-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(19,136,8,0.25); }

    /* Result Card */
    .quiz-result-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border); border-radius: 24px;
      padding: 56px 40px; text-align: center; position: relative; overflow: hidden;
      animation: cardEnter 0.5s cubic-bezier(0.34,1.56,0.64,1);
    }
    .result-stamp {
      font-size: 72px; margin-bottom: 16px; display: block;
      animation: stampIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;
    }
    @keyframes stampIn {
      from { opacity: 0; transform: scale(0.3) rotate(-10deg); }
      to   { opacity: 1; transform: scale(1) rotate(0deg); }
    }
    .result-score-big {
      font-family: var(--font-outfit); font-size: clamp(56px, 8vw, 80px); font-weight: 800;
      background: linear-gradient(135deg, var(--color-india-saffron), var(--color-india-green));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      line-height: 1; margin: 16px 0 8px;
    }
    .result-sub { color: var(--color-muted); font-size: 15px; margin-bottom: 36px; }
    .result-divider {
      width: 80px; height: 2px; margin: 24px auto;
      background: linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent);
    }
    .result-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .btn-vintage-primary {
      background: linear-gradient(135deg, var(--color-india-saffron), var(--color-india-green)); color: white;
      border: none; border-radius: 12px; padding: 12px 28px;
      font-size: 14px; font-weight: 700; cursor: pointer; font-family: var(--font-outfit);
      letter-spacing: 0.03em; transition: all 0.2s ease;
    }
    .btn-vintage-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(19,136,8,0.25); }
    .btn-vintage-outline {
      background: transparent; color: var(--color-india-saffron);
      border: 1px solid rgba(255,153,51,0.4); border-radius: 12px; padding: 12px 28px;
      font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; transition: all 0.2s ease;
    }
    .btn-vintage-outline:hover { background: rgba(255,153,51,0.08); border-color: var(--color-india-saffron); }

    @media (max-width: 600px) {
      .quiz-card, .quiz-result-card { padding: 28px 20px; }
    }
  </style>

  <div class="quiz-page">
    <div class="quiz-hero">
      <div class="quiz-hero-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        20 Questions · Indian Democracy
      </div>
      <h1 class="text-gradient-primary">Knowledge Quiz</h1>
      <p>How well do you know the world's largest democracy? Put your civic knowledge to the test.</p>
    </div>

    <div class="container" style="max-width:680px;">
      <div id="quiz-wrapper"></div>
    </div>
  </div>`;
}

function renderQuestion() {
  const q = QUESTIONS[current];
  const pct = (current / QUESTIONS.length) * 100;
  document.getElementById('quiz-wrapper').innerHTML = `
    <div class="quiz-card">
      <div class="quiz-meta">
        <span class="quiz-counter">Question ${current + 1} <span style="opacity:0.4;">/ ${QUESTIONS.length}</span></span>
        <span class="quiz-score-pill">⭐ ${score} pts</span>
      </div>
      <div class="quiz-progress-track">
        <div class="quiz-progress-fill" style="width:${pct}%"></div>
      </div>
      <p class="quiz-question">${q.q}</p>
      <div class="quiz-options">
        ${q.opts.map((o, i) => `
          <button class="quiz-opt" aria-label="Select option ${o}" data-idx="${i}">
            <span class="quiz-opt-label">${LABELS[i]}</span>
            <span>${o}</span>
          </button>`).join('')}
      </div>
      <div class="quiz-explanation" id="quiz-exp"></div>
      <button class="quiz-next-btn" id="next-btn" aria-label="Next Question" style="display:none;">
        ${current + 1 < QUESTIONS.length ? 'Next Question →' : 'See Results 🎉'}
      </button>
    </div>`;

  document.querySelectorAll('.quiz-opt').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const idx = parseInt(btn.dataset.idx);
      const correct = idx === q.ans;
      if (correct) score++;

      document.querySelectorAll('.quiz-opt').forEach((b, i) => {
        b.disabled = true;
        if (i === q.ans) b.classList.add('correct');
        else if (i === idx && !correct) b.classList.add('wrong');
      });

      const exp = document.getElementById('quiz-exp');
      exp.style.display = 'block';
      exp.innerHTML = `<strong style="color:${correct ? '#22c55e' : '#ef4444'}">${correct ? '✓ Correct!' : '✗ Incorrect'}</strong><br><br>${q.exp}`;
      document.getElementById('next-btn').style.display = 'flex';
    });
  });

  document.getElementById('next-btn').addEventListener('click', () => {
    current++;
    answered = false;
    if (current < QUESTIONS.length) renderQuestion();
    else renderResult();
  });
}

function renderResult() {
  const pct = Math.round((score / QUESTIONS.length) * 100);
  const [emoji, grade] =
    pct >= 90 ? ['🏆', 'Outstanding!'] :
    pct >= 70 ? ['🌟', 'Great Work!'] :
    pct >= 50 ? ['👍', 'Good Effort!'] :
                ['📚', 'Keep Learning!'];

  if (pct === 100) confetti();

  document.getElementById('quiz-wrapper').innerHTML = `
    <div class="quiz-result-card">
      <span class="result-stamp">${emoji}</span>
      <div class="result-grade">${grade}</div>
      <div class="result-score-big">${score}<span style="font-size:0.4em;color:var(--color-muted);">/${QUESTIONS.length}</span></div>
      <p class="result-sub">You scored ${pct}% — ${score} correct out of ${QUESTIONS.length} questions</p>
      <div class="result-divider"></div>
      <div class="result-actions">
        <button class="btn-vintage-primary" id="retry-btn" aria-label="Retry Quiz">↺ Retry Quiz</button>
        <a href="#guide" class="btn-vintage-outline">Read the Guide →</a>
      </div>
    </div>`;

  document.getElementById('retry-btn').addEventListener('click', () => {
    current = 0; score = 0; answered = false;
    renderQuestion();
  });
}

export function init() {
  initReveal();
  current = 0; score = 0; answered = false;
  renderQuestion();
}
