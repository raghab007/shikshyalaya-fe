import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import BasicCard from "../components/course/CourseCard";
import FilterSection from "../components/FilteringComponent";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // Extract search query from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("search") || "";
    setSearchQuery(query);
    setCurrentPage(1);
  }, [location.search]);

  // Fetch courses
  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        const endpoint = searchQuery ? "/courses/search" : "/courses";
        const params = { page: currentPage, limit: itemsPerPage };
        if (searchQuery) params.query = searchQuery;

        const response = await axios.get(`http://localhost:8085${endpoint}`, {
          params,
        });
        const { courses: fetchedCourses, totalPages: fetchedTotalPages } =
          response.data;

        console.log(fetchedCourses);
        setCourses(fetchedCourses);
        setTotalPages(fetchedTotalPages);
      } catch (error) {
        setError(true);
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, [currentPage, searchQuery]);

  const handleSort = (option) => {
    setSortOption(option);
    const sorted = [...courses].sort((a, b) => {
      switch (option) {
        case "price-low-high":
          return a.coursePrice - b.coursePrice;
        case "price-high-low":
          return b.coursePrice - a.coursePrice;
        case "name-a-z":
          return a.courseName.localeCompare(b.courseName);
        case "name-z-a":
          return b.courseName.localeCompare(a.courseName);
        default:
          return 0;
      }
    });
    setCourses(sorted);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const applyFilters = (filters) => {
    let filtered = [...courses];

    if (filters.category) {
      filtered = filtered.filter((c) =>
        c.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    if (filters.priceRange.min || filters.priceRange.max) {
      filtered = filtered.filter(
        (c) =>
          (!filters.priceRange.min ||
            c.coursePrice >= filters.priceRange.min) &&
          (!filters.priceRange.max || c.coursePrice <= filters.priceRange.max)
      );
    }
    if (filters.difficulty.length > 0) {
      filtered = filtered.filter((c) =>
        filters.difficulty.includes(c.difficulty.toLowerCase())
      );
    }
    if (filters.duration) {
      filtered = filtered.filter((c) =>
        c.duration.toLowerCase().includes(filters.duration.toLowerCase())
      );
    }

    return filtered;
  };

  const handleFilterChange = (filters) => {
    const filtered = applyFilters(filters);
    setCourses(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    // Reset to original state
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("search") || "";
    setSearchQuery(query);
    setCurrentPage(1);
    setSortOption("default");
    // This would ideally refetch original data
  };

  return (
    <div className="bg-gradient-to-b from-[#e8f1f8] to-[#f1f7fb] min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2e7dad] to-[#1c5f8f] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : "Explore Our Courses"}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {searchQuery
              ? `Found ${courses.length} matching courses`
              : "Discover top-notch courses designed by industry experts"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4 border border-blue-100">
              <div className="flex justify-between items-center mb-4 border-b border-blue-100 pb-3">
                <h2 className="text-xl font-bold text-blue-800">Filters</h2>
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all
                </button>
              </div>
              <FilterSection onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Courses */}
          <div className="w-full md:w-3/4">
            {/* Results Header */}
            {!loading && !error && (
              <div className="mb-6 bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-gray-700 mb-3 sm:mb-0">
                    {searchQuery ? (
                      <>
                        <span className="font-bold text-blue-800">
                          {courses.length}
                        </span>{" "}
                        results for "
                        <span className="font-medium text-blue-800">
                          {searchQuery}
                        </span>
                        "
                      </>
                    ) : (
                      <>
                        <span className="font-bold text-blue-800">
                          {courses.length}
                        </span>{" "}
                        courses found
                      </>
                    )}
                  </p>
                  <div className="flex items-center">
                    <label
                      htmlFor="sort"
                      className="text-sm text-gray-600 mr-2"
                    >
                      Sort by:
                    </label>
                    <select
                      id="sort"
                      value={sortOption}
                      onChange={(e) => handleSort(e.target.value)}
                      className="bg-blue-50 border border-blue-100 text-blue-900 text-sm rounded-lg p-2"
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

            {/* Loading/Error States */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl text-center">
                <p className="font-medium">Failed to load courses</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 text-sm bg-red-100 text-red-800 py-1 px-4 rounded-lg"
                >
                  Retry
                </button>
              </div>
            ) : courses.length === 0 ? (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 p-8 rounded-xl text-center">
                <p className="text-xl font-bold">
                  {searchQuery
                    ? "No courses match your search"
                    : "No courses match your filters"}
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg"
                >
                  {searchQuery ? "Clear search" : "Clear filters"}
                </button>
              </div>
            ) : (
              <>
                {/* Course Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div
                      key={course.courseID}
                      className="transform hover:-translate-y-2 transition duration-300"
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
                        instructorName={course.instructorName || "Unknown"}
                        studentsEnrolled={course.totalEnrollments || 0}
                        level={course.courseDifficulty}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex justify-center">
                    <div className="bg-white px-4 py-3 rounded-xl shadow-lg border border-blue-100 flex items-center">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1.5 mr-2 rounded-lg ${currentPage === 1 ? "text-gray-400" : "text-blue-700"}`}
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(
                          (page) =>
                            page === 1 ||
                            page === totalPages ||
                            Math.abs(page - currentPage) <= 1
                        )
                        .map((page, i, arr) => (
                          <React.Fragment key={page}>
                            {i > 0 && arr[i - 1] !== page - 1 && (
                              <span className="px-2">...</span>
                            )}
                            <button
                              onClick={() => handlePageChange(page)}
                              className={`w-10 h-10 mx-1 rounded-lg ${
                                currentPage === page
                                  ? "bg-blue-600 text-white"
                                  : "hover:bg-blue-50"
                              }`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        ))}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1.5 ml-2 rounded-lg ${currentPage === totalPages ? "text-gray-400" : "text-blue-700"}`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
