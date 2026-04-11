export interface ScoreBreakdown {
  marketSize: number;
  teamStrength: number;
  productVision: number;
  traction: number;
  financials: number;
  competition: number;
}

export interface Deal {
  id: string;
  company: string;
  sector: string;
  stage: string;
  score: number;
  breakdown: ScoreBreakdown;
  analyst: string;
  uploadedAt: string;
  status: 'new' | 'reviewed' | 'flagged' | 'passed';
  location: string;
  description: string;
  notes: string;
  tags: string[];
}

export const deals: Deal[] = [
  {
    id: 'd1', company: 'DataVault', sector: 'Enterprise', stage: 'Series C', score: 90,
    breakdown: { marketSize: 95, teamStrength: 92, productVision: 88, traction: 93, financials: 86, competition: 82 },
    analyst: 'Priya Sharma', uploadedAt: '2025-03-22', status: 'reviewed', location: 'San Francisco, CA',
    description: 'Enterprise data security platform with zero-knowledge architecture serving Fortune 500 companies.',
    notes: 'Exceptional traction with 40% QoQ growth. Team has prior exits. Valuation aggressive but justified.',
    tags: ['Security', 'Enterprise', 'B2B', 'SaaS'],
  },
  {
    id: 'd2', company: 'Nexus AI', sector: 'AI/ML', stage: 'Series A', score: 84,
    breakdown: { marketSize: 90, teamStrength: 88, productVision: 92, traction: 78, financials: 74, competition: 80 },
    analyst: 'Priya Sharma', uploadedAt: '2025-03-23', status: 'new', location: 'New York, NY',
    description: 'AI-powered workflow automation for mid-market enterprises. GPT-4 based document processing.',
    notes: 'Strong product vision. Traction still early but growing fast. Watch competitive moat.',
    tags: ['AI', 'Automation', 'SaaS', 'B2B'],
  },
  {
    id: 'd3', company: 'GreenWave Energy', sector: 'CleanTech', stage: 'Seed', score: 71,
    breakdown: { marketSize: 88, teamStrength: 72, productVision: 76, traction: 55, financials: 60, competition: 70 },
    analyst: 'James Wu', uploadedAt: '2025-03-23', status: 'reviewed', location: 'Austin, TX',
    description: 'Distributed solar energy marketplace connecting small producers to corporate buyers.',
    notes: 'Market timing is good. Team needs a strong CFO. Revenue model needs clarity.',
    tags: ['CleanTech', 'Marketplace', 'ESG', 'Hardware'],
  },
  {
    id: 'd4', company: 'FinFlow', sector: 'FinTech', stage: 'Seed', score: 67,
    breakdown: { marketSize: 80, teamStrength: 65, productVision: 70, traction: 58, financials: 55, competition: 62 },
    analyst: 'Ananya Rao', uploadedAt: '2025-03-22', status: 'flagged', location: 'London, UK',
    description: 'B2B payment reconciliation SaaS for SMEs. Integrates with Xero, Quickbooks, and Sage.',
    notes: 'Crowded space. Team credibility is the main concern. Need to see 3 months of live data.',
    tags: ['FinTech', 'B2B', 'SaaS', 'Payments'],
  },
  {
    id: 'd5', company: 'MedSync Health', sector: 'HealthTech', stage: 'Series B', score: null as unknown as number,
    breakdown: { marketSize: 0, teamStrength: 0, productVision: 0, traction: 0, financials: 0, competition: 0 },
    analyst: 'Priya Sharma', uploadedAt: '2025-03-24', status: 'new', location: 'Boston, MA',
    description: 'Patient data interoperability platform built on FHIR. HIPAA compliant.',
    notes: '',
    tags: ['HealthTech', 'B2B', 'Compliance'],
  },
  {
    id: 'd6', company: 'CloudBridge', sector: 'SaaS', stage: 'Series A', score: null as unknown as number,
    breakdown: { marketSize: 0, teamStrength: 0, productVision: 0, traction: 0, financials: 0, competition: 0 },
    analyst: 'James Wu', uploadedAt: '2025-03-24', status: 'new', location: 'Seattle, WA',
    description: 'Multi-cloud cost optimisation tool with AI-powered recommendations.',
    notes: '',
    tags: ['Cloud', 'DevOps', 'SaaS'],
  },
  {
    id: 'd7', company: 'Revo Robotics', sector: 'DeepTech', stage: 'Seed', score: 78,
    breakdown: { marketSize: 82, teamStrength: 85, productVision: 80, traction: 65, financials: 68, competition: 74 },
    analyst: 'Ananya Rao', uploadedAt: '2025-03-21', status: 'reviewed', location: 'Pittsburgh, PA',
    description: 'Warehouse automation robots using computer vision and edge AI.',
    notes: 'Strong IP portfolio, 2 patents pending. Hardware margin concerns. Partnership with DHL is a green flag.',
    tags: ['Robotics', 'AI', 'Hardware', 'Logistics'],
  },
  {
    id: 'd8', company: 'EduPath', sector: 'EdTech', stage: 'Seed', score: 58,
    breakdown: { marketSize: 65, teamStrength: 60, productVision: 62, traction: 50, financials: 48, competition: 55 },
    analyst: 'James Wu', uploadedAt: '2025-03-20', status: 'passed', location: 'Chicago, IL',
    description: 'Adaptive learning platform for K-12 students using spaced repetition.',
    notes: 'Market is over-saturated. Pass for now.',
    tags: ['EdTech', 'B2C', 'SaaS'],
  },
];

export const sectors = ['All Sectors', 'AI/ML', 'FinTech', 'HealthTech', 'CleanTech', 'SaaS', 'Enterprise', 'EdTech', 'DeepTech'];
export const stages = ['All Stages', 'Seed', 'Series A', 'Series B', 'Series C'];
export const statuses = ['All', 'new', 'reviewed', 'flagged', 'passed'];
