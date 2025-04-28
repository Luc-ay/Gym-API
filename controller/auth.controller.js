import asynchWrapper from '../middleware/asyncwrapper.js'
import { ConflictError, ValidationError } from '../middleware/customErrors.js'
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

  const newUser = await User.create({
    name,
    email,
    password: password2,
  })

  res.status(201).json({
    Message: 'User Created',
    newUser,
  })
})

// Login Controller
export const loginUsers = asynchWrapper(async (req, res) => {
  console.log('Login is working')
})
