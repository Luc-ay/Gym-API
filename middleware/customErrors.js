import CustomError from './appError.js'

export class NotFoundError extends CustomError {
  constructor(message = 'Resource not found') {
    super(message, 404)
  }
}

export class ValidationError extends CustomError {
  constructor(message = 'Invalid input') {
    super(message, 400)
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized') {
    super(message, 401)
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden') {
    super(message, 403)
  }
}

export class InternalError extends CustomError {
  constructor(message = 'Internal Server Error') {
    super(message, 500)
  }
}

export class ConflictError extends CustomError {
  constructor(message = 'Already Exist before, try again') {
    super(message, 409)
  }
}
