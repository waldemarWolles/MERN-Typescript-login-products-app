import { RootState } from '../../../../../redux/store'

export const selectProducts = (state: RootState) => state.products.items
export const selectProductsStatus = (state: RootState) => state.products.status
export const selectCurrentProduct = (state: RootState) => state.products.currentProduct
