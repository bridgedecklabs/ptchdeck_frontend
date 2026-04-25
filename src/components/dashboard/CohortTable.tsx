import { useState } from 'react'
import CohortStatusBadge from './CohortStatusBadge'
import CohortActions from './CohortActions'
import type { CohortEntry } from '../../pages/dashboard/CohortBuilder'
import styles from './CohortTable.module.css'

const AVATAR_PALETTE = [
  '#6366f1', '#0ea5e9', '#f97316', '#16a34a',
  '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b',
]

function avatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length]
}

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

interface CohortTableProps {
  data: CohortEntry[]
  search: string
}

const PAGE_SIZE = 8

export default function CohortTable({ data, search }: CohortTableProps) {
  const [page, setPage] = useState(1)

  const filtered = search
    ? data.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase()) ||
          c.createdBy.toLowerCase().includes(search.toLowerCase()),
      )
    : data

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage   = Math.min(page, totalPages)
  const start      = (safePage - 1) * PAGE_SIZE
  const pageRows   = filtered.slice(start, start + PAGE_SIZE)

  // Reset to page 1 when search changes
  const activeCount = data.filter((c) => c.status === 'active').length

  return (
    <div className={styles.card}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Cohort Name</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Applications</th>
              <th className={styles.th}>Deadline</th>
              <th className={styles.th}>Created By</th>
              <th className={styles.th}>Created On</th>
              <th className={`${styles.th} ${styles.thRight}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.emptyCell}>
                  No cohorts match your search.
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr key={row.id} className={styles.tr}>
                  {/* Cohort Name */}
                  <td className={styles.td}>
                    <div className={styles.cohortName}>{row.name}</div>
                    <div className={styles.cohortDesc}>{row.description}</div>
                  </td>

                  {/* Status */}
                  <td className={styles.td}>
                    <CohortStatusBadge status={row.status} />
                  </td>

                  {/* Applications */}
                  <td className={styles.td}>
                    <div className={styles.appCount}>{row.applications}</div>
                    <div className={styles.appLabel}>SUBMITTED</div>
                  </td>

                  {/* Deadline */}
                  <td className={styles.td}>
                    <span className={`${styles.date} ${isOverdue(row.deadline, row.status) ? styles.dateOverdue : ''}`}>
                      {row.deadline}
                    </span>
                  </td>

                  {/* Created By */}
                  <td className={styles.td}>
                    <div className={styles.creatorCell}>
                      <div
                        className={styles.avatar}
                        style={{ background: avatarColor(row.createdBy) }}
                        aria-hidden="true"
                      >
                        {initials(row.createdBy)}
                      </div>
                      <span className={styles.creatorName}>{row.createdBy}</span>
                    </div>
                  </td>

                  {/* Created On */}
                  <td className={styles.td}>
                    <span className={styles.date}>{row.createdOn}</span>
                  </td>

                  {/* Actions */}
                  <td className={`${styles.td} ${styles.tdRight}`}>
                    <CohortActions
                      onView={()   => console.log('View',   row.name)}
                      onEdit={()   => console.log('Edit',   row.name)}
                      onLock={()   => console.log('Lock',   row.name)}
                      onDelete={() => console.log('Delete', row.name)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.footerText}>
          Showing {filtered.length} of {activeCount} active cohort{activeCount !== 1 ? 's' : ''}
        </span>
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
          >
            Previous
          </button>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

/** Marks deadline as overdue only when cohort is still active */
function isOverdue(deadline: string, status: string): boolean {
  if (status !== 'active') return false
  const [day, mon, year] = deadline.split(' ')
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  }
  const date = new Date(Number(year), months[mon] ?? 0, Number(day))
  return date < new Date()
}
