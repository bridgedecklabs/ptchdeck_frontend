import { useState } from 'react'
import { CreditCard, Pencil, Lock, HelpCircle } from 'lucide-react'
import styles from './BillingPaymentMethod.module.css'

export default function BillingPaymentMethod() {
  const [email, setEmail] = useState('preet@vertexventures.com')
  const [gst, setGst] = useState('')
  const [address, setAddress] = useState('Vertex Ventures, 101 California St, Suite 2450, San Francisco, CA 94111, United States')
  const [saved, setSaved] = useState(false)

  const handleSave = () => setSaved(true)

  return (
    <div className={styles.page}>
      {/* Payment method */}
      <div className={styles.section}>
        <div className={styles.sectionTop}>
          <div>
            <h2 className={styles.sectionTitle}>Current Payment Method</h2>
            <p className={styles.sectionDesc}>Manage the card used for your enterprise subscription.</p>
          </div>
          <button className={styles.updateBtn}>Update</button>
        </div>

        <div className={styles.cardRow}>
          <CreditCard size={22} className={styles.cardIcon} />
          <div className={styles.cardInfo}>
            <span className={styles.cardName}>Visa ending in 4242</span>
            <span className={styles.defaultBadge}>DEFAULT</span>
          </div>
          <div className={styles.cardMeta}>Expires 12/27</div>
          <button className={styles.secureLink}>
            <Lock size={12} /> Secure Card
          </button>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Billing details */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Billing Details</h2>
        <p className={styles.sectionDesc}>These details will appear on your monthly VAT/GST invoices.</p>

        <div className={styles.fieldsGrid}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>BILLING EMAIL</label>
            <div className={styles.fieldInputWrap}>
              <input
                className={styles.fieldInput}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setSaved(false) }}
              />
              <Pencil size={14} className={styles.editIcon} />
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>GST NUMBER</label>
            <div className={styles.fieldInputWrap}>
              <input
                className={styles.fieldInput}
                placeholder="Not provided"
                value={gst}
                onChange={(e) => { setGst(e.target.value); setSaved(false) }}
              />
              <Pencil size={14} className={styles.editIcon} />
            </div>
          </div>
        </div>

        <div className={styles.fieldGroup} style={{ marginTop: 16 }}>
          <label className={styles.fieldLabel}>BILLING ADDRESS</label>
          <div className={styles.fieldInputWrap}>
            <input
              className={styles.fieldInput}
              value={address}
              onChange={(e) => { setAddress(e.target.value); setSaved(false) }}
            />
            <Pencil size={14} className={styles.editIcon} />
          </div>
        </div>
      </div>

      {/* Save footer */}
      <div className={styles.saveBar}>
        <span className={styles.saveNote}>Changes take effect immediately on your next billing cycle.</span>
        <button
          className={`${styles.saveBtn} ${saved ? styles.saveBtnSaved : ''}`}
          onClick={handleSave}
        >
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Help */}
      <div className={styles.helpRow}>
        <div className={styles.helpIcon}><HelpCircle size={20} /></div>
        <div className={styles.helpText}>
          <div className={styles.helpTitle}>Need help with your payment?</div>
          <div className={styles.helpDesc}>Contact our priority billing support team for enterprise assistance.</div>
        </div>
        <button className={styles.supportLink}>Contact Support →</button>
      </div>
    </div>
  )
}
