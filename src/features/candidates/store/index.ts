// Public API for the candidates feature — import from here, not directly from slice or selectors
export { fetchCandidates, setViewMode, setCurrentPage } from './candidatesSlice'
export { default as candidatesReducer } from './candidatesSlice'
export * from './selectors'
