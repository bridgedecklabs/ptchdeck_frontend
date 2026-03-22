import { useNotifyForm } from '../../hooks/useNotifyForm'
import { CTA_BOTTOM } from '../../data/landingPage'
import styles from './CTASection.module.css'

export default function CTASection() {
  const { email, setEmail, status, handleSubmit } = useNotifyForm('cta')

  return (
    <section className={styles.cta}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>{CTA_BOTTOM.heading}</h2>
        <p className={styles.sub}>{CTA_BOTTOM.subheading}</p>

        <div className={styles.formWrap}>
          {status === 'success' ? (
            <p className={styles.success}>{CTA_BOTTOM.success}</p>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="email"
                required
                placeholder={CTA_BOTTOM.placeholder}
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.input}
              />
              <button type="submit" disabled={status === 'loading'} className={styles.btn}>
                {status === 'loading' ? 'Saving...' : CTA_BOTTOM.button}
              </button>
            </form>
          )}
          <p className={styles.disclaimer}>{CTA_BOTTOM.disclaimer}</p>
        </div>
      </div>
    </section>
  )
}
