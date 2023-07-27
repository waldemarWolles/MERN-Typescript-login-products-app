import { body } from 'express-validator'

export const registerValidation = [
  body('email', 'Email is Wrong').isEmail(),
  body('password').isLength({ min: 5 }),
  body('firstName').isLength({ min: 2 }).isString(),
  body('lastName').isLength({ min: 2 }).isString(),
  body('avatarUrl').optional().isString(),
]

export const loginValidation = [body('email', 'Email is Wrong').isEmail(), body('password').isLength({ min: 5 })]

export const createProductValidation = [
  body('imageUrl', 'Image Url is Wrong').isString(),
  body('name').isLength({ min: 3 }).isString(),
  body('count').exists(),
  body('size').isObject(),
  body('weight').isString(),
  body('comments').optional().isArray(),
]

export const updateProductValidation = [
  body('imageUrl', 'Image Url is Wrong').optional().isString(),
  body('name').isLength({ min: 3 }).optional().isString(),
  body('count').optional().exists(),
  body('size').optional().isObject(),
  body('weight').optional().isString(),
  body('comments').optional().isArray(),
]
