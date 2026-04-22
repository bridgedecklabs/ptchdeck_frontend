import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { sanityClient, urlFor } from '../../config/sanity'
import styles from './VCDirectory.module.css'

interface VCFirm {
  _id: string
  name: string
  slug: { current: string }
  logo?: any
  location?: string
  focusSectors?: string[]
  stagesFunded?: string[]
  ticketSize?: string
  geographyFocus?: string[]
  isActive?: boolean
  metaDescription?: string
}

const SECTOR_LABELS: Record<string, string> = {
  fintech: 'Fintech', saas: 'SaaS', 'ai-ml': 'AI/ML',
  healthtech: 'Healthtech', edtech: 'Edtech', ecommerce: 'Ecommerce',
  'deep-tech': 'Deep Tech', climate: 'Climate',
}
const STAGE_LABELS: Record<string, string> = {
  'pre-seed': 'Pre-Seed', seed: 'Seed', 'series-a': 'Series A',
  'series-b': 'Series B', growth: 'Growth',
}
const GEO_LABELS: Record<string, string> = {
  india: 'India', sea: 'Southeast Asia', global: 'Global', usa: 'USA', europe: 'Europe',
}

const VC_QUERY = `*[_type == "vcDirectory"] | order(name asc) {
  _id, name, slug, logo, location,
  focusSectors, stagesFunded, ticketSize,
  geographyFocus, isActive, metaDescription
}`

export default function VCDirectory() {
  const [firms, setFirms] = useState<VCFirm[]>([])
  const [loading, setLoading] = useState(true)
  const [sectorFilter, setSectorFilter] = useState('all')
  const [stageFilter, setStageFilter] = useState('all')
  const [geoFilter, setGeoFilter] = useState('all')

  useEffect(() => {
    sanityClient.fetch<VCFirm[]>(VC_QUERY)
      .then(data => setFirms(data))
      .finally(() => setLoading(false))
  }, [])

  const allSectors = Array.from(new Set(firms.flatMap(f => f.focusSectors ?? [])))
  const allStages = Array.from(new Set(firms.flatMap(f => f.stagesFunded ?? [])))
  const allGeos = Array.from(new Set(firms.flatMap(f => f.geographyFocus ?? [])))

  const filtered = firms.filter(f => {
    if (sectorFilter !== 'all' && !f.focusSectors?.includes(sectorFilter)) return false
    if (stageFilter !== 'all' && !f.stagesFunded?.includes(stageFilter)) return false
    if (geoFilter !== 'all' && !f.geographyFocus?.includes(geoFilter)) return false
    return true
  })

  return (
    <section className="section">
      <div className="container">

        <div className={styles.header}>
          <span className={styles.sectionLabel}>Investors</span>
          <h1 className={styles.title}>VC Directory</h1>
          <p className={styles.subtitle}>
            Find top venture capital firms globally. Filter by sector, stage, and geography.
          </p>
        </div>

        <div className={styles.filterGroups}>
          {allSectors.length > 0 && (
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Sector</span>
              <div className={styles.filters}>
                <button className={`${styles.filterBtn} ${sectorFilter === 'all' ? styles.filterActive : ''}`} onClick={() => setSectorFilter('all')}>All</button>
                {allSectors.map(s => (
                  <button key={s} className={`${styles.filterBtn} ${sectorFilter === s ? styles.filterActive : ''}`} onClick={() => setSectorFilter(s)}>
                    {SECTOR_LABELS[s] ?? s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {allStages.length > 0 && (
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Stage</span>
              <div className={styles.filters}>
                <button className={`${styles.filterBtn} ${stageFilter === 'all' ? styles.filterActive : ''}`} onClick={() => setStageFilter('all')}>All</button>
                {allStages.map(s => (
                  <button key={s} className={`${styles.filterBtn} ${stageFilter === s ? styles.filterActive : ''}`} onClick={() => setStageFilter(s)}>
                    {STAGE_LABELS[s] ?? s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {allGeos.length > 0 && (
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Geography</span>
              <div className={styles.filters}>
                <button className={`${styles.filterBtn} ${geoFilter === 'all' ? styles.filterActive : ''}`} onClick={() => setGeoFilter('all')}>All</button>
                {allGeos.map(g => (
                  <button key={g} className={`${styles.filterBtn} ${geoFilter === g ? styles.filterActive : ''}`} onClick={() => setGeoFilter(g)}>
                    {GEO_LABELS[g] ?? g}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {loading && (
          <div className={styles.grid}>
            {[1, 2, 3, 4, 5, 6].map(n => <div key={n} className={styles.skeleton} />)}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className={styles.empty}>No VC firms found — check back soon.</p>
        )}

        {!loading && filtered.length > 0 && (
          <div className={styles.grid}>
            {filtered.map(firm => (
              <Link key={firm._id} to={`/vc/${firm.slug.current}`} className={styles.card}>
                <div className={styles.cardTop}>
                  {firm.logo ? (
                    <img className={styles.logo} src={urlFor(firm.logo).width(80).height(80).url()} alt={firm.name} />
                  ) : (
                    <div className={styles.logoPlaceholder}>{firm.name.charAt(0)}</div>
                  )}
                  <div className={styles.cardMeta}>
                    <h2 className={styles.firmName}>{firm.name}</h2>
                    {firm.location && <p className={styles.location}>{firm.location}</p>}
                  </div>
                  {firm.isActive !== undefined && (
                    <span className={`${styles.statusBadge} ${firm.isActive ? styles.statusActive : styles.statusInactive}`}>
                      {firm.isActive ? 'Actively Investing' : 'Not Investing'}
                    </span>
                  )}
                </div>

                {firm.ticketSize && (
                  <p className={styles.ticketSize}>Ticket: <strong>{firm.ticketSize}</strong></p>
                )}

                {firm.focusSectors && firm.focusSectors.length > 0 && (
                  <div className={styles.badgeRow}>
                    {firm.focusSectors.map(s => (
                      <span key={s} className={`${styles.badge} ${styles.badgeSector}`}>{SECTOR_LABELS[s] ?? s}</span>
                    ))}
                  </div>
                )}

                {firm.stagesFunded && firm.stagesFunded.length > 0 && (
                  <div className={styles.badgeRow}>
                    {firm.stagesFunded.map(s => (
                      <span key={s} className={`${styles.badge} ${styles.badgeStage}`}>{STAGE_LABELS[s] ?? s}</span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
