import { useState } from 'react'
import { RefreshCw, MoreVertical } from 'lucide-react'
import StatusBadge from './StatusBadge'
import TableFilters, { type FilterState } from './TableFilters'
import type { QueueEntry } from '../../pages/dashboard/UploadQueue'
import styles from './QueueTable.module.css'

const PAGE_SIZE_OPTIONS = [10, 20, 50]

const AVATAR_COLORS: Record<string, string> = {
  TF: '#6366f1', FO: '#0ea5e9', HB: '#f97316',
  PF: '#dc2626', BA: '#64748b', GG: '#16a34a',
  NC: '#8b5cf6', SR: '#ec4899', DL: '#14b8a6',
}

function getInitials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

interface QueueTableProps {
  data: QueueEntry[]
}

const INITIAL_FILTERS: FilterState = {
  search: '', status: '', sector: '', stage: '', uploadedBy: '', dateRange: '',
}

export default function QueueTable({ data }: QueueTableProps) {
  const [filters, setFilters]     = useState<FilterState>(INITIAL_FILTERS)
  const [page, setPage]           = useState(1)
  const [pageSize, setPageSize]   = useState(10)
  const [selected, setSelected]   = useState<Set<number>>(new Set())

  const filtered = data.filter((row) => {
    if (filters.search && !row.name.toLowerCase().includes(filters.search.toLowerCase())) return false
    if (filters.status && row.status !== filters.status.toLowerCase()) return false
    if (filters.sector && row.sector !== filters.sector) return false
    if (filters.stage  && row.stage  !== filters.stage)  return false
    if (filters.uploadedBy && row.uploadedBy !== filters.uploadedBy) return false
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage   = Math.min(page, totalPages)
  const start      = (safePage - 1) * pageSize
  const pageRows   = filtered.slice(start, start + pageSize)

  const allSelected  = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id))
  const someSelected = pageRows.some((r) => selected.has(r.id))

  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (allSelected) pageRows.forEach((r) => next.delete(r.id))
      else             pageRows.forEach((r) => next.add(r.id))
      return next
    })
  }

  const toggleRow = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleFiltersChange = (f: FilterState) => { setFilters(f); setPage(1) }
  const pageNums = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>Queue</h2>
          <span className={styles.badge}>{filtered.length} decks</span>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.iconBtn} aria-label="Refresh"><RefreshCw size={15} /></button>
          <button className={styles.iconBtn} aria-label="Options"><MoreVertical size={15} /></button>
        </div>
      </div>

      <div className={styles.filtersRow}>
        <TableFilters filters={filters} onChange={handleFiltersChange} />
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
              <th className={styles.th}>Company Name</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Sector</th>
              <th className={styles.th}>Stage</th>
              <th className={styles.th}>Uploaded By</th>
              <th className={styles.th}>Uploaded On</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={8} className={styles.emptyCell}>No entries match your filters.</td>
              </tr>
            ) : (
              pageRows.map((row) => {
                const inits    = getInitials(row.name)
                const avatarBg = AVATAR_COLORS[inits] ?? '#6366f1'
                return (
                  <tr key={row.id} className={`${styles.tr} ${selected.has(row.id) ? styles.trSelected : ''}`}>
                    <td className={styles.td}>
                      <input type="checkbox" checked={selected.has(row.id)} onChange={() => toggleRow(row.id)} aria-label={`Select ${row.name}`} />
                    </td>
                    <td className={styles.td}>
                      <div className={styles.companyCell}>
                        <div className={styles.avatar} style={{ background: avatarBg }}>{inits}</div>
                        <span className={styles.companyName}>{row.name}</span>
                      </div>
                    </td>
                    <td className={styles.td}><StatusBadge status={row.status} /></td>
                    <td className={styles.td}><span className={styles.chip}>{row.sector}</span></td>
                    <td className={styles.td}><span className={styles.chip}>{row.stage}</span></td>
                    <td className={styles.td}>
                      <div className={styles.uploaderCell}>
                        <div className={styles.uploaderAvatar}>{getInitials(row.uploadedBy)}</div>
                        <span>{row.uploadedBy}</span>
                      </div>
                    </td>
                    <td className={styles.td}><span className={styles.date}>{row.date}</span></td>
                    <td className={styles.td}>
                      <button className={styles.rowMenuBtn} aria-label="Row options"><MoreVertical size={14} /></button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.footerText}>
            Showing {filtered.length === 0 ? 0 : start + 1} to {Math.min(start + pageSize, filtered.length)} of {filtered.length} entries
          </span>
          <div className={styles.pageSizeWrap}>
            <span className={styles.footerText}>Rows per page:</span>
            <select className={styles.pageSizeSelect} value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}>
              {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.pagination}>
          <button className={styles.pageBtn} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1} aria-label="Previous page">‹</button>
          {pageNums.map((n) => (
            <button key={n} className={`${styles.pageBtn} ${n === safePage ? styles.pageBtnActive : ''}`} onClick={() => setPage(n)}>{n}</button>
          ))}
          <button className={styles.pageBtn} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} aria-label="Next page">›</button>
        </div>
      </div>
    </div>
  )
}
