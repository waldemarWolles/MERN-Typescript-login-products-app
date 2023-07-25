import React from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { LoginFormType } from '../types/auth'

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  width: '400px',
  border: '1px solid #dedede',
  margin: '50px auto',
}))

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
})

const StyledButton = styled(Button)({
  marginTop: '16px',
})

const Login: React.FC = () => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (values: LoginFormType) => {
    // const data = await dispatch(login(values))
    // if (!data.payload) {
    //   return alert('Failed to login!')
    // }
    // if ('token' in data.payload) {
    //   window.localStorage.setItem('token', data.payload.token)
    // }
  }

  return (
    <StyledPaper>
      <Typography variant="h5">Log In</Typography>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Input your Email' })}
          fullWidth
        />
        <StyledTextField
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Input your Password' })}
          fullWidth
        />
        <StyledButton disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Log in
        </StyledButton>
      </StyledForm>
    </StyledPaper>
  )
}

export default Login
