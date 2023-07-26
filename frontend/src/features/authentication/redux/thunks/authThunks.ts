import { LoginPayload, RegisterPayload, User } from '../../types/auth'
import { fetchUserAPI, loginAPI, registerAPI } from './../../api/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loginThunk = createAsyncThunk<User, LoginPayload>('auth/login', async (payload) => {
  const userData = await loginAPI(payload)
  return userData
})

export const registerThunk = createAsyncThunk<User, RegisterPayload>('auth/register', async (payload) => {
  const userData = await registerAPI(payload)
  return userData
})

export const fetchUserThunk = createAsyncThunk<User>('auth/me', async () => {
  const userData = await fetchUserAPI()
  return userData
})
