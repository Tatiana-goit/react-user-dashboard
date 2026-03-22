import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchCandidatesFromApi } from './candidatesApi'
import type { Candidate, ViewMode } from '../../../types/candidate'

// Raw data only — item counts, page totals, and visible subsets are computed in selectors
interface CandidatesState {
  items: Candidate[]
  loading: boolean
  error: string | null
  viewMode: ViewMode   // Kept in Redux so Toolbar and page stay in sync without prop drilling
  currentPage: number  // Kept in Redux — Pagination and the paginated selector both need it
}

const initialState: CandidatesState = {
  items: [],
  loading: false,
  error: null,
  viewMode: 'grid' as ViewMode, // Grid is the default view — matches Figma initial state
  currentPage: 1,
}

// Thunk wraps the API call — pending/fulfilled/rejected lifecycle handled in extraReducers below
export const fetchCandidates = createAsyncThunk(
  'candidates/fetch',
  () => fetchCandidatesFromApi()
)

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload
      // Reset to page 1 when switching views — item counts per page differ
      state.currentPage = 1
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  },
  // extraReducers handles async lifecycle — reducers{} is for synchronous actions only
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true
        state.error = null // Clear previous error on new fetch attempt
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload // Replace, not append — single fetch on mount, no accumulation
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to load candidates' 
      })
  },
})

export const { setViewMode, setCurrentPage } = candidatesSlice.actions
export default candidatesSlice.reducer
