import cors from 'cors';
import express from 'express';
import passport from 'passport';
import pino from 'pino-http';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import { router as LoginRouter } from '../routes/login.routes';
import { router as MeRouter } from '../routes/me.routes';
import { router as RegisterRouter } from '../routes/register.routes';
import { spec } from '../schemas/spec';


export default function Server() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(pino());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());

  app.use('/api/login', LoginRouter);
  app.use('/api/register', RegisterRouter);
  app.use('/api/users/me', MeRouter);
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(spec));

  return app;
}
