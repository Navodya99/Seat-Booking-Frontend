import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 h-20 items-center ">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-7xl">
        <div className="text-white text-2xl font-bold">
          <Link to="/">NTC </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex space-x-6 md:space-x-8 items-center`}
        >
          <Link
            to="/"
            className="block text-white hover:text-gray-400 transition duration-300"
          >
            Home
          </Link>
         
          <Link
            to="/login"
            className="block text-white hover:text-gray-400 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
