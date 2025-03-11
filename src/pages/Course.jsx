import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicCard from "../components/course/CourseCard";
import FilterSection from "../components/FilteringComponent.jsx"; // Import the new component

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
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
        console.log(updatedCourses)
        setCourses(updatedCourses);
        setFilteredCourses(updatedCourses); // Initialize filtered courses
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
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  console.log(typeof currentCourses)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (filters) => {
    let filtered = courses;

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((course) =>
          course.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Apply price range filter
    if (filters.priceRange.min || filters.priceRange.max) {
      filtered = filtered.filter(
          (course) =>
              (!filters.priceRange.min || course.coursePrice >= filters.priceRange.min) &&
              (!filters.priceRange.max || course.coursePrice <= filters.priceRange.max)
      );
    }

    // Apply difficulty filter
    if (filters.difficulty.length > 0) {
      filtered = filtered.filter((course) =>
          filters.difficulty.includes(course.difficulty.toLowerCase())
      );
    }

    // Apply duration filter
    if (filters.duration) {
      filtered = filtered.filter((course) =>
          course.duration.toLowerCase().includes(filters.duration.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1); // Reset to the first page after filtering
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
          <FilterSection onFilterChange={handleFilterChange} />

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
                            title={course.courseName}
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