import React, { useState } from "react";
import { FaBook, FaUserGraduate, FaChartPie } from "react-icons/fa";

const Dashboard = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "React Basics", students: 10, category: "Web Dev" },
    { id: 2, name: "Spring Boot", students: 8, category: "Backend" },
    { id: 3, name: "Node.js Advanced", students: 15, category: "Web Dev" },
    { id: 4, name: "Python for Data Science", students: 20, category: "Data Science" },
  ]);

  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);

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
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Course Name</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Students Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-3 px-4">{course.name}</td>
                  <td className="py-3 px-4">{course.category}</td>
                  <td className="py-3 px-4">{course.students}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;