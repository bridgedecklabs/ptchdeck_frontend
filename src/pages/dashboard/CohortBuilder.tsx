import { useState } from 'react'
import CohortHeader from '../../components/dashboard/CohortHeader'
import CohortTable from '../../components/dashboard/CohortTable'
import type { CohortStatus } from '../../components/dashboard/CohortStatusBadge'
import styles from './CohortBuilder.module.css'

export interface CohortEntry {
  id: number
  name: string
  description: string
  status: CohortStatus
  applications: number
  deadline: string
  createdBy: string
  createdOn: string
}

const mockCohorts: CohortEntry[] = [
  {
    id: 1,
    name: 'Batch 3 — Fintech 2025',
    description: 'Global fintech acceleration track',
    status: 'active',
    applications: 47,
    deadline: '30 Apr 2025',
    createdBy: 'Preet S.',
    createdOn: '12 Jan 2025',
  },
  {
    id: 2,
    name: 'Q2 SaaS Deal Flow',
    description: 'Enterprise software specialised pipeline',
    status: 'active',
    applications: 23,
    deadline: '15 May 2025',
    createdBy: 'Rahul K.',
    createdOn: '05 Feb 2025',
  },
  {
    id: 3,
    name: 'Batch 2 — General',
    description: 'Open sector innovation lab',
    status: 'closed',
    applications: 134,
    deadline: '28 Feb 2025',
    createdBy: 'Preet S.',
    createdOn: '20 Nov 2024',
  },
  {
    id: 4,
    name: 'Healthtech Incubator 2025',
    description: 'Biotech and medical technology focus',
    status: 'draft',
    applications: 0,
    deadline: '01 Jun 2025',
    createdBy: 'Preet S.',
    createdOn: '01 Mar 2025',
  },
  {
    id: 5,
    name: 'CleanTech Cohort Q3',
    description: 'Sustainability and clean energy startups',
    status: 'active',
    applications: 18,
    deadline: '10 Jul 2025',
    createdBy: 'Sarah J.',
    createdOn: '15 Mar 2025',
  },
  {
    id: 6,
    name: 'EdTech Spring Batch',
    description: 'Education technology early-stage deals',
    status: 'draft',
    applications: 0,
    deadline: '01 Aug 2025',
    createdBy: 'Marcus K.',
    createdOn: '20 Mar 2025',
  },
]

export default function CohortBuilder() {
  const [search, setSearch] = useState('')

  return (
    <div className={styles.page}>
      <CohortHeader
        search={search}
        onSearchChange={(v) => setSearch(v)}
        onCreateCohort={() => console.log('Create cohort')}
      />
      <CohortTable data={mockCohorts} search={search} />
    </div>
  )
}
