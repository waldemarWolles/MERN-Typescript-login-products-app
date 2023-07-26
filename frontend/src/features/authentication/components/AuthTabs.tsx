import { useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import AuthForm from './AuthForm'
import { AuthFormProps } from '../types/auth'

const AuthTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AuthFormProps['formType']>('login')

  const handleTabChange = (newValue: AuthFormProps['formType']) => {
    setActiveTab(newValue)
  }

  return (
    <>
      <Tabs value={activeTab} onChange={(_, value) => handleTabChange(value)}>
        <Tab label="Login" value="login" />
        <Tab label="Register" value="register" />
      </Tabs>
      <AuthForm formType={activeTab} />
    </>
  )
}

export default AuthTabs
