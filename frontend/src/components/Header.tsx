import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
// import { logout } from '../redux/auth/actions'

const StyledAppBar = styled(AppBar)({
  flexGrow: 1,
})

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
})

const StyledTypography = styled(Typography)({
  flexGrow: 1,
})

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    // dispatch(logout())
    navigate('/login')
  }

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <IconButton edge="start" color="inherit" aria-label="home" onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>
        <StyledTypography variant="h6">My App</StyledTypography>
        <Button color="inherit" onClick={handleLogout}>
          <ExitToAppIcon />
          Log out
        </Button>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default Header
