export type AuthFormType = {
  email: string
  password: string
  firstName: string
  lastName: string
  avatarUrl?: string
}

export type AuthFormProps = {
  formType: 'login' | 'register'
}

export type User = {
  _id: string | number
  email: string
  firstName: string
  lastName: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
  token: string
}

export type LoginFormType = {
  email: string
  password: string
}

export type LoginPayload = LoginFormType
export type RegisterPayload = AuthFormType

export type LoginFormValues = Pick<LoginFormType, 'email' | 'password'>
export type RegisterFormValues = Pick<RegisterPayload, 'email' | 'password' | 'firstName' | 'lastName' | 'avatarUrl'>
