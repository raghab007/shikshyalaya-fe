import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicCard from "../components/course/CourseCard";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(6);

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
        setTotalPages(Math.ceil(updatedCourses.length / itemsPerPage));
      } catch (error) {
        setError(true);
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
    <div className="p-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Our Courses</h1>
        <p className="text-gray-500 mt-2">
          Explore a variety of courses to enhance your skills.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtering Section */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">
            Filter Courses
          </h2>
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Category
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                onChange={(e) =>
                  console.log("Selected category:", e.target.value)
                }
              >
                <option value="">All Categories</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Price Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    console.log("Min price:", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    console.log("Max price:", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Difficulty
              </label>
              <div className="flex itemx s-center space-x-4">
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <label key={level} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={level.toLowerCase()}
                      className="form-checkbox h-5 w-5 text-blue-600"
                      onChange={(e) =>
                        console.log("Selected difficulty:", e.target.value)
                      }
                    />
                    <span className="ml-2 text-gray-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Duration
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                onChange={(e) =>
                  console.log("Selected duration:", e.target.value)
                }
              >
                <option value="">Any Duration</option>
                <option value="short">Less than 1 hour</option>
                <option value="medium">1 to 3 hours</option>
                <option value="long">More than 3 hours</option>
              </select>
            </div>

            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Courses Section */}
        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.length === 0 || error ? (
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
