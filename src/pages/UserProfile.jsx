import React, { useState } from "react";
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
import { userProfileSelector } from "../store/atoms/profle";

const UserProfile = () => {
  const [state] = useRecoilState(userProfileSelector);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Welcome, {state.firstName}!</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium mb-2">Personal Information</h3>
              <div className="space-y-2">
                <p><span className="text-gray-600">Name:</span> {state.firstName} {state.lastName}</p>
                <p><span className="text-gray-600">Email:</span> {state.email}</p>
                <p><span className="text-gray-600">Phone:</span> {state.contactNumber || "Not provided"}</p>
              </div>
            </div>
          </div>
        );
      case "transactions":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Your Transactions</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between border-b pb-2 font-medium">
                <span>Date</span>
                <span>Course</span>
                <span>Amount</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>2023-10-15</span>
                <span>Java</span>
                <span>2100</span>
              </div>
              <div className="flex justify-between py-2">
                <span>2023-09-01</span>
                <span>Python</span>
                <span>4099</span>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Account Settings</h2>
            <div className="bg-white p-4 rounded-lg shadow space-y-4">
              <div>
                <h3 className="font-medium mb-2">Profile Information</h3>
                <div className="space-y-2">
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded"
                    value={state.firstName}
                    placeholder="First Name"
                  />
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded"
                    value={state.lastName}
                    placeholder="Last Name"
                  />
                  <input 
                    type="email" 
                    className="w-full p-2 border rounded"
                    value={state.email}
                    placeholder="Email"
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update Profile
                  </button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Change Password</h3>
                <div className="space-y-2">
                  <input 
                    type="password" 
                    className="w-full p-2 border rounded"
                    placeholder="Current Password"
                  />
                  <input 
                    type="password" 
                    className="w-full p-2 border rounded"
                    placeholder="New Password"
                  />
                  <input 
                    type="password" 
                    className="w-full p-2 border rounded"
                    placeholder="Confirm Password"
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {state.firstName?.charAt(0) || "U"}
            </div>
            <div>
              <h1 className="text-xl font-bold">{state.firstName} {state.lastName}</h1>
              <p className="text-gray-600">{state.email}</p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Side Navigation */}
          <div className="bg-white rounded-lg shadow p-4 w-full md:w-48 flex-shrink-0">
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left p-2 rounded flex items-center ${activeTab === "overview" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <FaHome className="mr-2" /> Overview
              </button>
              <button 
                onClick={() => setActiveTab("transactions")}
                className={`w-full text-left p-2 rounded flex items-center ${activeTab === "transactions" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <FaCreditCard className="mr-2" /> Transactions
              </button>
              <button 
                onClick={() => setActiveTab("settings")}
                className={`w-full text-left p-2 rounded flex items-center ${activeTab === "settings" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <FaCog className="mr-2" /> Settings
              </button>
              <button 
                onClick={logout}
                className="w-full text-left p-2 rounded flex items-center hover:bg-red-50 text-red-600 mt-4"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </nav>
          </div>
          
          {/* Content Area */}
          <div className="bg-white rounded-lg shadow p-6 flex-grow">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;