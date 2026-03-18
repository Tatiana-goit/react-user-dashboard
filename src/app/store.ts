import { configureStore } from '@reduxjs/toolkit'
import { candidatesReducer } from '../features/candidates/store'

export const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
