import { useState } from 'react'
import { Connector } from '../../data/dashboard/connectors'
import styles from './ConnectorCard.module.css'

interface ConnectorCardProps {
  connector: Connector
}

export default function ConnectorCard({ connector }: ConnectorCardProps) {
  const [status, setStatus] = useState(connector.status)
  const [showConfig, setShowConfig] = useState(false)

  const statusClass = {
    connected: styles.statusConnected,
    disconnected: styles.statusDisconnected,
    error: styles.statusError,
  }[status]

  const statusLabel = { connected: 'Connected', disconnected: 'Disconnected', error: 'Error' }[status]

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconWrap}>
          <div className={styles.icon} style={{ background: connector.color }}>
            {connector.icon}
          </div>
          <span className={styles.name}>{connector.name}</span>
        </div>
        <span className={`${styles.statusPill} ${statusClass}`}>{statusLabel}</span>
      </div>

      <p className={styles.description}>{connector.description}</p>

      {(status === 'connected' || status === 'error') && (
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 4v3l2 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Last sync: {connector.lastSync}
          </span>
          <span className={styles.metaItem}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 3h10M1 9h10M4 3v6M8 3v6" stroke="currentColor" strokeWidth="1.2"/></svg>
            {connector.messagesReceived} items received
          </span>
        </div>
      )}

      {showConfig && (
        <div className={styles.configSection}>
          {connector.configFields.map((f) => (
            <div key={f.label} className={styles.configField}>
              <label className={styles.configLabel}>{f.label}</label>
              <input
                className={styles.configInput}
                type={f.type}
                placeholder={f.placeholder}
              />
            </div>
          ))}
        </div>
      )}

      <div className={styles.actions}>
        {status === 'connected' ? (
          <button
            className={`${styles.connectBtn} ${styles.connectBtnDanger}`}
            onClick={() => setStatus('disconnected')}
          >
            Disconnect
          </button>
        ) : (
          <button
            className={`${styles.connectBtn} ${styles.connectBtnPrimary}`}
            onClick={() => setStatus('connected')}
          >
            {status === 'error' ? 'Reconnect' : 'Connect'}
          </button>
        )}
        <button
          className={styles.configToggle}
          title="Configure"
          onClick={() => setShowConfig(v => !v)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 10a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M6.5 2.5L5 1H3l-1 2 1.5 1.5A4.5 4.5 0 002 7l-2 .5V9.5L2 10a4.5 4.5 0 001.5 2.5L2 14l1 2h2l1.5-1.5A4.5 4.5 0 008 15l.5 2h2L11 15a4.5 4.5 0 002.5-1.5L15 15l1-2-1.5-1.5A4.5 4.5 0 0016 8.5V7l-2-.5a4.5 4.5 0 00-1.5-2.5L14 2.5 13 .5h-2L9.5 2A4.5 4.5 0 008 1.5 4.5 4.5 0 006.5 2.5z" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
