import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  fetchCandidates,
  setViewMode,
  setCurrentPage,
  selectLoading,
  selectError,
  selectViewMode,
  selectCurrentPage,
  selectTotalPages,
  selectItemsPerPage,
  selectTotalCount,
  selectPaginatedCandidates,
} from '../features/candidates/store'
import { CandidatesGrid, CandidatesList } from '../features/candidates/ui'
import { Toolbar } from '../components/layout/Toolbar/Toolbar'
import { Pagination } from '../components/layout/Pagination/Pagination'
import type { ViewMode } from '../types/candidate'
import styles from './CandidatesPage.module.scss'

// Thin container — reads Redux state, decides what to render, passes data down; no markup logic here
export function CandidatesPage() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectLoading)
  const error = useAppSelector(selectError)
  const viewMode = useAppSelector(selectViewMode)
  const currentPage = useAppSelector(selectCurrentPage)
  const totalPages = useAppSelector(selectTotalPages)
  const itemsPerPage = useAppSelector(selectItemsPerPage)
  const totalCount = useAppSelector(selectTotalCount)

  // selectPaginatedCandidates already returns the correct page slice — pagination logic lives in the selector, not here
  const candidates = useAppSelector(selectPaginatedCandidates)

  // Fetch candidates once on mount — polling and refetch are out of scope
  useEffect(() => {
    dispatch(fetchCandidates())
  }, [dispatch])

  function handleViewChange(mode: ViewMode) {
    dispatch(setViewMode(mode))
  }

  function handlePageChange(page: number) {
    dispatch(setCurrentPage(page))
  }

  // Local booleans for render branching — too simple to belong in Redux or selectors
  const showContent = !loading && !error && candidates.length > 0
  const showEmpty = !loading && !error && candidates.length === 0

  // Grouped for readability — Pagination is fully controlled, all values from Redux
  const paginationProps = {
    currentPage,
    totalPages,
    totalItems: totalCount,
    itemsPerPage,
    onPageChange: handlePageChange,
  }

  return (
    <div className={styles.page}>
      <Toolbar viewMode={viewMode} onViewChange={handleViewChange} activeCount={totalCount} />

      {/* Loading state — shown immediately after dispatch, before fetch resolves */}
      {loading && <div className={styles.state}>Loading...</div>}

      {/* Error shown only after loading completes — avoids flash during state transition */}
      {!loading && error && <div className={styles.state}>Error: {error}</div>}

      {/* Empty state — valid response with zero items, not an error */}
      {showEmpty && (
        <div className={styles.state}>
          {/* Message is generic — with search/filters this could say "No results for your search" */}
          No candidates found.
        </div>
      )}

      {showContent && (
        <div className={styles.content}>
          {/* Separate components per view — simpler than one combined component with a layout flag */}
          {viewMode === 'grid'
            ? <CandidatesGrid candidates={candidates} />
            : <CandidatesList candidates={candidates} />
          }
          {/* Pagination rendered only when content is visible — also self-hides when totalPages ≤ 1 (see Pagination.tsx) */}
          <Pagination {...paginationProps} />
        </div>
      )}
    </div>
  )
}
