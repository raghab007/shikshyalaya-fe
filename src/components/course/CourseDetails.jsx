import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CourseDetails() {

const [course,setCourse] = useState(null);
const {courseId} = useParams();
// console.log(courseId)
console.log(courseId)
useEffect (function(){
  async function getCourse() {
    const response = await axios.get("http://localhost:8085/course/"+courseId);
   console.log(response)
    setCourse(response.data);
  }

  getCourse();
},[])
 

  if(course==null){
    return <>
    <h1>Loading...</h1>
    </>
  }


  return (
    <>
    
     <h1>{course.courseName}</h1>
     {
      course.sections.map(section=>{
        1
      })
     }
    </>
  )
}

