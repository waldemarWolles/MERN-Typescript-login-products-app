import { deleteProductThunk, fetchOneProductThunk, updateProductThunk } from './../thunks/productsThunks'
import { createSlice } from '@reduxjs/toolkit'
import { createProductThunk, fetchProducts } from '../thunks/productsThunks'
import { ProductType } from '../../../types/product'

type ProductsState = {
  items: null | ProductType[]
  currentProduct: null | ProductType
  status: 'pending' | 'error' | 'fulfilled' | 'idle'
}

const initialState: ProductsState = {
  items: null,
  currentProduct: null,
  status: 'idle',
}

const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'fulfilled'
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(createProductThunk.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.items = state.items === null ? [action.payload] : [...state.items, action.payload]
        state.status = 'fulfilled'
      })
      .addCase(createProductThunk.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(updateProductThunk.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.currentProduct = action.payload
        state.status = 'fulfilled'
      })
      .addCase(updateProductThunk.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(fetchOneProductThunk.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchOneProductThunk.fulfilled, (state, action) => {
        state.currentProduct = action.payload
        state.status = 'fulfilled'
      })
      .addCase(fetchOneProductThunk.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(deleteProductThunk.pending, (state, action) => {
        console.log(action?.meta?.arg)

        state.items = state.items && state.items?.filter((item) => item._id !== action?.meta?.arg)
        state.status = 'pending'
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.status = 'fulfilled'
      })
      .addCase(deleteProductThunk.rejected, (state) => {
        state.status = 'error'
      })
  },
})

// export const {} = productsSlice.actions

export default productsSlice.reducer
