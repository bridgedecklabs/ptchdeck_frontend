import CTASection from '../components/sections/CTASection'
import styles from './Features.module.css'

export default function Features() {
  const galleryImages = [
    'https://images.unsplash.com/photo-1571677246347-5040036b95cc?auto=format&fit=crop&w=297&h=480',
    'https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?auto=format&fit=crop&w=295&h=480',
    'https://images.unsplash.com/photo-1540612597331-63c67ea382fc?auto=format&fit=crop&w=297&h=480',
    'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&w=297&h=480',
  ]

  return (
    <>
      {/* Hero */}
      <section className="section">
        <div className="container text-center">
          <h1>Pitch Perfect</h1>
          <p className={styles.heroSub}>Simplify how VCs review and compare multiple pitch decks effortlessly.</p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="section">
        <div className="container">
          <div className={styles.featureCards}>
            <div className={styles.featureCard}>
              <img src="https://images.unsplash.com/photo-1686061592689-312bbfb5c055?auto=format&fit=crop&w=606&h=344" alt="Smart Analysis" />
              <div className={styles.featureCardBody}>
                <h3>Smart Analysis</h3>
                <p>AI breaks down decks to highlight key insights instantly.</p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <img src="https://images.unsplash.com/photo-1583268921016-514d0a038478?auto=format&fit=crop&w=606&h=344" alt="Easy Organization" />
              <div className={styles.featureCardBody}>
                <h3>Easy Organization</h3>
                <p>Keep all your pitch decks neatly sorted and ready to review anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section">
        <div className="container">
          <div className={styles.gallery}>
            {galleryImages.map((src, i) => (
              <div key={i} className={styles.galleryItem}>
                <img src={src} alt={`Gallery ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
