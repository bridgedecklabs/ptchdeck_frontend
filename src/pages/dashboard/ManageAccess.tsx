import { useState } from 'react'
import ManageAccessTeam from '../../components/dashboard/ManageAccessTeam'
import ManageAccessPermissions from '../../components/dashboard/ManageAccessPermissions'
import styles from './ManageAccess.module.css'

type Tab = 'team' | 'permissions'

export default function ManageAccess() {
  const [activeTab, setActiveTab] = useState<Tab>('team')

  return (
    <div className={styles.page}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'team' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('team')}
        >
          Team
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'permissions' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('permissions')}
        >
          Permissions
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'team' ? <ManageAccessTeam /> : <ManageAccessPermissions />}
      </div>
    </div>
  )
}
