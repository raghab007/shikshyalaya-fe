import React, { useEffect, useState } from "react"
import axios from "axios";
import BasicCard from "../components/course/CourseCard";

export default function Course() {
 // const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  // const [error, setError] = useState(false);
  // const [category, setCategory] = useState("");
  // const [priceRange, setPriceRange] = useState([1000, 5000]);

  useEffect(() => {
    async function getCourses() {
      //setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/courses");
     
        const updatedCourses = response.data.courses.map((course) => ({
          ...course,
          imageSrc: `https://picsum.photos/200/300?random=${Math.floor(
            Math.random() * 1000
          )}`,
        }));
        setCourses(updatedCourses);
      } catch (error) {
        console.log(error)
        alert("Server error")
      }
    }
    getCourses();
  }, []);


  return (
    <div className="p-6 flex " >
      <div className="w-1/6 bg-gray-50">Filtering Section</div>
      {/* Courses Section */}
      <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">
            No courses available at the moment.
          </p>
        ) : (
          courses.map((course) => (
            <BasicCard
              key={course.id}
              price={course.price}
              description={course.description}
              title={course.title}
              imageSrc={course.imageSrc}
            />
          ))
        )}
      </div>

    </div>
  );
}
