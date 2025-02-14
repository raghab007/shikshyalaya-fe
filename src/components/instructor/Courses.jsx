import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Courses() {
    // Mock course data
    const courses = [
        { id: 1, name: "Course1", price: 200, description: "Spring Boot", title: "Java with Spring Boot" },
        { id: 2, name: "Course2", price: 250, description: "React Basics", title: "Learn React JS" },
        { id: 3, name: "Course3", price: 300, description: "Python", title: "Advanced Python Programming" },
        { id: 4, name: "Course4", price: 150, description: "Data Structures", title: "Intro to Data Structures" },
        { id: 5, name: "Course5", price: 350, description: "Machine Learning", title: "ML for Beginners" },
        { id: 6, name: "Course6", price: 400, description: "AI", title: "AI in Practice" },
    ];

    return (
        <main className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Your Courses</h1>
            <div className="flex justify-center mb-8">
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/instructor/add-course"
                    style={{ backgroundColor: "#2563eb", color: "#fff", padding: '12px 24px', fontSize: '16px' }}
                >
                    Add New Course
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <Course
                            key={course.id}
                            title={course.title}
                            description={course.description}
                            price={course.price}
                            id={course.id}
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

function Course({ title, description, price, id }) {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-48 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">Course Image</span>
            </div>
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-blue-600">${price}</span>
                    <Link
                        to={`/instructor/courses/course-details/${id}`}
                        className="text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-300"
                    >
                        Manage Course
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Courses;