import { useState } from 'react'
import { FAQ } from '../../data/landingPage'
import styles from './FAQSection.module.css'

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.heading}>Frequently Asked Questions</h2>
          <p className={styles.subheading}>Everything you need to know about PtchDeck.</p>
        </div>

        <div className={styles.list}>
          {FAQ.map((item, i) => (
            <div key={i} className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}>
              <button
                className={styles.question}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className={`${styles.chevron} ${open === i ? styles.chevronUp : ''}`}>
                  ›
                </span>
              </button>
              {open === i && (
                <div className={styles.answer}>
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
