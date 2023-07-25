import React from 'react'
import { Login, Register } from '../features/authentication/components'

type Props = {}
const token = ''
const AuthPage: React.FC<Props> = () => {
  return (
    <div>
      <h1>AuthPage</h1>
      {token ? <Login /> : <Register />}
    </div>
  )
}

export default AuthPage
