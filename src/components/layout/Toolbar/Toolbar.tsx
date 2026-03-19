import { Search, List, LayoutGrid, Plus } from 'lucide-react'
import type { ViewMode } from '../../../types/candidate'
import styles from './Toolbar.module.scss'

interface ToolbarProps {
  viewMode: ViewMode
  onViewChange: (mode: ViewMode) => void
  activeCount: number
}

export function Toolbar({ viewMode, onViewChange, activeCount }: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      {/* Search is out of scope — icon rendered for layout purposes only */}
      <span className={styles.search}>
        <Search size={18} strokeWidth={2} />
      </span>

      <div className={styles.statusTabs}>
        <div className={`${styles.statusTab} ${styles.statusTabActive}`}>
          <span className={styles.statusTabText}>Active</span>
          <span className={styles.statusTabCount}>{activeCount}</span>
        </div>
        {/* Archived filter is out of scope — count hardcoded to 0, no archived data in mock */}
        <div className={styles.statusTab}>
          <span className={styles.statusTabText}>Archived</span>
          <span className={styles.statusTabCount}>0</span>
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
        {/* Add candidate is out of scope — button rendered for layout purposes only */}
        <button className={styles.iconBtn} type="button" aria-label="Add candidate">
          <Plus size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
