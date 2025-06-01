import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BasicCard from "../components/course/CourseCard";
import FilterSection from "../components/FilteringComponent";
import { CircularProgress, Box, Pagination, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function CoursesByCategory() {
  const { categoryId } = useParams();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortOption, setSortOption] = useState("default");
  const [categoryName, setCategoryName] = useState("");
  const [filters, setFilters] = useState({
    priceRange: { min: "", max: "" },
    difficulty: [],
    duration: "",
  });

  // Fetch category name
  useEffect(() => {
    const getCategoryName = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/course/course_category/${categoryId}`);
        console.log(response.data);
        setCategoryName(response.data.courseCategoryName);
      } catch (error) {
        console.error('Error fetching category name:', error);
      }
    };
    getCategoryName();
  }, [categoryId]);

  // Fetch courses by category
  useEffect(() => {
    const getCoursesByCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8085/courses/category/${categoryId}`, {
          params: { 
            page: currentPage, 
            limit: itemsPerPage
          }
        });
        const { courses: fetchedCourses, totalPages: fetchedTotalPages } = response.data;
        setCourses(fetchedCourses);
        setTotalPages(fetchedTotalPages);
        setError(false);
      } catch (error) {
        console.error('Error fetching courses by category:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getCoursesByCategory();
  }, [categoryId, currentPage, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setFilterLoading(true);
    
    // Apply filters to the current courses
    let filtered = [...courses];

    // Filter by price range
    if (newFilters.priceRange.min || newFilters.priceRange.max) {
      filtered = filtered.filter((c) => {
        const price = parseFloat(c.coursePrice);
        const minPrice = newFilters.priceRange.min ? parseFloat(newFilters.priceRange.min) : 0;
        const maxPrice = newFilters.priceRange.max ? parseFloat(newFilters.priceRange.max) : Infinity;
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Filter by difficulty
    if (newFilters.difficulty.length > 0) {
      filtered = filtered.filter((c) =>
        newFilters.difficulty.includes(c.courseDifficulty.toLowerCase())
      );
    }

    // Apply current sort option
    if (sortOption !== "default") {
      filtered.sort((a, b) => {
        switch (sortOption) {
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
    }

    setCourses(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
    setFilterLoading(false);
  };

  const handleResetFilters = () => {
    setFilters({
      priceRange: { min: "", max: "" },
      difficulty: [],
      duration: "",
    });
    setSortOption("default");
    setCurrentPage(1);
    
    // Refetch original courses
    const getCoursesByCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8085/courses/category/${categoryId}`, {
          params: { 
            page: 1, 
            limit: itemsPerPage
          }
        });
        const { courses: fetchedCourses, totalPages: fetchedTotalPages } = response.data;
        setCourses(fetchedCourses);
        setTotalPages(fetchedTotalPages);
      } catch (error) {
        console.error('Error fetching courses by category:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getCoursesByCategory();
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#02084b]/10 to-[#02084b]/20">
        <CircularProgress sx={{ color: "#02084b" }} size={60} thickness={4} />
        <p className="mt-4 text-gray-600">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#02084b]/10 to-[#02084b]/20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg">
          <h2 className="text-2xl font-bold text-red-700 mb-2">Oops!</h2>
          <p className="text-red-600">Failed to load courses. Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#02084b] text-white rounded-lg hover:bg-[#02084b]/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#02084b]/10 to-[#02084b]/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#02084b] to-[#02084b]/80 rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {categoryName} Courses
          </h1>
          <p className="text-[#02084b]/50 text-white/80">
            Explore our collection of {categoryName.toLowerCase()} courses
          </p>
        </div>

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
              <FilterSection
                filters={filters}
                onFilterChange={handleFilterChange}
                hideCategoryFilter={true}
              />
            </div>
          </div>

          {/* Course Grid */}
          <div className="w-full md:w-3/4">
            {/* Sort Options */}
            <div className="mb-6 flex justify-end">
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="sort-select-label">Sort By</InputLabel>
                <Select
                  labelId="sort-select-label"
                  value={sortOption}
                  label="Sort By"
                  onChange={(e) => handleSort(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#02084b',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#02084b',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#02084b',
                    },
                  }}
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="price-low-high">Price: Low to High</MenuItem>
                  <MenuItem value="price-high-low">Price: High to Low</MenuItem>
                  <MenuItem value="name-a-z">Name: A to Z</MenuItem>
                  <MenuItem value="name-z-a">Name: Z to A</MenuItem>
                </Select>
              </FormControl>
            </div>

            {filterLoading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <CircularProgress sx={{ color: "#02084b" }} />
              </div>
            ) : courses.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <BasicCard
                      key={course.courseID}
                      courseId={course.courseID}
                      price={course.coursePrice}
                      description={course.courseDescription}
                      title={course.courseName}
                      imageSrc={course.imageUrl}
                      difficulty={course.courseDifficulty}
                      duration={course.duration}
                      category={course.category}
                      instructorName={course.instructorName || "Unknown"}
                      studentsEnrolled={course.totalEnrollments || 0}
                      level={course.courseDifficulty}
                      rating={course.rating || 0}
                      totalRatings={course.totalRatings || 0}
                      originalPrice={course.originalPrice}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box display="flex" justifyContent="center" mt={6}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: "#02084b",
                        },
                        "& .Mui-selected": {
                          backgroundColor: "#02084b !important",
                          color: "white !important",
                        },
                      }}
                      size="large"
                      showFirstButton
                      showLastButton
                    />
                  </Box>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                <div className="inline-block p-6 rounded-full bg-[#02084b]/10 mb-4">
                  <svg
                    className="w-12 h-12 text-[#02084b]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  No courses found in this category
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find any courses in this category. Please check back later or explore other categories.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 