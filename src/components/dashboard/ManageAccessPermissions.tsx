import { useState } from 'react'
import styles from './ManageAccessPermissions.module.css'

interface TogglePermission {
  id: string
  label: string
  description: string
  enabled: boolean
}

const initialPermissions: TogglePermission[] = [
  { id: 'upload', label: 'Upload & Queue', description: 'Allow analysts to upload and view the processing queue', enabled: true },
  { id: 'pipeline', label: 'Pipeline', description: 'Allow analysts to view the Kanban deal flow board', enabled: true },
  { id: 'portfolio', label: 'Portfolio', description: 'Allow analysts to view portfolio company information', enabled: true },
  { id: 'cohort', label: 'Cohort Builder', description: 'Allow analysts to view and manage cohort applications', enabled: false },
  { id: 'connectors', label: 'Connectors', description: 'Allow analysts to view connected integrations', enabled: false },
]

const alwaysOn = ['Dashboard', 'Scoreboard', 'Company Detail']
const alwaysOff = ['Manage Access', 'Billing', 'Settings']

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={onChange}
      className={`${styles.toggle} ${enabled ? styles.toggleOn : styles.toggleOff}`}
    >
      <span className={styles.toggleThumb} />
    </button>
  )
}

export default function ManageAccessPermissions() {
  const [permissions, setPermissions] = useState<TogglePermission[]>(initialPermissions)
  const [saved, setSaved] = useState(false)

  const toggle = (id: string) => {
    setSaved(false)
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    )
  }

  const handleSave = () => setSaved(true)
  const handleDiscard = () => {
    setPermissions(initialPermissions)
    setSaved(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Analyst Permissions</h2>
          <p className={styles.sectionDesc}>Control which modules Analysts can see in their workspace.</p>
        </div>

        <div className={styles.permissionList}>
          {permissions.map((perm) => (
            <div key={perm.id} className={styles.permissionRow}>
              <div>
                <div className={styles.permLabel}>{perm.label}</div>
                <div className={styles.permDesc}>{perm.description}</div>
              </div>
              <Toggle enabled={perm.enabled} onChange={() => toggle(perm.id)} />
            </div>
          ))}
        </div>

        <div className={styles.dividerSection}>
          <div className={styles.dividerLabel}>ALWAYS VISIBLE TO ANALYSTS</div>
          {alwaysOn.map((item) => (
            <div key={item} className={styles.staticRow}>
              <span className={styles.staticLabel}>{item}</span>
              <span className={styles.alwaysOn}>Always On</span>
            </div>
          ))}
        </div>

        <div className={styles.dividerSection}>
          <div className={styles.dividerLabel}>ALWAYS HIDDEN FROM ANALYSTS</div>
          {alwaysOff.map((item) => (
            <div key={item} className={styles.staticRow}>
              <span className={styles.staticLabel}>{item}</span>
              <span className={styles.alwaysOff}>Always Off</span>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <button className={styles.discardBtn} onClick={handleDiscard}>Discard Changes</button>
          <button className={`${styles.saveBtn} ${saved ? styles.saveBtnSaved : ''}`} onClick={handleSave}>
            {saved ? 'Saved!' : 'Save Permissions'}
          </button>
        </div>
      </div>
    </div>
  )
}
