import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import { errorHandlerMiddleware } from './middleware/errorHandler.js'

dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(morgan('dev'))

// Routes
app.use('/auth', authRoutes)

// Error Handler
app.use(errorHandlerMiddleware)

// Server PORT
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Web is working on port: ${PORT}`)
})
