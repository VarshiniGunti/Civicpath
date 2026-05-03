import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { GoogleGenAI } from '@google/genai';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.set('trust proxy', 1); // Trust first proxy (Cloud Run)
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set in .env');
  process.exit(1);
}

// 1. HTTP Security Headers
app.use(helmet({
  contentSecurityPolicy: false, // Vite requires inline scripts during dev, adjust for prod if needed
  crossOriginEmbedderPolicy: false,
}));

// 2. CORS - Restrict origins in production
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
    'https://votesathi-ai.web.app',
    'https://votesathi-ai.firebaseapp.com',
    /\.run\.app$/, // Allow all Cloud Run service URLs
  ]
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow same-origin / server-to-server
    const allowed = allowedOrigins.some((o) =>
      o instanceof RegExp ? o.test(origin) : o === origin
    );
    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// 3. Payload size limiting to prevent DoS attacks
app.use(express.json({ limit: '5kb' }));

// 4. Rate limiting for the API endpoint
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 15, // limit each IP to 15 requests per windowMs
  message: { error: 'Too many requests. Please wait a moment.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Gemini client
const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `You are CivicPath AI, an expert guide on Indian elections and civic processes. Help citizens understand:
- Lok Sabha, Rajya Sabha, Vidhan Sabha elections
- Voter registration, EPIC cards, eligibility rules
- ECI rules, Model Code of Conduct (MCC)
- EVMs, VVPATs, NOTA, election phases and timelines
- Voting rights, complaints, helpline 1950

Rules:
- Only answer Indian election and civic-related questions
- Politely redirect off-topic questions back to elections/civics
- Cite ECI sources when relevant (voters.eci.gov.in, eci.gov.in)
- Keep answers VERY short, concise, and straight to the point
- ALWAYS use bullet points for explanations
- ALWAYS respond in the exact same language the user uses to ask the question
- Stay strictly neutral on political parties and candidates
- Never recommend any specific party or candidate`;

// Chat endpoint
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message?.trim()) return res.status(400).json({ error: 'Message is required' });
    if (message.length > 1000)
      return res.status(400).json({ error: 'Message too long (max 1000 chars)' });

    const contents = [
      ...history.slice(-10).map((h) => ({
        role: h.role === 'model' ? 'model' : 'user',
        parts: [{ text: h.text }],
      })),
      { role: 'user', parts: [{ text: message.trim() }] },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 1024,
        temperature: 0.4,
      },
    });

    const reply = response.text;
    if (!reply) throw new Error('Empty response from Gemini');

    res.json({ reply });
  } catch (err) {
    console.error('Gemini error:', err.message);
    if (err.message?.includes('quota') || err.message?.includes('RESOURCE_EXHAUSTED')) {
      return res.status(503).json({ error: 'Service busy. Please try again shortly.' });
    }
    if (err.message?.includes('API_KEY') || err.message?.includes('INVALID')) {
      return res.status(401).json({ error: 'API key error. Check your configuration.' });
    }
    res.status(500).json({ error: err.message || 'Something went wrong. Please try again.' });
  }
});

// Health check
app.get('/api/health', (req, res) =>
  res.json({ status: 'ok', model: 'gemini-1.5-flash', timestamp: new Date().toISOString() })
);

// Serve Vite production build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'dist'), { maxAge: '1d' }));
  app.get('*', (req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')));
}

app.listen(PORT, () => console.log(`✅ CivicPath AI backend running on http://localhost:${PORT}`));
