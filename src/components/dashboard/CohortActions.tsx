import { Eye, Pencil, Lock, Trash2 } from 'lucide-react'
import styles from './CohortActions.module.css'

interface CohortActionsProps {
  onView?:   () => void
  onEdit?:   () => void
  onLock?:   () => void
  onDelete?: () => void
}

interface ActionBtnProps {
  label: string
  onClick?: () => void
  variant?: 'default' | 'danger'
  children: React.ReactNode
}

function ActionBtn({ label, onClick, variant = 'default', children }: ActionBtnProps) {
  return (
    <button
      className={`${styles.btn} ${variant === 'danger' ? styles.danger : ''}`}
      onClick={onClick}
      title={label}
      aria-label={label}
      type="button"
    >
      {children}
    </button>
  )
}

export default function CohortActions({ onView, onEdit, onLock, onDelete }: CohortActionsProps) {
  return (
    <div className={styles.group}>
      <ActionBtn label="View cohort" onClick={onView}>
        <Eye size={14} />
      </ActionBtn>
      <ActionBtn label="Edit cohort" onClick={onEdit}>
        <Pencil size={14} />
      </ActionBtn>
      <ActionBtn label="Lock cohort" onClick={onLock}>
        <Lock size={14} />
      </ActionBtn>
      <ActionBtn label="Delete cohort" onClick={onDelete} variant="danger">
        <Trash2 size={14} />
      </ActionBtn>
    </div>
  )
}
