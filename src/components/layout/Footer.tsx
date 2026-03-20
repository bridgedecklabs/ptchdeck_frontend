import { Link } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import { COMPANY } from '../../config/company'
import { useNotifyForm } from '../../hooks/useNotifyForm'
import styles from './Footer.module.css'

export default function Footer() {
  const { email, setEmail, status, handleSubmit } = useNotifyForm('footer')

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        <div className={styles.col}>
          <div className={styles.brand}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect width="32" height="32" rx="7" fill="#6366f1"/>
              <rect x="9" y="8" width="10" height="2.5" rx="1.2" fill="white"/>
              <rect x="9" y="12.5" width="14" height="2.5" rx="1.2" fill="white"/>
              <rect x="9" y="17" width="12" height="2.5" rx="1.2" fill="white"/>
              <rect x="9" y="21.5" width="8" height="2.5" rx="1.2" fill="white"/>
            </svg>
            <span className={styles.brandName}>{COMPANY.name}</span>
          </div>
          <p className={styles.brandDesc}>The smarter way for VCs to screen deal flow.</p>
          <div className={styles.contactList}>
            <a href={`mailto:${COMPANY.email}`} className={styles.contactLink}>{COMPANY.email}</a>
            <a href={`tel:${COMPANY.phone}`} className={styles.contactLink}>{COMPANY.phone}</a>
          </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Navigation</h4>
          <nav className={styles.footerNav}>
            <Link to={ROUTES.HOME}>Home</Link>
            <Link to={ROUTES.EXPLAINER}>Explainer</Link>
            <Link to={ROUTES.FEATURES}>Features</Link>
            <Link to={ROUTES.CONTACT}>Contact</Link>
          </nav>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Stay Updated</h4>
          <p className={styles.notifyDesc}>Get early access when {COMPANY.name} launches.</p>
          {status === 'success' ? (
            <p className={styles.notifySuccess}>You're on the list!</p>
          ) : (
            <form onSubmit={handleSubmit} className={styles.notifyForm}>
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.notifyInput}
              />
              <button type="submit" disabled={status === 'loading'} className={styles.notifyBtn}>
                {status === 'loading' ? '...' : 'Notify Me'}
              </button>
            </form>
          )}
        </div>

      </div>

      <div className={styles.bottom}>
        <p>{COMPANY.copyright}</p>
      </div>
    </footer>
  )
}
