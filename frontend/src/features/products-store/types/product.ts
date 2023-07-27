import { User } from '../../authentication/types/auth'

export type ProductType = {
  size: {
    width: number
    height: number
  }
  _id: string
  imageUrl: string
  name: string
  count: number
  weight: string
  comments: string[]
  user: Partial<User> | string
  createdAt: string
  updatedAt: string
}

export type ProductFormType = {
  size: {
    width: number
    height: number
  }
  imageUrl: string
  name: string
  count: number
  weight: string
  comments?: string[]
}

export type ProductUpdateStatus = {
  success: boolean
}

export type ProductFormModalProps = {
  formType: 'create' | 'edit'
  initialValues?: Partial<ProductType>
  open: boolean
  onClose: () => void
}
