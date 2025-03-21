import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSearch, FiMenu, FiX, FiUser, FiChevronDown } from "react-icons/fi";
import Logo from "../assets/logo2.png";
import { useRecoilState } from "recoil";
import userRecoilState from "../store/atoms/user";
import { userProfileSelector } from "../store/atoms/profle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userState, setUserState] = useRecoilState(userRecoilState);
  const [state, setState] = useRecoilState(userProfileSelector);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileDropdownOpen]);

  return (
    <nav 
      style={{ backgroundColor: "#2e7dad" }} 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navbar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src={Logo}
                alt="Sikshyalaya Logo"
                className="w-10 h-10 rounded-md group-hover:scale-105 transition-transform duration-300"
              />
              <h1 className="text-2xl font-bold text-white tracking-wide group-hover:text-gray-200 transition-colors duration-300">
                Sikshyalaya
              </h1>
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center mx-8">
            <div className="relative w-full max-w-lg group">
              <input
                type="search"
                placeholder="Search courses..."
                className="w-full px-4 py-2 pl-10 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-white/60 shadow-md transition-all duration-300 bg-white/90 group-hover:bg-white"
                aria-label="Search"
              />
              <FiSearch
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-blue-600 transition-colors duration-300"
              />
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinkItem to="/" label="Home" />
            <NavLinkItem to="/courses" label="Courses" />
            <NavLinkItem to="/about-us" label="About Us" />
            
            {!userState ? (
              <div className="flex items-center space-x-3">
                <LinkButton to="/login" label="Login" primary />
                <LinkButton to="/signup" label="Signup" />
              </div>
            ) : (
              <UserProfile 
                username={state.userName || "Raghab"} 
                isOpen={isProfileDropdownOpen}
                setIsOpen={setIsProfileDropdownOpen}
              />
            )}
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center md:hidden space-x-4">
            <button
              className="text-white hover:text-gray-200 transition-colors duration-300 focus:outline-none p-1"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <FiSearch size={22} />
            </button>
            <button
              className="text-white hover:text-gray-200 transition-colors duration-300 focus:outline-none p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="block md:hidden py-3 px-2 border-t border-blue-500/30 animate-fadeIn">
            <div className="relative">
              <input
                type="search"
                placeholder="Search courses..."
                className="w-full px-4 py-2 pl-10 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-white shadow-md transition-all duration-300 bg-white/90"
                aria-label="Search"
                autoFocus
              />
              <FiSearch
                size={18}
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
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          ></div>
          <div className="fixed inset-y-0 right-0 w-72 bg-gradient-to-br from-blue-700 to-blue-600 shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white p-2 hover:bg-blue-600 rounded-full transition-colors duration-300"
                aria-label="Close menu"
              >
                <FiX size={22} />
              </button>
            </div>
            <div className="flex flex-col items-start space-y-6 py-6 px-8">
              <MobileNavLink to="/" label="Home" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/courses" label="Courses" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/enrolled-courses" label="Enrolled Courses" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/about-us" label="About Us" onClick={() => setIsMenuOpen(false)} />
              
              <div className="w-full border-t border-blue-500/30 pt-6 mt-4"></div>
              
              {!userState ? (
                <div className="flex flex-col space-y-3 w-full">
                  <MobileLinkButton to="/login" label="Login" primary onClick={() => setIsMenuOpen(false)} />
                  <MobileLinkButton to="/signup" label="Sign Up" onClick={() => setIsMenuOpen(false)} />
                </div>
              ) : (
                <div className="w-full">
                  <MobileUserProfile username={state.userName || "Raghab"} onClick={() => setIsMenuOpen(false)} />
                </div>
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
        `text-sm font-medium relative px-2 py-1 ${
          isActive 
            ? "text-white font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:rounded" 
            : "text-gray-200"
        } hover:text-white transition-colors duration-300`
      }
    >
      {label}
    </NavLink>
  );
}

// Mobile NavLink Component
function MobileNavLink({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `text-base font-medium px-2 py-2 w-full ${
          isActive ? "text-white font-bold" : "text-gray-200"
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
        className={`px-5 py-2 text-sm font-medium rounded-full shadow-md transition-all duration-300 ${
          primary
            ? "text-white bg-white bg-opacity-20 hover:bg-opacity-40 hover:shadow-lg"
            : "text-white border border-white hover:bg-white hover:text-blue-700"
        }`}
      >
        {label}
      </button>
    </Link>
  );
}

// Mobile LinkButton Component
function MobileLinkButton({ to, label, primary, onClick }) {
  return (
    <Link to={to} onClick={onClick} className="w-full">
      <button
        className={`w-full px-5 py-3 text-base font-medium rounded-lg shadow-md transition-all duration-300 ${
          primary
            ? "text-white bg-white bg-opacity-20 hover:bg-opacity-30"
            : "text-white border border-white hover:bg-white hover:text-blue-700"
        }`}
      >
        {label}
      </button>
    </Link>
  );
}

// User Profile Component
function UserProfile({ username, isOpen, setIsOpen }) {
  return (
    <div className="relative profile-dropdown">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 group px-2 py-1 rounded-md hover:bg-white/10 transition-colors duration-300"
      >
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-700 font-bold shadow-md">
          {username.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-white">{username}</span>
        <FiChevronDown size={16} className={`text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fadeIn">
          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300">
            <div className="flex items-center space-x-2">
              <FiUser size={14} />
              <span>Your Profile</span>
            </div>
          </Link>
          <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300">
            Settings
          </Link>
          <div className="border-t border-gray-200 my-1"></div>
          <button 
            onClick={() => {
              // Add logout functionality here
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-300"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

// Mobile User Profile Component
function MobileUserProfile({ username, onClick }) {
  return (
    <div className="w-full">
      <div className="flex items-center space-x-3 mb-4 p-3 bg-white/10 rounded-lg">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-700 font-bold shadow-md">
          {username.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <span className="text-base font-medium text-white">{username}</span>
          <span className="text-xs text-gray-300">Student</span>
        </div>
      </div>
      
      <Link 
        to="/profile" 
        onClick={onClick}
        className="block w-full text-gray-200 hover:text-white mb-2 p-3 hover:bg-blue-600/50 rounded-lg transition-colors duration-300"
      >
        <div className="flex items-center space-x-2">
          <FiUser size={16} />
          <span>Profile Settings</span>
        </div>
      </Link>
      
      <button 
        onClick={() => {
          // Add logout functionality here
          onClick();
        }}
        className="block w-full text-left text-red-300 hover:text-red-200 p-3 hover:bg-blue-600/50 rounded-lg transition-colors duration-300"
      >
        Log out
      </button>
    </div>
  );
}