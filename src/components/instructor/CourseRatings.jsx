import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaTrash } from "react-icons/fa";
import { format } from "date-fns";

export default function CourseRatings() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8085/instructor/course",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setCourses(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const fetchReviews = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:8085/api/rating-reviews/course/${courseId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    }
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    fetchReviews(course.courseID);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      return format(date, "MMM dd, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md border border-red-100">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Course Ratings & Reviews</h1>
          <p className="text-gray-500 text-lg">Monitor and manage feedback for your courses</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Courses</h2>
              <div className="space-y-3">
                {courses.map((course) => (
                  <button
                    key={course.courseID}
                    onClick={() => handleCourseSelect(course)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                      selectedCourse?.courseID === course.courseID
                        ? "bg-indigo-600 text-white shadow-lg transform scale-[1.01]"
                        : "bg-gray-50 hover:bg-gray-100 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 h-14 w-14 rounded-lg overflow-hidden shadow-sm">
                        {course.imageUrl ? (
                          <img
                            src={`http://localhost:8085/files/course/images/${course.imageUrl}`}
                            alt={course.courseName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-base truncate">{course.courseName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`h-4 w-4 ${
                                  i < (course.rating || 0)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`text-sm ${selectedCourse?.courseID === course.courseID ? "text-white/80" : "text-gray-500"}`}>
                            {course.rating ? course.rating.toFixed(1) : "0.0"} ({course.totalRatings || 0})
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="lg:col-span-2">
            {selectedCourse ? (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {selectedCourse.courseName}
                    </h2>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-full">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`h-5 w-5 ${
                                i < (selectedCourse.rating || 0)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-gray-700 font-medium">
                          {selectedCourse.rating ? selectedCourse.rating.toFixed(1) : "0.0"}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {selectedCourse.totalRatings || 0} total reviews
                      </span>
                    </div>
                  </div>
                </div>

                {reviews.length > 0 ? (
                  <div className="space-y-5">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {review.userName}
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {formatDate(review.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{review.review}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="inline-block p-6 rounded-full bg-gray-100 mb-4">
                      <FaStar className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                    <p className="text-gray-500 text-sm">This course hasn't received any reviews yet.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <div className="inline-block p-6 rounded-full bg-gray-100 mb-4">
                  <FaStar className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Course</h3>
                <p className="text-gray-500 text-sm">Choose a course from the list to view its ratings and reviews.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}