import { useState } from 'react'
import { FileUp, BarChart2, Users, PlusCircle, ChevronRight, Search } from 'lucide-react'
import styles from './DashboardHome.module.css'

interface StatCard {
  value: number
  label: string
  color?: 'default' | 'warning' | 'success' | 'error'
}

const stats: StatCard[] = [
  { value: 24, label: 'Decks This Month', color: 'default' },
  { value: 3,  label: 'Processing',       color: 'warning' },
  { value: 18, label: 'Scored',           color: 'success' },
  { value: 7,  label: 'In Pipeline',      color: 'default' },
  { value: 12, label: 'Rejected',         color: 'error' },
]

interface ActivityItem {
  id: number
  text: React.ReactNode
  time: string
  dot: 'blue' | 'gray' | 'orange' | 'red'
}

const activity: ActivityItem[] = [
  { id: 1, text: <><strong>TechFlow AI</strong> scored <span className={styles.scoreBlue}>74</span> by AI Engine</>,      time: '2 mins ago',  dot: 'blue' },
  { id: 2, text: <>FinanceOS.pdf imported successfully</>,                                                                  time: '45 mins ago', dot: 'gray' },
  { id: 3, text: <><strong>HealthBridge</strong> scored <span className={styles.scoreOrange}>61</span> by AI Engine</>,   time: '2 hours ago', dot: 'orange' },
  { id: 4, text: <>PayFlow analysis failed (Low res document)</>,                                                           time: '3 hours ago', dot: 'red' },
  { id: 5, text: <>New cohort 'Q4 Fintech' created by Sarah J.</>,                                                         time: '5 hours ago', dot: 'blue' },
  { id: 6, text: <>3 duplicate decks merged for GreenGrid</>,                                                              time: 'Yesterday',   dot: 'gray' },
]

interface ArchiveEntry {
  id: string
  initials: string
  bgColor: string
  company: string
  score: number
  scoreColor: string
  sector: string
  stage: string
  rejectedBy: string
  rejectedInitials: string
}

const rejected: ArchiveEntry[] = [
  { id: '1', initials: 'FO', bgColor: '#6366f1', company: 'FinanceOS',   score: 74, scoreColor: '#16a34a', sector: 'FINTECH',    stage: 'SEED',     rejectedBy: 'Sarah Jenkins', rejectedInitials: 'SJ' },
  { id: '2', initials: 'BA', bgColor: '#64748b', company: 'BuildBot AI', score: 38, scoreColor: '#dc2626', sector: 'SAAS',       stage: 'PRE-SEED', rejectedBy: 'Marcus K.',     rejectedInitials: 'MK' },
  { id: '3', initials: 'HT', bgColor: '#f97316', company: 'HealthTrack', score: 55, scoreColor: '#d97706', sector: 'HEALTHTECH', stage: 'SEED',     rejectedBy: 'Preet S.',      rejectedInitials: 'PS' },
]

type ArchiveTab = 'rejected' | 'watchlist' | 'duplicates'

export default function DashboardHome() {
  const [archiveTab, setArchiveTab] = useState<ArchiveTab>('rejected')

  return (
    <div className={styles.page}>
      {/* Stats row */}
      <div className={styles.statsRow}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <span className={`${styles.statValue} ${s.color ? styles[s.color] : ''}`}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Middle row */}
      <div className={styles.midRow}>
        {/* Recent Activity */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Recent Activity</h2>
            <button className={styles.viewAll}>View All Logs</button>
          </div>
          <ul className={styles.activityList}>
            {activity.map((item) => (
              <li key={item.id} className={styles.activityItem}>
                <span className={`${styles.dot} ${styles[`dot_${item.dot}`]}`} />
                <div>
                  <p className={styles.activityText}>{item.text}</p>
                  <span className={styles.activityTime}>{item.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Quick Actions</h2>
          <div className={styles.quickActions}>
            <button className={`${styles.qaBtn} ${styles.qaPrimary}`}>
              <FileUp size={16} />
              Upload Deck
            </button>
            <button className={styles.qaBtn}>
              <BarChart2 size={16} />
              View Scoreboard
              <ChevronRight className={styles.qaChevron} size={14} />
            </button>
            <button className={styles.qaBtn}>
              <Users size={16} />
              Open Pipeline
              <ChevronRight className={styles.qaChevron} size={14} />
            </button>
            <button className={styles.qaBtn}>
              <PlusCircle size={16} />
              Create Cohort
              <ChevronRight className={styles.qaChevron} size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Archives */}
      <div className={styles.card}>
        <div className={styles.archivesHeader}>
          <div>
            <h2 className={styles.cardTitle}>Archives</h2>
            <p className={styles.archivesSub}>Review historical passes and duplicated data</p>
          </div>
          <div className={styles.searchBox}>
            <Search size={14} />
            <input type="text" placeholder="Search archives..." className={styles.searchInput} />
          </div>
        </div>

        <div className={styles.tabRow}>
          {(['rejected', 'watchlist', 'duplicates'] as ArchiveTab[]).map((t) => (
            <button
              key={t}
              className={`${styles.tab} ${archiveTab === t ? styles.tabActive : ''}`}
              onClick={() => setArchiveTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}><input type="checkbox" /></th>
              <th className={styles.th}>Company Name</th>
              <th className={styles.th}>Score</th>
              <th className={styles.th}>Sector</th>
              <th className={styles.th}>Stage</th>
              <th className={styles.th}>Rejected By</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {archiveTab === 'rejected' ? (
              rejected.map((row) => (
                <tr key={row.id} className={styles.tr}>
                  <td className={styles.td}><input type="checkbox" /></td>
                  <td className={styles.td}>
                    <div className={styles.companyCell}>
                      <div className={styles.companyAvatar} style={{ background: row.bgColor }}>{row.initials}</div>
                      <span className={styles.companyName}>{row.company}</span>
                    </div>
                  </td>
                  <td className={styles.td}><span className={styles.score} style={{ color: row.scoreColor }}>{row.score}</span></td>
                  <td className={styles.td}><span className={styles.badge}>{row.sector}</span></td>
                  <td className={styles.td}><span className={styles.badge}>{row.stage}</span></td>
                  <td className={styles.td}>
                    <div className={styles.rejectedCell}>
                      <div className={styles.rejectedAvatar}>{row.rejectedInitials}</div>
                      <span>{row.rejectedBy}</span>
                    </div>
                  </td>
                  <td className={styles.td}><button className={styles.actionBtn}>Move To Pipeline</button></td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={7} className={styles.emptyCell}>No entries yet.</td></tr>
            )}
          </tbody>
        </table>

        <div className={styles.tableFooter}>
          <span className={styles.tableCount}>Showing 3 of 12 rejected entries</span>
          <div className={styles.pagination}>
            <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>›</button>
          </div>
        </div>
      </div>
    </div>
  )
}
