import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

export const spec: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'CobbleWeb',
    version: '1.0.0',
    description: 'User API documentation',
  },
  servers: [
    {
      url: 'http://localhost:1337',
    },
  ],
  paths: {
    '/api/users/me': {
      get: {
        tags: ['Me'],
        summary: 'Get user info',
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ClientDetails',
                },
              },
            },
          },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
          '400': { description: 'Bad request, wrong input type' },
          '500': { description: 'Internal server error' },
        },
      },
    },
    '/api/login': {
      post: {
        tags: ['Login'],
        summary: 'Login a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginOutput',
                },
              },
            },
          },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
          '400': { description: 'Bad request, wrong input type' },
          '500': { description: 'Internal server error' },
        },
      },
    },
    '/api/register': {
      post: {
        tags: ['Register'],
        summary: 'Register a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RegisterInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RegisterOutput',
                },
              },
            },
          },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
          '409': { description: 'This account already exist' },
          '400': { description: 'Bad request, wrong input type' },
          '500': { description: 'Internal server error' },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      Authorization: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    headers: {},
    schemas: {
      Error: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
        },
      },
      LoginInput: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
      },
      LoginOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              accessToken: { type: 'string' },
            },
          },
        },
      },
      RegisterInput: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          active: { type: 'boolean' },
          photos: { type: 'array', items: { type: 'string' } },
          role: { type: 'string' },
        },
      },
      RegisterOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              user: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  firstName: { type: 'string' },
                  lastName: { type: 'string' },
                  active: { type: 'boolean' },
                  photos: { type: 'array', items: { type: 'string' } },
                  role: { type: 'string' },
                  fullName: { type: 'string' },
                },
              },
            },
          },
        },
      },
      ClientDetails: {
        type: 'object',
        properties: {
          email: { type: 'string' },
        },
      },
    },
  },
};
