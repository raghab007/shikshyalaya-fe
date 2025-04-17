import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { useRecoilState } from "recoil";
import { userProfileSelector } from "../store/atoms/profle";
import Logo from "../assets/logo2.png";

export default function Navbar() {
  const [userState, setUserState] = useRecoilState(userProfileSelector);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const searchInputRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchExpanded(false);
      setSearchQuery("");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserState(null);
    setIsProfileOpen(false);
    window.location.href = "/login";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-sky-700 shadow-lg" : "bg-sky-600"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src={Logo}
                alt="Sikshyalaya Logo"
                className="h-9 w-9 object-contain rounded transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-white font-bold text-xl tracking-tight transition-opacity duration-300 group-hover:opacity-90">
                Sikshyalaya
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 px-6">
            <div className="flex space-x-1">
              <NavItem to="/" label="Home" />
              <NavItem to="/courses" label="Courses" />
              <NavItem to="/about-us" label="About Us" />
              {userState && <NavItem to="/enrolled" label="My Learning" />}
            </div>
          </div>

          {/* Desktop Right Side: Search, Auth/Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="relative">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="search"
                  placeholder="Search courses..."
                  className="w-64 py-2 pl-9 pr-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-200 focus:outline-none focus:bg-white/20 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                >
                  <FiSearch size={16} />
                </button>
              </form>
            </div>

            {/* Auth Buttons or Profile */}
            {!userState ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-5 py-1.5 text-sm font-medium rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-1.5 text-sm font-medium bg-white rounded-full text-sky-600 hover:bg-sky-50 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                >
                  <div className="h-7 w-7 bg-white text-sky-700 rounded-full flex items-center justify-center font-medium">
                    {userState.userName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-sm text-white hidden sm:inline-block max-w-[100px] truncate">
                    {userState.userName || "User"}
                  </span>
                  <FiChevronDown
                    size={16}
                    className={`text-white transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden py-1 border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {userState.userName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {userState.email || "student@example.com"}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FiUser size={16} className="mr-3 text-gray-500" />
                      Your Profile
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FiSettings size={16} className="mr-3 text-gray-500" />
                      Settings
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={logout}
                      className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50"
                    >
                      <FiLogOut size={16} className="mr-3" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Nav Controls */}
          <div className="flex md:hidden items-center space-x-1">
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="p-2 text-white rounded-full hover:bg-white/10"
              aria-label="Search"
            >
              {isSearchExpanded ? <FiX size={20} /> : <FiSearch size={20} />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white rounded-full hover:bg-white/10"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchExpanded && (
        <div className="md:hidden py-3 px-4 bg-sky-800 animate-fadeDown">
          <form onSubmit={handleSearch} className="relative">
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Search courses..."
              className="w-full py-2 pl-9 pr-4 rounded-lg bg-sky-700 text-white placeholder-gray-200 focus:outline-none focus:ring-1 focus:ring-white/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70"
            >
              <FiSearch size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-sky-700 shadow-lg animate-fadeDown">
          <div className="px-3 pt-2 pb-3 space-y-1">
            <MobileNavItem
              to="/"
              label="Home"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavItem
              to="/courses"
              label="Courses"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavItem
              to="/about-us"
              label="About Us"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {userState && (
              <MobileNavItem
                to="/enrolled"
                label="My Learning"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}
          </div>

          <div className="px-4 py-3 border-t border-sky-600">
            {!userState ? (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="block text-center py-2.5 text-sm font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block text-center py-2.5 text-sm font-medium rounded-lg bg-white text-sky-600 hover:bg-sky-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 pb-3">
                  <div className="h-10 w-10 bg-white text-sky-700 rounded-full flex items-center justify-center font-medium text-lg">
                    {userState.userName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {userState.userName || "User"}
                    </div>
                    <div className="text-sky-200 text-xs">
                      {userState.email || "student@example.com"}
                    </div>
                  </div>
                </div>

                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 text-sm text-white rounded-lg hover:bg-sky-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiUser size={16} className="mr-3" />
                  Your Profile
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center px-3 py-2 text-sm text-white rounded-lg hover:bg-sky-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiSettings size={16} className="mr-3" />
                  Settings
                </Link>

                <div className="border-t border-sky-600 pt-2 mt-2"></div>

                <button
                  onClick={logout}
                  className="flex items-center w-full px-3 py-2 text-sm text-white rounded-lg hover:bg-sky-600"
                >
                  <FiLogOut size={16} className="mr-3" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// Desktop Nav Item
function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        px-3 py-2 text-sm font-medium rounded-lg transition-colors
        ${
          isActive
            ? "bg-white/20 text-white"
            : "text-white/80 hover:text-white hover:bg-white/10"
        }
      `}
    >
      {label}
    </NavLink>
  );
}

// Mobile Nav Item
function MobileNavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `
        block px-3 py-2.5 text-base font-medium rounded-lg transition-colors
        ${
          isActive
            ? "bg-sky-600 text-white"
            : "text-white/90 hover:bg-sky-600 hover:text-white"
        }
      `}
    >
      {label}
    </NavLink>
  );
}
