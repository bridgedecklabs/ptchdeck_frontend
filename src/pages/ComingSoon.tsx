import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import { COMPANY } from '../config/company'
import styles from './ComingSoon.module.css'

export default function ComingSoon() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    navigate(`${ROUTES.AUTH}?email=${encodeURIComponent(email)}&mode=signup`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logoMark}>
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="7" fill="#6366f1"/>
            <rect x="9" y="8" width="10" height="2.5" rx="1.2" fill="white"/>
            <rect x="9" y="12.5" width="14" height="2.5" rx="1.2" fill="white"/>
            <rect x="9" y="17" width="12" height="2.5" rx="1.2" fill="white"/>
            <rect x="9" y="21.5" width="8" height="2.5" rx="1.2" fill="white"/>
          </svg>
          <span className={styles.logoText}>{COMPANY.name}</span>
        </div>

        <h1 className={styles.title}>We're Launching Soon</h1>
        <p className={styles.desc}>
          {COMPANY.name} is building the smarter way for VCs to screen deal flow
          and for founders to get discovered.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.btn}>
            Get Early Access
          </button>
        </form>

        <p className={styles.privacy}>No spam. Unsubscribe anytime.</p>

        <Link to={ROUTES.HOME} className={styles.backLink}>← Back to Home</Link>
      </div>
    </div>
  )
}
