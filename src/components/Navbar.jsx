import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiSearch, FiMenu, FiX, FiUser } from "react-icons/fi";
import Logo from "../assets/logo2.png";
import { useRecoilState } from "recoil";
import userState from "../store/atoms/user";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [state] = useRecoilState(userState);

  const isLogin = state;
  const username = "User";

  return (
    <nav className="sticky top-0 bg-white shadow-lg border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src={Logo}
            alt="Sikshyalaya Logo"
            className="w-12 h-12 rounded-md hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-2xl font-bold text-blue-600 tracking-wide hover:text-blue-700 transition-colors duration-300">
            <Link to="/">Sikshyalaya</Link>
          </h1>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center mx-8">
          <div className="relative w-full max-w-lg">
            <input
              type="search"
              placeholder="Search courses..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
              aria-label="Search"
            />
            <FiSearch
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLinkItem to="/" label="Home" />
          <NavLinkItem to="/courses" label="Courses" />
          <NavLinkItem to="/about-us" label="About Us" />
          {!isLogin ? (
            <>
              <LinkButton to="/login" label="Login" primary />
              <LinkButton to="/signup" label="Signup" />
            </>
          ) : (
            <UserProfile username={username} />
          )}
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center md:hidden space-x-4">
          <button
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <FiSearch size={24} />
          </button>
          <button
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="block md:hidden py-2 px-4 bg-gray-50">
          <div className="relative">
            <input
              type="search"
              placeholder="Search courses..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
              aria-label="Search"
            />
            <FiSearch
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden">
            <div className="flex flex-col items-center space-y-6 py-8">
              <NavLinkItem to="/" label="Home" />
              <NavLinkItem to="/courses" label="Courses" />
              <NavLinkItem to="/about-us" label="About Us" />
              {!isLogin ? (
                <>
                  <LinkButton to="/login" label="Login" primary />
                  <LinkButton to="/signup" label="Signup" />
                </>
              ) : (
                <UserProfile username={username} />
              )}
            </div>
          </div>
        </>
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
        } hover:text-blue-600 transition-colors duration-300`
      }
    >
      {label}
    </NavLink>
  );
}

function LinkButton({ to, label, primary }) {
  return (
    <Link to={to}>
      <button
        className={`px-4 py-2 text-sm font-medium rounded-full shadow-md transition-all duration-300 ${
          primary
            ? "text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            : "text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
        }`}
      >
        {label}
      </button>
    </Link>
  );
}

function UserProfile({ username }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
        {username.charAt(0).toUpperCase()}
      </div>
      <span className="text-sm font-medium text-gray-700">{username}</span>
      <Link
        to="/profile"
        className="px-3 py-1 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300"
      >
        Profile
      </Link>
    </div>
  );
}