import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextField,
  CircularProgress,
  Tooltip,
  Chip,
  Pagination,
  Box,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  SortByAlpha as SortIcon,
} from "@mui/icons-material";

function Courses() {
  const [courses, setCourses] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  useEffect(() => {
    const getCourses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8085/instructor/course",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log(response.data);
        setCourses(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getCourses();
  }, []);

  // Sort and filter courses
  const processedCourses = courses
    ? courses
        .filter((course) =>
          course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          if (sortOrder === "asc") {
            return a.courseName.localeCompare(b.courseName);
          } else {
            return b.courseName.localeCompare(a.courseName);
          }
        })
    : [];

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = processedCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const pageCount = Math.ceil(processedCourses.length / coursesPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <CircularProgress color="primary" size={60} thickness={4} />
        <p className="mt-4 text-gray-600">Loading your courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg">
          <h2 className="text-2xl font-bold text-red-700 mb-2">Oops!</h2>
          <p className="text-red-600">{error}</p>
          <Button
            variant="contained"
            color="primary"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Action bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white rounded-xl p-4 shadow-sm">
          <Tooltip title="Create a new course" arrow>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/instructor/add-course"
              startIcon={<AddIcon />}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              New Course
            </Button>
          </Tooltip>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <SearchIcon color="action" className="mr-2" />
                  ),
                  className: "bg-white rounded-lg pr-2",
                }}
              />
            </div>
            <Tooltip
              title={`Sort ${sortOrder === "asc" ? "Z-A" : "A-Z"}`}
              arrow
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={toggleSortOrder}
                className="min-w-[50px]"
              >
                <SortIcon
                  className={sortOrder === "desc" ? "rotate-180" : ""}
                />
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* Dashboard stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Total Courses</p>
            <p className="text-2xl font-bold">{courses ? courses.length : 0}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Average Price</p>
            <p className="text-2xl font-bold">
              {courses
                ? `Rs ${Math.round(courses.reduce((acc, course) => acc + course.coursePrice, 0) / courses.length)}`
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Course grid */}
        {currentCourses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentCourses.map((course) => (
                <div
                  key={course.courseID}
                  className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    {course.imageUrl ? (
                      <img
                        src={`http://localhost:8085/files/course/images/${course.imageUrl}`}
                        alt={course.courseName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        <svg
                          className="w-12 h-12"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                    )}
                    <Chip
                      label={`Rs ${course.coursePrice}`}
                      className="absolute top-3 right-3 bg-white shadow-md"
                      size="small"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 h-14">
                      {course.courseName}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        {course.courseDuration || "Not specified"}
                      </span>
                      <span className="flex items-center ml-4">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          ></path>
                        </svg>
                        {course.totalEnrollments ? course.totalEnrollments : 0}{" "}
                        students
                      </span>
                    </div>
                    <Link
                      to={`/instructor/coursedetails/${course.courseID}`}
                      className="w-full inline-block text-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-sm hover:shadow-md"
                    >
                      Manage Course
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pageCount > 1 && (
              <Box display="flex" justifyContent="center" mt={6}>
                <Pagination
                  count={pageCount}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <div className="inline-block p-6 rounded-full bg-gray-100 mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
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
              {searchTerm
                ? "No courses match your search."
                : "No courses available yet"}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm
                ? "Try a different search term or clear the search field to see all courses."
                : "Start creating your first course to build your teaching portfolio."}
            </p>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/instructor/add-course"
              startIcon={<AddIcon />}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Create Your First Course
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Courses;
