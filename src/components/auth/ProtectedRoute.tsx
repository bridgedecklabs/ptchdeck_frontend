import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ROUTES } from '../../config/routes'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth()

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

  if (!user) return <Navigate to={ROUTES.AUTH} replace />

  return children
}
