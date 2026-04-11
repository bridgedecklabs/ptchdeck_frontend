import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider } from '../../config/firebase'
import { useAuth } from '../../context/AuthContext'
import { ROUTES } from '../../config/routes'
import { COMPANY } from '../../config/company'
import styles from './AuthPage.module.css'

type View = 'signup' | 'login' | 'forgot' | 'verify'

function getFirebaseError(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use': return 'This email is already registered. Try logging in.'
    case 'auth/invalid-email': return 'Please enter a valid email address.'
    case 'auth/weak-password': return 'Password must be at least 6 characters.'
    case 'auth/user-not-found': return 'No account found with this email.'
    case 'auth/wrong-password': return 'Incorrect password. Try again or reset it.'
    case 'auth/invalid-credential': return 'Incorrect email or password.'
    case 'auth/too-many-requests': return 'Too many attempts. Please try again later.'
    case 'auth/popup-closed-by-user': return ''
    default: return 'Something went wrong. Please try again.'
  }
}

export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  const emailParam = searchParams.get('email') || ''
  const modeParam = (searchParams.get('mode') as View) || 'signup'

  const [view, setView] = useState<View>(modeParam)

  // Signup fields
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState(emailParam)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Login fields
  const [loginEmail, setLoginEmail] = useState(emailParam)
  const [loginPassword, setLoginPassword] = useState('')

  // Forgot
  const [forgotEmail, setForgotEmail] = useState(emailParam)
  const [forgotSent, setForgotSent] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showLoginPassword, setShowLoginPassword] = useState(false)

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user) navigate(ROUTES.DASHBOARD, { replace: true })
  }, [user, loading, navigate])

  const switchView = (v: View) => { setError(''); setView(v) }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) { setError('Please enter your name.'); return }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setSubmitting(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(cred.user, { displayName: name.trim() })
      if (company.trim()) localStorage.setItem('ptchdeck_company', company.trim())
      await sendEmailVerification(cred.user)
      setView('verify')
    } catch (err: unknown) {
      setError(getFirebaseError((err as { code?: string }).code || ''))
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      if (!cred.user.emailVerified) {
        await signOut(auth)
        switchView('verify')
        return
      }
      navigate(ROUTES.DASHBOARD, { replace: true })
    } catch (err: unknown) {
      setError(getFirebaseError((err as { code?: string }).code || ''))
    } finally {
      setSubmitting(false)
    }
  }

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await sendPasswordResetEmail(auth, forgotEmail)
      setForgotSent(true)
    } catch (err: unknown) {
      setError(getFirebaseError((err as { code?: string }).code || ''))
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setSubmitting(true)
    try {
      await signInWithPopup(auth, googleProvider)
      navigate(ROUTES.DASHBOARD, { replace: true })
    } catch (err: unknown) {
      const msg = getFirebaseError((err as { code?: string }).code || '')
      if (msg) setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return null

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
            The smarter way to analyse pitch decks
          </h2>
          <p className={styles.panelSub}>
            Built for modern VC teams who move fast and need clarity.
          </p>

          <ul className={styles.panelFeatures}>
            <li>
              <span className={styles.featureCheck}>✓</span>
              AI-powered analysis in seconds
            </li>
            <li>
              <span className={styles.featureCheck}>✓</span>
              Compare multiple decks side-by-side
            </li>
            <li>
              <span className={styles.featureCheck}>✓</span>
              Smart scoring across 10+ dimensions
            </li>
            <li>
              <span className={styles.featureCheck}>✓</span>
              Built for early access members
            </li>
          </ul>
        </div>

      </div>

      {/* ── RIGHT PANEL ── */}
      <div className={styles.rightPanel}>
        <div className={styles.formArea}>

          {/* Mobile logo only */}
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

          {/* ── VERIFY VIEW ── */}
          {view === 'verify' && (
            <div className={styles.verifyBox}>
              <div className={styles.verifyIconWrap}>✉</div>
              <h2 className={styles.formTitle}>Check your inbox</h2>
              <p className={styles.formSubtitle}>
                We sent a verification link to <strong>{email}</strong>.
                Click it to activate your account.
              </p>
              <p className={styles.verifyNote}>
                Didn't receive it?{' '}
                <button
                  className={styles.linkBtn}
                  onClick={async () => {
                    if (auth.currentUser) await sendEmailVerification(auth.currentUser)
                  }}
                >
                  Resend email
                </button>
              </p>
              <button className={styles.btnPrimary} onClick={() => switchView('login')}>
                Go to Login
              </button>
            </div>
          )}

          {/* ── FORGOT VIEW ── */}
          {view === 'forgot' && (
            <>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Reset password</h2>
                <p className={styles.formSubtitle}>We'll send a reset link to your email.</p>
              </div>

              {forgotSent ? (
                <div className={styles.successBanner}>
                  <span>✓</span>
                  <div>
                    <strong>Reset link sent!</strong>
                    <p>Check your inbox and follow the link.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleForgot} className={styles.form}>
                  {error && <div className={styles.errorBanner}>{error}</div>}
                  <div className={styles.field}>
                    <label className={styles.label}>Email address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      className={styles.input}
                    />
                  </div>
                  <button type="submit" disabled={submitting} className={styles.btnPrimary}>
                    {submitting ? 'Sending…' : 'Send Reset Link'}
                  </button>
                </form>
              )}

              <p className={styles.switchText}>
                <button className={styles.linkBtn} onClick={() => switchView('login')}>
                  ← Back to login
                </button>
              </p>
            </>
          )}

          {/* ── SIGNUP VIEW ── */}
          {view === 'signup' && (
            <>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Create your account</h2>
                <p className={styles.formSubtitle}>Start your early access journey</p>
              </div>

              <div className={styles.viewToggle}>
                <button className={styles.toggleBtn} onClick={() => switchView('login')}>Log In</button>
                <button className={`${styles.toggleBtn} ${styles.toggleActive}`}>Sign Up</button>
              </div>

              <button type="button" onClick={handleGoogle} disabled={submitting} className={styles.googleBtn}>
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>

              <div className={styles.divider}><span>or continue with email</span></div>

              <form onSubmit={handleSignup} className={styles.form}>
                {error && <div className={styles.errorBanner}>{error}</div>}

                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label className={styles.label}>Full name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Johnson"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Company <span className={styles.optional}>(optional)</span></label>
                    <input
                      type="text"
                      placeholder="Sequoia Capital"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Email address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.row2}>
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
                      <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Confirm password</label>
                    <div className={styles.passwordWrap}>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="Repeat password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className={styles.input}
                      />
                      <button type="button" className={styles.eyeBtn} onClick={() => setShowConfirmPassword(v => !v)} aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}>
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={submitting} className={styles.btnPrimary}>
                  {submitting ? 'Creating account…' : 'Create Account'}
                </button>
              </form>

              <p className={styles.switchText}>
                Already have an account?{' '}
                <button className={styles.linkBtn} onClick={() => switchView('login')}>Log in</button>
              </p>
            </>
          )}

          {/* ── LOGIN VIEW ── */}
          {view === 'login' && (
            <>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Welcome back</h2>
                <p className={styles.formSubtitle}>Sign in to your {COMPANY.name} account</p>
              </div>

              <div className={styles.viewToggle}>
                <button className={`${styles.toggleBtn} ${styles.toggleActive}`}>Log In</button>
                <button className={styles.toggleBtn} onClick={() => switchView('signup')}>Sign Up</button>
              </div>

              <button type="button" onClick={handleGoogle} disabled={submitting} className={styles.googleBtn}>
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>

              <div className={styles.divider}><span>or continue with email</span></div>

              <form onSubmit={handleLogin} className={styles.form}>
                {error && <div className={styles.errorBanner}>{error}</div>}

                <div className={styles.field}>
                  <label className={styles.label}>Email address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <div className={styles.labelRow}>
                    <label className={styles.label}>Password</label>
                    <button type="button" className={styles.linkBtn} onClick={() => switchView('forgot')}>
                      Forgot Password
                    </button>
                  </div>
                  <div className={styles.passwordWrap}>
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      placeholder="Your password"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      className={styles.input}
                    />
                    <button
                      type="button"
                      className={styles.eyeBtn}
                      onClick={() => setShowLoginPassword(v => !v)}
                      aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                    >
                      {showLoginPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={submitting} className={styles.btnPrimary}>
                  {submitting ? 'Signing in…' : 'Log In'}
                </button>
              </form>

              <p className={styles.switchText}>
                Don't have an account?{' '}
                <button className={styles.linkBtn} onClick={() => switchView('signup')}>Sign up</button>
              </p>
            </>
          )}

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
