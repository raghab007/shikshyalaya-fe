import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaUsers, FaClock, FaRupeeSign, FaArrowLeft } from 'react-icons/fa';

function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8085/admin/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setCourse(response.data);
    } catch (err) {
      setError('Failed to fetch course details. Please try again later.');
      console.error('Error fetching course details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#02084b]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Course not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/courses')}
        className="flex items-center text-[#02084b] hover:text-[#02084b]/80 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        Back to Courses
      </button>

      {/* Course Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="relative h-64">
          <img
            src={`http://localhost:8085/files/course/images/${course.imageUrl}`}
            alt={course.courseName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">{course.courseName}</h1>
            <div className="flex items-center space-x-4 text-white/90">
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span>{course.rating ? course.rating.toFixed(1) : '0.0'}</span>
                <span className="ml-1">({course.totalRatings || 0} reviews)</span>
              </div>
              <div className="flex items-center">
                <FaUsers className="mr-1" />
                <span>{course.totalEnrollments || 0} students</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Information</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2 text-[#02084b]" />
                  <span>Duration: {course.courseDuration} hours</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaRupeeSign className="mr-2 text-[#02084b]" />
                  <span>Price: Rs {course.coursePrice}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-2 text-[#02084b]">Category:</span>
                  <span>{course.category}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-2 text-[#02084b]">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    course.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {course.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-600 whitespace-pre-line">{course.courseDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Revenue</h3>
          <p className="text-2xl font-bold text-[#02084b]">
            Rs {(course.coursePrice * (course.totalEnrollments || 0)).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Average Rating</h3>
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`h-5 w-5 ${
                    i < (course.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-[#02084b]">
              {course.rating ? course.rating.toFixed(1) : '0.0'}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Students</h3>
          <p className="text-2xl font-bold text-[#02084b]">{course.totalEnrollments || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails; 