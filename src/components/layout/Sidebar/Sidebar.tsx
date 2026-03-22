import {
  Plus,
  ArrowDownToLine,
  Home,
  CircleUserRound,
  FileText,
  Menu,
  Calendar,
  BarChart2,
  Building2,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react'
import styles from './Sidebar.module.scss'

// Sidebar is decorative — navigation, active states, and Add button are out of scope (single-page exercise, no router)
export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.logo} aria-label="Logo">
          <ArrowDownToLine size={22} strokeWidth={2.5} />
        </div>
        <button className={styles.iconAdd} aria-label="Add">
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      <nav className={styles.nav}>
        <button className={styles.icon} aria-label="Home"><Home size={18} /></button>
        <button className={styles.icon} aria-label="Candidates"><CircleUserRound size={18} /></button>
        <button className={styles.icon} aria-label="Documents"><FileText size={18} /></button>
        <button className={styles.icon} aria-label="List"><Menu size={18} /></button>
        <button className={styles.icon} aria-label="Calendar"><Calendar size={18} /></button>
        <button className={styles.icon} aria-label="Analytics"><BarChart2 size={18} /></button>
        <button className={styles.icon} aria-label="Company"><Building2 size={18} /></button>
      </nav>

      <div className={styles.bottom}>
        <button className={styles.icon} aria-label="Help"><HelpCircle size={18} /></button>
        <button className={styles.icon} aria-label="Settings"><Settings size={18} /></button>
        <button className={styles.icon} aria-label="Log out"><LogOut size={18} /></button>
      </div>
    </aside>
  )
}
