import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-linear-to-b from-gray-100 to-white">
      <div className="text-center px-6">
        <h1 className="text-9xl font-extrabold text-gray-300 mb-6">404</h1>
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
      <div className="mt-12">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 Illustration"
          className="w-80 mx-auto"
        />
      </div>
    </div>
  );
};

export default NotFound;
