export type PortfolioStatus = 'Active' | 'Exited' | 'Rejected';

export interface PortfolioCompany {
  id: string;
  company: string;
  sector: string;
  stage: string;
  invested: number;
  currentValue: number;
  investedDate: string;
  status: PortfolioStatus;
  location: string;
  description: string;
  tags: string[];
  founders: string[];
  website: string;
  fundingRounds: { round: string; amount: number; date: string }[];
}

export const portfolioCompanies: PortfolioCompany[] = [
  {
    id: 'p1', company: 'DataVault', sector: 'Enterprise', stage: 'Series C', invested: 5000000, currentValue: 14500000,
    investedDate: '2023-06-15', status: 'Active', location: 'San Francisco, CA',
    description: 'Enterprise data security platform with zero-knowledge architecture.',
    tags: ['Security', 'Enterprise', 'B2B', 'SaaS'],
    founders: ['Alex Chen', 'Maria Lopez'],
    website: 'datavault.io',
    fundingRounds: [{ round: 'Seed', amount: 1500000, date: '2022-01-10' }, { round: 'Series A', amount: 8000000, date: '2022-09-01' }, { round: 'Series C', amount: 30000000, date: '2023-06-15' }],
  },
  {
    id: 'p2', company: 'Orbix Space', sector: 'SpaceTech', stage: 'Series B', invested: 3000000, currentValue: 7200000,
    investedDate: '2023-11-01', status: 'Active', location: 'Houston, TX',
    description: 'Low-earth orbit IoT satellite network for industrial monitoring.',
    tags: ['SpaceTech', 'IoT', 'Hardware'],
    founders: ['Raj Nair', 'Sofia Esposito'],
    website: 'orbix.space',
    fundingRounds: [{ round: 'Seed', amount: 2000000, date: '2022-05-01' }, { round: 'Series B', amount: 20000000, date: '2023-11-01' }],
  },
  {
    id: 'p3', company: 'PulseCommerce', sector: 'E-commerce', stage: 'Series A', invested: 2000000, currentValue: 5800000,
    investedDate: '2022-08-20', status: 'Active', location: 'New York, NY',
    description: 'AI-driven inventory and demand forecasting for DTC brands.',
    tags: ['E-commerce', 'AI', 'SaaS'],
    founders: ['Nina Okonkwo'],
    website: 'pulsecommerce.com',
    fundingRounds: [{ round: 'Seed', amount: 1000000, date: '2021-12-01' }, { round: 'Series A', amount: 12000000, date: '2022-08-20' }],
  },
  {
    id: 'p4', company: 'ZeroCarbon Logistics', sector: 'CleanTech', stage: 'Series B', invested: 4000000, currentValue: 9600000,
    investedDate: '2023-02-14', status: 'Active', location: 'Amsterdam, NL',
    description: 'Electric last-mile delivery fleet-as-a-service for urban retailers.',
    tags: ['CleanTech', 'Logistics', 'EV'],
    founders: ['Lars Hansen', 'Ayasha Morales'],
    website: 'zerocarbon.eu',
    fundingRounds: [{ round: 'Seed', amount: 3000000, date: '2022-03-01' }, { round: 'Series B', amount: 25000000, date: '2023-02-14' }],
  },
  {
    id: 'p5', company: 'NeuroLeap', sector: 'HealthTech', stage: 'Series A', invested: 1500000, currentValue: 680000,
    investedDate: '2022-04-01', status: 'Exited', location: 'London, UK',
    description: 'Brain-computer interface for motor rehabilitation. Acquired by MedTronic.',
    tags: ['HealthTech', 'Hardware', 'AI'],
    founders: ['Dr. Priya Iyer'],
    website: 'neuroleap.io',
    fundingRounds: [{ round: 'Series A', amount: 10000000, date: '2022-04-01' }],
  },
  {
    id: 'p6', company: 'EduPath', sector: 'EdTech', stage: 'Seed', invested: 500000, currentValue: 0,
    investedDate: '2023-07-01', status: 'Rejected', location: 'Chicago, IL',
    description: 'Adaptive K-12 learning platform. Passed due to market saturation.',
    tags: ['EdTech', 'B2C'],
    founders: ['Tom Riley'],
    website: 'edupath.co',
    fundingRounds: [],
  },
];

export const portfolioStats = {
  totalDeployed: 16000000,
  currentValue: 37780000,
  activeCompanies: 4,
  exits: 1,
};
