import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSearch, FiMenu, FiX, FiUser, FiChevronDown } from "react-icons/fi";
import Logo from "../assets/logo2.png";
import { useRecoilState } from "recoil";
import { userProfileSelector } from "../store/atoms/profle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userState, setUserState] = useRecoilState(userProfileSelector);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest(".profile-dropdown")) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileDropdownOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserState(null);
    window.location.href = "/login";
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-[#2e7dad] transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src={Logo}
                alt="Logo"
                className="w-10 h-10 rounded-md group-hover:scale-105 transition-transform duration-300"
              />
              <h1 className="text-2xl font-bold text-white tracking-wide group-hover:text-gray-200 transition-colors duration-300">
                Sikshyalaya
              </h1>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 justify-center mx-8">
            <form
              onSubmit={handleSearch}
              className="relative w-full max-w-lg group"
            >
              <input
                type="search"
                placeholder="Search courses..."
                className="w-full px-4 py-2 pl-10 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-white/60 shadow-md transition-all duration-300 bg-white/90 group-hover:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <FiSearch
                  size={18}
                  className="text-gray-500 group-hover:text-blue-600 transition-colors duration-300"
                />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinkItem to="/" label="Home" />
            <NavLinkItem to="/courses" label="Courses" />
            <NavLinkItem to="/about-us" label="About Us" />

            {userState && <NavLinkItem to="/enrolled" label="Enrolled" />}

            {!userState ? (
              <div className="flex items-center space-x-3">
                <LinkButton to="/login" label="Login" primary />
                <LinkButton to="/signup" label="Signup" />
              </div>
            ) : (
              <UserProfile
                username={userState.userName || "User"}
                isOpen={isProfileDropdownOpen}
                setIsOpen={setIsProfileDropdownOpen}
                logout={logout}
              />
            )}
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center md:hidden space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white p-1"
            >
              <FiSearch size={22} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-1"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="block md:hidden py-3 px-2 border-t border-blue-500/30 animate-fadeIn">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder="Search courses..."
                className="w-full px-4 py-2 pl-10 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-white shadow-md transition-all duration-300 bg-white/90"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <FiSearch size={18} className="text-gray-500" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-72 bg-gradient-to-br from-blue-700 to-blue-600 shadow-lg z-50 md:hidden overflow-y-auto">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white p-2"
              >
                <FiX size={22} />
              </button>
            </div>
            <div className="flex flex-col items-start space-y-6 py-6 px-8">
              <MobileNavLink
                to="/"
                label="Home"
                onClick={() => setIsMenuOpen(false)}
              />
              <MobileNavLink
                to="/courses"
                label="Courses"
                onClick={() => setIsMenuOpen(false)}
              />
              {userState && (
                <MobileNavLink
                  to="/enrolled"
                  label="Enrolled"
                  onClick={() => setIsMenuOpen(false)}
                />
              )}
              <MobileNavLink
                to="/about-us"
                label="About Us"
                onClick={() => setIsMenuOpen(false)}
              />

              <div className="w-full border-t border-blue-500/30 pt-6 mt-4"></div>

              {!userState ? (
                <div className="flex flex-col space-y-3 w-full">
                  <MobileLinkButton
                    to="/login"
                    label="Login"
                    primary
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <MobileLinkButton
                    to="/signup"
                    label="Sign Up"
                    onClick={() => setIsMenuOpen(false)}
                  />
                </div>
              ) : (
                <div className="w-full">
                  <MobileUserProfile
                    username={userState.userName || "User"}
                    onClick={() => setIsMenuOpen(false)}
                    logout={logout}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

// Reusable Components
function NavLinkItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-medium px-2 py-1 ${
          isActive
            ? "text-white font-bold after:block after:w-full after:h-0.5 after:bg-white after:rounded"
            : "text-gray-200 hover:text-white"
        } transition-colors duration-300`
      }
    >
      {label}
    </NavLink>
  );
}

function MobileNavLink({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `text-base font-medium w-full px-2 py-2 ${
          isActive ? "text-white font-bold" : "text-gray-200 hover:text-white"
        } transition-colors duration-300`
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
        className={`px-5 py-2 text-sm font-medium rounded-full shadow-md transition-all duration-300 ${
          primary
            ? "text-white bg-white/20 hover:bg-white/40"
            : "text-white border border-white hover:bg-white hover:text-blue-700"
        }`}
      >
        {label}
      </button>
    </Link>
  );
}

function MobileLinkButton({ to, label, primary, onClick }) {
  return (
    <Link to={to} onClick={onClick} className="w-full">
      <button
        className={`w-full px-5 py-3 text-base font-medium rounded-lg shadow-md transition-all duration-300 ${
          primary
            ? "text-white bg-white/20 hover:bg-white/30"
            : "text-white border border-white hover:bg-white hover:text-blue-700"
        }`}
      >
        {label}
      </button>
    </Link>
  );
}

function UserProfile({ username, isOpen, setIsOpen, logout }) {
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
        <FiChevronDown
          size={16}
          className={`text-white transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fadeIn">
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <div className="flex items-center space-x-2">
              <FiUser size={14} />
              <span>Your Profile</span>
            </div>
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Settings
          </Link>
          <div className="border-t border-gray-200 my-1"></div>
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

function MobileUserProfile({ username, onClick, logout }) {
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
        className="block w-full text-gray-200 hover:text-white mb-2 p-3 hover:bg-blue-600/50 rounded-lg"
      >
        <div className="flex items-center space-x-2">
          <FiUser size={16} />
          <span>Profile Settings</span>
        </div>
      </Link>

      <button
        onClick={logout}
        className="block w-full text-left text-red-300 hover:text-red-200 p-3 hover:bg-blue-600/50 rounded-lg"
      >
        Log out
      </button>
    </div>
  );
}
