import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithUsername } from "../../apiServices/userAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/zod/loginSchems";
import { useAuth } from "@/context/AuthContext";

type LoginFormData = {
  value: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { setUser, isLoggedin } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const isEmail = data.value.includes("@");

      const response = isEmail
        ? await loginWithEmail(data.value, data.password)
        : await loginWithUsername(data.value, data.password);

      if (response.success) {
        const user = response.data.user;
        setUser(user);
      }
    } catch (error: any) {
      setError("root", { message: error.message || "failed to login " });
      console.error(error);
      console.error("Login failed", error);
    }
  };
  // cdonsole.log("user", user);
  if (isLoggedin) {
    navigate("/");
  }
 return (
  <div className="min-h-screen flex">
    
    {/* LEFT SIDE (Gradient + Branding) */}
    <div className="hidden md:flex w-1/2 bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 items-center justify-center text-center px-10">
      <div>
        <h1 className="text-5xl font-bold mb-4">Vidz</h1>
        <p className="text-white/80 text-lg">
          Welcome back! <br />
          Continue exploring and sharing your creativity.
        </p>
      </div>
    </div>

    {/* RIGHT SIDE (Login Form) */}
     <div className="flex w-full md:w-1/2 h-screen items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 space-y-5"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>

        {/* Email or Username */}
        <div>
          <input
            type="text"
            placeholder="Email or Username"
            {...register("value")}
            className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700"
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
            placeholder="Password"
            {...register("password")}
            className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-pink-600 hover:bg-pink-700 transition py-2 rounded font-semibold"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-pink-500">
            Signup
          </Link>
        </p>
      </form>
    </div>
  </div>
);
};

export default Login;
