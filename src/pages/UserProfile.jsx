import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { FaLock, FaUserEdit, FaCog, FaSignOutAlt, FaHome, FaBook, FaWallet, FaTrophy } from "react-icons/fa";
import userProfileState from "../store/atoms/profle";
import axios from "axios";

// const UserProfile = () => {
//     const [state, setUserState] = useRecoilState(userProfileState);
//     const token = localStorage.getItem("token");

//     function logout() {
//         localStorage.removeItem("token");
//         setUserState( {
//             userName: null,
//             email: null,
//             firstName: null,
//             lastName: null,
//             contactNumber: null,
//             role:"USER"
//         });
//         window.location.href = "/login";
//     }

//     useEffect(() => {
//         async function fetchData() {
//             const response = await axios.get("http://localhost:8085/user", {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             const user = {
//                 userName: response.data.userName,
//                 email: response.data.email,
//                 fullName: response.data.firstName + " " + response.data.lastName,
//                 contactNumber: response.data.contactNumber,
//             };

//             setUserState(user);
//         }
//         fetchData();
//     }, []);

//     if (!state) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-100">
//                 <h1 className="text-3xl text-gray-500">Loading...</h1>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Profile Header */}
//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12">
//                 <div className="max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-10">
//                     <img
//                         src="https://via.placeholder.com/150"
//                         alt="Profile"
//                         className="w-32 h-32 rounded-full shadow-lg border-4 border-white"
//                     />
//                     <div>
//                         <h1 className="text-4xl font-bold">{state.fullName}</h1>
//                         <p className="text-lg mt-2">Role: Student</p>
//                         <p className="text-lg">Email: {state.email}</p>
//                         <p className="text-lg">Contact: {state.contactNumber}</p>
//                         <button
//                             onClick={logout}
//                             className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
//                 {/* Navigation Sidebar */}
//                 <div className="bg-white rounded-lg shadow p-6">
//                     <h2 className="text-xl font-bold mb-4">Navigation</h2>
//                     <ul className="space-y-4">
//                         <li className="flex items-center space-x-3">
//                             <FaHome className="text-blue-500" />
//                             <a href="#" className="text-gray-700 hover:underline">
//                                 Home
//                             </a>
//                         </li>
//                         <li className="flex items-center space-x-3">
//                             <FaBook className="text-blue-500" />
//                             <a href="#" className="text-gray-700 hover:underline">
//                                 My Courses
//                             </a>
//                         </li>
//                         <li className="flex items-center space-x-3">
//                             <FaWallet className="text-blue-500" />
//                             <a href="#" className="text-gray-700 hover:underline">
//                                 Wallet
//                             </a>
//                         </li>
//                         <li className="flex items-center space-x-3">
//                             <FaUserEdit className="text-blue-500" />
//                             <a href="#" className="text-gray-700 hover:underline">
//                                 Update Profile
//                             </a>
//                         </li>
//                         <li className="flex items-center space-x-3">
//                             <FaLock className="text-blue-500" />
//                             <a href="/changepassword" className="text-gray-700 hover:underline">
//                                 Change Password
//                             </a>
//                         </li>
//                         <li className="flex items-center space-x-3">
//                             <FaCog className="text-blue-500" />
//                             <a href="#" className="text-gray-700 hover:underline">
//                                 Preferences
//                             </a>
//                         </li>
//                         <li className="flex items-center space-x-3">
//                             <FaTrophy className="text-blue-500" />
//                             <a href="#" className="text-gray-700 hover:underline">
//                                 Achievements
//                             </a>
//                         </li>
//                     </ul>
//                 </div>

//                 {/* Main Profile Info */}
//                 <div className="lg:col-span-3 space-y-6">
//                     {/* Basic Information */}
//                     <div className="bg-white rounded-lg shadow p-6">
//                         <h2 className="text-xl font-bold mb-4">Basic Information</h2>
//                         <ul className="space-y-2">
//                             <li><strong>Full Name:</strong> {state.fullName}</li>
//                             <li><strong>Email:</strong> {state.email}</li>
//                             <li><strong>Phone:</strong> {state.contactNumber}</li>
//                             <li><strong>Date of Birth:</strong> January 1, 2000</li>
//                         </ul>
//                     </div>

//                     {/* Courses */}
//                     <div className="bg-white rounded-lg shadow p-6">
//                         <h2 className="text-xl font-bold mb-4">My Courses</h2>
//                         <div className="space-y-4">
//                             <div className="p-4 border rounded-lg">
//                                 <h3 className="text-lg font-bold">React for Beginners</h3>
//                                 <p>Progress: 50%</p>
//                                 <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//                                     Continue Learning
//                                 </button>
//                             </div>
//                             <div className="p-4 border rounded-lg">
//                                 <h3 className="text-lg font-bold">Java Spring Boot</h3>
//                                 <p>Progress: 20%</p>
//                                 <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//                                     Continue Learning
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Wallet and Transactions */}
//                     <div className="bg-white rounded-lg shadow p-6">
//                         <h2 className="text-xl font-bold mb-4">Wallet & Transactions</h2>
//                         <p><strong>Wallet Balance:</strong> NPR 5000</p>
//                         <ul className="mt-4 space-y-2">
//                             <li>React for Beginners | Date: 12/12/2024 | NPR 1500</li>
//                             <li>Java Spring Boot | Date: 10/10/2024 | NPR 2000</li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
function UserProfile(){
    return (
        <h1>This is user profile</h1>
    )
}

export default UserProfile;
