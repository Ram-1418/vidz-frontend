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
    <div className=" h-screen w-screen min-h-screen grid grid-cols-1 md:grid-cols-2 bg-neutral-950 text-white">
      {/* Left Section - Branding */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-pink-600 via-red-500 to-purple-700 p-12">
        <div className="max-w-md text-center">
          <h1 className="text-5xl font-extrabold mb-4">Vidz Frontend</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Build, upload, and share your creativity with the world. Join us and make your content shine.
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex justify-center items-center bg-neutral-950 px-6 md:px-12 w-full">
        <form
          onSubmit={handleSubmit(onSubmit)} 
       className="w-full max-w-sm"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

          <div className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <input
                {...register("username")}
                id="username"
                placeholder="Enter a username"
                className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-200 
                focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-200 
                focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                {...register("fullName")}
                id="fullName"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-200 
                focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Avatar Upload */}
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-300 mb-1">
                Profile Picture
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setValue("avatar", file, { shouldValidate: true });
                }}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 
                file:rounded-md file:border-0 file:font-semibold file:bg-neutral-800 file:text-pink-400 
                hover:file:bg-neutral-700 cursor-pointer"
              />
              {errors.avatar && (
                <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Enter password"
                className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-200 
                focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full py-2 mt-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-md transition duration-200"
            >
              Register
            </Button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-neutral-700"></div>
              <span className="px-3 text-gray-500 text-sm">OR</span>
              <div className="flex-grow h-px bg-neutral-700"></div>
            </div>

            {/* GitHub Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-neutral-700 
              hover:bg-neutral-800 text-gray-300 rounded-md py-2 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5C5.648.5.5 5.648.5 12S5.648 23.5 12 23.5 23.5 18.352 23.5 12 18.352.5 12 .5zm1.313 20.5v-6.844h2.29l.344-2.664h-2.634V9.313c0-.773.215-1.297 1.328-1.297h1.418V5.586c-.246-.031-1.094-.105-2.078-.105-2.059 0-3.469 1.257-3.469 3.566v1.988H7.313v2.664h2.199V21H13.313z" />
              </svg>
              Sign up with Email
            </button>

            {/* Footer */}
            <div className="flex justify-between text-sm text-gray-400 mt-6">
              <a href="#" className="hover:text-pink-400 transition">Forgot password?</a>
              <a href="/login" className="hover:text-pink-400 transition">Sign in</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
