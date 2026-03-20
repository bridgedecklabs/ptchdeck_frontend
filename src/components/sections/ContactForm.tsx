import { useContactForm } from '../../hooks/useContactForm'
import { COMPANY } from '../../config/company'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const { formData, status, handleChange, handleSubmit } = useContactForm()

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Your Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Smith"
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Email Address *</label>
        <input
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Message *</label>
        <textarea
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us what's on your mind..."
          rows={5}
          className={styles.textarea}
        />
      </div>
      <button type="submit" disabled={status === 'loading'} className={styles.submitBtn}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' && (
        <p className={styles.success}>Message sent! We'll get back to you soon.</p>
      )}
      {status === 'error' && (
        <p className={styles.error}>Something went wrong. Please email us directly at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
      )}
      <p className={styles.subtext}>Questions or feedback? We'd love to hear from you.</p>
    </form>
  )
}
