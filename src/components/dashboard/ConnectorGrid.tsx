import ConnectorCard from './ConnectorCard'
import type { ConnectorItem } from '../../pages/dashboard/Connectors'
import styles from './ConnectorGrid.module.css'

interface Props {
  label: string
  count: number
  items: ConnectorItem[]
}

export default function ConnectorGrid({ label, count, items }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>{label}</span>
        <span className={styles.countBadge}>{count} {label === 'CONNECTED' ? 'connected' : 'available'}</span>
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <ConnectorCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
