import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string({
    required_error: 'username is Required'
  }),
  email: z.string({
    required_error: 'Email is Required'
  }),
  password: z.string({
    required_error: 'Password is Required'
  }).min(6),
  alias: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().min(4)
});