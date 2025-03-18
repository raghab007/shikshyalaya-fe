import { Link, Outlet, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const isArchived = location.pathname === "/enrolled/archived";
  const [currentTab, setCurrentTab] = useState(!isArchived);

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto my-6">
      <h2 className="text-xl font-bold text-white mb-4">Your Learning Path</h2>
      
      <div className="bg-gray-800 bg-opacity-40 backdrop-blur-sm p-1.5 rounded-xl w-full flex shadow-lg">
        <Link 
          to="/enrolled"  
          className={`flex-1 flex justify-center items-center py-3 px-4 rounded-lg font-medium transition-all duration-300 text-center ${
            currentTab 
              ? "bg-green-600 text-white shadow-md" 
              : "text-gray-300 hover:text-white hover:bg-white/10"
          }`}
          onClick={() => setCurrentTab(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
          Active Courses
        </Link>
        
        <Link 
          to="/enrolled/archived" 
          className={`flex-1 flex justify-center items-center py-3 px-4 rounded-lg font-medium transition-all duration-300 text-center ${
            !currentTab 
              ? "bg-green-600 text-white shadow-md" 
              : "text-gray-300 hover:text-white hover:bg-white/10"
          }`}
          onClick={() => setCurrentTab(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
            <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          Archived Courses
        </Link>
      </div>
    </div>
  );
}


export { EnrolledCoursesPage, ArchivedCourses, EnrolledCourses };