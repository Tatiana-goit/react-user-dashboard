import candidatesReducer, {
  setViewMode,
  setCurrentPage,
  fetchCandidates,
} from './candidatesSlice'
import { MOCK_CANDIDATES } from '../../../test/mocks'

const initialState = {
  items: [],
  loading: false,
  error: null,
  viewMode: 'grid' as const,
  currentPage: 1,
}

describe('candidatesSlice', () => {
  describe('setViewMode', () => {
    // Switching view must reset the page — otherwise the user could land on a
    // page that doesn't exist in the new view (e.g. grid page 3 vs list page 3)
    test('sets view mode and resets page to 1', () => {
      const state = { ...initialState, currentPage: 3 }
      const result = candidatesReducer(state, setViewMode('list'))
      expect(result.viewMode).toBe('list')
      expect(result.currentPage).toBe(1)
    })
  })

  describe('setCurrentPage', () => {
    test('updates current page', () => {
      const result = candidatesReducer(initialState, setCurrentPage(2))
      expect(result.currentPage).toBe(2)
    })
  })

  describe('fetchCandidates', () => {
    // Pending — triggered immediately when the thunk is dispatched
    test('sets loading to true on pending', () => {
      const result = candidatesReducer(initialState, fetchCandidates.pending('', undefined))
      expect(result.loading).toBe(true)
      expect(result.error).toBeNull()
    })

    // Fulfilled — API returned successfully, items replace the current list
    test('stores candidates and clears loading on fulfilled', () => {
      const result = candidatesReducer(
        { ...initialState, loading: true },
        fetchCandidates.fulfilled(MOCK_CANDIDATES, '', undefined)
      )
      expect(result.loading).toBe(false)
      expect(result.items).toEqual(MOCK_CANDIDATES)
    })

    // Rejected — API threw an error, error message is stored for the UI to display
    test('stores error message and clears loading on rejected', () => {
      const error = new Error('Network error')
      const result = candidatesReducer(
        { ...initialState, loading: true },
        fetchCandidates.rejected(error, '', undefined)
      )
      expect(result.loading).toBe(false)
      expect(result.error).toBe('Network error')
    })
  })
})
