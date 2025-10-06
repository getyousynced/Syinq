import LegalLayout, { LegalSection } from '@/components/LegalLayout';

export const metadata = { title: 'Privacy Policy | Syinq', description: 'Understand how Syinq collects, uses, and protects your personal information.' };
const LAST_UPDATED = 'September 22, 2025';
const sections: LegalSection[] = [
  { id: 'sec-1', title: '1. Information We Collect', content: <p>We collect information you provide (account details, university verification data, listings, forum posts) and technical data (device, usage logs, coarse location for carpool relevance). We minimize collection and do not harvest unrelated personal data.</p> },
  { id: 'sec-2', title: '2. How We Use Information', content: <ul className="list-disc pl-5 space-y-1"><li>Operate core features (carpooling coordination, listings, messaging, forum).</li><li>Verify student status to maintain a trusted community.</li><li>Improve product performance and safety (analytics, abuse prevention).</li><li>Communicate updates, feature notices, and safety alerts.</li></ul> },
  { id: 'sec-3', title: '3. Legal Basis', content: <p>Our processing bases may include consent (optional features), legitimate interest (platform security & improvement), and contractual necessity (providing requested services).</p> },
  { id: 'sec-4', title: '4. Sharing & Disclosure', content: <p>We do not sell personal data. Limited sharing occurs with service providers (infrastructure, analytics, email delivery) bound by confidentiality. Content you intentionally post (forum, listings) becomes visible to other verified users.</p> },
  { id: 'sec-5', title: '5. Data Security', content: <p>We apply encryption in transit, principle of least privilege, monitoring, and periodic security reviews. No system is 100% secure; report issues to <a href="mailto:support@syinq.com" className="text-syinq-blue">support@syinq.com</a>.</p> },
  { id: 'sec-6', title: '6. Data Retention', content: <p>We retain data only as long as needed for active accounts and legal/compliance requirements. Inactive or closed accounts are scheduled for anonymization or deletion within a reasonable timeframe.</p> },
  { id: 'sec-7', title: '7. Your Rights', content: <p>You may request access, correction, deletion, or restriction of your personal data. Contact us at <a href="mailto:support@syinq.com" className="text-syinq-blue">support@syinq.com</a>. Some rights may depend on jurisdiction.</p> },
  { id: 'sec-8', title: '8. Cookies & Tracking', content: <p>We use minimal cookies / local storage for authentication and session continuity. Optional analytics cookies (if any) will be disclosed with controls.</p> },
  { id: 'sec-9', title: '9. Student Verification Data', content: <p>Verification artifacts (e.g., university email domain, ID metadata) are used solely to confirm status and prevent fraud. We avoid storing unnecessary ID imagery where possible.</p> },
  { id: 'sec-10', title: '10. Third-Party Services', content: <p>Integrated services (cloud hosting, communication tools, analytics) process data under their own compliant terms. We vet vendors for security posture.</p> },
  { id: 'sec-11', title: '11. International Transfers', content: <p>Where data crosses borders, we implement appropriate safeguards (e.g., standard contractual clauses) consistent with applicable regulations.</p> },
  { id: 'sec-12', title: '12. Children / Minors', content: <p>The platform is intended for university-level students. We do not knowingly collect data from individuals below the minimum age for higher education enrollment in their jurisdiction.</p> },
  { id: 'sec-13', title: '13. Changes to Policy', content: <p>We may update this Policy; material changes will be communicated via in-app notice or email. Continued use after updates signifies acceptance.</p> },
  { id: 'sec-14', title: '14. Contact', content: <p>All inquiries: <a href="mailto:support@syinq.com" className="text-syinq-blue">support@syinq.com</a>.</p> }
];
export default function PrivacyPage() { return (<LegalLayout docTitle="Privacy Policy" subtitle="This Privacy Policy explains what data we collect, why we collect it, and how we safeguard it to keep the Syinq community safe." lastUpdated={LAST_UPDATED} sections={sections} crossLink={{ href: '/terms', label: 'Terms & Conditions', prefix: 'Need our Terms?' }} />); }

