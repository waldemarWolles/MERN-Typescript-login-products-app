import { RootState } from './../../../../redux/store'

export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const selectUserData = (state: RootState) => state.auth.user
