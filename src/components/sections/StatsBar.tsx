import styles from './StatsBar.module.css'
import Badge from '../ui/Badge'

export default function StatsBar() {
  return (
    <section className={styles.statsBar}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.stat}>
          <span className={styles.number}>150+</span>
          <span className={styles.label}>Decks Analyzed</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.number}>15</span>
          <span className={styles.label}>Trusted by VCs</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <Badge>Coming Soon</Badge>
        </div>
      </div>
    </section>
  )
}
