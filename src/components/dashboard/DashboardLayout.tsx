import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { RoleProvider } from '../../context/RoleContext'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import styles from './DashboardLayout.module.css'

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <RoleProvider>
      <div className={styles.shell}>
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
        <div className={styles.main}>
          <TopBar />
          <main className={styles.content}>
            <div className={styles.contentInner}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </RoleProvider>
  )
}
