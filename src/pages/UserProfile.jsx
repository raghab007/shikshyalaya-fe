import React, { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserEdit,
  FaLock,
  FaCog,
  FaSignOutAlt,
  FaCreditCard,
  FaCamera,
  FaUser,
} from "react-icons/fa";
import { userProfileSelector } from "../store/atoms/profle";

const UserProfile = () => {
  const [state, setState] = useRecoilState(userProfileSelector);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(function () {
    if (!state) {
      console.log("state");
      window.location.href = "/login";
    }
  });

  if (!state) {
    return null;
  }

  // Form state
  const [profileForm, setProfileForm] = useState({
    firstName: state.firstName || "",
    lastName: state.lastName || "",
    email: state.email || "",
    contactNumber: state.contactNumber || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(state.profileImage || null);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("Profile updated successfully!");

    // Update state with new profile information
    setState((prev) => ({
      ...prev,
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      email: profileForm.email,
      contactNumber: profileForm.contactNumber,
    }));
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setFormError("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setFormError("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setFormError("Password must be at least 8 characters");
      return;
    }

    setFormSuccess("Password updated successfully!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleProfilePicture = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        setState((prev) => ({
          ...prev,
          profileImage: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Content for different tabs
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Welcome, {state.firstName}!</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-medium mb-4">Personal Information</h3>
              <div className="space-y-3">
                <p>
                  <span className="text-gray-600 font-medium">Name:</span>{" "}
                  {state.firstName} {state.lastName}
                </p>
                <p>
                  <span className="text-gray-600 font-medium">Email:</span>{" "}
                  {state.email}
                </p>
                <p>
                  <span className="text-gray-600 font-medium">Phone:</span>{" "}
                  {state.contactNumber || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Profile Management</h2>

            {formSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {formSuccess}
              </div>
            )}
            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {formError}
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex flex-col items-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-4xl font-bold">
                        {state.firstName?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleProfilePicture}
                    className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 shadow-lg"
                    style={{ zIndex: 10 }}
                  >
                    <FaCamera />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Click the camera icon to change your profile picture
                </p>
              </div>

              <form onSubmit={handleProfileUpdate}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={profileForm.firstName}
                      onChange={handleProfileChange}
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={profileForm.lastName}
                      onChange={handleProfileChange}
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={profileForm.contactNumber}
                      onChange={handleProfileChange}
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      case "password":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Change Password</h2>

            {formSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {formSuccess}
              </div>
            )}
            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {formError}
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow">
              <form onSubmit={handlePasswordUpdate}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      case "transactions":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Your Transactions</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between border-b pb-3 font-medium">
                <span>Date</span>
                <span>Course</span>
                <span>Amount</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span>2023-10-15</span>
                <span>Java</span>
                <span>₹2,100</span>
              </div>
              <div className="flex justify-between py-3">
                <span>2023-09-01</span>
                <span>Python</span>
                <span>₹4,099</span>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Account Settings</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-3">Notification Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailNotifications"
                        className="mr-2"
                      />
                      <label htmlFor="emailNotifications">
                        Email notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="smsNotifications"
                        className="mr-2"
                      />
                      <label htmlFor="smsNotifications">
                        SMS notifications
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Privacy Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="profileVisibility"
                        className="mr-2"
                      />
                      <label htmlFor="profileVisibility">
                        Make profile public
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="activityTracking"
                        className="mr-2"
                      />
                      <label htmlFor="activityTracking">
                        Allow activity tracking
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t mt-4">
                  <h3 className="font-medium mb-3 text-red-600">Danger Zone</h3>
                  <button className="bg-red-100 text-red-600 border border-red-300 px-4 py-2 rounded hover:bg-red-200">
                    Delete Account
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
    <div className="min-h-screen bg-gray-100  mt-12">
      {/* Header with profile summary */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                      {state.firstName?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleProfilePicture}
                  className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 shadow-md"
                  style={{ zIndex: 10 }}
                >
                  <FaCamera size={12} />
                </button>
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  {state.firstName} {state.lastName}
                </h1>
                <p className="text-gray-600">{state.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center text-red-600 hover:text-red-800"
            >
              <FaSignOutAlt className="mr-1" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content area with tabs */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Navigation Tabs */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {/* Tab Navigation */}
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex items-center px-4 py-3 border-l-4 ${
                    activeTab === "overview"
                      ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                      : "border-transparent hover:bg-gray-50"
                  }`}
                >
                  <FaHome className="mr-3 text-gray-500" /> Overview
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center px-4 py-3 border-l-4 ${
                    activeTab === "profile"
                      ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                      : "border-transparent hover:bg-gray-50"
                  }`}
                >
                  <FaUserEdit className="mr-3 text-gray-500" /> Edit Profile
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`flex items-center px-4 py-3 border-l-4 ${
                    activeTab === "password"
                      ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                      : "border-transparent hover:bg-gray-50"
                  }`}
                >
                  <FaLock className="mr-3 text-gray-500" /> Change Password
                </button>
                <button
                  onClick={() => setActiveTab("transactions")}
                  className={`flex items-center px-4 py-3 border-l-4 ${
                    activeTab === "transactions"
                      ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                      : "border-transparent hover:bg-gray-50"
                  }`}
                >
                  <FaCreditCard className="mr-3 text-gray-500" /> Transactions
                </button>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-grow">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
