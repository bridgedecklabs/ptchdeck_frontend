import { useState } from 'react'
import PipelineHeader from '../../components/dashboard/PipelineHeader'
import PipelineBoard from '../../components/dashboard/PipelineBoard'
import type { ColumnData } from '../../components/dashboard/PipelineColumn'
import styles from './Pipeline.module.css'

const pipelineData: ColumnData[] = [
  {
    id: 'inbox',
    title: 'Inbox',
    locked: true,
    items: [
      { id: 1,  name: 'TechFlow AI',   score: 82, tags: ['SaaS', 'Seed'],         owner: 'David K.',   time: '2 days' },
      { id: 2,  name: 'HealthBridge',  score: 74, tags: ['HealthTech', 'Series A'], owner: 'Marcus L.',  time: '3 days' },
      { id: 3,  name: 'GreenGrid',     score: 55, tags: ['CleanTech'],             owner: 'S. Miller',  time: '5 days' },
      { id: 4,  name: 'EduSpark',      score: 29, tags: ['EdTech'],               owner: 'Elena R.',   time: '7 days' },
    ],
  },
  {
    id: 'screening',
    title: 'Screening',
    items: [
      { id: 5,  name: 'BuildBot AI',   score: 61, tags: ['SaaS'],                 owner: 'Sarah W.',   time: '12 days' },
      { id: 6,  name: 'PayFlow',       score: 38, tags: ['Fintech'],              owner: 'John T.',    time: '15 days' },
      { id: 7,  name: 'ClimateX',      score: 77, tags: ['CleanTech'],            owner: 'Tom B.',     time: '4 days'  },
    ],
  },
  {
    id: 'due-diligence',
    title: 'Due Diligence',
    items: [
      { id: 8,  name: 'NeuralBase',    score: 88, tags: ['AI', 'Series A'],       owner: 'Lisa H.',    time: '22 days' },
      { id: 9,  name: 'MediTrack',     score: 72, tags: ['HealthTech'],           owner: 'James P.',   time: '18 days' },
    ],
  },
  {
    id: 'partner-review',
    title: 'Partner Review',
    items: [
      { id: 10, name: 'FinStack',      score: 91, tags: ['Fintech', 'Series B+'], owner: 'Sarah W.',   time: '31 days' },
    ],
  },
]

export default function Pipeline() {
  const [search, setSearch] = useState('')

  return (
    <div className={styles.page}>
      <PipelineHeader
        search={search}
        onSearchChange={setSearch}
        onAddColumn={() => console.log('Add column')}
      />
      <PipelineBoard columns={pipelineData} searchQuery={search} />
    </div>
  )
}
