import { useEffect, useRef } from 'react'
import { Ban, ChevronRight, Calendar, Star, Send } from 'lucide-react'
import styles from './ContextMenu.module.scss'

// Fully controlled — open state lives in CandidateCard, not here
interface ContextMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MENU_ITEMS = [
  { icon: Ban, label: 'Reject' },
  { icon: ChevronRight, label: 'Next stage' },
  { icon: Calendar, label: 'Book meeting' },
  { icon: Star, label: 'Review' },
  { icon: Send, label: 'Message' },
]

export function ContextMenu({ isOpen, onClose }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Closes menu on outside click — mousedown fires before blur, avoids race conditions with other handlers
  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  if (!isOpen) return null // Unmounts on close — no CSS hide/show, keeps DOM clean

  return (
    <div ref={ref} className={styles.menu}>
      {MENU_ITEMS.map(({ icon: Icon, label }) => (
        // Menu items are decorative — onClick only closes the menu, no actions implemented
        <button key={label} className={styles.item} type="button" onClick={onClose}>
          <Icon size={18} strokeWidth={1.5} className={styles.icon} />
          {label}
        </button>
      ))}
    </div>
  )
}
