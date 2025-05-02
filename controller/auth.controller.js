import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import asynchWrapper from '../middleware/asyncwrapper.js'
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from '../middleware/customErrors.js'
import User from '../modles/USER.js'

export const registerUsers = asynchWrapper(async (req, res) => {
  const { name, email, password1, password2, role } = req.body
  if (!name || !email || !password1 || !password2) {
    throw new ValidationError('All fields are required')
  }
  if (password1 !== password2) {
    throw new ValidationError('Password not match')
  }

  const existingUser = await User.findOne(email)
  if (existingUser) {
    throw new ConflictError('User already Exist....Please Login')
  }

  const salt = 10
  hashedPassword = await bcrypt.hash(password2, salt)

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  })

  newUser.password = null
  res.status(201).json({
    Message: 'User Created',
    newUser,
  })
})

// Login Controller
export const loginUsers = asynchWrapper(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new ValidationError('All field is required')
  }
  const user = await User.findOne(email)
  if (!user) {
    throw new NotFoundError('User does not exist.....Register')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new ValidationError('Email or Password not Match')
  }

  // Generate Token
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  )
  user.password = null

  res.status(200).json({
    token,
    user,
  })
})
