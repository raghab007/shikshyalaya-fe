import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CourseDetails() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/course/${courseId}`);
        setCourse(response.data);
        setSections(response.data.sections || []); // Assuming sections are part of response
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    getCourseDetails();
  }, [courseId]);

  if (!course) {
    return <h1 className="text-center mt-10 text-2xl font-bold">Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Course Header */}
        <div className="bg-indigo-700 rounded-lg shadow-lg p-6 mb-8 text-white">
          <h1 className="text-2xl font-bold">{course.courseName}</h1>
          <p className="opacity-90">Course ID: {courseId}</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Course Overview</h2>
              <p className="text-gray-600 leading-relaxed">{course.courseDescription}</p>
            </div>

            {/* Course Sections */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Course Sections</h2>
              <div className="space-y-4">
                {sections.length > 0 ? (
                  sections.map((section, index) => (
                    <div key={index} className="border-l-4 border-indigo-200 bg-gray-50 p-4 rounded">
                      <h3 className="font-medium text-gray-800">{section.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {section.lessons.length} Lessons • {section.duration} Hours
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No sections available for this course.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Instructor Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Instructor</h2>
              <div className="flex items-center gap-4">
                <img 
                  src={course.instructorImage || "https://source.unsplash.com/100x100/?portrait"} 
                  alt="Instructor" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-800">{course.instructorName || "Unknown Instructor"}</h3>
                  <p className="text-sm text-gray-600">{course.instructorTitle || "Expert Educator"}</p>
                </div>
              </div>
            </div>

            {/* Course Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Course Stats</h2>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Total Sections</dt>
                  <dd className="text-gray-800 font-medium">{sections.length}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Total Duration</dt>
                  <dd className="text-gray-800 font-medium">{course.totalDuration || "N/A"} hours</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Enrolled Students</dt>
                  <dd className="text-gray-800 font-medium">{course.enrolledStudents || 0}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Last Updated</dt>
                  <dd className="text-gray-800 font-medium">{course.lastUpdated || "N/A"}</dd>
                </div>
              </dl>
            </div>

            {/* Enroll Button */}
            <div className="text-center">
              <button className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
