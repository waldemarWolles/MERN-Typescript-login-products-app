import axiosInstance from '../../../api/axiosAPI'
import { ProductFormType, ProductType } from '../types/product'

export const fetchProductsAPI = async (): Promise<ProductType[]> => {
  const response = await axiosInstance.get('/products')
  return response.data
}

export const createProductAPI = async (payload: ProductFormType): Promise<ProductType> => {
  const response = await axiosInstance.post<ProductType>('/products', payload)
  return response.data
}

export const updateProductAPI = async (payload: Partial<ProductFormType>, productId: string): Promise<ProductType> => {
  const response = await axiosInstance.patch<ProductType>(`/products/${productId}`, payload)
  return response.data
}

export const fetchOneProductAPI = async (id: string): Promise<ProductType> => {
  const response = await axiosInstance.get<ProductType>(`/products/${id}`)
  return response.data
}

export const deleteProductAPI = async (id: string): Promise<{ success: boolean }> => {
  const response = await axiosInstance.delete<{ success: boolean }>(`/products/${id}`)
  return response.data
}
