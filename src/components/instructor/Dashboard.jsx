import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBook, FaUserGraduate, FaChartPie } from "react-icons/fa";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(function () {
    async function getCourses() {
      try {
        const response = await axios.get("http://localhost:8085/courses");
        console.log("API Response:", response.data); // Log the response
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    getCourses();
  }, []);

  if (courses == null) {
    return <h1>Loading...</h1>;
  }

  const totalStudents = 3
  // courses.reduce((sum, course) => sum + course.students, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Instructor Overview</h1>

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
          <h2 className="text-xl font-bold mb-4">Course Reports</h2>
          <div className="flex items-center space-x-2">
            <FaChartPie className="text-4xl text-blue-600" />
            <p className="text-gray-600">Not Started | In Progress | Completed</p>
          </div>
        </div>
      </div>

      {/* Recent Courses Table */}
      <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
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
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors duration-200 border-b">
                    <td className="py-3 px-4">{course.courseName}</td>
                    <td className="py-3 px-4">{course.courseDescription}</td>
                    <td className="py-3 px-4">Rs {course.coursePrice  }</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-3 px-4 text-center text-gray-600">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;