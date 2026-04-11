import styles from './StatCard.module.css'

interface StatCardProps {
  label: string
  value: string
  change: number
  changeLabel: string
  icon: React.ReactNode
}

export default function StatCard({ label, value, change, changeLabel, icon }: StatCardProps) {
  const isUp = change >= 0

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <div className={styles.icon}>{icon}</div>
      </div>
      <div className={styles.value}>{value}</div>
      <div className={styles.footer}>
        <span className={`${styles.change} ${isUp ? styles.changeUp : styles.changeDown}`}>
          {isUp ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2L10 6H7.5V10H4.5V6H2L6 2Z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 10L2 6H4.5V2H7.5V6H10L6 10Z" fill="currentColor" />
            </svg>
          )}
          {Math.abs(change)}%
        </span>
        <span className={styles.changeLabel}>{changeLabel}</span>
      </div>
    </div>
  )
}
