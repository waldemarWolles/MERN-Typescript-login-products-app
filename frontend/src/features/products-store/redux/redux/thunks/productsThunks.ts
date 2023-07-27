import { createProductAPI, fetchOneProductAPI, fetchProductsAPI, updateProductAPI } from '../../../api/products'
import { ProductFormType, ProductType } from '../../../types/product'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk<ProductType[]>('products/fetchProducts', async () => {
  const productsData = await fetchProductsAPI()
  return productsData
})

export const createProductThunk = createAsyncThunk<ProductType, ProductFormType>('products/createProduct', async (payload) => {
  const product = await createProductAPI(payload)
  return product
})

export const updateProductThunk = createAsyncThunk<ProductType, { payload: ProductFormType; productId: string }>(
  'products/updateProduct',
  async ({ payload, productId }) => {
    const updatedProduct = await updateProductAPI(payload, productId)
    return updatedProduct
  }
)

export const fetchOneProductThunk = createAsyncThunk<ProductType, string>('products/fetchOneProduct', async (id: string) => {
  const product = await fetchOneProductAPI(id)
  return product
})
