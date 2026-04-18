import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider } from '../../config/firebase'
import { useAuth } from '../../context/AuthContext'
import { ROUTES } from '../../config/routes'
import { COMPANY } from '../../config/company'
import { apiAcceptInvite, apiGetInviteInfo } from '../../services/authApi'
import styles from './AuthPage.module.css'

function getFirebaseError(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use': return 'This email is already registered. Try logging in instead.'
    case 'auth/weak-password': return 'Password must be at least 6 characters.'
    case 'auth/popup-closed-by-user': return ''
    default: return 'Something went wrong. Please try again.'
  }
}

export default function InviteAcceptPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setSession } = useAuth()

  const inviteToken = searchParams.get('token') || ''

  const [inviteEmail, setInviteEmail] = useState('')
  const [firmName, setFirmName] = useState('')
  const [infoLoading, setInfoLoading] = useState(true)
  const [infoError, setInfoError] = useState('')

  // Email form fields
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!inviteToken) {
      setInfoError('Invalid invite link.')
      setInfoLoading(false)
      return
    }
    apiGetInviteInfo(inviteToken)
      .then(info => {
        setInviteEmail(info.email)
        setFirmName(info.firm_name)
      })
      .catch(err => {
        setInfoError((err as Error).message || 'This invite link is invalid or has expired.')
      })
      .finally(() => setInfoLoading(false))
  }, [inviteToken])

  const handleGoogle = async () => {
    setError('')
    setSubmitting(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const data = await apiAcceptInvite({
        token: inviteToken,
        firebase_uid: result.user.uid,
        full_name: result.user.displayName || '',
      })
      setSession(data)
      navigate(ROUTES.DASHBOARD, { replace: true })
    } catch (err: unknown) {
      const code = (err as { code?: string }).code || ''
      const msg = getFirebaseError(code)
      if (msg) setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!fullName.trim()) { setError('Please enter your full name.'); return }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setSubmitting(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, inviteEmail, password)
      await updateProfile(cred.user, { displayName: fullName.trim() })
      const data = await apiAcceptInvite({
        token: inviteToken,
        firebase_uid: cred.user.uid,
        full_name: fullName.trim(),
      })
      setSession(data)
      navigate(ROUTES.DASHBOARD, { replace: true })
    } catch (err: unknown) {
      const code = (err as { code?: string }).code || ''
      const msg = code ? getFirebaseError(code) : (err as Error).message || 'Something went wrong.'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  if (infoLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f8f9fa',
        color: '#6366f1',
        fontFamily: 'Inter, sans-serif',
        gap: '0.5rem',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }} aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        <span>Loading invite…</span>
      </div>
    )
  }

  if (infoError) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f8f9fa',
        fontFamily: 'Inter, sans-serif',
        gap: '1rem',
      }}>
        <p style={{ color: '#ef4444', fontSize: '1rem' }}>{infoError}</p>
        <Link to={ROUTES.HOME} style={{ color: '#6366f1', textDecoration: 'underline' }}>
          Go to homepage
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>

      {/* ── LEFT PANEL ── */}
      <div className={styles.leftPanel}>
        <Link to={ROUTES.HOME} className={styles.panelLogo}>
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="7" fill="rgba(255,255,255,0.15)"/>
            <rect x="9" y="8" width="10" height="2.5" rx="1.2" fill="white"/>
            <rect x="9" y="12.5" width="14" height="2.5" rx="1.2" fill="white"/>
            <rect x="9" y="17" width="12" height="2.5" rx="1.2" fill="white"/>
            <rect x="9" y="21.5" width="8" height="2.5" rx="1.2" fill="white"/>
          </svg>
          <span>{COMPANY.name}</span>
        </Link>

        <div className={styles.panelBody}>
          <h2 className={styles.panelHeading}>
            You've been invited to join {COMPANY.name}
          </h2>
          {firmName && (
            <p className={styles.panelSub}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.4rem' }} aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              {firmName}
            </p>
          )}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className={styles.rightPanel}>
        <div className={styles.formArea}>

          {/* Mobile logo */}
          <Link to={ROUTES.HOME} className={styles.mobileLogo}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="7" fill="#6366f1"/>
              <rect x="9" y="8" width="10" height="2.5" rx="1.2" fill="white"/>
              <rect x="9" y="12.5" width="14" height="2.5" rx="1.2" fill="white"/>
              <rect x="9" y="17" width="12" height="2.5" rx="1.2" fill="white"/>
              <rect x="9" y="21.5" width="8" height="2.5" rx="1.2" fill="white"/>
            </svg>
            <span>{COMPANY.name}</span>
          </Link>

          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Accept your invite</h2>
            <p className={styles.formSubtitle}>
              Creating account for <strong>{inviteEmail}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={submitting}
            className={styles.googleBtn}
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

          <div className={styles.divider}><span>or set a password</span></div>

          <form onSubmit={handleEmailSubmit} className={styles.form}>
            {error && <div className={styles.errorBanner}>{error}</div>}

            <div className={styles.field}>
              <label className={styles.label}>Full name</label>
              <input
                type="text"
                required
                placeholder="Alex Johnson"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className={styles.input}
                autoFocus
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <div className={styles.passwordWrap}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Confirm password</label>
              <div className={styles.passwordWrap}>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowConfirm(v => !v)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={submitting} className={styles.btnPrimary}>
              {submitting ? 'Setting up…' : 'Create Account'}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
    </svg>
  )
}
