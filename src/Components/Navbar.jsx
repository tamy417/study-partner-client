import React, { use, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import logo from "../assets/OIP (5).webp";
import { FaUser, FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          position: "center",
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
    <nav className="navbar bg-base-100 shadow-sm px-4 md:px-8 py-3 relative z-50">
      <NavLink to="/">
        <img
          src={logo}
          alt="StudyMate Logo"
          className="w-12 h-12 rounded-full border-2 border-blue-500 shadow-md object-cover"
        />
      </NavLink>

      <div className="flex-1">
        <NavLink to="/" className="text-xl font-semibold text-primary ml-2">
          StudyMate
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        <NavLink to="/" className="text-base-content hover:text-primary">
          Home
        </NavLink>
        <NavLink
          to="/find-partners"
          className="text-base-content hover:text-primary"
        >
          Find Partners
        </NavLink>

        {user ? (
          <>
            <NavLink
              to="/create-profile"
              className="text-base-content hover:text-primary"
            >
              Create Profile
            </NavLink>
            <NavLink
              to="/my-connections"
              className="text-base-content hover:text-primary"
            >
              My Connections
            </NavLink>

            {/* Profile Photo with Dropdown */}
            <div className="relative z-50">
              <img
                src={user?.photoURL || <FaUser />}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-blue-400 cursor-pointer hover:scale-105 transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border w-40 text-gray-700">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-blue-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="btn btn-sm btn-secondary text-white font-bold"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn btn-sm btn-neutral text-white font-bold"
            >
              Register
            </NavLink>
          </>
        )}

        {/* 🌗 Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-xl"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
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
        <ul className="menu menu-compact absolute top-16 right-4 bg-base-100 rounded-box shadow-lg p-4 space-y-2 md:hidden z-50">
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

          {/* 🌗 Theme Toggle (Mobile) */}
          <li>
            <button
              onClick={toggleTheme}
              className="btn btn-outline w-full flex items-center justify-center"
            >
              {theme === "dark" ? (
                <>
                  <FaSun className="mr-2" /> Light Mode
                </>
              ) : (
                <>
                  <FaMoon className="mr-2" /> Dark Mode
                </>
              )}
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
