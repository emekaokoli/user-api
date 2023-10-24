import express from 'express';
import { loginHandler } from '../controllers/login.controller';
import { validate } from '../middleware/validateResource';
import { loginSchema } from '../schemas/login.schema';

export const router = express.Router();

router.route('/').post(validate(loginSchema), loginHandler);
