import React from 'react'
import { AuthTabs } from '../features/authentication/components'
import { Box, styled } from '@mui/material'

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  height: '100vh',
})

const AuthPage: React.FC = () => {
  return (
    <StyledBox>
      <h1>AuthPage</h1>
      <AuthTabs />
    </StyledBox>
  )
}

export default AuthPage
