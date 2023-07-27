import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductType } from '../features/products-store/types/product'
import { selectCurrentProduct, selectProductsStatus } from '../features/products-store/redux/redux/selectors/productsSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, Button, CircularProgress } from '@mui/material'
import { fetchOneProductThunk } from '../features/products-store/redux/redux/thunks/productsThunks'
import { AppDispatch } from '../redux/store'
import { ProductFormModal } from '../features/products-store/components'

type Props = {}

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '16px',
})

const CircularProgressContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
})

const ProductImage = styled('img')({
  maxWidth: '300px',
  height: 'auto',
  marginBottom: '8px',
})

const ProductDetailsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
})

const CommentList = styled(List)({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
})

const CommentItem = styled(ListItem)({
  marginBottom: '8px',
})

const ProductDetailsPage: React.FC<Props> = () => {
  const dispatch: AppDispatch = useDispatch()

  const currentProduct: ProductType | null = useSelector(selectCurrentProduct)
  const status = useSelector(selectProductsStatus)
  const { productId } = useParams()

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (productId) {
      dispatch(fetchOneProductThunk(productId))
    }
  }, [])

  const handleEditProductClick = () => {
    setModalOpen(true)
  }

  const handleEditProductModalClose = () => {
    setModalOpen(false)
  }

  if (status === 'pending') {
    return (
      <CircularProgressContainer>
        <CircularProgress />
      </CircularProgressContainer>
    )
  }

  if (!currentProduct) {
    return <div>Product not found</div>
  }

  return (
    <>
      <Container>
        <Typography variant="h4">ProductDetailsPage</Typography>
        <ProductDetailsContainer>
          <ProductImage src={currentProduct.imageUrl} alt={currentProduct.name} />
          <Typography variant="h5">{currentProduct.name}</Typography>

          <Typography variant="body1">{currentProduct.count}</Typography>
          <Typography variant="body1">
            {currentProduct.size.width} x {currentProduct.size.height}
          </Typography>
          <Typography variant="body1">{currentProduct.weight}</Typography>
          <Divider />
          <CommentList>
            {currentProduct.comments.map((comment, index) => (
              <CommentItem key={index}>
                <ListItemIcon>
                  <Typography variant="body1">{index + 1}.</Typography>
                </ListItemIcon>
                <ListItemText primary={comment} />
              </CommentItem>
            ))}
          </CommentList>
          <Button variant="contained" color="primary" onClick={handleEditProductClick}>
            Edit Product
          </Button>
        </ProductDetailsContainer>
      </Container>
      <ProductFormModal formType="edit" initialValues={currentProduct} open={modalOpen} onClose={handleEditProductModalClose} />
    </>
  )
}

export default ProductDetailsPage
