import { useNavigate } from 'react-router-dom'
import { newsFeed, fundingRounds, trendingSectors } from '../../data/dashboard/market'
import { DASHBOARD_ROUTES } from '../../config/routes'
import styles from './MarketTrends.module.css'

const MAX_SECTOR_COUNT = Math.max(...trendingSectors.map(s => s.count))

export default function MarketTrends() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {/* News Feed */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>News Feed</span>
          </div>
          <div className={styles.newsList}>
            {newsFeed.map((item) => (
              <div key={item.id} className={styles.newsItem} onClick={() => navigate(`${DASHBOARD_ROUTES.MARKET}/startup/s1`)}>
                <div className={styles.newsAvatar} style={{ background: item.imageColor }}>{item.imageInitials}</div>
                <div className={styles.newsContent}>
                  <div className={styles.newsTitle}>{item.title}</div>
                  <div className={styles.newsMeta}>
                    <span className={styles.newsSource}>{item.source}</span>
                    <span className={styles.newsTime}>{item.publishedAt}</span>
                    <span className={styles.newsTag}>{item.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Sectors */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Trending Sectors</span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>Deal count this quarter</span>
          </div>
          <div className={styles.sectorList}>
            {trendingSectors.map((s) => (
              <div key={s.sector} className={styles.sectorRow}>
                <span className={styles.sectorName}>{s.sector}</span>
                <div className={styles.sectorBarWrap}>
                  <div
                    className={styles.sectorBarFill}
                    style={{ width: `${(s.count / MAX_SECTOR_COUNT) * 100}%`, background: s.color }}
                  >
                    <span className={styles.sectorCount}>{s.count}</span>
                  </div>
                </div>
                <span className={`${styles.sectorChange} ${s.change >= 0 ? styles.changeUp : styles.changeDown}`}>
                  {s.change >= 0 ? '+' : ''}{s.change}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Big Funding Rounds */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Big Rounds</span>
          </div>
          <div className={styles.fundingList}>
            {fundingRounds.map((f) => (
              <div key={f.id} className={styles.fundingItem} onClick={() => navigate(`${DASHBOARD_ROUTES.MARKET}/startup/s1`)}>
                <div className={styles.fundingAvatar}>{f.company.slice(0, 2).toUpperCase()}</div>
                <div className={styles.fundingInfo}>
                  <div className={styles.fundingName}>{f.company}</div>
                  <div className={styles.fundingMeta}>{f.round} · {f.sector} · {f.date}</div>
                </div>
                <div className={styles.fundingAmount}>{f.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
