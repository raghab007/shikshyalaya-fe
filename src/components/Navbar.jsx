import { Link } from "react-router-dom";
import Logo from "../assets/logo2.png"; // Assuming the logo image is saved here

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <img
          src={Logo}
          alt="Sikshyalaya Logo"
          className="w-12 h-12 rounded-md transition-transform duration-300 hover:scale-110"
        />
        <h1 className="text-2xl font-semibold text-blue-700 tracking-wide">
          <Link to="/" className="no-underline text-blue-700 hover:underline">
            Sikshyalaya
          </Link>
        </h1>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex justify-center w-1/2">
        <input
          type="search"
          placeholder="Search courses"
          className="w-full max-w-md px-4 py-2 border border-blue-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 justify-evenly w-1/3 lg:w-1/2">
        <Link to="/" className="no-underline">
          <button className="text-base font-medium text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
            Home
          </button>
        </Link>
        <Link to="/courses" className="no-underline">
          <button className="text-base font-medium text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
            Courses
          </button>
        </Link>
        <Link to="/about-us" className="no-underline">
          <button className="text-base font-medium text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
            About Us
          </button>
        </Link>
        <Link to="/login" className="no-underline">
          <button className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
            Login
          </button>
        </Link>
        <Link to="/signup" className="no-underline">
          <button className="px-5 py-2 text-sm font-medium text-blue-600 border-2 border-blue-600 rounded-md shadow-md hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
            Signup
          </button>
        </Link>
      </div>
    </nav>
  );
}

