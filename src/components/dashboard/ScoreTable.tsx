import { useState } from 'react'
import { SlidersHorizontal, Download, Eye, ArrowRight, MoreVertical, ChevronUp, ChevronDown } from 'lucide-react'
import ScoreBadge from './ScoreBadge'
import ScoreFilters, { type ScoreFilterState } from './ScoreFilters'
import DuplicateTag from './DuplicateTag'
import type { ScoreEntry } from '../../pages/dashboard/Scoreboard'
import styles from './ScoreTable.module.css'

const PAGE_SIZE_OPTIONS = [10, 20, 50]

type SortKey = 'score' | 'name' | 'date'
type SortDir = 'asc' | 'desc'

const AVATAR_COLORS: Record<string, string> = {
  TF: '#6366f1', FO: '#0ea5e9', HB: '#f97316', PF: '#dc2626',
  BA: '#64748b', GG: '#16a34a', NC: '#8b5cf6', SR: '#ec4899',
  DL: '#14b8a6', AT: '#f59e0b', CV: '#3b82f6', MR: '#10b981',
  QR: '#6366f1', XD: '#f97316', ZP: '#a855f7',
}

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

function getAvatarBg(name: string) {
  const key = initials(name)
  return AVATAR_COLORS[key] ?? '#6366f1'
}

interface ScoreTableProps {
  data: ScoreEntry[]
}

const INITIAL_FILTERS: ScoreFilterState = {
  search: '', scoreRange: '', sector: '', stage: '',
  uploadedBy: '', cohort: '', dateRange: '', duplicatesOnly: false,
}

