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
import Logo from "../assets/logo2.jpg";

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
    window.location = "/login";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#e6e8ec] shadow-md backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Moved more to the left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src={Logo}
                alt="Sikshyalaya Logo"
                className="h-8 w-8 object-contain rounded transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-[#02084b] font-bold text-xl tracking-tight transition-colors duration-300 group-hover:text-[#3a4a8a]">
                Sikshyalaya
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered with better spacing */}
          <div className="hidden md:flex items-center justify-center flex-1 px-6">
            <div className="flex space-x-6">
              <NavItem to="/" label="Home" />
              <NavItem to="/courses" label="Courses" />
              <NavItem to="/about-us" label="About Us" />
              <NavItem to="/contact" label="Contact Us" />
              {userState && <NavItem to="/enrolled" label="My Learning" />}
            </div>
          </div>

          {/* Desktop Right Side: Search, Auth/Profile - Grouped together and moved right */}
          <div className="hidden md:flex items-center">
            {/* Desktop Search - Made smaller */}
            <div className="relative mr-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-44 py-1 pl-8 pr-2 rounded-full bg-white border border-gray-200 text-[#02084b] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#02084b]"
                >
                  <FiSearch size={14} />
                </button>
              </form>
            </div>

            {/* Auth Buttons - Positioned more to the right */}
            {!userState ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-1.5 text-sm font-medium rounded-full text-[#02084b] border border-[#02084b] hover:bg-sky-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 text-sm font-medium bg-[#02084b] rounded-full text-white hover:bg-sky-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white hover:bg-gray-200 transition-colors"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                >
                  <div className="h-7 w-7 bg-[#02084b] text-white rounded-full flex items-center justify-center font-medium shadow-sm">
                    {userState.userName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-sm text-[#02084b] hidden sm:inline-block max-w-[100px] truncate">
                    {userState.userName || "User"}
                  </span>
                  <FiChevronDown
                    size={14}
                    className={`text-[#02084b] transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden py-1 border border-gray-100 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-[#02084b]">
                        {userState.userName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {userState.email || "student@example.com"}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-[#02084b] hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FiUser size={16} className="mr-3 text-[#02084b]" />
                      Your Profile
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-[#02084b] hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FiSettings size={16} className="mr-3 text-[#02084b]" />
                      Settings
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={logout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
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
              className="p-2 text-[#02084b] rounded-full hover:bg-gray-100"
              aria-label="Search"
            >
              {isSearchExpanded ? <FiX size={20} /> : <FiSearch size={20} />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#02084b] rounded-full hover:bg-gray-100"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchExpanded && (
        <div className="md:hidden py-2 px-4 bg-white border-t border-gray-200 animate-fadeDown">
          <form onSubmit={handleSearch} className="relative">
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Search courses..."
              className="w-full py-2 pl-9 pr-4 rounded-lg bg-gray-100 text-[#02084b] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#02084b]"
            >
              <FiSearch size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-fadeDown">
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
            <MobileNavItem
              to="/contact-us"
              label="Contact Us"
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

          <div className="px-4 py-3 border-t border-gray-200">
            {!userState ? (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="flex-1 text-center py-2 text-sm font-medium rounded-lg border border-[#02084b] text-[#02084b] hover:bg-sky-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 text-center py-2 text-sm font-medium rounded-lg bg-[#02084b] text-white hover:bg-sky-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 pb-2">
                  <div className="h-9 w-9 bg-[#02084b] text-white rounded-full flex items-center justify-center font-medium text-lg shadow-sm">
                    {userState.userName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <div className="text-[#02084b] font-medium">
                      {userState.userName || "User"}
                    </div>
                    <div className="text-[#02084b] text-xs">
                      {userState.email || "student@example.com"}
                    </div>
                  </div>
                </div>

                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 text-sm text-[#02084b] rounded-lg hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiUser size={16} className="mr-3 text-[#02084b]" />
                  Your Profile
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center px-3 py-2 text-sm text-[#02084b] rounded-lg hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiSettings size={16} className="mr-3 text-[#02084b]" />
                  Settings
                </Link>

                <div className="border-t border-gray-200 pt-2 mt-2"></div>

                <button
                  onClick={logout}
                  className="flex items-center w-full px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-gray-100"
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

// Desktop Nav Item - Updated with underline effect for active state
function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        px-3 py-2 text-sm font-medium rounded-md transition-colors relative
        ${
          isActive
            ? "text-[#02084b] font-medium"
            : "text-[#02084b] hover:text-[#3a4a8a]"
        }
        ${
          isActive
            ? "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-[#02084b] after:rounded-full"
            : ""
        }
      `}
      end
    >
      {label}
    </NavLink>
  );
}

// Mobile Nav Item - Updated with underline/indicator for active state
function MobileNavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `
        block px-3 py-2 text-base font-medium rounded-lg transition-colors
        ${
          isActive
            ? "bg-gray-100 text-[#02084b] font-medium border-l-4 border-[#02084b]"
            : "text-[#02084b] hover:bg-gray-100 hover:text-[#3a4a8a]"
        }
      `}
      end
    >
      {label}
    </NavLink>
  );
}