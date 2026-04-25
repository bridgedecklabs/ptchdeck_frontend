import { useState } from 'react'
import {
  LayoutDashboard, FileUp, BarChart2, Kanban, Users, Share2,
  Lock, CreditCard, Settings, ChevronLeft, ChevronRight, LogOut,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import styles from './Sidebar.module.css'

export type TabId =
  | 'dashboard'
  | 'upload'
  | 'scoreboard'
  | 'pipeline'
  | 'cohort'
  | 'connectors'
  | 'access'
  | 'billing'
  | 'settings'

interface NavItem {
  id: TabId
  label: string
  icon: React.ReactNode
}

const mainNav: NavItem[] = [
  { id: 'dashboard',  label: 'Dashboard',     icon: <LayoutDashboard size={18} /> },
  { id: 'upload',     label: 'Upload & Queue', icon: <FileUp size={18} /> },
  { id: 'scoreboard', label: 'Scoreboard',     icon: <BarChart2 size={18} /> },
  { id: 'pipeline',   label: 'Pipeline',       icon: <Kanban size={18} /> },
  { id: 'cohort',     label: 'Cohort Builder', icon: <Users size={18} /> },
]

const bottomNav: NavItem[] = [
  { id: 'connectors', label: 'Connectors',   icon: <Share2 size={18} /> },
  { id: 'access',     label: 'Manage Access', icon: <Lock size={18} /> },
  { id: 'billing',    label: 'Billing',       icon: <CreditCard size={18} /> },
  { id: 'settings',   label: 'Settings',      icon: <Settings size={18} /> },
]

interface SidebarProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuth()

  const initials = user?.displayName
    ? user.displayName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? 'U'

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User'
  const subtitle = 'Vertex Ventures'

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* Logo */}
      <div className={styles.logoRow}>
        <div className={styles.logoIcon}>
          <img src="/favicon.svg" alt="PtchDeck logo" width="28" height="28" />
        </div>
        {!collapsed && (
          <div className={styles.logoText}>
            <span className={styles.logoName}>PtchDeck</span>
            <span className={styles.logoSub}>VC INTELLIGENCE</span>
          </div>
        )}
        <button
          className={styles.collapseBtn}
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Main nav */}
      <nav className={styles.nav}>
        {mainNav.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
            onClick={() => onTabChange(item.id)}
            title={collapsed ? item.label : undefined}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Bottom nav */}
      <nav className={styles.navBottom}>
        {bottomNav.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
            onClick={() => onTabChange(item.id)}
            title={collapsed ? item.label : undefined}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* User profile */}
      <div className={styles.userBlock}>
        <div className={styles.avatar}>{initials}</div>
        {!collapsed && (
          <div className={styles.userInfo}>
            <span className={styles.userName}>{displayName}</span>
            <span className={styles.userSub}>{subtitle}</span>
          </div>
        )}
        {!collapsed && (
          <button className={styles.logoutBtn} aria-label="More options">
            <LogOut size={14} />
          </button>
        )}
      </div>
    </aside>
  )
}
