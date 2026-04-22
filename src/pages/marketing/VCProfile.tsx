import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { sanityClient, urlFor } from '../../config/sanity'
import SEO from '../../components/seo/SEO'
import styles from './VCProfile.module.css'

interface VCFirm {
  name: string
  logo?: any
  website?: string
  location?: string
  focusSectors?: string[]
  stagesFunded?: string[]
  ticketSize?: string
  geographyFocus?: string[]
  about?: any[]
  portfolioCompanies?: string[]
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

export default function VCProfile() {
  const { slug } = useParams<{ slug: string }>()
  const [firm, setFirm] = useState<VCFirm | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    sanityClient.fetch<VCFirm>(
      `*[_type == "vcDirectory" && slug.current == $slug][0] {
        name, logo, website, location, focusSectors,
        stagesFunded, ticketSize, geographyFocus,
        about, portfolioCompanies, isActive, metaDescription
      }`,
      { slug }
    )
      .then(data => setFirm(data))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className={styles.loading}><div className={styles.spinner} /></div>
  if (!firm) return (
    <section className="section">
      <div className="container">
        <p className={styles.notFound}>VC firm not found. <Link to="/vc">Back to directory →</Link></p>
      </div>
    </section>
  )

  return (
    <>
      <SEO
        title={firm.name}
        description={firm.metaDescription ?? `${firm.name} — VC firm profile on PtchDeck`}
        url={`https://ptchdeck.com/vc/${slug}`}
      />

      <section className="section">
        <div className="container">
          <Link to="/vc" className={styles.backLink}>← VC Directory</Link>

          <div className={styles.profileHeader}>
            {firm.logo ? (
              <img className={styles.logo} src={urlFor(firm.logo).width(100).height(100).url()} alt={firm.name} />
            ) : (
              <div className={styles.logoPlaceholder}>{firm.name.charAt(0)}</div>
            )}
            <div className={styles.headerInfo}>
              <div className={styles.nameRow}>
                <h1 className={styles.name}>{firm.name}</h1>
                {firm.isActive !== undefined && (
                  <span className={`${styles.statusBadge} ${firm.isActive ? styles.statusActive : styles.statusInactive}`}>
                    {firm.isActive ? 'Actively Investing' : 'Not Investing'}
                  </span>
                )}
              </div>
              <div className={styles.metaRow}>
                {firm.location && <span>{firm.location}</span>}
                {firm.ticketSize && <span>· Ticket: {firm.ticketSize}</span>}
                {firm.website && (
                  <a href={firm.website} target="_blank" rel="noopener noreferrer" className={styles.website}>
                    Visit Website →
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className={styles.badgesSection}>
            {firm.focusSectors && firm.focusSectors.length > 0 && (
              <div className={styles.badgeGroup}>
                <span className={styles.badgeGroupLabel}>Focus Sectors</span>
                <div className={styles.badgeRow}>
                  {firm.focusSectors.map(s => (
                    <span key={s} className={`${styles.badge} ${styles.badgeSector}`}>{SECTOR_LABELS[s] ?? s}</span>
                  ))}
                </div>
              </div>
            )}
            {firm.stagesFunded && firm.stagesFunded.length > 0 && (
              <div className={styles.badgeGroup}>
                <span className={styles.badgeGroupLabel}>Stages Funded</span>
                <div className={styles.badgeRow}>
                  {firm.stagesFunded.map(s => (
                    <span key={s} className={`${styles.badge} ${styles.badgeStage}`}>{STAGE_LABELS[s] ?? s}</span>
                  ))}
                </div>
              </div>
            )}
            {firm.geographyFocus && firm.geographyFocus.length > 0 && (
              <div className={styles.badgeGroup}>
                <span className={styles.badgeGroupLabel}>Geography</span>
                <div className={styles.badgeRow}>
                  {firm.geographyFocus.map(g => (
                    <span key={g} className={`${styles.badge} ${styles.badgeGeo}`}>{GEO_LABELS[g] ?? g}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {firm.about && firm.about.length > 0 && (
            <div className={styles.aboutSection}>
              <h2 className={styles.sectionHeading}>About</h2>
              <div className={styles.prose}>
                <PortableText value={firm.about} />
              </div>
            </div>
          )}

          {firm.portfolioCompanies && firm.portfolioCompanies.length > 0 && (
            <div className={styles.portfolioSection}>
              <h2 className={styles.sectionHeading}>Notable Portfolio</h2>
              <div className={styles.portfolioGrid}>
                {firm.portfolioCompanies.map(company => (
                  <span key={company} className={styles.portfolioChip}>{company}</span>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
