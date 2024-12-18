import { Link } from "react-router-dom";
import { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import Logo from "../assets/logo2.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <img
          src={Logo}
          alt="Sikshyalaya Logo"
          className="w-12 h-12 rounded-md transition-transform duration-300 hover:scale-110"
        />
        <h1 className="text-2xl font- semibold text-blue-700 tracking-wide">
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
          aria-label="Search"
        />
      </div>

      {/* Mobile Search Icon */}
      <button
        className="block md:hidden text-gray-600 hover:text-blue-600 transition"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        aria-label="Toggle Search"
      >
        <FiSearch size={24} />
      </button>

      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 px-4 py-2 bg-white shadow-md md:hidden">
          <input
            type="search"
            placeholder="Search courses"
            className="w-full px-4 py-2 border border-blue-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            aria-label="Search"
          />
        </div>
      )}

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-6">
        <NavLink to="/" label="Home" />
        <NavLink to="/courses" label="Courses" />
        <NavLink to="/about-us" label="About Us" />
        <LinkButton to="/login" label="Login" primary />
        <LinkButton to="/signup" label="Signup" />
      </div>

      {/* Mobile Menu Icon */}
      <button
        className="block md:hidden text-gray-600 hover:text-blue-600 transition"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <NavLink to="/" label="Home" />
            <NavLink to="/courses" label="Courses" />
            <NavLink to="/about-us" label="About Us" />
            <LinkButton to="/login" label="Login" primary />
            <LinkButton to="/signup" label="Signup" />
          </ul>
        </div>
      )}
    </nav>
  );
}


function NavLink({ to, label }) {
  return (
    <Link to={to} className="no-underline">
      <button className="text-base font-medium text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
        {label}
      </button>
    </Link>
  );
}

function LinkButton({ to, label, primary }) {
  const buttonClass = primary
    ? "px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
    : "px-5 py-2 text-sm font-medium text-blue-600 border-2 border-blue-600 rounded-md shadow-md hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105";

  return (
    <Link to={to} className="no-underline">
      <button className={buttonClass}>{label}</button>
    </Link>
  );
}
