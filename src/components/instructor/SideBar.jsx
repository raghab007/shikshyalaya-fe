import {
  FaTachometerAlt,
  FaBook,
  FaUserGraduate,
  FaCog,
  FaUsers,
  FaSignOutAlt,
  FaChartLine,
  FaMoneyBill,
  FaComment,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  return (
    <div className="sticky top-0 flex-shrink-0 w-64 h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6 shadow-lg flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h2 className="text-blue-800 text-2xl font-bold flex items-center justify-center">
          <span className="mr-2">📚</span>
          Shikshyalaya
        </h2>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 flex flex-col space-y-6">
        {/* Main Navigation */}
        <div>
          <h3 className="text-xs uppercase text-blue-500 font-semibold mb-2 px-4">
            Main
          </h3>
          <div className="space-y-1">
            <NavItem
              to="/instructor/"
              icon={<FaTachometerAlt />}
              label="Dashboard"
              isActive={location.pathname === "/instructor/"}
            />
            <NavItem
              to="/instructor/courses"
              icon={<FaBook />}
              label="Courses"
              isActive={location.pathname.includes("/instructor/courses")}
            />
            <NavItem
              to="/instructor/students"
              icon={<FaUserGraduate />}
              label="Students"
              isActive={location.pathname.includes("/instructor/students")}
            />
          </div>
        </div>

        {/* Analytics */}
        <div>
          <h3 className="text-xs uppercase text-blue-500 font-semibold mb-2 px-4">
            Analytics
          </h3>
          <div className="space-y-1">
            <NavItem
              to="/instructor/comments"
              icon={<FaComment />}
              label="Comments"
              isActive={location.pathname.includes("/instructor/reports")}
            />
            <NavItem
              to="/instructor/payment-history"
              icon={<FaMoneyBill />}
              label="Payment History"
              isActive={location.pathname.includes(
                "/instructor/payment-history"
              )}
            />
          </div>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-xs uppercase text-blue-500 font-semibold mb-2 px-4">
            Account
          </h3>
          <div className="space-y-1">
            <NavItem
              to="/instructor/settings"
              icon={<FaCog />}
              label="Settings"
              isActive={location.pathname.includes("/instructor/settings")}
            />
          </div>
        </div>
      </nav>

      {/* Logout (at bottom) */}
      <div className="pt-6 border-t border-blue-200 mt-auto">
        <button
          onClick={logout}
          className="flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 w-full text-gray-700 hover:bg-blue-200 hover:text-blue-900"
        >
          <span className="text-lg text-blue-400">
            <FaSignOutAlt />
          </span>
          <span className="ml-3 font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

function NavItem({ to, icon, label, isActive, className }) {
  return (
    <Link
      to={to}
      className={`
          flex items-center px-4 py-2.5 rounded-lg transition-all duration-200
          ${
            isActive
              ? "bg-blue-200 text-blue-900 font-medium"
              : "text-gray-700 hover:bg-blue-200 hover:text-blue-900"
          }
          ${className || ""}
        `}
    >
      <span
        className={`text-lg ${isActive ? "text-blue-700" : "text-blue-400"}`}
      >
        {icon}
      </span>
      <span className="ml-3 font-medium">{label}</span>
    </Link>
  );
}
