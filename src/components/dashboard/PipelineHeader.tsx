import { Search, X, Plus } from 'lucide-react'
import styles from './PipelineHeader.module.css'

interface PipelineHeaderProps {
  search: string
  onSearchChange: (v: string) => void
  onAddColumn: () => void
}

export default function PipelineHeader({ search, onSearchChange, onAddColumn }: PipelineHeaderProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.searchWrap}>
        <Search className={styles.searchIcon} size={14} />
        <input
          type="text"
          placeholder="Filter pipeline..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {search && (
          <button className={styles.clearBtn} onClick={() => onSearchChange('')} aria-label="Clear">
            <X size={11} />
          </button>
        )}
      </div>

      <button className={styles.addBtn} onClick={onAddColumn}>
        <Plus size={14} />
        Add Column
      </button>
    </div>
  )
}
