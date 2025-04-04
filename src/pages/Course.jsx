import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicCard from "../components/course/CourseCard";
import FilterSection from "../components/FilteringComponent.jsx";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    async function getCourses() {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8085/courses", {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });
        const { courses: fetchedCourses, totalPages: fetchedTotalPages } = response.data;
        setCourses(fetchedCourses);
        setTotalPages(fetchedTotalPages);
      } catch (error) {
        setError(true);
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }
    getCourses();
  }, [currentPage]); // Re-fetch data when currentPage changes

  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...courses];

    switch (option) {
      case "price-low-high":
        sorted.sort((a, b) => a.coursePrice - b.coursePrice);
        break;
      case "price-high-low":
        sorted.sort((a, b) => b.coursePrice - a.coursePrice);
        break;
      case "name-a-z":
        sorted.sort((a, b) => a.courseName.localeCompare(b.courseName));
        break;
      case "name-z-a":
        sorted.sort((a, b) => b.courseName.localeCompare(a.courseName));
        break;
      default:
        // Keep original order
        break;
    }

    setCourses(sorted);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    setCourses(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setCourses(courses);
    setTotalPages(Math.ceil(courses.length / itemsPerPage));
    setCurrentPage(1);
    setSortOption("default");
  };

  return (
    <div className="bg-gradient-to-b from-[#e8f1f8] to-[#f1f7fb] min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2e7dad] to-[#1c5f8f] text-white py-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl font-bold mb-4 tracking-tight text-center">
            Explore Our Courses
          </h1>
          <p className="text-xl text-blue-100 text-center max-w-2xl mx-auto">
            Discover top-notch courses designed by industry experts. Learn new skills, enhance your
            career, and achieve your goals with ease.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtering Section */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4 border border-blue-100">
              <div className="flex justify-between items-center mb-4 border-b border-blue-100 pb-3">
                <h2 className="text-xl font-bold text-blue-800">Filters</h2>
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear all
                </button>
              </div>
              <FilterSection onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Courses Section */}
          <div className="w-full md:w-3/4">
            {/* Results summary with sorting options */}
            {!loading && !error && (
              <div className="mb-6 bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-gray-700 mb-3 sm:mb-0">
                    <span className="font-bold text-blue-800">{courses.length}</span> courses found
                  </p>
                  <div className="flex items-center">
                    <label htmlFor="sort" className="text-sm text-gray-600 mr-2">Sort by:</label>
                    <select
                      id="sort"
                      value={sortOption}
                      onChange={(e) => handleSort(e.target.value)}
                      className="bg-blue-50 border border-blue-100 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                    >
                      <option value="default">Featured</option>
                      <option value="price-low-high">Price: Low to High</option>
                      <option value="price-high-low">Price: High to Low</option>
                      <option value="name-a-z">Name: A to Z</option>
                      <option value="name-z-a">Name: Z to A</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Loading state */}
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64 bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-blue-600 font-medium">Loading courses...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl shadow-sm flex items-center justify-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">Failed to load courses</p>
                  <p className="text-sm mt-1">Please try again later or contact support if the problem persists.</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="mt-3 text-sm bg-red-100 hover:bg-red-200 text-red-800 py-1 px-4 rounded-lg transition duration-200"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : courses.length === 0 ? (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 p-8 rounded-xl shadow-sm text-center">
                <svg className="w-14 h-14 mx-auto mb-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-xl font-bold">No courses match your filters</p>
                <p className="mt-2 text-blue-600">Try adjusting your filter criteria to find more courses.</p>
                <button 
                  onClick={handleClearFilters} 
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-200 shadow-md"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div 
                    className="transform transition duration-300 hover:-translate-y-2 hover:shadow-xl" 
                    key={course.courseID}
                  >
                    <BasicCard
                      courseId={course.courseID}
                      price={course.coursePrice}
                      description={course.courseDescription}
                      title={course.courseName}
                      imageSrc={course.imageUrl}
                      difficulty={course.difficulty}
                      duration={course.duration}
                      category={course.category}
                      instructorName = {course.instructorName}
                      studentsEnrolled = {course.totalEnrollments}
                      level={course.courseDifficulty}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !loading && !error && courses.length > 0 && (
              <div className="mt-10 flex justify-center">
                <nav className="flex items-center bg-white px-4 py-3 rounded-xl shadow-lg border border-blue-100">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 mr-2 rounded-lg flex items-center transition ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed bg-gray-50"
                        : "text-blue-700 hover:bg-blue-50"
                    }`}
                    aria-label="Previous page"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
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
                          className={`w-10 h-10 mx-1 rounded-lg transition duration-200 ${
                            currentPage === pageNumber
                              ? "bg-blue-600 text-white font-medium shadow-md"
                              : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                          }`}
                          aria-label={`Page ${pageNumber}`}
                          aria-current={currentPage === pageNumber ? "page" : undefined}
                        >
                          {pageNumber}
                        </button>
                      </React.Fragment>
                    ))}
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 ml-2 rounded-lg flex items-center transition ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed bg-gray-50"
                        : "text-blue-700 hover:bg-blue-50"
                    }`}
                    aria-label="Next page"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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