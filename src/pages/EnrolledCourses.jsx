import { Link, Outlet, useLocation } from "react-router-dom";
import EnrolledCourseCard from "../components/course/EnrolledCourseCard";
import FilterEnrolledCourse from "../components/course/FilterEnrolledCourse";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userProfileSelector } from "../store/atoms/profle";

function EnrolledCoursesPage() {
  const [state, setState] = useRecoilState(userProfileSelector);
  useEffect(function () {
    if (!state) {
      console.log("state");
      window.location.href = "/login";
    }
  });

  if (!state) {
    return null;
  }
  return (
    <div className="font-sans bg-[#f5f9fc] min-h-screen pt-16">
      {" "}
      {/* Added pt-16 to account for navbar */}
      <div className="bg-[rgb(45,158,235)] py-10 px-6 shadow-md">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                My Courses
              </h1>
              <p className="text-blue-100 mt-1">
                Continue your learning journey
              </p>
            </div>
            <EnrollCourseTab />
          </div>
        </div>
      </div>
      <main className="max-w-6xl mx-auto px-4 py-8">
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
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setEnrolledCourses(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please refresh the page.");
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#2D9EEB]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl inline-block">
          <p className="font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-sm bg-red-100 hover:bg-red-200 text-red-700 py-2 px-4 rounded-lg font-medium"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-14">
        <div className="bg-white p-8 rounded-xl border border-blue-100 inline-flex flex-col items-center">
          <div className="bg-blue-50 p-4 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-[#2D9EEB]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No enrolled courses
          </h3>
          <p className="text-gray-600 mb-6">
            You haven't enrolled in any courses yet.
          </p>
          <Link
            to="/courses"
            className="bg-[#2D9EEB] hover:bg-[#2488D1] text-white py-2.5 px-6 rounded-lg font-medium"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <FilterEnrolledCourse />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {courses.map((course) => (
          <EnrolledCourseCard
            key={course.courseId}
            courseId={course.courseId}
            courseDescription={course.description}
            courseInstructor={course.courseInstructor}
            courseImageSrc={course.image}
            courseName={course.name}
            progress={course.totalFinished}
            totalLessons={course.totalLectures}
            completedLessons={course.totalFinished}
          />
        ))}
      </div>
    </>
  );
}

function EnrollCourseTab() {
  return (
    <div className="inline-flex bg-white/20 rounded-lg p-1">
      <Link
        to="/enrolled"
        className="flex items-center py-2 px-6 rounded-md text-sm bg-white text-[#2D9EEB] font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
          <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
        My Courses
      </Link>
    </div>
  );
}

export { EnrolledCoursesPage, EnrolledCourses };
