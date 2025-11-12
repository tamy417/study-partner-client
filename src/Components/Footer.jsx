import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router";
import logo from "../assets/OIP (5).webp";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-blue-900 to-blue-200 text-white relative pt-16 pb-8 mt-12">
      <div className="container mx-auto px-4 md:flex md:justify-between md:items-start space-y-8 md:space-y-0">
        <div className="md:w-1/3 flex flex-col items-start space-y-4">
          <img
            src={logo}
            alt="StudyMate Logo"
            className="w-16 h-16 rounded-full border-2 border-white shadow-lg object-cover"
          />
          <h2 className="text-2xl font-bold">StudyMate</h2>
          <p className="text-white/80">
            Your ultimate platform to find study partners, collaborate
            effectively, and achieve your academic goals. Connect by subjects,
            locations, or study mode.
          </p>
          <div className="flex space-x-4 text-xl mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-300 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-300 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-300 transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-300 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="md:w-1/3 flex flex-col space-y-4">
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <Link
            to="/find-partners"
            className="hover:text-yellow-300 transition"
          >
            Find Partners
          </Link>
          <Link
            to="/create-profile"
            className="hover:text-yellow-300 transition"
          >
            Create Profile
          </Link>
          <Link
            to="/my-connections"
            className="hover:text-yellow-300 transition"
          >
            My Connections
          </Link>
          <Link to="/login" className="hover:text-yellow-300 transition">
            Login
          </Link>
          <Link to="/register" className="hover:text-yellow-300 transition">
            Register
          </Link>
        </div>

        <div className="md:w-1/3 flex flex-col space-y-4">
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p>Email: support@studymate.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Knowledge St, Education City</p>
          <p className="mt-4 italic text-white/80">
            “Learning is better together.”
          </p>
        </div>
      </div>

      <div className="border-t border-white/30 mt-8 pt-4 text-center text-white/80 text-sm">
        &copy; {new Date().getFullYear()} StudyMate. All Rights Reserved.
      </div>

      {/* Optional: a wave/curve */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 rotate-180">
        <svg
          className="relative block w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0V46.29c47.64,22,103.64,33.16,158.68,39.69C301.2,97,408,60.36,511.83,36.24,586,19,662.56,7.56,737.8,17.29,815,27.46,889.43,60,963,75.88c81.11,17.88,160.12,10.24,237,0V0Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
