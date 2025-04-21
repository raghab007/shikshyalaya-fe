import React, { useState, useEffect } from "react";
import axios from "axios";

const EnrolledStudentsTable = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    course: "",
    date: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "enrollmentDate",
    direction: "desc",
  });

  // Fetch data from API
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8085/instructor/enrollments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEnrollments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to data
  const sortedEnrollments = React.useMemo(() => {
    let sortableItems = [...enrollments];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        // Handle nested properties
        let aValue, bValue;

        if (sortConfig.key.includes(".")) {
          const keys = sortConfig.key.split(".");
          aValue = keys.reduce((obj, key) => obj[key], a);
          bValue = keys.reduce((obj, key) => obj[key], b);
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [enrollments, sortConfig]);

  // Apply filters to data
  const filteredEnrollments = React.useMemo(() => {
    return sortedEnrollments.filter((enrollment) => {
      // Search filter (name or email)
      const matchesSearch =
        filters.search === "" ||
        enrollment.user.firstName
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        enrollment.user.lastName
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        enrollment.user.email
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      // Course filter
      const matchesCourse =
        filters.course === "" ||
        enrollment.course.courseName
          .toLowerCase()
          .includes(filters.course.toLowerCase());

      // Date filter
      const matchesDate =
        filters.date === "" ||
        new Date(enrollment.enrollmentDate).toLocaleDateString() ===
          new Date(filters.date).toLocaleDateString();

      return matchesSearch && matchesCourse && matchesDate;
    });
  }, [sortedEnrollments, filters]);

  // Get unique course names for filter dropdown
  const uniqueCourses = [
    ...new Set(enrollments.map((e) => e.course.courseName)),
  ];

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      search: "",
      course: "",
      date: "",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        <span className="ml-4 text-lg font-medium text-indigo-600">
          Loading students data...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-red-800">
              Error loading student data
            </h3>
            <p className="text-red-600 mt-1">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-md transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Student Enrollments
        </h1>
        <p className="text-indigo-100">
          Track and manage all your course participants in one place
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-indigo-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg
            className="h-5 w-5 mr-2 text-indigo-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clipRule="evenodd"
            />
          </svg>
          Filter Enrollments
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Search Students
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Name or email..."
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Course filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Course
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
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
              <select
                name="course"
                value={filters.course}
                onChange={handleFilterChange}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 appearance-none"
              >
                <option value="">All Courses</option>
                {uniqueCourses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Date filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Enrollment Date
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Reset button */}
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg flex items-center justify-center transition-colors duration-300"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-indigo-100">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-indigo-100 p-3 rounded-full">
              <svg
                className="h-6 w-6 text-indigo-600"
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
              <h3 className="text-sm font-medium text-gray-500">
                Total Students
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {enrollments.length}
              </p>
            </div>
          </div>

          <div className="flex items-center mb-4 md:mb-0">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">
                Filtered Results
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {filteredEnrollments.length}
              </p>
            </div>
          </div>

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
              <h3 className="text-sm font-medium text-gray-500">
                Unique Courses
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {uniqueCourses.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-indigo-50 transition-colors duration-200"
                  onClick={() => requestSort("enrollmentId")}
                >
                  <div className="flex items-center">
                    ID
                    {sortConfig.key === "enrollmentId" && (
                      <span className="ml-1 text-indigo-600">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-indigo-50 transition-colors duration-200"
                  onClick={() => requestSort("user.firstName")}
                >
                  <div className="flex items-center">
                    Student
                    {sortConfig.key === "user.firstName" && (
                      <span className="ml-1 text-indigo-600">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-indigo-50 transition-colors duration-200"
                  onClick={() => requestSort("user.email")}
                >
                  <div className="flex items-center">
                    Email
                    {sortConfig.key === "user.email" && (
                      <span className="ml-1 text-indigo-600">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-indigo-50 transition-colors duration-200"
                  onClick={() => requestSort("course.courseName")}
                >
                  <div className="flex items-center">
                    Course
                    {sortConfig.key === "course.courseName" && (
                      <span className="ml-1 text-indigo-600">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-indigo-50 transition-colors duration-200"
                  onClick={() => requestSort("enrollmentDate")}
                >
                  <div className="flex items-center">
                    Enrollment Date
                    {sortConfig.key === "enrollmentDate" && (
                      <span className="ml-1 text-indigo-600">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEnrollments.length > 0 ? (
                filteredEnrollments.map((enrollment) => (
                  <tr
                    key={enrollment.enrollmentId}
                    className="hover:bg-indigo-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                      #{enrollment.enrollmentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="font-medium text-indigo-700">
                            {enrollment.user.firstName.charAt(0)}
                            {enrollment.user.lastName.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {enrollment.user.firstName}{" "}
                            {enrollment.user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            @{enrollment.user.userName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {enrollment.user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800 mb-1 w-fit">
                          {enrollment.course.courseName}
                        </span>
                        <span className="text-sm text-gray-500">
                          Rs {enrollment.course.coursePrice.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-700">
                        <svg
                          className="h-4 w-4 text-indigo-500 mr-1.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {formatDate(enrollment.enrollmentDate)}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <svg
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h3 className="mt-2 text-lg font-medium text-gray-900">
                        No enrollments found
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Try changing your search criteria or clearing filters
                      </p>
                      <button
                        onClick={resetFilters}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnrolledStudentsTable;
