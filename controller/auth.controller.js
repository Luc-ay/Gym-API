import bcrypt from 'bcryptjs'
import asynchWrapper from '../middleware/asyncwrapper.js'
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from '../middleware/customErrors.js'
import User from '../modles/USER.js'

export const registerUsers = asynchWrapper(async (req, res) => {
  const { name, email, password1, password2 } = req.body
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
  const verify = await User.findOne(email)
  if (!verify) {
    throw new NotFoundError('User does not exist.....Register')
  }

  const checkPassword = await bcrypt.compare(password, verify.password)
  if (!checkPassword) {
    throw new ValidationError('Email or Password not Match')
  }

  re
})
