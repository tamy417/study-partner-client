import React, { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const { signInUser, googleSignIn, loading, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        setError("");
        toast.success("Login successful!");
        setTimeout(() => {
          navigate(from, { replace: true });
          setLoading(false);
        }, 1500);
      })

      .catch((error) => {
        console.error("Firebase login error:", error);

        let message = "Login failed. Please try again.";
        switch (error.code) {
          case "auth/invalid-credential":
          case "auth/invalid-login-credentials":
            message = "Invalid email or password.";
            break;
          case "auth/user-not-found":
            message = "No user found with this email.";
            break;
          case "auth/wrong-password":
            message = "Incorrect password.";
            break;
          case "auth/invalid-email":
            message = "Invalid email format.";
            break;
          default:
            message = error.message || "Something went wrong.";
        }

        setError(message);
        toast.error(message);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-b from-blue-100 to-white">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Welcome to StudyMate
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Find your perfect study partner
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-600 hover:text-blue-600"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className=" text-gray-600">Forget Password?</p>
        </form>

        <div className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </div>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border-[#e5e5e5] w-full"
          >
            Login with Google
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default LoginPage;
