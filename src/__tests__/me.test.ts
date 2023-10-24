import supertest from 'supertest';
import { config } from '../config/default';
import { dataSource } from '../utils/connection';
import { signJwt } from '../utils/jwt.util';
import { logger } from '../utils/logger';
import Server from '../utils/server';
const { accessTokenTtl } = config;

const app = Server();

describe('HandleMe Controller', () => {
  beforeAll(async () => {
    await dataSource
      .initialize()
      .then((connection) => {
        logger.info('test Data Source has been initialized!');
      })
      .catch((err) => {
        logger.error(err);
      });
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('Given that the user is not authenticated', () => {
    it('Should return a 403 forbidden error', async () => {
      const response = await supertest(app).get('/api/users/me');
      expect(response.status).toBe(401);
    });
  });

  describe('Given an invalid token', () => {
    it('Should return a 401 unauthorized error', async () => {
      const invalidToken = 'invalid_jwt_token';
      const response = await supertest(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${invalidToken}`);

      expect(response.status).toBe(401);
    });
  });

  describe('Given an expired token', () => {
    it('Should return a 401 unauthorized error', async () => {
      // expired token for testing
      const expiredToken =
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6ImNsaWVudCIsImlzQWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIzLTEwLTE5VDE4OjIxOjA1LjYxNFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTEwLTE5VDE4OjIxOjA1LjYxNFoiLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwiYXZhdGFyIjoiaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzI1MCIsInBob3RvcyI6W119LCJpYXQiOjE2OTgxNzAyNDQsImV4cCI6MTY5ODE3MDMwNH0.HeuXZGsFIsWZJAZDm_qhgGAxxLwRJl1VOUzuFjWrWDZaijFhy5f4RojpjGteTqli6Z13MSnup2iA3H7OK5-Rredx2g6HY8Ivb4tui-jc-d8t6AAlME9aKuUEKlPaKNQxhrzhVGFohS1m9nFd-ePMm_f4bZvO5yuzJiHIVbHZWnDLfuEzE1AIcQb1GHEhLZ8u_7ARITEecgVS7xabm8Hs73Kd7g3g-QwX-C5Rgo72y65aC5NbC5iF9NUkPqPweRT_oUWnxnlryJBobEEV2qdnnoFjzGMiZtF98ELAxitwH2A_sdjYze_4t5I6H6rAoDcS6xQcl2OgTTN3exRl5ewEHw';
      const response = await supertest(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(response.status).toBe(401);
    });
  });

  describe('Given a valid authentication', () => {
    it('Should return the client details', async () => {
      const user = {
        email: 'john.doe@example.com',
        password: 'password1',
      };
      const token = signJwt(
        { user },
        { expiresIn: accessTokenTtl } // 60 minutes
      );

      const response = await supertest(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        'Client details retrieved successfully.'
      );
      expect(response.body.userinfo).toBeDefined();
    });
  });
});
