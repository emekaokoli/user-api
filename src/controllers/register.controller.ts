import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { isEmpty } from 'lodash';
import { TypeORMError } from 'typeorm';
import { findUser } from '../services/client.service';
import { createClient } from '../services/register.service';

export async function registerHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      firstName,
      lastName,
      email,
      role,
      active,
      password,
      photos,
      avatar,
    } = req.body;

    const user = await findUser(req.body.email);
    // if user is not empty
    if (!isEmpty(user) && user.email === req.body.email) {
      return next(
        createError(409, "There's an account associated with this email")
      );
    }

    const newClient = await createClient({
      firstName,
      lastName,
      email,
      role,
      active,
      password,
      photos,
      avatar,
    });
    return res.status(201).json({
      data: { user: newClient },
    });
  } catch (error: unknown) {
    if (error instanceof TypeORMError) {
      return next(createError(500, error));
    } else {
      return next(createError(500, 'Internal server error.'));
    }
  }
}
