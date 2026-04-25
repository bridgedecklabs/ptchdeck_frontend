import { Search, X, Plus } from 'lucide-react'
import styles from './CohortHeader.module.css'

interface CohortHeaderProps {
  search: string
  onSearchChange: (v: string) => void
  onCreateCohort: () => void
}

export default function CohortHeader({ search, onSearchChange, onCreateCohort }: CohortHeaderProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.searchWrap}>
        <Search className={styles.searchIcon} size={14} />
        <input
          type="text"
          placeholder="Search cohorts..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {search && (
          <button className={styles.clearBtn} onClick={() => onSearchChange('')} aria-label="Clear search">
            <X size={11} />
          </button>
        )}
      </div>

      <button className={styles.createBtn} onClick={onCreateCohort}>
        <Plus size={14} />
        Create Cohort
      </button>
    </div>
  )
}
