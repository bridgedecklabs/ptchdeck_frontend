// ============================================================
//  LEGAL CONTENT — Privacy Policy + Terms of Service
//  Edit here to update. Replace with CMS/API later if needed.
// ============================================================

export interface LegalSection {
  heading: string
  content: string[]          // each string = one paragraph or bullet
  isList?: boolean           // true → render as <ul>
}

// ── Privacy Policy ────────────────────────────────────────────
export const PRIVACY_POLICY = {
  title: 'Privacy Policy',
  slug: '/privacy-policy',
  lastUpdated: 'March 2026',
  sections: [
    {
      heading: '1. Who we are',
      content: [
        'PtchDeck is an AI-powered pitch deck analysis platform operated by PtchDeck (ptchdeck.com). If you have questions about this policy, contact us at ptchdeck@gmail.com.',
      ],
    },
    {
      heading: '2. What information we collect',
      content: [
        'From VCs / investors who sign up: name, email address, company/firm name; password (stored as encrypted hash — we never see your actual password); pitch deck PDF files you upload; usage data: pages visited, features used, time spent.',
        'From founders who submit via the intake form: name, email, LinkedIn URL; company name, website, sector, stage, traction metrics, funding ask; pitch deck PDF.',
        'From all visitors: IP address, browser type, device type; pages visited and time on page (via analytics); cookies (see Section 6).',
      ],
    },
    {
      heading: '3. How we use your information',
      isList: true,
      content: [
        'To operate the product — scoring your decks, showing results, managing your pipeline.',
        'To send you product updates and early access communications (you can unsubscribe anytime).',
        'To improve AI scoring accuracy over time.',
        'To respond to your support requests.',
        'To comply with legal obligations.',
        'We do NOT sell your data to anyone. Ever.',
      ],
    },
    {
      heading: '4. How we store and protect your data',
      isList: true,
      content: [
        'All data stored in Supabase (PostgreSQL) hosted on AWS infrastructure.',
        'PDF files stored in Supabase Storage with signed URLs (only accessible to your firm).',
        'All connections use HTTPS/TLS encryption.',
        'Passwords are hashed using bcrypt — never stored in plain text.',
        "Each firm's data is completely isolated — other firms cannot access your deal flow.",
      ],
    },
    {
      heading: '5. Data sharing',
      content: [
        'We do not sell or share your personal data with third parties except:',
      ],
      isList: false,
    },
    {
      heading: '',
      isList: true,
      content: [
        'Supabase — our database and storage provider.',
        'Google (Gemini API) — pitch deck text is sent to Gemini AI for scoring. No personally identifiable information is included in AI prompts. We use Gemini\'s API under Google\'s data processing terms.',
        'Vercel — hosts our frontend. Receives request logs.',
        'We may disclose data if required by law or court order.',
      ],
    },
    {
      heading: '6. Cookies',
      content: [
        'We use minimal cookies:',
      ],
    },
    {
      heading: '',
      isList: true,
      content: [
        'Session cookie: keeps you logged in.',
        'Analytics cookie: anonymous usage tracking (no personal data).',
        'We do not use advertising cookies or third-party tracking pixels.',
      ],
    },
    {
      heading: '7. Your rights',
      isList: true,
      content: [
        'Access the data we hold about you — email us and we\'ll send it within 7 days.',
        'Delete your account and all associated data — email ptchdeck@gmail.com.',
        'Correct inaccurate information — update via Settings or email us.',
        'Export your data — we\'ll provide a CSV of your account data on request.',
      ],
    },
    {
      heading: '8. Data retention',
      isList: true,
      content: [
        'Active accounts: data retained as long as your account exists.',
        'Deleted accounts: all data permanently deleted within 30 days.',
        'Pitch deck PDFs: deleted when you delete a deck or close your account.',
      ],
    },
    {
      heading: '9. Children',
      content: [
        'PtchDeck is not intended for anyone under 18. We do not knowingly collect data from minors.',
      ],
    },
    {
      heading: '10. Changes to this policy',
      content: [
        "We'll notify you by email if we make significant changes. Continued use after notification means you accept the updated policy.",
      ],
    },
  ] as LegalSection[],
}

