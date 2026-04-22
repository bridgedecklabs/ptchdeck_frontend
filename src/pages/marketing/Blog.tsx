import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { sanityClient, urlFor } from '../../config/sanity'
import SEO from '../../components/seo/SEO'
import styles from './Blog.module.css'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  coverImage?: any
  author?: string
  publishedAt?: string
  category?: string
}

const CATEGORY_LABELS: Record<string, string> = {
  founders: 'For Founders',
  investors: 'For Investors',
  'due-diligence': 'Due Diligence',
  'market-research': 'Market Research',
  'pitch-deck': 'Pitch Deck Tips',
}

const BLOG_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  coverImage,
  author,
  publishedAt,
  category
}`

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  useEffect(() => {
    sanityClient.fetch<BlogPost[]>(BLOG_QUERY)
      .then(data => setPosts(data))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['all', ...Array.from(new Set(posts.map(p => p.category).filter(Boolean) as string[]))]

  const filtered = activeCategory === 'all'
    ? posts
    : posts.filter(p => p.category === activeCategory)

  return (
    <>
    <SEO
      title="Blog"
      description="Insights for founders and investors. Pitch deck tips, due diligence guides, market research and more."
      url="https://ptchdeck.com/blog"
    />
    <section className="section">
      <div className="container">

        <div className={styles.header}>
          <span className={styles.sectionLabel}>Insights</span>
          <h1 className={styles.title}>The Bridgedeck Blog</h1>
          <p className={styles.subtitle}>
            Practical guides for founders crafting pitch decks and VCs evaluating deal flow.
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
          <div className={styles.loadingGrid}>
            {[1, 2, 3].map(n => <div key={n} className={styles.skeleton} />)}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className={styles.empty}>No posts yet — check back soon.</p>
        )}

        {!loading && filtered.length > 0 && (
          <div className={styles.grid}>
            {filtered.map(post => (
              <Link
                key={post._id}
                to={`/blog/${post.slug.current}`}
                className={styles.card}
              >
                <div className={styles.cardImage}>
                  {post.coverImage ? (
                    <img
                      src={urlFor(post.coverImage).width(600).height(340).url()}
                      alt={post.title}
                    />
                  ) : (
                    <div className={styles.cardImagePlaceholder} />
                  )}
                  {post.category && (
                    <span className={styles.cardCategory}>
                      {CATEGORY_LABELS[post.category] ?? post.category}
                    </span>
                  )}
                </div>
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <div className={styles.cardMeta}>
                    {post.author && <span>{post.author}</span>}
                    {post.author && post.publishedAt && <span className={styles.dot}>·</span>}
                    {post.publishedAt && (
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
    </>
  )
}
