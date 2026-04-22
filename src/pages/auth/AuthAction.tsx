import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { confirmPasswordReset, applyActionCode } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { ROUTES } from '../../config/routes'
import { COMPANY } from '../../config/company'
import { useAuth } from '../../context/AuthContext'
import { apiGetMe } from '../../services/authApi'
import PasswordStrength, { isPasswordValid, PASSWORD_ERROR } from '../../components/auth/PasswordStrength'
import styles from './AuthAction.module.css'

export default function AuthAction() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setSession } = useAuth()

  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode') || ''

  // Reset password state
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  // Email verify state (auto-runs on mount)
  const [verifyStatus, setVerifyStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const hasApplied = useRef(false)

  useEffect(() => {
    if (mode === 'verifyEmail' && oobCode) {
      if (hasApplied.current) return
      hasApplied.current = true
      applyActionCode(auth, oobCode)
        .then(async () => {
          await auth.currentUser?.reload()

          // Same browser — user is still logged in and now verified
          if (auth.currentUser?.emailVerified) {
            try {
              const token = await auth.currentUser.getIdToken()
              const data = await apiGetMe(token)
              setSession(data)
              navigate(ROUTES.DASHBOARD, { replace: true })
              return
            } catch {
              // 404 = user verified but not yet registered in backend
              // Send to login to complete registration (company step)
              navigate(`${ROUTES.AUTH}?mode=login`, { replace: true })
              return
            }
          }

          // Cross-device verification — show success screen with manual login link
          setVerifyStatus('success')
        })
        .catch(() => setVerifyStatus('error'))
    }
  }, [mode, oobCode, navigate, setSession])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!isPasswordValid(newPassword)) { setError(PASSWORD_ERROR); return }
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return }
    setSubmitting(true)
    try {
      await confirmPasswordReset(auth, oobCode, newPassword)
      setDone(true)
    } catch {
      setError('This link has expired or already been used. Request a new reset email.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo */}
        <Link to={ROUTES.HOME} className={styles.logo}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="7" fill="#6366f1"/>
            <rect x="9" y="8" width="10" height="2.5" rx="1.2" fill="white"/>
            <rect x="9" y="12.5" width="14" height="2.5" rx="1.2" fill="white"/>
            <rect x="9" y="17" width="12" height="2.5" rx="1.2" fill="white"/>
            <rect x="9" y="21.5" width="8" height="2.5" rx="1.2" fill="white"/>
          </svg>
          <span>{COMPANY.name}</span>
        </Link>

        {/* ── RESET PASSWORD ───────────────────────────── */}
        {mode === 'resetPassword' && (
          <>
            {done ? (
              <div className={styles.result}>
                <div className={styles.successIcon}>✓</div>
                <h1 className={styles.heading}>Password reset!</h1>
                <p className={styles.sub}>You can now log in with your new password.</p>
                <Link to={`${ROUTES.AUTH}?mode=login`} className={styles.btn}>Go to Login</Link>
              </div>
            ) : (
              <>
                <h1 className={styles.heading}>Set new password</h1>
                <p className={styles.sub}>Enter a new password for your account.</p>
                <form onSubmit={handleReset} className={styles.form}>
                  <div className={styles.field}>
                    <label className={styles.label}>New password</label>
                    <div className={styles.passwordWrap}>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        placeholder="Min. 8 characters"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className={styles.input}
                      />
                      <button
                        type="button"
                        className={styles.eyeBtn}
                        onClick={() => setShowNewPassword(v => !v)}
                        aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                      >
                        {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                    <PasswordStrength password={newPassword} />
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
                      <button
                        type="button"
                        className={styles.eyeBtn}
                        onClick={() => setShowConfirmPassword(v => !v)}
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>
                  {error && <p className={styles.error}>{error}</p>}
                  <button type="submit" disabled={submitting} className={styles.btn}>
                    {submitting ? 'Resetting…' : 'Reset Password'}
                  </button>
                </form>
              </>
            )}
          </>
        )}

        {/* ── VERIFY EMAIL ─────────────────────────────── */}
        {mode === 'verifyEmail' && (
          <>
            {verifyStatus === 'loading' && (
              <p className={styles.sub}>Verifying your email…</p>
            )}
            {verifyStatus === 'success' && (
              <div className={styles.result}>
                <div className={styles.successIcon}>✓</div>
                <h1 className={styles.heading}>Email verified!</h1>
                <p className={styles.sub}>Your email is confirmed. You can now log in.</p>
                <Link to={`${ROUTES.AUTH}?mode=login`} className={styles.btn}>Go to Login</Link>
              </div>
            )}
            {verifyStatus === 'error' && (
              <div className={styles.result}>
                <div className={styles.errorIcon}>✕</div>
                <h1 className={styles.heading}>Link expired</h1>
                <p className={styles.sub}>This verification link has expired or was already used.</p>
                <Link to={`${ROUTES.AUTH}?mode=login`} className={styles.btn}>Go to Login</Link>
              </div>
            )}
          </>
        )}

        {/* ── UNKNOWN MODE ─────────────────────────────── */}
        {mode !== 'resetPassword' && mode !== 'verifyEmail' && (
          <div className={styles.result}>
            <h1 className={styles.heading}>Invalid link</h1>
            <p className={styles.sub}>This link is not valid. Please try again.</p>
            <Link to={ROUTES.HOME} className={styles.btn}>Go Home</Link>
          </div>
        )}
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
