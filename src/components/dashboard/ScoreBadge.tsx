import styles from './ScoreBadge.module.css'

interface ScoreBadgeProps {
  score: number
}

function tier(score: number): 'high' | 'mid' | 'low' {
  if (score >= 75) return 'high'
  if (score >= 50) return 'mid'
  return 'low'
}

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[tier(score)]}`}>
      {score}
    </span>
  )
}
