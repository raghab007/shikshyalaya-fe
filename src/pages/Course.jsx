import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import BasicCard from "../components/course/CourseCard";
import FilterSection from "../components/FilteringComponent";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(false);
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

  // Add new state for selected difficulty
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
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
        const response = await axios.get('http://localhost:8085/course/course_category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    getCategories();
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const endpoint = searchQuery ? "/courses/search" : "/courses";
        const params = { page: currentPage, limit: itemsPerPage };
        if (searchQuery) params.query = searchQuery;

        console.log('Fetching courses from:', endpoint);
        const response = await axios.get(`http://localhost:8085${endpoint}`, {
          params,
        });
        console.log('API Response:', response.data);
        setCourses(response.data || []);
        setTotalPages(Math.ceil((response.data?.length || 0) / itemsPerPage));
      } catch (error) {
        setError(true);
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [currentPage, searchQuery]);

  // Fetch courses by category
  useEffect(() => {
    const getCoursesByCategory = async () => {
      if (selectedCategory) {
        try {
          setFilterLoading(true);
          console.log('Fetching courses for category:', selectedCategory);
          const response = await axios.get(`http://localhost:8085/courses/category/${selectedCategory}`, {
            params: { 
              page: currentPage, 
              limit: itemsPerPage
            }
          });
          console.log('Category API Response:', response.data);
          const { courses: fetchedCourses, totalPages: fetchedTotalPages } = response.data;
          setCourses(fetchedCourses || []);
          setTotalPages(fetchedTotalPages || 1);
        } catch (error) {
          setError(true);
          console.error('Error fetching courses by category:', error);
          setCourses([]);
        } finally {
          setFilterLoading(false);
        }
      }
    };
    getCoursesByCategory();
  }, [selectedCategory, currentPage]);

  // Fetch courses by price range
  useEffect(() => {
    const getCoursesByPriceRange = async () => {
      if (filters.priceRange.min || filters.priceRange.max) {
        try {
          setFilterLoading(true);
          const response = await axios.get(`http://localhost:8085/courses/price`, {
            params: { 
              min: filters.priceRange.min, 
              max: filters.priceRange.max,
              page: currentPage, 
              limit: itemsPerPage 
            }
          });
          const { courses: fetchedCourses, totalPages: fetchedTotalPages } = response.data;
          setCourses(fetchedCourses);
          setTotalPages(fetchedTotalPages);
        } catch (error) {
          setError(true);
          console.error('Error fetching courses by price range:', error);
        } finally {
          setFilterLoading(false);
        }
      }
    };
    getCoursesByPriceRange();
  }, [filters.priceRange, currentPage]);

  // Update useEffect for difficulty filtering
  useEffect(() => {
    const getCoursesByDifficulty = async () => {
      if (selectedDifficulties.length > 0) {
        try {
          setFilterLoading(true);
          // Make separate API calls for each selected difficulty
          const responses = await Promise.all(
            selectedDifficulties.map(difficulty =>
              axios.get(`http://localhost:8085/courses/difficulty/${difficulty}`, {
                params: { page: currentPage, limit: itemsPerPage }
              })
            )
          );

          // Combine results from all responses
          const allCourses = responses.flatMap(response => response.data.courses);
          // Remove duplicates based on courseID
          const uniqueCourses = Array.from(new Map(allCourses.map(course => [course.courseID, course])).values());
          
          // Calculate total pages based on combined results
          const totalPages = Math.ceil(uniqueCourses.length / itemsPerPage);
          
          setCourses(uniqueCourses);
          setTotalPages(totalPages);
        } catch (error) {
          setError(true);
          console.error('Error fetching courses by difficulty:', error);
        } finally {
          setFilterLoading(false);
        }
      }
    };
    getCoursesByDifficulty();
  }, [selectedDifficulties, currentPage]);

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

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((c) => c.category === filters.category);
    }

    // Filter by price range
    if (filters.priceRange.min || filters.priceRange.max) {
      filtered = filtered.filter((c) => {
        const price = parseFloat(c.coursePrice);
        const minPrice = filters.priceRange.min ? parseFloat(filters.priceRange.min) : 0;
        const maxPrice = filters.priceRange.max ? parseFloat(filters.priceRange.max) : Infinity;
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Filter by difficulty
    if (filters.difficulty.length > 0) {
      filtered = filtered.filter((c) =>
        filters.difficulty.includes(c.difficulty.toLowerCase())
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

  const handleResetFilters = () => {
    // Reset all filter states
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

    // Refetch original courses
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const endpoint = searchQuery ? "/courses/search" : "/courses";
        const params = { page: 1, limit: itemsPerPage };
        if (searchQuery) params.query = searchQuery;

        const response = await axios.get(`http://localhost:8085${endpoint}`, {
          params,
        });
        const { courses: fetchedCourses, totalPages: fetchedTotalPages } = response.data;
        setCourses(fetchedCourses || []);
        setTotalPages(fetchedTotalPages || 1);
      } catch (error) {
        setError(true);
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  };

  const handleCategoryChange = (categoryId) => {
    console.log('Category changed to:', categoryId);
    if (categoryId === selectedCategory || categoryId === "") {
      // If the same category is clicked again or "All Categories" is selected
      setSelectedCategory(null);
      setFilters(prev => ({ ...prev, category: "" }));
      // Fetch all courses
      const fetchCourses = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:8085/courses`, {
            params: { page: currentPage, limit: itemsPerPage }
          });
          console.log('All courses API Response:', response.data);
          setCourses(response.data || []);
          setTotalPages(Math.ceil((response.data?.length || 0) / itemsPerPage));
        } catch (error) {
          setError(true);
          console.error("Error fetching all courses:", error);
          setCourses([]);
        } finally {
          setLoading(false);
        }
      };
      fetchCourses();
    } else {
      setSelectedCategory(categoryId);
      setFilters(prev => ({ ...prev, category: categoryId }));
    }
    setCurrentPage(1);
  };

  const handleInputChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    handleFilterChange(updatedFilters);
  };

  // Update handleDifficultyChange function
  const handleDifficultyChange = (level) => {
    setSelectedDifficulties(prev => {
      if (prev.includes(level)) {
        // Remove the difficulty if it's already selected
        return prev.filter(d => d !== level);
      } else {
        // Add the difficulty if it's not selected
        return [...prev, level];
      }
    });
    
    // Update the filters state
    const updatedDifficulty = filters.difficulty.includes(level)
      ? filters.difficulty.filter((d) => d !== level)
      : [...filters.difficulty, level];
    
    handleInputChange("difficulty", updatedDifficulty);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

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
          {/* Filters */}
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
                    <option key={category.courseCategoryId} value={category.courseCategoryId}>
                      {category.courseCategoryName}
                    </option>
                  ))}
                </select>
              </div>
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <div className="space-y-2">
                  {[
                    { value: "beginner", label: "Beginner" },
                    { value: "intermediate", label: "Intermediate" },
                    { value: "advanced", label: "Advanced" }
                  ].map(({ value, label }) => (
                    <label key={value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedDifficulties.includes(value)}
                        onChange={() => handleDifficultyChange(value)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="w-full md:w-3/4">
            {/* Results Header */}
            {!loading && !error && (
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

            {/* Loading/Error States */}
            {loading || filterLoading ? (
              <div className="space-y-6">
                <div className="flex justify-center items-center h-64">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-[#02084b] border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#02084b] font-medium">
                      {filterLoading ? "Filtering courses..." : "Loading courses..."}
                    </div>
                  </div>
                </div>
                {/* Loading skeleton cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-pulse">
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
            ) : !courses || courses.length === 0 ? (
              <div className="bg-[#e6e7f0] border border-gray-200 text-[#02084b] p-8 rounded-xl text-center">
                <p className="text-xl font-bold">
                  {searchQuery
                    ? "No courses match your search"
                    : "No courses match your filters"}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 bg-[#02084b] text-white py-2 px-6 rounded-lg"
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
                        rating={course.rating || 0}
                        totalRatings={course.totalRatings || 0}
                        originalPrice={course.originalPrice}
                        isEnrolled={course.isEnrolled}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
