import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CourseDetails() {

const [course,setCourse] = useState(null);
const {courseId} = useParams();
// console.log(courseId)
useEffect (function(){
  async function getCourse() {
    const response = await axios.get("http://localhost:8085/course/"+courseId);
   console.log(response)
    setCourse(response.data);
  }

  getCourse();
},[])


  
 
 
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (id) => {
    setActiveSection((prev) => (prev === id ? null : id));
  };



  if(course==null){
    return <>
    <h1>Loading...</h1>
    </>
  }



  return (
    <>
    
    {
      course.sections.map(section=><h1>Section</h1>)
    }
    </>
  )

  // return (
  //   <div className="p-8 max-w-7xl mx-auto bg-gradient-to-r from-blue-100 via-white to-blue-50">
  //     {/* Course Header */}
  //     <div className="mb-12 text-center">
  //       <h1 className="text-5xl font-extrabold text-gray-800 mb-4 animate-fade-in">{course.title}</h1>
  //       <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">{course.description}</p>
  //     </div>

  //     {/* Course Overview */}
  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
  //       {/* Left Section */}
  //       <div className="md:col-span-2">
  //         <img
  //           src="https://picsum.photos/800/400"
  //           alt="Course Thumbnail"
  //           className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 w-full"
  //         />
  //         <h2 className="text-3xl font-semibold text-gray-700 mt-8">About the Course</h2>
  //         <p className="text-gray-600 mt-4 leading-relaxed">
  //           Dive deep into the fundamentals of React and learn to build modern,
  //           scalable, and performant web applications with ease. This course is
  //           packed with practical examples and real-world projects to get you
  //           job-ready.
  //         </p>
  //       </div>

  //       {/* Right Section - Course Details */}
  //       <div className="bg-white p-8 rounded-lg shadow-xl border-t-8 border-blue-500">
  //         <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Details</h2>
  //         <p className="text-lg text-gray-700 font-semibold">Price: {course.price}</p>
  //         <p className="text-lg text-gray-700 font-semibold mt-2">
  //           Rating: {course.rating} ⭐ ({course.reviews} Reviews)
  //         </p>
  //         <button className="w-full bg-blue-500 text-white py-3 rounded-lg mt-6 hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105">
  //           Enroll Now
  //         </button>
  //       </div>
  //     </div>

  //     {/* Instructor Section */}
  //     <div className="bg-white rounded-lg shadow-xl p-8 mb-12 flex items-center gap-6">
  //       <img
          
  //         alt={"Raghab Pokhrel"}
  //         className="w-24 h-24 rounded-full shadow-md"
  //       />
  //       <div>
  //         <h3 className="text-2xl font-bold text-gray-800">Instructor: {"Raghab Pokhrel"}</h3>
  //         <p className="text-gray-600 mt-2 leading-relaxed">{"Junior Java Developer"}</p>
  //       </div>
  //     </div>

  //     {/* Course Content Section */}
  //     <div className="mb-12">
  //       <h2 className="text-3xl font-bold text-gray-800 mb-6">Course Content</h2>
  //       {course.sections.map((section) => (
  //         <div
  //           key={section.id}
  //           className="mb-4 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
  //         >
  //           <button
  //             onClick={() => toggleSection(section.id)}
  //             className="w-full flex justify-between items-center p-6 bg-blue-100 hover:bg-blue-200 transition-colors duration-300"
  //           >
  //             <h3 className="text-xl font-semibold text-gray-800">
  //               {section.title}
  //             </h3>
  //             <span className="text-gray-500 transform transition-transform duration-300">
  //               {activeSection === section.id ? "▲" : "▼"}
  //             </span>
  //           </button>
  //           {activeSection === section.id && (
  //             <ul className="p-4 space-y-3 animate-expand">
  //               {section.lessons.map((lesson) => (
  //                 <li
  //                   key={lesson.id}
  //                   className="bg-gray-50 p-4 rounded-md shadow-sm flex justify-between items-center hover:bg-gray-100"
  //                 >
  //                   <span className="text-gray-700">{lesson.title}</span>
  //                   <span className="text-gray-500 text-sm">{lesson.duration}</span>
  //                 </li>
  //               ))}
  //             </ul>
  //           )}
  //         </div>
  //       ))}
  //     </div>

  //     {/* Reviews Section */}
  //     <div className="bg-gray-100 rounded-lg shadow-xl p-8">
  //       <h2 className="text-3xl font-bold text-gray-800 mb-6">Student Reviews</h2>
  //       <div className="space-y-4">
  //         <p className="text-gray-600 italic">"This course is amazing!"</p>
  //         <p className="text-gray-600 italic">
  //           "The projects helped me understand React deeply."
  //         </p>
  //       </div>
  //       <button className="mt-6 text-blue-500 underline hover:text-blue-600 transition-colors duration-300">
  //         See all reviews
  //       </button>
  //     </div>
  //   </div>
  // );
}
