import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicCard from "../components/course/CourseCard";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [itemsPerPage] = useState(6); // Courses per page

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await axios.get("http://localhost:3000/courses");
        const updatedCourses = response.data.courses.map((course) => ({
          ...course,
          imageSrc: `https://picsum.photos/200/300?random=${Math.floor(
            Math.random() * 1000
          )}`,
        }));
        setCourses(updatedCourses);
        setTotalPages(Math.ceil(updatedCourses.length / itemsPerPage)); // Calculate total pages
      } catch (error) {
        setError(true);
      }
    }
    getCourses();
  }, []);

  // Calculate the courses to display for the current page
  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return (
      <h1 className="font-bold text-red-500 text-4xl text-center mt-20">
        Server Error
      </h1>
    );
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Our Courses</h1>
        <p className="text-gray-500 mt-2">
          Explore a variety of courses to enhance your skills.
        </p>
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtering Section */}
        <div className="w-full md:w-1/4 bg-gray-50 p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Filter Courses
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Category
              </label>
              <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400">
                <option value="">All Categories</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Price Range
              </label>
              <input
                type="range"
                min="1000"
                max="5000"
                className="w-full"
                defaultValue="2500"
              />
              <div className="text-sm text-gray-500 mt-1">Up to $2500</div>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Courses Section */}
        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">
              No courses available at the moment.
            </p>
          ) : (
            currentCourses.map((course) => (
              <BasicCard
                key={course.id}
                price={course.price}
                description={course.description}
                title={course.title}
                imageSrc={course.imageSrc}
              />
            ))
          )}
        </div>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center mt-8">
        <ul className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 border rounded-md ${
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
