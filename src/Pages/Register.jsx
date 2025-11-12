import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router";

const Register = () => {
  const { createUser, googleSignIn, loading } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    // Password validation
    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      toast.error(
        "Password must be at least 6 characters with at least one uppercase and one lowercase letter."
      );
      return;
    }

    createUser(email, password)
      .then(() => {
        toast.success("Registration successful!");
        navigate(from, { replace: true });
        e.target.reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleRegister = () => {
    googleSignIn()
      .then(() => {
        toast.success("Google registration successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-b from-green-100 to-white">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Create Your StudyMate Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Connect and collaborate with study partners
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-900"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-900"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-900"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-900"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 underline">
            Login
          </Link>
        </div>

        <div className="mt-6">
          <button
            onClick={handleGoogleRegister}
            disabled={loading}
            className="btn bg-white text-black border-[#e5e5e5] w-full"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            {loading ? "Loading..." : "Register with Google"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
