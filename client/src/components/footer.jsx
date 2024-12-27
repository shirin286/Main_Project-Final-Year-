import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const CustomFooter = () => {
  return (
    <div className="relative bg-gradient-to-t from-cyan-900 to-black mt-20">
      {/* Wave Shape */}
      <div className="absolute inset-x-0 bottom-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
        >
        </svg>
      </div>

      <div className="text-white text-center pt-20 pb-8 relative z-10">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 text-2xl mb-6">
          <a href="#" className="hover:text-blue-300">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-blue-300">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-blue-300">
            <FaLinkedin />
          </a>
          <a href="#" className="hover:text-blue-300">
            <FaInstagram />
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm mb-6">
          <a href="#" className="hover:text-blue-300">
            Home
          </a>
          <a href="#" className="hover:text-blue-300">
            About
          </a>
          <a href="#" className="hover:text-blue-300">
            Services
          </a>
          <a href="#" className="hover:text-blue-300">
            Team
          </a>
          <a href="#" className="hover:text-blue-300">
            Contact
          </a>
        </nav>

        {/* Footer Text */}
        <p className="text-xs text-gray-400">
          ©2024 HUMAN CYBORG | All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default CustomFooter;
