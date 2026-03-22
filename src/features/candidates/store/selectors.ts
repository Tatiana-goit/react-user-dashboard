import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/store'

// Items per page differ by view — grid shows 9, list shows 10
const ITEMS_PER_PAGE = { grid: 9, list: 10 } as const

// Plain selectors return primitives or stable references — no memoization needed
export const selectLoading = (s: RootState) => s.candidates.loading
export const selectError = (s: RootState) => s.candidates.error
export const selectViewMode = (s: RootState) => s.candidates.viewMode
export const selectCurrentPage = (s: RootState) => s.candidates.currentPage
export const selectAllCandidates = (s: RootState) => s.candidates.items
export const selectTotalCount = (s: RootState) => s.candidates.items.length

export const selectItemsPerPage = (s: RootState) =>
  ITEMS_PER_PAGE[s.candidates.viewMode]

// Math.max(1, ...) ensures at least 1 page — Pagination renders null when totalPages ≤ 1,
// but selectors and CandidatesPage still receive a valid number (never 0 or NaN)
export const selectTotalPages = createSelector(
  selectAllCandidates,
  selectItemsPerPage,
  (items, perPage) => Math.max(1, Math.ceil(items.length / perPage))
)

// Memoized with createSelector — .slice() always returns a new array reference,
// which would trigger a re-render on every Redux state change without memoization
export const selectPaginatedCandidates = createSelector(
  selectAllCandidates,
  selectItemsPerPage,
  selectCurrentPage,
  (items, perPage, page) => {
    const start = (page - 1) * perPage // Page is 1-based, array index is 0-based
    return items.slice(start, start + perPage)
  }
)
