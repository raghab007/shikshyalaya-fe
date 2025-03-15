import { Link, Outlet } from "react-router-dom";

export default function Settings() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="w-full lg:w-64 bg-white rounded-lg shadow-md p-6">
                        <nav className="space-y-4">
                            <Link
                                to="/instructor/settings/user-information"
                                className="block p-4 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
                            >
                                <h2 className="text-lg font-semibold">User Information</h2>
                                <p className="text-sm text-gray-500">View and update your personal information.</p>
                            </Link>
                          
                            
                            <Link
                                to="/instructor/settings/notifications"
                                className="block p-4 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
                            >
                                <h2 className="text-lg font-semibold">Notifications</h2>
                                <p className="text-sm text-gray-500">Update your notification preferences.</p>
                            </Link>
                            <Link
                                to="/instructor/settings/change-password"
                                className="block p-4 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
                            >
                                <h2 className="text-lg font-semibold">Change Password</h2>
                                <p className="text-sm text-gray-500">Change your account password.</p>
                            </Link>
                            <Link
                                to="/logout"
                                className="block p-4 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
                            >
                                <h2 className="text-lg font-semibold">Logout</h2>
                                <p className="text-sm text-gray-500">Sign out of your account.</p>
                            </Link>
                        </nav>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 bg-white rounded-lg shadow-md p-8">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function UserInformation() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">User Information</h1>
            <p className="text-gray-600">Update your personal details here.</p>
        </div>
    );
}