export const FEATURES = [
  {
    icon: 'calendar-days',
    title: 'Election Timeline',
    desc: 'Walk through every phase from announcement to results.',
    route: '#timeline',
    badge: 'badge-orange',
  },
  {
    icon: 'book-open',
    title: 'Step-by-Step Guide',
    desc: 'From eligibility check to casting your vote — everything you need.',
    route: '#guide',
    badge: 'badge-blue',
  },
  {
    icon: 'bot',
    title: 'AI Chat Assistant',
    desc: 'Ask any election question in your language. Powered by Gemini.',
    route: '#chat',
    badge: 'badge-purple',
  },
  {
    icon: 'monitor-play',
    title: 'Polling Demo',
    desc: 'Interactive simulation of the voting process, from verification to the ballot unit.',
    route: '#evm',
    badge: 'badge-orange',
    isNew: true,
  },
  {
    icon: 'brain',
    title: 'Civic Quiz',
    desc: 'Test your knowledge with 20 questions on Indian democracy.',
    route: '#quiz',
    badge: 'badge-green',
  },
  {
    icon: 'book-text',
    title: 'Glossary',
    desc: 'Decode 60+ election terms — EVM, VVPAT, NOTA, MCC and more.',
    route: '#glossary',
    badge: 'badge-orange',
  },
  {
    icon: 'link',
    title: 'Official Resources',
    desc: 'Direct links to ECI, NVSP, voter helpline, state portals, and more.',
    route: '#resources',
    badge: 'badge-blue',
  },
];

export const STEPS = [
  {
    n: '01',
    title: 'Learn',
    desc: 'Understand the election process through interactive timelines and guides.',
  },
  {
    n: '02',
    title: 'Ask AI',
    desc: 'Get instant answers in your language from the Gemini-powered assistant.',
  },
  {
    n: '03',
    title: 'Vote Confidently',
    desc: 'Use official ECI links to register, verify, and head to the booth.',
  },
];

export const PROMPT_CARDS = [
  {
    title: 'Register to Vote',
    desc: 'Step-by-step guide to get your Voter ID card online.',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
  },
  {
    title: 'Find Polling Booth',
    desc: 'Locate where you need to go on election day.',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
  },
  {
    title: 'Understand EVMs',
    desc: 'Learn how Electronic Voting Machines and VVPATs work.',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>',
  },
];
