import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const { user } = use(AuthContext);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-semibold mb-4">You’re not logged in</h2>
        <Link to="/login" className="btn btn-primary">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-b from-blue-50 to-white px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center border border-gray-200">
        <div className="flex justify-center mb-4">
          <img
            src={user?.photoURL || <FaUser></FaUser>}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {user?.displayName || "Unknown User"}
        </h2>
        <p className="text-gray-600 mb-4">{user?.email}</p>
        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="btn btn-outline btn-primary rounded-full px-6"
          >
            Back to Home
          </Link>
          <Link
            to="/my-connections"
            className="btn btn-primary text-white rounded-full px-6"
          >
            My Connections
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
