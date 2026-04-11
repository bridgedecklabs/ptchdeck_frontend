import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  CloudUpload,
  BarChart2,
  GitBranch,
  Briefcase,
  TrendingUp,
  Plug,
  Users,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react'
import { useRole } from '../../context/RoleContext'
import { DASHBOARD_ROUTES } from '../../config/routes'
import styles from './Sidebar.module.css'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

interface NavItem {
  to: string
  label: string
  icon: React.ReactNode
  roles?: string[]
}

const navItems: NavItem[] = [
  { to: DASHBOARD_ROUTES.OVERVIEW,   label: 'Dashboard',     icon: <LayoutDashboard size={20} /> },
  { to: DASHBOARD_ROUTES.UPLOAD,     label: 'Upload & Queue', icon: <CloudUpload size={20} /> },
  { to: DASHBOARD_ROUTES.SCOREBOARD, label: 'Scoreboard',    icon: <BarChart2 size={20} /> },
  { to: DASHBOARD_ROUTES.PIPELINE,   label: 'Pipeline',      icon: <GitBranch size={20} /> },
  { to: DASHBOARD_ROUTES.PORTFOLIO,  label: 'Portfolio',     icon: <Briefcase size={20} /> },
  { to: DASHBOARD_ROUTES.MARKET,     label: 'Market Trends', icon: <TrendingUp size={20} /> },
]

const bottomItems: NavItem[] = [
  { to: DASHBOARD_ROUTES.CONNECTORS, label: 'Connectors', icon: <Plug size={20} />,      roles: ['Admin'] },
  { to: DASHBOARD_ROUTES.USERS,      label: 'Users',      icon: <Users size={20} />,     roles: ['Admin', 'Manager'] },
  { to: DASHBOARD_ROUTES.BILLING,    label: 'Billing',    icon: <CreditCard size={20} /> },
  { to: DASHBOARD_ROUTES.SETTINGS,   label: 'Settings',   icon: <Settings size={20} /> },
]

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { role } = useRole()

  const renderItem = (item: NavItem) => {
    if (item.roles && !item.roles.includes(role)) return null
    return (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.to === DASHBOARD_ROUTES.OVERVIEW}
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
        title={collapsed ? item.label : undefined}
      >
        <span className={styles.navIcon}>{item.icon}</span>
        <span className={styles.navLabel}>{item.label}</span>
      </NavLink>
    )
  }

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ''}`}>

      {/* Logo row — no collapse button here */}
      <NavLink to={DASHBOARD_ROUTES.OVERVIEW} className={styles.logoRow}>
        <div className={styles.logoIcon}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 4H15M3 8H11M3 12H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className={styles.logoTextGroup}>
          <span className={styles.logoText}>PtchDeck</span>
          <span className={styles.logoSub}>VC INTELLIGENCE</span>
        </div>
      </NavLink>

      {/* Main nav + NEW ANALYSIS right below */}
      <nav className={styles.nav}>
        <div className={styles.navSection}>
          {navItems.map(renderItem)}
        </div>
        <NavLink to={DASHBOARD_ROUTES.UPLOAD} className={styles.newAnalysisBtn} title={collapsed ? 'New Analysis' : undefined}>
          <Plus size={20} strokeWidth={2} className={styles.newAnalysisIcon} />
          <span className={styles.newAnalysisLabel}>NEW ANALYSIS</span>
        </NavLink>
      </nav>

      {/* Bottom section — utility items + collapse at very bottom */}
      <div className={styles.bottom}>
        <div className={styles.navSection}>
          {bottomItems.map(renderItem)}
        </div>
        <div className={styles.divider} />
        <button
          className={styles.collapseBtn}
          onClick={onToggle}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          <span className={styles.collapseBtnLabel}>Collapse</span>
        </button>
      </div>
    </aside>
  )
}
