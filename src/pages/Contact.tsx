import ContactForm from '../components/sections/ContactForm'
import CTASection from '../components/sections/CTASection'
import { COMPANY } from '../config/company'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <>
      {/* Contact Form + Image */}
      <section className="section">
        <div className={`container ${styles.contactGrid}`}>
          <div>
            <h1 className={styles.title}>Get in Touch</h1>
            <ContactForm />
          </div>
          <div className={styles.contactImg}>
            <img
              src="https://images.unsplash.com/photo-1632910088125-e85bec44bb0e?auto=format&fit=crop&w=503&h=384"
              alt="Contact"
            />
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="section">
        <div className={`container ${styles.welcomeGrid}`}>
          <div className={styles.welcomeText}>
            <h3>Welcome to {COMPANY.name}</h3>
            <p>We simplify how VCs analyze multiple pitch decks with AI-powered insights.</p>
          </div>
          <div className={styles.welcomeImages}>
            <img
              src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?auto=format&fit=crop&w=612&h=464"
              alt="Welcome"
              className={styles.welcomeImgMain}
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={`section ${styles.howSection}`}>
        <div className="container text-center">
          <h3>How it works</h3>
          <p className={styles.howText}>Our AI quickly scans decks, highlights key points, and helps you make faster decisions.</p>
        </div>
      </section>

      <CTASection />
    </>
  )
}
