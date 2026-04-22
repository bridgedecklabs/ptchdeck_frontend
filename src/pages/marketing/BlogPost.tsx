import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { sanityClient, urlFor } from '../../config/sanity'
import SEO from '../../components/seo/SEO'
import styles from './BlogPost.module.css'

interface Post {
  title: string
  slug: { current: string }
  coverImage?: any
  author?: string
  publishedAt?: string
  category?: string
  body?: any[]
  metaDescription?: string
}

const CATEGORY_LABELS: Record<string, string> = {
  founders: 'For Founders',
  investors: 'For Investors',
  'due-diligence': 'Due Diligence',
  'market-research': 'Market Research',
  'pitch-deck': 'Pitch Deck Tips',
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    sanityClient.fetch<Post>(
      `*[_type == "blogPost" && slug.current == $slug][0] {
        title, slug, coverImage, author, publishedAt,
        category, body, metaDescription
      }`,
      { slug }
    )
      .then(data => setPost(data))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className={styles.loading}><div className={styles.spinner} /></div>
  if (!post) return (
    <section className="section">
      <div className="container">
        <p className={styles.notFound}>Post not found. <Link to="/blog">Back to Blog →</Link></p>
      </div>
    </section>
  )

  return (
    <>
      <SEO
        title={post.title}
        description={post.metaDescription ?? `${post.title} — PtchDeck Blog`}
        image={post.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : undefined}
        url={`https://ptchdeck.com/blog/${slug}`}
        type="article"
      />

      <article className="section">
        <div className="container">
          <Link to="/blog" className={styles.backLink}>← Back to Blog</Link>

          <header className={styles.header}>
            {post.category && (
              <span className={styles.category}>{CATEGORY_LABELS[post.category] ?? post.category}</span>
            )}
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              {post.author && <span>{post.author}</span>}
              {post.author && post.publishedAt && <span className={styles.dot}>·</span>}
              {post.publishedAt && (
                <span>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </span>
              )}
            </div>
          </header>

          {post.coverImage && (
            <div className={styles.coverWrap}>
              <img
                className={styles.cover}
                src={urlFor(post.coverImage).width(1200).height(600).url()}
                alt={post.title}
              />
            </div>
          )}

          {post.body && post.body.length > 0 && (
            <div className={styles.body}>
              <PortableText value={post.body} />
            </div>
          )}

        </div>
      </article>
    </>
  )
}
