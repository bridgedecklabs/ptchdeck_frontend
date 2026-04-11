import { useState } from 'react'
import { X, TrendingUp } from 'lucide-react'
import KanbanBoard from '../../components/dashboard/KanbanBoard'
import { initialColumns, PipelineColumn, PipelineCard } from '../../data/dashboard/pipeline'
import styles from './Pipeline.module.css'

export default function Pipeline() {
  const [columns, setColumns]   = useState<PipelineColumn[]>(initialColumns)
  const [selected, setSelected] = useState<PipelineCard | null>(null)

  const totalCards = columns.reduce((n, c) => n + c.cards.length, 0)

  function handleCardMove(cardId: string, fromColId: string, toColId: string) {
    setColumns(prev => {
      const card = prev.find(c => c.id === fromColId)?.cards.find(c => c.id === cardId)
      if (!card) return prev
      return prev.map(col => {
        if (col.id === fromColId) return { ...col, cards: col.cards.filter(c => c.id !== cardId) }
        if (col.id === toColId)   return { ...col, cards: [...col.cards, card] }
        return col
      })
    })
  }

  function handleAddColumn(name: string, description: string) {
    setColumns(prev => [
      ...prev.filter(c => !c.isTerminal),   // keep non-terminal columns
      {
        id: `col-${Date.now()}`,
        title: name,
        description,
        cards: [],
      },
      ...prev.filter(c => c.isTerminal),    // Passed always stays last
    ])
  }

  // Move selected card to the next column
  function handleMoveNext() {
    if (!selected) return
    const fromCol = columns.find(c => c.cards.some(card => card.id === selected.id))
    if (!fromCol || fromCol.isTerminal) return
    const fromIdx = columns.indexOf(fromCol)
    const toCol   = columns[fromIdx + 1]
    if (!toCol) return
    handleCardMove(selected.id, fromCol.id, toCol.id)
    // Update selected to reflect new column context
    setSelected(null)
  }

  const selectedColTitle = selected
    ? columns.find(c => c.cards.some(card => card.id === selected.id))?.title
    : null

  const selectedColIdx = selected
    ? columns.findIndex(c => c.cards.some(card => card.id === selected.id))
    : -1

  const canMoveNext = selectedColIdx !== -1 &&
    selectedColIdx < columns.length - 1 &&
    !columns[selectedColIdx]?.isTerminal

  return (
    <div className={styles.page}>
      {/* ── Board ── */}
      <div className={styles.boardScroll}>
        <KanbanBoard
          columns={columns}
          onCardClick={setSelected}
          onCardMove={handleCardMove}
          onAddColumn={handleAddColumn}
        />
      </div>

      {/* ── Floating Stats ── */}
      <div className={styles.floatingStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Pipeline</span>
          <span className={styles.statValue}>$142.5M</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Velocity</span>
          <div className={styles.velocityRow}>
            <TrendingUp size={14} className={styles.trendIcon} />
            <span className={styles.statValue}>+12%</span>
          </div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Active Deals</span>
          <span className={styles.statValue}>{totalCards}</span>
        </div>
      </div>

      {/* ── Card Detail Drawer ── */}
      {selected && (
        <>
          <div className={styles.drawerOverlay} onClick={() => setSelected(null)} />
          <div className={styles.drawer}>
            <div className={styles.drawerHeader}>
              <div>
                <div className={styles.drawerTitle}>{selected.company}</div>
                {selectedColTitle && (
                  <span className={styles.drawerStage}>{selectedColTitle}</span>
                )}
              </div>
              <button className={styles.closeBtn} onClick={() => setSelected(null)}>
                <X size={14} />
              </button>
            </div>

            <div className={styles.drawerBody}>
              <div className={styles.drawerRow}>
                <span className={styles.drawerLabel}>Sector</span>
                <span className={styles.drawerValue}>{selected.sector}</span>
              </div>
              <div className={styles.drawerRow}>
                <span className={styles.drawerLabel}>Funding Stage</span>
                <span className={styles.drawerValue}>{selected.stage}</span>
              </div>
              <div className={styles.drawerRow}>
                <span className={styles.drawerLabel}>AI Score</span>
                <span className={styles.drawerValue}>
                  {selected.score !== null ? `${selected.score} / 10` : 'Pending'}
                </span>
              </div>
              <div className={styles.drawerRow}>
                <span className={styles.drawerLabel}>Analyst</span>
                <span className={styles.drawerValue}>{selected.analyst}</span>
              </div>
              <div className={styles.drawerRow}>
                <span className={styles.drawerLabel}>Last Updated</span>
                <span className={styles.drawerValue}>{selected.updatedAt}</span>
              </div>
              <div className={styles.drawerRow}>
                <span className={styles.drawerLabel}>Tags</span>
                <div className={styles.tags}>
                  {selected.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
              </div>

              {canMoveNext && (
                <button className={styles.moveBtn} onClick={handleMoveNext}>
                  Move to {columns[selectedColIdx + 1]?.title} →
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
