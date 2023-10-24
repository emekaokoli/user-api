import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { TokenExpiredError } from 'jsonwebtoken';
import { isEmpty, omit } from 'lodash';
import { TypeORMError } from 'typeorm';
import { config } from '../config/default';
import { validatePassword } from '../services/client.service';
import { signJwt } from '../utils/jwt.util';
const { accessTokenTtl } = config;

export async function loginHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const user = await validatePassword({ email, password });

    if (isEmpty(user) || typeof user === 'boolean') {
      return next(createError(401, 'invalid username or password'));
    }

    const accessToken = signJwt(
      { user: omit(user, ['password']) },
      { expiresIn: accessTokenTtl } // 60 minutes
    );

    return res.status(200).json({
      data: { accessToken },
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return next(createError(400, error));
    } else if (error instanceof Error && error.cause === TokenExpiredError) {
      return next(createError(401, 'Token expired'));
    } else if (error instanceof TypeORMError) {
      return next(createError(500, error));
    } else {
      return next(error);
    }
  }
}
