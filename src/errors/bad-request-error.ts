import { StatusCodes } from 'http-status-codes';

import { CustomError } from './custom-errors';

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;

  constructor(message: string = 'Bad Request') {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError() {
    return { message: this.message };
  }
}
