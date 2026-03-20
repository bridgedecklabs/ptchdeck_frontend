import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import Badge from '../components/ui/Badge'
import StatsBar from '../components/sections/StatsBar'
import CTASection from '../components/sections/CTASection'
import styles from './Home.module.css'

const MOCK_SCORES = [
  { label: 'Market Size', value: 92 },
  { label: 'Team Strength', value: 88 },
  { label: 'Product Vision', value: 85 },
  { label: 'Traction', value: 74 },
]

export default function Home() {
  const [emailOpen, setEmailOpen] = useState(false)
  const [heroEmail, setHeroEmail] = useState('')
  const navigate = useNavigate()

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!heroEmail.trim()) return
    navigate(`${ROUTES.AUTH}?email=${encodeURIComponent(heroEmail)}&mode=signup`)
  }

  return (
    <>
      {/* ── Hero ────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>

          {/* Left */}
          <div className={styles.heroLeft}>
            <Badge>Coming Soon</Badge>
            <h1 className={styles.heroTitle}>
              Simplify Pitchdeck<br />
              <span className={styles.heroAccent}>Analysis</span>
            </h1>
            <p className={styles.heroSub}>
              Helping VCs effortlessly review and compare multiple decks in one place — powered by AI.
            </p>

            {emailOpen ? (
              <form onSubmit={handleEmailSubmit} className={styles.heroEmailForm}>
                <input
                  type="email"
                  required
                  autoFocus
                  placeholder="Enter your email address"
                  value={heroEmail}
                  onChange={e => setHeroEmail(e.target.value)}
                  className={styles.heroEmailInput}
                />
                <button type="submit" className={styles.btnPrimary}>
                  Continue →
                </button>
              </form>
            ) : (
              <div className={styles.heroCtas}>
                <button
                  onClick={() => setEmailOpen(true)}
                  className={styles.btnPrimary}
                >
                  Get Early Access
                </button>
                <Link to={ROUTES.EXPLAINER} className={styles.btnOutline}>
                  See How It Works
                </Link>
              </div>
            )}

            <div className={styles.heroSocial}>
              <div className={styles.avatarGroup}>
                {['#6366f1', '#8b5cf6', '#06b6d4'].map((c, i) => (
                  <span key={i} className={styles.avatar} style={{ background: c }} />
                ))}
              </div>
              <p className={styles.socialProof}>Trusted by <strong>15+ VC firms</strong> in early access</p>
            </div>
          </div>

          {/* Right — product mock-up card */}
          <div className={styles.heroRight}>
            <div className={styles.mockCard}>
              <div className={styles.mockHeader}>
                <div className={styles.mockDots}>
                  <span /><span /><span />
                </div>
                <span className={styles.mockTitle}>Deck Analysis</span>
                <span className={styles.mockBadge}>AI</span>
              </div>

              <div className={styles.mockDeckRow}>
                <div className={styles.mockDeckIcon}>📄</div>
                <div>
                  <p className={styles.mockDeckName}>Series A Pitch — Acme.pdf</p>
                  <p className={styles.mockDeckMeta}>24 slides · Uploaded 2 min ago</p>
                </div>
                <span className={styles.mockScore}>87</span>
              </div>

              <div className={styles.mockBars}>
                {MOCK_SCORES.map(item => (
                  <div key={item.label} className={styles.mockBarRow}>
                    <div className={styles.mockBarLabels}>
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className={styles.mockBarTrack}>
                      <div
                        className={styles.mockBarFill}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.mockTags}>
                {['SaaS', 'Series A', 'FinTech', 'B2B'].map(tag => (
                  <span key={tag} className={styles.mockTag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className={styles.floatPill}>
              <span className={styles.floatDot} />
              <span>Analysis complete in 8s</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────── */}
      <StatsBar />

      {/* ── Info ────────────────────────────────────────── */}
      <section className="section">
        <div className={`container ${styles.infoGrid}`}>
          <div className={styles.infoText}>
            <span className={styles.sectionLabel}>What we do</span>
            <h3>Simplifying Pitchdeck Analysis</h3>
            <p>ptchdeck helps VCs quickly review and compare multiple pitch decks, saving time and effort. Stay tuned — our platform launches soon!</p>
          </div>
          <div className={styles.infoImg}>
            <img
              src="https://images.unsplash.com/photo-1571677246347-5040036b95cc?auto=format&fit=crop&w=562&h=480"
              alt="Pitch deck analysis"
            />
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────── */}
      <section className={`section ${styles.featuresSection}`}>
        <div className="container">
          <div className={styles.featuresHeader}>
            <span className={styles.sectionLabel}>Features</span>
            <h3>Everything you need to evaluate deals faster</h3>
            <p>Review multiple pitch decks in one place, powered by AI.</p>
          </div>
          <div className={styles.featureCards}>
            <div className={styles.featureCard}>
              <img
                src="https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?auto=format&fit=crop&w=606&h=344"
                alt="Smart Insights"
              />
              <div className={styles.featureCardBody}>
                <h4>Smart Insights</h4>
                <p>Get AI-powered summaries highlighting key points from every pitch deck you upload.</p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <img
                src="https://images.unsplash.com/photo-1693106603487-3601a8e4fef0?auto=format&fit=crop&w=606&h=344"
                alt="Easy Comparison"
              />
              <div className={styles.featureCardBody}>
                <h4>Easy Comparison</h4>
                <p>Effortlessly compare multiple startups side-by-side to spot promising opportunities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
