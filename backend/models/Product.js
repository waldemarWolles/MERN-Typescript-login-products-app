import mongoose from 'mongoose'

import UserModel from './User.js'

const ProductSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
      required: true,
    },
    size: {
      width: {
        type: Number,
        default: 0,
        required: true,
      },
      height: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    weight: {
      type: String,
      required: true,
    },

    comments: {
      type: Array,
      default: [],
    },
    user: {
      type: mongoose.ObjectId,
      ref: UserModel,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Product', ProductSchema)
