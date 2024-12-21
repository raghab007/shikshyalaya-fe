import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import Logo from "../assets/logo2.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <img
              src={Logo}
              alt="Sikshyalaya Logo"
              className="w-10 h-10 rounded-md transition-transform duration-300 hover:scale-110"
            />
            <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
              <Link to="/" className="no-underline text-blue-600 hover:underline">
                Sikshyalaya
              </Link>
            </h1>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 justify-center">
            <input
              type="search"
              placeholder="Search courses"
              className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
              aria-label="Search"
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinkItem to="/" label="Home" />
            <NavLinkItem to="/courses" label="Courses" />
            <NavLinkItem to="/about-us" label="About Us" />
            <LinkButton to="/login" label="Login" primary />
            <LinkButton to="/signup" label="Signup" />
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center md:hidden space-x-4">
            <button
              className="text-gray-600 hover:text-blue-600 transition"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle Search"
            >
              <FiSearch size={24} />
            </button>
            <button
              className="text-gray-600 hover:text-blue-600 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="block md:hidden py-2">
            <input
              type="search"
              placeholder="Search courses"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
              aria-label="Search"
            />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-white border-t border-gray-200 shadow-md md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <NavLinkItem to="/" label="Home" />
            <NavLinkItem to="/courses" label="Courses" />
            <NavLinkItem to="/about-us" label="About Us" />
            <LinkButton to="/login" label="Login" primary />
            <LinkButton to="/signup" label="Signup" />
          </ul>
        </div>
      )}
    </nav>
  );
}

function NavLinkItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-medium ${
          isActive ? "text-blue-600 font-bold" : "text-gray-700"
        } hover:text-blue-600 transition duration-300 ease-in-out`
      }
    >
      {label}
    </NavLink>
  );
}

function LinkButton({ to, label, primary }) {
  const buttonClass = primary
    ? "px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-md hover:from-blue-600 hover:to-blue-700 transition"
    : "px-4 py-2 text-sm font-medium text-blue-600 border-2 border-blue-600 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition";

  return (
    <Link to={to} className="no-underline">
      <button className={buttonClass}>{label}</button>
    </Link>
  );
}
