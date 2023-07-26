import React from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { AuthFormProps, AuthFormType, LoginFormValues, RegisterFormValues } from '../types/auth'
import { AppDispatch } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { loginThunk, registerThunk } from '../redux/thunks/authThunks'

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  width: '400px',
  border: '1px solid #e6ecf0',
  borderRadius: '16px',
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

const AuthForm: React.FC<AuthFormProps> = ({ formType }) => {
  const dispatch: AppDispatch = useDispatch()
  const navigate: NavigateFunction = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Partial<AuthFormType>>({
    defaultValues:
      formType === 'login'
        ? { email: '', password: '' }
        : {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            avatarUrl: '',
          },
    mode: 'onChange',
  })

  const onSubmit = async (values: Partial<AuthFormType>) => {
    const data: any =
      formType === 'login'
        ? await dispatch(loginThunk(values as LoginFormValues))
        : await dispatch(registerThunk(values as RegisterFormValues))

    if (!data.payload) {
      return alert(`Failed to ${formType}!`)
    }
    if ('token' in data?.payload) {
      window.localStorage.setItem('token', data?.payload.token)
      navigate('/')
    }
  }

  return (
    <StyledPaper>
      <Typography variant="h5">{formType === 'login' ? 'Login' : 'Register'}</Typography>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {
            required: 'Input your Email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          fullWidth
        />
        <StyledTextField
          label="Password"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', {
            required: 'Input your Password',
            minLength: {
              value: 5,
              message: 'Password must be at least 5 characters',
            },
          })}
          fullWidth
        />
        {formType === 'register' && (
          <>
            <StyledTextField
              label="First Name"
              type="text"
              error={Boolean(errors.firstName?.message)}
              helperText={errors.firstName?.message}
              {...register('firstName', {
                required: 'Input your First Name',
              })}
              fullWidth
            />
            <StyledTextField
              label="Last Name"
              type="text"
              error={Boolean(errors.lastName?.message)}
              helperText={errors.lastName?.message}
              {...register('lastName', {
                required: 'Input your Last Name',
              })}
              fullWidth
            />
            <StyledTextField
              label="Avatar URL"
              type="text"
              error={Boolean(errors.avatarUrl?.message)}
              helperText={errors.avatarUrl?.message}
              {...register('avatarUrl', {
                required: 'Input your Avatar URL',
              })}
              fullWidth
            />
          </>
        )}
        <StyledButton disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          {formType === 'login' ? 'Login' : 'Register'}
        </StyledButton>
      </StyledForm>
    </StyledPaper>
  )
}

export default AuthForm
