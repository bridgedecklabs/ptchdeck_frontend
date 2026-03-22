import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import { HERO } from '../data/landingPage'
import SEO from '../components/seo/SEO'
import StatsBar from '../components/sections/StatsBar'
import ProblemSolution from '../components/sections/ProblemSolution'
import HowItWorks from '../components/sections/HowItWorks'
import FeaturesGrid from '../components/sections/FeaturesGrid'
import WhoItsFor from '../components/sections/WhoItsFor'
import FAQSection from '../components/sections/FAQSection'
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
  const [scoreDisplay, setScoreDisplay] = useState(0)
  const [barsAnimated, setBarsAnimated] = useState(false)
  const navigate = useNavigate()
  const heroRef = useRef<HTMLDivElement>(null)

  // Animate score counter 0 → 87 on mount
  useEffect(() => {
    const target = 87
    const duration = 800
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setScoreDisplay(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }

    const frame = requestAnimationFrame(tick)
    // Trigger bar animations with a small delay
    const timer = setTimeout(() => setBarsAnimated(true), 100)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [])

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!heroEmail.trim()) return
    navigate(`${ROUTES.AUTH}?email=${encodeURIComponent(heroEmail)}&mode=signup`)
  }

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <SEO
        title="AI Pitch Deck Analysis for VCs"
        description="PtchDeck helps VCs, accelerators, and incubators instantly review, score, and compare startup pitch decks using AI. Upload a PDF — get a score in under 10 seconds."
        url="https://ptchdeck.com"
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={styles.hero} ref={heroRef}>
        <div className={`container ${styles.heroInner}`}>

          {/* Left */}
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle}>
              AI-Powered Pitch Deck<br />
              <span className={styles.heroAccent}>Analysis for VCs</span>
            </h1>
            <p className={styles.heroSub}>{HERO.subheading}</p>

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
                  {HERO.cta1}
                </button>
                <button onClick={scrollToHowItWorks} className={styles.btnOutline}>
                  {HERO.cta2}
                </button>
              </div>
            )}
          </div>

          {/* Right — animated mock card */}
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
                <span className={styles.mockScore}>{scoreDisplay}</span>
              </div>

              <div className={styles.mockBars}>
                {MOCK_SCORES.map((item, i) => (
                  <div key={item.label} className={styles.mockBarRow}>
                    <div className={styles.mockBarLabels}>
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className={styles.mockBarTrack}>
                      <div
                        className={styles.mockBarFill}
                        style={{
                          width: barsAnimated ? `${item.value}%` : '0%',
                          transitionDelay: `${i * 150}ms`,
                        }}
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

      {/* ── Problem → Solution ──────────────────────────── */}
      <ProblemSolution />

      {/* ── How It Works ────────────────────────────────── */}
      <HowItWorks id="how-it-works" />

      {/* ── Features Grid ───────────────────────────────── */}
      <FeaturesGrid />

      {/* ── Who It's For ────────────────────────────────── */}
      <WhoItsFor />

      {/* ── FAQ ─────────────────────────────────────────── */}
      <FAQSection />

      {/* ── Bottom CTA ──────────────────────────────────── */}
      <CTASection />
    </>
  )
}
