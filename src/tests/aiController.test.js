import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleChat } from '../controllers/aiController.js';

// Define mocks in a hoisted block or simple object
const mockGenerateContent = vi.fn();
const mockGetGenerativeModel = vi.fn(() => ({
    generateContent: mockGenerateContent,
}));

vi.mock('@google/genai', () => ({
    GoogleGenAI: vi.fn().mockImplementation(() => ({
        getGenerativeModel: mockGetGenerativeModel,
    })),
}));

describe('aiController - handleChat', () => {
    let mockReq;
    let mockRes;

    beforeEach(() => {
        mockReq = {
            body: {
                message: 'Hello',
                history: [],
            },
        };
        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
        vi.clearAllMocks();
    });

    it('should return 400 if message is missing', async () => {
        mockReq.body.message = '';
        await handleChat(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Message is required' });
    });

    it('should return 400 if message is too long', async () => {
        mockReq.body.message = 'a'.repeat(1001);
        await handleChat(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Message too long (max 1000 chars)' });
    });

    it('should return 503 if Gemini quota is exhausted', async () => {
        mockGenerateContent.mockRejectedValueOnce(new Error('quota exceeded'));

        await handleChat(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(503);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Service busy. Please try again shortly.' });
    });
});
