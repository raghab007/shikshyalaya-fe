
import { FaTachometerAlt, FaBook, FaUserGraduate, FaCog, FaUsers, FaSignOutAlt, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export default function Sidebar(){
    return (
            <div className="sticky top-0 flex-shrink-0 w-64 h-screen bg-gradient-to-b from-blue-800 to-blue-900 p-6 space-y-6 shadow-xl">
                        <div className="flex items-center justify-center mb-8">
                            <h2 className="text-white text-2xl font-bold">EduTrack</h2>
                        </div>
                        <nav className="space-y-2">
                            <NavItem to="/instructor/" icon={<FaTachometerAlt />} label="Dashboard" />
                            <NavItem to="/instructor/courses" icon={<FaBook />} label="Courses" />
                            <NavItem to="/instructor/students" icon={<FaUserGraduate />} label="Students" />
                            <NavItem to="/instructor/settings" icon={<FaCog />} label="Settings" />
                            <NavItem to="/instructor/users" icon={<FaUsers />} label="Users" />
                            <NavItem to="/instructor/reports" icon={<FaChartLine />} label="Reports" />
                            <NavItem to="/instructor/logout" icon={<FaSignOutAlt />} label="Logout" />
                        </nav>
                    </div>
    )
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