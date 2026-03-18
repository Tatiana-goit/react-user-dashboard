import type { RootState } from '../../app/store'

// Items per page differ by view — grid shows 9, list shows 10
const ITEMS_PER_PAGE = { grid: 9, list: 10 } as const

export const selectLoading      = (s: RootState) => s.candidates.loading
export const selectError        = (s: RootState) => s.candidates.error
export const selectViewMode     = (s: RootState) => s.candidates.viewMode
export const selectCurrentPage  = (s: RootState) => s.candidates.currentPage
export const selectAllCandidates = (s: RootState) => s.candidates.items

export const selectItemsPerPage = (s: RootState) =>
  ITEMS_PER_PAGE[s.candidates.viewMode]

export const selectTotalPages = (s: RootState) => {
  const total = s.candidates.items.length
  const perPage = ITEMS_PER_PAGE[s.candidates.viewMode]
  return Math.max(1, Math.ceil(total / perPage))
}

export const selectPaginatedCandidates = (s: RootState) => {
  const perPage = ITEMS_PER_PAGE[s.candidates.viewMode]
  const page    = s.candidates.currentPage
  const start   = (page - 1) * perPage
  return s.candidates.items.slice(start, start + perPage)
}
