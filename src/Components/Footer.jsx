// Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-100 text-base-content shadow-inner mt-8">
      <div className="container mx-auto px-4 py-8 md:flex md:justify-between md:items-start">
        {/* Left: Logo and description */}
        <div className="mb-6 md:mb-0">
          <Link to="/" className="text-2xl font-bold text-primary">
            StudyMate
          </Link>
          <p className="mt-2 text-secondary max-w-xs">
            StudyMate is a platform to help students connect and collaborate for
            better learning outcomes. Find study partners based on subjects,
            preferences, or nearby locations.
          </p>
        </div>

        {/* Right: Social links */}
        <div>
          <h3 className="font-semibold mb-2">Connect with us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom: copyright */}
      <div className="bg-neutral text-sm text-center py-3 mt-4">
        &copy; {new Date().getFullYear()} StudyMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
