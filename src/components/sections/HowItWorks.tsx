import { HOW_IT_WORKS } from '../../data/landingPage'
import styles from './HowItWorks.module.css'

interface Props {
  id?: string
}

export default function HowItWorks({ id }: Props) {
  return (
    <section id={id} className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.heading}>{HOW_IT_WORKS.heading}</h2>
          <p className={styles.subheading}>{HOW_IT_WORKS.subheading}</p>
        </div>

        <div className={styles.steps}>
          {HOW_IT_WORKS.steps.map((step, i) => (
            <div key={step.number} className={styles.stepGroup}>
              <div className={styles.card}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
              {i < HOW_IT_WORKS.steps.length - 1 && (
                <div className={styles.arrow} aria-hidden="true">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
