import { CheckCircle2, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './BillingUsageHistory.module.css'

interface UsageRow {
  month: string
  decksProcessed: number
  included: number
  overageDecks: number
  overageCharge: number
  totalBilled: number
}

const usageData: UsageRow[] = [
  { month: 'Apr 2025', decksProcessed: 143, included: 200, overageDecks: 0, overageCharge: 0, totalBilled: 149 },
  { month: 'Mar 2025', decksProcessed: 198, included: 200, overageDecks: 0, overageCharge: 0, totalBilled: 149 },
  { month: 'Feb 2025', decksProcessed: 247, included: 200, overageDecks: 47, overageCharge: 47, totalBilled: 196 },
  { month: 'Jan 2025', decksProcessed: 185, included: 200, overageDecks: 0, overageCharge: 0, totalBilled: 149 },
  { month: 'Dec 2024', decksProcessed: 192, included: 200, overageDecks: 0, overageCharge: 0, totalBilled: 149 },
  { month: 'Nov 2024', decksProcessed: 164, included: 200, overageDecks: 0, overageCharge: 0, totalBilled: 149 },
]

export default function BillingUsageHistory() {
  return (
    <div className={styles.page}>
      {/* Summary cards */}
      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>CURRENT PERIOD USAGE</div>
          <div className={styles.summaryValue}>143 <span className={styles.summaryUnit}>/ 200 decks</span></div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: '71.5%' }} />
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>ESTIMATED OVERAGE</div>
          <div className={styles.summaryValue}>$0.00</div>
          <div className={styles.withinLimit}>
            <CheckCircle2 size={13} /> Within plan limits
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>NEXT BILLING DATE</div>
          <div className={styles.summaryValueLg}>May 01, 2025</div>
          <div className={styles.summaryMeta}>Enterprise Plan · Monthly</div>
        </div>
      </div>

      {/* History table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Historical Usage Details</h2>
          <button className={styles.exportBtn}>
            <Download size={14} /> Export CSV
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>MONTH</th>
              <th>DECKS PROCESSED</th>
              <th>INCLUDED</th>
              <th>OVERAGE DECKS</th>
              <th>OVERAGE CHARGE</th>
              <th>TOTAL BILLED</th>
            </tr>
          </thead>
          <tbody>
            {usageData.map((row) => (
              <tr key={row.month}>
                <td className={styles.monthCell}>{row.month}</td>
                <td>{row.decksProcessed}</td>
                <td>{row.included}</td>
                <td className={row.overageDecks > 0 ? styles.overage : ''}>{row.overageDecks}</td>
                <td className={row.overageCharge > 0 ? styles.overage : ''}>${row.overageCharge > 0 ? `${row.overageCharge}.00` : '0'}</td>
                <td className={styles.totalCell}>${row.totalBilled}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.tableFooter}>
          <span className={styles.footerNote}>Showing last 6 months of processing activity.</span>
          <div className={styles.pagination}>
            <button className={styles.pageBtn} disabled><ChevronLeft size={14} /></button>
            <button className={styles.pageBtn} disabled><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
