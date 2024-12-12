import {z} from 'zod';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, 'Password Required'),
});

export const signUpSchema = z.object({
	name: z.string().trim().min(3, 'Minimum 3 characters required'),
	email: z.string().email(),
	password: z.string().min(8, 'Password must be 8 characters long'),
});
