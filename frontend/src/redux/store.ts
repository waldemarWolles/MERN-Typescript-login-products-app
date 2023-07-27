import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authReducer from '../features/authentication/redux/slices/authSlice'
import productsReducer from '../features/products-store/redux/redux/slices/productsSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store
