import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { sanityClient } from '../config/sanity'
import SEO from '../components/seo/SEO'
import styles from './Glossary.module.css'

interface GlossaryTerm {
  _id: string
  term: string
  slug: { current: string }
  category?: string
  metaDescription?: string
}

const CATEGORY_LABELS: Record<string, string> = {
  investment: 'Investment Terms',
  startup: 'Startup Terms',
  'due-diligence': 'Due Diligence',
  legal: 'Legal Terms',
  financial: 'Financial Terms',
}

const GLOSSARY_QUERY = `*[_type == "glossary"] | order(term asc) {
  _id, term, slug, category, metaDescription
}`

export default function Glossary() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    sanityClient.fetch<GlossaryTerm[]>(GLOSSARY_QUERY)
      .then(data => setTerms(data))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['all', ...Array.from(new Set(terms.map(t => t.category).filter(Boolean) as string[]))]

  const filtered = activeCategory === 'all'
    ? terms
    : terms.filter(t => t.category === activeCategory)

  // Group alphabetically
  const grouped = filtered.reduce<Record<string, GlossaryTerm[]>>((acc, term) => {
    const letter = term.term.charAt(0).toUpperCase()
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(term)
    return acc
  }, {})
  const letters = Object.keys(grouped).sort()

  return (
    <>
      <SEO
        title="Startup & Investment Glossary"
        description="Complete glossary of startup and investment terms. Due diligence, term sheets, cap tables and more explained simply."
        url="https://ptchdeck.com/glossary"
      />

      <section className="section">
        <div className="container">

          <div className={styles.header}>
            <span className={styles.sectionLabel}>Reference</span>
            <h1 className={styles.title}>Startup & Investment Glossary</h1>
            <p className={styles.subtitle}>
              Every term founders and investors need to know, explained simply.
            </p>
          </div>

          {categories.length > 1 && (
            <div className={styles.filters}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'all' ? 'All' : CATEGORY_LABELS[cat] ?? cat}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className={styles.skeletonList}>
              {[1, 2, 3, 4, 5].map(n => <div key={n} className={styles.skeleton} />)}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <p className={styles.empty}>No glossary terms yet — check back soon.</p>
          )}

          {!loading && letters.map(letter => (
            <div key={letter} className={styles.letterGroup}>
              <h2 className={styles.letterHeading}>{letter}</h2>
              <div className={styles.termList}>
                {grouped[letter].map(term => (
                  <Link key={term._id} to={`/glossary/${term.slug.current}`} className={styles.termRow}>
                    <span className={styles.termName}>{term.term}</span>
                    {term.category && (
                      <span className={styles.termCategory}>{CATEGORY_LABELS[term.category] ?? term.category}</span>
                    )}
                    <span className={styles.termArrow}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  )
}
