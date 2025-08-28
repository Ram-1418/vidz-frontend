import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginWithUsername } from '../apiServices/userAuth';

// ✅ Zod schema
const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// ✅ Inferred type
type LoginType = z.infer<typeof loginSchema>;

// ✅ React component
const LoginWithUsername = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginType) => {
    console.log("Login data:", data);
    loginWithUsername(data.username,data.password)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}
    className='max-w-md mx-auto bg-white dark:bg-neutral-900 p-6 rounded-2xl  shadow-md space-y-4'>
      <input {...register('username')} placeholder="Enter username" />
      {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}

      <input type="password" {...register('password')} placeholder="Enter password" />
      {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginWithUsername;
