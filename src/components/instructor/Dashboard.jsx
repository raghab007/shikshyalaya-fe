import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  User,
  PieChart,
  Bell,
  Calendar,
  X,
  Eye,
  GraduationCap,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import Chart from "chart.js/auto";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // State for total students and courses
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [courses, setCourses] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Other static data
  const [notifications] = useState([
    {
      id: 1,
      message: "New enrollment in React Fundamentals",
      time: "2 hours ago",
    },
    { id: 2, message: "Course Node.js Backend updated", time: "5 hours ago" },
    { id: 3, message: "New message from Jane Smith", time: "1 day ago" },
  ]);

  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  // Chart refs and instances
  const studentChartRef = useRef(null);
  const revenueChartRef = useRef(null);
  const progressChartRef = useRef(null);
  const [studentChart, setStudentChart] = useState(null);
  const [revenueChart, setRevenueChart] = useState(null);
  const [progressChart, setProgressChart] = useState(null);

  // Progress data
  const progressData = [
    { name: "Not Started", value: 20 },
    { name: "In Progress", value: 50 },
    { name: "Completed", value: 30 },
  ];

  // Colors
  const PROGRESS_COLORS = ["#FF6384", "#36A2EB", "#4CAF50"];
  const COURSE_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

  const formatNumber = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const navigate = useNavigate();

  // Fetch dynamic data
  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await axios.get(
          "http://localhost:8085/instructor/courses/stats",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTotalStudents(response.data.TotalStudents);
        setTotalCourses(response.data.TotalCourses);
        setTotalRevenue(response.data.TotalRevenue);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }

    async function fetchCourses() {
      try {
        const response = await axios.get(
          "http://localhost:8085/instructor/course",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    async function fetchChartData() {
      try {
        const response = await axios.get(
          "http://localhost:8085/instructor/courses/chart-data",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    }

    async function fetchEnrollments() {
      try {
        const response = await axios.get(
          "http://localhost:8085/instructor/enrollments",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Sort enrollments by date and take the 5 most recent
        const sortedEnrollments = response.data
          .sort((a, b) => new Date(b.enrollmentDate) - new Date(a.enrollmentDate))
          .slice(0, 5);
        setRecentEnrollments(sortedEnrollments);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    fetchCourses();
    fetchChartData();
    fetchEnrollments();
  }, []);

  // Initialize Charts with dynamic data
  useEffect(() => {
    if (
      studentChartRef.current &&
      revenueChartRef.current &&
      progressChartRef.current &&
      chartData.length > 0
    ) {
      // Filter out courses with zero students for the bar chart
      const barChartData = chartData.filter((course) => course.students > 0);

      // Students by Course Bar Chart
      if (studentChart) studentChart.destroy();

      const studentCtx = studentChartRef.current.getContext("2d");
      const newStudentChart = new Chart(studentCtx, {
        type: "bar",
        data: {
          labels: barChartData.map((course) => course.courseName),
          datasets: [
            {
              label: "Number of Students",
              data: barChartData.map((course) => course.students),
              backgroundColor: "#4285F4",
              borderColor: "#3367d6",
              borderWidth: 1,
              borderRadius: 4,
              barPercentage: 0.6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `${context.raw} students`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { drawBorder: false },
              ticks: { precision: 0 },
            },
            x: { grid: { display: false } },
          },
        },
      });
      setStudentChart(newStudentChart);

      // Revenue by Course Pie Chart (shows all courses including zero students)
      if (revenueChart) revenueChart.destroy();

      const revenueCtx = revenueChartRef.current.getContext("2d");
      const newRevenueChart = new Chart(revenueCtx, {
        type: "pie",
        data: {
          labels: chartData.map((course) => course.courseName),
          datasets: [
            {
              data: chartData.map((course) => course.totalRevenue),
              backgroundColor: COURSE_COLORS,
              borderWidth: 1,
              borderColor: "#fff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: { boxWidth: 12, padding: 15 },
            },
            tooltip: {
              callbacks: {
                label: (context) => `₹${formatNumber(context.raw)}`,
              },
            },
          },
        },
      });
      setRevenueChart(newRevenueChart);

      // Course Progress Doughnut Chart (kept static as per your request)
      if (progressChart) progressChart.destroy();

      const progressCtx = progressChartRef.current.getContext("2d");
      const newProgressChart = new Chart(progressCtx, {
        type: "doughnut",
        data: {
          labels: progressData.map((item) => item.name),
          datasets: [
            {
              data: progressData.map((item) => item.value),
              backgroundColor: PROGRESS_COLORS,
              borderWidth: 1,
              borderColor: "#fff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "60%",
          plugins: {
            legend: {
              position: "bottom",
              labels: { boxWidth: 12, padding: 15 },
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.raw}%`,
              },
            },
          },
        },
      });
      setProgressChart(newProgressChart);
    }

    return () => {
      if (studentChart) studentChart.destroy();
      if (revenueChart) revenueChart.destroy();
      if (progressChart) progressChart.destroy();
    };
  }, [chartData]); // Only re-run when chartData changes

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Instructor Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <button
                className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={() => setShowNotificationsModal(true)}
              ></button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Courses Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="text-2xl text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Courses</p>
                <p className="text-2xl font-bold text-gray-800">
                  {formatNumber(totalCourses)}
                </p>
              </div>
            </div>
          </div>

          {/* Total Students Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <User className="text-2xl text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Students</p>
                <p className="text-2xl font-bold text-gray-800">
                  {formatNumber(totalStudents)}
                </p>
              </div>
            </div>
          </div>

          {/* Total Revenue Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="text-2xl text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800">
                  {formatNumber(totalRevenue)}
                </p>
              </div>
            </div>
          </div>

          {/* Avg. Revenue/Student Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <GraduationCap className="text-2xl text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Avg. Revenue/Student
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {totalStudents > 0
                    ? formatNumber(Math.round(totalRevenue / totalStudents))
                    : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Students by Course Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Students by Course
            </h2>
            <div className="h-80">
              <canvas ref={studentChartRef}></canvas>
            </div>
          </div>

          {/* Revenue by Course Pie Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Revenue by Course
            </h2>
            <div className="h-80">
              <canvas ref={revenueChartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Course Progress */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Course Completion
            </h2>
            <div className="h-60">
              <canvas ref={progressChartRef}></canvas>
            </div>
          </div>

          {/* Recent Enrollments */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Enrollments
            </h2>
            <div className="divide-y">
              {loading ? (
                <div className="py-3 text-center text-gray-500">Loading...</div>
              ) : recentEnrollments.length > 0 ? (
                recentEnrollments.map((enrollment) => (
                  <div key={enrollment.id} className="py-3">
                    <p className="font-medium text-gray-800">
                      {enrollment.user?.firstName} {enrollment.user?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Enrolled in {enrollment.course?.courseName}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className="py-3 text-center text-gray-500">No recent enrollments</div>
              )}
            </div>
            <button 
              onClick={() => navigate('/instructor/students')}
              className="mt-4 w-full py-2 bg-[#02084b] hover:bg-[#02084b]/90 rounded text-sm font-medium text-white flex items-center justify-center transition-colors"
            >
              <Eye className="mr-2" /> View All Enrollments
            </button>
          </div>
        </div>

        {/* Recent Courses Table */}
        <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Your Courses
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Name
                  </th>
                 
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-800">
                      {course.courseName}
                    </td>
                   
                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">
                      {course.totalEnrollments}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">
                      {formatNumber(course.coursePrice)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">
                     Rs {formatNumber(course.coursePrice * course.totalEnrollments)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <button
                        onClick={() =>
                          navigate(
                            `/instructor/coursedetails/${course.courseID}`
                          )
                        }
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t flex justify-between items-center">
            <button className="flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
              <Eye className="mr-2" /> View All Courses
            </button>
            <div className="flex space-x-2">
              <button className="flex items-center px-4 py-2 text-sm bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                <ChevronLeft className="mr-2" /> Previous
              </button>
              <button className="flex items-center px-4 py-2 text-sm bg-blue-600 rounded text-white hover:bg-blue-700">
                Next <ChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Notifications Modal */}
      {/* {showNotificationsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <Bell className="text-blue-600 mr-2" /> Notifications
              </h2>
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="text-xl" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <Bell className="text-4xl text-gray-300 mb-2" />
                  No notifications yet
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 hover:bg-gray-50">
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
                className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
              >
                <X className="mr-2" /> Close
              </button>
              <button
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                <Check className="mr-2" /> Mark All as Read
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Dashboard;