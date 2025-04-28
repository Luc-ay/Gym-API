import asynchWrapper from '../middleware/asyncwrapper.js'
import { ValidationError } from '../middleware/customErrors.js'

export const registerUsers = asynchWrapper(async (req, res) => {
  const { name, email, password1, password2 } = req.body
  if (!name || !email || !password1 || !password2) {
    throw new ValidationError('All fields are required')
  }
  if (password1 !== password2) {
    throw new ValidationError('Password not match')
  }
})
export const loginUsers = asynchWrapper(async (req, res) => {
  console.log('Login is working')
})
