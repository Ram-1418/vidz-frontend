import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginWithUsername, loginWithEmail } from "../apiServices/userAuth";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

// ✅ Zod schema validation
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

// ✅ Type inference from schema
type LoginType = z.infer<typeof loginSchema>;

const LoginWithUsername = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: LoginType) => {
    startTransition(async () => {
      console.log("Login data:", data);
      const { success } = z.email().safeParse(data.value);
      let response;

      if (success) {
        response = await loginWithEmail(data.value, data.password);
      } else {
        response = await loginWithUsername(data.value, data.password);
      }

      if (response.success) {
        navigate("/videos");
      }
    });
  };

  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-2 text-white">
      {/* LEFT SECTION */}
      <div className="md:flex flex-col justify-center items-center h-screen bg-gradient-to-br from-pink-600 via-red-500 to-purple-700 p-12">
        <h1 className="text-black font-extrabold text-5xl mb-4">Vidz </h1>
        <p className="text-lg opacity-90 leading-relaxed text-white font-bold text-center">
          Build, upload, and share your creativity with the world. Join us and
          make your content shine.
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col justify-center items-center w-full bg-neutral-950 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
          {/* Username / Email */}
          <div className="text-center">
            <label className="text-white font-bold">Username or Email</label>
          </div>

          <div>
            <input
              {...register("value")}
              placeholder="Enter username or email"
              className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-200
                focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none mt-3"
            />
            {errors.value && (
              <p className="text-red-500 text-sm mt-1">{errors.value.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter password"
              autoComplete="current-password"
              className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-200
                focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-neutral-200 transition"
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>

          {/* Signup Text (Now visible ✅) */}
          <p className="text-white text-center mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-300 hover:underline cursor-pointer"
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginWithUsername;
