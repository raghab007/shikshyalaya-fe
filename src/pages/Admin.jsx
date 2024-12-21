import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Admin() {
  return (
    <div className="container mx-auto mt-8 flex">
      {/* Vertical Navigation */}
      <nav className="w-1/4 bg-gray-100 p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/courses"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded-md"
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded-md"
            >
              Users
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="w-3/4 bg-white p-6 rounded-md shadow-md ml-4">
        <Routes>
          <Route path="/admin/courses" element={<Courses />} />
          <Route path="/admin/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}

function Users() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">User Management</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">1</td>
            <td className="border border-gray-300 px-4 py-2">John Doe</td>
            <td className="border border-gray-300 px-4 py-2">john.doe@example.com</td>
            <td className="border border-gray-300 px-4 py-2">Admin</td>
            <td className="border border-gray-300 px-4 py-2 space-x-2">
              <button className="text-blue-500">Edit</button>
              <button className="text-red-500">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}




function Courses() {  
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getAllCourses() {
      try {
        const response = await axios.get('http://localhost:3000/courses');
        console.log(response.data.courses); // Make sure response contains an array of courses
        setCourses(response.data.courses); // Store courses data
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    }

    getAllCourses();
  }, []); // Use empty dependency array to fetch only once on component mount

  if (isError) {
    return <h1>Server error</h1>;
  }

  if (isLoading) {
    return <h1>Loading courses...</h1>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Course Management</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{course.id}</td>
              <td className="border border-gray-300 px-4 py-2">{course.name}</td>
              <td className="border border-gray-300 px-4 py-2">{course.description}</td>
              <td className="border border-gray-300 px-4 py-2">{course.price}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button className="text-blue-500">Edit</button>
                <button className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



export default Admin;
