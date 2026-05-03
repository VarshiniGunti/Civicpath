import { ECI } from '../utils/eci-links.js';

export const CHAPTERS = [
  {
    id: 'c1',
    icon: '<i data-lucide="check-circle-2"></i>',
    title: 'Am I Eligible to Vote?',
    content: `<p>You are eligible to vote in India if you meet all of the following:</p>
    <ul style="margin-top:12px;display:flex;flex-direction:column;gap:10px;list-style:none;">
      <li style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#22c55e;font-size:16px;flex-shrink:0;">✓</span><div><strong>Age:</strong> 18 years or above on the qualifying date (1st January of the year)</div></li>
      <li style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#22c55e;font-size:16px;flex-shrink:0;">✓</span><div><strong>Citizenship:</strong> Must be a citizen of India</div></li>
      <li style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#22c55e;font-size:16px;flex-shrink:0;">✓</span><div><strong>Residence:</strong> Ordinarily resident of the constituency where you wish to register</div></li>
      <li style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#ef4444;font-size:16px;flex-shrink:0;">✗</span><div><strong>Disqualified if:</strong> Unsound mind (declared by court), imprisoned, or disqualified under any election law</div></li>
    </ul>
    <div style="margin-top:16px;padding:13px 16px;background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.15);border-radius:10px;font-size:13px;color:var(--color-muted);">
      NRIs can register at their constituency in India using <strong style="color:var(--color-text);">Form 6A</strong>.
    </div>`,
  },
  {
    id: 'c2',
    icon: '<i data-lucide="clipboard-list"></i>',
    title: 'How to Register as a Voter',
    content: `<p>Registration is done via the <strong>NVSP / Voter Service Portal</strong>. Here's how:</p>
    <ol style="margin-top:12px;display:flex;flex-direction:column;gap:10px;padding-left:20px;">
      <li>Visit <a href="${ECI.register}" target="_blank" style="color:#f59e0b;">voters.eci.gov.in/register ↗</a></li>
      <li>Click <strong>"New Voter Registration"</strong> → Fill <strong>Form 6</strong></li>
      <li>Upload: Proof of Age (Aadhaar / Birth Certificate / Passport) + Proof of Residence</li>
      <li>Submit and note your <strong>reference number</strong> to track status</li>
    </ol>
    <div style="margin-top:16px;padding:13px 16px;background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.15);border-radius:10px;font-size:13px;color:var(--color-muted);">
      <strong style="color:var(--color-text);">Alternative:</strong> Download the <em>Voter Helpline App</em> from Play Store / App Store and register from your phone.
    </div>`,
  },
  {
    id: 'c3',
    icon: '<i data-lucide="search"></i>',
    title: 'Check Your Registration Status',
    content: `<p>To verify if your name is in the electoral roll:</p>
    <ol style="margin-top:12px;display:flex;flex-direction:column;gap:10px;padding-left:20px;">
      <li>Go to <a href="${ECI.searchVoter}" target="_blank" style="color:#f59e0b;">voters.eci.gov.in ↗</a></li>
      <li>Click <strong>"Search in Electoral Roll"</strong></li>
      <li>Search by <strong>EPIC number</strong> or by Name + Date of Birth + State</li>
      <li>Your polling booth address will also be shown</li>
    </ol>
    <p style="margin-top:12px;font-size:13px;color:var(--color-muted);">To track a pending application: <a href="${ECI.trackApp}" target="_blank" style="color:#f59e0b;">Track Application Status ↗</a></p>`,
  },
  {
    id: 'c4',
    icon: '<i data-lucide="credit-card"></i>',
    title: 'Download Your e-EPIC (Digital Voter ID)',
    content: `<p>The <strong>e-EPIC</strong> is a portable digital version of your Voter ID card (PDF format) valid for all purposes.</p>
    <ol style="margin-top:12px;display:flex;flex-direction:column;gap:10px;padding-left:20px;">
      <li>Go to <a href="${ECI.eEpic}" target="_blank" style="color:#f59e0b;">voters.eci.gov.in/e-epic-download ↗</a></li>
      <li>Log in or verify via OTP on your registered mobile</li>
      <li>Download your EPIC card as a PDF</li>
      <li>Save it on your phone — valid at polling booths</li>
    </ol>`,
  },
  {
    id: 'c5',
    icon: '<i data-lucide="map-pin"></i>',
    title: 'Find Your Polling Booth',
    content: `<p>Your polling booth is determined by your registered address. To find it:</p>
    <ol style="margin-top:12px;display:flex;flex-direction:column;gap:10px;padding-left:20px;">
      <li>Visit <a href="${ECI.boothFinder}" target="_blank" style="color:#f59e0b;">voters.eci.gov.in/pollingstation ↗</a></li>
      <li>Enter your EPIC number or search by name</li>
      <li>Your booth name, address, and part number will appear</li>
      <li>You can also call <strong>1950</strong> for booth information</li>
    </ol>
    <div style="margin-top:16px;padding:13px 16px;background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.15);border-radius:10px;font-size:13px;color:var(--color-muted);">
      Your booth will not change unless you move to a new constituency and update your address.
    </div>`,
  },
  {
    id: 'c6',
    icon: '<i data-lucide="archive"></i>',
    title: 'On Election Day — Step by Step',
    content: `<p><strong>What to carry:</strong></p>
    <p style="font-size:13px;margin:8px 0 10px;color:var(--color-muted);">Your EPIC (Voter ID card) OR any ONE of these 12 alternatives:</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:13px;margin-bottom:16px;">
      ${['Aadhaar Card','MNREGA Job Card','Passbook with photo','Health Insurance Smart Card','Driving Licence','PAN Card','Smart Card (NPR)','Indian Passport','Pension Document with photo','Service ID (Govt employees)','MP/MLA/MLC ID Card','Unique Disability ID'].map((d) => `<div style="background:rgba(245,158,11,0.05);border:1px solid rgba(245,158,11,0.12);border-radius:8px;padding:7px 10px;color:var(--color-muted);">✓ ${d}</div>`).join('')}
    </div>
    <p><strong>At the booth:</strong></p>
    <ol style="margin-top:10px;display:flex;flex-direction:column;gap:8px;padding-left:20px;font-size:14px;color:var(--color-muted);">
      <li>Show your ID to the Presiding Officer</li>
      <li>Your name is verified in the electoral roll</li>
      <li>Ink is applied to your left index finger</li>
      <li>You receive a ballot slip</li>
      <li>Enter the voting compartment — press the blue button on the EVM next to your candidate</li>
      <li>VVPAT slip appears for 7 seconds showing your vote — this is for verification only</li>
    </ol>`,
  },
  {
    id: 'c7',
    icon: '<i data-lucide="scale"></i>',
    title: 'Your Rights at the Polling Booth',
    content: `<ul style="display:flex;flex-direction:column;gap:12px;list-style:none;">
      <li style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#22c55e;flex-shrink:0;font-size:16px;">✓</span><div><strong>Secret Ballot:</strong> No one can compel you to reveal your vote</div></li>
      <li style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#22c55e;flex-shrink:0;font-size:16px;">✓</span><div><strong>NOTA:</strong> You can press "None Of The Above" if you reject all candidates</div></li>
      <li style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#22c55e;flex-shrink:0;font-size:16px;">✓</span><div><strong>Assistance:</strong> Persons with disabilities can bring a companion to assist</div></li>
      <li style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#22c55e;flex-shrink:0;font-size:16px;">✓</span><div><strong>Queue protection:</strong> If you are in queue before 6 PM, you must be allowed to vote</div></li>
      <li style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#22c55e;flex-shrink:0;font-size:16px;">✓</span><div><strong>Complaints:</strong> Report any irregularity to the Presiding Officer or call 1950</div></li>
      <li style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#ef4444;flex-shrink:0;font-size:16px;">✗</span><div><strong>Prohibited:</strong> Influencing others inside 200m of booth, mobile phones inside booth</div></li>
    </ul>`,
  },
  {
    id: 'c8',
    icon: '<i data-lucide="bar-chart-3"></i>',
    title: 'After You Vote — Tracking Results',
    content: `<p>Once polling is complete:</p>
    <ul style="margin-top:12px;display:flex;flex-direction:column;gap:10px;list-style:none;color:var(--color-muted);">
      <li>📌 Counting happens at designated centres a few days after polling</li>
      <li>📌 Track live trends at <a href="https://results.eci.gov.in" target="_blank" style="color:#f59e0b;">results.eci.gov.in ↗</a></li>
      <li>📌 The winning candidate is issued a Certificate of Election</li>
      <li>📌 Results can be challenged in High Court within 45 days</li>
    </ul>
    <div style="margin-top:16px;padding:13px 16px;background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.15);border-radius:10px;font-size:13px;color:var(--color-muted);">
      The indelible ink on your finger lasts about 2–3 weeks. It proves you exercised your democratic right! 🎉
    </div>`,
  },
];
