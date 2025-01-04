
// export default function CourseDetails() {
//     const { courseId } = useParams()
//     return (
//         <>This is course details page courseId:{courseId}</>
//     )
// }


import React from "react";
import { useParams } from "react-router-dom";

export default function CourseDetails() {
    const { courseId } = useParams();

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Course Details - Course ID: {courseId}</h1>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700">Course Information</h2>
                    <p className="text-gray-600 mt-2">
                        This is a placeholder for course information. It can include the course title,
                        description, and other details about the course.
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700">Instructor Details</h2>
                    <ul className="text-gray-600 mt-2">
                        <li><strong>Name:</strong> John Doe</li>
                        <li><strong>Email:</strong> john.doe@example.com</li>
                        <li><strong>Contact:</strong> +1 234 567 890</li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700">Modules</h2>
                    <ul className="list-disc pl-5 text-gray-600 mt-2">
                        <li>Introduction to the Course</li>
                        <li>Module 1: Basics of the Subject</li>
                        <li>Module 2: Intermediate Concepts</li>
                        <li>Module 3: Advanced Topics</li>
                        <li>Final Project</li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700">Students Enrolled</h2>
                    <p className="text-gray-600 mt-2">15 students have enrolled in this course.</p>
                </div>

                <div className="flex gap-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Edit Course
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Delete Course
                    </button>
                </div>
            </div>
        </div>
    );
}
