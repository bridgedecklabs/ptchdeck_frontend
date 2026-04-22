import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { useAuth } from '../../context/AuthContext'
import { ROUTES } from '../../config/routes'
import { COMPANY } from '../../config/company'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut(auth)
    navigate(ROUTES.HOME, { replace: true })
  }

  const firstName = user?.displayName?.split(' ')[0] || 'there'

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="7" fill="#6366f1"/>
            <rect x="9" y="8" width="10" height="2.5" rx="1.2" fill="white"/>
            <rect x="9" y="12.5" width="14" height="2.5" rx="1.2" fill="white"/>
            <rect x="9" y="17" width="12" height="2.5" rx="1.2" fill="white"/>
            <rect x="9" y="21.5" width="8" height="2.5" rx="1.2" fill="white"/>
          </svg>
          <span className={styles.logoText}>{COMPANY.name}</span>
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userEmail}>{user?.email}</span>
          <button onClick={handleSignOut} className={styles.signOutBtn}>
            Sign out
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <p className={styles.greeting}>Hey {firstName} 👋</p>
        <h1 className={styles.title}>Work in progress</h1>
        <p className={styles.subtitle}>
          We're building something great. Check back soon.
        </p>
      </main>
    </div>
  )
}
