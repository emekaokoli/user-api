import { generateSchema } from '@anatine/zod-openapi';
import { object, string, z } from 'zod';

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),
  }),
});

export const loginInputSchema = object({
    email: string({
      required_error: 'Email is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),
 
});

const token = z.object({
  accessToken: z.string(),
});

export const loginResponseSchema = generateSchema(
  z.object({
    data: z.object({ token }),
  })
);

export const loginOpenApiSchema = generateSchema(loginSchema);

export type LoginTypeInput = z.infer<typeof loginInputSchema>;
export type AccessToken = z.infer<typeof token>;
