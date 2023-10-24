import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { AnyZodObject } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
      });
      next();
    } catch (error) {
      if (error) {
        next(createError(400, error));
      }
    }
  };
