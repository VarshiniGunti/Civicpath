import { ECI } from '../utils/eci-links.js';

export const QUICK_ACTIONS = [
  { icon: '<i data-lucide="file-pen-line"></i>', label: 'Register to Vote', desc: 'First-time voter? Register online in minutes.', href: ECI.register, color: '#22c55e' },
  { icon: '<i data-lucide="search"></i>', label: 'Check Registration', desc: 'Verify your name is in the electoral roll.', href: ECI.searchVoter, color: '#3b82f6' },
  { icon: '<i data-lucide="map-pin"></i>', label: 'Find Your Polling Booth', desc: 'Know where to go on election day.', href: ECI.boothFinder, color: '#f59e0b' },
  { icon: '<i data-lucide="credit-card"></i>', label: 'Download e-EPIC', desc: 'Get your digital Voter ID card (PDF).', href: ECI.eEpic, color: '#8b5cf6' },
  { icon: '<i data-lucide="smartphone"></i>', label: 'Voter Helpline App', desc: 'Official ECI app — register and track on mobile.', href: ECI.voterApp.android, color: '#22c55e' },
  { icon: '<i data-lucide="phone"></i>', label: 'Call Helpline 1950', desc: 'Free helpline for all election queries.', href: ECI.helpline, color: '#f59e0b' },
];

export const ECI_PORTALS = [
  ['ECI Main Website', ECI.home, 'Main portal for Election Commission of India'],
  ["Voters' Service Portal", ECI.voterPortal, 'Register, update, and download e-EPIC'],
  ['NVSP Portal', ECI.nvsp, "National Voters' Service Portal"],
  ['Election Results', ECI.results, 'Live and past election results'],
];

export const STATE_CEOS = [
  // ── States with verified official portals ──
  ['Andhra Pradesh', 'https://ceoandhra.nic.in'],
  ['Assam', 'https://ceoassam.nic.in'],
  ['Bihar', 'https://ceobihar.nic.in'],
  ['Gujarat', 'https://ceo.gujarat.gov.in'],
  ['Haryana', 'https://ceoharyana.gov.in'],
  ['Karnataka', 'https://ceokarnataka.kar.nic.in'],
  ['Kerala', 'https://www.ceo.kerala.gov.in'],
  ['Madhya Pradesh', 'https://ceomadhyapradesh.nic.in'],
  ['Maharashtra', 'https://ceo.maharashtra.gov.in'],
  ['Odisha', 'https://ceoorissa.nic.in'],
  ['Punjab', 'https://ceopunjab.nic.in'],
  
  ['Tamil Nadu', 'https://www.elections.tn.gov.in'],
  ['Telangana', 'https://ceotelangana.nic.in'],
  ['Uttar Pradesh', 'https://ceouttarpradesh.nic.in'],
  ['Uttarakhand', 'https://ceo.uk.gov.in'],
  ['West Bengal', 'https://ceowestbengal.nic.in'],
  // ── Union Territories with verified official portals ──
  ['Delhi (NCT)', 'https://ceodelhi.gov.in'],
];
