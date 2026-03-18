import { useEffect, useRef } from 'react'
import { Ban, ChevronRight, Calendar, Star, Send } from 'lucide-react'
import styles from './ContextMenu.module.scss'

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

  // Close when clicking outside the menu
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

  if (!isOpen) return null

  return (
    <div ref={ref} className={styles.menu}>
      {MENU_ITEMS.map(({ icon: Icon, label }) => (
        <button key={label} className={styles.item} type="button" onClick={onClose}>
          <Icon size={18} strokeWidth={1.5} className={styles.icon} />
          {label}
        </button>
      ))}
    </div>
  )
}
