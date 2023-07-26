import React, { useEffect } from 'react'
import { NavigateFunction, Route, Routes, redirect, useNavigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { ProductType } from './features/products-store/types/product'
import ProductDetailsPage from './pages/ProductDetailsPage'
import Header from './components/Header'
import { Selector, useDispatch, useSelector } from 'react-redux'
import { selectIsAuth, selectUserData } from './features/authentication/redux/selectors/authSelectors'
import { AppDispatch } from './redux/store'
import { fetchUserThunk } from './features/authentication/redux/thunks/authThunks'
import { User } from './features/authentication/types/auth'

const products: ProductType[] = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/150',
    name: 'Product 1',
    count: 10,
    size: {
      width: 200,
      height: 200,
    },
    weight: '200g',
    comments: ['Comment 1', 'Comment 2'],
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/150',
    name: 'Product 2',
    count: 5,
    size: {
      width: 150,
      height: 150,
    },
    weight: '100g',
    comments: ['Comment 3', 'Comment 4'],
  },
]

const App: React.FC = () => {
  const token = window.localStorage.getItem('token')
  const dispatch: AppDispatch = useDispatch()
  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/auth-page')
    } else {
      dispatch(fetchUserThunk())
      navigate('/')
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
              <HomePage products={products} />
            </MainLayout>
          }
        />
        <Route
          path="/products/:productId"
          element={
            <MainLayout>
              <ProductDetailsPage products={products} />
            </MainLayout>
          }
        />
        <Route path="/auth-page" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default App
