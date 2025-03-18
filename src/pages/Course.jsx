import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicCard from "../components/course/CourseCard";
import FilterSection from "../components/FilteringComponent.jsx";

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
        console.log(updatedCourses);
        setCourses(updatedCourses);
        setFilteredCourses(updatedCourses);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const applyFilters = (courses, filters) => {
    let filtered = courses;

    if (filters.category) {
      filtered = filtered.filter((course) =>
        course.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.priceRange.min || filters.priceRange.max) {
      filtered = filtered.filter(
        (course) =>
          (!filters.priceRange.min || course.coursePrice >= filters.priceRange.min) &&
          (!filters.priceRange.max || course.coursePrice <= filters.priceRange.max)
      );
    }

    if (filters.difficulty.length > 0) {
      filtered = filtered.filter((course) =>
        filters.difficulty.includes(course.difficulty.toLowerCase())
      );
    }

    if (filters.duration) {
      filtered = filtered.filter((course) =>
        course.duration.toLowerCase().includes(filters.duration.toLowerCase())
      );
    }

    return filtered;
  };

  const handleFilterChange = (filters) => {
    const filtered = applyFilters(courses, filters);
    setFilteredCourses(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Our Courses</h1>
          <p className="text-xl text-blue-100">
            Expand your horizons with our expertly curated learning experiences
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtering Section - Styled as a card */}
          <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4 h-fit sticky top-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Filters</h2>
            <FilterSection onFilterChange={handleFilterChange} />
          </div>

          {/* Courses Section */}
          <div className="w-full md:w-3/4">
            {/* Results summary */}
            {!loading && !error && (
              <div className="mb-4 bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
                <p className="text-gray-700">
                  <span className="font-semibold">{filteredCourses.length}</span> courses found
                </p>
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstCourse + 1}-{Math.min(indexOfLastCourse, filteredCourses.length)} of {filteredCourses.length}
                </div>
              </div>
            )}

            {/* Loading state */}
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64 bg-white rounded-lg shadow-sm p-6">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600">Loading courses...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                </svg>
                <p>Failed to load courses. Please try again later.</p>
              </div>
            ) : currentCourses.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-6 rounded-lg text-center">
                <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
                <p className="text-lg font-semibold">No courses match your filters</p>
                <p className="mt-1">Try adjusting your filter criteria to find more courses.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCourses.map((course) => (
                  <div className="transform transition hover:-translate-y-1 hover:shadow-lg" key={course.courseID}>
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

            {/* Enhanced Pagination */}
            {totalPages > 1 && !loading && !error && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center bg-white px-3 py-2 rounded-md shadow-sm">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-2 py-1 mr-2 rounded-md ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-700 hover:bg-blue-50"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                  
                  {/* Show limited page numbers with ellipsis for better UX */}
                  {Array.from({ length: totalPages }, (_, index) => index + 1)
                    .filter(num => 
                      num === 1 || 
                      num === totalPages || 
                      (num >= currentPage - 1 && num <= currentPage + 1)
                    )
                    .map((pageNumber, index, array) => (
                      <React.Fragment key={pageNumber}>
                        {index > 0 && array[index - 1] !== pageNumber - 1 && (
                          <span className="px-2 py-1 text-gray-500">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-1 mx-1 rounded-md transition ${
                            currentPage === pageNumber
                              ? "bg-blue-500 text-white font-medium"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      </React.Fragment>
                    ))}
                  
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-2 py-1 ml-2 rounded-md ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-700 hover:bg-blue-50"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}