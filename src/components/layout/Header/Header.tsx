import styles from './Header.module.scss'

export function Header() {
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
        <span className={styles.titleBadge} />
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
