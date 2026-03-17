import { XCircle, ArrowRightCircle, CalendarDays, Star, Send } from 'lucide-react'
import styles from './Footer.module.scss'

const ACTIONS = [
  { icon: XCircle,          label: 'Reject' },
  { icon: ArrowRightCircle, label: 'Next stage' },
  { icon: CalendarDays,     label: 'Book meeting' },
  { icon: Star,             label: 'Review' },
  { icon: Send,             label: 'Message' },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      {ACTIONS.map(({ icon: Icon, label }) => (
        <button key={label} className={styles.action} type="button">
          <Icon size={15} strokeWidth={2} />
          <span>{label}</span>
        </button>
      ))}
    </footer>
  )
}
