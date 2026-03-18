import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchCandidatesFromApi } from './candidatesApi'
import type { Candidate, ViewMode } from '../../../types/candidate'

interface CandidatesState {
  items: Candidate[]
  loading: boolean
  error: string | null
  viewMode: ViewMode
  currentPage: number
}

const initialState: CandidatesState = {
  items: [],
  loading: false,
  error: null,
  viewMode: 'grid',
  currentPage: 1,
}

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to load candidates'
      })
  },
})

export const { setViewMode, setCurrentPage } = candidatesSlice.actions
export default candidatesSlice.reducer