// ── Terms of Service ──────────────────────────────────────────
export const TERMS_OF_SERVICE = {
  title: 'Terms of Service',
  slug: '/terms-of-service',
  lastUpdated: 'March 2026',
  sections: [
    {
      heading: '1. Acceptance',
      content: [
        "By creating an account or using PtchDeck, you agree to these Terms. If you don't agree, do not use the service.",
      ],
    },
    {
      heading: '2. What PtchDeck is',
      content: [
        'PtchDeck provides AI-powered analysis of pitch deck PDFs. The scores and summaries generated are informational tools only. They are not investment advice, legal advice, or financial recommendations. All investment decisions remain entirely your own responsibility.',
      ],
    },
    {
      heading: '3. Your account',
      isList: true,
      content: [
        'You must provide accurate information when signing up.',
        'You are responsible for keeping your password secure.',
        'One account per person. You may invite team members through the platform.',
        'You must be 18 or older to use PtchDeck.',
        'You are responsible for all activity under your account.',
      ],
    },
    {
      heading: '4. Acceptable use',
      content: ['You may NOT use PtchDeck to:'],
    },
    {
      heading: '',
      isList: true,
      content: [
        "Upload content you don't have the right to share.",
        'Attempt to reverse-engineer, scrape, or copy the platform.',
        'Upload malicious files or attempt to compromise the system.',
        'Violate any applicable laws or regulations.',
        "Resell or redistribute PtchDeck's AI analysis without permission.",
        'Share login credentials with people outside your firm.',
      ],
    },
    {
      heading: '5. Uploaded content',
      isList: true,
      content: [
        'You retain full ownership of all pitch decks and data you upload.',
        'By uploading, you grant PtchDeck a limited license to process files solely for the purpose of generating analysis for you.',
        'We do not claim ownership of your content.',
        'We do not share your uploaded decks with other users or firms.',
        'We use aggregated, anonymized data to improve the AI — never your identifiable firm data.',
      ],
    },
    {
      heading: '6. Founder submissions',
      content: ['If you are a founder submitting a pitch deck through a VC\'s intake form:'],
    },
    {
      heading: '',
      isList: true,
      content: [
        'Your submission is shared only with the specific VC firm whose form you used.',
        'PtchDeck does not independently review or evaluate your submission.',
        'Submission does not guarantee any response from the VC firm.',
      ],
    },
    {
      heading: '7. Early access',
      content: ['PtchDeck is currently in early access and provided free of charge. We reserve the right to:'],
    },
    {
      heading: '',
      isList: true,
      content: [
        'Introduce paid plans with advance notice.',
        'Change or remove features.',
        'Limit usage during the early access period.',
        'We will notify you by email before any pricing changes take effect.',
      ],
    },
    {
      heading: '8. Availability',
      content: [
        'We aim for high uptime but do not guarantee uninterrupted access. We may perform maintenance at any time. We are not liable for losses caused by downtime.',
      ],
    },
    {
      heading: '9. AI limitations',
      isList: true,
      content: [
        'Is not always accurate and should not be the sole basis for investment decisions.',
        'May make errors in text extraction from certain PDF formats.',
        'Is continuously being improved.',
        'Does not replace human judgment.',
      ],
    },
    {
      heading: '10. Limitation of liability',
      content: [
        'PtchDeck is provided "as is." To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the platform, including missed investment opportunities or decisions made based on AI scores.',
      ],
    },
    {
      heading: '11. Termination',
      content: [
        'We may suspend or terminate accounts that violate these Terms. You may delete your account at any time via Settings or by emailing ptchdeck@gmail.com.',
      ],
    },
    {
      heading: '12. Governing law',
      content: [
        'These Terms are governed by the laws of India. Any disputes will be resolved in the courts of Delhi.',
      ],
    },
    {
      heading: '13. Contact',
      content: [
        'For any questions about these Terms: ptchdeck@gmail.com',
      ],
    },
  ] as LegalSection[],
}
