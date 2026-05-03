import { expect, test } from 'vitest';
import { ECI } from '../utils/eci-links.js';

test('ECI links should contain essential portal URLs', () => {
  expect(ECI.home).toBe('https://www.eci.gov.in');
  expect(ECI.voterPortal).toBe('https://voters.eci.gov.in');
  expect(ECI.register).toBe('https://www.nvsp.in');
  expect(ECI.helpline).toBe('tel:1950');
});

test('ECI should have mobile app links', () => {
  expect(ECI.voterApp.android).toBeDefined();
  expect(ECI.voterApp.ios).toBeDefined();
});
