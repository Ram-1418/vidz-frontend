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
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-neutral-900 p-6 rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {/* Email or Username */}
        <div>
          <input
            type="text"
            placeholder="Email or Username"
            {...register("value", {
              required: "Email or Username is required",
            })}
            className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700"
          />
          {errors.value && (
            <p className="text-red-500 text-sm mt-1">{errors.value.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-black py-2 rounded font-semibold"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-pink-500">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
