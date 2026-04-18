import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useAuth } from '../../context/AuthContext'
import { ROUTES } from '../../config/routes'
import { apiGetMe } from '../../services/authApi'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading, emailVerified, session, setSession } = useAuth()

  useEffect(() => {
    if (user && emailVerified && !session) {
      user.getIdToken().then(token => {
        apiGetMe(token)
          .then(data => setSession(data))
          .catch(() => {
            signOut(auth)
          })
      })
    }
  }, [user, emailVerified, session, setSession])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f8f9fa',
        color: '#6366f1',
        fontSize: '1rem',
        fontFamily: 'Inter, sans-serif',
      }}>
        Loading...
      </div>
    )
  }

  if (!user) return <Navigate to={`${ROUTES.AUTH}?mode=login`} replace />

  if (!emailVerified) return <Navigate to={`${ROUTES.AUTH}?mode=verify`} replace />

  // Show loading while session is being fetched for the first time
  if (!session) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f8f9fa',
        color: '#6366f1',
        fontSize: '1rem',
        fontFamily: 'Inter, sans-serif',
      }}>
        Loading...
      </div>
    )
  }

  return children
}
