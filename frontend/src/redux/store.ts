// store.ts
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
// import counterReducer from './reducers/counterSlice';

const rootReducer = combineReducers({
  //   counter: counterReducer,
  // Add more reducers here if you have additional slices
})

const store = configureStore({
  reducer: rootReducer,
  // Additional middleware, enhancers, and configuration can be added here
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store
