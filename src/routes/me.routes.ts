import express from 'express';
import passport from 'passport';
import { HandleMe } from '../controllers/me.controller';
import '../middleware/passport-config';

export const router = express.Router();

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), HandleMe);

