import { useState } from 'react'
import { Download, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './BillingInvoices.module.css'

interface Invoice {
  id: string
  number: string
  date: string
  amount: string
  status: 'paid' | 'failed'
}

const invoices: Invoice[] = [
  { id: '1', number: 'INV-0042', date: '1 Apr 2025', amount: '$149.00', status: 'paid' },
  { id: '2', number: 'INV-0041', date: '1 Mar 2025', amount: '$196.00', status: 'paid' },
  { id: '3', number: 'INV-0040', date: '1 Feb 2025', amount: '$149.00', status: 'failed' },
  { id: '4', number: 'INV-0039', date: '1 Jan 2025', amount: '$149.00', status: 'paid' },
]

type Filter = 'all' | 'paid' | 'failed'

export default function BillingInvoices() {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = filter === 'all' ? invoices : invoices.filter((i) => i.status === filter)

  return (
    <div className={styles.page}>
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Invoice History</h2>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Filter by:</span>
            <select className={styles.filterSelect} value={filter} onChange={(e) => setFilter(e.target.value as Filter)}>
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>INVOICE #</th>
              <th>DATE</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv) => (
              <tr key={inv.id}>
                <td className={styles.invoiceNum}>{inv.number}</td>
                <td className={styles.dateCell}>{inv.date}</td>
                <td className={styles.amountCell}>{inv.amount}</td>
                <td>
                  <span className={`${styles.statusBadge} ${inv.status === 'paid' ? styles.paid : styles.failed}`}>
                    {inv.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  {inv.status === 'paid' ? (
                    <button className={styles.downloadBtn}>
                      <Download size={13} /> Download
                    </button>
                  ) : (
                    <button className={styles.retryBtn}>
                      <RotateCcw size={13} /> Retry Payment
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.tableFooter}>
          <span className={styles.footerNote}>Showing {filtered.length} of 42 invoices</span>
          <div className={styles.pagination}>
            <button className={styles.pageBtn} disabled><ChevronLeft size={14} /></button>
            <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <button className={styles.pageBtn}><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
