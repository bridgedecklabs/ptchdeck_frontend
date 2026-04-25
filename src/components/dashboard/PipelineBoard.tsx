import { Plus } from 'lucide-react'
import PipelineColumn, { type ColumnData } from './PipelineColumn'
import styles from './PipelineBoard.module.css'

interface PipelineBoardProps {
  columns: ColumnData[]
  searchQuery: string
}

export default function PipelineBoard({ columns, searchQuery }: PipelineBoardProps) {
  return (
    <div className={styles.board} data-board="true">
      {columns.map((col) => (
        <PipelineColumn key={col.id} column={col} searchQuery={searchQuery} />
      ))}

      <div className={styles.ghostColumn}>
        <div className={styles.ghostInner}>
          <Plus size={18} />
          <span>New Stage</span>
        </div>
      </div>
    </div>
  )
}
