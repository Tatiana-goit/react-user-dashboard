import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  fetchCandidates,
  setViewMode,
  selectLoading,
  selectError,
  selectViewMode,
  selectPaginatedCandidates,
} from '../features/candidates/store'
import { CandidatesGrid } from '../features/candidates/ui'
import { Toolbar } from '../components/layout/Toolbar/Toolbar'
import type { ViewMode } from '../types/candidate'
import styles from './CandidatesPage.module.scss'

export function CandidatesPage() {
  const dispatch   = useAppDispatch()
  const loading    = useAppSelector(selectLoading)
  const error      = useAppSelector(selectError)
  const viewMode   = useAppSelector(selectViewMode)
  const candidates = useAppSelector(selectPaginatedCandidates)

  useEffect(() => {
    dispatch(fetchCandidates())
  }, [dispatch])

  function handleViewChange(mode: ViewMode) {
    dispatch(setViewMode(mode))
  }

  return (
    <div className={styles.page}>
      <Toolbar viewMode={viewMode} onViewChange={handleViewChange} />

      {loading && <div className={styles.state}>Loading...</div>}

      {!loading && error && <div className={styles.state}>Error: {error}</div>}

      {!loading && !error && candidates.length === 0 && (
        <div className={styles.state}>No candidates found.</div>
      )}

      {!loading && !error && candidates.length > 0 && viewMode === 'grid' && (
        <div className={styles.content}>
          <CandidatesGrid candidates={candidates} />
        </div>
      )}

      {!loading && !error && candidates.length > 0 && viewMode === 'list' && (
        <div className={styles.content}>
          <p className={styles.state}>List view — coming soon.</p>
        </div>
      )}
    </div>
  )
}
