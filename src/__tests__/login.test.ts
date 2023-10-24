import supertest from 'supertest';
import { dataSource } from '../utils/connection';
import { logger } from '../utils/logger';
import Server from '../utils/server';

const app = Server();

describe('login', () => {
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

  describe('Get the login route', () => {
    describe('Given a successful login', () => {
      it('Should return a 200 and accessToken', async () => {
        const email = 'john.doe@example.com';
        const password = 'password1';

        const response = await supertest(app)
          .post('/api/login')
          .send({ email, password });

        expect(response.status).toBe(200);
        expect(response.body.data.accessToken).toBeDefined();
      });
    });

    describe('Given that a user does not exist', () => {
      it('Should return a 401', async () => {
        const email = 'john.doe@example.com';
        const password = 'password';

        const response = await supertest(app)
          .post('/api/login')
          .send({ email, password });

        expect(response.status).toBe(401);
      });
    });

    describe('Given incorrect password', () => {
      it('Should return a 401', async () => {
        const email = 'john.doe@example.com';
        const password = 'incorrectPassword';

        const response = await supertest(app)
          .post('/api/login')
          .send({ email, password });

        expect(response.status).toBe(401);
      });
    });

    describe('Given missing email or password', () => {
      it('Should return a 400', async () => {
        const response = await supertest(app)
          .post('/api/login')
          .send({ email: 'john.doe@example.com' }); // Missing password

        expect(response.status).toBe(400);
      });

      it('Should return a 400', async () => {
        const response = await supertest(app)
          .post('/api/login')
          .send({ password: 'password1' }); // Missing email

        expect(response.status).toBe(400);
      });
    });

    describe('Given empty email or password', () => {
      it('Should return a 401', async () => {
        const response = await supertest(app)
          .post('/api/login')
          .send({ email: '', password: 'password1' });

        expect(response.status).toBe(401);
      });

      it('Should return a 400', async () => {
        const response = await supertest(app)
          .post('/api/login')
          .send({ email: 'john.doe@example.com', password: '' });

        expect(response.status).toBe(401);
      });
    });
  });
});
