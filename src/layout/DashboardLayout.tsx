import { useState } from 'react'
import Sidebar, { type TabId } from '../components/dashboard/Sidebar'
import Header from '../components/dashboard/Header'
import DashboardHome from '../pages/dashboard/DashboardHome'
import UploadQueue from '../pages/dashboard/UploadQueue'
import Scoreboard from '../pages/dashboard/Scoreboard'
import Pipeline from '../pages/dashboard/Pipeline'
import CohortBuilder from '../pages/dashboard/CohortBuilder'
import Connectors from '../pages/dashboard/Connectors'
import ManageAccess from '../pages/dashboard/ManageAccess'
import Billing from '../pages/dashboard/Billing'
import styles from './DashboardLayout.module.css'

function renderContent(activeTab: TabId) {
  switch (activeTab) {
    case 'dashboard':
      return <DashboardHome />
    case 'upload':
      return <UploadQueue />
    case 'scoreboard':
      return <Scoreboard />
    case 'pipeline':
      return <Pipeline />
    case 'cohort':
      return <CohortBuilder />
    case 'connectors':
      return <Connectors />
    case 'access':
      return <ManageAccess />
    case 'billing':
      return <Billing />
    default:
      return (
        <div className={styles.placeholder}>
          <p>This section is coming soon.</p>
        </div>
      )
  }
}

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard')

  return (
    <div className={styles.shell}>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={styles.main}>
        <Header activeTab={activeTab} />
        <div className={styles.content}>{renderContent(activeTab)}</div>
      </div>
    </div>
  )
}
