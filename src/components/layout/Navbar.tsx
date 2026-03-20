import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import { COMPANY } from '../../config/company'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="7" fill="#6366f1"/>
            <rect x="9" y="8" width="10" height="2.5" rx="1.2" fill="white"/>
            <rect x="9" y="12.5" width="14" height="2.5" rx="1.2" fill="white"/>
            <rect x="9" y="17" width="12" height="2.5" rx="1.2" fill="white"/>
            <rect x="9" y="21.5" width="8" height="2.5" rx="1.2" fill="white"/>
          </svg>
          {COMPANY.name}
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          <NavLink to={ROUTES.HOME} className={({ isActive }) => isActive ? styles.active : ''} end>Home</NavLink>
          <NavLink to={ROUTES.EXPLAINER} className={({ isActive }) => isActive ? styles.active : ''}>Explainer</NavLink>
          <NavLink to={ROUTES.FEATURES} className={({ isActive }) => isActive ? styles.active : ''}>Features</NavLink>
          <NavLink to={ROUTES.CONTACT} className={({ isActive }) => isActive ? styles.active : ''}>Contact</NavLink>
          <Link to={ROUTES.COMING_SOON} className={styles.ctaBtn}>Try it Free</Link>
        </div>
      </div>
    </nav>
  )
}
