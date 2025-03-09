import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiSearch, FiMenu, FiX, FiUser } from "react-icons/fi";
import Logo from "../assets/logo2.png"; // Replace with your logo path
import { useRecoilState } from "recoil";
import userRecoilState from "../store/atoms/user";
import { userProfileSelector } from "../store/atoms/profle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userState,setUserState] = useRecoilState(userRecoilState);
  const [state, setState] = useRecoilState(userProfileSelector)
  const username = "Raghab Pokhrel"; // Replace with dynamic username

  return (
    <nav style={{backgroundColor:"#2e7dad"}} className="sticky top-0  shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navbar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <div className="flex items-center space-x-3">
            <img
              src={Logo}
              alt="App Logo"
              className="w-10 h-10 rounded-md hover:scale-105 transition-transform duration-300"
            />
            <h1 className="text-2xl font-bold text-white tracking-wide hover:text-gray-200 transition-colors duration-300">
              <Link to="/">Sikshyalaya</Link>
            </h1>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center mx-8">
            <div className="relative w-full max-w-lg">
              <input
                type="search"
                placeholder="Search courses..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white shadow-sm transition-all duration-300"
                aria-label="Search"
              />
              <FiSearch
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinkItem to="/" label="Home" />
            <NavLinkItem to="/courses" label="Courses" />
         
            <NavLinkItem to="/about-us" label="About Us" />
            {!userState ? (
              <>
              
                <LinkButton to="/login" label="Login" primary />
                <LinkButton to="/signup" label="Signup" />
               
              </>
            ) : (
              <UserProfile username={state.userName} />
            )}
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center md:hidden space-x-4">
            <button
              className="text-white hover:text-gray-300 transition-colors duration-300"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <FiSearch size={24} />
            </button>
            <button
              className="text-white hover:text-gray-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="block md:hidden py-2 px-4 bg-blue-600">
            <div className="relative">
              <input
                type="search"
                placeholder="Search courses..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white shadow-sm transition-all duration-300"
                aria-label="Search"
              />
              <FiSearch
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className="fixed inset-y-0 right-0 w-64 bg-blue-700 shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden">
            <div className="flex flex-col items-center space-y-6 py-8">
              <NavLinkItem to="/" label="Home" />
              <NavLinkItem to="/courses" label="Courses" />
              <NavLinkItem to="/enrolled-courses" label="Enrolled Courses" />
              <NavLinkItem to="/about-us" label="About Us" />
              {!userState ? (
                <>
                  <LinkButton to="/login" label="Login" primary />
                  <LinkButton to="/signup" label="Signup" />
                </>
              ) : (
                <UserProfile username={state.userName} />
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

// Reusable NavLink Component
function NavLinkItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-medium ${
          isActive ? "text-white font-bold" : "text-gray-300"
        } hover:text-white transition-colors duration-300`
      }
    >
      {label}
    </NavLink>
  );
}

// Reusable LinkButton Component
function LinkButton({ to, label, primary }) {
  return (
    <Link to={to}>
      <button
        className={`px-4 py-2 text-sm font-medium rounded-full shadow-md transition-all duration-300 ${
          primary
            ? "text-white bg-white bg-opacity-20 hover:bg-opacity-30"
            : "text-white border-2 border-white hover:bg-white hover:text-blue-700"
        }`}
      >
        {label}
      </button>
    </Link>
  );
}

// User Profile Component
function UserProfile({ username }) {
  username = "Raghab"
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-700 font-bold">
        {username.charAt(0).toUpperCase()}
      </div>
      <span className="text-sm font-medium text-white">{username}</span>
      <Link
        to="/profile"
        className="px-3 py-1 text-sm text-white bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors duration-300"
      >
        Profile
      </Link>
    </div>
  );
}