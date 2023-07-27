import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { AppBar, Toolbar, IconButton, Typography, Button, Icon, Avatar } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { AppDispatch } from '../redux/store'
import { logout } from '../features/authentication/redux/slices/authSlice'
import { selectIsAuth, selectUserData } from '../features/authentication/redux/selectors/authSelectors'
import { User } from '../features/authentication/types/auth'

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

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}))

const StyledUserName = styled(Typography)({
  fontWeight: 'bold',
  color: 'black',
  marginLeft: '20px',
})

const StyledAvatar = styled(Avatar)({
  marginLeft: '20px',
  marginRight: '20px',
})

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth: boolean = useSelector(selectIsAuth)
  const user: User | null = useSelector(selectUserData)

  const handleLogout = () => {
    if (window.confirm('Are you sure that you want to logout?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
      navigate('/auth-page')
    }
  }

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <StyledIconButton edge="start" color="inherit" aria-label="home" onClick={() => navigate('/')}>
          <HomeIcon />
          <StyledTypography variant="h6">Home Page</StyledTypography>
        </StyledIconButton>

        {isAuth && (
          <Button color="inherit" onClick={handleLogout}>
            <StyledUserName>{user?.firstName}</StyledUserName>
            <StyledAvatar src={user?.avatarUrl} alt={user?.firstName} />
            <ExitToAppIcon />
            Log out
          </Button>
        )}
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default Header
