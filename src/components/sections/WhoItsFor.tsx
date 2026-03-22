import { WHO_ITS_FOR } from '../../data/landingPage'
import styles from './WhoItsFor.module.css'

export default function WhoItsFor() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.heading}>{WHO_ITS_FOR.heading}</h2>
        <p className={styles.body}>{WHO_ITS_FOR.body}</p>
      </div>
    </section>
  )
}
