
import { useForm } from "react-hook-form";
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginWithUsername, loginWithEmail } from "../apiServices/userAuth";


// ✅ Zod schema


const loginSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Username or Email is required" })
    .refine(
      (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(val) || /^[a-zA-Z0-9_]+$/.test(val); 
      },
      { message: "Must be a valid username or email" }
    ),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});




// ✅ Inferred type
type LoginType = z.infer<typeof loginSchema>;

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
    const { success } = z.email().safeParse(data.value)
    if (success) {
      loginWithEmail(data.value, data.password);
      return
    }
    loginWithUsername(data.value, data.password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <input
              {...register("value")}
              placeholder="Enter username or email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.value && (
              <p className="text-red-500 text-sm mt-1">
                {errors.value.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter password"
                autoComplete="current-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg 
                       hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginWithUsername;
