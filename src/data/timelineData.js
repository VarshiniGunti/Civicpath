export const PHASES = [
  {
    id: 1,
    icon: '<i data-lucide="megaphone"></i>',
    title: 'Election Announcement',
    status: 'done',
    badge: 'badge-blue',
    summary: 'ECI announces election dates. Model Code of Conduct comes into force immediately.',
    details:
      'The Election Commission formally announces the schedule 4–6 weeks before polling. The <strong>Model Code of Conduct (MCC)</strong> activates instantly — no new government schemes or inaugurations are allowed after this point.<br><br><span style="color:#f59e0b;font-weight:600;">Your action:</span> Check your name in the electoral roll at voters.eci.gov.in.',
  },
  {
    id: 2,
    icon: '<i data-lucide="clipboard-list"></i>',
    title: 'Model Code of Conduct',
    status: 'done',
    badge: 'badge-orange',
    summary: 'Guidelines governing conduct of parties, candidates, and the ruling government.',
    details:
      'The MCC prohibits: new policy announcements by the ruling govt, use of govt machinery for campaigns, and hate speech. Violations can be reported to ECI at <strong>1950</strong>.<br><br><span style="color:#f59e0b;font-weight:600;">Your action:</span> Report MCC violations to your Returning Officer or call 1950.',
  },
  {
    id: 3,
    icon: '<i data-lucide="file-edit"></i>',
    title: 'Nomination Filing',
    status: 'done',
    badge: 'badge-purple',
    summary: 'Candidates submit nomination papers and affidavits to the Returning Officer.',
    details:
      'Candidates file <strong>Form 2B</strong> with the Returning Officer (RO). They must submit an affidavit disclosing assets, liabilities & criminal record. Security deposit: ₹25,000 (Lok Sabha), ₹10,000 (Vidhan Sabha).<br><br><span style="color:#f59e0b;font-weight:600;">Your action:</span> Read candidate affidavits at myneta.info.',
  },
  {
    id: 4,
    icon: '<i data-lucide="search"></i>',
    title: 'Scrutiny of Nominations',
    status: 'done',
    badge: 'badge-green',
    summary: 'Returning Officer examines nominations for validity and eligibility.',
    details:
      'Happens one day after the last nomination date. The RO checks completeness and legal eligibility. Candidates or their agents may be present. Invalid nominations are rejected.',
  },
  {
    id: 5,
    icon: '<i data-lucide="undo-2"></i>',
    title: 'Withdrawal of Candidatures',
    status: 'done',
    badge: 'badge-orange',
    summary: 'Candidates may withdraw nominations within 2 days of scrutiny.',
    details:
      'After scrutiny, there is a 2-day withdrawal window. Once it closes, the final list of contesting candidates is published and EVM ballot order is fixed alphabetically.',
  },
  {
    id: 6,
    icon: '<i data-lucide="speaker"></i>',
    title: 'Election Campaign',
    status: 'active',
    badge: 'badge-blue',
    summary: 'Parties and candidates campaign via rallies, media, and door-to-door visits.',
    details:
      'Campaign period runs until 48 hours before polling. Expenditure limits: ₹95 lakh (Lok Sabha), ₹40 lakh (Vidhan Sabha). Paid ads require ECI pre-certification.<br><br><span style="color:#f59e0b;font-weight:600;">Your action:</span> Evaluate manifestos. Report vote-buying to 1950.',
  },
  {
    id: 7,
    icon: '<i data-lucide="volume-x"></i>',
    title: 'Campaign Silence (48 hrs)',
    status: 'upcoming',
    badge: 'badge-orange',
    summary: 'No campaigning allowed 48 hours before polling starts — Section 126 RPA 1951.',
    details:
      'No public meetings, rallies, or TV/radio campaign content. Social media posts are allowed but no paid ads. This period allows voters to reflect without pressure.',
  },
  {
    id: 8,
    icon: '<i data-lucide="archive"></i>',
    title: 'Polling Day',
    status: 'upcoming',
    badge: 'badge-green',
    summary: 'Voters cast their ballot at designated booths — 7 AM to 6 PM.',
    details:
      '<strong>Carry:</strong> EPIC (Voter ID) or any of 12 alternative photo IDs.<br><strong>Timings:</strong> 7:00 AM – 6:00 PM (varies by area).<br><strong>Inside booth:</strong> No mobile phones allowed. Indelible ink applied after voting. VVPAT slip shows for 7 seconds after pressing EVM.<br><br><span style="color:#f59e0b;font-weight:600;">Your action:</span> Find your booth at voters.eci.gov.in/pollingstation',
    calendarLink:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Election+Polling+Day&details=Remember+to+carry+your+EPIC+(Voter+ID)+and+vote!+Check+your+polling+booth+at+voters.eci.gov.in',
  },
  {
    id: 9,
    icon: '<i data-lucide="bar-chart-2"></i>',
    title: 'Vote Counting',
    status: 'upcoming',
    badge: 'badge-purple',
    summary: 'EVMs opened and votes counted at designated centres under ECI supervision.',
    details:
      'Counting agents of each candidate are allowed inside. EVMs are opened round by round. VVPAT slips from 5 randomly selected booths are matched. Live results at results.eci.gov.in.',
  },
  {
    id: 10,
    icon: '<i data-lucide="party-popper"></i>',
    title: 'Result Declaration',
    status: 'upcoming',
    badge: 'badge-green',
    summary: 'Winners declared and Certificate of Election issued by Returning Officer.',
    details:
      'The winning candidate takes oath before the Speaker. Losers can challenge results in High Court within 45 days. Security deposit forfeited if candidate gets less than 1/6 of valid votes.',
    calendarLink:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Election+Result+Day&details=Check+live+results+at+results.eci.gov.in',
  },
];

export const statusColors = {
  done: { bg: 'rgba(34,197,94,0.12)', border: '#22c55e', color: '#22c55e', label: '✓ Done' },
  active: { bg: 'rgba(245,158,11,0.15)', border: '#f59e0b', color: '#f59e0b', label: '● Live' },
  upcoming: { bg: 'rgba(42,38,24,0.8)', border: 'rgba(245,158,11,0.2)', color: '#78716c', label: 'Upcoming' },
};
