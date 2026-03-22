import { STATS } from '../../data/landingPage'
import styles from './StatsBar.module.css'

export default function StatsBar() {
  return (
    <section className={styles.statsBar}>
      <div className={`container ${styles.inner}`}>
        {STATS.map((stat, i) => (
          <div key={stat.number} className={styles.statGroup}>
            <div className={styles.stat}>
              <span className={styles.number}>{stat.number}</span>
              <span className={styles.label}>{stat.label}</span>
            </div>
            {i < STATS.length - 1 && <div className={styles.divider} />}
          </div>
        ))}
      </div>
    </section>
  )
}
