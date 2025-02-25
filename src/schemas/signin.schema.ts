import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(50, 'Email must be less than 50 characters'),
  password: z.string().min(10, 'Password must be at least 10 characters'),
});

export type TSignInSchema = z.infer<typeof signInSchema>;
