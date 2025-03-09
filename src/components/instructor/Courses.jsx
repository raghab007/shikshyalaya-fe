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
                const response = await axios.get("http://localhost:8085/courses");
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
        <main className="p-6 bg-gray-50 min-h-screen">
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
                    <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Course Name</th>
                                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Price</th>
                                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Image</th>
                                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCourses.map((course) => (
                                    <tr key={course.courseId} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300">
                                        <td className="py-4 px-6 text-sm text-gray-900">{course.courseName}</td>
                                        <td className="py-4 px-6 text-sm text-gray-900">Rs {course.coursePrice}</td>
                                        <td className="py-4 px-6">
                                            {course.imageUrl ? (
                                                <img
                                                    src={"http://localhost:8085" + course.imageUrl}
                                                    alt="Course"
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                            ) : (
                                                <span className="text-gray-500 text-sm">No Image</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <Link
                                                to={`/instructor/coursedetails/${course.courseID}`}
                                                className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                                            >
                                                Manage Course
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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