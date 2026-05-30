import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser, setLoading, setError } from "../state/auth.state";
import {useHooks} from "../Hooks/auth.hooks.js"
import GoogleButton from "../components/GoogleButton.jsx";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {handleLogin} = useHooks()
  const { loading, error } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      dispatch(setLoading(true));
      const data = await handleLogin(formData);
      console.log(data.user)
      dispatch(setUser(data.user));
      navigate("/Aichat");
    } catch (loginError) {
      dispatch(
        setError(loginError.response?.data?.message || "Unable to login")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-black text-center mb-8">Login</h2>
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
              placeholder="Enter your email"
              disabled={loading}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                errors.email
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 focus:border-black bg-white"
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-black mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter your password"
              disabled={loading}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                errors.password
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 focus:border-black bg-white"
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition disabled:bg-gray-500 disabled:cursor-not-allowed mt-6"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-semibold uppercase text-gray-500">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <GoogleButton disabled={loading} />

        <p className="text-center text-gray-600 mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-black font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
