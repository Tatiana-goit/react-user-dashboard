import { RefreshCw, Hexagon, Grid2X2, Check, BellDot } from 'lucide-react'
import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <span className={styles.breadcrumbLabel}>Candidates</span>
        {/* Action buttons are decorative — would require routing and backend integration (sync, stage config, notifications) */}
        <div className={styles.actions}>
          <button className={styles.actionBtn} aria-label="Sync"><RefreshCw size={15} /></button>
          <button className={styles.actionBtn} aria-label="Stages"><Hexagon size={15} /></button>
          <button className={styles.actionBtn} aria-label="Grid"><Grid2X2 size={15} /></button>
          <button className={styles.actionBtn} aria-label="Approve"><Check size={15} /></button>
          <button className={styles.actionBtn} aria-label="Notifications"><BellDot size={15} /></button>
        </div>
      </div>

      <div className={styles.titleRow}>
        <span className={styles.titleText}>Candidates</span>
        {/* Count hardcoded — Header lives in AppLayout, outside CandidatesPage where the real total is available */}
        <span className={styles.titleBadge}>20</span>
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
