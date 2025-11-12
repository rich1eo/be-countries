import { StatusCodes } from 'http-status-codes'

import { CustomError } from './custom-errors'

export class CacheError extends CustomError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  constructor(message: string = 'Cache Error') {
    super(message)

    Object.setPrototypeOf(this, CacheError.prototype)
  }

  serializeError() {
    return { message: this.message }
  }
}
