// ============================================================
//  LANDING PAGE CONTENT — Single source of truth
//  Edit here to update copy across the entire homepage.
//  Replace with API call later without touching components.
// ============================================================

// ── Hero ──────────────────────────────────────────────────────
export const HERO = {
  subheading:
    'Upload a pitch deck PDF. Get an AI score across market size, team, traction, and product vision — in under 10 seconds.',
  cta1: 'Analyze a Deck Free',
  cta2: 'See How It Works',
}

// ── Stats Bar (real industry numbers — cited sources) ─────────
export const STATS = [
  {
    number: '2 min 24 sec',
    label: 'Avg time a VC reads a deck manually',
    source: 'DocSend / Funding Blueprint 2024–25',
  },
  {
    number: 'Under 10 sec',
    label: 'PtchDeck AI analysis time',
    source: 'Product claim — verifiable',
  },
  {
    number: '97%',
    label: 'of VC firms now use AI in deal screening',
    source: 'Deloitte 2025 M&A Trends Survey',
  },
  {
    number: '< 1%',
    label: 'of pitch decks ever get funded',
    source: 'NVCA 2025 Yearbook',
  },
]

// ── Problem → Solution ────────────────────────────────────────
export const PROBLEM = {
  heading: 'The old way is broken',
  left: {
    heading: 'The old way',
    items: [
      'A typical VC receives 1,000–3,000 pitch decks per year',
      'The average investor spends just 2 minutes 24 seconds per deck',
      'Great deals get missed — not because the startup was bad, but because there was no time',
      'No consistent scoring — every team member notices different things',
    ],
  },
  right: {
    heading: 'PtchDeck fixes this',
    items: [
      'AI reads and scores every deck in under 10 seconds',
      'Consistent 4-dimension scoring — every deck, every time',
      'Everything in one Scoreboard — filter, sort, compare at a glance',
      'Founders get automatic status updates — no more inbox noise',
    ],
  },
}

// ── How It Works ──────────────────────────────────────────────
export const HOW_IT_WORKS = {
  heading: 'How PtchDeck Works',
  subheading: 'Three steps. Under 60 seconds from upload to decision.',
  steps: [
    {
      number: '01',
      title: 'Upload any pitch deck',
      body: 'Drag and drop any PDF pitch deck into PtchDeck. Works with any deck, any number of slides.',
    },
    {
      number: '02',
      title: 'AI scores it instantly',
      body: 'Our AI reads the full deck and returns a score out of 100 across market size, team strength, traction, and product vision — with written reasoning for each.',
    },
    {
      number: '03',
      title: 'Compare and decide',
      body: 'All your deals in one Scoreboard. Sort by score. Filter by sector or stage. Move the best ones into your pipeline.',
    },
  ],
}

// ── Features Grid (only show what is actually built) ──────────
export const FEATURES = {
  heading: 'Everything your deal team needs',
  subheading: 'Built for high-volume pitch deck review — not general CRM.',
  cards: [
    {
      icon: '🤖',
      title: 'AI Scoring',
      body: 'Every deck gets a score out of 100 with reasoning across market size, team, traction, and product vision. In under 10 seconds.',
    },
    {
      icon: '📊',
      title: 'Scoreboard',
      body: 'All your analyzed decks in one filterable, sortable table. Find the best deals in seconds — not hours.',
    },
    {
      icon: '📋',
      title: 'Deal Pipeline',
      body: 'Move deals from sourcing to term sheet on a Kanban board. Never lose track of where a deal stands.',
    },
    {
      icon: '📝',
      title: 'Founder Portal',
      body: 'Founders submit directly to you with structured info. You get clean data, not a random PDF in your inbox.',
    },
  ],
}

// ── Who It's For ──────────────────────────────────────────────
export const WHO_ITS_FOR = {
  heading: 'Built for investors who move fast',
  body: 'PtchDeck is built for venture capital firms, accelerators, and incubators that review more than 10 pitch decks a week.',
}

// ── FAQ (written with long-tail SEO keywords — do not rewrite) ─
export const FAQ = [
  {
    q: 'How does PtchDeck analyze a pitch deck?',
    a: 'You upload any PDF pitch deck. Our AI extracts the full content and scores it across four dimensions — market size, team strength, traction, and product vision — returning a score out of 100 with written reasoning for each dimension. The full analysis takes under 10 seconds.',
  },
  {
    q: 'Is PtchDeck built for VCs or founders?',
    a: 'Primarily for VCs, accelerators, and incubators doing high-volume deal screening. Founders can submit decks directly through a public intake form, but the core product is the investor-side scoreboard and pipeline management tool.',
  },
  {
    q: 'How is this different from reading pitch decks manually?',
    a: 'Manual review takes 20–60 minutes per deck and is inconsistent — different team members notice different things. PtchDeck scores every deck the same way in under 10 seconds, so your whole team works from the same objective signal. You still make the final call.',
  },
  {
    q: 'What file format do you need?',
    a: 'PDF only. Upload any pitch deck PDF — the AI handles text extraction and analysis automatically. There is no slide limit.',
  },
  {
    q: 'Is my deal flow data private and confidential?',
    a: "Yes. Each firm's data is completely isolated in its own workspace. We never share your deal flow with other firms or use it to train shared AI models.",
  },
  {
    q: 'Is it free right now?',
    a: 'Yes, completely free during early access. You will be notified before any pricing changes. No credit card required to get started.',
  },
]

// ── Bottom CTA ────────────────────────────────────────────────
export const CTA_BOTTOM = {
  heading: "We're in early access. Try it free.",
  subheading: 'No credit card. No commitment. Upload a deck and see what the AI says.',
  placeholder: 'Enter your work email',
  button: 'Get Early Access',
  disclaimer: 'No credit card required · Cancel anytime',
  success: "You're in! We'll be in touch soon.",
}

// ── Footer Links ──────────────────────────────────────────────
export const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'VC Directory', href: '/vc' },
    { label: 'Glossary', href: '/glossary' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Explainer', href: '/explainer' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
  ],
}
