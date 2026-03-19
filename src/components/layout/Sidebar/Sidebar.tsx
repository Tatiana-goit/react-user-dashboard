import styles from './Sidebar.module.scss'

// Sidebar is not implemented — navigation structure is out of scope for this exercise
export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.icon} />
        <div className={`${styles.icon} ${styles.iconAdd}`} />
      </div>

      <nav className={styles.nav}>
        <div className={styles.icon} />
        <div className={styles.icon} />
        <div className={styles.icon} />
        <div className={styles.icon} />
        <div className={styles.icon} />
        <div className={styles.icon} />
        <div className={styles.icon} />
      </nav>

      <div className={styles.bottom}>
        <div className={styles.icon} />
        <div className={styles.icon} />
        <div className={styles.icon} />
      </div>
    </aside>
  )
}
