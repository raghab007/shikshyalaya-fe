import { Button, TextField, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Courses() {
    const [courses, setCourses] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await axios.get("http://localhost:8085/instructor/course",{
                    headers:{
                        Authorization:"Bearer "+localStorage.getItem("token")
                    }
                });
                console.log(response)
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        getCourses();
    }, []);

    const filteredCourses = courses
        ? courses.filter((course) =>
              course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

    if (courses === null) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress />
            </div>
        );
    }

    return (
        <main className="p-6 bg-green-100 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Your Courses</h1>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/instructor/add-course"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                    >
                        Add New Course
                    </Button>
                    <TextField
                        variant="outlined"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-1/3"
                        InputProps={{
                            className: "bg-white rounded-lg shadow-sm",
                        }}
                    />
                </div>

                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredCourses.map((course) => (
                            <div
                                key={course.courseId}
                                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                            >
                                <div className="relative h-40 w-full">
                                    {course.imageUrl ? (
                                        <img
                                            src={"http://localhost:8085/images/course/" + course.imageUrl}
                                            alt={course.courseName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {course.courseName}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Rs {course.coursePrice}
                                    </p>
                                    <Link
                                        to={`/instructor/coursedetails/${course.courseID}`}
                                        className="w-full inline-block text-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                                    >
                                        Manage Course
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">
                        {searchTerm ? "No courses match your search." : "No courses available. Add a new course to get started!"}
                    </p>
                )}
            </div>
        </main>
    );
}

export default Courses;