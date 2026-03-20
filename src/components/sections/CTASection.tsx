import { useNotifyForm } from '../../hooks/useNotifyForm'
import { COMPANY } from '../../config/company'
import styles from './CTASection.module.css'

export default function CTASection() {
  const { email, setEmail, status, handleSubmit } = useNotifyForm('cta')

  return (
    <section className={`section ${styles.cta}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <h4 className={styles.title}>Stay in the loop</h4>
          <p className={styles.sub}>Get early access when {COMPANY.name} launches. No spam, ever.</p>
        </div>
        <div className={styles.formWrap}>
          {status === 'success' ? (
            <p className={styles.success}>You're on the list — we'll be in touch!</p>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.input}
              />
              <button type="submit" disabled={status === 'loading'} className={styles.btn}>
                {status === 'loading' ? 'Saving...' : 'Notify Me'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
