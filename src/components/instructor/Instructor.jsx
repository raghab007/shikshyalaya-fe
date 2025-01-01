import { Routes, Link, Route, BrowserRouter, Router } from 'react-router-dom';
import { Settings } from './Settings';
import Dashboard from './Dashboard';
import { UserInformation } from './Settings';
import { Courses } from './Courses';
import { Students } from './Students';

function Instructor() {
    return (
        <>
            <div className="p-5 bg-gray-100">
                <h1 className="font-bold text-3xl text-center text-gray-800 mb-6">Welcome to the User Dashboard</h1>
                <div className="flex">
                    {/* Sidebar */}
                    <div className="flex flex-col h-screen w-1/5 space-y-4 bg-gray-200 p-6 rounded-lg shadow-lg">
                        <Link
                            className="px-4 py-3 rounded-xl border border-neutral-400 text-gray-700 bg-white hover:bg-gray-100 hover:text-black transition duration-200"
                            to="/instructor/dashboard"
                        >
                            Dashboard
                        </Link>
                        <Link
                            className="px-4 py-3 rounded-xl border border-neutral-400 text-gray-700 bg-white hover:bg-gray-100 hover:text-black transition duration-200"
                            to="/instructor/courses"
                        >
                            Courses
                        </Link>
                        <Link
                            className="px-4 py-3 rounded-xl border border-neutral-400 text-gray-700 bg-white hover:bg-gray-100 hover:text-black transition duration-200"
                            to="/instructor/students"
                        >
                            Students
                        </Link>
                        <Link
                            className="px-4 py-3 rounded-xl border border-neutral-400 text-gray-700 bg-white hover:bg-gray-100 hover:text-black transition duration-200"
                            to="/instructor/settings"
                        >
                            Settings
                        </Link>
                        <Link
                            className="px-4 py-3 rounded-xl border border-neutral-400 text-gray-700 bg-white hover:bg-gray-100 hover:text-black transition duration-200"
                            to="/instructor/users"
                        >
                            Users
                        </Link>
                    </div>

                    {/* Content */}
                    <div className="flex-grow p-8 bg-white rounded-lg shadow-lg ml-6">
                        <Routes>
                            <Route path="/instructor/dashboard" element={<Dashboard />} />
                            <Route path="/instructor/courses" element={<Courses />} />
                            <Route path="/instructor/users" element={<Users />} />
                            <Route path="/instructor/students" element={<Students />} />
                            <Route path="/instructor/settings" element={<Settings />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}



function Users() {
    return (
        <>
            <h1 className="text-2xl font-semibold text-gray-700">This is Users</h1>
        </>
    );
}


export function UserInformation() {
    return (
        <>
            <h1 className="text-2xl font-semibold text-gray-700">This is User Information</h1>
        </>
    );
}



function Courses() {
    return (
        <>
            <h1 className="text-2xl font-semibold text-gray-700">This is Courses</h1>
            <form action="">
                <input type="text" placeholder='coursename' />
                <input type="text" placeholder='course description' />
                <input type="number" placeholder='course price' />
                <input type="number" placeholder='course duration' />
                <button type='submit'>Add Course</button>                  
            </form>
        </>
    );
}

function Students() {
    return (
        <>
            <h1 className="text-2xl font-semibold text-gray-700">This is Students</h1>
        </>
    );
}

export default Instructor;
