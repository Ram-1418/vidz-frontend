import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../../zod/registerSchems';
import type { RegisterType } from '../../zod/registerSchems';
import { registerUser } from '../../apiServices/userAuth';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const onsubmit = (data: RegisterType) => {
    console.log('✅ Submitted data:', data);
  registerUser(data)

  };


  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <input {...register('username')} placeholder="Enter a username" />
      {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}

      <input {...register('email')} placeholder="Enter your email" />
      {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

      <input {...register('fullName')} placeholder="Enter your full name" />
      {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName.message}</p>}

      {/* ✅ File input handled manually */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          setValue('avatar', file, { shouldValidate: true });
        }}
      />
      {errors.avatar && <p style={{ color: 'red' }}>{errors.avatar.message}</p>}

      <input type="password" {...register('password')} placeholder="Enter password" />
      {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegisterForm;
