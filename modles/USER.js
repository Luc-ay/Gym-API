import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 16,
    },
    age: {
      type: Number,
      min: 18,
      max: 65,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female'],
    },
  },
  { timestamps: true }
)

const User = mongoose.model('users', userSchema)

export default User
