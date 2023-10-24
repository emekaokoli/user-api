import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import 'reflect-metadata';
import { TypeORMError } from 'typeorm';
import { config } from './config/default';
import { dataSource } from './utils/connection';
import { logger } from './utils/logger';
import Server from './utils/server';

const { port } = config;

const app = Server();

app.listen(port, async () => {
  logger.info(`Server is running on port ${port}`);
  // db init connection
  dataSource
    .initialize()
    .then((connection) => {
      logger.info('Data Source has been initialized!');
    })
    .catch((err: unknown) => {
      if (err instanceof TypeORMError) {
        logger.error(err.message);
      } else if (err instanceof Error) {
        logger.error(err.message);
      } else {
        logger.error('An internal error has occured');
      }
    });
});

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = createError(404, 'Not Found');
  next(err);
});

app.use(
  (
    err: createError.HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Send a user-friendly response
    return res.status(err.status || 500).send({
      success: false,
      message: err.message,
    });
  }
);

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at:', ${promise}, 'reason:', ${reason}`);
  process.exit(1);
});
