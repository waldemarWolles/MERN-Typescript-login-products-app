import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CommentFormType, ProductType } from '../features/products-store/types/product'
import { selectCurrentProduct, selectProductsStatus } from '../features/products-store/redux/redux/selectors/productsSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, Button, CircularProgress, TextField } from '@mui/material'
import { fetchOneProductThunk, updateProductThunk } from '../features/products-store/redux/redux/thunks/productsThunks'
import { AppDispatch } from '../redux/store'
import { ProductFormModal } from '../features/products-store/components'
import { useForm } from 'react-hook-form'

type Props = {}

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '150px',
  backgroundColor: '#333',
  height: '100vh',
  color: '#fff',
  paddingBottom: '50px',
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
  justifyContent: 'center',
  gap: '50px',
  alignItems: 'center',
  textAlign: 'center',
})

const ProductDetailsInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
})

const CommentsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const CommentList = styled(List)({
  marginTop: '16px',
})

const CommentItem = styled(ListItem)({
  display: 'flex',
  alignItems: 'flex-start',
  paddingTop: '16px',
  paddingBottom: '16px',
})

const CommentIcon = styled(ListItemIcon)({
  marginRight: '8px',
})

const StyledButton = styled(Button)({
  margin: '30px',
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

  const { register, handleSubmit, reset } = useForm<CommentFormType>({
    defaultValues: { comment: '' },
    mode: 'onChange',
  })

  const onSubmitCreateComment = async (values: CommentFormType) => {
    const newComment = values.comment

    const data: any = await (productId &&
      currentProduct?.comments &&
      dispatch(updateProductThunk({ payload: { ...currentProduct, comments: [...currentProduct.comments, newComment] }, productId })))

    if (!data.payload) {
      return alert(`Failed to add comment!`)
    }

    reset()
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
        <StyledButton variant="contained" color="primary" onClick={handleEditProductClick}>
          Edit Product
        </StyledButton>
        <ProductDetailsContainer>
          <ProductDetailsInfo>
            <ProductImage src={currentProduct.imageUrl} alt={currentProduct.name} />
            <Typography variant="h5">{currentProduct.name}</Typography>
            <Typography variant="body1">{currentProduct.count}</Typography>
            <Typography variant="body1">
              {currentProduct.size.width} x {currentProduct.size.height}
            </Typography>
            <Typography variant="body1">{currentProduct.weight}</Typography>
          </ProductDetailsInfo>
          <Divider />
          <CommentsContainer>
            <CommentList>
              {currentProduct.comments.map((comment, index) => (
                <CommentItem key={index}>
                  <CommentIcon>
                    <Typography variant="body1">{index + 1}.</Typography>
                  </CommentIcon>
                  <ListItemText primary={comment} />
                </CommentItem>
              ))}
            </CommentList>

            <form onSubmit={handleSubmit(onSubmitCreateComment)}>
              <TextField
                label="Comment"
                {...register('comment', { required: true })}
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary">
                Add Comment
              </Button>
            </form>
          </CommentsContainer>
        </ProductDetailsContainer>
      </Container>
      <ProductFormModal formType="edit" initialValues={currentProduct} open={modalOpen} onClose={handleEditProductModalClose} />
    </>
  )
}

export default ProductDetailsPage
