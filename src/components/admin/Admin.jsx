import { Outlet, Link, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white flex flex-col">
        <div className="p-6 border-b border-indigo-700">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>

        <nav className="mt-6 flex-1">
          <div className="space-y-1 px-3">
            <NavLink to="dashboard" currentPath={location.pathname}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Dashboard
            </NavLink>
            <NavLink to="courses" currentPath={location.pathname}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              Courses
            </NavLink>
            <NavLink to="users" currentPath={location.pathname}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              Users
            </NavLink>
            <NavLink to="instructors" currentPath={location.pathname}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Instructors
            </NavLink>
          </div>
        </nav>

        <div className="p-4 border-t border-indigo-700">
          <button
            onClick={logout}
            className="flex items-center justify-center w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-md transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {location.pathname.split("/").pop().charAt(0).toUpperCase() +
                location.pathname.split("/").pop().slice(1) || "Dashboard"}
            </h2>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

// Custom NavLink component for active styling
const NavLink = ({ to, children, currentPath }) => {
  const isActive = currentPath.includes(to);

  return (
    <Link
      to={to}
      className={`flex items-center py-3 px-4 rounded-md transition duration-200 ${
        isActive
          ? "bg-indigo-900 text-white"
          : "text-indigo-100 hover:bg-indigo-700"
      }`}
    >
      {children}
    </Link>
  );
};

export { AdminLayout };
