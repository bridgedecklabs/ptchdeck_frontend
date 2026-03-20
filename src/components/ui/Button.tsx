import { Link } from 'react-router-dom'
import styles from './Button.module.css'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  children: React.ReactNode
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export default function Button({ variant = 'primary', children, href, onClick, type = 'button', disabled, className }: ButtonProps) {
  const cls = `${styles.btn} ${styles[variant]} ${className || ''}`
  if (href) return <Link to={href} className={cls}>{children}</Link>
  return <button type={type} onClick={onClick} disabled={disabled} className={cls}>{children}</button>
}
