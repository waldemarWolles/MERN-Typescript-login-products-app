import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('UserModel', UserSchema)
