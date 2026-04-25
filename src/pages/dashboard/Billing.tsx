import { useState } from 'react'
import BillingCurrentPlan from '../../components/dashboard/BillingCurrentPlan'
import BillingUsageHistory from '../../components/dashboard/BillingUsageHistory'
import BillingInvoices from '../../components/dashboard/BillingInvoices'
import BillingPaymentMethod from '../../components/dashboard/BillingPaymentMethod'
import styles from './Billing.module.css'

type Tab = 'plan' | 'usage' | 'invoices' | 'payment'

const TABS: { id: Tab; label: string }[] = [
  { id: 'plan', label: 'Current Plan' },
  { id: 'usage', label: 'Usage History' },
  { id: 'invoices', label: 'Invoices' },
  { id: 'payment', label: 'Payment Method' },
]

export default function Billing() {
  const [activeTab, setActiveTab] = useState<Tab>('plan')

  return (
    <div className={styles.page}>
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 'plan' && <BillingCurrentPlan />}
        {activeTab === 'usage' && <BillingUsageHistory />}
        {activeTab === 'invoices' && <BillingInvoices />}
        {activeTab === 'payment' && <BillingPaymentMethod />}
      </div>
    </div>
  )
}
