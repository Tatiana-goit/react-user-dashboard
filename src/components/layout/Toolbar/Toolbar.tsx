import { Search, List, LayoutGrid, Plus } from 'lucide-react'
import styles from './Toolbar.module.scss'

export function Toolbar() {
  return (
    <div className={styles.toolbar}>
      {/* Left: search icon */}
      <span className={styles.search}>
        <Search size={18} strokeWidth={2} />
      </span>

      {/* Center: Active / Archived status tabs */}
      <div className={styles.statusTabs}>
        <div className={`${styles.statusTab} ${styles.statusTabActive}`}>
          <span className={styles.statusTabText}>Active</span>
          <span className={styles.statusTabCount}>8</span>
        </div>
        <div className={styles.statusTab}>
          <span className={styles.statusTabText}>Archived</span>
          <span className={styles.statusTabCount}>8</span>
        </div>
      </div>

      {/* Right: list / grid / add — each as a separate button */}
      <div className={styles.right}>
        <button className={styles.iconBtn} type="button">
          <List size={16} strokeWidth={2} />
        </button>
        <button className={`${styles.iconBtn} ${styles.iconBtnActive}`} type="button">
          <LayoutGrid size={16} strokeWidth={2} />
        </button>
        <button className={styles.iconBtn} type="button">
          <Plus size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
