import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './Pagination.module.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

// Returns page numbers + ellipsis markers to display
// e.g. [1, '...', 4, 5, 6, '...', 10]
function buildPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | '...')[] = [1]

  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end   = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')

  pages.push(total)
  return pages
}

export function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages    = buildPages(currentPage, totalPages)
  const from     = (currentPage - 1) * itemsPerPage + 1
  const to       = Math.min(currentPage * itemsPerPage, totalItems)

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
          {pages.map((page, i) =>
            page === '...'
              ? <span key={`ellipsis-${i}`} className={styles.ellipsis}>...</span>
              : (
                <button
                  key={page}
                  className={`${styles.page} ${page === currentPage ? styles.active : ''}`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              )
          )}
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

      <span className={styles.counter}>
        Showing {from}–{to} of {totalItems}
      </span>
    </div>
  )
}
