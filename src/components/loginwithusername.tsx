import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginWithUsername, loginWithEmail } from "../apiServices/userAuth";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

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
    // <div className="flex min-h-screen items-center justify-center bg-gray-100">
    //   <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md  border border-white/20 dark:bg-neutral-900 dark:border-neutral-800 p-10 rounded-3xl shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
    //     {/* Title */}
    //     <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
    //       Welcome Back 👋
    //     </h2>
    //     <p className="text-center text-black-300 mb-10 font-bold text-2xl">
    //       Login with your <span className="font-semibold text-blue-400">username</span> or <span className="font-semibold text-blue-400">email</span>
    //     </p>
    //     {/* Form */}
    //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    //       <label className="text-gray-700  mb-10 font-bold ">
    //         Username or Email
    //       </label>
    //       {/* Username */}
    //       <div>
    //         <input
    //           {...register("value")}
    //           placeholder="Enter username or email"
    //           className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-200
    //             focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
    //         />
    //         {errors.value && (
    //           <p className="text-red-500 text-sm mt-1">
    //             {errors.value.message}
    //           </p>
    //         )}
    //       </div>

    //       {/* Password */}
    //       <div>
    //         <input
    //           type="password"
    //           {...register("password")}
    //           placeholder="Enter password"
    //           autoComplete="current-password"
    //           className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-200
    //             focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none
    //                      "
    //         />
    //         {errors.password && (
    //           <p className="text-red-500 text-sm mt-1">
    //             {errors.password.message}
    //           </p>
    //         )}
    //       </div>

    //       {/* Submit Button */}

    //       <Button
    //         type="submit"
    //         disabled={isPending}
    //         className={` w-full bg-black text-white font-semibold py-2 rounded-lg
    //                    hover:bg-black-700 transition`}
    //       >
    //         {isPending ? "Logging in..." : "Login"}

    //       </Button>
    //     </form>

    //     <p className="">
    //       Don’t have an account?{" "}
    //       <span
    //         onClick={() => navigate("/")}
    //         className="text-blue-300 hover:underline cursor-pointer"
    //       >
    //         signup
    //       </span>
    //     </p>
    //   </div>
    // </div>

    <div className="h-screen w-screen   grid grid-cols-1  md:grid-cols-2  text-white ">
      <div className="md:flex flex-col justify-center items-center  h-screen bg-gradient-to-br from-pink-600 via-red-500 to-purple-700 p-12">
        <h1>Rameshwar patil mitr mandakl</h1>
      </div>

      <div className="flex justify-center items-center  w-full bg-neutral-900">
        <h2 className="font-bold text-2xl">helo for m chai aur code </h2>
      </div>
    </div>
  );
};

export default LoginWithUsername;
