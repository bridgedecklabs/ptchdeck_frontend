import { Link } from 'react-router-dom'
import { COMPANY } from '../../config/company'
import { FOOTER_LINKS } from '../../data/landingPage'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandRow}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect width="32" height="32" rx="7" fill="#6366f1"/>
              <rect x="9" y="8" width="10" height="2.5" rx="1.2" fill="white"/>
              <rect x="9" y="12.5" width="14" height="2.5" rx="1.2" fill="white"/>
              <rect x="9" y="17" width="12" height="2.5" rx="1.2" fill="white"/>
              <rect x="9" y="21.5" width="8" height="2.5" rx="1.2" fill="white"/>
            </svg>
            <span className={styles.brandName}>{COMPANY.name}</span>
          </div>
          <p className={styles.brandDesc}>AI-powered pitch deck analysis for VCs, accelerators, and incubators.</p>
          <a href={`mailto:${COMPANY.email}`} className={styles.brandEmail}>{COMPANY.email}</a>
        </div>

        {/* Product */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Product</h4>
          <nav className={styles.colNav}>
            {FOOTER_LINKS.product.map((link) => (
              <Link key={link.label} to={link.href}>{link.label}</Link>
            ))}
          </nav>
        </div>

        {/* Resources */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Resources</h4>
          <nav className={styles.colNav}>
            {FOOTER_LINKS.resources.map((link) => (
              <Link key={link.label} to={link.href}>{link.label}</Link>
            ))}
          </nav>
        </div>

        {/* Legal */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Legal</h4>
          <nav className={styles.colNav}>
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.label} to={link.href}>{link.label}</Link>
            ))}
          </nav>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>{COMPANY.copyright}</p>
        <div className={styles.socials}>
          <a href="https://twitter.com/ptchdeck" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Twitter/X">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.34 2.25h7.027l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
          </a>
          <a href="https://linkedin.com/company/ptchdeck" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="LinkedIn">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
