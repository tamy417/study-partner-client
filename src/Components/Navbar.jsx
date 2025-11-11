import React, { use, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = use(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign-out successful.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="navbar bg-base-100 shadow-sm px-4 md:px-8 py-3">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="text-xl font-semibold text-primary">
          StudyMate
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/" className="text-base-content hover:text-primary">
          Home
        </Link>
        <Link
          to="/find-partners"
          className="text-base-content hover:text-primary"
        >
          Find Partners
        </Link>
        {user ? (
          <>
            <Link
              to="/create-profile"
              className="text-base-content hover:text-primary"
            >
              Create Profile
            </Link>
            <Link
              to="/my-connections"
              className="text-base-content hover:text-primary"
            >
              My Connections
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-primary text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-sm btn-secondary text-white font-bold"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm btn-neutral text-white font-bold"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          className="btn btn-square btn-ghost"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <ul className="menu menu-compact absolute top-16 right-4 bg-base-100 rounded-box shadow-lg p-4 space-y-2 md:hidden">
          <li>
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <Link to="/find-partners" className="hover:text-primary font-bold">
              Find Partners
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  to="/create-profile"
                  className="hover:text-primary font-bold"
                >
                  Create Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/my-connections"
                  className="hover:text-primary font-bold"
                >
                  My Connections
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-primary w-full text-white font-bold"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="btn btn-secondary w-full text-white font-bold"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="btn btn-neutral w-full text-white font-bold"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
