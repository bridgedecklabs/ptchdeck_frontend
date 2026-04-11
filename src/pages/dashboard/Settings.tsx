import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useRole } from '../../context/RoleContext'
import styles from './Settings.module.css'

type Tab = 'Profile' | 'Notifications' | 'Security'

const notifications = [
  { id: 'n1', label: 'New pitch deck uploaded', desc: 'Get notified when a new deck is added to the queue', defaultOn: true },
  { id: 'n2', label: 'AI analysis complete', desc: 'Get notified when scoring is complete for a deck', defaultOn: true },
  { id: 'n3', label: 'Deal stage changed', desc: 'Get notified when a deal moves in the pipeline', defaultOn: false },
  { id: 'n4', label: 'New user invited', desc: 'Get notified when a new team member is added', defaultOn: false },
  { id: 'n5', label: 'Weekly digest', desc: 'Receive a weekly summary of pipeline activity', defaultOn: true },
]

export default function Settings() {
  const [tab, setTab] = useState<Tab>('Profile')
  const { user } = useAuth()
  const { role, setRole } = useRole()
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(notifications.map(n => [n.id, n.defaultOn]))
  )

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User'
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className={styles.page}>
      <div className={styles.tabs}>
        {(['Profile', 'Notifications', 'Security'] as Tab[]).map(t => (
          <button key={t} className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === 'Profile' && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Profile Information</div>
            <div className={styles.cardSubtitle}>Update your personal details</div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.avatarRow}>
              <div className={styles.avatar}>{initials}</div>
              <button className={styles.changeAvatarBtn}>Change Photo</button>
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label}>First Name</label>
                <input className={styles.input} defaultValue={displayName.split(' ')[0]} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Last Name</label>
                <input className={styles.input} defaultValue={displayName.split(' ')[1] ?? ''} />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email Address</label>
              <input className={styles.input} type="email" defaultValue={user?.email ?? ''} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Company / Fund Name</label>
              <input className={styles.input} placeholder="e.g. Sequoia Capital" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Bio</label>
              <textarea className={styles.textarea} placeholder="A brief bio about yourself..." />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Mock Role (Dev only)</label>
              <select className={styles.select} value={role} onChange={(e) => setRole(e.target.value as 'Admin' | 'Manager' | 'Analyst')}>
                <option>Admin</option>
                <option>Manager</option>
                <option>Analyst</option>
              </select>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <button className={styles.saveBtn}>Save Changes</button>
          </div>
        </div>
      )}

      {tab === 'Notifications' && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Notification Preferences</div>
            <div className={styles.cardSubtitle}>Choose what you want to be notified about</div>
          </div>
          <div className={styles.cardBody}>
            {notifications.map((n) => (
              <div key={n.id} className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <div className={styles.toggleLabel}>{n.label}</div>
                  <div className={styles.toggleDesc}>{n.desc}</div>
                </div>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={toggles[n.id]}
                    onChange={(e) => setToggles(t => ({ ...t, [n.id]: e.target.checked }))}
                  />
                  <span className={styles.toggleSlider} />
                </label>
              </div>
            ))}
          </div>
          <div className={styles.cardFooter}>
            <button className={styles.saveBtn}>Save Preferences</button>
          </div>
        </div>
      )}

      {tab === 'Security' && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Security Settings</div>
            <div className={styles.cardSubtitle}>Manage your password and authentication</div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.field}>
              <label className={styles.label}>Current Password</label>
              <input className={styles.input} type="password" placeholder="••••••••" />
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label}>New Password</label>
                <input className={styles.input} type="password" placeholder="••••••••" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Confirm Password</label>
                <input className={styles.input} type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className={styles.toggleRow}>
              <div className={styles.toggleInfo}>
                <div className={styles.toggleLabel}>Two-Factor Authentication</div>
                <div className={styles.toggleDesc}>Add an extra layer of security to your account</div>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" />
                <span className={styles.toggleSlider} />
              </label>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <button className={styles.saveBtn}>Update Password</button>
          </div>
        </div>
      )}
    </div>
  )
}
