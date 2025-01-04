import { Routes, Link, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Students from './Students';
import Settings, { UserInformation } from './Settings';
import Courses from './Courses';
import CourseDetails from './CourseDetail';
import { FaTachometerAlt, FaBook, FaUserGraduate, FaCog, FaUsers, FaSignOutAlt, FaChartLine } from 'react-icons/fa';
import AddCourse from './AddCourse';

function Instructor() {
    return (
        <>
            <div className="p-5 bg-blue-50 min-h-screen">
                <h1 className="font-bold text-3xl text-center text-blue-800 mb-6">Welcome to the Instructor Dashboard</h1>
                <div className="flex">

                    {/* Sidebar */}
                    <div className="flex flex-col h-screen w-64 space-y-4 bg-blue-100 p-6 rounded-lg shadow-lg">
                        <NavItem to="/instructor/dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
                        <NavItem to="/instructor/courses" icon={<FaBook />} label="Courses" />
                        <NavItem to="/instructor/students" icon={<FaUserGraduate />} label="Students" />
                        <NavItem to="/instructor/settings" icon={<FaCog />} label="Settings" />
                        <NavItem to="/instructor/users" icon={<FaUsers />} label="Users" />
                        <NavItem to="/instructor/reports" icon={<FaChartLine />} label="Reports" />
                        <NavItem to="/instructor/logout" icon={<FaSignOutAlt />} label="Logout" />
                    </div>

                    {/* Content */}
                    <div className="flex-grow p-8 bg-white rounded-lg shadow-lg ml-6">
                        <Routes>
                            <Route path="/instructor/dashboard" element={<Dashboard />} />
                            <Route path="/instructor/courses" element={<Courses />} />
                            <Route path="/instructor/users" element={<Users />} />
                            <Route path="/instructor/students" element={<Students />} />
                            <Route path="/instructor/settings" element={<Settings />} />
                            <Route path="/instructor/settings/user-information" element={<UserInformation />} />
                            <Route path="/instructor/settings/payment-methods" element={<h1>Payment Methods</h1>} />
                            <Route path="/instructor/courses/course-details/:courseId" element={<CourseDetails />} />
                            <Route path="/instructor/reports" element={<h1>Reports Section</h1>} />
                            <Route path="/instructor/logout" element={<h1>Logging out...</h1>} />
                            <Route path="/instructor/add-course" element={<AddCourse />} />
                            <Route path="*" element={<h1>Not found</h1>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

function NavItem({ to, icon, label }) {
    return (
        <Link
            className="flex items-center px-4 py-3 rounded-xl text-blue-800 bg-blue-200 hover:bg-blue-300 hover:text-blue-900 transition duration-200"
            to={to}
        >
            {icon} <span className="ml-3">{label}</span>
        </Link>
    );
}

function Users() {
    return (
        <>
            <h1 className="text-2xl font-semibold text-gray-700">This is Users</h1>
        </>
    );
}

export default Instructor;
