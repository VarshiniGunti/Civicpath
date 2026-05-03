import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.GEMINI_API_KEY;
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

/**
 * Handles chat requests using Google Gemini AI.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const handleChat = async (req, res) => {
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

        const model = ai.getGenerativeModel({
            model: 'gemini-1.5-flash',
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        const result = await model.generateContent({
            contents,
            generationConfig: {
                maxOutputTokens: 1024,
                temperature: 0.4,
            },
        });

        const reply = result.response.text();
        if (!reply) throw new Error('Empty response from Gemini');

        res.json({ reply });
    } catch (err) {
        const errMsg = err.message || '';
        console.error('Gemini error:', errMsg);

        if (errMsg.includes('quota') || errMsg.includes('RESOURCE_EXHAUSTED')) {
            return res.status(503).json({ error: 'Service busy. Please try again shortly.' });
        }
        if (errMsg.includes('API_KEY') || errMsg.includes('INVALID')) {
            return res.status(401).json({ error: 'API key error. Check your configuration.' });
        }
        res.status(500).json({ error: errMsg || 'Something went wrong. Please try again.' });
    }
};
