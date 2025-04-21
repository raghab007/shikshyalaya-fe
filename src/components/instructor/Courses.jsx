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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Courses</h1>
          <p className="text-blue-100">
            Manage and track all your teaching courses in one place
          </p>
        </div>

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
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Courses
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses ? courses.length : 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Average Price
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses && courses.length > 0
                    ? `Rs ${Math.round(courses.reduce((acc, course) => acc + course.coursePrice, 0) / courses.length)}`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses
                    ? courses.reduce(
                        (acc, course) => acc + (course.totalEnrollments || 0),
                        0
                      )
                    : 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Search Results
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {processedCourses.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course table */}
        {currentCourses.length > 0 ? (
          <>
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-blue-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Course
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Duration
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Students
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentCourses.map((course) => (
                      <tr
                        key={course.courseID}
                        className="hover:bg-blue-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                              {course.imageUrl ? (
                                <img
                                  src={`http://localhost:8085/files/course/images/${course.imageUrl}`}
                                  alt={course.courseName}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                                  <svg
                                    className="w-8 h-8"
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
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {course.courseName}
                              </div>
                              <div className="text-sm text-gray-500">
                                #{course.courseID}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1 text-blue-500"
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
                            <span className="text-sm text-gray-700">
                              {course.courseDuration || "Not specified"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1 text-purple-500"
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
                            <span className="text-sm text-gray-700">
                              {course.totalEnrollments
                                ? course.totalEnrollments
                                : 0}{" "}
                              students
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Chip
                            label={`Rs ${course.coursePrice}`}
                            className="bg-green-100 text-green-800"
                            size="small"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Link
                            to={`/instructor/coursedetails/${course.courseID}`}
                            className="inline-block px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-300"
                          >
                            Manage
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
