import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useAuth } from '../../context/AuthContext'
import { useRole } from '../../context/RoleContext'
import { DASHBOARD_ROUTES } from '../../config/routes'
import styles from './TopBar.module.css'

const PAGE_TITLES: Record<string, string> = {
  [DASHBOARD_ROUTES.OVERVIEW]: 'Dashboard',
  [DASHBOARD_ROUTES.UPLOAD]: 'Upload & Queue',
  [DASHBOARD_ROUTES.SCOREBOARD]: 'Scoreboard',
  [DASHBOARD_ROUTES.PIPELINE]: 'Pipeline',
  [DASHBOARD_ROUTES.PORTFOLIO]: 'Portfolio',
  [DASHBOARD_ROUTES.MARKET]: 'Market Trends',
  [DASHBOARD_ROUTES.USERS]: 'Users',
  [DASHBOARD_ROUTES.CONNECTORS]: 'Connectors',
  [DASHBOARD_ROUTES.SETTINGS]: 'Settings',
  [DASHBOARD_ROUTES.BILLING]: 'Billing',
}

export default function TopBar() {
  const { user } = useAuth()
  const { role } = useRole()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const title = Object.entries(PAGE_TITLES)
    .sort(([a], [b]) => b.length - a.length)
    .find(([path]) => location.pathname === path || location.pathname.startsWith(path + '/'))?.[1] ?? 'Dashboard'

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User'
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()

  const roleClass = { Admin: styles.roleAdmin, Manager: styles.roleManager, Analyst: styles.roleAnalyst }[role]

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSignOut = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <header className={styles.topbar}>
      <h1 className={styles.pageTitle}>{title}</h1>

      <div className={styles.searchWrap}>
        <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input className={styles.searchInput} placeholder="Search decks..." />
      </div>

      <div className={styles.actions}>
        <button className={styles.iconBtn} title="Notifications">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5C5.79 1.5 4 3.29 4 5.5V9L2.5 11H13.5L12 9V5.5C12 3.29 10.21 1.5 8 1.5Z" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M6.5 11C6.5 11.83 7.17 12.5 8 12.5C8.83 12.5 9.5 11.83 9.5 11" stroke="currentColor" strokeWidth="1.4"/>
          </svg>
          <span className={styles.badge}>3</span>
        </button>

        <div className={styles.divider} />

        <div ref={ref} style={{ position: 'relative' }}>
          <button className={styles.userBtn} onClick={() => setOpen(v => !v)}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{displayName.split(' ')[0]}</span>
              <span className={`${styles.rolePill} ${roleClass}`}>{role}</span>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: 'var(--color-text-tertiary)' }}>
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {open && (
            <div className={styles.dropdown}>
              <button className={styles.dropdownItem} onClick={() => { navigate(DASHBOARD_ROUTES.SETTINGS); setOpen(false) }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2 13C2 10.24 4.24 8 7 8C9.76 8 12 10.24 12 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                Profile
              </button>
              <button className={styles.dropdownItem} onClick={() => { navigate(DASHBOARD_ROUTES.BILLING); setOpen(false) }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.3"/><path d="M1 7H13" stroke="currentColor" strokeWidth="1.3"/></svg>
                Billing
              </button>
              <div className={styles.dropdownDivider} />
              <button className={`${styles.dropdownItem} ${styles.dropdownDanger}`} onClick={handleSignOut}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2H3C2.45 2 2 2.45 2 3V11C2 11.55 2.45 12 3 12H5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M9 10L12 7L9 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 7H12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
