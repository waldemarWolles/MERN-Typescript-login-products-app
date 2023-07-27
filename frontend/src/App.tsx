import React, { useEffect } from 'react'
import { NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import Header from './components/Header'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './redux/store'
import { fetchUserThunk } from './features/authentication/redux/thunks/authThunks'

const App: React.FC = () => {
  const token: string | null = window.localStorage.getItem('token')
  const dispatch: AppDispatch = useDispatch()
  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/auth-page')
    } else {
      dispatch(fetchUserThunk())
    }
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/products/:productId"
          element={
            <MainLayout>
              <ProductDetailsPage />
            </MainLayout>
          }
        />
        <Route path="/auth-page" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default App
