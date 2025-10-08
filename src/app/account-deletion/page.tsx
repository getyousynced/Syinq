import LegalLayout, { LegalSection } from '@/components/LegalLayout';

export const metadata = {
  title: 'Account Deletion | Syinq',
  description: 'How to request deletion of your Syinq account and what data is removed or retained.'
};

const LAST_UPDATED = 'September 22, 2025';

const sections: LegalSection[] = [
  {
    id: 'delete-process',
    title: '1. How to Request Deletion',
    content: <div className="space-y-4 text-sm">
      <p>You can request deletion of your Syinq account directly in the app or by email. Deletion is permanent and most personal data cannot be restored once processed.</p>
      <ol className="list-decimal pl-5 space-y-1">
        <li><span className="font-semibold">In the App:</span> Go to <em>Profile → Settings &amp; Privacy → Delete Account</em> and follow on‑screen confirmation.</li>
        <li><span className="font-semibold">Email:</span> Send a message to <a href="mailto:support@syinq.com" className="text-syinq-blue">support@syinq.com</a> with the subject <em>“Delete My Account”</em> from the same registered email.</li>
      </ol>
      <p>We will queue the request and send a confirmation email. If you signed in via a university SSO, ensure you still control that email address.</p>
    </div>
  },
  {
    id: 'data-removed',
    title: '2. Data That Will Be Deleted',
    content: <ul className="list-disc pl-5 space-y-1 text-sm">
      <li>Profile info (name, email, phone, photo)</li>
      <li>Ride offers, ride requests, history</li>
      <li>Chats, likes, marketplace listings</li>
      <li>Verification documents & uploaded IDs (when stored)</li>
    </ul>
  },
  {
    id: 'data-retained',
    title: '3. Data That May Be Temporarily Retained',
    content: <div className="space-y-3 text-sm">
      <p>Certain minimal records may be retained for up to 90 days strictly for:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Legal or regulatory compliance</li>
        <li>Security &amp; fraud prevention (abuse pattern auditing)</li>
        <li>Dispute resolution & chargeback investigations</li>
      </ul>
      <p>After the retention window expires, remaining personal data is irreversibly purged or anonymized.</p>
    </div>
  },
  {
    id: 'cancelling',
    title: '4. Cancelling a Deletion Request',
    content: <p>If you submitted a deletion request in error, contact <a href="mailto:support@syinq.com" className="text-syinq-blue">support@syinq.com</a> immediately. If processing has already commenced, restoration may not be possible.</p>
  },
  {
    id: 'timeline',
    title: '5. Processing Timeline',
    content: <p>Most deletions complete within 7 days. Some residual backups may require up to 30–90 days to cycle out, during which data is isolated and not used for active processing.</p>
  },
  {
    id: 'contact',
    title: '6. Questions',
    content: <p>Questions about deletion, data portability, or privacy? Email <a className="text-syinq-blue" href="mailto:support@syinq.com">support@syinq.com</a>.</p>
  }
];

export default function AccountDeletionPage() {
  return (
    <LegalLayout
      docTitle="Account Deletion"
      subtitle="Understand how to permanently delete your Syinq account and what happens to your data."
      lastUpdated={LAST_UPDATED}
      sections={sections}
      crossLink={{ href: '/privacy#account-deletion', label: 'Privacy Policy Section', prefix: 'Need broader privacy details?' }}
    />
  );
}
