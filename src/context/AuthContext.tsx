import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'
import { SessionData, apiGetMe } from '../services/authApi'

export type { SessionData }

interface AuthContextType {
  user: User | null
  loading: boolean
  emailVerified: boolean
  session: SessionData | null
  setSession: (s: SessionData | null) => void
  clearSession: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  emailVerified: false,
  session: null,
  setSession: () => {},
  clearSession: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [session, setSessionState] = useState<SessionData | null>(null)

  const setSession = useCallback((s: SessionData | null) => {
    setSessionState(s)
  }, [])

  const clearSession = useCallback(() => {
    setSessionState(null)
  }, [])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u && u.emailVerified) {
        try {
          const token = await u.getIdToken()
          const data = await apiGetMe(token)
          setSessionState(data)
        } catch {
          // Don't clear session here — let the auth handler set it if needed
          // (e.g. new users who haven't been registered in backend yet)
        }
      } else if (!u) {
        setSessionState(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      emailVerified: user?.emailVerified ?? false,
      session,
      setSession,
      clearSession,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
