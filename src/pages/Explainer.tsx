import Badge from '../components/ui/Badge'
import CTASection from '../components/sections/CTASection'
import styles from './Explainer.module.css'

export default function Explainer() {
  const steps = [
    { title: 'Upload Fast', desc: 'Drag and drop decks in seconds', img: 'https://images.unsplash.com/photo-1571677246347-5040036b95cc?auto=format&fit=crop&w=503&h=360' },
    { title: 'Analyze AI', desc: 'Instant insights from decks', img: 'https://images.unsplash.com/photo-1678995635432-d9e89c7a8fc5?auto=format&fit=crop&w=503&h=360' },
    { title: 'Organize Easy', desc: 'Keep decks neatly sorted', img: 'https://images.unsplash.com/photo-1693501063463-c4efd7afa14e?auto=format&fit=crop&w=503&h=360' },
    { title: 'Launch Soon', desc: 'ptchdeck is almost here', img: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&w=503&h=360' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="section">
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <Badge>Coming Soon</Badge>
            <h3>Simplifying Pitch Analysis</h3>
            <p>ptchdeck helps VCs effortlessly organize and analyze multiple pitch decks with AI-powered insights.</p>
          </div>
          <div className={styles.heroImages}>
            <img
              src="https://images.unsplash.com/photo-1688733718722-27b7027a0f5b?auto=format&fit=crop&w=612&h=464"
              alt="Explainer main"
              className={styles.heroImgMain}
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className={`section ${styles.missionSection}`}>
        <div className="container text-center">
          <h1>Our Mission</h1>
          <p className={styles.missionText}>To ease the busy lives of VCs by transforming complex pitch review into quick, clear decisions.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-2xl)' }}>
            <h3>How it works</h3>
            <p>ptchdeck simplifies VC pitchdeck analysis effortlessly</p>
          </div>
          <div className={styles.stepsGrid}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <img src={step.img} alt={step.title} />
                <div className={styles.stepBody}>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
