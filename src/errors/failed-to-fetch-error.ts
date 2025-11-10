import { StatusCodes } from 'http-status-codes'

import { CustomError } from './custom-errors'

export class FailedToFetchError extends CustomError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  constructor(message: string = 'Failed to fetch data') {
    super(message)

    Object.setPrototypeOf(this, FailedToFetchError.prototype)
  }

  serializeError() {
    return { message: this.message }
  }
}
