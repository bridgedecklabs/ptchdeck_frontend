import { useState } from 'react'
import DataTable, { Column, FilterOption } from '../../components/dashboard/DataTable'
import { appUsers, AppUser } from '../../data/dashboard/users'
import { useRole } from '../../context/RoleContext'
import styles from './Users.module.css'

export default function Users() {
  const { role } = useRole()
  const [showModal, setShowModal] = useState(false)

  const roleClass = (r: string) => ({ Admin: styles.roleAdmin, Manager: styles.roleManager, Analyst: styles.roleAnalyst }[r] ?? '')
  const dotClass = (s: string) => ({ Active: styles.dotActive, Inactive: styles.dotInactive, Pending: styles.dotPending }[s] ?? '')

  const columns: Column<AppUser>[] = [
    {
      key: 'name', label: 'User',
      render: (r) => (
        <div className={styles.userCell}>
          <div className={styles.avatar}>{r.avatar}</div>
          <div>
            <div className={styles.userName}>{r.name}</div>
            <div className={styles.userEmail}>{r.email}</div>
          </div>
        </div>
      )
    },
    { key: 'role', label: 'Role', render: (r) => <span className={`${styles.roleBadge} ${roleClass(r.role)}`}>{r.role}</span> },
    {
      key: 'status', label: 'Status',
      render: (r) => (
        <span className={styles.statusDot}>
          <span className={`${styles.dot} ${dotClass(r.status)}`} />
          {r.status}
        </span>
      )
    },
    { key: 'lastActive', label: 'Last Active' },
    { key: 'joinedAt', label: 'Joined' },
  ]

  const filters: FilterOption[] = [
    { key: 'role', label: 'Role', options: ['All Roles', 'Admin', 'Manager', 'Analyst'] },
    { key: 'status', label: 'Status', options: ['All Statuses', 'Active', 'Inactive', 'Pending'] },
  ]

  if (role === 'Analyst') {
    return (
      <div style={{ padding: 'var(--space-3xl)', textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ margin: '0 auto var(--space-md)', display: 'block', opacity: 0.4 }}>
          <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
          <path d="M20 13V21M20 27h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        You don't have permission to view this page.
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div />
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Invite User
        </button>
      </div>

      <DataTable
        columns={columns}
        data={appUsers}
        filters={filters}
        searchPlaceholder="Search users..."
        searchKeys={['name', 'email']}
        pageSize={10}
      />

      {showModal && (
        <div className={styles.overlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>Invite User</div>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.field}>
                <label className={styles.label}>Full Name</label>
                <input className={styles.input} placeholder="Jane Doe" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email Address</label>
                <input className={styles.input} type="email" placeholder="jane@yourfund.com" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Role</label>
                <select className={styles.select}>
                  <option>Analyst</option>
                  <option>Manager</option>
                  {role === 'Admin' && <option>Admin</option>}
                </select>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnSecondary} onClick={() => setShowModal(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={() => setShowModal(false)}>Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
