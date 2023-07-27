import ProductModel from '../models/Product.js'

export const create = async (req, res) => {
  try {
    const doc = new ProductModel({
      imageUrl: req.body.imageUrl,
      name: req.body.name,
      count: req.body.count,
      size: req.body.size,
      weight: req.body.weight,
      comments: req.body.comments,
      user: req.userId,
    })

    const product = await doc.save()
    res.json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

export const update = async (req, res) => {
  try {
    const productId = req.params.id

    const updatedProduct = await ProductModel.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        count: req.body.count,
        size: req.body.size,
        weight: req.body.weight,
        comments: req.body.comments,
        user: req.userId,
      },
      {
        new: true,
      }
    )

    if (!updatedProduct) {
      res.status(404).json({
        message: 'Product not found ',
      })
    }

    res.json(updatedProduct)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const products = await ProductModel.find().populate('user').exec()

    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong with finding products',
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await ProductModel.findById(productId)

    if (!product) {
      res.status(404).json({
        message: 'Product not found ',
      })
    }

    res.json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong with finding product',
    })
  }
}

export const remove = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await ProductModel.findByIdAndDelete(productId)

    if (!product) {
      res.status(404).json({
        message: 'Product not found',
      })
    }

    res.json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong with finding product',
    })
  }
}
