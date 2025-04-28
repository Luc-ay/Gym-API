import express from 'express'
import { loginUsers, registerUsers } from '../controller/auth.controller.js'

const routes = express.Router()

// Auth ROutes
routes.post('/register', registerUsers)
routes.post('/login', loginUsers)

export default routes
