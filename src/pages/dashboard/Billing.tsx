import styles from './Billing.module.css'

const invoices = [
  { id: 'inv1', date: 'Mar 1, 2025', amount: '$199', status: 'Paid', plan: 'Pro Plan' },
  { id: 'inv2', date: 'Feb 1, 2025', amount: '$199', status: 'Paid', plan: 'Pro Plan' },
  { id: 'inv3', date: 'Jan 1, 2025', amount: '$199', status: 'Paid', plan: 'Pro Plan' },
  { id: 'inv4', date: 'Dec 1, 2024', amount: '$99', status: 'Paid', plan: 'Starter Plan' },
]

const usageItems = [
  { label: 'Decks Analyzed', current: 248, total: 500 },
  { label: 'Team Members', current: 7, total: 10 },
  { label: 'Connectors', current: 2, total: 5 },
]

export default function Billing() {
  return (
    <div className={styles.page}>
      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <div>
            <span className={styles.planBadge}>PRO</span>
            <div className={styles.planName}>Pro Plan</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className={styles.planPrice}>$199</div>
            <div className={styles.planPriceSub}>per month · billed monthly</div>
          </div>
        </div>
        <div className={styles.planActions}>
          <button className={styles.upgradeBtn}>Upgrade to Enterprise</button>
          <button className={styles.secondaryBtn}>Manage Billing</button>
        </div>
      </div>

      <div className={styles.usageCard}>
        <div className={styles.usageTitle}>Usage This Month</div>
        <div className={styles.usageGrid}>
          {usageItems.map((u) => {
            const pct = (u.current / u.total) * 100
            const fillClass = pct >= 90 ? styles.usageBarFillCrit : pct >= 70 ? styles.usageBarFillWarn : ''
            return (
              <div key={u.label} className={styles.usageItem}>
                <span className={styles.usageLabel}>{u.label}</span>
                <div className={styles.usageNumbers}>
                  <span className={styles.usageCurrent}>{u.current}</span>
                  <span className={styles.usageTotal}>/ {u.total}</span>
                </div>
                <div className={styles.usageBar}>
                  <div className={`${styles.usageBarFill} ${fillClass}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.invoicesCard}>
        <div className={styles.invoicesHeader}>
          <div className={styles.invoicesTitle}>Invoice History</div>
        </div>
        <table className={styles.invoiceTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.date}</td>
                <td>{inv.plan}</td>
                <td><strong>{inv.amount}</strong></td>
                <td><span className={styles.invoicePaid}>{inv.status}</span></td>
                <td><a className={styles.downloadLink}>Download PDF</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
