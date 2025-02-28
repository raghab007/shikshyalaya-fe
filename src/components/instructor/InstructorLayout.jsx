import { Routes, Link, Route ,Outlet} from 'react-router-dom';
import Dashboard from './Dashboard';
import Students from './Students';
import Settings, { UserInformation } from './Settings';
import Courses from './Courses';
import CourseDetails from './CourseDetail';
import AddCourse from './AddCourse';
import Sidebar from './SideBar';

function InstructorLayout() {
    return (
        <div className="flex">
            {/* Sidebar */}
        <Sidebar/>

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