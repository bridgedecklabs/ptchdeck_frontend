import { useState } from 'react'
import { Lock, UserPlus, RotateCcw, X, ChevronDown } from 'lucide-react'
import styles from './ManageAccessTeam.module.css'

interface Member {
  id: string
  name: string
  email: string
  role: 'OWNER' | 'ADMIN' | 'ANALYST'
  status: 'active' | 'pending'
  joined: string | null
  avatarInitials: string
}

const mockMembers: Member[] = [
  { id: '1', name: 'Preet S.', email: 'preet@ptchdeck.vc', role: 'OWNER', status: 'active', joined: 'Oct 12, 2023', avatarInitials: 'PS' },
  { id: '2', name: 'Rahul K.', email: 'rahul.k@ptchdeck.vc', role: 'ADMIN', status: 'active', joined: 'Nov 04, 2023', avatarInitials: 'RK' },
  { id: '3', name: 'Meera S.', email: 'meera@ptchdeck.vc', role: 'ANALYST', status: 'active', joined: 'Jan 18, 2024', avatarInitials: 'MS' },
  { id: '4', name: 'David K.', email: 'david.k@ptchdeck.vc', role: 'ANALYST', status: 'active', joined: 'Feb 22, 2024', avatarInitials: 'DK' },
  { id: '5', name: 'Sarah (Pending)', email: 'sarah@gmail.com', role: 'ADMIN', status: 'pending', joined: null, avatarInitials: '?' },
]

export default function ManageAccessTeam() {
  const [members, setMembers] = useState<Member[]>(mockMembers)

  const handleCancel = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div className={styles.tableTitle}>
            Team Members
            <span className={styles.memberCount}>{members.length} members</span>
          </div>
          <button className={styles.inviteBtn}>
            <UserPlus size={15} />
            Invite Member
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th>JOINED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>
                  <div className={styles.nameCell}>
                    <div className={`${styles.avatar} ${member.status === 'pending' ? styles.avatarPending : ''}`}>
                      {member.avatarInitials}
                    </div>
                    {member.name}
                  </div>
                </td>
                <td className={styles.emailCell}>{member.email}</td>
                <td>
                  {member.role === 'OWNER' ? (
                    <span className={styles.ownerBadge}>OWNER</span>
                  ) : (
                    <button className={styles.roleDropdown}>
                      {member.role} <ChevronDown size={12} />
                    </button>
                  )}
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${member.status === 'active' ? styles.statusActive : styles.statusPending}`}>
                    {member.status === 'active' ? 'Active' : 'Pending'}
                  </span>
                </td>
                <td className={styles.joinedCell}>{member.joined ?? '—'}</td>
                <td>
                  {member.role === 'OWNER' ? (
                    <Lock size={15} className={styles.lockIcon} />
                  ) : member.status === 'pending' ? (
                    <div className={styles.pendingActions}>
                      <button className={styles.resendBtn}>
                        <RotateCcw size={13} /> RESEND
                      </button>
                      <button className={styles.cancelBtn} onClick={() => handleCancel(member.id)}>
                        <X size={13} /> CANCEL
                      </button>
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
