
import {  z } from 'zod/v4';
const registerSchema = z.object({
    username: z.string().min(3, { message: 'Username is required' }),
    email: z.string().email({ message: 'Email is required and must be valid' }),
    fullName: z.string().min(1, { message: 'Full name is required' }),
     avatar: z
    .instanceof(File, { message: 'Avatar is required and must be a file' })
    .refine(file => file.size > 0, { message: 'File cannot be empty' }),

    password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
});

export type RegisterType = z.infer<typeof registerSchema>;
export {registerSchema}