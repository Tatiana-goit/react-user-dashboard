import { configureStore } from '@reduxjs/toolkit'
import { candidatesReducer } from '../features/candidates/store'

// Single slice for this exercise — extend reducer map here when adding new features
export const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
  },
})

// RootState and AppDispatch exported here — used in hooks.ts for typed selectors and dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
