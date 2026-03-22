import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ROUTES } from '../../config/routes'

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const { user, loading, emailVerified } = useAuth()

  if (loading) return null

  if (user && emailVerified) return <Navigate to={ROUTES.DASHBOARD} replace />

  return children
}
