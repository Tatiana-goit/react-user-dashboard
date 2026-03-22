import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './Pagination.module.scss'

// Pagination is fully controlled — no internal state, all values come from Redux via CandidatesPage
interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  // Returns null when all items fit on one page — no point showing pagination
  if (totalPages <= 1) return null

  // Derived display values — computed here since they are local to this render, not needed in Redux
  const from = (currentPage - 1) * itemsPerPage + 1
  const to = Math.min(currentPage * itemsPerPage, totalItems)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1) // Simple page number array — no truncation/ellipsis, mock data is small enough

  return (
    <div className={styles.pagination}>
      <div className={styles.nav}>
        <button
          className={styles.prev}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={14} />
          Previous
        </button>

        <div className={styles.pages}>
          {pages.map((page) => (
            <button
              key={page}
              className={`${styles.page} ${page === currentPage ? styles.active : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className={styles.next}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight size={14} />
        </button>
      </div>

      <span className={styles.counter}>Showing {from}–{to} of {totalItems}</span>
    </div>
  )
}
