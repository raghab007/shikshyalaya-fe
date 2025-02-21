import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material"; // For the loading spinner

function Courses() {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await axios.get("http://localhost:8085/courses");
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        getCourses();
    }, []);

    if (courses === null) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress />
            </div>
        );
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
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                >
                    Add New Course
                </Button>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-8">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <Course
                            key={course.courseId}
                            title={course.courseName}
                            price={course.coursePrice}
                            id={course.courseID}
                            imageUrl={course.imageUrl}
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
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
            <div className="relative h-48 bg-gray-100 overflow-hidden">
                {imageUrl ? (
                    <img
                        src={"http://localhost:8085" + imageUrl}
                        alt="Course"
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                    />
                ) : (
                    <span className="text-gray-500 text-lg font-bold absolute inset-0 flex items-center justify-center bg-gray-200">
                        No Image
                    </span>
                )}
            </div>
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
                    {title}
                </h2>
                <div className="flex items-center justify-between mb-4">
                    <Link
                        to={`/instructor/coursedetails/${id}`}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                        Manage Course
                    </Link>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>⭐️ 4.5 (120 Reviews)</span> {/* Add dynamic data if available */}
                    <span>📚 15 Lessons</span> {/* Add dynamic data if available */}
                </div>
            </div>
        </div>
    );
}


export default Courses;