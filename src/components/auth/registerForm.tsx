
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { registerSchema } from '../../zod/registerSchems';

const RegisterForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors } } = useForm(
            { resolver: zodResolver(registerSchema) }

        );

    console.log(errors);

    const onsubmit = (data: any) => {
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <input
                {...register("username")}
                placeholder='Enter a username'
            />
            {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
            <input
                {...register("email")}
                placeholder='Enter your email'
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
            <input
                {...register("fullName")}
                placeholder='Enter your full name'
            />
            {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName.message}</p>}
            <input
                type="file"
                accept="image/*"

                {...register('avatar', {
                    onChange: (e) => {
                        const fileList = e.target.files;
                        console.log(fileList);
                        setValue('avatar', fileList ? fileList[0] : null)
                    },
                })}
            />
            {errors.avatar && <p style={{ color: 'red' }}>{errors.avatar.message}</p>}
            <input
                {...register("password")}
            />
            {errors.password && <p style={{ color: 'red' }}> {errors.password.message}</p>}

            <button>Submit</button>
        </form>
    )

}
export default RegisterForm