import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Courses() {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        const getCourses = async () => {
            const response = await axios.get("http://localhost:8085/courses");
            console.log(courses)
            setCourses(response.data);
            console.log("courses:"+courses);
        
        };

        getCourses();
    }, []);

    if (courses == null) {
        return <h1>Loading...</h1>;
    }

    return (
        <main className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Your Courses</h1>
            <div className="flex justify-center mb-8">
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/instructor/add-course"
                    style={{
                        backgroundColor: "#2563eb", 
                        color: "#fff", 
                        padding: '12px 24px', 
                        fontSize: '16px'
                    }}
                >
                    Add New Course
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-8">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <Course
                            key={course.courseID}
                            title={course.courseName}
                            price={course.coursePrice}
                            id={course.id}
                            imageUrl={course.imageUrl}  // Assuming the course has an imageUrl
                        />
                    ))
                ) : (
                    <p className="text-gray-600 col-span-full text-center">
                        No courses available. Add a new course to get started!
                    </p>
                )}
            </div>
        </main>
    );
}

function Course({ title, price, id, imageUrl }) {
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
            <div className="relative h-48 bg-gray-100 overflow-hidden">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Course"
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <span className="text-white text-xl font-bold absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800">
                        No Image Available
                    </span>
                )}
            </div>
            <div className="p-6 flex flex-col h-full">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{title}</h2>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-blue-600">${price}</span>
                    <Link
                        to={`/instructor/courses/course-details/${id}`}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Manage Course
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Courses;
