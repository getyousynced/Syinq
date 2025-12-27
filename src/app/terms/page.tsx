"use client";

import LegalLayout, { LegalSection } from '@/components/LegalLayout';
const LAST_UPDATED = 'September 22, 2025';
const sections: LegalSection[] = [
  { id: 'section-1', title: '1. Acceptance of Terms', content: <p>By creating an account, accessing, or using Syinq, you agree to be bound by these Terms. If you do not agree, you must discontinue use of the platform.</p> },
  { id: 'section-2', title: '2. Eligibility', content: <p>Syinq is intended solely for currently enrolled university or college students. You represent that the information you provide for verification is accurate and truthful.</p> },
  { id: 'section-3', title: '3. Account & Verification', content: <p>You are responsible for safeguarding your login credentials. Student verification measures (e.g., institutional email, ID validation) must not be misused or shared.</p> },
  { id: 'section-4', title: '4. Permitted Use', content: <p>Use the platform only for legitimate student-to-student interactions related to transportation coordination, peer marketplace exchange, and community discussion.</p> },
  { id: 'section-5', title: '5. Prohibited Conduct', content: <ul className="list-disc pl-5 space-y-1"><li>Harassment, discrimination, or abusive behavior.</li><li>Posting fraudulent, misleading, or illegal listings.</li><li>Attempting to bypass safety or verification features.</li><li>Reverse engineering or interfering with platform operations.</li></ul> },
  { id: 'section-6', title: '6. Marketplace & Carpooling', content: <p>Transactions and ride arrangements are performed at users&apos; own risk. Syinq does not own listed items or vehicles and does not guarantee the conduct of users. Follow campus and local regulations.</p> },
  { id: 'section-7', title: '7. Community Forum', content: <p>Community spaces are moderated for safety. We may remove content or suspend accounts that violate these Terms or applicable laws.</p> },
  { id: 'section-8', title: '8. Intellectual Property', content: <p>All Syinq trademarks, branding, and software are owned by or licensed to us. You may not copy, distribute, or modify platform assets except as permitted by law.</p> },
  { id: 'section-9', title: '9. User Content License', content: <p>By posting content you grant Syinq a non-exclusive, worldwide, royalty-free license to use, display, and distribute such content solely for operating and improving the platform.</p> },
  { id: 'section-10', title: '10. Disclaimers', content: <p>The platform is provided on an <em>“as is”</em> basis without warranties of any kind. We disclaim implied warranties of merchantability, fitness, and non-infringement.</p> },
  { id: 'section-11', title: '11. Limitation of Liability', content: <p>To the maximum extent permitted by law, Syinq is not liable for indirect, incidental, special, or consequential damages arising from your use of the platform.</p> },
  { id: 'section-12', title: '12. Termination', content: <p>We may suspend or terminate access for violations of these Terms or for conduct that harms the platform or users.</p> },
  { id: 'section-13', title: '13. Changes to Terms', content: <p>We may update these Terms. Continued use after changes constitutes acceptance. The “Last Updated” date reflects the latest revision.</p> },
  { id: 'section-14', title: '14. Governing Law', content: <p>These Terms are governed by applicable laws in the jurisdiction in which Syinq operates. Disputes will be resolved in the competent courts of that jurisdiction.</p> },
  { id: 'section-15', title: '15. Contact', content: <p>Questions about these Terms? Reach us at <a href="mailto:support@syinq.com" className="text-syinq-blue">support@syinq.com</a>.</p> }
];
export default function TermsPage() {
  return (
    <LegalLayout
      docTitle="Terms & Conditions"
  subtitle='These Terms & Conditions ("Terms") govern your access to and use of the Syinq platform and services provided exclusively for university students.'
      lastUpdated={LAST_UPDATED}
      sections={sections}
      crossLink={{ href: '/privacy', label: 'Privacy Policy', prefix: 'Need our Privacy Policy?' }}
    />
  );
}

