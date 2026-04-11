import { createContext, useContext, useState, ReactNode } from 'react'

export type Role = 'Admin' | 'Manager' | 'Analyst'

interface RoleContextType {
  role: Role
  setRole: (r: Role) => void
}

const RoleContext = createContext<RoleContextType>({ role: 'Admin', setRole: () => {} })

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(() => {
    const saved = localStorage.getItem('mock_role')
    return (saved as Role) || 'Admin'
  })

  const handleSetRole = (r: Role) => {
    localStorage.setItem('mock_role', r)
    setRole(r)
  }

  return (
    <RoleContext.Provider value={{ role, setRole: handleSetRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export const useRole = () => useContext(RoleContext)
