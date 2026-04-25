import ScoreTable from '../../components/dashboard/ScoreTable'
import styles from './Scoreboard.module.css'

export interface ScoreEntry {
  id: number
  name: string
  sector: string
  stage: string
  score: number
  uploadedBy: string
  date: string
  cohort: string
  isDuplicate: boolean
}

const mockScores: ScoreEntry[] = [
  { id: 1,  name: 'TechFlow AI',    sector: 'Fintech',    stage: 'Seed',      score: 82, uploadedBy: 'Preet S.',  date: '12 Apr 2025', cohort: 'Batch 3', isDuplicate: false },
  { id: 2,  name: 'FinanceOS',      sector: 'Fintech',    stage: 'Seed',      score: 74, uploadedBy: 'Sarah J.',  date: '12 Apr 2025', cohort: 'Batch 3', isDuplicate: true  },
  { id: 3,  name: 'HealthBridge',   sector: 'HealthTech', stage: 'Series A',  score: 61, uploadedBy: 'Preet S.',  date: '11 Apr 2025', cohort: 'Batch 3', isDuplicate: false },
  { id: 4,  name: 'PayFlow',        sector: 'Fintech',    stage: 'Pre-Seed',  score: 38, uploadedBy: 'Marcus K.', date: '11 Apr 2025', cohort: 'Batch 2', isDuplicate: false },
  { id: 5,  name: 'GreenGrid',      sector: 'CleanTech',  stage: 'Seed',      score: 91, uploadedBy: 'Sarah J.',  date: '10 Apr 2025', cohort: 'Batch 3', isDuplicate: false },
  { id: 6,  name: 'BuildBot AI',    sector: 'SaaS',       stage: 'Pre-Seed',  score: 55, uploadedBy: 'Marcus K.', date: '10 Apr 2025', cohort: 'Batch 2', isDuplicate: true  },
  { id: 7,  name: 'NovaCare',       sector: 'HealthTech', stage: 'Seed',      score: 78, uploadedBy: 'Preet S.',  date: '09 Apr 2025', cohort: 'Batch 3', isDuplicate: false },
  { id: 8,  name: 'SkillRoute',     sector: 'EdTech',     stage: 'Pre-Seed',  score: 44, uploadedBy: 'Sarah J.',  date: '09 Apr 2025', cohort: 'Batch 1', isDuplicate: false },
  { id: 9,  name: 'DataLayer',      sector: 'SaaS',       stage: 'Series A',  score: 87, uploadedBy: 'Marcus K.', date: '08 Apr 2025', cohort: 'Batch 3', isDuplicate: false },
  { id: 10, name: 'ClimateIQ',      sector: 'CleanTech',  stage: 'Seed',      score: 29, uploadedBy: 'Preet S.',  date: '08 Apr 2025', cohort: 'Batch 2', isDuplicate: false },
  { id: 11, name: 'MedSync',        sector: 'HealthTech', stage: 'Series A',  score: 93, uploadedBy: 'Sarah J.',  date: '07 Apr 2025', cohort: 'Batch 4', isDuplicate: false },
  { id: 12, name: 'FlowDesk',       sector: 'SaaS',       stage: 'Pre-Seed',  score: 52, uploadedBy: 'Marcus K.', date: '07 Apr 2025', cohort: 'Batch 1', isDuplicate: true  },
  { id: 13, name: 'AgriVault',      sector: 'Other',      stage: 'Seed',      score: 66, uploadedBy: 'Preet S.',  date: '06 Apr 2025', cohort: 'Batch 2', isDuplicate: false },
  { id: 14, name: 'TradeNest',      sector: 'Fintech',    stage: 'Series B+', score: 88, uploadedBy: 'Sarah J.',  date: '06 Apr 2025', cohort: 'Batch 4', isDuplicate: false },
  { id: 15, name: 'SafeVault',      sector: 'Fintech',    stage: 'Seed',      score: 41, uploadedBy: 'Marcus K.', date: '05 Apr 2025', cohort: 'Batch 1', isDuplicate: false },
  { id: 16, name: 'AeroPath',       sector: 'Other',      stage: 'Pre-Seed',  score: 76, uploadedBy: 'Preet S.',  date: '05 Apr 2025', cohort: 'Batch 2', isDuplicate: false },
  { id: 17, name: 'CiviqAI',        sector: 'SaaS',       stage: 'Seed',      score: 83, uploadedBy: 'Sarah J.',  date: '04 Apr 2025', cohort: 'Batch 3', isDuplicate: false },
  { id: 18, name: 'MindRoute',      sector: 'EdTech',     stage: 'Series A',  score: 69, uploadedBy: 'Marcus K.', date: '04 Apr 2025', cohort: 'Batch 4', isDuplicate: false },
  { id: 19, name: 'QuadRelay',      sector: 'Other',      stage: 'Seed',      score: 57, uploadedBy: 'Preet S.',  date: '03 Apr 2025', cohort: 'Batch 2', isDuplicate: true  },
  { id: 20, name: 'XeroData',       sector: 'SaaS',       stage: 'Series B+', score: 95, uploadedBy: 'Sarah J.',  date: '03 Apr 2025', cohort: 'Batch 4', isDuplicate: false },
  { id: 21, name: 'ZenPulse',       sector: 'HealthTech', stage: 'Seed',      score: 48, uploadedBy: 'Marcus K.', date: '02 Apr 2025', cohort: 'Batch 1', isDuplicate: false },
  { id: 22, name: 'LogiStack',      sector: 'SaaS',       stage: 'Pre-Seed',  score: 71, uploadedBy: 'Preet S.',  date: '02 Apr 2025', cohort: 'Batch 2', isDuplicate: false },
  { id: 23, name: 'SolarEdge Pro',  sector: 'CleanTech',  stage: 'Series A',  score: 85, uploadedBy: 'Sarah J.',  date: '01 Apr 2025', cohort: 'Batch 4', isDuplicate: false },
]

export default function Scoreboard() {
  return (
    <div className={styles.page}>
      <ScoreTable data={mockScores} />
    </div>
  )
}
