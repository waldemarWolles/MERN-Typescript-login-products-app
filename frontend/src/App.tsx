import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { ProductType } from './features/products-store/types/product'
import ProductDetailsPage from './pages/ProductDetailsPage'
import Header from './components/Header'

const isAuth = false
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
  // useEffect(() => {

  //   isAuth && call to fetch Products

  // }, [isAuth])

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <MainLayout>
                <HomePage products={products} />
              </MainLayout>
            ) : (
              <AuthPage />
            )
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
      </Routes>
    </>
  )
}

export default App
