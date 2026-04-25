import styles from './CohortStatusBadge.module.css'

export type CohortStatus = 'active' | 'closed' | 'draft'

const LABEL: Record<CohortStatus, string> = {
  active: 'ACTIVE',
  closed: 'CLOSED',
  draft:  'DRAFT',
}

interface CohortStatusBadgeProps {
  status: CohortStatus
}

export default function CohortStatusBadge({ status }: CohortStatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      {LABEL[status]}
    </span>
  )
}
