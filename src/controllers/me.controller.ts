import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import { TypeORMError } from 'typeorm';
import { Client } from '../entity/client.entity';

export async function HandleMe(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userinfo = req.user as Client;

  if (isEmpty(req.user)) {
    return next(createError(401, 'Not authorized, You must log in to access this content.'));
  }

  try {
    return res.status(200).json({
      message: 'Client details retrieved successfully.',
      userinfo,
    });
  } catch (error: unknown) {
    if (error instanceof JsonWebTokenError) {
      return next(createError(401, 'Invalid token'));
    } else if (error instanceof TokenExpiredError) {
      return next(createError(401, 'Token expired'));
    } else if (error instanceof TypeORMError) {
      return next(createError(500, 'Database error'));
    } else {
      return next(createError(500, 'Internal server error.'));
    }
  }
}
