import styles from './Header.module.scss'

interface HeaderProps {
  count?: number
}

export function Header({ count }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <span className={styles.breadcrumbLabel}>Candidates</span>
        {/* Action buttons — placeholder icons, not implemented */}
        <div className={styles.actions}>
          <div className={styles.actionBtn} />
          <div className={styles.actionBtn} />
          <div className={styles.actionBtn} />
          <div className={styles.actionBtn} />
          <div className={styles.actionBtn} />
        </div>
      </div>

      <div className={styles.titleRow}>
        <span className={styles.titleText}>Candidates</span>
        {count !== undefined && (
          <span className={styles.titleBadge}>{count}</span>
        )}
      </div>

      {/* Job and Talentpools tabs not implemented — no data available for those views */}
      <nav className={styles.nav}>
        <span className={styles.navItem}>Job</span>
        <span className={`${styles.navItem} ${styles.navItemActive}`}>Candidates</span>
        <span className={styles.navItem}>Talentpools</span>
      </nav>
    </header>
  )
}
