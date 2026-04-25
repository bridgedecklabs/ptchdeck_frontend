import { useState } from 'react'
import { Copy, AtSign } from 'lucide-react'
import styles from './ConnectorEmailBanner.module.css'

interface Props {
  email: string
}

export default function ConnectorEmailBanner({ email }: Props) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(email).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.banner}>
      <div className={styles.left}>
        <h2 className={styles.title}>Your Inbound Email Address</h2>
        <p className={styles.subtitle}>
          Forward any pitch deck to this address and it will appear in your Upload Queue automatically.
        </p>

        <div className={styles.emailRow}>
          <span className={styles.emailChip}>{email}</span>
          <button className={styles.copyBtn} onClick={handleCopy} type="button">
            <Copy size={14} />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <ul className={styles.bullets}>
          <li>Attachments up to 50MB are supported</li>
          <li>Supported formats: PDF, PPTX, KEY</li>
          <li>AI processing begins instantly upon receipt</li>
        </ul>
      </div>

      <div className={styles.iconWrap} aria-hidden="true">
        <AtSign size={96} strokeWidth={1} color="#cbd5e1" />
      </div>
    </div>
  )
}
