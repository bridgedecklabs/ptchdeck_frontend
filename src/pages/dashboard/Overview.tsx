import { useNavigate } from 'react-router-dom'
import StatCard from '../../components/dashboard/StatCard'
import DataTable, { Column } from '../../components/dashboard/DataTable'
import { kpiStats, recentUploads, activityFeed, RecentUpload } from '../../data/dashboard/overview'
import { DASHBOARD_ROUTES } from '../../config/routes'
import styles from './Overview.module.css'

const icons = {
  deals: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 14V9M7 14V6M11 14V10M15 14V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  pipeline: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="5" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="7" y="3" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="12" y="7" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>,
  score: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M6 9L8 11L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  time: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5V9L11.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
}

function ScoreCell({ score }: { score: number | null }) {
  if (score === null) return <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-xs)' }}>Pending</span>
  const cls = score >= 80 ? styles.scoreHigh : score >= 65 ? styles.scoreMid : styles.scoreLow
  return (
    <div className={`${styles.scoreCell} ${cls}`}>
      <div className={styles.scoreBar}><div className={styles.scoreBarFill} style={{ width: `${score}%` }} /></div>
      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{score}</span>
    </div>
  )
}

const dotClass = { upload: styles.dotUpload, score: styles.dotScore, move: styles.dotMove, comment: styles.dotComment, user: styles.dotUser }
const dotIcons = {
  upload: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 9v1.5C2 11.33 2.67 12 3.5 12h5c.83 0 1.5-.67 1.5-1.5V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M6 7.5V2M6 2L4 4M6 2L8 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  score: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6L5 8L9 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  move: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  comment: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 2h9C11.33 2 12 2.67 12 3.5v5C12 9.33 11.33 10 10.5 10H4l-2.5 2V3.5C1.5 2.67 2.17 2 3 2z" stroke="currentColor" strokeWidth="1.2"/></svg>,
  user: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2 11c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
}

export default function Overview() {
  const navigate = useNavigate()

  const columns: Column<RecentUpload>[] = [
    { key: 'company', label: 'Company', render: (r) => <strong style={{ color: 'var(--color-text-primary)' }}>{r.company}</strong> },
    { key: 'sector', label: 'Sector', render: (r) => <span style={{ fontSize: 'var(--text-xs)', background: 'var(--color-accent-muted)', color: 'var(--color-accent)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 500 }}>{r.sector}</span> },
    { key: 'stage', label: 'Stage' },
    { key: 'uploadedBy', label: 'Uploaded by' },
    { key: 'uploadedAt', label: 'Uploaded' },
    {
      key: 'status', label: 'Status',
      render: (r) => {
        const cls = { scored: styles.statusScored, processing: styles.statusProcessing, queued: styles.statusQueued }[r.status]
        return <span className={`${styles.status} ${cls}`}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>
      }
    },
    { key: 'score', label: 'AI Score', render: (r) => <ScoreCell score={r.score} /> },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.statsGrid}>
        {kpiStats.map((s) => (
          <StatCard key={s.id} label={s.label} value={s.value} change={s.change} changeLabel={s.changeLabel} icon={icons[s.icon]} />
        ))}
      </div>

      <div className={styles.bottomGrid}>
        <div>
          <div className={styles.sectionTitle}>Recent Uploads</div>
          <DataTable
            columns={columns}
            data={recentUploads}
            pageSize={6}
            onRowClick={(r) => navigate(`${DASHBOARD_ROUTES.SCOREBOARD}/${r.id}`)}
          />
        </div>

        <div className={styles.activityCard}>
          <div className={styles.activityHeader}>
            <div className={styles.sectionTitle} style={{ marginBottom: 0 }}>Activity</div>
          </div>
          <div className={styles.activityList}>
            {activityFeed.map((item) => (
              <div key={item.id} className={styles.activityItem}>
                <div className={`${styles.activityDot} ${dotClass[item.type]}`}>
                  {dotIcons[item.type]}
                </div>
                <div style={{ flex: 1 }}>
                  <div className={styles.activityText}>{item.text}</div>
                  <div className={styles.activityMeta}>
                    <span className={styles.activityUser}>{item.user}</span>
                    <span className={styles.activityTime}>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
