import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { 
  FaHome, 
  FaUserEdit, 
  FaLock, 
  FaCog, 
  FaSignOutAlt,
  FaCreditCard,
  FaHistory
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
const OverviewTab = ({ state }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Welcome Back, {state.firstName}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-lg font-medium text-blue-800">Account Summary</h3>
          <ul className="mt-3 space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-600">Member Since:</span>
              <span className="font-medium">Jan 2023</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Last Login:</span>
              <span className="font-medium">Today</span>
            </li>
          </ul>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <h3 className="text-lg font-medium text-indigo-800">Quick Actions</h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button className="p-2 bg-white rounded border border-gray-200 hover:bg-gray-50">
              Update Profile
            </button>
            <button className="p-2 bg-white rounded border border-gray-200 hover:bg-gray-50">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <div className="w-full px-3 py-2 bg-gray-50 rounded-md">
            {state.firstName}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <div className="w-full px-3 py-2 bg-gray-50 rounded-md">
            {state.lastName}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="w-full px-3 py-2 bg-gray-50 rounded-md">
            {state.email}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <div className="w-full px-3 py-2 bg-gray-50 rounded-md">
            {state.contactNumber || "Not provided"}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// TransactionsTab Component
const TransactionsTab = () => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold mb-6 flex items-center">
      <FaHistory className="text-blue-500 mr-2" /> Transaction History
    </h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Description</th>
            <th className="py-3 px-4 text-right">Amount</th>
            <th className="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="py-3 px-4">2023-10-15</td>
            <td className="py-3 px-4">Premium Membership</td>
            <td className="py-3 px-4 text-right">$9.99</td>
            <td className="py-3 px-4">
              <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs">
                Completed
              </span>
            </td>
          </tr>
          <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="py-3 px-4">2023-09-01</td>
            <td className="py-3 px-4">Service Fee</td>
            <td className="py-3 px-4 text-right">$4.99</td>
            <td className="py-3 px-4">
              <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs">
                Completed
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="mt-4 text-center text-sm text-gray-500">
      Showing 2 of 5 transactions
    </div>
  </div>
);

// SettingsTab Component
const SettingsTab = ({ state }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold mb-6 flex items-center">
      <FaCog className="text-blue-500 mr-2" /> Account Settings
    </h2>
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={state.firstName}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={state.lastName}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={state.email}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={state.contactNumber || ""}
              placeholder="Add phone number"
            />
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
          <FaUserEdit className="inline mr-2" /> Update Profile
        </button>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium mb-4">Security Settings</h3>
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
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!state) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [state, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab state={state} />;
      case "transactions":
        return <TransactionsTab />;
      case "settings":
        return <SettingsTab state={state} />;
      default:
        return <OverviewTab state={state} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">My Account</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-1 space-y-6">
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
                  icon={<FaCreditCard className="text-blue-500" />} 
                  label="Transactions" 
                  isActive={activeTab === "transactions"}
                  onClick={() => setActiveTab("transactions")}
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
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;