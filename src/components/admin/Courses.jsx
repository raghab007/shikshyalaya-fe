import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye, FaStar, FaSearch, FaPlus, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewTotalPages, setReviewTotalPages] = useState(1);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [currentPage, searchQuery]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8085/admin/courses', {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchQuery
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setCourses(response.data.courses);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Failed to fetch courses. Please try again later.');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8085/admin/courses/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        fetchCourses();
      } catch (err) {
        setError('Failed to delete course. Please try again later.');
        console.error('Error deleting course:', err);
      }
    }
  };

  const fetchCourseReviews = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8085/admin/courses/${courseId}/reviews`, {
        params: {
          page: reviewPage,
          limit: 5
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setReviews(response.data.reviews);
      setReviewTotalPages(response.data.totalPages);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleViewReviews = async (course) => {
    setSelectedCourse(course);
    setShowReviews(true);
    await fetchCourseReviews(course.courseID);
  };

  const handleDeleteReview = async (courseId, reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8085/admin/courses/${courseId}/reviews/${reviewId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        fetchCourseReviews(courseId);
      } catch (err) {
        console.error('Error deleting review:', err);
      }
    }
  };

  const handleReviewPageChange = (page) => {
    setReviewPage(page);
    if (selectedCourse) {
      fetchCourseReviews(selectedCourse.courseID);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="text-gray-600 mt-4 font-medium">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
        <div className="bg-white border border-red-200 text-red-700 p-6 rounded-lg shadow-sm max-w-md w-full">
          <div className="flex items-center">
            <FaTimes className="h-6 w-6 text-red-500 mr-3" />
            <div>
              <h3 className="font-semibold text-lg">Error</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">Courses</h1>
                <p className="text-gray-500 text-sm mt-1">Manage your courses with ease</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all text-sm"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all">
                  <FaPlus className="h-4 w-4 mr-2" />
                  Add Course
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.courseID} className="hover:bg-gray-50 transition-all">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={'http://localhost:8085/files/course/images/'+course.imageUrl}
                          alt={course.courseName}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/40x40/e2e8f0/64748b?text=Course';
                          }}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{course.courseName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{course.coursePrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.totalEnrollments || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`h-4 w-4 ${
                              i < (course.rating || 0) ? 'text-yellow-400' : 'text-gray-200'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {course.rating ? course.rating.toFixed(1) : '0.0'} ({course.totalRatings || 0})
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        course.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {course.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewReviews(course)}
                        className="text-gray-600 hover:text-gray-900 mr-4"
                        title="View Reviews"
                      >
                        <FaStar className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => window.location.href = `/admin/courses/${course.courseID}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        title="View Course"
                      >
                        <FaEye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.courseID)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Course"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {courses.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <FaSearch className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-500 text-sm mb-4">Try adjusting your search criteria</p>
              <button className="flex items-center justify-center mx-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all">
                <FaPlus className="h-4 w-4 mr-2" />
                Add New Course
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FaChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FaChevronRight className="h-4 w-4" />
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Reviews Modal */}
      {showReviews && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Reviews for {selectedCourse.courseName}</h2>
                <p className="text-sm text-gray-500">{reviews.length} reviews</p>
              </div>
              <button
                onClick={() => setShowReviews(false)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium">
                            {review.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{review.userName}</h4>
                            <p className="text-xs text-gray-500">{review.userEmail}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteReview(selectedCourse.courseID, review.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaStar className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                  <h3 className="text-sm font-medium text-gray-900">No reviews yet</h3>
                  <p className="text-xs text-gray-500">This course hasn't received any reviews.</p>
                </div>
              )}

              {/* Review Pagination */}
              {reviewTotalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => handleReviewPageChange(reviewPage - 1)}
                      disabled={reviewPage === 1}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        reviewPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <FaChevronLeft className="h-4 w-4" />
                    </button>
                    {Array.from({ length: reviewTotalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handleReviewPageChange(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          reviewPage === page ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handleReviewPageChange(reviewPage + 1)}
                      disabled={reviewPage === reviewTotalPages}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        reviewPage === reviewTotalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <FaChevronRight className="h-4 w-4" />
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;