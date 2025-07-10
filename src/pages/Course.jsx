import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import BasicCard from "../components/course/CourseCard";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState({
    hasError: false,
    message: "",
    statusCode: null,
    isNetworkError: false,
  });
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: { min: "", max: "" },
    difficulty: [],
    duration: "",
  });
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);

  // Extract search query from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("search") || "";
    setSearchQuery(query);
    setCurrentPage(1);
  }, [location.search]);

  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8085/course/course_category"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

  // Enhanced fetch function
  const fetchData = async (endpoint, params = {}) => {
    try {
      const response = await axios.get(`http://localhost:8085${endpoint}`, {
        params: { ...params, page: currentPage, limit: itemsPerPage },
      });

      if (
        !response.data ||
        (Array.isArray(response.data) && response.data.length === 0)
      ) {
        throw {
          response: {
            status: 404,
            data: { message: "No courses found" },
          },
        };
      }

      return response.data;
    } catch (error) {
      let errorMessage = "Failed to load courses";
      let isNetworkError = false;

      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = searchQuery
            ? `No courses found for "${searchQuery}"`
            : "No courses available";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later";
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection";
        isNetworkError = true;
      }

      throw {
        message: errorMessage,
        statusCode: error.response?.status,
        isNetworkError,
      };
    }
  };

  // Main fetch courses function
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError({
        hasError: false,
        message: "",
        statusCode: null,
        isNetworkError: false,
      });

      const endpoint = searchQuery ? "/courses/search" : "/courses";
      const params = searchQuery ? { query: searchQuery } : {};

      const data = await fetchData(endpoint, params);
      setCourses(data);
      setTotalPages(Math.ceil((data?.length || 0) / itemsPerPage));
    } catch (err) {
      setError({
        hasError: true,
        message: err.message,
        statusCode: err.statusCode,
        isNetworkError: err.isNetworkError,
      });
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses by category
  const fetchByCategory = async () => {
    if (!selectedCategory) return;

    try {
      setFilterLoading(true);
      const data = await fetchData(`/courses/category/${selectedCategory}`);
      setCourses(data.courses || data); // Handle different response formats
      setTotalPages(
        data.totalPages ||
          Math.ceil((data.courses?.length || data?.length || 0) / itemsPerPage)
      );
    } catch (err) {
      setError({
        hasError: true,
        message: `No courses found in this category`,
        statusCode: err.statusCode,
        isNetworkError: err.isNetworkError,
      });
      setCourses([]);
    } finally {
      setFilterLoading(false);
    }
  };

  // Fetch courses by price range
  const fetchByPrice = async () => {
    if (!filters.priceRange.min && !filters.priceRange.max) return;

    try {
      setFilterLoading(true);
      const data = await fetchData(`/courses/price`, {
        min: filters.priceRange.min,
        max: filters.priceRange.max,
      });
      setCourses(data.courses || data);
      setTotalPages(
        data.totalPages ||
          Math.ceil((data.courses?.length || data?.length || 0) / itemsPerPage)
      );
    } catch (err) {
      setError({
        hasError: true,
        message: `No courses in this price range`,
        statusCode: err.statusCode,
        isNetworkError: err.isNetworkError,
      });
      setCourses([]);
    } finally {
      setFilterLoading(false);
    }
  };

  // Fetch courses by difficulty
  const fetchByDifficulty = async () => {
    if (selectedDifficulties.length === 0) return;

    try {
      setFilterLoading(true);
      const responses = await Promise.all(
        selectedDifficulties.map((difficulty) =>
          axios.get(`http://localhost:8085/courses/difficulty/${difficulty}`, {
            params: { page: currentPage, limit: itemsPerPage },
          })
        )
      );

      const allCourses = responses.flatMap(
        (response) => response.data.courses || response.data
      );
      const uniqueCourses = Array.from(
        new Map(allCourses.map((course) => [course.courseID, course])).values()
      );

      if (uniqueCourses.length === 0) {
        throw {
          response: {
            status: 404,
            data: {
              message: "No courses found for selected difficulty levels",
            },
          },
        };
      }

      setCourses(Array.from(uniqueCourses));
      setTotalPages(Math.ceil(uniqueCourses.length / itemsPerPage));
    } catch (err) {
      setError({
        hasError: true,
        message: `No courses found for selected difficulty levels`,
        statusCode: err.response?.status,
        isNetworkError: !err.response,
      });
      setCourses([]);
    } finally {
      setFilterLoading(false);
    }
  };

  // Main useEffect for fetching courses
  useEffect(() => {
    if (selectedDifficulties.length > 0) {
      fetchByDifficulty();
    } else if (selectedCategory) {
      fetchByCategory();
    } else if (filters.priceRange.min || filters.priceRange.max) {
      fetchByPrice();
    } else {
      fetchCourses();
    }
  }, [
    currentPage,
    searchQuery,
    selectedCategory,
    filters.priceRange,
    selectedDifficulties,
  ]);

  // ... (keep all existing handler functions: handleSort, handlePageChange, etc.)

  const handleResetFilters = () => {
    setFilters({
      category: "",
      priceRange: { min: "", max: "" },
      difficulty: [],
      duration: "",
    });
    setSelectedCategory(null);
    setSelectedDifficulties([]);
    setSortOption("default");
    setCurrentPage(1);
    setError({
      hasError: false,
      message: "",
      statusCode: null,
      isNetworkError: false,
    });
    fetchCourses();
  };

  // Enhanced render functions
  const renderLoadingState = () => (
    <div className="space-y-6">
      <div className="flex justify-center items-center h-64">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#02084b] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#02084b] font-medium">
            {filterLoading ? "Filtering courses..." : "Loading courses..."}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-pulse"
          >
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderErrorState = () => (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200">
      <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-12 h-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-600 mb-6">{error.message}</p>
      {error.isNetworkError ? (
        <button
          onClick={fetchCourses}
          className="bg-[#02084b] text-white py-2 px-6 rounded-lg hover:bg-[#010530] transition"
        >
          Retry Connection
        </button>
      ) : (
        <button
          onClick={handleResetFilters}
          className="bg-[#02084b] text-white py-2 px-6 rounded-lg hover:bg-[#010530] transition"
        >
          Reset Filters
        </button>
      )}
    </div>
  );

  const renderNoCoursesState = () => (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200">
      <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-12 h-12 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {searchQuery
          ? `No courses found for "${searchQuery}"`
          : "No courses match your filters"}
      </h3>
      <p className="text-gray-600 mb-6">
        {searchQuery
          ? "Try different search terms or browse our categories"
          : "Try adjusting your filters or reset to see all courses"}
      </p>
      <button
        onClick={handleResetFilters}
        className="bg-[#02084b] text-white py-2 px-6 rounded-lg hover:bg-[#010530] transition"
      >
        {searchQuery ? "Clear Search" : "Reset Filters"}
      </button>
    </div>
  );

  const renderCourseGrid = () => (
    <>
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
              rating={course.rating || 0}
              totalRatings={course.totalRatings || 0}
              originalPrice={course.originalPrice}
              isEnrolled={course.isEnrolled}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <div className="bg-white px-4 py-3 rounded-xl shadow-lg border border-gray-200 flex items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 mr-2 rounded-lg ${currentPage === 1 ? "text-gray-400" : "text-[#02084b]"}`}
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
                        ? "bg-[#02084b] text-white"
                        : "hover:bg-[#e6e7f0]"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 ml-2 rounded-lg ${currentPage === totalPages ? "text-gray-400" : "text-[#02084b]"}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="bg-gradient-to-b from-[#e8eaf1] to-[#f1f2f7] min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#02084b] to-[#010530] text-white py-20 px-6 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : "Explore Our Courses"}
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            {searchQuery
              ? `Found ${courses?.length || 0} matching courses`
              : "Discover top-notch courses designed by industry experts"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 mt-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4 border border-gray-200">
              <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
                <h2 className="text-xl font-bold text-[#02084b]">Filters</h2>
                <button
                  onClick={handleResetFilters}
                  className="text-sm text-[#02084b] hover:text-[#010530] font-medium"
                >
                  Clear all
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={selectedCategory || ""}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option
                      key={category.courseCategoryId}
                      value={category.courseCategoryId}
                    >
                      {category.courseCategoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={filters.priceRange.min}
                    onChange={(e) =>
                      handleInputChange("priceRange", {
                        ...filters.priceRange,
                        min: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={filters.priceRange.max}
                    onChange={(e) =>
                      handleInputChange("priceRange", {
                        ...filters.priceRange,
                        max: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <div className="space-y-2">
                  {[
                    { value: "beginner", label: "Beginner" },
                    { value: "intermediate", label: "Intermediate" },
                    { value: "advanced", label: "Advanced" },
                  ].map(({ value, label }) => (
                    <label key={value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedDifficulties.includes(value)}
                        onChange={() => handleDifficultyChange(value)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Courses Content */}
          <div className="w-full md:w-3/4">
            {/* Results Header */}
            {!loading && !error.hasError && (
              <div className="mb-6 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-gray-700 mb-3 sm:mb-0">
                    {searchQuery ? (
                      <>
                        <span className="font-bold text-[#02084b]">
                          {courses?.length || 0}
                        </span>{" "}
                        results for "
                        <span className="font-medium text-[#02084b]">
                          {searchQuery}
                        </span>
                        "
                      </>
                    ) : (
                      <>
                        <span className="font-bold text-[#02084b]">
                          {courses?.length || 0}
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
                      className="bg-[#e6e7f0] border border-gray-200 text-[#02084b] text-sm rounded-lg p-2"
                    >
                      <option value="default">Default</option>
                      <option value="price-low-high">Price: Low to High</option>
                      <option value="price-high-low">Price: High to Low</option>
                      <option value="name-a-z">Name: A to Z</option>
                      <option value="name-z-a">Name: Z to A</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content Area */}
            {loading || filterLoading
              ? renderLoadingState()
              : error.hasError
                ? renderErrorState()
                : courses.length === 0
                  ? renderNoCoursesState()
                  : renderCourseGrid()}
          </div>
        </div>
      </div>
    </div>
  );
}
