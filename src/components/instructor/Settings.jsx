function Settings() {
    return (
        <>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
                <div className="flex flex-col space-y-6">
                    <Link
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 hover:bg-gray-100"
                        to="/instructor/settings/user-information"
                    >
                        <h2 className="text-lg font-semibold text-gray-700">User Information</h2>
                        <p className="text-sm text-gray-500">View and update your personal information.</p>
                    </Link>
                    <Link
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 hover:bg-gray-100"
                        to="/instructor/settings/payment-methods"
                    >
                        <h2 className="text-lg font-semibold text-gray-700">Payment Methods</h2>
                        <p className="text-sm text-gray-500">Manage your saved payment options.</p>
                    </Link>
                    <Link
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 hover:bg-gray-100"
                        to="/instructor/settings/enrolled-courses"
                    >
                        <h2 className="text-lg font-semibold text-gray-700">Enrolled Courses</h2>
                        <p className="text-sm text-gray-500">Check the courses you are enrolled in.</p>
                    </Link>
                    <Link
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 hover:bg-gray-100"
                        to="/instructor/settings/notifications"
                    >
                        <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
                        <p className="text-sm text-gray-500">Update your notification preferences.</p>
                    </Link>
                    <Link
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 hover:bg-gray-100"
                        to="/instructor/settings/change-password"
                    >
                        <h2 className="text-lg font-semibold text-gray-700">Change Password</h2>
                        <p className="text-sm text-gray-500">Change your account password.</p>
                    </Link>
                    <Link
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 hover:bg-gray-100"
                        to="/logout"
                    >
                        <h2 className="text-lg font-semibold text-gray-700">Logout</h2>
                        <p className="text-sm text-gray-500">Sign out of your account.</p>
                    </Link>
                     <Routes>
                        <Route path="/instructor/settings/user-information" element={<UserInformation />} />
                    </Routes>
                  
                </div>
               
            </div>
        </>
    );
}

export {Settings}