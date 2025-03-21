import React, { useState } from "react";
import { FaBook, FaUserGraduate, FaChartPie, FaBell, FaCalendarAlt, FaTimes, FaEye } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  // Static data for courses, enrollments, notifications, and events
  const [courses] = useState([
    { id: 1, courseName: "React Basics", courseDescription: "Learn React from scratch", coursePrice: 2999, students: 120 },
    { id: 2, courseName: "Advanced JavaScript", courseDescription: "Master JavaScript concepts", coursePrice: 3999, students: 90 },
    { id: 3, courseName: "Node.js Fundamentals", courseDescription: "Build backend with Node.js", coursePrice: 4999, students: 80 },
  ]);

  const [recentEnrollments] = useState([
    { id: 1, studentName: "John Doe", studentAvatar: "https://via.placeholder.com/40", courseName: "React Basics" },
    { id: 2, studentName: "Jane Smith", studentAvatar: "https://via.placeholder.com/40", courseName: "Advanced JavaScript" },
    { id: 3, studentName: "Alice Johnson", studentAvatar: "https://via.placeholder.com/40", courseName: "Node.js Fundamentals" },
  ]);

  const [notifications] = useState([
    { id: 1, message: "New enrollment in React Basics", time: "2 hours ago" },
    { id: 2, message: "Course Node.js Fundamentals updated", time: "5 hours ago" },
    { id: 3, message: "New message from Jane Smith", time: "1 day ago" },
  ]);

  const [upcomingEvents] = useState([
    { id: 1, title: "Webinar: Advanced React", date: "2023-10-15" },
    { id: 2, title: "Workshop: Node.js Best Practices", date: "2023-10-20" },
    { id: 3, title: "Live Q&A Session", date: "2023-10-25" },
  ]);

  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [activeTab, setActiveTab] = useState("courses");

  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const totalRevenue = courses.reduce((sum, course) => sum + (course.coursePrice * course.students), 0);

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Data for the pie chart (course progress)
  const progressData = [
    { name: "Not Started", value: 20 },
    { name: "In Progress", value: 50 },
    { name: "Completed", value: 30 },
  ];
  const COLORS = ["#FF6384", "#36A2EB", "#4CAF50"]; // Colors for pie chart segments

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Instructor Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button 
                className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                onClick={() => setShowNotificationsModal(true)}
              >
                <FaBell className="text-gray-600" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-6">
        {/* Navigation Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`py-2 px-4 font-medium transition-colors duration-200 border-b-2 ${
              activeTab === "courses" ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("courses")}
          >
            Dashboard
          </button>
          <button
            className={`py-2 px-4 font-medium transition-colors duration-200 border-b-2 ${
              activeTab === "students" ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
          <button
            className={`py-2 px-4 font-medium transition-colors duration-200 border-b-2 ${
              activeTab === "settings" ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaBook className="text-2xl text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Courses</p>
                <p className="text-2xl font-bold text-gray-800">{courses.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaUserGraduate className="text-2xl text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Students</p>
                <p className="text-2xl font-bold text-gray-800">{formatNumber(totalStudents)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaChartPie className="text-2xl text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800">₹{formatNumber(totalRevenue)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FaCalendarAlt className="text-2xl text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Upcoming Events</p>
                <p className="text-2xl font-bold text-gray-800">{upcomingEvents.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Course Progress */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Course Progress</h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {progressData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Enrollments */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Enrollments</h2>
            <div className="divide-y">
              {recentEnrollments.map((enrollment) => (
                <div key={enrollment.id} className="py-3 flex items-center space-x-3">
                  <img
                    src={enrollment.studentAvatar}
                    alt={enrollment.studentName}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{enrollment.studentName}</p>
                    <p className="text-sm text-gray-500">Enrolled in {enrollment.courseName}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded text-sm font-medium text-gray-700 flex items-center justify-center">
              <FaEye className="mr-2" /> View All Enrollments
            </button>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200">
                  <p className="font-medium text-gray-800">{event.title}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    {formatDate(event.date)}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded text-sm font-medium text-gray-700 flex items-center justify-center">
              <FaCalendarAlt className="mr-2" /> View Full Calendar
            </button>
          </div>
        </div>

        {/* Recent Courses Table */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Recent Courses</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors duration-100">
                    <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-800">{course.courseName}</td>
                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">{course.courseDescription}</td>
                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">{course.students}</td>
                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">₹{formatNumber(course.coursePrice)}</td>
                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">₹{formatNumber(course.coursePrice * course.students)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t">
            <button className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium">
              View All Courses
            </button>
          </div>
        </div>
      </main>

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaBell className="text-blue-600 mr-2" />
                Notifications
              </h2>
              <button 
                onClick={() => setShowNotificationsModal(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <FaTimes />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No notifications yet
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t flex justify-between">
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
              >
                Mark All as Read
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;