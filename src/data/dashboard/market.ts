export interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  tag: string;
  excerpt: string;
  imageInitials: string;
  imageColor: string;
}

export interface FundingRound {
  id: string;
  company: string;
  amount: string;
  round: string;
  sector: string;
  investors: string[];
  date: string;
  description: string;
}

export interface TrendingSector {
  sector: string;
  count: number;
  change: number;
  color: string;
}

export interface StartupProfile {
  id: string;
  name: string;
  tagline: string;
  sector: string;
  stage: string;
  founded: string;
  location: string;
  employees: string;
  totalFunding: string;
  description: string;
  tags: string[];
  founders: { name: string; title: string }[];
  metrics: { label: string; value: string }[];
  fundingHistory: { round: string; amount: string; date: string; investors: string[] }[];
  websiteUrl: string;
}

export const newsFeed: NewsItem[] = [
  { id: 'n1', title: 'OpenAI launches GPT-5 with 10x reasoning improvements', source: 'TechCrunch', publishedAt: '2h ago', tag: 'AI/ML', excerpt: 'OpenAI today announced GPT-5, claiming 10x improvements in multi-step reasoning tasks and a new code generation benchmark.', imageInitials: 'OA', imageColor: '#6366f1' },
  { id: 'n2', title: 'Sequoia leads $200M round in Indian FinTech startup Razorpay', source: 'Economic Times', publishedAt: '4h ago', tag: 'FinTech', excerpt: 'Razorpay has secured $200M in Series F funding led by Sequoia Capital, valuing the company at $8.5B.', imageInitials: 'RZ', imageColor: '#2563eb' },
  { id: 'n3', title: 'EU passes landmark AI Act — what it means for startups', source: 'Wired', publishedAt: '6h ago', tag: 'Policy', excerpt: 'The EU AI Act comes into full force this quarter, affecting thousands of AI companies operating in Europe.', imageInitials: 'EU', imageColor: '#16a34a' },
  { id: 'n4', title: 'Climate tech funding hits record $18B in Q1 2025', source: 'Bloomberg', publishedAt: '1d ago', tag: 'CleanTech', excerpt: 'Q1 2025 saw record-breaking climate technology investments, with solar and battery storage leading the charge.', imageInitials: 'BL', imageColor: '#d97706' },
  { id: 'n5', title: 'Stripe acquires payments compliance startup Taxjar for $1.2B', source: 'Reuters', publishedAt: '1d ago', tag: 'M&A', excerpt: 'Stripe has completed acquisition of TaxJar, expanding its tax compliance capabilities for enterprise clients.', imageInitials: 'ST', imageColor: '#ec4899' },
  { id: 'n6', title: 'India surpasses UK as 3rd largest startup ecosystem globally', source: 'Times of India', publishedAt: '2d ago', tag: 'Ecosystem', excerpt: 'India now hosts over 100 unicorns and 1.5M startups, surpassing the United Kingdom for the first time.', imageInitials: 'IN', imageColor: '#f59e0b' },
];

export const fundingRounds: FundingRound[] = [
  { id: 'f1', company: 'Anthropic', amount: '$2.5B', round: 'Series E', sector: 'AI/ML', investors: ['Google', 'Spark Capital', 'Salesforce Ventures'], date: 'Mar 2025', description: 'Constitutional AI research and Claude model family.' },
  { id: 'f2', company: 'Waymo', amount: '$1.2B', round: 'Series D', sector: 'AutoTech', investors: ['Alphabet', 'Tiger Global', 'T. Rowe Price'], date: 'Mar 2025', description: 'Autonomous vehicle technology and robotaxi services.' },
  { id: 'f3', company: 'Cohere', amount: '$450M', round: 'Series C', sector: 'AI/ML', investors: ['Inovia Capital', 'Salesforce Ventures', 'NVIDIA'], date: 'Feb 2025', description: 'Enterprise NLP and large language model APIs.' },
  { id: 'f4', company: 'Solugen', amount: '$350M', round: 'Series D', sector: 'CleanTech', investors: ['GV', 'Fifty Years', 'Horizons Ventures'], date: 'Feb 2025', description: 'Bio-based chemical manufacturing to replace fossil-derived chemicals.' },
  { id: 'f5', company: 'Deel', amount: '$300M', round: 'Series E', sector: 'HRTech', investors: ['Andreessen Horowitz', 'Y Combinator', 'Spark Capital'], date: 'Jan 2025', description: 'Global payroll and compliance platform for remote teams.' },
];

export const trendingSectors: TrendingSector[] = [
  { sector: 'AI/ML', count: 48, change: 22, color: '#6366f1' },
  { sector: 'CleanTech', count: 31, change: 18, color: '#16a34a' },
  { sector: 'HealthTech', count: 27, change: 11, color: '#ec4899' },
  { sector: 'FinTech', count: 24, change: -4, color: '#2563eb' },
  { sector: 'SaaS', count: 21, change: 7, color: '#f59e0b' },
  { sector: 'DeepTech', count: 14, change: 14, color: '#8b5cf6' },
];

export const startupProfiles: StartupProfile[] = [
  {
    id: 's1', name: 'Anthropic', tagline: 'AI safety company building reliable, interpretable AI systems.',
    sector: 'AI/ML', stage: 'Series E', founded: '2021', location: 'San Francisco, CA',
    employees: '600+', totalFunding: '$7.3B',
    description: 'Anthropic is an AI safety startup whose mission is the responsible development and maintenance of advanced AI. Best known for the Claude family of large language models.',
    tags: ['AI Safety', 'LLM', 'NLP', 'Research'],
    founders: [{ name: 'Dario Amodei', title: 'CEO & Co-founder' }, { name: 'Daniela Amodei', title: 'President & Co-founder' }],
    metrics: [{ label: 'ARR', value: '$1.5B' }, { label: 'Valuation', value: '$18B' }, { label: 'Models', value: '4' }, { label: 'Enterprise Clients', value: '500+' }],
    fundingHistory: [
      { round: 'Seed', amount: '$124M', date: 'Apr 2021', investors: ['Spark Capital', 'Google'] },
      { round: 'Series A', amount: '$580M', date: 'Dec 2022', investors: ['FTX', 'Spark Capital'] },
      { round: 'Series B', amount: '$1.25B', date: 'May 2023', investors: ['Google'] },
      { round: 'Series E', amount: '$2.5B', date: 'Mar 2025', investors: ['Google', 'Spark Capital', 'Salesforce'] },
    ],
    websiteUrl: 'anthropic.com',
  },
];
