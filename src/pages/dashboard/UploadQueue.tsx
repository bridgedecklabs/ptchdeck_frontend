import UploadDropzone from '../../components/dashboard/UploadDropzone'
import QueueTable from '../../components/dashboard/QueueTable'
import type { Status } from '../../components/dashboard/StatusBadge'
import styles from './UploadQueue.module.css'

export interface QueueEntry {
  id: number
  name: string
  status: Status
  sector: string
  stage: string
  uploadedBy: string
  date: string
}

const mockQueue: QueueEntry[] = [
  { id: 1,  name: 'TechFlow AI',     status: 'scored',     sector: 'Fintech',    stage: 'Seed',      uploadedBy: 'Preet S.',  date: '12 Apr 2025' },
  { id: 2,  name: 'FinanceOS',       status: 'processing', sector: 'Fintech',    stage: 'Seed',      uploadedBy: 'Sarah J.',  date: '12 Apr 2025' },
  { id: 3,  name: 'HealthBridge',    status: 'scored',     sector: 'HealthTech', stage: 'Series A',  uploadedBy: 'Preet S.',  date: '11 Apr 2025' },
  { id: 4,  name: 'PayFlow',         status: 'failed',     sector: 'Fintech',    stage: 'Pre-Seed',  uploadedBy: 'Marcus K.', date: '11 Apr 2025' },
  { id: 5,  name: 'GreenGrid',       status: 'queued',     sector: 'CleanTech',  stage: 'Seed',      uploadedBy: 'Sarah J.',  date: '10 Apr 2025' },
  { id: 6,  name: 'BuildBot AI',     status: 'scored',     sector: 'SaaS',       stage: 'Pre-Seed',  uploadedBy: 'Marcus K.', date: '10 Apr 2025' },
  { id: 7,  name: 'NovaCare',        status: 'processing', sector: 'HealthTech', stage: 'Seed',      uploadedBy: 'Preet S.',  date: '09 Apr 2025' },
  { id: 8,  name: 'SkillRoute',      status: 'queued',     sector: 'EdTech',     stage: 'Pre-Seed',  uploadedBy: 'Sarah J.',  date: '09 Apr 2025' },
  { id: 9,  name: 'DataLayer',       status: 'scored',     sector: 'SaaS',       stage: 'Series A',  uploadedBy: 'Marcus K.', date: '08 Apr 2025' },
  { id: 10, name: 'ClimateIQ',       status: 'failed',     sector: 'CleanTech',  stage: 'Seed',      uploadedBy: 'Preet S.',  date: '08 Apr 2025' },
  { id: 11, name: 'MedSync',         status: 'scored',     sector: 'HealthTech', stage: 'Series A',  uploadedBy: 'Sarah J.',  date: '07 Apr 2025' },
  { id: 12, name: 'FlowDesk',        status: 'queued',     sector: 'SaaS',       stage: 'Pre-Seed',  uploadedBy: 'Marcus K.', date: '07 Apr 2025' },
  { id: 13, name: 'AgriVault',       status: 'processing', sector: 'Other',      stage: 'Seed',      uploadedBy: 'Preet S.',  date: '06 Apr 2025' },
  { id: 14, name: 'TradeNest',       status: 'scored',     sector: 'Fintech',    stage: 'Series B+', uploadedBy: 'Sarah J.',  date: '06 Apr 2025' },
  { id: 15, name: 'SafeVault',       status: 'queued',     sector: 'Fintech',    stage: 'Seed',      uploadedBy: 'Marcus K.', date: '05 Apr 2025' },
]

export default function UploadQueue() {
  return (
    <div className={styles.page}>
      <UploadDropzone />
      <QueueTable data={mockQueue} />
    </div>
  )
}
