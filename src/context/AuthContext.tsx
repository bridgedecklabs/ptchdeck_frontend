import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'
import { getMe, AuthProfile } from '../services/api'

interface AuthContextType {
  user: User | null
  profile: AuthProfile | null
  loading: boolean
  emailVerified: boolean
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  emailVerified: false,
  refreshProfile: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<AuthProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (u: User) => {
    try {
      const token = await u.getIdToken()
      const data = await getMe(token)
      setProfile(data)
    } catch {
      setProfile(null)
    }
  }, [])

  const refreshProfile = useCallback(async () => {
    if (user && user.emailVerified) {
      await loadProfile(user)
    }
  }, [user, loadProfile])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u && u.emailVerified) {
        await loadProfile(u)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })
    return unsub
  }, [loadProfile])

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      emailVerified: user?.emailVerified ?? false,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
