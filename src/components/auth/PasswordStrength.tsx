import { Check, X } from 'lucide-react'

export const PASSWORD_ERROR = 'Password does not meet requirements.'

const RULES = [
  { key: 'minLength', label: 'Minimum 8 characters',              test: (p: string) => p.length >= 8 },
  { key: 'upper',     label: 'At least 1 uppercase letter',       test: (p: string) => /[A-Z]/.test(p) },
  { key: 'lower',     label: 'At least 1 lowercase letter',       test: (p: string) => /[a-z]/.test(p) },
  { key: 'number',    label: 'At least 1 number',                 test: (p: string) => /[0-9]/.test(p) },
  { key: 'special',   label: 'At least 1 special character (!@#$%^&*)', test: (p: string) => /[!@#$%^&*]/.test(p) },
]

export function isPasswordValid(password: string): boolean {
  return RULES.every(r => r.test(password))
}

// Strength bar — shown while typing
export default function PasswordStrength({ password }: { password: string }) {
  if (!password) return null

  const s = RULES.filter(r => r.test(password)).length
  const color = s < 3 ? '#ef4444' : s < 5 ? '#f59e0b' : '#22c55e'
  const label = s < 3 ? 'Weak' : s < 5 ? 'Medium' : 'Strong'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
      <div style={{ display: 'flex', gap: '3px', flex: 1 }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            style={{
              height: '3px',
              flex: 1,
              borderRadius: '2px',
              background: i <= s ? color : '#e5e7eb',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: '0.75rem', color, fontWeight: 500, minWidth: '3rem', textAlign: 'right' }}>
        {label}
      </span>
    </div>
  )
}

// Rules checklist — hint text when empty, live ✓/✗ checklist when typing
export function PasswordRules({ password }: { password: string }) {
  if (!password) {
    return (
      <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '0.4rem 0 0', lineHeight: 1.5 }}>
        Password must be at least 8 characters, include one uppercase letter, one number, and one special character (!@#$%).
      </p>
    )
  }

  return (
    <ul style={{ listStyle: 'none', margin: '0.5rem 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {RULES.map(r => {
        const met = r.test(password)
        return (
          <li
            key={r.key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              color: met ? '#16a34a' : '#ef4444',
              transition: 'color 0.15s',
            }}
          >
            {met
              ? <Check size={13} strokeWidth={2.5} />
              : <X size={13} strokeWidth={2.5} />
            }
            {r.label}
          </li>
        )
      })}
    </ul>
  )
}
