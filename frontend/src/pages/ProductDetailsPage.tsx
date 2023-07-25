import React from 'react'
import { useParams } from 'react-router-dom'
import { ProductType } from '../features/products-store/types/product'

type Props = {
  products: ProductType[]
}

const ProductDetailsPage: React.FC<Props> = ({ products }) => {
  const { productId } = useParams()

  const product = productId && products.find((p) => p.id === +productId)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div>
      <h1>ProductDetailsPage</h1>
      <div>
        <img src={product.imageUrl} alt={product.name} />
        <h2>{product.name}</h2>

        <p>{product.count}</p>
        <p>
          {product.size.width} x {product.size.height}
        </p>
        <p>{product.weight}</p>
        <ul>
          {product.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProductDetailsPage
