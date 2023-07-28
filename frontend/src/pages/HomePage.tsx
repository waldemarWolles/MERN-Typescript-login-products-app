import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectProducts, selectProductsStatus } from '../features/products-store/redux/redux/selectors/productsSelectors'
import { AppDispatch } from '../redux/store'
import { ProductType, SortProductsByType } from '../features/products-store/types/product'
import { deleteProductThunk, fetchProducts } from '../features/products-store/redux/redux/thunks/productsThunks'
import { CircularProgress, Grid, styled, Button, Box, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { ProductFormModal } from '../features/products-store/components'
import { useSortedProducts } from '../features/products-store/hooks/useSortedProducts'
import ProductsSortSelector from '../features/products-store/components/ProductsSortSelector'

type Props = {}

const Container = styled(Box)({
  width: '100%',
})

const ProductWrapper = styled(Grid)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const CenteredCircularProgress = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
})

const ProductImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
})

const ProductContainer = styled('div')({
  backgroundColor: '#343',
  color: '#fff',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '#444',
  },
  width: '300px',
  marginBottom: '30px',
})

const StyledGrid = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
})

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
})

const StyledButton = styled(Button)({
  margin: '30px',
})

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  top: '0',
  right: '30px',
  zIndex: 1,
})

const ActionButtonsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const HomePage: React.FC<Props> = () => {
  const dispatch: AppDispatch = useDispatch()
  const products: ProductType[] | null = useSelector(selectProducts)
  const status = useSelector(selectProductsStatus)

  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState<boolean>(false)
  const [sortProductsBy, setSortProductsBy] = useState<SortProductsByType>('name')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleCreateProductClick = () => {
    setIsCreateProductModalOpen(true)
  }

  const handleCreateProductModalClose = () => {
    setIsCreateProductModalOpen(false)
  }

  const onProductDeleteClick = async (id: string, productName: string) => {
    if (window.confirm(`Are you sure that you want to delete this product: ${productName} ?`)) {
      const data: any = await dispatch(deleteProductThunk(id))

      if (!data.payload) {
        return alert(`Failed to delete Product!`)
      }
    }
  }

  const sortedProducts = useSortedProducts(products, sortProductsBy)

  if (status === 'pending') {
    return (
      <CenteredCircularProgress>
        <CircularProgress />
      </CenteredCircularProgress>
    )
  }

  return (
    <Container>
      <ActionButtonsContainer>
        <StyledButton variant="contained" color="primary" onClick={handleCreateProductClick}>
          Create Product
        </StyledButton>

        <ProductsSortSelector sortBy={sortProductsBy} onChangeSortBy={setSortProductsBy} />
      </ActionButtonsContainer>
      <StyledGrid container>
        {sortedProducts?.map((product) => (
          <ProductWrapper item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <StyledLink to={`/products/${product._id}`}>
              <ProductContainer>
                <ProductImage src={product.imageUrl} alt={product.name} />
                <h2>{product.name}</h2>
                <p>Count: {product.count}</p>
                <p>Weight: {product.weight}</p>
              </ProductContainer>
            </StyledLink>
            <StyledIconButton onClick={() => onProductDeleteClick(product._id, product.name)}>
              <Delete />
            </StyledIconButton>
          </ProductWrapper>
        ))}
      </StyledGrid>
      <ProductFormModal formType="create" open={isCreateProductModalOpen} onClose={handleCreateProductModalClose} />
    </Container>
  )
}
export default HomePage
