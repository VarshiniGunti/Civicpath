/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, init } from '../pages/Home.js';

describe('Home Page', () => {
    beforeEach(() => {
        document.body.innerHTML = render();
        // Mock global functions
        window.marked = { parse: vi.fn(t => t) };
        window.lucide = { createIcons: vi.fn() };
    });

    it('should render the landing state initially', () => {
        expect(document.getElementById('chat-empty-state')).not.toBeNull();
        expect(document.getElementById('chat-active-state').style.display).toBe('none');
    });

    it('should render the Hero text correctly', () => {
        const heroText = document.querySelector('h1').textContent;
        expect(heroText).toContain('Namaste, Citizen');
    });

    it('should have all landing prompt cards', () => {
        const cards = document.querySelectorAll('.landing-prompt-card');
        expect(cards.length).toBeGreaterThan(0);
    });

    it('should have voice input buttons with aria-labels', () => {
        const micBtn = document.getElementById('chat-mic-landing');
        expect(micBtn.getAttribute('aria-label')).toBe('Toggle Voice Input');
    });
});
