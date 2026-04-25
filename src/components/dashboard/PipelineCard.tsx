import ScoreBadge from './ScoreBadge'
import styles from './PipelineCard.module.css'

export interface CardData {
  id: number
  name: string
  score: number
  tags: string[]
  owner: string
  time: string
}

const AVATAR_PALETTE = [
  '#6366f1', '#0ea5e9', '#f97316', '#16a34a',
  '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b',
]

function avatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length]
}

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

interface PipelineCardProps {
  card: CardData
}

export default function PipelineCard({ card }: PipelineCardProps) {
  return (
    <article className={styles.card} role="button" tabIndex={0} aria-label={card.name}>
      {/* Top row: name + score */}
      <div className={styles.topRow}>
        <span className={styles.name}>{card.name}</span>
        <ScoreBadge score={card.score} />
      </div>

      {/* Tags */}
      {card.tags.length > 0 && (
        <div className={styles.tags}>
          {card.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      )}

      {/* Footer: owner + time */}
      <div className={styles.footer}>
        <div className={styles.owner}>
          <div className={styles.avatar} style={{ background: avatarColor(card.owner) }}>
            {initials(card.owner)}
          </div>
          <span className={styles.ownerName}>{card.owner}</span>
        </div>
        <span className={styles.time}>{card.time}</span>
      </div>
    </article>
  )
}
