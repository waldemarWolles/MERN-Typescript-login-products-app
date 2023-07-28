import React from 'react'
import { styled } from '@mui/material/styles'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'

import { useForm } from 'react-hook-form'
import { AppDispatch } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { ProductFormModalProps, ProductFormType, ProductType } from '../types/product'
import { createProductThunk, updateProductThunk } from '../redux/redux/thunks/productsThunks'
import { useNavigate, useParams } from 'react-router-dom'

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  width: '400px',
  border: '1px solid #e6ecf0',
  borderRadius: '16px',
  margin: '50px auto',
}))

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
})

const ProductFormModal: React.FC<ProductFormModalProps> = ({ formType, initialValues, open, onClose }) => {
  const dispatch: AppDispatch = useDispatch()
  const { productId } = useParams()

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<ProductFormType>({
    defaultValues:
      formType === 'edit'
        ? initialValues
        : {
            size: {
              width: 0,
              height: 0,
            },
            imageUrl: '',
            name: '',
            count: 0,
            weight: '',
          },
    mode: 'onChange',
  })

  const onSubmit = async (values: ProductFormType) => {
    values =
      formType === 'edit'
        ? {
            ...values,
            size: {
              width: Number(values.size.width),
              height: Number(values.size.height),
            },
            count: Number(values.count),
          }
        : values
    const data: any =
      formType === 'create'
        ? await dispatch(createProductThunk(values))
        : await (productId && dispatch(updateProductThunk({ payload: values, productId })))
    if (!data?.payload) {
      return alert(`Failed to ${formType} product!`)
    }
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{formType === 'create' ? 'Create Product' : 'Edit Product'}</DialogTitle>
      <DialogContent>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            label="Width"
            type="number"
            error={Boolean(errors.size?.width?.message)}
            helperText={errors.size?.width?.message}
            {...register('size.width', {
              required: 'Please enter a width',
              min: {
                value: 0,
                message: 'Width must be greater than or equal to 0',
              },
            })}
            fullWidth
          />

          <StyledTextField
            label="Height"
            type="number"
            error={Boolean(errors.size?.height?.message)}
            helperText={errors.size?.height?.message}
            {...register('size.height', {
              required: 'Please enter a height',
              min: {
                value: 0,
                message: 'Height must be greater than or equal to 0',
              },
            })}
            fullWidth
          />

          <StyledTextField
            label="Image URL"
            type="text"
            error={Boolean(errors.imageUrl?.message)}
            helperText={errors.imageUrl?.message}
            {...register('imageUrl', {
              required: 'Please enter an image URL',
              pattern: {
                value: /^https?:\/\/.+$/i,
                message: 'Please enter a valid URL',
              },
            })}
            fullWidth
          />

          <StyledTextField
            label="Name"
            type="text"
            error={Boolean(errors.name?.message)}
            helperText={errors.name?.message}
            {...register('name', {
              required: 'Please enter a name',
              maxLength: {
                value: 50,
                message: 'Name cannot exceed 50 characters',
              },
            })}
            fullWidth
          />

          <StyledTextField
            label="Count"
            type="number"
            error={Boolean(errors.count?.message)}
            helperText={errors.count?.message}
            {...register('count', {
              required: 'Please enter a count',
              min: {
                value: 0,
                message: 'Count must be greater than or equal to 0',
              },
            })}
            fullWidth
          />

          <StyledTextField
            label="Weight"
            type="text"
            error={Boolean(errors.weight?.message)}
            helperText={errors.weight?.message}
            {...register('weight', {
              required: 'Please enter a weight',
              maxLength: {
                value: 10,
                message: 'Weight cannot exceed 10 characters',
              },
            })}
            fullWidth
          />
        </StyledForm>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          {formType === 'create' ? 'Create' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductFormModal
