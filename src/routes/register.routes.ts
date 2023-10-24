import express from 'express';
import { registerHandler } from '../controllers/register.controller';
import { validate } from '../middleware/validateResource';
import { registerSchema } from '../schemas/register.schema'; // Update the path

export const router = express.Router();

router.route('/').post(validate(registerSchema), registerHandler);
