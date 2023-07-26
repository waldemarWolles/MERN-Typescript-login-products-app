import { createSlice } from '@reduxjs/toolkit'
import { fetchUserThunk, loginThunk, registerThunk } from './../thunks/authThunks'
import { User } from '../../types/auth'

type AuthState = {
  user: User | null
  status: 'pending' | 'error' | 'fulfilled' | 'idle'
  isAuth: boolean
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  isAuth: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuth = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuth = true
        state.status = 'fulfilled'
      })
      .addCase(loginThunk.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(registerThunk.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuth = true
        state.status = 'fulfilled'
      })
      .addCase(registerThunk.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(fetchUserThunk.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuth = true
        state.status = 'fulfilled'
      })
      .addCase(fetchUserThunk.rejected, (state) => {
        state.status = 'error'
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
