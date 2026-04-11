import { useState, useMemo } from 'react'
import styles from './DataTable.module.css'

export interface Column<T> {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
  sortable?: boolean
}

export interface FilterOption {
  key: string
  label: string
  options: string[]
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[]
  data: T[]
  filters?: FilterOption[]
  searchPlaceholder?: string
  searchKeys?: (keyof T)[]
  onRowClick?: (row: T) => void
  pageSize?: number
}

export default function DataTable<T extends { id: string }>({
  columns, data, filters = [], searchPlaceholder = 'Search...', searchKeys = [], onRowClick, pageSize = 10,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [filterValues, setFilterValues] = useState<Record<string, string>>({})
  const [sortKey, setSortKey] = useState<string>('')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let rows = [...data]
    if (search) {
      const q = search.toLowerCase()
      rows = rows.filter((r) =>
        searchKeys.some((k) => String(r[k] ?? '').toLowerCase().includes(q))
      )
    }
    filters.forEach((f) => {
      const val = filterValues[f.key]
      if (val && val !== f.options[0]) {
        rows = rows.filter((r) => String((r as Record<string, unknown>)[f.key]) === val)
      }
    })
    if (sortKey) {
      rows.sort((a, b) => {
        const av = String((a as Record<string, unknown>)[sortKey] ?? '')
        const bv = String((b as Record<string, unknown>)[sortKey] ?? '')
        return sortDir === 'asc' ? av.localeCompare(bv, undefined, { numeric: true }) : bv.localeCompare(av, undefined, { numeric: true })
      })
    }
    return rows
  }, [data, search, filterValues, sortKey, sortDir, searchKeys, filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
    setPage(1)
  }

  return (
    <div className={styles.wrapper}>
      {(searchKeys.length > 0 || filters.length > 0) && (
        <div className={styles.filterBar}>
          {searchKeys.length > 0 && (
            <div className={styles.searchWrap}>
              <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                className={styles.searchInput}
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              />
            </div>
          )}
          {filters.map((f) => (
            <select
              key={f.key}
              className={styles.select}
              value={filterValues[f.key] ?? f.options[0]}
              onChange={(e) => { setFilterValues(v => ({ ...v, [f.key]: e.target.value })); setPage(1) }}
            >
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          ))}
        </div>
      )}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} onClick={() => col.sortable !== false && handleSort(String(col.key))}>
                  <div className={styles.thInner}>
                    {col.label}
                    {col.sortable !== false && sortKey === String(col.key) && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                        {sortDir === 'asc'
                          ? <path d="M5 2L9 7H1L5 2Z" />
                          : <path d="M5 8L1 3H9L5 8Z" />
                        }
                      </svg>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {paginated.length === 0 ? (
              <tr><td colSpan={columns.length} className={styles.emptyState}>No results found</td></tr>
            ) : paginated.map((row) => (
              <tr key={row.id} onClick={() => onRowClick?.(row)}>
                {columns.map((col) => (
                  <td key={String(col.key)}>
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[String(col.key)] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <span className={styles.pageInfo}>
          Showing {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
        </span>
        <div className={styles.pageControls}>
          <button className={styles.pageBtn} disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7 2L3 6L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const p = i + 1
            return (
              <button key={p} className={`${styles.pageBtn} ${page === p ? styles.pageBtnActive : ''}`} onClick={() => setPage(p)}>{p}</button>
            )
          })}
          <button className={styles.pageBtn} disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M5 2L9 6L5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
