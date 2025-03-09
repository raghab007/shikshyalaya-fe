import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FaLock, FaUserEdit, FaCog, FaHome, FaBook, FaWallet, FaTrophy, FaSpinner } from "react-icons/fa";
import { userProfileSelector } from "../store/atoms/profle";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const [state, setUserState] = useRecoilState(userProfileSelector);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    console.log(state)
   
 useEffect(function(){
            if(!token){
               location.href = "/login"
            }
    },[state])

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login")
    };

   

    if (!token) {
        return null;
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
                            <a href="/enrolled" className="text-gray-700 hover:underline">
                                My Courses
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