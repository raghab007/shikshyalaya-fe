import { Outlet } from "react-router-dom";
import EnrolledCourseCard from "../components/course/EnrolledCourseCard";
import FilterEnrolledCourse from "../components/course/FilterEnrolledCourse";
import { useEffect, useState } from "react";
import axios from "axios";

function EnrolledCoursesPage() {
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <div className="bg-blue-900 py-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center">My Courses</h1>
        <EnrollCourseTab />
      </div>
      <Outlet />
    </div>
  );
}

function EnrolledCourses() {
  

  const [courses, setEnrolledCourses] = useState(null);

  useEffect(function(){
    async function fetchCourses() {
          const response = await axios.get("http://localhost:8085/enrollment",{
              headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
              }
            }
          )
          console.log(response.data)
         setEnrolledCourses(response.data)

        }
        fetchCourses()
  },[])

  if(!courses){
    return (
      <h1>Loading courses...</h1>
    )
  }
  return (
    <>
      <FilterEnrolledCourse />
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {courses.map((course) => (
          <EnrolledCourseCard
            key={Math.random()*1}
            courseId={course.courseId}
            courseDescription={course.courseDescription}
            courseInstructor={course.courseInstructor}
            courseImageSrc={course.image}
            courseName={course.courseName}
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
      courseInstructor: "Raghab Pokhrel",
      courseImageSrc:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      courseDescription: "This is an archived course description.",
    },
    {
      courseId: 4,
      courseInstructor: "Raghab Pokhrel",
      courseImageSrc:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      courseDescription: "This is another archived course description.",
    },
  ];

  return (
    <>
      <FilterEnrolledCourse />
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {archivedCourses.map((course) => (
          <EnrolledCourseCard
            key={course.courseId}
            courseId={course.courseId}
            courseDescription={course.courseDescription}
            courseInstructor={course.courseInstructor}
            courseImageSrc={course.courseImageSrc}
          />
        ))}
      </div>
    </>
  );
}

function EnrollCourseTab() {
  const [currentTab, setCurrentTab] = useState(true);

  const changeTab = () => {
    setCurrentTab(!currentTab);
  };

  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
          currentTab
            ? "bg-green-500 text-white"
            : "bg-transparent text-white hover:bg-green-500/20"
        }`}
        onClick={changeTab}
      >
        <a href="/enrolled" className="no-underline">
          My Courses
        </a>
      </button>
      <button
        className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
          !currentTab
            ? "bg-green-500 text-white"
            : "bg-transparent text-white hover:bg-green-500/20"
        }`}
        onClick={changeTab}
      >
        <a href="/enrolled/archived" className="no-underline">
          Archived Courses
        </a>
      </button>
    </div>
  );
}

export { EnrolledCoursesPage, ArchivedCourses, EnrolledCourses };