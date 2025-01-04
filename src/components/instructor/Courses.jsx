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
        <main className="p-6 bg-blue-50  min-h-screen">
            <h1 className="text-3xl font-semibold text-blue-800 mb-6">Your Courses</h1>
            <div className="mb-6 ">
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/instructor/add-course"
                    style={{ backgroundColor: "#2563eb", color: "#fff", margin: 'auto' }}
                >
                    Add New Course
                </Button>
            </div>
            <div className="flex ml-20 flex-wrap justify-start gap-10">
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
        <div className="bg-white rounded-lg shadow-lg w-72 hover:shadow-xl transition-shadow duration-300">
            <img
                src="https://images.unsplash.com/photo-1478104718532-efe04cc3ff7f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvdXJzZXxlbnwwfHwwfHx8MA%3D%3D"
                alt={`Course: ${title}`}
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h2 className="text-xl font-bold text-blue-800 mb-3">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-blue-600">${price}</span>
                    <Link
                        to={`/instructor/courses/course-details/${id}`}
                        className="text-blue-500 hover:underline"
                    >
                        Manage Course
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Courses;
