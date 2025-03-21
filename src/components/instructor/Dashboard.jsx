import React, { useState, useEffect, useRef } from "react";
import { BookOpen, User, PieChart, Bell, Calendar, X, Eye, GraduationCap, DollarSign } from "lucide-react";
import Chart from 'chart.js/auto';
import axios from "axios";

const Dashboard = () => {
  // Static data for courses, enrollments, notifications, and events
  const [courses,setCourses] = useState(null);

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

  // Chart.js refs
  const studentChartRef = useRef(null);
  const revenueChartRef = useRef(null);
  const progressChartRef = useRef(null);
  
  // Chart instances
  const [studentChart, setStudentChart] = useState(null);
  const [revenueChart, setRevenueChart] = useState(null);
  const [progressChart, setProgressChart] = useState(null);

  const totalStudents = 1
  const totalRevenue = 2;

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Progress data
  const progressData = [
    { name: "Not Started", value: 20 },
    { name: "In Progress", value: 50 },
    { name: "Completed", value: 30 },
  ];

  // Colors for charts
  const PROGRESS_COLORS = ["#FF6384", "#36A2EB", "#4CAF50"];
  const COURSE_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#8e24aa", "#16a085"];

  // Initialize Charts
  useEffect(() => {
    // Students by Course Bar Chart
    if (studentChartRef.current) {
      // Destroy existing chart if it exists
      if (studentChart) {
        studentChart.destroy();
      }

      const ctx = studentChartRef.current.getContext('2d');
      const newStudentChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: courses.map(course => course.courseName),
          datasets: [{
            label: 'Number of Students',
            data: courses.map(course => course.students),
            backgroundColor: '#4285F4',
            borderColor: '#3367d6',
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.6,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.raw} students`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
              }
            }
          }
        }
      });
      setStudentChart(newStudentChart);
    }

    // Revenue by Course Pie Chart
    if (revenueChartRef.current) {
      // Destroy existing chart if it exists
      if (revenueChart) {
        revenueChart.destroy();
      }

      const ctx = revenueChartRef.current.getContext('2d');
      const newRevenueChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: courses.map(course => course.courseName),
          datasets: [{
            data: courses.map(course => course.coursePrice * course.students),
            backgroundColor: COURSE_COLORS.slice(0, courses.length),
            borderWidth: 1,
            borderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                padding: 15
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const value = context.raw;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((value / total) * 100);
                  return `₹${formatNumber(value)} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
      setRevenueChart(newRevenueChart);
    }

    // Course Progress Doughnut Chart
    if (progressChartRef.current) {
      // Destroy existing chart if it exists
      if (progressChart) {
        progressChart.destroy();
      }

      const ctx = progressChartRef.current.getContext('2d');
      const newProgressChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: progressData.map(item => item.name),
          datasets: [{
            data: progressData.map(item => item.value),
            backgroundColor: PROGRESS_COLORS,
            borderWidth: 1,
            borderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '60%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                padding: 15
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.raw}%`;
                }
              }
            }
          }
        }
      });
      setProgressChart(newProgressChart);
    }

    // Cleanup function
    return () => {
      if (studentChart) studentChart.destroy();
      if (revenueChart) revenueChart.destroy();
      if (progressChart) progressChart.destroy();
    };
  }, []);

  useEffect(function (){
    async function getCourses() {
      const response = await axios.get("http://localhost:8085/instructor/course", {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      setCourses(response.data)
     
    }
    getCourses()
   
  },[])

  if(!courses){
    return <>
    
      <h1>Loading courses...</h1>
    </>
  }

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
                <Bell className="text-xl text-gray-600" />
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="text-2xl text-blue-600" />
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
                <User className="text-2xl text-green-600" />
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
                <DollarSign className="text-2xl text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800">₹{formatNumber(totalRevenue)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <GraduationCap className="text-2xl text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Avg. Revenue/Student</p>
                <p className="text-2xl font-bold text-gray-800">₹{formatNumber(Math.round(totalRevenue / totalStudents))}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Students by Course Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Students by Course</h2>
            <div className="h-80">
              <canvas ref={studentChartRef}></canvas>
            </div>
          </div>

          {/* Earnings by Course Pie Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Course</h2>
            <div className="h-80">
              <canvas ref={revenueChartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Course Progress */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Course Completion</h2>
            <div className="h-60">
              <canvas ref={progressChartRef}></canvas>
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
            <button className="mt-4 w-full py-2 bg-blue-50 hover:bg-blue-100 transition-colors duration-200 rounded text-sm font-medium text-blue-700 flex items-center justify-center">
              <Eye className="mr-2" /> View All Enrollments
            </button>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h2>
            <div className="divide-y">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="py-3">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-50 rounded-lg mr-3">
                      <Calendar className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{event.title}</p>
                      <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2 bg-blue-50 hover:bg-blue-100 transition-colors duration-200 rounded text-sm font-medium text-blue-700 flex items-center justify-center">
              <Calendar className="mr-2" /> View Calendar
            </button>
          </div>
        </div>

        {/* Recent Courses Table */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Course Performance</h2>
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
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                    <td className="py-4 px-6 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t flex justify-between items-center">
            <button className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium">
              View All Courses
            </button>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-sm bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                Previous
              </button>
              <button className="px-4 py-2 text-sm bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors duration-200">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <Bell className="text-blue-600 mr-2" />
                Notifications
              </h2>
              <button 
                onClick={() => setShowNotificationsModal(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <X className="text-xl" />
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