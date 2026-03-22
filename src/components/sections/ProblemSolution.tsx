import { PROBLEM } from '../../data/landingPage'
import styles from './ProblemSolution.module.css'

export default function ProblemSolution() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <h2 className={styles.heading}>{PROBLEM.heading}</h2>
        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.left}`}>
            <h3 className={styles.colHeading}>{PROBLEM.left.heading}</h3>
            <ul className={styles.list}>
              {PROBLEM.left.items.map((item) => (
                <li key={item} className={styles.item}>
                  <span className={`${styles.icon} ${styles.iconBad}`}>✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.divider} />

          <div className={`${styles.column} ${styles.right}`}>
            <h3 className={styles.colHeading}>{PROBLEM.right.heading}</h3>
            <ul className={styles.list}>
              {PROBLEM.right.items.map((item) => (
                <li key={item} className={styles.item}>
                  <span className={`${styles.icon} ${styles.iconGood}`}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
