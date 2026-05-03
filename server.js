import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import chatRoute from './src/routes/chatRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

/**
 * Configure Express settings for production
 */
app.set('trust proxy', 1); // Trust first proxy (Cloud Run)
const PORT = process.env.PORT || 8080;

// --- CORS Configuration ---
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
    'https://votesathi-ai.web.app',
    'https://votesathi-ai.firebaseapp.com',
    /\.run\.app$/,
  ]
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some((o) =>
      o instanceof RegExp ? o.test(origin) : o === origin
    );
    if (allowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

/**
 * Global Middleware
 */
app.use(express.json({ limit: '10kb' }));

/**
 * API Routes
 */
app.use('/api', cors(corsOptions));
app.use('/api', helmet({ contentSecurityPolicy: false }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Chat Route
app.use('/api', chatRoute);

/**
 * Static Asset Serving (Production)
 */
app.use(express.static(join(__dirname, 'dist'), { maxAge: '1d' }));

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

/**
 * Error Handling Middleware
 */
app.use((err, req, res, next) => {
  console.error(`[Error] ${err.stack}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`[CivicPath] Server running on port ${PORT}`);
  console.log(`[CivicPath] Internal Health Check: http://localhost:${PORT}/api/health`);
});

