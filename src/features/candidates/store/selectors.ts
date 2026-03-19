import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/store'

// Items per page differ by view — grid shows 9, list shows 10
const ITEMS_PER_PAGE = { grid: 9, list: 10 } as const

export const selectLoading = (s: RootState) => s.candidates.loading
export const selectError = (s: RootState) => s.candidates.error
export const selectViewMode = (s: RootState) => s.candidates.viewMode
export const selectCurrentPage = (s: RootState) => s.candidates.currentPage
export const selectAllCandidates = (s: RootState) => s.candidates.items
export const selectTotalCount = (s: RootState) => s.candidates.items.length

export const selectItemsPerPage = (s: RootState) =>
  ITEMS_PER_PAGE[s.candidates.viewMode]

export const selectTotalPages = createSelector(
  selectAllCandidates,
  selectItemsPerPage,
  (items, perPage) => Math.max(1, Math.ceil(items.length / perPage))
)

// Memoized — slice returns a new array reference, so without memoization
// react-redux would warn on every render
export const selectPaginatedCandidates = createSelector(
  selectAllCandidates,
  selectItemsPerPage,
  selectCurrentPage,
  (items, perPage, page) => {
    const start = (page - 1) * perPage
    return items.slice(start, start + perPage)
  }
)
