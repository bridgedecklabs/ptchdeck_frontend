import { useState, useMemo } from 'react'
import { SlidersHorizontal, Download, Calendar } from 'lucide-react'
import { Deal, deals, sectors, stages } from '../../data/dashboard/scoreboard'
import styles from './Scoreboard.module.css'

const STATUS_MAP: Record<Deal['status'], { label: string; cls: string }> = {
  new:      { label: 'Pipeline',  cls: styles.statusPipeline  },
  reviewed: { label: 'Reviewing', cls: styles.statusReviewing },
  flagged:  { label: 'Flagged',   cls: styles.statusFlagged   },
  passed:   { label: 'Passed',    cls: styles.statusPassed    },
}

const breakdownKeys: { key: keyof Deal['breakdown']; label: string }[] = [
  { key: 'marketSize',    label: 'Market Size'    },
  { key: 'teamStrength',  label: 'Team Strength'  },
  { key: 'productVision', label: 'Product Vision' },
  { key: 'traction',      label: 'Traction'       },
  { key: 'financials',    label: 'Financials'     },
  { key: 'competition',   label: 'Competition'    },
]

const DATE_OPTIONS = ['Last 30 Days', 'Last 90 Days', 'Year to Date', 'All Time']

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function relativeDate(dateStr: string) {
  const now = new Date()
  const date = new Date(dateStr)
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000)
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function ScoreCircle({ score }: { score: number }) {
  if (!score) return <span className={styles.scorePending}>Pending</span>
  const cls = score >= 85 ? styles.scoreHigh : score >= 65 ? styles.scoreMid : styles.scoreLow
  return <div className={`${styles.scoreCircle} ${cls}`}>{score}</div>
}

const PAGE_SIZE = 8

export default function Scoreboard() {
  const [sector, setSector]   = useState('All Sectors')
  const [stage, setStage]     = useState('All Stages')
  const [status, setStatus]   = useState('All')
  const [dateRange, setDateRange] = useState('Last 30 Days')
  const [page, setPage]       = useState(1)
  const [selected, setSelected] = useState<Deal | null>(null)

  const filtered = useMemo(() => {
    return deals.filter(d => {
      if (sector !== 'All Sectors' && d.sector !== sector) return false
      if (stage !== 'All Stages' && d.stage !== stage) return false
      if (status !== 'All' && d.status !== status) return false
      return true
    })
  }, [sector, stage, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const totalEvaluated = deals.length
  const highSignal     = deals.filter(d => d.score >= 85).length
  const activePipeline = deals.filter(d => d.status === 'new').length

  return (
    <div className={styles.page}>

      {/* ── Stat Cards ── */}
      <div className={styles.statGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Evaluated</span>
          <span className={styles.statValue}>{totalEvaluated.toLocaleString()}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>High Signal (85+)</span>
          <div className={styles.statValueRow}>
            <span className={styles.statValue}>{highSignal}</span>
            <span className={styles.statUnit}>Companies</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.statCardAccent}`}>
          <span className={styles.statLabelLight}>Active Pipeline</span>
          <span className={styles.statValueLight}>{activePipeline}</span>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className={styles.filterBar}>
        <div className={styles.filterLeft}>
          <span className={styles.filterLabel}>Filters</span>
          <select className={styles.select} value={sector} onChange={e => { setSector(e.target.value); setPage(1) }}>
            {sectors.map(s => <option key={s}>{s}</option>)}
          </select>
          <select className={styles.select} value={stage} onChange={e => { setStage(e.target.value); setPage(1) }}>
            {stages.map(s => <option key={s}>{s}</option>)}
          </select>
          <select className={styles.select} value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
            <option value="All">Active</option>
            <option value="new">Pipeline</option>
            <option value="reviewed">Reviewing</option>
            <option value="flagged">Flagged</option>
            <option value="passed">Passed</option>
          </select>
          <button className={styles.moreFiltersBtn}>
            <SlidersHorizontal size={13} />
            More Filters
          </button>
        </div>
        <div className={styles.filterRight}>
          <div className={styles.dateFilter}>
            <Calendar size={13} className={styles.dateIcon} />
            <select className={styles.dateSelect} value={dateRange} onChange={e => setDateRange(e.target.value)}>
              {DATE_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className={styles.vertDivider} />
          <button className={styles.exportBtn}>
            <Download size={13} />
            Export CSV
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Sector</th>
                <th>Stage</th>
                <th className={styles.thCenter}>Score</th>
                <th>Status</th>
                <th>User</th>
                <th className={styles.thRight}>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} className={styles.empty}>No results found</td></tr>
              ) : paginated.map(row => {
                const { label: statusLabel, cls: statusCls } = STATUS_MAP[row.status]
                return (
                  <tr key={row.id} className={styles.row} onClick={() => setSelected(row)}>
                    <td>
                      <div className={styles.companyCell}>
                        <div className={styles.companyLogo}>{row.company[0]}</div>
                        <strong className={styles.companyName}>{row.company}</strong>
                      </div>
                    </td>
                    <td className={styles.cellText}>{row.sector}</td>
                    <td className={styles.cellText}>{row.stage}</td>
                    <td className={styles.tdCenter}>
                      <ScoreCircle score={row.score} />
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${statusCls}`}>{statusLabel}</span>
                    </td>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.userInitials}>{getInitials(row.analyst)}</div>
                        <span className={styles.cellText}>{row.analyst}</span>
                      </div>
                    </td>
                    <td className={styles.tdRight}>
                      <span className={styles.dateText}>{relativeDate(row.uploadedAt)}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} results
          </span>
          <div className={styles.pageControls}>
            <button className={styles.pageBtn} disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => (
              <button key={i + 1} className={`${styles.pageBtn} ${page === i + 1 ? styles.pageBtnActive : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
            ))}
            {totalPages > 3 && <span className={styles.pageDots}>...</span>}
            <button className={styles.pageBtn} disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
          </div>
        </div>
      </div>

      {/* ── Row Detail Modal ── */}
      {selected && (
        <div className={styles.overlay} onClick={() => setSelected(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <div className={styles.modalTitle}>{selected.company}</div>
                <div className={styles.modalMeta}>
                  <span className={styles.metaTag}>{selected.sector}</span>
                  <span className={styles.metaTag}>{selected.stage}</span>
                  <span className={styles.metaTag}>{selected.location}</span>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className={styles.modalBody}>
              {selected.score ? (
                <div className={styles.overallScore}>
                  <div>
                    <div className={styles.bigScore}>{selected.score}</div>
                    <div className={styles.bigScoreLabel}>Overall AI Score</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className={styles.breakdownTitle}>Score Breakdown</div>
                    <div className={styles.breakdownList}>
                      {breakdownKeys.map(({ key, label }) => (
                        <div key={key} className={styles.breakdownRow}>
                          <span className={styles.breakdownLabel}>{label}</span>
                          <div className={styles.breakdownBar}><div className={styles.breakdownFill} style={{ width: `${selected.breakdown[key]}%` }}/></div>
                          <span className={styles.breakdownVal}>{selected.breakdown[key]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.pendingMsg}>Analysis in progress...</div>
              )}

              <div className={styles.descSection}>
                <label>Description</label>
                <p>{selected.description}</p>
              </div>
              <div className={styles.descSection}>
                <label>Tags</label>
                <div className={styles.tags}>
                  {selected.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
              </div>
              <div className={styles.descSection}>
                <label>Analyst Notes</label>
                <textarea className={styles.notesArea} defaultValue={selected.notes} placeholder="Add notes..."/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
