import { FEATURES } from '../../data/landingPage'
import styles from './FeaturesGrid.module.css'

export default function FeaturesGrid() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.heading}>{FEATURES.heading}</h2>
          <p className={styles.subheading}>{FEATURES.subheading}</p>
        </div>

        <div className={styles.grid}>
          {FEATURES.cards.map((card) => (
            <div key={card.title} className={styles.card}>
              <span className={styles.icon}>{card.icon}</span>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardBody}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
