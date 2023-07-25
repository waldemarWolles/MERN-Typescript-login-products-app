import React from 'react'
import { Link } from 'react-router-dom'
import { ProductType } from '../features/products-store/types/product'

type Props = {
  products: ProductType[]
}

const HomePage: React.FC<Props> = ({ products }) => {
  return (
    <div>
      {products.map((product) => (
        <Link to={`/products/${product.id}`} key={product.id}>
          <div>
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.count}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default HomePage
