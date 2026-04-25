import styles from './StatusBadge.module.css'

export type Status = 'scored' | 'processing' | 'queued' | 'failed'

interface StatusBadgeProps {
  status: Status
}

const LABEL: Record<Status, string> = {
  scored: 'Scored',
  processing: 'Processing',
  queued: 'Queued',
  failed: 'Failed',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      <span className={styles.dot} />
      {LABEL[status]}
    </span>
  )
}
