import { CheckCircle2, AlertTriangle, Lock } from 'lucide-react'
import styles from './BillingCurrentPlan.module.css'

interface UsageStat {
  label: string
  used: number
  total: number
  note: string
  color: string
}

const usage: UsageStat[] = [
  { label: 'DECK ANALYSES', used: 143, total: 200, note: '71.5% consumed', color: '#4f46e5' },
  { label: 'TEAM MEMBERS', used: 5, total: 10, note: '5 seats remaining', color: '#16a34a' },
  { label: 'CONNECTORS', used: 2, total: 4, note: '2 active API bridges', color: '#16a34a' },
]

const features = [
  '200 decks per month',
  '4 connectors',
  '10 team members',
  'Priority support',
]

export default function BillingCurrentPlan() {
  return (
    <div className={styles.layout}>
      {/* Left: plan card */}
      <div className={styles.planCard}>
        <div className={styles.planTop}>
          <div>
            <div className={styles.planStatus}>YOUR CURRENT STATUS</div>
            <div className={styles.planName}>Growth Plan</div>
            <div className={styles.planMeta}>Billed monthly · Renews 1 May 2025</div>
          </div>
          <div className={styles.planPrice}>
            <span className={styles.priceAmount}>$149</span>
            <span className={styles.pricePer}>/mo</span>
          </div>
        </div>

        <div className={styles.statsRow}>
          {usage.map((stat) => (
            <div key={stat.label} className={styles.statBlock}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statValue}>{stat.used}/{stat.total}</span>
              </div>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${(stat.used / stat.total) * 100}%`, background: stat.color }}
                />
              </div>
              <div className={styles.statNote}>{stat.note}</div>
            </div>
          ))}
        </div>

        <div className={styles.featuresSection}>
          <div className={styles.featuresLabel}>INCLUDED FEATURES</div>
          <div className={styles.featuresGrid}>
            {features.map((f) => (
              <div key={f} className={styles.featureItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                {f}
              </div>
            ))}
          </div>
        </div>

        <button className={styles.cancelLink}>CANCEL PLAN</button>

        <div className={styles.overageAlert}>
          <div className={styles.alertIcon}><AlertTriangle size={18} /></div>
          <div className={styles.alertBody}>
            <div className={styles.alertTitle}>Overage Alert</div>
            <div className={styles.alertDesc}>You've reached 71.5% of your deck analysis limit. Consider upgrading to avoid service interruption.</div>
          </div>
          <button className={styles.alertUpgradeBtn}>UPGRADE<br />TO SCALE</button>
        </div>
      </div>

      {/* Right: plan comparison */}
      <div className={styles.sidebar}>
        <div className={styles.comparisonCard}>
          <div className={styles.comparisonTitle}>PLAN COMPARISON</div>

          <div className={styles.planOption}>
            <div>
              <div className={styles.optionName}>Starter</div>
              <div className={styles.optionDesc}>75 decks · 3 members</div>
            </div>
            <div className={styles.optionPrice}>$49/mo</div>
          </div>

          <div className={`${styles.planOption} ${styles.planOptionCurrent}`}>
            <div>
              <div className={styles.optionName}>Growth</div>
              <div className={styles.optionDesc}>300 decks · 10 members</div>
            </div>
            <div className={styles.optionPriceGroup}>
              <span className={`${styles.optionPrice} ${styles.optionPriceCurrent}`}>$149/mo</span>
              <span className={styles.currentBadge}>CURRENT</span>
            </div>
          </div>

          <div className={styles.planOption}>
            <div>
              <div className={styles.optionName}>Scale</div>
              <div className={styles.optionDesc}>1000 decks · Unlimited members</div>
            </div>
            <div className={styles.optionPriceGroup}>
              <span className={styles.recommendedBadge}>Recommended</span>
              <span className={styles.optionPrice}>$399/mo</span>
            </div>
          </div>

          <button className={styles.upgradeBtn}>Upgrade to Scale</button>

          <div className={styles.nextInvoice}>
            <div className={styles.nextInvoiceLabel}>Next invoice total</div>
            <div className={styles.nextInvoiceAmount}>
              $149.00 <span className={styles.nextInvoiceDate}>ON 1 MAY 2025</span>
            </div>
          </div>

          <div className={styles.stripeNote}>
            <Lock size={12} /> Secured by Stripe
          </div>
        </div>

        <div className={styles.customPlanCard}>
          <div className={styles.customTitle}>Need a custom plan for your firm?</div>
          <div className={styles.customDesc}>We offer tailored solutions for institutional VCs and multi-stage equity firms.</div>
          <button className={styles.contactBtn}>CONTACT SALES</button>
        </div>
      </div>
    </div>
  )
}
