import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomError } from '../errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.serializeError());
  }

  console.error(err.stack);

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: 'Internal Server Error' });
};
