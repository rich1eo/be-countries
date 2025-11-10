import { StatusCodes } from 'http-status-codes';

import { CustomError } from './custom-errors';

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;

  constructor(message: string = 'Not Found') {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError() {
    return { message: this.message };
  }
}
