import ConnectorCard from '../../components/dashboard/ConnectorCard'
import { connectors } from '../../data/dashboard/connectors'
import { useRole } from '../../context/RoleContext'
import styles from './Connectors.module.css'

export default function Connectors() {
  const { role } = useRole()

  if (role !== 'Admin') {
    return (
      <div style={{ padding: 'var(--space-3xl)', textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ margin: '0 auto var(--space-md)', display: 'block', opacity: 0.4 }}>
          <rect x="12" y="18" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M15 18V14C15 10.69 17.69 8 21 8C24.31 8 27 10.69 27 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Only Admins can manage connectors.
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <p className={styles.intro}>
        Connect external channels to automatically ingest pitch decks and deal flow into PtchDeck.
        All incoming files are queued for AI analysis.
      </p>
      <div className={styles.grid}>
        {connectors.map((c) => (
          <ConnectorCard key={c.id} connector={c} />
        ))}
      </div>
    </div>
  )
}
