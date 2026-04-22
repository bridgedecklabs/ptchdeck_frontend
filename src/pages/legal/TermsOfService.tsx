import { TERMS_OF_SERVICE } from '../../data/legal'
import SEO from '../../components/seo/SEO'
import styles from './LegalPage.module.css'

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service — PtchDeck"
        description="Read PtchDeck's Terms of Service. Understand your rights and responsibilities when using the platform."
        url="https://ptchdeck.com/terms-of-service"
      />

      <div className={styles.page}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.header}>
            <h1 className={styles.title}>{TERMS_OF_SERVICE.title}</h1>
            <p className={styles.meta}>Last updated: {TERMS_OF_SERVICE.lastUpdated}</p>
          </div>

          {TERMS_OF_SERVICE.sections.map((section, i) => (
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
