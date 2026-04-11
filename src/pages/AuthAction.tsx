import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { confirmPasswordReset, applyActionCode } from 'firebase/auth'
import { auth } from '../config/firebase'
import { ROUTES } from '../config/routes'
import { COMPANY } from '../config/company'
import styles from './AuthAction.module.css'

export default function AuthAction() {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode') || ''

  // Reset password state
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  // Email verify state (auto-runs on mount)
  const [verifyStatus, setVerifyStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (mode === 'verifyEmail' && oobCode) {
      applyActionCode(auth, oobCode)
        .then(() => auth.currentUser?.reload())
        .then(() => setVerifyStatus('success'))
        .catch(() => setVerifyStatus('error'))
    }
  }, [mode, oobCode])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (newPassword.length < 6) { setError('Password must be at least 6 characters.'); return }
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
                    <input
                      type="password"
                      required
                      placeholder="Min. 6 characters"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Confirm password</label>
                    <input
                      type="password"
                      required
                      placeholder="Repeat password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className={styles.input}
                    />
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
                <Link to={ROUTES.DASHBOARD} className={styles.btn}>Go to Dashboard</Link>
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
