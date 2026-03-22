import {
  selectItemsPerPage,
  selectTotalPages,
  selectPaginatedCandidates,
} from './selectors'
import { MOCK_CANDIDATES } from '../../../test/mocks'
import type { RootState } from '../../../app/store'

function makeState(overrides: Partial<RootState['candidates']>): RootState {
  return {
    candidates: {
      items: MOCK_CANDIDATES,
      loading: false,
      error: null,
      viewMode: 'grid',
      currentPage: 1,
      ...overrides,
    },
  }
}

describe('selectors', () => {
  describe('selectItemsPerPage', () => {
    // Grid and list have different densities — this value drives both pagination and slice size
    test('returns 9 for grid view', () => {
      expect(selectItemsPerPage(makeState({ viewMode: 'grid' }))).toBe(9)
    })

    // List returns 10 — wider rows fit more data per line, fewer pages needed vs grid
    test('returns 10 for list view', () => {
      expect(selectItemsPerPage(makeState({ viewMode: 'list' }))).toBe(10)
    })
  })

  describe('selectTotalPages', () => {
    // ceil() ensures the last partial page is counted — 2.22 rounds up to 3, not down to 2
    test('returns 3 pages for 20 candidates in grid view', () => {
      expect(selectTotalPages(makeState({ viewMode: 'grid' }))).toBe(3)
    })

    // List fits more items per page — fewer total pages than grid for the same dataset
    test('returns 2 pages for 20 candidates in list view', () => {
      expect(selectTotalPages(makeState({ viewMode: 'list' }))).toBe(2)
    })

    // Exactly 9 items fills one page precisely — no partial page, Pagination self-hides
    test('returns 1 for exactly 9 items in grid view', () => {
      expect(selectTotalPages(makeState({ items: MOCK_CANDIDATES.slice(0, 9) }))).toBe(1)
    })

    // Math.max(1, ...) prevents 0 — Pagination renders null when totalPages <= 1
    test('returns 1 when there are no candidates', () => {
      expect(selectTotalPages(makeState({ items: [] }))).toBe(1)
    })
  })

  describe('selectPaginatedCandidates', () => {
    // Page 1 in grid — first 9 items, correct boundaries on both ends
    test('returns first 9 candidates on page 1 in grid view', () => {
      const result = selectPaginatedCandidates(makeState({ viewMode: 'grid', currentPage: 1 }))
      expect(result).toHaveLength(9)
      expect(result[0].fullName).toBe('Candidate 1')
      expect(result[8].fullName).toBe('Candidate 9')
    })

    // Page 2 in grid — slice starts at index 9 (item 10) and ends at index 17 (item 18)
    test('returns candidates starting from 10 on page 2 in grid view', () => {
      const result = selectPaginatedCandidates(makeState({ viewMode: 'grid', currentPage: 2 }))
      expect(result).toHaveLength(9)
      expect(result[0].fullName).toBe('Candidate 10')
      expect(result[8].fullName).toBe('Candidate 18')
    })

    // List view uses a different page size — verifies the slice recalculates correctly
    test('returns first 10 candidates on page 1 in list view', () => {
      const result = selectPaginatedCandidates(makeState({ viewMode: 'list', currentPage: 1 }))
      expect(result).toHaveLength(10)
      expect(result[0].fullName).toBe('Candidate 1')
      expect(result[9].fullName).toBe('Candidate 10')
    })

    // Last page may be partial — 20 items, 9 per page, page 3 has only 2 left
    test('returns 2 candidates on the last partial page in grid view', () => {
      const result = selectPaginatedCandidates(makeState({ viewMode: 'grid', currentPage: 3 }))
      expect(result).toHaveLength(2)
      expect(result[0].fullName).toBe('Candidate 19')
      expect(result[1].fullName).toBe('Candidate 20')
    })
  })
})