export default function ScoreTable({ data }: ScoreTableProps) {
  const [filters, setFilters] = useState<ScoreFilterState>(INITIAL_FILTERS)
  const [page, setPage]         = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [sort, setSort]         = useState<{ key: SortKey; dir: SortDir }>({ key: 'score', dir: 'desc' })

  const filtered = data.filter((row) => {
    if (filters.search && !row.name.toLowerCase().includes(filters.search.toLowerCase())) return false
    if (filters.duplicatesOnly && !row.isDuplicate) return false
    if (filters.sector && row.sector !== filters.sector) return false
    if (filters.stage  && row.stage  !== filters.stage)  return false
    if (filters.uploadedBy && row.uploadedBy !== filters.uploadedBy) return false
    if (filters.cohort && row.cohort !== filters.cohort) return false
    if (filters.scoreRange) {
      if (filters.scoreRange === '75–100 (High)' && row.score < 75) return false
      if (filters.scoreRange === '50–74 (Mid)'   && (row.score < 50 || row.score >= 75)) return false
      if (filters.scoreRange === '0–49 (Low)'    && row.score >= 50) return false
    }
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    let diff = 0
    if (sort.key === 'score') diff = a.score - b.score
    if (sort.key === 'name')  diff = a.name.localeCompare(b.name)
    if (sort.key === 'date')  diff = new Date(a.date).getTime() - new Date(b.date).getTime()
    return sort.dir === 'asc' ? diff : -diff
  })

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage   = Math.min(page, totalPages)
  const start      = (safePage - 1) * pageSize
  const pageRows   = sorted.slice(start, start + pageSize)

  const allSelected  = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id))
  const someSelected = pageRows.some((r) => selected.has(r.id))

  const toggleAll = () =>
    setSelected((prev) => {
      const next = new Set(prev)
      allSelected ? pageRows.forEach((r) => next.delete(r.id)) : pageRows.forEach((r) => next.add(r.id))
      return next
    })

  const toggleRow = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const handleSort = (key: SortKey) =>
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' },
    )

  const handleFiltersChange = (f: ScoreFilterState) => {
    setFilters(f)
    setPage(1)
  }

  function SortIcon({ colKey }: { colKey: SortKey }) {
    const active = sort.key === colKey
    if (active && sort.dir === 'asc') {
      return <ChevronUp className={`${styles.sortIcon} ${styles.sortIconActive}`} size={12} />
    }
    return <ChevronDown className={`${styles.sortIcon} ${active ? styles.sortIconActive : ''}`} size={12} />
  }

  const pageNums = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>Scoreboard</h2>
          <span className={styles.deckBadge}>{filtered.length} DECKS</span>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.iconBtn} aria-label="Filter">
            <SlidersHorizontal size={15} />
          </button>
          <button className={styles.iconBtn} aria-label="Download">
            <Download size={15} />
          </button>
        </div>
      </div>

      <div className={styles.filtersWrap}>
        <ScoreFilters filters={filters} onChange={handleFiltersChange} />
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected }}
                  onChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
              <th className={styles.th}>
                <button className={styles.sortBtn} onClick={() => handleSort('name')}>
                  Company Name <SortIcon colKey="name" />
                </button>
              </th>
              <th className={styles.th}>Sector</th>
              <th className={styles.th}>Stage</th>
              <th className={styles.th}>
                <button className={styles.sortBtn} onClick={() => handleSort('score')}>
                  Score <SortIcon colKey="score" />
                </button>
              </th>
              <th className={styles.th}>Uploaded By</th>
              <th className={styles.th}>
                <button className={styles.sortBtn} onClick={() => handleSort('date')}>
                  Scored On <SortIcon colKey="date" />
                </button>
              </th>
              <th className={styles.th}>Cohort</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={9} className={styles.emptyCell}>
                  No decks match your filters.
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr
                  key={row.id}
                  className={`${styles.tr} ${selected.has(row.id) ? styles.trSelected : ''}`}
                >
                  <td className={styles.td}>
                    <input
                      type="checkbox"
                      checked={selected.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                      aria-label={`Select ${row.name}`}
                    />
                  </td>

                  <td className={styles.td}>
                    <div className={styles.companyCell}>
                      <div className={styles.avatar} style={{ background: getAvatarBg(row.name) }}>
                        {initials(row.name)}
                      </div>
                      <div className={styles.companyInfo}>
                        <span className={styles.companyName}>{row.name}</span>
                        {row.isDuplicate && <DuplicateTag />}
                      </div>
                    </div>
                  </td>

                  <td className={styles.td}><span className={styles.chip}>{row.sector}</span></td>
                  <td className={styles.td}><span className={styles.chip}>{row.stage}</span></td>
                  <td className={styles.td}><ScoreBadge score={row.score} /></td>

                  <td className={styles.td}>
                    <div className={styles.uploaderCell}>
                      <div className={styles.uploaderAvatar}>{initials(row.uploadedBy)}</div>
                      <span>{row.uploadedBy}</span>
                    </div>
                  </td>

                  <td className={styles.td}><span className={styles.date}>{row.date}</span></td>
                  <td className={styles.td}><span className={styles.cohortChip}>{row.cohort}</span></td>

                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <button className={styles.actionBtn} title="View deck"><Eye size={14} /></button>
                      <button className={styles.actionBtn} title="Move to pipeline"><ArrowRight size={14} /></button>
                      <button className={styles.actionBtn} title="More options"><MoreVertical size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <div className={styles.pageSizeWrap}>
            <span className={styles.footerText}>Rows per page:</span>
            <select
              className={styles.pageSizeSelect}
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}
            >
              {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <span className={styles.footerText}>
            Showing {sorted.length === 0 ? 0 : start + 1}–{Math.min(start + pageSize, sorted.length)} of {sorted.length} decks
          </span>
        </div>

        <div className={styles.pagination}>
          <button className={styles.pageBtn} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1} aria-label="Previous">‹</button>
          {pageNums.map((n) => (
            <button key={n} className={`${styles.pageBtn} ${n === safePage ? styles.pageBtnActive : ''}`} onClick={() => setPage(n)}>{n}</button>
          ))}
          <button className={styles.pageBtn} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} aria-label="Next">›</button>
        </div>
      </div>
    </div>
  )
}
