import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userRecoilState from "../../store/atoms/user";
import { useRecoilState } from "recoil";
import { format } from "date-fns";

export default function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);
  const [userState, setUserState] = useRecoilState(userRecoilState);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  // Theme colors
  const themeColors = {
    primary: '#42ACD0',       // Main theme color
    primaryLight: '#8ACEE0',  // Lighter variant
    primaryDark: '#2E7D9A',   // Darker variant
    primaryBg: '#E6F4F9',     // Background tint
  };

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8085/course/${courseId}`);
        setCourse(response.data);
        setSections(response.data.sections || []);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getCourseDetails();
  }, [courseId]);

  async function enrollCourse() {
    if (!userState) {
      navigate('/login');
    } else {
      try {
        setIsProcessingPayment(true);
        const response = await axios.get(`http://localhost:8085/payment/${course.courseID}`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });
        window.location.href = response.data.payment_url;
      } catch (error) {
        console.error("Error enrolling in course:", error);
        setIsProcessingPayment(false);
      }
    }
  }

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div 
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: themeColors.primary }}
        ></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Course not found</h1>
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-white rounded hover:opacity-90 transition"
            style={{ backgroundColor: themeColors.primary }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Payment Processing Modal */}
      {isProcessingPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4">
            <div className="flex flex-col items-center">
              <div 
                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mb-4"
                style={{ borderColor: themeColors.primary }}
              ></div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Processing Payment</h3>
              <p className="text-gray-600 text-center">Please wait while we redirect you to the payment gateway...</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Course Header */}
        <div 
          className="rounded-xl shadow-lg p-6 mb-8 text-white"
          style={{ background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.primaryDark})` }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{course.courseName}</h1>
              <p className="opacity-90 mt-1">Master {course.courseName} with hands-on projects</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-lg font-semibold">Rs {course.coursePrice}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Description */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">About This Course</h2>
              <p className="text-gray-600 leading-relaxed">{course.courseDescription}</p>
            </div>

            {/* Course Image */}
            {course.imageUrl && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <img 
                  src={`http://localhost:8085/images/course/${course.imageUrl}`} 
                  alt={course.courseName} 
                  className="w-full h-64 object-contain mx-auto"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/800x450?text=Course+Image";
                  }}
                />
              </div>
            )}

            {/* Course Curriculum */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Course Curriculum</h2>
              <div className="space-y-3">
                {sections.length > 0 ? (
                  sections.map((section) => (
                    <div key={section.sectionId} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md">
                      <button
                        onClick={() => toggleSection(section.sectionId)}
                        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                        aria-expanded={expandedSection === section.sectionId}
                      >
                        <div className="text-left">
                          <h3 className="font-medium text-gray-800 flex items-center gap-2">
                            <span 
                              className="w-6 h-6 rounded-full flex items-center justify-center text-sm text-white"
                              style={{ backgroundColor: themeColors.primary }}
                            >
                              {section.sectionId}
                            </span>
                            {section.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-500 transform transition-transform ${
                            expandedSection === section.sectionId ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {expandedSection === section.sectionId && (
                        <div className="border-t divide-y">
                          {section.lectures.map((lecture) => (
                            <div key={lecture.id} className="p-4 hover:bg-gray-50 transition-colors group">
                              <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 mt-1">
                                  <div 
                                    className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:opacity-90 transition-colors"
                                    style={{ backgroundColor: themeColors.primaryBg }}
                                  >
                                    {lecture.videoUrl ? (
                                      <svg 
                                        className="w-5 h-5" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke={themeColors.primary}
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    ) : (
                                      <svg 
                                        className="w-5 h-5" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke={themeColors.primary}
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h4 
                                    className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors"
                                    style={{ color: expandedSection === section.sectionId ? themeColors.primaryDark : 'inherit' }}
                                  >
                                    {lecture.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 mb-2">{lecture.description}</p>
                                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      {formatDate(lecture.uploadedDate)}
                                    </span>
                                    {lecture.comments.length > 0 && (
                                      <span className="flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        {lecture.comments.length} comments
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <svg 
                      className="mx-auto h-12 w-12" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke={themeColors.primary}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No sections available</h3>
                    <p className="mt-1 text-sm text-gray-500">This course doesn't have any sections yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Enroll Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="text-center mb-6">
                <button 
                  onClick={enrollCourse} 
                  className="w-full px-6 py-3 text-white rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.primaryDark})` }}
                >
                  Enroll Now - ₹{course.coursePrice}
                </button>
              </div>

              {/* Course Stats */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke={themeColors.primary}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Course Highlights
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: themeColors.primaryBg }}
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke={themeColors.primary}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{course.totalEnrollments || 0}+ students enrolled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div 
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: themeColors.primaryBg }}
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke={themeColors.primary}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{course.totalSections || 0} comprehensive sections</p>
                    </div>
                  </div>
                  {course.courseDuration && (
                    <div className="flex items-center gap-3">
                      <div 
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: themeColors.primaryBg }}
                      >
                        <svg 
                          className="w-4 h-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke={themeColors.primary}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{course.courseDuration} hours of content</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Instructor Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke={themeColors.primary}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Instructor
              </h2>
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.primaryDark})` }}
                >
                  {course.instructorName ? course.instructorName.charAt(0) : 'I'}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{course.instructorName || "Instructor"}</h3>
                  <p className="text-sm text-gray-600">Expert Educator</p>
                  <div className="flex gap-2 mt-2">
                    <span 
                      className="text-xs px-2 py-1 rounded text-white"
                      style={{ backgroundColor: themeColors.primary }}
                    >
                      5 Courses
                    </span>
                    <span 
                      className="text-xs px-2 py-1 rounded text-white"
                      style={{ backgroundColor: themeColors.primary }}
                    >
                      1000+ Students
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}