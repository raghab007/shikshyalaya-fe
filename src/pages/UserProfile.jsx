import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FaLock, FaUserEdit, FaCog, FaHome, FaBook, FaWallet, FaTrophy, FaSpinner } from "react-icons/fa";
import { userProfileSelector } from "../store/atoms/profle";
import axios from "axios";

const UserProfile = () => {
    const [state, setUserState] = useRecoilState(userProfileSelector);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        setUserState({
            userName: null,
            email: null,
            firstName: null,
            lastName: null,
            contactNumber: null,
            role: "USER"
        });
        window.location.href = "/login";
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:8085/user", {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             });
    //             console.log(response)
    //             console.log(response.data)
    //             const user = {
    //                 userName: response.data.userName,
    //                 email: response.data.email,
    //                 fullName: `${response.data.firstName} ${response.data.lastName}`,
    //                 contactNumber: response.data.contactNumber,
    //             };
    //             console.log(user)
    //             setUserState(user);
                
    //            // setError(null)
    //         } catch (err) {
    //             setError("Failed to fetch user data. Please try again later.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (token) {
    //         fetchData();
    //     } else {
    //         window.location.href = "/login";
    //     }
    // }, [token, setUserState]);

    if (!token) {
        return null;
    }

    if (!loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <h1 className="text-3xl text-red-500">{error}</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12">
                <div className="max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-10">
                    <img
                        src="data:image/jpeg;base64,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"
                        alt="Profile"
                        className="w-32 h-32 rounded-full shadow-lg border-4 border-white"
                    />
                    <div>
                        <h1 className="text-4xl font-bold">{state.firstName+ state.lastName}</h1>
                        <p className="text-lg mt-2">Role: {state.role}</p>
                        <p className="text-lg">Email: {state.email}</p>
                        <p className="text-lg">Contact: {state.contactNumber}</p>
                        <button
                            onClick={logout}
                            className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Navigation Sidebar */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Navigation</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition duration-300">
                            <FaHome className="text-blue-500" />
                            <a href="#" className="text-gray-700 hover:underline">
                                Home
                            </a>
                        </li>
                        <li className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition duration-300">
                            <FaBook className="text-blue-500" />
                            <a href="#" className="text-gray-700 hover:underline">
                                My Courses
                            </a>
                        </li>
                        <li className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition duration-300">
                            <FaWallet className="text-blue-500" />
                            <a href="#" className="text-gray-700 hover:underline">
                                Wallet
                            </a>
                        </li>
                        <li className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition duration-300">
                            <FaUserEdit className="text-blue-500" />
                            <a href="#" className="text-gray-700 hover:underline">
                                Update Profile
                            </a>
                        </li>
                        <li className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition duration-300">
                            <FaLock className="text-blue-500" />
                            <a href="/changepassword" className="text-gray-700 hover:underline">
                                Change Password
                            </a>
                        </li>
                        <li className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition duration-300">
                            <FaCog className="text-blue-500" />
                            <a href="#" className="text-gray-700 hover:underline">
                                Preferences
                            </a>
                        </li>
                        <li className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition duration-300">
                            <FaTrophy className="text-blue-500" />
                            <a href="#" className="text-gray-700 hover:underline">
                                Achievements
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Main Profile Info */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold mb-4">Basic Information</h2>
                        <ul className="space-y-2">
                            <li><strong>Full Name:</strong> {state.fullName}</li>
                            <li><strong>Email:</strong> {state.email}</li>
                            <li><strong>Phone:</strong> {state.contactNumber}</li>
                            <li><strong>Date of Birth:</strong> January 1, 2000</li>
                        </ul>
                    </div>

                    {/* Courses */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold mb-4">My Courses</h2>
                        <div className="space-y-4">
                            <div className="p-4 border rounded-lg hover:shadow-md transition duration-300">
                                <h3 className="text-lg font-bold">React for Beginners</h3>
                                <p>Progress: 50%</p>
                                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                                    Continue Learning
                                </button>
                            </div>
                            <div className="p-4 border rounded-lg hover:shadow-md transition duration-300">
                                <h3 className="text-lg font-bold">Java Spring Boot</h3>
                                <p>Progress: 20%</p>
                                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                                    Continue Learning
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Wallet and Transactions */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold mb-4">Wallet & Transactions</h2>
                        <p><strong>Wallet Balance:</strong> NPR 5000</p>
                        <ul className="mt-4 space-y-2">
                            <li>React for Beginners | Date: 12/12/2024 | NPR 1500</li>
                            <li>Java Spring Boot | Date: 10/10/2024 | NPR 2000</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;