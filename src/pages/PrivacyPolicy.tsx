import { PRIVACY_POLICY } from '../data/legal'
import SEO from '../components/seo/SEO'
import styles from './LegalPage.module.css'

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy — PtchDeck"
        description="Read PtchDeck's Privacy Policy. Learn how we collect, use, and protect your data."
        url="https://ptchdeck.com/privacy-policy"
      />

      <div className={styles.page}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.header}>
            <h1 className={styles.title}>{PRIVACY_POLICY.title}</h1>
            <p className={styles.meta}>Last updated: {PRIVACY_POLICY.lastUpdated}</p>
          </div>

          {PRIVACY_POLICY.sections.map((section, i) => (
            <div key={i} className={styles.section}>
              {section.heading ? (
                <h2 className={styles.sectionHeading}>{section.heading}</h2>
              ) : null}

              {section.isList ? (
                <ul className={styles.list}>
                  {section.content.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              ) : (
                section.content.map((para, j) => (
                  <p key={j} className={styles.paragraph}>{para}</p>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
