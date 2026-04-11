import { useNavigate, useParams } from 'react-router-dom'
import { startupProfiles } from '../../data/dashboard/market'
import styles from './StartupDetail.module.css'

export default function StartupDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const startup = startupProfiles.find(s => s.id === id) ?? startupProfiles[0]

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Back to Market Trends
      </button>

      <div className={styles.hero}>
        <div className={styles.heroTop}>
          <div className={styles.avatar}>{startup.name.slice(0, 2)}</div>
          <div className={styles.heroInfo}>
            <div className={styles.heroName}>{startup.name}</div>
            <div className={styles.heroTagline}>{startup.tagline}</div>
            <div className={styles.heroMeta}>
              <span className={styles.metaItem}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1C3.79 1 2 2.79 2 5c0 3 4 7 4 7s4-4 4-7c0-2.21-1.79-4-4-4zm0 5.5C5.17 6.5 4.5 5.83 4.5 5S5.17 3.5 6 3.5 7.5 4.17 7.5 5 6.83 6.5 6 6.5z" fill="currentColor"/></svg>
                {startup.location}
              </span>
              <span className={styles.metaItem}>Founded {startup.founded}</span>
              <span className={styles.metaItem}>{startup.employees} employees</span>
              <span className={styles.metaItem}>{startup.stage}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-success)' }}>{startup.totalFunding}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>Total Funding</div>
          </div>
        </div>

        <p className={styles.description}>{startup.description}</p>

        <div className={styles.tags} style={{ marginTop: 'var(--space-md)' }}>
          {startup.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
        </div>
      </div>

      <div className={styles.metricsGrid}>
        {startup.metrics.map((m) => (
          <div key={m.label} className={styles.metricCard}>
            <div className={styles.metricLabel}>{m.label}</div>
            <div className={styles.metricValue}>{m.value}</div>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Funding History</div>
        <table className={styles.roundTable}>
          <thead>
            <tr>
              <th>Round</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Lead Investors</th>
            </tr>
          </thead>
          <tbody>
            {startup.fundingHistory.map((r, i) => (
              <tr key={i}>
                <td>{r.round}</td>
                <td className={styles.amount}>{r.amount}</td>
                <td>{r.date}</td>
                <td>{r.investors.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Founders</div>
        <div className={styles.founderList}>
          {startup.founders.map((f) => (
            <div key={f.name} className={styles.founderRow}>
              <div className={styles.founderAvatar}>{f.name.split(' ').map(n => n[0]).join('')}</div>
              <div>
                <div className={styles.founderName}>{f.name}</div>
                <div className={styles.founderTitle}>{f.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
