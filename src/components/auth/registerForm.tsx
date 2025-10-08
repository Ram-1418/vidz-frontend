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

 const onSubmit = async (data: RegisterType) => {
  try {
    console.log("✅ Submitted data:", data);
    await registerUser(data);
  } catch (err) {
    console.error("❌ Registration failed:", err);
  }
};


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md space-y-4 mt-9"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        Create Account
      </h2>

      {/* Username */}
      <div>
        <label htmlFor="username"  className="block text-sm  font-bold">Username</label>
        <input
          {...register("username")}
          placeholder="Enter a username"
          className="w-full px-4 py-2 border rounded-lg "
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="username"  className="block text-sm  font-medium">Email</label>
        <input
          {...register("email")}
          placeholder="Enter your email"
          type="email"
          className="w-full px-4 py-2 border rounded-lg "
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="username"  className="block text-sm  font-medium">FullName</label>
        <input
          {...register("fullName")}
          placeholder="Enter your full name"
          className="w-full px-4 py-2 border rounded-lg "
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Avatar Upload */}
      <div>
        <label htmlFor="username"  className="block text-sm  font-medium">File</label>
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
        <label htmlFor="username"  className="block text-sm  font-medium">Password</label>
        <input
          type="password"
          {...register("password")}
          placeholder="Enter password"
          className="w-full px-4 py-2 border rounded-lg "
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
