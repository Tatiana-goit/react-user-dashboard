import { Search, List, LayoutGrid, Plus } from 'lucide-react'
import type { ViewMode } from '../../../types/candidate'
import styles from './Toolbar.module.scss'

interface ToolbarProps {
  viewMode: ViewMode
  onViewChange: (mode: ViewMode) => void
}

export function Toolbar({ viewMode, onViewChange }: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <span className={styles.search}>
        <Search size={18} strokeWidth={2} />
      </span>

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

      <div className={styles.right}>
        <button
          className={`${styles.iconBtn} ${viewMode === 'list' ? styles.iconBtnActive : ''}`}
          type="button"
          onClick={() => onViewChange('list')}
          aria-label="List view"
        >
          <List size={16} strokeWidth={2} />
        </button>
        <button
          className={`${styles.iconBtn} ${viewMode === 'grid' ? styles.iconBtnActive : ''}`}
          type="button"
          onClick={() => onViewChange('grid')}
          aria-label="Grid view"
        >
          <LayoutGrid size={16} strokeWidth={2} />
        </button>
        <button className={styles.iconBtn} type="button" aria-label="Add candidate">
          <Plus size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
