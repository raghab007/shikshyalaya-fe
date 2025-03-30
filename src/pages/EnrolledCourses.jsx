import { Link, Outlet, useLocation } from "react-router-dom";
import EnrolledCourseCard from "../components/course/EnrolledCourseCard";
import FilterEnrolledCourse from "../components/course/FilterEnrolledCourse";
import { useEffect, useState } from "react";
import axios from "axios";

function EnrolledCoursesPage() {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <header className="bg-gradient-to-r from-blue-800 to-indigo-900 py-8 px-6 shadow-md">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-white">My Learning Journey</h1>
              <p className="text-blue-200 mt-1">Track your progress and continue learning</p>
            </div>
            <EnrollCourseTab />
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
}

function EnrolledCourses() {
  const [courses, setEnrolledCourses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8085/enrollment", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });
        setEnrolledCourses(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load your courses. Please try again later.");
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
          <p className="font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 py-1 px-3 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-blue-50 p-6 rounded-xl inline-flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses yet</h3>
          <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
          <Link to="/explore" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors font-medium">
            Explore Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <FilterEnrolledCourse />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {courses.map((course) => (
          <EnrolledCourseCard
            key={course.courseId}
            courseId={course.courseId}
            courseDescription={course.courseDescription}
            courseInstructor={course.courseInstructor}
            courseImageSrc={course.image}
            courseName={course.courseName}
            progress={Math.floor(Math.random() * 100)} // Replace with actual progress
            totalLessons={Math.floor(Math.random() * 20) + 5} // Replace with actual total
            completedLessons={Math.floor(Math.random() * 10)} // Replace with actual completed
          />
        ))}
      </div>
    </>
  );
}

function ArchivedCourses() {
  const archivedCourses = [
    {
      courseId: 3,
      courseName: "Introduction to Web Development",
      courseInstructor: "Raghab Pokhrel",
      courseImageSrc: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      courseDescription: "Learn the fundamentals of web development with HTML, CSS and JavaScript.",
      progress: 100,
      totalLessons: 12,
      completedLessons: 12
    },
    {
      courseId: 4,
      courseName: "Advanced React Patterns",
      courseInstructor: "Raghab Pokhrel",
      courseImageSrc: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      courseDescription: "Master advanced React patterns and build scalable applications.",
      progress: 100,
      totalLessons: 8,
      completedLessons: 8
    },
  ];

  if (archivedCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 p-6 rounded-xl inline-flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No archived courses</h3>
          <p className="text-gray-600">You haven't archived any courses yet.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <FilterEnrolledCourse />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {archivedCourses.map((course) => (
          <EnrolledCourseCard
            key={course.courseId}
            courseId={course.courseId}
            courseName={course.courseName}
            courseDescription={course.courseDescription}
            courseInstructor={course.courseInstructor}
            courseImageSrc={course.courseImageSrc}
            progress={course.progress}
            totalLessons={course.totalLessons}
            completedLessons={course.completedLessons}
          />
        ))}
      </div>
    </>
  );
}

function EnrollCourseTab() {
  const location = useLocation();
  const isArchived = location.pathname === "/enrolled/archived";
  const [currentTab, setCurrentTab] = useState(!isArchived);

  return (
    <div className="inline-flex bg-blue-700/30 backdrop-blur-sm rounded-lg p-1 shadow">
      <Link 
        to="/enrolled"  
        className={`flex items-center py-2 px-4 rounded-md text-sm transition-all duration-200 ${
          currentTab 
            ? "bg-white text-blue-800 font-medium shadow" 
            : "text-blue-100 hover:bg-blue-700/30"
        }`}
        onClick={() => setCurrentTab(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
          <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
        Active
      </Link>
      
      <Link 
        to="/enrolled/archived" 
        className={`flex items-center py-2 px-4 rounded-md text-sm transition-all duration-200 ${
          !currentTab 
            ? "bg-white text-blue-800 font-medium shadow" 
            : "text-blue-100 hover:bg-blue-700/30"
        }`}
        onClick={() => setCurrentTab(false)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
          <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
        Archived
      </Link>
    </div>
  );
}

export { EnrolledCoursesPage, ArchivedCourses, EnrolledCourses };