import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'

import { ProductController, UserController } from './controllers/index.js'
import { createProductValidation, loginValidation, registerValidation, updateProductValidation } from './validations.js'
import { checkAuth, handleValidationErrors } from './utils/index.js'

mongoose
  .connect('mongodb+srv://test-username:0000@inforce-test-task-mern1.6wwzbez.mongodb.net/')
  .then(() => console.log('DB work fine!'))
  .catch((error) => console.log(error + 'error'))

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 2222

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/products', ProductController.getAll)
app.get('/products/:id', ProductController.getOne)
app.post('/products', checkAuth, createProductValidation, handleValidationErrors, ProductController.create)
app.patch('/products/:id', checkAuth, updateProductValidation, handleValidationErrors, ProductController.update)
app.delete('/products/:id', checkAuth, ProductController.remove)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
