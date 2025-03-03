import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicCard from "../components/course/CourseCard";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await axios.get("http://localhost:8085/courses");
        const updatedCourses = response.data;
        setCourses(updatedCourses);
        setTotalPages(Math.ceil(updatedCourses.length / itemsPerPage));
      } catch (error) {
        setError(true);
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }
    getCourses();
  }, []);

  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Our Courses</h1>
        <p className="text-gray-500 mt-2">
          Explore a variety of courses to enhance your skills.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto">
        {/* Filtering Section */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
            Filter Courses
          </h2>
          <div className="space-y-4">
            {/* Category Filter */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">Category</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                onChange={(e) => console.log("Selected category:", e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">Price Range</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => console.log("Min price:", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => console.log("Max price:", e.target.value)}
                />
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">Difficulty</label>
              <div className="flex items-center space-x-4">
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <label key={level} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={level.toLowerCase()}
                      className="form-checkbox h-4 w-4 text-blue-600"
                      onChange={(e) => console.log("Selected difficulty:", e.target.value)}
                    />
                    <span className="ml-2 text-gray-700 text-sm">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">Duration</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                onChange={(e) => console.log("Selected duration:", e.target.value)}
              >
                <option value="">Any Duration</option>
                <option value="short">Less than 1 hour</option>
                <option value="medium">1 to 3 hours</option>
                <option value="long">More than 3 hours</option>
              </select>
            </div>

            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Courses Section */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">
              Failed to load courses. Please try again later.
            </p>
          ) : currentCourses.length === 0 ? (
            <p className="text-center text-gray-600">
              No courses available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentCourses.map((course) => (
                <div className="flex justify-center" key={course.courseID}>
                  <BasicCard
                    courseId={course.courseID}
                    price={course.coursePrice}
                    description={course.courseDescription}
                    title={course.title}
                    imageSrc={course.imageUrl}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center mt-6">
        <ul className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 border rounded-md transition ${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {pageNumber}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}