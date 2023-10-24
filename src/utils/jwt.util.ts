import jwt from 'jsonwebtoken';
import { config } from '../config/default';
import { logger } from './logger';
const { accessTokenPrivateKey, accessTokenPublicKey } = config;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  try {
    return jwt.sign(object, accessTokenPrivateKey, {
      ...(options && options),
      algorithm: 'RS256',
    });
  } catch (error) {
    logger.info(`Error signing JWT:, ${error}`);
    throw error;
  }
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, accessTokenPublicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    logger.info(error.message);
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
}
