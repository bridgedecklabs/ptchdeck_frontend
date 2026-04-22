import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { sanityClient } from '../../config/sanity'
import SEO from '../../components/seo/SEO'
import styles from './GlossaryTerm.module.css'

interface Term {
  term: string
  slug: { current: string }
  category?: string
  definition?: any[]
  relatedTerms?: string[]
  metaDescription?: string
}

const CATEGORY_LABELS: Record<string, string> = {
  investment: 'Investment Terms',
  startup: 'Startup Terms',
  'due-diligence': 'Due Diligence',
  legal: 'Legal Terms',
  financial: 'Financial Terms',
}

export default function GlossaryTerm() {
  const { slug } = useParams<{ slug: string }>()
  const [term, setTerm] = useState<Term | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    sanityClient.fetch<Term>(
      `*[_type == "glossary" && slug.current == $slug][0] {
        term, slug, category, definition, relatedTerms, metaDescription
      }`,
      { slug }
    )
      .then(data => setTerm(data))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className={styles.loading}><div className={styles.spinner} /></div>
  if (!term) return (
    <section className="section">
      <div className="container">
        <p className={styles.notFound}>Term not found. <Link to="/glossary">Back to Glossary →</Link></p>
      </div>
    </section>
  )

  return (
    <>
      <SEO
        title={term.term}
        description={term.metaDescription ?? `Definition of ${term.term} — startup and investment glossary on PtchDeck`}
        url={`https://ptchdeck.com/glossary/${slug}`}
      />

      <section className="section">
        <div className="container">
          <Link to="/glossary" className={styles.backLink}>← Glossary</Link>

          <div className={styles.termHeader}>
            {term.category && (
              <span className={styles.category}>{CATEGORY_LABELS[term.category] ?? term.category}</span>
            )}
            <h1 className={styles.term}>{term.term}</h1>
          </div>

          {term.definition && term.definition.length > 0 && (
            <div className={styles.definition}>
              <PortableText value={term.definition} />
            </div>
          )}

          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div className={styles.relatedSection}>
              <h2 className={styles.relatedHeading}>Related Terms</h2>
              <div className={styles.relatedList}>
                {term.relatedTerms.map(related => (
                  <Link
                    key={related}
                    to={`/glossary/${related.toLowerCase().replace(/\s+/g, '-')}`}
                    className={styles.relatedLink}
                  >
                    {related}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
