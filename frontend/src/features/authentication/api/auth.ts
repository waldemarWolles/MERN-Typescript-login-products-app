import { LoginPayload, RegisterPayload, User } from '../types/auth'
import axiosInstance from './../../../api/axiosAPI'

export const loginAPI = async (payload: LoginPayload): Promise<User> => {
  const response = await axiosInstance.post<User>('/auth/login', payload)
  return response.data
}

export const registerAPI = async (payload: RegisterPayload): Promise<User> => {
  const response = await axiosInstance.post<User>('/auth/register', payload)
  return response.data
}

export const fetchUserAPI = async (): Promise<User> => {
  const response = await axiosInstance.get('/auth/me')
  return response.data
}
