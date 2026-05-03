import express from 'express';
import rateLimit from 'express-rate-limit';
import { handleChat } from '../controllers/aiController.js';

const router = express.Router();

const chatLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    message: { error: 'Too many requests. Please wait a moment.' },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * @route POST /api/chat
 * @desc  Handle chat interactions with CivicPath AI
 * @access Public
 */
router.post('/chat', chatLimiter, handleChat);

export default router;
