import { useAppSelector } from '../../../app/hooks'
import { selectAllCandidates } from '../../../features/candidates/store'
import styles from './Header.module.scss'

export function Header() {
  const count = useAppSelector(selectAllCandidates).length
  return (
    <header className={styles.header}>
      {/* Top bar: breadcrumb left, action icons right */}
      <div className={styles.topBar}>
        <span className={styles.breadcrumbLabel}>Candidates</span>
        <div className={styles.actions}>
          <div className={styles.actionBtn} />
          <div className={styles.actionBtn} />
          <div className={styles.actionBtn} />
          <div className={styles.actionBtn} />
          <div className={styles.actionBtn} />
        </div>
      </div>

      {/* Title */}
      <div className={styles.titleRow}>
        <span className={styles.titleText}>Candidates</span>
        {count !== undefined && (
          <span className={styles.titleBadge}>{count}</span>
        )}
      </div>

      {/* Nav tabs */}
      <nav className={styles.nav}>
        <span className={styles.navItem}>Job</span>
        <span className={`${styles.navItem} ${styles.navItemActive}`}>Candidates</span>
        <span className={styles.navItem}>Talentpools</span>
      </nav>
    </header>
  )
}
