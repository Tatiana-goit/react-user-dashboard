import styles from './Sidebar.module.scss'

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      {/* Top: brand icon + add button */}
      <div className={styles.top}>
        <div className={styles.icon} />
        <div className={`${styles.icon} ${styles.iconAdd}`} />
      </div>

      {/* Middle: navigation icons */}
      <nav className={styles.nav}>
        <div className={styles.icon} />
        <div className={styles.icon} />
         <div className={styles.icon} />
        <div className={styles.icon} />
        <div className={styles.icon} />
        <div className={styles.icon} />
        <div className={styles.icon} />
      </nav>

      {/* Bottom: utility icons, not at the very edge */}
      <div className={styles.bottom}>
        <div className={styles.icon} />
        <div className={styles.icon} />
        <div className={styles.icon} />
      </div>
    </aside>
  )
}
