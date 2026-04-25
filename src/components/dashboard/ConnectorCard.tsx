import { AlertTriangle, MessageSquare } from 'lucide-react'
import type { ConnectorItem } from '../../pages/dashboard/Connectors'
import styles from './ConnectorCard.module.css'

interface Props {
  item: ConnectorItem
}

export default function ConnectorCard({ item }: Props) {
  const isConnected  = item.status === 'connected'
  const isError      = item.status === 'error'
  const isComingSoon = item.status === 'coming_soon'
  const isAvailable  = item.status === 'not_connected'

  return (
    <div className={`${styles.card} ${isConnected ? styles.cardConnected : ''} ${isError ? styles.cardError : ''}`}>
      {isError && (
        <div className={styles.errorBanner}>
          <AlertTriangle className={styles.errorIcon} size={14} />
          <span className={styles.errorText}>{item.errorMsg}</span>
          <button className={styles.reconnectBtn} type="button">Reconnect</button>
        </div>
      )}

      <div className={styles.cardHeader}>
        <div className={styles.logoBox} style={{ background: item.initialColor + '18', color: item.initialColor }}>
          {item.initial}
        </div>
        {(isConnected || isError) && (
          <span className={`${styles.statusPill} ${isError ? styles.statusError : styles.statusConnected}`}>Connected</span>
        )}
        {isAvailable  && <span className={styles.statusPill}>Not Connected</span>}
        {isComingSoon && <span className={`${styles.statusPill} ${styles.statusSoon}`}>Coming Soon</span>}
      </div>

      <div className={styles.name}>{item.name}</div>
      <div className={styles.category}>{item.category}</div>

      {(isConnected || isError) && item.admin && (
        <div className={styles.metaBlock}>
          <div className={styles.metaRow}>
            <span className={styles.metaKey}>Admin</span>
            <span className={styles.metaVal}>{item.admin}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaKey}>Linked on</span>
            <span className={styles.metaVal}>{item.linkedOn}</span>
          </div>
          {item.channel && (
            <div className={styles.channelChip}>
              <MessageSquare size={12} />
              {item.channel}
            </div>
          )}
        </div>
      )}

      {(isAvailable || isComingSoon) && item.channel && (
        <p className={styles.availableDesc}>{item.channel}</p>
      )}

      {(isConnected || isError) && <button className={styles.configureBtn} type="button">Configure Settings</button>}
      {isAvailable   && <button className={styles.connectBtn}    type="button">Connect</button>}
      {isComingSoon  && <button className={styles.comingSoonBtn} type="button" disabled>Coming Soon</button>}
    </div>
  )
}
