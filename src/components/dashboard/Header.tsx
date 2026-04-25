import { Bell, ChevronDown } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { useAuth } from '../../context/AuthContext'
import { ROUTES } from '../../config/routes'
import type { TabId } from './Sidebar'
import styles from './Header.module.css'

const TAB_LABELS: Record<TabId, string> = {
  dashboard: 'Dashboard',
  upload: 'Upload & Queue',
  scoreboard: 'Scoreboard',
  pipeline: 'Pipeline',
  cohort: 'Cohort Builder',
  connectors: 'Connectors',
  access: 'Manage Access',
  billing: 'Billing',
  settings: 'Settings',
}

interface HeaderProps {
  activeTab: TabId
}

export default function Header({ activeTab }: HeaderProps) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User'
  const initials = user?.displayName
    ? user.displayName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : displayName[0]?.toUpperCase() ?? 'U'

  const handleSignOut = async () => {
    await signOut(auth)
    navigate(ROUTES.HOME, { replace: true })
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{TAB_LABELS[activeTab]}</h1>

      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={18} />
        </button>

        <button className={styles.userBtn} onClick={handleSignOut} title="Click to sign out">
          <div className={styles.avatar}>{initials}</div>
          <span className={styles.userName}>{displayName}</span>
          <ChevronDown size={14} />
        </button>
      </div>
    </header>
  )
}
