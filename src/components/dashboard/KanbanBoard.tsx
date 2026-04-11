import { useState, useRef } from 'react'
import { MoreHorizontal, Plus } from 'lucide-react'
import { PipelineColumn, PipelineCard } from '../../data/dashboard/pipeline'
import styles from './KanbanBoard.module.css'

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null) return null
  const cls = score >= 8 ? styles.scoreHigh : score >= 6 ? styles.scoreMid : styles.scoreLow
  return <span className={`${styles.scoreBadge} ${cls}`}>{score}</span>
}

interface KanbanBoardProps {
  columns: PipelineColumn[]
  onCardClick: (card: PipelineCard) => void
  onCardMove: (cardId: string, fromColId: string, toColId: string) => void
  onAddColumn: (name: string, description: string) => void
}

export default function KanbanBoard({ columns, onCardClick, onCardMove, onAddColumn }: KanbanBoardProps) {
  const dragging = useRef<{ cardId: string; fromColId: string } | null>(null)
  const [dragOverColId, setDragOverColId] = useState<string | null>(null)
  const [showAddCol, setShowAddCol]       = useState(false)
  const [newColName, setNewColName]       = useState('')
  const [newColDesc, setNewColDesc]       = useState('')
  const dragCounter = useRef<Record<string, number>>({})

  function handleDragStart(e: React.DragEvent, cardId: string, colId: string) {
    dragging.current = { cardId, fromColId: colId }
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragEnter(e: React.DragEvent, colId: string) {
    e.preventDefault()
    dragCounter.current[colId] = (dragCounter.current[colId] || 0) + 1
    setDragOverColId(colId)
  }

  function handleDragLeave(_e: React.DragEvent, colId: string) {
    dragCounter.current[colId] = (dragCounter.current[colId] || 1) - 1
    if (dragCounter.current[colId] <= 0) {
      dragCounter.current[colId] = 0
      setDragOverColId(prev => prev === colId ? null : prev)
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  function handleDrop(e: React.DragEvent, toColId: string) {
    e.preventDefault()
    dragCounter.current = {}
    setDragOverColId(null)
    if (!dragging.current) return
    const { cardId, fromColId } = dragging.current
    dragging.current = null

    // Business logic: can't drag OUT of a terminal column
    const fromCol = columns.find(c => c.id === fromColId)
    if (fromCol?.isTerminal) return
    if (fromColId === toColId) return

    onCardMove(cardId, fromColId, toColId)
  }

  function handleDragEnd() {
    dragging.current = null
    dragCounter.current = {}
    setDragOverColId(null)
  }

  function submitAddColumn() {
    if (!newColName.trim()) return
    onAddColumn(newColName.trim(), newColDesc.trim())
    setNewColName('')
    setNewColDesc('')
    setShowAddCol(false)
  }

  return (
    <>
      <div className={styles.board}>
        {columns.map(col => {
          const isOver     = dragOverColId === col.id
          const isTerminal = !!col.isTerminal
          return (
            <div
              key={col.id}
              className={`${styles.column} ${isTerminal ? styles.columnTerminal : ''} ${isOver ? styles.columnOver : ''}`}
              onDragEnter={e => handleDragEnter(e, col.id)}
              onDragLeave={e => handleDragLeave(e, col.id)}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, col.id)}
            >
              {/* Column header */}
              <div className={styles.colHeader}>
                <div className={styles.colHeaderLeft}>
                  <span className={styles.colTitle}>{col.title}</span>
                  <span className={styles.colCount}>{col.cards.length}</span>
                </div>
                <button className={styles.colMenuBtn} title={col.description}>
                  <MoreHorizontal size={14} />
                </button>
              </div>

              {/* Cards */}
              <div className={styles.colCards}>
                {col.cards.map(card => (
                  <div
                    key={card.id}
                    className={`${styles.card} ${isTerminal ? styles.cardTerminal : ''}`}
                    draggable={!isTerminal}
                    onDragStart={e => handleDragStart(e, card.id, col.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => onCardClick(card)}
                  >
                    <div className={styles.cardTop}>
                      <span className={`${styles.cardCompany} ${isTerminal ? styles.cardCompanyStrike : ''}`}>
                        {card.company}
                      </span>
                      <ScoreBadge score={card.score} />
                    </div>
                    <div className={styles.cardMeta}>
                      <span className={styles.sectorTag}>{card.sector}</span>
                      <div className={styles.analystAvatar} title={card.analyst}>
                        {getInitials(card.analyst)}
                      </div>
                    </div>
                  </div>
                ))}

                {col.cards.length === 0 && (
                  <div className={`${styles.emptyDrop} ${isOver ? styles.emptyDropActive : ''}`}>
                    Drop here
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Add Column button */}
        <div className={styles.addColTrigger}>
          <button className={styles.addColBtn} onClick={() => setShowAddCol(true)}>
            <Plus size={16} />
            Add Column
          </button>
        </div>
      </div>

      {/* Add Column modal */}
      {showAddCol && (
        <div className={styles.modalOverlay} onClick={() => setShowAddCol(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalTitle}>New Column</div>
            <div className={styles.modalBody}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Column name *</label>
                <input
                  className={styles.fieldInput}
                  placeholder="e.g. Term Sheet"
                  value={newColName}
                  onChange={e => setNewColName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && submitAddColumn()}
                  autoFocus
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>What it means</label>
                <input
                  className={styles.fieldInput}
                  placeholder="e.g. Offer sent, awaiting founder response"
                  value={newColDesc}
                  onChange={e => setNewColDesc(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && submitAddColumn()}
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowAddCol(false)}>Cancel</button>
              <button className={styles.createBtn} onClick={submitAddColumn} disabled={!newColName.trim()}>Create Column</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
