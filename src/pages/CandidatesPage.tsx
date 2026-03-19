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
  selectAllCandidates,
  selectPaginatedCandidates,
} from '../features/candidates/store'
import { CandidatesGrid, CandidatesList } from '../features/candidates/ui'
import { Toolbar } from '../components/layout/Toolbar/Toolbar'
import { Pagination } from '../components/layout/Pagination/Pagination'
import type { ViewMode } from '../types/candidate'
import styles from './CandidatesPage.module.scss'

export function CandidatesPage() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectLoading)
  const error = useAppSelector(selectError)
  const viewMode = useAppSelector(selectViewMode)
  const currentPage = useAppSelector(selectCurrentPage)
  const totalPages = useAppSelector(selectTotalPages)
  const itemsPerPage = useAppSelector(selectItemsPerPage)
  const allCandidates = useAppSelector(selectAllCandidates)
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

  const showContent = !loading && !error && candidates.length > 0
  const showEmpty = !loading && !error && candidates.length === 0

  const paginationProps = {
    currentPage,
    totalPages,
    totalItems: allCandidates.length,
    itemsPerPage,
    onPageChange: handlePageChange,
  }

  return (
    <div className={styles.page}>
      <Toolbar viewMode={viewMode} onViewChange={handleViewChange} activeCount={allCandidates.length} />

      {loading && <div className={styles.state}>Loading...</div>}

      {!loading && error && <div className={styles.state}>Error: {error}</div>}

      {showEmpty && (
        <div className={styles.state}>No candidates found.</div>
      )}

      {showContent && (
        <div className={styles.content}>
          {viewMode === 'grid'
            ? <CandidatesGrid candidates={candidates} />
            : <CandidatesList candidates={candidates} />
          }
          <Pagination {...paginationProps} />
        </div>
      )}
    </div>
  )
}
