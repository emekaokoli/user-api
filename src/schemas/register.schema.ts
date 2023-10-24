import { array, object, string, z } from 'zod';

const photoSchema = z.object({
  name: string({
    required_error: 'name of photo is required',
  }),
  data: string({
    required_error: 'data of photo is required',
  }).url(),
  mimeType: z.string({
    required_error: 'mimeType of photo is required',
  }),
});

export const registerSchema = object({
  body: object({
    firstName: string({
      required_error: 'firstName is required',
    })
      .min(2)
      .max(25),
    lastName: string({
      required_error: 'lastName is required',
    })
      .min(2)
      .max(25),
    email: string({
      required_error: 'email is required',
    }).email('email is not valid'),
    password: string({
      required_error: 'password is required',
    })
      .min(6, 'password must be at least 6 characters long')
      .max(50, 'password must be at most 50 characters long')
      .regex(/^(?=.*[0-9])/, 'Should contain atleast a number'),
    role: z.enum(['user', 'admin']),
    photos: array(photoSchema),
    avatar: string().url().optional(),
  }),
});


export type registerTypeInput = z.infer<typeof registerSchema>;
