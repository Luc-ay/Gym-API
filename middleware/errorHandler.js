import CustomError from './appError.js'

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  console.error(err) //logs for debugging
  res.status(500).json({
    success: false,
    message: 'Something Went Wrong',
  })
}

export default errorHandlerMiddleware
