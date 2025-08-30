import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../zod/registerSchems";
import type { RegisterType } from "../../zod/registerSchems";
import { registerUser } from "../../apiServices/userAuth";
import { Button } from "../ui/button";

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
    console.log("✅ Submitted data:", data);
    registerUser(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="max-w-md mx-auto bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Create Account
      </h2>

      {/* Username */}
      <div>
        <input
          {...register("username")}
          placeholder="Enter a username"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          {...register("email")}
          placeholder="Enter your email"
          type="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Full Name */}
      <div>
        <input
          {...register("fullName")}
          placeholder="Enter your full name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Avatar Upload */}
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setValue("avatar", file, { shouldValidate: true });
          }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                     file:rounded-lg file:border-0 file:text-sm 
                     file:font-semibold file:bg-blue-50 file:text-blue-700 
                     hover:file:bg-blue-100"
        />
        {errors.avatar && (
          <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          {...register("password")}
          placeholder="Enter password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
