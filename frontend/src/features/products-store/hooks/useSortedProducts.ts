import { useState, useEffect } from 'react'
import { ProductType, SortProductsByType } from '../types/product'

export const useSortedProducts = (products: ProductType[] | null, sortBy: SortProductsByType) => {
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>([])

  useEffect(() => {
    if (products === null) {
      return
    }

    const sortFunction = (a: ProductType, b: ProductType) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'count') {
        return a.count - b.count
      } else {
        return 0
      }
    }

    const sorted = [...products].sort(sortFunction)
    setSortedProducts(sorted)
  }, [products, sortBy])

  return sortedProducts
}
