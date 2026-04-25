import { Lock, Plus } from 'lucide-react'
import PipelineCard, { type CardData } from './PipelineCard'
import styles from './PipelineColumn.module.css'

export interface ColumnData {
  id: string
  title: string
  locked?: boolean
  items: CardData[]
}

interface PipelineColumnProps {
  column: ColumnData
  searchQuery: string
}

export default function PipelineColumn({ column, searchQuery }: PipelineColumnProps) {
  const filtered = searchQuery
    ? column.items.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        c.owner.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : column.items

  return (
    <div className={styles.column} data-column-id={column.id}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          {column.locked && <Lock className={styles.lockIcon} size={12} />}
          <h3 className={styles.title}>{column.title}</h3>
        </div>
        <span className={styles.count}>{filtered.length}</span>
      </div>

      <div className={styles.body} data-droppable="true">
        {filtered.length === 0 ? (
          <div className={styles.empty}>No cards</div>
        ) : (
          filtered.map((card) => <PipelineCard key={card.id} card={card} />)
        )}
      </div>

      <button className={styles.addCardBtn} aria-label={`Add card to ${column.title}`}>
        <Plus size={13} />
        Add card
      </button>
    </div>
  )
}
