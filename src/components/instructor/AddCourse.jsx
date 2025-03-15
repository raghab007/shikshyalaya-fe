import { useEffect, useRef, useState } from "react";
import axios from "axios";

function AddCourse() {
    const courseName = useRef(null);
    const courseDescription = useRef(null);
    const coursePrice = useRef(null);
    const courseImage = useRef(null);
    const [courseCategory, setCourseCategory] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch course categories on component mount
    useEffect(() => {
        async function fetchCourseCategories() {
            try {
                const response = await axios.get("http://localhost:8085/course/course_category");
                const categories = response.data;
                setAllCategories(categories);
                setCourseCategory(categories[0]?.categoryId || "");
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setIsLoading(false);
            }
        }

        fetchCourseCategories();
    }, []);

    // Handle course submission
    async function handleAddCourse() {
        const name = courseName.current.value;
        const description = courseDescription.current.value;
        const price = coursePrice.current.value;
        const image = courseImage.current.files[0];

        if (!image) {
            alert("Please upload a course image.");
            return;
        }

        const formData = new FormData();
        formData.append("categoryId", courseCategory);
        formData.append("courseName", name);
        formData.append("courseDescription", description);
        formData.append("coursePrice", price);
        formData.append("courseImage", image);

        const token = localStorage.getItem("token");

        try {
            const response = await axios.post("http://localhost:8085/instructor/course", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
            });

            alert("Course added successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error adding course:", error);
            alert("Failed to add course. Please try again.");
        }
    }

    if (isLoading) {
        return <h1 className="text-center mt-10">Loading...</h1>;
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold text-center mb-6">Add New Course</h1>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                    <input
                        ref={courseName}
                        type="text"
                        placeholder="Enter course name"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Description</label>
                    <input
                        ref={courseDescription}
                        type="text"
                        placeholder="Enter course description"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Price</label>
                    <input
                        ref={coursePrice}
                        type="number"
                        placeholder="Enter course price"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
                    <input
                        ref={courseImage}
                        type="file"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Category</label>
                    <select
                        value={courseCategory}
                        onChange={(e) => setCourseCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {allCategories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.courseCategoryName}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleAddCourse}
                    className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Course
                </button>
            </div>
        </div>
    );
}

export default AddCourse;