import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'

interface AuthContextType {
  user: User | null
  loading: boolean
  emailVerified: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, emailVerified: false })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, emailVerified: user?.emailVerified ?? false }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
