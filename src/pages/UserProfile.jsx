import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { 
  FaHome, 
  FaBook, 
  FaUserEdit, 
  FaLock, 
  FaCog, 
  FaSignOutAlt, 
  FaGraduationCap,
  FaWallet,
  FaChartLine
} from "react-icons/fa";
import axios from "axios";
import { userProfileSelector } from "../store/atoms/profle";

// NavItem Component
const NavItem = ({ icon, label, isActive, onClick }) => (
  <li 
    className={`flex items-center space-x-3 p-3 rounded-lg transition duration-300 cursor-pointer ${
      isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    {icon}
    <span className={`${isActive ? "font-medium" : "text-gray-700"}`}>
      {label}
    </span>
  </li>
);

// ProfileCard Component
const ProfileCard = ({ state, logout }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
      {state.firstName?.charAt(0) || "U"}
    </div>
    <h2 className="text-xl font-bold">{state.firstName + " " + state.lastName}</h2>
    <p className="text-gray-500">{state.role}</p>
    <div className="w-full border-t border-gray-200 my-4"></div>
    <div className="space-y-2 w-full">
      <div className="flex items-center text-gray-600">
        <span className="text-sm">Email:</span>
        <span className="ml-auto text-sm font-medium">{state.email}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <span className="text-sm">Phone:</span>
        <span className="ml-auto text-sm font-medium">{state.contactNumber}</span>
      </div>
    </div>
    <button
      onClick={logout}
      className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-300"
    >
      <FaSignOutAlt className="mr-2" /> Logout
    </button>
  </div>
);

// OverviewTab Component
const OverviewTab = ({ state, courses }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FaChartLine className="text-blue-500 mr-2" /> Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-lg font-medium text-blue-800">Basic Information</h3>
          <ul className="mt-3 space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-600">Full Name:</span>
              <span className="font-medium">{state.fullName}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{state.email}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{state.contactNumber}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Date of Birth:</span>
              <span className="font-medium">January 1, 2000</span>
            </li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="text-lg font-medium text-green-800">Wallet Summary</h3>
          <div className="mt-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Balance:</span>
              <span className="text-2xl font-bold text-green-700">NPR 5000</span>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-600">Recent Transactions</h4>
              <ul className="mt-2 space-y-2 text-sm">
                {courses.slice(0, 2).map((course) => (
                  <li key={course.courseID} className="flex justify-between">
                    <span>{course.courseName}</span>
                    <span className="font-medium">NPR {course.coursePrice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FaGraduationCap className="text-blue-500 mr-2" /> My Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div key={course.courseID} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition duration-300">
            <div className="h-32 bg-gray-100 flex items-center justify-center">
              <img
                src={course.imageUrl || "https://via.placeholder.com/150"}
                alt={course.courseName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold">{course.courseName}</h3>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{course.progress || "0%"}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${course.progress || 0}%` }}
                  ></div>
                </div>
              </div>
              <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                Continue Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// CoursesTab Component
const CoursesTab = ({ courses }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold mb-6 flex items-center">
      <FaBook className="text-blue-500 mr-2" /> My Courses
    </h2>
    <div className="space-y-6">
      {courses.map((course) => (
        <div key={course.courseID} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={course.imageUrl || "https://via.placeholder.com/150"}
                alt={course.courseName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow mt-4 md:mt-0">
              <h3 className="text-lg font-bold">{course.courseName}</h3>
              <p className="text-gray-600 text-sm">{course.courseDescription}</p>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{course.progress || "0%"}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${course.progress || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// WalletTab Component
const WalletTab = ({ courses }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold mb-6 flex items-center">
      <FaWallet className="text-blue-500 mr-2" /> Wallet & Transactions
    </h2>
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-6">
      <h3 className="text-lg font-medium mb-2">Wallet Balance</h3>
      <p className="text-3xl font-bold">NPR 5000</p>
    </div>
    <div>
      <h3 className="text-lg font-medium mb-4">Transaction History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-left">Course</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {courses.slice(0, 2).map((course) => (
              <tr key={course.courseID} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{course.courseName}</td>
                <td className="py-3 px-4">12/12/2024</td>
                <td className="py-3 px-4 text-right">NPR {course.coursePrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// SettingsTab Component
const SettingsTab = ({ state }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold mb-6 flex items-center">
      <FaCog className="text-blue-500 mr-2" /> Settings
    </h2>
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-medium mb-4">Update Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={state.firstName}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={state.lastName}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={state.email}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={state.contactNumber}
              readOnly
            />
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
          <FaUserEdit className="inline mr-2" /> Update Profile
        </button>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
            />
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
          <FaLock className="inline mr-2" /> Change Password
        </button>
      </div>
    </div>
  </div>
);

// UserProfile Component
const UserProfile = () => {
  const [state, setUserState] = useRecoilState(userProfileSelector);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      location.href = "/login";
    } else {
      fetchCourses();
    }
  }, [state]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8085/enrollment", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data);
    } catch (error) {
      setError("Failed to fetch courses. Please try again later.");
      console.error("Error fetching courses:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab state={state} courses={courses} />;
      case "courses":
        return <CoursesTab courses={courses} />;
      case "wallet":
        return <WalletTab courses={courses} />;
      case "settings":
        return <SettingsTab state={state} />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between h-16 items-center">
          
            <div className="hidden md:flex items-center space-x-4">             
            </div> 
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-1 space-y-6 sticky top-8">
            <ProfileCard state={state} logout={logout} />
            
            <div className="bg-white rounded-xl shadow-md p-4">
              <h2 className="text-lg font-bold mb-4 pl-2">Navigation</h2>
              <ul className="space-y-1">
                <NavItem 
                  icon={<FaHome className="text-blue-500" />} 
                  label="Overview" 
                  isActive={activeTab === "overview"}
                  onClick={() => setActiveTab("overview")}
                />
                <NavItem 
                  icon={<FaBook className="text-blue-500" />} 
                  label="My Courses" 
                  isActive={activeTab === "courses"}
                  onClick={() => setActiveTab("courses")}
                />
                <NavItem 
                  icon={<FaWallet className="text-blue-500" />} 
                  label="Wallet" 
                  isActive={activeTab === "wallet"}
                  onClick={() => setActiveTab("wallet")}
                />
                <NavItem 
                  icon={<FaCog className="text-blue-500" />} 
                  label="Settings" 
                  isActive={activeTab === "settings"}
                  onClick={() => setActiveTab("settings")}
                />
              </ul>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="md:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;