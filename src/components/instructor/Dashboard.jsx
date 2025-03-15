import React, { useState } from "react";
import { FaBook, FaUserGraduate, FaChartPie, FaBell, FaCalendarAlt } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

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
    { id: 1, message: "New enrollment in React Basics" },
    { id: 2, message: "Course Node.js Fundamentals updated" },
    { id: 3, message: "New message from Jane Smith" },
  ]);

  const [upcomingEvents] = useState([
    { id: 1, title: "Webinar: Advanced React", date: "2023-10-15" },
    { id: 2, title: "Workshop: Node.js Best Practices", date: "2023-10-20" },
    { id: 3, title: "Live Q&A Session", date: "2023-10-25" },
  ]);

  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);

  // Data for the pie chart (course progress)
  const progressData = [
    { name: "Not Started", value: 20 },
    { name: "In Progress", value: 50 },
    { name: "Completed", value: 30 },
  ];
  const COLORS = ["#FF6384", "#36A2EB", "#4CAF50"]; // Colors for pie chart segments

  return (
    <div className="p-6 bg-orange-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Instructor Dashboard</h1>

      {/* Notifications Section */}
      <div className="mb-8">
        <div
          className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-xl transition-shadow duration-300"
          onClick={() => setShowNotificationsModal(true)}
        >
          <div className="flex items-center space-x-2">
            <FaBell className="text-blue-600" />
            <span className="text-lg font-semibold">Notifications</span>
          </div>
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
            {notifications.length}
          </span>
        </div>
      </div>

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <FaBell className="text-blue-600" />
              <span>Notifications</span>
            </h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <p className="text-gray-600">{notification.message}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowNotificationsModal(false)}
              className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white shadow-lg rounded-lg flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300">
          <FaBook className="text-4xl text-blue-600" />
          <div>
            <p className="text-3xl font-bold">{courses.length}</p>
            <p className="text-gray-600">Courses</p>
          </div>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300">
          <FaUserGraduate className="text-4xl text-blue-600" />
          <div>
            <p className="text-3xl font-bold">{totalStudents}</p>
            <p className="text-gray-600">Students Enrolled</p>
          </div>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4">Course Progress</h2>
          <div className="flex items-center space-x-2">
            <PieChart width={100} height={100}>
              <Pie
                data={progressData}
                cx={50}
                cy={50}
                innerRadius={30}
                outerRadius={50}
                fill="#8884d8"
                dataKey="value"
              >
                {progressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>

      {/* Recent Courses Table */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-bold mb-4">Recent Courses</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Course Name</th>
                <th className="text-left py-3 px-4">Description</th>
                <th className="text-left py-3 px-4">Price</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors duration-200 border-b">
                  <td className="py-3 px-4">{course.courseName}</td>
                  <td className="py-3 px-4">{course.courseDescription}</td>
                  <td className="py-3 px-4">Rs {course.coursePrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Enrollments */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-bold mb-4">Recent Enrollments</h2>
        <div className="space-y-4">
          {recentEnrollments.map((enrollment) => (
            <div key={enrollment.id} className="flex items-center space-x-4">
              <img
                src={enrollment.studentAvatar}
                alt="Student"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{enrollment.studentName}</p>
                <p className="text-gray-600">Enrolled in {enrollment.courseName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      
    </div>
  );
};

export default Dashboard; 