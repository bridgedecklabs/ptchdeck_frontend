export interface PipelineCard {
  id: string
  company: string
  sector: string
  stage: string       // funding stage: Seed, Series A, etc.
  score: number | null // 1–10 scale
  analyst: string
  updatedAt: string
  tags: string[]
}

export interface PipelineColumn {
  id: string
  title: string
  description: string
  isTerminal?: boolean  // can't drag cards out (e.g. Passed)
  cards: PipelineCard[]
}

export const initialColumns: PipelineColumn[] = [
  {
    id: 'new',
    title: 'New',
    description: 'Just scored, not yet reviewed by a human',
    cards: [
      { id: 'pc1', company: 'Aether Dynamics', sector: 'Aerospace',        stage: 'Series A', score: 9.8, analyst: 'James Doe',  updatedAt: '2h ago',  tags: ['Aerospace', 'DeepTech'] },
      { id: 'pc2', company: 'NeuroFlow AI',    sector: 'HealthTech',        stage: 'Seed',     score: 9.2, analyst: 'Mia Santos', updatedAt: '3h ago',  tags: ['AI', 'Health'] },
      { id: 'pc3', company: 'Velo Systems',    sector: 'Logistics',         stage: 'Seed',     score: 8.7, analyst: 'Ryan Kim',   updatedAt: '1d ago',  tags: ['Logistics', 'AI'] },
      { id: 'pc4', company: 'CloudBridge',     sector: 'SaaS',              stage: 'Series A', score: null, analyst: 'James Doe', updatedAt: '6h ago',  tags: ['Cloud', 'DevOps'] },
      { id: 'pc5', company: 'MedSync Health',  sector: 'HealthTech',        stage: 'Series B', score: null, analyst: 'Mia Santos',updatedAt: '5h ago',  tags: ['Health', 'FHIR'] },
    ],
  },
  {
    id: 'reviewing',
    title: 'Reviewing',
    description: 'Analyst is doing deeper due diligence',
    cards: [
      { id: 'pc6', company: 'Quantos Lab',      sector: 'Quantum Computing', stage: 'Series A', score: 9.5, analyst: 'James Doe',  updatedAt: '5h ago',  tags: ['Quantum', 'DeepTech'] },
      { id: 'pc7', company: 'GreenWave Energy', sector: 'CleanTech',         stage: 'Seed',     score: 7.1, analyst: 'James Doe',  updatedAt: '1d ago',  tags: ['CleanTech', 'ESG'] },
      { id: 'pc8', company: 'Revo Robotics',    sector: 'DeepTech',          stage: 'Seed',     score: 7.8, analyst: 'Ananya Rao', updatedAt: '2d ago',  tags: ['Robotics', 'AI'] },
    ],
  },
  {
    id: 'meeting',
    title: 'Meeting Scheduled',
    description: 'Call / pitch booked',
    cards: [
      { id: 'pc9',  company: 'Solaris Energy',  sector: 'CleanTech', stage: 'Series B', score: 8.9, analyst: 'Mia Santos', updatedAt: '3d ago', tags: ['CleanTech', 'Energy'] },
      { id: 'pc10', company: 'Aura Analytics',  sector: 'AI/ML',     stage: 'Seed',     score: 8.1, analyst: 'Ananya Rao', updatedAt: '4d ago', tags: ['AI', 'Analytics'] },
    ],
  },
  {
    id: 'due-diligence',
    title: 'Due Diligence',
    description: 'Serious consideration, docs requested',
    cards: [
      { id: 'pc11', company: 'Ark Biopharma', sector: 'Biotech', stage: 'Series A', score: 9.1, analyst: 'Ryan Kim', updatedAt: '5d ago', tags: ['Biotech', 'Pharma'] },
    ],
  },
  {
    id: 'decision',
    title: 'Decision',
    description: 'IC meeting pending',
    cards: [
      { id: 'pc12', company: 'Neo Ledger', sector: 'FinTech', stage: 'Series B', score: 9.9, analyst: 'James Doe', updatedAt: '6d ago', tags: ['FinTech', 'Blockchain'] },
    ],
  },
  {
    id: 'passed',
    title: 'Passed',
    description: 'Rejected — kept for records',
    isTerminal: true,
    cards: [
      { id: 'pc13', company: 'Ghost Protocol', sector: 'Security', stage: 'Seed', score: 4.2, analyst: 'Ryan Kim', updatedAt: '2w ago', tags: ['Security'] },
      { id: 'pc14', company: 'EduPath',        sector: 'EdTech',   stage: 'Seed', score: 5.8, analyst: 'James Doe', updatedAt: '3w ago', tags: ['EdTech', 'B2C'] },
    ],
  },
]
