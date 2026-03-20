import { Link } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.desc}>The page you're looking for doesn't exist.</p>
        <Link to={ROUTES.HOME} className={styles.homeLink}>Go Home</Link>
      </div>
    </div>
  )
}
