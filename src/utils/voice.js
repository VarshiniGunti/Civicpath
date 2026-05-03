/**
 * Voice functionality for CivicPath AI
 * Handles Text-to-Speech (TTS) and Speech Recognition (STT)
 */

export function setupVoiceFeatures() {
  // Global reference for current speech
  window.currentUtterance = null;
  window.currentListenBtn = null;

  // Text to Speech
  window.toggleSpeech = (btn, text) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    const span = btn.querySelector('span');

    // If currently speaking and clicking the same button, stop it
    if (window.speechSynthesis.speaking && window.currentListenBtn === btn) {
      window.speechSynthesis.cancel();
      if (span) span.innerText = 'Listen';
      window.currentListenBtn = null;
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Reset previous button if exists
    if (window.currentListenBtn && window.currentListenBtn !== btn) {
      const oldSpan = window.currentListenBtn.querySelector('span');
      if (oldSpan) oldSpan.innerText = 'Listen';
    }

    const cleanText = text.replace(/Copy|Copied|Listen|Stop/g, '').trim();
    window.currentUtterance = new SpeechSynthesisUtterance(cleanText);
    window.currentUtterance.lang = 'en-IN';

    window.currentUtterance.onend = () => {
      if (span) span.innerText = 'Listen';
      window.currentListenBtn = null;
    };

    window.currentListenBtn = btn;
    if (span) span.innerText = 'Stop';
    window.speechSynthesis.speak(window.currentUtterance);
  };
}

// Speech to Text (Microphone)
const SpeechRecognitionAPI =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

/** @type {SpeechRecognition|null} */
let activeRecognition = null;

/**
 * Handles microphone button click for speech-to-text.
 * Creates a fresh SpeechRecognition instance each time to avoid stale state.
 * @param {HTMLInputElement|HTMLTextAreaElement} inputEl - The text input to populate
 * @param {HTMLButtonElement} btnEl - The mic button element
 */
export function handleMicClick(inputEl, btnEl) {
  if (!SpeechRecognitionAPI) {
    alert('Speech recognition is not supported in this browser. Try Chrome or Edge.');
    return;
  }

  // If already recording, stop it
  if (activeRecognition) {
    activeRecognition.stop();
    activeRecognition = null;
    btnEl.classList.remove('recording');
    btnEl.style.color = 'var(--color-muted)';
    return;
  }

  // Create a fresh instance every time to avoid broken state
  const recognition = new SpeechRecognitionAPI();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'hi-IN'; // Support Hindi + English (India)
  recognition.maxAlternatives = 1;

  activeRecognition = recognition;

  recognition.onstart = () => {
    btnEl.classList.add('recording');
    btnEl.style.color = '#ef4444';
    btnEl.title = 'Listening… click to stop';
  };

  recognition.onresult = (event) => {
    let finalTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      }
    }
    if (finalTranscript) {
      inputEl.value += (inputEl.value ? ' ' : '') + finalTranscript;
      inputEl.dispatchEvent(new Event('input')); // trigger auto-resize
    }
  };

  recognition.onend = () => {
    activeRecognition = null;
    btnEl.classList.remove('recording');
    btnEl.style.color = 'var(--color-muted)';
    btnEl.title = '';
  };

  recognition.onerror = (event) => {
    activeRecognition = null;
    btnEl.classList.remove('recording');
    btnEl.style.color = 'var(--color-muted)';
    btnEl.title = '';

    if (event.error === 'not-allowed') {
      alert('Microphone access was denied. Please allow microphone permission in your browser settings and try again.');
    } else if (event.error === 'no-speech') {
      // Silently handle — user just didn't speak
    } else {
      console.warn('Speech recognition error:', event.error);
    }
  };

  try {
    recognition.start();
  } catch (err) {
    // Catches InvalidStateError if recognition is somehow already running
    activeRecognition = null;
    console.warn('Could not start recognition:', err.message);
  }
}

