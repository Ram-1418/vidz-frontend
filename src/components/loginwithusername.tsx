import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginWithUsername } from "../apiServices/userAuth";

// ✅ Zod schema
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
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
    loginWithUsername(data.username, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} placeholder="Enter username" />
      {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}

          {/* Password input */}
          <input
            type="password"
            {...register("password")}
            placeholder="Enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg 
                       hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
     
  );
};

export default LoginWithUsername;
