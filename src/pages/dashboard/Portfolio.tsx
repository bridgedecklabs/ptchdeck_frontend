import { useState } from 'react'
import DataTable, { Column } from '../../components/dashboard/DataTable'
import { portfolioCompanies, portfolioStats, PortfolioCompany, PortfolioStatus } from '../../data/dashboard/portfolio'
import styles from './Portfolio.module.css'

type Tab = 'All' | PortfolioStatus
const TABS: Tab[] = ['All', 'Active', 'Exited', 'Rejected']

function fmt(n: number) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`
  return `$${n}`
}

function moic(invested: number, current: number) {
  return (current / invested).toFixed(2)
}

export default function Portfolio() {
  const [tab, setTab] = useState<Tab>('All')
  const [selected, setSelected] = useState<PortfolioCompany | null>(null)

  const filtered = tab === 'All' ? portfolioCompanies : portfolioCompanies.filter(c => c.status === tab)

  const badgeClass = (s: PortfolioStatus) => ({ Active: styles.badgeActive, Exited: styles.badgeExited, Rejected: styles.badgeRejected }[s])

  const columns: Column<PortfolioCompany>[] = [
    {
      key: 'company', label: 'Company',
      render: (r) => (
        <div className={styles.companyCell}>
          <div className={styles.companyAvatar}>{r.company.slice(0, 2).toUpperCase()}</div>
          <div>
            <div className={styles.companyName}>{r.company}</div>
            <div className={styles.companyLocation}>{r.location}</div>
          </div>
        </div>
      )
    },
    { key: 'sector', label: 'Sector' },
    { key: 'stage', label: 'Stage' },
    { key: 'invested', label: 'Invested', render: (r) => fmt(r.invested) },
    { key: 'currentValue', label: 'Current Value', render: (r) => fmt(r.currentValue) },
    {
      key: 'currentValue', label: 'MOIC',
      render: (r) => {
        const m = parseFloat(moic(r.invested, r.currentValue))
        const cls = m >= 1 ? styles.moicUp : styles.moicDown
        return <span className={`${styles.moic} ${cls}`}>{m.toFixed(2)}x</span>
      }
    },
    { key: 'investedDate', label: 'Invested Date' },
    {
      key: 'status', label: 'Status',
      render: (r) => <span className={`${styles.badge} ${badgeClass(r.status)}`}>{r.status}</span>
    },
  ]

  const totalDeployed = `$${(portfolioStats.totalDeployed / 1e6).toFixed(1)}M`
  const currentValue = `$${(portfolioStats.currentValue / 1e6).toFixed(1)}M`
  const totalMoic = (portfolioStats.currentValue / portfolioStats.totalDeployed).toFixed(2)

  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <div className={styles.statBox}>
          <div className={styles.statLabel}>Total Deployed</div>
          <div className={styles.statValue}>{totalDeployed}</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statLabel}>Current Value</div>
          <div className={styles.statValue}>{currentValue}</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statLabel}>Portfolio MOIC</div>
          <div className={`${styles.statValue} ${styles.moicGood}`}>{totalMoic}x</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statLabel}>Active Companies</div>
          <div className={styles.statValue}>{portfolioStats.activeCompanies}</div>
          <div className={styles.statSub}>{portfolioStats.exits} exit</div>
        </div>
      </div>

      <div className={styles.filterTabs}>
        {TABS.map((t) => (
          <button key={t} className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search portfolio..."
        searchKeys={['company', 'sector', 'location']}
        onRowClick={setSelected}
        pageSize={10}
      />

      {selected && (
        <div className={styles.overlay} onClick={() => setSelected(null)}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <div>
                <div className={styles.drawerTitle}>{selected.company}</div>
                <div className={styles.drawerTagline}>{selected.description}</div>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelected(null)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className={styles.drawerBody}>
              <div className={styles.metricsGrid}>
                <div className={styles.metricBox}><div className={styles.metricLabel}>Invested</div><div className={styles.metricValue}>{fmt(selected.invested)}</div></div>
                <div className={styles.metricBox}><div className={styles.metricLabel}>Current Value</div><div className={styles.metricValue}>{fmt(selected.currentValue)}</div></div>
                <div className={styles.metricBox}><div className={styles.metricLabel}>MOIC</div><div className={styles.metricValue}>{moic(selected.invested, selected.currentValue)}x</div></div>
                <div className={styles.metricBox}><div className={styles.metricLabel}>Status</div><div className={styles.metricValue}>{selected.status}</div></div>
              </div>

              <div>
                <div className={styles.sectionTitle}>Tags</div>
                <div className={styles.tags}>{selected.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}</div>
              </div>

              <div>
                <div className={styles.sectionTitle}>Founders</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>{selected.founders.join(', ')}</div>
              </div>

              {selected.fundingRounds.length > 0 && (
                <div>
                  <div className={styles.sectionTitle}>Funding Rounds</div>
                  <div className={styles.roundList}>
                    {selected.fundingRounds.map((r, i) => (
                      <div key={i} className={styles.roundRow}>
                        <div>
                          <div className={styles.roundName}>{r.round}</div>
                          <div className={styles.roundDate}>{r.date}</div>
                        </div>
                        <div className={styles.roundAmount}>${(r.amount / 1e6).toFixed(1)}M</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
