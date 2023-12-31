import { describe, expect } from '@jest/globals';
import supertest from 'supertest';
import { dataSource } from '../utils/connection';
import { logger } from '../utils/logger';
import Server from '../utils/server';

const app = Server();

describe('Register', () => {
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

  describe('User registration', () => {
    it('should return a 201 status code for a valid registration', async () => {
      const response = await supertest(app)
        .post('/api/register')
        .send({
          firstName: 'Jamess',
          lastName: 'Doee',
          email: 'jamess.does@example.com',
          password: 'password1223',
          role: 'user',
          active: false,
          photos: [
            {
              name: 'janeimage',
              data: 'data:image/png;base64,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',
              mimeType: 'image/png',
            },
          ],
        });
console.log({ EMEKA: response.body });

      expect(response.status).toBe(201);
    });

    it('should return a 400 status code for incomplete registration data', async () => {
      const response = await supertest(app).post('/api/register').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'user',
        active: true,
        phot: [], //introduced field name error
      });

      expect(response.status).toBe(400);
    });

    it('should return a 409 status code for duplicate email registration', async () => {
      const response = await supertest(app).post('/api/register').send({
        firstName: 'James',
        lastName: 'Doe',
        email: 'james.doe@example.com',
        password: 'password122',
        role: 'user',
        active: false,
        photos: [],
      });

      expect(response.status).toBe(409);
    });

    it('should return a 400 status code for an invalid email format', async () => {
      const response = await supertest(app).post('/api/register').send({
        firstName: 'Invalid',
        lastName: 'Email',
        email: 'invalid-email[at]example.com',
        password: 'password789',
        role: 'user',
        active: false,
        photos: [],
      });

      expect(response.status).toBe(400);
    });
  });
});
