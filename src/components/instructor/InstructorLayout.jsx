import { Routes, Link, Route ,Outlet} from 'react-router-dom';
import Dashboard from './Dashboard';
import Students from './Students';
import Settings, { UserInformation } from './Settings';
import Courses from './Courses';
import CourseDetails from './CourseDetail';
import { FaTachometerAlt, FaBook, FaUserGraduate, FaCog, FaUsers, FaSignOutAlt, FaChartLine } from 'react-icons/fa';
import AddCourse from './AddCourse';

function InstructorLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="sticky top-0 flex-shrink-0 w-64 h-screen bg-gradient-to-b from-blue-800 to-blue-900 p-6 space-y-6 shadow-xl">
                <div className="flex items-center justify-center mb-8">
                    <h2 className="text-white text-2xl font-bold">EduTrack</h2>
                </div>
                <nav className="space-y-2">
                    <NavItem to="/instructor/dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
                    <NavItem to="/instructor/courses" icon={<FaBook />} label="Courses" />
                    <NavItem to="/instructor/students" icon={<FaUserGraduate />} label="Students" />
                    <NavItem to="/instructor/settings" icon={<FaCog />} label="Settings" />
                    <NavItem to="/instructor/users" icon={<FaUsers />} label="Users" />
                    <NavItem to="/instructor/reports" icon={<FaChartLine />} label="Reports" />
                    <NavItem to="/instructor/logout" icon={<FaSignOutAlt />} label="Logout" />
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-8 overflow-auto">
                <div className="bg-white rounded-lg shadow-sm p-6">
                   <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
}

function NavItem({ to, icon, label }) {
    return (
        <Link
            to={to}
            className="flex items-center px-4 py-3 rounded-lg text-white hover:bg-blue-700 hover:text-white transition-all duration-200 transform hover:translate-x-2"
        >
            {icon} <span className="ml-3 font-medium">{label}</span>
        </Link>
    );
}

function Users() {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-700">Users Management</h1>
            <p className="text-gray-500">Manage all users in the platform.</p>
        </div>
    );
}

export default InstructorLayout;